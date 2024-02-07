<template>
  <view class="usdt">
    <loading :isshow="isshow"></loading>
    <view id="navbar">
      <view class="fixed">
        <view class="image" @click="goback">
          <image src="../../static/zhnavbar/leftjt.png" mode="widthFix"></image>
        </view>
        <view class="title">{{
          $t("virtual_currency_recharge.virtual_currency_recharge")
        }}</view>
      </view>
    </view>

    <view class="container">
      <view class="flex-row">
        <text class="tit">{{
          $t("virtual_currency_recharge.deposit_amount")
        }}</text>
        <text class="amount">￥{{ item.rechargeAmount }}</text>
      </view>

      <view class="flex-row">
        <text class="tit">{{
          $t("virtual_currency_recharge.need_to_import")
        }}</text>
        <text class="s" v-if="item.vcProtocolType == 3"
          >{{ (item.rechargeAmount / item.exchangeRate).toFixed(2) }} EBPay
        </text>
        <text class="s"
          >{{ (item.rechargeAmount / item.exchangeRate).toFixed(2) }} USDT
        </text>
      </view>

      <view class="flex-row">
        <text class="tit">{{
          $t("virtual_currency_recharge.current_exchange_rate")
        }}</text>
        <text class="amount" v-if="item.vcProtocolType == 3"
          >1 EBPay={{ item.exchangeRate }}CNY</text
        >
        <text class="amount" v-else>1USDT={{ item.exchangeRate }}CNY</text>
      </view>
    </view>

    <view class="tit_02">
      {{ $t("virtual_currency_recharge.wallet_protocol") }}{{ item.xy }}
    </view>
    <view class="flex-col box">
      <view class="QR-code">
        <tki-qrcode
          ref="qrcode"
          :val="item.walletNo"
          :size="size"
          :unit="unit"
          :onval="onval"
          :loadMake="loadMake"
          :showLoading="false"
          @result="qrR"
        />
      </view>
    </view>

    <view class="tit_03" v-html="$t('virtual_currency_recharge.qr_Code_Des')">
    </view>
    <view class="msg">{{
      $t("virtual_currency_recharge.qr_Code_Detail")
    }}</view>
    <view class="tit_04">
      {{ $t("virtual_currency_recharge.desposit_address_lbl") }}
    </view>
    <view class="box_02">
      <text class="url">{{ item.walletNo }}</text>
      <view @tap="copyFx(item.walletNo)" class="copy">
        {{ $t("contact_us_view.copy") }}
      </view>
    </view>

    <view class="box_03">
      <text> {{ $t("virtual_currency_recharge.order_remark") }} </text>
      <text class="note">{{ item.payOrder }}</text>
      <view @tap="copyFx(item.payOrder)" class="copy">
        {{ $t("contact_us_view.copy") }}
      </view>
    </view>

    <view class="batdgs f-c" @click="wanc">
      {{ $t("virtual_currency_recharge.finish_lbl") }}
    </view>
    <view class="info" style="padding-top: 19px">
      <text class="num">1.</text>
      <view class="textt">
        {{ $t("virtual_currency_recharge.policy_one") }}
      </view>
    </view>
    <view class="info">
      <text class="num">2.</text>
      <view class="textt">{{
        $t("virtual_currency_recharge.policy_two")
      }}</view>
    </view>
    <view class="info">
      <text class="num">3.</text>
      <view class="textt">{{
        $t("virtual_currency_recharge.policy_three")
      }}</view>
    </view>

    <tips v-if="info" :tipsMsg="infoMsg" style="top: 300px"></tips>
    <loading :isshow="isshow"></loading>
  </view>
</template>

<script>
import tips from "@/components/tips/tips.vue";
import TkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";

import { mapState, mapMutations, mapAction } from "vuex";
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      isshow: 0,
      payOrder: "",
      payTypeName: "",
      rechargeAmount: "",
      note: "",
      item: "",
      info: false,
      infoMsg: "",
      payInfo: "",
      infoType: "",
      attr: false,
      notice: false,
      size: 100, // 二维码大小
      unit: "px", // 单位
      onval: true, // val值变化时自动重新生成二维码
      loadMake: true, // 组件加载完成后自动生成二维码
      src: "", // 二维码生成后的图片地址或base6
      walletLink: "",
      qrCode: "",
      agreement: "",
    };
  },
  components: {
    tips,
    "tki-qrcode": TkiQrcode,
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
    // console.log(this.item, "ldasjdlaskdjlaskdjslakdj");
  },
  methods: {
    qrR(imgSrc) {
      this.src = imgSrc;
    },
    wanc() {
      uni.navigateTo({
        url: "/pages/home/home",
      });
    },
    copyFx(val) {
      console.log(val);
      let text = val.toString();
      this.$copy(text);
    },
    goback() {
      if (this.url) {
        uni.reLaunch({
          url: this.url,
        });
        return;
      } else {
        history.back();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
uni-page-body {
  background-color: #fff !important;
}
.usdt {
  background: #fff;
  height: 100%;
  #navbar {
    width: 100%;
    height: 110rpx;
    position: relative;
    z-index: 1001;

    .fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 120rpx;
      width: 100%;
      background-size: 100% 100%;
      background: #fff;

      .image {
        width: 22rpx;
        height: 38rpx;
        position: absolute;
        left: 54rpx;
        top: 26rpx;
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
        color: #003b3d;
      }
    }
  }
  .container {
    padding: 6rpx 46rpx 42rpx 46rpx;
    width: 654rpx;
    height: 246rpx;
    border-radius: 32rpx;
    background: #008d91;
    box-shadow: 2px 2px 11px 0px rgba(0, 0, 0, 0.25);
    margin: 0 auto;
    margin-top: 11px;
  }

  .batdgs {
    width: 153px;
    height: 37px;
    border-radius: 11px;
    background: #003B3D;
    color: #fff;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: -0.5px;
    margin: 0 auto;
    margin-top: 37px;
  }

  .tit_02 {
    padding: 18px 0 0 48px;
    color: #003b3d;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: -0.5px;
  }

  .tit_03 {
    padding-top: 18px;
    color: #003b3d;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: -0.5px;
    text-align: center;
    text {
      color: #008d91;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px;
      letter-spacing: -0.5px;
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  .msg {
    padding: 8px 36px 0 36px;
    color: #647182;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0 auto;
  }
  .tit_04 {
    color: #003b3d;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px; /* 125% */
    letter-spacing: -0.5px;
    padding-top: 18px;
  }

  .box_02 {
    padding: 11px 36.35px 0 30px;
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    .url {
      width: 274px;
      height: 37px;
      border-radius: 10px;
      border: 6rpx solid #008d91;
      color: #003b3d;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      flex: 1;
      text-align: left;
      padding: 19rpx;
      padding-left: 36rpx;
      box-sizing: border-box;
      overflow: hidden;
      word-break: break-all;
    }
    .copy {
      margin-left: 14px;
      width: 20.149px;
      height: 24px;
      white-space: nowrap;
      border-bottom: 4rpx solid #00a9f2;
      width: fit-content;
    }
  }
  .box_03 {
    padding: 25px 36.35px 0 48px;
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    text {
      color: #003b3d;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px; /* 125% */
      letter-spacing: -0.5px;
    }
    .note {
      color: #008d91;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px; /* 125% */
      letter-spacing: -0.5px;
    }
  }
  .copy {
    width: 20.149px;
    height: 24px;
    white-space: nowrap;
    border-bottom: 4rpx solid #00a9f2;
    width: fit-content;
  }

  .box {
    margin-top: 36rpx;
  }

  .flex-row {
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    margin-top: 15px;

    .tit {
      color: #fff;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 15px;
      letter-spacing: -0.5px;
    }
    .s {
      color: #fff;
      text-align: right;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px;
      letter-spacing: -0.5px;
    }

    .amount {
      color: #fff;
      text-align: right;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px;
      /* 125% */
      letter-spacing: -0.5px;
    }
  }

  .info {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 6px 0 0 32px;

    // color: #FFFFFF;
    .num {
      width: 18px;
      height: 18px;
      // background: #008d91;
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: -0.5px;
      text-align: center;
    }
    .textt {
      color: #003b3d;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
      letter-spacing: -0.5px;
      width: 317px;
      margin-left: 16px;
    }
  }

  .btn {
    color: #ffffff;
    text-align: center;
    // margin: 20rpx auto;
    // padding: 20rpx 0;
    border-radius: 60rpx;
    line-height: 82rpx;
    font-size: 32rpx;
    width: 200rpx;
    height: 82rpx;
    // background:linear-gradient(0deg,rgba(119,122,254,1),rgba(157,159,255,1)) !important;
    // box-shadow:0px 8px 13px 0px rgba(98,101,227,0.7);
    background: linear-gradient(to bottom, #f5a377, #f76e3d);
    box-shadow: 0px 8px 13px 0px #ff9235;
    border-radius: 40px;
    font-weight: 600;
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

      .btn-y {
        display: flex;
        width: 204rpx;
        height: 79rpx;
        background: linear-gradient(
          0deg,
          rgba(119, 122, 254, 1),
          rgba(157, 159, 255, 1)
        );
        box-shadow: 0px 8rpx 13rpx 0px rgba(98, 101, 227, 0.7);
        background: linear-gradient(to bottom, #f5a377, #f76e3d);
        box-shadow: 0px 8px 13px 0px #ff9235;
        border-radius: 40rpx;
        color: #ffffff;
        align-items: center;
        justify-content: center;
        font-size: 32rpx;
        font-weight: 600;
      }

      .btn-n {
        display: flex;
        width: 204rpx;
        height: 79rpx;
        border: 1px solid #ff9235;
        color: #777afe;
        border-radius: 40rpx;
        align-items: center;
        justify-content: center;
        font-size: 32rpx;
        font-weight: 600;
        color: #f86;
        border: 2px solid #f86;
      }
    }
  }
}
</style>
