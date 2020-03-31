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
  isCollapse: false,
  headerDisplay: false,
  menu: [
    {
      name: "后台首页",
      name_en: "index",
      router: "index",
      icon: "el-icon-s-home",
      relative: true,
      children: []
    },
    {
      name: "影音管理",
      name_en: "video",
      router: "/video",
      icon: "el-icon-film",
      children: [
        {
          name: "所有影片",
          name_en: "all film",
          router: "film",
          relative: true,
          icon: "el-icon-right"
        },
        {
          name: "添加影视",
          name_en: "add film",
          router: "/upload",
          relative: false,
          icon: "el-icon-right"
        }
      ]
    },
    {
      name: "目录管理",
      name_en: "catalog",
      router: "catalog",
      icon: "el-icon-s-operation",
      relative: true,
      children: []
    },
    {
      name: "账户管理",
      name_en: "account",
      router: "/account",
      icon: "el-icon-user",
      children: [
        {
          name: "用户管理",
          name_en: "user manager",
          router: "user",
          relative: true,
          icon: "el-icon-right"
        },
        {
          name: "VIP管理",
          name_en: "VIP manager",
          router: "vip",
          relative: true,
          icon: "el-icon-right"
        }
      ]
    },
    {
      name: "数据管理",
      name_en: "data",
      router: "data",
      icon: "el-icon-s-data",
      relative: true,
      children: []
    }
  ],
};

export default new Vuex.Store({
  state
})
