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
            @click="reloadPage(list.id, index+10+'')"
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
                <li
                  v-for="(item, index) in cataLogList"
                  v-bind:class="{'search-info':item.id === cataLog_id}"
                  @click="reloadPage(item.id, index+10+'')">
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="user-box-right-search-left">子类</div>
            <div class="user-box-right-search-right">
              <ul v-if="subClassList!==null && subClassList.length!==0">
                <li v-bind:class="{'search-info':subClass_id || subClass_id===''}">全部</li>
                <li
                  v-for="item in subClassList"
                  v-bind:class="{'search-info':item.id === subClass_id}"
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
                <li v-bind:class="{'search-info':type_id || type_id===''}">全部</li>
                <li
                  v-for="item in typeList"
                  v-bind:class="{'search-info':item.id === type_id}"
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
                <li v-bind:class="{'search-info':decade_id || decade_id===''}">全部</li>
                <li
                  v-for="item in decadeList"
                  v-bind:class="{'search-info':item.id === decade_id}"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="film-list">
          电影显示列表
        </ul>
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
          decade_id: "", // 当前选择的id
          filmList: [], // 影片列表
        }
      },
      mounted() {
        if( this.checkInit() ) {
          this.$store.state.activeIndex = this.$route.query.index;
          this.init();
          this.cataLog_id = this.$route.query.cataLog_id;
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
        init() {
          searchFilm({cataLogId: this.cataLog_id}).then( res => {
            const data = dealResult(res.data);
            console.log(data);
            if( null!==data ) {
              this.cataLogList = data.cataLogList;
              this.subClassList = data.subClassList;
              this.typeList = data.typeList;
              this.locList = data.locList;
              this.decadeList = data.decadeList;
              this.filmList = data.filmList;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        registerPage() {
          this.$router.push('register');
        },
        reloadPage(cataLog_id, index) {
          if( null!==index && index>=10 ) {
            this.$store.state.activeIndex = index;
          }
          this.cataLog_id = cataLog_id;
          this.init();
        },
      }
    }
</script>

<style scoped>
@import "../assets/css/index/filmList.css";
  .isCheckShow {
    color: #343a40;
    background: #b5b5b5;
  }
</style>
