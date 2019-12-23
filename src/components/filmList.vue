<template>
  <el-main>
    <el-row v-if="$store.state.user===null">
        <el-col :span="24">
          <marquee onmouseover='this.stop()' onmouseout='this.start()'>
            <a href="javascript:void(0)" @click="registerPage">注册</a>
            |
            <a @click="$store.state.dialogLoginModelVisible=true" href="javascript:void(0)">登录</a>
            后观看更多高清无码视频
          </marquee>
        </el-col>
      </el-row>
    <el-row>
      <el-col :span="4">
        <ul class="user-nav">
          <div class="user-nav-title">全部分类</div>
          <li
            v-for="(list, index) in cataLogList"
            v-bind:class="{'isCheckShow':list.id === cataLog_id}"
            @click="reloadPage('cataLog_id', list.id ,index+10+'')"
          >
            {{ list.name }}
          </li>
        </ul>
      </el-col>
      <el-col :span="20">
        <ul class="user-box-right-search" style="margin-top: 10px;">
          <li v-if="cataLogList!==null && cataLogList.length!==0">
            <div class="user-box-right-search-left">分类</div>
            <div class="user-box-right-search-right">
              <ul v-if="cataLogList!==null && cataLogList.length!==0">
                <li v-bind:class="{'search-info': cataLog_id===''}"
                    @click="reloadPage('cataLog_id', '', '')">全部</li>
                <li
                  v-for="(item, index) in cataLogList"
                  v-bind:class="{'search-info':item.id === cataLog_id}"
                  @click="reloadPage('cataLog_id', item.id, index+10+'')">
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="user-box-right-search-left">子类</div>
            <div class="user-box-right-search-right">
              <ul v-if="subClassList!==null && subClassList.length!==0">
                <li
                  v-bind:class="{'search-info': subClass_id===''}"
                  @click="reloadPage('subClass_id', '', '')">
                  全部</li>
                <li
                  v-for="item in subClassList"
                  v-bind:class="{'search-info':item.id === subClass_id}"
                  @click="reloadPage('subClass_id', item.id, '')"
                >
                  {{ item.name }}
                </li>
              </ul>
              <ul v-else>
                <li class="search-info">全部</li>
              </ul>
            </div>
          </li>
          <li>
            <div class="user-box-right-search-left">类型</div>
            <div class="user-box-right-search-right">
              <ul v-if="typeList!==null && typeList">
                <li v-bind:class="{'search-info': type_id===''}"
                    @click="reloadPage('type_id', '', '')">全部</li>
                <li
                  v-for="item in typeList"
                  v-bind:class="{'search-info':item.id === type_id}"
                  @click="reloadPage('type_id', item.id, '')"
                >
                  {{ item.name }}
                </li>
              </ul>
              <ul v-else>
                <li class="search-info">全部</li>
              </ul>
            </div>
          </li>
          <li>
            <div class="user-box-right-search-left">地区</div>
            <div class="user-box-right-search-right">
              <ul>
                <li v-bind:class="{'search-info':loc_id || loc_id===''}">全部</li>
                <li
                  v-for="item in locList"
                  v-bind:class="{'search-info':item.id === loc_id}"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="user-box-right-search-left">年份</div>
            <div class="user-box-right-search-right">
              <ul>
                <li v-bind:class="{'search-info': onDecade===''}">全部</li>
                <li
                  v-for="item in decadeList"
                  v-bind:class="{'search-info':item.id === onDecade}"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="film-list" v-if="filmList!==null && filmList.length>0">
          <li v-for="li in filmList">
            <div  class="note-left" :title="li.name">
              <a :title="li.name"
                 target="_blank"
                 @click="detailPage(li.id)"
              >
              <el-image
                class="lazy rounded img-fluids"
                :src="HOME+li.image"
                :alt="li.name"
                fit="contain"
              ></el-image>
              </a>
            </div>
            <div class="film-info">
              <div class="info">
                <h2>
                  <a class="film-info-a"
                       :title="li.name"
                       target="_blank"
                     @click="detailPage(li.id)"
                  >{{li.name}}</a>
                  <em> {{li.onDecade}}</em>
                </h2>
                <!--<em class="star star<c:if test="${list.evaluation>=1&&list.evaluation<2}">1</c:if><c:if test="${list.evaluation>=2&&list.evaluation<4}">2</c:if><c:if test="${list.evaluation>=4&&list.evaluation<6}">3</c:if><c:if test="${list.evaluation>=6&&list.evaluation<8}">4</c:if><c:if test="${list.evaluation>=8&&list.evaluation<=10}">5</c:if>"></em>-->
                <p><i class="film-info-desc">主演：
                  <i class="film-info-detail">{{li.actor}}</i>
                </i></p>
                <p><i class="film-info-desc">状态：
                    <i class="film-info-detail">{{li.status}}</i>
                  </i>&nbsp;
                  <i class="film-info-desc">地区：
                    <i class="film-info-detail">{{li.locName}}</i>
                  </i>
                </p>
                <p><i class="film-info-desc">类型：
                  <i class="film-info-detail">{{li.typeName}}</i>
                </i></p>
                <p><i class="film-info-desc">更新：
                  <i class="film-info-detail">{{li.updateTime}}</i>
                </i></p>
                <p></p>
                <span>
                  <a class="watch-btn" target="_blank" @click="detailPage(li.id)">观看</a>
                  <a class="download-btn" target="_blank" @click="detailPage(li.id)">下载</a>
                </span>
              </div>
            </div>
          </li>
        </ul>
        <ul class="mlist" v-else>
            对不起，没有找到任何记录,
            <a target="_blank" @click="toNote">
              <font color="red"><b>请您在此留言</b></font>
            </a>
            ，我们尽快为你添加喜欢的数据<div class="cr"></div>
        </ul>
        <el-pagination
          v-if="pageBean!=null"
          background
          layout="prev, pager, next"
          :page-size="pageBean.ps"
          :total="pageBean.tr"
          hide-on-single-page
          @prev-click="prevPage"
          @next-click="nextPage"
          @current-change="selectPage"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  import { searchFilm, dealResult } from '../api/api';
  import { goPage, goPageParam } from "../util/index";
    export default {
      name: "film-list",
      data() {
        return {
          cataLogList: [], // 分类列表
          cataLog_id: this.$route.query.cataLog_id, // 当前选择的分类id
          subClassList: [], // 子类列表
          subClass_id: "", // 当前选择的子类id
          typeList: [], // 类型列表
          type_id: "", // 当前选择类型id
          locList: [], // 地区列表
          loc_id: "", // 当前选择的地区id
          decadeList: [], // 年份列表
          filmList: [], // 影片列表
          name: "",// 影片名
          actor: "", // 演员
          onDecade: "", // 选择的年份
          evaluation: "",// 评分
          pageBean: null, // 分页信息
          ps: 15, // 分页展示条数
        }
      },
      mounted() {
        if( this.checkInit() ) {
          this.$store.state.activeIndex = this.$route.query.index;
          this.cataLog_id = this.$route.query.cataLog_id;
          this.init();
          this.$store.state.fullscreenLoading = false;
        }
      },
      methods : {
        checkInit() {
          if( null==this.cataLog_id || ''===this.cataLog_id.trim() ) {
            this.$message.error({
              message: '系统错误,请重试!',
              duration: 2000,
            });
            this.$router.go(-1);
          } else {
            return true;
          }
        },
        init(pc, ps) {
          const param = this.getFilmListParams(pc, ps);
          searchFilm(param).then( res => {
            const data = dealResult(res.data);
            console.log(data);
            if( null!==data ) {
              this.cataLogList = data.cataLogList;
              this.subClassList = data.subClassList;
              this.typeList = data.typeList;
              this.locList = data.locList;
              this.decadeList = data.decadeList;
              this.pageBean = data.pageBean;
              if( this.pageBean != null ) {
                this.filmList = data.pageBean.beanList;
              }
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        registerPage() {
          this.$router.push('register');
        },
        reloadPage(name, value, index) {
          if( null!==index && index>=10 ) {
            this.$store.state.activeIndex = index;
          }
          switch (name) {
            case "cataLog_id":
              this.cataLog_id = value;
              this.typeList = [];
              this.subClass_id = "";
              break;
            case "subClass_id":
              this.subClass_id = value;
              this.type_id = "";
              break;
            case "type_id":
              this.type_id = value;
              break;
          }
          this.init();
        },
        prevPage() {
          let pc = this.pageBean.pc;
          console.log(pc);
          this.init(pc-1, this.ps);
        },
        nextPage() {
          let pc = this.pageBean.pc;
          this.init(pc+1, this.ps);
        },
        toNote() {
          goPage('note');
        },
        detailPage(filmId) {
          let routeData = this.$router.resolve({ path: '/detail/'+filmId });
          window.open(routeData.href, '_blank');
          // goPage('/detail/'+filmId);
        },
        selectPage(selectedPageNo) {
          this.init(selectedPageNo, this.ps);
        },
        getFilmListParams(pc, ps) {
          if( pc == null ) pc = 1;
          if( ps == null) ps = 15;
          console.log(pc);
          return {
            cataLog_id: this.cataLog_id,
            subClass_id: this.subClass_id,
            type_id: this.type_id,
            name: this.name,
            loc_id: this.loc_id,
            actor: this.actor,
            onDecade: this.onDecade,
            evaluation: this.evaluation,
            pc: pc,
            ps: ps,
          };
        }
      }
    }
</script>

<style scoped>
@import "../assets/css/index/filmList.css";
  .isCheckShow {
    color: #343a40;
    background: #b5b5b5;
  }
.el-pagination {
  text-align: center;
}
</style>
