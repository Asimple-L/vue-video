<template>
    <el-main>
      影片信息上传/修改页面
    </el-main>
</template>

<script>
    export default {
        name: "update-film",
      methods: {
        init() {// 初始化检查
          this.$store.state.fullscreenLoading = false;
          this.$store.state.activeIndex = '9';
          this.$store.state.headerDisplay = false;
        },
      }
    }
</script>

<style scoped>

</style>
