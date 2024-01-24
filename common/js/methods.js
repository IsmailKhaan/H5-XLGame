// import Vue from 'vue'
import store from "@/store/index";
// import axios from "../../plugins/request/js/index"
// import qs from 'qs'
import globalApi from "./globalAPI";
import RequestSender from "./request";

class CommonMethods {
  // static errorTips = ""
  //获取所有游戏
  static allGame(res) {
    let arr = [];
    for (let i = 0; i < res.data.allPlatform.length; i++) {
      arr.push(res.data.allPlatform[i].platformName);
    }
    store.state.allGameName = arr;
    uni.setStorageSync("allGameName", JSON.stringify(arr));
  }
  //获取所有游戏余额
  static allAccount() {
    let url = globalApi.balance;
    RequestSender.postRequest(url)
      .then((res) => {
        // store.dispatch("GAME_ACCOUNT",res.data.balance)
        let arr = res.data.balance;
        arr.unshift(res.data.mainBalance);
        store.dispatch("GAME_ACCOUNT", arr);
        store.state.accountAttr = true;
      })
      .catch((err) => {
        // console.log(err);
        if (err == "999") {
          uni.hideLoading();
          uni.navigateTo({
            url: "../error/error",
          });
        }
      });
  }
  //获取中心钱包余额
  static mainAccount() {
    let url = globalApi.oneBalance;
    let data = { uniqueCode: 0 };
    RequestSender.postRequest(url, data)
      .then((res) => {
        // console.log(res);
        store.dispatch("SET_USER", [
          store.state.currentUser,
          res.data.balance.balance,
        ]);
      })
      .catch((err) => {
        // console.log(err);
        if (err == "999") {
          uni.hideLoading();
          uni.navigateTo({
            url: "../error/error",
          });
        }
      });
  }
  //获取银行卡绑定信息
  static bindCard() {
    let url = globalApi.isBind;
    RequestSender.postRequest(url)
      .then((res) => {
        // console.log(res)
        store.dispatch("BIND_CARD", res.data.isBinding);
      })
      .catch((err) => {
        // console.log(err);
        if (err == "999") {
          uni.hideLoading();
          uni.navigateTo({
            url: "../error/error",
          });
        }
      });
  }
  //登录前获取数据
  static beforeLogin(ResponseBo) {
    store.dispatch("SET_USER", [
      ResponseBo.data.memberInfo.memberNo,
      ResponseBo.data.memberInfo.accountBalance,
    ]);
    store.state.login = true;
    store.state.safety = ResponseBo.data.safetyLevel;
    uni.setStorageSync("safety", JSON.stringify(ResponseBo.data.safetyLevel));
    store.dispatch("BASE_INFO", ResponseBo.data.memberInfo);
    store.state.freeTransfer = ResponseBo.data.freeTransfer;
    uni.setStorageSync("freeTransfer", ResponseBo.data.freeTransfer);
    store.dispatch("BANK_CARD", ResponseBo.data.allChannel);

    if (
      ResponseBo.data.allLevelInfo &&
      ResponseBo.data.allLevelInfo.length != 0
    ) {
      uni.setStorageSync(
        "levelInfo",
        JSON.stringify(ResponseBo.data.allLevelInfo)
      );
      store.state.levelInfo = ResponseBo.data.allLevelInfo;
    }
    if (
      ResponseBo.data.allRebateInfo &&
      ResponseBo.data.allRebateInfo.length != 0
    ) {
      for (let i = 0; i < ResponseBo.data.allRebateInfo.length; i++) {
        for (let key in ResponseBo.data.allRebateInfo[i]) {
          ResponseBo.data.allRebateInfo[i][key].commissionRatio =
            (
              Number(ResponseBo.data.allRebateInfo[i][key].commissionRatio) *
              100
            ).toFixed(2) + "%";
        }
      }
      uni.setStorageSync(
        "rebateInfo",
        JSON.stringify(ResponseBo.data.allRebateInfo)
      );
      store.state.rebateInfo = ResponseBo.data.allRebateInfo;
    }
    if (
      ResponseBo.data.allLevelDiscount &&
      ResponseBo.data.allLevelDiscount.length != 0
    ) {
      uni.setStorageSync(
        "allLevelDiscount",
        JSON.stringify(ResponseBo.data.allLevelDiscount)
      );
      store.state.allLevelDiscount = ResponseBo.data.allLevelDiscount;
    }
  }
  static getLevelResource(res) {
    if (res.data.allLevelInfo.length != 0) {
      uni.setStorageSync("levelInfo", JSON.stringify(res.data.allLevelInfo));
      store.state.levelInfo = res.data.allLevelInfo;
    }
    if (res.data.allRebateInfo.length != 0) {
      // for (let i = 0 ; i < res.data.allRebateInfo.length ; i++) {
      // 	for (let key in res.data.allRebateInfo[i]) {
      // 		console.log(res.data.allRebateInfo[i][key].commissionRatio);
      // 		res.data.allRebateInfo[i][key].commissionRatio = (Number(res.data.allRebateInfo[i][key].commissionRatio) * 100).toFixed(2) + "%"
      // 	}
      // }
      uni.setStorageSync("rebateInfo", JSON.stringify(res.data.allRebateInfo));
      store.state.rebateInfo = res.data.allRebateInfo;
    }
    if (res.data.allLevelDiscount.length != 0) {
      uni.setStorageSync(
        "allLevelDiscount",
        JSON.stringify(res.data.allLevelDiscount)
      );
      store.state.allLevelDiscount = res.data.allLevelDiscount;
    }
  }
  // 获取安全等级
  static getSafety() {
    let url = this.$globalApi.getSafetyLevel;
    this.$res.postRequest(url).then((res) => {
        this.$store.state.safety = res.data;
        uni.setStorageSync("safety", JSON.stringify(res.data));
      })
      .catch((err) => {
        // console.log(err);
        if (err == "999") {
          uni.hideLoading();
          uni.navigateTo({
            url: "../error/error",
          });
        }
      });
  }
  // 获取是否绑定银行卡
  static getBankBind() {
    RequestSender.checkBinding()
      .then((res) => {
        store.dispatch("BIND_EMAIL", res.data.isBinding);
      })
      .catch((err) => {
        // console.log(err);
        if (err == "999") {
          uni.hideLoading();
          uni.navigateTo({
            url: "../error/error",
          });
        }
      });
  }
  // 获取银行卡列表
  static getBankCard() {
    RequestSender.allChannel()
      .then((res) => {
        store.dispatch("BANK_CARD", res.data.allChannel);
      })
      .catch((err) => {
        if (err == "999") {
          uni.hideLoading();
          uni.navigateTo({
            url: "../error/error",
          });
        }
      });
  }
  //获取游戏状态
  static getGameState(ResponseBo) {
    // console.log(ResponseBo);
    if (ResponseBo.data.allPlatform) {
      let arr = ResponseBo.data.allPlatform;
      // console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].platformStatus == "1") {
          let gameType = arr[i].uniqueCode;
          store.state["game" + gameType] = true;
          uni.setStorageSync("game" + gameType, "true");
        } else {
          let gameType = arr[i].uniqueCode;
          store.state["game" + gameType] = false;
          uni.setStorageSync("game" + gameType, "false");
        }
        // const element = array[i];
      }
    }
  }
  // 获取安全等级
  static getSafetyLevel() {
    let url = globalApi.getSafetyLevel;
    RequestSender.postRequest(url)
      .then((res) => {
        store.state.safety = res.data;
        uni.setStorageSync("safety", JSON.stringify(res.data));
        let safetyBgSrc = "";
        switch (res.data.safetyLevel) {
          case 0:
            store.state.safetyBg =
              "'https://sb-1259694084.cos.ap-hongkong.myqcloud.com/sb_images/safe0.png'";
            safetyBgSrc = "'../../assets/images/safe0.png'";
            uni.setStorageSync("safetyBg", safetyBgSrc);
            break;
          case 1:
            store.state.safetyBg =
              "'https://sb-1259694084.cos.ap-hongkong.myqcloud.com/sb_images/safe1.png'";
            safetyBgSrc = "'../../assets/images/safe1.png'";
            uni.setStorageSync("safetyBg", safetyBgSrc);
            break;
          case 2:
            store.state.safetyBg =
              "'https://sb-1259694084.cos.ap-hongkong.myqcloud.com/sb_images/safe2.png'";
            safetyBgSrc = "'../../assets/images/safe2.png'";
            uni.setStorageSync("safetyBg", safetyBgSrc);
            break;
          case 3:
            store.state.safetyBg =
              "'https://sb-1259694084.cos.ap-hongkong.myqcloud.com/sb_images/safe3.png'";
            safetyBgSrc = "'../../assets/images/safe3.png'";
            uni.setStorageSync("safetyBg", safetyBgSrc);
            break;
          case 4:
            store.state.safetyBg =
              "'https://sb-1259694084.cos.ap-hongkong.myqcloud.com/sb_images/safe4.png'";
            safetyBgSrc = "'../../assets/images/safe4.png'";
            uni.setStorageSync("safetyBg", safetyBgSrc);
            break;
          case 5:
            store.state.safetyBg =
              "'https://sb-1259694084.cos.ap-hongkong.myqcloud.com/sb_images/safe5.png'";
            safetyBgSrc = "'../../assets/images/safe5.png'";
            uni.setStorageSync("safetyBg", safetyBgSrc);
            break;
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err == "999") {
          uni.navigateTo({
            url: "../error/error",
          });
        }
      });
  }
  static addZero(m) {
    return m < 10 ? "0" + m : m;
  }
  static changeData(arr, allPlatform) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].wagerTime !== undefined) {
        let time = new Date(arr[i].wagerTime);
        let y = time.getFullYear();
        let M = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        let date =
          y +
          "-" +
          this.addZero(M) +
          "-" +
          this.addZero(d) +
          " " +
          this.addZero(h) +
          ":" +
          this.addZero(m) +
          ":" +
          this.addZero(s);
        arr[i].wagerTime = date;
      }
      if (arr[i].settlementTime && arr[i].settlementTime !== 0) {
        let time2 = new Date(arr[i].settlementTime);
        let y2 = time2.getFullYear();
        let M2 = time2.getMonth() + 1;
        let d2 = time2.getDate();
        let h2 = time2.getHours();
        let m2 = time2.getMinutes();
        let s2 = time2.getSeconds();
        let date2 =
          y2 +
          "-" +
          this.addZero(M2) +
          "-" +
          this.addZero(d2) +
          " " +
          this.addZero(h2) +
          ":" +
          this.addZero(m2) +
          ":" +
          this.addZero(s2);
        arr[i].settlementTime = date2;
      } else {
        arr[i].settlementTime = "未结算";
      }
      if (arr[i].createTime !== undefined) {
        let time = new Date(arr[i].createTime);
        let y = time.getFullYear();
        let M = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        let date =
          y +
          "-" +
          this.addZero(M) +
          "-" +
          this.addZero(d) +
          " " +
          this.addZero(h) +
          ":" +
          this.addZero(m) +
          ":" +
          this.addZero(s);
        arr[i].createTime = date;
      }
      // console.log(arr);
      if (arr[i].status !== undefined) {
        switch (arr[i].status) {
          case 0:
            arr[i].status = "下注";
            break;
          case 1:
            arr[i].status = "结算";
            break;
          case 2:
            arr[i].status = "取消";
            break;
          case 3:
            arr[i].status = "调整";
            break;
          case 4:
            arr[i].status = "未结算";
            break;
          case 5:
            arr[i].status = "关闭";
            break;
          case 6:
            arr[i].status = "兑换";
            break;
          default:
            arr[i].payType = "未结算";
            break;
        }
      }

      if (arr[i].payType !== undefined) {
        switch (arr[i].payType) {
          case "":
            arr[i].payType = "代理充值";
            break;
          case 1:
            arr[i].payType = "银联";
            break;
          case 2:
            arr[i].payType = "微信";
            break;
          // case 2:
          //     arr[i].payType = "银联"
          //     break;
          case 3:
            arr[i].payType = "支付宝";
            break;
          case 8:
            arr[i].payType = "信用代充";
            break;
          case 9:
            arr[i].payType = "赠送彩金";
            break;
          case 10:
            arr[i].payType = "银行卡转账";
            break;
          case 98:
            arr[i].payType = "虚拟币充值";
            break;
          case 99:
            arr[i].payType = "人工代充";
            break;
          default:
            arr[i].payType = "其他方式";
            break;
        }
      }
      if (arr[i].rechargeStatus !== undefined) {
        switch (arr[i].rechargeStatus) {
          case 0:
            arr[i].rechargeStatus = "待处理";
            arr[i].color = "#FFAA00";
            break;
          case 1:
            arr[i].rechargeStatus = "审核通过";
            arr[i].color = "#777AFE";
            break;
          case 2:
            arr[i].rechargeStatus = "驳回";
            arr[i].color = "#FF5353";
            break;
          case 4:
            arr[i].rechargeStatus = "已取消";
            arr[i].color = "#FF5353";
            break;
          default:
            arr[i].rechargeStatus = "待处理";
            arr[i].color = "#FFAA00";
            break;
        }
      }
      if (arr[i].withdrawStatus !== undefined) {
        switch (arr[i].withdrawStatus) {
          case 0:
            arr[i].withdrawStatus = "待处理";
            arr[i].color = "#FFAA00";
            break;
          case 4:
            arr[i].withdrawStatus = "审核通过";
            arr[i].color = "#777AFE";
            break;
          case 2:
            arr[i].withdrawStatus = "审核驳回";
            arr[i].color = "#FF5353";
            break;
          case 3:
            arr[i].withdrawStatus = "审核中";
            arr[i].color = "#FFAA00";
            break;
          case 1:
            arr[i].withdrawStatus = "支付成功";
            arr[i].color = "#777AFE";
            break;
          case 5:
            arr[i].withdrawStatus = "支付失败";
            arr[i].color = "#FF5353";
            break;
          default:
            arr[i].withdrawStatus = "待处理";
            arr[i].color = "#FFAA00";
            break;
        }
      }
      if (arr[i].bonusType !== undefined) {
        switch (arr[i].bonusType) {
          case 0:
            arr[i].bonusType = "活动红利";
            break;
          case 1:
            arr[i].bonusType = "推广红利";
            break;
          case 2:
            arr[i].bonusType = "定时彩金";
            break;
          case 3:
            arr[i].bonusType = "升级彩金";
            break;
          case 4:
            arr[i].bonusType = "签到礼金";
            break;
          case 5:
            arr[i].bonusType = "晋级优惠";
            break;
          case 6:
            arr[i].bonusType = "全民推广";
            break;
          case 7:
            arr[i].bonusType = "刮刮卡";
            break;
          case 8:
            arr[i].bonusType = "充值赠送";
            break;
          case 9:
            arr[i].bonusType = "商城兑现";
            break;
          default:
            arr[i].bonusType = "活动彩金";
            break;
        }
      }
      if (arr[i].transferFrom !== undefined) {
        if (arr[i].transferFrom == 0 || arr[i].transferFrom == "0") {
          arr[i].transferFrom = "中心钱包";
        } else {
          if (allPlatform !== undefined) {
            for (let j = 0; j < allPlatform.length; j++) {
              if (arr[i].transferFrom == allPlatform[j].uniqueCode) {
                arr[i].transferFrom = allPlatform[j].platformName;
              }
            }
          }
        }
      }
      if (arr[i].transferTo !== undefined) {
        if (arr[i].transferTo == 0 || arr[i].transferTo == "0") {
          arr[i].transferTo = "中心钱包";
        } else {
          if (allPlatform !== undefined) {
            for (let j = 0; j < allPlatform.length; j++) {
              if (arr[i].transferTo == allPlatform[j].uniqueCode) {
                arr[i].transferTo = allPlatform[j].platformName;
              }
            }
          }
        }
      }
      if (arr[i].uniqueCode !== undefined) {
        if (allPlatform !== undefined) {
          for (let j = 0; j < allPlatform.length; j++) {
            if (arr[i].uniqueCode == Number(allPlatform[j].uniqueCode)) {
              arr[i].uniqueCode = allPlatform[j].platformName;
            }
          }
        }
      }
      if (arr[i].winLoss !== undefined) {
        for (let j = 0; j < allPlatform.length; j++) {
          if (arr[i].winLoss >= 0) {
            arr[i].color = "#777AFE";
          } else {
            arr[i].color = "#FF5353";
          }
        }
      }
    }
    return arr;
  }
  static betDateChange(arr, allPlatform) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].currentDay !== undefined) {
        let str = arr[i].currentDay.toString();
        arr[i].currentDay = str.slice(4, 6) + "月" + str.slice(6, 8) + "日";
      }
      let arr1 = arr[i].list;
      for (let j = 0; j < arr1.length; j++) {
        if (arr1[j].uniqueCode !== undefined) {
          if (allPlatform !== undefined) {
            for (let k = 0; k < allPlatform.length; k++) {
              if (arr1[j].uniqueCode == Number(allPlatform[k].uniqueCode)) {
                arr1[j].platformName = allPlatform[k].platformName;
                arr1[j].platformType = allPlatform[k].platformType;
              }
            }
          }
        }
        if (arr1[j].winLoss !== undefined) {
          if (arr1[j].winLoss >= 0) {
            arr1[j].color = "#FF6D6D";
          } else {
            arr1[j].color = "#54B884";
          }
        }
        if (arr1[j].wagerTime !== undefined) {
          let time = new Date(arr1[j].wagerTime);
          let y = time.getFullYear();
          let M = time.getMonth() + 1;
          let d = time.getDate();
          let h = time.getHours();
          let m = time.getMinutes();
          let s = time.getSeconds();
          let date =
            y +
            "-" +
            this.addZero(M) +
            "-" +
            this.addZero(d) +
            " " +
            this.addZero(h) +
            ":" +
            this.addZero(m) +
            ":" +
            this.addZero(s);
          arr1[j].wagerTime = date;
        }
        if (arr1[j].settlementTime && arr1[j].settlementTime !== 0) {
          let time2 = new Date(arr1[j].settlementTime);
          let y2 = time2.getFullYear();
          let M2 = time2.getMonth() + 1;
          let d2 = time2.getDate();
          let h2 = time2.getHours();
          let m2 = time2.getMinutes();
          let s2 = time2.getSeconds();
          let date2 =
            y2 +
            "-" +
            this.addZero(M2) +
            "-" +
            this.addZero(d2) +
            " " +
            this.addZero(h2) +
            ":" +
            this.addZero(m2) +
            ":" +
            this.addZero(s2);
          arr1[j].settlementTime = date2;
        } else {
          arr1[j].settlementTime = "未结算";
        }
      }
    }
  }
  //时间戳转时间
  static getTime(times) {
    let time = new Date(times);
    let y = time.getFullYear();
    let M = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    let date =
      y +
      "-" +
      this.addZero(M) +
      "-" +
      this.addZero(d) +
      " " +
      this.addZero(h) +
      ":" +
      this.addZero(m) +
      ":" +
      this.addZero(s);
    return date;
  }
}
export default CommonMethods;
