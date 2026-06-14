# vue-video 项目优化设计

## 范围

对现有 Vue 2.5 + Webpack 3 + ElementUI 视频网站前端进行三个阶段的渐进式优化：代码清理 → 构建性能提升 → 架构拆解。**不做功能补全**（数据管理、日志管理等 TODO 项推迟）。

## Phase 1 — 代码清理（零行为变更）

### 1.1 移除 console.log（55 处）

全部散布在 `src/components/` 下的 Vue 文件和 `src/api/api.js` 中。所有 `console.log(error)` / `console.log(err)` 替换为更合适的处理：

- **API 调用失败的 catch 块**（绝大部分场景）：改为使用 element-ui `Message.error()` 提示用户，或直接移除（如果上层已有错误处理）
- **文件列表**：
  - `src/api/api.js` — `errorDeal` 函数（1 处）
  - `src/components/*.vue` 及 `src/components/**/*.vue` — 约 20 个文件中的 catch 块（54 处）

### 1.2 删除未使用的前端依赖

当前 `package.json` 中以下依赖在项目中没有被有效使用（Vue + ElementUI 已覆盖其功能）：

| 依赖 | 原因 |
|------|------|
| `bootstrap` | ElementUI 提供 UI 组件，bootstrap 的 grid/样式未被使用 |
| `jquery` | 虽然 webpack ProvidePlugin 注入全局，但源码中未使用 `$` 或 `jQuery` |
| `popper.js` | 仅为 bootstrap 的依赖 |
| `font-awesome` | 通过 `font-awesome/css/font-awesome.css` 在 `main.js` 中全局引入，但 ElementUI 自带图标系统已覆盖，搜索无实际使用 |

**操作：** 从 `package.json` 移除，从 `main.js` 移除 import，从 `webpack.base.conf.js` 移除 ProvidePlugin，删除 `assets/plugins/` 和 `assets/js/` 下所有第三方文件。

### 1.3 清理已注释的 eslint-loader 代码

`build/webpack.base.conf.js:12-21` 中 `createLintingRule` 函数完全被注释掉，且 `config.dev.useEslint` 引用该函数。直接删除该函数和 `...config.dev.useEslint ? [createLintingRule()] : []`。

### 1.4 关掉生产 source map

`config/index.js:60` `productionSourceMap: true` → `false`。生产构建不再生成 `.map` 文件，大幅减小 dist 体积。

### 1.5 修复 errorDeal 函数

`src/api/api.js:38-44` 中 `errorDeal` 使用 `this.$message`，但该函数是普通导出函数（非 Vue 组件方法），`this` 指向错误。改为直接引用已导入的 `$message` 变量。

## Phase 2 — 构建性能优化

### 2.1 路由懒加载

将 `src/router/index.js` 中所有静态 import 改为动态 import：

```js
// 之前
import Index from '@/components/index'
// 之后
const Index = () => import('@/components/index')
```

涉及全部 24 个路由组件。这会让 webpack 自动为每个路由生成独立 chunk，首屏只加载当前路由所需代码。

### 2.2 启用 gzip 压缩

`config/index.js:68` `productionGzip: true`，确保 `compression-webpack-plugin` 存在于 devDependencies（项目中已有引用代码）。

## Phase 3 — 架构拆解

### 3.1 API 分层

将 `src/api/api.js`（215 行，26 个 API 函数）按业务 domain 拆分：

```
src/api/
├── index.js          # 统一导出所有 API
├── client.js         # axios 实例创建 + 拦截器配置
├── auth.js           # login, logOut, signUp, vipCodeVerification
├── film.js           # getIndexData, getFilmDetail, searchFilm, saveRaty...
├── profile.js        # userProfile, getFilmsForProfile, getMyComments...
├── manager.js        # managerFilm, managerCatalog, getUsers, updateUserInfo...
└── note.js           # getNotes, saveComment, changeLikeNum
```

`client.js` 负责创建 axios 实例、配置拦截器和 baseURL，其他文件导入该实例发起请求。

### 3.2 Vuex 模块化

将 `src/vuex/store.js`（163 行，7 个状态项 + 菜单/banner 数据）按职责拆分：

```
src/vuex/
├── index.js          # 创建 Store 实例，注册模块
└── modules/
    ├── user.js       # user, dialogLoginModelVisible
    ├── ui.js         # activeIndex, fullscreenLoading, isCollapse, headerDisplay
    ├── menu.js       # menu（后台菜单配置）
    └── banner.js     # banner（首页横幅数据）
```

### 3.3 硬编码配置外移

创建 `src/config/index.js`：

```js
export default {
  API_BASE_URL: 'http://localhost:8080/video',
  DEV_SERVER_PORT: 7001
}
```

`src/main.js` 和 `src/api/client.js` 引用此配置，而非直接写字符串。后续如需对接不同环境后端，只需改这一个文件。

### 3.4 重复 CRUD 组件抽象

对比发现 `manager/decadeManager.vue`、`locManager.vue`、`levelManager.vue` 三个文件结构几乎一模一样（各约 110 行），差异只有：

- API 路径不同
- 表格列名/字段不同
- form 表单 label 不同

抽取为通用 `manager/EntityManager.vue`，通过 props 配置差异：

```vue
<entity-manager
  :api-path="'/admin/decade'"
  :columns="[{prop: 'name', label: '名称'}]"
  :form-fields="[{prop: 'name', label: '名称'}]"
/>
```

保留三个原路由组件转为轻量 wrapper 传入配置。

## 非目标

以下项目明确不做：
- Webpack 3→4/5 升级（收益不足以覆盖风险）
- 功能补全（数据管理、日志管理、影片详情完善等 TODO）
- Vue 2→3 升级
- 测试覆盖补充
- UI 重新设计

## 验证方式

| Phase | 验证 |
|-------|------|
| Phase 1 | `npm run dev` 正常启动，页面功能无异常；`npm run build` 成功，dist 无 .map 文件 |
| Phase 2 | 浏览器 Network tab 确认路由 chunk 按需加载，gzip 生效 |
| Phase 3 | 所有页面功能与重构前一致，API 调用正常，Vuex 状态正确 |
