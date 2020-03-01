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
              <ul class="nav" role="tablist">
                <li class="active">
                  <router-link :to="{ name: 'videos-mine' }">我的视频</router-link>
                  <!--<a href="#video-mine" role="tab" data-toggle="tab">我的视频</a>-->
                </li>
                <li>
                  <a href="#view-history" role="tab" data-toggle="tab">浏览记录</a>
                </li>
                <li>
                  <a href="#my-comment" role="tab" data-toggle="tab">我的评论</a>
                </li>
                <li>
                  <a href="#update-info" role="tab" data-toggle="tab">修改密码</a>
                </li>
              </ul>
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
  import { userProfile, dealResult } from '../api/api';
  import { goPage, goPageParam } from "../util/index";
  import "../assets/js/jquery-2.0.0.min.js";
  import "../assets/plugins/bootflat-admin/js/bootstrap.min.js";
  import "../assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js";
  import "../assets/plugins/bootflat-admin/js/klorofil-common.js";
    export default {
      name: "user-profile",
      data() {
        return {
          loginUser: { // 登录用户
            id: this.$route.params.uid,
            name: ""
          },
          myFilmsCount: 0, // 上传视频数
          commentCount: 0, // 评论数据
          totalLike: 0, // 点赞数
          viewCount: 0, // 观看视频数目
          filmList: [],// 上传的视频列表
        }
      },
      mounted() {
        if( this.checkUid() ) {
          this.init();
          console.log(this.$store.state.user.userName);
          this.textToImg(this.$store.state.user.userName);
        }
      },
      methods: {
        init() {
          const param = this.getInitParam();
          userProfile(param).then( res => {
            const data = dealResult(res.data);
            console.log(data);
            if( data!==null ) {
              this.myFilmsCount = data.myFilmsCount;
              this.commentCount = data.commentCount;
              this.viewCount = data.viewCount;
              this.totalLike = data.totalLike;
              // this.filmList = data.films;
            }
          }).catch(function (err) {
            console.log(err);
          });
        },
        // 头像显示处理函数
        textToImg(uname) {
          let name = uname.charAt(0).toUpperCase();
          let fontSize = 37;
          let fontWeight = 'bold';

          let canvas = document.getElementById('headImg');
          let img1 = document.getElementById('headImg');
          canvas.width = 75;
          canvas.height = 75;
          let context = canvas.getContext('2d');
          context.fillStyle = 'rgb(153, 169, 191)';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.fillStyle = '#fff';
          context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
          context.textAlign = 'center';
          context.textBaseline="middle";
          context.fillText(name, fontSize, fontSize);
          $('.headImg').attr('src',canvas.toDataURL("image/png"));
        },
        // 初始化参数获取
        getInitParam() {
          return {
            uid: this.loginUser.id
          }
        },
        // 检查是否登录
        checkUid() {
          if( null==this.loginUser.id ||
            ''===this.loginUser.id.trim() ||
            !this.$store.state.user.id ) {
            this.$message.error({
              message: '系统错误,请重试!',
              duration: 2000,
            });
            goPage("/index");
            return false;
          } else {
            return true;
          }
        },
        // 进入详情页
        detailPage(filmId) {
          let routeData = this.$router.resolve({ path: '/detail/'+filmId });
          window.open(routeData.href, '_blank');
        },
      }
    }
</script>

<style scoped>
  @import "../assets/plugins/font-awesome/css/font-awesome.min.css";
  @import "../assets/plugins/linearicons/style.css";
  @import "../assets/css/manager/main.css";
  @import "../assets/css/index/profile.css";
  .film-list {
    width: 98%;
    height: auto;
    padding: 1%;
    overflow: hidden;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .film-list li {
    list-style: none;
    float: left;
    width: 104px;
    height: 220px;
    margin: 6px 36px 6px 6px;
  }
  .film-info {
    width: 98%;
    padding: 1%;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .pager li {
    display: inline-block;
  }
  .pager li>a, .pager li>span {
    display: inline-block;
    padding: 5px 14px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 15px;
  }
  .pager .disabled>a, .pager .disabled>a:focus, .pager .disabled>a:hover, .pager .disabled>span {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
  }
</style>
