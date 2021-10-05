import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './mock/mockServer'
import './filter/index'
import loading from './assets/images/loading.gif'
Vue.config.productionTip = false

import {Button} from 'mint-ui'
//样式需单独引入
import 'mint-ui/lib/style.min.css'
Vue.component(Button.name,Button)
Vue.use(VueLazyload,{
  loading
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
