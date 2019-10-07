<template>
  <div>
    <el-container ref="homePage">
      <el-header>
        <el-menu
          :default-active="$store.state.activeIndex"
          class="el-menu-header"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <a href="/">欢迎来到爱视最新影片资源</a>
          </el-menu-item>
          <el-menu-item index="2">
            <a href="/note">留言</a>
          </el-menu-item>
          <el-menu-item index="3">
            <a @click="collect" href="#">收藏网站</a>
          </el-menu-item>
          <!--  用户信息在这里  -->
          <el-menu-item v-if="false">
            用户登录后显示的信息
          </el-menu-item>
          <el-menu-item v-else>
            <!-- 用户未登录显示的信息  -->
            <a type="text" @click="$store.state.dialogLoginModelVisible = true" href="javascript:void(0)">登录/注册</a>
          </el-menu-item>
          <el-dialog title="登录" :visible.sync="$store.state.dialogLoginModelVisible" center>
            <el-form :model="form">
              <el-form-item label="用户名/邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" placeholder="请输入用户名/邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" auto-complete="off" placeholder="请输入密码" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <p style="text-align:center;">
                  没有账号，去<a style="color:blue;" href="#">注册</a>
                </p>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="$store.state.dialogLoginModelVisible = false">取 消</el-button>
              <el-button type="primary" @click="$store.state.dialogLoginModelVisible = false">登 录</el-button>
            </div>
          </el-dialog>
          <el-menu-item disabled>|</el-menu-item>
          <el-menu-item index="9">
            <a href="/">首页</a>
          </el-menu-item>
          <el-menu-item v-for="(vo, index) in cataLogList" :key="index" :index="(index+10+'')" >
            <!--<a :href="'xl/1.html?cataLog_id='+ vo.id ">{{ vo.name }}</a>-->
            <a href="#">{{ vo.name }}</a>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-scrollbar>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-scrollbar>
      <el-footer>
        <video-footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {getIndexData} from "../api/api";
  import videoFooter from '@/components/footer.vue';
export default {
  data() {
    return {
      code: "000000",
      clientHeight:'',
      cataLogList: [],
      form: {
        name: '',
        password: '',
      },
      formLabelWidth: '120px',
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },
  mounted: function () {
    this.init();
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    }
  },
  methods: {
    init() {
      getIndexData().then(res => {
        console.log('header info ...');
        console.log(res);
        this.cataLogList = res.data.data.cataLogList;
      }).catch(function (err) {
        console.log(err);
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    collect() {
      this.$message({
        message: '请点击Ctrl+D收藏',
        duration: 2000,
      });
    },
    changeFixed(clientHeight){
      this.$refs.homePage.$el.style.height = clientHeight-20+'px';
    },
  },
  components: {
    videoFooter
  }
}
</script>

<style scoped>
  .el-header, .el-footer{
    padding: 0px;
  }
  .el-main {
    padding: 0px 10px;
  }
</style>
