<template>
  <view class="main">
    <image
      class="lefthand"
      mode="widthFix"
      src="../../static/index/lefthand.png"
    >
    </image>
    <image
      class="hellotext"
      mode="widthFix"
      src="../../static/index/hellotext.png"
    >
    </image>
    <image
      class="righthand"
      mode="widthFix"
      src="../../static/index/righthand.png"
    >
    </image>
    <navigator url="/pages/register/register" class="sign_up f-c"
      >Sign up</navigator
    >
    <navigator url="/pages/login/login" class="log_in f-c">Log In</navigator>
    <view class="quick_visit f-c"
      >For quick experience tap
      <navigator url="/pages/index/index" class="link">Quick Visit</navigator>
    </view>
  </view>
</template>

<script>
export default {
  name: "H5XLGameHome",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.main {
  border-radius: 80rpx 80rpx 0 0;
  background: #008d91;
  box-shadow: 0rpx -12rpx 24rpx 0px rgba(0, 141, 145, 0.45);
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .lefthand {
    position: absolute;
    top: -100rpx;
    width: 100%;
  }
  .hellotext {
    width: 380rpx;
    height: 256rpx;
  }
  .righthand {
    position: absolute;
    right: 0;
    width: 100%;
    bottom: 0;
    // z-index: 1;
  }
  .sign_up {
    color: #003b3d;
    font-size: 24rpx;
    font-weight: 700;
    width: 536rpx;
    height: 88rpx;
    flex-shrink: 0;
    border-radius: 20rpx;
    background: #fff;
    position: absolute;
    bottom: 356rpx;
  }
  .log_in {
    color: #fff;
    font-size: 24rpx;
    font-weight: 700;
    width: 536rpx;
    height: 88rpx;
    flex-shrink: 0;
    border-radius: 20rpx;
    background: #003b3d;
    position: absolute;
    bottom: 236rpx;
  }
  .quick_visit {
    color: #fff;
    font-size: 20rpx;
    position: absolute;
    bottom: 146rpx;
    .link {
      color: #003b3d;
      font-size: 20rpx;
      font-weight: 700;
      border-bottom: 4rpx solid #003b3d;
      padding: 8rpx;
    }
  }
}
</style>
