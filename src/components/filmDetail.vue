<template xmlns:c="http://www.w3.org/1999/XSL/Transform">
  <el-main>
    <el-row style="margin-top: 10px;">
      <el-col :span="24">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ film.cataLogName }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{film.subClassName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{film.typeName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{film.name}}</el-breadcrumb-item>
          </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-row style="margin-top: 10px;margin-bottom: 10px;">
          <el-col :span="8" class="pic" v-if="film && film.image">
            <el-image :lazy="true" :src="HOME+film.image" :alt="film.name" fit="contain" style="height: 300px;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <!--<el-button type="info">立即播放</el-button>-->
            <a href="#kan">立即播放</a>
            <!--<img class="lazy" data-original="${film.image}" alt="${film.name}">-->
          </el-col>
          <el-col :span="16" style="">
            <div class="info" style="padding: 10px;">
              <h1>{{ film.name }}</h1>
              <ul>
                <li>
                  <span>上映年代：</span>{{ film.onDecade }}&nbsp;&nbsp;
                  <span>状态：</span>{{ film.status }}
                </li>
                <li>
                  <span>类型：</span>
                  <a href="#" target="_blank">{{ film.typeName }}</a>
                  <!--<a href="xl/1.html?type=${film.type_id}">${film.typeName}</a>-->
                </li>
                <li>
                  <span>主演：</span>
                  <a href="javascript:void(0)">{{film.actor}}</a>
                </li>
                <li>
                  <span>地区：</span>{{ film.locName }}
                </li>
                <li>
                  <span>更新日期：</span>{{film.updateTime}}&nbsp;&nbsp;
                </li>
                <li>
                  <span>剧情：</span>{{film.plot.substring(0, 150)}}[<a href="#desc">详细</a>]
                </li>
                <div class="pfen">
                  <p>影片评价</p>
                  <el-rate v-model="userRaty" :colors="colors" @change="saveRaty()" score-template="{value}" show-score allow-half :disabled="disabled_flag"></el-rate>
                  <div class="fen" id="filmStarScoreTip">
                                  <span class="no c1" id="filmStarScore">
                                      {{ film.evaluation | toFixed(2)}}
                                  </span>
                    <span v-if="film.evaluation>=1 && film.evaluation<2">很烂</span>
                    <span v-else-if="film.evaluation>=2 && film.evaluation<4">一般</span>
                    <span v-else-if="film.evaluation>=4&&film.evaluation<6">比较精彩</span>
                    <span v-else-if="film.evaluation>=6&&film.evaluation<8">比较精彩</span>
                    <span v-else-if="film.evaluation>=8&&film.evaluation<=10">棒极了</span>
                    <span v-else-if="film.evaluation>=2 && film.evaluation<4">一般</span>
                    ({{ totalRatys }}评)

                    <div class="bdsharebuttonbox" style="float: right;">
                      <a href="#" class="bds_more" data-cmd="more"></a>
                      <a href="#" class="bds_qzone" data-cmd="qzone"></a>
                      <a href="#" class="bds_tsina" data-cmd="tsina"></a>
                      <a href="#" class="bds_tqq" data-cmd="tqq"></a>
                      <a href="#" class="bds_renren" data-cmd="renren"></a>
                      <a href="#" class="bds_weixin" data-cmd="weixin"></a>
                    </div>
                    <!--<script>window._bd_share_config = {-->
                      <!--"common": {-->
                        <!--"bdSnsKey": {},-->
                        <!--"bdText": "",-->
                        <!--"bdMini": "2",-->
                        <!--"bdPic": "",-->
                        <!--"bdStyle": "0",-->
                        <!--"bdSize": "16"-->
                      <!--},-->
                      <!--"share": {},-->
                      <!--"image": {-->
                        <!--"viewList": ["qzone", "tsina", "tqq", "renren", "weixin"],-->
                        <!--"viewText": "分享到：",-->
                        <!--"viewSize": "16"-->
                      <!--},-->
                      <!--"selectShare": {-->
                        <!--"bdContainerClass": null,-->
                        <!--"bdSelectMiniList": ["qzone", "tsina", "tqq", "renren", "weixin"]-->
                      <!--}-->
                    <!--};-->
                    <!--with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];</script>-->
                    <!--<%&#45;&#45;分享&#45;&#45;%>-->
                  </div>
                </div>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <div class="infoad" >
          <div class="skydrive">
            <p><span>友情提示：</span>欢迎大家使用网盘连接下载！</p>
            <ul v-if="resListDupan && resListDupan.length!==0">
              <li v-for="res in resListDupan"></li>
                <li class="wbaidu">
                  <a :href="res.link" target="_blank">密码：{{ res.name }}</a>
                </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
  import { getFilmDetail, errorDeal, dealResult, saveRaty } from '../api/api';
  import {toFixed} from "../filter/numberFilter";
  export default {
      name: "film-detail",
      data() {
        return {
          film: {
            id: this.$route.params.filmId,
            name: '',
            image: '',
            onDecade: '',
            status: '',
            typeName: '',
            type_id: '',
            actor: '',
            locName: '',
            loc_id: '',
            updateTime: '',
            isUse: '',
            cataLog_id: '',
            cataLogName: '',
            subClass_id: '',
            subClassName: '',
            isVip: '',
            plot: '',
            evaluation: 0.0,
            resList: [],
            view_number: '',
          },
          userRaty: null,
          colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
          totalRatys: 0,
          resListDupan: [],
          disabled_flag: false,
        }
      },
      mounted() {
        if( this.checkFilmId() ) {
          this.init();
        }
      },
      methods: {
        checkFilmId() {
          if( null==this.film.id || ''===this.film.id.trim() ) {
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
          getFilmDetail({'filmId':this.film.id}).then( res => {
            const data = dealResult(res.data);
            console.log(data);
            if( null!=data ) {
              this.film = data.film;
              this.totalRatys = data.totalRatys;
              this.resListDupan = data.resListDupan;
            }
          }).catch(function (err) {
            errorDeal(err);
          })
        },
        saveRaty() {
          const params = {"film_id": this.film.id, "score": this.userRaty*2};
          saveRaty(params).then( res => {
            const data = dealResult(res.data);
            if( null!=data ) {
              this.film.evaluation = data;
              this.totalRatys ++;
              this.$message.success({
                message: '提交成功',
                duration: 2000,
              });
              this.disabled_flag = true;
            }
          }).catch( function (err) {
            console.log(err);
          })
        }
      }
    }
</script>

<style lang="css">
@import "../assets/css/index/detail.css";
</style>
