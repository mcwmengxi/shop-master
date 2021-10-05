<template>
  <section class="login">
      <div class="login_back" @click="goTo()">
          <a href="#">
              <i class="iconfont icon-jiantou2"></i>
          </a>
          
      </div>
      <div class="login_container">
          <h2 class="login_logo">饿了么外卖</h2>
          <div class="login_title">
              <a href="javascript:" :class="{on:loginWay}" @click="loginWay=true">
                  <span>短信登录</span>
              </a>
              <a href="javascript:":class="{on:!loginWay}" @click="loginWay=false">
                  <span>密码登录</span>
              </a>
          </div>
          <div class="login_content">
              <form @submit.prevent="login">
                  <div :class="{on:loginWay}"  @click="loginWay=true">
                    <section class="login_message">
                        <input type='tel' maxlength="11" placeholder="手机号" v-model="phone"/>
                        <button  class="get_verification" :disabled="!regPhone" :class="{on:regPhone}" @click.prevent="get_verification">{{restTime?`已发送${this.restTime}s`:'获取验证码'}}</button>
                    </section>
                    <section class="login_verification">
                        <input type='text' placeholder="验证码" v-model="code" />
                    </section>
                    <section class="login_hint">
                        温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                        <a href="javascript:;">《用户服务协议》</a>
                    </section>
                  </div>
                  <div :class="{on:!loginWay}"  @click="loginWay=false">
                    <section class="login_message">
                        <input type='text' placeholder="手机/邮箱/用户名" v-model="name" />                
                    </section>
                    <section class="login_verification">
                        <input type='password' placeholder="密码" v-if="showPwd" v-model="pwd" />
                        <input type='text' placeholder="密码" v-else v-model="pwd" />
                        <div class="switch_button" :class="{on:!showPwd}" @click="showPwd=!showPwd">
                            <div class="switch_circle " :class="{open:!showPwd}"></div>
                            <span class="switch_text">{{showPwd?'...':'abc'}}</span>
                        </div>
                    </section>
                    <section class="login_message">
                        <input type='text' placeholder="验证码" v-model="captcha"/>
                        <img src="http://localhost:4000/captcha" ref="captcha" class="verification_img" @click="refresh" alt="">
                    </section>
                    
                  </div>
                <button class="login_sumbit" >登录</button>
                   
              </form>
              <a href="javascript:;" class="about_us">关于我们</a>
          </div>
      </div>
      <Popup :alertText="popupText" v-show="showPopup" @closePopup='hidePopup'></Popup>
  </section>
</template>

<script>
import Popup from "../../components/Popup/Popup.vue"
import {reqSmsCode,reqPhoneLogin,reqPwdLogin} from '../../api/api.js'
export default {
    data(){
        return{
            loginWay:true,
            showPwd:true,
            phone:'',
            code:'',
            name:'',
            pwd:'',
            captcha:'',
            restTime:0,
            showPopup:false,
            popupText:'',
        }
    },
    methods:{
        goTo(){
            this.$router.back()
        },
        refresh(){
            this.$refs.captcha.src="http://localhost:4000/captcha?time="+
            Date.now()
        },
        async get_verification(){
            if(!this.restTime){

                this.restTime=30
                this.timer = setInterval(()=>{
                    this.restTime--
                    if(this.restTime<=0){
                        clearInterval(this.timer)
                        timer=undefined
                    }
                },1000)
            }

            //验证码请求
            let result = await reqSmsCode(this.phone)
            
            if(result.code===1){
                this.popupText=result.msg
                this.showPopup=true
                if(this.restTime){
                    clearInterval(this.timer)
                    this.timer=undefined
                    this.restTime=0
                }
            }
        },
        async login(){
            let result
            if(this.loginWay){
                const {regPhone,phone,code} = this
                if(!this.regPhone){
                    this.popupText="手机号不正确"
                    this.showPopup=true
                    return
                }else if(!/\d{6}$/.test(code)){
                    this.popupText="验证必须是6位数字"
                    this.showPopup=true
                    return
                }
                // 手机号登录
                result = await reqPhoneLogin(phone,code)
            }else{
                const {name,pwd,captcha} = this
                if(!this.name){
                    this.popupText="用户名必须指定"
                    this.showPopup=true
                    return
                }else if(!this.pwd){
                    this.popupText="密码必须指定"
                    this.showPopup=true
                    return
                }else if(!this.captcha){
                    this.popupText="验证码必须指定"
                    this.showPopup=true
                    return
                }
                result = await reqPwdLogin(name,pwd,captcha)
            }
            if(result.code===0){
                const user = result.data
                this.$store.dispatch('getUser',user)
                this.$router.replace('/owner')
            }
        },
        hidePopup(){
            this.showPopup=false
            this.popupText=''
        }
    },
    computed:{
        regPhone(){
            return /^1\d{10}$/.test(this.phone)
        }
    },
    components:{
        Popup
    }

}
</script>

<style lang="scss" scoped>
    .login{
        width: 100%;
        .login_back{
            position: absolute;
            top: 5px;
            left: 5px;
            .icon-jiantou2{
                font-size: 20px;
            }
        }
        .login_container{
            width: 80%;
            margin: 0 auto;
            padding-top: 60px;
            .login_logo{
                font-size: 40px;
                color: #3190e8;
                text-align: center;
            }
            .login_title{
                text-align: center;
                margin-top: 40px;
                a{
                    padding-bottom: 4px;
                    
                    &.on{
                        
                        color: #3190e8;
                        border-bottom: 1px solid #3190e8;
                    }
                    &:first-child{
                        margin-right: 40px;
                    }
                }

            }
            .login_content{
                width: 100%;
                
                >form{
                    >div{
                        display: none;
                        &.on{
                            display: block;
                            .login_message{
                                width: 100%;
                                height: 48px;
                                position: relative;
                                margin-top: 16px;
                                input{
                                    width: 100%;
                                    height: 100%;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    box-sizing: border-box;
                                    padding-left: 10px;
                                    outline: 0;
                                    font: 400 14px Arial;
                                    &:focus{
                                        border: 1px solid #3190e8;
                                    }
                                }
                                .get_verification{
                                    // width: 20px;
                                    // height: 20px;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    right: 10px;
                                    color: #ccc;
                                    border: 0;
                                    font-size: 14px;
                                    background: transparent;
                                    &.on{
                                        color: #666;
                                    }
                                }
                                .verification_img{
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    right: 0;
                                }
                            }
                            .login_verification{
                                width: 100%;
                                height: 48px;
                                position: relative;
                                margin-top: 16px;
                                input{
                                    width: 100%;
                                    height: 100%;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    box-sizing: border-box;
                                    padding-left: 10px;
                                    outline: 0;
                                    font: 400 14px Arial;
                                    &:focus{
                                        border: 1px solid #3190e8;
                                    }
                                }
                                .switch_button{
                                    width: 30px;
                                    height: 16px;
                                    line-height: 16px;
                                    position: absolute;
                                    top:50%;
                                    transform: translateY(-50%);
                                    padding: 0 6px;
                                    right: 10px;
                                    border: 1px solid #ddd;
                                    border-radius: 8px;
                                    transition: background-color .3s,border-color .3s;
                                    &.on{
                                        background: #3190e8;
                                    }
                                    .switch_circle{
                                        width: 16px;
                                        height: 16px;
                                        border-radius: 50%;
                                        border: 1px solid #ddd;
                                        position: absolute;
                                        left: -1px;
                                        top: -1px;
                                        background:#fff;
                                        box-shadow:0 2px 4px 0 rgba(0,0,0,.1);
                                        transition:transform .3s;
                                        &.open{
                                            float: right;
                                            transform: translateX(30px);
                                        }
                                    }
                                    .switch_text{
                                        float: right;
                                        color: #ddd;
                                    }

                                }
                            }
                 
                            .login_hint{
                                width: 100%;
                                height: 40px;
                                margin-top: 16px;
                                line-height: 20px;
                                font-size: 14px;
                                color: #999;
                                a{
                                    color: #3190e8;
                                }
                            }
                        }
                    }
                    .login_sumbit{
                        display: block;
                        width: 100%;
                        height: 42px;
                        margin-top: 30px;
                        text-align: center;
                        background: #3190e8;
                        border-radius: 4px;
                        line-height: 42px;
                        color: #fff;
                        border: 0;
                    }
                }
                .about_us{
                    display:block;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #999;
                    text-align: center;

                }
            }
        }
    }

</style>