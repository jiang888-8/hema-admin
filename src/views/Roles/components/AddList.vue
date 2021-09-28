<template>
  <div>
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" @close="onClosed">
      <el-form :model="addRolesForm" :rules="addFormRules" ref="addRolesForm" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClosed">取 消</el-button>
        <el-button type="primary" @click="addRolesUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRolerList } from '@/api/roles.js'
export default {
  props: {
    addDialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created () {

  },

  methods: {
    // 点击取消
    onClosed () {
      this.$emit('onclose')
    },
    // 点击确定添加
    addRolesUser () {
      this.$refs.addRolesForm.validate(async (valid) => {
        if (!valid) return
        try {
          const res = await addRolerList(this.addRolesForm)
          console.log(res)
          this.$emit('onclose')
          this.$emit('AddList')
        } catch (error) {

        }
      })
    }
  }
}
</script>

<style scoped lang='less'>

</style>
