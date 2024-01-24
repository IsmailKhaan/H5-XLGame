<template>
  <view class="bankTransfer set-bg">
    <hx-navbar
      leftText="银行卡转账"
      :background-color="[245, 249, 254]"
      :fixed="true"
      color="#2d2d2d"
    >
    </hx-navbar>
    <view v-show="$store.state.showDiv2">
    <view  class="main flex-col">
      <text class="tit">重要提醒</text>
      <text>1.请填写正确的转账金额和附言（备注），否则无法存款。</text>
      <text>2.下次存款时，请获取新的账号，存入旧账号将无法到账。</text>
      <text style="color: #d94040">3.转账时，优先复制收款卡号粘贴。</text>
      <text>4.若存款有疑问，请联系客服及时处理。</text>
      <text>5.请勿使用支付宝、微信转账至公司账户。</text>
    </view>
    <view class="card" style="border-radius: 0">
      <view class="amount flex-row">
        <text class="num">￥{{ item.rechargeAmount }}</text>
        <view class="copy" @tap="copy(item.rechargeAmount)"> 复制 </view>
      </view>
      <view class="info"> （转账金额务必与订单一致） </view>
    </view>
    <view class="card">
      <view class="flex-row">
        <view class="" style="display: flex; align-items: center">
          <text class="tit">转账银行：</text>
          <text>{{ item.bankName ? item.bankName : "工商" }}</text>
        </view>
        <view @tap="copy(item.bankName)" class="copy"> 复制 </view>
      </view>
      <view class="flex-row">
        <view class="" style="display: flex; align-items: center">
          <text class="tit">银行账号：</text>
          <text>{{ item.bankCardNo ? item.bankCardNo : "无" }}</text>
        </view>
        <view @tap="copy(item.bankCardNo)" class="copy"> 复制 </view>
      </view>
      <view class="flex-row">
        <view class="" style="display: flex; align-items: center">
          <text class="tit">转账姓名：</text>
          <text>{{ item.bankHolder ? item.bankHolder : "无" }}</text>
        </view>
        <view @tap="copy(item.bankHolder)" class="copy"> 复制 </view>
      </view>
      <view class="flex-row">
        <view class="" style="display: flex; align-items: center">
          <text class="tit">支行地址：</text>
          <text>{{ item.bankBranch ? item.bankBranch : "" }}</text>
        </view>
        <view @tap="copy(item.bankBranch)" class="copy"> 复制 </view>
      </view>
      <view class="flex-row">
        <view class="" style="display: flex; align-items: center">
          <text class="tit">附言/备注：</text>
          <text style="color: #d94040">{{
            payInfo.extraInfo ? payInfo.extraInfo : ""
          }}</text>
        </view>
        <view @tap="copy(payInfo.extraInfo)" class="copy"> 复制 </view>
      </view>
      <view class="info" style="font-size: 24rpx; text-align: left">
        （请务必填写正确的附言/备注）
      </view>
    </view>
    <view class="flex-row"
      style="
      width: 100%;
      color: rgb(153, 153, 153);
      margin-top: 20px;
      display: inherit;
      padding: 0 20px 0 20px;
      text-align: center;
      "
    >
      温馨提示：收款账号不定期更换，请在, 请在
      <span style="color: #f86">
      {{ $store.state.time }}
      </span>分钟内转账 ,内完成转账
    </view>
  </view>
  <view v-if="$store.state.showReminder" class="notify">
    <p>{{ $store.state.reminderMessage }}</p>
  </view>
    <view class="btn flex-row">
      <text @tap="cancel" class="cancel">取消订单</text>
    </view>

    <uni-popup ref="showtip" type="center" :mask-click="true">
      <view class="uni-tip">
        <text class="tit">确认取消</text>
        <view class="uni-tip-content flex-col"> 确定取消该笔订单？ </view>
        <view class="" style="display: flex;
        justify-content: space-evenly;
        margin-left: 31px;">
          <text class="btn-n" @tap="hide">关闭</text>
          <navigator url="/pages/deposit/deposit" class="btn-y" @tap="del">取消订单</navigator>
        </view>
      </view>
    </uni-popup>

    <tips v-if="info" :tipsMsg="infoMsg" style="top: 300px"></tips>
  </view>
</template>

<script>
import state from "@/store/state";
import CommonMethods from "@/common/js/methods.js";
import tips from "@/components/tips/tips.vue";
import { mapState, mapMutations, mapAction } from "vuex";
export default {
  data() {
    return {
      item: "",
      rechargeAmount: "",
      rechargeStatus: "",
      payType: "",
      createTime: "",
      payOrder: "",
      name: "",
      attr: false,
      info: false,
      infoMsg: "",
      minute: "14",
      second: "59",
      payTypeName: "",
      card: "",
      payInfo: "",
    };
  },
  components: {
    tips,
    loading,
  },
  computed: {
    ...mapState({
      json: (state) => state.json,
    }),
    json() {
      return this.$store.state.json;
    },
  },
  async onLoad(options) {
    this.item = JSON.parse(decodeURIComponent(options.item));
    let createTime = new Date().getTime();
    this.createTime = this.item.createTime ? this.item.createTime : createTime;
    this.countDown(this.createTime + 15 * 60 * 1000 - createTime);
  },
  onShow() {
  },
  onBackPress() {
    uni.switchTab({
      url: "/pages/index/index",
    });
  },
  methods: {
    countDown(createTime) {
    },
    getDetail(rechargeId) {
      let datas = {
        payOrder: this.payOrder,
      };
      let url = this.$globalApi.getRechargeDetail;
      this.$store.commit("SET_LOADING", { show: true });
      this.$res.postRequest(url, datas)
        .then(
          (res) => {
            this.$store.commit("SET_LOADING", { show: false });
            console.log(res);
            let obj = res.data.rechargeDetail,
              arr = [];
            arr.push(obj);
            CommonMethods.changeData(arr);
            console.log(obj);
            this.rechargeAmount = arr[0].rechargeAmount;
            this.rechargeStatus = arr[0].rechargeStatus;
            this.payType = arr[0].payType;
            this.createTime = arr[0].createTime;
            this.payOrder = arr[0].payOrder;
            if (arr[0].rechargeStatus == "待处理") {
              this.attr = true;
            } else {
              this.item.name = "存款";
              uni.navigateTo({
                url: '/pages/record/trade',
              });
            }
          },
          (err) => {
            if (err == "999") {
              this.$store.commit("SET_LOADING", { show: false });
              uni.navigateTo({
                url: "../error/error",
              });
            }
            console.log(err);
          }
        )
        .catch((err) => {
          this.$store.commit("SET_LOADING", { show: false });
          console.log(err);
        });
    },
    cancel() {
      this.$refs.showtip.open();
      
    },
    hide() {
      this.$refs.showtip.close();
    },
    del(rechargeId) {
      clearInterval(this.$store.state.timerInterval);
      this.$store.state.showReminder = false;
      this.$store.state.showDiv2 = true;
      let datas = {
        payId: this.payOrder,
      };
      let url = this.$globalApi.cancelPay;
      this.$store.commit("SET_LOADING", { show: true });
      this.$res.postRequest(url, datas)
        .then(
          (res) => {
            this.$store.commit("SET_LOADING", { show: false });
            this.$refs["showtip"].close();
            if (res.data.code == 0) this.getDetail();
            this.info = true;
            this.infoMsg = res.data.msg;
            setTimeout(() => {
              this.info = false;
              this.infoMsg = "";
            }, 1800);
          },
          (err) => {
            if (err == "999") {
              this.$store.commit("SET_LOADING", { show: false });
              uni.navigateTo({
                url: "../error/error",
              });
            }
            console.log(err);
          }
        )
        .catch((err) => {
          this.$store.commit("SET_LOADING", { show: false });
          console.log(err);
        });
    },
    copy(item) {
      this.$copy(item.toString())
    },
    toService() {
      uni.navigateTo({
        url: "/pages/service/serviceDtl?src=" + this.json.service,
        fail: (err) => {
          console.log(err);
        },
      });
    },
    toDetail() {
      this.item.name = "存款";
      uni.navigateTo({
        url: '/pages/record/trade',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bankTransfer {
  .card {
    width: 682rpx;
    margin: 0 auto;
    border-radius: 0 0 20rpx 20rpx;
    background-color: #ffffff;
    .amount {
      width: 100%;
      text-align: center;
      padding: 30rpx 0;
      padding-bottom: 0 !important;
      justify-content: center;
      .num {
        font-size: 42rpx;
        font-weight: 500;
      }
    }
    .flex-row {
      width: 100%;
      padding: 10rpx 30rpx;
      box-sizing: border-box;
      .tit {
        color: #999;
        width: 152rpx;
      }
    }
    .copy {
      width: 80rpx;
      text-align: center;
      margin-left: 20rpx;
      border: 1px solid #f86;
      color: #f86;
      font-size: 24rpx;
      border-radius: 5rpx;
      height: 30rpx;
      line-height: 30rpx;
    }
    .info {
      text-align: center;
      color: #d94040;
      padding-bottom: 20rpx;
    }
  }
  .btn {
    width: 80%;
    margin: 0 auto;
    margin-top: 30rpx;
    color: #d2ac89;
  }
  .main {
    width: 682rpx;
    border-radius: 20rpx 20rpx 0 0;
    margin: 30rpx auto;
    margin-bottom: 0rpx;
    background-color: #ffffff;
    border-top: 1px solid #eeeeee;
    padding: 0 30rpx;
    box-sizing: border-box;
    padding-bottom: 30rpx;
    align-items: flex-start;
    font-size: 24rpx;
    color: #999;
    .tit {
      font-size: 28rpx;
      color: #333;
      margin: 20rpx 0;
    }

    .btn {
      width: 500rpx;
      color: #ffffff;
      text-align: center;
      margin: 40rpx auto;
      background: linear-gradient(90deg, #e5c8a8, #d2ac89) !important;
      // padding: 20rpx 0;
      border-radius: 60rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 32rpx;
    }
  }
  .cancel {
    margin: 0 auto;
    line-height: 82rpx;
    text-align: center;
    font-weight: 600;
    color: #fff;
    width: 326rpx;
    height: 82rpx;
    background: linear-gradient(to bottom, #f5a377, #f76e3d);
    box-shadow: 0px 3px 7px 0px #ff804fb3;
    border-radius: 40rpx;
  }
  .service {
    margin-top: 40rpx;
    width: 100%;
    text-align: center;
    color: #999999;
  }
}
.notify {
  width: 341px;
  height: 500px;
  border-radius: 10px 10px;
  margin: 15px auto;
  margin-bottom: 0px;
  background-color: #ffffff;
  border-top: 1px solid #eeeeee;
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: red;
  padding-top: 224px;
  text-align: center;
}
</style>
