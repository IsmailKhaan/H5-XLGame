<template>
  <view class="content">
    <view @click="support" class="support">
      <image src="../../static/login/support.png" mode="widthFix"></image>
    </view>
    <view class="form">
      <view class="passwordOK">
        <image src="../../static/login/passchange.png" mode="widthFix"></image>
        <view class="text2 f-c">您的新密码已设置，<b class="text3">不要分享
          </b>和  </view>
        <view class=" text2 f-c">
          还有谁！
        </view>
        <view class="star1"></view>
        <view class="star2"></view>
        <navigator class="loginbtn" url="/pages/login/login">  {{ $t('general.oka')  }}</navigator>
        <view class="star3"></view>

      </view>
    </view>
    <view class="callkf">
      {{ $t('general.info_lbl')  }}
    </view>
  </view>
</template>

<script>
import { localizationMixin } from '../../common/js/localization';

export default {
	mixins: [localizationMixin],

  data() {
    return {

    }
  },
  methods: {
    support() {
      uni.navigateTo({
        url: "../service/serviceDtl",
      });
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

  .form {
    .passwordOK {
      width: 100%;
      text-align: center;
      color: #BF1C05;

      image {
        width: 268rpx;
        height: 266rpx;
        display: block;
        margin: 418rpx auto 40rpx;
      }

      .text2 {
        margin: auto;
        color: #BF1C05;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .text3 {
        color: #FF470F;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-right: 10rpx;
      }

      navigator {
        width: 384rpx;
        height: 76rpx;
        background: url("../../static/login/ok_btn.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
        font-size: 24rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        margin-top: 6.34rpx;
      }
    }
  }

  .callkf {
    position: fixed;
    bottom: 70rpx;
    left: 0;
    width: 100%; 
    z-index: 10;
    color: #ABABAB;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .support {
    width: 64rpx;
    height: 64rpx;
    position: relative;
    top: 8rpx;
    left: 648rpx;

    image {
      display: block;
      width: 100%;
    }
  }

  .star1 {
    width: 22rpx;
    height: 22rpx;
    background: url("../../static/login/Vector_3.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 244rpx;
    margin-top: 64rpx;
  }
  .star2 {
    width: 30rpx;
    height: 30rpx;
    background: url("../../static/login/Vector_1.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 500rpx;
    margin-top: 4rpx;

  }

  .star3 {
    width: 50rpx;
    height: 50rpx;
    background: url("../../static/login/Vector_2.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 290rpx;
    margin-top: 22.158rpx;

  }

}
</style>