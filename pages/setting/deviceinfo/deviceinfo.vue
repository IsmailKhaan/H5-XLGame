<template>
	<view id="webview" class="feedback set-bg">
		<zhnavbar :title="$t('settings.device_info')" :lefticon="true" style="margin-bottom: 6rpx"></zhnavbar>
		<view class="shebeClass">
			<view class="yesCls f-c" v-for="(item, index) in list" :key="index">
				<view class="yes1">{{ item.name }}</view>
				<view class="yes2">{{ item.text }}</view>
			</view>
			<view class="f-c take_screenshot" @tap="downloadFile">{{ $t('device_information.take_screenshot') }}</view>
			<div class="f-c">
				<view class="city" @tap="downloadFile">
					<view class="jBtn f-c"></view>
				</view>
			</div>
		</view>
		<view class="border_bottom"></view>
	</view>
</template>
<script src="https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.js"></script>
  <script>
  import html2canvas from 'html2canvas';
  import DeviceDetector from "device-detector-js";
  import { mapState} from "vuex";
  import { localizationMixin } from "../../../common/js/localization";
export default {
  mixins: [localizationMixin],
	data() {
	  return {
		isshow: 0,
		list: [
		  {
			name: "会员账号",
			text: uni.getStorageSync("memberInfo").username,
		  },
		],
	  };
	},
	components: {
	},
	computed: {
	  ...mapState({
		userName: (state) => state.currentUser,
		baseInfo: (state) => state.baseInfo,
	  }),
	  userName() {
		return this.$store.state.currentUser;
	  },
	  baseInfo() {
		return this.$store.state.baseInfo;
	  },
	},
	onLoad() {
	  this.getFeedback();
	  //console.log(uni.getDeviceInfo() , 'info')
	},
	methods: {
	  getFeedback() {
		const deviceDetector = new DeviceDetector();
		const userAgent = window.navigator.userAgent;
		let device = deviceDetector.parse(userAgent);
		var time = new Date();
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		m = m < 10 ? "0" + m : m;
		var d = time.getDate();
		d = d < 10 ? "0" + d : d;
		var h = time.getHours();
		h = h < 10 ? "0" + h : h;
		var mm = time.getMinutes();
		mm = mm < 10 ? "0" + mm : mm;
		console.log(device);
		var s = time.getSeconds();
		s = s < 10 ? "0" + s : s;
		let list = this.list;
		list.push({
		  name: "手机型号",
		  text: this.$i.deviceModel,
		});
  
		list.push({
		  name: this.$t("device_info.phone_system_version"),
		  text: this.$i.system,
		});
		list.push({
		  name: this.$t("device_info.current_time"),
		  text: y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s,
		});
		uni.request({
		  url: "http://pv.sohu.com/cityjson?ie=utf-8",
		  method: "POST",
		  success: (res) => {
			const reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
			let ip = reg.exec(res.data);
			list.push({
			  name: "登录IP",
			  text: ip[0],
			});
		  },
		});
		this.list = list;
	  },
	  downloadFile() {
		uni.showLoading({
		  title: "保存中...",
		  mask: true,
		});
		const webviewElement = document.getElementById("webview");
		html2canvas(webviewElement).then((canvas) => {
		  const screenshotImage = canvas.toDataURL("image/png");
		  const downloadLink = document.createElement("a");
		  downloadLink.href = screenshotImage;
		  downloadLink.download = "screenshot.png";
		  downloadLink.click();
		  uni.hideLoading({
		  title: "保存中...",
		  mask: true,
		});
		  
		});
  
		uni.showLoading({
		  title: "保存中...",
		  mask: true,
		});
  
	  },
	},
  };
  </script>
<style lang="scss">
page {
	background: #fff;
}

.feedback {
	width: 100%;
	height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #ffffff;

	.shebeClass {
		width: 90%; 
		margin: 0 auto;
		border-radius: 40rpx;
		height: 500px;
		//padding-top: 20rpx;

		.yesCls {
			width: 90%;
			margin: 0 auto;
			height: 68rpx;

		} 

		.yes1 {
			color: #003B3D;
			font-family: Microsoft YaHei UI;
			font-size: 24rpx;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			text-align: left;
		}

		.yes2 {
			color: #959BA1;
			text-align: right;
			font-family: Inter;
			font-size: 24rpx;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			text-align: right;
			flex: 2;
		}

		.take_screenshot {
			width: 444rpx;
			height: 68rpx;
			border-radius: 22rpx;
			background: #003B3D;
			box-shadow: 4rpx 4rpx 14rpx 0rpx rgba(80, 118, 164, 0.76);
			margin: 0 auto;
			color: #FFF;
			text-align: center;
			font-family: Microsoft YaHei UI;
			font-size: 24rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 30rpx;
			letter-spacing: -0.10rpx;
			margin-top: 110rpx;
		}
	}

	.border_bottom {
		width: 202rpx;
		height: 0rpx;
		border: 4rpx solid #000000;
		border-radius: 100rpx;
		margin: 0 274rpx 38rpx 274rpx;
		position: absolute;
		bottom: 0;
	}
}
</style>
