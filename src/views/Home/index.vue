<template>
  <div id="app">
    <el-container>
      <el-header>
        杭州22期后台管理系统
      <el-button class="right-btn">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
          router
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="rgb(51, 55, 68)"
          text-color="#fff"
          active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/users_list">用户列表</el-menu-item>
              </el-menu-item-group>

            </el-submenu>
            <el-submenu index='2'>
              <template slot="title">
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/roles">角色列表</el-menu-item>
                <el-menu-item index="/privilege">权限列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" >
              <template slot="title">
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/goods">商品列表</el-menu-item>
                <el-menu-item index="/sort">分类参数</el-menu-item>
                <el-menu-item index="/goods_category">商品分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/order">订单列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <span>数据统计</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/data">数据报表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  created () {

  },

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang='less'>
#app {
  height: 100%;
  /deep/.el-container {
    height: 100%;
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      font-size: 25px;
      color: #fff;
      background: #373d41;
      .right-btn {
        width: 70px;
        height: 40px;
      }
    }

    .el-container {
      height: 100%;

      .el-aside {
        background: #333744;

        .el-submenu {
          width: 200px;
        }
      }

    }

    .el-main {
      background-color: #eaedf1;
    }
  }
}
</style>
