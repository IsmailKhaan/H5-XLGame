<template>
  <view class="content1">
    <zhnavbar
      :title="$store.state.gamesIndex"
      :lefticon="true"
      url="/pages/index/index"
    ></zhnavbar>

    <view class="sj">
      <view
        class="flex gameCls1"
        v-for="(item, index) in list"
        :key="index"
        @click="jruyem(item.hallUniqueCode, item.gameCode, item.gameNameCN,item)"
      >
        <view
          class="gameCls"
          :style="
            'background:url(' + item.iconUrlF + ') no-repeat center /100% 100%'
          "
        ></view>
        <view class="gametes">{{ item.gameNameCN }}</view>
      </view>
    </view>
    <view class="f-c">
      <view class="border_bottom f-c"></view>
    </view>
  </view>
</template>

<script>
// import RequestSender from "@/common/js/request.js";
import state from "store/state";

export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    jruyem(code, gameCode, gameName,item) {
      state.gamesIndex = gameName;
      uni.setStorageSync("GameName", state.gamesIndex);
      console.log(state.gamesIndex, "gameindex");

      let _this = this;
      let data = {
        uniqueCode: code,
        gameCode: gameCode,
      };
     
      let url = _this.$globalApi.mbHallGameLogin;
      this.$res.post(url, data).then((res) => {
        if (res.code == 0) {
          let url =res.data.hallGameUrl + "?" + uni.getStorageSync("userToken");
            uni.setStorageSync("activityUrl1", url);
            this.$store.state.activityUrl1 = url;

          uni.navigateTo({
            url: "/pages/index/activityDt",
          });
        } else if (res.code != 0) {
          uni.showToast({
            title: res.msg,
            icon: "none",
          });
          return;
        }
      });
    },
  },
  mounted() {},
  beforeCreate() {},
  onLoad() {
    try {
      let list = uni.getStorageSync("loginResultDataForImg");
      let JsonUrl = uni.getStorageSync("jsons");

      list.forEach((el) => {
        el.iconUrlF = state.iconUrl + el.iconUrl;
        console.log(el.iconUrlF, "el.iconUrlF");
      });

      this.list = list; // Assign the updated list to this.list
    } catch (error) {}
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  flex-flow: column;
}

.sj {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  max-height: 743px;
  min-height: 250px;
}

.content1 {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  width: 98%;
  margin: 10rpx auto;

  .border_bottom {
    width: 101px;
    height: 0px;
    border: 2px solid #000000;
    border-radius: 50px;
    margin: 21px 137px 19px 137px;
    position: absolute;
    bottom: 0;
  }

  .gameCls1 {
    width: 50%;
    height: 280rpx;
    margin-bottom: 6rpx;
    border-radius: 10rpx;
  }

  .gameCls {
    width: 99%;
    height: 240rpx;
    border-radius: 20rpx;
  }

  .gametes {
    width: 120rpx;
    height: 40rpx;
    color: #781000;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    letter-spacing: -0.5px;
    margin: 0 auto;
  }
}

@keyframes scaledh {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
