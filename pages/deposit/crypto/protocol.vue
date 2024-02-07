<template>
  <view class="crypto set-bg">
    <zhnavbar v-if="show==true" :title="navtitle" :lefticon="true"></zhnavbar>
    <view class="cards">
      <view class="protocol_intro f-c">协议介绍</view>
      <view class="ERC20_01"
        >ERC20：基于以太坊网络协议
      </view>
      <view class="text_details_01">
        以太坊发行自己的原生代币及其他代币。但成千上万种代
        币的规则都不一样，这对后期市场发展非常不利。所以代
        币发行者做了一个智能合约标准，也就是ERC20。
      </view>
      <view class="TRC20_01"> TRC20:基于波场网络协议 </view>
      <view class="text_details_01">
        TRC20的提币手续费为0，这意味着用户可以享受免手续
        费的交易所提币服务。同时，波场网络的TPS能够达到上
        千级别，可以实现交易秒级确认。
      </view>
    </view>

    <view class="cards2" style="margin-top: 30px">
      <view class="protocol_intro f-c">协议的区别</view>
      <view class="top_headings f-a">
        <view class="headings">区别点</view>
        <view class="headings">ERC20协议</view>
        <view class="headings">TRC20协议</view>
      </view>
      <view class="heading_details f-a">
        <view class="details">地址样式</view>
        <view class="details">ERC20-USDT地址以
          0x开头</view>
        <view class="details">TRC20-USDT地
          址以T开头</view>
      </view>
      <view class="heading_details f-a">
        <view class="details">使用网络 </view>
        <view class="details">以太坊网络 </view>
        <view class="details">波场网络</view>
      </view>
      <view class="heading_details f-a">
        <view class="details"> 网络状态</view>
        <view class="details"> 经常拥堵</view>
        <view class="details">基本不堵 </view>
      </view>
      <view class="heading_details f-a">
        <view class="details">转账速度 </view>
        <view class="details">普通(几分钟到数十分钟) </view>
        <view class="details">极快(几秒到几
          分钟) </view>
      </view>
      <view class="heading_details f-a">
        <view class="details"> 手续费用</view>
        <view class="details"> 普通</view>
        <view class="details"> 无</view>
      </view>
      <view class="heading_details f-a">
        <view class="details"> 安全系数</view>
        <view class="details">高 </view>
        <view class="details">普通 </view>
      </view>
    </view>
    <view class="cards3" style="margin-top: 30px">
      <view class="protocol_intro f-c">选哪种协议更好？</view>
      <view class="grids" style="margin-top: 25px">
        <view class="photo f-c"> ERC20 USDT </view>
        <view class="texts">
          <view class="text_01">中等额度推荐</view>
          <view class="text_02">手续费和速度都介于中间值。</view>
        </view>
      </view>
      <view class="grids" style="margin-top: 15px">
        <view class="photo_02 f-c">ERC20 USDT</view>
        <view class="texts">
          <view class="text_01">小额交易推荐</view>
          <view class="text_02">零手续费，秒级到账。</view>
        </view>
      </view>
    </view>
    <view class="red_text">
      *两种协议对应的USDT地址不互通，进行转账、充值等操
      作时，应仔细核对正确地址！
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navtitle: "协议的区别",
      show:true,
    };
  },
  methods: {
    hidenabvar(e){
      if(e == '1'){
        this.show = false;
      }
    },},
};
</script>

<style lang="scss">
.crypto {
  width: 100%;
  position: relative;
  align-items: center;
  .cards {
    width: 674rpx;
    margin: 0 auto;
    padding: 30rpx 20rpx 56rpx 84rpx;
    .protocol_intro {
      width: 360rpx;
      height: 64rpx;
      border-radius: 100rpx;
      background: #fff;
      color: 003B3D;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx; /* 142.857% */
      letter-spacing: -0.10rpx;
      margin: 0 0 0 82rpx;
    }
    .ERC20_01 {
      color: #008D91;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30rpx; /* 125% */
      letter-spacing: -0.10rpx;
      margin-top: 32rpx;
      margin-bottom: 16rpx;
      text-align: center;
    }
    .TRC20_01 {
      color: #008D91;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30rpx; /* 125% */
      letter-spacing: -0.10rpx;
      margin-top: 32rpx;
      margin-bottom: 16rpx;
      text-align: center;
    }
    .text_details_01 {
      color: #008D91;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx; /* 125% */
      letter-spacing: -0.5px;
      margin-top: 10rpx;
    }
  }
  .cards2 {
    width: 674rpx;
    margin: 0 auto;
    padding: 30rpx 32rpx 56rpx 32rpx;
    .protocol_intro {
      width: 360rpx;
      height: 64rpx;
      border-radius: 100rpx;
      background: #fff;
      color: 003B3D;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx; /* 142.857% */
      letter-spacing: -0.10rpx;
      margin: 0 auto;
    }
    .top_headings {
      padding: 34rpx 0 24rpx 0;
      .headings {
        width: 248rpx;
        color: #008D91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 30rpx; /* 125% */
        letter-spacing: -0.10rpx;
      }
    }
    .heading_details {
      padding: 30rpx 0 0 0;

      .details {
        width: 248rpx;
        color: #008D91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx; /* 125% */
        letter-spacing: -0.10rpx;
        padding: 0 32rpx 0 32rpx;
      }
    }
  }

  .cards3 {
    width: 674rpx;
    margin: 0 auto;
    padding: 15px 16px 28px 24px;
    .protocol_intro {
      width: 394rpx;
      height: 64rpx;
      border-radius: 100rpx;
      background: #fff;
      color: 003B3D;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx; /* 142.857% */
      letter-spacing: -0.10rpx;
      margin: 0 auto;
    }
    .grids {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .photo {
        width: 128rpx;
        height: 128rpx;
        color: #008D91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: bold;
        line-height: 30rpx; /* 125% */
        letter-spacing: -0.10rpx;
      }
      .photo_02 {
        width: 128rpx;
        height: 128rpx;
        color: #008D91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: bold;
        line-height: 30rpx; /* 125% */
        letter-spacing: -0.10rpx;
      }
      .texts {
        margin-left: 26rpx;
        .text_01 {
          color: #008D91;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 30rpx; /* 125% */
          letter-spacing: -0.10rpx;
        }
        .text_02 {
          color: #008D91;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx; /* 125% */
          letter-spacing: -0.10rpx;
        }
      }
    }
  }
  .red_text {
    padding: 40rpx 106rpx 42rpx 106rpx;
    color: #be1c05;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 30rpx; /* 125% */
    letter-spacing: -0.10rpx;
    text-align: left;
  }
}
</style>
