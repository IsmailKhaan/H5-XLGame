<template>
  <view>
    <loading :isshow="isshow" ></loading>

    <gamenavbar :class="{ 'addclass1': !nav }" :title="$store.state.gamesIndex" :lefticon="true"
      style="margin-bottom:6rpx;" v-show="nav" url="/pages/index/index">
    </gamenavbar>
    <div :class="{ 'addclass1': !nav }" class="btnAll f-c" @click="nav = false" v-show="nav">
      {{$t('general.full_screen') }}
    </div>
    <!-- show nav-icon -->
    <div :class="{ 'addclass1': nav }" v-show="$store.state.uniqueCode == 4002" class="showNav2" @click="nav = true">
      <image style="width:30px; height:30px;" src="../../static/index/return.png" mode="widthFix"></image>
    </div>
    <div :class="{ 'addclass1': nav }" v-show="$store.state.uniqueCode != 4002" class="showNav" @click="nav = true">
      <!-- <span>>></span> -->
    </div>
    <!--#ifndef APP-PLUS -->
    <web-view :webview-styles="webviewStyles" :src="$store.state.activityUrl1" :class="{ 'navClass': nav }"></web-view>
    <!-- #endif -->
  </view>
</template>

<script>
import { mapState, mapMutations, mapAction } from "vuex";
import state from 'store/state'

var wv;
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      // gameName: "",
      toggle: true,
      isshow: 1,
      nav: false,//导航显示
      webviewStyles: {
        progress: {
          color: "#000000"
        }
      },
      // isScreen: false,
      start: [0, 0],
      moveY: 0,
      moveX: 0,
      statusBarHeight: 0,
      webviewClose: false
    };
  },

  onLoad() {
    setTimeout(function () {
      that.isshow = 0;
    }, 1000)
    this.creatWebView();
    console.log(this.$store.state.activityUrl1, '跳转游戏页面');

    let that = this;
    uni.getStorage({
      key: 'gameid',
      success(res) {
        console.log('获取成功', res.data) // id=80
        that.uniQcode = res.data;
        if (res.data[0] == 1 || res.data[0] == 2) {
          that.nav = true;
        }
      },
    })


    //动态监听键盘高度
    uni.onKeyboardHeightChange(res => {
      console.log("in...");
      if (this.keyBoardHeight == res.height) return;
      this.keyBoardHeight = res.height;
      this.chageWebView();
    });
  },

  onBackPress() {
    wv.close();
  },
  computed: {
    ...mapState({
      activityUrl1: state => state.activityUrl1
    }),
    activityUrl1() {
      return this.$store.state.activityUrl1;
    }

  },
  methods: {
    nva() {
      this.nav = true;

    },
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
/* @media screen and (orientation: landscape) {
  body {
    transform: rotate(0deg) !important;
    width: auto !important;
    height: auto !important;
  }


} */

.navClass {
  top: 110rpx !important;
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

.btnAll {
  border-radius: 6px;
  background: #D9D9D9;
  position: fixed;
  top: 35rpx;
  right: 40rpx;
  width: 120rpx;
  height: 22px;
  z-index: 101;
  color: #003B3D;
  text-align: center;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 30rpx;
  /* 125% */
  letter-spacing: 2.8rpx;
}

.showNav {
  background: url("../../static/index/return_01.png") no-repeat;
  background-size: 100% 100%;
  width: 65px;
  height: 35px;
  position: fixed;
  top: 0;
  left: 42%;
  z-index: 201;
}

.showNav2 {
  color: #ff6b02;
  padding: 10rpx;
  position: fixed;
  top: 9px;
  left: 4%;
  z-index: 500;
  font-weight: bold;
  transform: rotate(90deg);
}

.addclass1 {
  display: none;
}
</style>
