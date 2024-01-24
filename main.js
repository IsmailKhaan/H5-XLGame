         import App from './App'
import store from './store'
import Vue from 'vue'
Vue.config.productionTip = false;
Vue.prototype.$store = store

import {
	currencyType,
	 bankApi,
	 logins,
	 IdandBank,
	 type,
	 copy,
	 back,
	 money,
} from "./assets/allFx";

//  for -ping -api    
// Vue.prototype.$urls =  ["https://info.xunli06.com", "https://info.xunli05.com", "https://info.xunli01.com"]; //formal
Vue.prototype.$urls = ["http://json.xunli10.com","http://json1.xunli10.com","http://json2.xunli10.com"]; //test 

// loading
import loading from "./components/loading/loading.vue";
Vue.component("loading", loading);
//全局调用get，post
import RequestSender from "./common/js/request.js";
Vue.prototype.$res = RequestSender;
// api 
import globalAPI from "./common/js/globalAPI";
Vue.prototype.$globalApi = globalAPI;

//设备信息 // phone data
Vue.prototype.$i = uni.getDeviceInfo();
//邮箱验证
Vue.prototype.$Ymail =
  /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; 
//验证手机
Vue.prototype.$tel = /^1[3-9]\d{9}$/; 
// api-time
Vue.prototype.$time = function (url) {
	return url + "?time=" + new Date().getTime();
};

////////Global functions from allFx.js/////
Vue.prototype.$currencyType = currencyType;
Vue.prototype.$bankApi = bankApi;
Vue.prototype.$logins = logins;
Vue.prototype.$IdandBank = IdandBank;
Vue.prototype.$type = type;
Vue.prototype.$copy = copy;
Vue.prototype.$back = back;
//查询余额 api-money
Vue.prototype.$money = money;
//查询余额 api-money
Vue.prototype.$en = function(val){
	return val.replace(/\n/g,'<br>')
};
Vue.prototype.$en2 = function(a,b){
	let that = this;
	let vals = that.$store.state.ens[a][b];
    console.log('test','------',that.$store.state.ens[a][b])
	return vals.replace(/\n/g,'<br>')
};
// 在main.js 全局挂载组件 
// title
import zhnavbar from "@/components/zh-navbar/zh-navbar.vue"; 
Vue.component("zhnavbar", zhnavbar);
// game-title //标题
import gamenavbar from "@/components/zh-navbar/zh-navbar-games.vue"; 
Vue.component("gamenavbar", gamenavbar);

App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
