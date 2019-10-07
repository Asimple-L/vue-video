# vue-video

> 项目<a href="https://github.com/Asimple-L/video" alt="爱视">video</a>的前端源代码。

## 整改计划
- [x] 首页迁移
- [ ] 查询页迁移
- [ ] 详情页迁移
- [ ] 播放页面迁移
- [ ] 留言与评论模块迁移
- [ ] 分享模块迁移
- [ ] 后台管理迁移
- [ ] 页面整改美化(持续)
- [ ] 文件上传插件更换

## 项目结构

```
.
├── README.md
├── dist  // 打包构建后的文件夹
│   ├── build.js
│   └── build.js.map
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── css.css
│   │   ├── icon.css
│   │   └── logo.png
│   ├── api
│   │   └── api.js  // 配置api接口文件
│   ├── index.vue
│   ├── main.js
│   ├── router
│   │   └── router.js  // 配置api接口文件
│   └── store
│       ├── store.js
│       └── types.js  // vuex types
└── webpack.config.js
```

### 技术栈
* Vue 2.0
* vue-router
* vuex
* axios

## 运行及构建
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:7001
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
