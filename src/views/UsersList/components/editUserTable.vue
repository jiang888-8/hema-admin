<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="editUser">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { getUserInfo, editUserInfo } from '@/api/user.js'
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
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
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getUserInfoById()
  },

  methods: {
    // 根据id获取用户信息
    async getUserInfoById () {
      const res = await getUserInfo(this.userId)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户信息失败')
      }
      this.ruleForm = res.data
      console.log(res)
    },
    async editUser () {
      const res = await editUserInfo(this.userId, this.ruleForm)
      if (res.meta.status !== 200) {
        return this.$message.error('请求失败')
      }
      this.$message({
        message: '请求成功',
        type: 'success'
      })
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
