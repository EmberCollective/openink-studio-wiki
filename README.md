# OpenInk Studio

面向第一次使用写字机工作台的用户：先完成画布练习，再连接、校准和书写。

- [在线教程](https://embercollective.github.io/openink-studio-wiki/)
- [软件公开仓库](https://github.com/EmberCollective/openink-studio)

## 架构

独立公开仓库，使用 Astro + Starlight 和 GitHub Pages。参考 [PCHSystem-wiki](https://github.com/YuShenLiu06/PCHSystem-wiki) 的选型，采用 Markdown 内容、任务侧栏和静态部署；页面与配置重新编写。搜索由 Starlight 内置 Pagefind 在构建时生成，无需后端。

教程独立发版，不触碰私有软件历史；技术契约仍以软件公开仓库为准。不复制参考项目的统计脚本、更新日志同步器和定时构建。

## 维护

使用 Node.js 24：

```sh
npm ci
npm run dev
npm run build
npm run preview
```

正文在 `src/content/docs/`，导航在 `astro.config.mjs`，截图在 `public/images/`。`npm run build` 同时检查生成站点的本地链接、锚点及资源。推送 main 后 Actions 构建并部署；PR 仅构建检查。仓库 Settings → Pages 的 Source 设为 GitHub Actions。

首版只包含 A4 空白纸书写和 PDF 背景套打两条教程。用户最新版本是另一台机器上的 `0.5.3`；当前先对照可核对的 `0.5.0-preview` 编写，后续再核对小幅界面变化。截图注明来源和限制；涉及机器的操作仍需用户设备验收。

## 许可

本站原创内容与配置以 [GPL-3.0-only](LICENSE) 发布。软件与依赖遵循各自许可证。
