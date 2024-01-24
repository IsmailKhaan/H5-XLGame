<template>
<view>
  <loading :isshow="isshow"></loading>
  
  <web-view :webview-styles="webviewStyles" :src="src"></web-view>
  
</view>  
</template>

<script>
import { mapState, mapMutations, mapAction } from "vuex";
import state from '@/store/state';

var wv;
export default {
  data() {
    return {
		isshow:0,
    webviewStyles: {
      progress: {
        color: "#000000",
      },
      
    },
    gameName: "",
    // isScreen: false,
    start: [0, 0],
    moveY: 0,
    moveX: 0,
    statusBarHeight: 0,
    webviewClose: false,
    keyBoardHeight: 0,
    src: "",
    };
  },
  onLoad(option) {
    this.getjson();
    //动态监听键盘高度
    uni.onKeyboardHeightChange((res) => {
      if (this.keyBoardHeight == res.height) return;
      this.keyBoardHeight = res.height;
      this.chageWebView();
    });


    
  },
  computed: {
    ...mapState({
      json: (state) => state.json,
    }),
    json() {
      return this.$store.state.json;
    },
  },
  methods: {
    chageWebView() {
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
          height: height,
        });
      }


    },
    close() {
      uni.switchTab({
        url: "/pages/service/service",
      });
    },
    getjson() {
      //uni.showLoading({title:'请等待显示...'});
	    let that = this;
	    that.isshow = 1;
      let data = '';
      if(state.user != ''){
        data = state.user.username;
      }else{
        data = '游客';
      }
      // console.log(data)
      setTimeout(function(){
        that.isshow = 0;
      },3000)
      let url = state.jsonUrl + state.jsons.thirdPartyInfo;
      that.$res.getRequest(that.$time(url)).then((res) => {
        this.isshow = 0;
        that.src = res.data.datas.customerService.url+'?metadata={"name":"'+data+'"}';
        console.log(that.src,'客服地址')
      });

   

      

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


</style>