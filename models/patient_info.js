const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = require('../tools/connect.js')

mongoose.connect(url, {useNewUrlParser: true});

var patient_schema = new Schema({
    patient_id:String,       
    patient_name:String,     
    patient_geo:Object,        //发病地点
    patient_way:Array,          //一天内活动轨迹
    disease_kind:Array,
    IsgetWell:{type:Boolean,default:false},     //是否好转
    spearding:{type:Boolean,default:false},     //是否具有传染性
    onceagain:{type:Boolean,default:false},     //是否是复发
    datatime:{type:Date,default:Date.now(),get: v => moment(v).format('YYYY-MM-DD')}     //发病日期
},{versionKey: false},{ useUnifiedTopology: true });


var patient_info=mongoose.model('patient_info', patient_schema);

module.exports=patient_info;