<template>
    <view class="top_class">
        <zhnavbar :title="$t('help_center.deposit_tutorial_bank')" :lefticon="lefticon"></zhnavbar>
        <view class="heading_one f-a">
            <image src="../../static/image/help/deposit.png" mode="widthFix" class="image"></image>
            <view class="heading">{{ $t('help_center.deposit_tutorial_bank') }}</view>
        </view>
        <image style="margin-top: 51px;" src="../../static/image/tutorials/bank/bank1.jpg" mode="widthFix" class="image_screens"></image>
        <image  style="margin-top: 13px;" src="../../static/image/tutorials/bank/bank2.jpg" mode="widthFix" class="image_screens"></image>
        <!-- <image style="margin-top: 13px;"  src="../../static/image/help/deposit/B3.png" mode="widthFix" class="image_screens"></image> -->
        <view class="text">
            {{ $t('help_center.bank_point1') }}
        </view>
        <view class="text">
            {{ $t('help_center.bank_point2') }}

        </view>
        <view class="text">
            {{ $t('help_center.bank_point3') }}

        </view>
        <view class="border_bottom">
		</view>
        <view class="border_bottom1">
		</view>
    </view>
</template>

<script>
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
    data() {
        return {
            navtitle: "Deposit Tutorial",
            lefticon: true,
        };
    },
    methods: {},
};
</script>

<style lang="scss">

.top_class{
    width: 100%;
//	height: 100vh;
	box-sizing: border-box;
.heading_one {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 70rpx 0 0 50rpx;

    image {
          width: 44.1912rpx;
    }

    .heading {
        margin-left: 18rpx;
        color: #304258;
        font-family: Microsoft YaHei UI;
        font-size: 28rpx;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
}



.image_screens {
    width: 80%;
    position: relative;
    margin: 0 0 0 34rpx;
}

.text {
    padding: 12rpx 62rpx 0 72rpx;
    color: #304258;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 40rpx;
    letter-spacing: -0.10rpx;
}
.border_bottom {
    width: 202rpx;
    height: 0rpx;
    border: 4rpx solid #000000;
    border-radius: 50px;
    margin: 88rpx 274rpx 38rpx 274rpx;
}

.border_bottom1 {
    width: 202rpx;
    height: 0rpx;
    border: 4rpx solid #fff;
    border-radius: 100rpx;
    margin: 20rpx 274rpx 38rpx 274rpx;
}
}
</style>
 