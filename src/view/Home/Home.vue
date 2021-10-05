<template>
  <section class="home">
    <Header :title="address.name" class="header">
      <router-link to="/serach"  slot="left" class="header_serach">
          <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="user._id?'':'/login'" slot="right" class="header_login">
        <span class="header_login_text" v-if="!user._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </Header>
    <!--首页商品种类-->
    <nav class="food_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(foodkinds,index) in foodkindsArr" :key="index">
              <a href="javascript:" class="link_food" v-for="(food,index) in foodkinds" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl+food.image_url" alt="">
                </div>
                <span>{{food.title}}</span>
              </a>
              
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span>附近商家</span>
      </div>
      <ShopList>

      </ShopList>
    </div>
  </section>
</template>

<script>
import Header from '../../components/Header.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import Swiper2, {Navigation, Pagination} from 'swiper'; // 这行代码很关键

Swiper2.use([Navigation, Pagination]); // 这行代码很关键

export default {
  data(){
    return {
      baseImageUrl:'https://fuss10.elemecdn.com'
    }
  },
  mounted(){
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getFoodkinds')
    // this.$store.dispatch('getUserinfo')
  },
  methods:{
  },
  computed:{
    ...mapState(['address','foodkinds','user']),
    foodkindsArr(){
      // console.log(this);
      let {foodkinds} = this
      let arr=[]
      let foodkindsArr=[]
      foodkinds.forEach(item => {
        if(arr.length%8===0){
          arr=[]
        }
        if(arr.length===0){
          foodkindsArr.push(arr)
        }
        arr.push(item)
      });
      return foodkindsArr;
    }
    
  },
  watch:{
    foodkindsArr(){
      this.$nextTick(()=>{
        new Swiper('.swiper-container',{
        autoplay:1000,
        loop:true,
        pagination:{
          el:'.swiper-pagination',
          
        }
      })
      })
    }
  },
  components: {
    Header,
    ShopList 
  },
}
</script>

<style lang="scss" scoped>
.food_nav{
  width: 100%;
  height: 200px;
  margin-top: 15px;
  position:relative;
  &::before{
    content:'';
    position:absolute;
    z-index:200;
    left:0;
    bottom:0;
    width:100%;
    height:1px;
    background-color: #e4e4e4;
    transform:scaleY(0.5);
  }
  .swiper-container{
    width:100%;
    height:100%;
    .swiper-wrapper{
      width:100%;
      height:100%;
      .swiper-slide{
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        .link_food{
          width: 25%;
          .food_container{
            width: 100%;
            text-align: center;
            padding-bottom:10px;
            font-size:0;
            img{
              display: inline-block;
              width: 50px;
              height: 50px;
            }   
          }
          span{
              display: block;
              width: 100%;
              font-size: 13px;
              color: #666;
              text-align: center;
          }
        }
      }
    }
    // .swiper-pagination{
    //   .swiper-pagination-bullet-active{
    //     opacity: 1;
    //     background:#02a774;
    //   }     
    // }
  }
}
.shop_list{
  .shop_header{
    width: 100%;
    height: 20px;
    padding:10px 10px 0;
    // .icon-xuanxiang{
      // margin-left:5px;
      // color: #999;
    // }
    span{
      color: #999;
      font-size: 14px;
      line-height: 20px;
      padding: 0 5px;
    }
  }
}
</style>