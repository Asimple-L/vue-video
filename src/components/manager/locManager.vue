<template>
  <div class="context-manager">
    <el-row class="padding-top-10 padding-bottom-10 padding-left-10">
      <el-col :span="16">
        地区管理
      </el-col>
      <el-col :span="8" style="text-align: right;padding-right: 10px;">
        <el-button type="primary" @click="addDecade" size="small">
          新增地区
        </el-button>
      </el-col>
    </el-row>
    <el-dialog title="新增地区" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="地区" prop="userName">
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
import {managerCatalog, dealResult, updateCatalog, dealResultWithoutData} from '../../api/api'
export default {
  name: 'loc-manager',
  data () {
    return {
      dialogFormVisible: false, // 弹框是否显示
      tableData: [], // 表格显示内容
      form: {
        name: '' // 年份
      },
      visible: false // 删除框是否显示
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData () {
      managerCatalog().then(res => {
        const data = dealResult(res.data)
        if (data != null) {
          this.tableData = data.locList
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 新增地区弹框
    addDecade () {
      this.dialogFormVisible = true
    },
    // 提交/取消 新增
    submitDialog (flag) {
      this.dialogFormVisible = false
      if (flag) {
        // 提交到后端
        const param = {name: this.form.name}
        updateCatalog('/addLoc', param).then(res => {
          dealResultWithoutData(res.data)
          this.getTableData()
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    // 处理删除
    handleDelete (obj) {
      obj.isUse = 0
      updateCatalog('/addLoc', obj).then(res => {
        dealResultWithoutData(res.data)
        this.getTableData()
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  ul li {
    width: 22%;
    margin-right: 3%;
    float:left;
  }
</style>
