<template>
  <div class="context-manager">
    <el-row class="padding-top-10 padding-bottom-10 padding-left-10">
      <el-col :span="16">
        用户管理
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userEmail">
          <el-input v-model="form.userEmail" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="是否VIP"
          :label-width="formLabelWidth"
          prop="isVip">
          <el-switch
            v-model="form.isVip"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item
          label="是否管理员"
          :label-width="formLabelWidth"
          prop="isManager">
          <el-switch
            v-model="form.isManager"
            active-text="是"
            inactive-text="否">
          </el-switch>
        </el-form-item>
      </el-form>
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="submitDialog(false)">取 消</el-button>-->
        <!--<el-button type="primary" @click="submitDialog(true)">确 定</el-button>-->
      <!--</div>-->
    </el-dialog>
    <el-table
      border
      stripe
      row-key="id"
      highlight-current-row
      :data="tableData"
    >
      <el-table-column label="No" type="index"></el-table-column>
      <el-table-column label="用户名" prop="userName" sortable></el-table-column>
      <el-table-column label="邮箱" prop="userEmail"></el-table-column>
      <el-table-column label="VIP" prop="isVip">
        <template slot-scope="scope">
          <p v-if="scope.row.isVip===1">是</p>
          <p v-else>否</p>
        </template>
      </el-table-column>
      <el-table-column
        label="VIP到期时间"
        prop="expireDate"
        :formatter="formatterDate"
        sortable></el-table-column>
      <el-table-column label="管理员" prop="isManager">
        <template slot-scope="scope">
          <p v-if="scope.row.isManager===1">是</p>
          <p v-else>否</p>
        </template>
      </el-table-column>
      <el-table-column width="90">
        <template slot="header" slot-scope="scope">
          操作
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updateUser(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getUsers, dealResult, dealResultWithoutData} from '../../api/api';
    export default {
      name: "user-manager",
      data() {
        return {
          tableData: [{
          }], // 表格数据
          pageSize: 5, // 分类大小
          page: 10, // 当前页
          title: "修改用户信息", // 弹窗标题
          form: {
            // 表单信息
            id: '',
            userName: '',
            userPasswd: '',
            userEmail: '',
            expireDate: '',
            isVip: true,
            isManager: false,
          },
          dialogFormVisible: false, // 弹窗是否显示
          formLabelWidth: '20%',
        }
      },
      mounted() {
        this.init();
      },
      methods: {
        // 初始化页面
        init() {
          getUsers().then( res => {
            const data = dealResult(res.data);
            if( data !== null ) {
              this.page = data.pc;
              this.pageSize = data.ps;
              this.tableData = data.pb.beanList;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        // 格式化日期
        formatterDate(row) {
          return this.$moment(row.expireDate).format('YYYY-MM-DD HH:mm:ss');
        },
        // 编辑用户
        updateUser(index, row) {
          this.dialogFormVisible = true;
          this.form = row;
          this.form.isVip = row.isVip === 1;
          this.form.isManager = row.isManager === 1;
        }
      },
    }
</script>

<style scoped>

</style>
