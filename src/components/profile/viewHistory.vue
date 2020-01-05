<template>
  <!-- 浏览历史 -->
  <div class="tab-pane" id="view-history">
    <div class="center">
      浏览历史
    </div>
    <!--<c:if test="${viewHistoryList!=null && viewHistoryList.size()>0}">-->
    <div style="margin: 10px auto;">
      <ul class="film-list" id="my-view-history">
        <!--<c:forEach items="${viewHistoryList}" var="list">-->
        <!--<li>-->
        <!--<a href="/video/xl/detail.html?film_id=${list.film.id}">-->
        <!--<div title="上次浏览时间:<f:formatDate value="${list.date_view}" pattern="yyyy-MM-dd HH:mm:ss" />"><img src="${list.film.image}" style="height: 175px;width: 126px;"></div>-->
        <!--</a>-->
        <!--<div class="film-info">-->
        <!--<a href="/video/xl/detail.html?film_id=${list.id}" title="${list.film.name}"><p>${list.film.name}</p></a>-->
        <!--<p>${list.film.onDecade}-${list.film.typeName}</p>-->
        <!--</div>-->
        <!--</li>-->
        <!--</c:forEach>-->
      </ul>
    </div>
    <div class="margin-top-30 text-center">
      <nav aria-label="...">
        <ul class="pager" id="my-view-history-page">
          <!-- 分页 -->
        </ul>
      </nav>
    </div>
    <!--</c:if>-->
  </div>
</template>

<script>
    export default {
      // 浏览历史界面
      name: "view-history"
    }
</script>

<style scoped>

</style>
