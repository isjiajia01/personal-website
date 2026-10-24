## Jiajia Zhang 的个人主页

[English](./README.md)

这里是我个人主页的源码。

## 技术栈

- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [Velite](https://velite.js.org)

## 分享预览

Open Graph 和 Twitter Card 使用 `public/og/` 内的 1200×630 PNG 封面：首页、项目、简历、关于及 Afgang 均有中英文版本。运行 `node scripts/generate-share-images.mjs` 可重新生成（下载开放字体，使用已有 Next.js 渲染器）。生成图片随源码提交，常规构建和分享平台抓取无需下载字体。更新封面后，同步增加生成脚本及 `lib/share-preview.ts` 中的文件名版本，避免沿用缓存图片。

## 部署

通过 GitHub Pages 部署到 https://me.isjia.page,由 `.github/workflows/pages.yml` 在每次推送到 `main` 时触发(静态导出到 `out/`,自定义域名见 `public/CNAME`).
