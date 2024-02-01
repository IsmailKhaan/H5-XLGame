<template>
  <view class="top_class">
      <zhnavbar :title="$t('help_center.betting_tutorial_title')" :lefticon="lefticon"></zhnavbar>
      <view class="heading_one f-a">
          <image src="../../static/image/help/betting.png" mode="widthFix" class="image"></image>
          <view class="heading">{{ $t('help_center.betting_tutorial_subtitle') }}</view>
      </view>
      <image style="margin-top: 51px;" src="../../static/image/tutorials/betting/betting1.jpg" mode="widthFix" class="image_screens"></image>
      <image  style="margin-top: 13px;" src="../../static/image/tutorials/betting/betting2.jpg" mode="widthFix" class="image_screens"></image>
      <image  style="margin-top: 13px;" src="../../static/image/tutorials/betting/betting3.jpg" mode="widthFix" class="image_screens"></image>
      <image  style="margin-top: 13px;" src="../../static/image/tutorials/betting/betting4.jpg" mode="widthFix" class="image_screens"></image>
      <view class="text" v-html="$en($store.state.ens.help_center.betting_tutorial_desc)">
      </view>
      <!-- <view class="text">
          {{ $t('help_center.bank_point2') }}

      </view>
      <view class="text">
        
          {{ $t('help_center.bank_point3') }}

      </view> -->
      <view class="border_bottom">
  </view>
      <view class="border_bottom1">
  </view>
  </view>
</template>

<script>
import { localizationMixin } from "../../common/js/localization";
export default {
mixins: [localizationMixin],
  data() {
      return {
          navtitle: "Deposit Tutorial",
          lefticon: true,
      };
  },
  methods: {},
};
</script>

<style lang="scss">

.top_class{
  width: 100%;
//	height: 100vh;
box-sizing: border-box;
.heading_one {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 70rpx 0 0 50rpx;

  image {
        width: 44.1912rpx;
  }

  .heading {
      margin-left: 18rpx;
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
  }
}



.image_screens {
  width: 80%;
  position: relative;
  margin: 0 0 0 86rpx;
}

.text {
  padding: 12rpx 62rpx 0 72rpx;
  color: #003B3D;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 40rpx;
  letter-spacing: -0.10rpx;
}
.border_bottom {
  width: 202rpx;
  height: 0rpx;
  border: 4rpx solid #000000;
  border-radius: 100rpx;
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
