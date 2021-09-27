<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="#"
          width="48">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          >
        </el-table-column>
        <el-table-column label="状态" prop="mg_state">
         <template slot-scope="scope">
           <!-- scope.row可以获取到要渲染的这一行的数据 -->
            <el-switch
            v-model="scope.row.mg_state"
            active-color="#409eff"
            inactive-color="#dcdfe6"
            @change="onChangeUserState(scope.row)"
            >
          </el-switch>
         </template>
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row.id)" icon="el-icon-edit"></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="userDelete(scope.row.id)" icon="el-icon-delete"></el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleRole(scope.row)" icon="el-icon-setting"></el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-dialog
        title="修改用户"
        :visible.sync="dialogVisible"
        width="50%"
        >
        <editUserTable @cancel='dialogVisible=false' @onCancel='onCancel' :userId='userId' />
      </el-dialog>
  </div>
</template>

<script>
import { getUserState, delUserInfo } from '@/api/user.js'
import editUserTable from './editUserTable.vue'
export default {
  name: 'userTable',
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      value: true,
      dialogVisible: false,
      dialogRole: false,
      userId: null
    }
  },

  created () {
    // this.updataUsersList()
  },
  components: {
    editUserTable
  },
  methods: {
    updataUsersList () {
      // this.tableData = this.userList
    },
    // 修改用户状态
    async onChangeUserState (userInfo) {
      const res = await getUserState(userInfo.id, userInfo.mg_state)
      console.log(res)
    },
    // 删除用户信息
    userDelete (id) {
      this.$confirm('此操作将永久删除该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delUserInfo(id)
        if (res.meta.status !== 200) {
          return this.$message.error('删除失败')
        }
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$emit('delUserList')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit (id) {
      this.dialogVisible = true
      this.userId = id
    },
    onCancel () {
      this.dialogVisible = false
      this.$emit('onGetUserList')
    },
    // 分配角色弹出框
    handleRole (row) {
      this.dialogRole = true
      this.$emit('setRole', row)
    }
  }
}
</script>

<style scoped>
.el-table {
    margin: 15px 0;
  }
</style>
