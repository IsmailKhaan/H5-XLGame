<template>
  <view class="sponsor">
    <zhnavbar :title="$t('sponsorship_page.sponsor_ship_title')" :lefticon="lefticon" v-if="inStatu"></zhnavbar>
    <view class="lunbo">
      <image src="../../static/sponsor/1.jpg" mode="widthFix"></image>
    </view>
    <view class="imgtext">
      <image src="../../static/sponsor/2.jpg" mode="widthFix"></image>
      <view class="txt">
       {{ $t('sponsorship_page.description1') }}
        <br> <br>
        {{ $t('sponsorship_page.description2') }}
      </view>
    </view>
    <image class="logolist" src="../../static/sponsor/img-3.png" mode="widthFix"></image>
    <navigator @click="deil('https://www.juventus.com/cn')">
      <view class="partner_address f-c" >  {{ $t('sponsorship_page.partners_address') }}</view>
    </navigator>
    <view class="above_btn_info f-c"> {{ $t('sponsorship_page.description3') }}</view>
    <view class="jianbei">
      <view class="one">
        <image src="../../static/sponsor/cup-1.png" mode="widthFix"></image>
        <view class="num">38</view>
        <view class="txt">
          <view class="cityy" v-html="$en($store.state.ens.sponsorship_page.champion_league)">
          </view>
        </view>
      </view>
      <view class="one">
        <image src="../../static/sponsor/cup-2.png" mode="widthFix"></image>
        <view class="num">38</view>
        <view class="txt">
          <view class="cityy" v-html="$en($store.state.ens.sponsorship_page.champion_league)">
          </view>
        </view>
      </view>
      <view class="one">
        <image src="../../static/sponsor/cup-3.png" mode="widthFix"></image>
        <view class="num">38</view>
        <view class="txt">
          <view class="cityy" v-html="$en($store.state.ens.sponsorship_page.champion_league)">
          </view>
        </view>
      </view>
      <view class="one">
        <image src="../../static/sponsor/cup-4.png" mode="widthFix"></image>
        <view class="num">38</view>
        <view class="txt">
          <view class="cityy" v-html="$en($store.state.ens.sponsorship_page.champion_league)">
          </view>
        </view>
      </view>
      <view class="one">
        <image src="../../static/sponsor/cup-5.png" mode="widthFix"></image>
        <view class="num">38</view>
        <view class="txt">
          <view class="cityy" v-html="$en($store.state.ens.sponsorship_page.champion_league)">
          </view>
        </view>
      </view>
      <view class="one">
        <image src="../../static/sponsor/cup-6.png" mode="widthFix"></image>
        <view class="num">38</view>
        <view class="txt">
          <view class="cityy" v-html="$en($store.state.ens.sponsorship_page.champion_league)">
          </view>
        </view>
      </view>
    </view>

    <view class="hyzuijia">
      <view class="bgimg">
        <view class="best f-c">{{ $t('sponsorship_page.best_industry') }}</view>
        <image src="../../static/sponsor/title-3.png" mode="widthFix" class="title f-c"></image>
        <image src="../../static/sponsor/3.jpg" mode="widthFix" class="lb"></image>
        <image src="../../static/sponsor/text-title.png" mode="widthFix" class="lb"></image>
        <view class="littitle">{{ $t('sponsorship_page.professional_entertainment_desc') }}</view>
        <view class="list">
          <view class="one">
            <image src="../../static/sponsor/img-5.png" mode="widthFix"></image>
            <view class="txt">
              <view class="bt">{{ $t('sponsorship_page.safer') }}</view>
              <view class="xz">
                <view v-html="$t('sponsorship_page.safer_desc')"></view>
                
              </view>
            </view>
          </view>
          <view class="one">
            <image src="../../static/sponsor/img-6.png" mode="widthFix"></image>
            <view class="txt">
              <view class="bt">{{ $t('sponsorship_page.more_stable') }}</view>
              <view class="xz">
                <view v-html="$t('sponsorship_page.more_stable_desc')"></view>
              </view>
            </view>
          </view>
          <view class="one">
            <image src="../../static/sponsor/img-7.png" mode="widthFix"></image>
            <view class="txt">
              <view class="bt">{{ $t('sponsorship_page.richer') }}</view>
              <view class="xz">
                <view v-html="$t('sponsorship_page.richer_desc')"></view>
              </view>
            </view>
          </view>
          <view class="one">
            <image src="../../static/sponsor/img-8.png" mode="widthFix"></image>
            <view class="txt">
              <view class="bt">{{ $t('sponsorship_page.more_private') }}</view>
              <view class="xz">
                <view v-html="$t('sponsorship_page.more_private_desc')"></view>
              </view>
            </view>
          </view>
        </view>
        <image src="../../static/sponsor/img-9.png" class="logoimg" mode="widthFix"></image>
      </view>
    </view>

    <!-- <publicNav :active="4" v-if="inStatu"></publicNav> -->
  </view>
</template>

<script>
import zhnavbar from "@/components/zh-navbar/zh-navbar.vue";
import publicNav from "@/components/publicNav/publicNav.vue";
import { localizationMixin } from '../../common/js/localization';
  export default {
	mixins: [localizationMixin],
  data() {
    return {
    //  navtitle: "Sponsorship Partner",
      inStatu: true,
      lefticon: true,
    }
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
  }
}
</script>

<style lang="scss" scoped>
.partner_address{
background: url("../../static/sponsor/btn-1.png") no-repeat;
background-size: 100% 100%;
width: 384.0142rpx;
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
  >.lunbo {
    width: 100%;

    image {
      display: block;
      width: 100%;
    }
  }

  >.imgtext {
    padding: 42rpx 0 58rpx 0;
    box-sizing: border-box;

    image {
      display: block;
      width: 100%;
      border-radius: 20rpx;
      margin-bottom: 30rpx;
    }

    .txt {
      color: #A4A7B6;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 0rpx 66rpx 0rpx 58rpx;

    }
  }

  >.logolist {
    display: block;
    width: 504rpx;
    height: 76rpx;
    margin: 10rpx auto 20rpx;
  }

  >navigator {
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
    color: #D7D7D7;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .jianbei {
    padding: 0 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 104rpx;

    .one {
      width: 30%;
      text-align: center;

      image {
        width: 122rpx;
        height: 140rpx;
        display: block;
        margin: 0 auto;
      }

      .num {
        color: #B33B1D;
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
          color: #292C3B;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          padding-top: 14rpx;
        }

        .ji {
          color: #292C3B;
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
      
      >.title {
        width: 230rpx;
        height: 62rpx;
        margin: auto;
      }
.best{
  color: #304258;
text-align: center;
font-family: Microsoft YaHei UI;
font-size: 36rpx;
font-style: normal;
font-weight: 700;
line-height: 60rpx; /* 111.111% */
letter-spacing: -0.10rpx;
}
      .lb {
        display: block;
        width: 100%;
      }

      .txttitle {
        text-align: center;
      }

      .littitle {
        color: #304258;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        /* 166.667% */
        letter-spacing: -0.10rpx;
        margin-bottom: 120rpx; 
      }

      .list {
        /*  display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;*/

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
              color: #304258;
              font-family: Microsoft YaHei UI;
              font-size: 28rpx;
              font-style: normal;
              font-weight: 700;
              line-height: 40rpx;
              /* 142.857% */
              letter-spacing: -0.10rpx;
              margin-bottom: -5rpx;

            }

            .xz {
              color: #304258;
              font-family: Microsoft YaHei UI;
              font-size: 24rpx;
              font-style: normal;
              font-weight: 400;
              line-height: 40rpx; /* 166.667% */
              letter-spacing: -0.10rpx;

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