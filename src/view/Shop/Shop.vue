<template>
<div>
    <ShopHeader />
    <div class="tab">
        <div class="item ">
            <router-link to="/shop/goods" active-class="on"  replace>点餐</router-link>
        </div>
        <div class="item">
            <router-link to="/shop/rating" active-class="on" replace>评价</router-link>
        </div>
        <div class="item">
            <router-link to="/shop/info" active-class="on" replace>商家</router-link>
        </div>
    </div>
    <keep-alive>
        <router-view />
    </keep-alive>
</div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
export default {
    data(){
        return {
            IsShow:true
        }
    },
    components:{
        ShopHeader
    }
}
</script>
<style lang='scss' scoped>
.tab{
    width: 100%;
    display: flex;
    text-align: center;
    .item{
        height: 40px;
        flex: 1;
        display:flex;
        justify-content: center;
        align-items: center;
        a{
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-decoration: none;
            color: #7e8c8d;
        }
        .on{
            color:#3190e8;
            position: relative;
            &::after{
                content: "";
                width: 35px;
                height: 2px;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                background: #3190e8;
            }
        }
    }
}
</style>