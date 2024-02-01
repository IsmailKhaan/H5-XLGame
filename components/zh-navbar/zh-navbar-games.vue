<template>
  <view id="navbar">
    <view class="fixed">
      <view class="image" v-if="lefticon" @click="goback(1)">
        <image src="../../static/zhnavbar/leftjt.png" mode="widthFix"></image>
      </view>
      <view class="title">{{ title }}</view>
    </view>
    <uni-popup ref="showtip" type="center" class="masklayer" :mask-click="true">
      <view class="openAlert">
        <view class="logo"></view>
        <text class="title">{{ $t("confirm_dialog.confirm") }}</text>
        <view class="f-c content">
          <text>{{ $t("confirm_dialog.confirm_exit_game") }}</text>
        </view>
        <view class="f-c auto">
          <text class="btn-del" @tap="GoToIndex()">{{
            $t("confirm_dialog.sure")
          }}</text>
          <text class="btn-cancel" @tap="cancel()">{{
            $t("confirm_dialog.cancel")
          }}</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  name: "zh-navbar",
  data() {
    return {};
  },
  props: ["title", "lefticon", "url"],
  onLoad() {},
  methods: {
    goback(e) {
      if (e == 1) {
        this.$refs["showtip"].open();
      }
    },
    GoToIndex() {
      console.log(this.url, "url------------------------");
      if (this.url) {
        uni.navigateTo({
          url: this.url,
        });
        return;
      } else {
        history.back();
      }
    },
    cancel() {
      this.$refs["showtip"].close();
    },
  },
};
</script>

<style lang="scss">
#navbar {
  // background: #ebeefd !important;
  width: 100%;
  height: 110rpx;
  position: relative;
  z-index: 100;

  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 110rpx;
    width: 100%;
    // background: url("../../static/zhnavbar/tp-panel-bg.png") no-repeat center center;
    // background-size: 100% 100%;

    .image {
      width: 22rpx;
      height: 38rpx;
      position: absolute;
      left: 54rpx;
      top: 36rpx;
      text-align: center;

      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .title {
      width: 100%;
      height: 110rpx;
      line-height: 112rpx;
      text-align: center;
      color: #781000;
      font-family: Microsoft YaHei UI;
      font-size: 32rpx;
      font-weight: 700;
      letter-spacing: -0.1rpx;
    }
  }
  .masklayer {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: block;
    .openAlert {
      width: 594rpx;
   //   height: 410rpx;
      background: #ffffff;
      border-radius: 40rpx;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      margin:0;
      padding-bottom: 36rpx !important;
      .title {
        color: #be1c05;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 30rpx;
        letter-spacing: -0.1rpx;
        padding: 20rpx 234rpx 0 234rpx;
      }
      .content {
        color: #003B3D;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
        letter-spacing: -0.1rpx;
        padding: 40rpx 0rpx 0 0;
      }
      .auto {
        margin-top: 44rpx;
        .btn-del {
          display: flex;
          width: 264rpx;
          height: 74rpx;
          border-radius: 22rpx;
          background: #be1c05;
          align-items: center;
          justify-content: center;
          //margin: 0 20rpx;
          color: #fff;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.1rpx;
          margin: 0 12rpx 0 0;
        }
        .btn-cancel {
          display: flex;
          width: 264rpx;
          height: 74rpx;
          border-radius: 22rpx;
          background: #9f9f9f;
          color: #fff;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.1rpx;
          margin: 0 0 0 12rpx;
        }
      }
      .logo {
        background: url("../../static/index/exitor.png") no-repeat;
        background-size: 100% 100%;
        width: 139px;
        height: 170px;
        margin: 0 auto;
        margin-top: -113px;
      }
    }
  }
}
</style>
