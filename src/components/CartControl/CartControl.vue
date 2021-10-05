<template>
  <div class="cart">
    <transition name="move">
      <div class="remove_icon" @click.stop="updateCount(false)" v-show="food.count">
        <i class="iconfont icon-remove_circle_outline"></i> 
      </div>
    </transition>
    <div class="cart_count" v-show="food.count" >{{food.count}}</div>
    <div class="add_icon" @click.stop="updateCount(true)"><i class="iconfont icon-add_circle"></i> </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    food:Object
  },
  computed:{
    ...mapState(['cartFoods'])
  },
  methods:{
    updateCount(isAdd){
      let {food} = this
      if(!food.count){
        this.$set(food,'count','0')
        this.cartFoods.push(food)
      }
      this.$store.dispatch('updateFoodCount',{isAdd,food})
    }
  }
}
</script>

<style lang="scss" scoped>
.cart{
    display: flex;
    flex-direction: row;
    .remove_icon{
        width: 24px;
        height: 24px;
        &.move-enter-active,&.move-leave-active{
          transition: all 0.3s;
        }
        &.move-enter,&.move-leave-to{
          opacity: 0;
          transform: translateX(15px) rotate(180deg);
          
        }
        .iconfont{
        color: #3190e8;
        font-size: 24px;
        height: 24px;
        }
    }
    .cart_count{
        width: 12px;
        display: inline-block;
        text-align: center;
        line-height: 24px;
        font-size: 10px;
        color: #93999f;
    }
    .add_icon{
        width: 24px;
        height: 24px;
        .iconfont{
        color: #3190e8;
        font-size: 24px;
        height: 24px;
        }
    }
}
</style>