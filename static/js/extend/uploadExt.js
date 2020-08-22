layui.define(['upload'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        upload = layui.upload,
        _val = null;
    let body = $('body');
    let uploadArr = new Array();
    layui.each($("[getBase64]"), function (k, dom) {
        let that = $(this);
        let forDom = $("*[" + that.attr("lay-for") + "]");
        let option = {
            elem: that[0],
            url: '',
            data: { time: new Date().getTime(), },
            headers: "",
            accept: (typeof (that.attr('lay-accept')) != 'undefined') ? that.attr('lay-accept') : 'images',
            acceptMime: 'image/*',
            exts: (typeof (that.attr('lay-exts')) != 'undefined') ? that.attr('lay-exts') : 'jpg|png|gif|bmp|jpeg',
            auto: false,
            field: "layUiUpload",
            size: (typeof (that.attr('lay-size')) != 'undefined') ? that.attr('lay-size') : 0,
            multiple: (typeof (that.attr('lay-multiple')) != 'undefined') ? true : false,
            drag: false,
            choose: function (obj) {
                //将每次选择的文件追加到文件队列
                let files = obj.pushFile();
                obj.preview(function (index, file, result) {
                    forDom.val(result);
                });
            }
        };
        upload.render(option);
    });
    let uploadExt = {
        init: function () {
            layui.each($("[lay-upload]"), function (k, dom) {
                let that = $(dom);
                let option = {
                    elem: dom,
                    url: (typeof (that.attr("lay-upp-src")) != 'undefined') ? that.attr("lay-upp-src") : '/admin/Index/uploadLayUi.html',
                    data: { time: new Date().getTime(), },
                    headers: "",
                    accept: (typeof (that.attr('lay-accept')) != 'undefined') ? that.attr('lay-accept') : 'images',
                    acceptMime: 'image/*',
                    exts: (typeof (that.attr('lay-exts')) != 'undefined') ? that.attr('lay-exts') : 'jpg|png|gif|bmp|jpeg',
                    auto: (typeof (that.attr('lay-auto')) == 'undefined') ? true : false,
                    field: "layUiUpload",
                    size: (typeof (that.attr('lay-size')) != 'undefined') ? that.attr('lay-size') : 0,
                    multiple: (typeof (that.attr('lay-multiple')) != 'undefined') ? true : false,
                    drag: false,
                    error: function (index, upload) {
                        progressDom.hide();
                        fun._msg({
                            info: '接口异常!',
                            time: 1500,
                        }, 'parent');
                    },
                };
                let acceptMime = '';
                let acceptTit = 0;
                switch (option.accept) {
                    case 'images':
                        acceptTit = 'image';
                        break;
                    case 'file':
                        acceptTit = '*';
                        break;
                    case 'app':
                        acceptTit = '*';
                        break;
                    default:
                        acceptTit = option.accept;
                        break;
                }
                if (acceptTit != '*') {
                    layui.each(fun.str2arr(option.exts, '|'), function (index, val) {
                        if (fun.str2arr(option.exts, '|').length === (index + 1)) {
                            acceptMime += acceptTit + '/' + val;
                        } else {
                            acceptMime += acceptTit + '/' + val + ',';
                        }
                    });
                } else {
                    acceptMime = acceptTit;
                    delete option.exts;
                }
                option.acceptMime = acceptMime;
                if (option.multiple == false) {
                    let inputDom = $("#" + that.attr("lay-input"));
                    let imgDom = that;
                    option.choose = function (obj) {
                        //将每次选择的文件追加到文件队列
                        let files = obj.pushFile();
                        obj.preview(function (index, file, result) {
                            imgDom.attr({ 'src': result });
                        });
                    };
                    option.before = function (obj) {
                        NProgress.start();
                    };
                    option.done = function (res, index, upload) {
                        let doneFun = (typeof (that.attr('lay-fun')) != 'undefined') ? that.attr('lay-fun') : 'undefined';
                        if (res.code == 1) {
                            inputDom.val(res.data.src);
                            switch (doneFun) {
                                case 'uppImages':
                                    imgDom.attr('src', res.data.src);
                                    break;
                            }
                        } else {
                            fun._msg({
                                info: "上传异常!" + res.code,
                                time: 1500,
                            }, 'parent');
                        }
                        NProgress.done();
                    };
                    option.progress = function (n, elem) {
                        NProgress.set(fun._calc(n, '100', '/', 1));
                        console.log(fun._calc(n, '100', '/', 1));
                    };
                    if (option.auto != true) {

                    }
                    console.log('单图上传', option);
                    uploadArr[k] = upload.render(option);
                } else {
                    option.number = (typeof (that.attr('lay-number')) != 'undefined') ? that.attr('lay-number') : 0;
                    option.bindAction = $("#" + that.attr("lay-bindAction"));
                    let listDom = $("#" + that.attr("lay-listDom"));
                    let valDom = $("#" + that.attr("lay-valDom"));
                    option.choose = function (obj) {
                        let files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function (index, file, result) {
                            var tr = $([
                                '<li id="upload-' + index + '">',
                                '<div class="layui-upload-operation">',
                                '<div>等待上传</div>',
                                '</div>',
                                '<img src="' + result + '" class="showimg">',
                                '</li>',
                            ].join(''));
                            listDom.append(tr);
                        });
                    };
                    option.done = function (res, index, upload) {
                        if (res.code == 1) {
                            let upThis = listDom.find('li#upload-' + index);
                            let ulDom = upThis.parents("ul");
                            let html = '';
                            html += '<img class="left" title="左移" lay-operation="left" src="/static/img/Arrow_left.svg">';
                            html += '<img class="center" title="删除" lay-operation="remove" src="/static/img/delete.svg">';
                            html += '<img class="browse" title="查看" lay-operation="browse" src="/static/img/browse.svg">';
                            html += '<img class="right" title="右移" lay-operation="right" src="/static/img/Arrow_right.svg">';
                            upThis.find("div.layui-upload-operation").html(html);
                            upThis.find("img.showimg").attr({
                                'src': res.data.src,
                                'lay-value': res.data.src + '|' + res.data.info.name + '.' + res.data.info.ext,
                            });
                            valDom.val(valDom.val() + ':::' + res.data.src + '|' + res.data.info.name + '.' + res.data.info.ext);
                            uppVal(valDom, ulDom);
                            return delete this.files[index]; //删除文件队列已经上传成功的文件
                        }
                        this.error(index, upload);
                    };
                    option.error = function (index, upload) {
                        let upThis = listDom.find('li#upload-' + index);
                        upThis.find("div.layui-upload-operation").html('<div>上传错误</div>');
                    };
                    if (option.auto != true) {

                    }
                    console.log(option);
                    uploadArr[k] = upload.render(option);
                }
            });
        }
    };
    body.on("click", "img[lay-operation]", function () {
        let that = $(this),
            operation = that.attr("lay-operation"),
            ulDom = that.parents("ul"),
            valDom = $("#" + ulDom.attr("lay-valDom")),
            thatDom = that.parents("li"),
            saveDom = null;
        switch (operation) {
            case 'browse':
                let photosJson = {
                    "title": "", //相册标题
                    "id": ulDom[0].id, //相册id
                    "start": 0, //初始显示的图片序号，默认0
                    "data": []
                };
                let thatDomSrc = $(thatDom).find("img.showimg").attr("lay-value");
                layui.each(ulDom.find("li"), function (k, v) {
                    let src = $(v).find("img.showimg").attr("lay-value");
                    let srcArr = fun.str2arr(src, '|');
                    if (src == thatDomSrc) {
                        photosJson.start = k;
                    }
                    let pustData = {
                        "alt": srcArr[1],
                        "pid": k, //图片id
                        "src": srcArr[0], //原图地址
                        "thumb": srcArr[0] //缩略图地址
                    };
                    photosJson.data.push(pustData);
                });
                layer.photos({
                    photos: photosJson,
                    move: false,
                    anim: 0,
                });
                break;
            case 'right':
                saveDom = thatDom.next();
                saveImgDom(thatDom, saveDom);
                uppVal(valDom, ulDom);
                break;
            case 'left':
                saveDom = thatDom.prev();
                saveImgDom(thatDom, saveDom)
                uppVal(valDom, ulDom);
                break;
            case 'remove':
                thatDom.remove();
                uppVal(valDom, ulDom);
                break;
            default:
                console.log(operation);
                break;
        }
    });
    uploadExt.init();

    function saveImgDom(thatDom, saveDom) {
        let change = {
            thatDom: {
                'src': saveDom.find("img.showimg").attr("src"),
                'lay-value': saveDom.find("img.showimg").attr("lay-value"),
            },
            saveDom: {
                'src': thatDom.find("img.showimg").attr("src"),
                'lay-value': thatDom.find("img.showimg").attr("lay-value"),
            },
        };
        thatDom.find("img.showimg").attr(change.thatDom);
        saveDom.find("img.showimg").attr(change.saveDom);
    }

    function uppVal(valDom, ulDom) {
        console.log('old' + "\n", valDom.val(), valDom.val().length);
        valDom.val("");
        layui.each(ulDom.find("li"), function (k, v) {
            let src = $(v).find("img.showimg").attr("lay-value");
            valDom.val(valDom.val() + ':::' + src);
        });
        console.log('new' + "\n", valDom.val(), valDom.val().length);
    }

    exports('uploadExt', uploadExt);
});