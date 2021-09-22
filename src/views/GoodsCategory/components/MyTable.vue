<template>
  <div class="tab-con">
    <tree-table :data="tableData1" :columns="columns" :selection-type="false" :expand-type="false"
       show-index index-text="#" border :show-row-hover="false">
          <template #isok="scope">
             <i v-if="!scope.row.cat_deleted" class="el-icon-success" style="color: green;"></i>
              <i v-else class="el-icon-error" style="color: red;"></i>
          </template>
            <!-- 排序 -->
          <template #sort="scope">
            <el-tag :type="miStatusColor(scope.row.cat_level)">
              {{cat_level(scope.row.cat_level)}}</el-tag>
          </template>
            <!-- 操作 -->
          <template #operate="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click="handleEdit(scope.row.cat_id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click.native.prevent="handleDelete(scope.row.cat_id)">删除</el-button>
          </template>
      </tree-table>
  </div>
</template>

<script>
import { goodDelete } from '@/api/categ.js'
export default {
  props: {
    tableData1: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 为table表格各列的配置定义
      columns: [
        {
          label: '分类名称', // 列标题名称
          prop: 'cat_name' // 对应列内容的属性名
        },
        {
          label: '是否有效',
          type: 'template', // 表示：把当前列定义为模板列
          template: 'isok' // 表示当前这列使用的模板名称
        },
        {
          label: '排序',
          type: 'template', // 表示：把当前列定义为模板列
          template: 'sort'
        },
        {
          label: '操作',
          type: 'template', // 表示：把当前列定义为模板列
          template: 'operate' // 表示当前这列使用的模板名称
        }
      ]
    }
  },

  created () {

  },

  methods: {
    // 改变颜色
    cat_level (val) {
      if (val === 0) {
        return '一级'
      } else if (val === 1) {
        return '二级'
      } else {
        return '三级'
      }
    },

    // 改变文本
    miStatusColor (val) {
      if (val === 0) {
        return ''
      } else if (val === 1) {
        return 'success'
      } else if (val === 2 || val === null) {
        return 'warning'
      }
    },
    // 编辑请求
    handleEdit (index, row) {
      console.log(index, row)
    },
    // 删除请求
    async handleDelete (index) {
      try {
        const res = await goodDelete(index)
        console.log(res)
        this.$message({
          message: '删除成功',
          type: 'success',
          center: true

        })
        this.$emit('Delete')
      } catch (error) {
        this.$message.error('删除失败')
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
