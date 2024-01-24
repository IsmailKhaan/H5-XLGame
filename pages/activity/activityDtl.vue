<template>
  <div >
    <loading :isshow="isshow"></loading>
    <zhnavbar :title="navtitle" :lefticon="true"></zhnavbar>
    <!-- activityUrl -->
    <iframe
      width="100%"
      class="view-body"
      frameborder="0"
      scrolling="no"
      :src="activityUrl"
      id="ifr"
    >
    </iframe>
  </div>
</template>

<script>
import { mapState, mapMutations, mapAction } from "vuex";
import state from "@/store/state";
var wv;

export default {
  data() {
    return {
      isshow: 1,
      testUrl: "http://www3.xunli10.com/page/pages/activity/home",
       navtitle: "Event Page",
      webviewStyles: {
        progress: {
          color: "#000000",
        },
      },
      gameName: "",
      isScreen: false,
      start: [0, 0],
      moveY: 0,
      moveX: 0,
      statusBarHeight: 0,
      webviewClose: false,
      activityTitle: "",
    };
  },
  onLoad() {
    const event_title = sessionStorage.getItem("event_title");
    uni.navigateTo({
      url: event_title,
    });
    this.navtitle = event_title;
   // console.log(event_title,"sasa")
    // console.log(this.$store.state.activityTitle,"test1DTL")

    // uni.showLoading({title:'加载中..'})
    let that = this;
    this.creatWebView();
    // console.log(this.$store.state.activityUrl,"ghsdahsdasdasda");
    //动态监听键盘高度
    uni.onKeyboardHeightChange((res) => {
      console.log("in...");
      if (this.keyBoardHeight == res.height) return;
      this.keyBoardHeight = res.height;
      this.chageWebView();
    });
    this.tokenFx();
    setTimeout(function () {
      that.isshow = 0;
    }, 1000);
  },
  onBackPress() {
    wv.close();
  },
  computed: {
    ...mapState({
      activityUrl: (state) => state.activityUrl,
    }),
    activityUrl() {
      return this.$store.state.activityUrl;
    },
  },
  // mounted() {
  //   const activityTitle = this.$route.query.activityTitle;
  //   this.activityTitle = activityTitle;
  // },
  methods: {
    //web活动页调用方法，获取 token
    tokenFx() {
      window.addEventListener("message", (e) => {
        if(e.data.name){
          console.log(e.data, "接收值------");
          let iframes = document.getElementById("ifr").contentWindow;
          let data = { token: state.user.authToken };
          iframes.postMessage(data, "*"); //传token凭证到活动页
        }
      });
      // uni.hideLoading()
    },
    messageFx(e) {
      console.log(e, "接收.."); //用来接口值
    },
    creatWebView() {
      let systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight;
    },
    chageWebView() {
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
          height: height,
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
        animationDuration: 200,
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
          height: height - 43,
        });
      } else {
        wv.setStyle({
          top: res.statusBarHeight + 20,
          height: height - 19,
        });
      }
      this.isScreen = !this.isScreen;
    },
  },
};
</script>

<style>
.loading-img {
  width: 200rpx;
  padding: 0rpx 25rpx;
  margin: 0 auto;
  margin-top: calc(
    50vh - var(--status-bar-height) - var(--window-bottom) - 44rpx - 100rpx
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
  height: 88rpx;
  display: flex;
  align-items: center;
  /* background:linear-gradient(90deg, #a1c73b, #11a23c) !important; */
  background: #ffffff;
}
.header-main-screen {
  width: 750rpx;
  height: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background:linear-gradient(90deg, #a1c73b, #11a23c) !important; */
  background: #ffffff;
}
.header-main .close {
  width: 180rpx;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 40rpx;
  padding-left: 20rpx;
  color: #474747;
}
.header-main .title {
  width: 370rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  color: #474747;
  font-size: 32rpx;
}
.header-main .action {
  display: flex;
  height: 88rpx;
  line-height: 88rpx;
  width: 200rpx;
  color: #474747;
}
.header-main .action .item {
  width: 80rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  padding: 0rpx 10rpx;
  font-size: 32rpx;
}

.views {
  overflow: hidden;
}
.view-body {
  height: calc(100vh - 100rpx);
  width: 100vw;
}
</style>
