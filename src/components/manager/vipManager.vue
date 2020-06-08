<template>
    <div class="context-manager">
      <el-row class="padding-top-10 padding-bottom-10 padding-left-10">
        <el-col :span="16">
          VIP管理
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可使用的卡号</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="createVipCode">一键生成加油卡号</el-button>
            </div>
            <div v-for="item in useVipCode" :key="item.id" class="text item">
              {{item.code}}
            </div>
            <el-pagination
              v-if="isUserTotal>0"
              layout="total, prev, pager, next"
              :total="isUserTotal"
              :page-size="pageSize"
              hide-on-single-page
              @current-change="init"
              class="center">
            </el-pagination>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" v-if="createNum > 0">
            <div slot="header" class="clearfix">
              <span>生成的加油卡号</span>
            </div>
            <div v-for="item in createVipCodeList" :key="item.id" class="text item">
              {{item.code}}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {vipPage, dealResult} from '../../api/api';
    export default {
      name: "vip-manager",
      data() {
        return {
          isUserTotal: 0, // 可用VIP卡数量
          useVipCode: [],// 可用VIP卡列表
          pageSize: 10, // 一页显示大小
          isUserPage: 1, // 可用VIP卡页
          createNum: 0, // 生成的VIP卡数目
          createVipCodeList: [], // 生成的VIP卡
        }
      },
      mounted() {
        this.init(1);
      },
      methods: {
        // 初始化方法
        init(pageNo) {
          const param = {"page": pageNo, "pageSize": this.pageSize};
          vipPage('/vipCode', param).then( res => {
            const data = dealResult(res.data);
            if( data!==null ) {
              this.useVipCode = data.beanList;
              this.isUserPage = data.pc;
              this.isUserTotal = data.tr;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        // 生成VIP卡
        createVipCode() {
          vipPage('/createVipCode', {"num": this.pageSize}).then( res => {
            const data = dealResult(res.data);
            this.createNum = 0;
            if( data!==null ) {
              this.createVipCodeList = data.data;
              this.createNum = this.pageSize;
            }
          }).catch(function (error) {
            console.log(error);
          })
        }
      }
    }
</script>

<style scoped>
  .box-card {
    margin-left: 10px;
  }
  .item {
    margin-bottom: 18px;
    border-bottom: 1px solid #efefef;
  }
</style>
