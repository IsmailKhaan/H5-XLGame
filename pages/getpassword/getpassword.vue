<template>
  <view class="content">
    <navigator url="/pages/login/login" class="goto">
      <image src="../../static/login/goto.png" mode="widthFix"></image>
    </navigator>
    <view @click="support" class="support">
      <image src="../../static/login/support.png" mode="widthFix"></image>
    </view>
    <view class="signup_name f-c">{{ $t('forget_password.forgot_Title') }}</view>
    <view class="signup_instructions f-c"
      >{{ $t('forget_password.forgot_subTitle') }}
    </view>
    <view class="form f-c">
      <view class="forminpu">
        <view class="input f-c">
          <input
            type="text"
            :placeholder="$t('login.userNamePlaceholder') "
            @blur="okformdata"
            data-type="username"
            maxlength="11"
            :value="formData.username"
            placeholder-style="color:#B53D1E"
          />
        </view>
        <view class="input f-c">
          <input
            type="text"
            :placeholder="$t('login.phoneNumPlaceholder') "
            @blur="okformdata"
            data-type="contact"
            maxlength="11"
            :value="formData.contact"
            placeholder-style="color:#B53D1E"
          />
        </view>
        <view class="marginbotms f-c">
          <input
            type="text"
            :placeholder="$t('login.verficationPlaceholder') " 
            @blur="okformdata"
            data-type="verifyCode"
            :value="formData.verifyCode"
            maxlength="6"
            placeholder-style="color:#E7E7E7"
            style="margin-left: 0px;"
          />
          <view :class="noclick" @click="getcode" :style="codesent == 1 ? 'background-color: #ababab !important;' : ''">{{ yzmtext }}</view>
        </view>
        <view class="getpass f-c" @click="gotosetpassword">{{ $t('general.submit')  }}</view>
      </view>
    </view>
  </view>
</template>

<script>
// import RequestSender from "@/common/js/request.js";
import publicMethod from "@/common/js/publicMethod.js";
import state from "@/store/state";
import { localizationMixin } from '../../common/js/localization';

export default {
  mixins: [localizationMixin],
  data() {
    return {
      codesent:0,
      formData: {
        username: "",
        contact: "",
        verifyCode: "",
      },
      noclick: "yzmbtn",
      yzmtext: "发送验证码",
      yzmbtntype: 0,
      djtime: 60,
      dajishi: "dajishi",
    };
  },
  methods: {
    support(){
      uni.navigateTo({
          url: "../service/serviceDtl",
        });
    },
    okformdata(e) {
      let _this = this;
      _this.formData[e.currentTarget.dataset.type] = e.detail.value;
    },
    getcode() {
      let _this = this;
      if (publicMethod.phonereg(_this.formData.contact) === false) {
        uni.showToast({
          title: this.$t('rules.phoneNo'),
          icon: "none",
        });
      } else {
        if (this.yzmbtntype == 1) {
          uni.showToast({
            title: this.$t('rules.code'),
            icon: "none",
          });
        } else {
          let url = _this.$globalApi.sendVerifyCode;
          let datas = _this.formData;
          _this.$res.postRequest(url, datas).then((res) => {
            console.log(res);
            if (res.data.code == 0) {
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
            } 
            else if (res.data.code == 1000) {
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
            } 
            else {
              uni.showToast({
                title: res.data.msg,
                icon: "none",
              });
            }
          });
        }
      }
    },

    gotosetpassword() {
      let _this = this;
      if (!_this.formData.username) {
        uni.showToast({
          title: this.$t('rules.username'),
          icon: "none",
        });
        return false;
      }
      if (!_this.formData.contact) {
        uni.showToast({
          title: this.$t('rules.phoneNo'),
          icon: "none",
        });
        return false;
      }

      if (publicMethod.phonereg(_this.formData.contact) === false) {
        uni.showToast({
          title: this.$t('rules.phoneNo'),
          icon: "none",
        });
        return false;
      }
      if (!_this.formData.verifyCode) {
        uni.showToast({
          title: this.$t('rules.code'),
          icon: "none",
        });
        return false;
      }
      let url = _this.$globalApi.checkVerifyCode;
      let datas = _this.formData;
	  _this.$res.postRequest(url, datas).then((res) => {
        if (res.data.code == 0) {
          uni.navigateTo({
            url:
              "/pages/newpassword/newpassword?username=" +
              _this.formData.username +
              "&contact=" +
              _this.formData.contact,
          });
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
        }
        // console.log("效验验证码是否正确", res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  background-color: #ffffff;

  .goto {
    width: 22rpx;
    height: 38rpx;
    position: absolute;
    top: 18rpx;
    left: 54rpx;

    image {
      display: block;
      width: 100%;
    }
  }

  .signup_name {
    margin-top: 290rpx;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #bf1c05;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 52rpx;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .signup_instructions {
    margin-top: 12rpx;
    color: #bf1c05;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .getpass {
    width: 232rpx;
    height: 74rpx;
    background: url("../../static/login/login_button.png") no-repeat;
    background-size: 100% 100%;
    margin: auto;
    margin-top: 80rpx;
    color: #fff;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .form {
    .forminpu {
      margin: 0 auto;
      margin-top: 172rpx;

      .input {
        width: 594rpx;
        height: 54rpx;
        position: relative;
        margin-bottom: 44rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 2rpx solid #781000;

        input {
          width: 530rpx;
          color: #781000;
          margin-top: 18rpx;
        }
      }

      .marginbotms {
        height: 80rpx;
        position: relative;
        box-sizing: border-box;
        flex-direction: row;
        border-bottom: 2rpx solid #e7e7e7;

        input {
          width: 530rpx;
         // height: 100%;
          margin-left: -46rpx;
          margin-top: -13rpx;
        }


        
      }
    }
  }
}

.noclick {
  background: #9eadbd !important;
  position: absolute;
  font-size: 24rpx;
}

input {
  font-size: 32rpx !important;
}

/deep/.uni-input-placeholder {
  width: 430rpx;
 // height: 100%;
  color: #b53d1e;
  font-family: Microsoft YaHei UI;
  font-size: 32rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
 // margin-bottom: -38px;
}

/deep/.uni-input-input {
  width: 430rpx;
 // height: 100%;
  color: #b53d1e;
  font-family: Microsoft YaHei UI;
  font-size: 32rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
 // margin-bottom: -15px;
}
/deep/ uni-input{
  width: 560rpx !important;
  color: #781000;
  margin-top: 0rpx !important;
}
.yzmbtn{
  min-width: 254rpx;
  height: 44rpx;
  border-radius: 22rpx;
  color: #fff;
  background: #BF1C05;
  position: absolute;
  right: 0px;
  top: 24rpx;
  text-align: center;
  padding: 0 20rpx;
  font-size: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;  
}
</style>
