<template>
	<!--#ifndef APP-PLUS -->
	<web-view :webview-styles="webviewStyles" v-if="activityUrl != ''" :src="activityUrl"></web-view>
	<!-- #endif -->
	<!-- <uphold style="z-index: 9999;"></uphold> -->
</template>

<script>
import { mapState, mapMutations, mapAction } from "vuex";
// import uphold from '@/components/uphold.vue';
var wv;
export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: "#000000"
        }
      },
      gameName: "",
      // isScreen: false,
      start: [0, 0],
      moveY: 0,
      moveX: 0,
      statusBarHeight: 0,

      webviewClose: false

      // backgroundImage: backgroundImage
    };
  },
  onLoad() {
    this.creatWebView();
    console.log(this.$store.state.activityUrl);
    //动态监听键盘高度
    uni.onKeyboardHeightChange(res => {
      console.log("in...");

      if (this.keyBoardHeight == res.height) return;

      this.keyBoardHeight = res.height;
      this.chageWebView();
    });
  },
  // components:{uphold},
  onBackPress() {
    wv.close();
  },
  computed: {
    ...mapState({
      activityUrl: state => state.activityUrl
    }),
    activityUrl() {
      return this.$store.state.activityUrl;
    }
  },
  methods: {
    creatWebView() {
      let systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight;
    },
    chageWebView() {
      // 安卓
      // let res = uni.getSystemInfoSync(), height = 0;
      // //兼容iphonex 和 iphone11
      // if(res.model.indexOf('iphonex') != -1 || res.model.indexOf('iphone11') != -1){
      // 	// height = res.screenHeight - res.statusBarHeight - 43 - uni.upx2px(50) - this.keyBoardHeight;
      // 	// wv.setStyle({
      // 	// 	top: res.statusBarHeight + 44 + this.keyBoardHeight,
      // 	// 	height: height
      // 	// })
      // 	return
      // }else{
      // 	height = res.screenHeight - res.statusBarHeight - 43 - this.keyBoardHeight;
      // }
      // wv.setStyle({
      // 	top: res.statusBarHeight + 44,
      // 	height: height
      // })

      // 苹果
      // 兼容iphonex 和 iphone11
      if (
        res.model.indexOf("iphonex") != -1 ||
        res.model.indexOf("iphone11") != -1
      ) {
        // height = res.screenHeight - res.statusBarHeight - 43 - uni.upx2px(50) - this.keyBoardHeight;
        // wv.setStyle({
        // 	top: res.statusBarHeight + 44 + this.keyBoardHeight,
        // 	height: height
        // })
        return;
      } else {
        let res = uni.getSystemInfoSync(),
          height = 0;
        height =
          res.screenHeight - res.statusBarHeight - 43 - this.keyBoardHeight;
        wv.setStyle({
          top: res.statusBarHeight + 44,
          height: height
        });
      }
    },

    closeWebView() {
      // uni.switchTab({
      // 	url:"./activity"
      // })
      uni.navigateBack({
        delta: 1,
        animationType: "pop-out",
        animationDuration: 200
      });
      wv.close();
    },
    onTapScreen() {
      let res = uni.getSystemInfoSync(),
        height = 0;
      //兼容iphonex 和 iphone11
      if (
        res.model.indexOf("iphonex") != -1 ||
        res.model.indexOf("iphone11") != -1
      ) {
        height = res.screenHeight - res.statusBarHeight - uni.upx2px(50);
      } else {
        height = res.screenHeight - res.statusBarHeight;
      }

      if (this.isScreen) {
        wv.setStyle({
          top: res.statusBarHeight + 44,
          height: height - 43
        });
      } else {
        wv.setStyle({
          top: res.statusBarHeight + 20,
          height: height - 19
        });
      }
      this.isScreen = !this.isScreen;
    }
  }
};
</script>

<style>
.loading-img {
  width: 200rpx;
  padding: 0rpx 25rpx;
  margin: 0 auto;
  margin-top: calc(
    50vh - var(--status-bar-height) - var(--window-bottom) - 22px - 100rpx
  );
  margin-left: calc(50vw - 100rpx);
}
.header {
  width: 100%;
}
.plus-nav-bg {
  /* background:linear-gradient(90deg, #a1c73b, #11a23c) !important; */
  background: #ffffff;
  width: 100%;
}
.header-main {
  height: 44px;
  display: flex;
  align-items: center;
  /* background:linear-gradient(90deg, #a1c73b, #11a23c) !important; */
  background: #ffffff;
}
.header-main-screen {
  width: 750rpx;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background:linear-gradient(90deg, #a1c73b, #11a23c) !important; */
  background: #ffffff;
}
.header-main .close {
  width: 180rpx;
  height: 44px;
  line-height: 44px;
  font-size: 40rpx;
  padding-left: 20rpx;
  color: #474747;
}
.header-main .title {
  width: 370rpx;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: #474747;
  font-size: 32rpx;
}
.header-main .action {
  display: flex;
  height: 44px;
  line-height: 44px;
  width: 200rpx;
  color: #474747;
}
.header-main .action .item {
  width: 80rpx;
  height: 44px;
  line-height: 44px;
  text-align: center;
  padding: 0rpx 10rpx;
  font-size: 32rpx;
}
</style>
