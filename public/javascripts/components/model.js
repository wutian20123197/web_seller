/**
 * 封装本地ajax请求
 * Created by wutian on 2016/5/4.
 */
define('model',[
    'dialog'
],function(Dialog){
    //ajax请求同一参数配置列表
    var urlConfig = [
        {
            name: "do_register",
            url: "/register",
            type: "post"
        },
        {
            name: "do_login",
            url: "/login",
            type: 'post'
        },
        {
            name: "get_main_category_list",
            url: '/getMainCategoryList',
            type: "post"
        },
        {
            name: "get_sub_category_list",
            url: '/getSubCategoryList',
            type: "post"
        },
        {
            name: "add_offer",
            url: "/addOffer",
            type: "post"
        },
        {
            name: 'get_offer_list_bysubcategory',
            url: "/categoryOfferList",
            type: "post"
        },
        {
            name: "get_user_is_login",
            url: "/getUserIsLogin"
        },
        {
            name: "update_user_info",
            url: "/updateUserInfo",
            type: "post"
        },
        {
            name: "update_user_password",
            url: "/updatePassword",
            type: "post"
        },
        {
            name: "collect_offer",
            url: "/collectOffer",
            type: "post"
        },
        {
            name: "report_offer",
            url: "/reportOffer",
            type: "post"
        },
        {
            name: "get_collect_list",
            url: "/getCollectList",
            type: "post"
        },
        {
            name: "remove_my_collect_offer",
            url: "/removeMyCollectOffer",
            type: "post"
        }
    ];

    var model = {
        /**
         * 发送ajax请求
         * @param name 请求名称
         * @param params 请求参数
         * @param fn 请求成功后的回调函数
         */
        getRequestByParams: function(name, params, fn){
            var url,isPost = false, type, dataType;
            $.each(urlConfig, function(i, v){
               if(v.name === name){
                   url = v.url;
                   type = v.type || "get";
                   dataType = v.dataType || "json";
               }
            });

            //TODO 上线后需要替换为线上地址
            var prefixUrl = "http://localhost:3000";
            url = prefixUrl + url;
            $.ajax({
                url: url,
                type: type,
                dataType: "json",
                data: this.deleteNullParams(params),
                success: function(data) {
                    if(data.code === 200){
                        fn(data);
                    }else {
                        Dialog.notify(data.message, 'error', 3);
                        return false;
                    }
                },
                error: function(err) {
                    alert("系统错误");
                    console.log(err);
                }
            });
        },

        /**
         * 删除空参数
         */
        deleteNullParams: function(params){
            for(var name in params){
                if(! params[name]){
                    delete  params[name];
                }
            }
            return params;
        }
    };

    return model;
});
