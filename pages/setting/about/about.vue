<template>
  <view class="self set-bg">
    <zhnavbar
      :title="$t('about_us.about_us_title')"
      :lefticon="true"
    ></zhnavbar>

    <view class="main flex-col">
      <image src="../../../static/help/logo.png" mode="" class="icon"></image>
      <view class="border"> </view>
      <!-- <view class="tit" style="margin-top: 10rpx;"> {{ $t('about_us.about_us_subtitle') }}</view> -->

      <view class="f-c team-box">
        <view class="team">
          <image src="../../../static/help/brmnh.png" mode="widthFix"></image>
          <text v-html="$t('about_us.sponsor1')"></text>
        </view>
        <view class="team">
          <image
            src="../../../static/help/hjmdl.png"
            mode="widthFix"
            class="team-img"
          ></image>
          <text v-html="$t('about_us.sponsor2')"></text>
        </view>
        <view class="team">
          <image
            src="../../../static/help/gjml.png"
            mode="widthFix"
            class="team-img"
          ></image>
          <text v-html="$t('about_us.sponsor3')"></text>
        </view>
      </view>
      <view class="tit2" v-html="$t('about_us.about_us_description')"> </view>

      <view class="f-c team-box">
        <view class="team">
          <image src="../../../static/help/yswej.png" mode="widthFix"></image>
          <text v-html="$t('about_us.sponsor4')"></text>
        </view>
        <view class="team">
          <image
            style="width: 112rpx"
            src="../../../static/help/mqt.png"
            mode="widthFix"
            class="team-img"
          ></image>
          <text v-html="$t('about_us.sponsor5')"></text>
        </view>
        <view class="team">
          <image
            src="../../../static/help/flb.png"
            mode="widthFix"
            class="team-img"
          ></image>
          <text v-html="$t('about_us.sponsor6')"></text>
        </view>
      </view>
    </view>
    <view class="border_bottom"></view>
  </view>
</template>

<script>
import state from "../../../store/state";
import { localizationMixin } from "../../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.self {
  width: 100%;
  height: 100%;

  .main {
    width: 682rpx;
    height: 87vh;
    background-color: #ffffff;
    margin: 0 auto;
    box-sizing: border-box;
    justify-content: flex-start;

    .icon {
      margin-top: 58rpx;
      width: 148rpx;
      height: 148rpx;
    }

    .tit {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .tit2 {
      color: #3066a8;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .border {
      margin-top: 18rpx;
      background: url("../../../static/help/border.png") no-repeat center;
      background-size: 100% 100%;
      //width: 250rpx;
      //height: 2rpx;
      width: 282.483px;
      height: 64px;
    }

    .team-box {
      margin: 62rpx 60rpx 52rpx 60rpx;
      width: 100%;
      .team {
        width: 254rpx;
        height: 202rpx;
        font-size: 24rpx;
        display: grid;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: auto;

        image {
          width: 84rpx;
          margin: 0 auto;
        }

        text {
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      /*.team:hover{
		  border-top: 4rpx solid #F92204;
		  background: linear-gradient(180deg, #D9D9D9 0%, rgba(217, 217, 217, 0.00) 69.94%);
		}*/
    }

    .country-box {
      width: 100%;
      justify-content: space-around;
      margin-top: 40rpx;

      .country {
        font-size: 24rpx;

        .country-img {
          width: 102rpx;
          height: 100rpx;
        }

        .img {
          width: 185rpx;
        }
      }
    }
  }

  .border_bottom {
    width: 202rpx;
    height: 0rpx;
    border: 4rpx solid #000000;
    border-radius: 100rpx;
	position: fixed;
    bottom: 38rpx;
    left: 274rpx;
 }
}
</style>
