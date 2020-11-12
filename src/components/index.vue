<template>
  <el-scrollbar>
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
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item
            v-for="item in $store.state.banner"
            :key="item.name"
            :name="item.name"
            @click.native="goUrl(item.link)">
            <img
              v-if="item.url!==''"
              style="width:100%;height:100%;"
              :src="item.url"
              :alt="item.title"/>
            <h3 v-if="item.url===''" class="medium">{{item.content}}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <el-row>
        <el-col :span="16">
          <div class="moxIndex" v-for="list in filmTuijian">
            <h5>最新{{ list[0].cataLogName }}推荐<span style="margin-right:10px;cursor:pointer;float: right;" onclick="location.href='#'">更多</span></h5>
            <ul>
              <li class="float-left" v-for=" li in list">
                <a @click="goFilmDetail(li.id)" :alt="li.name" :title="li.name">
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
          </div>
        </el-col>
        <el-col :span="8">
          <div class="case" v-for="list in filmPaiHang">
            <ul>
              <h5>{{ list[0].cataLogName }}评分排行榜</h5>
              <li v-for="(li, index) in list">
                <el-popover
                  placement="right"
                  trigger="hover">
                  <div slot="reference" class="indexRightLiDiv cur-pointer">
                    <span class="ph1" v-if="index<=2">{{index+1}}</span>
                    <span class="ph" v-else>{{index+1}}</span>
                    <a :title="li.name" @click="goFilmDetail(li.id)" target="_blank">
                      {{ li.name.substr(0, 16)}}
                      <span style="float: right;margin-right: 10px;">
                          {{ li.updateTime.substr(5, 11)}}
                        </span>
                    </a>
                  </div>
                  <img :src="HOME+li.image" :alt="li.name" width="200px" height="288px">
                </el-popover>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-scrollbar>
</template>

<script type="es6">
import {getIndexData} from '../api/api'
import {goPage} from '../util/index'

export default {
  name: 'index',
  data () {
    return {
      code: '初始化',
      filmTuijian: [],
      filmPaiHang: []
    }
  },
  mounted: function () {
    this.init()
    this.$store.state.activeIndex = '9'
    $('.case ul li a').each(function (i) {
      $(this).hover(function () {
        $(this).parent().find('.tips').addClass('hover')
        $(this).parent().addClass('lihover')
      }, function () {
        $(this).parent().find('.tips').removeClass('hover')
        $(this).parent().removeClass('lihover')
      })
    })
    $(window).resize(function () {
      var w = $('.col-sm-8').width() / 6
      var isLi = false
      if ($('.col-sm-8').width() < 500) {
        w = $('.col-sm-8').width() / 3
        isLi = true
      }
      w = parseInt(w - 0.5)
      $('.moxIndex ul li').css('width', w + 'px')
      var h = (w * 160) / 115
      $('.t_img').css('height', h + 'px')
      if (isLi) {
        $('.case').css('height', 'auto')
        $('.case').css({'overflow': 'hidden'})
      } else {
        $('.case').each(function (index, ele) {
          $(ele).css('height', ($('.moxIndex').eq(index).height()) + 'px')
        })
      }
    })
  },
  methods: {
    init () {
      this.$store.state.fullscreenLoading = true
      getIndexData().then(res => {
        this.code = res.data.code
        this.filmTuijian = res.data.data.filmTuijian
        this.filmPaiHang = res.data.data.filmPaiHang
        this.$store.state.fullscreenLoading = false
      }).catch(function (err) {
        console.log(err)
      })
    },
    goFilmDetail (filmId) {
      goPage('/detail/' + filmId)
    },
    registerPage () {
      this.$router.push('register')
    },
    // 直接跳转
    goUrl (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/index.css";
.indexRightLiDiv {
  padding: 7px 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
