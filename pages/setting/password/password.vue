<template>
	<view class="password set-bg">

		<view class="background_lock">
			<view id="navbar">
				<view class="fixed">
					<view class="image" @click="goback">
						<image src="../../../static/zhnavbar/leftjt.png" mode="widthFix"></image>
					</view>
					<view class="title">{{ $t('change_password.change_password_title')  }}</view>
				</view>
			</view>

			<view class="form">
				<view class="forminpu">
					<view class="input">
						<input class="input_text " :class="{ 'input-filled': info }"
							:type="isshowpass1 == 0 ? 'password' : 'text'" :placeholder="$t('change_password.old_Password')" maxlength="11"
							v-model="oldPass" @input="handleInput" data-type="password" placeholder-style="color:#781000" />
						<view class="passwordshow" @click="showpass(1)">
							<image :src="isshowpass1 == 0
								? '../../../static/login/eye-closed.png'
								: '../../../static/login/eye-open.png'
								" mode="widthFix"></image>
						</view>
					</view>
					<view class="input">
						<input class="input_text" :class="{ 'input-filled': info2 }"
							:type="isshowpass1 == 0 ? 'password' : 'text'" :placeholder="$t('sign_up.confirm_passwordPlaceholder')" maxlength="11"
							v-model="newPass" @input="handleInput" data-type="passwords"
							placeholder-style="color:#781000" />
						<view class="passwordshow" @click="showpass(1)">
							<image :src="isshowpass1 == 0
								? '../../../static/login/eye-closed.png'
								: '../../../static/login/eye-open.png'
								" mode="widthFix"></image>
						</view>
					</view>
					<view class="input">
						<input class="input_text" :class="{ 'input-filled': info3 }"
							:type="isshowpass1 == 0 ? 'password' : 'text'" :placeholder="$t('sign_up.confirm_passwordPlaceholder')" maxlength="11"
							v-model="newPass2" @input="handleInput" data-type="passwords"
							placeholder-style="color:#781000" />
						<view class="passwordshow" @click="showpass(1)">
							<image :src="isshowpass1 == 0
								? '../../../static/login/eye-closed.png'
								: '../../../static/login/eye-open.png'
								" mode="widthFix"></image>
						</view>
					</view>
					<view class="regBtn" @click="xzClick(1)">{{ $t('change_password.Change')  }}</view>
				</view>
			</view>
		</view>
		<view v-show="userFeedbackHidden" class="maskLayer">
			<view class="popup_content">
				<view class="image_top"></view>
				<view class="ner">{{ $t('confirm_dialog.change_password')  }}</view>
				<view class="f-a qer">
					<view class="title_1 f-c" @click="btnLink(0)">{{ $t('confirm_dialog.cancel') }}</view>
					<view class="title_2 f-c" @click="btnLink(1)">{{ $t('confirm_dialog.yes') }}</view>
				</view>
			</view>
		</view>

		<view v-show="userFeedbackHidden2" class="maskLayer2">
			<view class="popup_content2">
				<view class="image_top2"></view>
				<view class="ner2">{{ $t('confirm_dialog.after_password_changed')  }}</view>
				<view class="f-a qer2">
					<view class="title_1 f-c" @click="goto()">{{ $t('confirm_dialog.sure')  }}</view>
				</view>
			</view>
		</view>

		
	</view>
</template>
<script>
import state from "@/store/state"
import { localizationMixin } from '../../../common/js/localization';
export default {
  mixins: [localizationMixin],
	data() {
		return {
			oldPass: "",
			newPass: "",
			newPass2: "",
			info: false,
			info2: false,
			info3: false,
			userFeedbackHidden: false,
			userFeedbackHidden2: false,
			infoMsg: "",
			isshowpass1: 0,
		};
	},
	components: {
	},
	onLoad() {
		this.$logins()

	},
	methods: {
		goto() {
			this.userFeedbackHidden = false;
			setTimeout(() => {
				uni.navigateTo({
					url: "/pages/login/login",
				});
			}, 1000);
		},
		xzClick(e) {
			let a = /[@#\$%\^&\*\s]+/g;
			let b = /^[^\s]*$/;
			let passTest = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
			if (this.oldPass == "") {
				uni.showToast({
					title: this.$t('rules.password'),
					icon: 'none'
				})
			} else {
				if (this.newPass == "") {
					uni.showToast({
						title: this.$t('rules.password'),
						icon: 'none'
					})
				} else {
					if (this.newPass2 == "") {
						uni.showToast({
							title: this.$t('rules.new_password'),
							icon: 'none'
						})
					} else {
						if (this.newPass !== this.newPass2) {
							uni.showToast({
								title: this.$t('rules.new_password'),
								icon: 'none'
							})
						} else if (this.newPass.length < 6 || this.newPass.length > 16) {
							uni.showToast({
								title: this.$t('sign_up.password_length_error'),
								icon: 'none'
							})
						} else if (!state.rule.password.test(this.newPass)) {
							uni.showToast({
								title: this.$t('rules.password'),
								icon: 'none'
							})
						} else {
							this.userFeedbackHidden = true;
						}
					}
				}
			}
		},
		btnLink(e) {

			if (e == 1) {
				this.userFeedbackHidden = false;
				let datas = {
					newPassword: this.newPass,
					oldPassword: this.oldPass,
				};

				let url = this.$globalApi.userResetPasswordresetPasswordByOld;
				uni.showLoading({ title: '请稍等' });
				this.$res.postRequest(url, datas)
					.then((res) => {
						uni.hideLoading()
						if (res.data.code == 0) {
							this.userFeedbackHidden2 = true;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
					.catch((err) => {
						uni.hideLoading()
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					});
			} else if (e == 0) {
				this.userFeedbackHidden = false;
			}

		},
		showpass(e) {
			console.log(e, this["isshowpass" + e], !this["isshowpass" + e]);
			if (e == 1) {
				if (this["isshowpass" + e] == 0) {
					this["isshowpass" + e] = 1;
				} else {
					this["isshowpass" + e] = 0;
				}
			}
			if (e == 2) {
				if (this["isshowpass" + e] == 0) {
					this["isshowpass" + e] = 1;
				} else {
					this["isshowpass" + e] = 0;
				}
			}
		},
		goback() {
			if (this.url) {
				uni.reLaunch({
					url: this.url
				})
				return;
			} else {
				history.back();
			}
		},
		handleInput() {
			// Check if the input data is not empty
			this.info = this.oldPass.trim() !== '';
			this.info2 = this.newPass.trim() !== '';
			this.info3 = this.newPass2.trim() !== '';

		},

	},
};
</script>

<style lang="scss">
uni-page-body {
	background-color: #ffffff !important;
	min-height: 101.2vh !important;
	height: auto !important;
}
.password {
	width: 100%;
	box-sizing: border-box;

	.maskLayer2 {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		display: block;

		.popup_content2 {
			width: 594rpx;
			height: 410rpx;
			background: #ffffff;
			border-radius: 20rpx;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.image_top2 {
				background: url("../../../static/change-password/dead-pool.png") no-repeat;
				background-size: 100% 100%;
				width: 234.1962rpx;
				height: 270.924rpx;
				margin: 0 auto;
				margin-top: -138rpx;
			}

			.ner2 {
				margin-top: 58.10rpx;
				display: flex;
				justify-content: center;
				color: #304258;
				text-align: center;
				font-family: Microsoft YaHei UI;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 30rpx;
				letter-spacing: -0.10rpx;
			}

			.qer2 {
				margin-top: 64rpx;

				.title_1 {
					width: 444rpx;
					height: 74rpx;
					border-radius: 22rpx;
					background: #BE1C05; 
					color: #FFF;
					font-family: Microsoft YaHei UI;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 30rpx;
					letter-spacing: -0.10rpx;
					cursor: pointer;
				}
			}
		}
	}

	.maskLayer {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		display: block;
	}

	.popup_content {
		width: 594rpx;
		height: 410rpx;
		background: #ffffff;
		border-radius: 20rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.image_top {
		background: url("../../../static/change-password/Q.png") no-repeat;
		background-size: 100% 100%;
		width: 234.1962rpx;
		height: 270.900rpx;
		margin: 0 auto;
		margin-top: -138rpx;
	}

	.ner {
		margin-top: 58.100rpx;
		display: flex;
		justify-content: center;
		color: #304258;
		text-align: center;
		font-family: Microsoft YaHei UI;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 30rpx;
		letter-spacing: -0.10rpx;
	}

	.qer {
		margin-top: 64rpx;

		.title_1 {
			border-radius: 22rpx;
			background: #9F9F9F;
			width: 264rpx;
			height: 74rpx;
			color: #FFF;
			text-align: center;
			font-family: Microsoft YaHei UI;
			font-size: 24rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 30rpx;
			letter-spacing: -0.10rpx;
			cursor: pointer;
		}

		.title_2 {
			border-radius: 22rpx;
			background: #BE1C05;
			width: 264rpx;
			height: 74rpx;
			color: #FFF;
			text-align: center;
			font-family: Microsoft YaHei UI;
			font-size: 24rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 30rpx;
			letter-spacing: -0.10rpx;
			cursor: pointer;
		}
	}


	#navbar {
		width: 100%;
		height: 110rpx;
		position: relative;
		background-color: transparent !important;
		z-index: 100;

		.fixed {
			position: fixed;
			top: 0;
			left: 0;
			height: 120rpx;
			width: 100%;
			background-color: transparent !important;

			.image {
				width: 22rpx;
				height: 38rpx;
				position: absolute;
				left: 54rpx;
				top: 26rpx;
				text-align: center;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			.title {
				width: 100%;
				height: 100%;
				line-height: 94rpx;
				text-align: center;
				font-size: 32rpx;
				font-weight: bold;
				color: #781000;
			}
		}
	}

	.background_lock {
		background: url("../../../static/change-password/lock.png");
		background-size: 100% 100%;
		width: 750rpx;
		height: 750rpx;
		margin: -20rpx auto;

		.form {
			margin: 470rpx auto 0 auto;
			width: 576rpx;

			.forminpu {

				.input {
					position: relative;
					padding: 0 10rpx 0 20rpx;
					box-sizing: border-box;
					width: 576rpx;
					height: 78rpx;
					border-radius: 182rpx;
					display: flex;
					align-items: center;
					background: none;
					margin-bottom: 28rpx;

					.input_text {
						width: 576rpx;
						height: 78rpx;
						border-radius: 182rpx;
						border: none;
						background: rgba(210, 210, 210, 0.50);
						color: #141D27;
						font-family: Microsoft YaHei UI;
						font-size: 24rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 40rpx;
						letter-spacing: -0.10rpx;
						outline: none;
						padding: 0 38rpx;
					}

					.input-filled {
						background: #BDBDBD;

					}

					.passwordshow {
						width: 40rpx;
						height: 40rpx;
						position: relative;
						right: 72rpx;
						top: 6rpx;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}

				.regBtn {
					width: 232.728rpx;
					height: 66.692rpx;
					background: url("../../../static/change-password/btn.png") no-repeat;
					background-size: 100% 100%;
					color: #FFF;
					text-align: center;
					font-family: Microsoft YaHei UI;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: auto;
					margin-top: 66rpx;
				}
			}
		}
	}

	.border_bottom {
		width: 202rpx;
		height: 0;
		border: 4rpx solid #000;
		border-radius: 100rpx;
		margin: 0 274rpx 38rpx 274rpx;
		position: fixed;
		bottom: 0;
	}
}
</style>
