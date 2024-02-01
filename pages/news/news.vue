<template>
  <view>
    <view class="news-title">
      <view class="f-c h2-title">
        <navigator @click="back">
          <image
            class="navigator_activity"
            mode=""
            src="/static/index/Vector.png"
          ></image>
        </navigator>
        <view class="you-title">{{
          $t("notifications.notifications_title")
        }}</view>
        <image
          @click="handle(['slide-right'])"
          class="navigator_switch"
          mode="widthFix"
          src="/static/index/switch.png"
        >
        </image>
      </view>
      <view class="example">
        <uni-transition
          ref="ani"
          custom-class="transition"
          :styles="styles"
          :show="show"
        >
          <span @click="btn(0, '')">
            <text class="text2 f-s">全部</text>
            <span class="borders f-c"></span>
          </span>
          <span v-for="(v, index) in nav" @click="btn(v, index)" :key="index">
            <text class="text2 f-s">{{ v.newsTemplateTitle }}</text>
            <span
              :class="{ borders: index != Object.keys(nav).length - 0 }"
              class="f-c"
            ></span>
          </span>
        </uni-transition>
      </view>
    </view>
    <view class="selected_btn f-c" :class="{ xyz: total != 0 }">
      <text>{{ notify_name }}</text>
      <text v-if="notify_name == null">全部</text>
    </view>

    <view>
      <view
        class="news-list"
        @click="listFx(v)"
        v-for="(v, index) in lists"
        :key="index"
        :style="{
          borderBottom: detailsData.createTime == v.createTime ? 'none' : '',
        }"
      >
        <img
          v-show="detailsData.createTime != v.createTime"
          class="img"
          src="../../static/index/notifications/betrate.png"
        />
        <view style="flex: 3">
          <view
            class="news-text"
            v-show="detailsData.createTime != v.createTime"
          >
            <span class="text">{{ v.title }}</span>
            <uni-dateformat :date="v.createTime"></uni-dateformat>
          </view>
          <p class="line1" v-show="detailsData.createTime != v.createTime">
            {{ v.content }}
          </p>

          <view class="details" v-show="detailsData.createTime == v.createTime">
            <view class="title">
              <img
                class="icon"
                src="../../static/index/notifications/betrate.png"
              />
              <view style="flex: 3">
                <h3>{{ detailsData.title }}</h3>
                <view class="details-date"
                  ><uni-dateformat
                    :date="detailsData.createTime"
                  ></uni-dateformat
                ></view>
              </view>
            </view>
            <p class="details-p">
              {{ detailsData.content }}
            </p>
          </view>
        </view>
      </view>
    </view>
    <view class="none" v-show="page.none">
      <image
        src="../../static/index/notifications/error.png"
        mode="widthFix"
        class="img"
      ></image>
        <view class="h1 f-c">{{$t('notifications.sorry')}}</view>
        <view class="h2 f-c">
          {{$t('transaction_record_view.sorry_des_transfer_records_lbl')}}
        </view>
      </view>
    <loading :isshow="isshow"></loading>
  </view>
</template>

<script>
import { setTimeout } from "timers";
import state from "@/store/state";

import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  name: "news",
  data() {
    return {
      notify_name: "全部",
      styles: {},
      show: false,
      isshow: 0,
      listShow: true,
      navIndex: "",
      lists: [],
      nav: [],
      page: {
        none: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          messageType: "",
        },
      },
      total: "",
      detailsData: {},
    };
  },

  onLoad() {
    this.nav = uni.getStorageSync("type");
    this.getList();
    this.styles = {
      justifyContent: "center",
      alignItems: "center",
      width: "300rpx",
      height: "auto",
      borderRadius: "18rpx",
      textAlign: "center",
      boxShadow: "0 4rpx 4rpx 0rpx rgba(0,0,0,0.2)",
    };
  },
  onReachBottom() {
    if (!this.page.page.none) {
      if (this.lists.length != this.total) {
        console.log("触发");
        this.page.page.pageNum = this.page.page.pageNum + 1;
        this.getList();
      }
    }
  },
  methods: {
    handle(type) {
      this.show = !this.show;
    },

    titles(v) {
      let data = uni.getStorageSync("type");
      let val = "";
      let length = Object.keys(data).length + 1;
      for (let n = 1; n < length; n++) {
        console.log(n);
        if (v.newsTemplateId == data[n].newsTemplateId) {
          console.log(data[n].newsTemplateTitle);
          v.title = data[n].newsTemplateTitle;
          v.content = data[n].newsTemplateContent;
          let c = JSON.parse(v.newsContent);
          if (v.newsContent) {
            let vals = c.orderAmount
              ? c.orderAmount
              : c.dividendAmount
              ? c.dividendAmount
              : c.rebateAmount;
            if (vals.valueType == 0) {
              if (c.orderAmount) {
                v.content = v.content.replace(
                  /{orderAmount}/,
                  " " + vals.value + " "
                );
              } else if (c.rebateAmount) {
                //
                v.content = v.content.replace(
                  /{rebateAmount}/,
                  " " + vals.value + " "
                );
              } else {
                v.content = v.content.replace(
                  /{dividendAmount}/,
                  " " + vals.value + " "
                );
              }
            }

            if (c.finishTime.valueType == 1) {
              v.content = v.content.replace(
                /{finishTime}/,
                this.timeType(c.finishTime.value, "yyyy-MM-dd")
              );
            } else if (c.finishTime.valueType == 2) {
              v.content = v.content.replace(
                /{finishTime}/,
                this.timeType(c.finishTime.value)
              );
            }
          }
          break;
        }
      }
    },
    timeType(num, day) {
      let date = new Date(num);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM; //月补0
      let d = date.getDate();
      d = d < 10 ? "0" + d : d; //天补0
      let h = date.getHours();
      h = h < 10 ? "0" + h : h; //小时补0
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m; //分钟补0
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s; //秒补0
      if (day == "yyyy-MM-dd") {
        return y + "-" + MM + "-" + d;
      } else {
        return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      }
    },
    back() {
      uni.navigateTo({
        url: "/pages/index/index",
      });
    },
    btn(v, index) {
      this.show = false;
      this.navIndex = index;
      this.notify_name = v.newsTemplateTitle;
      // console.log(this.notify_name, "name");
      this.page.page.pageNum = 1;
      this.page.page.messageType = v ? v.newsTemplateId : "";
      console.log()
      this.listShow = true;
      this.lists = [];
      this.getList();
    },
    //
    listFx(v) {
      this.listShow = false;
      this.detailsData = v;
      console.log(v, "aslidu");
    },
    getList() {
      let url = this.$globalApi.userRecordgetMessageList;
      let that = this;
      this.isshow = 1;
      this.$res.postRequest(url, this.page.page).then(
        (res) => {
        // console.log(res,"resesexed");

          this.isshow = 0;
          if (res.data.code == 9999) {
            uni.showToast({
              title: "请重新登录",
              icon: "none",
            });
            setTimeout((res) => {
              console.log("跳转");
              uni.navigateTo({
                url: "/pages/login/login",
              });
            }, 1000);
            return;
          }
          console.log(res.data.data, "testing");
          that.lists = that.lists.concat(res.data.data.rows);

          that.total = res.data.data.total;
          that.page.none = res.data.data.total == 0 ? true : false;
          if (!that.page.none) {
            that.lists.forEach((v) => {
              that.titles(v);
            });
            console.log(that.lists);
          }

          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        },
        (err) => {
          console.log(err);
          uni.showToast({
            title: "获取消息错误",
            icon: "none",
          });
        }
      );
    },
  },
};
</script>
<style lang="scss">
.xyz {
  background: linear-gradient(
    132deg,
    #ed3a3c 0%,
    #d92264 52.08%,
    #ca197c 100%
  ) !important;
  opacity: 1 !important;
}
uni-page-body {
  background: #ffffff;
  padding-bottom: 60rpx;
}

.example {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  top: 76rpx;
  position: absolute;
  right: 48rpx;
  border-radius: 18rpx;
  background: linear-gradient(70deg, #d9d9d9, white);
  opacity: 0.9;
}

.transition-button {
  width: 100%;
  flex: 1;
  margin-bottom: 20rpx;
}

.example ::v-deep .transition {
  border-radius: 10rpx;
  text-align: center;
  background: linear-gradient(70deg, #d9d9d9, white);
  padding: 26rpx 23rpx 18rpx 19rpx;
}

/deep/.uni-transition {
  padding: 26rpx 23rpx 18rpx 19rpx;
}

.text2 {
  font-size: 24rpx;
  color: #003B3D;
  width: 254rpx;
  //border-bottom: 2rpx solid #db2b0f;
  line-height: 54rpx;
}

.borders {
  width: 254rpx;
  height: 1px;
  background: #db2b0f;
  margin: 0 auto;
}

.news-title {
  position: relative;
  text-align: center;
  margin-bottom: 12rpx;

  .h2-title {
    height: 100rpx;
    background: #fff;
    width: 100%;
    margin: 0;
    padding: 0;
    font-weight: normal;

    .navigator_activity {
      width: 22rpx;
      height: 38rpx;
      margin-left: 54rpx;
    }

    .you-title {
      font-size: 32rpx;
      color: #781000;
      width: 100%;
      font-weight: bold;
      text-align: center;
    }

    .navigator_switch {
      width: 40rpx;
      height: 24rpx;
      margin-right: 54rpx;
    }
  }
}

.news-title .title {
  height: 100rpx;
  background: #fff;
  font-size: 34rpx;
  line-height: 100rpx;
}

.none {
  text-align: center;
  font-size: 30rpx;
  color: #6c7ba8;
	position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.none .img {
  width: 306rpx;
}

.selected_btn {
  border-radius: 98rpx;
  width: 260rpx;
  height: 58rpx;
  background: #000;
  box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  opacity: 0.6;
  margin-bottom: 10rpx;

  text {
    color: #fff;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 28rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 40rpx;
    letter-spacing: -0.1rpx;
  }
}

.news-list {
  padding: 28rpx 20rpx;
  margin: 0 26rpx;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20rpx;
  align-items: center;
  line-height: initial;
  background: #fff;
  border-bottom: 2rpx solid #7e97b7;
}

.news-list .img {
  width: 48rpx;
  height: 48rpx;
  margin-right: 32rpx;
}

.news-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rpx;
}

.news-text .text {
  color: #003B3D;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.news-text .date {
  color: #003B3D;
  text-align: right;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.news-text uni-text {
  color: #003B3D;
  text-align: right;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.news-list p {
  color: #003B3D;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 580rpx;
}

.details {
  padding: 0 0 24rpx 0;
  background: #fff;
  box-shadow: 0rpx 20rpx 22rpx 0rpx rgba(0, 0, 0, 0.15);
  width: 94%;
  //height: 260rpx;
  margin: 0 auto;
}

.details .title {
  padding: 0 66rpx 0 50rpx;
  height: 126rpx;
  display: flex;
  align-items: center;
}

.details .title h3 {
  color: #003B3D;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.details .icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 24rpx;
}

.details-date {
  color: #003B3D;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.details-p {
  color: #003B3D;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 2rpx 116rpx 64rpx 116rpx;
}
</style>
