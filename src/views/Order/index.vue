<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 卡片视图区域 -->
 <el-card class="card">
      <!--      搜索-->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--      表格-->
      <el-row>
        <el-table :data="orderList" border style="width: 100%">
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="order_number" label="订单编号"></el-table-column>
          <el-table-column prop="order_price" label="订单价格" width="250px"></el-table-column>
          <el-table-column label="是否支付" width="250px">
            <template v-slot="scope">
              <el-tag type="danger" v-if="scope.row.pay_status === '0'">未付款</el-tag>
              <el-tag type="success" v-else>已付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货" width="250px"></el-table-column>
          <el-table-column label="下单时间" width="250px">
            <template v-slot="scope">
              {{ scope.row.create_time | dataFormat }}
            </template>
          </el-table-column>
<el-table-column label="操作" width="150px">
            <template v-slot="">
              <el-tooltip class="item" effect="dark" content="修改地址" placement="top">
                <el-button type="primary" icon="el-icon-edit" circle @click="showBox"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="物流状态" placement="top">
                <el-button type="success" icon="el-icon-location" circle @click="showProgressBox"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--      分页区-->
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getorderList } from '@/api/order.js'

export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10

      },
      total: 0,
      orderList: []
    }
  },

  created () {
    this.getOrderList()
  },

  methods: {
    // 获取订单列表数据
    async getOrderList () {
      const res = await getorderList(this.queryInfo)
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败!')
      }
      this.$message.success('获取订单列表成功!')
      this.orderList = res.data.goods
      this.total = res.data.total
      console.log(res, this.orderList, this.total)
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange (newCurrent) {
      this.queryInfo.pagenum = newCurrent
      this.getOrderList()
    }
  }
}
</script>

<style scoped>
.card{
  margin-top: 20px;
}
</style>
