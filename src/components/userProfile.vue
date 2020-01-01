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
            <!-- END PROFILE HEADER -->
            <!-- PROFILE DETAIL -->
            <div class="profile-detail">
              <div class="profile-info">
                <h4 class="heading">用户信息</h4>
                <ul class="list-unstyled list-justify">
                  <li>观看视频数目 <span>{{viewCount}}</span></li>
                  <li>邮箱 <span>{{$store.state.user.userEmail}}</span></li>
                </ul>
              </div>
            </div>
            <!-- END PROFILE DETAIL -->
          </div>

          <!-- 右边 -->
          <div class="profile-right">
            <h4 class="heading">用户权限</h4>
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
            <!-- TABBED CONTENT -->
            <div class="custom-tabs-line tabs-line-bottom left-aligned">
              <ul class="nav" role="tablist">
                <li class="active"><a href="#video-mine" role="tab" data-toggle="tab">我的视频</a></li>
                <li><a href="#view-history" role="tab" data-toggle="tab">浏览记录</a></li>
                <li><a href="#my-comment" role="tab" data-toggle="tab">我的评论</a></li>
                <li><a href="#update-info" role="tab" data-toggle="tab">修改密码</a></li>
              </ul>
            </div>

            <!-- 详细信息 -->
            <div class="tab-content">
              <div class="tab-pane in active" id="video-mine">
                <div class="text-center" style="width: 100%;">
                  <!--<a href="/video/profile/share">-->
                  <a href="#">
                    <button class="btn-primary btn" style="border-radius: 15%;">我要上传</button>
                  </a>
                </div>
                <!--<c:if test="${films!=null && films.size()>0}">-->
                  <div style="margin: 10px auto;">
                    <ul class="film-list" id="my-films">
                      <!--<c:forEach items="${films}" var="list">-->
                        <!--<li>-->
                          <!--<a href="/video/profile/share.html?film_id=${list.id}">-->
                            <!--<div title="${list.name}"><img src="${list.image}" style="height: 175px;width: 126px;"></div>-->
                          <!--</a>-->
                          <!--<div class="film-info">-->
                            <!--<a href="/video/profile/share.html?film_id=${list.id}" title="${list.name}"><p>${list.name}</p></a>-->
                            <!--<p>${list.onDecade}-${list.typeName}</p>-->
                          <!--</div>-->
                        <!--</li>-->
                      <!--</c:forEach>-->
                    </ul>
                  </div>
                  <div class="margin-top-30 text-center">
                    <nav aria-label="...">
                      <ul class="pager" id="my-films-page">
                        <!-- 分页 -->
                      </ul>
                    </nav>
                  </div>
                <!--</c:if>-->
              </div>
              <!-- 浏览历史 -->
              <div class="tab-pane" id="view-history">
                <!--<c:if test="${viewHistoryList!=null && viewHistoryList.size()>0}">-->
                  <div style="margin: 10px auto;">
                    <ul class="film-list" id="my-view-history">
                      <!--<c:forEach items="${viewHistoryList}" var="list">-->
                        <!--<li>-->
                          <!--<a href="/video/xl/detail.html?film_id=${list.film.id}">-->
                            <!--<div title="上次浏览时间:<f:formatDate value="${list.date_view}" pattern="yyyy-MM-dd HH:mm:ss" />"><img src="${list.film.image}" style="height: 175px;width: 126px;"></div>-->
                  <!--</a>-->
                  <!--<div class="film-info">-->
                    <!--<a href="/video/xl/detail.html?film_id=${list.id}" title="${list.film.name}"><p>${list.film.name}</p></a>-->
                    <!--<p>${list.film.onDecade}-${list.film.typeName}</p>-->
                  <!--</div>-->
                  <!--</li>-->
                  <!--</c:forEach>-->
                  </ul>
              </div>
              <div class="margin-top-30 text-center">
                <nav aria-label="...">
                  <ul class="pager" id="my-view-history-page">
                    <!-- 分页 -->
                  </ul>
                </nav>
              </div>
              <!--</c:if>-->
            </div>
            <!-- 我的评论 -->
            <div class="tab-pane in" id="my-comment">
              <ul class="list-unstyled activity-timeline">
                <!--<c:forEach items="${comments}" var="list">-->
                  <!--<li>-->
                    <!--<i class="fa fa-comment activity-icon"></i>-->
                    <!--<p>${list.context} <span class="timestamp"><f:formatDate value="${list.date_update}" pattern="yyyy-MM-dd HH:mm:ss" /></span></p>-->
                  <!--</li>-->
                <!--</c:forEach>-->
              </ul>
              <!--  分页 -->
            </div>
            <!--修改资料-->
            <div class="tab-pane in" id="update-info">
              <div class="margin-top-30 text-center">
                <label for="oldPwd" class="control-label sr-only">旧密码：</label>
                <input type="password" class="form-control" name="oldPwd" id="oldPwd" placeholder="旧密码" autocomplete="off">
              </div>
              <div class="margin-top-30 text-center">
                <label for="rePwd" class="control-label sr-only">再次输入：</label>
                <input type="password" class="form-control" name="rePwd" id="rePwd" placeholder="再次输入旧密码" autocomplete="off">
              </div>
              <div class="margin-top-30 text-center">
                <label for="newPwd" class="control-label sr-only">新密码：</label>
                <input type="password" class="form-control" name="newPwd" id="newPwd" placeholder="新密码" autocomplete="off">
              </div>
              <div class="margin-top-30 text-center"><a href="javascript:;" class="btn btn-default" onclick="updatePassword()">提交修改</a></div>
            </div>
          </div>

            <!-- END TABBED CONTENT -->
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
            }
          }).catch(function (err) {
            console.log(err);
          });
        },
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
        getInitParam() {
          return {
            uid: this.loginUser.id
          }
        },
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
        }
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
