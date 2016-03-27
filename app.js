/**
 * Created by xiaotian on 16/3/26.
 */
var express = require('express');
var app = express();
var path = require('path');
var handlebars = require('express-handlebars');
var lessMiddleware = require("less-middleware");


app.get('/', function (req, res) {
    res.render('test');
});

app.set('views', __dirname + '/views');//__dirname表示当前路径 设置模板的目录

app.engine('hbs', handlebars({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(lessMiddleware(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static(__dirname + '/public'));


app.listen(3000, function(){
    console.log("sever start!");
});