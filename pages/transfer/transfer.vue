<template>
  <view class="transfer set-bg">
    <zhnavbar :title="$t('settings.transfer')" :lefticon="lefticon"></zhnavbar>
    <view class="main">
      <view class="navlist">
        <view
          class="f-c"
          @click="navselectfun(1)"
          :class="{ active: navselect == 1 }"
          >{{ $t("transfer_view.wallet") }}
        </view>
        <view
          class="f-c"
          @click="navselectfun(2)"
          :class="{ active: navselect == 2 }"
          >{{ $t("settings.transfer") }}
        </view>
      </view>

      <view class="vieweone" v-if="navselect == 1">
        <view class="toptwo">
          <view>
            <view class="tip">
              <view>{{ $t("transfer_view.center_wallet") }}</view>
            </view>
            <view class="money">¥{{ NewestBalance }}</view>
          </view>
          <view>
            <view class="tip">
              <view>{{ $t("transfer_view.lock_wallet") }}</view>
            </view>
            <view class="money">¥{{ lockBalance }}</view>
          </view>
        </view>
        <view class="topone f-c">
          <view class="yjbtn f-c" @click="yjallBack">
            <image
              src="../../static/transfer/refresh.png"
              mode="widthFix"
            ></image>
            <text>{{ $t("settings.recovery_btn") }}</text>
          </view>
        </view>

        <view class="selectlist">
          <view
            class="contents"
            v-for="(item, index) in allBalance"
            :key="index"
            v-show="index != 0"
          >
            <image
              :src="
                $store.state.iconUrl + $store.state.static.gameIcon[item.key]
              "
              mode="widthFix"
            ></image>
            <view class="G_Name">
              <span>{{ item.name }}</span>
              <span
                class="span_class"
                :style="{
                  color: itemIsDigit(item.balance) ? '#003B3D' : '#FF6C46',
                }"
                >{{ formatBalance(item.balance) }}
              </span>
            </view>
            <view class="amount">{{ item.balance }}</view>
          </view>
        </view>

        <view class="bottom_content f-s">
          <view class="text_cont">
            <view class="amount_transfer">{{
              $t("transfer_view.amount_transfer")
            }}</view>
            <view class="details">{{ $t("transfer_view.automatically") }}</view>
          </view>
          <view class="switch">
            <switch color="#008D91" :checked="checked" @change="checkedZr" />
          </view>
        </view>
      </view>

      <view class="viewtwo" v-if="navselect == 2">
        <view class="moneyzh">
          <picker
            v-if="allBalance1"
            @change="colorChange"
            :value="colorIndex"
            :range="allBalance1"
            range-key="name"
          >
            <view class="money" v-if="qhqbtype == 1">
              <view class="txt">
                {{ allBalance1[colorIndex].name }}
              </view>
              <view class="moneytxt">
                <text>¥ {{ allBalance1[colorIndex].balance }}</text>
              </view>
            </view>
          </picker>

          <view class="icon" @click="moneyqiehuan">
            <image
              src="../../static/transfer/arrow.png"
              mode="widthFix"
            ></image>
          </view>
          <picker
            v-if="allBalance1"
            @change="colorChange1"
            :value="colorIndex1"
            :range="allBalance1"
            range-key="name"
          >
            <view class="money" v-if="qhqbtype == 1">
              <view class="txt">
                {{ allBalance1[colorIndex1].name }}
              </view>
              <view class="moneytxt">
                <text
                  >{{
                    typeof allBalance1[colorIndex1].balance !== "string"
                      ? "¥ "
                      : ""
                  }}{{ allBalance1[colorIndex1].balance }}</text
                >
              </view>
            </view>
          </picker>
        </view>
        <view class="duihuan">
          <view class="input_container">
            <view class="title">{{ $t("transfer_view.exchange_amount") }}</view>
            <view class="viewthree">
              <view class="leftside">
                <view class="input f-c">
                  <view class="dollar_s">¥</view>
                  <input
                    type="text"
                    placeholder="00.00"
                    :value="money"
                    @blur="moneyok"
                  />
                </view>
                <view class="texts">
                  {{ $t("transfer_view.enter_amount_RMB") }}
                </view>
              </view>
              <view class="btns f-c" @click="moneyMs(qhqbtype)">
                {{ $t("transfer_view.add_total") }}
              </view>
            </view>
          </view>
          <view class="btn f-c" @click="ljdh"
            >{{ $t("transfer_view.redeem_immediately") }}
          </view>
        </view>
      </view>
      <view class="goods-carts">
        <view class="my-button2"></view>
      </view>
    </view>

    <loading :isshow="isshow"></loading>
  </view>
</template>

<script>
//   import this.$res from "@/common/js/request.js";
import zhnavbar from "@/components/zh-navbar/zh-navbar.vue";
import state from "@/store/state";

import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      isshow: 0,
      navselect: 1, //1转账，2兑换
      qhqbtype: 1,
      centerqb: {
        money: "",
        txt: "中心钱包",
        id: 1,
      },
      checked: true, //1开启
      colorIndex: 0,
      colorIndex1: 1,
      //navtitle: "Transfer",
      lefticon: true,
      allBalance1: [],
      money: "",
      lockBalance: 0,
      NewestBalance: 0,
      allBalance: [], //game-list
    };
  },
  computed: {},
  components: {
    zhnavbar,
  },
  onShow() {},
  onLoad() {
    this.$logins();
    this.getmon();
    //获取免转状态
    this.checked = state.user.freeTransfer == 0 ? true : false;
  },
  methods: {
    getBackgroundColor(index) {
      if (index % 2 === 0) {
        return "#003B3D";
      } else {
        return "#647182";
      }
    },
    formatBalance(balance) {
      return isNaN(balance) ? balance : "...";
    },
    itemIsDigit(balance) {
      return !isNaN(balance);
    },
    async gameFx() {
      let that = this;
      let balancestats = uni.getStorageSync("status").balanceStatus;
      that.allBalance = await that.$store.dispatch("gameMoney");
      console.log(that.allBalance, "allBalance");
      that.allBalance1 = this.allBalance;
      that.NewestBalance = this.allBalance[0].balance; //money
      state.money = this.NewestBalance;
      console.log(state.money, "state.money");
      that.allBalance.forEach((element) => {
        if (element.bstatus != 0) {
          element.balance = balancestats[element.bstatus];
        }
      });
    },
    getmon() {
      //this.getmall();  //money
      this.gameFx(); //game-list
      this.getLockBalance(); //locking-money
    },
    colorChange(e) {
      //console.log(e);
      //console.log(this.allBalance1[e.detail.value]);
      let _this = this;
      _this.colorIndex = e.detail.value;
    },
    colorChange1(e) {
      console.log(e);
      let _this = this;
      _this.colorIndex1 = e.detail.value;
    },
    navselectfun(e) {
      this.navselect = e;
    },
    moneyqiehuan() {
      let a = this.colorIndex;
      let b = this.colorIndex1;
      this.colorIndex1 = a;
      this.colorIndex = b;
    },
    getmall() {
      let _this = this;
      let url = _this.$globalApi.getNewestBalance;
      let data = {
        uniqueCode: 0,
      };
      _this.$res.postRequest(url, data).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.NewestBalance = res.data.data.newestBalance;
        } else {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        }
      });
    },
    moneyok(e) {
      let _this = this;
      _this.money = e.detail.value;
    },
    moneyMs(e) {
      let _this = this;
      if (e == 1) {
        _this.money = _this.allBalance1[this.colorIndex].balance;
      } else {
        _this.money = _this.allBalance1[this.colorIndex1].balance;
      }
    },
    ljdh() {
      this.gameBalanceTransfer();
    },
    //转账
    gameBalanceTransfer() {
      let _this = this;

      if (_this.money == "") {
        uni.showToast({
          title: this.$t("errors.no_money"),
          icon: "none",
        });
        return;
      }
      let url = _this.$globalApi.gameBalanceTransfer;
      let datas = {
        transferAmount: this.money,
        inUniqueCode: this.allBalance1[this.colorIndex1].key, //转入
        outUniqueCode: this.allBalance1[this.colorIndex].key, //转出
      };
      _this.$res.postRequest(url, datas).then((res) => {
        this.gameFx();
        this.money = "";
        uni.showToast({
          title: state.codes[res.data.code],
          icon: "none",
        });
      });
    },
    checkedZr() {
      console.log(this.checked);
      this.checked = !this.checked;
      let id = {
        freeTransfer: this.checked ? 0 : 1,
      };
      this.$res.postRequest(this.$globalApi.auto, id).then((res) => {
        // console.log(res,"resssss")
        if (res.data.code == 0) {
          state.user.freeTransfer = id.freeTransfer;
          uni.setStorage({
            key: "memberInfo",
            data: state.user,
          });
        }
        uni.showToast({
          title: state.codes[res.data.code],
          icon: "none",
        });
      });
      //this.gameBalanceoneKey();
    },
    gameBalanceoneKey() {
      let _this = this;
      let url = _this.$globalApi.oneKey;
      let datas = {
        uniqueCode: this.allBalance1[this.colorIndex1].key, //转入
      };
      _this.$res.postRequest(url, datas).then((res) => {
        this.getmon();
        uni.showToast({
          title: state.codes[res.data.code],
          icon: "none",
        });
      });
    },
    //客服
    kefC() {
      uni.navigateTo({
        url: "/pages/service/serviceDtl",
      });
    },
    getLockBalance() {
      let _this = this;
      _this.isshow = 1;
      let url = _this.$globalApi.getLockBalance;
      _this.$res.postRequest(url).then((res) => {
        console.log(res.data.data.lockBalance, "lockBalance");
        if (res.data.code == 0) {
          this.isshow = 0;
          this.LockBalance = res.data.data.lockBalance;
        } else {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        }
      });
    },
    yjallBack() {
      let _this = this;
      let url = _this.$globalApi.allBack;
      _this.$res.postRequest(url).then((res) => {
        console.log(res);
        this.getmon();
        uni.showToast({
          title: state.codes[res.data.code],
          icon: "none",
        });
      });
    },
  },
};
</script>

<style lang="scss">
.main {
  width: 100%;
  //min-height: 100vh;
  padding-top: 30rpx;

  .navlist {
    width: 636rpx;
    height: 68rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    > view {
      width: 50%;
      height: 100%;
      color: #008d91;
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
      height: 56rpx;
      border-radius: 108rpx;
      color: #fff;
      background: #008d91;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.1rpx;
    }
  }

  .vieweone {
    width: 100%;

    .topone {
      background: #fff;
      height: 106rpx;
      box-sizing: border-box;

      .yjbtn {
        width: 366rpx;
        height: 66rpx;
        border-radius: 20rpx;
        background: #003b3d;

        image {
          display: block;
          width: 30rpx;
          height: 24rpx;
          border-radius: 50rpx;
        }

        text {
          margin-left: 10rpx;
          color: #fff;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          letter-spacing: -0.1rpx;
        }
      }
    }

    .toptwo {
      display: flex;
      background: #fff;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 46rpx 0;
      box-sizing: border-box;
      //border-bottom: 1px solid #003B3D;

      > view {
        width: 100%;
        text-align: center;
        height: 100rpx;
        position: relative;

        .money {
          margin-top: 32rpx;
          color: #008d91;
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
            color: #003b3d;
            text-align: center;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 700;
            line-height: 40rpx;
            /* 166.667% */
            letter-spacing: -0.1rpx;
          }
        }
      }

      > view:nth-child(1)::before {
        content: "";
        display: block;
        width: 4rpx;
        height: 100%;
        background: #1E1E1E;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }

  .bottom_content {
    padding: 60rpx 64rpx 120rpx 56rpx;

    .text_cont {
      .amount_transfer {
        color: #003b3d;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -0.1rpx;
      }

      .details {
        color: #003b3d;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
        letter-spacing: -0.1rpx;
      }
    }

    .switch {
      transform: scale(0.7);
      width: 72rpx;
      height: 42.546rpx;
    }
  }

  .zdzz {
    box-shadow: 0 10rpx 5rpx 0 rgba(233, 236, 245, 0.8);
    background: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    height: 100rpx;
    box-sizing: border-box;

    > view:nth-child(1) {
      color: #404261;
      font-size: 30rpx;
    }

    > view:nth-child(2) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      view {
        font-size: 26rpx;
        color: #b2bdde;
        margin-right: 10rpx;
      }

      switch {
        transform: scale(0.7);
      }
    }
  }

  .viewtwo {
    width: 100%;

    .moneyzh {
      background: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 30rpx 0;

      .money {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30rpx 0 40rpx;
        box-sizing: border-box;

        .moneytxt {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          height: 60rpx;
          justify-content: center;
          width: 250rpx;
          margin: 0 auto;
          text-align: center;
          color: #008d91;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 40rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          margin-top: 32rpx;
          /* 100% */
          letter-spacing: -0.1rpx !important;

          image {
            width: 20rpx;
            height: 25rpx;
            display: block;
            margin-right: 15rpx;
          }

          text {
            //   color: #f86c3b;
            //  font-size: 40rpx;
          }
        }

        .txt {
          color: #003b3d;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          letter-spacing: -0.1rpx;
        }
      }

      .icon {
        width: 60rpx;
        height: 60rpx;

        image {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

    .duihuan {
      width: 100%;
      height: 490rpx;
      background: #fff;
      border-radius: 40rpx;
      box-shadow: 0rpx 0rpx 40rpx 0rpx rgba(0, 0, 0, 0.57);
      .input_container {
        padding: 74rpx 24rpx 0 68rpx;

        .title {
          color: #003b3d;
          font-family: Microsoft YaHei UI;
          font-size: 40rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          /* 100% */
          letter-spacing: -0.1rpx;
        }

        .viewthree {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;

          .leftside {
            margin-top: 44rpx;
            image {
              width: 24rpx;
              height: 30rpx;
              display: block;
            }

            .input {
              width: 450rpx;
              height: 5%;

              .dollar_s {
                color: #003b3d;
                font-family: Microsoft YaHei UI;
                font-size: 32rpx;
                font-style: normal;
                font-weight: 700;
                line-height: 40rpx;
                letter-spacing: -0.1rpx;
              }

              .uni-input-placeholder {
                color: #008d91;
                font-family: Microsoft YaHei UI;
                font-size: 24rpx;
                font-style: normal;
                font-weight: 400;
                line-height: 40rpx;
                letter-spacing: -0.1rpx;
                margin-left: 10rpx;
              }

              input {
                border-bottom: 2rpx solid #008d91;
                margin-left: 14rpx;
                height: 40rpx;
                width: 100%;
                color: #008d91;
                font-family: Microsoft YaHei UI;
                font-size: 24rpx;
                font-style: normal;
                font-weight: 400;
                line-height: 40rpx;
                letter-spacing: -0.1rpx;
                /deep/.uni-input-input {
                  width: 430rpx;
                  height: 100%;
                  color: #008d91;
                  font-family: Microsoft YaHei UI;
                  font-size: 32rpx;
                  font-style: normal;
                  font-weight: 400;
                  line-height: normal;
                  margin-left: 10rpx;
                  margin-bottom: 0rpx;
                }
              }
            }
            .texts {
              color: #003b3d;
              font-family: Microsoft YaHei UI;
              font-size: 24rpx;
              font-style: normal;
              font-weight: 400;
              line-height: 40rpx;
              letter-spacing: -0.1rpx;
              margin-top: 16rpx;
              margin-left: 32rpx;
            }
          }

          .btns {
            width: 164rpx;
            height: 52rpx;
            border-radius: 38rpx;
            background: #003b3d;
            color: #fff;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.1rpx;
          }
        }
      }

      .huilv {
        padding: 30rpx;
        box-sizing: border-box;
        font-size: 26rpx;
        color: #404261;

        text {
          color: #f86c3b;
          font-weight: bold;
        }
      }
    }

    .btn {
      width: 518rpx;
      height: 70rpx;
      margin: 0 auto;
      border-radius: 20rpx;
      background: #003b3d;
      color: #fff;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.1rpx;
      margin-top: 76rpx;
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
    background: #fff;
    .my-button2 {
      width: 202rpx;
      height: 0rpx;
      border: 4rpx solid #000000;
      border-radius: 100rpx;
      margin: 50rpx 274rpx 38rpx 274rpx;
    }
  }

  /deep/.uni-picker-toggle {
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
  }
}
</style>
