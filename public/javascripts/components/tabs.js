/**
 * 选项卡组件
 * Created by wutian on 2016/5/1.
 */
define("tabs",[
    'jquery'
], function($){
    var config = {
        id: "#tabs-wrapper", //实例化组件的id,
        tabs: ".tab-item",
        start: 0, //tab 默认选中第几个
        tabContentItem: ".tab-content-item",
        tabCurrent: "tab-current",
        tabContentCurrent: "tab-content-current"
    };

    var $root, $tabs, $tabContents;
    var exports = {
        init: function(innerConfig){
            $.extend(config, innerConfig);
            $root = $(config.id);
            $tabs = $root.find(config.tabs);
            $tabContents = $root.find(config.tabContentItem);
            this.bindEvents();
        },

        selectTabs: function(index) {
            this.handlers.selectDefaultTabs(index);
        },

        handlers: {
            /**
             * 改变tab选项样式
             */
            changeTabs : function(){
                var $this = $(this);
                $this.addClass(config.tabCurrent)
                    .siblings()
                    .removeClass(config.tabCurrent);

                var index = $this.index();
                exports.handlers.showContent(index);
            },
            /**
             * 显示对应的tab选项卡的内容
             * @param index
             */
            showContent: function(index){
                $tabContents.eq(index)
                    .addClass(config.tabContentCurrent)
                    .siblings()
                    .removeClass(config.tabContentCurrent);
            },

            /**
             * 选中默认选项卡
             */
            selectDefaultTabs: function(index){
                $tabs.eq(index)
                    .addClass(config.tabCurrent)
                    .siblings()
                    .removeClass(config.tabCurrent);
                exports.handlers.showContent(index);
            }
        },
        bindEvents: function(){
            var handlers = this.handlers;
            $tabs.bind('click', handlers.changeTabs)
        }
    };

    return exports;
});