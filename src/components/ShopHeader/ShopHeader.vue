<template>
  <div class="shop_header">
    <div class="shop_nav" :style="{backgroundImage:`url(${info.bgImg})`}">
      <a href="javascript:" @click="$router.back()">
         <i class="iconfont icon-arrow_left"></i>
      </a>
    </div>
    <div class="content">
        <div class="content_logo">
          <img :src="info.avatar" alt="">
        </div>
        <div class="shop_content" @click="showPopupShop">
          <div class="content_name">
            <span class="content_shop_logo">
              <span>品牌</span>
            </span>
            <span class="content_shop_name">{{info.name}}</span>
            
          </div>
          <div class="content_message">
            <span class="message_item">{{info.score}}</span>
            <span class="message_item">月售{{info.sellCount}}单</span>
            <span class="message_item">{{info.description}}</span>
            <span class="message_item">约{{info.deliveryTime}}分钟</span>
            <span>距离{{info.distance}}</span>
          </div>  
        </div>
    </div>
    <div class="discount" v-if="info.supports" @click="showPopupActivity">
      <div class="discount_left">
        <div class="discount_activity" :class="supportClasses[info.supports[0].type]">
          <span class="discount_tag">
            <span>{{info.supports[0].name}}</span>
          </span>
          <span class="discount_activity_nth">{{info.supports[0].content}}</span>
        </div>
      </div>
      <div class="discount_right">
        {{info.supports.length}}个优惠
      </div>
      
    </div>

    <transition name="fade">
      <div class="popup_shop" v-show="!shopShow">
          <div class="popup_shopinfo">
            <div class="shop_title">
              <div class="content_name" >
                <span class="content_shop_logo">
                  <span>品牌</span>
                </span>
                <span class="content_shop_name">{{info.name}}</span>          
              </div>
            </div>
            <div class="shop_info">
              <ul class="info">
                <li class="item">
                  <h3>{{info.score}}</h3>
                  <p>评分</p>
                </li>
                <li class="item">
                  <h3>{{info.sellCount}}单</h3>
                  <p>月售</p>
                </li>
                <li class="item">
                  <h3>{{info.description}}</h3>
                  <p>约{{info.deliveryTime}}分钟</p>
                </li>
                <li class="item">
                  <h3>{{info.deliveryPrice}}元</h3>
                  <p>配送费用</p>
                </li>
                <li class="item">
                  <h3>{{info.distance}}</h3>
                  <p>距离</p>
                </li>
              </ul>
            </div>
            <div class="shop_notice">
              <h3><span>公告</span></h3>
            </div>
            <div class="shop_noticeinfo">
              <span>        
                {{info.bulletin}}      
              </span>
            </div>
          </div>
          <div class="mask-footer" @click="showPopupShop">
              <span class="iconfont icon-close"></span>
          </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="popup_activity" v-show="!activityShow">
        <div class="activity_close" @click="showPopupActivity">
          <i class="iconfont icon-close"></i>
        </div>
        <div class="activity">          
          <h2 class="activity_title">优惠活动</h2>
          <div class="activity_list">
            <ul>
              <li v-for="(support,index) in info.supports" :key="index">
                <span class="content_tag" :class="supportClasses[support.type]">
                  <span class="mint_tag">{{support.name}}</span>
                </span>
                <span class="activity_content">{{support.content}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      shopShow:true,
      supportClasses:['activity-green','activity-red','activity-orange'],
      activityShow:true
    }
  },
  mounted(){
    this.$store.dispatch('getShopInfo')
  },
  computed:{
    ...mapState(['info'])
  },
  methods:{
    showPopupShop(){
      this.shopShow=!this.shopShow
    },
    showPopupActivity(){
      this.activityShow=!this.activityShow
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop_nav{
    width: 100%;
    height: 50px;
    position: relative;
    // background-image: url("https://fuss10.elemecdn.com/f/5c/ead54394c3de198d3e6d3e9111bbfpng.png");
    >a{
      position: absolute;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
      .icon-arrow_left{
        color: white;
        font-size: 20px;
      }
    }
  }
  .content{
    width: 100%;
    height: 80px;
    position: relative;
    display: flex;
    justify-content: center;
    .content_logo{
      width: 66px;
      height: 66px;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      >img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .shop_content{
      width: 100%;
      flex: 1;
      padding: 30px 20px 5px 20px;
      text-align: center;
      .content_name{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .content_shop_logo{
          background-image: linear-gradient(90deg,#fff100, #ffe339);
          width: 36px;
          height: 18px;  
          color: #6a3709;       
          margin-right: 10px;
          border-radius: 2px;
          font-style: normal;
          font-weight:700;
          position: relative;
          >span{
            position: absolute;
            top: 0;
            left: 0;
            right: -100%;
            bottom: -100%;
            font-size: 24px;
            line-height: 24px;
            font-weight: 600;
            transform: scale(0.5);
            transform-origin: 0 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .content_shop_name{
            font-size: 20px;
            font-weight: 700;
            text-align: center;
            &::after{
              content: "";
              display: inline-block;
              width: 0;
              height: 0;
              border-top:7px solid transparent;
              border-bottom:7px solid transparent;
              border-right:7px solid transparent;
              border-left: 7px solid #333;       
            }
        }
      }
      .content_message{
        width: 100%;
        >span{
          font-size: 11px;
          color: #333;
        }
        .message_item{
          padding-right: 5px;
        }
      }
    }
  }
  .discount{
    display: flex;
    align-items: center;
    margin: 0 30px;
    padding: 5px 4px;
    border: 1px solid #eee;
    .discount_left{
      flex: 1;
      overflow: hidden;
      .discount_activity{
        display: flex; 
        align-items: center;
        .discount_tag{
          width: 25px;
          height: 13px;
          text-align: center;
          margin-right: 5px;
          position: relative;
          background: #70bc46;
          >span{
            position: absolute;
            top: 0;
            left: 0;
            bottom: -100%;
            right: -100%;
            font-size: 18px;
            color: white;
            transform: scale(0.5);
            transform-origin: 0 0;
          }
        }
        .discount_activity_nth{
          font-size: 11px;
          color: #333;
        }
      }
    }
    .discount_right{
      width: 40px;
      padding-right: 10px;
      flex-shrink:0;
      display: flex;
      align-items: center;
      font-size: 11px;
      color: #333;
      text-align: right;
      position: relative;
      &::after{
        display: block;
        content: "";
        border-width: 4px;
        border-style: solid;
        border-color:#333 transparent transparent transparent;
        position: absolute;
        top: 5px;
        right: 0;
      } 
    }
  }
  .popup_shop{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba($color: #000, $alpha: 0.5);
    &.fade-enter-active,&.fade-leave-active{
      transition: opacity  0.5s;
    }
    &.fade-enter,&.fade-leave-to{
      opacity: 0;
    }
    .popup_shopinfo{
      width: 80%;
      padding: 25px 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .shop_title{
        .content_name{
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .content_shop_logo{
            background-image: linear-gradient(90deg,#fff100, #ffe339);
            width: 36px;
            height: 18px;  
            color: #6a3709;       
            margin-right: 10px;
            border-radius: 2px;
            font-style: normal;
            font-weight:700;
            position: relative;
            >span{
              position: absolute;
              top: 0;
              left: 0;
              right: -100%;
              bottom: -100%;
              font-size: 24px;
              line-height: 24px;
              font-weight: 600;
              transform: scale(0.5);
              transform-origin: 0 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .content_shop_name{
              font-size: 20px;
              font-weight: 700;
              text-align: center;
          }
        }
      }
      .shop_info{
        width: 100%;    
        >ul{
          display: flex;
          padding: 10px 0 0 0;
          margin: 10px -10px 0;
          >li{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            >h3{
              margin: 0 0;
              font-size: 15px;
              color: #333;
              font-weight: 600;
              padding:0 0 5px 0;
            }
            >p{
              margin: 0 0;
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
      .shop_notice{
        width: 100%;
        position: relative;
        text-align: center;
        >h3{
          margin: 15px auto;
          width:85px;
          font-size: 16px;
          background-image:linear-gradient(90deg, #fff, #333 50%, #fff);
          background-size:100% 1px;
          background-position:50%;
          background-repeat:no-repeat;
          >span{
            color: #999;
            font-size: 12px;
            background: #fff;
          }
        }
      }
      .shop_noticeinfo{
        width: 100%;
        span{
          font-size: 13px;
          color: #333;
        }
      }
    }
    .mask-footer{
      width: 30px;
      height: 30px;
      position: absolute;
      top: 70%;
      left: 50%;
      border-radius: 50%;
      border:1px solid #fff;
      transform: translate(-50%,50%);
      text-align: center;
      .icon-close{
        color: #fff;
        font-size: 16px;
        position: relative;
        top: 4px;
      }
    }
  }
  .popup_activity{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba($color: #000, $alpha: 0.5);
    .activity_close{
      position: absolute;
      right: 0;
      top: 70%;
      transform: translate(-50%,-50%);
      z-index: 2;
      .icon-close{
        font-size: 20px;
      }
    }
    .activity{
      height: 200px;
      padding: 20px 30px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      h2{
        text-align: center;
        font-size: 20px;
        margin: 0 0 20px;
      }
      .activity_list{
        ul{
          height: 160px;
          padding: 0;
          margin: 0;
          overflow-y: auto;
          li{
            list-style: none;
            display: flex;       
            align-items: center;
            margin-bottom: 12px;
            .content_tag{
              display: inline-block;
              width: 36px;
              height: 18px;
              line-height: 18px;
              margin-right: 5px;
              position: relative;
              &.activity-green{
                background-color: rgb(112, 188, 70);
              }
              &.activity-red{
                background-color: rgb(240, 115, 115);
              }    
              &.activity-orange{
                background-color: rgb(241, 136, 79);
              }  
              .mint_tag{
                font-size: 24px;
                line-height: 24px;
                color: #fff;
                position: absolute;
                top: 0;
                left: 0;
                right: -100%;
                bottom: -100%;
                transform: scale(0.5);
                transform-origin: 0 0;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            .activity_content{
              font-size: 13px;
              color: #333;
            }
          }
        }
      }
    }
  }

</style>