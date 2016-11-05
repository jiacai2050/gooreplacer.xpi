## [gooreplacer](http://liujiacai.net/gooreplacer)

> A replacer for google fonts/css/themes.... to load page faster!

一个用于替换网页中 `Google Fonts/CSS/themes` 等被墙服务的 Chrome/Firefox 插件，让你快速打开这些页面！

- [Chrome版](https://chrome.google.com/webstore/detail/gooreplacer/jnlkjeecojckkigmchmfoigphmgkgbip)
- [Firefox PC 版](https://addons.mozilla.org/zh-CN/firefox/addon/gooreplacer/)
- [Firefox Android 版](https://github.com/jiacai2050/gooreplacer/tree/android)

> 2.0 以及之后的版本，采用 Mozilla 推荐的 [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) 进行开发，与 Chrome 版本的 [gooreplacer4chrome](https://github.com/jiacai2050/gooreplacer4chrome) 共享一份代码，最新使用说明也可以在那里找到。本仓库不在更新。

> 以后终于不用再维护两个版本了。✌️


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
- 2.0 改用 WebExtensions 方式开发，与 Chrome 版本共享一个代码库

## License

[MIT License](http://liujiacai.net/license/MIT.html?year=2015) © Jiacai Liu
