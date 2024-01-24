<template>
  <view class="service">
    <loading :isshow="isshow" :ale="true"></loading>

    <zhnavbar
      :title="$t('customer_support_View.customer_support')"
      :lefticon="lefticon"
    ></zhnavbar>
    <view class="lxkfmk">
      <view class="headimgTxt">
        <view class="img">
          <image
            src="../../static/service/profiler.png"
            mode="widthFix"
          ></image>
        </view>
        <view class="txt">
          <h2 title="汛利娱乐客服">{{ $t("customer_support_View.title") }}</h2>
          <view>{{ $t("customer_support_View.at_your_service") }}</view>
        </view>
      </view>
    </view>
    <view class="twobtn">
      <view :class="{ active: index == 0 }" @click="xzClick(0)">{{
        $t("customer_support_View.main_line")
      }}</view>
      <view :class="{ active: index == 1 }" @click="xzClick(1)">{{
        $t("customer_support_View.vice_line")
      }}</view>
    </view>
    <view class="listbtn">
      <view style="padding: 52rpx 78rpx; margin-top: 60rpx">
        <view class="title"
          ><span style="border-bottom: 2rpx solid #404261">{{
            $t("customer_support_View.recommendations_lbl")
          }}</span></view
        >
        <view class="one" @click="cjwt">
          <view class="left">
            <image
              class="image1"
              src="../../static/service/ke1.png"
              mode=""
            ></image>
            <view class="txt">{{
              $t("customer_support_View.common_problems_lbl")
            }}</view>
          </view>
          <view class="right"> </view>
        </view>
        <view class="one" @click="play">
          <view class="left">
            <image
              class="image2"
              src="../../static/service/j7.png"
              mode=""
            ></image>
            <view class="txt">{{
              $t("customer_support_View.game_problems_lbl")
            }}</view>
          </view>
          <view class="right"> </view>
        </view>
        <view class="one" @click="self">
          <view class="left">
            <image
              class="image3"
              src="../../static/service/ke3.png"
              mode=""
            ></image>
            <view class="txt">{{
              $t("customer_support_View.corporate_affairs_lbl")
            }}</view>
          </view>
          <view class="right"> </view>
        </view>
        <navigator url="/pages/setting/contact/contact" class="one">
          <view class="left">
            <image
              class="image4"
              src="../../static/service/j3.png"
              mode=""
            ></image>
            <view class="txt">{{ $t("contact_us.contact_us_title") }}</view>
          </view>
          <view class="right"> </view>
        </navigator>
        <view class="one" @click="lxwe">
          <view class="left">
            <image
              class="image5"
              src="../../static/service/sponsor.png"
              mode=""
            ></image>
            <view class="txt">{{ $t("about_us.about_us_subtitle") }}</view>
          </view>
          <view class="right"> </view>
        </view>
      </view>
    </view>

    <view v-show="userFeedbackHidden" class="maskLayer">
      <view class="popup_content">
        <view class="image_top"></view>
        <image
          class="se"
          @click="xzClick(5)"
          src="../../static/service/xx.png"
          mode="widthFix"
        ></image>
        <view class="tips">{{ $t("general.tip") }}</view>
        <view
          class="upper_classs"
          v-html="$t('customer_support_View.vice_line_desc')"
        >
        </view>
        <view @click="btnLink" class="f-a qer">
          <view
            class="title f-c"
            :style="{
              backgroundColor: quedtext === $t('general.go') ? '#BE1C05' : '',
            }"
            >{{ quedtext }}</view
          >
        </view>
      </view>
    </view>

    <view v-show="userFeedbackHidden1" class="cardlayer">
      <view class="popup_cardlayer">
        <image
          class="down_image"
          src="../../static/service/download.png"
          mode="widthFix"
        ></image>
        <image
          style="background: none"
          @click="userFeedbackHidden1 = false"
          class="image2"
          src="../../static/service/x.png"
          mode=""
        >
        </image>
        <view class="heading-one">{{
          $t("customer_support_View.announcement")
        }}</view>

        <view class="text-one">{{
          $t("customer_support_View.respected_user")
        }}</view>
        <view class="text-two">{{
          $t("customer_support_View.customer_support_desc1")
        }}</view>
        <view class="text-two">{{
          $t("customer_support_View.customer_support_desc2")
        }}</view>
        <view class="text-two">{{
          $t("customer_support_View.customer_support_desc3")
        }}</view>
        <view class="input_value f-c">
          <view class="xunli_url">http://m.xunli10.com</view>
        </view>
        <view class="btns_for_games f-a">
          <view class="g_btn_2 f-c" @click="navClick(1)">{{
            $t("general.copy_url")
          }}</view>
          <view class="g_btn_2 f-c" @click="downBtn()">{{
            $t("general.download_app")
          }}</view>
        </view>
      </view>
    </view>

    <publicNav :active="2"></publicNav>
    <movable-view :x="x" :y="y" direction="all" @click="movable"></movable-view>

    
  </view>
</template>

<script>
import state from "../../store/state";
import { mapState } from "vuex";
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      //navtitle: "",
      lefticon: false,
      inStatu: true,
      index: 0,
      isshow: false,
      quedtext: 3,
      userFeedbackHidden: false,
      userFeedbackHidden1: false,
      donwUrl: "", //copy
      nav: 0,
      x: 0,
      y: 0,
      donw: "", //down
      indexUrl: "",
    };
  },
  computed: {
    ...mapState({
      static: (state) => state.static,
    }),
  },
  watch: {
    static() {
      this.dataFx();
    },
  },
  onLoad() {
    this.dataFx();
  },
  methods: {
    navClick(e) {
      this.nav = e;

      if (this.nav == 1) {
        this.$copy(this.donwUrl);
      }
      if (this.nav == 0) {
        this.userFeedbackHidden1 = false;
      }
    },
    downBtn() {
      this.isshow = false;
      window.location.href = state.down;
    },
    xzClick(e) {
      this.index = e;

      if (e === 1) {
        this.quedtext = 3;

        this.userFeedbackHidden = true;
        let n = 3; // Set the initial value of the countdown (in seconds)

        const timer = setInterval(() => {
          n--;

          if (n <= 0) {
            clearInterval(timer);
            this.quedtext = this.$t("general.go");

            return;
          } else {
            this.quedtext = n;
          }
        }, 1000);
      } else if (e === 0) {
        // Do something when the button with index 0 is clicked
        uni.navigateTo({
          url: "./serviceDtl",
        });
      } else if (e == 5) {
        this.index = 1;
        this.userFeedbackHidden = false;
      }
    },
    cjwt() {
      uni.navigateTo({
        url: "/pages/setting/help/help",
      });
    },
    play() {
      uni.navigateTo({
        url: "/pages/help/game_play_tutorial",
      });
    },
    self() {
      uni.navigateTo({
        url: "/pages/setting/about/about",
      });
    },
    lxwe() {
      uni.navigateTo({
        url: "/pages/sponsor/sponsor",
      });
    },
    btnLink() {
      if (this.quedtext == this.$t("general.go")) {
        uni.navigateTo({
          url: "./serviceDtl",
        });
      }
    },
    dataFx() {
      if (state.static) {
        this.typeFx();
      }
    },
    typeFx() {
      let ran = navigator.userAgent;
      let isAndroid = ran.indexOf("Android") > -1 || ran.indexOf("Linux") > -1;
      let isIOS = !!ran.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      state.static.downloadInfo.forEach((element) => {
        if (element.deviceName == "moblieWeb") {
          this.donwUrl = element.indexUrl;
        }
      });

      if (isAndroid) {
        state.static.downloadInfo.forEach((element) => {
          if (element.deviceName == "andriod") {
            this.donw = element.downloadUrl;
          }
        });
        // 安卓代码块
      }
      if (isIOS) {
        state.static.downloadInfo.forEach((element) => {
          if (element.deviceName == "iOS") {
            this.donwIos = element.downloadUrl;
          }
        });
        // ios代码块
      }
    },
    movable() {
      this.userFeedbackHidden1 = true;
    },
  },
};
</script>
<style>
view {
  letter-spacing: 2.8rpx;
}
span {
  letter-spacing: 2.8rpx;
}
movable-view {
  position: fixed;
  top: 76%;
  left: 79%;
  width: 152rpx;
  height: 160rpx;
  background: url("../../static/service/ke-icon.png");
  background-size: cover;
}
</style>
<style lang="scss" scoped>
page {
  background: #ffffff;
}

.cardlayer {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  display: block;

  .popup_cardlayer {
    background: #ffffff;
    border-radius: 30rpx;
    position: fixed;
    top: 846rpx;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 594rpx;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    .down_image {
      width: 328rpx;
      height: 340rpx;
      position: fixed !important;
      top: -14%;
      left: 52%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    .image2 {
      width: 32rpx;
      height: 32rpx;
      z-index: 13;
      top: 36rpx;
      left: 524rpx;
      position: absolute;
    }

    .heading-one {
      color: #be1c05;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30rpx;
      letter-spacing: -0.5px;
      padding: 88rpx 164rpx 0 164rpx;
    }

    .text-one {
      color: #304258;
      text-align: left;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30rpx; /* 125% */
      letter-spacing: -0.5px;
      padding: 28rpx 50rpx 0 50rpx;
    }
    .text-two {
      color: #304258;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx; /* 125% */
      letter-spacing: -0.5px;
      padding: 6rpx 50rpx 0 50rpx;
    }

    .input_value {
      padding-top: 66rpx;
      border-bottom: 4rpx dashed;
      color: #be1c05;
      width: 336rpx;
      margin: auto;
      padding-bottom: 14rpx;

      .xunli_url {
        color: #be1c05;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 30rpx; /* 93.75% */
        letter-spacing: -0.5px;
      }
    }
    .btns_for_games {
      padding: 46rpx 22rpx 30rpx 22rpx;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx; /* 125% */
      letter-spacing: -0.5px;
      .g_btn_2 {
        width: 264rpx;
        height: 74rpx;
        border-radius: 22rpx;
        background: #be1c05;
      }
    }
  }
}

.maskLayer {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: block;

  .popup_content {
    width: 594rpx;
    max-height: 594rpx;
    background: #ffffff;
    border-radius: 40rpx;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .se {
      position: relative;
      height: 32rpx;
      width: 32rpx;
      left: 524rpx;
      bottom: 24rpx;
    }
    .image_top {
      background: url("../../static/index/tips.png") no-repeat;
      background-size: 100% 100%;
      width: 222rpx;
      height: 306rpx;
      margin: 0 auto;
      margin-top: -250rpx;
    }
    .tips {
      color: #be1c05;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30rpx; /* 93.75% */
      letter-spacing: -0.1rpx;
    }
    .upper_classs {
      padding: 32rpx 26rpx 0 40rpx;
      color: #304258;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx; /* 125% */
      letter-spacing: 2.8rpx;
    }

    .qer {
      padding: 32rpx 76rpx 54rpx 76rpx;

      .title {
        width: 444rpx;
        height: 74rpx;
        border-radius: 22rpx;
        background: #656565;
        box-shadow: 6rpx 8rpx 16rpx 0rpx rgba(174, 81, 69, 0.5);
        color: #fff;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
        letter-spacing: -0.5px;
        cursor: pointer;
      }
    }
  }
}

.maskLayer {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: block;
}

.popup_content {
  width: 80%;
  // height: 300px;
  background: #ffffff;
  border-radius: 20rpx;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.icon-c {
  font-size: 48rpx !important;
  margin-right: 24rpx;
  color: #fff !important;
  // position: absolute;
  // right: 10px;
}

.alert-z {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -16rpx;
}

.titles {
  font-size: 36rpx;
  font-weight: 800;
  color: #111;
  width: 200rpx;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  margin: 40rpx auto;
}

.titles_2 {
  font-size: 32rpx;
  text-align: center;
  color: white;
  background: linear-gradient(#ffb68f, #f86c3b);
  margin: 40rpx auto;
  border-radius: 34rpx;
  width: 31%;
  padding: 4rpx;
}

.imgC {
  width: 120rpx;
  height: 120rpx;
  margin: 0 auto;
  margin-left: 40%;
}

.zytx {
  font-size: 40rpx;
  font-family: Microsoft YaHei UI;
  color: #f86c3b;
  text-align: center;
  line-height: 1;
  padding-top: 40rpx;
  padding-bottom: 31.2rpx;
}

.popup_content1 {
  width: 620rpx;
  background: #ffffff;
  border-radius: 20rpx;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  .text-layer {
    font-size: 28rpx;
    font-family: Microsoft YaHei UI;
    padding: 0 40rpx 40rpx 40rpx;
    color: #6c7ba8;
  }

  .xunli {
    font-size: 36rpx;
    font-weight: bold;
    font-family: Microsoft YaHei UI;
    color: #f86c3b;
    text-shadow: #f86c3b 0 4rpx 8rpx;
    text-align: center;
    border-bottom: 2rpx dashed;
    width: 500rpx;
    margin: auto;
    word-wrap: break-word;
  }

  .bottom_btn {
    border-top: 2rpx solid #ebeefd;
    display: flex;
    height: 90rpx;
    margin-top: 49rpx;

    .btn {
      height: 90rpx;
      padding: 0 92rpx 0 92rpx;
      line-height: 3;
    }

    .btn.active {
      color: #f86c3b;
    }
  }
}

.ner {
  text-align: left;
  font-size: 28rpx;
  font-weight: 500;
  color: #000000;
  width: 100%;
  padding: 10rpx 48rpx;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.service {
  background: #ffffff;

  .lxkfmk {
    width: 100%;
    overflow: hidden;
    padding: 30rpx 0 0 86.72rpx;
    box-sizing: border-box;

    .headimgTxt {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      // padding-bottom: 30rpx;
      box-sizing: border-box;

      .img {
        width: 100rpx;
        height: 125rpx;
        margin-right: 36rpx;

        image {
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      .txt {
        h2:nth-child(1) {
          color: #304258;
          font-family: Microsoft YaHei UI;
          font-size: 28rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 30.1rpx;
          /* 110.714% */
          letter-spacing: -0.1rpx;
        }

        view:nth-child(2) {
          color: #96a8be;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          /* 166.667% */
          letter-spacing: -0.1rpx;
        }
      }
    }
  }

  .twobtn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 56rpx;

    view {
      width: 226rpx;
      height: 54rpx;
      background: #ed876d;
      border-radius: 108rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 14rpx;
      margin-right: 14rpx;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      /* 166.667% */
      letter-spacing: -0.1rpx;
    }

    .active {
      background: #b53d1e;
      //  color: #fff;
    }
  }

  .listbtn {
    width: 100%;
    box-sizing: border-box;
    background: #e9e9e9;

    .title {
      box-sizing: border-box;
      position: relative;
      color: #304258;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30.1rpx;
      letter-spacing: -0.1rpx;
      margin-bottom: 26rpx;
    }

    .one {
      padding: 26rpx 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      // border-bottom: 2rpx solid #f1f2f8;

      .left {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        .image1 {
          display: block;
          width: 20rpx;
          height: 40rpx;
          margin-right: 34rpx;
          margin-left: 10rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .image2 {
          display: block;
          width: 52.1388rpx;
          height: 26.1888rpx;
          margin-right: 14rpx;
          margin-left: -8rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .image3 {
          display: block;
          width: 48rpx;
          height: 40rpx;
          margin-right: 18rpx;
          margin-left: -2rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .image4 {
          display: block;
          width: 48.894rpx;
          height: 44.346rpx;
          margin-right: 16rpx;
          margin-left: -2rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .image5 {
          display: block;
          width: 36rpx;
          height: 44rpx;
          margin-right: 20rpx;
          margin-left: 6rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .txt {
          color: #292c3b;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .right {
        width: 22rpx;
        height: 36rpx;
        text-align: right;
        background: url("../../static/service/leftjt.png") no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        transform: rotate(180deg);
        opacity: 0.5;
      }

      .right:hover {
        background: url("../../static/service/leftjt_active.png") no-repeat;
      }
    }
  }
}

.copy-btn {
  height: 100%;
  flex: 2;
  color: #404261;
  font-size: 32rpx;
}

.copy-btn.s {
  color: #f86c3b;
  border-left: 2rpx solid #ebeefd;
}
</style>
