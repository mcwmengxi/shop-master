<template>
  <section>
    <Header title="我的">
      <div class="login_back" @click="goTo()" slot="left">
            <a href="#">
                <i class="iconfont icon-jiantou2"></i>
            </a>        
      </div>
    </Header>

    <section class="owner_number">
      <router-link to="/login">
        <span class="user_icon">
          <i class="iconfont icon-person"></i>
        </span>
        <div class="user_info">
          <p>{{user.name||'登录/注册'}}</p>
          
          <p>
            <span class="mobile_icon">
              <i class="iconfont icon-shouji icon-mobile"></i>
            </span>
            
            {{user.phone||'暂无绑定手机号'}}</p>
        </div>
        <span class="user_arrow_right">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="owner_info">
      <ul>
        <li class="info_link">
          <a href="javascript:">
            <span  class="info_top"><span>0.00</span>元</span>
            <span class="info_bottom">我的余额</span>
          </a>
        </li>
        <li class="info_link">
          <a href="javascript:">
            <span  class="info_top"><span>0</span>个</span>
            <span class="info_bottom">我的优惠</span>
          </a>
        </li>
        <li class="info_link">
          <a href="javascript:">
            <span class="info_top"><span>0</span>分</span>
            <span class="info_bottom">我的积分</span>
          </a>
        </li>
      </ul>
    </section>
    <section class="owner_fun">
      <div class="owner_fun_common owner_fun_order">
        <a href="javascript:">
          <span class="my_icon"><i class="iconfont icon-order-s"></i></span>
          <span class="text">我的订单</span>
          <span class="jiantou"><i class="iconfont icon-jiantou1"></i></span>
        </a>
      </div>
      <div class="owner_fun_common owner_fun_jifen">
        <a href="javascript:">          
          <span class="my_icon"><i class="iconfont icon-jifen"></i></span>
          <span class="text">积分商城</span>
          <span class="jiantou"><i class="iconfont icon-jiantou1"></i></span>
        </a>
      </div>
      <div class="owner_fun_common owner_fun_card">
        <a href="javascript:">      
          <span class="my_icon"><i class="iconfont icon-vip"></i></span>
          <span class="text">外卖会员卡</span>
          <span class="jiantou"><i class="iconfont icon-jiantou1"></i></span>
        </a>
      </div>
    </section>
    <section class="owner_fun">
      <div class="owner_fun_common owner_fun_service">
        <a href="javascript:">       
          <span class="my_icon"><i class="iconfont icon-fuwu"></i></span>
          <span class="text">服务中心</span>
          <span class="jiantou"><i class="iconfont icon-jiantou1"></i></span>
        </a>
      </div>
      <div class="owner_fun_common owner_fun_service">
        <a href="javascript:">       
          <span class="my_icon"><i class="iconfont icon-fuwu"></i></span>
          <span class="text">下载饿了么App</span>
          <span class="jiantou"><i class="iconfont icon-jiantou1"></i></span>
        </a>
      </div>
    </section>
    <section class="profile_my_order">

     <mt-button type="danger" class="login_out_btn" v-if="user._id" @click="logout">退出登陆</mt-button>
     
    </section>
 
  </section>

</template>

<script>
import Header from '../../components/Header.vue'
import {mapState} from 'vuex'
import {MessageBox,Toast} from 'mint-ui'
export default {
  components:{
    Header
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    goTo(){
      this.$router.back()
    },
    logout(){
      MessageBox.confirm('',{
        
        title:'提示',
        message:"确定执行此操作?",
        cancelButtonClass:'cancelBtn',
        confirmButtonClass:'confirmBtn',
      }
      ).then((value)=>{
        this.$store.dispatch('Logout')
        Toast({
          message:'登出成功',
          
          className:'iconfont icon-close'
        })
      },(reason)=>{
        Toast({
          message:'取消登录',
          
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login_back{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    .icon-jiantou2{
        font-size: 20px;
        color: #fff;
    }
  }
  .owner_number{
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 20px 10px;
    background: #3190e8;
    position: relative;
    
    .user_icon{
      float: left;
      display: block;
      width: 60px;
      height: 60px;
      background: #fff;
      border-radius: 50%;
      overflow: hidden;
      .icon-person{
        font-size: 60px;
        // color: #fff;
      }
      
    }
    .user_info{
      float: left;
      color: #fff;
      margin-top: 8px;
      margin-left: 15px;
      p:first-child{
        font-size: 16px;
        padding-bottom: 6px;
        font-weight: 600;
        // margin-bottom: 5px;
      }
      
      p:last-child{
        font-size: 14px;
        padding-top: 2px;
        .mobile_icon{
          display: inline-block;
          margin-left: -15px;
          width: 20px;
          height: 20px;
          margin-right: 5px;
          .icon-shouji{
            font-size: 30px;
            vertical-align: middle;
          }
        }
      }
    }
    .user_arrow_right{
      float: right;
      color: #fff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
    }
  }
  .owner_info{
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
    >ul{
      display: flex;
      .info_link{
        flex: 1;
        text-align: center;     
        height: 80px;
        border: 1px solid #f1f1f1;        
        >a{
          .info_top{
            display: block;
            padding:10px 15px 8px;
            font-size: 14px;
            color: #666;
            >span{
              font-size: 30px;
              font-weight: 700;
              color: #f90;
            }         
          }
          .info_bottom{
            font-size: 14px;
            color: #666;
          }
          
        }

        &:nth-of-type(2){
          a{
            .info_top{
              span{
                color: #ff5f3e;
              }
            }
          }
        }
        &:nth-of-type(3){
          a{
            .info_top{
              span{
                color: #6ac20b;
              }
            }
          }
        }
      }
    }
    
  }
  .owner_fun{
    width: 100%;
    .owner_fun_common{
      width: 100%;
      height: 55px;
      position: relative;  
      line-height: 55px;
      >a{
        .my_icon{      
          display: inline-block;
          width: 20px;
          height: 20px;
          padding: 5px 5px;
          .iconfont{
            margin-top: 10px;
            font-size: 25px;
            &.icon-order-s{
              color: #02a774;
            }
            &.icon-jifen{
              color: #ff5f3e;
            }
            &.icon-vip{
              color: #f90;
            }
            &.icon-fuwu{
              color: #02a774;
            }
          }
        }
        .text{
          position: relative;
          bottom: 3px;
          color: #333;

        }

        .jiantou{
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          
          .icon-jiantou1{
            font-size: 10px;
          }
          
        }
      }
    }
  }
  .login_out_btn{
    width: 100%;
    
  }
  .cancelBtn{
    background: #959595 !important; 
    color: #fff !important;
  }
  .confirmBtn{
    background: #d9534f !important;
    color: #fff !important;
  }

</style>