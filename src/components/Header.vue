<template>
  <div id="header">
    <slot  name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot  name="right"></slot>
  </div>
</template>

<script>
export default {
    props:{
        title:String
    }
}
</script>

<style lang="scss">
#header{
    width: 100%;
    height: 45px;
    background: #3190e8;
    position: relative;
    .header_serach{
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
          color: #fff;
          .icon-sousuo{
            font-size: 25px;
            color: #fff;
          }
    }
    .header_login{
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
          color: #fff;
    }
    .header_title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
    }
}
</style>