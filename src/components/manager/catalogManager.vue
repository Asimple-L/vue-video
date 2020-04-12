<template>
    <div class="context-manager">
      <!-- TODO
          1、操作，后面添加 新增 按钮，点击可以创建当前层级的目录
          2、显示当前层级
          3、点击名称，进入下一层级，如果是最后一层，提示
          4、表格可编辑，点击编辑之后，名称变成输入框，是否可使用变成开关
          5、分页
       -->
      <el-row class="padding-top-10 padding-bottom-10 padding-left-10">
        <el-col :span="16">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="(item, index) in breadcrumbList"
              :key="index"
              v-if="level>item.level">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="8" style="text-align: right;padding-right: 10px;">
          <el-button type="primary" @click="addCatalog('1')" size="small">
            新增分类
          </el-button>
          <el-button v-if="level>0" size="small">
            返回上一级
          </el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        stripe
        row-key="id"
        style="width: 99%; padding-left: 10px; margin-bottom: 20px;cursor: pointer;">
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column
          label="名称"
          prop="name"
          sortable></el-table-column>
        <el-table-column label="是否可用" prop="isUse">
          <template slot-scope="scope">
            <p v-if="scope.row.isUse===1">是</p>
            <p v-else>否</p>
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            操作
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import {managerCatalog, dealResult} from '../../api/api';
    export default {
      name: "catalog-manager",
      data() {
        return {
          tableData: [],// 表格展示内容
          cataLogList: [], // 分类列表
          level: 2,// 当前层级
          breadcrumbList: [
            {
              level: 0, // 层级
              name: '一级分类',// 分类名称
              url: '', // 点击调用地址
            },
            {
              level: 1,
              name: '二级分类',
              url: '',
            },
            {
              level: 2,
              name: '类型',
              url: '',
            }
          ], // 面包屑列表显示
        }
      },
      mounted() {
        this.getCatalog();
      },
      methods: {
        // 获取目录
        getCatalog() {
          managerCatalog().then( res => {
            const data = dealResult(res.data);
            if( data != null ) {
              this.cataLogList = data.cataLogList;
              this.tableData = this.cataLogList;
              console.log(this.tableData);
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        goNext() {
          console.log('当前层级：' + this.level);
        }
      }
    }
</script>

<style scoped>

</style>
