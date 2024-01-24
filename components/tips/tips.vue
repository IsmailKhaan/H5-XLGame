<template>
	<view class="tips flex-row" >
		<text class="tips-msg" >{{tipsMsg}}</text>
	</view>
</template>

<script>
	export default{
		props:[
			'tipsMsg',
		],
		
		data() {
			return {
				// tipsStyle:{
				// 	"top":this.top
				// }
			}
		},
	}
</script>

<style lang="scss">
	.tips{
		position:fixed;
		left: 0;
		right: 0;
		/* top: 0;
		bottom: 0; */
		margin: auto;
		width: 400rpx;
		/* height: auto; */
		justify-content: center;
		// background: #FFFFFF;
		border-radius: 10rpx;
		z-index: 99999;
		.tips-msg{
			/* color: ; */
			background: rgba($color: #000000, $alpha: 0.5);
			padding: 20rpx;
			color: #FFFFFF;
			border-radius: 10rpx;
		}
	}
</style>
