<template>
<view>
	<view class="loading" v-show="isshow">
		<image src="./loading.gif" mode="widthFix"></image>
		<!-- <div class="texts">汛利娱乐欢迎你</div> -->
		<div class="texts">{{ $t('alerts.loading') }}</div>
	</view>
	<!-- 竖屏提示 alert Horizont-->
	<view class="h-alert f-c f" v-show="ale">
		<view>请转回竖屏下浏览</view>
		<view>Please browse on the vertical screen</view>
	</view>




</view>	
</template>

<script>
import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
	name:"loading",
		data() {
			return {
				
			};
		},
		props:['isshow','ale']
	}
</script>

<style lang="scss" scoped>

.h-alert{
	background: #ddd;
	position:fixed;
	top:0;
	left:0;
	height:100%;
	width:100%;
	z-index: 10001;
	font-size: 28rpx;
	line-height: 34rpx;
	display: none;
}
// Horizont
@media screen and (orientation: landscape){　
	.h-alert{
		display: flex;
	}
	
}



	.loading{
		position: fixed;
		top:0;
		left:0;
		z-index: 200;
		width:100%;
		height:100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// background: rgba(255,255,255,0.9);
		// background: rgba(255,255,255,0.3);
		// background: rgba(0,0,0,0.3);
		background: #fff;
		image{
			display: block;
			width:180rpx;
			height:180rpx;
			margin-bottom:10rpx;
		}
	}

	.texts{
		color: #304258;
		font-family: Microsoft YaHei UI;
		font-size: 32rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 40rpx; 
		letter-spacing: 2.8rpx;
		margin: 0 0 0 30rpx;
	}



</style>