<template>
  <view class="email set-bg">
    <loading :isshow="isshow"></loading>
    <zhnavbar :title="$t('personel_info.email_address')" :lefticon="true"></zhnavbar>

    <div class="w100" v-if="isbind">
      <div class="bor-list">
        <text class="names">{{ $t("personel_info.email_address") }}</text>
        <text class="info"> {{ baseInfo.email }}</text>
      </div>
    </div>
    <div class="w100" v-if="!isbind">
      <div
        class="bor-list"
        style="border-bottom: 1px solid rgba(0, 0, 0, 0.5); margin-bottom: 12px"
      >
        <text class="names">{{ $t("personel_info.email_address") }}</text>
        <input
          type="text"
          value=""
          :placeholder="$t('personel_info.email_placeholder')"
          placeholder-class="pla"
          class="inputs"
          v-model="email"
          maxlength="50"
        />
      </div>
      <div class="bor-list">
        <text class="names">{{
          $t("personel_info.verification_code_lbl")
        }}</text>
        <input
          type="text"
          :placeholder="$t('personel_info.verificaion_code_placeholder')"
          placeholder-class="pla"
          class="inputs"
          v-model="emailCode"
          maxlength="25"
        />
        <button
          type="primary"
          size="mini"
          class="ma"
          @tap="getEmailCode()"
          v-if="show"
        >
          {{ $t("personel_info.verification_code_lbl") }}
        </button>

        <button
          type="primary"
          size="mini"
          class="ma1"
          @tap="getEmailCode()"
          v-if="!show"
        >
          {{ count }}秒
        </button>

      </div>
    </div>
    <div class="f-c">
      <view class="bor-btns f-c" @tap="setEmail()" v-if="!isbind">{{
        $t("general.submit")
      }}</view>
    </div>
    <view class="titleSdk">
      {{ $t("personel_info.actualName_des_lbl") }}
      <span @click="kefu()">{{ $t("personel_info.actualname_des_2") }}</span>
    </view>
  </view>
</template>

<script>
//   import RequestSender from "@/common/js/request.js";
import state from "@/store/state";

import CommonMethods from "@/common/js/methods.js";
import tips from "@/components/tips/tips.vue";
// import loading from "@/components/loading.vue";
import { mapState, mapMutations, mapAction } from "vuex";
import { localizationMixin } from "../../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      email: "",
      emailCode: "", //邮箱验证码
      info: false,
      infoMsg: "",
      show: true,
      count: "",
      timer: null,
      isshow: 0,
    };
  },
  computed: {
    ...mapState({
      isbind: (state) => state.safety.phone,
      baseInfo: (state) => state.baseInfo,
    }),
    isbind: {
      get() {
        return this.$store.state.safety.email;
      },
      set(val) {
        this.$store.state.safety.email = val;
      },
    },
    baseInfo() {
      return this.$store.state.baseInfo;
    },
  },
  onLoad() {
    this.$logins();
  },
  components: {
    tips,
    // loading,
  },
  methods: {
    kefu() {
      uni.navigateTo({
        url: "/pages/service/serviceDtl",
      });
    },
    setEmail() {
      if (!this.$Ymail.test(this.email)) {
        uni.showToast({
          title:  this.$t('rules.email'),
          icon: "none",
        });
        return;
      }
      if (this.emailCode.length < 3) {
        uni.showToast({
          title: this.$t('rules.code'),
          icon: "none",
        });
        return;
      }

      let datas = {
        emailCode: this.emailCode,
        email: this.email,
      };
      let url = this.$globalApi.userBindbindEmail;
      uni.showLoading({ title: "请稍等" });
      this.isshow = 1;
      this.$res.postRequest(url, datas)
        .then((res) => {
          this.isshow = 0;
          if (res.data.code == 0) {
			uni.navigateTo({
              url: "/pages/baseinfo/baseinfo",
            });
            this.info = true;
            this.infoMsg = res.data.msg;
           CommonMethods.getSafety();
            this.getUserInfo();
            this.isbind = true;
            uni.navigateTo({
              url: "/pages/baseinfo/baseinfo",
            });
			uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
          }
          else {
            this.info = true;
            this.infoMsg = res.data.msg;
                uni.showToast({
                  title: res.data.msg,
                  icon: "none",
                });
          }
        })
     
    },
    getEmailCode() {
      if (!this.$Ymail.test(this.email)) {
        uni.showToast({
          title: "请输入正确邮箱格式",
          icon: "none",
        });
        return;
      }
      let datas = {
        email: this.email,
      };
      let url = this.$globalApi.userBindsendEmailBindCode;
      this.$res.postRequest(url, datas).then((res) => {
        if (res.data.code == 0) {
          this.info = true;
          this.infoMsg = res.data.msg;
          uni.showToast({
            title:state.codes[res.data.code],
            icon: "none",
          });
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
          }
          setTimeout(() => {
            this.info = false;
            this.infoMsg = "";
          }, 3000);
        } else {
          // this.info = true;
          // this.infoMsg = res.data.msg;
          uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
        }
      });
    },
    getUserInfo() {
      let url = this.$globalApi.memberInfo;
      this.$res
        .postRequest(url)
        .then((res) => {
          this.$store.dispatch("BASE_INFO", res.data.data);
        })
        // .catch((err) => {
        //   if (err == "999") {
        //     uni.navigateTo({
        //       url: "../../error/error",
        //     });
        //   } else {
        //     this.info = true;
        //     this.infoType = "error";
        //     this.infoMsg = "当前网络不稳定，请重试";
        //     this.account = "";
        //     setTimeout(() => {
        //       this.info = false;
        //     }, 1800);
        //   }
        // });
    },
  },
};
</script>

<style lang="scss">
.titleSdk {
  width: 532rpx;
  margin: 0 auto;
  margin-top: 62rpx;
  color: #292d32;
  text-align: center;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    color: #be1c05;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.w100 {
  padding: 0 50rpx 0 50rpx;
}
.ma1 {
  width: 246rpx;
  position: absolute;
  right: 40rpx;
  bottom: 14rpx;
  color: #fff;
  text-align: center;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 44rpx;
  border-radius: 22rpx;
  background: #ababab;
  padding-top: 6rpx;
}
</style>
