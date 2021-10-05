<template>
  <div class="shop_container">
      <ul class="shop_list">
          <li class="shop_li" v-for="(shop,index) in shops" :key="index" @click="$router.push('/shop')">
              <a>
                  <div class="shop_left">
                      <img :src="baseImgUrl+shop.image_path" alt="">
                  </div>
                  <div class="shop_right">
                      <section class="shop_info">
                          <h4 class="shop_title">{{shop.name}}</h4>
                          <ul>
                              <li class="shop_info_li" v-for="(support,index) in shop.supports" :key="index">{{support.icon_name}}</li>
                          </ul>
                      </section>
                      <section class="shop_order">
                          <section class="shop_order_left">
                            <Star :score="shop.rating" :size="24"/>
                            <div class="rating_section">
                                {{shop.rating}}
                            </div>
                            <div class="order_section">
                                月售{{shop.recent_order_num}}单
                            </div>
                          </section>
                          <section class="shop_order_right">
                              <span class="order_delivery">{{shop.delivery_mode.text}}</span>
                          </section>
                      </section>
                      <section class="shop_cost">
                        <p class="shop_delivery_msg">
                            <span>¥{{shop.float_minimum_order_amount}}起送</span>
                            <span class="segmentation">/</span>
                            <span>配送费约¥{{shop.float_delivery_fee}}</span>
                        </p>
                      </section>
                  </div>
              </a>
          </li>
      </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Star from '../Star/Star.vue'
export default {
    data(){
        return {
            baseImgUrl: 'http://elm.cangdu.org/img/'          
        }
    },
    mounted(){
        this.$store.dispatch('getShops')
    },
    computed:{
        ...mapState(['shops'])
    },
    methods:{
        
    },
    components:{
        Star
    },

}
</script>

<style lang="scss" >
//清除浮动
@mixin clearFix(){
    *zoom:1;
    &::after{
        content:'';
        display:block;
        clear:both;
    }
}
.shop_container{
    width: 100%;
    .shop_list{
        width: 100%;
        .shop_li{
            width: 100%;
            height: 105px;
            box-sizing: border-box;
            padding: 15px 8px;
            @include clearFix();
            .shop_left{
                width: 23%;
                height: 75px;
                float: left;
                box-sizing: border-box;
                padding: 5px;
                img{
                    display: inline-block;
                    width: 65px;
                    height: 65px;
                }
            }
            .shop_right{
                width:77%;
                height: 75px;
                float: right;
                .shop_info{
                    display: block;
                    @include clearFix();
                    .shop_title{
                        width: 200px;
                        font-size: 16px;
                        line-height: 16px;
                        font-weight: 700;
                        float: left;
                        color: #666;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        &::before{
                            content: '\54C1\724C';
                            display: inline-block;
                            font-size: 11px;
                            line-height: 11px;
                            color: #333;
                            background-color: #ffd930;
                            padding: 2px 2px;
                            border-radius: 2px;
                            margin-right: 5px;
                        }
                    }
                    ul{
                        float: right;
                        margin-top: 3px;
                        .shop_info_li{
                            float: left;
                            font-size: 10px;
                            color: #999;
                            border: 1px solid #f1f1f1;
                            padding: 0 2px;
                            border-radius: 2px;
                        }
                    }
                }
                .shop_order{
                    display: block;
                    margin-top: 14px;
                    margin-bottom: 8px;
                    
                    @include clearFix();
                    .shop_order_left{
                        float: left;
                        .rating_section{
                            float: left;
                            color: #ff6000;
                            font-size: 10px;
                            margin-top: 3px;
                            transform: scale(0.8);
                        }
                        .order_section{
                            float: left;
                            color: #666;
                            font-size: 10px;
                            margin-top: 3px;
                            transform: scale(0.8);
                        }
                    }
                    .shop_order_right{
                        float: right;
                        margin-top: 3px;
                        .order_delivery{
                            display: inline-block;
                            color: #3190e8;
                            border: 1px solid #3190e8;
                            font-size: 12px;
                            transform-origin:35px 0;
                            transform: scale(0.7);
                        }
                    }
                }
                .shop_cost{
                    display: block;
                    width: 100%;
                    font-size: 12px;
                    margin-bottom: 5px;
                    @include clearFix();
                    .shop_delivery_msg{
                        float: left;
                        color: #666;
                        .segmentation{
                            color: #ccc;
                            padding: 0 2px;
                        }
                    }
                }

            }
        }
    }
}
</style>