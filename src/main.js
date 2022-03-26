// import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';

import Storage from 'vue-ls';
const options = {
    namespace: 'vuejs__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'session', // storage name session, local, memory
};

import 'amfe-flexible'
//import './mock'
// require styles
import "./assets/css/public.less" //global css
import './utils/filter' // global filter
import DD from './utils/ddapi' // global filter
import './permission' // global permission
// import echarts from 'echarts';
import * as echarts from 'echarts';
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import { debounce } from "lodash";

Vue.prototype.debounce = debounce
Vue.prototype.$moment = moment
Vue.prototype.echarts = echarts
Vue.prototype.$dd = DD
//Vue.prototype.uploadUrl = "https://xf.sanspartner.com/zhyq/smart-camp-admin"
// Vue.prototype.$AgentId = '1277666725'
// Vue.prototype.$corpid = 'ding0b94eaf55ab2138735c2f4657eb6378f'
Vue.prototype.uploadUrl = "http://172.20.1.105:8000/smart-camp-admin"
//Vue.prototype.uploadUrl = "http://39.96.93.185:26020/smart-camp-admin"
Vue.prototype.$AgentId = '1273242794'
Vue.prototype.$corpid = 'ding68fc0730eefb7c8235c2f4657eb6378f'

import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: 'v-touch' })
Vue.config.productionTip = false
Vue.use(VueAxios)
Vue.use(Storage, options);
Vue.use(Vant);

// vconsole
// import VConsole from 'vconsole'
// let vConsole = new VConsole();
// Vue.use(vConsole)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')