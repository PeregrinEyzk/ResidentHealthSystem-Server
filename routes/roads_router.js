const express = require('express')
const roadsApp = express()
const cors = require('cors')
var MongoClient = require('mongodb').MongoClient;   //使用MongoDB自带的js驱动程序
var url = "mongodb://localhost:27017";

roadsApp.use(cors());

roadsApp.get('/:roadsname',function(req,res,next){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("my_database");
        dbo.collection('roads_info').find(
            {"properties.NAME_CHN":{$regex:req.params.roadsname}},  //正则表达式
            {projection:{"geometry.coordinates":1}})
            .limit(1)
            .toArray(function(err, result) {
            if (err) throw err;   //抛出错误
            res.json(result)
        db.close();
      });
      });
})


module.exports=roadsApp