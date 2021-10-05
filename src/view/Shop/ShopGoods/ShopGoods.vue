<template>
  <div class="shop_goods">
      <div class="menu_wrapper">
        <ul ref="menuWrapper">
          <li class="menu_item"  v-for="(good,index) in goods" :key="index" :class="{current:currentIndex===index}" @click="handerClick(index)">
            <span>
              <img :src="good.icon" v-if="good.icon" alt="">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods_wrapper">
        <ul ref="foodsWrapper">
          <li class="foods_item" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="description">{{food.description}}</p>
                  <div class="extra">
                    <span class="sellCount">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="newprice">￥{{food.price}}</span>
                    <span class="oldprice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    
                  </div>
                  <div class="cartcontrol">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
      <Food :food="food" ref="food"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'
import Food from '../../../components/Food/Food.vue'
export default {
  data(){
    return{
      scrollY:0,
      tops:[],
      food:{}
    }
  },
  mounted(){
    this.$store.dispatch('getShopGoods',()=>{
      this.$nextTick(()=>{
        this._initScroll();
        this._getTops()
      })
    })
  },
  methods:{
    _initScroll(){
      this.menuBscroll = new BScroll('.menu_wrapper',{
        click:true
      })  
      this.foodsBscroll = new BScroll('.foods_wrapper',{
        click:true,
        probeType:2
      }) 
      this.foodsBscroll.on('scrollEnd',(position)=>{
        this.scrollY=Math.abs(position.y)
      })
    },
    _getTops(){
      let top=0;
      let tops=[];
      tops.push(top)
      const foodsLis= this.$refs.foodsWrapper.getElementsByClassName('foods_item')
      Array.prototype.slice.call(foodsLis).forEach((item)=>{
        top += item.clientHeight
        tops.push(top)
      })
      this.tops=tops
    },
    handerClick(index){
      const scrollY = this.tops[index]
      this.scrollY=scrollY
      this.foodsBscroll.scrollTo(0,-scrollY,300)
    },
    showFood(food){
      this.food = food 
      this.$refs.food.Food()
    }
  },
  computed:{
    ...mapState(['goods']),
    currentIndex(){
      const {scrollY,tops} = this
      const val = tops.findIndex((top,index)=>{
        return scrollY>=top&&scrollY<tops[index+1]
      })
      return val
    }
  },
  components:{
    CartControl,
    ShopCart,
    Food
  }
}
</script>

<style lang="scss" scoped>
.shop_goods{
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;
  .menu_wrapper{
    flex: 0 0 80px;
    width: 80px;
    ul{
      .menu_item{
        height: 52px;
        width: 54px;
        padding: 0 12px;
        line-height: 14px;
        display: table;
        background: #f3f5f7;
        &.current{
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          color: #3190e8;
          font-weight: 700;
        }
        span{
          font-size: 12px;
          display: table-cell;
          border-bottom: 1px solid rgba(238, 232, 232, 0.5);
          font-weight: bold;
          text-align: center;
          vertical-align: middle;
          img{
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: top;
            margin-right: 2px;
            
          }
        }
      }
    }
  }
  .foods_wrapper{
    flex: 1;
    ul{
      li{
        &:last-child{
          margin-bottom: 0;
        }
        .title{
          height: 26px;
          line-height: 26px;
          padding-left: 14px;
          color: #93999f;
          border-left: 2px solid #d9dde1;
          background: #f3f5f7;
        }
        ul{
          li{
            display: flex;
            padding-bottom: 18px;
            margin: 18px;
            border-bottom: 1px solid rgba(238, 232, 232, 0.5);
            .icon{
              flex: 0 0 57px;
              margin-right: 10px;
              img{
                display: inline-block;
                width: 57px;
                height: 57px;

              }
            }
            .content{
              flex: 1;
              position: relative;
              .name{
                color: #07111b;
                font-size: 14px;
                line-height: 14px;
                margin: 2px 0 8px;

              }
              .description{
                color: #93999f;
                font-size: 10px;
                margin-bottom: 8px;
              }
              .extra{
                color: #93999f;
                font-size: 10px;
                margin-bottom: 8px;
                .sellCount{
                  margin-right: 12px;
                }
              }
              .price{
                color: #f01414;
                font-size: 14px;
                line-height: 24px;                
                .newprice{
                  margin-right: 8px;
                  
                }             
                .oldprice{
                  color: #93999f;
                  font-size: 10px;
                  text-decoration: line-through;
                  
                }
              }
              .cartcontrol{
                position: absolute;
                right: 0;
                bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>