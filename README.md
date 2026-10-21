# 货柜消除大师

Cocos Creator 3.8.3 + TypeScript 竖屏消除游戏。此仓库同时提供可编辑源工程和已验证的可读 Web 构建。

**[在线试玩](https://arisgod1.github.io/goods-match/)** · [玩法说明](docs/玩法说明.md)

## 开发与材料选择

- **[source/](source/README.md)**：完整可编辑工程，包括 TypeScript、场景、Prefab、美术、工作簿、构建工具及文档。训练、学习、二次创作请使用此目录。
- 根目录 `index.html`、`application.js`、`index.js`、`assets/`、`cocos-js/`、`src/` 等：Creator 生成的 Web 试玩产物，业务 JS 未压缩并附 Source Map。部分引擎第三方兼容库保留上游格式。
- [架构与开发文档](source/docs/) · [代码质量审查](docs/代码质量审查.md)
- [验证结果](verification/summary.json) · [源码清单](verification/source-manifest.json) · [Web 清单及实际构建选项](verification/web-manifest.json)

`src/` 是 Web 生成文件；`source/assets/scripts/` 才是业务 TypeScript 源码。源码与 Web 通过清单中的 sourceId 对应，不能用编译 JS 替代源工程。

## 打开、测试和重新构建

使用 Creator **3.8.3** 导入 `source`，等待资源导入，打开 `assets/scenes/main.scene` 预览。首次导入会生成 TypeScript 所需的 temp 配置和引擎缓存。

```sh
cd source
npm ci --allow-remote=all --ignore-scripts
npm test
npm run typecheck -- --out ../typecheck-report
npm run build:web -- --target web-mobile --readable --no-archive --out ../rebuilt-web
```

输出目录必须尚不存在。构建依赖本机 Creator 3.8.3；详见 source/README.md 中的工具路径配置。

本地试玩可在仓库根目录执行：

```sh
python3 -m http.server 8080
```

然后打开 http://localhost:8080/ 。

## 当前版本的验证与限制

40 组业务回归及资源、交付工具、工作簿测试通过。独立副本安装、构建、启动、首关加载和拖拽消除已验证。TypeScript 仍有 183 个既有诊断，新增 0；并非完全无类型错误。审查发现的异步 UI 管理等问题记录在审查文档中，本次发布保留被审查版本，未额外修改玩法。

Web 构建采用 `web-mobile`、`debug: true`、`sourceMaps: true`。启动模板已关闭 FPS / Draw Calls 性能统计，保持可读代码和 Source Map。进度保存在当前浏览器的 `hgxcds_game_v1`，不支持跨设备同步。

## GitHub Pages 发布

沿用 main 分支根目录发布，仓库保留 `.nojekyll`。推送 main 后 GitHub Pages 自动发布根目录现有 Web 文件；Creator 构建需先在本地完成，GitHub 不负责运行 Creator。可编辑源码随仓库单独保留在 source/。

当前源码内容 ID：`a516b4fac616e84a38e11e53243a826078ee8907a250d71759a8520ac0d8b01d`。
