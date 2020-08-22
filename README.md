# js-Html-Ext-Init

```
1、Logo必须需用h1标签包住
2、非必要不要引入jquery,直接去./static/js/control/index.js 里面去处理
3、js务必放到./static/js/control/index.js 或新增的模块中
4、自定义属性 data-href="url" 为js控制跳转链接地址，已定义鼠标样式
5、自定义客服按钮功能
6、导航下的图片必须是Banner切换同时图片必须带链接跳转 务必用a标签包住:PS(<a href="javascript:;"><img src="https://www.zoyuan.net/static/img/logo.png" alt="logo"></a>)
7、整个页面尽量避免出现p、span、strong、i、b、em、center、font、br、hr标签的使用，如果必要，务必定义单独的class名
8、静态资源引入请务必使用./static/xxx.xxx
9、与UI对接明确动画效果、明确返回顶部、明确首页新闻右侧是否有查看更多、明确内页banner是否切换
```
```
www  WEB部署目录（或者子目录）
├─static           静态资源
│  ├─img      公共图片
│  ├─index    Index模块资源目录
│  │  ├─css    Index模块css资源目录
│  │  ├─fonts  Index模块字体资源目录
│  │  ├─img    Index模块图片资源目录
│  │  ├─js     公共没有提供的JS
│  ├─js       JS公共目录
│  ├─lib      外部组件目录
├─wap          移动端目录
├─web          PC端目录
```