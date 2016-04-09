# 二手物品交易系统

* 环境部署
    * 首先确保你的windows或者是mac已经安装了Node
    * npm install 安装项目所需要的依赖
    * npm install supervisor 这样修改js文件 不需要重启node服务器，服务器会自动监听文件 有改动的时候会自动重启
    * 项目开发基于express框架，模板引擎并没有使用express推荐的ejs，而是使用handlebars，因为我使用的比较多的便是arttemplate和handlebars
      但是模板引擎切换的时候遇到了很多坑，因为handlebars不支持引用外部文件也就是之前ejs支持的<% include a.html %>不支持了 最后Google到了解决方案
      使用express-handlebars解决了
    * 对于静态文件的编译 采用的是less 使用express-less-middleware 可以将我们的less文件编译成css文件 并且是实时编译的
* 第三方资源
    * 项目中的icon 使用的是阿里巴巴集团提供的iconfont 地址：http://www.iconfont.cn/
    * 组件使用的是brix组件库 由阿里妈妈提供技术支持
