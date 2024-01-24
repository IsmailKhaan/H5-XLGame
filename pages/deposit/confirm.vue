<template>
  <view class="confirm set-bg">
    <hx-navbar leftText="确认存款资讯" :background-color="[245, 249, 254]" :fixed="true" color="#2d2d2d">
    </hx-navbar>
    <view class="main">
      <view class="container">
        <view class="flex-row">
          <text class="tit">支付方式</text>
          <text style="color: #ffffff">{{ item.bankNme }}</text>
        </view>
        <view class="flex-row">
          <text class="tit">存款金额</text>
          <text class="amount">￥{{ item.banPrice }}</text>
        </view>
        <view class="flex-row" v-if="attr">
          <text class="tit">充值暗号</text>
          <text class="amount" style="color: #007aff">{{ payInfo }}</text>
        </view>
      </view>
      <view class="container1">
        <view class="info" v-if="attr">
          温馨提示：请记住您的充值暗号<text style="color: #d94040">{{
            payInfo
          }}</text>，客服将会主动给您发送暗号，为了您的资金安全，请您确认无误后再进行存款。切记不要主动给客服发送您的充值暗号
        </view>
        <view class="info" v-if="notice">
          温馨提示：公司银行卡不定期更换，每次充值请根据提交订单生成的银行卡转账，切勿直接转入之前转入的银行卡，否则无法到账
        </view>
        <view class="btn" @click="webClick(item.payUrl)" v-if="!notice">
          确认存款
        </view>
        <view class="btn s-" @tap="okBtn" v-if="notice"> 确认存款 </view>
      </view>
    </view>
    <uni-popup ref="showtip" type="center" :mask-click="true">
      <view class="openAlert">
        <text class="title">温馨提示</text>
        <view class="f-c content" >
          <text>确定取消该笔订单？</text>
        </view>
        <view class="f-c">
          <text class="btn-cancel" @tap="hide()">关闭</text>
          <text class="btn-del" @tap="del()">取消订单</text>
        </view>
      </view>
    </uni-popup>

    <tips v-if="info" :tipsMsg="infoMsg" style="top: 300px"></tips>

  </view>
</template>

<script>
import tips from "@/components/tips/tips.vue";
import { mapState, mapMutations, mapAction } from "vuex";
import state from "@/store/state";
export default {
  data() {
    return {
      payOrder: "",
      payTypeName: "",
      rechargeAmount: "",
      item: "",
      info: false,
      infoMsg: "",
      payInfo: "",
      infoType: "",
      attr: false,
      notice: false,
    };
  },
  components: {
    tips,
  },
  computed: {
    ...mapState({
      json: (state) => state.json,
    }),
    json() {
      return this.$store.state.json;
    },
  },
  onLoad(options) {
    this.item = JSON.parse(decodeURIComponent(options.item));
    console.log(this.item,'item数据')
  },
  methods: {
    okBtn() {
      uni.redirectTo({
        url:
          "/pages/deposit/bankTransfer?item=" +
          encodeURIComponent(JSON.stringify(this.item)),
      });
    },
    webClick(url) {
      window.location.href= url;
    },
    //弹窗
    cancel() {
      this.$refs.showtip.open();
    },
    hide() {
      this.$refs.showtip.close();
    },
    del(rechargeId) {
      let datas = {
        payId: this.payOrder,
      };
      let url = this.$globalApi.cancelPay;
      
      this.$res.postRequest(url, datas)
        .then(
          (res) => {
            this.$refs["showtip"].close();
            this.info = true;
            this.infoMsg = res.data.msg;
            setTimeout(() => {
              this.info = false;
              this.infoMsg = "";
              if (res.data.code == 0) uni.navigateBack();
            }, 1800);
          },
          (err) => {
            if (err == "999") {
              uni.navigateTo({
                url: "../error/error",
              });
            }
            console.log(err);
          }
        )
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm {
  .main {
    width: 682rpx;
    margin: 0 auto;
    margin-top: 30rpx;

    .container {
      background: #f86;
      border-radius: 20rpx 20rpx 0 0;
      padding: 20rpx 0;
    }

    .container1 {
      background: #ffffff;
      border-radius: 20rpx;
      padding: 50rpx 0 40rpx;
      margin-top: -20rpx;
      min-height: 560rpx;
    }

    .flex-row {
      padding: 20rpx 40rpx;
      width: 100%;
      box-sizing: border-box;
      font-size: 32rpx;
      justify-content: space-between;

      .tit {
        color: #ffffff;
        font-size: 32rpx;
        font-weight: 600;
      }

      .amount {
        color: #ffffff;
        font-size: 34rpx;
      }
    }

    .info {
      width: 100%;
      padding: 0 40rpx;
      box-sizing: border-box;
      margin-top: 10rpx;
    }

    .btn {
      color: #ffffff;
      text-align: center;
      margin: 40rpx auto;
      border-radius: 60rpx;
      line-height: 82rpx;
      font-size: 32rpx;
      width: 326rpx;
      height: 82rpx;
      background: linear-gradient(to bottom, #f5a377, #f76e3d);
      box-shadow: 0px 4px 5px 0px #ff8965b3;
      border-radius: 40px;
      font-weight: 600;
    }

    .cancel {
      text-align: center;
      margin: 40rpx auto;
      border-radius: 60rpx;
      line-height: 80rpx;
      font-size: 32rpx;
      width: 326rpx;
      height: 82rpx;
      color: #f86;
      border: 2px solid #f86;
      border-radius: 40px;
      font-weight: 600;
    }
  }

  .uni-tip {
    width: 682rpx;
    padding-bottom: 20rpx;
    box-sizing: border-box;

    .tit {
      width: 100%;
      text-align: center;
      font-size: 40rpx;
      padding: 20rpx 0;
      font-weight: 600;
    }

    .btn-box {
      display: flex;
      align-items: center;
      justify-content: space-around;

    }
  }
}</style>
