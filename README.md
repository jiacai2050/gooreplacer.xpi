官方网站
===

http://liujiacai.net/gooreplacer 

gooreplacer
===

[Mozilla ADD-ONS地址](https://addons.mozilla.org/zh-CN/firefox/addon/gooreplacer/)

[Chrome版](https://github.com/jiacai2050/gooreplacer4chrome)

A replacer for google fonts/api/themes.... to load page faster!

一个用于替换网页中Google Fonts,API,themes等的Firefox插件，让你快速打开这些页面！

WARN
===
因本扩展使用的[redirectTo](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIHttpChannel#redirectTo%28%29)方法限制，只支持[Firefox 20及以上](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko/Versions)的版本。

INSTALL
===

用户在[Mozilla ADD-ONS](https://addons.mozilla.org/zh-CN/firefox/addon/gooreplacer/)安装gooreplacer后，如果想要进行google资源重定向，需要在配置项中开启，步骤如下：

1. 在Firefox中输入，about:addons，打开插件控制面板
2. 找到gooreplacer插件，点击配置<img src="http://img02.taobaocdn.com/imgextra/i2/581166664/TB2_T3sapXXXXXSXpXXXXXXXXXX_!!581166664.png" alt=" config"/>
3. 选中“允许重定向？”<img src="http://img04.taobaocdn.com/imgextra/i4/581166664/TB2sM.mapXXXXbXXpXXXXXXXXXX_!!581166664.png" alt=" enable-redirect"/>

操作完上面三步后，请用下面TEST中的四个链接做测试。

TEST
===

安装本插件并开启“允许重定向？”后，可以Firefox中输入下面的链接检查是否起作用:

1. https://fonts.googleapis.com/css?family=Open+Sans
2. https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
3. http://fonts.googleapis.com/css?family=Open+Sans
4. http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js

如果能转到lug.ustc.edu.cn相应的资源即说明跳转成功。

如果你发现有任何问题，请与我联系。谢谢！

Development
===

- 使用[Mozilla SDK](https://developer.mozilla.org/en-US/Add-ons/SDK)开发
- 使用[科大公共库](https://servers.ustclug.org/2014/07/ustc-blog-force-google-fonts-proxy/)替换Google资源，之前曾使用360公共库，但是[360并不支持https访问](https://servers.ustclug.org/2014/06/blog-googlefonts-speedup/)，所以最终选择了科大。


TO-DO
===

1. <del>可以禁用Google资源，但没法替换相应的资源</del>
2. <del>gooreplacer FOR Chrome</del>  [Chrome版](https://github.com/jiacai2050/gooreplacer4chrome)
3. <del>用户配置面板</del> v0.4
4. 用户可以自定义替换规则

TRY
===
现在已经增加自定义规则功能,如下图

<img src="http://img02.taobaocdn.com/imgextra/i2/581166664/TB2aFZ9aFXXXXb2XXXXXXXXXXXX_!!581166664.png" alt=" setting"/>

大家觉得这个功能如何呢？现在这个版本还没发布，大家可以通过直接下载[gooreplacer.xpi](https://github.com/jiacai2050/gooreplacer/raw/dev/gooreplacer.xpi)尝鲜 :-)

VERSION
===
- 0.1 首次发布
- 0.1.1 根据Mozilla reviewer的建议，使用tab模块来关闭Observer
- 0.1.2 当FF中打开并关闭一个tab后，无法跳转链接，原因是关闭Observer的方式不对。现改用windows模块来关闭Observer
- 0.2 增加官方主页
- 0.3 修改重定向规则，取消\*通配符
- 0.4 增加用户选项isRedirect，通过Mozilla的官方审查 ----2014.09.21
- 0.4.5 用户可以通过选择文件自定义规则
- 0.4.6 增加用户自定义界面
- 0.4.7 在用户界面，可以禁用某条规则
- ...
- 更多功能，等你来开发 

