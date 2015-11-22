## [gooreplacer4android](http://liujiacai.net/gooreplacer)

> A replacer for google fonts/api/themes.... to load page faster!

一个用于替换网页中Google Fonts,API,themes等的Firefox插件，让你快速打开这些页面！

- [Chrome 版](https://github.com/jiacai2050/gooreplacer4chrome)
- [Firefox PC 版](https://github.com/jiacai2050/gooreplacer)
- [Firefox Android 版](https://github.com/jiacai2050/gooreplacer/tree/android)

## 安装

不知出于什么原因，gooreplacer4android 在提交到 AMO 时老是说[不兼容 Android](http://stackoverflow.com/questions/33854270/firefox-android-addon-incompatible-when-submit-to-amo)，但是我在本地测试是没有问题。

如果你喜欢折腾并且想使用 gooreplacer4android ，可以按照下面步骤安装：

1. 安装基于 Python 的 cfx
    0. 如果你的电脑上没安装 Python 环境，需要去[官网](https://www.python.org/downloads/)下载
    1. 下载[addon SDK](https://github.com/mozilla/addon-sdk/archive/1.17.zip)，目前 github 上最新版为 1.7
    2. 解压后 zip 文件后，进入addon-sdk-1.17文件夹
    3. 激活相关环境变量，`source bin/activate`

2. 下载 adb
    1. 由于 [Google Android Developer](http://developer.android.com/)被墙，你可以去[东软的 Android 镜像](http://mirrors.neusoft.edu.cn/android/repository/)下载
        - [Windows 版](http://mirrors.neusoft.edu.cn/android/repository/platform-tools_r23_rc5-windows.zip)
        - [Linux 版](http://mirrors.neusoft.edu.cn/android/repository/platform-tools_r23_rc5-linux.zip)
        - [Mac 版](http://mirrors.neusoft.edu.cn/android/repository/platform-tools_r23_rc5-macosx.zip)

3. 手机连接 adb
    1. 打开手机的开发者模式
    2. USB 连接手机与电脑
    3. 通过`adb devices`查看设备连接情况，如果连接成功会出现下面的提示。

    ```
        $ adb devices
        List of devices attached
        0123456789ABCDEF        device
    ```
    
    如果连接不成功，你需要自己找原因了，Google “手机型号 adb 连接不上” 即可找到解决方法

4. 下载 gooreplacer4android
    
    ```
    git clone git@github.com:jiacai2050/gooreplacer.git
    cd gooreplacer
    git checkout android
    ```
5. 安装 gooreplacer4android

    ```
    # 进入到 gooreplacer4android 的 src 目录
    cd src
    # 执行这一步是需要已经安装 cfx，并且已经 source bin/activate。-b 选项指定 adb 的路径
    cfx run -a fennec-on-device -b /path/to/adb --force-mobile
    ```
    
    当你看到下面信息时，说明已经安装成功

    ```
    Launching mobile application with intent name org.mozilla.firefox
    Killing running Firefox instance ...
    Pushing the addon to your device
    Starting: Intent { act=android.activity.MAIN cmp=org.mozilla.firefox/.App (has extras) }
    ```

和 PC 版一样，使用前需要先激活 gooreplacer4android。步骤如下：

1. 在浏览器输入`about:addons`，点击 gooreplacer 插件
![gooreplacer4android_1](https://img.alicdn.com/imgextra/i4/581166664/TB2Km4hhFXXXXbmXXXXXXXXXXXX_!!581166664.png_620x10000.jpg)

2. 选中“开启重定向”，然后点击“更新”规定的按钮，这样就可以了。
![gooreplacer4android_2](https://img.alicdn.com/imgextra/i3/581166664/TB2mL8XhFXXXXXcXpXXXXXXXXXX_!!581166664.png_620x10000.jpg)

That's all, Happy Hack ！😊

安装过程有什么问题可以提 [issue](https://github.com/jiacai2050/gooreplacer/issues)

## License

[MIT License](http://liujiacai.net/license/MIT.html?year=2015) © Jiacai Liu
