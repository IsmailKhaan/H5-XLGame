<template>
  <view class="crypto set-bg">
    <zhnavbar v-if="show == true" :title="navtitle" :lefticon="true"></zhnavbar>
    <!-- ================================What is virtual currency?========================== -->

    <view class="what f-c">什么是虚拟币</view>
    <view class="what_point_01">
      <view class="what_p_001"></view>
      <view class="what_p_002"
        >虚拟币是一种不具备实体形式的、仅以数字形式存在的
        货币，也称之为“数字货币”。</view
      >
    </view>
    <view class="what_point_01">
      <view class="what_p_001"></view>
      <view class="what_p_002"
        >其性质与实体货币相似，允许在互联网上即时地、无地
        理限制地转让，主流的数字货币如USDT(泰达币)、
        BTC(比特币)、ETH(以太坊)等。</view
      >
    </view>
    <view class="what_point_01">
      <view class="what_p_001"></view>
      <view class="what_p_002"
        >用户可以通过数字货币交易平台购买数字货币，在平
        台进行支付、兑换成人民币从而进行游戏。</view
      >
    </view>
    <!-- ================================Advantages of virtual currency========================== -->

    <view class="what f-c" style="margin-top: 28px">虚拟币优势</view>
    <view class="what_point_01" style="align-items: normal">
      <image
        style="width: 16px"
        src="../../../static/deposit/dollar.png"
        mode="widthFix"
        class="what_p_001_image"
      >
      </image>
      <view class="what_p_002">
        <view class="heading_point">高度加密</view>
        <view class="text_point"
          >与银行卡等传统交易方式相比，玩家不需要给出自己的
          姓名或卡号即可完成虚拟币交易，避免敏感信息泄露。
        </view>
      </view>
    </view>

    <view class="what_point_01" style="align-items: normal">
      <image
        style="width: 12px"
        src="../../../static/deposit/transaction.png"
        mode="widthFix"
        class="what_p_001_image"
      ></image>
      <view class="what_p_002">
        <view class="heading_point">交易快速</view>
        <view class="text_point">
          虚拟币所采用的区块链技术具有去中心化特点，不需要
          清算中心机构来处理数据，交易时间大大缩短。
        </view>
      </view>
    </view>

    <view class="what_point_01" style="align-items: normal">
      <image
        style="width: 17px"
        src="../../../static/deposit/decentralization.png"
        mode="widthFix"
        class="what_p_001_image"
      ></image>
      <view class="what_p_002">
        <view class="heading_point">去中心化</view>
        <view class="text_point">
          不由央行或当局发行，不受银行监管，玩家可随心所欲
          地使用存放在自己数字钱包里的资金。
        </view>
      </view>
    </view>

    <!-- ================================Advantages of USDT========================== -->

    <view class="what f-c" style="margin-top: 28px">USDT泰达币优势</view>

    <view class="text_point_000">
      泰达币（Tether）也被称为USDT，其价值等同于美元。 1 USDT≈1
      美元，该特点使USDT成为全球加密数字货币
      中规模最大、流通性最高的稳定币，具有良好的保值性，
      也是网站所使用的主要币种。
    </view>
    <view class="what_point_01" style="align-items: normal">
      <image
        style="width: 30px"
        src="../../../static/deposit/safety.png"
        mode="widthFix"
        class="what_p_001_image"
      >
      </image>
      <view class="what_p_002">
        <view class="heading_point">安全</view>
        <view class="text_point">
          价格稳定 <br />
          流通性高<br />
          匿名交易
        </view>
      </view>
    </view>

    <view class="what_point_01" style="align-items: normal">
      <image
        style="width: 30px"
        src="../../../static/deposit/safety.png"
        mode="widthFix"
        class="what_p_001_image"
      >
      </image>
      <view class="what_p_002">
        <view class="heading_point">便捷</view>
        <view class="text_point">
          不受银行监管<br />
          24小时随时交易<br />
          全球交易无地域限制
        </view>
      </view>
    </view>
    <!-- ================================Listing of virtual trading platforms========================== -->
    <view class="what f-c" style="margin-top: 28px">虚拟交易平台列示</view>
    <view class="what_point_01" style="align-items: normal">
      <image
        style="width: 16px"
        src="../../../static/deposit/mix.png"
        mode="widthFix"
        class="what_p_001_image"
      >
      </image>
      <view class="what_p_002">
        <view class="heading_point">Mixpay</view>
        <view class="text_point">
          全球领先的多功能数字金融支付工具。支持国内支付
          宝平台交易，开放借贷，跨境支付。
        </view>
      </view>
    </view>

    <view class="what_point_01" style="align-items: normal">
      <image
        style="width: 12px"
        src="../../../static/deposit/huobi.png"
        mode="widthFix"
        class="what_p_001_image"
      >
      </image>
      <view class="what_p_002">
        <view class="heading_point">火币</view>
        <view class="text_point">
          全球知名老牌交易所之一。支持法币，币币交易，币 种多，成交量大。
        </view>
      </view>
    </view>

    <view class="what_point_01" style="align-items: normal">
      <image
        style="width: 17px"
        src="../../../static/deposit/cc.png"
        mode="widthFix"
        class="what_p_001_image"
      >
      </image>
      <view class="what_p_002">
        <view class="heading_point">中币</view>
        <view class="text_point">
          全球领先的数字资产交易平台，中国最早的数字货币
          交易平台之一。为全球超过千万用户提供数字资产交
          易服务，日均交易额30亿美金。
        </view>
      </view>
    </view>

    <view class="what_point_01" style="align-items: normal">
      <image
        style="width: 17px"
        src="../../../static/deposit/binance.png"
        mode="widthFix"
        class="what_p_001_image"
      >
      </image>
      <view class="what_p_002">
        <view class="heading_point">币安</view>
        <view class="text_point">
          全球领先的数字货币交易平台，提供比特币、USDT等
          主流数字货币交易。提供网页端，APP端，电脑端等多
          种交易方式。
        </view>
      </view>
    </view>

    <!-- ========================================================================= -->
    <navigator url="/pages/help/virtual_deposit_tutorial" class="butttton f-c">
      查看教程
    </navigator>
    <!-- <view ></view> -->
    <view class="text">
      您也可以选择其他虚拟币平台交易
    </view>
    <view class="bottom_border"></view>
    <view style="height: 16px"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navtitle: "虚拟币教程",
      show: true,
    };
  },
  methods: {
    hidenabvar(e) {
      if (e == '1') {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="scss">
.crypto {
  width: 100%;
  position: relative;
  align-items: center;

  .what {
    width: 229px;
    height: 33px;
    border-radius: 54px;
    background: #b53d1e;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.63) inset;
    color: #f1f1f1;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    /* 166.667% */
    letter-spacing: -0.5px;
    margin: 0 auto;
    margin-top: 9px;
  }

  .text_point_000 {
    width: 100%;
    padding: 26px 50px 0 50px;
    color: #304258;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    letter-spacing: -0.5px;
  }

  .what_point_01 {
    padding: 28px 26px 0 29px;
    display: flex;
    justify-content: space-around;
    align-items: baseline;

    .what_p_001 {
      width: 10px;
      height: 10px;
      border-radius: 50px;
      background: #b53d1e;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .what_p_001_image {
    }

    .what_p_002 {
      width: 291px;
      color: #304258;
      font-family: Microsoft YaHei UI;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      /* 166.667% */
      letter-spacing: -0.5px;

      .heading_point {
        color: #304258;
        font-family: Microsoft YaHei UI;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
        /* 166.667% */
        letter-spacing: -0.5px;
      }

      .text_point {
        color: #304258;
        font-family: Microsoft YaHei UI;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        /* 166.667% */
        letter-spacing: -0.5px;
      }
    }
  }
  .butttton {
    width: 222px;
    height: 37px;
    border-radius: 11px;
    background: #be1c05;
    color: #fff;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px; /* 125% */
    letter-spacing: -0.5px;
    margin: 0 auto;
    margin-top: 32px;
  }
  .text {
    color: #b3b7cb;
    text-align: center;
    font-family: Microsoft YaHei UI;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 232px;
    margin: 0 auto;
    margin-top: 32px;
  }
  .bottom_border {
    width: 101px;
    height: 3px;
    background: #000;
    margin: 34px auto 0 auto;
    border-radius: 20px;
  }
}
</style>
