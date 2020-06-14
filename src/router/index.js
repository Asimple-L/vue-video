import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Register from '@/components/register'
import FilmDetail from '@/components/filmDetail'
import Error from '@/components/error'
import FilmList from '@/components/filmList'
import Note from '@/components/note'
import UpdateFilm from '@/components/common/updateFilm'
import UserProfile from '@/components/userProfile'
import viewHistory from '@/components/profile/viewHistory'
import comment from '@/components/profile/comment'
import videosMine from '@/components/profile/videosMine'
import updateInfo from '@/components/profile/updateInfo'
import managerPage from '@/components/manager/managerPage'
import managerIndex from '@/components/manager/index'
import filmManager from '@/components/manager/filmManager'
import catalogManager from '@/components/manager/catalogManager'
import userManager from '@/components/manager/userManager'
import vipManager from '@/components/manager/vipManager'
import dataManager from '@/components/manager/dataManager'
import logManager from '@/components/manager/logManager'
import decadeManager from '@/components/manager/decadeManager'
import locManager from '@/components/manager/locManager'
import levelManager from '@/components/manager/levelManager'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/index'},
    { path: '/register', name: 'register', component: Register },// 注册页
    { path: '/index', name: 'index', component: Index},// 首页
    { path: '/detail/:filmId', name: 'film-detail', component: FilmDetail},// 影片详情 TODO 功能待完善
    { path: '/xl', name: 'film-list', component: FilmList},// 影片查询页
    { path: '/note', name: 'note', component: Note},// 留言页
    { path: '/userProfile/:uid', name: 'user-profile', component: UserProfile,children:[
        { path: 'history', name: 'view-history', component: viewHistory },// 浏览历史页
        { path: 'comment', name: 'comment', component: comment },// 我的评论页
        { path: 'videos', name: 'videos-mine', component: videosMine },// 我上传的视频页
        { path: 'updateInfo', name: 'update-info', component: updateInfo },// 用户信息更新页
        { path: '', component: videosMine },
      ]},// 用户中心页
    { path: '/upload', name: 'update-film', component: UpdateFilm},//TODO 影片信息更新页
    { path: '/manager', name: 'manager-page', component: managerPage, children: [
        // 后台管理子页面
        { path: 'index', name: 'manager-index', component: managerIndex},
        { path: 'film', name: 'film-manager', component: filmManager},//影片管理
        { path: 'catalog', name: 'catalog-manager', component: catalogManager},//目录管理
        { path: 'decade', name: 'decade-manager', component: decadeManager},// 年份管理
        { path: 'loc', name: 'loc-manager', component: locManager},// 年份管理
        { path: 'level', name: 'level-manager', component: levelManager},// 年份管理
        { path: 'user', name: 'user-manager', component: userManager},//用户管理
        { path: 'vip', name: 'vip-manager', component: vipManager},//VIP卡管理
        { path: 'data', name: 'data-manager', component: dataManager},//TODO 数据管理
        { path: 'log', name: 'log-manager', component: logManager},//TODO 日志管理
        { path: '', component: managerIndex},// 默认访问首页
      ] },// 后台管理页面
    { path: '/error', name: 'error', component: Error},// TODO 错误页
    { path: '/**', redirect: '/index'}// 默认访问首页
  ]
})
