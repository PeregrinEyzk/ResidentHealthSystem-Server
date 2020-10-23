var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
function roadFind(text){
    var getData;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("my_database");
        dbo.collection('roads_info').find({"properties.NAME_CHN":{$regex:text}},{projection:{"geometry.coordinates":1}}).limit(1).toArray(function(err, result) {
            if (err) throw err;
            getData = result;
        db.close();
      });
      });
    return getData;
}
module.exports=roadFind
