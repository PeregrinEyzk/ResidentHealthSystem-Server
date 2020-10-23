const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = require('../tools/connect.js')

mongoose.connect(url, {useNewUrlParser: true});

var departs_schema = new Schema({
    DepartIntro: String,
    DepartName: String
},{versionKey: false},{ useUnifiedTopology: true });

var clinic_schema = new Schema({
    Address: String,
    Association: String,
    Beds: String,
    Bus: String,
    Equipment: String,
    FamilyDoctorPhone: String,
    Groups: String,
    HospName:String,
    HospWebAddr: String,
    ID: String,
    InsureTypeCoverage: String,
    Intro: String,
    IsVaccination: Boolean,     //是否提供注射疫苗服务
    Kind: String,               //性质
    OrgType: {type:String,default:"卫生服务站"},
    Phone: String,
    Picture: String,
    geometry:Object,
    X: Number,
    Y: Number,
    Zone:{type:String,default:"姑苏区"},
    time: String,
    clinic_url:String,
    departs:[departs_schema]
},{versionKey: false},{ useUnifiedTopology: true });


var clinic_info=mongoose.model('clinic_info', clinic_schema);

module.exports = clinic_info;