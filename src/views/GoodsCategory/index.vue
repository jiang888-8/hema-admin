<template>
  <div id="category-con">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-card class="box-card">
         <!-- 按钮 -->
      <AddClass @newAdd="newAdd"/>
      <!-- 表格 -->
      <MyTable :tableData1="tableData1" @Delete="Delete"/>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="pageSizes"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          >
        </el-pagination>
      </div>
    </el-card>
  </div>
  </div>
</template>

<script>
import AddClass from './components/AddClass.vue'
import MyTable from './components/MyTable.vue'

import { goodCategList } from '../../api/categ.js'
export default {
  components: {
    AddClass,
    MyTable
  },
  data () {
    return {
      tableData1: [],
      pageSizes: [1, 2, 10, 20],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      currentPage4: 1

    }
  },

  created () {
    this.loadCategList()
  },

  methods: {
    // 子组件删除后重新调用获取数据
    Delete () {
      this.loadCategList()
    },
    // 子组件添加成功后重新调用获取数据
    newAdd () {
      this.loadCategList()
    },
    // 每页多少条数据
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.loadCategList()
    },
    // 当前处于那页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.loadCategList()
    },

    // 发起请求
    async loadCategList () {
      try {
        const res = await goodCategList({
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })

        if (res.data && !res.data.result) {
          this.tableData1 = res.data
        } else {
          this.tableData1 = res.data.result
        }
        console.log(res)

        this.total = res.data.total
      } catch (error) {
      }
    }
  }
}
</script>

<style scoped lang="less">
#category-con{
   .content{
      margin-top: 15px;
  }
}
</style>
