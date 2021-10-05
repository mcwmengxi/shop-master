import Vue from 'vue'
import VueRouter from 'vue-router'

import Goods from '../view/Shop/ShopGoods/ShopGoods.vue'
import Rating from '../view/Shop/ShopRating/ShopRating.vue'
import Info from '../view/Shop/ShopInfo/ShopInfo.vue'

//一般给顶级组件使用路由懒加载
// ()=>import('../view/Shop/ShopGoods/ShopGoods.vue')
// ()=>import('../view/Shop/ShopRating/ShopRating.vue')
// ()=>import('../view/Shop/ShopInfo/ShopInfo.vue')


Vue.use(VueRouter)
const Login= r =>require.ensure([],() => r(require('../view/Login/Login.vue')),'Login')
const Shop = r =>require.ensure([],()=> r(require('../view/Shop/Shop.vue')),'Shop')
export default new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes:[
        {
            path: '/',
            name: 'Index',
            redirect:'/home',
        },
        {
            path: '/home',   
            name: 'Home',
            meta:{
                showFooter:true
            },
            component: () => import('../view/Home/Home.vue')
        },
        {
            path: '/serach',
            name: 'Serach',
            meta:{
                showFooter:true
            },
            component: () => import('../view/Serach/Serach.vue')
        },
        {
            path: '/order',
            name: 'Order',
            meta:{
                showFooter:true
            },
            component: () => import('../view/Order/Order.vue')
        },
        {
            path: '/owner',
            name: 'Owner',
            meta:{
                showFooter:true
            },
            component: () => import('../view/Owner/Owner.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path:'/shop',
            name:'Shop',
            component:Shop,
            children:[
                {
                    path:'',
                    redirect:'/shop/goods'
                },
                {
                    path:'/shop/goods',
                    name:'Goods',
                    component:Goods
                },
                {
                    path:'/shop/rating',
                    name:'Rating',
                    component:Rating
                },
                {
                    path:'/shop/info',
                    name:'Info',
                    component:Info
                },
            ]
        }
    ]
    
})

