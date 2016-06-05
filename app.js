/**
 * Created by xiaotian on 16/3/26.
 */
require('tingyun');
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
var OfferDetailController = require("./controller/offerController").modelInfo;
var MessageController  = require("./controller/messageController").modelInfo;


/*设置session*/
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
app.use(session({
        secret: '12345',
         name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: {maxAge: 800000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
        resave: false,
       saveUninitialized: true
     }));

var fs = require('fs');


//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/seller');

//获取商品详细信息
app.get('/detail/:id', OfferDetailController.getOfferDetail);

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

//发布offer
app.post("/addOffer",OfferDetailController.addOffer );

//子类目页面
app.get("/category/:type/:subCategory",OfferDetailController.renderCategoryPage);

//获取子类目下面的offerList列表
app.post("/categoryOfferList",OfferDetailController.getOfferListBySubCategoryName);

//个人信息页
app.get("/userDetailInfo", UserController.userMainPage);

//更新用户信息
app.post('/updateUserInfo', UserController.updateUserInfo);

//获取用户登录情况
app.get("/getUserIsLogin",UserController.getUserName);

//修改密码
app.post("/updatePassword", UserController.updateUserPassword);

//收藏商品
app.post("/collectOffer", OfferDetailController.addCollectionOffer);

//举报商品
app.post("/reportOffer", OfferDetailController.reportOffer);

//获取我的收藏列表
app.post("/getCollectList", UserController.getMyCollects);

//移除收藏夹中的商品
app.post("/removeMyCollectOffer", UserController.removeCollectedOffer);

//下架我的商品
app.post("/dropDownOffer", OfferDetailController.dropDownOffer);

//添加留言
app.post("/addMessage", MessageController.addMessage);

//系统管理员界面
app.get('/admin',UserController.adminIndex );

//商品检索
app.get("/search/:type/:keywords", OfferDetailController.searchOfferByKeywords);

//回绝举报
app.post("/refuseReport", OfferDetailController.refuseReport);

//加入黑名单 并下架用户发布的 全部商品
app.post("/addToBlackList", UserController.dropDownOfferAndAddToBlackList);

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