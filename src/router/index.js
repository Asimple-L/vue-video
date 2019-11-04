import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Register from '@/components/register'
import FilmDetail from '@/components/filmDetail'
import Error from '@/components/error'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/index'},
    { path: '/register', name: 'register', component: Register },
    { path: '/index', name: 'index', component: Index},
    { path: '/detail/:filmId', name: 'film-detail', component: FilmDetail},
    { path: '/error', name: 'error', component: Error},
    { path: '/**', redirect: '/index'}
  ]
})
