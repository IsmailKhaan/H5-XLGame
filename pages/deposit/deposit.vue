<template>
  <view class="deposit set-bg">
    <zhnavbar :title="$t('deposit.deposit_title')" :lefticon="true"></zhnavbar>
    <view class="main_card">
      <view class="title f-c">{{ $t('deposit.payment_method') }}</view>
      <view
        class="cards"
        style=""
        v-for="(item, index) in payWayList"
        :key="index"
        @click="headBtn(index, item)"
      >
        <image
          class="image1"
          :src="item.payWayIcon ? $store.state.iconUrl + item.payWayIcon : ''"
          mode="widthFix"
        >
        </image>
        <view class="text">{{ item.payWayName }}</view>
        <view class="image2 f-c">
          <div class="image-btn" v-show="index == lv"></div>
        </view>
      </view>
    </view>
    <match-media :min-height="812">
      <image
        class="image4"
        src="../../static/deposit/lady.png"
        mode="widthFix"
      ></image>
    </match-media>
    <match-media :min-height="568" :max-height="736">
      <image
        class="image_mini"
        src="../../static/deposit/lady.png"
        mode="widthFix"
      ></image>
    </match-media>
    <view v-if="lv == 0">
      <navigator url="/pages/deposit/crypto/crypto" class="outter1 f-c">
        <view class="next_btn f-c">{{ $t('general.next') }}</view>
      </navigator>
    </view>
    <view v-if="lv == 2 || lv == 1">
      <navigator url="/pages/deposit/bank/bank" class="outter1 f-c">
        <view class="next_btn f-c">{{ $t('general.next') }}</view>
      </navigator>
    </view>
    <view class="outter f-c">
      <view class="border_bottom f-c"></view>
    </view>
  </view>
</template>
<script>
import state from "@/store/state";

import { localizationMixin } from '../../common/js/localization';
export default {
  mixins: [localizationMixin],
  data() {
    return {
      navtitle: "Deposit",
      payWayList: [],
      payWay: {},
      AllChannels: [],
      errorAlert: false,
      lv: 0,
    };
  },
  onLoad() {
    this.getQkTd();
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
          this.AllChannels = a;
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

    headBtn(index, item) {
      console.log(item, "头部标题选择");
      let that = this;
	    uni.setStorageSync("headIndex", index);
      that.lv = index;
      console.log(that.lv, "that.lv");
      console.log(index, item);
    },
  },
};
</script>

<style lang="scss">
.deposit {
  .main_card {
    width: 700rpx;
    min-height: 480rpx;
    border-radius: 32rpx;
    background: linear-gradient(
      132deg,
      #c01c05 0%,
      #831707 52.08%,
      #4a1209 100%
    );
    box-shadow: 0px 8rpx 22rpx 0px rgba(0, 0, 0, 0.46);
    margin: 0 auto;
    padding: 24rpx 56rpx 42rpx 56rpx;

    .title {
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.5px;
    }

    .cards {
      display: flex;
      align-items: center;
      margin-top: 34rpx;

      .image1 {
        width: 72rpx;
        height: 72rpx;
        flex-shrink: 0;
      }

      .text {
        width: 74%;
        color: #fff;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -.5px;
        margin: 0 0 0 36rpx;
      }

      .image2 {
        width: 42rpx;
        height: 42rpx;
        background:#D9D9D9;
        border-radius: 50px;
        .image-btn {
          width: 30rpx;
          height: 30rpx ;
          background: linear-gradient(#FF2304,#3D0700);
          border-radius: 30rpx;
        }
      }
    }
  }

  .image4 {
    width: 414rpx;
    position: absolute;
    right: 0;
    bottom: -88rpx;
  }

  .image_mini {
    width: 314rpx;
    position: absolute;
    right: 0;
    bottom: -88rpx;
  }

  .next_btn {
    width: 672rpx;
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
    letter-spacing: -.5px;
    position: fixed;
    bottom: 0;
    margin: 0 auto;
    margin-bottom: 86rpx;
  }

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
</style>
