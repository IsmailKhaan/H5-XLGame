<template>
  <view class="withdrawal" :style="'top:' + keyBoardHeight + 'px !important;'">
    <loading :isshow="isshow"></loading>
    <view id="navbar">
      <view class="fixed">
        <view class="icon-block f-c">
          <view class="image" @click="goback">
            <image src="../../static/zhnavbar/leftjt.png" mode="widthFix"></image>
          </view>
        </view>
        <view class="title">{{ $t("settings.withdraw") }}</view>
      </view>
    </view>
    <view class="Select_card" v-show="bank == true">
      <view class="text2_1">{{ $t("manage_vc_accounts.add_new") }}</view>
      <navigator url="/pages/cardManage/addcrypto/addcrypto" class="outters">
        <view class="cards2_2 f-s">
          <view class="texts2_2">{{
            $t("manage_vc_accounts.new_vc_account")
          }}</view>
          <view class="image2_2">
          </view>
        </view>
      </navigator>
      <view class="text1_1">{{ $t("withdraw_view.choose_wallet") }}</view>
      <view
        class="cards1_1 "
        v-for="(item, index) in $store.state.currency"
        :key="index"
        @tap="virtualBtn(index, item)"
      >
        <image
          class="image1_1"
          v-show="item.icon"
          :src="item.icon"
          mode="widthFix"
        ></image>
        <image
          class="image1_1"
          v-show="!item.icon"
          src="../../static/deposit/visaa.png"
          mode="widthFix"
        ></image>
        <view class="clsaa_w">
          <view class="text1__1_name">{{ item.walletName }}</view>
          <view class="text1__1_no">
           ****{{ maskCardNumber(item.walletNo) }}</view>
        </view>
        
        <view class="image2_1 f-c">
          <view class="image2 f-c" >
            <div class="image-btn"  v-show="index == num"></div>
          </view>
        </view>
      </view>
      <view class="max_and_min_limits">
        <ul>
          <li
            v-html="
              $t('choose_payment_method_view.detail11').replace(
                '{number}',
                hlv.surplusTimes
              )
            "
          ></li>
          <li
            v-html="
              $t('choose_payment_method_view.detail12')
                .replace('{max}', limitMax)
                .replace('{min}', limit)
            "
          ></li>
        </ul>
      </view>
      <view class="goods-carts">
        <view class="my-button2 f-c" @click="goto(1)">{{
          $t("general.next")
        }}</view>
      </view>
    </view>

    <view class="add_money" v-show="bank == false && add_money == true">
      <view class="text9">{{ $t("add_card_view.withdraw_amount") }}</view>
      <view class="input_class">
        <input
          class="new-money"
          maxlength="15"
          type="number"
          :placeholder="
            $t('add_card_view.withdraw_amount') + ':' + `${limit} ~ ${limitMax}`
          "
          @input="getExchangeRateCNY"
          v-model="account"
          placeholder-class="inp2-inp2"
        />
        <view class="max f-c" @click="maxMoney">{{
          $t("important_game_notice.maximum_btn_lbl")
        }}</view>
      </view>
      <view class="goods-carts">
        <view class="my-button2 f-c" @tap="confirm1()">{{
          $t("settings.withdraw")
        }}</view>
      </view>
      <view class="exchange-rate">
        <view
          style="text-indent: 25px"
          v-if="$store.state.allStatus.showVCRate != 0"
        >
          参考汇率1{{ texts }}=
          <span style="color: #c01c05">{{ exchangeRate }}</span> CNY,
        </view>
        <view
          style="text-indent: 11px"
          v-html="
            $t('withdraw_view.estimated_arrival')
              .replace(
                '{exchangeRate}',
                (account / exchangeRate).toFixed(2).toString()
              )
              .replace('{text}', texts)
          "
        >
        </view>
      </view>
    </view>

    <view v-show="card == true" class="maskLayer">
      <view class="popup_content">
        <view class="image_top"></view>
        <view
          class="ner"
          v-html="
            $t('withdraw_view.confirm_withdraw').replace('{amount}', account)
          "
        ></view>
        <view class="f-a qer">
          <view class="title_1 f-c" @click="continue_withdraw(0)">{{
            $t("general.cancle")
          }}</view>
          <view class="title_2 f-c" @click="continue_withdraw(1)">{{
            $t("general.yes")
          }}</view>
        </view>
      </view>
    </view>
    <view v-show="card2 == true" class="maskLayer2">
      <view class="popup_content2">
        <view class="image_top2"></view>
        <view class="ner2">
          {{
            $t("withdraw_view.demandAmount_poundageAmount")
              .replace("{ demandAmount }", demandAmount)
              .replace("{ poundageAmount }", poundageAmount)
          }}
        </view>
        <view class="f-a qer2">
          <view class="title_12 f-c" @click="continue_withdraw(0)">{{
            $t("general.cancle")
          }}</view>
          <view class="title_22 f-c" @click="continue_withdraw(1)">{{
            $t("general.yes")
          }}</view>
        </view>
      </view>
    </view>

    <view v-show="card3 == true" class="maskLayer2_1">
      <view class="popup_content2_1">
        <view class="image_top2_1"></view>
        <image @click="goto(5)" src="../../static/service/xx.png" mode="widthFix"></image>
        <view class="ner2" v-html="$t('withdraw_view.withdraw_amout_charge')">
        </view>
        <view @click="goto(0)" class="f-a qer" style="margin-top:40rpx;">
          <view
            class="title f-c"
            :style="{
              backgroundColor: quedtext === $t('settings.withdraw') ? '#008D91' : '',
              boxShadow: quedtext === $t('settings.withdraw') ? '4rpx 4rpx 24rpx 0rpx rgba(190, 28, 5, 0.58)' : ''
            }"
            >{{ quedtext }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import state from "@/store/state";
import { mapState, mapMutations, mapAction } from "vuex";
import zhnavbar from "@/components/zh-navbar/zh-navbar.vue";
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  components: {},
  data() {
    return {
      texts: "",
      hlv: {},
      quedtext: 3,
      poundageAmount: null,
      demandAmount: null,
      card: false,
      card2: false,
      card3: false,
      keyBoardHeight: 0,
      isshow: 0,
      add_money: false,
      bank_card: true,
      num: 0,
      limit: 500,
      limitMax: 50000,
      authCacheKey: "",
      exchangeRate: 1, //汇率
      withDrawLimit: 0,
      bank: true,
      account: "",
      paywayType: 0,
      exchangeRateCNY: "",
      timer:null,
    };
  },
  computed: {
    ...mapState({
      isbind: (state) => state.safety,
      json: (state) => state.json,
      iconUrl: (state) => state.iconUrl,
    }),
    isbind() {
      return this.$store.state.safety;
    },
  },
  components: {
    zhnavbar,
  },
  onLoad() {
    this.loadWithdrawalData();
  },
  watch: {
    iconUrl() {
      this.currFx();
    },
  },

  methods: {
    maskCardNumber(fullCardNumber) {
      const lastFourDigits = fullCardNumber.slice(-4);
      return `${lastFourDigits}`;
    },

    async loadWithdrawalData() {
      await this.currFx();
      this.getFrequency();
      this.$money();
      this.virtualBtn(0, state.currency[0]);
      this.lvFx(state.currency[0]);
      this.texts = state.currency[0].text;
    },
    async currFx() {
      if (state.iconUrl) {
        await this.$currencyType();
      }
    },
    lvFx(item) {
      let _this = this;
      if (state.currency == "") {
        return;
      }
      let data = {};
      data.currencyType = item.currencyType;

      // console.log(item.currencyType, "tatattatat");
      // console.log(state.currency[0].currencyType, "tatattatat");

      let url = _this.$globalApi.userWithdrawgetCurrencyExchangeRate;
      this.$res.postRequest(url, data).then((res) => {
        this.exchangeRate = res.data.data.exchangeRate;
        console.log(this.exchangeRate, "");
      });
    },
    virtualBtn(index, item) {
      this.texts = item.text;
      this.num = index;
      this.authCacheKey = item.paymentId;
      this.lvFx(item);
      // console.log(item, "items");
      this.paywayType = item.payWayType;
      if (this.withDrawLimit[this.paywayType]) {
        this.limit = this.withDrawLimit[item.payWayType].min;
        this.limitMax = this.withDrawLimit[item.payWayType].max;
      }
    },
    goto(e) {
      if (e == 1) {
        this.bank = false;
        this.add_money = true;
      } else if (e == 0) {
        this.card2 = true;
        this.card3 = false;
      }else if (e == 5) {
        this.card3 = false;
        clearInterval(this.timer);
      }
    },
    confirm1() {
      let a = this.account.toString();
      if (a.includes(".")) {
        uni.showToast({
          title: this.$t("withdraw_view.Integer"),
          icon: "none",
        });
        return;
      }

      if (!this.account) {
        uni.showToast({
          title: "请输入提现金额",
          icon: "none",
        });
        return false;
      }

      if (this.account < this.limit) {
        uni.showToast({
          title: "最小提款" + this.limit,
          icon: "none",
        });
        return;
      }

      if (this.account > this.limitMax) {
        uni.showToast({
          title: "最大提现" + this.limitMax,
          icon: "none",
        });
        return;
      }

      let data = {
        withdrawAmount: this.account,
      };
      let url = this.$globalApi.userWithdrawcheckAmount;
      this.$res.postRequest(url, data).then((res) => {
        console.log(res, "withdrawal ");
        //请求是否有效流水
        if (res.data.code == 0) {
          this.tx();
        } else {
          if (res.data.code == 21002) {
            this.demandAmount = res.data.data.demandAmount;
            this.poundageAmount = res.data.data.poundageAmount;

            this.card3 = true;

            this.quedtext = 3;
            let n = 3; 
             this.timer = setInterval(() => {
              n--;
              if (n <= 0) {
                clearInterval(this.timer);
                this.quedtext = this.$t("settings.withdraw");
                return;
              } else {
                this.quedtext = n;
              }
            }, 1000);
          } else {
            uni.showToast({
              title: state.codes[res.data.code],
              icon: "none",
            });
          }
        }
      });
    },

    continue_withdraw(e) {
      if (e == 0) {
        this.card = false;
        this.card2 = false;
      }
      if (e == 1) {
        this.tx();
        this.card = false;
        this.card2 = false;
      }
    },

    tx() {
      this.paywayType = this.paywayType;
      this.authCacheKey = this.authCacheKey;
      let data = {
        withdrawAmount: this.account,
        payWayType: this.paywayType,
        withdrawPaymentId: this.authCacheKey,
        exchangeRate: this.exchangeRate,
      };

      let url = this.$globalApi.applyWithdraw;
      this.$res.postRequest(url, data).then((res) => {
        this.$money();

        if (res.data.code === 0) {
          this.account = "";
          this.checkStatus();
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/withdrawal/withdrawal",
            });
          }, 1100);
          this.$store.state.navselect = 2;
        } else {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        }
      });
    },
    maxMoney() {
      this.account = parseInt(state.money);
      this.getExchangeRateCNY();
      // console.log(this.account, "maxmoney");
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

    checkStatus() {
      let url = this.$globalApi.checkorderStatus;
      this.$res.postRequest(url).then((res) => {
        // console.log(res, "checkorderStatus1 ");
        if (res.data.code == 0) {
          state.progress = res.data.data.orderState;
          // uni.setStorageSync('checkstatus', res.data.data.orderState);
          // console.log(res, "checkorderStatus2 ");
        }
      });
    },
    getFrequency() {
      let url = this.$globalApi.todayTimes;
      this.$res
        .postRequest(url)
        .then((res) => {
          console.log(res.data.data, "提现次数 todayTimes");
          this.hlv = res.data.data;
          // console.log(this.hlv, "提现次数 todayTimes");
          this.withDrawLimit = res.data.data.amountInterval;
          this.limit = this.withDrawLimit[state.currency[0].payWayType].min;
          this.limitMax = this.withDrawLimit[state.currency[0].payWayType].max;
          // console.log(this.limit, state.currency, "withdrwallimimt");
          // console.log(this.limit, this.withDrawLimit, "提现次数 XYZ");
        })
        .catch((err) => {
          if (err == "999") {
            uni.navigateTo({
              url: "../error/error",
            });
          } else {
            this.info = true;
            this.infoType = "error";
            this.infoMsg = "当前网络不稳定，请重试";
            this.account = "";
            setTimeout(() => {
              this.info = false;
            }, 1800);
          }
        });
    },
    getExchangeRateCNY() {
      let a = this.account.toString();
      if (a.includes(".")) {
        uni.showToast({
          title: this.$t("withdraw_view.Integer"),
          icon: "none",
        });
        return;
      }
      this.exchangeRateCNY = (this.account / this.exchangeRate).toFixed(2);
      // console.log(this.exchangeRateCNY, "exchangeRateCNY");
    },
  },
};
</script>

<style lang="scss">
.withdrawal {
  background: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 30rpx;
  #navbar {
    width: 100%;
    height: 110rpx;
    position: relative;
    z-index: 100;
    .fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 100rpx;
      width: 100%;
      background: #ffffff;
      background-size: 100% 100%;
      .icon-block{
        position: absolute;
        left: 10rpx;
        top: 0rpx;
        width:100rpx;
        height:100rpx;
      }
      .image {
        width: 22rpx;
        height: 38rpx;
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
        color: #003B3D;
        letter-spacing: 2.8rpx;
      }
    }
  }

  .goods-carts {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    right: 0;
    left: var(--window-left);
    right: var(--window-right);
    bottom: 0;

    .my-button2 {
      width: 672rpx;
      height: 60rpx;
      border-radius: 12rpx;
      background: #c01c05;
      margin: 0 auto;
      margin-bottom: 88rpx;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.1rpx;
    }
  }

  .Select_card {
    padding: 0rpx 74rpx 0 48rpx;

    .text1_1 {
      margin-top: 108rpx;
      margin-bottom: 34rpx;
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 36rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.1rpx;
    }

    .text2_1 {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 36rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.1rpx;
    }

    .cards1_1 {
      border-radius: 18rpx;
      background: #EAEAEA;
      padding: 20rpx 26rpx 20rpx 18rpx;
      display: flex;
      align-items: center;
      margin-top: 16rpx;

      .image1_1 {
        width: 46.642rpx;
        height: 48rpx;
      }

      .text1__1 {
        width: 536rpx;
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -0.1rpx;
        margin-left: 24.46rpx;
        margin-right: 24.46rpx;
        overflow-wrap: anywhere;
      }

      .image2_1 {
        background: url("../../static/deposit/dot.png") no-repeat;
        background-size: 100% 100%;
        width: 42rpx;
        height: 42rpx;
      }
      .clsaa_w { 
        width: 87%;
        margin-left: 28rpx;
        .text1__1_name {
          color: #003B3D;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx; 
          letter-spacing: -0.10rpx;
        }
        .text1__1_no {
          color: #003B3D;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 32rpx;
          letter-spacing: -0.10rpx;
          word-wrap: break-word;
        }
        
      }
    }

    .outters {
      .cards2_2 {
        display: flex;
        align-items: center;
        margin-top: 40rpx;

        .texts2_2 {
          color: #003B3D;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          letter-spacing: -0.1rpx;
        }

        .image2_2 {
          background: url("../../static/deposit/add.png") no-repeat;
          background-size: 100% 100%;
          width: 54rpx;
          height: 54rpx;

          .image2_3 {
            width: 30rpx;
            margin: 6rpx;
          }
        }
      }
    }

    .max_and_min_limits {
      margin-top: 100rpx;
      color: #85a2c6;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      /* 166.667% */
      letter-spacing: -0.1rpx;

      ul {
        margin-left: -50rpx;
      }
    }
  }

  .add_money {
    .exchange-rate {
      padding-top: 18rpx;
      color: #9a9a9a;
      width: 100%;
      display: flex;
      margin-left: 46rpx;
      align-items: center;

      view {
        font-family: Microsoft YaHei;
        font-size: 24rpx;
        font-weight: 400;
      }
    }

    .text9 {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      /* 166.667% */
      letter-spacing: -0.1rpx;
      margin: 50rpx 0 0 48rpx;
    }

    .input_class {
      width: 650rpx;
      box-sizing: border-box;
      align-items: flex-start;
      margin: 0 auto;
      border-bottom: 2rpx solid #000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 74rpx;
      margin-top: 28rpx;
      padding-left: 32rpx;

      .max {
        width: 204rpx;
        height: 52rpx;
        border-radius: 26rpx;
        background: #c01c05;
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: 2.8rpx;
      }

      .new-money {
        border-radius: 0px;
        height: 96rpx;
        width: 400rpx !important;
        box-sizing: border-box !important;
        font-size: 60rpx !important;
        font-weight: 500 !important;
        color: #181818 !important;
        font-family: Microsoft YaHei UI !important;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .inp2-inp2 {
        //   height: 48px;
        //   width: 372rpx !important;
        color: #d3d3d3;
        //  text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 52rpx;
        letter-spacing: 2.8rpx;
        // margin-left: 20rpx;
      }

      /deep/.uni-input-input {
        color: #003B3D;
        //text-align: left;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        // line-height: 52rpx;
        letter-spacing: 2.8rpx;
        //  margin-left: 26rpx;
      }
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
      border-radius: 20rpx;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

  
    }

    .image_top2 {
      background: url("../../static/deposit/exclimation.png") no-repeat;
      background-size: 100% 100%;
      width: 278rpx;
      height: 340rpx;
      margin: 0 60% 0 18%;
      margin-top: -216rpx;
    }

    .ner2 {
      padding: 0 30rpx 0 30rpx;
      margin: 0 auto;
      margin-top: 34rpx;
      display: flex;
      justify-content: center;
      color: #003B3D;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.1rpx;
    }

    .qer2 {
      margin-top: 28rpx;

      .title_12 {
        border-radius: 22rpx;
        background: #9f9f9f;
        width: 264rpx;
        height: 74rpx;
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
        letter-spacing: -0.1rpx;
        cursor: pointer;
      }

      .title_22 {
        border-radius: 22rpx;
        background: #008D91;
        width: 264rpx;
        height: 74rpx;
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
        letter-spacing: -0.1rpx;
        cursor: pointer;
      }
    }
  }
  .maskLayer2_1 {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: block;

    .popup_content2_1 {
      width: 594rpx;
      // height: 410rpx;
      background: #ffffff;
      border-radius: 20rpx;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 0 54rpx 0;


      .qer {
        .title {
          border-radius: 22rpx;
          background: #9F9F9F;
         // box-shadow: 4rpx 4rpx 24rpx 0rpx rgba(190, 28, 5, 0.58);
          width: 444rpx;
          height: 74rpx;
          color: #fff;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.1rpx;
          cursor: pointer;
        }
      }
    }
    image {
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      top: -80rpx;
      left: 526rpx;
    }

    .image_top2_1 {
      background: url("../../static/deposit/girl.png") no-repeat;
      background-size: 100% 100%;
      width: 310rpx;
      height: 278rpx;
      margin: 0 auto;
      margin-top: -162rpx;
    }

    .ner2 {
      padding: 0 30rpx 0 30rpx;
      margin: 0 auto;
      //margin-top: 34rpx;
      display: flex;
      justify-content: center;
      color: #003B3D;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.1rpx;
    }
    .qer2_1 {
      margin-top: 40rpx;

      .title_12_1 {
        border-radius: 22rpx;
        background: #008D91;
        box-shadow: 4rpx 4rpx 24rpx 0rpx rgba(190, 28, 5, 0.58);
        width: 444rpx;
        height: 74rpx;
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
        letter-spacing: -0.1rpx;
        cursor: pointer;
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
  }

  .popup_content {
    width: 594rpx;
    height: 410rpx;
    background: #ffffff;
    border-radius: 20rpx;
    position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
  }

  .image_top {
    background: url("../../static/transfer/logo.png") no-repeat;
    background-size: 100% 100%;
    width: 139px;
    height: 340rpx;
    margin: 0 auto;
    margin-top: -202rpx;
  }

  .ner {
    margin: 0 auto;
    text-align: center;
    margin-top: 58.1rpx;
    display: flex;
    justify-content: center;
    color: #003B3D;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 30rpx;
    letter-spacing: -0.1rpx;
  }

  .amounts {
    text-align: center;
    justify-content: center;

    color: #c01c05;
    font-family: Microsoft YaHei UI;
    font-size: 28rpx;
    font-style: normal;
    font-weight: 700;
    line-height: 28rpx;
    letter-spacing: -0.1rpx;
  }

  .qer {
    margin-top: 64rpx;

    .title_1 {
      border-radius: 22rpx;
      background: #9f9f9f;
      width: 264rpx;
      height: 74rpx;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.1rpx;
      cursor: pointer;
    }

    .title_2 {
      border-radius: 22rpx;
      background: #008D91;
      width: 264rpx;
      height: 74rpx;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.1rpx;
      cursor: pointer;
    }
  }
}
</style>
