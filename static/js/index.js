layui.config({
    version: true,
    base: layerConfig.basePath + "/js/" //静态资源所在路径
}).extend({
    fun: 'extend/fun', //fun函数组
    InitApp: 'extend/InitApp', //初始化函数组
    formCheckExt: 'extend/formCheckExt', //表单校验
    showNumber: 'extend/showNumber', //数字抖动
    swiperExt: 'extend/swiperExt', //初始化轮播图
    initMapExt: 'extend/initMapExt', //初始化百度地图
}).use(['jquery', 'element', 'fun', 'InitApp', 'formCheckExt', 'showNumber', 'swiperExt', 'initMapExt'], function (exports) {
    let fun = layui.fun;
    //将模块根路径设置为 controller 目录
    layui.config({
        base: layui.cache.base + 'index/'
    });
    //加载公共模块
    layui.use('common');
    layui.use('formSubmitExt');
    layui.use('showNumber');
    layui.use('swiperExt');
    layui.use('initMapExt');
    let UA = fun.initWebSite().type;
    switch (UA) {
        case 'pc':
            layui.use('web');
            break;
        case 'mobile':
            layui.use('wap');
            break;
        default:
            break;
    }
});