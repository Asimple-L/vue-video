/**
 * Created by Asimple on 2019/10/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  // 登录框是否显示
  dialogLoginModelVisible: false,
  // 首页头部active栏
  activeIndex: '9',
  // 登录的用户信息
  user: {id: '', userName: '',isVip: '', isManager: '', expireDate: '', userEmail: ''},
  // 是否显示加载中
  fullscreenLoading: true,
  // 后台管理是否折叠
  isCollapse: false,
  // 首页头部是否显示
  headerDisplay: false,
  // 后端菜单
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
      router: "/catalog",
      icon: "el-icon-s-operation",
      children: [
        {
          name: "分类管理",
          name_en: "catalog manager",
          router: "catalog",
          relative: true,
          icon: "el-icon-right"
        },
        {
          name: "年份管理",
          name_en: "decade manager",
          router: "decade",
          relative: true,
          icon: "el-icon-right"
        },
        {
          name: "地区管理",
          name_en: "loc manager",
          router: "loc",
          relative: true,
          icon: "el-icon-right"
        },
        {
          name: "等级管理",
          name_en: "level manager",
          router: "level",
          relative: true,
          icon: "el-icon-right"
        }
      ]
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
  // 首页横幅展示
  banner: [
    {
      name: "第一个横屏广告",
      title: "我命由我不由天", // 图片标题
      url: "http://localhost:7001/static/img/1.jpg",
      link: "http://localhost:7001/#/detail/f39c979857a4c8c50157a9020fb8001d", // 跳转地址
      content: "", // 展示的文字
    },
    {
      name: "第二个横屏广告",
      title: "七夕", // 图片标题
      url: "http://localhost:7001/static/img/2.jpg",
      link: "http://localhost:7001/#/detail/f39c979857ad7e8c0157ae8ad2c80012", // 跳转地址
      content: "", // 展示的文字
    },
    {
      name: "第三个横屏广告",
      title: "", // 图片标题
      url: "http://localhost:7001/static/img/3.jpg",
      link: "http://localhost:7001/#/detail/f39c979857b48a2a0157bddaa8f70056", // 跳转地址
      content: "", // 展示的文字
    },
    {
      name: "第四个横屏广告",
      title: "", // 图片标题
      url: "http://localhost:7001/static/img/4.jpg",
      link: "http://localhost:7001/#/detail/f39c979857ad7e8c0157b39c4f9b002a", // 跳转地址
      content: "", // 展示的文字
    },
    {
      name: "第五个横屏广告",
      title: "", // 图片标题
      url: "",
      link: "https://www.baidu.com", // 跳转地址
      content: "这是一个纯文字的横屏广告", // 展示的文字
    }
  ],
};

export default new Vuex.Store({
  state
})
