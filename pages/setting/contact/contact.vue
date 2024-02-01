<template>
  <view class="contact set-bg">
    <zhnavbar
      :title="$t('contact_us.contact_us_title')"
      :lefticon="true"
    ></zhnavbar>

    <view class="main">
      <view
        class="item-box flex-row"
        v-for="(item, index) in about"
        :key="index"
      >
        <view class="f-a">
          <view class="f-c">
            <image
              class="imgs"
              :src="iconUrl + item.contactIcon"
              mode="widthFix"
            ></image>
          </view>
          <view class="flex-col">
            <view class="tit flex-row">
              {{ item.contactName }}
            </view>
            <view class="email line1">
              {{ item.contactInfo }}
            </view>
          </view>
        </view>

        <view class="btn f-c" @tap="$copy(item.contactInfo)">
          <view class="btn-text">
            {{ $t("contact_us_view.copy") }}
          </view>
        </view>
      </view>
      <navigator url="/pages/service/serviceDtl" class="button_class f-c">
        <view class="texts">{{
          $t("contact_us_view.all_day_night_service")
        }}</view>
      </navigator>
    </view>
    <view class="border_bottom"> </view>
  </view>
</template>

<script>
import state from "@/store/state";
import { localizationMixin } from "../../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      about: [],
      serviceLink: "",
      colors: ["#D9D9D9", "#EFEFEF", "#D9D9D9"],
    };
  },
  created() {
    let that = this;
    that.$logins();
    that.about = uni.getStorageSync("staticResources").contactUsInfo;
    that.iconUrl = state.iconUrl;
  },
  methods: {},
};
</script>

<style lang="scss">
.contact {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  .main {
    width: 100%;
    height: 118rpx;
    margin: auto;
    margin-top: 20rpx;
    height: calc(100vh - 200rpx);
    background: #ffffff;
    box-sizing: border-box;

    .item-box {
      width: 100%;
      line-height: normal;
      padding: 36rpx 68rpx 36rpx 52rpx;

      .flex-col {
        align-items: flex-start;
        margin: auto auto auto 24.1rpx;
      }

      .imgs {
        width: 46.1894rpx;
      }

      .tit {
        color: #003b3d;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        justify-content: flex-start;
      }

      .email {
        user-select: text;
        color: #d9d9d9;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .btn {
        color: #00a9f2;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: center;
      }
    }

    .button_class {
      width: 366rpx;
      height: 66rpx;
      margin: 0 auto;
      border-radius: 24rpx;
      background: #003b3d;
      box-shadow: 0 0 20rpx 0 #008d91;
      margin-top: 70rpx;

      .texts {
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: -0.1rpx;
        margin-left: 22rpx;
      }
    }
  }

  .border_bottom {
    width: 202rpx;
    height: 0rpx;
    border: 4rpx solid #000000;
    border-radius: 100rpx;
    margin: 20rpx 274rpx 38rpx 274rpx;
  }
}
</style>
