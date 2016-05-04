/**
 * Created by xiaotian on 16/3/26.
 */
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var handlebars = require('express-handlebars');
var lessMiddleware = require("less-middleware");

var UserModel = require("./controller/userController");
var UserModelInfo = UserModel.modelInfo;

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/seller');

UserModelInfo.onRegister();

app.get('/detail', function(req, res){
    res.render('detail');
});

app.get('/register', function(req, res){
    var ajaxTest={
        tips:"you are not alone"
    };
    res.send(ajaxTest);
});

app.get('/', function (req, res) {
    var data =
    {
        categoryList: [
            {
                categoryName: "跳蚤市场",
                itemList: [
                    {
                        name: "电脑",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "手机",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "电器",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "健身器",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "书籍",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "化妆品",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "箱包",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "鞋帽",
                        link: "http://www.1688.com"
                    },

                ]
            },
            {
                categoryName: "代步工具",
                itemList: [
                    {
                        name: "摩托车",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "电动车",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "自行车",
                        link: "http://www.1688.com"
                    },
                ]
            },
            {
                categoryName: "住房信息",
                itemList: [
                    {
                        name: "转租",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "求租",
                        link: "http://www.1688.com"
                    }
                ]
            },
            {
                categoryName: "兼职招聘",
                itemList: [
                    {
                        name: "家教",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "促销",
                        link: "http://www.1688.com"
                    },
                    {
                        name: "网页设计"
                    }
                ]
            },
            {
                categoryName: "物品交换",
                itemList: [
                    {
                        name: "物品交换",
                        link: "http://www.1688.com"
                    }
                ]
            },

        ]
    };

    res.render('index', data);
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

//app.use(express.static(__dirname + '/public'));


app.listen(3000, function () {
    console.log("sever start on port 3000!");
});