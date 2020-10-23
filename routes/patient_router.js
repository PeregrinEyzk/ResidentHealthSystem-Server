const express = require('express')
const patient_info = require('../models/patient_info')
const patientApp = express()
const cors = require('cors')

var myDate = new Date();
var storedate = (myDate.getMonth()+1).toString()+myDate.getDate().toString();
var count =1;


patientApp.use(cors());//允许跨域访问

//返回id信息和坐标信息
patientApp.get('/find',function(req,res,next){
    patient_info.find({'IsgetWell':false},['patient_id','patient_geo.coordinates'],function(err,data){
        if(err) return next(err)
        res.json(data)
    })
})

//返回表格数据，根据page和pagesize返回指定数量的页面
patientApp.post('/table',function(req,res,next){
    var page = Number(req.body.page)||1;
    var pagesize = Number( req.body.pagesize);
    patient_info.find({},['patient_id','patient_name','disease_kind','IsgetWell','spearding','onceagain','datatime'])
    .skip((page-1)*pagesize).limit(pagesize).exec(function(err,data){
        if(err) return next(err)
        res.json(data)
    })
})

//查询治愈的总人数
patientApp.get('/wellcount',function(req,res,next){
    patient_info.find({'IsgetWell':true}).count(function(err,data){
        if(err) return next(err)
        res.json(data)
    })
})

//患者人数
patientApp.get('/patientcount',function(req,res,next){
    patient_info.find({'IsgetWell':false}).count(function(err,data){
        if(err) return next(err)
        res.json(data)
    })
})
//删除数据
patientApp.put('/todelete',function(req,res,next){
    patient_info.findOneAndDelete({'patient_id':req.body.item},function(err,data){
        if(err) return next(err)
        res.json({msg:"sucessful",data:data})
    })
})

//保存数据
patientApp.post('/creat',function(req,res,next){
    patient_info.create({
        patient_id:"202010"+storedate+count,       
        patient_name:req.body.patient_name, 
        disease_kind:req.body.diseasename,
        IsgetWell:req.body.IsgetWell,     //是否好转
        spearding:req.body.spearding,     //是否具有传染性
        onceagain:req.body.onceagain    //是否是复发
    },function(err,data){
        if(err) return next(err)
        count++;
        res.json({msg:"sucessful",
    data:data})
    })
})


module.exports=patientApp;