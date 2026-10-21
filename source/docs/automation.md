# 最小自动化流程

`node tools/cocos-project.cjs <command> --project <工程> --out <新输出目录>`。

| 命令 | 输出与作用 |
| --- | --- |
| check | 引擎声明版本、Node/本机工具、必要文件、场景/Prefab 内部引用与组件 UUID |
| scan | 按 platform-sdk、platform-config、native、business-review、machine-path 分类定位，含文件、行号和片段；只读 |
| test | 项目存在的回归脚本；无测试时失败，不能冒充通过 |
| typecheck | 全量 Creator TypeScript 诊断、与基线的增减比较；不使用 skipLibCheck |
| build | 明确 Web 目标、场景 UUID、完整实际配置、日志、产物清单和 Web 归档 |
| package | 白名单复制源码，生成 SHA-256 清单、源码目录及归档 |
| release | 上述检查、测试、诊断比较和两类交付；失败保留报告 |

全部支持 `--dry-run`，只展示计划、源码文件和哈希，不运行测试或 Creator、不创建输出目录。默认 web-mobile，可通过 `--target web-desktop` 指定桌面目标。工具始终拒绝在工程内部输出及覆盖已有输出，包括批量运行的汇总报告。

源码只从 assets、settings、模板、sheet、excel2ts、tools、docs、config、.creator 和明确列出的根文件复制；忽略 symlink、缓存、node_modules、profiles、Git、私钥目录及密钥扩展名、环境文件和 PEM 私钥内容。它不具备识别任意自定义凭据格式的能力；加入第三方服务前要人工核对配置、二进制资源和交付清单。

批量模式使用 JSON 文件：

```json
{"projects":["/path/to/project-a","/path/to/project-b"]}
```

```sh
node tools/cocos-project.cjs check --batch /path/to/projects.json --out /path/to/new-batch-output
```

按输入顺序输出 `1/report.json`、`2/report.json` 和 `batch-report.json`；某工程失败继续下一个，整体以非零退出。适配另一个 3.8.3 项目时复制工具及 `config/web-build.json`，核对入口和必要文件规则，在 config/web-build.json 的 tests 列表注册该工程测试；先建立独立的真实 TypeScript 基线，不能复用本游戏的错误基线。其他 Creator 版本需要重新验证 CLI 参数和退出码。

自动化覆盖文件筛选、静态引用、配置生成、CLI 调用和可审计交付。原生/平台 SDK 的业务替代、奖励与存档兼容、动态资源路径、视觉正确性及发布授权仍需人工判断。静态外部引用由 Creator 导入构建进一步验证，不能把所有未匹配 UUID 自动认定为丢失。

源码包复验：解压 `source.tar.gz` 到新目录，用指定 Creator 导入，执行 `npm test`，再运行 build 命令到另一个外部目录。首次导入可以通过 CLI build 完成；未导入前 typecheck 缺少 temp 声明是正常的先决条件失败，不能跳过检查。

构建前将工程和输出路径解析为真实路径，避免 macOS `/tmp` 与 `/private/tmp` 别名造成 Creator 的脚本 UUID 查找失败。构建不仅检查退出码，还检查日志缺失脚本和入口组件是否进入 Web 模块；异常保留首次产物并最多重试一次，仍失败即拒绝交付。CLI 参数与退出码依据 [Creator 官方命令行文档](https://docs.cocos.com/creator/3.8/manual/zh/editor/publish/publish-in-command-line.html)。

预检要求注册的测试文件全部存在，测试命令不跳过丢失文件。打包器自身的回归文件也属于源码交付必需内容；使用拆分字符串构造密钥检测测试夹具，避免夹具字面量被凭据过滤器误判为真实密钥。

可读交付模式：`--readable --no-archive`。它设置 debug=true、sourceMaps=true，并直接生成 source/ 和 web/web-mobile/，不生成压缩归档；这不意味着移除 Creator 引擎依赖。

审查后补强：包含 TS5083 等无文件行号的 TypeScript 诊断也会使增量检查失败；完整校验资源及子资源 UUID；排除嵌套 npm/pip/netrc 等凭据配置，保留 SecretRoom.ts 等正常业务文件名；批量重跑拒绝覆盖原报告。工作簿和测试仍需安装锁定的开发依赖。

Creator 的 settings/v2/packages/information.json 包含账号权益/表单会话状态，交付时明确排除，原工作区文件保留；编辑器会按本机账号重新生成。npm 安装应在工程实际目录中执行，避免通过 macOS /tmp 符号链接别名使用 --prefix。
