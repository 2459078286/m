import Vue from 'vue'
import App from './App'
import store from './store/index'
import WXR from './util/requset'
import PubFuc from'./publicjs/common'
const config=require('./config')
Vue.config.productionTip = false
Vue.prototype.$store=store
Vue.prototype.config=config
Vue.prototype.$WXR=WXR
Vue.prototype.$pubFuc = PubFuc

import wLoading from "@/components/w-loading.vue";
Vue.component('w-loading',wLoading)

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

export default app