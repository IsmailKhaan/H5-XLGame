<template>
  <view class="wallet set-bg">
    <zhnavbar :title="$t('settings.my_purse')" :lefticon="true"></zhnavbar>

    <view class="card_box">
      <view class="amount">
        {{ allBalance[0].balance }} <text>¥</text>
      </view>
      <view class="total_amount">{{ $t('my_purse_view.total_amount') }}</view>
      <view class="deposit_and_recovery f-c">
        <view class="to_deposit f-c"  @tap.stop="deposit">{{ $t('my_purse_view.to_deposit') }}</view>
        <view class="one_click_recpvery f-c"  @click="turnIn">
          <image src="../../static/transfer/refresh.png" mode="widthFix"></image>
          <view class="one_click">{{ $t('settings.recovery_btn') }}</view>
        </view>
      </view>
    </view>

    <view class="selectlist">
      <view class="contents" v-for="(item, index) in allBalance" :key="index" v-if="index != 0"
        :style="{ backgroundColor: getBackgroundColor(index) }" >
        <div class="f-s">
          <image  :src="$store.state.iconUrl + $store.state.static.gameIcon[item.key]" mode="widthFix"></image>
          <view class="G_Name"><span>{{ item.name }}</span> 
            <span class="span_class"
            :style="{ color: itemIsDigit(item.balance) ? 'white' : '#FF6C46' }">
            {{ formatBalance(item.balance)}}
            </span>
          </view>
        </div>
        
        <view class="amount">{{ item.balance }}</view>
      </view>
    </view>
    <loading :isshow="isshow"></loading>
  </view>
</template>

<script>
import RequestSender from "@/common/js/request.js";
import { mapState, mapMutations, mapAction } from "vuex";
import zhnavbar from "@/components/zh-navbar/zh-navbar.vue";
import state from '@/store/state';
import { localizationMixin } from '../../common/js/localization';
export default {
  mixins: [localizationMixin],
  data() {
    return {
      info: "",
      infoType: "",
      infoMsg: "",
      empty: false,
      attr: true,
      lockBalance: 0,
      hasVC: "",
      allBalance: [{ balance: "" }],
   //   navtitle: "My Purse",
      isshow: 0,
    };
  },
  computed: {
    ...mapState({
      userName: (state) => state.currentUser,
      userAccount: (state) => state.userAccount,
      gameAccount: (state) => state.gameAccount,
      json: (state) => state.json,
    }),
    userName() {
      return this.$store.state.currentUser;
    },
    userAccount() {
      return this.$store.state.userAccount;
    },
    gameAccount() {
      return this.$store.state.gameAccount;
    },
    json() {
      return this.$store.state.json;
    },
  },
  components: {
    zhnavbar,
  },
  async onLoad() {
    this.$logins();
    // if (this.json.state1) {
    //   uni.redirectTo({
    //     url: "/pages/uphold/uphold",
    //   });
    // }
    this.getda();
  },

  methods: {
    getBackgroundColor(index) {
      if (index % 2 === 0) {
        return '#003B3D';
      } else {
        return '#647182';
      }
    },
    formatBalance(balance) {
      return isNaN(balance) ? balance : '...';
    },
    itemIsDigit(balance) {
      return !isNaN(balance);
    },
    
    async getda() {
      this.isshow = 1;
      let _this = this;
      let balancestats = uni.getStorageSync("status").balanceStatus;

      _this.allBalance = await _this.$store.dispatch("gameMoney");
      _this.allBalance.forEach(element => {
        if (element.bstatus != 0) {
          element.balance = balancestats[element.bstatus];
        }
      });
      // let url1 = _this.$globalApi.getAllBalance;
      // RequestSender.postRequest(url1).then((res) => {
      //   console.log(res);
      //   if (res.data.code == 0) {
      //     _this.allBalance = res.data.data.allBalance;
      //   } else {
      //     uni.showToast({
      //       title: state.codes[res.data.code],
      //       icon: "none",
      //     });
      //   }
      //   if (res.data.code == 9999) {
      //     uni.navigateTo({
      //       url: "/pages/login/login",
      //     });
      //   }
      // });
      this.isshow = 0;
    },
    show() {
      this.attr = !this.attr;
    },
    hidden() {
      this.attr = false;
    },
    getLockBalance() {
      let url = this.$globalApi.lockBalance;
      RequestSender.postRequest(url).then((res) => {
        this.lockBalance = res.data.lockBalance;
      });
    },
    //一键回收
    turnIn(code) {
      let _this = this;
      let url = _this.$globalApi.allBack;
      RequestSender.postRequest(url).then((res) => {
        console.log(res);
        uni.showToast({
          title: state.codes[res.data.code],
          icon: "none",
        });
        this.getda();
      });
    },
    transfer() {
      uni.navigateTo({
        url: "/pages/transfer/transfer",
      });
    },
    withdrawal() {
      uni.navigateTo({
        url: "/pages/withdrawal/withdrawal",
      });
    },
    bankCard() {
      uni.navigateTo({
        url: "/pages/cardManage/cardManageLi",
      });
    },
    deposit() {
      uni.navigateTo({
        url: "/pages/deposit/deposit",
      });
    },
  },
};
</script>

<style lang="scss">
.wallet {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty {
    align-items: center;
    width: 100%;
    justify-content: center;
    padding: 20rpx;
    box-sizing: border-box;
    color: #999999;

    .empty-img {
      width: 80%;
      padding: 20rpx;
      box-sizing: border-box;
    }
  }

  .container {
    width: 690rpx;
    // padding-bottom: 30rpx;
    overflow: hidden;
    padding-left: 30rpx;
    background-color: #ffffff;
    border-bottom-left-radius: 30rpx;
    border-bottom-right-radius: 30rpx;
  }

  .card_box {
    z-index: 2;
    width: 674rpx;
    height: 340rpx;
    border-radius: 40rpx;
    background: #E9E9E9;
    box-shadow: 4rpx 4rpx 30rpx 0rpx rgba(0, 0, 0, 0.25);
    margin: 30rpx 0 30rpx 0;

    .amount {
      padding: 26rpx 0 0 50rpx;
      color: #008D91;
      text-align: left;
      font-family: Microsoft YaHei UI;
      font-size: 60rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 124.10rpx;
      letter-spacing: 4rpx;

      text {
        color: #003B3D;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 48rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 124.10rpx;
        letter-spacing: 4rpx;
      }
    }

    .total_amount {
      padding: 0 0 0 62rpx;
      margin-top: -14rpx;
      color: #003B3D;
      text-align: left;
      font-family: Microsoft YaHei UI;
      font-size: 36rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30.10rpx;
    }

    .deposit_and_recovery {
      padding: 54rpx 0 0 0;
      .to_deposit {
        width: 194rpx;
        height: 62rpx;
        border-radius: 100rpx;
        background: #008D91;
        box-shadow: 4rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.25);
        color: #FFF;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30.10rpx;
        margin-right: 10rpx;
      }

      .one_click_recpvery {
        margin-left: 10rpx;
        width: 286rpx;
        height: 62rpx;
        border-radius: 100rpx;
        background: #008D91;
        box-shadow: 4rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.25);

        image {
          width: 30rpx;
          height: 24rpx;
        }

        .one_click {
          color: #FFF;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          letter-spacing: -0.10rpx;
          margin-left: 10rpx;
        }
      }
    }
  }

  .selectlist {
    .contents {
      justify-content: space-between;
      .amount {
        width: 200rpx;
        color: #FFF;
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }



  }


  .dtl-btn {
    width: 690rpx;
    height: 122rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    .tit {
      color: #404261;
      font-size: 36rpx;
      font-family: Microsoft YaHei UI;
    }

    .flex-row {
      color: #3783ff;
      align-items: center;
      height: 30rpx;
      line-height: 30rpx;
      font-size: 24rpx;
      font-family: Microsoft YaHei UI;

      .add {
        margin-left: 10rpx;
        justify-content: center;

        .icon {
          width: 28rpx;
          height: 28rpx;
        }
      }
    }
  }

  // 顶部三个钱包的样式
  .topWallet {
    display: flex;
    width: 100%;
    background-color: #fff;
    padding: 30rpx 0 30rpx 0;
    box-sizing: border-box;

    .wallet-col {
      flex: 1;
      padding: 0 22rpx 0 10rpx;
      flex-wrap: wrap;
      justify-content: center;
      border-left: 2rpx solid #f1f2f8;

      // 第一个钱包没有边框线
      &:nth-child(1) {
        border: none;
      }

      .walletImg {
        float: left;
        width: 39.22rpx;
        height: 36rpx;
        margin-right: 14rpx;
      }

      // .walletText {
      // 	float: right;
      // 	// position: relative;
      // 	// top: 20rpx;
      // 	height: 120rpx;
      .walletName {
        font-size: 28rpx;
        color: #404261;
        font-family: Microsoft YaHei UI;
      }

      .walletMoney {
        width: 100%;
        font-size: 56rpx;
        text-align: center;
        color: #f86c3b;
        font-family: Config;
        line-height: 1.4;
        overflow: hidden;
        inline-size: 266rpx;
      }

      // }
    }
  }

  // 下方详情钱包样式
  .btmWallet {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    z-index: 2;
    box-sizing: border-box;
    padding-top: 30rpx;

    .btmWallet-col {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 144rpx;
      border: 2rpx solid #f1f2f8;
      margin: 0 20rpx 20rpx 0;
      border-radius: 20rpx;
      padding: 10rpx 0;

      .walletName {
        flex: 100%;
        text-align: center;
        font-size: 24rpx;
        font-family: Microsoft YaHei UI;
        color: #404261 !important;
      }

      .money {
        flex: 100%;
        font-size: 24rpx;
        text-align: center;
        color: #b2bdde;
      }
    }
  }

  .more {
    width: 50rpx;
    justify-content: center;

    .walletName {
      color: #d2d2d2 !important;
    }

    .xl {
      width: 22rpx;
      height: 22rpx;
    }
  }


  .tips {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 400rpx;
    // width: 100%;
    // height: 100%;
    // background: rgba($color: #000000, $alpha: 0.5);
    height: auto;
    justify-content: center;
    // background: #FFFFFF;
    border-radius: 10rpx;
    z-index: 999;

    .tips-msg {
      max-width: 400rpx;
      color: #ffffff;
      background: rgba($color: #000000, $alpha: 0.5);
      // color: #000000;
      // background: #FFFFFF;
      padding: 20rpx;
      border-radius: 10rpx;
    }
  }

  .main_max {
    position: relative;
    width: 690rpx;
    //background-color: rgba(255, 255, 255, 0.9);
    background-color: #ffffff;
    border-radius: 30rpx;
    z-index: 2;
    box-sizing: border-box;
    margin-bottom: 100rpx;
    box-shadow: 0 6rpx 6rpx 0 rgba(108, 123, 168, 0.1);
    overflow: hidden;

    .border_line_x_axis {
      border-bottom: 2rpx solid #f1f2f8;
      margin: 0 30rpx 0 0;
    }
  }


  .ybtn {
    width: 400rpx;
    height: 90rpx;
    margin: 20rpx auto 40rpx auto;
  }
}
</style>
