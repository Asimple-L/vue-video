<template>
  <div>
    <el-container ref="homePage">
      <el-header :class="{manager: $store.state.headerDisplay}">
        <el-menu
          :default-active="$store.state.activeIndex"
          class="el-menu-header"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <a href="javascript:void(0)" @click="goIndexPage">欢迎来到爱视最新影片资源</a>
          </el-menu-item>
          <el-menu-item index="2">
            <a @click="toNote()">留言</a>
          </el-menu-item>
          <el-menu-item index="3">
            <a @click="collect" href="javascript:void(0)">收藏网站</a>
          </el-menu-item>
          <!--  用户信息在这里  -->
          <template v-if="$store.state.user!==null">
            <el-menu-item>
              <el-tooltip class="item" effect="dark" :content="$store.state.user.isVip!==0?$moment($store.state.user.expireDate).format('YYYY-MM-DD HH:mm:ss')+'到期':'你的车开到'+$moment($store.state.user.expireDate).format('YYYY-MM-DD HH:mm:ss')+'没油了,请加油后继续上路！'" placement="bottom">
                <a href="#">{{ $store.state.user.userName }}</a>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="-1">
              <a href="https://w.url.cn/s/AGHnGAE"  target="_blank">加点油</a>
            </el-menu-item>
            <el-menu-item index="4">
              <a class="nav-link" @click="showUserVipCode=true"  href="javascript:void(0)">
                使用加油卡
              </a>
            </el-menu-item>
            <el-dialog title="使用加油卡" :visible.sync="showUserVipCode" center>
              <el-form>
                <el-form-item label="加油卡号" :label-width="formLabelWidth">
                  <el-input v-model="vipCode" autocomplete="off" placeholder="请输入你的加油卡号"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelShowUserVipCode">取 消</el-button>
                <el-button type="primary" @click="useVipCode">确认使用</el-button>
              </div>
            </el-dialog>
            <el-menu-item index="5">
              <a @click="toProfile($store.state.user.id)">个人中心</a>
            </el-menu-item>
            <el-menu-item index="-2">
              <a @click="userLoginOut"  href="javascript:void(0)">退出</a>
            </el-menu-item>
            <el-menu-item index="7" v-if="$store.state.user.isManager===1">
              <a @click="goBackendPage()"  href="javascript:void(0)">后台管理</a>
            </el-menu-item>
          </template >
          <template v-else>
            <el-menu-item index="6">
              <a type="text" @click="$store.state.dialogLoginModelVisible = true" href="javascript:void(0)">登录/注册</a>
            </el-menu-item>
            <el-dialog title="登录" :visible.sync="$store.state.dialogLoginModelVisible" center>
              <el-form :model="form" :rules="loginRules" ref="form">
                <el-form-item label="用户名/邮箱" :label-width="formLabelWidth" prop="account">
                  <el-input v-model="form.account" autocomplete="off" placeholder="请输入用户名/邮箱" @change="userLogin"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                  <el-input v-model="form.password" auto-complete="off" placeholder="请输入密码" show-password @change="userLogin"></el-input>
                </el-form-item>
                <el-form-item>
                  <p style="text-align:center;">
                    没有账号，去
                    <a style="color:blue;" @click="registerPage" href="Javascript:void(0)">
                      注册
                    </a>
                  </p>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelUserLogin">取 消</el-button>
                <el-button type="primary" @click="userLogin">登 录</el-button>
              </div>
            </el-dialog>
          </template>
          <el-menu-item disabled>|</el-menu-item>
          <el-menu-item index="9">
            <a href="javascript:void(0)" @click="goIndexPage">首页</a>
          </el-menu-item>
          <el-menu-item v-for="(vo, index) in cataLogList" :key="index" :index="(index+10+'')" >
            <a @click="toSearchPage(vo.id)">{{ vo.name }}</a>
          </el-menu-item>
        </el-menu>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
  import { getIndexHeaderInfo, login, dealResult, vipCodeVerification,logOut } from "../api/api";
  import { goPage, goPageParam } from "../util/index";
export default {
  data() {
    return {
      code: "000000",
      clientHeight:'',
      cataLogList: [],
      form: {
        account: '',
        password: '',
      },
      formLabelWidth: '120px',
      loginRules: {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      vipCode: '',
      showUserVipCode: false,
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
      getIndexHeaderInfo().then(res => {
        const data = dealResult(res.data);
        if( null!==data ) {
          this.cataLogList = data.cataLogList;
          this.$store.state.user = data.user;
        }
      }).catch(function (err) {
        console.log(err);
      })
    },
    handleSelect(key) {// 点击后显示下划线
      if( null===key || ''===key.trim() ) {
        key = 9;
      }
      this.$store.state.activeIndex = ''+key;
    },
    collect() {// 点击收藏方法
      this.goIndexPage();
      this.$message({
        message: '请点击Ctrl+D收藏',
        duration: 2000,
      });
    },
    changeFixed(clientHeight){
      this.$refs.homePage.$el.style.height = clientHeight-20+'px';
    },
    userLogin() {// 用户登录
      if( !( this.form.account && this.form.password) ) {
        return ;
      }
      login(this.form).then( res => {
        const data = dealResult(res.data);
        if( null!==data ) {
          this.$store.state.user = data.user;
          this.cancelUserLogin();
        }
      }).catch( function (err) {
        console.log(err);
      })
    },
    useVipCode() {// 使用加油卡
      vipCodeVerification(this.vipCode).then( res => {
        const data = dealResult(res.data);
        if( null !== data ) {
          this.$message.success({
            message: '加油成功,继续前行!',
            duration: 2000,
          });
          this.showUserVipCode = false;
        }
      }).catch(function (err) {
        console.log(err);
      })
    },
    cancelShowUserVipCode() {// 取消使用
      this.showUserVipCode = false;
      this.vipCode = '';
    },
    userLoginOut() {// 用户登出
      logOut().then( res => {
        this.$store.state.user = null;
        this.$message('登出成功!');
        this.goIndexPage();
      }).catch(function (err) {
        console.log(err);
      })
    },
    registerPage() {// 去注册
      this.$router.push('register');
      this.$store.state.dialogLoginModelVisible = false;
    },
    goIndexPage() {// 去首页
      this.$store.state.activeIndex = ''+9;
      goPage('/');
    },
    cancelUserLogin() {// 取消登录
      this.$store.state.dialogLoginModelVisible = false;
      this.$refs.form.resetFields();
    },
    toSearchPage(cataLog_id) {// 影片搜索页
      const param = {cataLog_id: cataLog_id};
      goPageParam("/xl", param);
    },
    toNote() {// 留言页
      goPage('/note');
    },
    toProfile(user_id) {// 个人中心页面
      goPage("/userProfile/"+user_id)
    },
    goBackendPage() {// 后台管理页面
      let routeData = this.$router.resolve({ path: '/manager' });
      window.open(routeData.href, '_blank');
    }
  },
  components: {
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
