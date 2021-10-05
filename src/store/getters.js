export default {
    rating_meeting(state){
        return state.rating.reduce((previousValue,currentValue)=>{
            return previousValue+(currentValue.rateType===0?1:0)
        },0)
    },
    totalCount(state){
        return state.cartFoods.reduce((prev,cur)=>{
            return prev+cur.count
        },0)
    },
    totalPrice(state){
        return state.cartFoods.reduce((prev,cur)=>{
            return prev+cur.count*cur.price
        },0)
    }

}