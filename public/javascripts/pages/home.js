/**
 * Created by xiaotian on 16/4/9.
 */
require(['../lib/config'],function(){
    require(['jquery'],function($){
        var pageConfig = {
            ImgBox: "#img-box",
            ImgBoxItem: "#img-box li",
            TabNavLi: ".tab-nav li",
            Pre: ".pre",
            Next: ".next"
        };
        var index = 0;
        var $imgBox = $(pageConfig.ImgBox);
        var $imgBoxItem = $(pageConfig.ImgBoxItem);
        var $tabNavLi = $(pageConfig.TabNavLi);
        var $next = $(pageConfig.Next);
        var $pre = $(pageConfig.Pre);
        var timmer;
        var bannerLength = 0; //轮播图图片的数目

        function initEvent(){
            bannerLength = $imgBoxItem.length;
            setBannerTime();
            preBanner();
            nextBanner();
            panelTabHover();
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
            timmer = setInterval(controlImg,3000);
        }

        function controlImg(){
            index++;
            index < bannerLength || (index = 0);
            $imgBoxItem.eq(index).fadeIn(250).siblings().fadeOut(250);
            movePanelTab(index);
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
            },function(){
                timmer = setInterval(controlImg,3000);
            });
        }

        initEvent();

    });
});