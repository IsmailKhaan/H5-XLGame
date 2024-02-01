<template>
  <view class="games_options">
    <zhnavbar
      :title="$t('help_center.game_tutorial')"
      :lefticon="lefticon"
    ></zhnavbar>
    <!-- <uni-section> -->
    <uni-collapse ref="collapse" @change="change">
      <uni-collapse-item :title="$t('game_problems.sports_question')">
        <view class="text2">{{ $t("sport_game_questions.question1") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer1") }}
        </view>
        <view class="text2">{{ $t("sport_game_questions.question2") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer2") }}
        </view>
        <view class="text2">{{ $t("sport_game_questions.question3") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer3") }}
        </view>
        <view class="text2">{{ $t("sport_game_questions.question4") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer4") }}
        </view>
        <view class="text2">{{ $t("sport_game_questions.question5") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer5") }}
        </view>
        <view class="text2">{{ $t("sport_game_questions.question6") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer6") }}
        </view>
        <view class="text2">{{ $t("sport_game_questions.question7") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer7") }}
        </view>
        <view class="text2">{{ $t("sport_game_questions.question8") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer8") }}
        </view>
        <view class="text2">{{ $t("sport_game_questions.question9") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer9") }}
        </view>
        <view class="text2">{{ $t("sport_game_questions.question10") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer10") }}
        </view>

        <view class="text2">{{ $t("sport_game_questions.question11") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer11") }}
        </view>

        <view class="text2">{{ $t("sport_game_questions.question12") }}</view>
        <view class="text" style="margin-top: 10px">
          {{ $t("sport_game_questions.answer12") }}
        </view>
      </uni-collapse-item>

      <uni-collapse-item :title="$t('game_problems.real_question')">
        <view class="text2">{{ $t("real_game_question.question1") }}</view>
        <view class="text" v-html="$t('real_game_question.answer1')"></view>

        <view class="text2">{{ $t("real_game_question.question2") }}</view>
        <view class="text" v-html="$t('real_game_question.answer2')"></view>

        <view class="text2">{{ $t("real_game_question.question3") }}</view>
        <view class="text" v-html="$t('real_game_question.answer3')"></view>

        <view class="text2">{{ $t("real_game_question.question4") }}</view>
        <view class="text" v-html="$t('real_game_question.answer4')"></view>

        <view class="text2">{{ $t("real_game_question.question5") }}</view>
        <view class="text" v-html="$t('real_game_question.answer5')"></view>

        <view class="text2">{{ $t("real_game_question.question6") }}</view>
        <view class="text" v-html="$t('real_game_question.answer6')"></view>

        <view class="text2">{{ $t("real_game_question.question7") }}</view>
        <view class="text" v-html="$t('real_game_question.answer7')"></view>

        <view class="text2">{{ $t("real_game_question.question8") }}</view>
        <view class="text" v-html="$t('real_game_question.answer8')"></view>

        <view class="text2">{{ $t("real_game_question.question9") }}</view>
        <view class="text" v-html="$t('real_game_question.answer9')"></view>
      </uni-collapse-item>

      <uni-collapse-item :title="$t('game_problems.esports_issue')">
        <view class="text2">{{ $t("esports_game_issue.question1") }}</view>
        <view class="text" v-html="$t('esports_game_issue.answer1')"></view>

        <view class="text2">{{ $t("esports_game_issue.question2") }}</view>
        <view class="text" v-html="$t('esports_game_issue.answer2')"></view>
      </uni-collapse-item>

      <uni-collapse-item :title="$t('game_problems.lottery_problem')">
        <view class="text2">{{ $t("lottery_game_problem.question1") }}</view>
        <view class="text" v-html="$t('lottery_game_problem.answer1')"></view>

        <view class="text2">{{ $t("lottery_game_problem.question2") }}</view>
        <view class="text" v-html="$t('lottery_game_problem.answer2')"></view>

        <view class="text2">{{ $t("lottery_game_problem.question3") }}</view>
        <view class="text" v-html="$t('lottery_game_problem.answer3')"></view>
      </uni-collapse-item>

      <uni-collapse-item :title="$t('game_problems.other_problems')">
        <view class="text2">{{ $t("other_game_problems.question1") }}</view>
        <view class="text" v-html="$t('other_game_problems.answer1')"></view>

        <view class="text2">{{ $t("other_game_problems.question2") }}</view>
        <view class="text" v-html="$t('other_game_problems.answer2')"></view>
      </uni-collapse-item>
    </uni-collapse>

    <!-- </uni-section> -->
    <!-- <view class="bg">
      <view class="border_bottom"></view>
    </view> -->
  </view>
</template>

<script>
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      // navtitle: "Game Tutorial",
      lefticon: true,
    };
  },
  methods: {
    change(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
view {
  letter-spacing: 2.8rpx;
}
.content {
  padding: 30rpx;
}

.text {
  font-size: 28rpx;
  color: #666;
  line-height: 40rpx;
}

.games_options {
  padding: 0 74.5rpx 40rpx 54rpx;
  .bg {
    width: 100%;
    background: #fff;
    height: 40px;
    padding: 0 0 0 0;
    bottom: 0px;
    position: fixed;
    left: 0;
  }
  .border_bottom {
    width: 202rpx;
    height: 0rpx;
    border: 4rpx solid #000000;
    border-radius: 50px;
    bottom: 38rpx;
    position: fixed;
    left: 274rpx;
  }
  .heading_one {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 70rpx 0 0 0rpx;

    image {
      width: 70rpx;
    }

    .heading {
      margin-left: 18rpx;
      color: #003b3d;
      font-family: Microsoft YaHei UI;
      font-size: 28rpx;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  /deep/.uni-collapse-item {
    letter-spacing: 2.8rpx;
  }
  /deep/.uni-collapse-item-border {
    border-bottom: none;
  }
  /deep/.uni-collapse-item__title-text {
    color: #292c3b;
    font-family: Microsoft YaHei UI;
    font-size: 26rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  /deep/.uni-collapse-item__title-box {
    padding: 0;
  }
  /deep/.uniui-bottom {
    font-size: 54rpx !important;
    color: #bebed6 !important;
  }
  /deep/.uni-collapse-item__title-arrow-active {
    transform: rotate(-90deg);
  }
  .text2 {
    color: #292c3b;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 36rpx 0 20rpx 0;
  }
  /deep/.text {
    color: #a4a7b6 !important;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  /deep/.uni-collapse-item__title-arrow {
    background: url("../../static/service/drop.png");
    background-size: 100% 100%;
    width: 35rpx;
    height: 20rpx;
  }
}
</style>
