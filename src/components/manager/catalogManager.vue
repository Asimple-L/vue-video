<template>
    <div class="context-manager">
      <!-- TODO
          1、操作，后面添加 新增 按钮，点击可以创建当前层级的目录
          2、显示当前层级
          3、点击名称，进入下一层级，如果是最后一层，提示
          4、表格可编辑，点击编辑之后，名称变成输入框，是否可使用变成开关
          5、分页
       -->
      <el-table
        :data="tableData"
        border
        stripe
        row-key="id"
        style="width: 99%; padding-left: 10px; margin-bottom: 20px;">
        <el-table-column label="No" type="index"></el-table-column>
        <el-table-column label="名称" prop="name" sortable></el-table-column>
        <el-table-column label="是否可用" prop="date" ></el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">操作</template>
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
    export default {
      name: "catalog-manager",
      data() {
        return {
          tableData: [],// 表格展示内容
        }
      },
      mounted() {
        this.getCatalog();
      },
      methods: {
        getCatalog() {
          // 获取目录
        },
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
      }
    }
</script>

<style scoped>

</style>
