<!-- 顶部导航组件 -->
<!-- 使用说明：<top-bar></top-bar> -->
<template>
  <div id="topbar-wrap" :class="{ topCollapsed: isCollapse }">
    <el-row type="flex" justify="space-between">
      <el-col :span="5">
        <i class="el-icon-s-fold" :style="iconStyle" @click="toggleSiderBar"></i>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" class="row-right" justify="end" style="margin-right:-15px">
          <el-col :span="5">
            <a class="animated fadeIn">{{$t('m.topbar.sayHi')}}，{{ userName }}</a>
          </el-col>
          <el-col :span="2">
            <i class="fa fa-language" title="切换语言" @click="toggleLanguage"></i>
          </el-col>
          <el-col :span="2">
            <i
              :class="[isFullscreen? 'fa-compress': 'fa-arrows-alt','fa ']"
              title="全屏"
              @click="toggleFullscreen"
            ></i>
          </el-col>
          <el-col :span="2">
            <i class="fa fa-power-off logout" title="退出" @click.prevent="logout"></i>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import "@/assets/libs/screenfull.js";
import "../../../static/css/iconfont.css";
export default {
  name: "topbar",
  data() {
    return {
      userName: "",
      isFullscreen: false
    };
  },
  mounted() {
    this.userName = this.$store.state.user.userName;
    console.log(this.userName);
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
    iconStyle() {
      return {
        display: "block",
        width: "20px",
        transform: this.isCollapse ? "rotate(0deg)" : "rotate(180deg)"
      };
    }
  },
  methods: {
    toggleSiderBar() {
      this.$store.commit("toggleSiderBar");
    },
    toggleLanguage() {
      let locale = this.$i18n.locale;
      locale === "zh" ? (this.$i18n.locale = "en") : (this.$i18n.locale = "zh");
      let info = locale === "en" ? "切换成功" : "change language successfully";
      this.$message.success(info);
    },
    toggleFullscreen() {
      if (!screenfull.enabled) {
        this.$message.warning("您的浏览器不支持全屏");
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = !screenfull.isFullscreen;
    },
    logout() {
      localStorage.clear();
      this.$bus.$emit("stopMusic");
      this.$router.push("signin");
    }
  },
  watch: {
    $route(to, from) {
      this.pathName = this.$route.path.substring(1);
      this.nowPath = this.$route.path;
    }
  }
};
</script>
<style scoped type="css">
#topbar-wrap {
  overflow: hidden;
  border-bottom: 1px solid #efefef;
  background: #fff;
  color: #353d47;
  padding: 0 15px;
  z-index: 4;
  box-sizing: border-box;
}
#topbar-wrap a {
  line-height: 60px;
}
#topbar-wrap i {
  font-size: 20px;
  line-height: 60px;
  transition: all 0.5s;
}
#topbar-wrap i:hover {
   cursor: pointer;
}
#topbar-wrap .fa-language:hover {
  transform: rotateY(180deg);
}
#topbar-wrap .logout {
  text-decoration: none;
}
.row-right > div {
  text-align: center;
}
</style>
