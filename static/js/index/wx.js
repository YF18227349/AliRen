layui.define(['jquery', 'fun'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        _val = null;
    let body = $('body');
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxJsonConfig.appid, // 必填，公众号的唯一标识
        timestamp: wxJsonConfig.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxJsonConfig.nonceStr, // 必填，生成签名的随机串
        signature: wxJsonConfig.signature,// 必填，签名
        jsApiList: [
            'updateAppMessageShareData',
            'hideMenuItems',
        ] // 必填，需要使用的JS接口列表
    });
    wx.error(function (res) {
        console.log(res);
    });
    wx.ready(function () {
        wx.hideMenuItems({
            menuList: [
                'menuItem:editTag',//编辑标签
                'menuItem:delete',//删除
                'menuItem:copyUrl',//复制链接
                'menuItem:originPage',//原网页
                'menuItem:readMode',//阅读模式
                'menuItem:openWithQQBrowser',//在QQ浏览器中打开
                'menuItem:openWithSafari',//在Safari中打开
                'menuItem:share:email',//邮件
                'menuItem:share:brand',//一些特殊公众号
                'menuItem:share:qq',//分享到QQ
                'menuItem:share:weiboApp',//分享到Weibo
                'menuItem:share:facebook',//分享到facebook
                'menuItem:share:QZone',//分享到 QQ 空间
            ]
        });
        wx.updateAppMessageShareData({
            title: wxShareConfig.title, // 分享标题
            desc: wxShareConfig.desc, // 分享描述
            link: wxShareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: wxShareConfig.imgUrl, // 分享图标
            success: function () {
                //自定义分享给朋友按钮的分享内容
            }
        })
        wx.updateTimelineShareData({
            title: wxShareConfig.title, // 分享标题
            link: wxShareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: wxShareConfig.imgUrl, // 分享图标
            success: function () {
                // 自定义分享到朋友圈按钮的分享内容
            }
        })
    });

    exports('wx');
});