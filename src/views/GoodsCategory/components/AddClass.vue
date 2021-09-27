<template>
  <div class="con">
    <el-button  type="primary" @click="dialogFormVisible = true">添加分类</el-button>
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible" @close="addCateDialogClosed">
        <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
        class="demo-ruleForm">
          <el-form-item label="分类名称：" prop="cat_name">
            <el-input v-model="addCateForm.cat_name"></el-input>
          </el-form-item>
          <div class="block">
          <el-form-item label="父级分类：">
                <el-cascader
                  v-model="inputItem"
                  :options="options"
                  :props="props"
                  :clearable='true'
                  :change-on-select="true"
                  @change="handleChange"
                  ></el-cascader>
          </el-form-item>
          </div>

          <el-form-item>
            <div class="addBtn">
              <el-button type="primary"
            :plain="true" @click="submitForm" >确定</el-button>
              <el-button @click="resetForm">取消</el-button>

            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import { goodCategList, goodAddClass } from '@/api/categ.js'
export default {
  data () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,

      addCateForm: {
        cat_name: '', // 分类名称
        cat_pid: 0,
        cat_level: 0 // 0表示一级分类；1表示二级分类；2表示三级分类
      },
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      options: [],
      inputItem: [],
      // 定义规则
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.loadCategList()
  },

  methods: {
    addCateDialogClosed () {
      // 表单内容重置为空
      this.$refs.addCateFormRef.resetFields() // 通过ref引用调用resetFields方法
      // 选中的父级分类的ID数组 重置为空
      this.inputItem = []
      // 父分类id 和 当前分类等级 重置为空
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    },

    // 点击里面的联机选择器更改请求数据
    handleChange (value) {
      console.log(value)
      // 如果 数据中的 length 大于0，则证明选中了父级分类
      // 反之，就说明没有选中任何父级分类
      if (value.length > 0) {
        // 选择最后一项当作父分类ID赋值
        this.addCateForm.cat_pid = value[value.length - 1]
        // 为当前要添加的分类的等级赋值
        this.addCateForm.cat_level = value.length
        return
      } else {
        // 父分类ID赋值
        this.addCateForm.cat_pid = 0
        // 为当前要添加的分类的等级赋值
        this.addCateForm.cat_level = 0
      }
      console.log(this.addCateForm)
    },
    // 发起请求添加数据
    async submitForm () {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return
        try {
          const res = await goodAddClass(this.addCateForm)
          console.log(res)
          // 数据添加到数组里
          this.loadCategList()
          // 传父组件，更改数据
          this.$emit('newAdd')

          // 关闭弹层
          this.dialogFormVisible = false
          // 提示消息
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } catch (error) {
          this.$message.error('添加失败')
        }
      })
    },
    // 取消按钮
    resetForm () {
      this.$refs.addCateFormRef.resetFields()
      this.dialogFormVisible = false
    },
    // 发起请求
    async loadCategList () {
      try {
        const res = await goodCategList({
          type: 2
        })
        this.options = res.data
      } catch (error) {
      }
    }
  }
}

</script>

<style scoped lang="less">
.con{
  /deep/.block{
    .el-cascader{width: 100%;}
    .el-cascader .el-input .el-input__inner{
      height: 40px;
    }
    .el-input__suffix{
        right: 15px;
      }
  }
  .addBtn{
      margin: 30px 0 20px;
      display: flex;
      flex-direction: row-reverse;
      /deep/ .el-button{
        width: 74px;
        height: 40px;
      }
      /deep/.el-button+.el-button{
        margin-right: 12px;
      }
      }
}
</style>
