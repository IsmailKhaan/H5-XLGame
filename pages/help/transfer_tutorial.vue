<template>
    <view class="top_class">
        <zhnavbar :title="$t('help_center.transfer_tutorial_title')" :lefticon="lefticon"></zhnavbar>
        <view class="heading_one f-a">
            <image src="../../static/image/help/withdraw_tutorial.png" mode="widthFix" class="image"></image>
            <view class="heading">{{ $t('help_center.transfer_steps') }}</view>
        </view>
        <view class="A">A</view>
        <image src="../../static/image/tutorials/transfer/transfer1.jpg" mode="widthFix" class="image_screens"></image>

        <view class="text">
            {{ $t('help_center.transfer_point1') }}
        </view>
   
        <view class="A">B</view>
        <image src="../../static/image/tutorials/transfer/transfer2.jpg" mode="widthFix" class="image_screens_T2"></image>
        <image src="../../static/image/tutorials/transfer/transfer3.jpg" mode="widthFix" class="image_screens_T3"></image>
       
        <view class="text">
            {{ $t('help_center.transfer_point2') }}
        </view>
        <view class="text">
            {{ $t('help_center.transfer_point3') }}
        </view>
        <view class="text">
            {{ $t('help_center.transfer_point4') }}
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
            navtitle: "Transfer Tutorial",
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
        width: 54.1098rpx;
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

.A {
    margin: 0 auto;
    margin-top: 74rpx;
    width: 148rpx;
    height: 60rpx;
    border-radius: 22rpx;
    background: #be1c05;
    color: #fff;
    font-family: Microsoft YaHei UI;
    font-size: 36rpx;
    font-style: normal;
    font-weight: 700;
    line-height: 54.546rpx;
    letter-spacing: -0.1364rpx;
    text-align: center;
}

.image_screens {
    width: 80%;
    position: relative;
    margin: 0 0 0 34rpx;
}
.image_screens_T2 {
    width: 90%;
    position: relative;
    margin: 0 0 0 44rpx;
}
.image_screens_T3 {
    width: 71%;
    position: relative;
    margin: 0 130rpx;
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
