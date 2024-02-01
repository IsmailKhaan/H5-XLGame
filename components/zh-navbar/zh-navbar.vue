<template>
  <view id="navbar">
    <view class="fixed">
      <view class="icon-block f-c">
        <view class="image" v-if="lefticon" @click="goback">
          <image src="../../static/zhnavbar/leftjt.png" mode="widthFix"></image>
        </view>
      </view>
      <view class="title">{{ title }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "zh-navbar",
  data() {
    return {};
  },
  props: ["title", "lefticon", "url"],
  onLoad() {},
  methods: {
    goback() {
      // console.log(this.url);
      // return;
      if (this.url) {
        uni.reLaunch({
          url: this.url,
        });
        this.$store.state.hideview = false;
        this.$store.state.hideview2 = false;
        this.$store.state.hideview3 = false;
        return;
      } else {
        this.$store.state.hideview = false;
        this.$store.state.hideview2 = false;
        this.$store.state.hideview3 = false;
        history.back();
      }
    },
  },
};
</script>

<style lang="scss">
#navbar {
  width: 100%;
  height: 110rpx;
  position: relative;
  z-index: 100;
  //background: #fff;
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100rpx;
    width: 100%;
    background: #ffffff;
    background-size: 100% 100%;
    .icon-block{
      position: absolute;
      left: 10rpx;
      top: 0rpx;
      width:100rpx;
      height:100rpx;
    }
    .image {
      width: 22rpx;
      height: 38rpx;
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
      color: #003B3D;
      letter-spacing: 2.8rpx;
    }
  }
}




</style>
