<template>
  <view class="crypto set-bg">
    <zhnavbar :title="$t('deposit.deposit_title')" :lefticon="true"></zhnavbar>
    <view class="outter2">
      <view class="text1">{{ $t("select_channel.select_channel_title") }}</view>
      <view class="text2">{{ $t("select_channel.best_choice") }}</view>
      <view class="text3">
        <view class="text3_1">
          <navigator url="/pages/deposit/crypto/VirtualCurrency">
            <text>{{ $t("select_channel.learn_more") }}</text>
            <image
              src="../../../static/deposit/storke.png"
              mode="widthFix"
            ></image>
          </navigator>
        </view>
      </view>
      <view class="text4">{{ $t("select_channel.stable_price") }}</view>
      <view class="text5">{{ $t("select_channel.initiate_deposit") }}</view>
      <view class="text6">{{ $t("select_channel.buy_transfer") }}</view>
      <view class="text7">{{ $t("select_channel.complete_deposit") }}</view>
      <view class="text8 f-s">
        <view class="text8_1"> {{ $t("select_channel.protocol_to_use") }}</view>
        <view class="text8_2">
          <navigator url="/pages/deposit/crypto/protocol"
            ><text> {{ $t("select_channel.protocol_difference") }}</text>
          </navigator>
          <image
            src="../../../static/deposit/storke.png"
            mode="widthFix"
          ></image>
        </view>
      </view>
      <view
        class="cards"
        v-for="(item, index) in listVal"
        :key="index"
        @click="useWay(index, item)"
      >
        <image
          class="image1"
          :src="
            $store.state.iconUrl +
            $store.state.static.virtualCurrencyIcon[item.payWayTypeName]
          "
          mode="widthFix"
        ></image>
        <view class="text">{{ item.payWayTypeName }}</view>
        <view class="image2 f-c">
          <image
            :class="[index == wayCh ? 'image3' : 'hidden-image']"
            src="../../../static/deposit/dot_active.png"
            mode=""
          ></image>
          <image
            v-if="index != wayCh"
            class="image3"
            src="../../../static/deposit/dot.png"
            mode="widthFix"
          ></image>
        </view>
      </view>
      <view class="text9">{{ $t("select_channel.recharge_amount") }}</view>
      <view
        class="input_class"
        v-if="listVal[wayCh] && listVal[wayCh].minAmount"
      >
        <input
          class="new-money"
          maxlength="17"
          type="number"
          :placeholder="
            $t('deposit.deposit_limit')
              .replace('{mini}', listVal[wayCh].minAmount)
              .replace('{maxi}', listVal[wayCh].maxAmount)
          "
          placeholder-class="inp2-inp2"
          v-model="account"
        />
      </view>
      <view class="selected_amount">
        <view class="selected_amount_row1" v-if="listVal[wayCh]">
          <view
            class="SM"
            v-for="(item, index) in listVal[wayCh].randomAmount"
            :key="index"
            @tap="moneyBtn(index, listVal[wayCh].randomAmount[index])"
            :class="[index == num3 ? 'active' : 'a']"
            >{{ item }}</view
          >
        </view>
      </view>
      <view style="margin: 0 24px">
        <span
          class="text10_sub"
          v-html="
            $t('select_channel.information1')
              .replace('{ChannelName}', ChannelName)
              .replace('{exchangeRate}', exchangeRate)
          "
        >
        </span>
        <span
          class="text10_sub"
          v-html="
            $en($store.state.ens.select_channel.information3)
              .replace('{exchangeRates}', exchangeRates)
              .replace('{ChannelName}', ChannelName)
          "
        ></span>
      </view>
      <view class="text10" v-html="$t('select_channel.information2')"> </view>
    </view>
    <view class="outter1 f-c">
      <view class="next_btn f-c" @tap="userRechargeapplyPay()">{{
        $t("general.next")
      }}</view>
    </view>
    <view class="outter f-c">
      <view class="border_bottom f-c"></view>
    </view>

    <view v-show="userFeedbackHidden2" class="maskLayer2">
      <view class="popup_content2">
        <view class="image_top2"></view>
        <view class="upper_class">
          <view class="ner2">Amount of $5000 has been deposited </view>
          <span class="success">Successfully!</span>
          <span class="ner3"> Enjoy Playing</span>
        </view>
        <view class="f-a qer2">
          <view class="title_1 f-c" @click="trigger(0)">OK</view>
        </view>
      </view>
    </view>
    <view v-show="userFeedbackHidden1" class="maskLayer">
      <view class="popup_content">
        <view class="image_top"></view>
        <view class="upper_classs">
          <span class="ner4">Something went</span
          ><span class="successs">wrong!</span>
          <span class="ner4">Try again or Try</span>
          <view class="ner5">later </view>
        </view>
        <view class="f-a qer">
          <view class="title f-c" @click="trigger(1)">Hmmm!</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import state from "@/store/state";
import moment from "moment";

import { localizationMixin } from "../../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      navtitle: "Deposit",
      userFeedbackHidden2: false,
      userFeedbackHidden1: false,
      listVal: {},
      payWayList: [
        {
          payWayTypes: {
            randomAmount: [],
          },
        },
      ],
      payWay: {},
      AllChannels: [],
      errorAlert: false,
      exchangeRate: 0,
      wayCh: 0, //ERC20==0
      account: "",
      num3: 0,
      ChannelName: "",
    };
  },
  onLoad() {
    this.getQkTd();
  },

  computed: {
    exchangeRates() {
      return (this.account / this.exchangeRate).toFixed(2);
    },
    formattedInformation1() {
      return this.$t("select_channel.information1").replace(
        "{ChannelName}",
        this.ChannelName
      );
    },
  },
  methods: {
    getQkTd() {
      let pay = state.static;
      this.payWay = state.static.payWay;
      let data = { deviceType: 1 };
      let url = this.$globalApi.userRechargegetAllChannel;
      this.$res.postRequest(url, data).then((res) => {
        if (res.data.code == 0) {
          let a = res.data.data.allChannel;
          //console.log(this.AllChannels, "sdkshdksjdh")
          if (a == "") {
            uni.showToast({
              title: "暂无充值通道",
              icon: "none",
            });
            return;
          }
          a.forEach((element) => {
            element.index = element.payWay;
            element.payWayName = pay.payWay[element.payWay].payWayName;
            element.payWayIcon = pay.payWay[element.payWay].payWayIcon;
            element.payWayTypes.forEach((el) => {
              if (pay.payWayType[el.payWayType]) {
                el.payWayTypeName =
                  pay.payWayType[el.payWayType].payWayTypeName;
                el.index = el.payWayType;
              }
            });
          });

          this.payWayList = a;
          // console.log(a, "sdfjklsdfjkasdfjklsdkbflsdkjflsadhfldkjfgadjflsad");
          this.listVal = this.payWayList[0].payWayTypes;
          // console.log(this.listVal, "vallist");
          this.way2Index = this.payWayList[0].index;
          this.useWay(0, this.listVal[0]);
          // this.waychIndex = this.payWayList[0].payWayTypes[0].payWayType;
          // this.lv = this.listVal[0].currencyType;
          // this.getHl(this.listVal[0].currencyType);
        } else {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
            duration: 4000,
          });
          this.errorAlert = true;
        }
      });
    },
    trigger(e) {
      if (e == 1) {
        this.userFeedbackHidden2 = true;

        this.userFeedbackHidden1 = false;
      }
      if (e == 0) {
        this.userFeedbackHidden1 = true;
        this.userFeedbackHidden2 = false;
      }
    },
    useWay(index, item) {
      this.texts = item.text;
      // console.log(item.text,"do9sos")
      this.wayCh = index; //选择协议类型
      this.waychIndex = item.index;

      this.num3 = 0; //充值金额重置
      this.account = this.ebpayText = item.randomAmount
        ? item.randomAmount[0]
        : ""; // EBPay赋值

      let Ctype = uni.getStorageSync("status").currencyType;
      // console.log(index, item,"SOSOS");
      this.exchangeRate = uni.getStorageSync("exchange");
      this.ChannelName = Ctype[item.currencyType];
      if (item.payWayTypeName == "EBPay") {
        this.ChannelName = Ctype[item.currencyType];
        this.lvText = false;
        this.exchangeRate = 1; //汇率
      } else {
        this.lvText = true;
      }
      this.getHl(item.currencyType);
      // }
    },
    getHl(e) {
      let _this = this;
      let data = {
        currencyType: e,
      };

      // _this.isshow = 1;
      let url = _this.$globalApi.userRechargegetCurrencyExchangeRate;
      this.$res.postRequest(url, data).then((res) => {
        if (res.data.code == 9999) {
          uni.navigateTo({
            url: "/pages/login/login",
          });
        }
        // this.isshow = 0;
        console.log(res.data, "汇率");
        this.exchangeRate = res.data.data.exchangeRate;
        uni.setStorageSync("exchange", res.data.data.exchangeRate);
      });
    },
    moneyBtn(index, item, bool) {
      this.num3 = index;
      this.account = this.ebpayText = item;
     // console.log(this.account);
      if (bool) {
        this.account = "";
      }
    },

    userRechargeapplyPay() {
      this.ifdata();
      //console.log(this.account);

      if (this.account < this.listVal[this.wayCh].minAmount) {
        
        const message = this.$t("alerts.money_min"); 
        const minAmount = this.listVal[this.wayCh].minAmount;
        const concatenatedMessage = message + " " + minAmount;

        uni.showToast({
          title: concatenatedMessage,
          icon: "none",
        });
        return;
      }

      if (this.account > this.listVal[this.wayCh].maxAmount) {
        const message = this.$t("alerts.money_max"); 
        const maxAmount = this.listVal[this.wayCh].maxAmount;
        const concatenatedMessage = message + " " + maxAmount;

      
        uni.showToast({
          title: concatenatedMessage,
          icon: "none",
        });
        return;
      }

      let _this = this;
      let data = {
        deviceType: 1,
        payWay: _this.way2Index,
        payWayType: _this.waychIndex, //payWayType: 101 类型
        rechargeAmount: _this.account,
        exchangeRate: _this.exchangeRate,
      };
      // api-text:
      // payInfoType = 0-URL(直接跳转) ：open-link，
      // 1-银行卡信息（bank-data）， 2-虚拟币充值信息 3-交易暗号（预留） 4-不跳转

      let url = _this.$globalApi.userRechargeapplyPay;
      this.$res.postRequest(url, data).then((res) => {
        console.log(res.data, "充值");
        this.timestamp = res.data.data.payLimitTime;
        // this.exchangeRate = res.data.data.exchangeRate;
        if (res.data.code == 0 && res.data.data.payInfoType == 1) {
          _this.branSu(res.data.data.payInfo);
          //////////////////////////////////Timer////////////////////////////////
          const timestampUnix = Math.floor(this.timestamp / 1000);
          const currentDate = moment();
          const timestampDate = moment.unix(timestampUnix);
          const duration = moment.duration(timestampDate.diff(currentDate));
          const Milliseconds = duration.as("milliseconds");

          const totalSeconds = Math.floor(Milliseconds / 1000); // 15 minutes
          // console.log(totalSeconds, "minutes")
          let secondsLeft = totalSeconds;
          this.$store.state.timerInterval = setInterval(() => {
            secondsLeft--;
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;
            this.$store.state.time = `${minutes}:${seconds
              .toString()
              .padStart(2, "0")}`;
            //   console.log( this.$store.state.time, "tttttttt")
            if (secondsLeft <= 0) {
              clearInterval(this.$store.state.timerInterval);
              this.$store.state.showReminder = true;
              this.$store.state.showDiv2 = false;
              this.$store.state.reminderMessage =
                "时间已过期，请重新选择充值通道";
            } else {
              this.$store.state.showReminder = false;
              this.$store.state.reminderMessage = "";
              this.$store.state.showDiv2 = true;
            }
          }, 1000); // Update every second (1000 milliseconds)
          //////////////////////////////////Timer End here////////////////////////////////
        }
        if (res.data.code == 0 && res.data.data.payInfoType == 0) {
          window.location.href = res.data.data.payInfo.payUrl;
        }
        if (res.data.code == 0 && res.data.data.payInfoType == 2) {
          let ty = res.data.data.payInfo;
          ty.bankNme = "虚拟币";
          ty.banPrice = data.rechargeAmount;
          ty.payOrder = res.data.data.payOrder;
          ty.xy = _this.listVal[_this.wayCh].payWayTypeName;
          _this.usdt(ty);
        }
        uni.showToast({
          title: state.codes[res.data.code],
          icon: "none",
        });
      });
    },
    usdt(obj) {
      uni.navigateTo({
        url:
          "/pages/deposit/usdt?item=" + encodeURIComponent(JSON.stringify(obj)),
      });
    },
    ifdata() {
      this.$res
        .postRequest(this.$globalApi.userInfogetCustomerInfo)
        .then((res) => {
          console.log(res);
          if (res.data.code == 9999) {
            uni.navigateTo({
              url: "/pages/login/login",
            });
          }
          if (res.data.code == 0) {
            console.log(res.data.data.customerInfo);
            let v = res.data.data.customerInfo;
            if (v.identityCard == "") {
              uni.showToast({
                title: "请填写身份证",
                icon: "none",
              });
              setTimeout(function () {
                uni.navigateTo({
                  url: "/pages/baseinfo/name/name",
                });
              }, 1000);
              return;
            }
          }
        });
    },
  },
};
</script>

<style lang="scss">
.crypto {
  width: 100%;
  position: relative;
  align-items: center;

  .outter2 {
    overflow: auto;
    height: calc(100vh - 300rpx);
    margin-bottom: 22rpx;

    .text1 {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 36rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.5px;
      margin: 34rpx 0 0 48rpx;
    }

    .text2 {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.5px;
      margin: 36rpx 0 0 48rpx;
    }

    .text3 {
      display: flex;
      align-items: center;

      .text3_1 {
        color: #c01c05;
        text-align: left;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -0.5px;
        margin: 2rpx 0 0 48rpx;
      }

      image {
        width: 10rpx;
        height: 18rpx;
        margin-left: 8rpx;
      }
    }

    .text4 {
      width: 566rpx;
      color: #c2c2c2;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 29rpx;
      letter-spacing: -0.5px;
      margin: 12rpx 0 0 48rpx;
    }

    .text5 {
      color: #c2c2c2;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.5px;
      margin: 2rpx 0 0 48rpx;
    }

    .text6 {
      color: #c2c2c2;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.5px;
      margin: 2rpx 0 0 48rpx;
    }

    .text7 {
      color: #c2c2c2;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.5px;
      margin: 2rpx 0 0 48rpx;
    }

    .text8 {
      display: flex;
      margin: 26rpx 0 0 48rpx;

      .text8_1 {
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: -0.5px;
      }

      .text8_2 {
        display: flex;
        align-items: center;
        width: 50%;
        justify-content: center;
        padding: 0 0px 0 32rpx;

        text {
          color: #c01c05;
          text-align: right;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          letter-spacing: -0.5px;
          margin: 0 12rpx 0 64rpx;
        }

        image {
          width: 10rpx;
          height: 18rpx;
        }
      }
    }

    .cards {
      display: flex;
      align-items: center;
      margin-top: 34rpx;
      margin-left: 58rpx;

      .image1 {
        width: 46.642rpx;
        height: 48rpx;
        flex-shrink: 0;
      }

      .text {
        width: 90rpx;
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -0.5px;
        margin: 0 400rpx 0 24.46rpx;
      }

      .image2 {
        background: url("../../../static/deposit/dot.png") no-repeat;
        background-size: 100% 100%;
        width: 42rpx;
        height: 42rpx;

        .image3 {
          width: 30rpx;
          height: 30rpx;
          margin: 6rpx;
        }
        .hidden-image {
          display: none;
        }
      }
    }

    .text9 {
      color: #003B3D;
      text-align: left;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.5px;
      margin: 50rpx 0 0 48rpx;
    }

    .input_class {
      //border: 1px solid;
      padding: 30rpx 30rpx;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      align-items: flex-start;

      .new-money {
        border-bottom: 2rpx solid #000;
        border-radius: 0px;
        height: 96rpx;
        width: 372rpx !important;
        box-sizing: border-box !important;
        font-size: 60rpx !important;
        font-weight: 500 !important;
        color: #181818 !important;
        font-family: Microsoft YaHei UI !important;
        margin: 0 auto;
      }

      .inp2-inp2 {
        // height: 96rpx;
        width: 372rpx !important;
        color: lightgrey;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 52rpx;
        letter-spacing: -0.5px;
      }

      /deep/.uni-input-input {
        color: #003B3D;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 60rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 52rpx;
        letter-spacing: -0.5px;
        height: 96rpx;
        width: 372rpx !important;
      }
    }

    .selected_amount {
      //margin: 0 15px;

      .selected_amount_row1 {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        flex-wrap: wrap;
        margin: 0 auto;

        .SM {
          width: 226rpx;
          height: 66rpx;
          border-radius: 12rpx;
          border: 2rpx solid #c01c05;
          color: #c01c05;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 66rpx;
          letter-spacing: -0.5px;
          margin: 0 8rpx 18rpx 0;
        }
        .SM.active {
          background: #c01c05;
          color: #ffffff;
        }
      }
    }

    .text10 {
      color: #c2c2c2;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.5px;
      margin: 0 0 0 48rpx;

      span {
        color: #c01c05;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
        letter-spacing: -0.5px;
        margin: 0 8rpx 0 8rpx;
      }
    }
    .text10_sub {
      color: #c2c2c2;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.10rpx;

      span {
        color: #c01c05;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
        letter-spacing: -0.5px;
        margin: 0 8rpx 0 8rpx;
      }
    }

    .text11 {
      color: #c2c2c2;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.10rpx;
      margin: 0 0 0 48rpx;
    }
  }

  .outter1 {
    display: flex;
    position: relative;
    margin: 0 7%;

    .next_btn {
      width: 372rpx;
      height: 60rpx;
      border-radius: 12rpx;
      background: #c01c05;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 54rpx;
      letter-spacing: -0.10rpx;
      position: fixed;
      bottom: 0;
      margin: 0 auto;
      margin-bottom: 86rpx;
    }
  }

  .outter {
    display: flex;
    position: relative;

    .border_bottom {
      width: 202rpx;
      height: 0;
      border: 4rpx solid #000;
      border-radius: 100rpx;
      position: fixed;
      bottom: 0;
      margin: 0 auto;
      margin-bottom: 38rpx;
    }
  }

  .maskLayer2 {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: block;

    .popup_content2 {
      width: 594rpx;
      height: 410rpx;
      background: #ffffff;
      border-radius: 40rpx;
      position: fixed;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);

      .image_top2 {
        background: url("../../../static/deposit/deposit_sucess.png") no-repeat;
        background-size: 100% 100%;
        width: 308rpx;
        height: 308rpx;
        margin: 0 auto;
        margin-top: -160rpx;
      }

      .upper_class {
        white-space: nowrap;
        text-align: center;

        .ner2 {
          display: flex;
          justify-content: center;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.5px;
        }

        .success {
          color: #45ae62;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 30rpx;
          letter-spacing: -0.5px;
          text-align: center;
        }

        .ner3 {
          justify-content: center;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.5px;
        }
      }

      .qer2 {
        margin-top: 64rpx;

        .title_1 {
          width: 444rpx;
          height: 74rpx;
          border-radius: 22rpx;
          background: #45ae62;
          box-shadow: 6rpx 8rpx 16rpx 0px rgba(69, 174, 98, 0.5);
          color: #fff;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.10rpx;
          cursor: pointer;
        }
      }
    }
  }

  .maskLayer {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: block;

    .popup_content {
      width: 594rpx;
      height: 410rpx;
      background: #ffffff;
      border-radius: 40rpx;
      position: fixed;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);

      .image_top {
        background: url("../../../static/deposit/deposit_unsucessfull.png")
          no-repeat;
        background-size: 100% 100%;
        width: 236rpx;
        height: 204rpx;
        margin: 0 auto;
        margin-top: -82rpx;
      }

      .upper_classs {
        white-space: nowrap;
        text-align: center;
        margin-top: 56rpx;

        .ner5 {
          display: flex;
          justify-content: center;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.10rpx;
        }

        .successs {
          color: #be1c05;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 30rpx;
          letter-spacing: -0.5px;
          text-align: center;
          margin: 0 8rpx;
        }

        .ner4 {
          justify-content: center;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.10rpx;
        }
      }

      .qer {
        margin-top: 36rpx;

        .title {
          width: 444rpx;
          height: 74rpx;
          border-radius: 22rpx;
          background: #be1c05;
          box-shadow: 6rpx 8rpx 16rpx 0rpx rgba(174, 81, 69, 0.5);
          color: #fff;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.10rpx;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
