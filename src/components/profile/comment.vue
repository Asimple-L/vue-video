<template>
  <!-- 我的评论 -->
  <div class="tab-pane in" id="my-comment">
    <ul class="list-unstyled activity-timeline" v-if="total > 0">
      <li class="center">
        <router-link :to="{'name':'note'}" class="font-blue cur-pointer">
          查看更多精彩评论
        </router-link>
        <el-divider></el-divider>
      </li>
      <li v-for="list in comments">
        <div class="context cur-pointer" v-html="list.context"></div>
        <div class="float-right cur-pointer">
          <span class="timestamp">
          {{ $moment(list.date_update).format('YYYY-MM-DD HH:mm:ss')}}
        </span>
          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>{{ list.likeNum}}
          <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>{{ list.unlikeNum }}
        </div>
        <el-divider></el-divider>
      </li>
    </ul>
    <!--  分页 -->
    <el-pagination
      v-if="total>0"
      layout="total, prev, pager, next"
      :total="total"
      :page-size="pageSize"
      hide-on-single-page
      @current-change="getComments"
      class="center"
    >
    </el-pagination>
    <div v-else class="cur-pointer center">
      暂无评论，请先去
      <router-link :to="{'name': 'note'}" class="font-blue">
        评论
      </router-link>
    </div>
  </div>
</template>

<script>
import { getMyComments, dealResult } from '../../api/api'
export default {
  // 我的评论页面
  name: 'comment',
  data () {
    return {
      comments: [], // 我的评论列表
      total: 0, // 总数
      pageSize: 5, // 一页展示数量
      uid: '' // 当前登录人id
    }
  },
  mounted () {
    // 初始化
    this.uid = this.$store.state.user.id
    this.getComments(1)
  },
  methods: {
    // 获取页面信息
    getComments (pageNo) {
      const param = this.getParams(pageNo)
      getMyComments(param).then(res => {
        const data = dealResult(res.data)
        if (data != null) {
          this.total = data.total
          this.comments = data.comments
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 获取参数列表
    getParams (pageNo) {
      return {
        'pc': pageNo,
        'uid': this.uid
      }
    }
  }
}
</script>

<style scoped>

</style>
