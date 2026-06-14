# AGENTS.md — vue-video（爱视）

## 一、项目介绍与启动

基于 Vue 2.5 的视频网站前端。技术栈：Vue 2 + Webpack 3 + ElementUI + vue-router + vuex + axios。  
视频播放依赖 vue-video-player + videojs-contrib-hls，富文本使用 vue-quill-editor。  
后端 API 地址硬编码为 `http://localhost:8080/video`（需同步修改 `src/main.js` 和 `src/api/api.js`）。

```bash
npm run dev      # 启动 dev server → localhost:7001（支持 PORT 环境变量）
npm run build    # 生产构建 → dist/
npm run lint     # ESLint（standard + vue/essential）
npm run unit     # Jest 单元测试
npm run e2e      # Nightwatch e2e（需 selenium + chromedriver）
npm test         # 先 unit 后 e2e
```

## 二、项目规范

> TODO：当前项目尚未有明确的编码规范文档。后续应补充 ESLint 规则约定、Git commit 规范、组件命名约定等内容。

目前生效的约束：
- `.editorconfig`：2 空格缩进、UTF-8、LF 换行
- ESLint：`standard` + `plugin:vue/essential`，dev 构建时已注释禁用（仅 `npm run lint` 生效）

## 三、业务知识图谱

### 路由入口 → 业务模块
| 路由 | 组件 | 业务 |
|------|------|------|
| `/index` | `src/components/index.vue` | 首页（推荐、分类导航、横幅） |
| `/register` | `src/components/register.vue` | 注册页 |
| `/detail/:filmId` | `src/components/filmDetail.vue` | 影片详情 |
| `/xl` | `src/components/filmList.vue` | 影片查询/列表 |
| `/note` | `src/components/note.vue` | 留言与评论 |
| `/upload` | `src/components/common/updateFilm.vue` | 影片新增/修改 |
| `/userProfile/:uid/*` | `src/components/profile/` | 用户中心：浏览历史、评论、我的视频、信息修改 |
| `/manager/*` | `src/components/manager/` | 后台管理：总览、影片管理、目录管理、用户管理、VIP 管理、数据管理、日志管理 |

### 核心模块职责
- `src/api/api.js` — 所有 API 调用（axios），含请求拦截和响应处理
- `src/router/index.js` — 路由定义
- `src/vuex/store.js` — Vuex store（登录状态、菜单配置、横幅数据）
- `src/lang/` — 国际化（zh/en），默认中文
- `src/filter/numberFilter.js` — 数字格式化过滤器
- `src/util/index.js` — 工具方法

### 后台管理子模块
| 路由 | 组件 | 业务 |
|------|------|------|
| `/manager/index` | `manager/index.vue` | 后台首页 |
| `/manager/film` | `manager/filmManager.vue` | 影片管理 |
| `/manager/catalog` | `manager/catalogManager.vue` | 分类管理 |
| `/manager/decade` | `manager/decadeManager.vue` | 年份管理 |
| `/manager/loc` | `manager/locManager.vue` | 地区管理 |
| `/manager/level` | `manager/levelManager.vue` | 等级管理 |
| `/manager/user` | `manager/userManager.vue` | 用户管理 |
| `/manager/vip` | `manager/vipManager.vue` | VIP 卡管理 |
| `/manager/data` | `manager/dataManager.vue` | 数据管理（TBD） |
| `/manager/log` | `manager/logManager.vue` | 日志管理（TBD） |
