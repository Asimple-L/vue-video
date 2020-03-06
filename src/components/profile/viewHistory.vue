<template>
  <!-- 浏览历史 -->
  <div style="margin: 10px auto;">
    <div class="center" v-if="total>0">
      <ul class="film-list" id="my-view-history" v-if="viewHistoryList.length>0">
        <li v-for="list in viewHistoryList">
        <a @click="detailPage(list.film_id)">
          <div :title="'上次浏览时间:'+$moment(list.date_view).format('YYYY-MM-DD HH:mm:ss')">
            <el-image
              :src="HOME+list.film.image"
              lazy
              class="lazy rounded img-fluids" fit="contain">
              <!-- 图片地址错误时，默认显示 -->
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
              <!--height: 175px;width: 126px;-->
            </el-image>
          </div>
        </a>
        <div class="film-info">
          <a :title="list.film.name" @click="detailPage(list.film_id)">
            <p>{{list.film.name}}</p>
          </a>
          <p>{{list.film.onDecade}}-{{list.film.typeName}}</p>
        </div>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        v-if="total>0"
        layout="total, prev, pager, next"
        :total="total"
        :page-size="pageSize"
        hide-on-single-page
        @current-change="getFilms"
        class="center"
      >
      </el-pagination>
    </div>
    <div v-else class="center empty_info cur-pointer">
      暂无浏览记录，去<a @click="toSearchPage" class="font-blue">浏览</a>
    </div>
  </div>
</template>

<script>
  import { dealResult, getFilmsForProfile } from '../../api/api';
  import {goPageParam } from '../../util/index'
    export default {
      // 浏览历史界面
      name: "view-history",
      data() {
        return {
          viewHistoryList: [], // 浏览历史视频列表
          uid: '',// 当前登录人ID
          total: 0,// 总数
          pageSize: 5,// 每页展示的数目
        }
      },
      mounted() {
        this.uid = this.$store.state.user.id;
        this.getFilms();
      },
      methods: {
        // 获取视频列表
        getFilms(pageNo) {
          const params = this.getInitParam(pageNo);
          getFilmsForProfile(params).then( res => {
            const data = dealResult(res.data);
            if( data != null ) {
              this.total = data.total;
              this.viewHistoryList = data.viewHistoryList;
            }
          }).catch(function (err) {
            console.log(err);
          })
        },
        // 获取视频列表参数
        getInitParam(pageNo) {
          if( pageNo==null || pageNo<=0 ) {
            pageNo = 1;
          }
          return {
            "type": "view-history",
            "pc": pageNo
          }
        },
        // 进入详情页
        detailPage(filmId) {
          let routeData = this.$router.resolve({ path: '/detail/'+filmId });
          window.open(routeData.href, '_blank');
        },
        // 电影信息查询页
        toSearchPage() {
          const param = {cataLog_id: '2f8382c4b6e863668d62bda4f0518c7f'};
          goPageParam("/xl", param);
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/index.css";
  @import "../../assets/css/index/profile.css";
  @import "../../assets/css/index/profileFilms.css";
</style>
