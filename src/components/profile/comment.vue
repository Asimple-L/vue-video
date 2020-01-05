<template>
  <!-- 我的评论 -->
  <div class="tab-pane in" id="my-comment">
    <div class="center">
      我的评论
    </div>
    <ul class="list-unstyled activity-timeline">
      <!--<c:forEach items="${comments}" var="list">-->
      <!--<li>-->
      <!--<i class="fa fa-comment activity-icon"></i>-->
      <!--<p>${list.context} <span class="timestamp"><f:formatDate value="${list.date_update}" pattern="yyyy-MM-dd HH:mm:ss" /></span></p>-->
      <!--</li>-->
      <!--</c:forEach>-->
    </ul>
    <!--  分页 -->
  </div>
</template>

<script>
    export default {
      // 我的评论页面
      name: "comment"
    }
</script>

<style scoped>

</style>
