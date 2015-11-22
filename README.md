## [gooreplacer](http://liujiacai.net/gooreplacer )


> A replacer for google fonts/api/themes.... to load page faster!

一个用于替换网页中Google Fonts,API,themes等的Firefox插件，让你快速打开这些页面！

- [Chrome版](https://github.com/jiacai2050/gooreplacer4chrome)
- [Firefox PC 版](https://github.com/jiacai2050/gooreplacer)
- [Firefox Android 版](https://github.com/jiacai2050/gooreplacer/tree/android)

<a name="install"></a>
## 安装

1. 在[Mozilla ADD-ONS](https://addons.mozilla.org/zh-CN/firefox/addon/gooreplacer/)下载并安装
2. 在 Firefox 地址栏中输入`about:addons`，打开插件控制面板（0.7及以后版本可直接点击工具栏图标进行设置）
3. 找到 gooreplacer 插件，点击配置
4. 选中“开启重定向”

<img src="http://img02.taobaocdn.com/imgextra/i2/581166664/TB2Ih_MaVXXXXXnXXXXXXXXXXXX_!!581166664.png" alt=" enable-redirect"/>

<a name="test"></a>
## 测试

安装本插件并选中“开启重定向”后，在地址栏中输入下面的链接：

1. https://fonts.googleapis.com/css?family=Open+Sans
2. https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
3. http://fonts.googleapis.com/css?family=Open+Sans
4. http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
5. http://platform.twitter.com/widgets.js
6. https://platform.twitter.com/widgets.js

如果能转到`lug.ustc.edu.cn`或`raw.githubusercontent.com`相应的资源即说明重定向成功。

<a name="diy"></a>
## 自定义规则说明

在自定义规则时，支持两种类型：

- 通配符类型，在 gooreplacer 内部用`kind: wildcard`标示
- 正则式类型，在 gooreplacer 内部用`kind: regexp`标示

在设置[在线规则](https://github.com/jiacai2050/gooreplacer4chrome/raw/master/gooreplacer.gson)时会用到内部表示。下面举几个例子：

### 通配符类型

在通配符类型中，原始URL中可以使用`*`进行`?`模糊匹配，如果需要表示字符自身的含义，可以使用`\`进行转义。例如：

```
www.baidu.com/s\?wd=java   ----通配符--->  www.baidu.com/s?wd=lisp
```

此外，可以使用`^`、`$`表示字符的开始与结尾。例如：

```
baidu.com/$  ----通配符--->  baidu.com/?
```
这样就能够把`baidu.com/`重定向到`baidu.com/?`了，[据说](http://v2ex.com/t/169967#reply2)，这样能防止劫持吆 -:)


### 正则式类型

在正则式类型中，原始URL中可以使用JS中的[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)语法定义，目的URL中如果要反引用原始URL中的分组，需要使用$1、$2、$3......。例如：

```
(weibo|ucloud)\.com  ----正则式--->  $1.cn
```

这样就把`weibo.com`、`ucloud.com`分别重定向到`weibo.cn`与`ucloud.cn`了。

<a name="dev"></a>
## 开发环境

Firefox 的附加组件（add-on）与 Chrome 的相比开发难度大些，文档、测试等方面 Chrome 均完胜 Firefox。这也难怪，Firefox 毕竟是有历史包袱的。

这里介绍下开发 gooreplacer 时的环境，希望对想开发 Firefox 附加组件的同学有所帮助。

[MDN](https://developer.mozilla.org/en-US/Add-ons)介绍了三种开发方式，我这里用的是官方推荐的`Add-on SDK`方式。最初我开发 gooreplacer 用的是基于 python 的[cfx](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx)，现在官方推荐使用基于 nodejs 的 [jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm)，现在我已经迁移至`jpm`。`jpm`的安装比较简单，一行命令搞定
```
npm install jpm --global
```
我在开发 gooreplacer 常用的命令也就是`jpm run`、`jpm xpi`这两个命令。

为了方便测试，使用了[Extension Auto-Installer](https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/)这个附加组件，它能够在命令行里面安装、更新插件，对开发来说很是必要。我封装了个脚本 [debug.sh](debug.sh)，大家可以参考


如果你在开发时有什么问题，欢迎和我交流，希望和大家一起进步。

<a name="warn"></a>
## 注意事项

- 因本扩展使用的[redirectTo](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIHttpChannel#redirectTo%28%29)方法限制，只支持[Firefox 20及以上](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko/Versions)的版本。
- v0.7 增加工具栏图标的API只支持[Firefox 29及以上版本](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Adding_a_Button_to_the_Toolbar)。
- v1.2 之后使用`jpm`进行打包，根据[官方文档](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm)，`jpm` 只支持 Firefox 38 及以后版本。

<a name="changelog"></a>
## 更新记录
- 0.1 首次发布
- 0.1.1 根据Mozilla reviewer的建议，使用tab模块来关闭Observer
- 0.1.2 当FF中打开并关闭一个tab后，无法跳转链接，原因是关闭Observer的方式不对。现改用windows模块来关闭Observer
- 0.2 增加官方主页
- 0.3 修改重定向规则，取消\*通配符
- 0.4 增加用户选项isRedirect，通过Mozilla的官方审查 ----2014.09.21
- 0.4.5 用户可以通过选择文件自定义规则
- 0.4.6 增加用户自定义界面
- 0.4.7 在用户界面，可以禁用某条规则
- 0.5 用户自定义规则界面测试完毕，发布正式版
- 0.6 添加导入导出功能，发布正式版
- 0.7 在工具栏添加gooreplacer图标，发布正式版
- 0.8 重定向支持正则表达式，支持隐私模式
- 0.9 重构自定义界面，支持规则编辑功能
- 1.0 支持在线规则
- 1.1 bug fix
- 1.2 Merge [Use simple-prefs instead of simple-storage for saving rules](https://github.com/jiacai2050/gooreplacer/pull/16)，解决重启时失效问题
- ...
- 更多功能，等你来开发 

## License

[MIT License](http://liujiacai.net/license/MIT.html?year=2015) © Jiacai Liu
