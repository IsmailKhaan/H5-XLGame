<template>
	<view class="activity flex-col">
		<loading :isshow="isshow" :ale="true"></loading>
		<!-- @click="getActivityJson()" -->
		<view class="f-c h2-title">
			<navigator url="/pages/index/index" style="height: 100%; margin-left: 54rpx; display: none" class="f-c">
				<image class="navigator_activity" mode="" src="/static/index/Vector.png"></image>
			</navigator>
			<view class="you-title">{{ $t("promotion.promotion_title") }}</view>
			<image @click="handle(['slide-right'])" class="navigator_switch" mode="widthFix" src="/static/index/switch.png">
			</image>
		</view>
		<view class="example">
			<uni-transition ref="ani" custom-class="transition" :styles="styles" :show="show">
				<span v-for="(item, index) in actList.title" :key="index" :id="item.id" @tap="navChange(index)">
					<text class="text f-s">{{ item }}</text>
					<span :class="{ borders: index != Object.keys(actList).length - 0 }" class="f-c"></span>
				</span>
			</uni-transition>
		</view>

		<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" :down="downOption" :up="upOption">
			<view v-if="actList && actList.activities && actList.activities.length">
			<view v-for="(item, index) in actList.activities" :key="index" class="list-bor"
				@tap="detail($store.state.siteUrl + item.html, item.html, item)"
				:style="{ 'margin-top': index === 0 ? '0' : '' }">
				<image :src="$store.state.iconUrl + item.banner" class="img" mode="widthFix">
					<view class="times">
						<image class="tasveer" src="../../static/index/time.png" mode="widthFix"></image>
						<span>{{ item.timeRange }}</span>
					</view>
				</image>
			</view>
		    </view>
			<view class="after_list" v-else-if="actList && (!actList.activities || actList.activities.length === 0)">
				<image  src="/static/img/demo.png" class="tasiver" mode="widthFix">
				</image>
				<view class="h1 f-c">{{ $t("notifications.sorry") }}</view>
				<view class="h2 f-c">
					{{ $t("errors.no_activity") }}
				</view>
			</view>
		</mescroll-uni>

		<publicNav :active="1"></publicNav>
	</view>
</template>

<script>
import { mapState, mapMutations, mapAction } from "vuex";
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import { localizationMixin } from "../../common/js/localization";
import state from "../../store/state";

export default {
	mixins: [localizationMixin, MescrollMixin],
	data() {
		return {
			styles: {},
			show: false,
			active: "0",
			actList: [],
			isshow: 0,
			mescroll: null,
			downOption: {
				use: true,
				auto: false,
			},
			upOption: {
				use: false,
			},
		};
	},
	components: {
		MescrollUni,
	},
	computed: {
		...mapState({
			jsons: (state) => state.jsons,
		}),
		isLastItem() {
			return (index) => index === this.actList.title.length - 1;
		},
	},
	watch: {
		jsons(newData, old) {
			console.log(newData, "..............---");
			this.getActivityJson();
		},
	},
	onLoad() {
		this.getActivityJson();
		// #ifdef APP-NVUE
		this.styles = {
			justifyContent: "center",
			alignItems: "center",
			width: "200rpx",
			height: "200rpx",
			borderRadius: "10rpx",
			textAlign: "center",
			backgroundColor: "#111",
			boxShadow: "0 0 10rpx 2rpx rgba(0,0,0,0.2)",
		};
		// #endif
	},
	methods: {
		navChange(activityType) {
			this.show = false;
			this.active = activityType;
			let oldactivities = uni.getStorageSync("activities");
			console.log(oldactivities, "活动actList");
			let a = [];
			if (activityType != 0) {
				oldactivities.activities.forEach((element) => {
					if (element.activityType == activityType) {
						a.push(element);
					}
				});
				this.actList.activities = a;
				console.log(this.actList, "list");
			} else {
				this.actList = uni.getStorageSync("activities");
			}
		},
		getActivityJson() {
			console.log("优惠11-activity");
			let that = this;
			if (state.jsons) {
				that.getyhActivty(
					state.jsons.activitiesVersionNo,
					state.jsonUrl + state.jsons.activities
				);
			}
		},
		getyhActivty(activitiesVersionNo, jsonurl) {
			this.isshow = 1;

			let oldactivities = uni.getStorageSync("activities");
			if (
				oldactivities &&
				oldactivities.activitiesVersionNo === activitiesVersionNo
			) {
				this.isshow = 0;
				this.actList = oldactivities;
			} else {
				let time = new Date().getTime();
				this.$res.getRequest(jsonurl + "?time=" + time).then((res) => {
					this.actList = res.data.datas;
					this.actList.activitiesVersionNo = activitiesVersionNo;
					uni.setStorageSync("activities", this.actList);
					setTimeout((res) => {
						this.isshow = 0;
					}, 800);
				});
			}
		},
		handle(type) {
			this.show = !this.show;
		},
		detail(html, ty, item) {
			if (this.$logins()) {
				if (item.jumpType == "native") {
					uni.navigateTo({
						url: item.html,
					});
				} else if (item.jumpType == "url") {
					if (ty) {
						let url = html + "?" + uni.getStorageSync("userToken");
						uni.setStorageSync("activityUrl", url);
						this.$store.state.activityUrl = url;
						uni.navigateTo({
							url: "/pages/activity/activityDtl",
						});
						sessionStorage.setItem("event_title", item.activityTitle);
					}
				}
			}
		},
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},









	},
};
</script>

<style lang="scss">
page {
	background: #ebeefd;
}

/deep/.mescroll-uni-warp {
	margin-top: 76rpx;
}

.example {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2001;
	top: 76rpx;
	position: absolute;
	right: 48rpx;
	border-radius: 18rpx;
	background: linear-gradient(70deg, #d9d9d9, white);
	opacity: 0.9;
}

.transition-button {
	width: 100%;
	flex: 1;
	margin-bottom: 20rpx;
}

.example ::v-deep .transition {
	border-radius: 10rpx;
	text-align: center;
	background: linear-gradient(70deg, #d9d9d9, white);
	box-shadow: 0 0 10rpx 2rpx rgba(0, 0, 0, 0.2);
	padding: 26rpx 23rpx 18rpx 19rpx;
}

/deep/.uni-transition {
	padding: 26rpx 23rpx 18rpx 19rpx;
}

.text {
	font-size: 24rpx;
	color: #304258;
	width: 254rpx;
	//border-bottom: 2rpx solid #db2b0f;
	line-height: 54rpx;
}

.borders {
	width: 254rpx;
	height: 2rpx;
	background: #db2b0f;
	margin: 0 auto;
}

.akhri {
	color: white !important;
}

.activity {
	width: 100%;
	height: 100%;
	background: #ffffff;

	.navigator_activity {
		width: 22rpx;
		height: 38rpx;
	}

	.you-title {
		font-size: 32rpx;
		color: #781000;
		width: 100%;
		font-weight: bold;
		text-align: center;
	}

	.navigator_switch {
		width: 40rpx;
		height: 24rpx;
		margin-right: 54rpx;
		position: absolute;
		top: 18px;
		right: 0;
	}
}

.list-bor {
	width: 100%;
	height: 284rpx;
	margin: 36rpx auto;
}

.list-bor .img {
	width: 100%;
	display: block;
	margin: 0 auto;
	padding: 0 11px;
}

.times {
	width: fit-content;
	height: 46rpx;
	border-radius: 0px 5px 5px 0px;
	background: #fff;
	position: relative;
	z-index: 101;
	left: 22rpx;
	top: -42px;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	.tasveer {
		width: 24rpx;
		margin: 10rpx 0 10rpx 8rpx;
	}

	span {
		color: #304258;
		font-family: Microsoft YaHei UI;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin: 0 10rpx 0 10rpx;
	}
}

.list-icon {
	position: absolute !important;
	top: 0;
	left: -10rpx;
	width: 104rpx;
	z-index: 10;
}

.h2-title {
	height: 98rpx;
	background: #fff;
	width: 100%;
	margin: 0;
	padding: 0;
	font-weight: normal;
}

/deep/.mescroll-uni {
	padding-bottom: 132rpx !important;
	top: 110rpx !important;
}
</style>
