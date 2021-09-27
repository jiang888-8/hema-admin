<template>
  <div>
    <el-form ref="form" :label-position="labelPosition">
      <el-form-item label="板式">
        <el-radio-group size="medium">
          <el-checkbox v-model="checked1" label="4646" border></el-checkbox>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="1212">
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked1: true,
      labelPosition: 'top'
    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped>

</style>
