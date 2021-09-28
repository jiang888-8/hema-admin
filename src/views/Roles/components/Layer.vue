<template>
  <div>
    <el-dialog
      title="分配权限"
      :visible="dialogVisible"
      width="30%"
      @close="onclose">
        <el-tree
          default-expand-all
          :data="TreeList"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-checked-keys="defaultKey"
          :props="defaultProps">
        </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onclose">取 消</el-button>
        <el-button type="primary" @click="onRolesList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { RoleAuthorization } from '@/api/roles.js'
export default {
  props: {
    // 弹层是否关闭
    dialogVisible: {
      type: Boolean,
      required: true
    },
    // 树形数据
    TreeList: {
      type: Array,
      required: true
    },
    // 树形选中数据
    defaultKey: {
      type: Array,
      required: true
    },
    treeId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },

  created () {

  },

  methods: {
    // 点击关闭
    onclose () {
      this.$emit('onClose')
    },
    // 点击确定
    async onRolesList () {
      try {
        const keys = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
        const id = keys.join(',')
        await RoleAuthorization(this.treeId, { rids: id })
        this.onclose()
      } catch (error) {

      }
    }
  }
}
</script>

<style scoped>

</style>
