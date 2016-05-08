/**
 * Created by wutian on 2016/5/1.
 */
require(['../lib/config'],function(){
    require([
        'jquery',
        "tabs",
        '../pages/login',
        '../pages/publish_offer'
    ],function($, Tabs, Login, Publish){
        var config = {
            itemPic: ".item",
            current: "current",
            macPic: ".max-pic"
        };

        var $itemPic, $macPic;
        var exports = {
            init: function(){
                $itemPic = $(config.itemPic);
                this.initEvents();
            },

            initEvents: function(){
                Tabs.init({id: "#detail-tab-wrapper"});
                Login.init();
                Publish.showPublishDialog();
                $itemPic.bind('click', this.changePics);
                $macPic = $(config.macPic)
            },

            changePics: function(){
                var me = $(this);
                me.addClass(config.current)
                    .siblings()
                    .removeClass(config.current);
               var currentImg = me.find("img").attr("src");
                $macPic.find("img").attr("src", currentImg);
            }
        };

        exports.init();
    });
});