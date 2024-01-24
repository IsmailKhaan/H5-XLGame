<template>
  <!-- <view class="upholds" > -->
  <view class="upholds" v-if="json ? json.state : false">
    <!-- <view class="mask" > -->
    <view class="tk-bg" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <view class="tit"> 温馨提示 </view>
      <view class="content">
        <view class="content-tit" v-if="json ? json.tit : false"
          >维护时间：{{ json ? json.start : "0.00" }} -
          {{ json ? json.end : "0:00" }}</view
        >
        {{ json ? json.content : "系统升级维护中" }}
      </view>
      <view class="btn" @tap="json.state = false"> 确定 </view>
    </view>
    <!-- </view> -->
  </view>
</template>

<script>
// import RequestSender from "@/common/js/request.js";
import backgroundImage from "@/static/image/gx-bg1.png";
import { mapState, mapMutations, mapAction } from "vuex";
export default {
  data() {
    return {
      bool: false,
      content: "",
      start: "0:00",
      end: "0:00",
      backgroundImage:
        "https://lt.letian4.com/h5-img/version2/image/gx-bg1.png",
    };
  },
  computed: {
    ...mapState({
      json: (state) => state.json,
    }),
    json() {
      return this.$store.state.json;
    },
  },
  onshow() {
    console.log(this.json);
    // setInterval(()=>{
    // this.getUphold()
    // },5000)
  },
  // async onLoad() {
  // 	await this.getHours()
  // },
  methods: {
    // getHours(){
    // 	let time = new Date().getHours()
    // 	let start = this.json.startTime
    // 	let end = this.json.endTime
    // 	if(time>start && time<end){
    // 		this.bool = true
    // 	}else{
    // 		this.bool = false
    // 	}
    // }
    // getUphold(){
    // 	let url = "https://lt.letian4.com/20200326/state.json"
    // 	// RequestSender.postRequest(url).then(res => {
    // 	// 	console.log(res,res.state);
    // 	// })
    // 	uni.request({
    // 	    url: url,
    // 	    // data: {
    // 	    //        text: 'uni.request'
    // 	    //    },
    // 	    // header: {
    // 	    //     'custom-header': 'hello' //自定义请求头信息
    // 	    // },
    // 	    success: (res) => {
    // 	        console.log(res.data);
    // 	        // this.text = 'request success';
    // 	    }
    // 	});
    // }
  },
};
</script>

<style lang="scss">
.upholds {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  .tk-bg {
    width: 538rpx;
    height: 649rpx;
    background: url("../static/image/gx-bg.png") no-repeat center;
    background-size: cover;
    padding-top: 100rpx;
    box-sizing: border-box;
    .tit {
      font-size: 42rpx;
      color: #f86;
      text-align: left;
      padding-left: 60rpx;
      margin-bottom: 60rpx;
      font-weight: 600;
    }
    .content {
      padding: 0 40rpx;
      font-size: 32rpx;
      height: 280rpx;
      width: 100%;
      box-sizing: border-box;
      color: #343434;
      margin: 20rpx 0;
      overflow-y: auto;
      .content-tit {
        font-size: 32rpx;
      }
    }
    .btn {
      font-size: 32rpx;
      margin: 0 auto;
      text-align: center;
      color: #ffffff;
      width: 332rpx;
      height: 74rpx;
      line-height: 74rpx;
      // background:linear-gradient(0deg,rgba(120,122,254,1),rgba(157,160,255,1));
      // box-shadow:1px 8rpx 13rpx 0px rgba(98,101,227,0.7);
      background: linear-gradient(to bottom, #f5a377, #f76e3d);
      box-shadow: 0px 8rpx 13rpx 0px rgba(79, 138, 255, 0.7);
      border-radius: 37rpx;
    }
  }
}
</style>
