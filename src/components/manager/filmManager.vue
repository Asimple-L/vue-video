<template>
    <div class="context-manager">
      <el-row>
        <el-col :span="8" style="float: right;padding-right: 30px;">
          <el-input
            placeholder="请输入影片名称"
            prefix-icon="el-icon-search"
            v-model="filmName"
            clearable
            @change="searchFilm">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="padding-left-10 padding-top-10">
        <el-col>
          <ul v-if="total>0" class="film-list">
            <li class="float-left" v-for=" li in films">
              <a @click="goUploadPage(li.id)" :alt="li.name" :title="li.name">
                <el-image :src="HOME+li.image" lazy class="lazy rounded img-fluids" fit="contain">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </a>
              <div class="t_info">
                <p style="color:#00AFE4;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ li.name }}</p>
                <p>{{ li.typeName }}-{{ li.onDecade }}</p>
              </div>
            </li>
          </ul>
        </el-col>
        <!-- 分页 -->
        <el-col class="padding-top-10">
          <el-pagination
            v-if="total>0"
            layout="total, prev, pager, next, jumper"
            :total="total"
            :page-size="pageSize"
            hide-on-single-page
            @current-change="getFilms"
            class="center"></el-pagination>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {managerFilm, dealResult} from '../../api/api';
    export default {
      name: "film-manager",
      data() {
          return {
            filmName: "",// 搜索影片名称
            total: 0, // 影片总数
            pageSize: 15,// 一页显示的影片数目
            films: [], // 影片列表
            oldFilmName: "", // 保存之前的搜索名称，防止多次刷新
          }
      },
      mounted(){
        this.getFilms();
      },
      methods: {
        // 获取影片信息
        getFilms(pageNo) {
          const param = this.getInitParam(pageNo);
          managerFilm(param).then(res => {
            const data = dealResult(res.data);
            if (data !== null) {
              this.films = data.pageBean.beanList;
              this.total = data.pageBean.tr;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        // 获取列表请求参数
        getInitParam(pageNo) {
          if (pageNo === null) {
            pageNo = "1";
          }
          return {
            "pc": pageNo,
            "ps": this.pageSize
          }
        },
        // 影片搜索
        searchFilm() { // 搜索影片
          if (this.oldFilmName === this.filmName) {
            return;
          }
          const param = {"ps": this.pageSize, "name": this.filmName};
          managerFilm(param).then(res => {
            const data = dealResult(res.data);
            if (data !== null) {
              this.films = data.pageBean.beanList;
              this.total = data.pageBean.tr;
              this.oldFilmName = this.filmName;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        // 进入影片上传页面
        goUploadPage(filmId) {
          let routeData = this.$router.resolve({path: '/upload', query: {filmId: filmId, isAdmin: true}});
          window.open(routeData.href, '_blank');
        }
      }
    }
</script>

<style scoped>
  .film-list {
    width: 100%;
    height:auto;
    overflow: hidden;
    margin-bottom: 0;
  }

  .film-list li {
    width: 19%;
    text-align: center;
    height: auto;
    padding: 2px;
  }
  .film-list li img {
    width: 100%;
    height: 100%;
    padding: 4px;
    text-align: center;
    border: 1px solid #ddd;
  }
</style>
