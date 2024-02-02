<template>
  <view class="top_class">
    <zhnavbar
      :title="$t('help_center.transfer_tutorial_title')"
      :lefticon="lefticon"
    ></zhnavbar>
    <view class="heading_one f-a">
      <image
        src="../../static/image/help/withdraw_tutorial.png"
        mode="widthFix"
        class="image"
      ></image>
      <view class="heading">{{ $t("help_center.transfer_steps") }}</view>
    </view>
    <view class="A">A</view>
    <view class="f-c img">
      <image
        src="../../static/image/tutorials/transfer/transfer1.jpg"
        mode="widthFix"
        class="image_screens"
      ></image>
    </view>
    <view class="text">
      {{ $t("help_center.transfer_point1") }}
    </view>

    <view class="A">B</view>
    <view class="f-c img">
      <image
        src="../../static/image/tutorials/transfer/transfer2.jpg"
        mode="widthFix"
        class="image_screens"
      ></image>
    </view>
    <view class="f-c">
      <image
        src="../../static/image/tutorials/transfer/transfer3.jpg"
        mode="widthFix"
        class="image_screens single"
      ></image>
    </view>
    <view class="text">
      {{ $t("help_center.transfer_point2") }}
    </view>
    <view class="text">
      {{ $t("help_center.transfer_point3") }}
    </view>
    <view class="text">
      {{ $t("help_center.transfer_point4") }}
    </view>
    <view class="border_bottom"> </view>
    <view class="border_bottom1"> </view>
  </view>
</template>

<script>
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      navtitle: "Transfer Tutorial",
      lefticon: true,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.top_class {
  width: 100%;
  //	height: 100vh;
  box-sizing: border-box;
  .heading_one {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 70rpx 0 0 50rpx;

    image {
      width: 54.1098rpx;
    }

    .heading {
      margin-left: 18rpx;
      color: #003b3d;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .A {
    margin: 48rpx auto;
    width: 148rpx;
    height: 60rpx;
    border-radius: 22rpx;
    background: #008d91;
    color: #fff;
    font-family: Microsoft YaHei UI;
    font-size: 36rpx;
    font-style: normal;
    font-weight: 700;
    line-height: 54.546rpx;
    letter-spacing: -0.1364rpx;
    text-align: center;
  }
  .img {
    margin-left: -70rpx;
  }
  .image_screens {
    width: 524rpx;
    height: 952rpx;
    margin: 4rpx 0;
  }
  .single{
    width: 440rpx;
  }

  .text {
    padding: 12rpx 62rpx 0 72rpx;
    color: #003b3d;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 40rpx;
    letter-spacing: -0.1rpx;
  }
  .border_bottom {
    width: 202rpx;
    height: 0rpx;
    border: 4rpx solid #000000;
    border-radius: 50px;
    margin: 88rpx 274rpx 38rpx 274rpx;
  }

  .border_bottom1 {
    width: 202rpx;
    height: 0rpx;
    border: 4rpx solid #fff;
    border-radius: 100rpx;
    margin: 20rpx 274rpx 38rpx 274rpx;
  }
}
</style>
