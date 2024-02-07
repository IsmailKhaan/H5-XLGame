<template>
  <view class="bg">
    <zhnavbar :title="$t('settings.bettings')" :lefticon="lefticon"></zhnavbar>

    <view class="fixed_top">
      <view class="navbar_transaction">
        <view
          v-if="listBetRec != null"
          class="menu_transaction f-c"
          @click="menuFx"
        >
          <image
            src="../../static/transfer/menu_transaction.png"
            mode="widthFix"
          ></image>
          <text>{{ datas.name }}</text>
        </view>

        <view
          v-if="listBetRec == null"
          style="background: rgb(17, 17, 17); opacity: 0.7"
          class="menu_transaction f-c"
          @click="menuFx"
        >
          <image
            src="../../static/transfer/menu_transaction.png"
            mode="widthFix"
          ></image>
          <text>{{ datas.name }}</text>
        </view>

        <view class="days_transaction f-a">
          <view
            class="todays f-c"
            @click="dayFx(0)"
            :class="navBorder == 0 ? 'on' : ''"
            >{{ $t("transaction_record_view.today") }}</view
          >
          <view
            class="todays f-c"
            @click="dayFx(2)"
            :class="navBorder == 2 ? 'on' : ''"
            >{{ $t("transaction_record_view.last7days") }}</view
          >
          <view
            class="todays f-c"
            @click="dayFx(3)"
            :class="navBorder == 3 ? 'on' : ''"
            >{{ $t("transaction_record_view.last30days") }}</view
          >
        </view>
      </view>
      <view class="picker_class" v-show="menuShow">
        <picker-view :indicator-style="indicatorStyle">
          <picker-view-column>
            <span @click="menusFx(a, '')">
              <text class="item f-c">全平台</text>
            </span>
            <view
              class="item"
              v-for="(item, index) in this.gamesList"
              :key="index"
              @click.stop="menusFx(item, index)"
            >
              {{ item }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>

      <view class="overall_bet_records" v-if="listBetRec">
        <view class="title_for_overall_bet_records">{{
          $t("betting_record_view.collective_records")
        }}</view>
        <view class="records_box">
          <view class="boxes" style="margin-right: 6rpx">
            <text class="text_02">{{
              $t("betting_record_view.bet_count")
            }}</text>
            <text class="text_01">{{ listBetRec.betNum }}</text>
          </view>
          <view class="boxes" style="background: #ff7ca6; margin-left: 6rpx">
            <text class="text_02">{{ $t("betting_record_view.profit") }}</text>
            <text
              class="text_01"
              :style="{ color: listBetRec.betNum < 0 ? '#D30600' : '#4AFF93' }"
              >{{ listBetRec.totalWin }}</text
            >
          </view>
        </view>

        <view
          class="records_box"
          style="padding-top: 16rpx; padding-bottom: 30rpx"
        >
          <view class="boxes" style="background: #b38dff; margin-right: 6rpx">
            <text class="text_02">{{
              $t("betting_record_view.turnover_2")
            }}</text>
            <text class="text_01">{{ listBetRec.totalValid }}</text>
          </view>
          <view class="boxes" style="background: #66daff; margin-left: 6rpx">
            <text class="text_02">{{ $t("betting_record_view.rebates") }}</text>
            <text class="text_01">{{ listBetRec.totalRebate }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="after_list" v-if="listBetRec == null">
      <image src="/static/img/sorry.png" class="tasiver" mode="widthFix">
      </image>
      <view class="h1 f-c">{{ $t("notifications.sorry") }}</view>
      <view class="h2 f-c">
        {{ $t("transaction_record_view.sorry_des_transfer_records_lbl") }}
      </view>
    </view>
    <view class="xyz">
      <div style="" v-for="(dayData, day) in lists.rows" :key="day">
        <div class="bet-body-day">
          <div class="bet-left f-c">{{ dayData.recordDate }}</div>
          <div class="bet-right">
            <div class="betTotal f-c">
              <div class="betRow1">
                <div class="text line1">
                  {{ $t("betting_record_view.count") }}
                  <br />
                  {{ dayData.recordDateBetTotalInfo.betNum }}
                </div>
              </div>
              <div class="betRow1">
                <div class="text line1">
                  {{ $t("betting_record_view.turnover") }}<br />{{
                    dayData.recordDateBetTotalInfo.totalRebate
                  }}
                </div>
              </div>
            </div>
            <div class="betTotal f-c">
              <div class="betRow1">
                <div class="text line1">
                  {{ $t("betting_record_view.bets") }}<br />{{
                    dayData.recordDateBetTotalInfo.totalValid
                  }}
                </div>
              </div>
              <div class="betRow1">
                <div class="text line1">
                  {{ $t("betting_record_view.win_or_loss") }}<br />{{
                    dayData.recordDateBetTotalInfo.totalWin
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <view
          class="cars_scrolls"
          v-for="(v, index) in dayData.recordList"
          :key="v.recordNo"
          @click="showFx(v)"
        >
          <view class="left_cards_scrolls">
            <view class="circles">
              <view :class="v.recordNo == showNo ? 'circles_plus' : ''"></view>
            </view>
          </view>
          <image
            v-if="index < dayData.recordList.length && v.recordNo != showNo"
            class="image_scrolls"
            src="../../static/transfer/line1.png"
            mode=""
          ></image>
          <image
            class="image_height_change"
            v-if="v.recordNo == showNo"
            src="../../static/transfer/line2.png"
            mode=""
          >
          </image>

          <view
            class="right_cards_scrolls"
            :class="v.recordNo == showNo ? 'no' : ''"
          >
            <view class="">
              <view class="card_title_and_date f-s">
                <view class="titels">{{ GameNameFx(v.uniqueCode) }}</view>
                <view class="dates"
                  ><uni-dateformat :date="v.betTime"></uni-dateformat
                ></view>
              </view>
              <view class="bet_and_win_loss">
                <view class="betting">
                  {{ $t("betting_record_view.bets") }} {{ v.betAmount }}</view
                >
                <view
                  class="win_loss"
                  :class="v.recordNo == showNo ? 'color' : ''"
                  >{{ $t("betting_record_view.win_lose") }}
                  {{ v.winLossAmount }}
                </view>
                <view class="ds" v-if="v.recordNo != showNo">
                  <image
                    style="width: 22rpx; height: 24rpx; position: relative"
                    class="cls"
                    src="../../static/transfer/drop.png"
                    mode="widthFix"
                  >
                  </image>
                </view>
              </view>
            </view>
            <div v-if="v.recordNo == showNo" class="showClass">
              <div class="bet-main-text">
                <div class="bet-text1">
                  {{ $t("betting_record_view.status") }}
                  <span class="c1" :style="Status[v.recordStatus]">
                    {{ $store.state.allStatus.recordStatus[v.recordStatus] }}
                  </span>
                </div>
                <div
                  @click.stop="
                    copyFx(v.betRecordId ? v.betRecordId : v.betRecordId)
                  "
                  class="bet-text1"
                  style="display: flex; align-items: center; height: 40rpx"
                >
                  {{ $t("betting_record_view.record_no") }}
                  <span
                    class="c"
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      width: 240rpx;
                    "
                  >
                    {{ v.betRecordId }}</span
                  >
                  <image
                    style="width: 17px"
                    src="../../static/img/copy.png"
                    mode="widthFix"
                  ></image>
                </div>

                <div class="bet-text1 game-text">
                  {{ $t("betting_record_view.game") }}
                </div>
                <span v-for="(leag, index) in league" :key="index">
                  <span v-for="(l, index2) in leag" :key="index2">
                    <div
                      style="padding: 1px 10px 0 0"
                      class="bet-text1"
                      v-show="l.columnName"
                    >
                      <!-- <span style="width:28%"> -->
                      <span style="margin-right: 8rpx; font-weight: bold">
                        {{ l.columnName + ":" }}
                      </span>
                      <span
                        class="c"
                        :class="{ reds: l.columnColorType == 1 }"
                        v-if="l.columnValueType != 1"
                      >
                        {{ l.columnValue }}
                      </span>
                      <span
                        class="c"
                        :class="{ reds: l.columnColorType == 1 }"
                        v-if="l.columnValueType == 1"
                      >
                        {{ parseDateTime(l.columnValue) }}
                      </span>
                    </div>
                    <div class="bet-text1" v-show="!l.columnName">暂无显示</div>
                  </span>
                </span>
              </div>
              <div class="in_one_line">
                <div class="" style="width: 100%; display: flex">
                  {{ $t("betting_record_view.running_water") }}
                  {{ v.validAmount }}
                </div>

                <div style="width: 100%; display: flex">
                  {{ $t("betting_record_view.time") }}

                  <div
                    style="color: #fff !important"
                    v-show="v.settleTime == 0"
                  ></div>
                  <uni-dateformat
                    style="color: #fff !important"
                    class="c"
                    :date="v.settleTime"
                    v-if="v.settleTime != 0"
                  ></uni-dateformat>
                </div>
              </div>
            </div>
          </view>
        </view>
      </div>
    </view>
    <loading :isshow="isshow"></loading>
  </view>
</template>

<script>
import Request from "@/common/js/request.js";
import state from "@/store/state";
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  props: [],
  data() {
    return {
      a: "全平台",
      indicatorStyle: `height: 92rpx; border-top:0.10rpx solid #003B3D; border-bottom:0.10rpx solid #003B3D;`,
      lefticon: true,
      selected: null,
      navtitle: "Bettings",
      total: 0,
      cards: true,
      listBetRec: "",
      requestedRecordNos: [],
      league: null,
      isshow: 0,
      menuShow: false, //展开平台选择
      menuIcon: "", //全平台选中图标
      navBorder: "0", //边框
      showNo: null, //是否展开
      menu: [], //菜单
      datas: {
        pageNum: 1,
        pageSize: 20,
        timeType: 0, //今天0，昨天1，近7日2，30日3
        uniqueCode: "", //平台类型，空为所有
        name: "全平台", //平台名字
      }, //要传的值
      lists: [],
      navlist: [
        { name: "汛利体育" },
        { name: "汛利体育1" },
        { name: "汛利体育2" },
        { name: "汛利体育3" },
      ],
      Status: {
        0: "background-color: #25AB32;  padding: 2rpx 30rpx 2rpx 28rpx; border-radius: 6rpx; text-align: center; margin-left: 10rpx;",
        1: "background-color: #2196F3;  padding: 2rpx 30rpx 2rpx 28rpx; border-radius: 6rpx; text-align: center; margin-left: 10rpx;",
        2: "background-color: #F15249;  padding: 2rpx 30rpx 2rpx 28rpx; border-radius: 6rpx; text-align: center; margin-left: 10rpx;",
        3: "background-color: #AD0E0E;  padding: 2rpx 30rpx 2rpx 28rpx; border-radius: 6rpx; text-align: center; margin-left: 10rpx;",
        4: "background-color: #F90;  padding: 2rpx 30rpx 2rpx 28rpx; border-radius: 6rpx; text-align: center; margin-left: 10rpx;",
        5: "background-color: #FF7F00;  padding: 2rpx 30rpx 2rpx 28rpx; border-radius: 6rpx; text-align: center; margin-left: 10rpx;",
        6: "background-color: #373983;  padding: 2rpx 30rpx 2rpx 28rpx; border-radius: 6rpx; text-align: center; margin-left: 10rpx;",
      },
      gamesList: {},
    };
  },

  onLoad() {
    this.getQn();
    this.getRecord();
    this.$logins();
  },
  onReachBottom() {
    this.isshow = 0;
    console.log("触发");
    console.log("触发");
    this.datas.pageNum = this.datas.pageNum + 1;
    this.getRecord();
  },
  methods: {
    copyFx(val) {
      let text = val.toString();
      this.$copy(text);
    },

    parseDateTime(value) {
      const date = new Date(value);
      const formattedDateTime = date.toLocaleString();
      return formattedDateTime;
    },
    showFx(v) {
      this.league = null;

      if (this.showNo === v.recordNo) {
        this.showNo = null; // Hide content when clicked again
        return;
      }

      this.showNo = v.recordNo;
      this.requestedRecordNos.push(v.recordNo);

      let url = this.$globalApi.userRecordqueryBetDetails;
      let datas = {
        uniqueCode: v.uniqueCode,
        recordNo: v.recordNo, //订单号
      };
      if (v.uniqueCode < 3000) {
        Request.postRequest(url, datas).then((res) => {
          let z = res.data.data.betDetails;
          if (res.data.code == 0) {
            this.league = z;
            this.$forceUpdate(); //刷新
          } else {
            uni.showToast({
              title: state.codes[res.data.code],
              icon: "none",
            });
          }
        });
      }
    },

    inits() {
      //初始化
      this.isshow = 1;

      this.menuShow = false;
      this.showNo = 999; //隐藏详情
      this.datas.pageNum = 1;
    },
    dayFx(num) {
      //2=7,,3=30天
      this.inits();
      this.navBorder = this.datas.timeType = num;
      this.cards = true;
      this.getRecord();
    },
    menuFx() {
      this.selected = 3;
      this.menuShow = !this.menuShow;
    },
    menusFx(item, index) {
      // console.log(item,"datas")

      this.inits();
      this.menuIcon = index;
      console.log(this.menuIcon, "this.menuIcon");
      this.datas.uniqueCode = index; //v.uniqueCode;
      console.log(this.datas.uniqueCode, "this.datas.uniqueCode");

      this.datas.name = item.platformName ? item.platformName : "全平台"; //平台名字
      this.datas.name = item; //平台名字
      // console.log(this.datas.name, "this.datas.name");
      this.cards = true;
      this.getRecord();
      this.selected = null;
    },
    GameNameFx(code) {
      let id = this.menu.platforms.uniqueCodes;
      return id[code] ? id[code] : "游戏名获取不到";
    },
    getQn() {
      this.menu = this.$store.state.games;

      this.menu.gameTypes.map((element) => {
        element.platforms.map((element2) => {
          var uniquecode = element2.uniqueCode;
          this.gamesList[uniquecode] = element2.platformName;
        });
      });
    },
    getRecord() {
      let url = this.$globalApi.userRecordqueryBerRecordByTimeType;
      if (this.cards == false) {
        return;
      }
      Request.postRequest(url, this.datas).then((res) => {
        this.$logins(res);
        this.isshow = 0;

        if (this.datas.pageNum != 1 && this.lists.rowsNum) {
          if (res.data.data.rows) {
            this.lists.rows = this.lists.rows.concat(res.data.data.rows);
            this.listBetRec = res.data.data.betTotalInfo;
          } else {
            this.cards = false;
            uni.showToast({
              title: "无更多数据",
              icon: "none",
            });
          }
        } else {
          this.lists = res.data.data;
          // console.log(this.lists, "lists");
          this.listBetRec = res.data.data.betTotalInfo;
          this.lists.rows = this.lists.rows || []; // Initialize as an empty array if undefined
          this.lists.rows.sort((a, b) => {
            const dateA = new Date(a.recordDate);
            const dateB = new Date(b.recordDate);
            return dateB - dateA;
          });
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
* {
  text-decoration: none;
  font-family: "Microsoft YaHei";
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.fixed_top {
  background: #ffffff !important;
  width: 100%;
  z-index: 30;
  position: fixed;
  margin-top: -10rpx;
}

.navbar_transaction {
  background: #fff;
  margin: 0 auto;
  margin-top: 10rpx;
  .menu_transaction {
    margin: 0 auto;
    width: 260rpx;
    height: 58rpx;
    border-radius: 98rpx;
    background: linear-gradient(
      132deg,
      #ed3a3c 0%,
      #d92264 52.08%,
      #ca197c 100%
    );

    image {
      width: 32.1rpx;
    }

    text {
      margin-left: 14.1rpx;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: 2.8rpx;
    }
  }
  .days_transaction {
    margin: 0 auto;
    margin-top: 38rpx;
    background: #008D91;
    width: 612rpx;
    height: 66rpx;
    border-radius: 108rpx;
    box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(0, 0, 0, 0.63) inset;

    .todays {
      width: 196rpx;
      height: 54rpx;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: 2.8rpx;
    }

    .todays.on {
      width: 196rpx;
      height: 57rpx;
      border-radius: 108rpx;
      background: #fff;
      color: #008D91;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: 2.8rpx;
    }
  }
}

.bg {
  background-color: #ffffff;
  overflow: hidden;
  min-height: 100vh;
  .display_image {
    width: 444rpx;
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}

.iconLeft {
  position: absolute;
  left: 0;
  top: 0;
  height: 100rpx;
  display: flex;
  align-items: center;
  padding: 10rpx;
  padding-left: 30rpx;
}

.heads-title {
  height: 100rpx;
  text-align: center;
  font-size: 40rpx;
  margin-bottom: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: normal;
}

.iconLeft .icon {
  width: 36rpx;
}

.heads-nav {
  font-size: 28rpx;
  display: flex;
  height: 72rpx;
  justify-content: center;
  align-items: center;
  line-height: 72rpx;
}

.sbor {
  border-radius: 50px;
  width: 4rpx;
  height: 40rpx;
  background-color: #dbdcde;
  margin: 0 18rpx;
}

.bet-menu {
  width: 228rpx;
  height: 100%;
  border-radius: 32rpx;
  background-color: #f7f9fe;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.bet-menu img {
  width: 50rpx;
  height: 50rpx;
}

.bet-menu .texts {
  min-width: 120rpx;
  text-align: center;
  margin-left: 10rpx;
}

.dayMain {
  display: flex;
  font-size: 28rpx;
  justify-content: space-around;
  height: 100%;
}

.bet-day {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 22rpx;
  border: solid 2rpx #ebeefd;
  min-width: 134rpx;
  height: 100%;
  margin-right: 10rpx;
}

.bet-day.on {
  border: 2rpx solid #f86c3b;
  position: relative;
}

.bet-day .img {
  display: none;
}

.bet-day.on .img {
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 44rpx;
  height: 44rpx;
}

.cars_scrolls {
  padding: 26rpx 0 0 40rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .left_cards_scrolls {
    color: #003B3D;
    z-index: 99;

    .circles {
      width: 48rpx;
      height: 48rpx;
      background: #d9d9d9;
      border-radius: 100rpx;
      padding: 8rpx 0 0 0;

      .circles_plus {
        width: 32rpx;
        height: 32rpx;
        border-radius: 32rpx;
        background: #e02b55;
        margin: 0 auto;
      }
    }
  }

  .image_scrolls {
    width: 4rpx;
    height: 140rpx;
    position: absolute;
    left: 62rpx;
    //margin: 142rpx 0 0 0;
  }

  .image_height_change {
    width: 2px;
    min-height: 119px;
    max-height: 157px;
    position: relative;
    left: -13px;
    bottom: -99px;
  }

  .right_cards_scrolls {
    width: 564rpx;
    min-height: 120rpx;
    max-height: 1200rpx;

    border-radius: 16rpx;
    background: #cfcfcf;
    margin-left: 32rpx;
    padding: 16rpx 20rpx 0 38rpx;

    .card_title_and_date {
      .titels {
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: 2.8rpx;
      }

      .dates {
        text-align: right;
        font-family: Inter;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: 250rpx;
      }
    }

    .bet_and_win_loss {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 12rpx 0 16rpx 0;

      .betting {
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        /* 166.667% */
        letter-spacing: 2.8rpx;
        padding-right: 28rpx;
      }

      .win_loss {
        flex: 3;
        padding-left: 28rpx;
        border-left: 0.1rpx solid #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        /* 166.667% */
        letter-spacing: 2.8rpx;
      }

      .color {
        border-left: 1rpx solid #fff;
      }
    }
  }

  .right_cards_scrolls.no {
    padding: 28rpx 20rpx 32rpx 38rpx;
    border-radius: 16rpx;
    background: linear-gradient(
      124deg,
      #ed3a3c 0%,
      #d92264 52.08%,
      #ca197c 100%
    );
    box-shadow: 8rpx 8rpx 16rpx 0rpx rgba(202, 25, 124, 0.45);
    color: #fff;
    font-family: Microsoft YaHei UI;
    margin-bottom: 20rpx;
  }
}

.bet-body {
  min-height: 100rpx;
  margin: 30rpx;
  padding: 40rpx 0 30rpx 30rpx;
  border-radius: 30rpx;
  box-shadow: 0 6rpx 12rpx 0 rgba(178, 189, 222, 0.3);
  background-color: #fff;
  position: relative;
}

.bet-body .date {
  position: absolute;
  right: 30rpx;
  top: 60rpx;
  font-family: MicrosoftYaHeiUI;
  font-size: 24rpx;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: right;
  color: #6c7ba8;
}

.bet-body .titles {
  font-size: 36rpx;
  color: #404261;
}

.showClass {
  margin-top: 30rpx;

  .bet-main-text {
    //  display: -webkit-inline-box;
    margin-bottom: 30rpx;

    .bet-text {
      min-width: 86rpx;
      color: #fff;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      /* 166.667% */
      letter-spacing: 2.8rpx;
    }

    .bet-text1 {
      color: #fff;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 500;
      line-height: 40rpx;
      /* 142.857% */
      letter-spacing: 2.8rpx;

      image {
        width: 30.1578rpx;
        margin-left: 90rpx;
      }

      .c1 {
        width: 138rpx;
        height: 42rpx;
        border-radius: 6rpx;
        color: #fff;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: 2.8rpx;
      }

      .c {
        color: #fff;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: 0.1rpx;
      }
    }
  }

  .in_one_line {
    color: #fff;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 40rpx;
    letter-spacing: 2.8rpx;
    //display: flex;
  }
}

/deep/.uni-picker-view-mask {
  background: linear-gradient(
    359deg,
    #d3d3d3 -28.04%,
    rgba(150, 150, 150, 0) 91.76%
  ) !important;
  border-radius: 0rpx 0rpx 18rpx 18rpx;
}

/deep/.picker-view-column-1694955530691 {
}

.picker_class {
  position: fixed;
  top: 172rpx;
  z-index: 1001;
  width: 100%;
  height: 100%;

  picker-view {
    width: 256rpx;
    height: 634rpx;
    border-radius: 0rpx 0rpx 18rpx 18rpx;
    background: linear-gradient(
      359deg,
      #d3d3d3 -28.04%,
      rgba(150, 150, 150, 0) 91.76%
    );
    margin: 0 auto;
    //    border: 1px solid;
  }

  .item {
    font-size: 24rpx;
    line-height: 87rpx;
    text-align: center;
  }
}

.picker_class::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: -1;
}

.bet-menus-bg {
  position: fixed;
  top: 81px;
  z-index: 1001;
  width: 100%;
  height: 100%;

  .bet-menus {
    background: linear-gradient(
      358deg,
      #d3d3d3 0%,
      rgba(150, 150, 150, 0) 100%
    );
    width: 256rpx;
    height: 634rpx;
    border-radius: 0rpx 0rpx 18rpx 18rpx;
    margin: 0 auto;

    .mains {
      padding-top: 50rpx;
      height: 634rpx;
      overflow: overlay;

      .name {
        min-width: 111px;
        height: 70rpx;
        color: #003B3D;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 2.8rpx;
        cursor: pointer;
      }
    }
  }
}

.bet-menus-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: -1;
}

.overall_bet_records {
  //margin-top: -79px;
  padding: 70rpx 66rpx 0 66rpx;
  background: white;

  .title_for_overall_bet_records {
    color: #003B3D;
    font-family: Microsoft YaHei UI;
    font-size: 32rpx;
    font-style: normal;
    font-weight: 700;
    line-height: 40rpx;
    /* 125% */
    letter-spacing: 2.8rpx;
  }

  .records_box {
    padding-top: 24rpx;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    //padding-bottom: 28rpx;

    .boxes {
      width: 300rpx;
      height: 88rpx;
      border-radius: 24rpx;
      background: #83a0ff;
      display: grid;
      align-items: center;
      justify-content: left;
      padding: 8rpx 0 8rpx 34rpx;

      .text_01 {
        color: #fff;
        font-family: Microsoft YaHei UI;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        /* 125% */
        letter-spacing: 2.8rpx;
        width: 254rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .text_02 {
        color: #fff;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 28.1rpx;
        /* 120.833% */
        letter-spacing: 2.8rpx;
        width: 114rpx;
      }
    }
  }
}

.bet-body-day {
  position: relative;
  display: flex;
  width: 614rpx;
  height: 168rpx;
  margin: 0 auto;
  margin-top: 28rpx;
  border-radius: 16rpx;
  background: #fff;
  box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(202, 25, 124, 0.45);
  background: #d9d9d9;

  .bet-left {
    min-width: 186rpx;
    padding: 40rpx 0 30rpx 0;
    background: #fff;
    border-top-left-radius: 22rpx;
    border-bottom-left-radius: 22rpx;
    width: 182rpx;
    height: 168rpx;
    color: #003B3D;
    font-family: Inter;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .bet-right {
    width: 432rpx;
    height: 168rpx;
    padding: 18rpx 20rpx 0 20rpx;
    border-top-right-radius: 22rpx;
    border-bottom-right-radius: 22rpx;
    flex: 3;
    color: #003B3D;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 40rpx;
    letter-spacing: 2.8rpx;

    .betTotal {
      line-height: 32rpx;

      .betRow1 {
        width: 230rpx;
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .text {
        }
      }
    }
  }
}

.showtex {
  text-align: center;
  font-size: 32rpx;
  margin-bottom: 20rpx;
  color: #a7acb0;
}

.xyz {
  position: relative;
  height: 1496rpx;
  overflow: auto;
  z-index: 10;
  margin-top: 504rpx;
  margin-bottom: 40rpx;
}

.game-text {
  font-weight: 700;
  font-size: 32rpx;
  padding: 16rpx 0 10rpx 0;
}
</style>
