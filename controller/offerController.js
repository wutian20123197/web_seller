/**
 * Created by wutian on 2016/5/7.
 */
var offerModel = require('../model/offer_details_model').model;
var userModel = require('../model/user_model').user;
var mongoose = require('mongoose');

var exp = {

    errMessage: {code: -100, message: "系统错误"},

    successMessage: {code: 200, message: "请求成功", data: {}},

    /**
     * 新增offer
     */
    addOffer: function(req, res){
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
           console.log(info);
           return info;
        });
    },

    /**
     * 获取offer详情
     */
    getOfferDetail: function(req, res){
        var offerId = mongoose.Types.ObjectId(req.params.id);
        var conditions = {_id: offerId};
        offerModel.findOne(conditions, function(err, info){
            res.render('detail',info);
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
        console.log(req.body);
        offerModel.find( req.body, function(err, info){
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
     * 新增收藏offer
     */
    addCollectionOffer: function(req, res){
        //查询用户是否已经收藏该商品
        var account =req.session.account;
        var offerId = mongoose.Types.ObjectId(req.body.id);
        var params = {
            account: 807572915
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
                userModel.update({account:807572915 },{$set:{collect_list: collectList}},function(err, info){
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
    }
};

exports.modelInfo = exp;
