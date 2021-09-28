<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input
            v-model="queryInfo.query"
            placeholder="请输入内容"
            clearable
            @clear="onGetUserList"
            >
              <el-button slot="append" icon="el-icon-search" @click="onGetUserList" ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ">
          <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
          </div>
        </el-col>
      </el-row>
      <userTable
      :tableData='userList'
      @delUserList='onGetUserList'
      @onGetUserList='onGetUserList'
      @setRole='setRole' />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 4, 6, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="false"
        >
      </el-pagination>
    </el-card>
    <!-- 添加用户弹出框 -->
      <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      width="50%"
      >
        <addUserTable @onCancel='onCancel' @updateList='onGetUserList'/>
      </el-dialog>
      <!-- 分配角色 -->
      <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      >
      <div>
        <p>当前的用户： {{userInfo.username}}</p>
        <p>当前的角色： {{userInfo.role_name}}</p>
        <p>
          分配新角色：
          <el-select v-model="setRoleId" placeholder="请选择">
          <el-option v-for="item in roleList" :key='item.id' :label="item.roleName" :value="item.id"></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="onSaveRole">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</template>

<script>
import userTable from './components/usersTable.vue'
import addUserTable from './components/addUserTable.vue'
import { getUserList, getRoleList, putUserRole } from '@/api/user.js'
export default {
  data () {
    return {
      input: '',
      userList: [],
      total: 1,
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页多少条数据
        pagesize: 2
      },
      addFormRules: {},
      // 控制添加用户的显示与隐藏
      dialogFormVisible: false,
      // 控制角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 已选中的id值
      setRoleId: '',
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      roleList: []
    }
  },
  components: {
    userTable,
    addUserTable
  },
  created () {
    this.onGetUserList()
  },

  methods: {
    handleSizeChange (val) {
      if (val === '') return
      this.queryInfo.pagesize = val
      this.onGetUserList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      if (val === '') return
      this.queryInfo.pagenum = val
      this.onGetUserList()
      console.log(`当前页: ${val}`)
    },
    async onGetUserList () {
      const res = await getUserList({
        query: this.queryInfo.query,
        pagenum: this.queryInfo.pagenum,
        pagesize: this.queryInfo.pagesize
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表数据失败')
      }
      this.input = ''
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 点击关闭添加用户弹窗
    onCancel (flag) {
      this.dialogFormVisible = flag
    },
    // 点击角色图标
    async setRole (row) {
      this.userInfo = (this.userList.filter(item => item.id === row.id))[0]
      // this.userInfo = row
      console.log(this.userInfo)
      const res = await getRoleList()
      this.roleList = res.data
      if (res.meta.status !== 200) {
        this.$message.error('获取角色列表失败')
      }
      this.setRoleDialogVisible = true
    },
    // 完成角色分配
    async onSaveRole () {
      if (!this.setRoleId) {
        return this.$message.error('亲，请选择角色哟')
      }
      try {
        await putUserRole(this.userInfo.id, this.setRoleId)
        this.$message.success('亲，分配成功了哟')
      } catch (err) {
        this.$message.error('亲，选择角色失败哟')
      }
      // this.setRole()
      this.onGetUserList()
      this.setRoleDialogVisible = false
    }
  }
}
</script>

<style scoped lang='less'>
.text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .box-card {
    width: 100%;
  }
   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .grid-content {
    position: relative;
    border-radius: 4px;
    min-height: 36px;

  }
  }
  .el-col:nth-child(1) {
    border-radius: 4px;
    margin-right: 10px;
  }
  .el-col:nth-child(2) {
    border-radius: 4px;
    margin-left: 10px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .el-dialog {
    padding: 30px 20px;
    font-size: 14px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item:nth-child(3){
    margin-top: 7px;
  }
</style>
