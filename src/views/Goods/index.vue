<template>
  <div class="goods-conatiner">

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!-- 头部搜索 -->
      <div style="" class="input-box el-row">
        <div class="el-col el-col-8 search-input">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <i
              class="el-input__icon  el-icon-circle-close"
              slot="suffix"
              v-if="input"
              @click="removeSearch">
            </i>
            <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
          </el-input>
        </div>
        <div class="el-col el-col-4 add-btn">
          <el-button type="primary" @click="$router.push('/goods/add')">添加商品</el-button>
        </div>
      </div>

      <!-- 主体表格 -->
      <div class="text item">
        <el-table
          border
          stripe
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="#"
            width="48">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            width="1085">
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格(元)"
            width="120">
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="90">
          </el-table-column>
          <el-table-column
            prop="add_time"
            label="创建时间"
            width="140">
            <template slot-scope="scope"> {{scope.row.add_time | formatDates}} </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delClick(scope.row.goods_id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        :page-sizes="[5, 10, 15, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { getGoodsList, getGoodSearch, removeGoods } from '@/api/goods.js'
export default {
  data () {
    return {
      tableData: [],
      input: '', // 输入框的值
      pagenum: 1, // 请求的页数
      pagesize: 10, // 请求的条数
      currentPage: 1, // 页码
      total: 0 // 总条数
    }
  },

  created () {
    this.loadGoodsList()
  },

  methods: {
    // 获取数据
    async loadGoodsList () {
      const res = await getGoodsList({
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      this.tableData = res.data.goods
      this.total = res.data.total
    },

    // 搜索
    async onSearch () {
      console.log(this.input)
      const res = await getGoodSearch(this.input)
      console.log(res)
      this.tableData = []
      this.tableData.push(res.data)
      this.total = res.data.total || this.tableData.length
    },

    removeSearch () {
      this.input = ''
      this.loadGoodsList()
    },

    // 删除
    async delClick (id) {
      await removeGoods(id)
      this.loadGoodsList()
    },

    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.loadGoodsList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.loadGoodsList()
    }
  }
}
</script>

<style scoped lang='less'>
.goods-conatiner {
  font-size: 12px;

  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 14px;
  }

  .box-card {
    .input-box{
      margin: 0 -10px;
      .search-input {
        padding: 0 10px;
      }

      .add-btn {
        padding: 0 10px;
      }
    }

  }

  .el-table {
    font-size: 12px;
    margin: 15px 0;
  }
}
</style>
