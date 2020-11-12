<template>
  <el-main>
    <div class="main" style="float: none;width: 100%;">
      <div class="panel panel-profile">
        <div class="clearfix">
          <!-- 左边 -->
          <div class="profile-left">
            <div class="profile-header">
              <div class="overlay"></div>
              <div class="profile-main">
                <img src=""
                     class="img-circle headImg"
                     style="border-radius: 50%;"
                     :alt="$store.state.user.userName">
                <canvas id="headImg" style="display:none"></canvas>
                <h3 class="name">{{$store.state.user.userName}}</h3>
                <span class="online-status status-available"
                      v-if="$store.state.user.isVip">
                  VIP</span>
              </div>
              <div class="profile-stat">
                <el-row>
                  <el-col :span="8" class="stat-item">
                    {{ myFilmsCount }} <span>上传视频</span>
                  </el-col>
                  <el-col :span="8" class="stat-item">
                    {{ commentCount }} <span>评论</span>
                  </el-col>
                  <el-col :span="8" class="stat-item">
                    {{ totalLike }} <span>点赞</span>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="profile-detail">
              <div class="profile-info">
                <h4 class="heading">用户信息</h4>
                <ul class="list-unstyled list-justify">
                  <li>观看视频数目 <span>{{viewCount}}</span></li>
                  <li>邮箱 <span>{{$store.state.user.userEmail}}</span></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 右边 -->
          <div class="profile-right">
            <h4 class="heading padding-left-10">用户权限</h4>
            <div class="awards">
              <el-row>
                <el-col :span="6" class="center">
                  <div class="award-item">
                    <div class="hexagon">
                      <span class="lnr lnr-sun award-icon"></span>
                    </div>
                    <span>视频发布</span>
                  </div>
                </el-col>
                <el-col :span="6" class="center">
                  <div class="award-item">
                    <div class="hexagon">
                      <span class="lnr lnr-clock award-icon"></span>
                    </div>
                    <span>观看视频</span>
                  </div>
                </el-col>
                <el-col :span="6" class="center">
                  <div class="award-item">
                    <div class="hexagon">
                      <span class="lnr lnr-magic-wand award-icon"></span>
                    </div>
                    <span>评论</span>
                  </div>
                </el-col>
                <el-col :span="6" class="center">
                  <div class="award-item">
                    <div class="hexagon">
                      <span class="lnr lnr-heart award-icon"></span>
                    </div>
                    <span>资料管理</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 栏目 -->
            <div class="custom-tabs-line tabs-line-bottom left-aligned">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">
                  <router-link :to="{ name: 'videos-mine' }">
                    <i class="el-icon-film"></i> 我的视频
                  </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                  <router-link :to="{ name: 'view-history' }">
                    <i class="el-icon-view"></i> 浏览记录
                  </router-link>
                </el-menu-item>
                <el-menu-item index="3">
                  <router-link :to="{ name: 'comment' }">
                    <i class="el-icon-s-comment"></i> 我的评论
                  </router-link>
                </el-menu-item>
                <el-menu-item index="4">
                  <router-link :to="{ name: 'update-info' }">
                    <i class="el-icon-setting"></i> 修改密码
                  </router-link>
                </el-menu-item>
              </el-menu>
            </div>

            <!-- 详细信息 -->
            <div class="tab-content">
              <router-view></router-view>
            </div>

          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import { userProfile, dealResult } from '../api/api'
import { goPage } from '../util/index'
import '../assets/js/jquery-2.0.0.min.js'
import '../assets/plugins/bootflat-admin/js/bootstrap.min.js'
import '../assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js'
import '../assets/plugins/bootflat-admin/js/klorofil-common.js'
export default {
  name: 'user-profile',
  data () {
    return {
      loginUser: { // 登录用户
        id: this.$route.params.uid,
        name: ''
      },
      myFilmsCount: 0, // 上传视频数
      commentCount: 0, // 评论数据
      totalLike: 0, // 点赞数
      viewCount: 0, // 观看视频数目
      filmList: [], // 上传的视频列表
      activeIndex: '1'// 选择的页面
    }
  },
  mounted () {
    if (this.checkUid()) {
      this.init()
      this.textToImg(this.$store.state.user.userName)
    }
  },
  methods: {
    init () {
      const param = this.getInitParam()
      userProfile(param).then(res => {
        const data = dealResult(res.data)
        if (data !== null) {
          this.myFilmsCount = data.myFilmsCount
          this.commentCount = data.commentCount
          this.viewCount = data.viewCount
          this.totalLike = data.totalLike
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 头像显示处理函数
    textToImg (uname) {
      let name = uname.charAt(0).toUpperCase()
      let fontSize = 37
      let fontWeight = 'bold'

      let canvas = document.getElementById('headImg')
      canvas.width = 75
      canvas.height = 75
      let context = canvas.getContext('2d')
      context.fillStyle = 'rgb(153, 169, 191)'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#fff'
      context.font = fontWeight + ' ' + fontSize + 'px sans-serif'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(name, fontSize, fontSize)
      $('.headImg').attr('src', canvas.toDataURL('image/png'))
    },
    // 初始化参数获取
    getInitParam () {
      return {
        uid: this.loginUser.id
      }
    },
    // 检查是否登录
    checkUid () {
      if (this.loginUser.id == null ||
            this.loginUser.id.trim() === '' ||
            !this.$store.state.user.id) {
        this.$message.error({
          message: '系统错误,请重试!',
          duration: 2000
        })
        goPage('/index')
        return false
      } else {
        return true
      }
    },
    // 进入详情页
    detailPage (filmId) {
      let routeData = this.$router.resolve({ path: '/detail/' + filmId })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>
  @import "../assets/plugins/font-awesome/css/font-awesome.min.css";
  @import "../assets/plugins/linearicons/style.css";
  @import "../assets/css/manager/main.css";
  @import "../assets/css/index/profile.css";
</style>
