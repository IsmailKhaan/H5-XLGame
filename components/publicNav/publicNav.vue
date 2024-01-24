<template>
  <view class="publicnav">
    <navigator url="/pages/activity/activity">
      <image
        class="image"
        mode="widthFix"
        src="/static/index/promo-nav.png"
      ></image>
      <view v-if="active != 1" class="text">优惠</view>
      <image
        class="dot"
        v-if="active == 1"
        mode="widthFix"
        src="/static/zhnavbar/dot.png"
      ></image>
    </navigator>
    <navigator url="/pages/service/service">
      <image mode="widthFix" src="/static/index/cs-nav.png"></image>
      <view v-if="active != 2" class="text">客服</view>
      <image
        class="dot"
        v-if="active == 2"
        mode="widthFix"
        src="/static/zhnavbar/dot.png"
      ></image>
    </navigator>
    <navigator
      :class="active == 3 ? 'active centericon' : 'centericon'"
      hover-class="none"
      url="/pages/index/index"
    >
      <image
        v-if="active != 3"
        mode="widthFix"
        src="/static/index/home-nav-active.png"
      ></image>
      <image
        v-if="active == 3"
        mode="widthFix"
        src="/static/index/home-nav.png"
      ></image>
    </navigator>
    <navigator url="/pages/vip/vip">
      <image
        class="crown"
        mode="widthFix"
        src="/static/index/sponsor-nav.png"
      ></image>
      <view v-if="active != 4" style="margin-left: 6rpx;" class="text">等级</view>
      <image
        class="dot"
        v-if="active == 4"
        mode="widthFix"
        src="/static/zhnavbar/dot.png"
      ></image>
    </navigator>
    <navigator url="/pages/home/home">
      <image mode="widthFix" src="/static/index/me-nav.png"></image>
      <view v-if="active != 5" class="text">我的</view>
      <image
        class="dot"
        v-if="active == 5"
        mode="widthFix"
        src="/static/zhnavbar/dot.png"
      ></image>
    </navigator>
  </view>
</template>

<script>
export default {
  name: "publicNav",
  data() {
    return {};
  },
  props: {
    active: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
.publicnav {
  position: fixed;
  width: 100%;
  height: 125rpx;
  z-index: 100;
  bottom: 0;
  left: 0;
  border: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  /*border-top-left-radius: 30rpx;
	border-top-right-radius: 30rpx;
	background: linear-gradient(to bottom, #99210D, #CC542C);
	box-shadow: 0 0 10rpx 5rpx rgba(167, 167, 167, 0.4);*/
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  background: linear-gradient(180deg, #99210d 4.62%, #cc542c 91.54%);
  box-shadow: 0rpx -6rpx 16rpx 0rpx rgba(0, 0, 0, 0.41);
  z-index: 1000;

  navigator {
    display: block;
    text-align: center;
    width: auto;

    image {
      width: 52rpx;
      height: 52rpx;
      display: block;
      margin: auto;
    }
    .crown {
      width: 68rpx;
      height: 38rpx;
    }
  }

  .centericon {
    position: relative;
    width: 106rpx;
    height: 106rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    image {
      width: 120rpx;
     // height: 106rpx;
      position: absolute;
	  margin-top: 6rpx;
    }
  }
}

.dot {
  margin-top: 18rpx !important;
  width: 14rpx !important;
  height: 14rpx !important;
}
.text{
  margin-top: 8rpx;
  color: #FFF;
font-family: Microsoft YaHei UI;
font-size: 24rpx;
font-style: normal;
font-weight: 400;
line-height: normal;
}
</style>
