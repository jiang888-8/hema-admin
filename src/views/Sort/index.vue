<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容 -->
  <div class="box-card">
    <!-- 提示信息 -->
    <div>
       <el-alert
        show-icon
        :closable="false"
        title="注意：只允许为第三级分类设置相关参数!"
        type="warning">
      </el-alert>
    </div>
    <!-- 分类选择 -->
    <div class="classification">
      <span>选择商品分类:</span>
      <!-- 选择商品分类的级联选择框 -->
       <el-cascader
         v-model="value"
         class="el-select"
         expand-trigger="hover"
         :options="catelist"
         :props="cateProps"
         @change="handleChange">
       </el-cascader>
    </div>
    <!-- 静态动态参数 -->
    <div class="parameter">
      <el-tabs v-model="activeName" @tab-click="handleTabClick" >
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
           <el-button @click="addDialogVisible=true" :disabled="isBtnDisabled" type="primary" size="mini">添加参数</el-button>
            <div class="table">
                <el-table
                  :data="manyTableData"
                  border
                  stripe
                  style="width: 100% ; font-size: 12px">
                  <!-- 展开行 -->
                  <el-table-column
                  type="expand"
                  width="48">
                  </el-table-column>
                  <!-- 索引列 -->
                  <el-table-column
                    label="#"
                    type="index"
                    width="48">
                  </el-table-column>
                  <el-table-column
                    prop="attr_name"
                    width="770"
                    label="参数名称">
                  </el-table-column>
                  <el-table-column
                    prop="operation"
                    width="773"
                    label="操作">
                    <template>
                      <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                      <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
         </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button @click="addDialogVisible=true" :disabled="isBtnDisabled" type="primary" size="mini">添加属性</el-button>
          <div class="table">
              <el-table
                :data="onlyTableData"
                border
                stripe
                style="width: 100% ; font-size: 12px">
                <el-table-column
                type="expand"
                width="48">
                </el-table-column>
                <el-table-column
                  label="#"
                  type="index"
                  width="48">
                </el-table-column>
                <el-table-column
                  prop="attr_name"
                  width="770"
                  label="参数名称">
                </el-table-column>
                <el-table-column
                  prop="operation"
                  width="770"
                  label="操作">
                </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <!-- 添加参数的对话框 -->
  <el-dialog
    :title="'添加' + titleTExt"
    :visible.sync="addDialogVisible"
    @close="addDialogClosed"
    width="50%">
    <!-- 添加参数的对话框 -->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
      <el-form-item :label="titleTExt" prop="attr_name">
        <el-input v-model="addForm.attr_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addParams">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import { getCategoriesList, getCategoriesAttributes, setCategoriesAttributes } from '@/api/sort.js'
export default {
  data () {
    return {
      activeName: 'many', // 被激活标签页的名字
      value: [], // 级联选择框双向绑定到的数组
      catelist: [], // 商品分类列表
      cateProps: { // 级联选择框的配置对象
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      manyTableData: [], // 动态参数的数据
      onlyTableData: [], // 静态参数的数据
      addDialogVisible: false, // 控制添加对话框的显示与隐藏
      addForm: { // 添加参数的表单数据对象
        attr_name: ''
      },
      addFormRules: { // 添加表单的验证规则对象
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    // 如果按钮需要被禁用，返回true
    isBtnDisabled () {
      if (this.value.length !== 3) {
        return true
      }
      return false
    },
    // 当前选中的三级分类的id
    cateId () {
      if (this.value.length === 3) {
        return this.value[2]
      }
      return null
    },
    // 动态计算标题的文本
    titleTExt () {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  },

  created () {
    this.getCateList()
  },

  methods: {
    // 获取所有的商品分类列表
    async getCateList () {
      const res = await getCategoriesList()
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      this.catelist = res.data
    },

    // 级联选择框选中项变化，会触发这个函数
    handleChange () {
      this.getParamsData()
    },

    // tab 页签点击事件的处理函数
    handleTabClick () {
      this.getParamsData()
    },

    // 获取参数的列表数据
    async getParamsData () {
      // 证明选中的不是三级分类
      if (this.value.length !== 3) {
        this.value = []
        return
      }
      // 证明选中的是三级分类
      console.log(this.value)
      // 根据所选分类的id, 和当前所处的面板, 获取对应的参数
      const res1 = await getCategoriesAttributes(this.cateId, { sel: this.activeName })
      if (res1.meta.status !== 200) {
        return this.$message.error('获取参数列表失败')
      }
      if (this.activeName === 'many') {
        this.manyTableData = res1.data
      } else {
        this.onlyTableData = res1.data
      }
    },

    // 监听添加对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },

    // 点击按钮，添加参数
    addParams () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const res = await setCategoriesAttributes(this.cateId, { attr_name: this.addForm.attr_name, attr_sel: this.activeName })
        if (res.meta.status !== 201) {
          return this.$message.error('添加参数失败')
        }
        this.$message.success('添加参数成功')
        this.addDialogVisible = false
        this.getParamsData()
      })
    }
  }
}
</script>

<style scoped lang="less">
  .box-card {
    background-color: #fff;
    padding: 20px;
    margin-top: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 3px;
     .classification {
      margin-top: 20px;
      .el-select {
        margin-left: 15px;
      }
    }
    .parameter {
      margin-top: 20px;
    }
    .classification {
      .el-select {
        margin-left: 15px;
      }
    }
    /deep/.table {
    margin-top: 15px;
    .el-table__empty-text {
      font-size: 14px !important;
    }
  }
  }
</style>
