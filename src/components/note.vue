<template>
    <el-main>
      <el-row>
        <quill-editor
          ref="text"
          v-model="content"
          class="myQuillEditor margin-top-10"
          :options="editorOption"/>
        <el-button
          type="primary"
          @click="submit"
          class="margin-top-10 width-100-percent">
          发表评论
        </el-button>
      </el-row>
      <el-row class="margin-top-10" v-if="total>0" :gutter="10">
        <el-col
          :span="12"
          v-for="(comment, index) in commentList"
          :key="index">
          <el-card shadow="always" class="cur-pointer">
            <!--<div v-html="comment.context"></div>-->
            <el-row v-html="comment.context"></el-row>
            <el-row style="margin-top: 5px">
              <el-col :span="10" class="cur-pointer">
                <i class="fa fa-clock-o"></i>
                {{$moment(comment.date_update).format('YYYY-MM-DD HH:mm:ss')}}
              </el-col>
              <el-col :span="6">
                <i class="fa fa-user"></i>
                {{comment.user.userName}}
              </el-col>
              <el-col :span="4">
                <span  @click="likeBtn(true, comment.id)">
                  <i class="fa fa-thumbs-o-up"></i>
                  {{comment.likeNum}}
                </span>
              </el-col>
              <el-col :span="4">
                <span @click="likeBtn(false, comment.id)">
                  <i class="fa fa-thumbs-o-down"></i>
                  {{ comment.unlikeNum}}
                </span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col class="padding-top-10">
          <el-pagination
            v-if="total>0"
            layout="total, prev, pager, next"
            :total="total"
            :page-size="pageSize"
            hide-on-single-page
            @current-change="getComments"
            class="center"></el-pagination>
        </el-col>
      </el-row>
    </el-main>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor';
  import {getNotes, dealResult, saveComment, changeLikeNum, dealResultWithoutData } from "../api/api";
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import '../assets/css/index.css';
    export default {
      name: "note",
      data() {
        return {
          content: '',// 富文本编辑的正文
          editorOption: {
            placeholder: "请输入...",
            theme: "snow",
          },
          commentList: [],
          total: 0,// 评论总数
          pageSize: 6,// 每页展示数目
          page: 1, // 当前页
        }
      },
      // 这个富文本编辑器是个组件，需要局部引入
      components: {
        quillEditor
      },
      mounted() {
        this.$store.state.activeIndex = '' + 2;
        this.getComments();
      },
      methods: {
        getComments(pageNo){
          // 初始化获取评论数据
          const params = this.getInitParam(pageNo);
          getNotes(params).then( res => {
            const data = dealResult(res.data);
            if( data != null ) {
              console.log(data);
              this.commentList = data.pb.beanList;
              this.total = data.pb.tr;
              this.page = data.pb.pc;
              this.pageSize = data.pb.ps;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        getInitParam(pageNo) {
          if( pageNo===null || pageNo<1 ) {
            pageNo = 1;
          }
          return {
            "pageNo": pageNo,
            "pageSize": this.pageSize,
          }
        },
        submit () {
          saveComment({context: this.$refs.text.value}).then( res => {
            dealResultWithoutData(res.data);
            this.getComments(this.page);
          }).catch(function (error) {
            console.log(error);
          })
        },
        likeBtn(flag, id) {
          // 点赞或者踩
          let type = "111111";
          if( flag === true ) {
            type = "000000";
          }
          changeLikeNum({"type": type, "id": id}).then( res => {
            dealResultWithoutData(res.data);
            this.getComments(this.page);
          }).catch(function (error) {
            console.log(error);
          })
        }
      }
    }
</script>

<style scoped>

</style>
