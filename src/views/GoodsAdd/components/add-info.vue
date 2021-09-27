<template>
  <div class="info-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model.number="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品重量" prop="weight">
        <el-input v-model.number="ruleForm.weight"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="amount">
        <el-input v-model.number="ruleForm.amount"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="sort">
        <el-cascader
        v-model="value"
        :options="options"
        :props="props"
        @change="handleChange"
        @focus='onFocus'>
      </el-cascader>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { getSortList } from '@/api/goods.js'
export default {
  data () {
    return {
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },

      value: [],
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        expandTrigger: 'hover'
      }
    }
  },

  props: {
    ruleForm: {
      type: Object,
      required: true
    }
  },

  created () {

  },

  methods: {
    handleChange (value) {
      this.ruleForm.sort = this.value
    },

    // 获取分类列表
    async onFocus () {
      const res = await getSortList()
      this.options = res.data
    }
  }
}
</script>

<style scoped lang='less'>
.info-container {
  /deep/.el-form {
    .el-form-item {
      .el-form-item__label {
        padding: 0 0 10px;
      }

      .el-cascader {
        display: block;
        width: 217px;
      }
    }

  }
}
</style>
