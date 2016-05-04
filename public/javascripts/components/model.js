/**
 * 封装本地ajax请求
 * Created by wutian on 2016/5/4.
 */
define('model', function(){
    //ajax请求同一参数配置列表
    var urlConfig = [
        {
            name: "do_register",
            url: "/register"
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
            var url,isPost = false;
            $.each(urlConfig, function(i, v){
               if(v.name === name){
                   url = v.url;
                   type = v.type || "get";
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
                    fn(data);
                },
                error: function() {
                    alert("系统错误");
                }
            });
        }
    };

    return model;
});
