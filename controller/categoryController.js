/**
 * Created by wutian on 2016/5/5.
 */
var userModel = require('../model/category_model').model;
var offerModel = require('../model/offer_details_model').model;

var exp = {
    errMessage: {code: -100, message: "系统错误"},

    successMessage: {code: 200, message: "请求成功", data: {}},

    getCategoryList: function (req, res) {
        var i = 0;
        userModel.find({}, function (err, info) {
            //使用ES6 循环
            info.forEach(function(v, i){
                offerModel.find({main_category: v.categoryId}, function(err, ans){
                    v.offerList = ans;
                    i++;
                    if(i == 5){
                        console.log(info[0].offerList);
                        res.render('index', {categoryList: info});
                    }
                }).sort({ create_time: -1}).limit(8);
            });
        });
    },

    /**
     * 获取主类目信息
     */
    getMainCategoryList: function (req, res) {
        //res.send(this.errMessage); //注意Node中this指向的是windows
        userModel.find({}, function (err, info) {
            if (err) {
                res.send(exp.errorMessages);
            } else {
                exp.successMessage.data = info;
                res.send(exp.successMessage);
            }
        });
    },

    /**
     * 获取子类目信息
     */
    getSubCategoryList: function(req, res){
        console.log(req.body);
        userModel.findOne(req.body, function(err, info){
            if (err) {
                res.send(exp.errorMessages);
            } else {
                exp.successMessage.data = info;
                res.send(exp.successMessage);
            }
        });
    }
};

exports.modelInfo = exp;