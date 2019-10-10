<template>
  <div>
    <el-row v-if="true">
      <el-col :span="24">
        <marquee onmouseover='this.stop()' onmouseout='this.start()'>
          <a id="globalLoginBtn_register_input" href="registerInput">注册</a>
          |
          <a @click="$store.state.dialogLoginModelVisible=true" href="javascript:void(0)">登录</a>
          后观看更多高清无码视频
        </marquee>
      </el-col>
    </el-row>
    <el-row>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">广告位招租</h3>
        </el-carousel-item>
      </el-carousel>
    </el-row>
    <el-row>
      <el-col :span="16">
        <div class="mox" v-for="list in filmTuijian">
          <h5>最新{{ list[0].cataLogName }}推荐<span style="margin-right:10px;cursor:pointer;float: right;" onclick="location.href='#'">更多</span></h5>
          <ul>
            <li class="float-left" v-for=" li in list">
              <a href="#" :alt="li.name" :title="li.name">
                <el-image :src="HOME+li.image" lazy class="lazy rounded img-fluids" fit="contain">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <!--<img :src="HOME+li.image" class="lazy rounded img-fluids"/>-->
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
                title=""
                trigger="hover">
                <div slot="reference" class="indexRightLiDiv">
                  <span class="ph1" v-if="index<=2">{{index+1}}</span>
                  <span class="ph" v-else>{{index+1}}</span>
                  <a :title="li.name" href="xl/detail?film_id=${li.id}" target="_blank">
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
  </div>
</template>

<script type="es6">
   import {getIndexData} from "../api/api";

  export default {
    name: 'index',
    data() {
      return {
        code: "初始化",
        filmTuijian: [],
        filmPaiHang: [],
      }
    },
    mounted: function () {
      this.init();
      $(".case ul li a").each(function(i){
        $(this).hover(function(){
          $(this).parent().find(".tips").addClass("hover");
          $(this).parent().addClass("lihover");
        },function(){
          $(this).parent().find(".tips").removeClass("hover");
          $(this).parent().removeClass("lihover");
        });
      });
      this.updateFilmSize();
      $(window).resize(function(){
        this.updateFilmSize();
      });
    },
    methods: {
      init() {
        getIndexData().then(res => {
          this.code = res.data.code;
          this.filmTuijian = res.data.data.filmTuijian;
          this.filmPaiHang = res.data.data.filmPaiHang;
        }).catch(function (err) {
          console.log(err);
        })
      },
      updateFilmSize() {
        var w = $(".col-sm-8").width() / 6;
        var isLi = false;
        if ($(".col-sm-8").width() < 500) {
          w = $(".col-sm-8").width() / 3;
          isLi = true;
        }
        w = parseInt(w - 0.5);
        $(".mox ul li").css("width", w + "px");
        var h = (w * 160) / 115;
        $(".t_img").css("height", h + "px");
        if(isLi){
          $(".case").css("height", "auto");
          $(".case").css({"overflow":"hidden"});
        }else {
          $(".case").each(function (index,ele) {
            $(ele).css("height", ($(".mox").eq(index).height()) + "px");
          });
        }
      },
      loginPage() {
        this.$emit('loginPageFlag', true);
      }
    }
  }
</script>

<style scoped>
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
