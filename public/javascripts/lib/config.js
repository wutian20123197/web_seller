/**
 * 配置requirejs
 */
requirejs.config({
    baseUrl: "javascripts/lib",
    paths: {
        "jquery": "jquery.min",
        "tabs" : "../components/tabs", //选项卡组件
        "dialog": "../components/alertify", //提示框组件
        'template': '../components/template' //art模板引擎组件
    }
});