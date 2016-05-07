/**
 * Created by xiaotian on 16/3/26.
 */
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
var handlebars = require('express-handlebars');
var lessMiddleware = require("less-middleware");
var bodyParser     =  require("body-parser");

var UserController = require("./controller/userController").modelInfo;
var CategoryController = require("./controller/categoryController").modelInfo;
var UploadController = require("./controller/uploadController").modelInfo;


var fs = require('fs');


//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/seller');

app.get('/detail', function(req, res){
    res.render('detail');
});

app.use( bodyParser.urlencoded({ extended: true })); // json格式解析

//用户注册
app.post('/register', UserController.onRegister);

//用户登录
app.post('/login', UserController.onLogin);

//获取首页左侧类目信息
app.get('/', CategoryController.getCategoryList);

//获取主类目信息
app.post("/getMainCategoryList",  CategoryController.getMainCategoryList);

//获取子类目信息
app.post("/getSubCategoryList", CategoryController.getSubCategoryList);

//图片上传
app.post("/uploadPicture", UploadController.upload);

app.get("/public/upload/:filename",function(req, res){
    var fileName = req.params.filename;
    fs.readFile(__dirname+"/public/upload/"+fileName,'binary',function(err, file) {
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.write(file, 'binary');
        res.end();
    });
});


app.set('views', __dirname + '/views');//__dirname表示当前路径 设置模板的目录

app.engine('hbs', handlebars({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');


app.use(lessMiddleware(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
    console.log("sever start on port 3000!");
});