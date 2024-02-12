<template>
  <view class="dj">
    <loading :isshow="isshow" :ale="true"></loading>
    <view class="content">
      <view class="topnav">
        <view class="title">{{ $t("settings.title") }}</view>
        <view class="list" @click="shareToggle">
          <view>
            <image src="../../static/home/setting-icon.png" mode=""></image>
          </view>
        </view>
      </view>
      <view class="headimgjiantou">
        <view class="headimgtext">
          <view class="headimg">
            <image
              @click="open"
              v-if="$store.state.user.avatar"
              :src="$store.state.user.avatar"
              mode="widthFix"
            ></image>
            <image
              @click="goskip"
              v-else
              src="../../static/home/memo.png"
              mode="widthFix"
            ></image>
          </view>
          <view class="namevipday">
            <view class="namevip" @click="goskip">
              <view class="name">{{ memberInfo.username }}.</view>
              <view class="vip f-c">VIP {{ memberInfo.userLevel }}</view>
            </view>
            <view class="money">
              <view>
                <view class="nowmoney">
                  <view class="qian">¥{{ NewestBalance }}</view>
                </view>
                <view class="text">
                  <image
                    @click="rmbBtn()"
                    class="img2"
                    :class="{ imgClass: refresh }"
                    src="../../static/home/refresh.png"
                    mode=""
                  ></image>
                </view>
              </view>
            </view>
            <view
              class="day letter"
              v-html="
                $en($store.state.ens.settings.user_join_description).replace(
                  '{number}',
                  jiarutime
                )
              "
            >
            </view>
          </view>
        </view>
      </view>

      <!--  -->
      <view class="f-c">
        <view class="list_new">
          <div @click="userFx(1)" class="icons" hover-class="none">
            <image
              :src="depositIcon"
              mode="widthFix"
              style="max-height: 104rpx"
            ></image>
            <span style="margin-left: 20rpx">{{ $t("settings.deposit") }}</span>
          </div>
          <navigator
            class="icons"
            hover-class="none"
            url="/pages/transfer/transfer"
          >
            <image
              :src="depositIcon2"
              mode="widthFix"
              style="max-height: 104rpx"
            ></image>
            <span>{{ $t("settings.transfer") }}</span>
          </navigator>

          <div
            @click="userFx(3)"
            url="/pages/withdrawal/withdrawal"
            class="icons"
          >
            <image
              :src="depositIcon3"
              mode="widthFix"
              style="max-height: 104rpx"
            ></image>
            <span style="margin-right: 14rpx">{{
              $t("settings.withdraw")
            }}</span>
          </div>
        </view>
      </view>
      <view class="pg f-c" @click="yjallBack">
        <view class="one_click_recovery f-c">
          <view class="one_click_text">{{ $t("settings.recovery_btn") }}</view>
        </view>
      </view>
      <view class="navlist">
        <view class="nav_f">
          <navigator
            class="navIcon"
            hover-class="none"
            url="/pages/wallet/wallet"
          >
            <image
              src="../../static/home/account-wallet.png"
              mode="widthFix"
            ></image>
            <view>{{ $t("settings.my_purse") }}</view>
          </navigator>
          <navigator
            class="navIcon"
            hover-class="none"
            url="/pages/record/trade"
          >
            <image
              src="../../static/home/transaction-history.png"
              mode="widthFix"
              style="width: 54rpx"
            ></image>
            <view>{{ $t("settings.transactions") }}</view>
          </navigator>
        </view>
        <view class="nav_f">
          <navigator
            class="navIcon"
            hover-class="none"
            url="/pages/record/betting"
          >
            <image
              src="../../static/home/betting-history.png"
              mode="widthFix"
              style="width: 54rpx"
            ></image>
            <view>{{ $t("settings.bettings") }}</view>
          </navigator>
          <div
            @click="userFx(8)"
            class="navIcon"
            hover-class="none"
            url="/pages/cardManage/cardManage"
            style="border-bottom: none"
          >
            <image
              src="../../static/home/account-management.png"
              mode="widthFix"
            ></image>
            <view>{{ $t("settings.manage_account") }}</view>
          </div>
        </view>
      </view>
      <view class="listview"> </view>

      <publicNav :active="5"></publicNav>
    </view>

    <uni-popup
      class="popup_nav f-c"
      ref="share"
      type="bottom"
      backgroundColor=""
    >
      <view class="background_class">
        <view class="border f-c"></view>
        <view class="setting_and_support f-c">{{
          $t("settings.setting_support")
        }}</view>
        <navigator
          url="/pages/setting/password/password"
          class="change_password"
        >
          <view class="f-s">
            <image
              class="lock"
              src="../../static/home/lock.png"
              mode="widthFix"
            ></image>
            <view class="text">
              {{ $t("change_password.change_password_title") }}
            </view>
          </view>
          <image
            class="angle_right"
            src="../../static/home/angle-right.png"
            mode="widthFix"
          >
          </image>
        </navigator>
        <navigator url="/pages/baseinfo/baseinfo" class="change_password">
          <view class="f-s">
            <image
              class="lock lock_2"
              src="../../static/home/profil.png"
              mode="widthFix"
            ></image>
            <view class="text">
              {{ $t("personel_info.personel_info_title") }}
            </view>
          </view>
          <image
            class="angle_right"
            src="../../static/home/angle-right.png"
            mode="widthFix"
          ></image>
        </navigator>
        <navigator
          url="/pages/setting/deviceinfo/deviceinfo"
          class="change_password"
        >
          <view class="f-s">
            <image
              class="lock"
              src="../../static/home/mob.png"
              mode="widthFix"
            ></image>
            <view class="text">{{ $t("device_info.device_info_title") }}</view>
          </view>
          <image
            class="angle_right"
            src="../../static/home/angle-right.png"
            mode="widthFix"
          ></image>
        </navigator>
        <navigator url="/pages/setting/help/help" class="change_password">
          <view class="f-s">
            <image
              class="lock lock_2"
              src="../../static/home/Q.png"
              mode="widthFix"
            ></image>
            <view class="text">{{ $t("help_center.help_center_title") }}</view>
          </view>
          <view class="f-s">
            <view class="any_questions">{{ $t("settings.any_question") }}</view>
            <image
              class="angle_right"
              src="../../static/home/angle-right.png"
              mode="widthFix"
            ></image>
          </view>
        </navigator>
        <navigator url="/pages/setting/about/about" class="change_password">
          <view class="f-s">
            <image
              class="lock lock_2"
              src="../../static/home/Q1.png"
              mode="widthFix"
            ></image>
            <view class="text">{{ $t("about_us.about_us_title") }}</view>
          </view>
          <view class="f-s">
            <image
              class="angle_right"
              src="../../static/home/angle-right.png"
              mode="widthFix"
            ></image>
          </view>
        </navigator>
        <view class="logout f-c" @tap="logout">
          <image
            class="out"
            src="../../static/home/out.png"
            mode="widthFix"
          ></image>
          <view class="text">{{ $t("settings.log_out") }}</view>
        </view>
      </view>
    </uni-popup>

    <!-- avatar open -->
    <uni-popup ref="showshare" type="bottom">
      <view class="uni-share">
        <image
          class="borders"
          src="../../static/home/avator_border.png"
        ></image>
        <view class="avator_selector f-a">
          <view
            class="avators f-c"
            @click="switchFx(0)"
            :class="animi == 0 ? 'on' : ''"
            >{{ $t("general.real_person") }}</view
          >
          <view
            class="avators f-c"
            @click="switchFx(1)"
            :class="animi == 1 ? 'on' : ''"
            >{{ $t("general.avtar") }}</view
          >
        </view>
        <view v-show="animi == 0" class="uni-share-content">
          <view v-for="(item, index) in headList" :key="index">
            <image
              :src="iconUrl + item"
              mode=""
              class="head"
              @click="chooseHead(index)"
            ></image>
          </view>
        </view>
        <view class="uni-share-content" v-show="animi == 1">
          <view v-for="(ite, index) in avatars" :key="index">
            <image
              :src="iconUrl + ite"
              mode=""
              class="head"
              @click="chooseHead(index)"
            ></image>
          </view>
        </view>
        <image
          class="borders"
          src="../../static/home/avator_border.png"
        ></image>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import publicNav from "@/components/publicNav/publicNav.vue";
import state from "@/store/state";
import { setTimeout } from "timers";
import { mapState } from "vuex";

import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],

  data() {
    return {
      depositIcon: "../../static/home/deposit.png", // Initial image
      depositIcon2: "../../static/home/transfer.png", // Initial image
      depositIcon3: "../../static/home/withdrawal.png", // Initial image
      isshow: 0,
      NewestBalance: 0,
      memberInfo: {},
      refresh: false, //刷新
      jiarutime: "",
      jsonList: "",
      headList: [],
      avatars: [],
      iconUrl: "",
      animi: "0",
    };
  },
  components: {
    publicNav,
  },
  onLoad() {
    let _this = this;
    _this.userInfogetCustomerInfo();

    if (_this.$logins()) {
      let a = state.static.headIcon[state.user.userIcon];
      let b = state.static.avatar[state.user.userIcon];
      state.user.avatar = a;
      if (a == null) {
        state.user.avatar =
          state.iconUrl + state.static.avatar[state.user.userIcon];
      } else if (b == null) {
        state.user.avatar =
          state.iconUrl + state.static.headIcon[state.user.userIcon];
      }
      uni.setStorageSync("memberInfo", state.user);

      console.log(a, b, "ab");
      //
      this.memberInfo = state.user;
      let nowtime = Date.now(); //当前的时间戳
      let regtime = state.user.registerTime; //注册时候的时间戳
      let regNowTime = nowtime - regtime;
      _this.jiarutime = Math.floor(regNowTime / 1000 / 60 / 60 / 24);
    }
    this.$bankApi();
  },
  onShow() {
    this.rmbFx(); //余额刷新 monry
  },
  methods: {
    yjallBack() {
      let _this = this;
      let url = _this.$globalApi.allBack;
      _this.$res.postRequest(url).then((res) => {
        this.rmbFx();
        uni.showToast({
          title: state.codes[res.data.code],
          icon: "none",
        });
      });
    },
    switchFx(e) {
      this.animi = e;
    },

    userInfogetCustomerInfo() {
      this.isshow = 1;
      this.iconUrl = state.iconUrl;
      //头像 - avatar
      let url = this.$globalApi.userInfogetCustomerInfo;
      this.$res.postRequest(url).then((res) => {
        // console.log(res);
        if (res.data.code == 9999) {
          uni.navigateTo({
            url: "/pages/login/login",
          });
        }
        if (res.data.code == 0) {
          this.isshow = 0;

          console.log(res.data.data.customerInfo);
          this.userIn = res.data.data.customerInfo;
        }
      });
    },
    chooseHead(index) {
      console.log(index);
      this.$refs["showshare"].close();
      let url = this.$globalApi.userInfochangeIcon;
      let datas = { userIcon: index };

      this.headList = uni.getStorageSync("staticResources").headIcon;
      this.avatars = uni.getStorageSync("staticResources").avatar;
      console.log(this.headList, "HeadList", this.avatars, "avatars");
      this.$res.postRequest(url, datas).then((res) => {
        if (res.data.code == 0) {
          const chosenValue = this.headList[index] || this.avatars[index];
          state.user.userIcon = index;
          state.user.avatar = state.iconUrl + chosenValue;
          console.log(state.user);
          uni.setStorageSync("memberInfo", state.user);
          this.$forceUpdate();
        }
        uni.showToast({
          title: res.data.msg,
          icon: "none",
        });
      });
    },
    open() {
      this.jsonList = state.jsons;
      this.headList = state.static.headIcon;
      this.avatars = state.static.avatar;
      this.$refs["showshare"].open();
    },
    logout() {
      uni.removeStorageSync("authToken");
      uni.removeStorageSync("memberInfo");
      this.$store.state.user = "";
      uni.showToast({
        title: this.$t("settings.log_out"),
        icon: "none",
      });
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/login/login",
        });
      }, 1200);
    },
    shareToggle() {
      this.$refs.share.open();
    },
    rmbFx(num) {
      let _this = this;
      let url = _this.$globalApi.getNewestBalance;
      let data = { uniqueCode: 0 };
      _this.$res.postRequest(url, data).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.NewestBalance = res.data.data.newestBalance;
        } else {
          if (res.data.code == 9999) {
            uni.setStorageSync("memberInfo", "");
          }
          setTimeout(function () {
            uni.reLaunch({
              url: "/pages/login/login",
            });
          }, 1000);
        }
        if (num == 1) {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
        }
      });
    },
    goskip() {
      uni.navigateTo({
        url: "/pages/baseinfo/baseinfo",
      });
    },
    rmbBtn() {
      this.refresh = !this.refresh;
      this.rmbFx(1);
    },
    userFx(v) {
      console.log(state, state.info.identityCard);
      if (state.info.identityCard == "") {
        uni.showToast({
          title: "请先完成身份证认证",
          icon: "none",
        });
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/baseinfo/name/name",
          });
        }, 1000);
        return;
      }
      if (v == 1) {
        uni.navigateTo({
          url: "/pages/deposit/deposit",
        });
      }
      //存款 - deposit //v == 1 ||
      if (v == 3) {
        if (state.bank == "") {
          uni.showToast({
            title: "请先完成银行卡绑定",
            icon: "none",
          });
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/cardManage/cardManageLi",
            });
          }, 1000);
          return;
        }
        //取款 - withdrawal
        if (v == 3) {
          uni.navigateTo({
            url: "/pages/withdrawal/withdrawal",
          });
        }
      }
      //账户管理 -user -set
      if (v == 8) {
        uni.navigateTo({
          url: "/pages/cardManage/cardManage",
        });
      }
    },
  },
};
</script>

<style lang="scss">
/* 底部分享 */
.uni-share {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0 0;
  margin: 0 auto;
  padding: 40rpx 0;
  padding-bottom: 152rpx;
  .borders {
    width: 202rpx;
    height: 4rpx;
    margin: 0 auto;
  }
  .avator_selector {
    width: 612rpx;
    height: 66rpx;
    border-radius: 108rpx;
    background: #008d91;
    box-shadow: 0px 0px 18rpx 0px rgba(0, 0, 0, 0.63) inset;
    margin: 44rpx auto;
    .avators {
      width: 306rpx;
      height: 54rpx;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx; /* 166.667% */
      letter-spacing: -0.5px;
    }
    .avators.on {
      color: #008d91;
      width: 270rpx;
      height: 54rpx;
      border-radius: 108rpx;
      background: #fff;
    }
  }
}

.uni-share-title {
  line-height: 60rpx;
  font-size: 30rpx;
  padding: 15rpx 0;
  text-align: center;
  color: #474747;
}

.uni-share-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 30rpx;
  .head {
    width: 138rpx;
    height: 138rpx;
    border-radius: 70rpx;
    margin-left: 30rpx;
  }
}

.uni-share-content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200rpx;
  border: 2rpx solid #e5e5e5;
  width: 23%;
  margin-bottom: 10rpx;
  margin-right: 12rpx;
  height: 104rpx;
  text-align: center;
  box-sizing: border-box;
}

.dj {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.popup_nav {
  .background_class {
    background: #ffffff;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    padding: 40rpx 66rpx;
    .border {
      width: 202rpx;
      height: 0px;
      flex-shrink: 0;
      border: 4rpx solid #292c3b;
      margin: auto;
    }

    .setting_and_support {
      margin-top: 31rpx;
      margin-bottom: 19rpx;

      color: #292c3b;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .change_password {
      display: flex;
      margin: 0 0 49rpx 0;
      align-items: center;
      justify-content: space-between;
      image {
        width: 38rpx;
        height: 38rpx;
      }

      .text {
        color: #292c3b;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-left: 40rpx;
      }

      .angle_right {
        width: 17rpx;
        height: 34rpx;
        margin-left: 26rpx;
      }

      .any_questions {
        color: #b3b7cb;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
      }
    }

    .logout {
      padding-bottom: 182rpx;
      .out {
        width: 38.008rpx;
        height: 38rpx;
        flex-shrink: 0;
      }

      .text {
        margin-left: 32rpx;
        color: #008d91;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  }
}

.content {
  //padding: 96rpx 0 0 0;
  width: 100%;
  height: 480rpx;
  .image_editor2 {
    margin: -58rpx 0rpx 0rpx 128rpx;
    width: 66rpx;
    height: 46rpx;
    filter: drop-shadow(0rpx 8rpx 8rpx rgba(0, 0, 0, 0.25));
  }
  .topnav {
    // background: #fff;
    position: relative;
    top: 0;
    //left: 10;
    width: 100%;
    height: 100rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;

    .title {
      text-align: center;
      font-size: 32rpx;
      font-weight: bold;
      width: 100%;
      color: #003b3d;
      letter-spacing: 1.4px;
      margin-top: 24rpx;
    }

    .list {
      position: absolute;
      //	height: 100rpx;
      right: 0rpx;
      top: 20rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: right;
      z-index: 1000;
      padding: 0 40rpx 0 0;
      cursor: pointer !important;

      view {
        image {
          display: block;
          width: 72rpx;
          height: 72rpx;
        }
      }
    }
  }

  .headimgjiantou {
    margin-top: 32rpx;
    .headimgtext {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24rpx;

      .headimg {
        display: block;
        width: 232rpx;
        overflow: hidden;
        height: 232rpx !important;

        image {
          display: block;
          width: 232rpx;
          height: 232rpx !important;
        }

        .image_editor {
          left: 142rpx;
          top: 200rpx;
          position: absolute;
          width: 62rpx;
        }
      }

      .namevipday {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24rpx;

        .namevip {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;

          .name {
            color: #003b3d;
            font-weight: bold;
            font-size: 32rpx;
            overflow: auto;
            text-overflow: ellipsis;
            white-space: nowrap;
            // width: auto;
          }

          .vip {
            margin-left: 6rpx;
            color: #6b6b6b;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }

        .day {
          color: #cdcdcd;
          font-size: 24rpx;

          view {
            font-size: 24rpx;
            display: inline;
            font-weight: 500;
            margin: 0 4rpx;
          }
        }
      }
    }
  }

  .money {
    box-sizing: border-box;
    //padding-top: 48px;

    > view {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .text {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        background: #008d91;
        border-radius: 14rpx;
        margin-left: 14rpx;
        width: 48rpx;
        height: 48rpx;

        .img2 {
          display: block;
          width: 46rpx;
          height: 46rpx;
          transition: all ease-out 0.4s;
          padding: 6rpx;
          position: relative;
        }

        .imgClass {
          transform: rotate(360deg);
        }
      }

      .nowmoney {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;

        .qian {
          font-size: 40rpx;
          color: #6b6b6b;
        }
      }
    }
  }

  .list_new {
    width: 738rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 32rpx;
    > .icons {
      text-align: center;

      image {
        display: block;
        width: 66rpx;
        margin: 0 auto;
        margin-bottom: 8rpx;
      }
      span {
        margin: 0 auto;
        color: #008d91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        line-height: normal;
        letter-spacing: 1.4px;
      }
    }
  }

  .pg {
    margin: 32rpx auto;

    .one_click_recovery {
      border-radius: 20rpx;
      background: #003b3d;
      width: 366rpx;
      height: 66rpx;
      text-align: center;

      .one_click_text {
        color: #fff;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: 1.4px;
        margin-left: 12rpx;
      }
    }
  }
  .navlist {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16rpx;
    .nav_f {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40rpx;
      .navIcon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 284rpx;
        height: 284rpx;
        padding-top: 48rpx;
        background: #d9d9d9;
        border-radius: 60rpx;
        image {
          display: inline-block;
          width: 66rpx;
        }

        view {
          color: #008d91;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.12px;
          margin-top: 48rpx;
        }
      }
    }
  }

  .listview {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
  }
}
</style>
