/**
 * Created by wutian on 2016/5/5.
 */
var categoryModel = require('../model/category_model').model;
var offerModel = require('../model/offer_details_model').model;
var userModel = require('../model/user_model').user;

var exp = {
    errMessage: {code: -100, message: "系统错误"},

    successMessage: {code: 200, message: "请求成功", data: {}},

    getCategoryList: function (req, res) {
        var i = 0;
        categoryModel.find({}, function (err, info) {
            //使用ES6 循环
            info.forEach(function(v, i){
                offerModel.find({main_category: v.categoryId, state: 1}, function(err, ans){
                    v.offerList = ans;
                    i++;
                    if(i == 4){
                        //根据用户兴趣 推荐相应商品信息
                        var account = req.session.account || "807572915";
                        userModel.findOne({account: account}, function(err, user){
                            var interest = user.interest_list;
                            console.log(interest);
                            offerModel.find({sub_category: { "$in":interest}}, function(err, intereRecomend){
                                res.render('index', {categoryList: info, recommend: intereRecomend});
                            }).sort({ view_num: -1}).limit(10);
                        });
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
        categoryModel.find({}, function (err, info) {
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
        var categoryId = req.body.categoryId;
        categoryModel.findOne({categoryId: categoryId}, function(err, info){
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