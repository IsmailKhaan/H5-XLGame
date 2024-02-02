<template>
  <view class="name set-bg">
    <zhnavbar
      :title="$t('personel_info.actual_name')"
      :lefticon="true"
      style="margin-bottom: 6rpx"
    ></zhnavbar>
    <div class="w100 bor-shadow" v-if="baseInfo.identityCard">
      <div class="bor-list">
        <text class="names ok-names">{{ $t("personel_info.actual_name") }}</text>
        <text class="info"> {{ baseInfo.realName }}</text>
      </div>
      <div class="bor-list">
        <text class="names ok-names">{{ $t("personel_info.id_number_lbl") }}</text>
        <text class="info"> {{ baseInfo.identityCard }}</text>
      </div>
    </div>
    <!--  -->
    <div v-if="!baseInfo.identityCard">
      <div class="w100 bor-shadow">
        <div
          class="bor-list"
          style="
            border-bottom: 1px solid rgba(0, 0, 0, 0.5);
            margin-bottom: 12px;
          "
        >
          <text class="names">{{ $t("personel_info.actual_name") }}</text>
          <input
            type="text"
            value=""
            :placeholder="$t('personel_info.enter_your_name_placeholder')"
            placeholder-class="pla"
            class="inputs"
            v-model="realName"
            maxlength="25"
          />
        </div>
        <div class="bor-list">
          <text class="names">{{ $t("personel_info.id_number_lbl") }}</text>
          <input
            type="text"
            value=""
            :placeholder="$t('personel_info.enter_your_id_placeholder')"
            placeholder-class="pla"
            class="inputs"
            v-model="idCard"
            maxlength="18"
          />
        </div>
      </div>
      <div class="f-c">
        <view class="bor-btns f-c" @tap="user()">{{
          $t("general.submit")
        }}</view>
      </div>
      <view class="titleSdk">
        {{ $t("personel_info.actualName_des_lbl") }}
        <span @click="aboutFx()">{{
          $t("personel_info.actualname_des_2")
        }}</span>
      </view>
    </div>

  </view>
</template>

<script>
import { mapState, mapMutations, mapAction } from "vuex";
import state from "@/store/state";

import { localizationMixin } from "../../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      realName: "",
      idCard: "",
      index: 0,
    };
  },
  computed: {
    ...mapState({
      baseInfo: (state) => state.info,
    }),
  },
  onLoad() {
    this.$logins();
  },
  methods: {
    aboutFx() {
      uni.navigateTo({
        url: "/pages/service/serviceDtl",
      });
    },
 
    user() {
      if (this.realName == '') {
        uni.showToast({
          title: this.$t("rules.name"),
          icon: "none",
        });
        return;
      } else if (!state.rule.idCard.test(this.idCard)) {
		uni.showToast({
          title: this.$t("rules.idCard"),
          icon: "none",
        });
        return;
      }
      this.postUser();
    },
    postUser() {
      let datas = {
        realName: this.realName,
        idCard: this.idCard,
      };
      let url = this.$globalApi.userBindbindRealInfo;
      uni.showLoading({ title: "请稍等" });
      this.$res.postRequest(url, datas).then((res) => {
        if (res.data.code == 0) {
          state.info.identityCard = this.idCard;
          state.info.realName = this.realName;
          uni.setStorageSync("zsInfo", state.info);
		  uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateTo({
              url: "/pages/baseinfo/baseinfo",
            });
          }, 1000);
        } else {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
            duration: 2000,
          });
        }
        uni.hideLoading();
      });
    },
  },
};
</script>

<style lang="scss">
.w100 {
  padding: 0 50rpx 0 50rpx;
}

.name {
  width: 100%;

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
      color: #008D91;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .white-bg {
    margin: 0 auto;
    margin-top: 30rpx;
    width: 100%;
    // border-top: 1px solid #E5E5E5;
    box-sizing: border-box;
    border-radius: 20rpx;

    .true-name,
    .id-card {
      width: 100%;
      padding: 20rpx;
      box-sizing: border-box;
      align-items: flex-start;
    }

    .true-name {
      // border-bottom: 1px solid #e2e2e2;
    }

    .tit {
      font-weight: 600;
      font-size: 32rpx;
    }

    .info {
      font-size: 30rpx;
      color: #b5b5b5;
    }
  }

  .input {
    font-size: 28rpx;
  }

  .input1 {
    width: 600rpx;
  }

  .wancheng {
    width: 600rpx;
    height: 80rpx;
    background: url("../../../static/service/btn-2-bg.png");
    background-size: 100% 100%;
    color: #ffffff;
    line-height: 80rpx;
    text-align: center;
    font-size: 30rpx;
    margin-top: 40rpx;
  }

  // .btn{
  // 	margin-top: 30rpx;
  // 	width: 702rpx;
  // 	background: linear-gradient(90deg, #A1c73b, #11a23c) !important;
  // }
  .ok-names{
	margin-right:10rpx;
  }
}
</style>
