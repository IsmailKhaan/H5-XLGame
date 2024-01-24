import axios from 'axios'
import globalApi from "./globalAPI" 
import state from '../../store/state'

class RequestSender {
	
	static $ajax(url, datas, method = 'get', type = 'application/x-www-form-urlencoded') {
		return uni.request({
			url: state.apiUrl + url,
			method: method,
			header: state.head,
			data: datas,
			success: (res) => {
				console.log('xixi', res);
			}
		})
	}
	static post(url, datas, timeOuts) {
		return new Promise((reslove, reject) => {
			uni.request({
				url:state.apiUrl + url,
				method:'post',
				header: state.head,
				timeout:timeOuts,
				data: datas || {},
				success: (res) => {
					if (res.data.status == 200 || res.statusCode == 200){
						reslove(res.data);
					} 
					else{
						reject(res.data.status +''+ res.data.msg || '系统错误');
					}
						
				},
				fail: () => {
					reject('请求失败');
				}
			})
		});
	}
    //post
	static postRequest(url, datas, timeOuts) {
		// return axios.post(url)

		return axios.post(
			state.apiUrl + url,
			datas,
			{headers:state.head},
			timeOuts
		)

		// return axios().request({
		// 	method: "post",
		// 	url: state.apiUrl + url,
		// 	data: datas,
		// 	timeout: timeOuts,
		// })
	}
	//get 请求 目前用于 json-URL 
	static getRequest(url) {
		return axios.get(
			url,
			{headers:state.head}
		)
		// return axios().request({
		// 	method: "get",
		// 	url: url,
		// })
	}













	// 目前用于验证码之类
	static postRequestUrlencoded(url, datas, timeOuts) {
		return axios().request({
			method: "post",
			url: state.apiUrl + url,
			data: datas,
			timeout: timeOuts
		})
		// return axios().request({
		// 	method: "post",
		// 	url: state.apiUrl + url,
		// 	data: datas,
		// 	timeout: timeOuts
		// })
	}
	static postRequestJson(url, datas, timeOuts) {
		return axios().request({
			method: "post",
			url: state.apiUrl + url,
			data: datas,
			//withCredentials: true,
			timeout: timeOuts,
			// header: {
			// 	"contentType": "application/json"
			// }
		})
	}
	static getGameUrl(datas, timeOuts) {
		return axios().request({
			method: "post",
			url: state.apiUrl + globalApi.mbGame,
			data: datas,
			timeout: timeOuts
		})
	}
	// 检测有无绑定银行卡
	static isBind() {
		return axios().request({
			method: 'post',
			url: state.apiUrl + globalApi.isBind,
			//withCredentials: true,
		});
	}
	// 检测有无绑定手机
	static checkBinding() {
		return axios().request({
			method: 'post',
			url:state.apiUrl + globalApi.checkBinding,
			//withCredentials: true,
		});
	}
	//获取银行卡列表
	static allChannel() {
		return axios().request({
			method: 'post',
			url:state.apiUrl + globalApi.allChannel,
			//withCredentials: true,
		});
	}
	//获取游戏列表
	static allGame() {
		return axios().request({
			method: 'post',
			url:state.apiUrl + globalApi.balance,
			//withCredentials: true,
		});
	}
	// 安全等级
	static safety() {
		return axios().request({
			method: 'post',
			url:state.apiUrl + globalApi.getSafetyLevel,
			//withCredentials: true,
		});
	}
	//获取ip
	static getIp() {
		return axios().request({
			method: 'post',
			url: 'http://pv.sohu.com/cityjson?ie=utf-8',
			//withCredentials: true,
		});
	}
}
export default RequestSender;