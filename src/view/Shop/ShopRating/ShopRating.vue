<template>
  <div class="shop_rating" ref="rating_wrapper">
      <div class="overview">
        <div class="overview_left">
          <span class="overview_left_score">{{info.score}} </span>
          <span class="overview_left_title">综合评分</span>
          <span class="overview_left_rank">高于周边商家99%</span>
        </div>
        <div class="overview_right">
          <div class="score">
            <Star :size="36" :score="info.serviceScore" />
              <span class="service">服务态度<span>{{info.serviceScore}}</span></span>
          </div>
          <div class="score">
            <Star :size="36" :score="info.foodScore" />
              <span class="service">商品评分<span>{{info.foodScore}}</span></span>
          </div>
          <div class="deliveryTime">
            <span class="title">送达时间</span>
            <span class="time">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="spilt"> 
      </div>
      <div class="rating_select">
        <div class="rating_type">
          <span class="rating all" :class="{on:showRateType===2}" @click="selectRateType(2)">全部{{rating.length}}</span>
          <span class="rating meeting" :class="{on:showRateType===0}" @click="selectRateType(0)">满意{{rating_meeting}}</span>
          <span class="rating no-meeting" :class="{on:showRateType===1}" @click="selectRateType(1)">不满意{{rating.length-rating_meeting}}</span>
        </div>
        <div class="show_rating">
          <span class="circle" >
            <i class="iconfont icon-check_circle" :class="{on:showText}" @click="showText=!showText"></i>
          </span>
          <span class="text" >只看有内容的评价</span>
          
        </div>
      </div>
      <div class="rating_wrapper" >
        <ul>
          <li class="rating_li" v-for="(ratingli,index) in filterRating" :key="index">
            <div class="img_icon">
              <img :src="ratingli.avatar" alt="">
            </div>
            <div class="rating_content">
              <div class="title">
                <span class="username">{{ratingli.username}}</span>
                <span class="rateTime">{{ratingli.rateTime | date-format}}</span>
              </div>
              <div class="star_wrapper">
                <Star :size="24" :score="ratingli.score" /> <span class="deliveryTime">{{ratingli.deliveryTime}}</span>
              </div>
              <div class="rating_text">
                <span class="text">{{ratingli.text}}</span>
              </div>
              <div class="recommend">
                <span ><i class="iconfont icon-thumb_up"></i></span>
                <span class="recommend_item" v-for="(item,index) in ratingli.recommend">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import Star from '../../../components/Star/Star.vue'
import BScroll from 'better-scroll'
export default {
  data(){
    return{
      showRateType:2,
      showText:true
    }
  },
  computed:{
    ...mapState(['info','rating']),
    ...mapGetters(['rating_meeting']),
    filterRating(){
      const {showRateType,rating,showText} = this
      return rating.filter((value) =>{
      const {rateType,text} = value
        return (rateType===showRateType || showRateType===2)&&(!showText || text.length>0)
         
      })
    }
  },
  components:{
    Star
  },
  mounted(){
    this.$store.dispatch('getShopRating',()=>{
    
      this.$nextTick(()=>{
        //this.$refs.rating_wrapper
        new BScroll('.shop_rating',{
          click:true,    
        })
      })
    })
  },
  methods:{
    selectRateType(showRateType){
      this.showRateType=showRateType
    }
  }
}
</script>

<style lang="scss" scoped>
.shop_rating{
  position: relative;
  overflow: hidden;
  .overview{
    display: flex;
    padding: 18px 0;
    .overview_left{
      flex: 0 0 137px;
      width: 137px;
      border-right: 1px solid rgba(7,17,27,0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      @media only screen and (max-width: 320px){
        flex: 0 0 120px;
        width: 120px;
      }
      .overview_left_score{
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: #f90;
      }
      .overview_left_title{
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: #07111b;
      }
      .overview_left_rank{
        line-height: 10px;
        font-size: 10px;
        color: #93999f;
      }
    }
    .overview_right{
      flex:1;
      padding: 6px 0 6px 24px;
      .score{
        margin-bottom: 8px;
        .star{
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }
        .service{
          font-size: 12px;
          height: 18px;
          color: #07111b;
          vertical-align: middle;
          span{
            color: #f90;
          }
        }
      }
      .deliveryTime{
        font-size: 12px;
        span:first-child{
          margin-right: 5px;
        }
      }
    }
  }
  .rating_select{
    width: 100%;
    .rating_type{
      width: 100%;
      margin: 0 18px;
      padding: 18px 0;
      display: flex;
      align-items: center;
      .rating{
        width: 60px;
        height: 32px;
        line-height: 32px;
        margin-right: 8px;
        font-size: 12px;
        color: #4d555d;
        background: rgba(77,85,93,0.2);
        text-align: center;
        &.on{
          background: #3190e8;
        }
      }
    }
    .show_rating{
      padding: 12px 18px;
      color: #93999f;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .circle{
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 4px;
        .icon-check_circle{
          font-size: 24px;   
          &.on{
            color: #3190e8;
          }
        }
      }
      .text{
        display: inline-block;
        font-size: 12px;
        line-height: 24px;
        vertical-align: top;
      }
    }
  }
  .rating_wrapper{
    padding: 0 18px;
    ul{
      .rating_li{
        padding: 18px 0;
        display: flex;
        .img_icon{
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img{
            width: 28px;
            height: 28px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .rating_content{
          flex: auto;
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
          .title{
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
            .username{
              font-size: 10px;
              line-height: 12px;
              color: #07111b;
            }
            .rateTime{
              font-size: 10px;
              line-height: 12px;
              color: #07111b;
            }
          }
          .star_wrapper{
            margin-bottom: 6px;
            font-size: 12px;
            .deliveryTime{
              font-size: 10px;
              line-height: 12px;
              color: #93999f;
            }
          }
          .rating_text{       
            margin-bottom: 8px;
            .text{
              font-size: 12px;
              line-height: 18px;
              color: #07111b;
            }
          }
          .recommend{
            font-size: 0;
            display: flex;
            flex-wrap: wrap;
            span{
              margin: 0 8px 4px 0;
              font-size: 9px;
              .icon-thumb_up{
                color: #f5a100;
                font-size: 9px;
              }
              &.recommend_item{
                border: 1px solid rgba(7,17,27,0.1);
                color: #93999f;
                padding: 0 6px;
              }
            }
          }
        }
      }
    }
  }
  .spilt{
    width: 100%;
    height: 16px;
    background: #f3f5f7;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
}

</style>