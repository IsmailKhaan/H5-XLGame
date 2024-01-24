import state from "../store/state";

//查询余额 
export function money(){
  let _this = this;
  let url = _this.$globalApi.getNewestBalance;
  let data = {
    uniqueCode: 0,
  };
  this.$res.postRequest(url, data).then((res) => {
    console.log(res);
    if (res.data.code == 0) {
      state.money = res.data.data.newestBalance;
    }else{
      uni.showToast({
        title:'登录已经失效',
        icon:'none'
      })
      setTimeout(function () {
        uni.navigateTo({
          url: "/pages/login/login",
        });
      }, 1100);
    }
  });
}




//登录判断
export function logins(res) {
  console.log("登录测试");
  if (res) {
    if (res.data.code == 9999) {
      uni.showToast({
        title: res.data.msg,
        icon: "none",
      });
      setTimeout(function () {
        uni.navigateTo({
          url: "/pages/login/login",
        });
      }, 1000);
      return;
    }
  }
  if (
    uni.getStorageSync("memberInfo") == null ||
    uni.getStorageSync("memberInfo") == undefined ||
    uni.getStorageSync("memberInfo") == ""
  ) {
    uni.showToast({
      title: "请先登录",
      icon: "none",
    });
    setTimeout(function () {
      uni.reLaunch({
        url: "/pages/login/login",
      });
    }, 1000);
    return false;
  } else {
    return true;
  }
};

export function IdandBank() {
  console.log("请先完成身份证绑定");
  let that = this; //init
  let info = that.$store.state.info;
  if (
    info == null ||
    info.identityCard == undefined ||
    info.identityCard == ""
  ) {
    uni.showToast({
      title: "请先完成身份证绑定",
      icon: "none",
    });
    setTimeout(function () {
      uni.reLaunch({
        url: "/pages/baseinfo/name/name",
      });
    }, 1000);
    return false;
  } else {
    return true;
  }
};
//状态转换
export function type(type, n) {
  // this.datas.recordType  //0存款，1取款，2红利，3返水， 4=转账
  let status = uni.getStorageSync("status");
  if (type == 0) {
    return status.rechargeState[n];
  }
  if (type == 1) {
    return status.withdrawState[n];
  }
  if (type == 2) {
    return status.dividendState[n];
  }
  if (type == 3) {
    return status.rebateState[n];
  }
  if (type == 4) {
    return status.transferStatus[n];
  }
  if (type == "betting") {
    //投注记录状态
    return status.recordStatus[n];
  }
};

//复制文字
export function copy(text) {
  uni.setClipboardData({
    data: text,
    success() {
      uni.showToast({
        title: "复制成功",
        icon: "none",
      });
    },
    fail() {
      uni.showToast({
        title: "不支持复制，或请刷新浏览器在试试",
        icon: "none",
      });
    },
  });
};
//back -page  返回页面
export function back() {
  let back = getCurrentPages();
  if (back && back.length > 1) {
    uni.navigateBack();
  } else {
    history.back();
  }
};

//虚拟币类型之类转换 //虚拟币类型加入数据 ，currencyType- type，name ,img
export function currencyType() {
  let data = "";
  //reject
  return new Promise((resolve) => {
    let url = this.$globalApi.userInfogetAllVCWallet;
    this.$res.postRequest(url).then((res) => {
      data = res.data.data.allVCWallet;
      console.log(data, "data")
      data.forEach((el) => {
        el.icon = state.iconUrl + state.static.virtualCurrencyIcon[el.vcProtocol];
        el.text = state.allStatus.currencyType[el.currencyType];
      });

      console.log(data, "-------------------虚拟币/VirtualCurrency");
      state.currency = data;
      resolve(data);
    });
  });
}
export function bankApi() {
  return new Promise((resolve) => {
    let data = "";
    let url = this.$globalApi.userInfogetAllBankCard;
    this.$res.postRequest(url).then((res) => {
      if (res.data.code == 9999) {
        uni.showToast({
          title: res.data.msg,
          icon: "none",
        });
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/login/login",
          });
        }, 1000);
        return;
      }
      state.bank = res.data.data.allBankCard;
      console.log(data, "-------------------/Bank");
      resolve(data);
    });
  });
}
