<!-- 左侧导航组件 -->
<!-- 使用说明：<side-bar></side-bar> -->
<template>
  <div id="sidebar-wrap" :class="{ collapsed: $store.state.isCollapse }">
    <!-- 顶部图标 -->
    <h3 class="logo">
      <span class="rythm twist1">{{$store.state.isCollapse ? 'VIDEO': 'VIDEO BACKEND'}}</span>
    </h3>

    <!-- 循环生成侧栏菜单 -->
    <el-menu
      background-color="#3f4d67"
      text-color="#fff"
      default-active="index"
      :unique-opened="true"
      mode="vertical"
      :collapse="$store.state.isCollapse">
      <template v-for="item in menu">

        <!-- 多级菜单外壳 -->
        <el-submenu
          v-if="item.children.length !== 0"
          :index="item.router"
          :key="item.router">

          <!-- 一级菜单包裹层 -->
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{langType === 'en'? item.name_en: item.name}}</span>
          </template>

          <!-- 二级菜单选项 -->
          <el-menu-item
            v-for="child in item.children"
            :index="child.router"
            :key="child.router"
            @click="goPageByPath(child.router, child.relative)">
            <i class="fa fa-long-arrow-right"></i>
            <span slot="title">{{langType === 'en'? child.name_en: child.name}}</span>
          </el-menu-item>
        </el-submenu>

        <!-- 单级菜单 -->
        <el-menu-item
          v-else
          :index="item.router"
          :key="item.router"
          @click="goPageByPath(item.router, item.relative)">
          <i :class="item.icon"></i>
          <span slot="title">{{langType === 'en'? item.name_en: item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>

    <!-- 侧栏菜单下方图标 -->
    <div class="animated bounceInDown imgWrap">
      <img src="../../../static/img/player.gif" height="60px" class="gif rythm pulse3" @click="toggleDance">
    </div>
  </div>
</template>
<script>
import Rythm from 'rythm.js'
const rythm = new Rythm()
const music = require('../../../static/audio/romeostune.mp3')

export default {
  name: 'sidebar',
  data () {
    return {
      isMusicOn: false,
      menu: []
    }
  },
  computed: {
    langType () {
      return this.$i18n.locale
    }
  },
  created () {
    this.initRythm()
    this.$bus.$on('stopMusic', () => {
      this.isMusicOn = false
      rythm.stop()
    })
    // 初始化侧边栏
    this.menu = this.$store.state.menu
  },
  methods: {
    initRythm () {
      rythm.setMusic(music)
      rythm.addRythm('twist1', 'twist', 0, 10)
      rythm.addRythm('pulse3', 'pulse', 0, 10, {
        min: 0.75,
        max: 1.5
      })
    },
    toggleDance () {
      if (this.isMusicOn) {
        this.isMusicOn = false
        rythm.stop()
      } else {
        this.isMusicOn = true
        rythm.start()
      }
    },
    goPageByPath (router, relative) {
      if (!relative) {
        let routeData = this.$router.resolve({ path: router })
        window.open(routeData.href, '_blank')
      } else {
        this.$router.push({ path: '/manager/' + router })
      }
    }
  }
}
</script>
<style scoped type="css">
.logo {
  color: #fff;
  text-align: center;
  padding: 18px 0;
  margin: 0;
  height: 60px;
  box-sizing: border-box;
  cursor: pointer;
}
.el-submenu .el-menu-item {
  padding: 0 20px;
  min-width: 160px;
  padding-left: 26px !important;
}
.el-submenu .el-menu-item i {
  padding-right: 10px;
}
#sidebar-wrap {
  width: 180px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  transition: all 0.3s;
  background: #3f4d67;
  box-shadow: 0 0 15px rgba(0,0,0,0.6);
}
.el-menu {
  border-right: solid 0;
}
#sidebar-wrap .imgWrap {
  text-align: center;
  position: absolute;
  bottom: 30px;
  width: 100%;
}
#sidebar-wrap .imgWrap .gif {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  cursor: pointer;
}
#sidebar-wrap .imgWrap .gif :hover {
  cursor: pointer;
}
#sidebar-wrap.collapsed {
  width: 64px;
  transition: all 0.3s;
}
.el-menu {
  height: 100%;
}
.rythm.twist1 {
  display: block;
}
</style>
