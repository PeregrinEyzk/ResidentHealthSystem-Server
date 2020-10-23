const request = require('request');
const iconv = require('iconv-lite');
const yiyuan_info = require('../models/yiyuan_info.js');
var hos_url={
    "苏州大学附属第一医院(十梓街院区)":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%A4%A7%E5%AD%A6%E9%99%84%E5%B1%9E%E7%AC%AC%E4%B8%80%E5%8C%BB%E9%99%A2(%E5%8D%81%E6%A2%93%E8%A1%97)",
    "苏州大学附属第一医院(平江总院)":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%A4%A7%E5%AD%A6%E9%99%84%E5%B1%9E%E7%AC%AC%E4%B8%80%E5%8C%BB%E9%99%A2(%E5%B9%B3%E6%B1%9F)",
    "苏州大学附属第二医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%A4%A7%E5%AD%A6%E9%99%84%E5%B1%9E%E7%AC%AC%E4%BA%8C%E5%8C%BB%E9%99%A2",
    "苏州大学附属儿童医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%A4%A7%E5%AD%A6%E9%99%84%E5%B1%9E%E5%84%BF%E7%AB%A5%E5%8C%BB%E9%99%A2",
    "苏州市立医院本部":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%B8%82%E7%AB%8B%E5%8C%BB%E9%99%A2%E6%9C%AC%E9%83%A8",
    "苏州市立医院东区":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%B8%82%E7%AB%8B%E5%8C%BB%E9%99%A2%E4%B8%9C%E5%8C%BA",
    "苏州市立医院北区":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%B8%82%E7%AB%8B%E5%8C%BB%E9%99%A2%E5%8C%97%E5%8C%BA",
    "苏州市中医医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%B8%82%E4%B8%AD%E5%8C%BB%E5%8C%BB%E9%99%A2",
    "苏州市第五人民医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%B8%82%E7%AC%AC%E4%BA%94%E4%BA%BA%E6%B0%91%E5%8C%BB%E9%99%A2",
    "苏州市广济医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%B8%82%E5%B9%BF%E6%B5%8E%E5%8C%BB%E9%99%A2",
    "苏州市吴中人民医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%B8%82%E5%90%B4%E4%B8%AD%E4%BA%BA%E6%B0%91%E5%8C%BB%E9%99%A2",
    "苏州市中西医结合（木渎人民）医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%B8%82%E4%B8%AD%E8%A5%BF%E5%8C%BB%E7%BB%93%E5%90%88%EF%BC%88%E6%9C%A8%E6%B8%8E%E4%BA%BA%E6%B0%91%EF%BC%89%E5%8C%BB%E9%99%A2",
    "苏州市相城人民医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E5%B8%82%E7%9B%B8%E5%9F%8E%E4%BA%BA%E6%B0%91%E5%8C%BB%E9%99%A2",
    "苏州市科技城医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E7%A7%91%E6%8A%80%E5%9F%8E%E5%8C%BB%E9%99%A2",
    "苏州九龙医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E4%B9%9D%E9%BE%99%E5%8C%BB%E9%99%A2",
    "苏州高新区人民医院":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindHosp?name=%E8%8B%8F%E5%B7%9E%E9%AB%98%E6%96%B0%E5%8C%BA%E4%BA%BA%E6%B0%91%E5%8C%BB%E9%99%A2"
}
static var beds=[];
var update_beds=function(){
    
    for(var key in hos_url){
        
        var hospnames=[];
        hospnames.push(key);
        var url=hos_url[key];
        request.get(url,{strictSSL:false,encoding : null},function(err,res){      //需要在程序中加入 strictSSL:false 参数，否则会报错
            if(err){
                return reject(err);
            }
            else{
                var result = iconv.decode(res.body, 'utf8');
                var jsondata=JSON.parse(result)
                var beds = jsondata["beds"]
                var beds_info=[];
                for(var i=0;i<beds.length;i++){
                    beds_info.push({
                        "ResName": beds[i]["ResName"],
                        "WarnningLevel":beds[i]["WainningLevel"],
                        "TotalNum": beds[i]["TotalNum"],
                        "LeftNum": beds[i]["LeftNum"],
                        "childRes": beds[i]["childRes"],
                        "DepartIntro": beds[i]["DepartIntro"],
                        "Phone": beds[i]["Phone"]
                    })
                }
                beds.push({
                    hospnames:key,
                    hospbeds:beds_info
                });
            }
        })
    }
    return beds;

}
console.log(update_beds())
//cmodule.exports=update_beds;
// yiyuan_info.findOneAndUpdate({HospName:beds[b]["hospnames"]},{"beds":beds[b]["hospbeds"],"update_time":Date.now()},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(beds[b]["hospnames"]+'The new node is updated');
//     }
// });