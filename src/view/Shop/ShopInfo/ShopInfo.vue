<template>
  <div class="shop_info" ref="shop_info">
      <section class="deliveryInfo">
        <h3 class="deliveryInfo_title">配送信息</h3>
        <div class="deliveryInfo_description">       
          <span class="deliveryInfo_icon">{{info.description}}</span>
          <span class="deliveryInfo_info">由商家配送提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
        </div>
        <div class="deliveryInfo_money">
          <span>配送费{{info.deliveryPrice}}</span>
        </div>
        
      </section>
      <div class="spilt"> 
      </div>
      <section class="activity">
        <div class="activity_info">
          <h3>活动与服务</h3>
          <ul>
            <li v-for="(support,index) in info.supports" :key="index">
              <span class="content_tag" :class="supportClasses[support.type]">
                <span class="mint_tag">{{support.name}}</span>
              </span>
              <span class="activity_content">{{support.content}}</span>
            </li>
          </ul>
        </div>
      </section>
      <div class="spilt"> 
      </div>
      <section class="shop">
        <h3>商家实景</h3>
        <div class="wrapper" ref="wrapper">
          <ul class="list" ref="list">
            <li v-for="(item,index) in info.pics">
              <img width="120" height="90" :src="item" alt="商家实景">
            </li>
          </ul>
        </div>
      </section>
      <div class="spilt"> 
      </div>
      <section class="shopinfo">
        <h3>商家信息</h3>
        <ul class="shopinfo_list">
          <li class="item">
            <span class="shop_kinds">品类</span>
            <span class="shopinfo_kinds">{{info.category}}</span>
          </li>
          <li class="item">
            <span class="shop_phone">商家电话</span>
            <span class="shopinfo_phone">{{info.phone}}</span>
          </li>
          <li class="item">
            <span class="shop_address">地址</span>
            <span class="shopinfo_address">{{info.address}}</span>
          </li>
          <li class="item">
            <span class="shop_time">营业时间</span>
            <span class="shopinfo_time">{{info.workTime}}</span>
          </li>
        </ul>
      </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
export default {
  data(){
    return{
      supportClasses:["activity-green","activity-red","activity-orange"]
    }
  },
  computed:{
    ...mapState(['info'])
  },
  created(){
    this.$nextTick(()=>{
      this.xScroll()
    })
  },
  methods:{
    xScroll(){
      new BScroll('.shop_info',{
        click:true
      });
      const count= 5;
      let width = count*(120+6)-6;
      this.$refs.list.style.width = width+'px';
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.wrapper,{
            scrollX:true,
            scrollY:false,

          });
        }else{
          this.scroll.refresh()
        }
      })
    }
  },
  mounted(){
  },
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.deliveryInfo{
  width: 100%;
  box-sizing: border-box;
  padding: 16px 14px 14px;
  .deliveryInfo_title{
    font-weight: bold;
  }
  .deliveryInfo_description{
    margin-top: 16px;
    .deliveryInfo_icon{
      display: inline-block;
      width: 55px;
      height: 20px;
      line-height: 20px;
      margin-right: 10px;
      background: #3190e8;
      font-size: 11px;
      font-weight: 600;
      color: #fff;
    }
    .deliveryInfo_info{
      font-size: 13px;
      color: #666;
    }
  }
  .deliveryInfo_money{
    width: 100%;
    margin-top: 5px;
    span{
      font-size: 13px;
      color: #666;
    }
  }
}
.activity{
  padding: 16px 14px 14px;
  .activity_info{
    h3{
      font-weight: bold;

    }
    ul{
      margin-top: 16px;
      li{
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        .content_tag{
          display: inline-block;
          width: 36px;
          height: 18px;
          margin-right: 10px;
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
            color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            right: -100%;
            bottom: -100%;
            transform: scale(0.5);
            transform-origin: 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .activity_content{
          font-size: 13px;
          color: #666;
        }
      }
    }
  }
}
.shop{
  padding: 16px 14px 14px;
  h3{
    font-weight: bold;
  }
  .wrapper{
    width:100%;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 16px;
    height: 90px;
    >ul{
      font-size: 0;
      height: 90px;
      >li{
        display: inline-block;
        width: 120px;
        height: 90px;
        margin-right: 6px;
        &:last-child{
          margin-right: 0;
        }
        img{
          display: inline-block;
          width: 120px;
          height: 90px;
        }
      }
    }
  }
}
.shopinfo{
  padding: 16px 14px 14px;
  h3{
    font-weight: bold;
  }
  .shopinfo_list{
    li{
      padding: 16px 12px 14px 0;
      display: flex;
      justify-content: space-between;
      span{
        font-size: 13px;
        &:first-child{
          font-weight: 600;
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
</style>