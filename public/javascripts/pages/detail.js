/**
 * Created by wutian on 2016/5/1.
 */
require(['../lib/config'],function(){
    require(['jquery',"tabs"],function($, Tabs){
        Tabs.init({id: "#detail-tab-wrapper"});
    });
});