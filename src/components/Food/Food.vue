<template>
  <div class="food" v-show="showFood">
      <div class="food_content">
          <div class="header">
              <img v-lazy="food.image" alt="" :key="food.image">
              <div class="back" @click="Food">
                  <i class="iconfont icon-arrow_left"></i>
              </div>
              <p class="info">{{food.info}}</p>
          </div>
          <div class="content">
              <h1 class="title">{{food.name}}</h1>
              <div class="detail">
                  <span class="sell_count">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                  <span class="eth_price">￥{{food.price}}</span>
                  <CartControl :food="food"/>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import CartControl from '../CartControl/CartControl.vue'
export default {
    data(){
        return{
            showFood:false
        }
    },
    props:{
        food:Object
    },
    computed:{

    },
    methods:{
        Food(){
            this.showFood=!this.showFood
        }
    },
    components:{
        CartControl
    }
}
</script>

<style lang="scss" scoped>
.food{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background-color: rgba(0,0,0,0.5);
    .food_content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        width: 80%;
        height: 65%;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        .header{
            width: 100%;
            flex: 1;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .back{
                position: absolute;
                top: 10px;
                left: 0;
                .iconfont{
                    font-size: 20px;
                    color: #fff;
                    padding: 10px;
                }
            }
            .info{
                position: absolute;
                bottom: 0;
                left: 0;
                font-size: 10px;
                color: #ddd;
                letter-spacing: 0;
                padding: 0 10px 10px;
            }
        }
        .content{
            flex: 0 0 110px;
            padding: 18px;
            box-sizing: border-box;
            .title{
                color: #07111b;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 8px;
            }
            .detail{
                font-size: 10px;
                color: #000;
                margin-bottom: 18px;
                .sell_count{
                    margin-right: 12px;
                }
            }
            .price{
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: row;
                .eth_price{
                    color: red;
                }
                .cart{

                }
            }
        }
    }
}
</style>