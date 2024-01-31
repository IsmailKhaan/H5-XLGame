<template>
  <view class="main">
    <view class="content">
      <view @click="support" class="support">
        <image src="../../static/login/support.png" mode="widthFix"></image>
      </view>
      <view class="signup_name f-c">{{ $t("sign_up.signUp_title") }}</view>
      <view v-if="codesent === 0" class="signup_instructions f-c">{{
        $t("sign_up.signup_subtitle")
      }}</view>
      <view v-else class="signup_instructions f-c"
        >Code is sent to ******** {{ formData.phoneNo.slice(-3) }}</view
      >
      <view class="form f-c">
        <view class="forminpu">
          <view v-if="codesent === 0">
            <view class="input f-c">
              <input
                type="text"
                :placeholder="$t('login.userNamePlaceholder')"
                :value="formData.username"
                @input="getformdata"
                data-type="username"
                maxlength="11"
                placeholder-style="color:#003b3d"
              />
            </view>
            <view class="input f-c">
              <input
                :type="isshowpass1 == 0 ? 'password' : 'text'"
                :placeholder="$t('login.passwordPlaceholder')"
                maxlength="11"
                :value="formData.password"
                @input="getformdata"
                data-type="password"
                placeholder-style="color:#003b3d"
              />
              <view class="passwordshow" @click="showpass(1)">
                <image
                  :src="
                    isshowpass1 == 0
                      ? '../../static/login/eye-closed.png'
                      : '../../static/login/eye-open.png'
                  "
                  mode="widthFix"
                ></image>
              </view>
            </view>
            <view class="input f-c">
              <input
                :type="isshowpass1 == 0 ? 'password' : 'text'"
                :placeholder="$t('sign_up.confirm_passwordPlaceholder')"
                maxlength="11"
                :value="formData.passwords"
                @input="getformdata"
                data-type="passwords"
                placeholder-style="color:#003b3d"
              />
              <view class="passwordshow" @click="showpass(1)">
                <image
                  :src="
                    isshowpass1 == 0
                      ? '../../static/login/eye-closed.png'
                      : '../../static/login/eye-open.png'
                  "
                  mode="widthFix"
                ></image>
              </view>
            </view>
            <view class="input f-c marginbotm">
              <input
                style="margin-top: 10px"
                type="text"
                :placeholder="$t('login.phoneNumPlaceholder')"
                :value="formData.phoneNo"
                @input="getformdata"
                @blur="okformdata"
                maxlength="11"
                data-type="phoneNo"
                placeholder-style="color:#003b3d"
              />
            </view>
          </view>
          <view v-else class="input f-c marginbotms">
            <view class="code" style="margin-bottom: 60rpx">
              <input
                v-for="(item, index) in 6"
                :key="index"
                type="number"
                v-model="otpArray[index]"
                maxlength="1"
                class="slot f-c"
                :disabled="index > 0 && !otpArray[index - 1]"
              />
            </view>
          </view>
          <view v-if="codesent === 1" class="nocode_recieved"
            >Don’t receive code?
            <span class="request_again" @click="codesent = 0">
              Request again</span
            ></view
          >
          <view v-if="codesent === 0" class="regBtn f-c" @click="getcode">{{
            yzmtext
          }}</view>
          <view v-else class="regBtn f-c" @click="postfromdata">{{
            $t("sign_up.signUp_title")
          }}</view>
        </view>
      </view>
      <view class="signup_url f-c">
        <view class="question f-c">{{
          $t("sign_up.already_Have_Account")
        }}</view>
        <navigator class="url_link" url="/pages/login/login">
          <view class="url_sub_class">{{ $t("sign_up.sign_in") }}</view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import { localizationMixin } from "../../common/js/localization";
import publicMethod from "@/common/js/publicMethod.js";
// import RequestSender from "@/common/js/request.js";
import state from "@/store/state";

export default {
  mixins: [localizationMixin],

  data() {
    return {
      codesent: 1,
      formData: {
        username: "",
        password: "",
        passwords: "",
        phoneNo: "",
        smsCode: "",
        inviteCode: "",
        deviceType: "",
        deviceUserAgent: "",
        deviceCode: "",
        deviceVersion: "",
      },
      dajishi: "dajishi",
      yzmbtntype: 0,
      isshowpass1: 0,
      djtime: 60,
      noclick: "yzmbtn",
      yzmtext: "发送验证码",
      userName: "",
      password: "",
      otpArray: Array(6).fill(""),
    };
  },
  onLoad() {
    this.getphoneMes();
  },
  watch: {
    otpArray() {
      const allEmpty = this.otpArray.every((element) => element === "");

      if (!allEmpty) {
        this.formData.smsCode = this.otpArray.join("");
      }
    },
  },
  methods: {
    support() {
      uni.navigateTo({
        url: "../service/serviceDtl",
      });
    },
    getformdata(e) {
      let _this = this;
      _this.formData[e.currentTarget.dataset.type] = e.detail.value;
    },
    okformdata(e) {
      // let _this = this;
      if (publicMethod.phonereg(e.detail.value) === false) {
        uni.showToast({
          title: "手机号格式错误",
          icon: "none",
        });
      }
    },
    showpass(e) {
      console.log(e, this["isshowpass" + e], !this["isshowpass" + e]);
      if (e == 1) {
        if (this["isshowpass" + e] == 0) {
          this["isshowpass" + e] = 1;
        } else {
          this["isshowpass" + e] = 0;
        }
      }
      if (e == 2) {
        if (this["isshowpass" + e] == 0) {
          this["isshowpass" + e] = 1;
        } else {
          this["isshowpass" + e] = 0;
        }
      }
    },

    getcode() {
      let _this = this;
      if (publicMethod.phonereg(_this.formData.phoneNo) === false) {
        uni.showToast({
          title: this.$t("rules.phoneNo"),
          icon: "none",
        });
      } else {
        if (this.yzmbtntype == 1) {
          uni.showToast({
            title: "验证码已发送",
            icon: "none",
          });
        } else {
          let url = _this.$globalApi.sendRegisterSms;
          let datas = {
            phoneNo: _this.formData.phoneNo,
          };
          // console.log(datas,url,"datasas")
          // RequestSender.postRequestUrlencoded(url, datas).then((res) => {
          _this.$res.postRequest(url, datas).then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              uni.showToast({
                title: state.codes[res.data.code],
                icon: "none",
              });
              _this.codesent = 1;
              _this.noclick = "yzmbtn noclick";
              _this.yzmbtntype = !this.yzmbtntype;
              _this.yzmtext = "倒计时 60 秒";
              _this.dajishi = setInterval(function () {
                _this.djtime = _this.djtime - 1;
                _this.yzmtext = "倒计时" + _this.djtime + "秒";
                if (_this.djtime == -1) {
                  _this.codesent = 0;
                  _this.yzmtext = "获取验证码";
                  _this.yzmbtntype = 0;
                  _this.djtime = 60;
                  _this.noclick = "yzmbtn";
                  clearInterval(_this.dajishi);
                }
              }, 1000);
            } else if (res.data.code == 1000) {
              uni.showToast({
                title: state.codes[res.data.code],
                icon: "none",
              });
              _this.codesent = 1;
              _this.noclick = "yzmbtn noclick";
              _this.yzmbtntype = !this.yzmbtntype;
              _this.yzmtext = "倒计时60秒";
              _this.dajishi = setInterval(function () {
                _this.djtime = _this.djtime - 1;
                _this.yzmtext = "倒计时" + _this.djtime + "秒";
                if (_this.djtime == -1) {
                  _this.codesent = 0;
                  _this.yzmtext = "获取验证码";
                  _this.yzmbtntype = 0;
                  _this.djtime = 60;
                  _this.noclick = "yzmbtn";
                  clearInterval(_this.dajishi);
                }
              }, 1000);
            } else {
              uni.showToast({
                title: state.codes[res.data.code],
                icon: "none",
              });
            }
          });
        }
      }
    },

    postfromdata() {
      console.log(this.$store.state.rule);
      console.log(state.rule);

      if (!state.rule.username.test(this.formData.username)) {
        uni.showToast({
          title: this.$t("rules.username"),
          icon: "none",
        });
        return false;
      }

      if (!state.rule.password.test(this.formData.password)) {
        uni.showToast({
          title: this.$t("rules.password"),
          icon: "none",
        });
        return false;
      }

      if (this.formData.password != this.formData.passwords) {
        uni.showToast({
          title: this.$t("rules.new_password"),
          icon: "none",
        });
        return false;
      }

      if (!state.rule.phoneNo.test(this.formData.phoneNo)) {
        uni.showToast({
          title: this.$t("rules.phoneNo"),
          icon: "none",
        });
        return false;
      }
      if (!this.formData.smsCode) {
        uni.showToast({
          title: this.$t("rules.code"),
          icon: "none",
        });
        return false;
      }
      this.psotallfrom();
    },

    psotallfrom() {
      let _this = this;

      if (_this.formData.passwords == _this.formData.password) {
        let url = _this.$globalApi.reg;
        // delete _this.formData.passwords;
        let datas = _this.formData;

        // RequestSender.postRequestUrlencoded(url, datas).then((res) => {
        _this.$res.postRequest(url, datas).then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            let that = this;
            state.head["auth-token"] = res.data.data.memberInfo.authToken;
            state.user = res.data.data.memberInfo;
            //if -game
            let stat = res.data.data.allGamePlatform;
            state.gameStatus = [];
            stat.forEach((element) => {
              if (element.platformStatus != 0) {
                state.gameStatus.push(element.uniqueCode);
              }
            });
            uni.setStorageSync("UniquecodeArray", state.gameStatus);
            uni.setStorageSync("memberInfo", res.data.data.memberInfo);
            uni.setStorageSync("authToken", res.data.data.memberInfo.authToken);
            //token - ok  -data
            let url = that.$globalApi.userInfogetCustomerInfo;
            that.$res.postRequest(url).then((res) => {
              console.log(res, "info");
              state.info = res.data.data.customerInfo;
              uni.setStorageSync("zsInfo", state.info);
            });

            console.log("bank银行卡信息");
            let bank = that.$globalApi.userInfogetAllBankCard;
            that.$res.postRequest(bank).then((res) => {
              state.bank = res.data.data.allBankCard;
              uni.setStorageSync("bank", state.bank);
            });

            uni.reLaunch({
              url: "/pages/index/index",
            });
            //是否保存密码
            if (that.saveBtn) {
              uni.setStorageSync("saveData", that.formData);
            } else {
              uni.setStorageSync("saveData", "");
            }
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: "none",
            });
          }
        });
      } else {
        uni.showToast({
          title: "两次密码不一致",
          icon: "none",
        });
      }
    },
    getphoneMes() {
      let _this = this;
      uni.getSystemInfo({
        success(res) {
          if (res.deviceType == "phone") {
            if (res.osName == "android") {
              _this.formData.deviceType = "2";
            } else if (res.osName == "ios") {
              _this.formData.deviceType = "3";
            }
          } else if (res.deviceType == "pc") {
            _this.formData.deviceType = "1";
          } else {
            _this.formData.deviceType = "4";
          }
          _this.formData.deviceUserAgent = res.ua;
          _this.formData.deviceCode = res.deviceId;
          _this.formData.deviceVersion = res.system;
          console.log("获取手机信息---->", res);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #008d91;
  padding-top: 48rpx;
}

.yzmbtn {
  min-width: 254rpx;
  height: 44rpx;
  border-radius: 22rpx;
  color: #fff;
  background: #003b3d;
  position: absolute;
  right: 0rpx;
  top: 20rpx;
  text-align: center;
  padding: 0 10rpx;
  font-size: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
  height: calc(100vh - 48rpx);
  background-color: #fff;
  border-radius: 80rpx 80rpx 0 0;
  position: relative;
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  background-color: #ffffff;

  .signup_url {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 40rpx 0 50rpx 0;

    .question {
      display: flex;
      justify-content: center;
      color: #781000;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-right: 6rpx;
    }

    .url_sub_class {
      color: #008d91;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-left: 12rpx;
      z-index: 102;
      border-bottom: 4rpx solid #008d91;
    }
  }

  .signup_name {
    padding-top: 348rpx;
    color: #003b3d;
    font-size: 52rpx;
    font-weight: 700;
    font-family: Microsoft YaHei UI;
    line-height: 66.04rpx;
  }

  .signup_instructions {
    margin-top: 12rpx;
    color: #003b3d;
    font-size: 24rpx;
    font-weight: 400;
    font-family: Microsoft YaHei UI;
    line-height: 30.84rpx;
  }

  .form {
    flex-direction: row;
    z-index: 10;

    .forminpu {
      margin: 0 auto;
      margin-top: 64rpx;

      .input {
        width: 100%;
        height: 80rpx;
        position: relative;
        border-radius: 80rpx;
        box-sizing: border-box;
        flex-direction: row;
        margin-bottom: 20rpx;

        input {
          width: 594rpx;
          height: 100%;
          color: #003b3d;
          padding-left: 12rpx;
          border-bottom: 2rpx solid #781000;
        }

        .passwordshow {
          width: 40rpx;
          height: 40rpx;
          position: absolute;
          right: 30rpx;

          image {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .code {
          display: flex;
          align-items: center;
          gap: 16rpx;
          justify-content: center;
          .slot {
            color: #fff;
            font-size: 24rpx;
            font-weight: 700;
            background-color: #008d91;
            border-radius: 10rpx;
            width: 56rpx;
            min-height: 64rpx;
          }
        }
      }

      .marginbotm {
        margin-bottom: 34rpx;
      }

      .marginbotms {
        input {
          border-bottom: 2rpx solid #e7e7e7;
        }
      }

      .tip {
        color: red;
        font-size: 18rpx;
        margin-bottom: 20rpx;
        margin-top: 5rpx;
      }

      .tipnull {
        height: 10rpx;
      }

      .tongyi {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        color: #fff;
        font-size: 18rpx;

        navigator {
          color: #3783ff;
        }
      }

      .regBtn {
        width: 366rpx;
        height: 66rpx;
        color: #fff;
        font-size: 24rpx;
        font-weight: 700;
        margin: auto;
        margin-top: 72rpx;
        border-radius: 20rpx;
        background: #003b3d;
      }

      .phonenumLogin {
        text-align: center;
        color: #fff;
        padding: 20rpx 0 30rpx;
      }
      .nocode_recieved {
        text-align: center;
        color: #008d91;
        font-size: 24rpx;
        .request_again {
          color: #003b3d;
          font-weight: 700;
          border-bottom: 4rpx solid #003b3d;
          padding: 4rpx;
        }
      }
    }
  }

  /deep/.uni-input-input[type="text"] {
    width: 430rpx;
    //  height: 100%;
    color: #003b3d;
    font-family: Microsoft YaHei UI;
    font-size: 32rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    //margin-bottom: -15px;
  }
  /deep/.uni-input-input[type="number"] {
    color: white;
    font-size: 24rpx;
    font-weight: 700;
  }

  /deep/.uni-input-input {
    width: 215px;
    //height: 100%;
    color: #003b3d;
    font-family: Microsoft YaHei UI;
    font-size: 32rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    // margin-bottom: -30rpx;
  }
  /deep/ uni-input {
    height: 54rpx !important;
  }

  .goindex {
    position: relative;
    z-index: 10;
    color: #fff;
    width: 95%;
    padding: 0 30rpx;
    box-sizing: border-bsasox;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    image {
      width: 24rpx;
      height: 25rpx;
      display: block;
      margin-left: 20rpx;
    }
  }
}

.noclick {
  background: #003b3d !important;
  position: absolute;
}

input {
  font-size: 32rpx !important;
}
</style>
