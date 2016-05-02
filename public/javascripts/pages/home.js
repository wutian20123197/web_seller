/**
 * Created by xiaotian on 16/4/9.
 */
require(['../lib/config'],function(){
    require([
        'jquery',
        'dialog',
        'template',
        '../pages/publish_offer'
    ],function($, Dialog, Template){
        var pageConfig = {
            ImgBox: "#img-box",
            ImgBoxItem: "#img-box li",
            TabNavLi: ".tab-nav li",
            Pre: ".pre",
            Next: ".next",
            SlBanner: "banner-wrapper",
            publishBtn: ".btn-publish"
        };
        var index = 0;
        var $imgBox = $(pageConfig.ImgBox);
        var $imgBoxItem = $(pageConfig.ImgBoxItem);
        var $tabNavLi = $(pageConfig.TabNavLi);
        var $next = $(pageConfig.Next);
        var $pre = $(pageConfig.Pre);
        var slBanner = document.getElementById(pageConfig.SlBanner);
        var timmer, $publishBtn = $(pageConfig.publishBtn);
        var bannerLength = 0; //轮播图图片的数目

        function initEvent(){
            bannerLength = $imgBoxItem.length;
            setBannerTime();
            preBanner();
            nextBanner();
            panelTabHover();
            showPublishDialog();
        }

        var setBannerTime = function(){
            timmer = setInterval(controlImg,5000);
        };

        /**
         * 获取下一个banner
         */
        function nextBanner() {
            $next.click(function(){
                index++;
                index < bannerLength || (index = 0);
                getCurrentTab();
            });
        }

        /**
         * 获取上一个banner
         */
        function preBanner() {
            $pre.click(function(){
                index--;
                index >= 0 || (index = bannerLength - 1);
                getCurrentTab();
            });
        }

        function getCurrentTab() {
            clearInterval(timmer);
            $imgBoxItem.eq(index).fadeIn(300).siblings().fadeOut(300);
            $tabNavLi.eq(index).addClass('active').siblings().removeClass('active');
            changeBackgroundColor(index);
            timmer = setInterval(controlImg,3000);
        }

        function controlImg(){
            index++;
            index < bannerLength || (index = 0);
            $imgBoxItem.eq(index).fadeIn(250).siblings().fadeOut(250);
            movePanelTab(index);
            changeBackgroundColor(index);
        }

        function movePanelTab(index) {
            $tabNavLi.eq(index).addClass('active').siblings().removeClass('active');
        }

        function panelTabHover() {
            $tabNavLi.hover(function(){
                clearInterval(timmer);
                $(this).addClass('active').siblings().removeClass('active');
                index = $(this).index();
                $imgBoxItem.eq(index).fadeIn(300).siblings().fadeOut(300);
                changeBackgroundColor(index);
            },function(){
                timmer = setInterval(controlImg,3000);
            });
        }

        /**
         * 改变背景颜色
         */
        function changeBackgroundColor(index) {
            var className = "sl-bg-blue";
            switch (index){
                case 0:
                    className = "sl-bg-blue";
                    break;
                case 1:
                    className = "sl-bg-red";
                    break;
                case 2:
                    className = "sl-bg-gray";
                    break;
                case 3:
                    className = "sl-bg-black";
                    break;
                default :
                    break;
            }
            slBanner.className = className;
        }

        function showPublishDialog() {
            $publishBtn.click(function(){
                var data = {name:"wutian"};

                var html = Template('publish_offer', data);
                Dialog.defaults.transition = "zoom";
                Dialog.confirm()
                    .set({'labels':{ok:'发布', cancel:'取消'}, 'title':"text"})
                    .setContent(html)
                    .show();
            });
        }



        initEvent();
    });
});