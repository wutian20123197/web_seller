/**
 * Created by wutian on 2016/5/7.
 */
var offerModel = require('../model/offer_details_model').model;

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
    }
};

exports.modelInfo = exp;
