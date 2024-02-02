<template>
  <view class="hide_able_3 set-bg">
    <zhnavbar :title="$t('manage_vc_accounts.manage_vc_accounts_title')" :lefticon="true"></zhnavbar>
    <view class="cover">
      <view class="add_virtual_currency">{{ $t('choose_vc_channel_view.add_virtual_currency') }}</view>
      <view class="wallet_name">{{ $t('choose_vc_channel_view.wallet_name') }}</view>
      <view class="uni-input-wrapper">
        <input type="text" class="uni-input" focus :placeholder="$t('choose_vc_channel_view.wallet_name_hint')"
          v-model="cardName" />
      </view>
      <view class="virtual_currency_protocol">{{ $t('choose_vc_channel_view.vc_protocol') }}</view>
      <view class="cards" style="margin-top: 18rpx" v-for="(item, index) in virtualProtocolList" :key="index"
        @tap="chooseType(item.currencyName, index)">
        <image class="image1" :src="$store.state.iconUrl + $store.state.static.virtualCurrencyIcon[item.currencyName]"
          mode="widthFix"></image>
        <view class="text">{{ item.currencyName }}</view>
        <view class="image2 f-c">
          <image :class="[index == num ? 'image3' : 'hidden-image']" class=""
            src="../../../static/deposit/dot_active.png"></image>
        </view>
      </view>
      <view class="virtual_currency_address">{{ $t('choose_vc_channel_view.vc_currency_address') }}</view>
      <view class="uni-input-wrapper">
        <input class="uni-input" focus :placeholder="$t('choose_vc_channel_view.enter_currency_address')" v-model="address" maxlength="100" />
      </view>
    </view>

    <view v-show="hiddenview1" class="maskLayer2">
      <view class="popup_content2">
        <view class="image_top2"></view>
        <view class="upper_class">
          <span class="ner3"> {{ $t('choose_vc_channel_view.sucess_popup_1') }} </span><span class="success">{{ $t('general.successfully') }}!</span>
          <view class="ner2">{{ $t('choose_vc_channel_view.sucess_popup_2') }} </view>
        </view>
        <view class="f-a qer2">
          <view class="title_1 f-c" @click="goto(0)">{{ $t('general.oka') }}</view>
        </view>
      </view>
    </view>
    <view v-show="hiddenview2" class="maskLayer">
      <view class="popup_content">
        <view class="image_top"></view>
        <view class="upper_classs">
          <span class="ner4">
            {{ $store.state.codes[response] }}
          </span>
        </view>
        <view class="f-a qer">
          <view class="title f-c" @click="hiddenview2 = false">{{ $t('general.Hmmm') }}</view>
        </view>
      </view>
    </view>

    <view class="position_fixed">
      <view class="outter1 f-c">
        <view class="next_btn f-c" @tap="setXl()">{{ $t('general.add') }}</view>
      </view>
      <!-- <view class="outter f-c">
        <view class="border_bottom f-c"></view>
      </view> -->
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapAction } from "vuex";
import state from "../../../store/state";
import { localizationMixin } from '../../../common/js/localization';
export default {
  mixins: [localizationMixin],
  
  data() {
    return {
     // navtitle: "Manage Virtual Accounts",
      hiddenview1: false,
      hiddenview2: false,
      cardName: "",
      info: "",
      infoMsg: "",
      infoType: "",
      address: "",
      address2: "",
      logoAttr: false,
      virtualProtocol: "",
      virtualProtocolList: "",
      num: "",
      response:null,
    };
  },
  computed: {
    ...mapState({
      baseInfo: (state) => state.baseInfo,
    }),
    baseInfo() {
      return this.$store.state.baseInfo;
    },
  },
  components: {},
  onShow() {
    this.allVirtualProtocol();
  },
  beforeMount() {
    this.allVirtualProtocol();
  },
  methods: {
    goto(e) {
      if (e == 0) {
        this.hiddenview1 = false;
        this.hiddenview2 = false;
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/cardManage/cardManage",
          });
        }, 500);
        this.$store.state.hideview = true;
        this.$store.state.hideview3 = true;
      } else if (e == 1) {
        // this.hiddenview2 = true;
        this.hiddenview2 = false;
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/cardManage/cardManage",
          });
        }, 500);
      }
    },
    setXl() {
      if (!this.cardName) {
        uni.showToast({
          title: "请输入正确钱包名称",
          icon: "none",
        });
        return false;
      }

      if (this.num == "ERC20") {
        if (!state.rule.erc20.test(this.address)) {
          uni.showToast({
          title: this.$t('rules.virtual'),
          icon: "none",
        });
          return;
        }
      }
      if (this.num == "TRC20") {
        if (!state.rule.trc20.test(this.address)) {
          uni.showToast({
          title: this.$t('rules.virtual'),
          icon: "none",
        });
          return;
        }
      }
      if (this.num == "EBPay") {
        if (!state.rule.ebPay.test(this.address)) {
          uni.showToast({
          title: this.$t('rules.virtual'),
          icon: "none",
        });
          return;
        }
      }

      if (!this.virtualProtocol) {
        uni.showToast({
          title: "请选择虚拟币协议",
          icon: "none",
        });
        return false;
      }

      let url = this.$globalApi.userBindbindVCWallet;
      let datas = {
        walletNo: this.address,
        vcProtocol: this.virtualProtocol,
        walletName: this.cardName,
      };
      this.$res.postRequest(url, datas).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$currencyType();
           this.hiddenview1 = true;
          this.$emit("VCaddCar", true);
        }  else if(res.data.code != 0){
          this.hiddenview2 = true;
          this.response = res.data.code; 
        }
        uni.showToast({
          title: res.data.msg,
          icon: "none",
        });
      });
    },
    allVirtualProtocol() {
      // console.log("虚拟币");
      let url = this.$globalApi.userBindallVCProtocol;
      this.$res.postRequest(url).then((res) => {
        // console.log(res, "sadajsgkdhsjhg");
        this.virtualProtocolList = res.data.data.allVCProtocol;
        // console.log(this.allVirtualProtocol, "askdjhsakdlasdhakjsdh")
        this.virtualProtocol = this.num = Object.keys(
          this.virtualProtocolList
        )[0];
      });
    },
    chooseType(item, index) {
      console.log(item, index);
      this.num = index;
      this.virtualProtocol = item;
    },
  },
};
</script>
<style lang="scss">
.hide_able_3 {
  width: 100%;
  position: relative;
  align-items: center;
  height: -webkit-fill-available;
  padding-bottom: 19px;
  .cover {
    height: 70vh;
    overflow: auto;

    .add_virtual_currency {
      margin: 98rpx 0 0 48rpx;
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 36rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.5px;
    }

    .wallet_name {
      margin: 60rpx 0 0 106rpx;

      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.5px;
    }
    .uni-input-wrapper {
      padding: 18rpx 92rpx 0 92rpx !important;
      height: 5%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      background-color: #ffffff;
    }

    .uni-input {
      //margin: -16rpx 0px 0 -6rpx;
      height: 56rpx;
      line-height: 56rpx;
      font-size: 30rpx;
      padding: 0 0 0 18rpx;
      flex: 1;
      background-color: #ffffff;
      border-bottom: 2rpx solid #003B3D;

    }




    .virtual_currency_protocol {
      margin: 56rpx 0 0 110rpx;
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.5px;
    }

    .cards {
      margin-left: 110rpx !important;
      margin-right: 74rpx !important;
      display: flex;
      align-items: center;
      margin-top: 34rpx;
      margin-left: 58rpx;

      .image1 {
        width: 46.5rpx;
        height: 48rpx;
        flex-shrink: 0;
      }

      .text {
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -0.5px;
        margin: 0 0 0 24.46rpx;
        width: 75%;
      }

      .image2 {
        background: url("../../../static/deposit/dot.png") no-repeat;
        background-size: 100% 100%;
        width: 42rpx;
        height: 42rpx;

        .image3 {
          width: 30rpx;
          height: 30rpx;
          margin: 6rpx;
        }

        .hidden-image {
          display: none;
        }
      }
    }

    .virtual_currency_address {
      margin: 78rpx 0 0 106rpx;
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.5px;
    }

    .uni-input-wrapper {}

    .uni-input {}
  }

  .position_fixed {
    padding: 0 7%;
    padding-top: 220rpx;

    .outter1 {
      display: flex;
      position: relative;

      .next_btn {
        width: 672rpx;
        height: 60rpx;
        border-radius: 12rpx;
        background: #c01c05;
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 54rpx;
        letter-spacing: -0.5px;
      }
    }

    .outter {
      display: flex;
      position: relative;

      .border_bottom {
        width: 202rpx;
        height: 0px;
        border: 4rpx solid #000000;
        border-radius: 50px;
        margin: 50rpx 274rpx 0px 274rpx;
      }
    }
  }

  .maskLayer2 {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: block;

    .popup_content2 {
      width: 596rpx;
      height: 410rpx;
      background: #ffffff;
      border-radius: 40rpx;
      position: fixed;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);

      .image_top2 {
        background: url("../../../static/cardManage/success.png") no-repeat;
        background-size: 100% 100%;
        width: 308rpx;
        height: 308rpx;
        margin: 0 auto;
        margin-top: -160rpx;
      }

      .upper_class {
        white-space: nowrap;
        text-align: center;

        .ner2 {
          display: flex;
          justify-content: center;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.5px;
        }

        .success {
          margin-left: 8rpx;
          color: #45ae62;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 30rpx;
          letter-spacing: -0.5px;
          text-align: center;
        }

        .ner3 {
          justify-content: center;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.5px;
        }
      }

      .qer2 {
        margin-top: 64rpx;

        .title_1 {
          width: 444rpx;
          height: 74rpx;
          border-radius: 22rpx;
          background: #45ae62;
          box-shadow: 6rpx 8rpx 16rpx 0px rgba(69, 174, 98, 0.5);
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

    .popup_content {
      width: 596rpx;
      height: 410rpx;
      background: #ffffff;
      border-radius: 40rpx;
      position: fixed;
      top: 30%;
      left: 50%;
      margin-left: -40%;

      .image_top {
        background: url("../../../static/cardManage/erro.png") no-repeat;
        background-size: 100% 100%;
        width: 236rpx;
        height: 204rpx;
        margin: 0 auto;
        margin-top: -82rpx;
      }

      .upper_classs {
        white-space: nowrap;
        text-align: center;
        margin-top: 56rpx;

        .ner5 {
          display: flex;
          justify-content: center;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.5px;
        }

        .successs {
          color: #008D91;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 30rpx;
          letter-spacing: -0.5px;
          text-align: center;
          margin: 0 8rpx;
        }

        .ner4 {
          justify-content: center;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 30rpx;
          letter-spacing: -0.5px;
        }
      }

      .qer {
        margin-top: 36rpx;

        .title {
          width: 444rpx;
          height: 74rpx;
          border-radius: 22rpx;
          background: #008D91;
          box-shadow: 6rpx 8rpx 16rpx 0px rgba(174, 81, 69, 0.5);
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

  .button-container {
    display: flex;
    justify-content: center;
  }

  .my-button {
    width: 672rpx;
    height: 60rpx;
    border-radius: 12rpx;
    background: #c01c05;
    color: #fff;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 54rpx;
    letter-spacing: -0.5px;
    margin: 64rpx 0 0 0;
  }

  .my-button2 {
    width: 202rpx;
    height: 0px;
    border: 4rpx solid #000000;
    border-radius: 100rpx;
    margin: 50rpx 274rpx 38rpx 274rpx;
  }
}
/deep/.uni-input-placeholder {
  color: #d0d0d0;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 40rpx;
  letter-spacing: -0.5px;
  //margin-left: 22px;

}

/deep/.uni-input-input {
  color: #003B3D;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 40rpx;
  letter-spacing: -0.5px;
 // margin-left: 22px;

}
</style>
