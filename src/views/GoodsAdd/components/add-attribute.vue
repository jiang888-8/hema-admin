<template>
  <div>
    <el-form ref="form" :model="sizeForm" >
      <el-form-item label="主体-商品名称">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="显示-曲面">
        <el-input v-model="sizeForm.curved"></el-input>
      </el-form-item>
      <el-form-item label="系统-智能电视">
        <el-input v-model="sizeForm.television"></el-input>
      </el-form-item>
      <el-form-item label="外观-壁挂安装">
        <el-input v-model="sizeForm.wall_hanging"></el-input>
      </el-form-item>
      <el-form-item label="功耗-整机功率（W）">
        <el-input v-model="sizeForm.power"></el-input>
      </el-form-item>
      <el-form-item label="端口-模拟RF接口">
        <el-input v-model="sizeForm.port"></el-input>
      </el-form-item>
      <el-form-item label="音频-扬声器数量">
        <el-input v-model="sizeForm.amount"></el-input>
      </el-form-item>
      <el-form-item label="交互设备-无线键鼠">
        <el-input v-model="sizeForm.mouse"></el-input>
      </el-form-item>
      <el-form-item label="互联互通-多屏互动">
        <el-input v-model="sizeForm.interaction"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sizeForm: {
        name: 'TCL电视 55A950C',
        curved: '是',
        television: '智能电视',
        wall_hanging: '支持',
        power: '120瓦特',
        port: '有',
        amount: '2个',
        mouse: '支持',
        interaction: '支持'
      }
    }
  },

  created () {

  },

  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>
