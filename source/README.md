# 货柜消除大师 · 可编辑 Web 游戏工程

Cocos Creator **3.8.3** + TypeScript，720 × 1600 竖屏货柜三消。保留源码、场景、Prefab、美术、配置工作簿和 UUID；Web 运行包只是试玩与部署材料。未接入广告、支付或线上服务。

## 环境与启动

- 安装 Creator 3.8.3（编辑器、内置引擎与编译器不随源码包分发）、Node.js 18+、npm、系统 `tar`；本次验证 Node 26.5.0。
- **Creator 编辑器操作**：通过 Dashboard 导入本目录，等待资源导入，打开 `assets/scenes/main.scene`，点击 Preview。导入会重建 `library/` 和 `temp/`，不要将它们作为源码。
- 非默认安装位置设置 `COCOS_CREATOR` 为 Creator 可执行文件，`COCOS_TYPESCRIPT` 为其 TypeScript 包目录。macOS 的标准 3.8.3 路径会自动发现；Windows/Linux 显式设置环境变量。
- 游戏运行和构建不需要 npm 安装依赖；完整回归和导出 Excel 前先执行 `npm ci --allow-remote=all --ignore-scripts`（锁文件固定 node-xlsx 0.24.0 与官方 SheetJS 0.20.2 下载地址/完整性；仅在此命令允许该远程开发依赖）。

## 可直接执行的命令

以下命令从工程根目录执行。每次 `--out` 使用**尚不存在的工程外目录**；避免覆盖工作、旧构建和历史报告。

```sh
npm ci --allow-remote=all --ignore-scripts
npm test
npm run check -- --out ../artifacts/check-001
npm run scan -- --out ../artifacts/scan-001
npm run typecheck -- --out ../artifacts/types-001
npm run build:web -- --target web-mobile --out ../artifacts/web-001
npm run build:web -- --target web-desktop --out ../artifacts/desktop-001
npm run release -- --target web-mobile --out ../artifacts/release-001 --dry-run
npm run release -- --target web-mobile --out ../artifacts/release-001
npm run release -- --target web-mobile --readable --no-archive --out ../交付成果/货柜消除大师
```

通用入口也接受 `--project /path/to/project`。`release` 顺序执行预检、扫描、测试、诊断比较、源码打包、Creator CLI 构建、Web 打包。类型检查仍保留全部原有诊断；`report.json` 标明原有错误数、增加和消除的诊断，有新增诊断时流程失败。不是“类型检查零错误”。基线在 `config/typescript-baseline.json`，不可为了使检查通过直接重录基线。

`--readable` 使用 Creator 的 debug 构建（关闭业务代码压缩，保留名称）并启用 Source Map；`--no-archive` 只交付展开目录，不生成 tar.gz。两者可组合用于阅读与二次开发。引擎附带的第三方兼容库（例如 polyfills）可能保留上游发布格式；游戏业务源码始终以 source/assets/scripts 中的 TypeScript 为准。

`config/web-build.json` 显式定义入口与构建选项，目标由命令指定。最终绝对输出路径和场景 UUID 写入交付目录的 `creator-build.json`，不读取个人 `profiles/` 的历史任务。Creator 成功退出码 36 是正常结果。

## 交付和部署

`release-001/source/` 是可直接导入 Creator 的完整源码工程；`source.tar.gz` 是其归档。`source-manifest.json` 记录每个文件的 SHA-256 和整个源码集合的标识。训练、学习和二次创作使用这个源码目录或源码归档。

`release-001/web/web-mobile/` 与独立的 `web.tar.gz` 是部署材料，含编译后的业务模块、引擎和资源。**不能用这些 JS 代替 TypeScript 源码**。`web-manifest.json` 记录同一源码标识及构建配置。压缩包解压至静态托管根目录即可；不需要服务端 API。保留相对资源目录，服务器提供正确 MIME（尤其 `.wasm`），生产环境使用 HTTPS。

本地试玩（需 Python 3，另开终端）：

```sh
python3 -m http.server 8080 --directory ../artifacts/release-001/web/web-mobile
```

浏览器打开 `http://localhost:8080`；不要用 `file://`。存档绑定站点 origin，更换端口/域名会看到独立存档。

## 继续阅读

- [架构与资源引用](docs/architecture.md)
- [二次开发](docs/development.md)
- [Web 迁移及限制](docs/web-migration.md)
- [可复用自动化流程](docs/automation.md)
- [本次验证记录](docs/validation.md)
