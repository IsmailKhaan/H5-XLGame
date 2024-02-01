<template>
  <view class="CardManage set-bg">
    <zhnavbar
      :title="$t('manage_account.manage_accounts_title')"
      :lefticon="true"
      :url="'/pages/home/home'"
    ></zhnavbar>
    <view class="hide_able" style="margin-top: 64rpx;" v-show="!$store.state.hideview">
      <view class="outter_flex f-s" @click="goto(1)">
        <image
          class="image_logo"
          src="../../static/cardManage/bank.png"
          mode="widthFix"
        ></image>
        <view class="names">
          <view class="name_1">{{
            $t("manage_bank_accounts.manage_bank_accounts_title")
          }}</view>
          <view class="name_details">{{
            $t("manage_bank_accounts.manage_bank_details")
          }}</view>
        </view>
        <view url="">
          <image
            class="arrow"
            src="../../static/cardManage/arrow.png"
            mode="widthFix"
          ></image>
        </view>
      </view>
      <view class="outter_flex f-s" @click="goto(0)">
        <image
          class="image_logo"
          src="../../static/cardManage/crypto.png"
          mode="widthFix"
        ></image>
        <view class="names">
          <view class="name_1">{{
            $t("manage_vc_accounts.manage_vc_accounts_title")
          }}</view>
          <view class="name_details">{{
            $t("manage_vc_accounts.manage_vc_details")
          }}</view>
        </view>
        <view url="">
          <image
            class="arrow"
            src="../../static/cardManage/arrow.png"
            mode="widthFix"
          ></image>
        </view>
      </view>
      <!-- <view class="outter f-c">
        <view class="border_bottom f-c"></view>
      </view> -->
    </view>
    <!--  Bank card List -->
    <view class="hide_able_2" v-show="$store.state.hideview2">
      <view class="addnew_card">
        {{
          $t("manage_bank_accounts.add_new_account")
        }}
      </view>
      <view class="add_new_card f-s" @click="goto(2)">
        <view class="new_card_text">
          {{
          $t("manage_bank_accounts.debit_or_credit_card")
          }}
        </view>
        <image
          class="image_logo2"
          src="../../static/cardManage/visa.png"
          mode="widthFix"
        ></image>
        <image
          class="image_add"
          src="../../static/cardManage/add.png"
          mode="widthFix"
        ></image>
      </view>
      <view id="navbar">
        <view class="fixed">
          <view class="image" @click="goback(1)">
            <image
              src="../../static/zhnavbar/leftjt.png"
              mode="widthFix"
            ></image>
          </view>
          <view class="title">{{
            $t("manage_account.manage_accounts_title")
          }}</view>
        </view>
      </view>
      <view class="text1">{{
        $t("manage_bank_accounts.current_accounts")
      }}</view>
      <view
        class="cards"
        v-for="(item, index) in $store.state.bank"
        :key="index"
      >
        <image class="image_logo1" :src="item.bankLogo" mode="widthFix"></image>
        <view class="clsa">
          <view class="card_text2">{{ item.bankName }}</view>
          <view v-show="!isVisible[index]" @click="toggleVisibility(index)" class="card_text">
            ****{{ maskCardNumber(item.bankNo) }}
          </view>
          <view  @click.stop="copyFx(item.bankNo ? item.bankNo : item.bankNo)" v-show="isVisible[index]"  class="card_text">
            {{ item.bankNo }}
            <view>
              <image
                style="
                  width: 22.16rpx;
                  margin-left: 10rpx;
                  filter: drop-shadow(4rpx 4rpx 8rpx rgba(0, 0, 0, 0.25));
                  max-height:30rpx;
                "
                src="../../static/img/Xcopy.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
        </view>

        <image
          class="card_delete f-c"
          src="../../static/cardManage/minus.png"
          mode="widthFix"
          @click="bankAlert(item.paymentId)"
        ></image>
      </view>
      
      <!-- <navigator url="/pages/home/home"> -->
      <view @click="goto(4)" class="bead f-c">
        <image
          src="../../static/cardManage/arrow2.png"
          mode="widthFix"
          alt=""
        ></image>
        <span>{{ $t("manage_account.return_user") }}</span>
      </view>
      <!-- </navigator> -->
    </view>
    
    <!--  Virtual Wallet List -->
    <view class="hide_able_2" v-show="$store.state.hideview3">
      <view id="navbar">
        <view class="fixed">
          <view class="image" @click="goback(1)">
            <image
              src="../../static/zhnavbar/leftjt.png"
              mode="widthFix"
            ></image>
          </view>
          <view class="title">{{
            $t("manage_account.manage_accounts_title")
          }}</view>
        </view>
      </view>
      <!-- add-title -->
      <view class="addnew_card">{{ $t("manage_vc_accounts.add_new") }}</view>
      <view class="add_new_card f-s" @click="goto(3)">
        <view class="new_card_text">{{
          $t("manage_vc_accounts.new_vc_account")
        }}</view>
        <image
          class="image_add"
          src="../../static/cardManage/add.png"
          mode="widthFix"
        ></image>
      </view>
      <view class="text1">{{ $t("manage_bank_accounts.current_vc") }}</view>
      <view
        class="cards f-s"
        v-for="(item, index) in $store.state.currency"
        :key="index"
      >
        <image
          v-show="!item.icon"
          class="image_logo1"
          src="../../static/cardManage/ebpay.png"
          mode="widthFix"
        ></image>
        <image
          v-show="item.icon"
          class="image_logo1_crypto"
          :src="item.icon"
          mode="widthFix"
        ></image>
        <view class="clsaa">
          <view class="card_text_crypto2">{{ item.walletName }}</view>
          <view  v-show="!isVisible2[index]" @click="toggleVisibility2(index)" class="card_text_crypto">
            ****{{ maskCardNumber(item.walletNo) }}</view
          >
          <view @click.stop="copyFx(item.walletNo ? item.walletNo : item.walletNo)" v-show="isVisible2[index]" id="id2" class="card_text_crypto2">
            {{ item.walletNo }}
            <span>
              <image
                style="
                  width: 22.16rpx;
                  margin-left: 10rpx;
                  filter: drop-shadow(4rpx 4rpx 8rpx rgba(0, 0, 0, 0.25));
                  max-height:30rpx;
                "
                src="../../static/img/Xcopy.png"
                mode="widthFix"
              ></image>
            </span>
          </view>
        </view>
        <image
          class="card_delete f-c"
          src="../../static/cardManage/minus.png"
          mode="widthFix"
          @click="delAlertCurrency(item.paymentId)"
        ></image>
      </view>
      

      <!-- <navigator url="/pages/home/home"> -->
      <view class="bead f-c" @click="goto(4)">
        <image
          src="../../static/cardManage/arrow2.png"
          mode="widthFix"
          alt=""
        ></image>
        <span>{{ $t("manage_account.return_user") }}</span>
      </view>
      <!-- </navigator> -->
    </view>

    <!-- VIRTUAL -->
    <uni-popup ref="showtip" type="cent.er" :mask-click="true">
      <view class="openAlert">
        <text class="title">{{ $t("confirm_dialog.confirm") }}</text>
        <view class="f-c content">
          <text>{{ $t("confirm_dialog.delete_bank_alert") }}</text>
        </view>
        <view class="f-c" style="padding: 22px 11px 0px 11px">
          <text class="btn-del" @tap="bankAlertFx()">{{
            $t("confirm_dialog.sure")
          }}</text>
          <text class="btn-cancel" @tap="cancel()">{{
            $t("confirm_dialog.cancel")
          }}</text>
        </view>
      </view>
    </uni-popup>
    <!-- VIRTUAL -->
    <uni-popup ref="showtip2" type="center" :mask-click="true">
      <view class="openAlert ">
        <text class="title">{{ $t("confirm_dialog.confirm") }}</text>
        <view class="f-c content">
          <text>{{ $t("confirm_dialog.delete_wallet_alert") }}</text>
        </view>
        <view class="f-c" style="padding: 22px 11px 0px 11px">
          <text class="btn-del" @tap="delCurrency()">{{
            $t("confirm_dialog.sure")
          }}</text>
          <text class="btn-cancel" @tap="cancel()">{{
            $t("confirm_dialog.cancel")
          }}</text>
        </view>
      </view>
    </uni-popup>

    <loading :isshow="isshow"></loading>
  </view>
</template>

<script>
import addBank from "./addBank/addBank.vue";
import addVCCard from "./addcrypto/addcrypto.vue";
import CommonMethods from "@/common/js/methods.js";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import { mapState, mapMutations, mapAction } from "vuex";
import state from "@/store/state";

import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      isshow: 0,
      isVisible:[],
      isVisible2:[],
      dataList:[],
      a: true,
      data: [],
      bankId: "",
      VCChannelId: "",
      attr: false,
      title: "",
      text: "编辑",
      delAttr: false,
      num: 0,
      deltList: [],
      nav: 0,
      addCardIndex: false,
      VcCarIndex: false,
      navtitle: "卡片管理",
      hidespecfic: false,
    };
  },
  computed: {
    ...mapState({
      safety: (state) => state.safety,
      json: (state) => state.json,
      iconUrl: (state) => state.iconUrl,
    }),
    safety() {
      return this.$store.state.safety;
    },
    json() {
      return this.$store.state.json;
    },
  },
  watch: {
    iconUrl() {
      this.currFx();
    },
  },
  onLoad(v) {
    this.getdaDa();
    this.$bankApi();
    this.currFx();
    this.goback();
    console.log(state.currency, "dfsdfsdfsdffsdf");
  },

  onPullDownRefresh() {
    CommonMethods.getBankCard();
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 800);
  },
  components: {
    addBank,
    uniPopup,
    addVCCard,
    // zhnavbar,
  },
//  created() {
//     this.isVisible = Array(this.$store.state.bank.length).fill(false);
//   },
  methods: {
    toggleVisibility(index) {
      // Toggle the visibility of the clicked item
      this.$set(this.isVisible, index, !this.isVisible[index]);
    },
    toggleVisibility2(index) {
    //  this.isVisible2 = index;
     this.$set(this.isVisible2, index, !this.isVisible2[index]);
    },
    /////////////////////////////////////////
    copyFx(val) {
      let text = val.toString();
      this.$copy(text);
    },
    ////////////////////////////////////////////
    maskCardNumber(fullCardNumber) {
      const lastFourDigits = fullCardNumber.slice(-4);
      return `${lastFourDigits}`;
    },
    //////////////////////////////////////////
    goback(e) {
      if (e == 1) {
        this.$store.state.hideview2 = false;
        this.$store.state.hideview = false;
        this.$store.state.hideview3 = false;
      }
    },
    /////////////////////////////////////////

    cancel() {
      this.$refs["showtip2"].close();
      this.$refs["showtip"].close();
    },
    addVCCard() {
      this.VcCarIndex = true;
    },
    goto(e) {
      // this.isshow = 1;
      if (e == 1) {
        if (state.bank == "") {
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/cardManage/addBank/addBank",
            });
          }, 500);
        } else {
          this.$store.state.hideview = true;
          this.$store.state.hideview2 = true;
        }
      } else if (e == 0) {
        if (state.currency == "") {
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/cardManage/addcrypto/addcrypto",
            });
          }, 500);
        } else {
          this.$store.state.hideview = true;
          this.$store.state.hideview3 = true;
        }
      } else if (e == 2) {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/cardManage/addBank/addBank",
          });
        }, 500);
      } else if (e == 3) {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/cardManage/addcrypto/addcrypto",
          });
        }, 500);
      } else if (e == 4) {
        this.isshow = 1;

        setTimeout(function () {
          this.isshow = 0;
          uni.navigateTo({
            url: "/pages/home/home",
          });
        }, 500);

        this.$store.state.hideview = false;
        this.$store.state.hideview2 = false;
        this.$store.state.hideview3 = false;
      }
    },
    currFx() {
      if (state.iconUrl) {
        this.$currencyType();
      }
    },
    //银行卡弹窗
    bankAlert(id) {
      this.$refs["showtip"].open();
      this.bankId = id;
    },
    bankAlertFx() {
      console.log("删除银行卡");
      let url = this.$globalApi.userBindbatchUnbindBankCard;
      let dats = { paymentIds: this.bankId };
      this.$res.postRequest(url, dats).then((res) => {
        if (res.data.code == 0) {
          this.$bankApi();
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        } else {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        }
      });
      this.cancel();
    },
    addCar(e) {
      if (e) {
        setTimeout(() => {
          this.addCardIndex = false;
        }, 1000);
      }
      console.log(e, "子");
    },
    VCaddCar(e) {
      // this.getBa();
      if (e) {
        setTimeout(() => {
          this.VcCarIndex = false;
        }, 1000);
      }
    },
    getdaDa() {
      let url = this.$globalApi.userBindallVCProtocol;
      this.isshow = 1;
      this.$res.postRequest(url).then((res) => {
        this.isshow = 0;
        console.log(res);
        this.virtualProtocolList = res.data.data.allVCProtocol;
        // console.log(this.virtualProtocolList,"asdsad")
      });
    },
    navChange(num) {
      this.nav = num;
      if (this.nav == 0) {
        this.hidespecfic = true;
      } else if (this.nav == 1) {
        this.hidespecfic = true;
      }
    },

    //显示添加银行卡
    addBankFx() {
      this.addCardIndex = true;
    },
    unBindAttr(channelId) {
      this.channelId = channelId;
      this.$refs["showtip"].open();
    },
    //删除虚拟币-弹窗
    delAlertCurrency(channelId) {
      this.VCChannelId = channelId;
      this.$refs["showtip2"].open();
    },
    //删除虚拟币
    delCurrency() {
      let url = this.$globalApi.userBindbatchUnbindVCWallet;
      let dats = {
        paymentIds: this.VCChannelId,
      };
      this.$res.postRequest(url, dats).then((res) => {
        if (res.data.code == 0) {
          this.$currencyType();
          this.$refs["showtip2"].close();
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        } else {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        }
      });
      this.cancel();
    },
  },
};
</script>

<style lang="scss">
.CardManage {
  width: 100%;
  position: relative;
  align-items: center;
  height: 100vh;
  #navbar {
    width: 100%;
    position: relative;
    z-index: 1001;

    .fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 120rpx;
      width: 100%;
      background-size: 100% 100%;
      background: #fff;

      .image {
        width: 22rpx;
        height: 38rpx;
        position: absolute;
        left: 52rpx;
        top: 26rpx;
        text-align: center;

        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .title {
        width: 100%;
        height: 100%;
        line-height: 94rpx;
        text-align: center;
        font-size: 32rpx;
        font-weight: bold;
        color: #781000;
      }
    }
  }
  .outter_flex {
    padding: 0rpx 69rpx 52rpx 48rpx;
    .image_logo {
      width: 72rpx;
      height: 72rpx;
    }

    .names {
      width: 100%;
      margin: 0 0 0 18rpx;

      .name_1 {
        color: #003B3D;
        font-family: Inter;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }

      .name_details {
        color: #003B3D;
        font-family: Inter;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    .arrow {
      width: 17rpx;
      height: 34rpx;
    }
  }

  .outter {
    display: flex;
    position: fixed;
    bottom: 38rpx;

    .border_bottom {
      width: 202rpx;
      height: 0px;
      border: 4rpx solid #000000;
      border-radius: 100rpx;
      margin: 50rpx 274rpx 0px 274rpx;
    }
  }

  .text1 {
    margin: 32rpx 0 28rpx 48rpx;
    color: #003B3D;
    font-family: Microsoft YaHei UI;
    font-size: 36rpx;
    font-style: normal;
    font-weight: 700;
    line-height: 40rpx;
    letter-spacing: -0.5px;
  }

  .cards {
    margin: 14rpx 46rpx;
    border-radius: 18rpx;
    background: #d9d9d9;
    padding: 22rpx 20rpx 18rpx 18rpx;
    display: flex;
    align-items: center;

    .image_logo1 {
      width: 66.6rpx;
      max-height: 80rpx;
    }

    .image_logo1_crypto {
      width: 66.6rpx;
      max-height: 80rpx;
    }

    .clsa {
      width: 76%;
      margin-left: 28rpx;

      .card_text2 {
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx; /* 142.857% */
        letter-spacing: -0.1rpx;
      }
      .card_text { 
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -0.1rpx;
        width: 100%;
        display: flex;
      }
    }
    .clsaa {
      width: 76%;
      margin-left: 28rpx;
      .card_text_crypto2 {
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: -0.1rpx;
        word-break: break-word;
      }
      .card_text_crypto {
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 32rpx;
        letter-spacing: -0.1rpx;
      }
    }

    .card_delete {
      width: 50rpx;
      height: 50rpx;
      filter: drop-shadow(4rpx 4rpx 8rpx rgba(0, 0, 0, 0.25));
    }
  }

  .addnew_card {
    margin: 16rpx 0rpx 0 54rpx;
    color: #003B3D;
    font-family: Microsoft YaHei UI;
    font-size: 36rpx;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .add_new_card {
    padding: 52rpx 68rpx 0 52rpx;
    margin-bottom: 100rpx;
    .new_card_text {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.5px;
    //  width: 72%;
    }

    .image_logo2 {
      width: 82rpx;
      height: 24.1446rpx;
      margin-left: -394rpx;
    }

    .image_add {
      width: 50rpx;
      height: 50rpx;
      filter: drop-shadow(4rpx 4rpx 8rpx rgba(0, 0, 0, 0.25));
    }
  }
  .bead {
    margin: 0 auto;
    width: 306rpx;
    height: 74rpx;
    margin-top: 72rpx;
    filter: drop-shadow(0rpx 8rpx 8rpx rgba(0, 0, 0, 0.25));
    border-radius: 22rpx;
    background: #c01c05;
    image {
      width: 12rpx;
      margin-right: 20rpx;
    }
    span {
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 30rpx;
      letter-spacing: -0.1rpx;
    }
  }
}
</style>
