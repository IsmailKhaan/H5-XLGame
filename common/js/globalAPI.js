import state from '../../store/state'
// const http = uni.getStorageSync("apiUrl") ? uni.getStorageSync("apiUrl") : 'apiFx()://api.xunli10.com';
// const http1 = uni.getStorageSync("apiUrl") ? uni.getStorageSync("apiUrl") : 'apiFx()://api.xunli10.com';

// const http  = state.apiUrl;
// const http1  = state.apiUrl;

const globalAPI = {
  // 帐号注册的时候获取验证码
  sendRegisterSms:  '/userRegister/sendRegisterSms',
  //帐号注册验证通过手机获取的验证码是否正确
  checkRegisterSms:  '/userRegister/checkRegisterSms',
  //帐号注册之验证码通过后，提交所有数据
  // registerAfterCheck:  '/userRegister/registerAfterCheck', //废弃
  reg:  '/userRegister/register',
  //根据用户名+密码登录
  login:  "/userLogin/login",
  //根据手机和手机验证码登录
  loginBySms:  "/userLogin/loginBySms",
  //手机登录获取验证码的接口
  sendLoginSms:  "/userLogin/sendLoginSms",
  //通过用户名和手机号找回密码（获取验证码）
  sendVerifyCode:  "/userResetPassword/forget/sendVerifyCode",
  //通过用户名和手机号找回密码（效验验证码是否正确）
  checkVerifyCode:  "/userResetPassword/forget/checkVerifyCode",
  //修改密码接口
  resetPassword:  "/userResetPassword/forget/resetPassword",



  // 用户名检测
  checkMemberNo:  '/member/checkMemberNo',
  //用户信息
  memberInfo:  "/member/memberInfo",
  // 会员等级
  level:  "/member/level",
  // 获取手机验证码
  phoneCode:  "/member/registerMsg",
  // 验证码
  gifCode:  "/gifCode",
  // 注册
  register:  "/member/register",
  // 经销商账户注册
  registerByCode:  "/member/registerByCode",
  // 登陆

  // 用户余额
  accountBalance:  "/account/accountBalance",
  // 注销
  logout:  "/member/logout",
  //检测有无绑定邮箱
  checkBinding:  "/member/checkBinding",
  //检测邮箱是否可用
  checkEmail:  "/member/checkEmail",
  //检测有无绑定银行卡
  isBind:  "/rechargeChannel/isBind",
  //绑定银行卡
  binding:  "/rechargeChannel/binding",
  //校验银行卡
  checkBankCard:  "/rechargeChannel/checkBankCard",
  //解绑银行卡
  unBind:  "/rechargeChannel/unbind",
  //批量解绑银行卡
  batchUnbind:  "/rechargeChannel/batchUnbind",
  //获取银行卡
  allChannel:  "/rechargeChannel/allChannel",
  // 移动端游戏
  mbGame:  "/sport/mbGame",
  // 投注记录
  // betRecord:  "/bet/betRecord",
  betRecord:  "/bet/getBetRecord",
  // 交易记录
  // record:  "/member/record",
  record:  "/member/getRecord",
  getRechargeDetail:  "/recharge/getRechargeDetail",
  confirmOrder:  "/recharge/confirmOrder",
  // 提交充值申请
  recharge:  "/recharge/submitRecharge",
  // 获取充值金额限制
  payChannelInfo:  "/recharge/payChannelInfo",
  // 转账
  transfer:  "/transfer/transfer",
  // 一键转入
  oneKey:  "/transfer/oneKey",
  // 一键回收
  allBack:  "/transfer/allBack",
  //校验打码量
  checkAllow:  "/withdraw/checkAllow",
  // 提现
  withdraw:  "/withdraw/submitWithdraw",
  // 提现次数
  // todayTimes:  "/withdraw/todayTimes", //2-27更新api
  todayTimes:  "/userWithdraw/todaySurplusTimesV2", //2-27更新api
  // 获取账户游戏余额
  balance:  "/transfer/allBalance",
  // 获取单个游戏余额
  oneBalance:  "/transfer/balance",
  // 获取邮箱验证码
  emailCode:  "/member/emailBindingCode",
  // 绑定邮箱
  email:  "/member/bindingEmail",
  // 获取手机验证码
  mobileCode:  "/member/mobileBindingMessage",
  // 绑定手机
  bindMobile:  "/member/bindingMobile",
  // 修改用户信息
  updateMemberInfo:  "/member/updateMemberInfo",
  // 修改密码
  updatePassword:  "/member/updatePassword",
  // 总投注总流水
  totalAmount:  "/member/totalAmount",
  // 获取公告
  notice:  "/notice/getNoticeParameter",
  // 获取活动
  activity:  "/activity/allActivity",
  // 获取活动
  allActivity:  "/param/allActivity",
  // 支付渠道
  getAllPayChannel:  "/recharge/getAllPayChannel",
  getChannelInfo:  "/recharge/getChannelInfo",
  // 支付第三方链接
  pay:  "/recharge/applyPay",
  //安全等级
  getSafetyLevel:  "/member/getSafetyLevel",
  //提交意见反馈
  saveFeedback:  "/feedback/saveFeedback",
  //提交意见反馈图片上传
  saveFeedbackUpload:  "/aliyun/oss/policy",
  //查看历史反馈
  getFeedback:  "/feedback/getFeedback",
  //取消存款订单
  cancelPay:  "/recharge/cancelPay",
  //是否开启免转
  updateFreeTransfer:  "/member/updateFreeTransfer",
  //获取免转状态
  isFreeTransfer:  "/member/isFreeTransfer",
  //开户行省份
  getCity:  "/city/getCity",
  //修改头像
  updateIcon:  "/member/updateIcon",
  //会员等级信息
  levelInfo:  "/param/levelInfo",
  //返水信息
  rebateInfo:  "/param/rebateInfo",
  //密码找回获取邮箱验证码
  emailResetCode:  "/member/emailResetCode",
  //密码找回验证邮箱验证码
  checkResetCode:  "/member/checkResetCode",
  //密码找回获取手机验证码
  forgetMsg:  "/member/forgetMsg",
  //密码找回验证手机验证码
  forgetCode:  "/member/forgetCode",
  //密码找回重置密码
  forgetPassword:  "/member/forgetPassword",
  //获取锁定钱包
  lockBalance:  "/bet/lockBalance",
  //获取本月礼金上月礼金
  lastMonthInvite:  "/invite/lastMonthInvite",
  // 是否有未读消息
  hasUnreadMessage:  "/message/hasUnreadMessage",
  // 获取消息列表
  getMessageList:  "/message/getMessageList",
  // 查看消息
  readMessage:  "/message/readMessage",
  // 全部已读
  readAllMessage:  "/message/readAllMessage",
  // 短信登录获取验证码
  loginMsg:  "/member/loginMsg",
  // 短信登录
  loginByMsg:  "/member/loginByMsg",
  // 短信注册获取验证码
  registerMsg:  "/member/registerMsg",
  // 短信注册校验验证码
  checkRegisterMsg:  "/member/checkRegisterMsg",
  // 短信注册
  registerByPhone:  "/member/registerByPhone",
  // 获取是否有过虚拟币充值
  hasVCRecharge:  "/rechargeChannelVC/hasVCRecharge",
  // 获取虚拟币钱包
  allVCChannel:  "/rechargeChannelVC/allVCChannel",
  // 绑定虚拟币钱包
  VCBinding:  "/rechargeChannelVC/binding",
  // 解绑虚拟币钱包
  VCBatchUnbind:  "/rechargeChannelVC/batchUnbind",
  // 获取虚拟币钱包协议
  allVirtualProtocol:  "/rechargeChannelVC/allVirtualProtocol",
  // 虚拟币提现
  submitWithdrawByVC:  "/withdraw/submitWithdrawByVC",
  // 虚拟币提现限制
  todayTimesVC:  "/withdraw/todayTimesVC",
  // 虚拟币提现打码量
  checkAllowVC:  "/withdraw/checkAllowVC",
  // 虚拟币催单
  remindOrder:  "/recharge/remindOrder",
  //获取投注详情
  getMatchInfo:  "/bet/getMatchInfo",
  //获取余额
  getNewestBalance:  "/gameBalance/getNewestBalance",
  //获取所有余额
  getAllBalance:  "/gameBalance/getAllBalanceV2",
  //一键回收
  allBack:  "/gameBalance/allBack",
  //一键转入
  oneKey:  "/gameBalance/oneKey",
  //查询提现汇率
  getCurrencyExchangeRate:  "/gameBalance/getCurrencyExchangeRate",
  //获取锁定钱包余额
  getLockBalance:  "/gameBalance/getLockBalance",
  //获取提现剩余次数
  odaySurplusTimes:  "/userWithdraw/todaySurplusTimes",
  //提现检测流水是否符合要求
  checkAmount:  "/userWithdraw/checkAmount",
  //发起提现
  applyWithdraw:  "/userWithdraw/applyWithdrawV2",
  //获取公告
  getSystemNotice:  "/systemInfo/getSystemNotice",
  //获取游戏登录
  mbLogin:  "/gameLogin/mbLogin",
  //
  mbAfterDiscount: "/gameLogin/mbAfterDiscount",
  //获取二级登录游戏
  mbHallGameLogin:  "/gameLogin/mbHallGameLogin",
   //开启自动转账 1开启
  auto:  "/userInfo/changeFreeTransfer",
  //转账
  gameBalanceTransfer:  "/gameBalance/transfer",
  //获取会员信息
  userInfogetCustomerInfo:  "/userInfo/getCustomerInfo",
  
  userInfogetBankinfo:  "/userInfo/getSafeLevel",

  //绑定真实信息
  userBindbindRealInfo:  "/userBind/bindRealInfo",
  //发送验证码
  userBindsendPhoneBindCode:  "/userBind/sendPhoneBindCode",
  //绑定手机
  userBindbindPhone:  "/userBind/bindPhone",
  //发送邮箱
  userBindsendEmailBindCode:  "/userBind/sendEmailBindCode",
  //绑定邮箱
  userBindbindEmail:  "/userBind/bindEmail",
  //更换头像
  userInfochangeIcon:  "/userInfo/changeIcon",
  //查询银行卡归属银行
  serachBank:  "/userBind/queryBankCard", 
  //绑定银行卡
  userBindbindBankCard:  "/userBind/bindBankCard", 
  //获取银行卡
  userInfogetAllBankCard:  "/userInfo/getAllBankCard",
  // 修改密码
  userResetPasswordresetPasswordByOld:  "/userResetPassword/resetPasswordByOld",
  //会员等级
  userInfogetLevelInfo:  "/userInfo/getLevelInfo",
  //会员流水
  totalValidAmountupgradeAmount:  "/totalValidAmount/upgradeAmount",
  //汇率
  userRechargegetCurrencyExchangeRate:  "/userRecharge/getCurrencyExchangeRate",
  //充值
  userRechargeapplyPay:  "/userRecharge/applyPay",
  //提现汇率
  userWithdrawgetCurrencyExchangeRate:  "/userWithdraw/getCurrencyExchangeRate",
  //提现次数
  userWithdrawtodaySurplusTimes:  "/userWithdraw/todaySurplusTimesV2",
  // 提现第一步
  userWithdrawcheckAmount:  "/userWithdraw/checkAmount",
  //获取虚拟
  userBindallVCProtocol:  "/userBind/allVCProtocol",
  //绑定
  userBindbindVCWallet:  "/userBind/bindVCWallet",
  //获取虚拟钱包
  userInfogetAllVCWallet:  "/userInfo/getAllVCWallet",
  //申请活动
  activityApplyapplyActivity:  "/activityApply/applyActivity",
  //获取投注记录
  userRecordqueryBerRecordByTimeType:  "/userRecord/queryBetRecordByTimeType",
  //消息公告
  userRecordgetMessageList:  "/userRecord/getMessageList",
  //交易揭露
  userRecordgetRecord:  "/userRecord/getRecord",
  //赛果
  userRecordqueryBetDetails:  "/userRecord/queryBetDetailsV2",
  
  userRechargegetAllChannel:  "/userRecharge/getAllChannel",
  //解绑
  userBindbatchUnbindBankCard:  "/userBind/batchUnbindBankCard",
  userBindbatchUnbindVCWallet:  "/userBind/batchUnbindVCWallet",
  //上报
  systemInforecordApiError:  "/systemInfo/recordApiError",

  checkorderStatus:  "/userWithdraw/checkLastOrderStatus",

}

export default globalAPI