<template>
  <view class="help set-bg">
    <zhnavbar
      :title="$t('help_center.help_center_title')"
      :lefticon="true"
      v-if="inStatu"
    ></zhnavbar>
    <div class="main_class1">
      <view
        class="main_class2"
        v-for="(item, index) in dataList"
        :key="index"
        @tap="toChild(item.url)"
      >
        <image class="image1" :src="item.img" mode="widthFix"></image>
        <view class="texts">
          <view class="heading_text">{{ item.tit }}</view>
          <view class="details_text">{{ item.msg }}</view>
        </view>
        <image
          class="image2"
          src="../../../static/image/help/arrow.png"
          mode="widthFix"
        ></image>
      </view>
    </div>
    <!-- <view class="border_bottom"></view> -->
  </view>
</template>

<script>
import { mapState, mapMutations, mapAction } from "vuex";
import zhnavbar from "@/components/zh-navbar/zh-navbar.vue";
import { localizationMixin } from "../../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      //	navtitle: "Help Center",
      inStatu: true,
      dataList: [
        {
          img: "/static/image/help/currency.png",
          tit: "",
          msg: "",
          url: "/pages/help/virtual_deposit_tutorial",
        },
        {
          img: "/static/image/help/deposit.png",
          tit: "",
          msg: "",
          url: "/pages/help/bank_deposit_tutorial",
        },
        {
          img: "/static/image/help/withdraw.png",
          tit: "",
          msg: "",
          url: "/pages/help/withdrawal_tutorial",
        },
        {
          img: "/static/image/help/withdraw_tutorial.png",
          tit: "",
          msg: "",
          url: "/pages/help/transfer_tutorial",
        },
        {
          img: "/static/service/j7.png",
          tit: "",
          msg: "",
          url: "/pages/help/game_play_tutorial",
        },
        {
          img: "/static/image/help/betting.png",
          tit: "",
          msg: "",
          url: "/pages/help/betting_tutorial",
        },
        {
          img: "/static/image/help/light.png",
          tit: "",
          msg: "",
          url: "/pages/help/techsupport",
        },
        {
          img: "/static/image/help/wifi.png",
          tit: "",
          msg: "",
          url: "/pages/help/security_tutorial",
        },
        {
          img: "/static/service/j3.png",
          tit: "",
          msg: "",
          url: "/pages/setting/contact/contact",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      json: (json) => state.json,
    }),
    json() {
      return this.$store.state.json;
    },
  },
  components: { zhnavbar },
  onLoad() {
    let url = window.location.href;
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    let params = {};
    if (arr) {
      arr.forEach((item) => {
        let tempArr = item.substring(1).split("=");
        let key = tempArr[0];
        let val = tempArr[1];
        params[key] = val;
      });
    }
    if (params && params.type && params.type == 2173613130121) {
      this.inStatu = false;
    }
  },
  mounted() {
    this.dataList[0].tit = this.$t("help_center.virtual_currency_title");
    this.dataList[0].msg = this.$t("help_center.virtual_currency_subTitle");

    this.dataList[1].tit = this.$t("help_center.deposit_tutorial_bank");
    this.dataList[1].msg = this.$t("help_center.deposit_tutorial_subtitle");

    this.dataList[2].tit = this.$t("help_center.withdrawal_tutorial_title");
    this.dataList[2].msg = this.$t("help_center.withdrawal_tutorial_subtitle");

    this.dataList[3].tit = this.$t("help_center.transfer_tutorial_title");
    this.dataList[3].msg = this.$t("help_center.transfer_tutorial_subtitle");

    this.dataList[4].tit = this.$t("help_center.gameplay_tutorial_title");
    this.dataList[4].msg = this.$t("help_center.gameplay_tutorial_subtitle");

    this.dataList[5].tit = this.$t("help_center.betting_tutorial_title");
    this.dataList[5].msg = this.$t("help_center.betting_tutorial_subtitle");

    this.dataList[6].tit = this.$t("help_center.technical_support_title");
    this.dataList[6].msg = this.$t("help_center.technical_support_subtitle");

    this.dataList[7].tit = this.$t("help_center.anti_hijack_title");
    this.dataList[7].msg = this.$t("help_center.anti_hijack_subtitle");

    this.dataList[8].tit = this.$t("contact_us.contact_us_title");
    this.dataList[8].msg = this.$t("help_center.contact_us_subtitle");
  },
  methods: {
    toChild(url) {
      uni.navigateTo({
        url: url,
      });
    },
  },
};
</script>

<style lang="scss">
view {
  letter-spacing: 2.8rpx;
}
.help {
  width: 100%;

  .main_class1 {
    padding: 12rpx 50rpx 0 50rpx;

    .main_class2 {
      display: flex;
      align-items: center;
      border-bottom: 2rpx solid #7e97b7;
      padding: 32rpx 0 32rpx 0;

      .image1 {
        width: 48rpx;
        height: 48rpx;
        margin-right: 32rpx;
        margin-left: 14.1rpx;
      }

      .texts {
        .heading_text {
          color: #003b3d;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }

        .details_text {
          color: #003b3d;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .image2 {
        position: absolute;
        right: 56.1rpx !important;
        width: 16.1rpx !important;
        background: none;
        border-radius: none;
      }
    }
  }

  .border_bottom {
    width: 202rpx;
    height: 0rpx;
    border: 4rpx solid #000000;
    border-radius: 100rpx;
    bottom: 38rpx;
    position: fixed;
    left: 274rpx;
  }
}
</style>
