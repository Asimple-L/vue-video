<template>
  <div>
    <div class="text-center" style="width: 100%;">
      <el-button type="primary" round @click="goUploadPage('')" class="margin-top-10">
        我要上传<i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </div>
    <div style="margin: 10px auto;" v-if="total>0">
      <div class="center" v-if="filmList && filmList.length>0">
        <ul class="film-list" >
          <li v-for="item in filmList">
            <a @click="goUploadPage(item.id)">
              <div :title="item.name">
                <img :src="HOME+item.image" style="height: 175px;width: 126px;">
              </div>
            </a>
            <div class="film-info">
              <a @click="detailPage(item.id)" :title="item.name">
                <p>{{item.name}}</p>
              </a>
              <p>{{item.onDecade}}-{{item.typeName}}</p>
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
      <div v-else class="center empty_info">
        暂无上传视频，请先上传！
      </div>
    </div>
  </div>
</template>

<script>
import { dealResult, getFilmsForProfile } from '../../api/api'
export default {
  // 我的视频页面
  name: 'videos-mine',
  data () {
    return {
      filmList: [], // 用户上传的视频列表
      uid: '', // 用户id
      total: 0, // 我上传的视频总数
      pageSize: 5 // 页面大小
    }
  },
  mounted () {
    if (this.$store.state.user.id) {
      this.uid = this.$store.state.user.id
      this.getFilms()
    }
  },
  methods: {
    // 获取初始化参数
    getInitParam (pageNo) {
      if (pageNo == null || pageNo <= 0) {
        pageNo = 1
      }
      return {
        'type': 'my-films',
        'pc': pageNo
      }
    },
    // 获取我的视频列表
    getFilms (selectedPageNo) {
      const params = this.getInitParam(selectedPageNo)
      getFilmsForProfile(params).then(res => {
        const data = dealResult(res.data)
        if (data !== null) {
          this.filmList = data.films
          this.total = data.total
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 进入详情页
    detailPage (filmId) {
      let routeData = this.$router.resolve({ path: '/detail/' + filmId })
      window.open(routeData.href, '_blank')
    },
    // 进入影片上传页面
    goUploadPage (filmId) {
      let routeData = this.$router.resolve({path: '/upload', query: {filmId: filmId, isAdmin: false}})
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>
  @import "../../assets/css/index.css";
  @import "../../assets/css/index/profile.css";
  @import "../../assets/css/index/profileFilms.css";
</style>
