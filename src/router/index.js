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

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/index'},
    { path: '/register', name: 'register', component: Register },
    { path: '/index', name: 'index', component: Index},
    { path: '/detail/:filmId', name: 'film-detail', component: FilmDetail},
    { path: '/xl', name: 'film-list', component: FilmList},
    { path: '/note', name: 'note', component: Note},
    { path: '/userProfile/:uid', name: 'user-profile', component: UserProfile},
    { path: '/upload', name: 'update-film', component: UpdateFilm},
    { path: '/error', name: 'error', component: Error},
    { path: '/**', redirect: '/index'}
  ]
})
