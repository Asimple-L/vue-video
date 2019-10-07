<template>
  <div id="footer">
    <p>免责声明:如果侵犯了你的权益，请发邮件至：{{ author }}，我们会及时删除侵权内容，谢谢合作！</p>
  </div>
</template>

<script>
    export default {
        name: "videoFooter",
        data() {
            return {
              author: 'simple_lc@126.com',
            }
        }
    }
</script>

<style scoped>

</style>
