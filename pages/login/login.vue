<template>
  <view class="main">
    <view class="content">
      <loading :isshow="isshow"></loading>
      <view @click="support" class="support">
        <image src="../../static/login/support.png" mode="widthFix"></image>
      </view>
      <view class="login_name f-c">{{ $t("login.login_title") }}</view>
      <!-- <view class="login_name f-c">{{ $t('login.login_title') }}</view> -->
      <view class="login_instructions f-c">{{
        logintype === 0
          ? $t("login.login_subtitle")
          : logintype === 1 && codesent === 0
          ? $t("login.mobile_subtitle")
          : logintype === 1 &&
            codesent === 1 &&
            "Code is sent to ********" + phoneData.phoneNo.slice(-3)
      }}</view>
      <view class="nav_bg f-c">
        <view
          class="nav_btn"
          @click="LoginFx(0)"
          :class="logintype == 0 ? 'active' : ''"
          >{{ $t("login.userNameLogin_label") }}</view
        >
        <view
          class="nav_btn"
          @click="LoginFx(1)"
          :class="logintype == 1 ? 'active' : ''"
          >{{ $t("login.mobile_number_label") }}</view
        >
      </view>
      <view class="form">
        <!-- -------------------------------------Username Login------------------------------------------------------ -->
        <view class="form_username_login" v-if="logintype == 0">
          <view class="input_username f-c">
            <input
              type="text"
              :placeholder="$t('login.userNamePlaceholder')"
              @blur="okformData"
              maxlength="30"
              data-type="username"
              v-model="formData.username"
              placeholder-style="color:#003B3D;"
            />
          </view>
          <view class="input_password f-c">
            <input
              :type="isshowpass == 0 ? 'password' : 'text'"
              maxlength="12"
              :value="formData.password"
              @blur="okformdata"
              data-type="password"
              :placeholder="$t('login.passwordPlaceholder')"
              placeholder-style="color:#003B3D;"
            />
            <view class="passwordshow" @click="showpass">
              <image
                :src="
                  isshowpass == 0
                    ? '../../static/login/eye-closed.png'
                    : '../../static/login/eye-open.png'
                "
                mode="widthFix"
              >
              </image>
            </view>
          </view>

          <view class="rememberpassAndforgetpass f-c">
            <view class="rememberpass f-c" @click="saveFx">
              <div class="save-main f-c" :class="{ 'green-bg': saveBtn }">
                <uni-icons
                  type="checkmarkempty"
                  class="right"
                  v-show="saveBtn"
                ></uni-icons>
              </div>
              {{ $t("login.remember_me") }}
            </view>
            <view class="border_bottom">
              <navigator
                url="/pages/getpassword/getpassword"
                class="forgetpass"
                >{{ $t("login.forgot_password") }}</navigator
              >
            </view>
          </view>
          <view class="loginBtn f-c" @click="acountlogin">{{
            $t("login.login_title")
          }}</view>
        </view>

        <!--------------------------------------------------#Number Login----------------------------------------------------------------->
        <view class="form_username_login" v-if="logintype == 1">
          <view class="forminpu">
            <view
              v-if="codesent === 0"
              class="input"
              style="margin-bottom: 56rpx"
            >
              <input
                type="text"
                :placeholder="$t('login.phoneNumPlaceholder')"
                maxlength="11"
                v-model="phoneData.phoneNo"
                placeholder-style="color:#003B3D;"
              />
            </view>
            <view v-else class="code" style="margin-bottom: 60rpx">
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
            <view v-if="codesent === 0" class="rememberpassAndforgetpass f-c">
              <view class="rememberpass f-c" @click="saveFx">
                <div class="save-main f-c" :class="{ 'green-bg': saveBtn }">
                  <uni-icons
                    type="checkmarkempty"
                    class="right"
                    v-show="saveBtn"
                  ></uni-icons>
                </div>
                {{ $t("login.remember_me") }}
              </view>
              <!-- <view class="border_bottom">
                <navigator
                  url="/pages/getpassword/getpassword"
                  class="forgetpass"
                  >{{ $t("login.forgot_password") }}</navigator
                >
              </view> -->
            </view>
            <view v-if="codesent === 1" class="nocode_recieved"
              >Don’t receive code?
              <span class="request_again" @click="codesent = 0">
                Request again</span
              ></view
            >
            <view v-if="codesent === 0" class="loginBtn f-c" @click="getcode">{{
              yzmtext
            }}</view>
            <view v-else class="loginBtn f-c" @click="phoneBtn">{{
              $t("login.login_title")
            }}</view>
          </view>
        </view>
      </view>
      <view class="bottom_class f-c">
        <!-- <view class="OR f-c">{{ $t("login.or") }}</view> -->
        <span> If you dont have an account</span>
        <view class="signup_url f-c" style="z-index: 1001">
          <navigator class="url_link" url="/pages/register/register">
            <view class="url_sub_class">{{ $t("login.register_Now") }}</view>
          </navigator>
        </view>
        <!-- <navigator url="/pages/index/index">
          <view class="f-c QV">{{ $t("login.quick_visit") }}</view>
        </navigator> -->

        <!-- <button
          type="default"
          onclick="window.location.href='https://www.xunli.bet'"
          class="f-c url_image"
        ></button>
        <view class="f-c OW">{{ $t("login.office_website_label") }}</view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { localizationMixin } from "../../common/js/localization";
import { mapState, mapMutations, mapAction } from "vuex";
import state from "@/store/state";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      codesent: 0,
      isshow: 0,
      logintype: 0,
      saveData: uni.getStorageSync("saveData"),
      formData: {
        username: "", //username
        password: "", //password
      },
      phoneData: {
        phoneNo: "", //number
        smsCode: "", //smscode
      },
      isshowpass: 0,
      saveBtn: false,
      noclick: "yzmbtn",
      yzmtext: "发送验证码",
      dajishi: "dajishi",
      yzmbtntype: 0,
      djtime: 60,
      otpArray: Array(6).fill(""),
    };
  },
  computed: {
    ...mapState({
      rules: (state) => state.rule,
    }),
  },
  watch: {
    rules() {
      this.initFx();
    },
    otpArray() {
      const allEmpty = this.otpArray.every((element) => element === "");

      if (!allEmpty) {
        this.phoneData.smsCode = this.otpArray.join("");
      }
    },
  },

  onLoad() {
    let _this = this;
    //是否记住密码
    if (_this.saveData) {
      _this.saveBtn = true;
      _this.formData = _this.saveData;
    }
    this.getphoneMes();
    this.initFx();
  },
  methods: {
    support() {
      uni.navigateTo({
        url: "../service/serviceDtl",
      });
    },
    initFx() {
      this.isshow = 1;
      if (state.rule) {
        this.isshow = 0;
      }
    },
    LoginFx(e) {
      this.logintype = e;
    },
    okformData(e) {
      let _this = this;
      _this.formData[e.currentTarget.dataset.type] = e.detail.value;
    },
    okformdata(e) {
      let _this = this;
      _this.formData[e.currentTarget.dataset.type] = e.detail.value;
    },
    showpass() {
      this.isshowpass = !this.isshowpass;
    },
    saveFx() {
      this.saveBtn = !this.saveBtn;
    },
    ////////////////////User Login by name&password////////////////////////////////////
    acountlogin() {
      let _this = this;

      // return
      if (_this.formData.username.length < 5) {
        uni.showToast({
          title: this.$t("rules.username"),
          icon: "none",
        });
        return;
      }
      if (!state.rule.password.test(_this.formData.password)) {
        uni.showToast({
          title: this.$t("rules.password"),
          icon: "none",
        });
        return;
      }

      let url = _this.$globalApi.login;
      // _this.isshow = 1;
      this.$res.postRequest(url, _this.formData).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.saveDataFx(res.data.data);
        } else {
          _this.isshow = 0;
          if (res.data.code == 1000) {
            uni.showToast({
              title: "账号密码不匹配，还剩" + res.data.msg + "次机会",
              icon: "none",
            });
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: "none",
            });
          }
        }
      });
    },

    ////////////////////////////Phone Login////////////////////////////////
    phoneBtn() {
      let _this = this;
      if (!state.rule.phoneNo.test(_this.phoneData.phoneNo)) {
        uni.showToast({
          title: this.$t("rules.phoneNo"),
          icon: "none",
        });
        return;
      }
      if (!_this.phoneData.smsCode) {
        uni.showToast({
          title: "请输入验证码",
          icon: "none",
        });
        return false;
      }

      let url = _this.$globalApi.loginBySms;
      let datas = _this.phoneData;
      this.$res.postRequest(url, datas).then((res) => {
        if (res.data.code == 0) {
          this.saveDataFx(res.data.data);
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
        }
      });
    },

    getphoneMes() {
      let _this = this;
      uni.getSystemInfo({
        success(res) {
          let type = "";
          let data = {};
          if (res.deviceType == "phone") {
            if (res.osName == "android") {
              type = "2";
            } else if (res.osName == "ios") {
              type = "3";
            }
          } else if (res.deviceType == "pc") {
            type = "1";
          } else {
            type = "4";
          }
          _this.formData.deviceType = type;
          _this.formData.deviceUserAgent = res.ua;
          _this.formData.deviceCode = res.deviceId;
          _this.formData.deviceVersion = res.system;

          _this.phoneData.deviceType = type;
          _this.phoneData.deviceUserAgent = res.ua;
          _this.phoneData.deviceCode = res.deviceId;
          _this.phoneData.deviceVersion = res.system;

          console.log("获取手机信息---->", _this.formData);
        },
      });
    },

    getcode() {
      let _this = this;
      if (!state.rule.phoneNo.test(this.phoneData.phoneNo)) {
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
          let url = _this.$globalApi.sendLoginSms;
          let datas = {
            phoneNo: _this.phoneData.phoneNo,
          };
          this.$res.postRequest(url, datas).then((res) => {
            console.log(res);
            if (res.data.code == 0) {
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
            } else if (res.data.code == 20006) {
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
                title: "发送失败",
                icon: "none",
              });
            }
          });
        }
      }
    },
    //////////////save Data remember credentials/////////////
    //save - data
    saveDataFx(user) {
      let that = this;
      that.isshow = 0;
      state.head["auth-token"] = user.memberInfo.authToken;
      state.user = user.memberInfo;
      //if -game
      let stat = user.allGamePlatform;
      state.gameStatus = [];
      stat.forEach((element) => {
        if (element.platformStatus != 0) {
          state.gameStatus.push(element.uniqueCode);
        }
      });
      uni.setStorageSync("UniquecodeArray", state.gameStatus);
      uni.setStorageSync("memberInfo", user.memberInfo);
      uni.setStorageSync("authToken", user.memberInfo.authToken);
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
    },
  },
};
</script>

<style lang="scss" scoped>
/* 背景容器 */
.main {
  background: #008d91;
  padding-top: 48rpx;
}
.content {
  width: 100%;
  height: calc(100vh - 48rpx);
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  border-radius: 80rpx 80rpx 0 0;
  position: relative;
  .login_name {
    margin-top: 110rpx;
    color: #003b3d;
    font-family: Microsoft YaHei UI;
    font-size: 52rpx;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 328rpx;
  }

  .login_instructions {
    margin-top: 16rpx;
    color: #008d91;
    font-size: 24rpx;
    font-weight: 400;
    line-height: normal;
  }

  .nav_bg {
    // background: url("../../static/login/nav_bg.png") no-repeat;
    // background-size: 100% 100%;
    width: 512rpx;
    height: 66rpx;
    margin: 0 auto;
    margin-top: 54rpx;

    .nav_btn {
      color: #003b3d;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 48rpx;
      /* 166.667% */
      letter-spacing: -0.5px;
      padding: 6rpx;
      height: 54rpx;
      margin: auto;
    }

    .nav_btn.active {
      padding: 6rpx;
      color: #003b3d;
      border-bottom: 4rpx solid #003b3d;
    }
  }

  .form_username_login {
    margin: 82rpx 78rpx 0 78rpx;
    position: relative;

    .input_username {
      width: 100%;
      height: 54rpx;
      position: relative;
      margin-bottom: 48rpx;
      padding: 0 10rpx 0 12rpx;
      box-sizing: border-box;
      justify-content: space-between;
      border-bottom: 4rpx solid #003b3d;

      input {
        width: 430rpx;
        //  height: 100%;
        color: #003b3d;
        font-family: Microsoft YaHei UI;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    .input_password {
      width: 100%;
      height: 54rpx;
      position: relative;
      margin-bottom: 60rpx;
      padding: 0 10rpx 0 12rpx;
      box-sizing: border-box;
      justify-content: space-between;
      border-bottom: 4rpx solid #003b3d;

      input {
        width: 430rpx;
        //  height: 100%;
        color: #003b3d;
        font-family: Microsoft YaHei UI;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
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
    }

    .rememberpassAndforgetpass {
      justify-content: space-between;
      color: #fff;
      //  margin-bottom: 88rpx;

      .border_bottom {
        border-bottom: 2rpx solid #ababab; //temporary color
        padding-bottom: 4.1rpx;

        .forgetpass {
          color: #ababab;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }
  }

  .form {
    .forminpu {
      .input {
        width: 100%;
        height: 50rpx;
        position: relative;
        padding: 0 10rpx 0 12rpx;
        box-sizing: border-box;
        justify-content: space-between;
        border-bottom: 4rpx solid #781000;

        input {
          width: 430rpx;
          // height: 100%;
          color: #003b3d;
          font-family: Microsoft YaHei UI;
          font-size: 32rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          //  margin-bottom: -9px;
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
  }
}

.uni-input-placeholder {
  width: 430rpx;
  //  height: 100%;
  color: #003b3d;
  font-family: Microsoft YaHei UI;
  font-size: 32rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  //  margin-bottom: -30px;
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
.rememberpass {
  color: #003b3d;
  text-align: center;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.save-main {
  background: #ababab;
  margin: 2rpx 10rpx 0 4rpx;
  border-radius: 4rpx;
  height: 32rpx;
  width: 32rpx;
}

.green-bg {
  background: #25ab32;
}

.right {
  color: #ffffff !important;
  font-size: 30rpx !important;
  font-weight: 600;
  // margin: -2rpx;
}

.noclick {
  background: #9eadbd !important;
  position: absolute;
}

input {
  font-size: 32rpx !important;
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
.loginBtn {
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

.bottom_class {
  margin: 0 0 0 0;
  z-index: 1001;
  // margin-top: 300rpx;
  position: absolute;
  bottom: 72rpx;
  margin: 0 auto;
  width: 100%;
  .url_image {
    background: url("../../static/login/urlweb.png") no-repeat;
    background-size: 100% 100%;
    width: 530rpx;
    height: 66rpx;
    margin: 0 auto;
    z-index: 100;
    margin-top: 366rpx;
    z-index: 100;
  }

  .OR {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 20rpx;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    z-index: 100;
    //width: 13px;
    height: 28rpx;
    margin: 0 auto;
    padding: 38rpx;
  }

  .QV {
    z-index: 100;
    margin: 0 auto;
    font-weight: 400;
    text-align: center;
    font-size: 24rpx;
    font-family: Microsoft YaHei UI;
    border-bottom: 1px solid #c01a00;
    color: #c01a00;
    margin-top: 38rpx;
    width: 63.5px;
  }

  .OW {
    z-index: 100;
    font-size: 20rpx;
    margin: 20rpx auto 20rpx auto;
    font-weight: 400;
    text-align: center;
    font-size: 20rpx;
    font-family: Microsoft YaHei UI;
    color: #aeaeae;
  }

  .signup_url {
    //margin-top: 10.92rpx;
    // background: url("../../static/login/signup_btn.png") no-repeat;
    // background-size: 100% 100%;
    // width: 236rpx;
    // height: 66rpx;
    // margin: 0 auto;

    .url_link {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #008d91;
      z-index: 102;
      font-weight: 700;
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
}
</style>
