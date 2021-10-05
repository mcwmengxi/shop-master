<template>
  <div class="serach_page">
    <Header title="搜索" />
    <form class="serach_form" @submit.prevent="serach">
      <input type="text" placeholder="请输入商家名称" class="serach_input" v-model="keyword">
      <input type="submit" class="serach_submit"/>
    </form>
    <section class="list" v-if="!emptyResult">
      <ul>
        <router-link class="list_li" tag="li" to="{path:'/shop',query:{id:item.id}}" v-for="(item,index) in serachShops" :key="index">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import Section from '../../../../../nodejs/vuedemo/vue_service/src/components/section.vue'
import Header from '../../components/Header.vue'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      keyword:'',
      imgBaseUrl:'http://cangdu.org:8001/img/',
      emptyResult:false
    }
  },
  components:{
    Header,
    Section
  },
  computed:{
    ...mapState(['serachShops'])
  },
  methods:{
    serach(){
      const keyword = this.keyword.trim()
      if(keyword){
        this.$store.dispatch('getSerachShops',keyword)
      }
    }
  },
  watch:{
    serachShops(value){
      if(!value.length){
        this.emptyResult=true
      }else{
        this.emptyResult=false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.serach_page{
  .serach_form{
    display: flex;
    justify-content: space-between;
    padding: 12px 8px;
    background: #fff;
    input{
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      outline:0;
      font-weight: bold;
    }
    .serach_input{
 
      width: 79%;
      font-size: 14px;
      box-sizing: border-box;
      border: 4px solid #f2f2f2;
      background-color: #f2f2f2;
    }
    .serach_submit{
      
      width: 18%;
      font-size: 16px;  
      color: #fff;
      
      border: 4px solid #3190e8;
      background-color: #3190e8;
    }
  }
  .list{
    ul{
      .list_li{
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        .item_left{
          margin-right: 10px;
          .restaurant_img{
            display: block;
            width:50px;
            height: 50px;
          }
        }
        .item_right{
          font-size:12px;
          flex:1;
          .item_right_text{
            p{
              line-height:12px;
              margin-bottom:6px;
              &:last-child{
                margin-bottom: 0;
              }  
            }
                
          }
        }
      }
    }
  }
  .search_none{
    margin: 0 auto;
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 6px;
  }
}
</style>