# 架构和阅读顺序

## 启动与关卡

`main.scene` 通过 `Main.ts.meta` 的 UUID 挂载 `Scene/Main`。`Main.start → ResMgr.loadDir(resources) → UILoading`，加载 icon、audio、game、ui 四个 Bundle。`UILoading` 完成后初始化 `GameSave`，成功才打开 `UIMain`；损坏存档进入 `RecoveryMgr` 的重试/确认新建流程。

`UIMain → GameMgr.startGame → game/Stage.prefab → Stage`。`GameMgr` 持有当前局 ID、暂停状态、拖拽物及注册的 Stage；异步回调必须验证当前局，防止退出后影响下一局。`Stage` 根据 `Mode` 选择 `cfg_level_tp/gs/ls` 和对应 `cfg_icon_*`；超过配置长度后从该模式配置随机选关。配置提供货架地图、商品组数、锁数、种类数、时限等。

## 商品与棋盘

`Stage` 实例化货架，按三件一组生成商品 ID，`GoodsLayout.distributeGoods` 为大小货架分配各层队列，并验证分配前后数量守恒。该模块仅依赖数组工具，不操作节点。`BoardLayout.fitBoard` 是布局计算；同文件的 `boundsInSpace` 负责 Cocos 坐标转换，不需要为统一形式再拆模块。

`Goods` 负责商品表现和触摸入口。`GameMgr.pick/release` 将拖拽代理放到效果层，通过货架 `UITransform` 转换坐标并判断目标槽位。`ShelveBase` 定义货架契约，`CommonShelve/SmallShelve` 负责填层、移动、三件相同的匹配与删除；锁货架由 `ShelveLocker` 控制。`EventMgr` 传递放置、消除、检查通关等事件。

## 道具、计时和结算

`SkillBox/UIGetSkill → GameMgr` 执行可用性检查和消耗事务，再发送技能事件；`Stage` 响应重排、消除和双倍币，`TimeItem` 响应冻结和复活。`SkillMgr` 负责物品 ID 映射和库存查询。`TimeItem.update` 是本局倒计时，不是 `TimeMgr` 的通用定时器；暂停、冻结、超时和复活有独立状态。

`Stage.checkWin` 同时检查待生成队列、各层数据和节点，避免只清掉可见层就通关。`GameMgr.settleRound` 把奖励、关卡推进和模式解锁一次提交；`UIWin` 只显示已结算结果。`RewardMgr` 负责签到、转盘、累计通关等奖励规则；`ItemMgr` 验证并合并库存变化。

## 存档与 UI

唯一持久化入口是 `GameSave.transact`，键为 `hgxcds_game_v1`。先修改候选快照、校验、写磁盘，再发布内存与事件；失败不能提前扣币或发奖。没有旧键读取、删除或迁移。`Setting` 也经此入口保存音效设置。`RecoveryMgr/UIRecovery` 将失败展示给玩家，并支持重试。

`UIMgr` 按 `enum/UI` 与 `DtoUI` 从 Bundle 创建 UI，`UIBase` 管理打开、关闭和事件生命周期。`BtnExtend` 除直接组件方法外还可配置打开/关闭 UI；只搜索按钮函数会漏掉这部分路由。

## 场景、Prefab 与 UUID

场景和 Prefab 是可编辑 JSON 序列化资源，`__id__` 指同一文件对象表中的索引，`__uuid__` 指资源 `.meta` 或子资源，压缩 UUID 的 `__type__` 指脚本组件。`@property` 名称是序列化协议的一部分。不能只移动 `.ts`、删除 `.meta` 或批量改属性名。

`main.scene` 提供 Canvas、管理节点和 UI 层；`assets/resources` 放启动加载 UI，`assets/bundles/game` 放 Stage、货架、商品及效果 Prefab，`assets/bundles/ui` 放后续 UI。`ResMgr` 统一加载和引用计数，不承担奖励或存档规则。修复后的加载函数在等待 Bundle 失败时会正常 reject，不会因 async Promise executor 丢失失败而永久等待。

## 源工程边界

| 类别 | 路径 | 训练与二创用途 |
| --- | --- | --- |
| 手写业务源码 | assets/scripts（config 中手写配置除外另述）、场景/Prefab 与 .meta | 核心可编辑材料 |
| 原始资源与配置 | assets/bundles、assets/resources、sheet、网页模板 | 保留，配合 Creator 修改 |
| 工作簿生成源码 | cfg_level.ts、cfg_icon.ts | 随源码交付；从工作簿更新；cfg_passReward.ts 当前手写 |
| 引擎声明/依赖 | 根 cc.d.ts、Creator 安装目录 | cc.d.ts 为旧引擎类型副本，不是业务源码；外部引擎不打包 |
| 可重建缓存 | library、temp、node_modules | 排除；按环境重新生成或安装 |
| 本地配置 | profiles、.DS_Store、私钥目录 | 排除，不作为训练材料 |
| Web 产物 | build 和交付 web 目录 | 只用于运行，不当作源码学习材料 |
