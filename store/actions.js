import RequestSender from "@/common/js/request.js";
import globalAPI from '@/common/js/globalAPI';


let actions = {
  gameMoney(){
      return new Promise((resolve,reject)=>{
          let arr = [];
          setTimeout(function(){
          RequestSender.postRequest(globalAPI.getAllBalance).then((res) => {
          //gameBalancegetAllBalance().then(res=>{
              let data = res.data.data.allBalance;
              //获取兑换游戏列表 - Match new array , Convenient language switch
            //   let selectGame = localStorage.getItem('games').platforms.uniqueCodes;
            console.log(data,"getallbalance")
              let selectGame = uni.getStorageSync('games').platforms.uniqueCodes;
              for(let key in data){
                  for(let val in selectGame){
                      if(key == val){
                          arr.push({
                          key: key, // label 字段
                          balance: data[key].balance,
                          name: selectGame[key], // value字段
                          bstatus: data[key].balanceStatus
                          });
                      }
                  }
              }
              resolve(arr)
              
          }).catch(error =>{
              reject(error)
          });
        },1000);


      })
      
  }

  
}
export default actions