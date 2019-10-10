import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import moment from 'moment'
import store from './vuex/store'
import './assets/css/index.css'

Vue.config.productionTip = false;
Vue.prototype.HOME='http://localhost:8080/video/';
Vue.use(ElementUI);
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
