<template>
    <div class="alert_container">
        <section class="tip_text_container">
            <div class="tip_icon">
                <span></span>
                <span></span>
            </div>
            <p class="tip_text">{{alertText}}</p>
            <div class="confrim" @click="closeTip">确认</div>
        </section>
    </div>
</template>

<script>
export default {
    props:{
        alertText:String
    },
    methods:{
        closeTip(){
            this.$emit('closePopup')
        }
    },
}
</script>

<style lang="scss" scoped>
@keyframes Popup {
    0% {transform: scale(1);}
    25% {transform: scale(0.8);}
    70% {transform: scale(1.2);}
    100% {transform: scale(1);}
}
.alert_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    .tip_text_container{
        width: 60%;
        background: #fff;
        // height: 185px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -110px;
        margin-top: -90px;
        animation: Popup .4s;
        background-color: rgba(255, 255, 255, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 20px;
        border-radius: 5px;
        .tip_icon{
            width: 55px;
            height: 55px;          
            border: 2px solid #f8cb86;
            border-radius: 50%;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            >span:nth-of-type(1){
              
                width: 2px;
                height: 30px;
                border: 1px solid #f8cb86;
            }
            >span:nth-of-type(2){
             
                width: 2px;
                height: 2px;
                margin-top: 2px;
                border-radius: 50%;
                border: 1px solid #f8cb86;
            }
        }
        .tip_text{
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            margin-top: 10px;
            padding: 0 5px;
            color: #333;
        }
        .confrim{
            width: 100%;
            
            font-size: 18px;
            line-height: 35px;
            text-align: center;
            background: #3190e8;
            color: #fff;
            margin-top: 10px;
            border: 1px;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            
        }
    }
    
}
</style>