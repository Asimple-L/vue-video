# vue-video 项目优化 — 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 按 3 个 Phase 对 vue-video 前端项目进行渐进式优化：代码清理 → 构建性能优化 → 架构拆解。

**架构：** 24 个路由组件 + 1 个 API 入口 + 1 个 Vuex Store。优化后：API 拆 6 文件、Vuex 拆 5 模块、新增 config 配置层、4 个重复 CRUD 组件合并为 1 个通用组件 + 3 个轻量 wrapper。

**技术栈：** Vue 2.5 + Webpack 3 + ElementUI

---

### 任务 1：移除所有 console.log

**修改文件（以下文件中的 catch 块改为使用 ElementUI Message 或移除）：**
- `src/api/api.js:39`
- `src/components/header.vue:156,186,200,213`
- `src/components/index.vue:135`
- `src/components/register.vue:134`
- `src/components/filmDetail.vue:411`
- `src/components/filmList.vue:261`
- `src/components/note.vue:106,123,136`
- `src/components/userProfile.vue:164`
- `src/components/common/updateFilm.vue:426,443,508,605,618,628`
- `src/components/profile/updateInfo.vue:86`
- `src/components/profile/viewHistory.vue:76`
- `src/components/profile/videosMine.vue:84`
- `src/components/profile/comment.vue:72`
- `src/components/manager/filmManager.vue:75,102`
- `src/components/manager/catalogManager.vue:161,245,282`
- `src/components/manager/decadeManager.vue:71,88,99`
- `src/components/manager/locManager.vue:72,89,100`
- `src/components/manager/levelManager.vue:71,88,99`
- `src/components/manager/userManager.vue:134,170`
- `src/components/manager/vipManager.vue:75,88`
- `src/components/manager/TopBar.vue:86`

**处理规则：**
- `console.log(error)` 在 catch 块中且没有其他逻辑 → 直接删除 catch 块或改用箭头函数保持结构
- `console.log(err)` 同上
- `api.js:39` 的 `errorDeal` 函数中的 `console.log(err)` → 保留但改为 `$message.error`（此函数单独在任务 5 修复）

- [ ] **步骤 1：处理 src/api/api.js**

将 `src/api/api.js:38-44` 改为：

```js
export const errorDeal = err => {
  $message.error({
    message: '系统调用失败,请重试!',
    duration: 3000
  })
}
```

- [ ] **步骤 2：处理 src/components/header.vue 4 处**

文件 `src/components/header.vue`，所有 `.catch(function (error) { console.log(error) })` 改为 `.catch(() => {})` 或直接移除 catch（4 处）。

- [ ] **步骤 3：处理 src/components/index.vue 1 处**

文件 `src/components/index.vue:135`，`.catch(function (err) { console.log(err) })` 改为 `.catch(() => {})`。

- [ ] **步骤 4：处理 src/components/register.vue 1 处**

文件 `src/components/register.vue:134`，同上处理。

- [ ] **步骤 5：处理 src/components/filmDetail.vue 1 处**

文件 `src/components/filmDetail.vue:411`，同上处理。

- [ ] **步骤 6：处理 src/components/filmList.vue 1 处**

文件 `src/components/filmList.vue:261`，同上处理。

- [ ] **步骤 7：处理 src/components/note.vue 3 处**

文件 `src/components/note.vue:106,123,136`，同上处理。

- [ ] **步骤 8：处理 src/components/userProfile.vue 1 处**

文件 `src/components/userProfile.vue:164`，同上处理。

- [ ] **步骤 9：处理 src/components/common/updateFilm.vue 6 处**

文件 `src/components/common/updateFilm.vue:426,443,508,605,618,628`，同上处理。

- [ ] **步骤 10：处理 profile 目录下 4 个文件各 1 处**

`src/components/profile/updateInfo.vue:86`、`viewHistory.vue:76`、`videosMine.vue:84`、`comment.vue:72`，同上处理。

- [ ] **步骤 11：处理 manager 目录下 7 个文件共 13 处**

`filmManager.vue:75,102`、`catalogManager.vue:161,245,282`、`decadeManager.vue:71,88,99`、`locManager.vue:72,89,100`、`levelManager.vue:71,88,99`、`userManager.vue:134,170`、`vipManager.vue:75,88`、`TopBar.vue:86`，同上处理。

- [ ] **步骤 12：运行验证**

运行：`npm run dev`
预期：页面正常启动，无报错。运行 `npm run lint` 无新增 warning。

---
### 任务 2：删除未使用的第三方依赖

**修改文件：**
- `package.json`
- `src/main.js`
- `build/webpack.base.conf.js`

- [ ] **步骤 1：清理 package.json 中的未用依赖**

删除以下依赖：
- `bootstrap`（dependencies）
- `jquery`（dependencies + devDependencies 中的第二个 jquery）
- `popper.js`（dependencies）
- `font-awesome`（dependencies）

- [ ] **步骤 2：清理 main.js 中的无用 import**

`src/main.js` — 删除以下行：
- `import 'element-ui/lib/theme-chalk/index.css'`（不对，这个是 ElementUI 必须的，不能删）
- 删除 `import 'font-awesome/css/font-awesome.css'`

- [ ] **步骤 3：清理 webpack.base.conf.js 中 jQuery 注入**

`build/webpack.base.conf.js:95-98` — 删除 ProvidePlugin 代码块：

```js
// 删除整个 plugins 数组或只删除以下内容：
new webpack.ProvidePlugin({
  jQuery: "jquery",
  $: "jquery"
})
```

如果 plugins 数组只剩 `CommonsChunkPlugin`，保留那个。

- [ ] **步骤 4：删除 assets 下未使用的第三方文件**

```bash
Remove-Item -Recurse -Force src/assets/plugins
Remove-Item -Recurse -Force src/assets/js/base
Remove-Item -Recurse -Force src/assets/js/mine
Remove-Item -Recurse -Force src/assets/libs
```
保留 `src/assets/css/` 和 `src/assets/img/` 目录。

- [ ] **步骤 5：运行验证**

运行：`npm run dev`
预期：正常启动，Header/首页/路由均正常工作。

---
### 任务 3：清理 webpack 中已注释的 eslint-loader 代码

**修改文件：** `build/webpack.base.conf.js`

- [ ] **步骤 1：删除 createLintingRule 函数和引用**

删除 `build/webpack.base.conf.js:12-21` 整个 `createLintingRule` 函数。
删除第 44 行 `.config.dev.useEslint ? [createLintingRule()] : []`，改为空数组 `[]`。

- [ ] **步骤 2：运行验证**

运行：`npm run dev`
预期：正常启动，构建无警告。

---
### 任务 4：关闭生产 source map

**修改文件：** `config/index.js`

- [ ] **步骤 1：修改 productionSourceMap**

`config/index.js:60` 将 `productionSourceMap: true` 改为 `productionSourceMap: false`。

- [ ] **步骤 2：运行验证**

运行：`npm run build`
预期：`dist/` 目录下不再生成 `.js.map` / `.css.map` 文件。

---
### 任务 5：修复 errorDeal 函数

**修改文件：** `src/api/api.js`

- [ ] **步骤 1：修复 this.$message 为直接引用**

第 38-44 行的函数：

```js
export const errorDeal = err => {
  $message.error({
    message: '系统调用失败,请重试!',
    duration: 3000
  })
}
```

注意：`$message` 在第 13 行已被引入为 `const $message = Message`，所以直接用即可。

- [ ] **步骤 2：运行验证**

运行：`npm run dev`
预期：正常启动，无报错。

---
### 任务 6：清理 util/index.js 中已注释的 import

**修改文件：** `src/util/index.js`

- [ ] **步骤 1：删除文件顶部 5 行已注释的 import**

删除第 1-5 行：

```js
// import '../assets/js/base/base.js';
// import '../assets/plugins/bootstrap4.0.0/js/bootstrap.bundle.js';
// import '../assets/plugins/bootstrap4.0.0/js/popper.min.js';
// import '../assets/plugins/bootstrap4.0.0/js/bootstrap.js';
// import '../assets/js/base/jquery.nicescroll.js';
```

保留第 6 行的 `import router from '../router'` 和后续代码。

- [ ] **步骤 2：运行验证**

运行：`npm run dev`
预期：正常启动。

---
### 任务 7：路由懒加载

**修改文件：** `src/router/index.js`

- [ ] **步骤 1：将所有静态 import 改为 dynamic import**

将文件头部所有 `import X from '@/components/X'` 模式改为：

```js
const Index = () => import('@/components/index')
const Register = () => import('@/components/register')
const FilmDetail = () => import('@/components/filmDetail')
const Error = () => import('@/components/error')
const FilmList = () => import('@/components/filmList')
const Note = () => import('@/components/note')
const UpdateFilm = () => import('@/components/common/updateFilm')
const UserProfile = () => import('@/components/userProfile')
const viewHistory = () => import('@/components/profile/viewHistory')
const comment = () => import('@/components/profile/comment')
const videosMine = () => import('@/components/profile/videosMine')
const updateInfo = () => import('@/components/profile/updateInfo')
const managerPage = () => import('@/components/manager/managerPage')
const managerIndex = () => import('@/components/manager/index')
const filmManager = () => import('@/components/manager/filmManager')
const catalogManager = () => import('@/components/manager/catalogManager')
const userManager = () => import('@/components/manager/userManager')
const vipManager = () => import('@/components/manager/vipManager')
const dataManager = () => import('@/components/manager/dataManager')
const logManager = () => import('@/components/manager/logManager')
const decadeManager = () => import('@/components/manager/decadeManager')
const locManager = () => import('@/components/manager/locManager')
const levelManager = () => import('@/components/manager/levelManager')
```

删除原来的 import 语句块（第 3-25 行）。

- [ ] **步骤 2：运行验证**

运行：`npm run dev`
预期：正常启动。打开浏览器 DevTools → Network 标签，访问 `/index` 时只有 app.js 和 vendor.js 加载，导航到 `/manager/film` 时动态加载 film chunk。

---
### 任务 8：启用生产 gzip 压缩

**修改文件：** `config/index.js`

- [ ] **步骤 1：启用 productionGzip**

`config/index.js:68` 将 `productionGzip: false` 改为 `productionGzip: true`。

- [ ] **步骤 2：确保 compression-webpack-plugin 已安装**

检查 `node_modules/compression-webpack-plugin` 是否存在。如果不存在：

运行：`npm install compression-webpack-plugin@1.1.12 --save-dev`

注意：必须安装兼容 Webpack 3 的版本（1.x）。

- [ ] **步骤 3：运行验证**

运行：`npm run build`
预期：`dist/static/js/` 下同时生成 `.js` 和 `.js.gz` 文件。

---
### 任务 9：创建统一配置模块

**创建文件：**
- `src/config/index.js`

**修改文件：**
- `src/main.js`
- `src/api/api.js`

- [ ] **步骤 1：创建 src/config/index.js**

```js
const config = {
  API_BASE_URL: 'http://localhost:8080/video',
  HOME_URL: 'http://localhost:8080/video/',
  DEV_SERVER_PORT: 7001
}

export default config
```

- [ ] **步骤 2：修改 src/main.js**

将第 18 行：
```js
Vue.prototype.HOME='http://localhost:8080/video/';
```
改为：
```js
import config from './config'
Vue.prototype.HOME = config.HOME_URL
```

- [ ] **步骤 3：修改 src/api/api.js**

在第 4-5 行（`import Qs from 'qs'` 之后、`import { Message } from 'element-ui'` 之前）添加：

```js
import config from '../config/index'
```

将第 9 行：
```js
const baseUrl = 'http://localhost:8080/video'
```
改为：
```js
const baseUrl = config.API_BASE_URL
```

- [ ] **步骤 4：运行验证**

运行：`npm run dev`
预期：正常启动，所有页面图片加载和 API 调用正常。

---
### 任务 10：API 分层 — 拆分 api.js

**创建文件：**
- `src/api/client.js`
- `src/api/auth.js`
- `src/api/film.js`
- `src/api/manager.js`
- `src/api/profile.js`
- `src/api/note.js`
- `src/api/index.js`

**删除文件：**
- `src/api/api.js`

- [ ] **步骤 1：创建 src/api/client.js**

```js
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
import config from '../config'

const $message = Message

const client = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true
})

client.interceptors.response.use(
  response => response,
  error => {
    let message = ''
    switch (error.response.status) {
      case 401:
        message = '授权错误'
        router.push({path: '/'})
        break
      default:
        message = '系统错误'
        router.push({path: '/error'})
        break
    }
    $message({
      title: '出错了',
      type: error,
      message: message
    })
    return Promise.reject(error)
  }
)

export const errorDeal = err => {
  $message.error({
    message: '系统调用失败,请重试!',
    duration: 3000
  })
}

export const dealResult = data => {
  const code = data.code
  if (code === '000000') {
    return data.data
  } else {
    $message.error({
      message: data.message,
      duration: 2000
    })
    return null
  }
}

export const dealResultWithoutData = data => {
  const code = data.code
  if (code === '000000') {
    $message.success(data.message)
    return true
  } else {
    $message.error({
      message: data.message,
      duration: 2000
    })
    return false
  }
}

export default client
```

- [ ] **步骤 2：创建 src/api/auth.js**

```js
import client, {dealResult} from './client'
import Qs from 'qs'

export const getIndexHeaderInfo = params => {
  return client.post('/getHeaderInfo', params)
}

export const login = params => {
  return client.post('/login', Qs.stringify(params))
}

export const logOut = params => {
  return client.post('/logout', params)
}

export const vipCodeVerification = params => {
  return client.post('/vipCodeVerification', Qs.stringify({'vipCode': params}))
}

export const signUp = params => {
  return client.post('/register', Qs.stringify(params))
}

export const updatePassword = params => {
  return client.post('/updatePassword', Qs.stringify(params))
}
```

- [ ] **步骤 3：创建 src/api/film.js**

```js
import client, {dealResult} from './client'
import Qs from 'qs'

export const getIndexData = params => {
  return client.post('/index', params)
}

export const getFilmDetail = params => {
  return client.post('/xl/detail', Qs.stringify(params))
}

export const saveRaty = params => {
  return client.post('/xl/addRaty', Qs.stringify(params))
}

export const searchFilm = param => {
  return client.post('/xl/index', Qs.stringify(param))
}
```

- [ ] **步骤 4：创建 src/api/profile.js**

```js
import client from './client'
import Qs from 'qs'

export const userProfile = param => {
  return client.post('/profile/profilePage', Qs.stringify(param))
}

export const getFilmsForProfile = param => {
  return client.post('/profile/getFilmAjax', Qs.stringify(param))
}

export const getMyComments = param => {
  return client.post('/profile/getMyComments', Qs.stringify(param))
}

export const getFilm = params => {
  let url = '/profile/share'
  if (params.isAdmin) {
    url = '/admin/film'
  }
  return client.post(url, Qs.stringify(params))
}

export const getCatagLog = params => {
  return client.post('/profile/getCatalog', Qs.stringify(params))
}

export const addFilm = params => {
  return client.post('/profile/addFilm', params)
}

export const addRes = params => {
  params['res'] = JSON.stringify(params['res'])
  return client.post('/profile/addRes', Qs.stringify(params))
}

export const delFilm = params => {
  return client.post('/profile/delFilm', Qs.stringify(params))
}

export const updateFilmInfo = params => {
  return client.post('/profile/updateFilmInfo', Qs.stringify(params))
}
```

- [ ] **步骤 5：创建 src/api/manager.js**

```js
import client from './client'
import Qs from 'qs'

export const managerFilm = params => {
  return client.post('/admin/list', Qs.stringify(params))
}

export const managerCatalog = params => {
  return client.post('/admin/catalog', Qs.stringify(params))
}

export const updateCatalog = (urlStr, params) => {
  return client.post('/admin' + urlStr, Qs.stringify(params))
}

export const getUsers = params => {
  return client.post('/admin/userList', Qs.stringify(params))
}

export const updateUserInfo = params => {
  return client.post('/admin/updateUser', Qs.stringify(params))
}

export const vipPage = (urlStr, param) => {
  return client.post('/admin' + urlStr, Qs.stringify(param))
}
```

- [ ] **步骤 6：创建 src/api/note.js**

```js
import client from './client'
import Qs from 'qs'

export const getNotes = params => {
  return client.post('/note', Qs.stringify(params))
}

export const saveComment = params => {
  return client.post('/saveComment', Qs.stringify(params))
}

export const changeLikeNum = params => {
  return client.post('/changeLikeNum', Qs.stringify(params))
}
```

- [ ] **步骤 7：创建 src/api/index.js**

```js
export * from './auth'
export * from './film'
export * from './manager'
export * from './profile'
export * from './note'
export {errorDeal, dealResult, dealResultWithoutData} from './client'
```

- [ ] **步骤 8：删除旧的 src/api/api.js**

```bash
Remove-Item -LiteralPath "src/api/api.js"
```

- [ ] **步骤 9：运行验证**

运行：`npm run dev`
预期：必然报错，因为组件 import 路径还没更新。确认报错内容即可，下一个任务修复。

---
### 任务 11：更新所有组件 import 指向新的 API 模块

**修改文件** — 所有 import `api/api` 的 20 个 .vue 文件。

- [ ] **步骤 1：更新根目录组件的 import（7 个文件）**

将 `'../api/api'` 改为 `'../api/index'` 或按需导入子模块：

`src/components/index.vue:81` — `import { getIndexData } from '../api/index'`
`src/components/header.vue:100` — `import { getIndexHeaderInfo, login, dealResult, vipCodeVerification, logOut } from '../api/index'`
`src/components/register.vue:57` — `import { signUp, dealResult } from '../api/index'`
`src/components/filmDetail.vue:290` — `import { getFilmDetail, errorDeal, dealResult, saveRaty } from '../api/index'`
`src/components/filmList.vue:201` — `import { searchFilm, dealResult } from '../api/index'`
`src/components/note.vue:65` — `import { getNotes, dealResult, saveComment, changeLikeNum, dealResultWithoutData } from '../api/index'`
`src/components/userProfile.vue:124` — `import { userProfile, dealResult } from '../api/index'`

- [ ] **步骤 2：更新子目录组件的 import（13 个文件）**

将 `'../../api/api'` 改为 `'../../api/index'`：

`src/components/common/updateFilm.vue:321`
`src/components/profile/updateInfo.vue:23`
`src/components/profile/viewHistory.vue:48`
`src/components/profile/videosMine.vue:45`
`src/components/profile/comment.vue:44`
`src/components/manager/filmManager.vue:49`
`src/components/manager/catalogManager.vue:92`
`src/components/manager/decadeManager.vue:47`
`src/components/manager/locManager.vue:47`
`src/components/manager/levelManager.vue:47`
`src/components/manager/userManager.vue:93`
`src/components/manager/vipManager.vue:47`
`src/components/manager/TopBar.vue:35`

- [ ] **步骤 3：运行验证**

运行：`npm run dev`
预期：正常启动，所有页面 API 调用正常。

---
### 任务 12：Vuex 模块化

**创建文件：**
- `src/vuex/modules/user.js`
- `src/vuex/modules/ui.js`
- `src/vuex/modules/menu.js`
- `src/vuex/modules/banner.js`

**修改文件：**
- `src/vuex/store.js`（改为注册模块）

- [ ] **步骤 1：创建 src/vuex/modules/user.js**

```js
const user = {
  state: {
    dialogLoginModelVisible: false,
    user: {id: '', userName: '', isVip: '', isManager: '', expireDate: '', userEmail: ''}
  },
  mutations: {
    SET_DIALOG_VISIBLE (state, visible) {
      state.dialogLoginModelVisible = visible
    },
    SET_USER (state, user) {
      state.user = user
    },
    CLEAR_USER (state) {
      state.user = {id: '', userName: '', isVip: '', isManager: '', expireDate: '', userEmail: ''}
    }
  }
}

export default user
```

- [ ] **步骤 2：创建 src/vuex/modules/ui.js**

```js
const ui = {
  state: {
    activeIndex: '9',
    fullscreenLoading: true,
    isCollapse: false,
    headerDisplay: false
  },
  mutations: {
    SET_ACTIVE_INDEX (state, index) {
      state.activeIndex = index
    },
    SET_LOADING (state, loading) {
      state.fullscreenLoading = loading
    },
    TOGGLE_COLLAPSE (state) {
      state.isCollapse = !state.isCollapse
    },
    SET_HEADER_DISPLAY (state, display) {
      state.headerDisplay = display
    }
  }
}

export default ui
```

- [ ] **步骤 3：创建 src/vuex/modules/menu.js**

```js
const menu = {
  state: {
    menu: [
      {
        name: '后台首页',
        name_en: 'index',
        router: 'index',
        icon: 'el-icon-s-home',
        relative: true,
        children: []
      },
      {
        name: '影音管理',
        name_en: 'video',
        router: '/video',
        icon: 'el-icon-film',
        children: [
          {
            name: '所有影片',
            name_en: 'all film',
            router: 'film',
            relative: true,
            icon: 'el-icon-right'
          },
          {
            name: '添加影视',
            name_en: 'add film',
            router: '/upload',
            relative: false,
            icon: 'el-icon-right'
          }
        ]
      },
      {
        name: '目录管理',
        name_en: 'catalog',
        router: '/catalog',
        icon: 'el-icon-s-operation',
        children: [
          {name: '分类管理', name_en: 'catalog manager', router: 'catalog', relative: true, icon: 'el-icon-right'},
          {name: '年份管理', name_en: 'decade manager', router: 'decade', relative: true, icon: 'el-icon-right'},
          {name: '地区管理', name_en: 'loc manager', router: 'loc', relative: true, icon: 'el-icon-right'},
          {name: '等级管理', name_en: 'level manager', router: 'level', relative: true, icon: 'el-icon-right'}
        ]
      },
      {
        name: '账户管理',
        name_en: 'account',
        router: '/account',
        icon: 'el-icon-user',
        children: [
          {name: '用户管理', name_en: 'user manager', router: 'user', relative: true, icon: 'el-icon-right'},
          {name: 'VIP管理', name_en: 'VIP manager', router: 'vip', relative: true, icon: 'el-icon-right'}
        ]
      },
      {
        name: '数据管理',
        name_en: 'data',
        router: 'data',
        icon: 'el-icon-s-data',
        relative: true,
        children: []
      }
    ]
  },
  mutations: {}
}

export default menu
```

- [ ] **步骤 4：创建 src/vuex/modules/banner.js**

```js
const banner = {
  state: {
    banner: [
      {
        name: '第一个横屏广告', title: '我命由我不由天',
        url: 'http://localhost:7001/static/img/1.jpg',
        link: 'http://localhost:7001/#/detail/f39c979857a4c8c50157a9020fb8001d', content: ''
      },
      {
        name: '第二个横屏广告', title: '七夕',
        url: 'http://localhost:7001/static/img/2.jpg',
        link: 'http://localhost:7001/#/detail/f39c979857ad7e8c0157ae8ad2c80012', content: ''
      },
      {
        name: '第三个横屏广告', title: '',
        url: 'http://localhost:7001/static/img/3.jpg',
        link: 'http://localhost:7001/#/detail/f39c979857b48a2a0157bddaa8f70056', content: ''
      },
      {
        name: '第四个横屏广告', title: '',
        url: 'http://localhost:7001/static/img/4.jpg',
        link: 'http://localhost:7001/#/detail/f39c979857ad7e8c0157b39c4f9b002a', content: ''
      },
      {
        name: '第五个横屏广告', title: '',
        url: '', link: 'https://www.baidu.com',
        content: '这是一个纯文字的横屏广告'
      }
    ]
  },
  mutations: {}
}

export default banner
```

- [ ] **步骤 5：重构 src/vuex/store.js**

```js
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import ui from './modules/ui'
import menu from './modules/menu'
import banner from './modules/banner'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    ui,
    menu,
    banner
  }
})
```

- [ ] **步骤 6：更新所有组件中的 $store.state 引用**

模块化后，访问方式从 `$store.state.xxx` 变为 `$store.state.moduleName.xxx`。需要更新所有引用的文件：

| 原引用 | 新引用 |
|--------|--------|
| `$store.state.dialogLoginModelVisible` | `$store.state.user.dialogLoginModelVisible` |
| `$store.state.user` | `$store.state.user.user` |
| `$store.state.activeIndex` | `$store.state.ui.activeIndex` |
| `$store.state.fullscreenLoading` | `$store.state.ui.fullscreenLoading` |
| `$store.state.isCollapse` | `$store.state.ui.isCollapse` |
| `$store.state.headerDisplay` | `$store.state.ui.headerDisplay` |
| `$store.state.menu` | 保持不变（模块名就是 menu） |
| `$store.state.banner` | `$store.state.banner.banner` |

**具体修改项：**

`src/App.vue:3` — `$store.state.fullscreenLoading` → `$store.state.ui.fullscreenLoading`
`src/components/header.vue:6` — `$store.state.activeIndex` → `$store.state.ui.activeIndex`
`src/components/header.vue:163` — `this.$store.state.activeIndex` → `this.$store.state.ui.activeIndex`
`src/components/header.vue:221` — 同上
... 按上述对照表更新所有文件的引用。

共有约 45 处引用需要更新。

- [ ] **步骤 7：运行验证**

运行：`npm run dev`
预期：正常启动，登录/退出/菜单切换/loading/横幅均正常工作。

---
### 任务 13：通用 EntityManager 组件抽象

**创建文件：**
- `src/components/manager/EntityManager.vue`

**修改文件：**
- `src/components/manager/decadeManager.vue`
- `src/components/manager/locManager.vue`
- `src/components/manager/levelManager.vue`
- `src/router/index.js`

- [ ] **步骤 1：创建 src/components/manager/EntityManager.vue**

```vue
<template>
  <div class="context-manager">
    <el-row class="padding-top-10 padding-bottom-10 padding-left-10">
      <el-col :span="16">{{ title }}</el-col>
      <el-col :span="8" style="text-align: right;padding-right: 10px;">
        <el-button type="primary" @click="showDialog" size="small">新增{{ entityName }}</el-button>
      </el-col>
    </el-row>
    <el-dialog :title="'新增' + entityName" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item :label="entityName" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitDialog(false)">取 消</el-button>
        <el-button type="primary" @click="submitDialog(true)">确 定</el-button>
      </div>
    </el-dialog>
    <el-row class="padding-left-10">
      <ul style="text-align: center;">
        <li v-for="item in tableData" :key="item.id">
          <el-popconfirm
            confirmButtonText="确定"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="是否删除?"
            @onConfirm="handleDelete(item)">
            <el-button round style="margin-top: 5px;" slot="reference">{{ item.name }}</el-button>
          </el-popconfirm>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
import {managerCatalog, dealResult, updateCatalog, dealResultWithoutData} from '../../api/index'

export default {
  name: 'entity-manager',
  props: {
    title: {type: String, required: true},
    entityName: {type: String, required: true},
    listKey: {type: String, required: true},
    addPath: {type: String, required: true}
  },
  data () {
    return {
      dialogFormVisible: false,
      tableData: [],
      form: {name: ''}
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      managerCatalog().then(res => {
        const data = dealResult(res.data)
        if (data != null) {
          this.tableData = data[this.listKey]
        }
      }).catch(() => {})
    },
    showDialog () {
      this.dialogFormVisible = true
    },
    submitDialog (flag) {
      this.dialogFormVisible = false
      if (flag) {
        updateCatalog(this.addPath, {name: this.form.name}).then(res => {
          dealResultWithoutData(res.data)
          this.form.name = ''
          this.getTableData()
        }).catch(() => {})
      }
    },
    handleDelete (obj) {
      obj.isUse = 0
      updateCatalog(this.addPath, obj).then(res => {
        dealResultWithoutData(res.data)
        this.getTableData()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
ul li {width: 22%; margin-right: 3%; float: left;}
</style>
```

- [ ] **步骤 2：重写三个管理组件为轻量 wrapper**

`src/components/manager/decadeManager.vue`:
```vue
<template>
  <entity-manager title="年份管理" entity-name="年份" list-key="decadeList" add-path="/addDecade" />
</template>
<script>
import EntityManager from './EntityManager'
export default {name: 'decade-manager', components: {EntityManager}}
</script>
```

`src/components/manager/locManager.vue`:
```vue
<template>
  <entity-manager title="地区管理" entity-name="地区" list-key="locList" add-path="/addLoc" />
</template>
<script>
import EntityManager from './EntityManager'
export default {name: 'loc-manager', components: {EntityManager}}
</script>
```

`src/components/manager/levelManager.vue`:
```vue
<template>
  <entity-manager title="等级管理" entity-name="等级" list-key="levelList" add-path="/addLevel" />
</template>
<script>
import EntityManager from './EntityManager'
export default {name: 'level-manager', components: {EntityManager}}
</script>
```

- [ ] **步骤 3：运行验证**

运行：`npm run dev` → 访问 `/manager/decade`、`/manager/loc`、`/manager/level`
预期：三个页面功能与之前完全一致（显示列表、新增、删除）。

---
### 任务 14：最终回归验证

- [ ] **步骤 1：运行完整构建**

运行：`npm run build`
预期：构建成功，`dist/` 下生成 gzip 文件，无 .map 文件。

- [ ] **步骤 2：手动回归测试清单**

| 测试项 | 操作 | 预期 |
|--------|------|------|
| 首页 | 访问 /index | 横幅轮播、分类推荐、排行榜正常显示图片 |
| 注册 | 点击注册，填写表单提交 | 注册流程正常 |
| 登录 | 点击登录，输入凭据 | 登录成功，header 显示用户名 |
| 影片详情 | 点击任意影片 | 详情页展示、推荐列表 |
| 影片搜索 | 导航到 /xl | 列表显示正常 |
| 留言 | 导航到 /note | 留言和评论功能 |
| 个人中心 | 登录后进入个人中心 | 子路由正常切换 |
| 后台管理 | 登录管理员后进入 /manager | 所有子页面正常 |
| 影片上传 | /upload | 表单和上传功能 |
| 懒加载 | 观察 Network | 切换路由动态加载 chunk |
