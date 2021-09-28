<template>
  <div class="table-con">
    <el-table
      :data="RolerList"
      border
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props" >
            <div class="div-box" v-if="props.row.children.length">
              <el-row v-for="(item,index) in props.row.children" :key="index" class="row-box center">
                <el-col :span="8"><div class="grid-content bg-purple "><el-tag>{{item.length!==0?item.authName:'' }}</el-tag></div></el-col>

                <el-col :span="16" >
                  <el-row   v-for="(item1,index) in item.children" :key="index" class="border" >
                    <div class="grid-content bg-purple-light center ">
                      <el-col :span="8"><div class="grid-content bg-purple "> <el-tag class="right" type="success">{{item1.length!==0?item1.authName:''}}</el-tag></div></el-col>
                      <el-col :span="16"><div class="grid-content bg-purple "><el-tag
                      class="tagright"
                      type="warning"
                      closable
                      @close="onclose(props.row.id,obj1.id,props.row)"
                      v-for="(obj1,index) in item1.children"
                      :key="index">{{obj1.length!==0?obj1.authName:'' }}</el-tag></div></el-col>
                    </div>
                  </el-row >
                </el-col>
              </el-row>
            </div>
        </template>
      </el-table-column>
      <!-- 索引 -->
      <el-table-column
        label="#"
        type=index
        width="80px">
      </el-table-column>
      <!-- 角色名称 -->
      <el-table-column
        label="角色名称"
        prop="roleName">
      </el-table-column>
      <!-- 角色描述 -->
      <el-table-column
        label="角色描述"
        prop="roleDesc">
      </el-table-column>
      <!-- 操作 -->
       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          type="primary"
          @click="handleEdit(scope.row.cat_id)">编辑</el-button>
          <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click.native.prevent="handleDelete(scope.row.id)">删除</el-button>
          <el-button
          size="mini"
          type="warning"
          icon="el-icon-setting"
          @click.native.prevent="$emit('onLayer',scope.row)">分配权限</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { DeleteRoler, DeleteRolerAll } from '@/api/roles.js'
export default {
  props: {
    RolerList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      expandRowKeys: []
    }
  },

  created () {
  },

  methods: {
    // 删除角色
    handleDelete (Id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await DeleteRolerAll(Id)
        this.$message.success('删除成功!')
        this.$emit('onDeleteRolerAll')
      }).catch(() => {
        console.log('取消')
      })
    },
    // 点击x号删除权限
    onclose (roleId, rightId, row) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await DeleteRoler(roleId, rightId)
        this.$message.success('删除成功!')
        row.children = res.data
      }).catch(() => {
        console.log('取消')
      })
    }
  }
}
</script>

<style scoped lang="less">
.table-con{
  .div-box{
    padding: 20px 50px;
    .center{
      display: flex;
      align-items: center;
    }
      .row-box{
      padding: 10px 0;
      border-top: 1px solid #EBEEF5;
      border-bottom: 1px solid #EBEEF5;

      .border{
        border-top:1px solid #EBEEF5 ;
        padding: 15px 0;
        .right{
          margin-right: 150px;
        }
        .tagright{
          margin: 8px;
        }
      }
      .el-col-16{
       .border:nth-child(1){
          border-top:none ;
        }
      }
    }
  }

}
</style>
