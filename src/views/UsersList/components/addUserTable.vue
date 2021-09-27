<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { addUserInfo } from '@/api/user.js'
export default {
  props: {
  },
  data () {
    return {
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机格式不正确', trigger: ['blur', 'change'] }
        ]
      }
    }
  },

  created () {

  },

  methods: {
    // 点击取消
    resetForm () {
      this.$emit('onCancel', false)
      // 重置表单内容
      this.$refs.ruleForm.resetFields()
    },
    // 点击添加新用户
    addUser () {
      // 对表单内容进行校验
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return
        // 校验通过发起添加用户的请求
        const res = await addUserInfo(this.ruleForm)
        if (res.meta.status !== 201) {
          this.$message.error('创建失败')
          return
        }
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.$emit('updateList')
      })
      this.$emit('onCancel', false)
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
