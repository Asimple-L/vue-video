<template>
    <el-main>
      <el-image
        :src="require('../../static/img/500.jpg')"
        lazy
        class="lazy rounded img-fluids"
        style="height: 99%"
        @click="goIndexPage"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </el-main>
</template>

<script>
  import { goPage } from "../util/index";
    export default {
      name: "error",
      created() {
        this.threeGo();
      },
      mounted() {
        this.$store.state.fullscreenLoading = false;
      },
      methods: {
        //3秒后进入跳转页面
        threeGo(){
          const TIME_COUNT = 3;
          if(!this.timer){
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(()=>{
              if(this.count > 0 && this.count <= TIME_COUNT){
                this.count--;
              }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                this.$router.push({ path: '/'});
              }
            },1000)
          }
        },
        // 去首页
        goIndexPage() {
          this.$store.state.activeIndex = ''+9;
          goPage('/');
        }
      },
    }
</script>

<style scoped>

</style>
