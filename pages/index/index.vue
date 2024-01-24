<template>
  <view class="content">
    <loading :isshow="isshow" :ale="true"></loading>

    <view class="swiperMesLogin" id="topview">
      <view class="swiper">
        <view class="topbar2 f-s">
          <view
            style="width: 128px; height: 44px"
            v-show="!authtoken"
            @click="login()"
          >
            <image
              class="img1"
              mode="widthFix"
              src="../../static/index/login.png"
            >
            </image>
          </view>

          <view class="f-c profiler" v-if="authtoken">
            <image
              :src="
                $store.state.user.avatar
                  ? $store.state.user.avatar
                  : '../../static/service/profiler.png'
              "
              mode="widthFix"
            ></image>
            <view class="name_and_vip_and_balance">
              <view class="f-c name_and_vips">
                <view class="name">{{ userInfo.username }}</view>
                <view class="vips f-c" v-if="userInfo.userLevel > -1"
                  >VIP {{ userInfo.userLevel }}</view
                >
              </view>
              <view class="money">¥{{ $store.state.money }}</view>
            </view>
          </view>
          <view class="marque" @click="ribbon(0)">
            <image
              class="img2_0"
              src="../../static/index/speaker.png"
              mode="widthFix"
            ></image>
            <uni-notice-bar show-icon scrollable :text="tongzhi" />
          </view>
          <navigator url="/pages/news/news">
            <image
              class="img2"
              mode="widthFix"
              src="../../static/index/notify.png"
            ></image>
          </navigator>
        </view>

        <swiper
          :autoplay="true"
          :interval="3000"
          :duration="1000"
          @change="swiperfun"
        >
          <swiper-item
            v-for="(val, index) in staticResour.bannerResources"
            :key="index"
          >
            <navigator hover-class="none" @click="bannerUrl(val)">
              <image
                :src="$store.state.iconUrl + val.banner"
                mode="widthFix"
              ></image>
            </navigator>
          </swiper-item>
        </swiper>

        <view class="swiperdian">
          <view
            v-for="(val, index) in staticResour.bannerResources"
            :key="index"
            :class="index == nowindex ? 'active' : ''"
          ></view>
        </view>
      </view>
    </view>
    <view class="leftright">
      <div class="left init-height" :class="{ addclass3: !toggle }">
        <div v-for="(item, index) in appIndex" :key="index">
          <view
            class="main_class f-c"
            :class="botmnowindex == index ? 'active' : ''"
            @click="idFx(index, 'ids' + index)"
            :style="
              botmnowindex === index ? { backgroundColor: '#C01C05' } : null
            "
          >
            <image
              style="margin: 8rpx 0 0 0"
              class="f-c"
              :src="
                botmnowindex == index
                  ? $store.state.iconUrl + item.unselectedIcon
                  : $store.state.iconUrl + item.selectedIcon
              "
              :style="{ width: computedWidth(index) }"
              mode="widthFix"
            >
            </image>
            <view
              class="text_icon f-c"
              :style="botmnowindex === index ? { color: '#fff' } : null"
              >{{ item.gameTypeName }}
            </view>
          </view>
        </div>
      </div>

      <scroll-view
        :class="{ addclass3: !toggle }"
        class="right init-height"
        @scroll="scrollFx"
        scroll-y="true"
        scroll-with-animation="true"
      >
        <div class="gameMain">
          <div
            v-for="(item, index) in appIndex"
            :key="index"
            :id="'ids' + index"
          >
            <view
              class="game-content"
              v-for="(it, ind) in item.platforms"
              :key="ind"
              @click="mbLogin(it.uniqueCode, it.loginResultType)"
            >
              <view class="game-table f-c"
                >{{ $t("general.high_rebate") }}
                <span style="font-size: 24rpx; font-weight: 700"
                  >{{ (it.maxRebateRatio * 100).toFixed(2) }}%</span
                >
              </view>
              <image
                :src="$store.state.iconUrl + it.pcStatic.entrance.backgroud"
                mode="widthFix"
              ></image>
              <image
                v-show="
                  $store.state.array.some((data) => data === it.uniqueCode)
                "
                src="../../static/index/error.png"
                mode="widthFix"
                class="image_class"
              >
                <span
                  class="maintainace"
                  v-show="
                    $store.state.array.some((data) => data === it.uniqueCode)
                  "
                >
                  {{ $t("general.maintenance") }}
                </span>
              </image>
            </view>
          </div>
        </div>
      </scroll-view>
    </view>
    <publicNav :active="3"></publicNav>
    <view v-show="card" class="cardlayer">
      <view class="popup_cardlayer">
        <image
          @click="card = false"
          class="image_2"
          src="../../static/home/3x.png"
          mode=""
        >
        </image>
        <view class="heading-one">{{
          $t("important_game_notice.important_notice_title")
        }}</view>
        <view class="text-one">{{
          $t("important_game_notice.important_notice_subtitle")
        }}</view>
        <view class="heading-two">
          <span class="normal-digits">{{ integerPart }}.</span>
          <span class="small-digits">{{ decimalPart }}</span>
        </view>
        <view class="text-two">{{
          $t("important_game_notice.important_notice_description")
        }}</view>
        <view class="input_value f-c">
          <view class="currency_icon">¥</view>
          <input
            type="number"
            data-type="amount"
            :value="formData.amount"
            class="input-vv"
            @blur="okformdata"
            placeholder-class="input-v"
            :placeholder="
              $t('important_game_notice.important_notice_textField_placeholder')
            "
          />
          <view class="button_class f-c" @click="moneyMax(all)">{{
            $t("important_game_notice.maximum_btn_lbl")
          }}</view>
        </view>
        <view class="btns_for_games f-a">
          <view class="g_btn_1 f-c" @click="gamebalance(0)">{{
            $t("important_game_notice.enter_directly_btn")
          }}</view>
          <view class="g_btn_2 f-c" @click="gamebalance(1)">{{
            $t("important_game_notice.transfer_balance_btn")
          }}</view>
        </view>
      </view>
    </view>

    <view v-show="card2 && systemnotice2 != 0" class="cardlayer_notice">
      <view class="popup_cardlayer_notice">
        <view class="top1 f-c">
          <view class="titile">{{
            $t("customer_support_View.announcement")
          }}</view>
          <image
            @click="ribbon(1)"
            src="../../static/index/X.png"
            mode="widthFix"
            class="xx"
          ></image>
        </view>
        <view class="he" style="max-height: 380rpx; overflow-y: auto;">
        <view
          class="main_top"
          v-for="(item, index) in SystemNoticeArray"
          :key="index"
        >
          <view
          class="left_top f-c"
          :class="{ left_top_active: selectedNoticeIndex === index }"
          @click="showNoticeContent(index)"
        >
          {{ item.noticeTitle }}</view>

          <view v-show="selectedNoticeIndex === index" class="right_top_2">
            {{ item.noticeContent }}
          </view>
        </view>
        </view>
      </view>
    </view>

    <view
      v-show="
        isNewDay2 && userFeedbackHidden3 && systemnotice != 0 && userInfo != ''
      "
      class="cardlayer_notice"
    >
      <view class="popup_cardlayer_notice" style="padding-bottom: 0">
        <view class="top1 f-c">
          <view class="titile">{{
            $t("customer_support_View.announcement")
          }}</view>
          <image
            @click="xzClick(1)"
            src="../../static/index/X.png"
            mode="widthFix"
            class="xx"
          ></image>
        </view>
        <view class="he" style="max-height: 380rpx; overflow-y: auto;">
        <view
          class="main_top"
          v-for="(item, index) in SystemNoticeArray2"
          :key="index"
        >
          <view
            class="left_top f-c"
            :class="{ left_top_active: selectedNoticeIndex === index }"
            @click="showNoticeContent(index)"
          >
            {{ item.noticeTitle }}</view
          >
          <view v-show="selectedNoticeIndex === index" class="right_top">
            {{ item.noticeContent }}
          </view>
        </view>
        </view>
        <view style="width: 100%;">
        <view @click="toggleCheckbox" class="display_class f-s">
          <view class="text_imgh">{{ $t("button.no_alert") }}</view>
          <view class="image2 f-c">
            <div class="image-btn" v-show="isChecked"></div>
          </view>
        </view>
        </view>
      </view>
    </view>

    <view
      v-show="
        isNewDay &&
        userFeedbackHidden4 &&
        staticResour.popUpsActivity.activityTitle != '' &&
        userInfo != ''
      "
      v-for="(val, index) in staticResour.popUpsActivity"
      :key="index"
      class="maskLayer_s"
      style="z-index: 2002"
    >
      <view class="popup_content_s">
        <view class="image_top_s"></view>
        <image
          class="se_s"
          @click="xzClick(3)"
          src="../../static/service/x.png"
          mode="widthFix"
        ></image>
        <view class="tips_s_2" style="">{{ val.activityTitle }}</view>
        <image
          class="center_img"
          :src="$store.state.iconUrl + val.banner"
          mode="widthFix"
        ></image>
        <view
          @click="jumpurl($store.state.siteUrl + val.redirectHtml,val.activityTitle)"
          class="f-a qer_s"
        >
          <view class="title_s f-c">{{ $t("button.detail") }}</view>
        </view>
          <view @click="toggleCheckbox2" class="display_class f-s">
            <view class="text_imgh">{{ $t("button.no_alert") }}</view>
            <view class="image2 f-c">
              <div class="image-btn" v-show="isChecked2"></div>
            </view>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
import state from "../../store/state";
import { mapState } from "vuex";
import { localizationMixin } from "../../common/js/localization";

export default {
  mixins: [localizationMixin],
  dicts: [],
  props: [],
  data() {
    return {
      SystemNoticeArray: [],
      SystemNoticeArray2: [],
      selectedNoticeIndex: 0,
      isChecked: false,
      isChecked2: false,
      all: 1,
      nowindex: 0,
      JsonList: [],
      appIndex: [],
      isshow: 0,
      unique: "",
      card: false,
      card2: false,
      total_balance: "",
      toggle: false,
      botmnowindex: 0,
      scrolls: 1,
      staticResour: [],
      tongzhi: "",
      tongzhi2: "",
      system_notcie_title: "",
      duration: 5000,
      userFeedbackHidden3: true,
      userFeedbackHidden4: true,
      systemnotice: "",
      systemnotice2: "",
      formData: {
        amount: "",
      },
      authtoken: false,
      userInfo: uni.getStorageSync("memberInfo"),
    };
  },
  computed: {
    ...mapState({
      static: (state) => state.static,
    }),
    computedWidth() {
      return (index) => {
        return index != 3 ? "70rpx" : "52rpx";
      };
    },

    integerPart() {
      const integer = parseInt(this.total_balance);
      return isNaN(integer) ? "" : integer;
    },
    decimalPart() {
      const decimal = parseFloat(this.total_balance).toFixed(2);
      return isNaN(decimal) ? "" : decimal.slice(-2);
    },
    isNewDay() {
      let tim = parseInt(uni.getStorageSync("checkboxTimestamp2"));
      // console.log(tim, "tim");
      const date1 = new Date(tim);
      const date2 = new Date();
      // console.log(date1, "date2");

      return (
        date1.getFullYear() !== date2.getFullYear() ||
        date1.getMonth() !== date2.getMonth() ||
        date1.getDate() !== date2.getDate()
      );
    },

    isNewDay2() {
      let tim = parseInt(uni.getStorageSync("checkboxTimestamp"));
      // console.log(tim, "tim");
      const date1 = new Date(tim);
      const date2 = new Date();
      // console.log(date1, "date2");

      return (
        date1.getFullYear() !== date2.getFullYear() ||
        date1.getMonth() !== date2.getMonth() ||
        date1.getDate() !== date2.getDate()
      );
    },
  },
  onShow() {
    this.islogin(); //判断登录
    console.log(state.jsonUrl,"jsonUrl");

  },
  watch: {
    static() {
      this.getJson();
    },
  },

  mounted() {
    // this.getSystemNotice();
    const valueCodes = uni.getStorageSync("UniquecodeArray");
    if (valueCodes) {
      state.array = valueCodes;
    }
    // console.log(state.jsonsN);
    console.log(this.$store.state.colorIndex, "uni");
  },
  onLoad() {
    this.getJson();
    const valueCodes = uni.getStorageSync("UniquecodeArray");
    if (valueCodes) {
      state.array = valueCodes;
    }
    if (state.user) {
      // state.user.avatar = {};
      let a = state.static.headIcon[state.user.userIcon];
      let b = state.static.avatar[state.user.userIcon];
      state.user.avatar = a;
      if (a == null) {
        state.user.avatar =
          state.iconUrl +
          state.static.avatar[state.user.userIcon];
      } else if (b == null) {
        state.user.avatar =
          state.iconUrl +
          state.static.headIcon[state.user.userIcon];
      }
      uni.setStorageSync("memberInfo", state.user);
      console.log(a, b, "ab");
      this.memberInfo = state.user;
    }
  },

  methods: {
    showNoticeContent(index) {
      this.selectedNoticeIndex = index;
    },

    toggleCheckbox() {
      this.isChecked = !this.isChecked;
      if (this.isChecked) {
        localStorage.setItem("checkboxTimestamp", Date.now());
      } else {
        localStorage.removeItem("checkboxTimestamp");
      }
    },
    toggleCheckbox2() {
      this.isChecked2 = !this.isChecked2;
      if (this.isChecked2) {
        localStorage.setItem("checkboxTimestamp2", Date.now());
      } else {
        localStorage.removeItem("checkboxTimestamp2");
      }
    },

    xzClick(e) {
      if (e === 1) {
        this.userFeedbackHidden3 = false;
      } else if (e == 3) {
        this.userFeedbackHidden4 = false;
      }
    },
    jumpurl(html,tit) {
      let url = html + "?" + uni.getStorageSync("userToken");
      console.log(url, "url");
      uni.setStorageSync("activityUrl", url);
      this.$store.state.activityUrl = url;
      uni.navigateTo({
        url: "/pages/activity/activityDtl",
      });
      sessionStorage.setItem("event_title", tit);

    }, 

    ribbon(e) {
      if (e == 0) {
        this.card2 = true;
      } else if (e == 1) {
        this.card2 = false;
      }
    },
    login() {
      uni.navigateTo({
        url: "/pages/login/login",
      });
    },
    islogin() {
      if (state.user && state.user.authToken) {
        console.log(state.user);
        this.authtoken = true;
        this.$money();
      } else {
        this.authtoken = false;
      }
    },
    swiperfun(e) {
      this.nowindex = e.detail.current;
    },
    bannerUrl(url) {
      console.log(url, "urlsls");
      if (url.redirectHtml) {
        let urls = (state.activityUrl =
          state.siteUrl + url.redirectHtml);
        console.log(urls, "urls");
        uni.setStorageSync("activityUrl", urls);
        let aa = this.$t("general.event_details");
        sessionStorage.setItem("event_title", aa);
        uni.navigateTo({
          url: "/pages/activity/activityDtl",
        });
      }
      if (url.redirectUrl) {
        window.location.href = url.redirectUrl;
      }
      if (url.redirectPlatform) {
        let type = 0;
        this.appIndex.forEach((el) => {
          el.platforms.forEach((els) => {
            type = els.platformType;
          });
        });
        this.mbLogin(url.redirectPlatform, type);
      }
    },
    mbLogin(uniqueCode, loginResultType) {
      state.gamesIndex = state.games.platforms.uniqueCodes[uniqueCode];
      uni.setStorageSync("GameName", state.gamesIndex);
      console.log(state.gamesIndex, " state.gamesIndex");
      if (!this.$logins()) {
        return;
      } //if login

      // console.log(state.array, "array");
      if (state.array.some((data) => data === uniqueCode)) {
        return;
      }
      this.isshow = 1;
      this.unique = uniqueCode;
      state.uniqueCode = uniqueCode;

      console.log(uniqueCode, "游戏");
      let _this = this;
      // this.userInfo.freeTransfer == 免转，0-开 1-关
      let flushUrlFlag = 0; //	是否刷新URL，0-刷新，1-不刷新；如果选择不刷新，将只会操作免转
      if (loginResultType == 2) {
        flushUrlFlag = 1;
      }
      let data = {
        uniqueCode: uniqueCode,
        flushUrlFlag: flushUrlFlag,
      };
      let url = _this.$globalApi.mbLogin;
      this.$res.postRequest(url, data).then((res) => {
        this.isshow = 0;
        if (res.data.code == 9999) {
          uni.navigateTo({
            url: "/pages/login/login",
          });
          return;
        }
        if (res.data.code == 0) {
          let stat = res.data.data.allGamePlatform;
          //	console.log(stat, "list test")
          state.gameStatus = []; // init
          stat.forEach((element) => {
            if (element.platformStatus != 0) {
              state.gameStatus.push(element.uniqueCode);
            }
          });

          uni.setStorageSync("UniquecodeArray", state.gameStatus);

          if (res.data.data.loginResultType == 3) {
            //console.log(uniqueCode, "uniqueCode");
            this.card = true;
            this.total_balance = res.data.data.loginResultData;
            return;
          }

          if (typeof res.data.data.loginResultData == "string") {
            console.log(res.data.data.loginResultData, "是地址");

            //2-4 不加token，可以登錄成功
            let url = res.data.data.loginResultData; // + "?" + uni.getStorageSync("userToken");
            uni.setStorageSync("activityUrl1", url);
            state.activityUrl1 = url;
            uni.setStorageSync("gameid", uniqueCode); //存储浏览器中 进入游戏id

            uni.navigateTo({
              url: "/pages/index/activityDt",
            });
          } else if (res.data.data.loginResultType == 1) {
            uni.setStorageSync(
              "loginResultDataForImg",
              res.data.data.loginResultData
            );
            console.log(res.data.data, "不是地址-是电子游戏");

            uni.navigateTo({
              url: "/pages/index/indexon",
            });
          }
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000,
          });
          this.$store.state.gameError.push(uniqueCode);
        }
      });
    },
    gamebalance(e) {
      let _this = this;
      let money = "";
      if (e == 0) {
        money = 0;
      } else {
        if (_this.formData.amount == "") {
          uni.showToast({
            title: this.$t('errors.enter_balance_err'),
            icon: "none",
          });
          return;
        }
        if (_this.formData.amount > state.money) {
          uni.showToast({
            title: this.$t('errors.balance_err'),
            icon: "none",
          });
          return;
        }
        money = this.formData.amount;
      }

      let data = {
        uniqueCode: _this.unique,
        flushUrlFlag: 0,
        applyAmount: money,
      };

      let url = _this.$globalApi.mbAfterDiscount;
      this.$res.postRequest(url, data).then((res) => {
        let url = res.data.data.loginResultData; // + "?" + uni.getStorageSync("userToken");
        uni.setStorageSync("activityUrl1", url);
        state.activityUrl1 = url;
        uni.setStorageSync("gameid", this.unique); //存储浏览器中 进入游戏id
        this.formData.amount = "";
        this.card = false;
        uni.navigateTo({
          url: "/pages/index/activityDt",
        });
      });
    },
    idFx(e, id) {
      let that = this;
      that.scrolls = 0;
      that.botmnowindex = e;
      document.querySelector("#" + id).scrollIntoView(true);

      setTimeout(function () {
        that.scrolls = 1; // fx
      }, 500);
    },
    scrollFx(e) {
      if (this.scrolls == 0) {
        return;
      }

      let that = this;
      let id0 = "";
      let id1 = "";
      let id2 = "";
      let id3 = "";
      let id4 = "";
      let id5 = "";

      let height = document.getElementById("ids1").clientHeight - 10;
      id0 = height;
      id1 = height * 2;
      id2 = height * 3;
      id3 = height * 4;
      id4 = height * 5;
      id5 = height * 6;

      if (e.detail.scrollTop == 0) {
        that.botmnowindex = 0;
      } else if (e.detail.scrollTop > id0 && e.detail.scrollTop < id1) {
        that.botmnowindex = 1;
      } else if (e.detail.scrollTop > id1 && e.detail.scrollTop < id2) {
        that.botmnowindex = 2;
      } else if (e.detail.scrollTop > id2 && e.detail.scrollTop < id3) {
        that.botmnowindex = 3;
      } else if (e.detail.scrollTop > id3 && e.detail.scrollTop < id4) {
        that.botmnowindex = 4;
      } else if (e.detail.scrollTop > id4 && e.detail.scrollTop < id5) {
        that.botmnowindex = 5;
      }
    },
    getJson() {
      if (!state.static) {
        return;
      }
      let that = this;
      //banner
      that.JsonList = state.jsons;
      // console.log(state.jsons,"state.jsons")
      that.staticResour = state.static;
      //获取游戏列表 ,  index-game-list
      // console.log(state.jsonsN,"state.jsons")

      this.getgame(
        
        state.jsons.appIndexVersionNo,
        state.jsonUrl + state.jsons.appIndex
      );

      this.getSystemNotice();
    },
    //获取底部游戏数据
    getgame(ver, jsonurl) {
      //调取游戏轮播图 game-banner
      let that = this;
      that.isshow = 1;
      let oldappIndex = state.appIndex;

      if (oldappIndex && oldappIndex.appIndexVersionNo === ver) {
        that.appIndex = oldappIndex;
        // uni.hideLoading()
        that.isshow = 0;
      } else {
        this.$res.getRequest(that.$time(jsonurl)).then((res) => {
          let v = res.data.datas;
          v.forEach((res) => {
            res.platforms.sort((a, b) => {
              return a.sort - b.sort;
            });
          });
          //登录之后需要存储起来
          that.appIndex = state.appIndex = v;
          state.appIndex.appIndexVersionNo = ver;
          uni.setStorageSync("appIndex", state.appIndex);
          uni.setStorageSync("ver", state.ver);
          //uni.hideLoading()
          setTimeout((res) => {
            that.isshow = 0;
          }, 1000);
        });
      }
    },

    getSystemNotice() {
      let _this = this;
      let data = {
        systemNoticeType: 0,
      };
      let url = _this.$globalApi.getSystemNotice;
      this.$res.postRequest(url, data).then((res) => {
        console.log(res.data, "获取公告");
        this.SystemNoticeArray = res.data.data.systemNotice;
        this.systemnotice2 = res.data.data.systemNotice.length;
        // console.log(this.systemnotice2 ,"this.systemnotice2 ")
        let text = "";
        res.data.data.systemNotice.forEach((el) => {
          text = text + el.noticeContent;
        });
        this.tongzhi = text;
      });
      const checkboxTimestamp = localStorage.getItem("checkboxTimestamp");
      if (!checkboxTimestamp) {
        let data1 = {
          systemNoticeType: 1,
        };

        this.$res.postRequest(url, data1).then((res) => {
          console.log(res.data, "获取弹窗公告");

          let text = "";
          let text_title = "";
          this.systemnotice = res.data.data.systemNotice.length;
          this.SystemNoticeArray2 = res.data.data.systemNotice;
          console.log(this.systemnotice, "this.systemnotice ");

          console.log(this.systemnotice, "goy");
          res.data.data.systemNotice.forEach((el) => {
            text = text + el.noticeContent;
            text_title = text_title + el.noticeTitle;
          });
          this.tongzhi2 = text;
          this.system_notcie_title = text_title;
        });
      }
    },

    moneyMax(e) {
      let _this = this;
      if (e == 1) {
        _this.formData.amount = state.money;
      }
    },
   
    okformdata(e) {
      let _this = this;
      _this.formData[e.currentTarget.dataset.type] = e.detail.value;
    },
  },
};
</script>

<style lang="scss" scoped>
html {
  scroll-behavior: smooth;
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
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 594rpx;

    .image_2 {
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
      letter-spacing: -0.1rpx;
      padding: 38rpx 164rpx 0 164rpx;
    }

    .text-one {
      color: #304258;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 32rpx 82rpx 0 82rpx;
    }

    .heading-two {
      color: #304258;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 40rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30rpx;
      letter-spacing: -0.1rpx;
      padding: 28rpx 220rpx 0 220rpx;

      .normal-digits {
        color: #304258;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 40rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 30rpx;
        letter-spacing: -0.1rpx !important;
      }

      .small-digits {
        color: #304258;
        font-family: Microsoft YaHei UI;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 30rpx;
        letter-spacing: -0.1rpx !important;
      }
    }

    .text-two {
      color: #304258;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 20rpx 60rpx 0 60rpx;
    }

    .text_head {
      color: #304258;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 28rpx;
      letter-spacing: -0.5px;
      padding: 42rpx 0 22rpx 0;
    }

    .input_value {
      padding-top: 66rpx;
      border-bottom: 2rpx dashed;
      color: #304258;
      width: 494rpx;
      margin: auto;
      padding-bottom: 14rpx;

      .currency_icon {
        color: #304258;
        font-family: Microsoft YaHei UI;
        font-size: 40rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 30rpx;
        margin: 14rpx 10rpx 0rpx 0rpx;
        letter-spacing: -0.1rpx;
      }

      .input-v {
        text-align: left;
        color: #647182;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .input-vv {
        width: 292rpx;
        color: #b2bdde;
        padding: 18rpx 0rpx 0 10rpx;

        /deep/.uni-input-input {
          width: 430rpx;
          color: #111;
          text-align: left;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .button_class {
        background: #be1c05;
        border-radius: 20.1rpx;
        width: 140rpx;
        height: 42rpx;
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: -16rpx;
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
      line-height: 30rpx;
      /* 125% */
      letter-spacing: -0.1rpx;

      .g_btn_1 {
        width: 264rpx;
        height: 74rpx;
        border-radius: 22rpx;
        background: #9f9f9f;
      }

      .g_btn_2 {
        width: 264rpx;
        height: 74rpx;
        border-radius: 22rpx;
        background: #be1c05;
      }
    }
  }
}


.time {
  width: 580rpx;
  margin: 0 auto;
}
.act-img {
  width: 580rpx;
  height: 214rpx;
  margin: 0 auto;
  z-index: 2;
}

.popup_content1 {
  width: 600rpx;
  background: #ffffff;
  border-radius: 36rpx;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.act-item {
  width: 580rpx;
  height: 284rpx;
  background: #feffff;
  background: #ebf0f0;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
}
.popupImgs {
  width: 100%;
}

.content {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  padding-top: 453rpx;

  .topbar2 {
    position: relative;
    overflow: hidden;
    margin: 34rpx 40rpx 0 14rpx;
    z-index: 1001;
    .marque {
      margin-right: -58rpx;
      width: 72%;
      height: 34rpx;
      border-radius: 306rpx;
      display: flex;
      align-items: center;
      padding-left: 22rpx;
      overflow: hidden;
      position: relative;
      top: -2rpx;
      margin-left: 32rpx;
      background: linear-gradient(
        90deg,
        #a400d7 -30.87%,
        rgba(255, 255, 255, 0) 102.28%
      );
      .img2_0 {
        width: 44rpx;
        position: absolute;
        z-index: 103;
        margin-left: -16rpx;
        border-radius: 306rpx;
        padding: 10rpx;
        overflow: hidden;
      }
      /deep/.uni-noticebar {
        background-color: transparent !important;
        padding: 0rpx 26rpx !important;
        margin-bottom: 4rpx !important;
        .uni-noticebar-icon {
          display: none !important;
        }
        .uni-noticebar__content-text {
          color: #304258 !important;
          font-family: Microsoft YaHei UI;
          animation-duration: 120.32234s !important;
          font-size: 24rpx !important;
          font-style: normal !important;
          font-weight: 400 !important;
          line-height: normal !important;
        }
        .uni-noticebar__content-wrapper--scrollable {
          margin-top: 10rpx !important;
        }
      }
    }

    .img1 {
      width: 135rpx;
    }

    .img2 {
      width: 64rpx;
    }
  }

  .swiperMesLogin {
    padding: 0 12rpx 0 20rpx;
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    .swiper {
      position: relative;
      overflow: hidden;

      swiper {
        margin-top: -10rpx;
        min-height: 398rpx;
        width: 100%;
        overflow: hidden;
      }

      .message {
        width: 100%;
        height: 52rpx;
        background: #f1f2f7;
        border-radius: 50px;
        // margin-bottom: 15rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 8rpx;
        box-sizing: border-box;

        .mess {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          font-size: 24rpx;

          image {
            width: 45rpx;
            height: 45rpx;
            display: block;
          }

          .font .u-notice__content__text {
            font-size: 60rpx !important;
          }
        }

        navigator {
          width: 100rpx;
          height: 45rpx;
          background: $uni-bg-color-jb;
          text-align: center;
          line-height: 45rpx;
          border-radius: 50px;
          color: #fff;
          font-size: 24rpx;
        }
      }

      .swiperdian {
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 84rpx;

        view {
          width: 32rpx;
          height: 32rpx;
          border-radius: 50%;
          background: #d9d9d9;
          margin-right: 10rpx;

          :last-child {
            margin-right: 0;
          }
        }

        .active {
          width: 32rpx;
          height: 32rpx;
          position: relative;
          border-radius: 50%;
          background: linear-gradient(180deg, #ff2304 0%, #3d0700 100%);
          padding: 2rpx;
          box-sizing: border-box;
          border: 6rpx solid #d9d9d9;
          box-shadow: 0 0 6rpx rgba(0, 0, 0, 0.16);
        }
      }
    }

    swiper {
      margin-top: -46rpx;
      min-height: 276rpx;
      width: 100%;
      //  border-radius: 13rpx;
      overflow: hidden;

      navigator {
        width: 100%;
        border-radius: 12rpx;
        overflow: hidden;
        display: block;

        image {
          display: block;
          width: 100%;
          height: 280rpx;
        }
      }
    }
  }

  .leftright {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0rpx 0rpx 120rpx 0rpx;
    box-sizing: border-box;
    // margin-top: 14px;

    .left {
      overflow: scroll;
      padding: 46rpx 34rpx 26rpx 0rpx;

      .main_class {
        width: 128rpx;
        height: 128rpx;
        margin: 0 auto;
        margin-bottom: 20rpx;
        border-radius: 16rpx;
        box-shadow: 0rpx 0rpx 15rpx rgba(200, 211, 255, 0.9);
        transition: all 0.5s;
        display: grid;
        align-items: center;
        justify-content: center;
        border: 4rpx solid #c01c05;

        image {
          display: block;
          width: 88rpx;
          max-height: 80rpx;
        }

        .text_icon {
          color: #c01c05;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          margin-bottom: 4.12rpx;
          letter-spacing: 4.8rpx !important;
        }
      }
    }

    .right {
      width: auto;
      overflow: auto;
      transition: all ease-out 0.2s;
      padding-bottom: 20rpx;
      padding: 46rpx 0rpx 0rpx 0rpx;

      swiper {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@keyframes scaledh {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.gameMain {
  transition: all ease-out 0.3s;
  overflow: hidden;
}
.game-table {
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../static/index/rebate-bg.png") no-repeat center center;
  background-size: 100% 100%;
  width: 196rpx;
  height: 40rpx;
  line-height: 42rpx;
  z-index: 10;
  text-align: center;
  font-size: 24rpx;
  color: #58040c;
  margin-top: 28rpx;
  font-weight: 400;
  display: flex;
  align-items: normal !important;
  justify-content: center;
}

.game-content {
  position: relative;
  
  image {
    display: block;
    width: 504rpx;
    height: 256rpx !important;
    margin: 0rpx 0rpx 30rpx 0rpx;
  }

  .image_class {
    position: absolute;
    top: 0;
    display: block;
    width: 504rpx;
    height: 256rpx !important;
    border: none;
  }

  :last-child {
    margin-bottom: 32rpx;
  }
}

.game-content:last-child {
  margin-bottom: 0;
}

.notification {
  width: 520rpx;
}

// scorll --
.init-height {
  // height: calc(100vh - 730rpx);
  height: calc(100vh - 700rpx);
}

.addclass3 {
  // height: calc(100vh - 870rpx) !important;
  height: calc(100vh - 570rpx) !important;
}

/deep/ uni-swiper .uni-swiper-wrapper {
  border-radius: 12rpx;
}

/deep/ uni-swiper {
  height: 270rpx !important;
}

/deep/ .uni-swiper-slide-frame {
  top: 16px;
}

.profiler {
  image {
    width: 102rpx;
    height: 98rpx;
    margin-right: 12rpx;
  }

  .name_and_vip_and_balance {
    .name_and_vips {
      .name {
        color: #ce562d;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-right: 8rpx;
        width: 110rpx;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .vips {
        // width: 30px;
        //  height: 15px;
        border-radius: 4rpx;
        background: #d9d9d9;
        flex-shrink: 0;
        color: #7b7b7b;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 2rpx 12rpx 2rpx 12rpx;
      }
    }

    .money {
      color: #ce562d;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}

.maskLayer_s {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: block;

  .popup_content_s {
    width: 594rpx;
    //max-height: 594rpx;
    background: #ffffff;
    border-radius: 40rpx;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .center_img {
      width: 232rpx;
      max-height: 315rpx;
      margin: auto;
      display: flex;
    }

    .se_s {
      position: relative;
      height: 32rpx;
      width: 32rpx;
      left: 528rpx;
      bottom: 44rpx;
    }

    .image_top_s {
      background: url("../../static/index/soccer_kick.png") no-repeat;
      background-size: 100% 100%;
      width: 180rpx;
      height: 294rpx;
      margin: 0 auto;
      margin-top: -214rpx;
    }

    .tips_s {
      color: #be1c05;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30rpx;
      margin-top: -30rpx;
    }

    .tips_s_2 {
      color: #304258;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 30rpx;
      margin-top: -30rpx;
    }

    .upper_classs_s {
      padding: 24rpx 26rpx 0 40rpx;
      color: #304258;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: 2.8rpx;
    }

    .qer_s {
      padding: 32rpx 76rpx 0rpx 76rpx;

      .title_s {
        width: 444rpx;
        height: 74rpx;
        border-radius: 22rpx;
        background: #be1c05;
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

    .display_class {
      padding: 26rpx 54rpx 22rpx 54rpx;

      .text_imgh {
        color: #304258;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
      }
    }
  }
}

.cardlayer_notice {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  display: block;

  .popup_cardlayer_notice {
    background: #ffffff;
    border-radius: 40rpx;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 594rpx;
    padding-bottom: 38rpx;
    height: 586rpx;
    overflow: scroll;
    /////notification list css ////////////
    .top1 {
      width: 100%;
      height: 94rpx;
      display: flex;
      border-radius: 40rpx 40rpx 0rpx 0rpx;
      background: #c6503f;

      .titile {
        flex: 4;
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 28rpx;
        letter-spacing: -0.1rpx;
        margin-left: 86rpx;
      }

      .xx {
        margin-right: 40rpx;
        width: 32rpx;
      }
    }

    .main_top {
      padding: 10rpx 10rpx 0rpx 0rpx;
      overflow-y: auto;
    //  min-height: 80rpx;
      .left_top {
        width: 198rpx;
        height: 72rpx;
        color: #304258;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 28rpx;
        letter-spacing: -0.1rpx;
      }

      .left_top_active {
        border-radius: 0rpx 40rpx 40rpx 0rpx;
        width: 198rpx;
        background: #c6503f;
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 28rpx;
        letter-spacing: -0.1rpx;
        overflow: hidden;
      }

      .right_top_2 {
        color: #304258;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 28rpx;
        letter-spacing: -0.1rpx;
        padding: 20rpx 32rpx 20rpx 12rpx;
        position: absolute;
        left: 198rpx;
        top: 100rpx;
        overflow-y: auto; /* Enable vertical scrolling */
        max-height: 410rpx;
      }

      .right_top {
        color: #304258;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 28rpx;
        letter-spacing: -0.1rpx;
        padding: 20rpx 32rpx 20rpx 12rpx;
        position: absolute;
        left: 198rpx;
        top: 100rpx;
        overflow-y: auto; /* Enable vertical scrolling */
        max-height: 380rpx;
      }
    }
  }
  .display_class {
    border-top: 2rpx solid #000;
    padding: 26rpx 0 22rpx 0;
    position: fixed;
    bottom: 0;
    width: 482rpx;
    margin: 0 66.10rpx;

    .text_imgh {
      color: #304258;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
    }
  }
}
.maintainace{
  position: absolute;
  top: 178rpx;
  left: 20rpx;
  background-size: 100% 100%;
  width: 196rpx;
  height: 40rpx;
  line-height: 46rpx;
  z-index: 10;
  text-align: center;
  font-size: 24rpx;
  color: #fff;
  margin-top: 28rpx;
  font-weight: 400;
  display: flex;
  align-items: normal !important;
  justify-content: center;
}
</style>
