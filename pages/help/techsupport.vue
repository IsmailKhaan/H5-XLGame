<template>
  <view class="help set-bg">
    <zhnavbar :title="$t('help_center.technical_support_title')" :lefticon="true" v-if="inStatu"></zhnavbar>
    <div class="main_class1" v-show="headings">
      <view class="main_class2" @click="Tsupport(0)">
        <image
          class="image1"
          src="../../static/image/help/question.png"
          mode="widthFix"
        ></image>
        <view class="texts">
          <view class="heading_text">{{ $t('technical_support_questions.technical_support_question1') }}</view>
        </view>
        <image
          class="image2"
          src="../../static/image/help/arrow_down.png"
          mode="widthFix"
        ></image>
      </view>

      <view
        class="main_class2"
        style="padding: 14px 0 14px 0"
        @click="Tsupport(1)"
      >
        <image
          class="image1"
          src="../../static/image/help/question.png"
          mode="widthFix"
        ></image>
        <view class="texts">
          <view class="heading_text"
            >{{ $t('technical_support_questions.technical_support_question2') }}</view
          >
        </view>
        <image
          class="image2"
          src="../../static/image/help/arrow_down.png"
          mode="widthFix"
        ></image>
      </view>

      <view class="main_class2" @click="Tsupport(2)">
        <image
          class="image1"
          src="../../static/image/help/question.png"
          mode="widthFix"
        ></image>
        <view class="texts">
          <view class="heading_text">{{ $t('technical_support_questions.technical_support_question3') }}</view>
        </view>
        <image
          class="image2"
          src="../../static/image/help/arrow_down.png"
          mode="widthFix"
        ></image>
      </view>
    </div>
    <view class="cover" v-show="para0">
      <view class="main_class2_0" @click="Tsupport2(0)">
        <image
          class="image1"
          src="../../static/image/help/arrow_left.png"
          mode="widthFix"
        ></image>
        <view class="texts">
          <view class="heading_text">{{ $t('technical_support_questions.technical_support_question1') }}</view>
        </view>
      </view>
      <view class="para">
        {{ $t('technical_support_questions.technical_support_answer1') }}
      </view>
    </view>
    <view class="cover" v-show="para1">
      <view class="main_class2_0" @click="Tsupport2(0)">
        <image
          class="image1"
          src="../../static/image/help/arrow_left.png"
          mode="widthFix"
        ></image>
        <view class="texts">
          <view class="heading_text">{{ $t('technical_support_questions.technical_support_question2') }}</view>
        </view>
      </view>
      <view class="para">
        {{ $t('technical_support_questions.technical_support_answer2') }}
      </view>
    </view>
    <view class="cover" v-show="para2">
      <view class="main_class2_0" @click="Tsupport2(0)">
        <image
          class="image1"
          src="../../static/image/help/arrow_left.png"
          mode="widthFix"
        ></image>
        <view class="texts">
          <view class="heading_text">{{ $t('technical_support_questions.technical_support_question3') }}</view>
        </view>
      </view>
      <view class="para">
        {{ $t('technical_support_questions.technical_support_answer3') }}
      </view>
    </view>

    <view class="border_bottom"></view>
  </view>
</template>
<!-- padding: 14px 0 14px 0; -->

<script>
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      navtitle: "Technical Support",
      inStatu: true,
      headings: true,
      para0: false,
      para1: false,
      para2: false,
    };
  },
  methods: {
    Tsupport(e) {
      if (e == 0) {
        this.headings = false;
        this.para0 = true;
      } else if (e == 1) {
        this.headings = false;
        this.para1 = true;
      } else if (e == 2) {
        this.headings = false;
        this.para2 = true;
      }
    },
    Tsupport2(e) {
      if (e == 0) {
        this.headings = true;
        this.para0 = false;
        this.para1 = false;
        this.para2 = false;
      }
    },
  },
};
</script>

<style lang="scss">
.help {
  width: 100%;

  .main_class1 {
    padding: 26rpx 74rpx 0 74rpx;

    .main_class2 {
      display: flex;
      align-items: center;
      .image1 {
        width: 50rpx;
        margin-right: 20rpx;
        //        margin-left: 7.5px;
      }

      .texts {
        width: 85%;
        .heading_text {
          color: #292c3b;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .image2 {
        position: absolute;
        right: 56.1rpx;
        width: 28.1rpx;
        background: none;
      }
    }
  }
  .cover {
    .main_class2_0 {
      padding: 26rpx 74rpx 0 74rpx;
      display: flex;
      align-items: center;
      .image1 {
        width: 8.5px;
        height: 17px;
        margin-right: 14.5px;
      }

      .texts {
        width: 85%;
        .heading_text {
          color: #292c3b;
          font-family: Microsoft YaHei UI;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
      }
    }
    .para {
      padding: 20rpx 58rpx 0 104rpx;
      color: #a4a7b6;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .border_bottom {
    width: 202rpx;
    height: 0rpx;
    border: 4rpx solid #000000;
    border-radius: 100rpx;
    margin: 0 274rpx -48rpx 274rpx;
    position: absolute;
    bottom: 0;
  }
}
</style>
