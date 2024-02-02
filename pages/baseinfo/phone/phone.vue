<template>
	<view class="phone flex-col">
	  <zhnavbar title="Phone" :lefticon="true" ></zhnavbar>
	  <div class="w100 bor-shadow" v-if="isbind">
		<div class="bor-list">
			<text class="names">{{ $t('login.phoneNumPlaceholder')  }}</text>
			<text class="info"> {{ baseInfo.phone || '' }}</text>
		</div>
	  </div>
	  <!--  -->
	  <div class="w100 bor-shadow" v-if="!isbind">
		<div class="bor-list" style="border-bottom:1px solid rgba(0, 0, 0, 0.50); margin-bottom:12px;">
			<text class="names">{{ $t('login.phoneNumPlaceholder')  }}</text>
			<input
			  type="text"
			  value=""
			  :placeholder="$t('personel_info.enter_your_phone_placeholder')"
			  placeholder-class="pla"
			  class="inputs"
			  v-model="phone"
			  maxlength="11"
			/>
		</div>
		<div class="bor-list">
			<text class="names">{{ $t('personel_info.phone_verification_code')  }}</text>
			<input type="text" :placeholder="$t('login.verficationPlaceholder')" placeholder-class="pla"
			  class="inputs" v-model="phoneCode"  maxlength="25"/>
			<button type="primary" size="mini" class="ma" @tap="getPhoneCode()" v-if="show" >
			  Get Verification Code
			</button>
			<text class="code"  v-if="!show" >{{ count }}秒</text>
		</div>
	  </div> 
  
	  <div class="f-c">
		<view class="bor-btns f-c" @tap="setPhone()" v-if="!isbind">{{ $t('general.submit')  }}</view>
	  </div>
  
	 
	  <view class="titleSdk">
		<!-- For your privacy and security, the information cannot be modified after confirmation. If you need help, please
		<span @click="kefu()">contact customer service.</span> -->
		{{ $t('personel_info.actualName_des_lbl')  }}
		<span @click="kefu()">{{ $t('personel_info.actualname_des_2')  }}</span>
	</view>
  
  
  
  
	</view>
  </template>
  
  <script>
//   import RequestSender from "@/common/js/request.js";
  import { mapState, mapMutations, mapAction } from "vuex";
  import state from "@/store/state"
  import { localizationMixin } from '../../../common/js/localization';
export default {
  mixins: [localizationMixin],
	data() {
	  return {
		// isbind:this.$store.state.safety.phone,
		phone: "",
		phoneCode: "",
		infoType: "",
		show: true,
		count: "",
		timer: null,
	  };
	},
	computed: {
	  ...mapState({
		isbind: (state) => state.safety.phone,
		baseInfo: (state) => state.baseInfo,
	  }),
	  isbind() {
		return this.$store.state.safety.phone;
	  },
	  baseInfo() {
		return this.$store.state.baseInfo;
	  },
	},
	onLoad(){
	  this.$logins()
  
	},
	methods: {
	  
	  kefu() {
		uni.navigateTo({
			url: "/pages/service/serviceDtl",
		});
	  },
	  setPhone() {
  
		if(!state.rule.phoneNo.test(this.phone)){
		  uni.showToast({
			title:this.$t('rules.phoneNo'),
			icon:'none'
		  })
		  return;
		}
		if(this.phoneCode.length <4){
			uni.showToast({
				title:this.$t('rules.code'),
			  icon:"none"
			})
			return
		}
		let datas = {
		  phone:this.phone,
		  smsCode: this.phoneCode,
		};
		let url = this.$globalApi.userBindbindPhone;
		uni.showLoading({title: '请稍等'});
  
		this.$res.postRequest(url, datas)
		  .then((res) => {
			uni.hideLoading()
			if (res.data.code == 0) {
			  uni.showToast({
				title:res.data.msg,
				icon:'none'
			  })
			  uni.reLaunch({
				url:'/pages/baseinfo/baseinfo'
			  })
  
			} else {
			  uni.showToast({
				title:res.data.msg,
				icon:'none'
			  })
			}
		  })
		  .catch((err) => {
			uni.hideLoading()
			if (err == "999") {
			  uni.navigateTo({
				url: "../../error/error",
			  });
			} else {
			  this.info = true;
			  this.infoType = "error";
			  this.infoMsg = "当前网络不稳定，请重试";
			  this.account = "";
			  setTimeout(() => {
				this.info = false;
			  }, 1800);
			  // uni.hideLoading()
			  this.$store.commit("SET_LOADING", { show: false });
			}
		  });
	  },
	  getPhoneCode() {
  
		if(!this.$tel.test(this.phone)){
		  uni.showToast({
			title:this.$t('rules.phoneNo'),
			icon:'none'
		  })
		  return;
		}
		let datas = {
		  phoneNo: this.phone,
		};
		let url = this.$globalApi.userBindsendPhoneBindCode;
		this.$res.postRequest(url, datas)
		  .then((res) => {
			if (res.data.code == 0) {
			  const TIME_COUNT = 60;
			  if (!this.timer) {
				this.count = TIME_COUNT;
				this.show = false;
				this.timer = setInterval(() => {
				  if (this.count > 0 && this.count <= TIME_COUNT) {
					this.count--;
				  } else {
					this.show = true;
					clearInterval(this.timer);
					this.timer = null;
				  }
				}, 1000);
			  }
			} else {
			}
			uni.showToast({
			  title:res.data.msg,
			  icon:'none'
			})
  
		  })
		  .catch((err) => {
			// console.log(err);
			this.$store.commit("SET_LOADING", { show: false });
			if (err == "999") {
			  uni.navigateTo({
				url: "../../error/error",
			  });
			}
		  });
	  },
  
  
  
	},
  };
  </script>
  
  <style lang="scss">
  .w100{
	padding: 0 50rpx 0 50rpx;
  
  }
  .bor-list .ma {
	right: 0px !important;
  }
  .phone {
	width: 100%;
	box-sizing: border-box;
	.titleSdk {
	  width: 532rpx;
	  margin: 0 auto;
	  margin-top: 62rpx;
	  color: #292d32;
	  text-align: center;
	  font-family: Microsoft YaHei UI;
	  font-size: 24rpx;
	  font-style: normal;
	  font-weight: 400;
	  line-height: normal;
	  span {
		color: #008D91;
		font-family: Microsoft YaHei UI;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	  }
	}
	.btn {
	  margin-top: 30rpx;
	  width: 702rpx;
	  background: linear-gradient(90deg, #e0b995, #d2ac89) !important;
	}
  
	.code:after,
	.btn:after {
	  display: none;
	}
	.code {
	  width: 204rpx;
	  height: 64rpx;
	  margin-left: 20rpx;
	  border-radius: 38rpx;
	  font-size: 24rpx;
	  background: transparent;
	  -webkit-box-shadow: none;
	  box-shadow: none;
	  line-height: 64rpx;
	  text-align: center;
	  cursor: pointer;
	  box-sizing: border-box;
	  border: 2rpx solid #f86;
	  color: #f86;
	}
	.yz-btn {
	  margin: 0;
	  border: none;
	  color: #ffffff;
	  width: 204rpx;
	  height: 64rpx;
	  // background:linear-gradient(0deg,rgba(119,122,254,1),rgba(157,159,255,1)) !important;
	  box-shadow: 0px 8rpx 13rpx 0rpx rgba(98, 101, 227, 0.7);
	  background: linear-gradient(to bottom, #f5a377, #f76e3d);
	  box-shadow: 0px 8rpx 13rpx 0px rgba(79, 138, 255, 0.7);
	  border-radius: 17rpx;
	}
	.wancheng {
	  width: 600rpx;
	  height: 80rpx;
	  background: url("../../../static/service/btn-2-bg.png");
	  background-size: 100% 100%;
	  color: #ffffff;
	  line-height: 80rpx;
	  text-align: center;
	  font-size: 30rpx;
	  margin-top: 40rpx;
	}
  }
  </style>
  
  