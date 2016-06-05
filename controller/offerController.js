/**
 * Created by wutian on 2016/5/7.
 */
var offerModel = require('../model/offer_details_model').model;
var userModel = require('../model/user_model').user;
var messageModel = require('../model/message_model').model;
var mongoose = require('mongoose');
var moment = require("momentjs");

var exp = {

    errMessage: {code: -100, message: "系统错误"},

    successMessage: {code: 200, message: "请求成功", data: {}},

    /**
     * 新增offer
     */
    addOffer: function(req, res){
        req.body.account = req.body.isLogin;
        offerModel.create(req.body, function(err){
            if(err){
                res.send(exp.errMessage);
            }else{
                res.send(exp.successMessage);
            }
        });
    },
    /**
     * 获取每个楼层的offer
     * 默认推荐最近发布的六条offer
     */
    getOfferListByFloor: function(id){
        var conditions = {main_category: 1};
        offerModel.find(conditions, function(err, info){
           return info;
        });
    },

    /**
     * 获取offer详情
     */
    getOfferDetail: function(req, res){
        var offerId = mongoose.Types.ObjectId(req.params.id);
        var conditions = {_id: offerId};
        var data = {};
        offerModel.findOne(conditions, function(err, info){
            data.offerInfo = info;
            var sub_category = info.sub_category;
            //格式化日期
            data.normal_time = moment(info.create_time + "").format('YYYY-MM-DD');
            //将商品浏览数加一

            offerModel.update(conditions,{$inc:{view_num: 1}}, function(err, offer){
                //获取商品发布者详细信息
                userModel.findOne({account:info.account},function(err, userInfo){
                     data.userInfo = userInfo;
                     data.name = userInfo.nick_name || userInfo.account;
                     //获取留言列表
                    messageModel.find({offer_id: offerId}, function(err, messageList){
                        data.messageList = messageList;
                        data.messageLength = messageList.length;
                        //获取猜你喜欢列表
                        offerModel.find({sub_category: sub_category},function(err, likeList){
                            data.likeList = likeList;
                            res.render('detail',data);
                        }).sort({ view_num: -1}).limit(4);
                    });
                });
            });
        });
    },

    /**
     * 显示category页面
     */
    renderCategoryPage: function (req, res) {
        res.render('category',{categoryName: req.params.subCategory});
    },

    /**
     * 通过次级分类获取offerList
     */
    getOfferListBySubCategoryName: function(req, res) {
        delete(req.body.isLogin);
        var offer_title = req.body.offer_title;
        //搜索
        if(offer_title){
            req.body.offer_title = eval('/' + offer_title +'/');
        }

            offerModel.find(req.body,function(err, info){
                if(err){
                    res.send(exp.errMessage);
                }else{
                    var ans = {
                        code: 200,
                        offerList: info
                    };
                    res.send(ans);
                }
            });
    },

    /**
     * 下架自己的商品 下架后将不可恢复 请谨慎处理
     * @param req
     * @param res
     */
    dropDownOffer: function(req, res){
        var account =req.session.account;
        var offerId = mongoose.Types.ObjectId(req.body.id);
        var conditions = {
            account: account,
            _id: offerId
        };
       offerModel.update(conditions,{$set: {state: 0}}, function(err, info){
           if(err){
               exp.errMessage.message = "下架失败";
               res.send(exp.errMessage);
           }else{
               exp.successMessage.message = "下架成功";
               res.send(exp.successMessage);
           }
       });
    },

    /**
     * 新增收藏offer
     */
    addCollectionOffer: function(req, res){
        //查询用户是否已经收藏该商品
        var account =req.body.isLogin;
        var offerId =req.body.id;
        var params = {
            account: account
        };
        userModel.findOne(params, function(err, info){
            //还未收藏该商品
            var collectList = info.collect_list || [];
            var isCollected = false;
            collectList.forEach(function(v, i){
                if(v == offerId){
                    isCollected = true;
                }
            });
            if(!isCollected){
                collectList.push(offerId);
                console.log(collectList);
                userModel.update({account:account },{$set:{collect_list: collectList}},function(err, info){
                   //商品收藏数增加
                    offerModel.update({_id: offerId},{$inc:{collect_num: 1}},function(err, info){
                        exp.successMessage.message = "收藏成功";
                        res.send(exp.successMessage);
                    });
                });
            }else{
                //已经收藏该商品
                exp.errMessage.message = "商品已收藏，请不要重复收藏该商品";
                res.send(exp.errMessage);
            }

        });

        ////获取商品详情
        //var offerId = mongoose.Types.ObjectId(req.body.id);
        //var conditions = {_id: offerId};
        //console.log(offerId);
        //offerModel.findOne(conditions, function(err, info){
        //    exp.successMessage.data = info;
        //    res.send(exp.successMessage);
        //});
    },

    /**
     * 举报商品
     * @param req
     * @param res
     */
    reportOffer: function(req, res){
        var offerId = mongoose.Types.ObjectId(req.body.id);
        offerModel.update({_id:offerId},{$set: {is_reported: true}}, function(err, info){
            if(!err){
                exp.successMessage.message = "举报成功，管理员将审核该商品是否违规";
                res.send(exp.successMessage);
            }else{
                exp.errMessage.message = "举报失败";
                res.send(exp.errMessage);
            }
        });
    },

    //回绝举报
    refuseReport: function(req, res){
        var offerId = mongoose.Types.ObjectId(req.body.id);
        offerModel.update({_id:offerId},{$set: {is_reported: false}}, function(err, info){
            console.log(info);
            if(!err){
                exp.successMessage.message = "回绝举报成功";
                res.send(exp.successMessage);
            }else{
                exp.errMessage.message = "回绝举报失败";
                res.send(exp.errMessage);
            }
        });
    },

    /**
     * 搜索关键词
     */
    searchOfferByKeywords: function(req, res){
        res.render('category',{categoryName: req.params.subCategory});
    }
};

exports.modelInfo = exp;
