import req from "./req";
const BASE_URL="/api"
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash)=> req(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodkinds=()=> req(BASE_URL+'/index_category')

//异步读取不到Promise返回结果
// export const reqShops=(latitude,longitude) =>{
//     req(BASE_URL+'/shops',{latitude,longitude})
// }
// 3、根据经纬度获取商铺列表
export const reqShops=(latitude,longitude) => req(BASE_URL+'/shops',{latitude,longitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSerachShops=(geohash,keyword)=>req(BASE_URL+'/search_shops',{geohash,keyword})
// 5、获取一次性验证码
// 6、用户名密码登陆
export const reqPwdLogin = (name,pwd,captcha) => req(BASE_URL+'/login_pwd',{name,pwd,captcha},"POST")
// 7、发送短信验证码
export const reqSmsCode = (phone) => req(BASE_URL+'/sendcode',{phone})
// 8、手机号验证码登陆
export const reqPhoneLogin = (phone,code) => req(BASE_URL+'/login_sms',{phone,code},"POST")
// 9、根据会话获取用户信息
export const reqUserinfo = () =>req(BASE_URL+'/userinfo')
// 10、用户登出
export const reqLogout = () => req(BASE_URL+'/logout')

export const reqShopInfo = () =>req('/info')
export const reqShopRating = () =>req('/rating')
export const reqShopGoods = () =>req('/goods')