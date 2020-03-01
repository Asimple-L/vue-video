import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Register from '@/components/register'
import FilmDetail from '@/components/filmDetail'
import Error from '@/components/error'
import FilmList from '@/components/filmList'
import Note from '@/components/note'
import UpdateFilm from '@/components/updateFilm'
import UserProfile from '@/components/userProfile'
import viewHistory from '@/components/profile/viewHistory'
import comment from '@/components/profile/comment'
import videosMine from '@/components/profile/videosMine'
import updateInfo from '@/components/profile/updateInfo'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/index'},
    { path: '/register', name: 'register', component: Register },// 注册页
    { path: '/index', name: 'index', component: Index},// 首页
    { path: '/detail/:filmId', name: 'film-detail', component: FilmDetail},// 影片详情
    { path: '/xl', name: 'film-list', component: FilmList},// 影片查询页
    { path: '/note', name: 'note', component: Note},// 留言页
    { path: '/userProfile/:uid', name: 'user-profile', component: UserProfile,children:[
        { path: 'history', name: 'view-history', component: viewHistory },// 浏览历史页
        { path: 'comment', name: 'comment', component: comment },// 我的评论页
        { path: 'videos', name: 'videos-mine', component: videosMine },// 我上传的视频页
        { path: 'updateInfo', name: 'update-info', component: updateInfo },// 用户信息更新页
        { path: '', component: videosMine },
      ]},// 用户中心页
    { path: '/upload', name: 'update-film', component: UpdateFilm},// 影片信息更新页
    { path: '/error', name: 'error', component: Error},// 错误页
    { path: '/**', redirect: '/index'}// 默认访问首页
  ]
})
