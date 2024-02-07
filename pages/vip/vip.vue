<template>
  <view class="vip set-bg">
    <loading :isshow="isshow" ></loading>
    <view id="navbar">
      <view class="fixed">
        <view class="image" @click="goback">
          <image src="../../static/zhnavbar/leftjt.png" mode="widthFix"></image>
        </view>
        <view class="title">{{ $t("vip_page.vip_page_title") }}</view>
      </view>
    </view>

    <view style="background: #f1f1f1; padding-top: 10rpx">
      <view class="navlist">
        <view v-if="nowindex == 1" class="active f-c">{{
          $t("vip_page.vip_previlage")
        }}</view>
        <view
          class="f-c"
          v-if="nowindex != 1"
          @click="navselet"
          data-navid="1"
          >{{ $t("vip_page.vip_previlage") }}</view
        >
        <view v-if="nowindex == 2" class="active f-c">{{
          $t("vip_page.vip_details")
        }}</view>
        <view
          class="f-c"
          v-if="nowindex != 2"
          @click="navselet"
          data-navid="2"
          >{{ $t("vip_page.vip_details") }}</view
        >
      </view>
    </view>

    <view class="page_no_1" v-show="nowindex == 1" v-if="levelInfo">
      <view class="profile_view">
        <view class="profile_user_info">
          <image
            class="profile_image"
            :src="baseInfoicon"
            mode="widthFix"
          ></image>
          <view class="name_and_vip f-c">
            <view class="user_name">{{ baseInfoName }}</view>
            <view class="user_vip f-c">VIP{{ vipDj }}</view>
          </view>
          <image
            class="crown_image"
            :src="'../../static/vips/L' + vipDj + '.png'"
            mode="widthFix"
          ></image>
        </view>

        <view class="djjindu" v-show="vipDj != 10">
          <view class="dengji f-c" :style="vipcurrent[vipDj]">
            <span
              style="letter-spacing: -0.1rpx"
              :style="{ color: vipDj != 0 ? 'white' : 'inherit' }"
            >
              VIP {{ vipDj }}</span
            >
          </view>
          <view class="jindu">
            <view class="jindut f-s">
              <image
                src="../../static/vips/bar.png"
                mode=""
                :style="'width:' + jindu + '%'"
              ></image>
            </view>
            <view class="txt-number" :style="'left:' + (jindu - 5) + '%'" >
              {{ jindu }}%
            </view>
          </view>
          <view class="dengji f-c" :style="vipcurrent[vipDj + 1]">
            <span :style="{ color: vipDj + 1 != 0 ? 'white' : 'inherit' }">
              VIP {{ vipDj + 1 }}
            </span>
          </view>
        </view>

        <view class="current_amount_status">
          <view class="current_deposit_and_turnover f-c">
            <view class="text_01">{{ $t("vip_page.current_deposit") }}</view>
            <view class="text_02">
              <span>{{ level.totalRechargeAmount }}</span>
              ({{ level.totalRechargeAmount }}/{{
                level.upgradeRechargeAmount
              }})
            </view>
          </view>
          <view class="current_deposit_and_turnover f-c">
            <view class="text_01">{{ $t("vip_page.current_turnover") }}</view>
            <view class="text_02"
              ><span>{{ level.totalValidAmount }}</span
              >({{ level.totalValidAmount }}/{{
                level.upgradeValidAmount
              }})</view
            >
          </view>
        </view>

        <view class="luobo">
          <view class="uni-margin-wrap">
            <swiper
              class="swiper"
              next-margin="50px"
              circular
              :indicator-dots="false"
              :autoplay="false"
              :interval="3000"
              :duration="1000"
              :current="vipDj"
              @change="vipSChan"
            >
              <swiper-item 
                v-for="(ite, index) in levelInfo.levelRecords"
                :key="index"
                v-if="index != 0"
              >
                <view class="swiper-item" :style="vipGradients[index-1]" >
                  <view class="dengji">
                    <image
                      :src="'../../static/vips/L' + [index-1] + '.png'"
                      mode=""
                    ></image>
                  </view>
                  <view   class="viptxt" :style="colors[index-1]">
                    VIP{{ Number(index)-1 }}
                  </view>
                  <view
                
                    class="tshi"
                    :style="colors[index - 1]"
                    v-html="
                      $en($store.state.ens.vip_page.privilage_Cell_Lbl)
                        .replace('{upgradeRecharge}', ite.upgradeRecharge)
                        .replace('{upgradeValid}', ite.upgradeValid)
                        .replace('{indexPath}', index)
                    "
                  >
                  </view>
                  <view class="tip">
                    <view
                      >{{ $t("vip_page.reminder_deadline")
                      }}<text>2022-10-02 15:42</text></view
                    >
                    <view
                      v-html="
                        $t('vip_page.total_deposit_turnover')
                          .replace('{rechagreAmt}', level.totalRechargeAmount)
                          .replace('{validAmt}', level.totalValidAmount)
                      "
                    >
                    </view>
                  </view>
                </view>
              </swiper-item>
              <swiper-item>
                <view class="swiper-item" :style="vipGradients[10]" >
                  <view class="dengji10">
                    <image
                      :src="'../../static/vips/L' + [10] + '.png'"
                      mode="widthFix"
                    ></image>
                  </view>
                  <!-- this is just for set color of text :style="colors[4]" -->
                  <view   class="viptxt" :style="colors[4]">
                    VIP{{ Number(10) }}
                  </view>
                  <view
                    style="height: 92rpx;"
                    :style="colors[10]"
                  >
                  </view>
                  <view class="tip">
                    <view
                      >{{ $t("vip_page.reminder_deadline")
                      }}<text>2022-10-02 15:42</text></view
                    >
                    <view
                      v-html="
                        $t('vip_page.total_deposit_turnover')
                          .replace('{rechagreAmt}', level.totalRechargeAmount)
                          .replace('{validAmt}', level.totalValidAmount)
                      "
                    >
                    </view>
                  </view>
                </view>
              </swiper-item>

            </swiper>
          </view>
        </view>
      </view>
      <view class="vip_exclusive"  >
        <view class="exclusive_title">
          <view class="border_title"></view>
          <view class="title_ex">{{ $t("vip_page.vip_exclusive") }}</view>
        </view>
        <view class="exclusive_flex f-s" >
          <view class="exclusive_flex_1 f-s">
            <image
              class="exclusive_image_icon"
              src="../../static/vips/wp.png"
              mode="widthFix"
            ></image>
            <view class="exclusive_text">
              <view class="e_2">{{ $t("vip_page.withdrawl_perday") }}</view>
              <view class="e_1">{{
                levelInfo.levelPermissions[vipDj].dayWithdrawNum
              }}</view>
            </view>
          </view>
          <view class="exclusive_flex_1 f-s">
            <image
              class="exclusive_image_icon"
              src="../../static/vips/ubp.png"
              mode="widthFix"
            ></image>
            <view class="exclusive_text">
              <view class="e_2">{{ $t("vip_page.upgrade_bonus_perday") }}</view>
              <view class="e_1">{{
                levelInfo.levelPermissions[vipDj].dayWithdrawAmt
              }}</view>
            </view>
          </view>
        </view>
        <view class="exclusive_flex f-s" style="margin-top: 46rpx">
          <view class="exclusive_flex_1 f-s">
            <image
              class="exclusive_image_icon"
              src="../../static/vips/dwl.png"
              mode="widthFix"
            ></image>
            <view class="exclusive_text">
              <view class="e_2">{{
                $t("vip_page.daily_withdrawl_limit")
              }}</view>
              <view class="e_1">{{
                levelInfo.levelPermissions[vipDj].upBonus
              }}</view>
             
            </view>
          </view>

          <view class="exclusive_flex_1 f-s">
            <image
              class="exclusive_image_icon"
              src="../../static/vips/bg.png"
              mode="widthFix"
            ></image>
            <view class="exclusive_text">
              <view class="e_2">{{ $t("vip_page.red_envelops") }}</view>
              <view class="e_1">{{
                levelInfo.levelPermissions[vipDj].birthdayAmt
              }}</view>
            </view>
          </view>
        </view>
        <view class="exclusive_flex f-s" style="margin-top: 46rpx">
          <view class="exclusive_flex_1 f-s">
            <image
              class="exclusive_image_icon"
              src="../../static/vips/wdom.png"
              mode="widthFix"
            ></image>
            <view class="exclusive_text">
              <view class="e_2">{{ $t("vip_page.birthday_gift") }}</view>

              <view class="e_1">{{
                levelInfo.levelPermissions[vipDj].moonFreeAmt
              }}</view>
            </view>
          </view>

          <view class="exclusive_flex_1 f-s">
            <view class="bar"></view>
          </view>
        </view>
      </view>
      <view class="vip_details">
        <view class="exclusive_title">
          <view class="border_title"></view>
          <view class="title_ex">{{ $t("vip_page.vip_rebate_ratio") }}</view>
        </view>
        <view class="selectlist">
          <view
            class="contents"
            v-for="(ite, index) in levelInfo.levelRebates[vipDj]
              .platformRebates"
            :key="index"
            :style="{ backgroundColor: getBackgroundColor(index) }"
          >
            <image
              :src="
                $store.state.iconUrl +
                $store.state.static.gameIcon[ite.uniqueCode]
              " 
              mode="widthFix"
            ></image>
            <view class="G_Name" :style="{ color: getFontColor(index) }"
              ><span> {{ ite.platformName }} </span>
            </view>
            <view class="amount" :style="{ color: getFontColor(index) }">{{
              prenum(ite.rebateRatio)
            }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="page_no_2" v-show="nowindex == 2" v-if="levelInfo">
      <view class="supreme_vip f-s">
        <view class="class_display_text">
          <view class="flex_vip f-c">
            <view class="supreme">{{ $t("vip_page.supreme") }}</view>
            <view class="vipp">{{ $t("vip_page.vip_page_title") }}</view>
          </view>
          <view class="vip_details_text_1 f-c">{{
            $t("vip_page.peak_ceremony")
          }}</view>
          <view class="vip_details_text_2 f-c">{{
            $t("vip_page.supreme_service")
          }}</view>
        </view>
        <image
          src="../../static/vips/sword.png"
          mode="widthFix"
          class="class_display_image"
        ></image>
      </view>
    </view>

    <view style="" class="pagetwo" v-show="nowindex == 2" v-if="levelInfo">
      <view class="djlist">
        <!-- <view
          :style="vipGradients[0]"
          :class="vipSIndex1 == 0 ? 'active' : ''"
          @click="setindex(0)"
        >
          vip 0
        </view> -->
        <view
          :style="vipGradients[0]"
          :class="vipSIndex1 == 1 ? 'active' : ''"
          @click="setindex(1)"
        >
          vip 1
        </view>
        <view
          :style="vipGradients[1]"
          :class="vipSIndex1 == 2 ? 'active' : ''"
          @click="setindex(2)"
        >
          vip 2
        </view>
        <view
          :style="vipGradients[2]"
          :class="vipSIndex1 == 3 ? 'active' : ''"
          @click="setindex(3)"
        >
          vip 3
        </view>
        <view
          :style="vipGradients[3]"
          :class="vipSIndex1 == 4 ? 'active' : ''"
          @click="setindex(4)"
        >
          vip 4
        </view>
        <view
          :style="vipGradients[4]"
          :class="vipSIndex1 == 5 ? 'active' : ''"
          @click="setindex(5)"
        >
          vip 5
        </view>
        <view
          :style="vipGradients[5]"
          :class="vipSIndex1 == 6 ? 'active' : ''"
          @click="setindex(6)"
        >
          vip 6
        </view>
        <view
          :style="vipGradients[6]"
          :class="vipSIndex1 == 7 ? 'active' : ''"
          @click="setindex(7)"
        >
          vip 7
        </view>
        <view
          :style="vipGradients[7]"
          :class="vipSIndex1 == 8 ? 'active' : ''"
          @click="setindex(8)"
        >
          vip 8
        </view>
        <view
          :style="vipGradients[8]"
          :class="vipSIndex1 == 9 ? 'active' : ''"
          @click="setindex(9)"
        >
          vip 9
        </view>
        <view
          :style="vipGradients[9]"
          :class="vipSIndex1 == 10 ? 'active' : ''"
          @click="setindex(10)"
        >
          vip 10
        </view>
      </view>
      <view class="luobo">
        <swiper :interval="3000" :duration="1000" :current="vipSIndex1">
          <swiper-item
            v-for="(ite, index) in levelInfo.levelRecords"
            :key="index"
          >
            <view class="swiper-item">
              <view class="vip_title_and_level f-s">
                <view class="vip_titl">VIP {{ index }}</view>
                <image
                  :src="'../../static/vips/L' + `${index}` + '.png'"
                  mode="widthFix"
                  class="leve"
                ></image>
              </view>
              <view style="margin-top: -26rpx">
                <view class="content_flex">
                  <image
                    src="../../static/vips/dollar.png"
                    mode="widthFix"
                    class="iconss"
                  ></image>
                  <view class="slider_text_1">{{
                    $t("vip_page.cumulative_deposit")
                  }}</view>
                  <view class="slider_text_2">{{ ite.upgradeRecharge }}</view>
                </view>
                <view class="content_flex">
                  <image
                    src="../../static/vips/console.png"
                    mode="widthFix"
                    class="iconss"
                  ></image>
                  <view class="slider_text_1">{{
                    $t("vip_page.turnover_requirements")
                  }}</view>
                  <view class="slider_text_2">{{ ite.upgradeValid }}</view>
                </view>
                <view class="content_flex">
                  <image
                    src="../../static/vips/crown_1.png"
                    mode="widthFix"
                    class="iconss"
                  ></image>
                  <view class="slider_text_1">{{
                    $t("vip_page.relegation_flow")
                  }}</view>
                  <view class="slider_text_2">{{ ite.relegationValid }}</view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>

        <view class="twolist">
          <view>
            <view class="txt"
              >{{ $t("vip_page.upgrade_hours")
              }}<text>{{
                levelInfo.levelPermissions[vipSIndex1].upBonus
              }}</text></view
            >
            <view class="tip">{{ $t("vip_page.upgrade_manually") }}</view>
          </view>
          <view>
            <view class="txt"
              >{{ $t("vip_page.weekly_hours") }}
              <text>
                {{ levelInfo.levelPermissions[vipSIndex1].moonFreeAmt }}
              </text>
            </view>
            <view class="tip">{{ $t("vip_page.issued_on_monday") }}</view>
          </view>
        </view>

        <view class="shengri">
          <image src="../../static/vips/star1.png" class="image_v_1"></image>
          <image src="../../static/vips/star2.png" class="image_v_2"></image>
          <image src="../../static/vips/star3.png" class="image_v_3"></image>
          <image src="../../static/vips/star4.png" class="image_v_4"></image>
          <image src="../../static/vips/star5.png" class="image_v_5"></image>

          <view class="txt">
            {{ $t("vip_page.birthday_gift") }}
            <text>{{
              levelInfo.levelPermissions[vipSIndex1].birthdayAmt
            }}</text></view
          >
        </view>
      </view>
      <view class="vipdetail">
        <view class="title">
          {{ levelInfo.levelDiscounts.discountData[vipSIndex1].discountName }}
        </view>
        <view class="list">
          <view class="one">
            <view class="num">
              {{
                levelInfo.levelDiscounts.discountData[vipSIndex1].minApplyAmount
              }}
            </view>
            <view class="txt">{{ $t("vip_page.minimum_transfer") }}</view>
          </view>
          <view class="one">
            <view class="num">
              {{
                parseInt(
                  levelInfo.levelDiscounts.discountData[vipSIndex1].bonusRatio *
                    100
                )
              }}%
            </view>
            <view class="txt"> {{ $t("vip_page.bonus_ratio") }}</view>
          </view>
          <view class="one">
            <view class="num">{{
              levelInfo.levelDiscounts.discountData[vipSIndex1].maxBonusAmount
            }}</view>
            <view class="txt"> {{ $t("vip_page.highest_reward") }}</view>
          </view>
          <view class="one">
            <view class="num">
              {{ levelInfo.levelDiscounts.discountData[vipSIndex1].validMulti
              }}
            </view>
            <view class="txt">{{ $t("vip_page.turnover_multiple") }}</view>
          </view>
          <view class="one">
            <view class="num">
              {{
                $store.state.allStatus.applyLimit[
                  levelInfo.levelDiscounts.discountData[vipSIndex1].applyLimit
                ]
              }}
            </view>
            <view class="txt">{{ $t("vip_page.time_limit") }}</view>
          </view>
          <view class="one">
            <view class="num">{{
              levelRebates_gameType[gameindex].platformName
            }}</view>
            <view class="txt">{{ $t("vip_page.game_Venue") }}</view>
          </view>
        </view>
        <view class="selectlist">
          <view>
            <view class="txtselect">
              <view class="text-title">{{ $t("vip_page.choose_venue") }}</view>
              <picker
                :value="gameindex"
                range-key="platformName"
                :range="levelRebates_gameType"
                @change="legi"
              >
                <view class="txet-size" style="padding: 0 18rpx">
                  {{ levelRebates_gameType[gameindex].platformName }}
                  <image
                    src="../../static/vips/arrow.png"
                    mode="widthFix"
                  ></image>
                </view>
              </picker>
            </view>
            <view class="txtselect" style="margin-top: 18rpx">
              <view class="text-title">{{ $t("vip_page.amount") }}</view>
              <input
                type="number"
                class="money-bor"
                :placeholder="$t('vip_page.enter_amount')"
                @blur="okform2data"
                maxlength="11"
                data-type="montyA"
                v-model="montyA"
              />
            </view>
            <div class="f-c money-bor-text" v-show="montyA > 0">
              申请此活动需完成
              <span style="color: #003B3D;padding: 0 6rpx; ">
                {{
                  parseInt(
                    Number(montyA) *
                      (Number(
                        levelInfo.levelDiscounts.discountData[vipSIndex1]
                          .bonusRatio
                      ) +
                        1) *
                      Number(
                        levelInfo.levelDiscounts.discountData[vipSIndex1]
                          .validMulti
                      )
                  )
                }}
              </span>
              流水
            </div>
          </view>

          <view class="btncs f-c" v-if="vipSIndex1 == vipDj" @click="sqhd">
            {{ $t("vip_page.activity_btn") }}
          </view>
          <view class="btncs1 f-c" v-else @click="sqhd">
            {{ $t("vip_page.activity_btn") }}</view
          >
        </view>
      </view>

      <view class="vip_rebate_and_withdraw">
        <view class="navlists f-c">
          <view
            class="vip_rebate"
            @click="vipnavselet(1)"
            :class="vipnav == 1 ? 'active' : ''"
            >{{ $t("vip_page.vip_rebate_ratio") }}</view
          >
          <view
            class="vip_withdraw"
            @click="vipnavselet(2)"
            :class="vipnav == 2 ? 'active' : ''"
            >{{ $t("vip_page.vip_withdrawal_limit") }}
          </view>
        </view>
        <view class="titll f-c">
          <image src="../../static/vips/crown.png" mode="widthFix"></image>
       
          <span v-if="vipnav == 1">{{ $t("vip_page.vip_rebate_ratio") }}</span>
          <span v-if="vipnav == 2">{{
            $t("vip_page.vip_withdrawal_limit")
          }}</span>
        </view>

        <scroll-view
          v-if="vipnav == 1"
          scroll-x="true"
          class="table"
          style="100%; overflow: hidden; white-space: nowrap;"
        >
          <view class="scroll-view_H">
            <table @change="change" class="borderless-table">
              <tr class="th">
                <th class="ys">VIP等级</th>
                <th
                  class="ys1"
                  v-for="(itle, index) in levelInfo.levelRebates[vipSIndex1]
                    .platformRebates"
                  :key="index"
                  :style="{
                    'background-color': index % 2 === 0 ? '#DEDEDE' : '#C1C1C1',
                  }"
                >
                  {{ itle.platformName }}
                </th>
              </tr>

              <tr
                class="td"
                v-for="(itle, index) in levelInfo.levelRebates"
                :key="index"
              >
                <td class="ys">VIP{{ index }}</td>
                <td
                  class="ys1"
                  v-for="(itl1, inde1) in itle.platformRebates"
                  :key="inde1"
                  :style="{
                    'background-color': inde1 % 2 === 0 ? '#DEDEDE' : '#C1C1C1',
                  }"
                >
                  {{ prenum(itl1.rebateRatio) }}
                </td>
              </tr>
            </table>
          </view>
        </scroll-view>

        <scroll-view
          v-if="vipnav == 2"
          scroll-x="true"
          @scroll="scroll"
          class="table"
          style=" 100%;overflow: hidden;white-space: nowrap;"
        >
          <view class="" style="width: 100%">
            <table @change="change" style="width: 100%; border-collapse: collapse;">
              <tr class="th">
                <th class="yss" style="height: 126rpx; line-height: 110rpx">
                  {{ $t("vip_page.vip_level") }}
                </th>
                <th
                  class="yss1"
                  style="
                    height: 126rpx;
                    background: #dedede;
                    line-height: 110rpx;
                  "
                >
                  {{ $t("vip_page.vip_no_withdrawals") }}
                </th>
                <th
                  class="yss1"
                  style="
                    height: 126rpx;
                    background: #c1c1c1;
                    line-height: 110rpx;
                  "
                >
                  {{ $t("vip_page.vip_withdrawal_limit") }}
                </th>
              </tr>
              <tr
                class="td"
                v-for="(itle, index) in levelInfo.levelPermissions"
                :key="index"
              >
                <td class="xyy" style="">VIP{{ index }}</td>
                <td class="xxy" style="">{{ itle.dayWithdrawNum }}</td>
                <td class="xxxy" style="">{{ itle.dayWithdrawAmt }}</td>
              </tr>
            </table>
          </view>
        </scroll-view>
      </view>

      <view class="guize">
        <view class="title">{{ $t("vip_page.activity_rules") }}</view>
        <view class="tip">
          <view class="one">
            <view class="littitle">
              <view class="f-c">1</view>
              <view>{{ $t("vip_page.rule_title1") }}</view>
            </view>
            <view class="miaosu">
              {{ $t("vip_page.rule_desc1") }}
            </view>
          </view>
          <view class="one">
            <view class="littitle">
              <view class="f-c">2</view>
              <view>{{ $t("vip_page.rule_title2") }}</view>
            </view>
            <view class="miaosu">{{ $t("vip_page.rule_desc2") }}</view>
          </view>
          <view class="one">
            <view class="littitle">
              <view class="f-c">3</view>
              <view>{{ $t("vip_page.rule_title3") }}</view>
            </view>
            <view class="miaosu">{{ $t("vip_page.rule_desc3") }}</view>
          </view>
          <view class="one">
            <view class="littitle">
              <view class="f-c">4</view>
              <view>{{ $t("vip_page.rule_title4") }}</view>
            </view>
            <view class="miaosu">{{ $t("vip_page.rule_desc4") }}</view>
          </view>
          <view class="one">
            <view class="littitle">
              <view class="f-c">5</view>
              <view>{{ $t("vip_page.rule_title5") }}</view>
            </view>
            <view class="miaosu">{{ $t("vip_page.rule_desc5") }}</view>
          </view>
          <view class="one">
            <view class="littitle">
              <view class="f-c">6</view>
              <view>{{ $t("vip_page.rule_title6") }}</view>
            </view>
            <view class="miaosu">{{ $t("vip_page.rule_desc6") }}</view>
          </view>
          <view class="one">
            <view class="littitle">
              <view class="f-c">7</view>
              <view>{{ $t("vip_page.rule_title7") }}</view>
            </view>
            <view class="miaosu">{{ $t("vip_page.rule_desc7") }}</view>
          </view>
          <view class="one">
            <view class="littitle">
              <view class="f-c">8</view>
              <view>{{ $t("vip_page.rule_title8") }}</view>
            </view>
            <view class="miaosu">
              {{ $t("vip_page.rule_desc8") }}
            </view>
          </view>
        </view>
      </view>
      <view class="one_text">
        <view class="alltext_1 f-c" style="margin-bottom: 32rpx">
          {{ $t("vip_page.stop_event") }}
        </view>
        <view class="alltext_1 f-c">{{ $t("vip_page.remarks") }} </view>
      </view>
    </view>
    <publicNav :active="4"></publicNav>
    <loading :isshow="isshow"></loading>
  </view>
</template>

<script>
import state from "@/store/state";

import { localizationMixin } from "../../common/js/localization";
export default {
  mixins: [localizationMixin],
  data() {
    return {
      vipGradients: {
        0: "background-color: #C8C8C8;",
        1: "background-color: #D4C155;",
        2: "background-color: #FFAC2D;",
        3: "background-color: #C9C9C9;",
        4: "color: #ffffff; background-color: #B86939;",
        5: "color: #ffffff; background-color: #957500;",
        6: "color: #ffffff; background: linear-gradient(89deg, #A8002E 0.22%, #FFF 141.03%);",
        7: "color: #ffffff; background: linear-gradient(90deg, #7188A1 1.31%, #FFF 135.24%);",
        8: "color: #ffffff; background: linear-gradient(89deg, #BB6F3B -0.48%, #FFF 168.69%);",
        9: "color: #ffffff; background: linear-gradient(102deg, #D72BA9 4.45%, #6777D5 56.92%, #82F4F5 102.25%);",
       10: "color: #ffffff; background: linear-gradient(102deg, #D72BA9 4.45%, #6777D5 56.92%, #82F4F5 102.25%);",
      },
      vipcurrent: {
        0: "background-color: #E2E2E2;",
        1: "background-color: #D4AD00;",
        2: "background-color: #FF9A00;",
        3: "background-color: #5B778C;",
        4: "background-color: #B86939;",
        5: "background-color: #957500;",
        6: "background-color: #A8002E;",
        7: "background-color: #3B4D66;",
        8: "background-color: #D26F0B;",
        9: "background-color: #D030AC;",
      },
      colors: {
        0: "color: #003B3D",
        1: "color: #003B3D",
        2: "color: #003B3D",
        3: "color: #003B3D",
        4: "color: #ffffff",
        5: "color: #ffffff",
        6: "color: #ffffff",
        7: "color: #ffffff",
        8: "color: #ffffff",
        9: "color: #ffffff",
      },
      navtitle: "VIP",
      lefticon: true,
      isshow: 0,
      nowindex: 1,
      index: 0,
      vipnav: 1,
      JsonList: [],
      levelInfo: [],
      baseInfoicon: "",
      baseInfoName: "",
      vipDj: 1,
      vipSIndex: 0, //当前等级， this-vip
      vipSIndex1: 1, //vip等级选择 ，vip-toggle
      level: {},
      idata: {}, //个人资料，身份证状态
      gameindex: 0,
      levelRebates_gameType: [],
      montyA: "",
      moneyText: false,
      baifen: 0,
      jindu: 0,
      currentLevelinfo:1,
    };
  },
  props: ["url"],
  components: {
    thRowBackgroundColor() {
      return this.vipnav === 1 ? "#DEDEDE" : "";
    },
  },
  onLoad(option) {
    if (option.id == 1) {
      this.nowindex = 2;
    }
    if (this.$logins()) {
      this.getVip();
    }
  },
  onShow() {},
  computed: {},
  methods: {
    enFx2(a, b) {
      let vals = this.$store.state.ens[a][b];
      console.log("test", "------", this.$store.state.ens[a][b]);
      return vals.replace(/\n/g, "<br>");
    },
    tdRowBackgroundColor(index) {
      return this.vipnav === 1
        ? index % 2 === 0
          ? "#C1C1C1"
          : "#someOtherColor"
        : ""; // Change colors as needed
    },
    getBackgroundColor(index) {
      if (index % 2 === 0) {
        return "#647182";
      } else {
        return "#C8C8C8";
      }
    },

    getFontColor(index) {
      if (index % 2 === 0) {
        return "#FFFFFF";
      } else {
        return "#647182";
      }
    },

    sqhd() {
      // this.vipSIndex1
      if (this.montyA.trim() === "") {
        uni.showToast({
          title: this.$t("errors.no_money"),
          icon: "none",
        });
        return;
      }

      if (this.vipSIndex1 > 0) {
        console.log(this.levelInfo, "------显示leveInfo");
        let data = {
          activityId: this.levelInfo.levelDiscounts.activityId,
          applyAmount: this.montyA,
          uniqueCode: this.levelRebates_gameType[this.gameindex].uniqueCode,
          activityAwardId:
            this.levelInfo.levelDiscounts.discountData[this.vipSIndex1]
              .activityAwardId,
        };
        let url2 = this.$globalApi.activityApplyapplyActivity;
        this.$res.postRequest(url2, data).then((res) => {
          uni.showToast({
            title: state.codes[res.data.code],
            icon: "none",
          });
        });
      } else {
        uni.showToast({
          title: "您当前等级不能参加活动",
          icon: "none",
        });
      }
    },

    legi(e) {
      // console.log(e.detail.value);
      this.gameindex = e.detail.value;
      let data = state.appIndex;
      console.log(
        this.levelRebates_gameType[this.gameindex].platformType,
        "查看gameindex"
      );
    },
    okform2data(e) {
      let _this = this;
      _this.montyA = e.detail.value;
    },
    getVip() {
      this.isshow = 1;
      let JsonList = (this.JsonList = state.jsons);
      // return
      this.getVipList(
        state.jsons.levelInfoVersionNo,
        state.jsonUrl  + JsonList.levelInfo
      );

      this.getVipDj();
      let oldstaticResources = state.static;
      let icon = state.user.userIcon;
      this.baseInfoName = state.user.username;
      this.baseInfoicon = state.iconUrl + oldstaticResources.headIcon[icon];
    },
    async getVipList(ver, jsonurl) {
      let that = this;
      that.levelInfo = state.levelInfo;
      if (!that.levelInfo || that.levelInfo.levelInfoVersionNo != ver) {
        await that.$res.getRequest(that.$time(jsonurl)).then((res) => {
          let levelInfo = res.data.datas;
          levelInfo.levelInfoVersionNo = ver;
          that.levelInfo = state.levelInfo = levelInfo;
          //登录之后需要存储起来
          that.getlevelRebates_gameType(levelInfo);
          uni.setStorageSync("levelInfo", levelInfo);
          setTimeout((res) => {
            this.isshow = 0;
          }, 500);
          return;
        });
      } else {
        setTimeout((res) => {
          this.isshow = 0;
        }, 800);
      }
      that.getlevelRebates_gameType(that.levelInfo);
    },
    getlevelRebates_gameType(vip) {
      //5-24 new edit
      let levelRebates_gameTypeLis1 = [];
      // game-type-total
      let game =
        vip.levelDiscounts.discountData[this.vipSIndex1].platformRequire;
      game = game.split(",");
      let getlevelRebates_gameType = state.appIndex;

      getlevelRebates_gameType.forEach((element) => {
        console.log(element);
        game.some((v) => {
          if (v == element.gameType) {
            element.platforms.forEach((el) => {
              levelRebates_gameTypeLis1.push(el);
            });
            return true;
          }
        });
      });
      this.levelRebates_gameType = levelRebates_gameTypeLis1;

      // console.log(this.levelRebates_gameType,"asdsadasdasdA");
    },
    getVipDj() {
      let url = this.$globalApi.userInfogetLevelInfo;
      this.$res.postRequest(url).then((res) => {
        console.log(res.data.data, "获取vip等级 - grade");
        this.currentLevelinfo = res.data.data.levelInfo;
        this.vipDj = res.data.data.levelInfo.userLevel;
        this.vipSIndex = res.data.data.levelInfo.userLevel;
        this.vipSIndex1 =
          res.data.data.levelInfo.userLevel == 0
            ? 1
            : res.data.data.levelInfo.userLevel;
        this.level = res.data.data.levelInfo;

        let a =
          parseInt(res.data.data.levelInfo.totalValidAmount) /
          parseInt(res.data.data.levelInfo.upgradeValidAmount);
        let num = (a * 100).toFixed(0);

        if (num > 100) {
          this.jindu = 100;
        } else {
          this.jindu = num;
        }
      });
      //获取个人信息
      let url2 = this.$globalApi.userInfogetCustomerInfo;
      this.$res.postRequest(url2).then((res) => {
        this.idata = res.data.data.customerInfo;
        console.log(res.data.data.customerInfo.identityCard, "获取v");
        //this.isshow = 0;
      });
    },
    vipSChan(e) {
      console.log(e);
      this.vipSIndex = e.detail.current;
    },
    prenum(rebateRatio) {
      let a = (rebateRatio * 10000) / 100;
      let b = a.toFixed(2) + "%";
      return b;
    },
  
    navselet(e) {
      this.nowindex = e.currentTarget.dataset.navid;
    },
    setindex(e) {
      this.vipSIndex1 = e;
      this.getlevelRebates_gameType(this.levelInfo);
    },
    bindPickerChange: function (e) {
      this.index = e.detail.value;
    },
    vipnavselet(e) {
      this.vipnav = e;
    },
    goback() {
      console.log(this.url, "url------------------------");
      if (this.url) {
        uni.reLaunch({
          url: this.url,
        });
        return;
      } else {
        history.back();
      }
    },
  },
};
</script>

<style lang="scss">
.borderless-table {
  border-collapse: collapse;
}

.borderless-table th,
.borderless-table td {
  border: none;
  padding: 0em;
  margin: 0;
}

.btncs {
  width: 214rpx;
  height: 70rpx;
  line-height: 76rpx;
  text-align: center;
  color: #ffffff;
  border-radius: 96rpx;
  background: #008D91;
  box-shadow: 0px 8rpx 8rpx 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 40rpx;
  letter-spacing: -0.1rpx;
}

.btncs1 {
  width: 214rpx;
  height: 70rpx;
  line-height: 76rpx;
  text-align: center;
  color: #ffffff;
  border-radius: 96rpx;
  background: #008D91;
  box-shadow: 0px 8rpx 8rpx 0rpx rgba(0, 0, 0, 0.25);
  color: #fff;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 40rpx;
  letter-spacing: -0.1rpx;
}

.scroll-view_H {
  width: 90%;
  display: flex;
  flex-wrap: nowrap;
}

.set-bg {
  background: #ffffff;
}

.vip {
  .uni-input-input {
    width: 200rpx;
    height: 80rpx;
    background: #ffffff;
  }

  #navbar {
    width: 100%;
    height: 110rpx;
    position: relative;
    z-index: 1001;

    .fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 120rpx;
      width: 100%;
      background-size: 100% 100%;
      background: #f1f1f1;

      .image {
        width: 22rpx;
        height: 38rpx;
        position: absolute;
        left: 54rpx;
        top: 26rpx;
        text-align: center;

        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .title {
        width: 100%;
        height: 100%;
        line-height: 94rpx;
        text-align: center;
        font-size: 32rpx;
        font-weight: bold;
        color: #003B3D;
      }
    }
  }

  .navlist {
    background: url("../../static/vips/nav_bg.png") no-repeat;
    background-size: 100% 100%;
    width: 636rpx;
    height: 68rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 10rpx;

    > view {
      width: 50%;
      height: 100%;
      color: #fff;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.1rpx;
    }

    > view.active {
      width: 306rpx;
      height: 56rpx;
      border-radius: 108rpx;
      background: #f1f1f1;
      color: #008D91;
      text-align: center;
      font-family: Microsoft YaHei UI;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 40rpx;
      letter-spacing: -0.1rpx;
    }
  }

  .page_no_1 {
    .profile_view {
      width: 100%;
      height: 1010rpx;
      border-radius: 0px 0px 40rpx 40rpx;
      background: #f1f1f1;
      box-shadow: 0px 30rpx 30rpx 0px rgba(0, 0, 0, 0.25);

      .profile_user_info {
        padding: 30rpx 10rpx 0 58rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .profile_image {
          width: 116rpx;
          height: 116rpx;
          margin-right: 22rpx;
        }

        .name_and_vip {
          display: flex;
          justify-content: inherit;
          align-items: center;
          width: 50%;

          .user_name {
            color: #008D91;
            font-family: Microsoft YaHei UI;
            font-size: 32rpx;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          .user_vip {
            margin-left: 22rpx;
            // width: 68rpx;
            padding: 0 4rpx;
            height: 34rpx;
            border-radius: 4rpx;
            background: #e2e2e2;
            color: #727272;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }

        .crown_image {
          margin-left: 60rpx;
          width: 160rpx;
        }
      }

      .djjindu {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 48rpx 68rpx 0 68rpx;

        .dengji {
          border-radius: 4rpx;
          background: #e2e2e2;
          color: #727272;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          padding: 2rpx 8rpx 2rpx 8rpx;
        }

        .jindu {
          width: 450rpx;
          height: 34rpx;
          border-radius: 30rpx;
          border-radius: 54rpx;
          background: #e2e2e2;
          box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.25) inset;
          position: relative;

          .txt-number {
            position: absolute;
            bottom: -76rpx;
            left: 24%;
            padding: 0 6rpx;
            height: 68rpx;
            line-height: 76rpx;
            text-align: center;
            background: url("../../static/vips/Union.png") no-repeat center
              center;
            background-size: 100% 100%;
            font-size: 24rpx;
            color: #fff;
          }

          .jindut {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 30rpx;
            position: relative;

            image {
              width: 30%;
              height: 26rpx !important;
              margin-left: 6rpx;
              margin-right: 6rpx;
              border-radius: 12rpx;
            }

            view {
              width: 30%;
              height: 22rpx;
              border-radius: 54rpx;
              background: #008D91;
              position: absolute;
              top: 6rpx;
              left: 8rpx;
            }
          }
        }
      }

      .current_amount_status {
        padding: 102rpx 0rpx 0 0rpx;

        .current_deposit_and_turnover {
          .text_01 {
            color: #003B3D;
            text-align: center;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.1rpx;
          }

          .text_02 {
            color: #8098b6;
            text-align: center;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.5px;

            span {
              margin-left: 10rpx;
              color: #003B3D;
              text-align: center;
              font-family: Microsoft YaHei UI;
              font-size: 24rpx;
              font-style: normal;
              font-weight: 400;
              line-height: 40rpx;
              letter-spacing: -0.1rpx;
            }
          }
        }
      }

      .luobo {
        width: 100%;
        margin: 142rpx 0 0 32rpx;

        swiper {
          height: 306rpx;
          width: 100%;

          swiper-item {
            width: 98%;
            height: 306rpx;
            border-radius: 32rpx;

            .swiper-item {
              position: relative;
              width: 96%;
              height: 306rpx;
              margin-right: 20rpx;
              border-radius: 32rpx;
              background: #c8c8c8;

              .dengji {
                position: absolute;
                width: 120rpx;
                top: 6rpx;
                right: 54rpx;

                image {
                  display: block;
                  width: 172rpx;
                  height: 172rpx;
//                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
              }
              .dengji10{
                position: absolute;
                width: 120rpx;
                top: 6rpx;
                right: 174rpx;
                image {
                  display: block;
                  width: 270rpx;
                  height: 164rpx;
//                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
              }

              .viptxt {
                padding: 36rpx 0 0 54rpx;
                color: #003B3D;
                font-family: Microsoft YaHei UI;
                font-size: 52rpx;
                font-style: normal;
                font-weight: 700;
                line-height: 40rpx;
                letter-spacing: -0.1rpx;
              }

              .tshi {
                padding: 12rpx 142rpx 0 68rpx;

                color: #003B3D;
                font-family: Microsoft YaHei UI;
                font-size: 24rpx;
                font-style: normal;
                font-weight: 400;
                line-height: 40rpx;
                letter-spacing: -0.1rpx;

                text {
                  color: #003B3D;
                  font-family: Microsoft YaHei UI;
                  font-size: 24rpx;
                  font-style: normal;
                  font-weight: 700;
                  line-height: 40rpx;
                  letter-spacing: -0.1rpx;
                  padding: 0 10rpx;
                  box-sizing: border-box;
                }
              }
              .tshii{
                height: 92rpx;
              }


              .tip {
                width: 100%;
                height: 96rpx;
                display: flex;
                padding: 0 0 0 68rpx;
                box-sizing: border-box;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                background: #003B3D;

                view {
                  color: #e2e2e2;
                  font-family: Times New Roman;
                  font-size: 24rpx;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 40rpx;
                  /* 166.667% */
                  letter-spacing: -0.1rpx;
                  height: 30rpx;

                  text {
                    padding: 0 10rpx;
                    box-sizing: border-box;
                    color: #e2e2e2;
                    font-family: Times New Roman;
                    font-size: 24rpx;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 40rpx;
                    letter-spacing: -0.5px;
                  }
                }
              }
            }
          }
        }
      }
    }

    .vip_exclusive {
      width: 100%;
      height: 540rpx;

      background: #f1f1f1;
      box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.25);
      margin-top: 54rpx;
      padding: 46rpx 64rpx;

      .exclusive_title {
        display: flex;
        align-items: center;
        justify-content: left;

        .border_title {
          width: 6rpx;
          height: 52rpx;
          background: #9c240f;
        }

        .title_ex {
          margin-left: 16rpx;
          color: #003B3D;
          font-family: Microsoft YaHei UI;
          font-size: 32rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          letter-spacing: -0.5px;
        }
      }

      .exclusive_flex {
        padding: 28rpx 0rpx 0 0rpx;

        .exclusive_flex_1 {
          .exclusive_image_icon {
            width: 60rpx;
            height: 60rpx;
          }

          .exclusive_text {
            padding-left: 18rpx;

            .e_1 {
              color: #788391;
              font-family: Microsoft YaHei UI;
              font-size: 24rpx;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }

            .e_2 {
              width: 252rpx;
              color: #788391;
              font-family: Microsoft YaHei UI;
              font-size: 24rpx;
              font-style: normal;
              font-weight: 290;
              line-height: normal;
            }
          }
          .bar {
            width: 198rpx;
            height: 12rpx;
            flex-shrink: 0;
            border-radius: 64rpx;
            background: #788391;
            margin: 0 68rpx 0 0rpx;
          }
        }
      }

      /*    .exclusive_flex_2 {
        margin-top: 50rpx;

        .exclusive_image_icon2 {
          width: 92rpx;
          height: 88rpx;
        }

        .exclusive_text2 {
          padding-left: 18rpx;

          .e_1_1 {
            color: #788391;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }

          .e_2_2 {
            color: #788391;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 290;
            line-height: normal;
          }
        }
      }*/
    }

    .vip_details {
      width: 100%;
      height: 100%;
      background: #f1f1f1;
      box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.25);
      margin-top: 54rpx;
      padding: 46rpx 0rpx;
      padding-bottom: 252rpx;

      .exclusive_title {
        display: flex;
        align-items: center;
        justify-content: left;
        padding: 0rpx 64rpx;

        .border_title {
          width: 6rpx;
          height: 52rpx;
          background: #9c240f;
        }

        .title_ex {
          margin-left: 16rpx;
          color: #003B3D;
          font-family: Microsoft YaHei UI;
          font-size: 32rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          letter-spacing: -0.1rpx;
        }
      }
    }

    .selectlist {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      width: 674rpx;
      max-height: 708rpx;
      overflow-y: auto;
      border-radius: 40rpx;
      background: #e9e9e9;
      box-shadow: 4rpx 4rpx 30rpx 0rpx rgba(0, 0, 0, 0.25);
      margin: 0 auto;
      margin-top: 34rpx;


      .contents {
        padding:0rpx 72rpx 0rpx 50rpx;
        width: 100%;
        height: 88rpx;
        background: #003B3D;
        display: flex;
        align-items: center;

        image {
          width: 48rpx;
          height: 38.376rpx;
        }

        .G_Name {
          color: #fff;
          font-size: 24rpx;
          font-weight: 700;
          display: flex;
          padding:0 0 0 32rpx;
          flex: 3;
          flex-direction: column;
        }

        .amount {
          width: 148rpx;
          color: #fff;
          text-align: center;
          font-family: Inter;
          font-size: 28rpx;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
      }
    }
  }

  .page_no_2 {
    .supreme_vip {
      width: 100%;
      min-height: 434rpx;
      height: 440rpx;
      border-radius: 0px 0px 40rpx 40rpx;
      background: #f1f1f1;
      box-shadow: 0px 30rpx 30rpx 0px rgba(0, 0, 0, 0.25);

      .class_display_text {
        padding: 0px 0 0 46rpx;

        .flex_vip {
          .supreme {
            color: #003B3D;
            font-family: Microsoft YaHei UI;
            font-size: 44rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.1rpx;
          }

          .vipp {
            color: #e18a15;
            font-family: Microsoft YaHei UI;
            font-size: 44rpx;
            font-style: normal;
            font-weight: 700;
            line-height: 40rpx;
            letter-spacing: -0.1rpx;
          }
        }

        .vip_details_text_1 {
          width: 292rpx;
          color: #8592a3;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 36rpx;
          letter-spacing: -0.1rpx;
          margin-top: 10rpx;
        }

        .vip_details_text_2 {
          width: 262rpx;
          color: #a7b7cc;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx; /* 105% */
          letter-spacing: -0.1rpx;
          margin-top: 8rpx;
        }
      }

      .class_display_image {
        height: 474rpx !important;
        width: 448rpx;
      }
    }
  }

  .pagetwo {
    .lunboo {
      width: 100%;

      image {
        display: block;
        width: 100%;
      }
    }

    .djlist {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 62rpx 30rpx 0 30rpx;

      view {
        display: block;
        margin-bottom: 10rpx;
        margin-left: 10rpx;
        width: 126rpx;
        height: 60rpx;
        border-radius: 8rpx;
        background: #c8c8c8;
        color: #003B3D;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 56rpx;
        letter-spacing: -0.1rpx;
      }

      view.active {
        border-radius: 8rpx;
        border: 2rpx solid #008D91;
        background: #c8c8c8;
        box-shadow: 4rpx 4rpx 22rpx 0rpx rgba(255, 0, 0, 0.4);
      }
    }

    .luobo {
      width: 100%;
      background: #fff;
      margin-bottom: 40rpx;
      padding-bottom: 30rpx;

      swiper {
        height: 500rpx;
        width: 100%;

        swiper-item {
          height: 500rpx;
          padding: 50rpx 38rpx;
          box-sizing: border-box;

          .swiper-item {
            height: 400rpx;
            border-radius: 32rpx;
            background: #e2e2e2;
            box-shadow: 4rpx 4rpx 22rpx 0rpx rgba(0, 0, 0, 0.25);
            position: relative;
            //padding-top: 70rpx;
            box-sizing: border-box;

            .vip_title_and_level {
              padding: 0rpx 20rpx 0 62rpx;
              //   margin: -58rpx 0 0 0;
              height: 160rpx;

              .vip_titl {
                color: #003B3D;
                font-family: Microsoft YaHei UI;
                font-size: 52rpx;
                font-style: normal;
                font-weight: 700;
                line-height: 40rpx;
                letter-spacing: -0.1rpx;
              }

              image {
                width: 160rpx;
                height: 160rpx;
              }
            }

            .content_flex {
              display: flex;
              align-items: center;
              justify-content: left;
              padding: 0 98rpx 28rpx 56rpx;

              image {
                width: 48.094rpx;
              }

              .slider_text_1 {
                width: 244rpx;
                color: #003B3D;
                font-family: Microsoft YaHei UI;
                font-size: 24rpx;
                font-style: normal;
                font-weight: 400;
                line-height: 40rpx;
                letter-spacing: -0.1rpx;
                margin: 0 0rpx 0 32rpx;
              }

              .slider_text_2 {
                color: #008D91;
                font-family: Microsoft YaHei UI;
                font-size: 24rpx;
                font-style: normal;
                font-weight: 400;
                line-height: 40rpx;
                letter-spacing: -0.1rpx;
                width: 120rpx;
              }
            }
          }
        }
      }

      .twolist {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 30rpx;
        box-sizing: border-box;
        margin-bottom: 30rpx;

        > view {
          width: 48%;
          height: 186rpx;
          padding: 30rpx 30rpx 50rpx;
          border-radius: 32rpx;
          background: #e2e2e2;
          box-shadow: 4rpx 4rpx 22rpx 0rpx rgba(0, 0, 0, 0.25);

          .txt {
            color: #003B3D;
            font-family: Microsoft YaHei UI;
            font-size: 28rpx;
            font-style: normal;
            font-weight: 700;
            line-height: 40rpx;
            letter-spacing: -0.1rpx;

            text {
              margin-left: 10rpx;
            }
          }

          .tip {
            color: #003B3D;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.1rpx;
          }
        }
      }

      .shengri {
        padding: 30rpx;
        border-radius: 26rpx;
        background: #e2e2e2;
        box-shadow: 4rpx 4rpx 22rpx 0rpx rgba(0, 0, 0, 0.38);
        height: 112rpx;
        margin: 0 auto;
        text-align: center;
        margin-left: 38rpx;
        margin-right: 38rpx;

        .image_v_1 {
          position: absolute;
          width: 60rpx;
          height: 60rpx;
          margin: 60rpx 0 0 -148rpx;
        }

        .image_v_2 {
          position: absolute;
          width: 30rpx;
          height: 30rpx;
          margin: -36rpx 0 0 112rpx;
        }

        .image_v_3 {
          position: absolute;
          width: 26rpx;
          height: 26rpx;
          margin: -48rpx 0 0 -46rpx;
        }

        .image_v_4 {
          position: absolute;
          width: 22rpx;
          height: 22rpx;
          margin: -16rpx 0 0 -130rpx;
        }

        .image_v_5 {
          position: absolute;
          width: 16rpx;
          height: 16rpx;
          margin: 62rpx 0 0 62rpx;
        }

        .txt {
          color: #003B3D;
          font-family: Microsoft YaHei UI;
          font-size: 28rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          letter-spacing: -0.1rpx;

          text {
            margin-left: 10rpx;
          }
        }
      }
    }

    .vipdetail {
      width: 100%;
      height: 676rpx;
      border-radius: 40rpx;
      background: #647182;
      box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.25);

      .title {
        font-size: 34rpx;
        color: #ffffff;
        height: 40rpx;
        line-height: 40rpx;
        position: relative;
        padding: 50rpx 0 0 92rpx;

        margin-bottom: 40rpx;
        font-weight: bold;
      }

      .title::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 6rpx;
        height: 40rpx;
        background: #ffffff;
        margin: 50rpx 0 0 64rpx;
      }

      .list {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 68rpx 0 0 0;

        .one {
          width: 33.3333333%;
          text-align: center;
          margin-bottom: 40rpx;

          .num {
            color: #ffbc0f;
            text-align: center;
            font-family: Microsoft YaHei UI;
            font-size: 32rpx;
            font-style: normal;
            font-weight: 700;
            line-height: 40rpx;
            /* 125% */
            letter-spacing: -0.1rpx;

            text {
              margin-left: 10rpx;
            }
          }

          .txt {
            color: #fff;
            text-align: center;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            /* 166.667% */
            letter-spacing: -0.1rpx;
          }
        }
      }

      .selectlist {
        margin: 0 auto;
        padding: 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 40rpx;
        background: #e2e2e2;
        width: 702rpx;
        height: 232rpx;

        .txtselect {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;

          picker view {
            width: 210rpx;
            height: 62rpx;
            border-radius: 10rpx;
            background: #003B3D;
            text-align: center;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            color: #e2e2e2;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx !important;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.1rpx;
            //margin-left: 18rpx;

            image {
              display: inline-block;
              width: 22rpx;
              height: 10.1rpx;
              margin-left: 32rpx;
            }
          }
        
          //          placeholder-style="color:#41536A; font-size: 24rpx; text-align:center; margin:0 15px;"
          /deep/.uni-input-input {
            font-family: Microsoft YaHei UI;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: #ffffff;
            font-size: 24rpx;
            text-align: left;
            width: 210rpx;
            padding: 0 30rpx;
          }
          /deep/.uni-input-placeholder {
            font-family: Microsoft YaHei UI;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: rgb(65, 83, 106);
            font-size: 24rpx;
            width: 210rpx;
            padding: 0 30rpx;
          }
        }
      }
    }

    .vip_rebate_and_withdraw {
      margin-top: 76rpx;
      width: 100%;
      border-radius: 0px 0px 40rpx 40rpx;
      background: #f1f1f1;
      box-shadow: 0px 8rpx 30rpx 0px rgba(0, 0, 0, 0.25);

      .navlists {
        padding: 82rpx 74rpx;

        view {
          color: #003B3D;
          font-family: Microsoft YaHei UI;
          font-size: 28rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          letter-spacing: -0.1rpx;
          margin: 0 24rpx 0 24rpx;
        }

        .active {
          color: #008D91;
          position: relative;
          font-weight: bold;
        }

        .active::before {
          content: "";
          display: block;
          width: 100%;
          height: 4rpx;
          border-radius: 4rpx;
          background: #008D91;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }

      .titll {
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: -0.1rpx;
        text-align: center;

        image {
          width: 92.834rpx;
        }

        span {
          margin: 18rpx 0 0 22.194rpx;
        }
      }
    }

    .scroll-view_H {
      width: 90%;
      display: flex;
      flex-wrap: nowrap;
      height: 100%;
    }

    .table {
      display: block;
      width: 100%;
      margin-top: 38px;
      height: 72%;
      border-radius: 0rpx 0 40rpx 40rpx;

      .th {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        line-height: 44rpx;

        view {
          width: 20%;
          height: 90rpx;
          text-align: center;
          line-height: 90rpx;
          font-size: 24rpx;
          color: #34354f;
        }

        view:last-child {
          border-right: none;
        }

        .ys {
          width: 168rpx;
          height: 80rpx;
          color: #af9d0b;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 80rpx;
          letter-spacing: -0.1rpx;
          background: #f1f1f1;
        }

        .ys1 {
          width: 168rpx;
          height: 80rpx;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 80rpx;
          letter-spacing: 2.4rpx;
        }

        .yss {
          width: 20%;
          height: 60rpx;
          background: #f1f1f1;
          color: #af9d0b;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          letter-spacing: 2.4rpx;
        }

        .yss1 {
          width: 40%;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 700;
          line-height: 40rpx;
          letter-spacing: 2.4rpx;
        }
      }

      .td {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        line-height: 32rpx;

        view {
          width: 20%;
          height: 90rpx;
          text-align: center;
          line-height: 90rpx;
          font-size: 24rpx;
          color: #34354f;
        }

        view:last-child {
          border-right: none;
        }

        .ys {
          width: 168rpx;
          color: #938725;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 70rpx;
          letter-spacing: -0.1rpx;
          background: #f1f1f1;
        }

        .ys1 {
          width: 168rpx;
          height: 70rpx;
          line-height: 70rpx;
          font-size: 24rpx;
          text-align: center;
        }

        .yss {
          color: #c1ab77;
          width: 33%;
          height: 40rpx;
          font-size: 24rpx;
          text-align: center;
        }

        .yss1 {
          width: 33%;
          height: 40rpx;
          font-size: 24rpx;
          text-align: center;
        }

        .xyy {
          width: 33%;
          height: 66rpx;
          color: #938725;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          /* 166.667% */
          letter-spacing: -0.1rpx;
          width: 20%;
          background: #f1f1f1;
        }

        .xxy {
          height: 66rpx;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          /* 166.667% */
          letter-spacing: -0.1rpx;
          width: 40%;
          background: #dedede;
        }

        .xxxy {
          height: 66rpx;
          color: #003B3D;
          text-align: center;
          font-family: Microsoft YaHei UI;
          font-size: 24rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 40rpx;
          /* 166.667% */
          letter-spacing: -0.1rpx;
          width: 40%;
          background: #c1c1c1;
        }
      }
    }

    .viptishi {
      border-radius: 0rpx 0rpx 40rpx 40rpx;
      background: #f1f1f1;
      box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.25);
      margin-bottom: 30rpx;

      .navlist {
        width: 100%;
        background: #f1f1f1;
        height: 110rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        view {
          height: 100%;
          line-height: 110rpx;
          color: #404261;
          position: relative;
          font-size: 30rpx;
        }

        view:nth-child(1) {
          margin-right: 100rpx;
        }

        .active {
          color: #008D91;
          position: relative;
          font-weight: bold;
        }

        .active::before {
          content: "";
          display: block;
          width: 100%;
          height: 4rpx;
          border-radius: 4rpx;
          background: #f86c3b;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }

      .title {
        height: 120rpx;
        line-height: 120rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: #404261;
        font-weight: bold;

        image {
          width: 60rpx;
          height: 60rpx;
          display: inline-block;
          margin-right: 20rpx;
        }
      }
    }

    .guize {
      padding: 30rpx;
      box-sizing: border-box;
      margin-bottom: 40rpx;
      margin-top: 88rpx;
      border-radius: 0rpx 0px 40rpx 40rpx;
      background: #f1f1f1;
      height: 100%;
      box-shadow: 0rpx 8rpx 30rpx 0rpx rgba(0, 0, 0, 0.25);

      .title {
        height: 40rpx;
        position: relative;
        margin: 32rpx 0 78rpx 60rpx;
        padding-left: 16rpx;
        color: #003B3D;
        font-family: Microsoft YaHei UI;
        font-size: 32rpx;
        font-style: normal;
        font-weight: 700;
        line-height: 40rpx;
        letter-spacing: -0.1rpx;
      }

      .title::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 6rpx;
        height: 40rpx;
        background: #9c240f;
      }

      .tip {
        padding: 0 12rpx 0 58rpx;

        .one {
          margin-bottom: 30rpx;

          .littitle {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;

            view:nth-child(1) {
              width: 48rpx;
              height: 48rpx;
              border-radius: 50%;
              color: #f1f1f1;
              font-family: Microsoft YaHei UI;
              font-size: 24rpx;
              font-style: normal;
              font-weight: 700;
              line-height: 40rpx;
              letter-spacing: -0.1rpx;
              text-align: center;
              background: #9c240f;
              margin-right: 26rpx;
            }

            view:nth-child(2) {
              color: #003B3D;
              font-family: Microsoft YaHei UI;
              font-size: 24rpx;
              font-style: normal;
              font-weight: 700;
              line-height: 40rpx;
              letter-spacing: -0.1rpx;
            }
          }

          .miaosu {
            padding: 0 0 0 70rpx;
            color: #003B3D;
            font-family: Microsoft YaHei UI;
            font-size: 24rpx;
            font-style: normal;
            font-weight: 400;
            line-height: 40rpx;
            letter-spacing: -0.1rpx;
          }
        }
      }
    }

    .one_text {
      padding: 68rpx 20rpx 160rpx 20rpx;
      .alltext_1 {
     //   width: 520rpx;
        color: #008D91;
        text-align: center;
        font-family: Microsoft YaHei UI;
        font-size: 24rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: -0.1rpx;
      }
    }
  }
}

.text-size {
  color: #404261;
  font-size: 30rpx !important;
}

.text-title {
  width: 162rpx;
  color: #003B3D;
  text-align: right;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx !important;
  font-style: normal;
  font-weight: 400;
  line-height: 40rpx;
  letter-spacing: -0.1rpx;
  text-align: right;
  margin-right: 18rpx;
}

.money-bor {
  width: 210rpx;
  height: 62rpx;
  border-radius: 10rpx;
  background: #003B3D;
  // margin-left: 18rpx;
}

.money-bor-text {
  margin-top: 10rpx;
  color: #003B3D;
  font-family: Microsoft YaHei UI;
  font-size: 24rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 40rpx;
  letter-spacing: -0.1rpx;
}

.vip-class {
  position: absolute;
  width: 110rpx;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  height: 40rpx;
  line-height: 40rpx;
}
/deep/.swiper {
  height: 330rpx !important;
}
</style>
