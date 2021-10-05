<template>
<div>
    <div class="shopcart">
        <div class="content">
            <div class="content_left" @click="Popup">
                <div class="shop_cart">
                    <div class="num" v-if="totalCount">
                        {{totalCount}}
                    </div>
                    <div class="icon_cart" :class="{active:totalCount}">
                        <i class="iconfont icon-shopping_cart" ></i>
                    </div>
                </div>
                <div class="total_price">
                    <div class="goods_price">￥{{totalPrice}}</div>
                    <div class="delivery_price">另需配送费￥{{info.deliveryPrice}}元</div>
                </div>
            </div>
            <div class="content_right" :class="priceClass">
                {{priceText}}
            </div>
        </div>
         
        <transition name="move">
            <div class="shopcart_list" v-show="listShow">
                <div class="list_title">
                    <h1 class="title">购物车</h1>
                    <span @click="clearCart">清空</span>

                </div>
                <div class="list_content">
                    <ul>
                        <li v-for="(food,index) in cartFoods" :key="index" >
                            <div class="name">{{food.name}}</div>
                            <span class="price">￥{{food.price}}</span>
                            <CartControl :food="food"/>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
    <div class="list_mark" v-show="listShow">

    </div>
</div>
</template>

<script>
import {MessageBox} from 'mint-ui'
import {mapState,mapGetters} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../CartControl/CartControl.vue'
export default {
    data(){
        return{
            isShow:false
        }
    },
    methods:{
        clearCart(){
            MessageBox.confirm('确定清空购物车吗?').then( action =>{
                if(action=='confirm'){
                    this.$store.dispatch('clearShopCart')
                }
            },()=>{})
        },
        Popup(){
            if(this.totalCount>0){
                this.isShow=!this.isShow
            }         
        }
    },
    components:{
        CartControl
    },
    computed:{
        ...mapState(['info','cartFoods']),
        ...mapGetters(['totalCount','totalPrice']),
        priceText(){
            if(this.totalPrice<this.info.minPrice){
                return `还差￥${this.info.minPrice-this.totalPrice}元起送`
            }else{
                return '结算'
            }
        },
        priceClass(){
            return this.totalPrice<this.info.minPrice?'not_enough':'enough'
        },
        listShow(){
            if(this.totalCount===0){
                this.isShow=false
                return false
            }
            if(this.isShow){
                
                this.$nextTick(()=>{               
                    if(!this.scroll){
                        this.scroll=new BScroll('.list_content',{
                            click:true
                        })
                    }else{
                        this.scroll.refresh()
                    } 
                })   
                            
            }
            return this.isShow
        }
        
    },
}
</script>

<style lang="scss" scoped>

.content{
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 16;
    display: flex;
    .content_left{
        flex: 1;
        background: #000;
        .shop_cart{
            display: inline-block;
            width: 56px;
            height: 56px;
            margin: 0 12px;

            position: relative;
            top:-10px;
            .icon_cart{
                width: 44px;
                height: 44px;
                text-align: center;       
                background: #2b343c;
                border: 6px solid #000;
                border-radius: 50%;
                &.active{
                    background: #3190e8;
                    .iconfont{
                        color: #fff;
                    }
                }        
                .iconfont{
                    font-size: 24px;
                    line-height: 44px;
                    color: #80858a;
                }
            }
            
            .num{
                width: 24px;
                height: 16px;
                line-height: 16px;
                font-size: 10px;
                text-align: center;
                position: absolute;
                top: 0;
                right: 0;
                color: #fff;
                border-radius: 10px;
                background:rgb(240, 20, 20);
            }
        }
        .total_price{
            display: inline-block;
            .goods_price{
                color: #fff;
                
                font-weight: bold;
                font-size: 16px;
                line-height: 24px;
            }
            .delivery_price{
                font-size: 10px;
                line-height: 12px;
                color: #fff;
                margin-left: 15px;

            }
        }
    }
    .content_right{
        flex:0 0 105px;
        width: 105px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        &.not_enough{
            background: #2b333b;
        }    
        &.enough{
            background: #3190e8;
        }
        
    }
}
.shopcart_list{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 15;
    transform: translateY(0);
    &.move-enter-active,&.move-leave-active{
        transition: transform .3s;
    }
    &.move-enter,&.move-leave-to{
        transform: translateY(100%);
    }
    .list_title{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        display: flex;
        justify-content: space-between;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .title{
            color: #07111b;
            font-size: 14px;
        }
        span{
            font-size: 12px;
            color: #3190e8;
        }

    }
    .list_content{
        width: 100%;
        max-height: 217px;
        overflow: hidden;
        ul{       
            padding: 0 18px;
            li{
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 12px 0;
                font-size: 14px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .name{
                    flex: 1;
                }
                .price{
                    color: #f01414;
                    flex: 0 0 30px;
                }
                .cart{
                    flex:0 0 60px;
                    margin-left: 10px;
                    text-align: center;
                }
            }
        }
    }
}
.list_mark{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    background: rgba(7,17,27,0.6);
}
</style>