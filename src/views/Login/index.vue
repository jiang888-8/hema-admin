<template>
  <div id="app">
    <div class="login-container">
      <div class="login-box">
        <div class="logo-box">
          <img src="../../assets/logo.b5a855ee.png" alt="">
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input prefix-icon='el-icon-user-solid' v-model.trim="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" prefix-icon='el-icon-lock' v-model.trim="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginCheck } from '@/api/user.js'
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created () {

  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await loginCheck({
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            console.log(res.meta.status)
            if (res.meta.status !== 200) {
              this.$message(res.meta.msg)
              return
            }
            this.$store.commit('setUser', res.data.token)
            this.$router.push('/home')
          } catch (err) {
            alert('系统异常!')
            console.log(err)
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang='less'>
#app {
  .login-container{
    height: 100%;
    background-color: #2b4b6b;

    .login-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 450px;
      height: 300px;
      background-color: #fff;

      .logo-box {
        position: absolute;
        top: 0%;
        left: 50%;
        width: 130px;
        height: 130px;
        background-color: #fff;
        transform: translate(-50%,-50%);
        border-radius: 50%;
        padding: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      /deep/.el-form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;

        .el-form-item {
          width: 100%;
          .el-form-item__content {
            margin-left: unset!important;
          }
        }

        .btns {
          display: flex;
          justify-content: flex-end;
        }

      }
    }
  }

}
</style>
