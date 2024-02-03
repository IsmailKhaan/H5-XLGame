<template>
  <view class="withdrawal">
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

    
    <view class="choose_withdraw_type">
      <view class="withdraw_money_card">
        <view class="text1">{{ $t('choose_payment_method_view.choose_method1')}}</view>
        <view class="text2">{{ $t('choose_payment_method_view.choose_method2')}}</view>
        <view class="card f-s" @click="chooseWithdrawWay(0)">
          <image
            class="image_1"
            src="../../static/transfer/visa.png"
            mode="widthFix"
          ></image>
          <view class="text3">
            <view class="text3_1">{{$t('choose_payment_method_view.bank_card')}}</view>
            <view class="text3_2">{{$t('choose_payment_method_view.amount_limit').replace('{maxi}',limitMax).replace('mini',limit)}}</view>
          </view>
          <view class="image2 f-c" >
            <div class="image-btn"  v-show="bank_card == true"></div>
          </view>

        </view>
        <view class="card f-s" @click="chooseWithdrawWay(1)">
          <image
            class="image_1"
            src="../../static/transfer/btc.png"
            mode="widthFix"
          ></image>
          <view class="text3">
            <view class="text3_1">{{$t('choose_payment_method_view.virtual_currency')}}</view>
            <view class="text3_2">...</view>
          </view>
          <view class="image2 f-c" >
            <div class="image-btn"  v-show="vitrual_currency == true"></div>
          </view>

        </view>
      </view>
      <view class="details">
        <ul>
          <li v-html="$t('choose_payment_method_view.detail11').replace('{number}',hlv.surplusTimes)">
           </li>
        </ul>
      </view>
      <view class="details" >
        <ul>
          <li>
            {{ $t('choose_payment_method_view.detail5') }}
          </li>
        </ul>
      </view>
      <navigator
        v-show="bank_card == true && vitrual_currency == false"
        url="/pages/withdrawal/withdrawviabank"
        class="goods-carts"
      > 
        <view class="my-button2 f-c">{{ $t('general.next') }}</view>
      </navigator>
      <navigator
        v-show="bank_card == false && vitrual_currency == true"
        url="/pages/withdrawal/withdrawviacrypto"
        class="goods-carts"
      >
        <view class="my-button2 f-c">{{ $t('general.next') }}</view>
      </navigator>
    </view>
  </view>
</template>

<script>
// import state from "@/store/state";
import { localizationMixin } from '../../common/js/localization';
export default {
  mixins: [localizationMixin],
  components: {},
  data() {
    return {
      isshow: 0,
      vitrual_currency: false,
      bank_card: true,
      limit: 500,
      limitMax: 50000,
      withDrawLimit: 0,
      paywayType1: 0,
      allBankCard: [],
      hlv: {},

    };
  },

  onLoad() {
    this.chooseWithdrawWay();
    this.branck();
    this.getFrequency();
  },

  methods: {
    chooseWithdrawWay(e) {
      if (e == 0) {
        this.bank_card = true;
        this.vitrual_currency = false;
      } else if (e == 1) {
        this.bank_card = false;
        this.vitrual_currency = true;
      }
    },
    /////////////////////////////////////////////
    goback() {
      this.bank_card = true;
      this.vitrual_currency = false;

      if (this.url) {
        uni.reLaunch({
          url: this.url,
        });
        return;
      } else {
        history.back();
      }
    },
    /////////////////////////////////////////
    branck() {
      let that = this;
      let url = that.$globalApi.userInfogetAllBankCard;
      that.$res.postRequest(url).then((res) => {
        that.allBankCard = res.data.data.allBankCard;
      //  console.log(that.allBankCard,"sfffgfsdfajsdfa")

        that.allBankCard.forEach((element) => {
          that.paywayType1 = element.payWayType;
        });
        if (that.withDrawLimit[that.paywayType1]) {
          that.limit = that.withDrawLimit[that.paywayType1].min;
          that.limitMax = that.withDrawLimit[that.paywayType1].max;
        }
      });
    },
    ///////////////////////////////////////////////
    getFrequency() {
      let url = this.$globalApi.todayTimes;
      this.$res.postRequest(url)
        .then((res) => {
          this.hlv = res.data.data;
          this.withDrawLimit = res.data.data.amountInterval;
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
  },
};
</script>

<style lang="scss">
.withdrawal {
  background: #fff6f6;
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
      background: #fff6f6;
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
  .withdraw_money_card {
    width: 100%;
    height: 522rpx;
    border-radius: 34rpx;
    background: #fff;
    box-shadow: 0rpx 8rpx 50rpx 0rpx rgba(0, 0, 0, 0.25);
    padding: 62rpx 74rpx 78rpx 48rpx;
    margin-bottom: 66rpx;

    .text1 {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 36rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.10rpx;
    }

    .text2 {
      margin-top: 66rpx;
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.10rpx;
    }

    .card {
      margin-top: 32rpx;

      .image_1 {
        width: 50.642rpx;
        height: 52.116rpx;
      }

      .text3 {
        margin-left: 24.46rpx;
        width: 80%;

        .text3_1 {
          color: #003B3D;
          font-family: Microsoft YaHei UI;
          font-size: 28rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          letter-spacing: -0.10rpx;
        }

        .text3_2 {
          color: #c2c2c2;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          letter-spacing: -0.10rpx;
        }
      }
    }
  }

  .details {
    padding: 0rpx 30rpx 0rpx 0rpx;

    li {
      color: #85a2c6;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.10rpx;

      span {
        margin: 0 10rpx 0 10rpx;
        color: #c01c05;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: -0.10rpx;
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
      letter-spacing: -0.10rpx;
    }
  }
}
</style>
