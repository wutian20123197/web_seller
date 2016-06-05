/**
 * Created by wutian on 2016/5/3.
 */
var userModel = require('../model/user_model').user;
var offerModel = require('../model/offer_details_model').model;
var messageModel = require('../model/message_model').model;
var mongoose = require('mongoose');
var exp = {
    /**
     * 用户登录
     */
    onLogin: function (req, res) {
        var ans;
        req.body.password = exp.md5(req.body.password); //使用MD5加密密码
        userModel.findOne(req.body, function (err, info) {
            if (err) {
                ans = {code: -100, message: "系统错误"};
            } else {
                if (!info) {
                    ans = {code: -100, message: "用户名密码不匹配"};
                } else {

                    //交易是否为黑名单用户
                    if (!info.state) {
                        ans = {code: -100, message: "黑名单用户不具有登录权限！"};
                        res.send(ans);
                        return false;
                    }
                    var name = info.nick_name || info.account;
                    var headImg = info.head_img;
                    ans = {code: 200, message: "", data: {account: req.body.account, userName: name, headImg: headImg}};
                    req.session.account = req.body.account;
                }
            }
            res.send(ans);
        });
    },

    md5: function (data) {
        var Buffer = require("buffer").Buffer;
        var buf = new Buffer(data);
        var str = buf.toString("binary");
        var crypto = require("crypto");
        return crypto.createHash("md5").update(str).digest("hex");
    },
    /**
     * 用户注册
     */
    onRegister: function (req, res) {
        var account = req.body.account;
        var password = exp.md5(req.body.password); //使用MD5加密密码

        //首先查找该账号是否被注册
        userModel.findOne({account: account}, function (err, info) {
            if (info) {
                res.send({code: -100, message: "该账号已被注册，更换账号重新注册"});
            } else {
                userModel.create({account: account, password: password}, function (err) {
                    if (err) {
                        ans = {code: -100, message: "注册失败"};
                    } else {
                        ans = {code: 200, message: ""};
                    }
                    res.send(ans);
                });
            }
        });
    },

    /**
     * 获取用户名
     */
    getUserName: function (req, res) {
        var account = req.session.account;
        if (account) {
            res.send({code: 200, isLogin: true, account: account});
        } else {
            res.send({code: 200, isLogin: false, account: account});
        }
    },

    /**
     * 更新用户信息
     */
    updateUserInfo: function (req, res) {
        var account = req.body.account;
        userModel.update({account: account}, {$set: req.body}, function (err, info) {
            if (err) {
                res.send({code: -100, message: "系统错误"});
            } else {
                res.send({code: 200, data: {}});
            }
        });
    },

    /**
     * 获取用户收藏夹信息
     */
    getMyCollects: function (req, res) {
        var account = req.session.account;
        var collectIds = [];
        userModel.findOne({account: account}, function (err, info) {
            var list = info.collect_list || [];
            offerModel.find({_id: {$in: list}}, function (err, ans) {
                res.send({code: 200, data: ans});
            });
        });
    },

    /**
     * 用户详情页 获取所有需要渲染的数据
     */
    userMainPage: function (req, res) {
        var account = req.session.account;
        var Data = {};
        userModel.findOne({account: account}, function (err, userInfo) {
            var list = userInfo.collect_list || [];
            Data.userInfo = userInfo;
            offerModel.find({_id: {$in: list}}, function (err, ans) {
                Data.collectList = ans;
                //获取用户发布的商品
                offerModel.find({account: account, state: 1}, function (err, myOffers) {
                    Data.myOffers = myOffers;
                    //获取个人消息
                    messageModel.find({to_id: account, state: 0}, function (err, messages) {
                        Data.messages = messages;
                        res.render("user_detail_info", Data);
                    });
                });

            });
        });
    },

    /**
     * 移除收藏的offer
     */
    removeCollectedOffer: function (req, res) {
        var account = req.session.account;
        var offerId = mongoose.Types.ObjectId(req.body.id);
        userModel.findOne({account: account}, function (err, info) {
            var collectList = info.collect_list || [];
            collectList.pop(offerId);
            userModel.update({account: account}, {$set: {collect_list: collectList}}, function (err, info) {
                if (!err) {
                    res.send({code: 200, message: "商品移除成功"});
                } else {
                    res.send({code: -100, message: "商品移除失败"});
                }
            });
        });
    },

    //显示系统管理员界面
    adminIndex: function (req, res) {
        if( req.session.account == "admin"){
        //获取被举报商品列表
        offerModel.find({is_reported: true, state: 1}, function (err, info) {
            res.render("admin", {layout: null, reportList: info});
        });

        }
    },

    //将用户加入黑名单 并下架其发布的所有商品
    dropDownOfferAndAddToBlackList: function (req, res) {
        var account = req.body.account;
        userModel.update({account: account}, {$set: {state: 0}}, function (err, info) {
            offerModel.update({account: account}, {$set: {state: 0}}, function (err, info) {
                if (!err) {
                    res.send({code: 200, message: "操作成功"});
                } else {
                    res.send({code: -100, message: "操作失败"});
                }
            });
        });
    },

    updateUserPassword: function (req, res) {
        var account = req.body.account;
        var password = exp.md5(req.body.password);
        var newpassword = exp.md5(req.body.newpassword);
        userModel.findOne({account: account, password: password}, function (err, info) {
            if (info) {
                userModel.update({account: account}, {$set: {password: newpassword}}, function (err, info) {
                    if (!err) {
                        res.send({code: 200, message: "修改成功"});
                    }
                });
            } else {
                res.send({code: -100, message: "密码错误"});
            }
        });

    }
};

exports.modelInfo = exp;
