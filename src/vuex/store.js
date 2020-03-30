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
  menu: [
    {
      name: "后台首页",
      name_en: "index",
      router: "index",
      icon: "el-icon-s-home",
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
          router: "/catalog",
          icon: "el-icon-right"
        },
        {
          name: "添加影视",
          name_en: "add film",
          router: "/upload",
          icon: "el-icon-right"
        }
      ]
    },
    {
      name: "目录管理",
      name_en: "catalog",
      router: "catalog",
      icon: "el-icon-s-operation",
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
          icon: "el-icon-right"
        },
        {
          name: "VIP管理",
          name_en: "VIP manager",
          router: "vip",
          icon: "el-icon-right"
        }
      ]
    },
    {
      name: "数据管理",
      name_en: "data",
      router: "data",
      icon: "el-icon-s-data",
      children: []
    }
  ],
};
/*
<!--<el-menu-item index="1">-->
          <!--<i class="el-icon-s-home"></i>-->
          <!--<span slot="title"> 后台首页</span>-->
        <!--</el-menu-item>-->
        <!--<el-submenu index="2">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-film"></i>-->
            <!--<span>影音管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="2-1">所有影片</el-menu-item>-->
          <!--<el-menu-item index="2-2">添加影视</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-menu-item index="3">-->
          <!--<i class="el-icon-s-operation"></i>-->
          <!--<span slot="title">目录管理</span>-->
        <!--</el-menu-item>-->
        <!--<el-submenu index="4">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-user"></i>-->
            <!--<span slot="title">账户管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="4-1">用户管理</el-menu-item>-->
          <!--<el-menu-item index="4-2">VIP管理</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-menu-item index="5">-->
          <!--<i class="el-icon-s-data"></i>-->
          <!--<span slot="title">数据管理</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="6" disabled>-->
          <!--<i class="el-icon-view"></i>-->
          <!--<span slot="title">日志监控</span>-->
        <!--</el-menu-item>-->
 */


export default new Vuex.Store({
  state
})
