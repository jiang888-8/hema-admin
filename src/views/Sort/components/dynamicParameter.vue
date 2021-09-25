<template>
  <div>
    <el-button type="primary" :disabled="isBtnDisabled" size="mini">添加参数</el-button>
    <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100% ; font-size: 12px">
          <el-table-column
          width="48">
          </el-table-column>
          <el-table-column
            label="#"
            prop="id"
            width="48">
          </el-table-column>
          <el-table-column
            prop="name"
            width="770"
            label="参数名称">
          </el-table-column>
           <el-table-column
            prop="operation"
            width="773"
            label="操作">
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },

  props: {
    val: {
      type: Array,
      required: true
    }
  },

  created () {

  },

  computed: {
    isBtnDisabled () {
      if (this.val.length !== 3) {
        return true
      }
      return false
    },
    // 当前选择的三级分类的id
    cateId () {
      if (this.val.length === 3) {
        return this.val[2]
      }
      return null
    }
  },

  methods: {

  }
}
</script>

<style scoped lang='less'>
  /deep/.table {
    margin-top: 15px;
    .el-table__empty-text {
      font-size: 14px !important;
    }
  }
</style>
