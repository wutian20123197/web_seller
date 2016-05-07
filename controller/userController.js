/**
 * Created by wutian on 2016/5/3.
 */
var userModel = require('../model/user_model').user;
var express=require("express");
var app=express();
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(session({
    secret: 'web_seller',
    resave: false,
    saveUninitialized:false
}));

var exp = {



    /**
     * 用户登录
     */
    onLogin: function (req, res){
        var ans;
        console.log(req.session);
        console.log(req.body.account);
        userModel.findOne(req.body,function(err,info) {
            if(err){
                ans = {code: -100, message: "系统错误"};
            }else{
                if(!info){
                    ans = {code: -100, message: "用户名密码不匹配"};
                }else{
                   ans =  {code: 200, message: ""};
                    //req.session.account = 12312;
                }
            }
            res.send(ans);
        });
    },

    /**
     * 用户注册
     */
    onRegister: function (req, res){
        userModel.create(req.body, function(err){
            if(err){
                ans = {code: -100, message: "注册失败"};
            }
        });
        ans = {code: 200, message: ""};
        res.send(ans);
    }
};

exports.modelInfo = exp;
