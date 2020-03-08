<template>
  <!--修改资料-->
  <div class="tab-pane in" id="update-info">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input type="password" v-model="ruleForm.oldPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {updatePassword, dealResultWithoutData } from '../../api/api';
  import {goPage } from '../../util/index';
    export default {
      // 更新信息页面
      name: "update-info",
      data() {
        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        let validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        let validatePass3 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入旧密码'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {// 表单信息
            oldPwd: '',
            pass: '',
            checkPass: '',
          },
          rules: { // 校验规则
            oldPwd: [
              { validator: validatePass3, trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          },
        }
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              const param = this.getParam();
              updatePassword(param).then( res => {
                const data = dealResultWithoutData(res.data);
                if( data === true ) {
                  this.$store.state.user = null;
                  this.goIndexPage();
                }
              }).catch(function (err) {
                console.log(err);
              })
            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        getParam() {
          return {
            "oldPwd": this.ruleForm.oldPwd,
            "newPwd": this.ruleForm.newPwd,
            "uid": this.$store.state.user.id,
          }
        },
        goIndexPage() {
          goPage('/');
        }
      }
    }
</script>

<style scoped>

</style>
