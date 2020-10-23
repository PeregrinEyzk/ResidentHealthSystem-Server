const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = require('../tools/connect.js')  //引入统一的连接数据

mongoose.connect(url, {useNewUrlParser: true});

var beds_schema = new Schema({
    "ResName": String,   //科室名
    "WarnningLevel":{type:Number,enum:[1,2,3],default:1},   //1表示床位充足，2表示床位较少，3表示床位紧张
    "TotalNum": Number,//-1表示该科室没有床位，即不需要因此病住院
    "LeftNum": Number,//剩余床位，-1表示没有床位，所以也不会有剩余
    "childRes": Array, //该科室的子科室
    "DepartIntro": String,   //科室介绍
    "Phone": String,     //科室电话
},{versionKey: false},{ useUnifiedTopology: true });

var yiyuan_schema = new Schema({

    "ID":String,
    "HospName":String,   //医院名称
    "Grade":String,      //医院等级
    "Kind":String,       //医院性质
    "Address": String,   //地址
    "Phone": String,     //联系电话
    "Intro": String,     //医院介绍
    "Way": String,       //交通
    "HospWebAddr": String,//医院官网
    "SortCode": String,   //短码
    "Zone": String,       //所属市区
    "Classes": String,    //等级
    "Groups":String,      //组成
    "geometry":Object,       //用于数据库构建地理索引
    "X": Number,          
    "Y": Number,
    "RequestPhone": String,  //投诉电话
    "departscount":Number,  //科室数量
    "departs":Array,         //科室
    "hos_url":String,        //存储用于爬虫的api接口
    "img_url":String,        //医院照片
    "beds":[beds_schema],    //床位情况
    "update_time":{type:Date,default:Date.now()}   //床位情况的更新时间
},{versionKey: false},{ useUnifiedTopology: true });


var yiyuan_info=mongoose.model('yiyuan_info', yiyuan_schema);

module.exports = yiyuan_info;
