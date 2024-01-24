<script>
import state from 'store/state' 


export default {
	onLaunch: function () {
		console.log('ver','1.17')
		//ping formal - api
		let that = this;
		let apiTrue = false;
		let json = '/V2/xlMain.json';
		that.$urls.forEach((api, index) => {
			console.log(api,'ceshi')
			that.$res.getRequest(that.$time(api + json)).then((res) => {
				// console.log(res, "api接口", api);
				if (res.status == 200) { //ping = ok
					if (!apiTrue) {
						apiTrue = true;
						state.jsonUrl = api;
						// console.log(res,"res");
						// console.log(state.urlJson,"state.urlJson") 
						uni.setStorageSync('jsonUrl', state.jsonUrl);
						this.getJson(res);
					}

					// return;
				}
			});
		});

	},
	globalData: {
		test: ''
	},
	

	methods: {
		getJson(res) {
			// console.log("app-json", state);
			let that = this;
			let n = res.data[0]; //jsons-main
			//ping api	
			that.getApiUrl(n.apiUrl, n.apiTestMethod);
			that.pingApi(n.iconUrl, n.iconTestMethod, 1);
			that.pingApi(n.siteUrl, n.siteTestMethod, 2);
			state.api = n.apiUrl;
			state.jsons = n;
			//获取轮播图banner，银行卡类型bank，pay-type..
			that.getbanner(
				n.staticResourcesVersionNo,
				state.jsonUrl + n.staticResources
			)
			uni.setStorageSync("api", n.apiUrl);
			uni.setStorageSync("jsons", n);

			uni.hideLoading();
			//获取游戏菜单-game-list
			that.gamesFx(
				n.platformsAndGamesVersionNo,
				state.jsonUrl + n.platformsAndGames
			)

			// code-error -alert
			that.codeFx(
				n.responseCodeVersionNo,
				state.jsonUrl + n.responseCode
			)
			// code-error -alert
			that.nativeFx(
				n.nativeCodeVersionNo,
				state.jsonUrl + n.nativeCode
			)

			//调取状态列表全局  save-state
			that.stateFx(
				n.stateAndTypeVersionNo,
				state.jsonUrl + n.stateAndType
			)

			//消息类型 - news -money
			that.newsFx(
				n.newsTemplatesVersionNo,
				state.jsonUrl + n.newsTemplates
				
			);

		},
		getApiUrl(apiUrl, test) {
			console.log(apiUrl); //test "/test/ping"  for 请求 apiurl是否ping 通
			let that = this;
			let indexStatus = false;
			apiUrl.forEach((els, index) => {
				// console.log(els,"els")
				that.$res.getRequest(els + test).then((res) => {
					if (res.data.code == 0) { //ping = ok
						if (!indexStatus) {
							indexStatus = true;
							state.apiUrl = els;
							uni.setStorageSync("apiUrl", els);
						}
						// console.log(res, "api接口", els);
						// return;
					} else {
						// console.log(res, "失败api接口：", els);
						that.sbSj(res.data.code, els);
					}
				});
			});
		},
		sbSj(code, urls) {
			let url = this.$globalApi.systemInforecordApiError;
			let data = {
				userName: "H5",
				deviceType: 0,
				errorApi: urls,
				errorInfo: code,
			};
			this.$res.postRequest(url, data).then((res) => {
				console.log(res);
			});
		},
		// icon-get-api
		pingApi(apiUrl, test, num) {
			let that = this;
			let ping = false;
			apiUrl.forEach((els, index) => {
				that.$res.getRequest(els + test).then((res) => {
					if (res.data.info == "success" && !ping) {
						//ping = ok ,   1-icon,2-siteUrl
						ping = true;
						if (num == 1) {
							state.iconUrl = els;
							uni.setStorageSync("iconUrl", state.iconUrl);
						}
						if (num == 2) {
							state.siteUrl = els;
							uni.setStorageSync("siteUrl", state.siteUrl);
						}

					}
				});
			});
		},
		//获取 static //获取轮播图banner，银行卡类型bank，pay-type..
		async getbanner(ver, url) {
			let old = state.static;
			if (!old || old.ver !== ver) {
				await this.$res.getRequest(this.$time(url)).then((res) => {
					state.static = res.data.datas;
					state.static.ver = ver; //VersionNo
					uni.setStorageSync("staticResources", state.static);
				});
			}
			//
			if (this.$i.platform == 'ios') {
				state.down = state.static.downloadInfo[0].downloadUrl;
			} else {
				state.down = state.static.downloadInfo[1].downloadUrl;
			}
			//rule
			let rules = state.static.regularExpression; //获取正则
			let obj = Object.keys(rules);
			obj.forEach((res) => {
				rules[res] = new RegExp(rules[res]);
			})
			state.rule = rules;
		},
		//获取游戏菜单-games-list
		gamesFx(ver, url) {
			//调取游戏轮播图
			let old = state.games;
			if (!old || old.ver != ver) {
				//顺序调取游戏列表-game-list
				this.$res.getRequest(this.$time(url)).then((res) => {
					//登录之后需要存储起来-save
					state.games = res.data.datas;
					state.games.ver = ver;
					uni.setStorageSync("games", state.games);
				})
			}

		},
		//消息类型充值金额  news-type
		newsFx(ver, url) {
			let old = state.type;
			console.log(ver,url,"newsFX");
			if (!old || state.ver.type != ver) {
				this.$res.getRequest(this.$time(url)).then((res) => {
					state.type = res.data.datas;
					state.ver.type = ver;
					uni.setStorageSync("type", state.type);
					uni.setStorageSync("ver", state.ver);
				})
			}

		},
		// 调取状态列表全局  save-state all
		stateFx(ver, url) {
			let old = state.allStatus;
			if (!old || state.ver.allStatus != ver) {
				this.$res.getRequest(this.$time(url)).then((res) => {
					state.allStatus = res.data.datas;
					state.ver.allStatus = ver;
					uni.setStorageSync("status", state.allStatus);
					uni.setStorageSync("ver", state.ver);
				})
			}
		},

		// code-error -alert
		codeFx(ver, url) {
			let old = state.codes;
			if (!old || state.ver.codes != ver) {
				this.$res.getRequest(this.$time(url)).then((res) => {
					state.codes = res.data;
					state.ver.codes = ver;
					uni.setStorageSync("codes", state.codes);
					uni.setStorageSync("ver", state.ver);
				})
			}

		},
		// code-error -alert
		nativeFx(ver, url) {
			let old = state.natives;
			if (!old || state.ver.natives != ver) {
				this.$res.getRequest(this.$time(url)).then((res) => {
					state.natives = res.data;
					state.ver.natives = ver;
					uni.setStorageSync("natives", state.natives);
					uni.setStorageSync("ver", state.ver);
				})
			}

		},
	}
}

</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/css/uni.css';
	@import '@/static/customicons.css';
	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@import "./common/css/common.css";
	@import "./common/css/style.scss";
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}

	/* 顶栏通栏样式 */
	/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

	
	uni-page-body {
		background-color: #ffffff !important;
		min-height: 100vh !important;
		height: auto !important;
	}

	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}

	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}

	/* #endif */

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #efeff4;
		height: 100%;
		font-size: 28rpx;
		/* line-height: 1.8; */
	}

	.fix-pc-padding {
		padding: 0 50px;
	}

	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-image {
		width: 100px;
		height: 100px;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}

	/* #endif*/

</style>
