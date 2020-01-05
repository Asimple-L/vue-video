<template>
  <div class="tab-pane in active" id="video-mine">
    <div class="text-center" style="width: 100%;">
      <!--<a href="/video/profile/share">-->
      <a href="#">
        <button class="btn-primary btn" style="border-radius: 15%;">我要上传</button>
      </a>
    </div>
    <!--<c:if test="${films!=null && films.size()>0}">-->
    <div style="margin: 10px auto;">
      <ul class="film-list" v-if="filmList && filmList.length>0">
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
      <div v-else class="center empty_info">
        暂无上传视频，请先上传！
      </div>
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
</template>

<script>
  import { userProfile, dealResult } from '../../api/api';
    export default {
      // 我的视频页面
      name: "videos-mine",
      data() {
        return {
          filmList: [],
          uid: "",
        }
      },
      mounted() {
        if( this.$store.state.user.id ) {
          this.uid = this.$store.state.user.id;
          this.init();
        }
      },
      methods: {
        init() {
          const param = this.getInitParam();
          userProfile(param).then( res => {
            const data = dealResult(res.data);
            if( data!==null ) {
              this.filmList = data.films;
            }
          }).catch(function (err) {
            console.log(err);
          });
        },
        getInitParam() {
          return {
            uid: this.uid,
            type: "videos"
          }
        }
      }
    }
</script>

<style scoped>

</style>
