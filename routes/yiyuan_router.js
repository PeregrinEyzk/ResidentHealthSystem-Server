const express = require('express')
const yiyuan_info = require('../models/yiyuan_info')
const yiyuanApp = express()
const cors = require('cors')
yiyuanApp.use(cors());   //允许跨域访问


yiyuanApp.get('/:ID',function(req,res,next){
    yiyuan_info.findOne({ID:req.params.ID},function(err,data){
        if(err) return next(err)
        res.json(data)
    })
})

yiyuanApp.get('/search/:ID',function(req,res,next){
    yiyuan_info.find({ID:req.params.ID},['geometry.coord'],function(err,data){
        if(err) return next(err)
        res.json(data)
    })
})

module.exports=yiyuanApp;