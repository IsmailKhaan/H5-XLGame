<template>
  <view class="hide_able_3 set-bg">
    <zhnavbar
      :title="$t('add_card_view.add_payment_method')"
      :lefticon="true"
    ></zhnavbar>

    <view class="cover">
      <view class="add_fresh_card">{{ $t("add_card_view.add_card") }}</view>
      <view class="sample">
        <!--  -->
        <!-- <image :src="banks.logo" mode="widthFix" ></image> -->
        <view class="clas">
          <view class="ico">
            <image
          v-show="!info"
          src="../../../static/cardManage/master.png"
          mode="widthFix"
        ></image>
        <image v-show="info" :src="banks.logo" mode="widthFix"></image>
          </view>
          <view class="tex"> 
            <view class="bold_address">{{ address || $t("add_card_view.branch_address") }}</view>
            <view class="card_lumber">{{ bankCard || "0762 1544 7602 4312" }}</view>
        </view>
        </view>
      </view>
      <view class="form">
        <view class="uni-input-wrapper">
          <input
            class="uni-input"
            focus
            :placeholder="$t('add_card_view.branch_address')"
            v-model="address"
          />
        </view>
        <view class="uni-input-wrapper">
          <input
            class="uni-input"
            focus
            :placeholder="$t('add_card_view.card_number')"
            maxlength="19"
            type="number"
            v-model="bankCard"
          />
        </view>
        <view class="uni-input-wrapper">
          <view class="uni-input">
            <span v-if="banks.city == ''" style="color: #cbcfd3">{{
              $t("add_card_view.city")
            }}</span>
            <span v-if="banks.city != null">{{ banks.city }}</span>
          </view>
        </view>
        <view class="uni-input-wrapper">
          <view class="uni-input">
            <span v-if="banks.province == ''" style="color: #cbcfd3">{{
              $t("add_card_view.province")
            }}</span>
            <span v-if="banks.province != null">{{ banks.province }}</span>
          </view>
        </view>

        <view
          class="confirmation f-c"
          @click="checkBank"
          :style="{
            backgroundColor: isConfirmationButtonEnabled ? '' : '#9F9F9F',
            pointerEvents: isConfirmationButtonEnabled ? 'auto' : 'none',
          }"
          >{{ $t("add_card_view.confirmation") }}</view
        >
      </view>
      <view class="text_area">
        {{ $t("add_card_view.description1") }}
        <!-- {{ $t('add_card_view.description2') }} -->
      </view>
      <view class="text_area_2">
        {{ $t("add_card_view.description3") }}
        <span @click="kefu()" >{{ $t("add_card_view.description4") }}</span>
      </view>

      
    </view>


    <view v-show="hiddenview1" class="maskLayer2">
      <view class="popup_content2">
        <view class="image_top2"></view>
        <view class="upper_class">
          <span class="ner3" v-html="$t('add_card_view.success')"></span>
        </view>
        <view class="f-a qer2">
          <view class="title_1 f-c" @click="goto(0)">{{
            $t("general.oka")
          }}</view>
        </view>
      </view>
    </view>
    <view v-show="hiddenview2" class="maskLayer">
      <view class="popup_content">
        <view class="image_top"></view>
        <view class="upper_classs">
          <span class="ner4">Something went</span
          ><span class="successs">wrong!</span>
          <span class="ner4">Try again or Try</span>
          <view class="ner5">later </view>
        </view>
        <view class="f-a qer">
          <view class="title f-c" @click="goto(1)">Hmmm!</view>
        </view>
      </view>
    </view>

    <view v-show="hiddenview3" class="maskLayer3">
      <view class="popup_content">
        <view class="image_top"></view>
        <view @click="goto(5)" class="image_top2"></view>
        <view class="upper_classs">
          <!-- <span
            class="ner4"
            v-html="$t('add_card_view.failed_add_bank_card')"
          ></span> -->

          <span
            class="ner4"
            v-html="$t('rules.bankCard')"
          ></span>

        </view>
        <view class="f-a qer">
          <view class="title f-c" @click="goto(6)">{{
            $t("add_card_view.description4")
          }}</view>
        </view>
      </view>
    </view>

    <view class="position_fixed">
      <view class="outter1 f-c">
        <view
          class="next_btn f-c"
          @tap="setBankCard()"
          :style="{
            backgroundColor: isAddButtonEnabled ? '' : '#9F9F9F',
            pointerEvents: isAddButtonEnabled ? 'auto' : 'none',
          }"
          >{{ $t("general.add") }}</view
        >
      </view>
    </view>

  
  </view>
</template>

<script>
import state from "@/store/state";
import { localizationMixin } from "../../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      navtitle: "Add Bank Account",
      hiddenview1: false,
      hiddenview2: false,
      hiddenview3: false,
      banks: {
        bankCode: "",
        bankName: "",
        city: "",
        logo: "",
        province: "",
      },
      bankCard: "",
      info: false,
      infoMsg: "",
      infoType: "",
      address: "",
      bankLogo: "http://pic.dataox.com.cn/gongshang.png",
      logoAttr: false,
      isAddButtonEnabled: false,
      isConfirmationButtonEnabled: true,
    };
  },
  computed: {
    provinceList() {
      return this.$store.state.provinceList;
    },
  },
  methods: {
    kefu() {
		uni.navigateTo({
		  url: "/pages/service/serviceDtl",
		});
	  },
    
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
        this.$store.state.hideview2 = true;
      } else if (e == 1) {
        this.hiddenview2 = true;
        this.hiddenview1 = false;
      } else if (e == 5) {
        this.hiddenview3 = false;
      } else if (e == 6) {
        uni.navigateTo({
          url: "/pages/service/serviceDtl",
        });
      }
    },
    checkBank() {
      if (!this.address) {
        uni.showToast({
          title:this.$t('rules.bank_address'),
          icon: "none",
        });
        return false;
      }
      if (!this.bankCard) {
        uni.showToast({
          title: this.$t('rules.bankCard'),
          icon: "none",
        });
        return false;
      }
      if (!state.rule.bankCard.test(this.bankCard)) {
        this.hiddenview3 = true;
        // uni.showToast({
        //   title: this.$t('rules.bankCard'),
        //   icon: "none",
        // });
        // return false;
      } else {
        this.serachFx();
      }
    },
    setBankCard() {
      console.log("提交银行卡");

      let datas = {
        realName: "",
        bankCardNo: this.bankCard,
        branchAddress: this.address,
      };
      let url = this.$globalApi.userBindbindBankCard;
      uni.showLoading({ title: "加载中.." });
      this.$res.postRequest(url, datas).then((ResponseBo) => {
        uni.hideLoading();
        console.log(ResponseBo, "绑定银行卡");
        if (ResponseBo.data.code == 0) {
          this.$bankApi();

          this.$emit("addCar", true);
          this.$emit("func");
          this.hiddenview1 = true;
          console.log("bank银行卡信息");
          let bank = this.$globalApi.userInfogetAllBankCard;
          this.$res.postRequest(bank).then((res) => {
            state.bank = res.data.data.allBankCard;
            uni.setStorageSync("bank", state.bank);
          });
        }

        uni.showToast({
          title: ResponseBo.data.msg,
          icon: "none",
        });
      });
    },
    toService() {
      uni.navigateTo({
        url: "/pages/service/service",
      });
    },
    async serachFx() {
      let card = /^\d{16}|\d{19}$/;
      let id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      let name = /^[\u4e00-\u9fa5]{2,4}$/;
      let a = /[@#\$%\^&\*\s]+/g;
      console.log("银行卡查询-------");

      if (!state.rule.bankCard.test(this.bankCard)) {
        this.hiddenview3 = true;
        this.isAddButtonEnabled = false;
        this.isConfirmationButtonEnabled = true;
      } else {
        let urls = this.$globalApi.serachBank;
        await this.$res
          .postRequest(urls, {
            bankCardNo: this.bankCard,
          })
          .then((res) => {
            if (res.data.code == 0) {
              this.isAddButtonEnabled = true;
              this.isConfirmationButtonEnabled = false;
              this.info = true;
              this.banks = res.data.data;
              console.log(this.banks, "banls");
            } else {
              this.isAddButtonEnabled = false;
              this.isConfirmationButtonEnabled = true;
              this.info = false;
              uni.showToast({
                title: res.data.msg,
                icon: "none",
              });
            }
          });
      }
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
    height: 81vh;
    overflow: auto;

    .add_fresh_card {
      padding: 32rpx 0 44rpx 48rpx;
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 36rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.5px;
    }

    .sample {
      background: url("../../../static/cardManage/sample.png") no-repeat;
      background-size: 100% 100%;
      height: 348rpx;
      width: 664rpx;
      margin: 0 auto;
      box-shadow: 4rpx 8rpx 18rpx 0px rgba(0, 0, 0, 0.2);
      // box-shadow: 2px 4px 9px 0px rgba(0, 0, 0, 18%);
      border-radius: 32rpx;
    

.clas{
  display: flex;
 margin: 0 0 44rpx 32rpx; 

  .ico{
    image {
      width: 80rpx;
      position: relative;
      top: 242rpx;
    }
  }
  .tex{
    .bold_address {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: 40rpx;
      letter-spacing: -0.5px;
      position: relative;
      top: 242rpx;
      left: 20rpx;
      width: 100%;
    }
    .card_lumber {
      color: #003B3D;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: 15rpx;
      position: relative;
      top: 242rpx;
     left: 20rpx;
      width: 100%;
    }
  }
}

    }

    .form {
      padding: 26rpx 92rpx 0 92rpx;

      .confirmation {
        width: 306rpx;
        height: 74rpx;
        border-radius: 22rpx;
        background: #c01c05;
        color: #fff;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 30rpx;
        letter-spacing: -0.5px;
        margin: 0 auto;
        margin-top: 43rpx;
      }
      .uni-input-wrapper {
        border-bottom: 2rpx solid #003B3D;
        display: flex;
        padding: 16rpx 26rpx;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: #ffffff;
      }

      .uni-input {
       // height: 56rpx;
        line-height: 56rpx;
        font-size: 30rpx;
        padding: 0px;
        flex: 1;
        background-color: #ffffff;
      }

      .uni-input-placeholder {
        width: 430rpx;
        //height: 100%;
        //margin-bottom: -35px;
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -0.5px;
      }

      /deep/.uni-input-input {
        width: 430rpx;
      //  height: 100%;
       // margin-bottom: -28px;
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -0.5px;
      }
    }

    .text_area {
      margin: 94rpx 62rpx 0 62rpx;
      color: #cdcdcd;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.5px;
    }

    .text_area_2 {
      text-align: center;
      color: #cdcdcd;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 25rpx;
      letter-spacing: -0.5px;

      span {
        border-width: 320rpx;
        color: #b53d1e;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 25rpx;
        letter-spacing: -0.5px;
        text-align: center;
        margin-left: 12rpx;
        border-bottom: 2rpx solid #b53d1e;
      }
    }
  }

  .position_fixed {
    padding: 0 7%;
    padding-top: 82rpx;

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
      width: 594rpx;
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
        margin-top: -80px;
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
          margin-left: 4rpx;
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
          box-shadow: 6rpx 8rpx 18rpx 0px rgba(69, 174, 98, 0.5);
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
      width: 594rpx;
      height: 410rpx;
      background: #ffffff;
      border-radius: 40rpx;
      position: fixed;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);

      .image_top {
        background: url("../../../static/cardManage/erro.png") no-repeat;
        background-size: 100% 100%;
        width: 118px;
        height: 102px;
        margin: 0 auto;
        margin-top: -41px;
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

  .maskLayer3 {
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
      height: 410rpx;
      background: #ffffff;
      border-radius: 40rpx;
      position: fixed;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);

      .image_top {
        background: url("../../../static/cardManage/dead.png") no-repeat;
        background-size: 100% 100%;
        width: 300rpx;
        height: 324rpx;
        margin: 0 auto;
        margin-top: -88px;
      }
      .image_top2 {
        background: url("../../../static/cardManage/X.png") no-repeat;
        background-size: 100% 100%;
        width: 32rpx;
        height: 32rpx;
        margin: 0 auto;
        right: 30rpx;
        top: 34rpx;
        //       margin-top: -88px;
        position: absolute;
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
          background: #f90;
          box-shadow: 4rpx 4rpx 24rpx 0px rgba(255, 153, 0, 0.58);
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
}
</style>
