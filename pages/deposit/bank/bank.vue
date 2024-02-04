<template>
  <view class="crypto set-bg">
    <zhnavbar :title="$t('deposit.deposit_title')" :lefticon="true"></zhnavbar>
    <view class="outter2">
      <view class="text1">{{ $t('add_card_view.select_payment_method') }}</view>
      <view class="" v-if="payWayList != null">
        <view
          class="cards"
          v-for="(item, index) in listVal"
          :key="index"
          @click="useWay(index, item)"
        >
          <image
            class="image1"
            src="../../../static/deposit/visaa.png"
            mode="widthFix"
          ></image>
          <view class="text">{{ item.payWayTypeName }}</view>
          <view class="image2 f-c">
            <image
              class="image3"
              src="../../../static/deposit/dot_active.png"
              mode="widthFix"
            ></image>
          </view>
        </view>
      </view>

      <view class="text9">{{ $t('select_channel.recharge_amount') }}</view>
      <view class="input_class" v-if="listVal[wayCh] && listVal[wayCh].minAmount">
        <input
          class="new-money"
          maxlength="17"
          type="number"
          v-model="account"
          :placeholder="$t('deposit.deposit_limit').replace('{mini}',listVal[wayCh].minAmount).replace('{maxi}',listVal[wayCh].maxAmount)"
          placeholder-class="inp2-inp2"
        />
      </view>
      <view class="info_text">
        <image
          src="../../../static/deposit/Exclamation.png"
          mode="widthFix"
          class="info_icon"
        ></image>
        <view class="info">{{ $t('deposit.bank_deposit') }}</view
        >
      </view>
      <view class="selected_amount">
        <view v-if="listVal[wayCh] && listVal[wayCh].randomAmount" class="selected_amount_row1">
          <view 
            class="SM"
            v-for="(item, index) in listVal[wayCh].randomAmount"
            :key="index"
            @tap="moneyBtn(index, listVal[wayCh].randomAmount[index])"
            :class="[index == num3 ? 'active' : 'a']"
            >{{ item }}
          
          </view>
        </view>
      </view>
    </view>
    <view class="outter1 f-c">
      <view class="next_btn f-c" @tap="userRechargeapplyPay()">{{ $t('general.next') }}</view>
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
          <view class="title_1 f-c" @click="trigger(0)">{{ $t('general.oka') }}</view>
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
import { localizationMixin } from '../../../common/js/localization';
export default {
  mixins: [localizationMixin],
  data() {
    return {
      navtitle: "Deposit",
      userFeedbackHidden2: false,
      userFeedbackHidden1: false,
      listVal: {},
      num3: 0,
      account: "",
        payWayList: [
          {
            payWayTypes: {
              randomAmount: [],
            },
          },
        ],
      payWay: {},
      wayCh: 0,
      headIndex: 0, //:class
      levelInfo: 0, //最高优惠
      AllChannels: [],
      waychIndex: "",
      ebpayText: "", //EBPay文字
      exchangeRate: 0,
      way2Index: "",
    };
  },
  onLoad() {
    this.getQkTd();
    this.headIndex = uni.getStorageSync("headIndex");
   // console.log(this.wayCh, "xxxxxxxx");
  },
  methods: {
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
    getVipList(jsonurl) {
      this.$res.getRequest(this.$time(jsonurl)).then((res) => {
        this.levelInfo =
          res.data.datas.levelPermissions[
            uni.getStorageSync("memberInfo").userLevel
          ].maxVirutalBonus;
      });
    },
    getQkTd() {
      let pay = state.static;
      this.getVipList(state.jsonUrl + state.jsons.levelInfo); //vip-data
      this.payWay = state.static.payWay;
      let data = { deviceType: 1 };
      let url = this.$globalApi.userRechargegetAllChannel;
      this.$res.postRequest(url, data).then((res) => {
        if (res.data.code == 0) {
          let a = res.data.data.allChannel;
          this.AllChannels = a;
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
          console.log(this.payWayList, "bilallalalalalal");
          this.listVal = this.payWayList[this.headIndex].payWayTypes;
          // console.log(this.listVal, "vallist");
            this.way2Index = this.payWayList[this.headIndex].index;
            this.waychIndex = this.payWayList[this.headIndex].payWayTypes[0].payWayType;
          // let Ctype = uni.getStorageSync("status").currencyType;

          this.account = this.ebpayText = this.listVal[0].randomAmount[0] ? this.listVal[0].randomAmount[0] : ""; // EBPay赋值

          this.getHl(this.listVal[0].currencyType);
        } else {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
            duration: 4000,
          });
          this.errorAlert = true;
        }
      });

      let payWayType = [];
      for (let item in pay.payWayType) {
        payWayType.push({
          index: item,
          payWayTypeName: pay.payWayType[item].payWayTypeName,
        });
      }
      this.payWayType = payWayType;
    },

    useWay(index, item) {
      this.texts = item.text;
      this.wayCh = index; //选择协议类型
      this.waychIndex = item.index;
      // console.log(this.wayCh, this.waychIndex, "hassan");
      this.num3 = 0; //充值金额重置
      this.account = this.ebpayText = item.randomAmount
        ? item.randomAmount[0]
        : ""; // EBPay赋值

      let Ctype = uni.getStorageSync("status").currencyType;
      console.log(index, item);
      this.exchangeRate = uni.getStorageSync("exchange");
      this.ChannelName = Ctype[item.currencyType];
      this.lvText = true;
      this.getHl(item.currencyType);
    },
    moneyBtn(index, item, bool) {
      this.num3 = index;
      this.account = this.ebpayText = item;
      console.log(this.account);
      if (bool) {
        this.attr = true;
        this.num3 = "zdy";
        this.account = "";
      }
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

	userRechargeapplyPay() {
      this.ifdata();
      console.log(this.account);

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
        payWayType: _this.waychIndex,  //payWayType: 101 类型
        rechargeAmount: _this.account,
        exchangeRate: _this.exchangeRate,
      };

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
          const Milliseconds = duration.as('milliseconds');

          const totalSeconds = Math.floor(Milliseconds / 1000); // 15 minutes 
          // console.log(totalSeconds, "minutes")
          let secondsLeft = totalSeconds;
          this.$store.state.timerInterval = setInterval(() => {
            secondsLeft--;
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;
            this.$store.state.time = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            //   console.log( this.$store.state.time, "tttttttt")
            if (secondsLeft <= 0) {
              clearInterval(this.$store.state.timerInterval);
              this.$store.state.showReminder = true;
              this.$store.state.showDiv2 = false;
              this.$store.state.reminderMessage = '时间已过期，请重新选择充值通道';
            }
            else {
              this.$store.state.showReminder = false;
              this.$store.state.reminderMessage = '';
              this.$store.state.showDiv2 = true;
            }
          }, 1000); // Update every second (1000 milliseconds)
          //////////////////////////////////Timer End here////////////////////////////////
        }
        // payInfoType = 0-URL(直接跳转) ：0 = open-link，
        if (res.data.code == 0 && res.data.data.payInfoType == 0) {
          //alert use this!, 此功能禁止嵌入，需要跳转到新页面  ， payInfoType == 0   ，ebpay-充值
          window.location.href= res.data.data.payInfo.payUrl;
        }
        if (res.data.code == 0 && res.data.data.payInfoType == 2) {
          let ty = res.data.data.payInfo;
          ty.bankNme = "虚拟币";
          ty.banPrice = data.rechargeAmount;
          ty.payOrder = res.data.data.payOrder;
          ty.xy = _this.listVal[_this.wayCh].payWayTypeName;
          // _this.usdt(ty);
        }
        uni.showToast({
          title: state.codes[res.data.code],
          icon: "none",
        });
      });
    },
    branSu(obj) {
      console.log(obj);
      uni.navigateTo({
        url:
          "/pages/deposit/bankTransfer?item=" +
          encodeURIComponent(JSON.stringify(obj)),
      });
    },
	ifdata() {
      //判断是否填写身份证
      this.$res
        .postRequest(this.$globalApi.userInfogetCustomerInfo)
        .then((res) => {
          console.log(res);
          if (res.data.code == 9999) {
            uni.navigateTo({
              url: "/pages/login/login",
            });
          }
          // this.$IdandBank();

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
      letter-spacing: -0.10rpx;
      margin: 34rpx 0 0 48rpx;
    }

    .text2 {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 36rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.10rpx;
      margin: 96rpx 0 0 48rpx;
    }

    .cards {
      display: flex;
      align-items: center;
      margin-top: 44rpx;
      margin-left: 58rpx;

      .image1 {
        width: 38.618rpx;
        height: 24.1444rpx;
        flex-shrink: 0;
      }

      .text {
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        /* 142.857% */
        letter-spacing: -0.10rpx;
		margin: 0 0 0 24.46rpx;
		width: 75%;

      }

      .image2 {
        background: url("../../../static/deposit/dot.png") no-repeat;
        background-size: 100% 100%;
        width: 42rpx;
        height: 42rpx;

        .image3 {
          width: 30rpx;
          margin: 6rpx;
        }
      }
    }

    .text9 {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.10rpx;
      margin: 50rpx 0 0 48rpx;
    }

    .outters {
      margin: 52rpx 0 92rpx 48rpx;

      .cards2 {
        display: flex;
        align-items: center;
        //margin: 0 37px 0 22px;

        .texts {
          color: #003B3D;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          letter-spacing: -0.10rpx;
        }

        .image1 {
          width: 82rpx;
          height: 24.1446rpx;
          margin: 0 304rpx 0 16rpx;
        }

        .image2 {
          background: url("../../../static/deposit/dot.png") no-repeat;
          background-size: 100% 100%;
          width: 42rpx;
          height: 42rpx;

          .image3 {
            width: 30rpx;
            margin: 6rpx;
          }
        }
      }
    }

    .input_class {
      //border: 1px solid;
      //padding: 15px 15px;
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
        //height: 96rpx;
        width: 372rpx !important;
        color: lightgrey;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 52rpx;
        letter-spacing: -0.10rpx;
      }

      /deep/.uni-input-input {
        color: #008D91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 60rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 52rpx;
        letter-spacing: 2.8rpx;
        height: 96rpx;
        width: 372rpx !important;
      }
    }

    .info_text {
      display: flex;
      align-items: center;
      margin: 42rpx 72rpx 36rpx 60rpx;

      image {
        margin: 0rpx 10rpx 0 0;
        width: 42rpx;
        height: 42rpx;
      }

      .info {
        color: #686868;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 2.8rpx;

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
          border: 2rpx solid #008D91;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 66rpx;
          letter-spacing: -0.10rpx;
          margin: 0 8rpx 18rpx 0;
        }
        .SM.active {
          background: #008D91;
          color: #ffffff;
        }
      }
    }
  }

  .outter1 {
    display: flex;
    position: relative;
    margin: 0 7%;
    ///	padding-top: 79px;

    .next_btn {
      width: 672rpx;
      height: 60rpx;
      border-radius: 12rpx;
      background: #003B3D;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 54rpx;
      letter-spacing: -.5px;
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
      top: 30%;
      left: 50%;
      margin-left: -40%;

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
          letter-spacing: -0.10rpx;
        }

        .success {
          color: #45ae62;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 30rpx;
          letter-spacing: -0.10rpx;
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
          letter-spacing: -0.10rpx;
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
          color: #008D91;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 30rpx;
          letter-spacing: -0.10rpx;
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
          background: #008D91;
          box-shadow: 6rpx 8rpx 16rpx 0px rgba(174, 81, 69, 0.5);
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
