const express = require('express')
const content_info = require('../models/content')
const contentApp = express()
const cors = require('cors')

contentApp.use(cors());
contentApp.get('/:yiyuan_id',function(req,res,next){
    content_info.find({yiyuan_id:req.params.yiyuan_id},function(err,data){
        if(err) return next(err)
        res.json(data)
    }).limit(10)
})

module.exports=contentApp;