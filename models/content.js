const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = require('../tools/connect.js')

mongoose.connect(url, {useNewUrlParser: true});

var content_schema = new Schema({
    user_id: String,
    author: String,
    avatar: String,
    yiyuan_id: String,
    star_num: {type:Number,max:5,min:0},
    content: String,
    datetime:Date
},{versionKey: false},{ useUnifiedTopology: true });


var content_info=mongoose.model('content_info', content_schema);

module.exports=content_info;
