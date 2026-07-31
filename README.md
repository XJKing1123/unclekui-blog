# 奎叔技术笔记

个人开发经验与 Flutter、iOS、React、Web3 深度技术博客，基于 Astro、Pagefind、Mermaid 和 Nginx 构建。

## 本地开发

使用 Node.js 22：

```bash
pnpm install
pnpm run dev
```

生产构建与全文索引：

```bash
pnpm run check
pnpm run build
pnpm run preview
```

站点资料统一在 `src/config/site.ts` 修改。发布文章需要补齐 Frontmatter，并放入对应的专栏目录：

```text
articles/
├── experience/flutter/
├── flutter/<series>/
├── ios/<series>/
├── react/<series>/
└── web3/<series>/
```

“经验之谈”文章当前以 Flutter 开发岗为主，统一放在 `articles/experience/flutter/`，Frontmatter 的 `series` 使用 `experience`。

`src/content.config.ts` 会自动加载 `articles/**/*.md`，不需要再维护文件名白名单。目录表示内容归属，页面 URL 仍由 Frontmatter 中的 `slug` 决定，因此移动文章不会改变已发布链接。

## Docker

```bash
SITE_URL=http://服务器IP docker compose up -d --build
curl http://服务器IP/healthz
```

默认映射服务器 `80` 端口。端口已占用时可以设置：

```bash
BLOG_PORT=8080 SITE_URL=http://服务器IP:8080 docker compose up -d --build
```

## Ubuntu / Debian 首次部署

1. 将仓库上传或克隆到服务器。
2. 运行 `sh scripts/server-preflight.sh` 检查系统、Docker、端口和磁盘。
3. 未安装 Docker 时，按 Docker 官方 Ubuntu/Debian 文档安装 Docker Engine 和 Compose Plugin。
4. 确保安全组或防火墙允许 TCP 80。
5. 执行：

```bash
SITE_URL=http://服务器IP sh scripts/deploy.sh
```

6. 检查容器和页面：

```bash
docker compose ps
curl -I http://127.0.0.1/
curl http://127.0.0.1/healthz
```

发生问题且存在上一镜像时：

```bash
sh scripts/rollback.sh
```

### 服务端一键更新

服务器首次配置部署参数：

```bash
cat > .env <<'EOF'
SITE_URL=https://www.unclekui.site
BLOG_PORT=8080
EOF
```

后续每次发布只需在服务器项目目录执行：

```bash
sh scripts/server-deploy.sh
```

脚本会从 `origin/main` 快进拉取最新代码、构建并替换容器，然后检查本机健康端点。服务器存在未提交的源码修改或另一个部署仍在执行时，脚本会中止，避免覆盖修改或并发部署。

## 域名与 HTTPS

域名解析到服务器后：

1. 将 `SITE_URL` 更新为 `https://blog.example.com` 并重新构建。
2. 把 Nginx `server_name` 改为实际域名。
3. 在宿主机反向代理层使用 Certbot，或在 Compose 中增加专用 HTTPS 代理。
4. 开放 443，并验证证书自动续期。
5. HTTP 永久重定向到 HTTPS 后，再评估启用 HSTS。

不要在仍通过 IP/HTTP 访问时提前启用 HSTS。

## 内容发布检查

- Frontmatter 通过 Schema 校验。
- Markdown 只有一个文章主题，标题层级连续。
- Mermaid 在生产构建中正常渲染。
- 代码块标注语言，长代码可横向滚动。
- 内部链接、标签和专栏路径有效。
- `pnpm run check && pnpm run build` 全部通过。
