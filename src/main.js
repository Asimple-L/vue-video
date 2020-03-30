import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import moment from 'moment'
import store from './vuex/store'
import './assets/css/index.css'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'font-awesome/css/font-awesome.css'
import 'videojs-contrib-hls'
import VideoPlayer from 'vue-video-player'
import i18n from './lang'

Vue.use(VideoPlayer);
Vue.config.productionTip = false;
Vue.prototype.HOME='http://localhost:8080/video/';
Vue.use(ElementUI);
Vue.prototype.$moment = moment;
Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
});
