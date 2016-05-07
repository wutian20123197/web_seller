/**
 * Created by wutian on 2016/5/5.
 */
var userModel = require('../model/category_model').model;

var exp = {
    errMessage: {code: -100, message: "系统错误"},

    successMessage: {code: 200, message: "请求成功", data: {}},

    getCategoryList: function (req, res) {
        userModel.find({}, function (err, info) {
            res.render('index', {categoryList: info});
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