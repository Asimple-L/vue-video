<template>
  <div id="app"
       v-loading.fullscreen.lock="$store.state.fullscreenLoading"
       element-loading-text="数据加载中..."
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <a-header/>
  </div>
</template>

<script>

import aHeader from '@/components/header.vue'

export default {
  name: 'App',
  components: {
    aHeader
  }
}
</script>

<style lang="css">
</style>
