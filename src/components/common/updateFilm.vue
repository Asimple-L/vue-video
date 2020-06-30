<template>
  <el-scrollbar>
    <el-main>
      <el-row class="title" v-if="film!==null">
        <el-col :span="3" class="title-info">
          修改视频信息
        </el-col>
        <el-col :span="4">
          <el-button type="danger">删除影片</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">保存修改信息</el-button>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="12" class="title-info">
          上传视频
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          片名:
        </el-col>
        <el-col :span="21">
          <el-input
            v-model="film.name"
            clearable
            placeholder="请输入影片名称"
            maxlength="20"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          海报:
        </el-col>
        <el-col :span="21">
          <!-- TODO 文件上传 -->
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/video/upload"
            :show-file-list="false"
            accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PBG,.GIF"
            :data="{'childPath': 'filmPic'}"
            :on-success="uploadImgSuccess"
            name="file_upload">
            <img v-if="film.image" :src="HOME+film.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!--<el-input v-model="film.image"></el-input>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          上映年代:
        </el-col>
        <el-col :span="21">
          <el-select v-model="film.onDecade" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in decadeList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          状态:
        </el-col>
        <el-col :span="4">
          <el-input v-model="film.status" clearable placeholder="全集/更新第几集"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          分辨率:
        </el-col>
        <el-col :span="21">
          <el-select v-model="film.resolution" clearable placeholder="请选择">
            <el-option
              v-for="item in resolution"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          类型:
        </el-col>
        <el-col :span="7">
          <!-- TODO 下拉选择器，写选择后的方法 -->
          <el-select v-model="film.cataLogName" placeholder="请选择">
            <el-option
              v-for="item in cataLogList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-col>
        <!--<el-col :span="7">-->
          <!--<el-select></el-select>-->
        <!--</el-col>-->
      </el-row>
      <el-row>
        <el-col :span="3">
          演员:
        </el-col>
        <el-col :span="21">
          <el-input
            v-model="film.actor"
            placeholder="请填写演员名称，多个演员请用逗号隔开"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          地区:
        </el-col>
        <el-col :span="21">
          <el-select v-model="film.locName" placeholder="请选择">
            <el-option
              v-for="item in locList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          剧情:
        </el-col>
        <el-col :span="21">
          <el-input type="textarea" autosize v-model="film.plot"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          是否vip:
        </el-col>
        <el-col :span="21">
          <!-- 开关 -->
          <el-switch
            v-model="film.isVip"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <!-- 资源上传栏目 -->
      <el-row v-if="res !== null && res.length>0">
        <el-row class="center">资源列表</el-row>
        <el-col :span="12" v-for="item in res" :key="item.id">
          <el-row>
            <el-col :span="10" >
              {{ item.name }}
            </el-col>
            <el-col :span="2">
              {{ item.linkType }}
            </el-col>
            <el-col :span="6">
              <!-- 点击事件 -->
              <el-switch
                v-model="item.isUse"
                active-text="在线"
                inactive-text="离线">
              </el-switch>
            </el-col>
            <el-col :span="3">
              <!-- TODO 删除操作 -->
              <el-button type="danger">删除</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row v-else style="padding-bottom: 10px;">
        <el-row class="center">暂无资源列表</el-row>
      </el-row>

      <el-row class="title" style="padding-top: 10px;">
        <el-col :span="3">添加资源</el-col>
        <el-col :span="21">
          <span class="zhuti" v-if="film!=null">
              影片主体：{{film.id}}
            </span>
        </el-col>
      </el-row>

      <el-row>
        <div style="width: 200px;height: auto;margin: 10px auto;">
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:8080/video/upload"
            :on-success="uploadResSuccess()">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
      </el-row>

      <el-row>
        <el-col :span="3">资源名:</el-col>
        <el-col :span="21">
          <el-input placeholder="请填写资源名" id="res_name" style="width: 60%;"></el-input>
          <span style="color:red;">*</span>
          <span style="color:#ddd;">(若百度资源请将密码填在此处，无需填写名称)</span>
          <el-button type="text">多资源模板</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3">当前集数:</el-col>
        <el-col :span="21">
          <el-select class="input fixSelect" id="res_episodes">
            <el-option
              v-for="episode in 100"
              :key="episode"
              :label="episode"
              :value="episode">
            </el-option>
          </el-select>
          <span style="color:red;">*</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3">链接:</el-col>
        <el-col :span="21">
          <el-input type="textarea" class="input contentType addResInput" placeholder="请填写资源链接，并在下个选择栏选择正确的资源类型" autocomplete="off" style="width: 95%"></el-input>
          <span style="color:red;">*</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3">链接类型:</el-col>
        <el-col :span="21">
          <el-select class="input fixSelect" id="res_linkType">
            <el-option
              v-for="item in linkTypes"
              :key="item.type"
              :value="item.type"
              :label="item.name"></el-option>
          </el-select>
          <span style="color:red;">*</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3"></el-col>
        <el-col :span="21">
          <el-button type="primary">添加资源</el-button>
          <el-button type="info">清空</el-button>
          <span class="alert-box">温馨提示：清空后可继续添加更多资源</span>
        </el-col>
      </el-row>

    </el-main>
  </el-scrollbar>
</template>

<script>
  import {getFilm,dealResultWithoutData, dealResult} from '../../api/api';
    export default {
      name: "update-film",
      data() {
        return {
          film: {
            // 主键
            id: "",
            // 片名
            name: "",
            // 海报图地址
            image: "",
            // 上映年代
            onDecade: "",
            // 状态
            status: "",
            // 分辨率
            resolution: "",
            // 类型名称
            typeName: "",
            // 类型Id
            type_id: "",
            // 演员
            actor: "",
            // 地区名称
            locName: "",
            // 地区Id
            loc_id: "",
            // 更新时间
            updateTime: "",
            // 是否在使用
            isUse: "",
            // 一级目录
            cataLog_id: "",
            // 一级目录名称
            cataLogName: "",
            // 二级目录
            subClass_id: "",
            // 二级目录名称
            subClassName: "",
            // 是否vip资源
            isVip: "",
            // 剧情介绍
            plot: "",
            // 评分
            evaluation: 0.0,
            // 下载列表
            resList: [],
            // 浏览数目
            view_number: 0,
          }, // 电影主体
          filmId: '', // 影片id
          isAdmin: '', // 是否来自于后台管理页面
          res: [], // 资源列表
          locList: [], // 地区列表
          levelList: [], // 等级列表
          decadeList: [], // 年份列表
          cataLogList: [], // 分类信息
          resolution: ["1080p", "720p", "480p"], // 分辨率信息
          linkTypes: [
            { type: "Flh", name: "在线"},
            { type: "ed2k", name: "电驴"},
            { type: "thunder", name: "迅雷"},
            {type: "http", name: "离线"},
            {type: "dupan", name: "度盘"},
            {type: "other", name: "其它"}], // 链接类型
        }
      },
      mounted() {
        this.init();
      },
      methods: {
        init() {// 初始化信息
          this.$store.state.fullscreenLoading = false;
          this.$store.state.activeIndex = '9';
          this.$store.state.headerDisplay = false;
          this.filmId = this.$route.query.filmId;
          this.isAdmin = this.$route.query.isAdmin;
          if( this.filmId!=='' ) {
            // 如果有传过来影片ID说明是编辑，需要获取影片信息
            getFilm({"filmId": this.filmId}).then( res => {
              const data = dealResult(res.data);
              if( data!==null ) {
                this.film = data.film;
                this.locList = data.locList;
                this.levelList = data.levelList;
                this.decadeList = data.decadeList;
                this.cataLogList = data.cataLogList;
                this.res = data.res;
              } else {
                setTimeout(function () {
                  window.close();
                }, 2000);
              }
            }).catch(function (error) {
              console.log(error);
            })
          }
        },
        // 资源上传成功后调用的方法
        uploadResSuccess() {
          console.log("资源上传成功!");
        },
        // 海报上传成功后的方法
        uploadImgSuccess(response) {
          /*
          fileName: "share one.jpg"
          filePath: "/video/public/static/upload/filmPic/1593526605032.jpg"
          fileSuffix: "jpg"
          name: "share one"
           */
          let res = null;
          if( response.length>0 ) {
            res = response[0];
          }
          this.film.image = res.filePath;
          if( res.filePath.startsWith("/") ) {
            this.film.image = res.filePath.substring(1);
          }
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/manager/addFilm.css";
</style>
