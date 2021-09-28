import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import UsersList from '@/views/UsersList'
import Welcome from '@/views/Welcome'
import Roles from '@/views/Roles'
import Privilege from '@/views/Privilege'
import Goods from '@/views/Goods'
import Sort from '@/views/Sort'
import GoodsCategory from '@/views/GoodsCategory'
import Order from '@/views/Order'
import Data from '@/views/Data'
import GoodsAdd from '@/views/GoodsAdd'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/home',
    redirect: '/welcome',
    component: Home,
    children: [
      {
        // 登录
        path: '/welcome',
        component: Welcome
      },
      {
        // 用户列表
        path: '/users_list',
        component: UsersList
      },
      {
        // 角色列表
        path: '/roles',
        component: Roles
      },
      {
        // 权限列表
        path: '/privilege',
        component: Privilege
      },
      {
        // 商品列表
        path: '/goods',
        component: Goods
      },
      {
        // 分类参数
        path: '/sort',
        component: Sort
      },
      {
        // 商品分类
        path: '/goods_category',
        component: GoodsCategory
      },
      {
        // 订单列表
        path: '/order',
        component: Order
      },
      {
        // 数据报表
        path: '/data',
        component: Data
      },
      // 添加商品
      {
        path: '/goods/add',
        component: GoodsAdd
      }
    ]
  },

  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
