<template>
  <div class="goods-conatiner">
    商品列表

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div style="margin-top: 15px;" class="input-box">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

      </div>
      <div class="text item">
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="#"
            width="48">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            width="1085">
          </el-table-column>
          <el-table-column
            prop="address"
            label="商品价格(元)"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="商品重量"
            width="90">
          </el-table-column>
          <el-table-column
            prop="address"
            label="创建时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="120">
          </el-table-column>
        </el-table>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='less'>
.goods-conatiner {
  .box-card {
    .input-box {
      width: 130px;
    }
  }
}
</style>
