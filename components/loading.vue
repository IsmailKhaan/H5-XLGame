<template>
	<view v-if="loading.show">
		<view class="loading"><image :src="loading.image" class="image"></image></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState({
			loading: state => state.loading
		})
	}
};
</script>

<style lang="less" scoped>
.loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background:rgba(255,255,255,0);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 99998;
	.image {
		width: 160rpx;
		height: 160rpx;
		z-index: 99999;
		/* 加入旋转 */
		// -webkit-transition-property: -webkit-transform;
		// -webkit-transition-duration: 1s;
		// -moz-transition-property: -moz-transform;
		// -moz-transition-duration: 1s;
		// -webkit-animation: rotate 2s linear infinite;
		// -moz-animation: rotate 2s linear infinite;
		// -o-animation: rotate 2s linear infinite;
		// animation: rotate 2s linear infinite;
	}
}

@-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
}
@-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
    to{-moz-transform: rotate(359deg)}
}
@-o-keyframes rotate{from{-o-transform: rotate(0deg)}
    to{-o-transform: rotate(359deg)}
}
@keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
}
</style>
