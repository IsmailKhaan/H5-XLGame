 import ens from '../locales/en.json'
 let state = {
	ens:ens,
	head:{
		"content-type": "application/x-www-form-urlencoded", //H5 add
		"accept-language":"zh-CN,zh;q=0.9,en-US;",
		"auth-token": uni.getStorageSync("memberInfo").authToken 
	},
	jsons:uni.getStorageSync('jsons')?uni.getStorageSync('jsons'):"",
	// jsonsN:0,
	static:uni.getStorageSync('staticResources'),  //获取轮播图banner，银行卡类型bank，pay-type..
	appIndex:uni.getStorageSync("appIndex"),
	user:uni.getStorageSync("memberInfo"), //token - data
	type:uni.getStorageSync('type'), //news-type
	games:uni.getStorageSync('games'),
	gameError:[],//error
	down:'',// down-app
	status:[],
	gameStatus:[], //check game stattus not equal to zero
	array:[],
	timerInterval: null,
	time: '15:00',
	showReminder: false,
	reminderMessage: '',
	showDiv2: true,
	message: '',
	timestamp: 0,
	info:uni.getStorageSync('zsInfo'), //user-data
	rule:'',
	bankk:uni.getStorageSync('bank'),
	apiUrl:uni.getStorageSync('apiUrl'),
	iconUrl:uni.getStorageSync('iconUrl'), // temporary-api
	jsonUrl:uni.getStorageSync('jsonUrl'), // temporary-api
	siteUrl:uni.getStorageSync('siteUrl'), // temporary-api

	codes:uni.getStorageSync('codes'),//code-error-save
	natives:uni.getStorageSync('natives'),
	allStatus:uni.getStorageSync('status'),// allStatus
	uniqueCode:'',//game-number
	// save - all-version
	ver:uni.getStorageSync('ver')?uni.getStorageSync('ver'):
	{
	  appIndex:'',
	  codes:'', //responseCode
	  allStatus:'',
	  type:'',// news-type
	},
	wait:0, //wait -click 
	money:0,//Total Balance
	gamesIndex:uni.getStorageSync('GameName'),//save-index
	currency:'',//虚拟币列表
	bank:'', // 银行卡
	levelInfo:uni.getStorageSync('levelInfo'),//vip等级信息
	links:uni.getStorageSync('links'),
	// headIndex:uni.getStorageSync('headIndex'),
	// headIndex:uni.getStorageSync('headIndex')?uni.getStorageSync('headIndex'):"" ,
	// payWayType2:0,
	progress : uni.getStorageSync('checkstatus'),
	navselect:1,
	hideview:false,
	hideview2:false,
	hideview3:false,
	activityTitle:null,
	// hideFor24Hours: true,


    currentUser:uni.getStorageSync('userInfo')?JSON.parse(uni.getStorageSync('userInfo')).userName:"" ,   //当前用户
	password:uni.getStorageSync('password')?uni.getStorageSync('password'):"" ,   //当前用户密码
    userAccount:uni.getStorageSync('userInfo')?JSON.parse(uni.getStorageSync('userInfo')).userAccount:0 ,   //当前用户余额
    baseInfo:uni.getStorageSync('baseInfo')?JSON.parse(uni.getStorageSync('baseInfo')):{} ,   //当前用户信息
    token:uni.getStorageSync('token') ,   //判断是否登陆
    bindCard:uni.getStorageSync('bindCard')?uni.getStorageSync('bindCard'):0 , //是否绑定银行卡
    bindEmail:uni.getStorageSync('bindEmail')?uni.getStorageSync('bindEmail'):0, //是否绑定邮箱
    isBinding:uni.getStorageSync('isBinding')?JSON.parse(uni.getStorageSync('isBinding')):{}, //是否绑定邮箱，手机
    bankCard:uni.getStorageSync('userFxCard')?JSON.parse(uni.getStorageSync('bankCard')):[],//银行卡列表
    VCCard:uni.getStorageSync('VCCard')?JSON.parse(uni.getStorageSync('VCCard')):[],//虚拟币列表
	allAccount:uni.getStorageSync('allAccount')?JSON.parse(uni.getStorageSync('allAccount')):[],//所有账户余额
    gameAccount:uni.getStorageSync('gameAccount')?JSON.parse(uni.getStorageSync('gameAccount')):[],//游戏账户余额
 
    gameType:uni.getStorageSync('gameType')?JSON.parse(uni.getStorageSync('gameType')):'',//游戏类型
	
    gameUrl:uni.getStorageSync('gameUrl')?unescape(uni.getStorageSync('gameUrl')):'',//游戏链接
	activityUrl:uni.getStorageSync('activityUrl')?unescape(uni.getStorageSync('activityUrl')):'',//活动链接
	activityUrl1:uni.getStorageSync('activityUrl1')?unescape(uni.getStorageSync('activityUrl1')):'',//活动链接
	
    
    
    gameUniqueCode:uni.getStorageSync('gameUniqueCode')?JSON.parse(uni.getStorageSync('gameUniqueCode')):'',//大厅当前游戏码
    allGameName:uni.getStorageSync('allGameName')?JSON.parse(uni.getStorageSync('allGameName')):[],//所有游戏名
    safety:uni.getStorageSync('safety')?JSON.parse(uni.getStorageSync('safety')):"",//绑定安全信息
    safetyBg:uni.getStorageSync('safetyBg')?uni.getStorageSync('safetyBg'):"",//绑定安全信息

    payUrl:uni.getStorageSync('payUrl')?uni.getStorageSync('payUrl'):"",//支付链接
	remember:uni.getStorageSync('remember')?uni.getStorageSync('remember'):true,//记住密码

	freeTransfer:uni.getStorageSync('freeTransfer')?uni.getStorageSync('freeTransfer'):1,//免转
	
	rebateInfo:uni.getStorageSync('rebateInfo')?JSON.parse(uni.getStorageSync('rebateInfo')):"",//返水比例
	allLevelDiscount:uni.getStorageSync('allLevelDiscount')?JSON.parse(uni.getStorageSync('allLevelDiscount')):"",//vip晋级优惠
	provinceList:uni.getStorageSync('provinceList')?JSON.parse(uni.getStorageSync('provinceList')):[] ,   //省份列表
	cityList:uni.getStorageSync('cityList')?JSON.parse(uni.getStorageSync('cityList')):[] ,   //城市列表
	

    login:false,//登陆跳转开关
    navBar:true,//顶部导航
    accountAttr:false,//显示游戏钱包开关
    footBar:uni.getStorageSync('footBar')?JSON.parse(uni.getStorageSync('footBar')):true,//底部
    messageAttr:false,//提示开关
    kefu:uni.getStorageSync('kefu')?JSON.parse(uni.getStorageSync('kefu')):true,//客服按钮显示开关

	

}
export default state