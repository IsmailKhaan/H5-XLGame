<template>
  <view class="sponsor">
    <zhnavbar
      :title="$t('sponsorship_page.sponsor_ship_title')"
      :lefticon="lefticon"
      v-if="inStatu"
    ></zhnavbar>
    <view class="lunbo">
      <image src="../../static/sponsor/1.jpg" mode="widthFix"></image>
    </view>
    <view class="imgtext">
      <!-- <image src="../../static/sponsor/2.jpg" mode="widthFix"></image> -->
      <view class="txt">
        {{ $t("sponsorship_page.description1") }}
        <br />
        <br />
        {{ $t("sponsorship_page.description2") }}
      </view>
    </view>
    <image
      class="logolist"
      src="../../static/sponsor/img-3.png"
      mode="widthFix"
    ></image>
    <navigator
      class="partner_address f-c"
      @click="deil('https://www.juventus.com/cn')"
    >
      {{ $t("sponsorship_page.partners_address") }}
    </navigator>
    <view class="above_btn_info f-c">
      {{ $t("sponsorship_page.description3") }}</view
    >
    <view class="jianbei">
      <view class="one">
        <view class="f-c">
          <image src="../../static/sponsor/cup-1.png" mode="widthFix"></image>
          <view class="text">
            <view class="num">38</view>
            <view class="txt">
              <view
                class="cityy"
                v-html="$en($store.state.ens.sponsorship_page.champion_league)"
              >
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="one">
        <view class="f-c">
          <image src="../../static/sponsor/cup-2.png" mode="widthFix"></image>
          <view class="text">
            <view class="num">38</view>
            <view class="txt">
              <view
                class="cityy"
                v-html="$en($store.state.ens.sponsorship_page.champion_league)"
              >
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="one">
        <view class="f-c">
          <image src="../../static/sponsor/cup-3.png" mode="widthFix"></image>
          <view class="text">
            <view class="num">38</view>
            <view class="txt">
              <view
                class="cityy"
                v-html="$en($store.state.ens.sponsorship_page.champion_league)"
              >
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="one">
        <view class="f-c">
          <image src="../../static/sponsor/cup-4.png" mode="widthFix"></image>
          <view class="text">
            <view class="num">38</view>
            <view class="txt">
              <view
                class="cityy"
                v-html="$en($store.state.ens.sponsorship_page.champion_league)"
              >
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="one">
        <view class="f-c">
          <image src="../../static/sponsor/cup-5.png" mode="widthFix"></image>
          <view class="text">
            <view class="num">38</view>
            <view class="txt">
              <view
                class="cityy"
                v-html="$en($store.state.ens.sponsorship_page.champion_league)"
              >
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="one">
        <view class="f-c">
          <image src="../../static/sponsor/cup-6.png" mode="widthFix"></image>
          <view class="text">
            <view class="num">38</view>
            <view class="txt">
              <view
                class="cityy"
                v-html="$en($store.state.ens.sponsorship_page.champion_league)"
              >
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="hyzuijia">
      <view class="bgimg">
        <view class="f-c">
          <view class="best">{{ $t("sponsorship_page.best_industry") }}</view>
        </view>
        <image
          src="../../static/sponsor/3.jpg"
          mode="widthFix"
          class="lb"
        ></image>
        <view class="professional">Professional native entertainment app </view>
        <view class="littitle">{{
          $t("sponsorship_page.professional_entertainment_desc")
        }}</view>
        <view class="list">
          <view class="one">
            <image src="../../static/sponsor/img-5.png" mode="widthFix"></image>
            <view class="txt">
              <view class="bt">{{ $t("sponsorship_page.safer") }}</view>
              <view class="xz">
                <view v-html="$t('sponsorship_page.safer_desc')"></view>
              </view>
            </view>
          </view>
          <view class="one">
            <image src="../../static/sponsor/img-6.png" mode="widthFix"></image>
            <view class="txt">
              <view class="bt">{{ $t("sponsorship_page.more_stable") }}</view>
              <view class="xz">
                <view v-html="$t('sponsorship_page.more_stable_desc')"></view>
              </view>
            </view>
          </view>
          <view class="one">
            <image src="../../static/sponsor/img-7.png" mode="widthFix"></image>
            <view class="txt">
              <view class="bt">{{ $t("sponsorship_page.richer") }}</view>
              <view class="xz">
                <view v-html="$t('sponsorship_page.richer_desc')"></view>
              </view>
            </view>
          </view>
          <view class="one">
            <image src="../../static/sponsor/img-8.png" mode="widthFix"></image>
            <view class="txt">
              <view class="bt">{{ $t("sponsorship_page.more_private") }}</view>
              <view class="xz">
                <view v-html="$t('sponsorship_page.more_private_desc')"></view>
              </view>
            </view>
          </view>
        </view>
        <image
          src="../../static/sponsor/img-9.png"
          class="logoimg"
          mode="widthFix"
        ></image>
      </view>
    </view>

    <!-- <publicNav :active="4" v-if="inStatu"></publicNav> -->
  </view>
</template>

<script>
import zhnavbar from "@/components/zh-navbar/zh-navbar.vue";
import publicNav from "@/components/publicNav/publicNav.vue";
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      //  navtitle: "Sponsorship Partner",
      inStatu: true,
      lefticon: true,
    };
  },
  components: {
    zhnavbar,
    publicNav,
  },

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
    console.log(params);
  },

  methods: {
    deil(html) {
      console.log(html);
      let url = html;
      window.location.href = html;
    },
  },
};
</script>

<style lang="scss" scoped>
.partner_address {
  border-radius: 12px;
  background: #003b3d;
  box-shadow: 0 0 10px 0 #008d91;
  width: 648rpx;
  height: 62.1088rpx;
  color: #ffffff;
  text-align: center;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.sponsor {
  background: #ffffff;
  //padding-bottom: 100rpx;
  box-sizing: border-box;
  > .lunbo {
    width: 100%;

    image {
      display: block;
      width: 100%;
    }
  }

  > .imgtext {
    padding: 42rpx 0 58rpx 0;
    box-sizing: border-box;

    image {
      display: block;
      width: 100%;
      border-radius: 20rpx;
      margin-bottom: 30rpx;
    }

    .txt {
      color: #a4a7b6;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 0rpx 66rpx 0rpx 58rpx;
    }
  }

  > .logolist {
    display: block;
    width: 504rpx;
    height: 76rpx;
    margin: 10rpx auto 20rpx;
    margin-bottom: 96rpx;
  }

  > navigator {
    width: 384.142rpx;
    height: 62.1088rpx;
    margin: 0 auto;

    image {
      display: block;
      width: 100%;
    }
  }

  .above_btn_info {
    margin-top: 28.92rpx;
    margin-bottom: 18rpx;
    color: #d7d7d7;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .jianbei {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 104rpx;
    gap: 48rpx;
    padding-left: 50rpx;
    .one {
      image {
        width: 122rpx;
        height: 140rpx;
        display: block;
        margin: 0 auto;
      }
      .text {
        display: flex;
        flex-direction: column;
        align-items: start;
      }
      .num {
        color: #b33b1d;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 36rpx;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-bottom: -15rpx;
      }

      .txt {
        text-align: center;

        .cityy {
          margin-bottom: -10rpx;
          color: #292c3b;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          padding-top: 14rpx;
        }

        .ji {
          color: #292c3b;
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

  .hyzuijia {
    // padding: 0 30rpx;
    box-sizing: border-box;
    margin-bottom: 60rpx;

    .bgimg {
      // background: url("../../static/sponsor/card-bg-2.png") no-repeat center center;
      position: relative;
      padding: 0 50rpx 38rpx;
      box-sizing: border-box;

      > .title {
        width: 230rpx;
        height: 62rpx;
        margin: auto;
      }
      .best {
        color: #a4a7b6;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 60rpx; /* 111.111% */
        letter-spacing: -0.1rpx;
        border-bottom: 4rpx solid #a4a7b6;
        width: fit-content;
      }
      .lb {
        display: block;
        width: 100%;
        margin: 32rpx 0;
      }

      .txttitle {
        text-align: center;
      }
      .professional {
        font-size: 24rpx;
        font-weight: bold;
        color: #003b3d;
        text-align: center;
      }
      .littitle {
        color: #008d91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        /* 166.667% */
        letter-spacing: -0.1rpx;
        margin-bottom: 120rpx;
      }

      .list {
        .one {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 60rpx;
          margin-left: 78rpx;

          image {
            width: 43px;
            display: block;
            margin-right: 52rpx;
          }

          .txt {
            .bt {
              color: #003b3d;
              font-family: Microsoft YaHei UI;
              font-size: 28rpx;
              font-style: normal;
              font-weight: 700;
              line-height: 40rpx;
              /* 142.857% */
              letter-spacing: -0.1rpx;
              margin-bottom: -5rpx;
            }

            .xz {
              color: #003b3d;
              font-family: Microsoft YaHei UI;
              font-size: 24rpx;
              font-style: normal;
              font-weight: 400;
              line-height: 40rpx; /* 166.667% */
              letter-spacing: -0.1rpx;

              view {
                font-size: 22rpx;
                color: #404261;
                margin-bottom: -10rpx;
              }
            }
          }
        }
      }
    }
  }

  .logoimg {
    display: block;
    width: 100%;
  }
}
</style>
