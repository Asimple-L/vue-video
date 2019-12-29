/**
 * Created by Asimple on 2019/10/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  dialogLoginModelVisible: false,
  activeIndex: '9',
  user: {id: '', userName: '',isVip: '', isManager: '', expireDate: '', userEmail: ''},
  fullscreenLoading: true,
};

export default new Vuex.Store({
  state
})
