<template>
  <div class="context-manager">
    <el-row class="padding-top-10 padding-bottom-10 padding-left-10">
      <el-col :span="16">
        年份管理
      </el-col>
      <el-col :span="8" style="text-align: right;padding-right: 10px;">
        <el-button type="primary" @click="addDecade" size="small">
          新增年份
        </el-button>
      </el-col>
    </el-row>
    <el-dialog title="新增年份" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="年份" prop="userName">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitDialog(false)">取 消</el-button>
        <el-button type="primary" @click="submitDialog(true)">确 定</el-button>
      </div>
    </el-dialog>

    <el-row class="padding-left-10">
      <ul style="text-align: center;">
        <li v-for="item in tableData">
          <el-popconfirm
            confirmButtonText='确定'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            title="是否删除?"
            @onConfirm="handleDelete(item)">
            <el-button
              round
              style="margin-top: 5px;"
              slot="reference">{{ item.name }}</el-button>
          </el-popconfirm>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
  import {managerCatalog, dealResult, updateCatalog, dealResultWithoutData} from '../../api/api';
    export default {
      name: "decade-manager",
      data() {
          return {
            dialogFormVisible: false, // 弹框是否显示
            tableData: [], // 表格显示内容
            form: {
              name: "", // 年份
            }
          }
      },
      mounted() {
        this.getTableData();
      },
      methods: {
        // 获取表格数据
        getTableData() {
          managerCatalog().then( res => {
            const data = dealResult(res.data);
            if (data != null) {
              this.tableData = data.decadeList;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        // 新增年份弹框
        addDecade() {
          this.dialogFormVisible = true;
        },
        // 提交/取消 新增
        submitDialog(flag) {
          this.dialogFormVisible = false;
          if( flag ) {
            // 提交到后端
            const param = {name: this.form.name};
            updateCatalog('/addDecade', param).then( res=> {
              dealResultWithoutData(res.data);
              this.getTableData();
            }).catch(function (error) {
              console.log(error);
            })
          }
        },
        // 处理删除
        handleDelete(obj) {
          obj.isUse = 0;
          updateCatalog('/addDecade', obj).then( res=> {
            dealResultWithoutData(res.data);
            this.getTableData();
          }).catch(function (error) {
            console.log(error);
          });
        }
      }
    }
</script>

<style scoped>
  .item_info{
  border-radius: 20px;
  padding: 12px 23px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  font-size: 14px;
}
  ul li {
    width: 22%;
    margin-right: 3%;
    float:left;
  }
</style>
