<template>
    <view class="bg">
		<view class="fixed_top">
        <zhnavbar :title="$t('transaction_record_view.transaction_record_title')" :lefticon="true"></zhnavbar>
        <view class="navbar_transaction">
            <view class="menu_transaction f-c" @click="menuFx"
            :style="{ background: lists.total === 0 ? '#111' : '' ,opacity: lists.total === 0 ? '0.7' : '' ,}">
                <image src="../../static/transfer/menu_transaction.png" mode="widthFix"></image>
                <text>{{ datas.name }}</text>
            </view>
            <view class="days_transaction f-a">
                <view class="todays f-c" @click="dayFx(0)" :class="navBorder == 0 ? 'on' : ''">{{ $t('transaction_record_view.today') }}</view>
                <view class="todays f-c" @click="dayFx(2)" :class="navBorder == 2 ? 'on' : ''">{{ $t('transaction_record_view.last7days') }}</view>
                <view class="todays f-c" @click="dayFx(3)" :class="navBorder == 3 ? 'on' : ''">{{ $t('transaction_record_view.last30days') }}</view>
            </view>
        </view>

        <div class="bet-menus-bg" v-show="menu" @click.stop="menuFx">
            <div class="bet-menus">
                <div class="mains">
                    <div v-for="(v, index) in mune" :key="index" @click.stop="menusFx(v, index)">
                        <span class="name f-c"> {{ v.name }}</span>
                        <span :class="{ 'borders': index !== mune.length - 1 }" class="f-c"></span>
                    </div>
                </div>
            </div>
        </div>

		</view>

        <view class="transaction_records" v-for="(v, index) in lists.rows" :key="index"
            v-if="datas.name == '存款' || datas.name == '取款'">
            <view class="transaction_records_sbu_1 f-s">
                <view class="transaction_records_amount">¥{{ isNaN(parseFloat(v.rechargeAmt)) ? v.withdrawAmt :
                    v.rechargeAmt }}</view>
                <view v-if="datas.name == '存款'" class="transaction_records_status f-c" :class="{
                    'status_yellow': $store.state.allStatus.rechargeState[v.rechargeState] == '待确认',
                    'status_green': $store.state.allStatus.rechargeState[v.rechargeState] == '成功',
                    'status_green': $store.state.allStatus.rechargeState[v.rechargeState] == '确认成功',
                    'status_gray': $store.state.allStatus.rechargeState[v.rechargeState] == '提交',
                    'status_red': $store.state.allStatus.rechargeState[v.rechargeState] == '失败',
                    'status_red': $store.state.allStatus.rechargeState[v.rechargeState] == '确认失败'
                }">{{ $store.state.allStatus.rechargeState[v.rechargeState] }}</view>
                
                <view  v-if="datas.name == '取款'" class="transaction_records_status f-c" :class="{
                    'status_yellow': $store.state.allStatus.withdrawState[v.withdrawState] == '待确认',
                    'status_green': $store.state.allStatus.withdrawState[v.withdrawState] == '成功',
                    'status_green': $store.state.allStatus.withdrawState[v.withdrawState] == '确认成功',
                    'status_gray': $store.state.allStatus.withdrawState[v.withdrawState] == '提交',
                    'status_red': $store.state.allStatus.withdrawState[v.withdrawState] == '失败',
                    'status_red': $store.state.allStatus.withdrawState[v.withdrawState] == '确认失败'
                }">{{ $store.state.allStatus.withdrawState[v.withdrawState] }}</view>

                <view class="transaction_records_time"> <uni-dateformat :date="v.finishTime"></uni-dateformat></view>
            </view>
            <view class="transaction_records_sub_2 f-s" @click="copyFx(v.rechargeOrder ? v.rechargeOrder : v.withdrawOrder)">
               {{ $t('transaction_record_view.order_number') }} {{ v.rechargeOrder ? v.rechargeOrder : v.withdrawOrder }} 
                <image class="copy" src="../../static/transfer/copy.png" mode="widthFix"></image>
            </view>
        </view>

        <view class="transaction_records" v-for="(v, index) in lists.rows" :key="index"
            v-if="datas.name == '返水' || datas.name == '红利'">
            <view class="transaction_records_sbu_1 f-s">
                <view class="transaction_records_amount">¥{{ isNaN(parseFloat(v.dividendAmt)) ? v.rebateAmt : v.dividendAmt
                }}</view>
                <view  v-if="datas.name == '返水'" class="transaction_records_status f-c" :class="{
                        'status_gray': $store.state.allStatus.rebateState[v.rebateState] == '发放',
                    }">{{ $store.state.allStatus.rebateState[v.rebateState] }}</view>
                    <view  v-if="datas.name == '红利'" class="transaction_records_status f-c" :class="{
                        'status_gray': $store.state.allStatus.dividendState[v.dividendState] == '发放',
                    }">{{ $store.state.allStatus.dividendState[v.dividendState] }}</view>
                <view class="transaction_records_time"> <uni-dateformat :date="v.createTime"></uni-dateformat></view>
            </view>
            <view class="transaction_records_sub_2 f-s" @click="copyFx(v.orderNo ? v.orderNo : v.orderNo)">
                {{ $t('transaction_record_view.order_number') }}{{ v.orderNo }}
                <image class="copy" src="../../static/transfer/copy.png" mode="widthFix"></image>

            </view>
        </view>

        <view class="transaction_records" v-for="(v, index) in lists.rows" :key="index" v-if="datas.name == '转账'">
            <div class="titles f-c">
                {{ $store.state.games.platforms.uniqueCodes[v.inWalletCode] }}
                <img src="../../static/transfer/direction.png">
                {{ $store.state.games.platforms.uniqueCodes[v.outWalletCode] }}
            </div>
            <view class="transaction_records_sbu_1 f-s">
                <view class="transaction_records_amount">¥{{ v.transferAmount }}</view>
                <view class="transaction_records_status f-c" :class="{
                    'status_yellow': $store.state.allStatus.transferStatus[v.transferStatus] == '待确认',
                    'status_green': $store.state.allStatus.transferStatus[v.transferStatus] == '成功',
                    'status_green': $store.state.allStatus.transferStatus[v.transferStatus] == '确认成功',
                    'status_gray': $store.state.allStatus.transferStatus[v.transferStatus] == '提交',
                    'status_red': $store.state.allStatus.transferStatus[v.transferStatus] == '失败',
                    'status_red': $store.state.allStatus.transferStatus[v.transferStatus] == '确认失败'
                }">{{ $store.state.allStatus.transferStatus[v.transferStatus] }}</view>
                <view class="transaction_records_time"> <uni-dateformat :date="v.createTime"></uni-dateformat></view>
            </view>
            <view class="transaction_records_sub_2 f-s" @click="copyFx(v.orderNo ? v.orderNo : v.orderNo)">
                {{ $t('transaction_record_view.order_number') }} {{ v.orderNo }}
                <image class="copy" src="../../static/transfer/copy.png" mode="widthFix"></image>

            </view>
        </view>

        <view class="transaction_records" v-for="(v, index) in lists.rows" :key="index" v-if="datas.name == '活动申请'">
            <view class="transaction_records_sbu_1 f-s">
                <view class="transaction_records_amount">¥{{ v.applyAmount }}</view>
                <view class="transaction_records_status f-c" :class="{
                    'status_yellow': $store.state.allStatus.applyState[v.applyState] == '待确认',
                    'status_green': $store.state.allStatus.applyState[v.applyState] == '成功',
                    'status_green': $store.state.allStatus.applyState[v.applyState] == '确认成功',
                    'status_gray': $store.state.allStatus.applyState[v.applyState] == '提交',
                    'status_red': $store.state.allStatus.applyState[v.applyState] == '失败',
                    'status_red': $store.state.allStatus.applyState[v.applyState] == '确认失败'
                }">{{ $store.state.allStatus.applyState[v.rechargeState] }}</view>
                <view class="transaction_records_time"> <uni-dateformat :date="v.applyTime"></uni-dateformat></view>
            </view>
        </view>


        <view class="after_list" v-if="lists.total == 0">
            <image  src="/static/img/cry.png" class="tasiver" mode="widthFix">
            </image>
            <view class="h1 f-c">{{ $t("notifications.sorry") }}</view>
            <view class="h2 f-c">
              {{ $t("transaction_record_view.sorry_des_transfer_records_lbl") }}
            </view>
          </view>
        <loading :isshow="isshow"></loading>
        <!-- <view v-show="card" class="showtex">已展示全部数据</view> -->



    </view>
</template>

<script>
import Request from "@/common/js/request.js"
import { mapState, mapMutations, mapAction } from "vuex";
import state from '@/store/state';
import { localizationMixin } from '../../common/js/localization';
export default {
  mixins: [localizationMixin],
    props: [],
    data() {
        return {
            navtitle: "Transaction Records",
            card: null,
            isshow: 0,
            menu: false,//展开平台选择
            menuIcon: '0',//全平台选中图标
            navBorder: '0',//边框,今天，近7天的
            showNo: 999, //是否展开
            mune: [
                {
                    name: "存款",
                    type: 0,
                    id: "des",
                },
                {
                    name: "取款",
                    type: 1,
                    id: "with",
                },
                {
                    name: "转账",
                    type: 4,
                    id: "trans",
                },
                {
                    name: "返水",
                    type: 3,
                    id: "back",
                },
                {
                    name: "红利",
                    type: 2,
                    id: "red",
                },
                {
                    name: "活动申请",
                    type: 5,
                    id: "activity",
                },
            ],//菜单
            datas: {
                pageNum: 1,
                pageSize: 10,
                timeType: 0,//今天0，昨天1，近7日2，30日3
                recordType: '0', //菜单类型
                name: '存款',//当前名称
            },//要传的值
           
            lists: [
                { user: '测试' }, { user: '测试2' }
            ],
            navlist: [
                { name: '汛利体育' },
                { name: '汛利体育1' },
                { name: '汛利体育2' },
                { name: '汛利体育3' },
            ],

        }
    },
    computed: {
        ...mapState({
            json: (json) => state.json,
        }),
        json() {
            return this.$store.state.json;
        },
    },
    onLoad() {
        this.$logins();
        this.getData();
    },
    onReachBottom() {
        //滚动底部触发
        console.log('触发')
        if (this.lists.total == this.lists.rows.length) {
            return
        }
        this.datas.pageNum = this.datas.pageNum + 1;
        this.getData();
    },
    methods: {
        copyFx(val) {
            console.log(val)
            let text = val.toString();
            this.$copy(text)
        },

        //状态转换
        typeFx(n) {
            console.log('测试type')
            // this.datas.recordType  //0存款，1取款，2红利，3返水， 4=转账
            return this.$type(this.datas.recordType, n)
        },
        showFx(index) {
            console.log(index)
            this.showNo = index;
        },
        dayFx(num) {
            //2=7,,3=30天
            this.navBorder = this.datas.timeType = num;
            this.menu = false;
            this.datas.pageNum = 1;
            this.getData();
        },
        menuFx() {
            this.menu = !this.menu;
        },
        menusFx(v, index) {
            this.datas.pageNum = 1;
            this.menuIcon = index;
            this.datas.recordType = v.type;
            this.datas.name = v.name;
            this.lists = [];
            this.getData();
            this.menu = false;
        },
        // 游戏名转换
        GameNameFx(code) {
            for (let i = 0; i < this.mune.length; i++) {
                if (this.mune[i].uniqueCode == code) {
                    return this.mune[i].platformName ? this.mune[i].platformName : '游戏名获取不到'
                }
            }
        },
        //获取所有平台
        getQn() {
            let mune = [];
            let getlevelRebates_gameType = this.$store.state.appIndex;
            getlevelRebates_gameType.forEach((element) => {
                console.log(element);
                element.platforms.forEach((el) => {
                    mune.push(el);
                });
            });
            this.mune = mune;
            console.log(mune);
        },
        //获取list数据
        getData() {
            let url = this.$globalApi.userRecordgetRecord;
            this.isshow = 1;
            Request.postRequest(url, this.datas).then((res) => {
                this.isshow = 0;
                this.$logins(res);
                this.card = res.data.data.total;
                console.log(res.data.data, "sadlhasldjshadlksjadhlkjh");
                if (this.datas.pageNum != 1) {
                    if (res.data.data.rows && res.data.data.rows != '') {
                        this.lists.rows = this.lists.rows.concat(res.data.data.rows);
                    }
                    else {

                        uni.showToast({
                            title: '无更多数据',
                            icon: "none",
                        });
                    }
                } else {
                    this.lists = res.data.data;
                    uni.showToast({
                        title: state.codes[res.data.code],
                        icon: "none",
                    });
                }
            });
        },



    },


}
</script>
<style lang="scss">
* {
    text-decoration: none;
    font-family: "Microsoft YaHei";
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.fixed_top {
	background: #ffffff !important;
	width: 100%;
	z-index: 2000;
	position: fixed;
  }
.navbar_transaction {
    margin: 0 auto;
    margin-top: -300rpx;
    background: #fff;
    padding-top: 40rpx;

    .menu_transaction {
        margin: 0 auto;
        width: 260rpx;
        height: 58rpx;
        border-radius: 98rpx;
        background: linear-gradient(132deg, #ED3A3C 0%, #D92264 52.08%, #CA197C 100%);

        image {
            width: 32.10rpx;
        }

        text {
            margin-left: 14.10rpx;
            color: #FFF;
            text-align: center;
            font-family: Microsoft YaHei UI;
            font-size: 28rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.10rpx;
        }
    }

    .days_transaction {
        margin: 0 auto;
        margin-top: 38rpx;
        background: #B53D1E;
        width: 612rpx;
        height: 66rpx;
        border-radius: 108rpx;
        box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(0, 0, 0, 0.63) inset;

        .todays {
            width: 196rpx;
            height: 54rpx;
            color: #FFF;
            text-align: center;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.10rpx;
        }

        .todays.on {
            width: 196rpx;
            height: 57rpx;
            border-radius: 108rpx;
            background: #FFF;
            color: #B53D1E;
            text-align: center;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.10rpx;
        }

    }
}

.transaction_records {
    margin: 54rpx 34.10rpx 0 34.10rpx;
    padding: 0rpx 34.10rpx 0 34.10rpx;
    border-bottom: 2rpx solid #7E97B7;

    .titles {
        color: #304258;
        text-align: center;
        font-family: Inter;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-bottom: 30rpx;
    }

    .titles img {
        width: 80rpx;
        height: 48.398rpx;
        margin: 0 20rpx;
    }

    .transaction_records_sbu_1 {
        .transaction_records_amount {
            color: #EB3741;
            font-family: Inter;
            font-size: 36rpx;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 186rpx;
        }

        .transaction_records_status {
            width: 126rpx;
            height: 42rpx;
            border-radius: 6rpx;
            background: #D9D9D9;
            color: #304258;
            text-align: center;
            font-family: Inter;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .transaction_records_time {
            color: #304258;
            text-align: right;
            font-family: Inter;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }

    .transaction_records_sub_2 {
        margin-top: 14rpx;
        margin-bottom: 22rpx;
        color: #304258;
        font-family: Inter;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        image{
            width: 40rpx;
            height: 32rpx;
        }
    }

}

.header-fixed {
    height: 256rpx;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
}

.bg {
    background-color: #ffffff;
    overflow: hidden;
    min-height: 100vh;
    padding-top: 256rpx;
    padding-bottom: 100rpx;
}

.bet-bot {
    box-shadow: 2rpx 4rpx 10rpx rgba(193, 219, 255, 0.8);
    border-bottom-left-radius: 42rpx;
    border-bottom-right-radius: 42rpx;
    width: 100%;
}

.heads {
    background: #fff;
    background-size: 100%;
    color: #404261;
    position: relative;
    overflow: hidden;
}

.iconLeft {
    position: absolute;
    left: 0;
    top: 0;
    height: 100rpx;
    display: flex;
    align-items: center;
    padding: 10rpx;
    padding-left: 30rpx;
}

.heads-title {
    height: 100rpx;
    text-align: center;
    font-size: 40rpx;
    margin-bottom: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: normal;
}

.iconLeft .icon {
    width: 36rpx;
}

.heads-nav {
    font-size: 28rpx;
    display: flex;
    height: 72rpx;
    justify-content: center;
    align-items: center;
    line-height: 72rpx;
}

.sbor {
    border-radius: 50px;
    width: 4rpx;
    height: 40rpx;
    background-color: #dbdcde;
    margin: 0 18rpx;
}

.bet-menu {
    width: 228rpx;
    height: 100%;
    border-radius: 32rpx;
    background-color: #f7f9fe;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.bet-menu img {
    width: 50rpx;
    height: 50rpx;
    // margin-right:34rpx;
}

.bet-menu .texts {
    min-width: 120rpx;
    text-align: center;
    margin-left: 10rpx;
}

.dayMain {
    display: flex;
    font-size: 28rpx;
    justify-content: space-around;
    height: 100%;
}

.bet-day {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 22rpx;
    border: solid 2rpx #ebeefd;
    min-width: 134rpx;
    height: 100%;
    margin-right: 10rpx;
}

.bet-day.on {
    border: 2rpx solid #f86c3b;
    position: relative;
}

.bet-day .img {
    display: none;
}

.bet-day.on .img {
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 44rpx;
    height: 44rpx;
}

.showClass {
    margin-top: 30rpx;
}

.bet-menus-bg {
    position: fixed;
    top: 184rpx;
    z-index: 1001;
    width: 100%;
    background: #fff;
    opacity: 0.9;
    height: 100%;

    .bet-menus {
        background: linear-gradient(358deg, #D9D9D9 0%, rgba(217, 217, 217, 0.00) 100%);
        width: 256rpx;
        border-radius: 0rpx 0rpx 18rpx 18rpx;
        margin: 0 auto;
        margin-top: -50rpx;
    
        .mains {
            padding-top: 50rpx;
        
            .name {
                min-width: 222rpx;
                height: 70rpx;
                color: #304258;
                text-align: center;
                font-family: Microsoft YaHei UI;
                font-size: 24rpx;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                border-bottom: 2rpx solid linear-gradient(270deg, #FFF 0%, #DB2B0F 52.60%, #FFF 100%);
            }
        
            .borders {
                width: 108px;
                height: 2rpx;
                background: linear-gradient(270deg, #FFF 0%, #DB2B0F 52.60%, #FFF 100%);
                margin: 0 auto;
            }
        
        }
    }
}

.copy {
    width: 30rpx;
    height: 30rpx;
}

.status_yellow {
    background: #F90 !important;
}

.status_green {
    background: #25AB32 !important;
}

.status_gray {
    background: #D9D9D9 !important;
}

.status_red {
    background: #B53D1E !important;
    color: #fff !important;
}
</style>
