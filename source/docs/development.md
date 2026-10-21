# 二次开发指南

## 关卡和商品

权威工作簿在 `sheet/level.xlsx`、`sheet/icon.xlsx`，导出至 `cfg_level.ts`、`cfg_icon.ts`。工作簿第 2 行是字段名、第 3 行是类型、第 5 行起是数据；保留原有 sheet 名与字段大小写。模式对应 tp/gs/ls。商品 ID 必须与图标配置及资源一致，商品以三件成组生成，不要只改可见节点。

```sh
npm ci --allow-remote=all --ignore-scripts
npm run config:export
npm test
```

导出路径以 `excel2ts/config.json` 所在目录为基准，不依赖当前终端目录。导出器仅接受 `.xlsx` 并忽略 Excel 临时文件。导出后审阅 `git diff -- assets/scripts/config`，保留原 `.meta`。`cfg_passReward.ts` 当前没有对应工作簿，是手写配置，不能假设所有 `cfg_` 文件都可重新生成。

## 奖励、存档与道具

调整 `CfgLoginReward/CfgLuckySpin/CfgItem/CfgSkillInfo`、`cfg_passReward` 和 `Global` 前先阅读 `RewardMgr` 与 `GameMgr` 的调用链。奖励值必须是有效物品的正整数，转盘扣费和发奖必须原子提交，胜利不能重复发奖。数值调整需要更新预期并验证正常、重复点击、磁盘写失败、重载后的结果；不要绕过事务直接修改 `GameSave.Data` 或 `localStorage`。

修改技能看 `enum/SkillType → CfgItem → SkillMgr → GameMgr → EventType → Stage/TimeItem`。验证暂停、技能动画、切局回调、库存不足和保存失败。当前规则保留每局领取限制、一次复活和重试结算，不引入广告/支付 SDK。

## 资源与 UI

**Creator 编辑器操作**：在资源管理器内移动或重命名资源；通过 Inspector 编辑 Prefab、组件引用和按钮事件，保存 `.prefab/.scene` 和 `.meta`。更换图标检查对应 Bundle 和 SpriteFrame 子资源引用。新增 UI 同时注册 `enum/UI` 路由，并确认配置式 `openUI/closeUI`。

运行 `npm test` 和预检，随后 Preview：启动、三种模式关卡、有效/无效拖拽、消除补层、四类道具、暂停恢复、通关、超时、复活、存档重载。至少检查 720×1600、窄屏和横屏；查看控制台及 Network 资源请求。涉及 SDK、Bundle、模板或部署路径时再做独立 Web CLI 构建和 HTTP 验证。

## 拖拽、消除和加载异常

自动匹配不能消耗正在拖拽的源商品；放置前再次校验原商品仍有效且未进入消除状态。货架 isEmpty 表示逻辑上没有剩余商品，不以消除动画节点是否销毁为准；关卡仍必须检查未生成队列，以免提前胜利。新增回归覆盖这两个时序及最后一组消除与超时的竞争。

启动资源加载失败时，在 UILoading 内使用内置 Label/Button 显示重试，不依赖可能加载失败的 UI Bundle。重复点击不能并发发起重试；关闭后不能再生成控件。对应回归同时模拟 Bundle 失败、资源失败及重试成功。


## 主页清除存档

主页右上角的“清除存档”按钮复用 UIRecovery 显示二次确认。取消不写入数据；确定调用 `GameSave.reset()`，通过事务将 `hgxcds_game_v1` 恢复为初始状态，重置关卡、金币、道具、奖励记录和设置，刷新主页。写入失败保留旧数据并留在确认框重试，不清空浏览器的其他存储。验证取消、确认、刷新后仍为初始状态、写入失败以及手机点击范围。
