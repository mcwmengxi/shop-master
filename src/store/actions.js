import {
    RECEIVE_ADDRESS,
    RECEIVE_FOODKINDS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    CLEAR_USER,
    RECEIVE_SHOPINFO,
    RECEIVE_SHOPRATING,
    RECEIVE_SHOPGOODS,
    INCREMENT_FOODCOUNT,
    DECREMENT_FOODCOUNT,
    CLEAR_SHOPCART,
    RECEIVE_SERACHSHOPS
} from './mutations_types.js'
import {reqAddress,reqFoodkinds,reqShops,reqLogout,reqUserinfo,reqShopInfo,reqShopRating,reqShopGoods,reqSerachShops} from '../api/api'
export default {
    async getAddress({commit,state}){
        const geohash = state.latitude+','+state.longitude;
        let res = await reqAddress(geohash)
        if(res.code===0){
            
            var address = res.data
        }
        commit(RECEIVE_ADDRESS,{address})
    },
    async getFoodkinds({commit}){
       
        let res = await reqFoodkinds()
        if(res.code === 0){      
            var foodkinds = res.data
            commit(RECEIVE_FOODKINDS,{foodkinds})
        }
        
    },
    async getShops({commit,state}){
        const {latitude,longitude} = state
        const res = await reqShops(latitude,longitude);
        if(res.code === 0){  
            const shops = res.data;
            commit(RECEIVE_SHOPS,{shops})
        }
        
    },
    getUser({commit},user){
        commit(RECEIVE_USER,{user})
    },
    async Logout({commit}){
        const res = await reqLogout()
        if(res.code===0){
            commit(CLEAR_USER)
        }
    },
    async getUserinfo({commit}){
        const res = await reqUserinfo()
        if(res.code===0){
            const user = res.data
            commit(RECEIVE_USER,{user})
        }
    },
    async getShopInfo({commit}){
        const res = await reqShopInfo()
        if(res.code===0){
            const info = res.data
            commit(RECEIVE_SHOPINFO,{info})
        }
    },
    async getShopRating({commit}){
        const res = await reqShopRating()
        if(res.code===0){
            const rating = res.data
            commit(RECEIVE_SHOPRATING,{rating})
        }
    },
    async getShopGoods({commit},callback){
        const res = await reqShopGoods()
        if(res.code===0){
            const goods = res.data
            commit(RECEIVE_SHOPGOODS,{goods})
            callback&&callback()
        }
    },
    updateFoodCount({commit},{isAdd,food}){
        if(isAdd){
            commit(INCREMENT_FOODCOUNT,{food})
        }else{
            commit(DECREMENT_FOODCOUNT,{food})
        }
    },
    clearShopCart({commit}){
        commit(CLEAR_SHOPCART)
    },
    async getSerachShops({commit,state},keyword){
        const geohash = state.latitude +','+state.longitude
        const res = await reqSerachShops(geohash,keyword)
        if(res.code===0){
            const serachShops = res.data
            commit(RECEIVE_SERACHSHOPS,{serachShops})
        }
    },
}