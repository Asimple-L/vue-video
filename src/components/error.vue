<template>
    <el-main>
      <el-row>
        <el-col>
          错误页面显示
        </el-col>
      </el-row>
    </el-main>
</template>

<script>
    export default {
      name: "error",
      mounted() {
        this.$store.state.fullscreenLoading = false;
      }
    }
</script>

<style scoped>

</style>
