# vue-video

> 项目<a href="https://github.com/Asimple-L/video" alt="爱视">video</a>的前端源代码。

## 整改计划
- [x] 首页迁移
- [x] 登录注册页面迁移
- [x] 查询页迁移
- [ ] 详情页迁移
- [x] 播放页面迁移
- [x] 留言与评论模块迁移
- [ ] 分享模块迁移
- [x] 后台管理迁移
- [ ] 页面整改美化(持续)
- [ ] 文件上传插件更换
- [ ] 错误页面完善

### 项目优化
- [ ] 后台管理添加日志监控，添加到数据管理页当中
- [ ] 后台管理系统退出登录后,首页页面的用户登录信息还在
- [ ] 后台管理的目录管理，可以细分为 分类管理、年份管理、地区管理、等级管理

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
│   │   ├── css // css文件
│   │   ├── img // 图片文件
│   │   ├── js // js文件
│   │   └── plugins // 插件
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
