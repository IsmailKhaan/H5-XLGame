<template>
	<view class="baseinfo flex-col">
	  <zhnavbar
		:title="$t('personel_info.personel_info_title') "
		:lefticon="true"
		url="/pages/home/home"
	  ></zhnavbar>
  
	  <view class="profile_edit">
		<view class="profile_image">
		  <image
			class="image_main"
			v-if="$store.state.user.avatar"
			:src="$store.state.user.avatar"
			mode="widthFix"
			@tap="open"
		  ></image>
  
		  <image
			v-else
			@tap="open"
			class="image_main"
			src="../../static/home/memo.png"
			mode="widthFix"
		  ></image>
		  <image
			class="edit_icon"
			src="../../static/home/edit.png"
			mode="widthFix"
		  ></image>
		</view>
		<view class="name_use">
		  {{ $store.state.user.username }}
		</view>
	  </view>
  
	  <view  v-if="userIn.realName" class="user_actual_name_info f-s" style="margin-top: 25px">
		<view class="name_side">
		  <view class="name">{{ $t('personel_info.actual_name')  }}</view>
		  <view class="name_or_hints" >
			{{ userIn.realName }}
		  </view>
		</view>
	  </view>
	  <navigator v-if="!userIn.realName"  url="/pages/baseinfo/name/name" class="user_actual_name_info f-s" style="margin-top: 25px">
		<view class="name_side">
		  <view class="name">{{ $t('personel_info.actual_name')  }}</view>
		  <view class="name_or_hints"  >
			{{ $t('personel_info.actual_name_des')  }}
		  </view>
		</view>
		<image class="left_arrow" src="../../static/home/angle-right.png" mode="">
		</image>
	  </navigator>
  
	  <view class="user_actual_name_info f-s">
		<view class="name_side">
		  <view class="name">{{ $t('personel_info.gender')  }}</view>
		  <view class="name_or_hints" v-if="userIn.customerGender">
			{{ userIn.customerGender == 0 ? $t('personel_info.male') : $t('personel_info.female') }}
		  </view>
		  <view class="name_or_hints" v-if="!userIn.customerGender">
			{{ userIn.customerGender == 0 ? $t('personel_info.male') : $t('personel_info.female') }}
		  </view>
		</view>
	  </view>
  
	  <view class="user_actual_name_info f-s">
		<view class="name_side">
		  <view class="name">{{ $t('personel_info.dob_lbl')  }}</view>
		  <view class="name_or_hints"  v-if="userIn.customerBirthday">
			{{ userIn.customerBirthday }}
		  </view>
		  <view class="name_or_hints"  v-if="!userIn.customerBirthday">
			{{ $t('personel_info.dob_des_lbl')  }}
		  </view>
		</view>
	  </view>
  
	  <view v-if="userIn.customerPhone" class="user_actual_name_info f-s" style="margin-top: 39px">
		<view class="name_side">
		  <view class="name">{{ $t('personel_info.tel')  }}</view>
		  <view class="name_or_hints"  >
			{{ userIn.customerPhone }}
		  </view>
		</view>
	  </view>
	  <navigator v-if="!userIn.customerPhone" url="/pages/baseinfo/phone/phone" class="user_actual_name_info f-s" style="margin-top: 39px">
		<view class="name_side">
		  <view class="name">{{ $t('personel_info.tel')  }}</view>
		  <view class="name_or_hints"  >
			158****9991
		  </view>
		</view>
		<image class="left_arrow" src="../../static/home/angle-right.png" mode=""></image>
	  </navigator>
  
	  <view v-if="userIn.customerEmail" class="user_actual_name_info f-s">
		<view class="name_side">
		  <view class="name">{{ $t('personel_info.email_address')  }}</view>
		  <view class="name_or_hints" v-if="userIn.customerEmail">
			{{ userIn.customerEmail }}
		  </view>
		</view>
	  </view>

	  <navigator v-if="!userIn.customerEmail"  url="/pages/baseinfo/email/email" class="user_actual_name_info f-s">
		<view class="name_side">
		  <view class="name">{{ $t('personel_info.email_address')  }}</view>
		  <view class="name_or_hints" v-if="!userIn.customerEmail">
			{{ $t('personel_info.email_address_des')  }}
		  </view>
		</view>
		<image class="left_arrow" src="../../static/home/angle-right.png" mode="">
		</image>
	  </navigator>
  
	  <view class="text_bottom " @click="kefu()">
		{{ $t('personel_info.actualName_des_lbl')  }} <br>
		<span >{{ $t('personel_info.actualname_des_2')  }}</span>
	  </view>
  
      <!-- avatar open -->
	  <uni-popup ref="showshare" type="bottom">
		<view class="uni-share">
		  <image
			class="borders"
			src="../../static/home/avator_border.png"
		  ></image>
		  <view class="avator_selector f-a">
			<view
			  class="avators f-c"
			  @click="switchFx(0)"
			  :class="animi == 0 ? 'on' : ''"
			  >{{ $t('general.real_person') }}</view
			>
			<view
			  class="avators f-c"
			  @click="switchFx(1)"
			  :class="animi == 1 ? 'on' : ''"
			  >{{ $t('general.avtar') }}</view
			>
		  </view>
		  <view v-show="animi == 0" class="uni-share-content">
			<view v-for="(item, index) in headList" :key="index">
			  <image
				:src="iconUrl + item"
				mode=""
				class="head"
				@click="chooseHead(index)"
			  ></image>
			</view>
		  </view>
		  <view class="uni-share-content" v-show="animi == 1">
			<view v-for="(ite, index) in avatars" :key="index">
			  <image
				:src="iconUrl + ite"
				mode=""
				class="head"
				@click="chooseHead(index)"
			  ></image>
			</view>
		  </view>
		  <image
			class="borders"
			src="../../static/home/avator_border.png"
		  ></image>
		</view>
	  </uni-popup>
	
	</view>
  </template>
  
  <script>
  import { mapState, mapMutations, mapAction } from "vuex";
  import state from "@/store/state";
  
  import { localizationMixin } from '../../common/js/localization';
export default {
  mixins: [localizationMixin],
	data() {
	  return {
		navtitle: "Personal Information",
		headList: [],
		userIn: {},
		jsonList: "",
		iconUrl: "",
		animi: "0",
		avatars:[],
	  };
	},
	computed: {
	  ...mapState({
		userAccount: (state) => state.userAccount,
		baseInfo: (state) => state.baseInfo,
		safety: (state) => state.safety,
	  }),
	  userAccount() {
		return this.$store.state.userAccount;
	  },
	  baseInfo() {
		return this.$store.state.baseInfo;
	  },
	  safety() {
		return this.$store.state.safety;
	  },
	},
	onLoad() {
	  this.userInfogetCustomerInfo();
	},
	components: {},
	methods: {
		switchFx(e) {
      this.animi = e;
    },

	  //avatar
	  userInfogetCustomerInfo() {
		this.iconUrl = state.iconUrl;
		let url = this.$globalApi.userInfogetCustomerInfo;
		this.$res.postRequest(url).then((res) => {
		  if (res.data.code == 9999) {
			uni.navigateTo({
			  url: "/pages/login/login",
			});
		  }
		  if (res.data.code == 0) {
			this.userIn = res.data.data.customerInfo;
		  }
		});
	  },
	
	  chooseHead(index) {
      console.log(index);
      this.$refs["showshare"].close();
      let url = this.$globalApi.userInfochangeIcon;
      let datas = { userIcon: index };

      this.headList = uni.getStorageSync("staticResources").headIcon;
      this.avatars = uni.getStorageSync("staticResources").avatar;
      console.log(this.headList, "HeadList",this.avatars, "avatars");
      this.$res.postRequest(url, datas).then((res) => { 
        if (res.data.code == 0) {
          const chosenValue = this.headList[index] || this.avatars[index];
          state.user.userIcon = index;
          state.user.avatar = state.iconUrl + chosenValue;
          console.log(state.user);
          uni.setStorageSync("memberInfo", state.user);
          this.$forceUpdate();
        }
        uni.showToast({
          title: res.data.msg,
          icon: "none",
        });
      });
    },
	  open() {
		this.jsonList = state.jsons;
		this.headList = state.static.headIcon;
        this.avatars = state.static.avatar;
		this.$refs["showshare"].open();
	  },
	  cancel() {
		this.$refs["showshare"].close();
	  },
	  kefu() {
		uni.navigateTo({
		  url: "/pages/service/serviceDtl",
		});
	  },
	},
  };
  </script>
  
  <style lang="scss">
  uni-page-body {
	background: #ffffff;
  }
  
  .baseinfo {
	width: 100%;
  
	.profile_edit {
	  display: flex;
	  align-items: center;
	  justify-content: flex-start;
	  width: 100%;
	  padding: 20rpx 0 0 60rpx;
  
	  .profile_image {
		.image_main {
		  width: 122rpx;
		}
  
		.edit_icon {
		  width: 46rpx;
		  height: 48rpx;
		  margin: 4rpx;
		  position: absolute;
		  left: 140rpx;
		  top: 212rpx;
		}
	  }
  
	  .name_use {
		color: #008D91;
		font-family: Microsoft YaHei UI;
		font-size: 32rpx;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		margin-left: 22rpx;
	  }
	}
  
	.user_actual_name_info {
	  width: 648rpx;
	  border-bottom: 2rpx solid rgba(0, 0, 0, 0.5);
	  padding: 0 20rpx 28rpx 22rpx;
	  margin-top: 24rpx;
  
	  .name_side {
		width: 554rpx;
		.name {
		  color: #003B3D;
		  font-family: Microsoft YaHei UI;
		  font-size: 24rpx;
		  font-style: normal;
		  font-weight: 700;
		  line-height: normal;
		}
  
		.name_or_hints {
		  color: #003B3D;
		  font-family: Microsoft YaHei UI;
		  font-size: 24rpx;
		  font-style: normal;
		  font-weight: 400;
		  line-height: normal;
		  margin-top: 8rpx;
		}
	  }
  
	  .left_arrow {
		width: 23rpx;
		height: 34rpx;
	  }
	}
  
	.text_bottom {
	  color: #003B3D;
	  font-family: Microsoft YaHei UI;
	  font-size: 24rpx;
	  font-style: normal;
	  font-weight: 400;
	  line-height: normal;
	  width: 676rpx;
	  margin-top: 92rpx;
	  text-align: center;
	  span {
		margin: 0 0 0 6rpx;
		padding: 0 14rpx 0 8rpx;
		color: #4272f2;
		text-align: center;
		font-family: Microsoft YaHei UI;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 700;
		line-height: 36rpx; /* 125% */
		letter-spacing: -0.5px;
		border-bottom: 4rpx solid #4272f2;
	  }
	}
  
/*	.uni-share {
	  display: flex;
	  flex-direction: column;
	  background-color: #fff;
	  border-radius: 20rpx 20rpx 0 0;
	  margin: 0 auto;
	}
  
	.uni-share-title {
	  line-height: 60rpx;
	  font-size: 30rpx;
	  padding: 15rpx 0;
	  text-align: center;
	  color: #474747;
	}
  
	.uni-share-content {
	  display: flex;
	  flex-direction: row;
	  flex-wrap: wrap;
	  justify-content: flex-start;
	  padding: 15px;
  
	  .head {
		width: 138rpx;
		height: 138rpx;
		// padding: 2px;
		// background: #f1f1f1;
		border-radius: 70rpx;
		margin-left: 30rpx;
	  }
	}
  
	.uni-share-content-box {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 200rpx;
	  border: 1px solid #e5e5e5;
	  // border-radius: 20rpx;
	  width: 23%;
	  margin-bottom: 10rpx;
	  margin-right: 12rpx;
	  height: 104rpx;
	  text-align: center;
	  box-sizing: border-box;
	}
  
	.uni-share-btn {
	  height: 90rpx;
	  line-height: 90rpx;
	  font-size: 14px;
	  border-top-color: #f5f5f5;
	  border-top-width: 1px;
	  border-top-style: solid;
	  text-align: center;
	  color: #666;
	  width: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  padding: 10px 0;
	  // margin-bottom: calc(var(--window-bottom));
	}

*/
	/* 底部分享 */
.uni-share {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 40rpx 40rpx 0 0;
	margin: 0 auto;
	padding: 40rpx 0;
	padding-bottom: 50rpx;
	.borders {
	  width: 202rpx;
	  height: 4rpx;
	  margin: 0 auto;
	}
	.avator_selector {
	  width: 612rpx;
	  height: 66rpx;
	  border-radius: 108rpx;
	  background: #008D91;
	  box-shadow: 0px 0px 18rpx 0px rgba(0, 0, 0, 0.63) inset;
	  margin: 44rpx auto;
	  .avators {
		width: 306rpx;
		height: 54rpx;
		color: #fff;
		text-align: center;
		font-family: Microsoft YaHei UI;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 40rpx; /* 166.667% */
		letter-spacing: -0.5px;
	  }
	  .avators.on {
		color: #008D91;
		width: 270rpx;
		height: 54rpx;
		border-radius: 108rpx;
		background: #fff;
	  }
	}
  }
  
  .uni-share-title {
	line-height: 60rpx;
	font-size: 30rpx;
	padding: 15rpx 0;
	text-align: center;
	color: #474747;
  }
  
  .uni-share-content {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	padding: 30rpx;
	.head {
	  width: 138rpx;
	  height: 138rpx;
	  border-radius: 70rpx;
	  margin-left: 30rpx;
	}
  }
  
  .uni-share-content-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 200rpx;
	border: 2rpx solid #e5e5e5;
	width: 23%;
	margin-bottom: 10rpx;
	margin-right: 12rpx;
	height: 104rpx;
	text-align: center;
	box-sizing: border-box;
  }

  
  }
  </style>
  