import { Provider } from "zksync-web3";
import * as ethers from "ethers";

function getNowDate() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var hours = myDate.getHours(); //获取当前小时
    var minutes = myDate.getMinutes(); //获取当前分钟
    var seconds = myDate.getSeconds(); //获取当前秒
    var now =  date + " " + hours + ":" + minutes + ":" + seconds;
    return now;
}

var ETH = "0x000000000000000000000000000000000000800A";
var USDC = "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4";
var addr = "0x1181D7BE04D80A8aE096641Ee1A87f7D557c6aeb"
var token={
    name:"",
    balance:0,
    contract:""
}
var info={
    address:addr,
    balance:[]
}
 var last = 0;   
    while(1){
    const provider = new Provider("https://mainnet.era.zksync.io");
    
    // console.log(123);
    token.name = "USDC";
    token.contract = USDC;
    var tokens = [{name:"ETH",balance:0,contract:""},token];
        for(const t of tokens)
        {
            var res;
            if(t.contract.length == 0){
                res =  await provider.getBalance(info.address);
            }
            else {
                res =  await provider.getBalance(info.address,"latest",t.contract);
            }
            var balance_final = ethers.utils.formatEther(ethers.BigNumber.from(res._hex));
            if(t.contract.length != 0)
           { t.balance = balance_final*10**12;}
           else{
            t.balance = balance_final;
            t.contract = ETH;
           }
           if(t.balance == 0) continue;
          info.balance.push(t);
        }
       
 
    // var r = ethers.BigNumber.from(b).toNumber();
info.balance.forEach(element => {
    if(element.balance>0&&last!=element.balance){
        last = element.balance;
        console.log("Token:"+element.name+"  "+"balance:"+element.balance+"  T:"+getNowDate());
    }
    // if(element.balance!=)
});
    }
    
export { getNowDate }; // 导出 myFunction 函数