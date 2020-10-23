const express = require('express')
const clinic = require('../models/clinic')
const clinicApp = express()
const cors = require('cors')

clinicApp.use(cors());
clinicApp.get('/:ID',function(req,res,next){
    clinic.findOne({ID:req.params.ID},function(err,data){
        if(err) return next(err)
        res.json(data)
    })
})
clinicApp.get('/search/:ID',function(req,res,next){
    clinic.find({ID:req.params.ID},['geometry.coord'],function(err,data){
        if(err) return next(err)
        res.json(data)
    })
})

module.exports=clinicApp;