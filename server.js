const express = require('express')
const bodyParser = require('body-parser')
//const update_beds = require('./tools/yiyuan_update');
const app = express()
const port = 3000

//对内容进行格式化
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({ extended: false}));

//各路由模块
//医院信息
app.use('/yiyuan', require('./routes/yiyuan_router'));
//卫生服务站信息
app.use('/clinic', require('./routes/clinic_router'));
//评论信息
app.use('/content',require('./routes/content_router'));
//病人地理信息
app.use('/patient',require('./routes/patient_router'));
//返回数据库的地理信息页面
app.use('/roadsfind',require('./routes/roads_router'));

//静态资源
app.use(express.static('assets'))
app.use(express.static('assets/covid-19-spread-simulator/src'))


app.use('/covid19',function(req,res,next){
    res.sendFile(__dirname+'/assets/covid-19-spread-simulator/src/index.html')
})

//错误页面
app.use(function (req, res) {
    res.send('404 not found');
});



//setInterval(()=>update_beds(),1000*60*5);   异步执行出现问题 暂时未修复

//执行端口
app.listen(port, () => console.log(`App listening on port ${port}!`))