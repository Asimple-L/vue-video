<template>
  <div>
    <!-- 这是侧导航 -->
    <side-bar></side-bar>
    <div class="con-wrap" :class="{conCollapse: $store.state.isCollapse}">
      <!-- 这是顶部导航 -->
      <top-bar></top-bar>
      <!-- 这是组件要插入的地方 -->
      <router-view class="page-component-wrap animated fadeIn"></router-view>
    </div>
  </div>
</template>

<script>
  import TopBar from '@/components/manager/TopBar';
  import SideBar from '@/components/manager/SideBar';
  import { goPage } from "../../util/index";
    export default {
      name: "manager-page",
      data() {
          return {
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
        init() {// 初始化检查
          this.$store.state.fullscreenLoading = false;
          // TODO 尝试在这里做下鉴权
          this.$store.state.activeIndex = '7';
          this.$store.state.headerDisplay = true;
        },
      }
    }
</script>

<style type="scss">
  @import "../../assets/css/manager/global.scss";
  .el-header.manager {
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
