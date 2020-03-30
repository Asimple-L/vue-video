<template>
  <div>
    <!-- 这是侧导航 -->
    <side-bar></side-bar>
    <div class="con-wrap" :class="{conCollapse: isCollapse}">
      <!-- 这是顶部导航 -->
      <top-bar></top-bar>
      <!-- 这是组件要插入的地方 -->
      <router-view class="page-component-wrap animated fadeIn"></router-view>
    </div>
  </div>
  <!--<el-container>-->
    <!--<div id="sidebar-wrap" style="width: 14%;" :class="{ collapsed: isCollapse}">-->
      <!--<el-menu-->
        <!--default-active="1"-->
        <!--@open="handleOpen"-->
        <!--@close="handleClose"-->
        <!--:collapse="isCollapse"-->
        <!--background-color="#545c64"-->
        <!--text-color="#fff"-->
        <!--active-text-color="#ffd04b">-->
        <!--<el-menu-item index="-1" class="icon-back" @click="changeCollapse()">-->
          <!--<i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>-->
          <!--<span slot="title" v-if="isCollapse">展开</span>-->
        <!--</el-menu-item>-->

        <!--<template v-for="item in menu">-->
            <!--&lt;!&ndash; 多级菜单外壳 &ndash;&gt;-->
            <!--<el-submenu-->
              <!--v-if="item.children.length !== 0"-->
              <!--:index="item.router"-->
              <!--:key="item.router">-->

              <!--&lt;!&ndash; 一级菜单包裹层 &ndash;&gt;-->
              <!--<template slot="title">-->
                <!--<i :class="item.icon"></i>-->
                <!--<span slot="title">{{langType === 'en'? item.name_en: item.name}}</span>-->
              <!--</template>-->

              <!--&lt;!&ndash; 二级菜单选项 &ndash;&gt;-->
              <!--<el-menu-item v-for="child in item.children" :index="child.router" :key="child.router">-->
                <!--<i class="fa fa-long-arrow-right"></i>-->
                <!--<span slot="title">{{langType === 'en'? child.name_en: child.name}}</span>-->
              <!--</el-menu-item>-->
            <!--</el-submenu>-->

            <!--&lt;!&ndash; 单级菜单 &ndash;&gt;-->
            <!--<el-menu-item v-else :index="item.router" :key="item.router">-->
              <!--<i :class="item.icon"></i>-->
              <!--<span slot="title">{{langType === 'en'? item.name_en: item.name}}</span>-->
            <!--</el-menu-item>-->
          <!--</template>-->

      <!--</el-menu>-->
    <!--</div>-->
    <!--<div class="con-wrap" :class="{conCollapse: isCollapse}">-->
      <!--&lt;!&ndash; 这是顶部导航 &ndash;&gt;-->
      <!--<manager-header></manager-header>-->
      <!--&lt;!&ndash; 这是组件要插入的地方 &ndash;&gt;-->
      <!--<router-view class="page-component-wrap animated fadeIn"></router-view>-->
    <!--</div>-->

    <!--&lt;!&ndash;<el-main>&ndash;&gt;-->
      <!--&lt;!&ndash;<router-view></router-view>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-main>&ndash;&gt;-->
  <!--</el-container>-->
</template>

<script>
  import TopBar from '@/components/manager/TopBar'
  import SideBar from '@/components/manager/SideBar'
    export default {
      name: "manager-page",
      data() {
          return {
            // isCollapse: false, // 左边导航栏是否折叠展示
            menu: [],// 菜单动态配置
          }
      },
      components: {
        'top-bar': TopBar,
        'side-bar': SideBar
      },
      mounted() {
        this.init();
      },
      methods: {
        init() {
          this.$store.state.fullscreenLoading = false;
          this.$store.state.activeIndex = '7';

          console.log(this.menu);
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        isCollapse() {
          return this.$store.state.common.isCollapse
        }
        // changeCollapse() {// 切换折叠状态
        //   this.isCollapse = !this.isCollapse;
        // }
      }
    }
</script>

<style type="scss">
  @import "../../assets/css/manager/global.scss";
  .el-header {
    display: none;
  }
  .icon-back {
    text-align: right;
    height: 30px;
    line-height:2;
  }
  .con-wrap {
     padding-left: 180px;
     transition: all 0.3s;
     h3 {
       margin-top: 0;
       color: #324157;
     }
     .page-component-wrap {
       padding: 10px;
     }
   }
  .con-wrap.conCollapse {
    padding-left: 64px;
    transition: all 0.3s;
  }
</style>
