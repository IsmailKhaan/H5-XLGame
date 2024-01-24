<template>
	<view class="content">
		<loading :isshow="isshow"></loading>
		<view @click="support" class="support">
			<image src="../../static/login/support.png" mode="widthFix"></image>
		  </view>

		<view class="signup_name f-c">{{ $t('reset_password.reset_Title')  }}</view>
		<view class="signup_instructions f-c">{{ $t('reset_password.reset_subTitle')  }}
			
		</view>

		<view class="form">
			<view class="forminpu">
				<view class="input">
					<input :type="isshowpass1 == 0 ? 'password' : 'text'" @input="getvalue" maxlength="12"
						:value="formData.newPassword" @blur="okformdata" data-type="newPassword" :placeholder="$t('reset_password.reset_newPassword')"
						placeholder-style="color:#B53D1E" />
					<view class="passwordshow" @click="showpass" data-type="1">
						<image :src="isshowpass1 == 0
							? '../../static/login/eye-closed.png'
							: '../../static/login/eye-open.png'
							" mode="widthFix"></image>
					</view>
				</view>
				<view :class="passtip == 1 ? 'passtip' : 'hide passtip passtips'">{{$t('rules.password')}}</view>
				<view class="input">
					<input :type="isshowpass2 == 0 ? 'password' : 'text'" @input="getvalue" maxlength="12"
						:value="newPasswords" @blur="okformdata" data-type="newPasswords" :placeholder="$t('sign_up.confirm_passwordPlaceholder')"
						placeholder-style="color:#B53D1E" />
					<view class="passwordshow" @click="showpass" data-type="2">
						<image :src="isshowpass2 == 0
							? '../../static/login/eye-closed.png'
							: '../../static/login/eye-open.png'
							" mode="widthFix"></image>
					</view>
				</view>
				<view :class="passstip == 1 ? 'passtip' : 'hide passtip passtipss'">{{$t('rules.new_password')}} </view>

				<view class="getpass f-c" @click="setpassword">{{ $t('reset_password.reset_now')  }}</view>

			</view>
		</view>
	</view>
</template>

<script>
import { localizationMixin } from '../../common/js/localization';
export default {
	mixins: [localizationMixin],

	data() {
		return {
			isshowpass1: 0,
			isshowpass2: 0,
			isshow:0,
			formData: {
				username: "", //用户名
				contact: "", //手机号
				newPassword: "", //验证码
			},
			newPasswords: "",
			passtip: 1,
			passstip: 0,
		}
	},
	onLoad(res) {
		this.formData.username = res.username;
		this.formData.contact = res.contact;
		console.log("上个页面过来的参数---->", res);
	},
	methods: {
		support(){
      uni.navigateTo({
          url: "../service/serviceDtl",
        });
    },
		getvalue(e) {
      console.log(e);
    },

		showpass(e) {
			if (e.currentTarget.dataset.type == 1) {
				this.isshowpass1 = !this.isshowpass1;
			} else if (e.currentTarget.dataset.type == 2) {
				this.isshowpass2 = !this.isshowpass2;
			}
		},
		okformdata(e) {
			let _this = this;
			_this.formData[e.currentTarget.dataset.type] = e.detail.value;
		},
		setpassword() {
			let _this = this;
			this.isshow = 1;
			console.log(_this.newPasswords, 1, _this.formData);
			if (_this.formData.newPasswords == _this.formData.newPassword) {
				let url = _this.$globalApi.resetPassword;
				let datas = _this.formData;
				_this.$res.postRequest(url, datas).then((res) => {
					if (res.data.code == 0) {
						this.isshow = 0;
						uni.navigateTo({
							url: "/pages/updatepassword/updatepassword",
						});
						uni.showToast({
					title:  state.codes[res.data.code],
					icon: "none",
				});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						});
					}
					console.log(res);
				});
			} else {
				uni.showToast({
					title: this.$t('rules.new_password'),
					icon: "none",
				});
			}
		},
	}
}
</script>

<style lang="scss" scoped>
/* 背景容器 */
.content {
	width: 100%;
	min-height: 100vh;
	background-size: cover;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	position: relative;
	background-color: #ffffff;

	.signup_name {
		margin-top: 292rpx;
		color: #BF1C05;
		text-align: center;
		font-family: Microsoft YaHei UI;
		font-size: 52rpx;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.signup_instructions {
		margin-top: 12rpx;
		color: #BF1C05;
		text-align: center;
		font-family: Microsoft YaHei UI;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		width: 610rpx;
    margin: 12rpx auto 0 auto;
	}

	.form {
		.forminpu {
			margin: 172rpx 78rpx 0 78rpx;

			.input {
				width: 100%;
				height: 80rpx;
				position: relative;
				//padding: 0 10rpx 0 20rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30rpx;
				border-bottom: 2rpx solid #781000;

				input {
					width: 560rpx;
					height: 100%;
					color: #781000;
					margin-left: 8rpx;
				}

				.passwordshow {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					right: 30rpx;
					top: 20rpx;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}

			.passtip {
				width: 100%;
				text-align: left;
				margin-bottom: 10rpx;
				color: green; 
				font-size: 18rpx;
				padding: 5rpx 0 0 5rpx;
				box-sizing: border-box;
				display: none;
			}

			.passtip.passtips.hide {
				opacity: 0;
			}

			.passtip.passtipss.hide {
				opacity: 0;
			}

			.getpass {
				width: 232rpx;
				height: 74rpx;
				background: url("../../static/login/login_button.png") no-repeat;
				background-size: 100% 100%;
				margin: auto;
				margin-top: 80rpx;
				color: #FFF;
				text-align: center;
				font-family: Microsoft YaHei UI;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}

		}

	}
	.uni-input-placeholder {
		width: 430rpx;
		height: 100%;
		color: #b53d1e;
		font-family: Microsoft YaHei UI;
		font-size: 32rpx;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-bottom: -60rpx;
	  }
	  
	  /deep/.uni-input-input {
		width: 430rpx;
		height: 100%;
		color: #b53d1e;
		font-family: Microsoft YaHei UI;
		font-size: 32rpx;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-bottom: -30rpx;
	  }
	  
}
</style>