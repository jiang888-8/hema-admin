<template>
  <div class="add-goods">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容 -->
    <el-card class="box-card">
      <el-alert
        title="添加商品信息"
        type="info"
        center
        :closable='false'
        show-icon>
      </el-alert>

      <!-- 步骤条 -->
      <el-steps :active="active" finish-status="success" align-center style="margin: 15px 0;font-size: 12px">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!--  -->
      <el-form ref="form"  >
        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="0">
            <AddInfo :ruleForm='ruleForm' />
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <AddParameters />
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <AddAtribute />
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <AddPhoto />
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <AddContent @add-click='addGoods' />
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import AddInfo from './components/add-info.vue'
import AddParameters from './components/add-parameters.vue'
import AddAtribute from './components/add-attribute.vue'
import AddPhoto from './components/add-photo.vue'
import AddContent from './components/add-content.vue'
import { addGoods } from '@/api/goods.js'
export default {
  data () {
    return {
      active: 0,
      tabPosition: 'left',
      activeName: '0',
      //
      ruleForm: {
        name: '',
        price: 0,
        weight: 0,
        amount: 0,
        sort: ''
      }
    }
  },

  components: {
    AddInfo,
    AddParameters,
    AddAtribute,
    AddPhoto,
    AddContent
  },

  created () {

  },

  methods: {
    handleClick (tab) {
      this.active = parseInt(tab.name)
    },

    // 添加
    async addGoods () {
      const { name, price, weight, amount, sort } = this.ruleForm
      const sorts = sort.join(',')
      try {
        await addGoods({
          goods_name: name,
          goods_cat: sorts,
          goods_price: price,
          goods_number: amount,
          goods_weight: weight
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>
/deep/.add-goods {
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 14px;
  }

  .el-step__title {
    font-size: 12px !important;
  }
}
</style>
