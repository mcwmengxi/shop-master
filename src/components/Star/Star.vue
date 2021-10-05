<template>
    <div class="star" :class="'star-'+size">
        <span class="star-item on" v-for="(val,index) in starAttr" :class="val" :key="index"></span>

    </div>
</template>

<script>
const CLASS_ON ='on'
const CLASS_OFF ='off'
const CLASS_HALF ='half'
export default {
    data(){
        return{

        }
    },
    props:{
        score:Number,
        size:Number
    },
    computed:{
        starAttr(){
            const {score} = this
            const arr=[]
            const nInterger = Math.floor(score);
            for(let i=0;i<nInterger;i++){
                arr.push(CLASS_ON)
            }
            if((score*10-nInterger*10)>=5){
                arr.push(CLASS_HALF)
            }
            while(arr.length<5){
                arr.push(CLASS_OFF)
            }
            return arr
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin bg-image($url){
    background-image: url($url+'@2x.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media only screen and(-webkit-min-device-pixel-ratio:3){
        background-image: url($url+'@3x.png');
    }
}
.star{
    // height: 100%;
    float: left;
    margin-right: 5px;
    margin-bottom: 5px;
    &.star-24{
        .star-item{
            display: inline-block;
            width: 10px;
            height: 10px;
            &.on{
                @include bg-image('./images/star24_on');
            }
            &.off{
                @include bg-image('./images/star24_off');
            }
            &.half{
                @include bg-image('./images/star24_half');
            }
        }
    }
    &.star-36{
        .star-item{
            display: inline-block;
            width: 15px;
            height: 15px;
            &.on{
                @include bg-image('./images/star36_on');
            }
            &.off{
                @include bg-image('./images/star36_off');
            }
            &.half{
                @include bg-image('./images/star36_half');
            }
        }
    }
    &.star-48{
        .star-item{
            display: inline-block;
            width: 20px;
            height: 20px;
            &.on{
                @include bg-image('./images/star48_on');
            }
            &.off{
                @include bg-image('./images/star48_off');
            }
            &.half{
                @include bg-image('./images/star48_half');
            }
        }
    }
}
</style>