<template>
  <div id="nav">
    <ul>
      <router-link tag="li" active-class="myactive" :class="{on:'/home'===$route.path}" to="/home">
       <span>
         <i class="iconfont icon-waimai"></i>
       </span>
       <span>外卖</span>
      </router-link>
      <router-link tag="li" active-class="myactive" :class="{on:'/serach'===$route.path}" to="/serach">
      <span>
         <i class="iconfont icon-search"></i>
       </span>
       <span>搜索</span>
       </router-link>
      <router-link tag="li" active-class="myactive" :class="{on:'/order'===$route.path}" to="/order">
      <span>
         <i class="iconfont icon-dingdan"></i>
       </span>
       <span>订单</span>
       </router-link>
      <router-link tag="li" active-class="myactive" :class="{on:'/owner'===$route.path}" to="/owner">
      <span>
         <i class="iconfont icon-geren"></i>
       </span>
       <span>个人</span>
       </router-link>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#nav{
  width:100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background: #fff;
  text-align:center;
  ul{
    display: flex;
    li{
      display: flex;
      flex:1;
      justify-content:center;
      flex-direction: column;
      align-items: center;
      color:#999999;
      // & 用在嵌套的scss代码里，来引用父元素
      &.on{
        color:#3190e8;
      }
      span{
        font-size: 12px;
        margin-top: 2px;
        margin-bottom: 2px;
        .iconfont{
          font-size: 22px;
        }
      }
      
    }
  }
}

</style>
