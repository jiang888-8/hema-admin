<template>
  <div class="roles-con">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button  type="primary" @click="addDialogVisible = true">添加角色</el-button>
      <!-- 表格数据 -->
      <TableCon
      :RolerList="RolerList"
      @onLayer="onLayer"
      @onDeleteRolerAll="loadRolerList"/>
      <!-- 分配权限弹框 -->
      <Layer
      :dialog-visible.sync="dialogVisible"
      @onClose="onClose"
      :TreeList="TreeList"
      :defaultKey="defaultKey"
      :treeId="treeId"
      />
      <!-- 添加角色 -->
      <AddList :addDialogVisible="addDialogVisible"
      @onclose="addDialogVisible=false"
      @AddList="loadRolerList"/>
    </el-card>
  </div>
</template>

<script>
import { getRolerList, getTreeList } from '@/api/roles.js'
import TableCon from './components/TableCon.vue'
import Layer from './components/Layer.vue'
import AddList from './components/AddList.vue'
export default {
  components: {
    TableCon,
    Layer,
    AddList
  },
  data () {
    return {
      // 角色列表
      RolerList: [],
      // 分配权限数据
      TreeList: [],
      // 分配权限弹框控制
      dialogVisible: false,
      // 添加角色弹框控制
      addDialogVisible: false,
      // 树形选中
      defaultKey: [],
      treeId: ''
    }
  },

  created () {
    this.loadRolerList()
  },

  methods: {
    // 关闭树形弹窗，树形选中数据清空，刷新视图变化
    onClose () {
      this.dialogVisible = false
      this.defaultKey = []
      this.loadRolerList()
    },

    // 点击分配角色
    async onLayer (row) {
      this.dialogVisible = true
      this.treeId = row.id
      console.log(this.treeId)
      // 获取权限列表请求
      const res = await getTreeList('tree')
      this.TreeList = res.data
      // 拿到默认选中的数组
      this.getLeafKeys(row, this.defaultKey)
    },
    getLeafKeys (node, arr) {
      // 如果当前node没有children属性则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        return this.getLeafKeys(item, arr)
      }
      )
    },
    async loadRolerList () {
      try {
        const res = await getRolerList()
        console.log(res.data)
        this.RolerList = res.data
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style scoped lang="less">
.roles-con{
   .el-card{
      margin-top: 15px;
      .el-button{
        margin-bottom: 15px;
      }
  }
}
</style>
