///将.geojson的坐标信息和属性数据存入mongodb的工具，并以地理坐标字段进行地理数据编码

const fs = require('fs');
var MongoClient = require("mongodb").MongoClient;
const dbname = "ResidentHealthSystem";
const collectionname = "Hospital";

var DB_URL = "mongodb://localhost:27017/"+dbname;
filepath='\\data\\hospital.geojson';
function insertData(path)
{
    let rawdata = fs.readFileSync(path,'utf-8');
    let hospital = JSON.parse(rawdata);
    var datas=[];
    for(var i =0;i<hospital.features.length;i++){
        if(hospital.features[i].geometry===null) continue;
        else{
        var data={
            geometry:hospital.features[i].geometry,
            properties:hospital.features[i].properties
        }
        datas.push(data);}
    }
    MongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
    console.log("数据库已创建!");
    var db = client.db(dbname);
    for(var n =0;n<datas.length;n++){
        db.collection(collectionname).updateOne(datas[n].geometry,{$set:datas[n]},{upsert:true})}    //如果数据库不存在同一地点的记录，则插入，否则更新
        db.collection(collectionname).createIndex( { geometry : "2dsphere" } )   //为点坐标创建地理索引
    client.close();
})
}

module.exports= insertData;
