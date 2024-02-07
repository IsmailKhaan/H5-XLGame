<template>
  <view style="background: #FFF" class="withdrawal">
    <loading :isshow="isshow"></loading>
    <view id="navbar">
      <view class="fixed">
        <view class="icon-block f-c">
          <view class="image" @click="goback">
            <image
              src="../../static/zhnavbar/leftjt.png"
              mode="widthFix"
            ></image>
          </view>
        </view>
        <view class="title">{{ $t("settings.withdraw") }}</view>
      </view>
    </view>
    <view class="navlist">
      <view
        class="f-c"
        @click="navselectfun(1)"
        :class="{ active: $store.state.navselect == 1 }"
        >{{ $t("withdraw_view.withdrawal_money") }}
      </view>
      <view
        class="f-c"
        @click="navselectfun(2)"
        :class="{ active: $store.state.navselect == 2 }"
        >{{ $t("withdraw_view.withdrawal_status") }}
      </view>
    </view>

    <view style="margin-bottom: 60rpx" v-if="$store.state.navselect == 1">
      <view class="toptwo">
        <view>
          <view class="money">{{ $store.state.money }}</view>
          <view class="tip">
            <view>{{ $t("transfer_view.center_wallet") }}</view>
          </view>
        </view>
        <view>
          <view class="money">{{ lockBalance }}</view>
          <view class="tip">
            <view>{{ $t("transfer_view.lock_wallet") }}</view>
          </view>
        </view>
      </view>
      <view class="selectlist" style="margin-top: 58rpx;">
        <view
          class="contents"
          v-for="(item, index) in allBalance"
          :key="index"
          v-show="index != 0"
          :style="{ backgroundColor: getBackgroundColor(index) }"
        >
          <image
            :src="
              $store.state.iconUrl+
              $store.state.static.gameIcon[item.key]
            "
            mode="widthFix"
          ></image>
          <view class="G_Name">
            <div>{{ item.name }}</div>
            <span
              class="span_class"
              :style="{
                color: itemIsDigit(item.balance) ? 'white' : '#FF6C46',
              }"
              >{{ formatBalance(item.balance) }}</span
            >
          </view>
          <view class="amount">{{ item.balance }}</view>
        </view>
      </view>

     
      
      <view class="class_btns">
        <view class="topone f-c">
          <view class="yjbtn f-c" @click="turnIn">
            <text>{{ $t("settings.recovery_btn") }}</text>
          </view>
        </view>

        <navigator url="/pages/withdrawal/choosewithdrawmoney" class="next_btn f-c"
          >{{ $t("withdraw_view.withdrawal_money") }}
          <image
            src="../../static/transfer/Polygon.png"
            mode="widthFix"
          ></image>
        </navigator>
      </view>
    </view>
    <view v-if="$store.state.navselect == 2 && sorry">
      <view class="withdraw_progress">
        <view class="mark_icons f-s">
          <view class="main_cover">
            <view
              class="tit"
              :class="{
                tit_active: $store.state.progress == 0 || $store.state.progress,
              }"
            >
              {{ $store.state.allStatus.withdrawState[0] }}
            </view>
            <view class="image_m_1">
              <image
                v-show="$store.state.progress == 0 || $store.state.progress"
                src="../../static/transfer/mark.png"
                mode="widthFix"
              ></image>
            </view>
          </view>

          <image
            class="border_btw1"
            src="../../static/transfer/border.png"
            mode="widthFix"
          ></image>

          <view class="main_cover">
            <view
              class="tit"
              :class="{
                tit_active: $store.state.progress,
              }"
            >
              {{ $store.state.allStatus.withdrawState[1] }}
            </view>
            <view class="image_m_1">
              <image
                v-show="$store.state.progress"
                src="../../static/transfer/mark.png"
                mode="widthFix"
              ></image>
            </view>
          </view>

          <image
            class="border_btw2"
            src="../../static/transfer/border.png"
            mode="widthFix"
          ></image>

          <view class="main_cover">
            <view
              class="tit"
              :class="{
                tit_active: $store.state.progress && $store.state.progress != 1,
              }"
            >
              {{ $store.state.allStatus.withdrawState[3] }}
            </view>
            <view class="image_m_1">
              <image
                v-show="$store.state.progress && $store.state.progress != 1"
                src="../../static/transfer/mark.png"
                mode="widthFix"
              ></image>
            </view>
          </view>

          <image
            class="border_btw3"
            src="../../static/transfer/border.png"
            mode="widthFix"
          ></image>

          <view class="main_cover">
            <view
              v-if="$store.state.progress == 5"
              class="tit"
              :class="{ tit_active: $store.state.progress == 5 }"
            >
              {{ $store.state.allStatus.withdrawState[5] }}
            </view>
            <view
              v-else-if="$store.state.progress == 2"
              class="tit"
              :class="{ tit_active: $store.state.progress == 2 }"
            >
              {{ $store.state.allStatus.withdrawState[2] }}
            </view>
            <view
              v-else
              class="tit"
              :class="{ tit_active: $store.state.progress == 4 }"
            >
              {{ $store.state.allStatus.withdrawState[4] }}
            </view>

            <view class="image_m_1">
              <image
                v-if="
                  $store.state.progress == 4 &&
                  $store.state.progress != 2 &&
                  $store.state.progress != 5
                "
                src="../../static/transfer/mark.png"
                mode="widthFix"
              ></image>

              <image
                v-else-if="
                  $store.state.progress == 2 || $store.state.progress == 5
                "
                src="../../static/transfer/cross.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
        </view>

        <view v-if="$store.state.progress == 0 || $store.state.progress == 1">
          <view class="heading"> {{ $t("withdraw_view.almost_there") }}</view>
        </view>
        <view v-if="$store.state.progress == 4">
          <view class="heading">
            {{ $store.state.allStatus.withdrawState[4] }}</view
          >
        </view>

        <view v-if="$store.state.progress == 2">
          <view class="heading"
            >{{ $store.state.allStatus.withdrawState[2] }}
          </view>
        </view>

        <view v-if="$store.state.progress == 5">
          <view class="heading"
            >{{ $store.state.allStatus.withdrawState[5] }}
          </view>
        </view>

        <view v-if="$store.state.progress == 3">
          <view class="heading"
            >{{ $store.state.allStatus.withdrawState[3] }}
          </view>
        </view>

        <image
          style="width: 410rpx; height: 358rpx; margin: 72rpx 92rpx 0 212rpx"
          class="progress_images f-c"
          v-show="$store.state.progress == 0"
          src="../../static/transfer/progress_L0.png"
          mode="widthFix"
        ></image>
        <image
          style="
            width: 358rpx;
            height: 268rpx !important;
            margin: 72rpx 138rpx 0 218rpx;
          "
          class="progress_images f-c"
          v-show="$store.state.progress == 1"
          src="../../static/transfer/progress_L1.png"
          mode="widthFix"
        ></image>
        <image
          class="progress_images f-c"
          v-show="$store.state.progress == 3"
          src="../../static/transfer/progress_L3.png"
          mode="widthFix"
        ></image>
        <image
          class="progress_images f-c"
          v-show="$store.state.progress == 4"
          src="../../static/transfer/progress_L4.png"
          mode="widthFix"
        ></image>
        <image
          class="progress_images f-c"
          v-show="$store.state.progress == 2"
          src="../../static/transfer/progress_L2.png"
          mode="widthFix"
        ></image>
        <image
          class="progress_images f-c"
          v-show="$store.state.progress == 5"
          src="../../static/transfer/progress_L5.png"
          mode="widthFix"
        ></image>
        <view @click="support" class="text_support reminder">
          {{ $t("withdraw_view.withdraw_help") }}
          <span>{{ $t("withdraw_view.customer_support") }}</span>
        </view>
      </view>
    </view>

    <view v-if="$store.state.navselect == 2 && !sorry">
      <image
        class="cka"
        src="../../static/transfer/sorry.png"
        mode="widthFix"
      ></image>
    </view>
  </view>
</template>

<script>
import state from "@/store/state";
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      sorry: false,
      timeDifference: null,
      milliseconds: null,
      card: false,
      isshow: 0,
      navtitle: "Withdraw",
      lockBalance: 0,
      show: false,
      allBalance: {
        0: {
          platformName: "中心钱包",
          uniqueCode: 0,
          balance: 0,
        },
      },
    };
  },
  computed: {
    timeConverted() {
      return this.millisecondsToMinutesAndSeconds(this.milliseconds);
    },
  },
  beforeDestroy() {
    clearInterval(this.timeUpdateInterval);
  },

  onLoad() {
    let _this = this;
    _this.isshow = 1;
    setTimeout(function () {
      _this.isshow = 0;
    }, 1000);
    this.$logins();
    this.getLockBalance();
    this.getmall();
    this.checkStatus();
    this.$bankApi();
  },
  methods: {
    support() {
      uni.navigateTo({
        url: "../service/serviceDtl",
      });
    },
    checkStatus() {
      let url = this.$globalApi.checkorderStatus;
      this.$res.postRequest(url).then((res) => {
        // console.log(res, "checkorderStatus1 ");
        if (res.data.code == 0) {
          const currentTime = new Date();
          const difference = currentTime - res.data.data.createTime;
          this.milliseconds = difference;
          this.sorry = true;
          state.progress = res.data.data.orderState;
          // state.progress = 5;
          uni.setStorageSync("checkstat_us", res.data.data.orderState);
         // console.log(res.data.data, "checkorderStatus2 ");
        } else if ((res.data.code = 11038)) {
          this.sorry = false;
          return;
        }
      });
    },
    millisecondsToMinutesAndSeconds(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return { minutes, seconds };
    },
    //////////////////////GO BACK FUNCTION//////////////
    goback() {
      if (this.url) {
        uni.reLaunch({
          url: this.url,
        });
        return;
      } else {
        uni.navigateTo({
          url: "/pages/home/home",
        });
      }
    },
    ///////////////////getBackgroundColor//////////
    getBackgroundColor(index) {
      if (index % 2 === 0) {
        return "#003B3D";
      } else {
        return "#647182";
      }
    },
    ///////////////formatBalance///////////////////
    formatBalance(balance) {
      return isNaN(balance) ? balance : "...";
    },
    ////////////////////itemIsDigit/////////////////
    itemIsDigit(balance) {
      return !isNaN(balance);
    },
    //////////////////////Select Nav///////////////
    navselectfun(e) {
      this.$store.state.navselect = e;
      if (e == 2) {
        this.checkStatus();
      }
    },
    ///////////////////////////////////////////////
    async getmall() {
      let _this = this;
      _this.$money();
      _this.allBalance = await _this.$store.dispatch("gameMoney"); //gamelist - money
      let balanceStat = uni.getStorageSync("status").balanceStatus;
      _this.allBalance.forEach((element) => {
        if (element.bstatus != 0) {
          element.balance = balanceStat[element.bstatus];
        }
      });
    },
    ///////////////////LOck Balance/////////////////
    getLockBalance() {
      let _this = this;
      let url = _this.$globalApi.getLockBalance;
      this.$res.postRequest(url).then((res) => {
        //console.log(res.data.data.lockBalance);
        if (res.data.code == 0) {
          this.lockBalance = res.data.data.lockBalance;
        } else {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        }
      });
    },
    ////////////////////TURN IN/////////////////
    turnIn() {
      let _this = this;
      let url = _this.$globalApi.allBack;
      uni.showToast({
        title: "请稍等..",
        icon: "none",
      });
      this.$res.postRequest(url).then((res) => {
        console.log(res);
        uni.showToast({
          title: state.codes[res.data.code],
          icon: "none",
        });
        this.getmall();
      });
    },
  },
};
</script>

<style lang="scss">
uni-page-body {
  background: #FFF !important;
}

.withdrawal {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 0px 0 50px 0;
  height: 100%;

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
      background: #FFF;
      background-size: 100% 100%;
      .icon-block {
        position: absolute;
        left: 10rpx;
        top: 0rpx;
        width: 100rpx;
        height: 100rpx;
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

  .next_btn {
    width: 394rpx;
    height: 88rpx;
    border-radius: 14rpx;
    background: #003B3D;
    box-shadow: 8rpx 8rpx 20rpx 0rpx rgba(0, 0, 0, 0.31);
    color: #fff;
    font-family: Microsoft YaHei UI;
    font-size: 32rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin:0 0 0 33rpx;

    image {
      margin-left: 20rpx;
      width: 56rpx;
      height: 50rpx;
    }
  }

  .navlist {
    background: url("../../static/transfer/nav_bg.png") no-repeat;
    background-size: 100% 100%;
    width: 636rpx;
    height: 68rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    // top: 62px;
    // position: fixed;

    > view {
      width: 50%;
      height: 100%;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.1rpx;
    }

    > view.active {
      width: 306rpx;
      height: 60rpx;
      border-radius: 108rpx;
      background: #fff;
      color: #008D91;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.1rpx;
    }
  }

  .topone {
    height: 88rpx;
    box-sizing: border-box;
    margin:  0 33rpx 0 0 ;

    .yjbtn {
      width: 214rpx;
      height: 88rpx;
      border-radius: 14rpx;
      background: #003B3D;
      box-shadow: 8rpx 8rpx 20rpx 0rpx rgba(0, 0, 0, 0.31);
      text {
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 26.5rpx;
        letter-spacing: -0.1rpx;
      }
    }
  }

  .toptwo {
    padding: 0 60rpx 0 60rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 100rpx 0 46rpx 0;
    box-sizing: border-box;
    border-bottom: 2rpx solid #003B3D;

    > view {
      width: 100%;
      text-align: center;
      height: 100rpx;
      position: relative;

      .money {
        margin-top: 6rpx;
        color: #008D91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 40rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: -0.1rpx;
      }

      .tip {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        view {
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          /* 166.667% */
          letter-spacing: -0.1rpx;
        }
      }
    }

    > view:nth-child(1)::before {
      content: "";
      display: block;
      width: 2rpx;
      height: 100%;
      background: #003B3D;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

.withdraw_progress {
  margin: 44rpx 18rpx 0 18rpx;
  width: 714rpx;
  height: auto;
  border-radius: 40rpx;
  background: #ffffff;
  box-shadow: 0rpx 54rpx 70rpx -54rpx rgba(0, 0, 0, 0.42);

  .mark_icons {
    padding: 24rpx 32rpx 0 32rpx;

    .main_cover {
      //width: 138rpx;

      .tit {
        color: #003B3D;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 34rpx;
        letter-spacing: -0.1rpx !important;
        width: 172rpx;
        padding: 10rpx 0;
      }

      .tit_active {
        color: #008D91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 34rpx;
        /* 141.667% */
        letter-spacing: -0.1rpx;
      }

      .image_m_1 {
        background: url("../../static/transfer/mark_empty.png") no-repeat;
        background-size: 100% 100%;
        width: 64rpx;
        height: 64rpx;
        display: flex;
        justify-content: center;
        margin: 0 auto;

        image {
          width: 64rpx;
          height: 64rpx;
        }
      }
    }

    .border_btw1 {
      position: absolute;
      width: 100rpx;
      margin: 56rpx 0rpx 0rpx 124rpx;
    }

    .border_btw2 {
      position: absolute;
      width: 100rpx;
      margin: 56rpx 0rpx 0rpx 296rpx;
    }

    .border_btw3 {
      width: 100rpx;
      position: absolute;
      width: 100rpx;
      margin: 56rpx 0rpx 0rpx 466rpx;
    }
  }

  .heading {
    margin-top: 42rpx;
    color: #003B3D;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 32rpx;
    font-style: normal;
    font-weight: 700;
    line-height: 30rpx;
    letter-spacing: -0.1rpx;
  }

  .progress_images {
    width: 412rpx;
    height: 400rpx;
    margin: 0 auto;
    margin-top: 72rpx;
  }

  .reminder {
    padding-top: 124rpx;
    padding-bottom: 60rpx;
    color: #003B3D;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 30rpx;
    letter-spacing: -0.1rpx;
    margin: 0 46rpx;
  }
}

.cka {
  width: 412rpx;
  margin: 454rpx auto;
}

.goods-carts {
  padding-top: 86rpx;
  padding-bottom: 294rpx;

  .my-button2 {
    width: 306rpx;
    height: 74rpx;
    border-radius: 22rpx;
    background: #9f9f9f;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 30rpx;
    letter-spacing: -0.1rpx;
  }

  .final_buttons {
    .my-button3 {
      width: 306rpx;
      height: 74rpx;
      border-radius: 22rpx;
      background: #9f9f9f;
      margin: 0 auto;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.1rpx;
    }

    .my-button4 {
      width: 306rpx;
      height: 74rpx;
      border-radius: 22rpx;
      background: #008D91;
      margin: 0 auto;
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
}

.text_support {
  margin-top: 56rpx;
  color: #003B3D;
  text-align: center;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 30rpx;
  letter-spacing: -0.1rpx;

  span {
    margin-left: 10rpx;
    color: #4272f2;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 700;
    line-height: 30rpx;
    letter-spacing: -0.1rpx;
    border-bottom: 4rpx solid #4272f2;
  }
}

.position_fixed {
  padding: 0 7%;
  padding-top: 230rpx;
  width: 100%;
  bottom: 19px;
  position: fixed;

  .outter {
    display: flex;
    position: relative;
    width: 100%;

    .border_bottom {
      width: 202rpx;
      height: 0rpx;
      border: 4rpx solid #000000;
      border-radius: 100rpx;
      //   margin: 50rpx 240rpx 38rpx 240rpx;
    }
  }

}
.class_btns{
  display: flex;
  //justify-content: space-around;
  align-items: center;
  padding: 86rpx 38rpx 0 38rpx;
}
</style>
