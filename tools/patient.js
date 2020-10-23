var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块
var moment = require('moment')
var patient_info = require('../models/patient_info');
const { indexOf } = require('./connect');
var file = path.join(__dirname, 'diseasePoints.json');
var modelData = new Object
var dataLength =0;

function getName(){
    var familyNames = new Array(
    "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", 
    "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
    "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", 
    "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
    "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", 
    "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
    "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", 
    "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
    "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", 
    "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
    );
    var givenNames = new Array(
    "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
    "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
    "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
    "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
    "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
    "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
    "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
    "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
    "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
    "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
    );
    var fr =Math.floor(100* Math.random());
    var lr =Math.floor(110* Math.random());
    return familyNames[fr]+givenNames[lr];
    }
function getDisease(){
    var disease= new Array(
        "腮腺炎","下呼吸道感染","流行性感冒","麻疹","非典型肺炎",
        "乙型肝炎","破伤风","狂犬病","百日咳","A","B","C","D"
    )
    var r = Math.ceil(13* Math.random())-1;
    return disease[r];
}
function ConsoleRandomDate() {
    var maxdaterandom = new Date().getTime();
    var mindaterandom = new Date(2018, 0, 1, 8).getTime();
    var randomdate = getRandom(mindaterandom, maxdaterandom);
    var datestr = moment(randomdate).format("YYYY-MM-DD");
    return datestr;
}


function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var bool=new Array(true,true,false,false,false,false)
var speard = new Array( "腮腺炎","下呼吸道感染","流行性感冒","麻疹","非典型肺炎",
"乙型肝炎","破伤风","狂犬病","百日咳")
fs.readFile(file, 'utf-8', function (err, data) {
  if (err) {
    console.log(`文件读取失败`)
  } else {
    modelData = JSON.parse(data)
    for(var i=0;i<modelData.length;i++){
        var d = getDisease();
        var patient = new patient_info({
            patient_id:"20200"+i.toString(),
            patient_name:getName(),
            patient_geo:modelData[i]["geometry"],
            disease_kind:d,
            IsgetWell:bool[Math.floor(Math.random()*3)],
            spearding:speard.indexOf(d)>-1? true :false,
            onceagain:bool[Math.floor(Math.random()*5)+1],
            datatime:new Date(ConsoleRandomDate())
        })
        patient.save(function(err){
            if(err){
                console.log(err);
            }})
    }
  }
});
console.log("finsh")