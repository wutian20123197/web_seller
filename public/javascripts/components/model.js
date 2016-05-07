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
                data: params,
                success: function(data) {
                    if(data.code === 200){
                        fn(data);
                    }else {
                        Dialog.notify(data.message, 'error', 3);
                        return false;
                    }
                },
                error: function() {
                    alert("系统错误");
                }
            });
        }
    };

    return model;
});
