<template>
  <el-main>
    <el-form
      :model="ReginForm"
      ref="ReginForm"
      :rules="rule"
      class="regform"
      label-width="0">
        <h3 style="text-align: center;margin-bottom: 15px;">用户注册</h3>

      <el-form-item prop="userEmail">
        <el-input type="email" v-model="ReginForm.userEmail" placeholder="电子邮件">
        </el-input>
      </el-form-item>

      <el-form-item prop="userName">
        <el-input type="text" v-model="ReginForm.userName" placeholder="用户名">
        </el-input>
      </el-form-item>

      <el-form-item prop="userPasswd">
        <el-input type="password" v-model="ReginForm.userPasswd" placeholder="密码">
        </el-input>
      </el-form-item>

      <el-form-item prop="confirmpassword">
        <el-input type="password" v-model="ReginForm.confirmpassword" placeholder="确认密码">
        </el-input>
      </el-form-item>

      <el-form-item >
        <el-button
          type="success"
          class="submitBtn"
          round
          @click.native.prevent="submit"
          :loading="logining">
          注册
        </el-button>
        <el-button
          type="primary"
          class="resetBtn"
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <hr>
        <p style="text-align: center;">
          已经有账号，马上去<span class="to" @click="toLogin">登录</span>
        </p>
      </el-form-item>

    </el-form>
  </el-main>
</template>
<script>
import { signUp, dealResult } from '../api/api'
export default {
  name: 'register',
  data () {
    let confirmpasswordCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码是必须的'))
      } else if (value !== this.ReginForm.userPasswd) {
        return callback(new Error('两次输入的密码不一致'))
      } else {
        return callback()
      }
    }
    return {
      ReginForm: {
        userName: '',
        userPasswd: '',
        confirmpassword: '',
        userEmail: ''
      },
      logining: false,
      rule: {
        userName: [
          {
            required: true,
            max: 14,
            min: 2,
            message: '用户名是必须的，长度为2-14位',
            trigger: 'blur'
          }
        ],
        userPasswd: [
          {
            required: true,
            message: '密码是必须的！',
            trigger: 'blur'
          }
        ],
        confirmpassword: [
          {
            required: true,
            validator: confirmpasswordCheck,
            trigger: 'blur'
          }
        ],
        userEmail: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的电子邮件格式(xxx@xxx.com)',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted: function () {
    this.$store.state.activeIndex = '6'
  },
  methods: {
    submit () {
      this.$refs.ReginForm.validate(valid => {
        if (valid) {
          this.logining = true
          signUp(this.ReginForm).then(res => {
            const msg = res.data.message
            const data = dealResult(res.data)
            if (data !== null) {
              this.$store.state.user = data.user
              this.$message.success({
                message: msg,
                duration: 2000
              })
              this.$router.push('/')
            }
            this.logining = false
          }).catch(function (err) {
            console.log(err)
          })
        } else {
          this.$message.error({
            message: '请检查输入信息后重试!',
            duration: 2000
          })
        }
      })
    },
    reset () {
      this.$refs.ReginForm.resetFields()
    },
    toLogin () {
      this.$store.state.dialogLoginModelVisible = true
    }
  }
}
</script>

<style scoped>
  .regform {
    margin: 20px auto;
    width: 310px;
    background: #fff;
    box-shadow: 0 0 10px #B4BCCC;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
  }
  .submitBtn {
    width: 65%;
  }
  .to {
    color: #FA5555;
    cursor: pointer;
  }
</style>
