<template>
  <div class="tab-pane in active" id="video-mine">
    <div class="text-center" style="width: 100%;">
      <!--<a href="/video/profile/share">-->
      <el-button type="primary" round @click="test('点击了上传按钮')">
        我要上传<i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </div>
    <div style="margin: 10px auto;" v-if="total>0">
      <div class="center" v-if="filmList && filmList.length>0">
        <ul class="film-list" >
          <li v-for="item in filmList">
            <a @click="detailPage(item.id)">
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
  import { userProfile, dealResult, getFilmsForProfile } from '../../api/api';
    export default {
      // 我的视频页面
      name: "videos-mine",
      data() {
        return {
          filmList: [],// 用户上传的视频列表
          uid: "",// 用户id
          total: 0,// 我上传的视频总数
          pageSize: 5, // 页面大小
        }
      },
      mounted() {
        if( this.$store.state.user.id ) {
          this.uid = this.$store.state.user.id;
          this.getFilms();
        }
      },
      methods: {
        // 获取初始化参数
        getInitParam(pageNo) {
          console.log('in methods..' + pageNo);
          if( pageNo==null || pageNo<=0 ) {
            pageNo = 1;
          }
          console.log('end methods..' + pageNo);
          return {
            "type": "my-films",
            "pc": pageNo
          }
        },
        // 测试方法
        test(info) {
          alert(info);
        },
        // 获取我的视频列表
        getFilms(selectedPageNo) {
          const params = this.getInitParam(selectedPageNo);
          getFilmsForProfile(params).then( res => {
            const data = dealResult(res.data);
            console.log(data);
            if( data !== null ) {
              this.filmList = data.films;
              this.total = data.total;
            }
          }).catch(function (err) {
            console.log(err)
          });
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/index.css";
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
    margin: 6px 40px 6px 6px;
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
