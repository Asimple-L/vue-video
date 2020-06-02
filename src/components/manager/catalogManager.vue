<template>
    <div class="context-manager">
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
          <el-button type="primary" @click="addCatalog('add', null, null)" size="small">
            新增分类
          </el-button>
          <el-button v-if="level>1" size="small" @click="goPre()">
            返回上一级
          </el-button>
        </el-col>
      </el-row>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="是否可用"
            :label-width="formLabelWidth"
            v-if="form.id!==''"
            prop="isUse">
            <el-switch
              v-model="form.isUse"
              active-text="可用"
              inactive-text="弃用">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="submitDialog(false)">取 消</el-button>
          <el-button type="primary" @click="submitDialog(true)">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="tableData"
        border
        stripe
        row-key="id"
        highlight-current-row
        @row-dblclick="goNext"
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
              @click="addCatalog('update', scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm
              confirmButtonText='确定'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              title="是否删除?"
              @onConfirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                size="mini"
                type="danger"
                slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import {managerCatalog, dealResult, updateCatalog, dealResultWithoutData} from '../../api/api';
    export default {
      name: "catalog-manager",
      data() {
        return {
          tableData: [],// 表格展示内容
          cataLogList: [], // 分类列表
          subClassList: [], // 二级分类列表
          typeList: [], // 类型分类列表
          level: 1,// 当前层级
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
          title: "新增分类",// 弹窗标题
          dialogFormVisible: false, // 弹窗是否显示
          formLabelWidth: '20%',// 弹窗字体宽度
          form: {
            id: "",// 分类id
            name: "",// 分类名称
            isUse: true,// 分类是否可用
          },
          parentId: '', // 父类id
          grandfatherId: '',// 爷爷节点
        }
      },
      mounted() {
        this.getTableData();
      },
      methods: {
        // 点击编辑事件处理
        handleEdit(index, row) {
          this.form.name = row.name;
          this.form.id = row.id;
          this.form.isUse = row.isUse===1;
          this.dialogFormVisible = true;
        },
        // 删除选择的行
        handleDelete(index, row) {
          let type = '';
          switch ( this.level ) {
            case 1:
              type = 'catalog';
              break;
            case 2:
              type = 'subClass';
              break;
            case 3:
              type = 'type';
              break;
          }
          const param = { "id": row.id, "type": type};
          updateCatalog('/deleteCatalogById', param).then( res => {
            dealResultWithoutData(res.data);
            this.getTableData(this.parentId);
          }).catch(function (error) {
            console.log(error);
          });
        },
        // 进入下一级
        goNext(row, event, column) {
          this.level ++;
          this.grandfatherId = this.parentId;
          this.parentId = row.id;
          this.getTableData(row.id);
        },
        // 返回上一级
        goPre() {
          if (this.level > 1) {
            this.level--;
            this.parentId = this.grandfatherId;
            this.grandfatherId = '';
            this.getTableData(this.parentId);
          }
        },
        // 新增/修改分类
        addCatalog(type, index, row) {
          this.form.name = "";
          this.form.id = "";
          this.form.isUse = false;
          this.dialogFormVisible = true;
          this.title = '新增分类';
          if( type === 'update' ) {
            this.title = '修改分类信息';
            this.form.name = row.name;
            this.form.id = row.id;
            this.form.isUse = row.isUse===1;
          }
        },
        // 新增/修改分类 提交
        submitDialog(isSubmit) {
          this.dialogFormVisible = false;
          if( isSubmit ) {
            // 如果是提交，调用后端接口创建或者修改分类
            this.updateCatalogInfo(this.level);
          }
          this.form.name = "";
          this.form.isUse = false;
        },
        // 更新或者修改分类
        updateCatalogInfo(level) {
          // 分层级调用接口
          let params = {};
          let url = "";
          switch (level) {
            case 1:
              // 添加一级分类
              params = {
                "id": this.form.id,
                "name": this.form.name,
                "isUse": this.form.isUse===true ?1:0
              };
              url = "/addCataLog";
              break;
            case 2:
              // 添加二级分类
              params = {
                "id": this.form.id,
                "name": this.form.name,
                "isUse": this.form.isUse===true ?1:0,
                "cataLogId": this.parentId
              };
              url = "/addSubClass";
              break;
            case 3:
              // 添加类型
              params = {
                "id": this.form.id,
                "name": this.form.name,
                "isUse": this.form.isUse===true ?1:0,
                "subClassId": this.parentId
              };
              url = "/addType";
              break;
          }
          if( url !== "" ) {
            updateCatalog(url, params).then( res => {
              dealResultWithoutData(res.data);
              this.getTableData(this.parentId);
            }).catch(function (error) {
              console.log(error);
            });
          }
        },
        // 获取表格数据
        getTableData(id) {
          managerCatalog().then( res => {
            const data = dealResult(res.data);
            if( data != null ) {
              this.cataLogList = data.cataLogList;
              if( this.level === 1 ) {
                this.tableData = this.cataLogList;
              } else if ( this.level === 2 ) {
                // 二级分类
                this.cataLogList.forEach( item => {
                  if( item.id === id ) {
                    this.subClassList = item.subClassList;
                    this.tableData = item.subClassList;
                  }
                })
              } else if( this.level === 3 ) {
                // 二级分类
                this.cataLogList.forEach( item => {
                  if( item.id === this.grandfatherId ) {
                    this.subClassList = item.subClassList;
                  }
                });
                // 三级分类
                this.subClassList.forEach( item => {
                  if( item.id === id ) {
                    this.typeList = item.types;
                    this.tableData = item.types;
                  }
                })
              }
            }
          }).catch(function (error) {
            console.log(error);
          })
        }
      }
    }
</script>

<style scoped>

</style>
