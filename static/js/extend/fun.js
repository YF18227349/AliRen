layui.define(['laytpl', 'flow', 'layer'], function (exports) {
    let jQuery = layui.jquery,
        $ = jQuery,
        laytpl = layui.laytpl,
        flow = layui.flow,
        layer = layui.layer,
        $win = $(window),
        _val = '';
    let body = jQuery("body");
    //scrollEnd() 滚动停止
    jQuery.fn.scrollEnd = function (callback, timeout) {
        jQuery(this).scroll(function () {
            let $this = jQuery(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback, timeout));
        });
    };
    let obj = {
        v: 'Rig.v2',
        /**
         * 初始化LayUi参数设置
         */
        __initLayUiOpt: function (json) {
            return {
                type: json.type ? json.type : 0, //基本层类型 0->信息框，默认 1->页面层 2->iframe层 3->加载层 4->tips层
                title: json.title ? json.title : "提示", //标题
                content: json.content ? json.content : '', //内容
                skin: json.skin ? json.skin : '', //样式类名
                area: json.area ? json.area : 'auto', //宽高
                offset: json.offset ? json.offset : 'auto', //坐标
                icon: json.icon ? json.icon : -1, //图标
                btn: json.btn ? json.btn : '确认',
                btnAlign: json.btnAlign ? json.btnAlign : 'c', //按钮排列
                closeBtn: json.closeBtn ? json.closeBtn : 0, //关闭按钮
                shade: json.shade ? json.shade : 0.3, //遮罩
                shadeClose: json.shadeClose ? json.shadeClose : false, //是否点击遮罩关闭
                time: json.time ? json.time : 0, //自动关闭所需毫秒
                id: json.id ? json.id : '', //用于控制弹层唯一标识
                anim: json.anim ? json.anim : parseInt(5 * Math.random() + 1), //弹出动画
                maxmin: json.maxmin ? json.maxmin : false, //最大最小化
                fixed: json.fixed ? json.fixed : false, //固定
                resize: json.resize ? json.resize : false, //是否允许拉伸
                scrollbar: json.scrollbar ? json.scrollbar : true, //是否允许浏览器出现滚动条
                zIndex: json.zIndex ? json.zIndex : 19950320, //层叠顺序
                move: json.move ? json.move : false, //触发拖动的元素
                tipsMore: json.tipsMore ? json.tipsMore : false, //是否允许多个tips
                info: json.info ? json.info : "内容未定义", //说明信息
                url: json.url ? json.url : '',
            };
        },
        /**
         * Ajax默认返回
         */
        ajaxDefBack: function (json) {
            if (typeof (json.fun) == 'undefined') {
                let opt = json,
                    successFun = json.success || '',
                    endFun = json.end || '';
                opt.successFun = successFun;
                opt.end = endFun;
                obj._msg(opt);
            } else {
                console.info("Error:", json);
            }
        },
        _html: function (config, deepInfo = 'self') {
            let init = obj.__initLayUiOpt(config);
            init.closeBtn = (init.closeBtn != 0) ? init.closeBtn : 1;
            init.title = (init.title != '提示') ? init.title : false;
            let successFun = config.success,
                endFun = config.end,
                cancelFun = config.cancel,
                layerOpen = null;
            let opt = {
                type: 1,
                time: init.time,
                offset: init.offset,
                shade: init.shade,
                shadeClose: init.shadeClose,
                area: init.area,
                anim: init.anim,
                title: init.title,
                zIndex: init.zIndex,
                fixed: init.fixed,
                move: init.move,
                scrollbar: init.scrollbar,
                tipsMore: init.tipsMore,
                resize: init.resize,
                skin: init.skin,
                closeBtn: init.closeBtn,
                maxmin: init.maxmin,
                content: config.html,
                success: function (layero, index) {
                    layui.data("_iframeSite", { key: 'nowIndex', value: index, });
                    successFun && successFun(layero, index, config);
                },
                cancel: function (index, layero) {
                    cancelFun && cancelFun(config, index, layero);
                },
                end: function () {
                    endFun && endFun(config, layerOpen);
                },
            };
            switch (deepInfo) {
                case 'self':
                    layerOpen = layer.open(opt);
                    break;
                case 'parent':
                    layerOpen = parent.layer.open(opt);
                    break;
            }
            return layerOpen;
        },
        _iframe: function (config, deepInfo = 'self') {
            let init = obj.__initLayUiOpt(config);
            init.area = (init.area != 'auto') ? init.area : ['80%', '80%'];
            init.closeBtn = (init.closeBtn != 0) ? init.closeBtn : 1;
            init.title = (init.title != '提示') ? init.title : false;
            let successFun = config.success,
                endFun = config.end,
                cancelFun = config.cancel,
                layerIFrame = null;
            let opt = {
                type: 2,
                time: init.time,
                offset: init.offset,
                shade: init.shade,
                shadeClose: init.shadeClose,
                area: init.area,
                anim: init.anim,
                title: init.title,
                zIndex: init.zIndex,
                fixed: init.fixed,
                move: init.move,
                scrollbar: init.scrollbar,
                tipsMore: init.tipsMore,
                resize: init.resize,
                skin: init.skin,
                closeBtn: init.closeBtn,
                maxmin: init.maxmin,
                content: init.url,
                success: function (layero, index) {
                    layui.data("_iframeSite", { key: 'nowIndex', value: index, });
                    successFun && successFun(layero, index, config);
                },
                cancel: function (index, layero) {
                    cancelFun && cancelFun(config, index, layero);
                },
                end: function () {
                    endFun && endFun(config, layerIFrame);
                },
            };
            switch (deepInfo) {
                case 'self':
                    layerIFrame = layer.open(opt);
                    break;
                case 'parent':
                    layerIFrame = parent.layer.open(opt);
                    break;
            }
            return layerIFrame;
        },
        /**
         * Layui Confirm 函数重写
         * @return index->生成Index值
         */
        _confirm: function (config, deepInfo = 'self') {
            let init = obj.__initLayUiOpt(config),
                type = config.type ? config.type : 'alert',
                btn = (init.btn != '确认') ? init.btn : ['确定', '取消'],
                successFun = config.success,
                endFun = config.end,
                yesFun = config.yes,
                noFun = config.no,
                layerConfirm = null;
            let opt = {
                time: init.time,
                offset: init.offset,
                shade: init.shade,
                shadeClose: init.shadeClose,
                area: init.area,
                anim: init.anim,
                icon: init.icon,
                zIndex: init.zIndex,
                fixed: init.fixed,
                move: init.move,
                scrollbar: init.scrollbar,
                tipsMore: init.tipsMore,
                skin: init.skin,
                btn: btn,
                btnAlign: init.btnAlign,
                success: function (layero, index) {
                    successFun && successFun(layero, index, config);
                },
                end: function () {
                    endFun && endFun(config, layerAlert);
                },
                yes: function (index, yesBtn) {
                    layer.close(index);
                    yesFun && yesFun(config, index, yesBtn);
                },
                btn2: function (index, noBtn) {
                    layer.close(index);
                    noFun && noFun(config, index, noBtn);
                },
            };
            switch (type) {
                case 'msg':
                    switch (deepInfo) {
                        case 'self':
                            layerConfirm = layer.msg(init.info, opt);
                            break;
                        case 'parent':
                            layerConfirm = parent.layer.msg(init.info, opt);
                            break;
                    }
                    break;
                case 'alert':
                    opt.title = init.title;
                    switch (deepInfo) {
                        case 'self':
                            layerConfirm = layer.confirm(init.info, opt);
                            break;
                        case 'parent':
                            layerConfirm = parent.layer.confirm(init.info, opt);
                            break;
                    }
                    break;
            }
            return layerConfirm;
        },
        /**
         * Layui Alert 函数重写
         * @return index->生成Index值
         */
        _alert: function (config, deepInfo = 'self') {
            let init = obj.__initLayUiOpt(config),
                successFun = config.success,
                endFun = config.end,
                yesFun = config.yes,
                layerAlert = null;
            let opt = {
                type: 0,
                time: init.time,
                offset: init.offset,
                shade: init.shade,
                shadeClose: init.shadeClose,
                area: init.area,
                anim: init.anim,
                title: init.title,
                icon: init.icon,
                zIndex: init.zIndex,
                fixed: init.fixed,
                move: init.move,
                scrollbar: init.scrollbar,
                tipsMore: init.tipsMore,
                skin: init.skin,
                closeBtn: init.closeBtn,
                success: function (layero, index) {
                    successFun && successFun(layero, index, config);
                },
                end: function () {
                    endFun && endFun(layerAlert, config);
                },
                yes: function (index, layero) {
                    obj._close(index);
                    yesFun && yesFun(layero, index, config);
                }
            };
            switch (deepInfo) {
                case 'self':
                    layerAlert = layer.open(opt);
                    break;
                case 'parent':
                    layerAlert = parent.layer.open(opt);
                    break;
            }
            return layerAlert;
        },
        _msg: function (config, deepInfo = 'self') {
            let init = obj.__initLayUiOpt(config),
                successFun = config.success,
                endFun = config.end,
                layerMsg = null;
            let opt = {
                type: 0,
                time: init.time,
                offset: init.offset,
                shade: init.shade,
                shadeClose: init.shadeClose,
                area: init.area,
                anim: init.anim,
                icon: init.icon,
                zIndex: init.zIndex,
                fixed: init.fixed,
                move: init.move,
                scrollbar: init.scrollbar,
                tipsMore: init.tipsMore,
                skin: init.skin,
                closeBtn: init.closeBtn,
                success: function (layero, index) {
                    successFun && successFun(layero, index, config);
                },
                end: function () {
                    obj._close(layerMsg);
                    endFun && endFun(config, layerMsg);
                },
            };
            opt.time = (typeof (config.time) == 'undefined' && opt.time == 0) ? 1500 : opt.time;
            opt.offset = (typeof (config.offset) == 'undefined' && opt.offset == 'auto') ? '20%' : opt.offset;
            switch (deepInfo) {
                case 'self':
                    layerMsg = layer.msg(init.info ? init.info : '提示一下', opt);
                    break;
                case 'parent':
                    layerMsg = parent.layer.msg(init.info ? init.info : '提示一下', opt);
                    break;
            }
            return layerMsg;
        },
        //xss 转义
        escape: function (html) {
            return String(html || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/'/g, '&#39;').replace(/"/g, '&quot;');
        },
        //屏幕类型
        screen: function () {
            let width = $win.width()
            if (width > 1200) {
                return 3; //大屏幕
            } else if (width > 992) {
                return 2; //中屏幕
            } else if (width > 768) {
                return 1; //小屏幕
            } else {
                return 0; //超小屏幕
            }
        },
        //全屏
        fullScreen: function () {
            let ele = document.documentElement,
                reqFullScreen = ele.requestFullScreen || ele.webkitRequestFullScreen || ele.mozRequestFullScreen || ele.msRequestFullscreen;
            if (typeof reqFullScreen !== 'undefined' && reqFullScreen) {
                reqFullScreen.call(ele);
            };
        },
        //退出全屏
        exitScreen: function () {
            let ele = document.documentElement
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        },
        arr1str: function (arr, ext = ',') {
            return arr.join(ext);
        },
        arr2str: function (arr, ext = '-') {
            return arr.join(ext);
        },
        str2arr: function (str, ext = ',') {
            return str.split(ext);
        },
        str2json: function (str) {
            return eval('(' + str + ')');
        },
        json2arr: function (json) {
            let jsonArr = [];
            layui.each(json, function (k, v) {
                jsonArr[k] = v;
            })
            return jsonArr;
        },
        json2str: function (json) {
            return JSON.stringify(json);
        },
        in_array: function (search, array) {
            for (let i in array) {
                if (array[i] == search) {
                    return true;
                }
            }
            return false;
        },
        //格式化日期
        formatDate: function (time) {
            let timeString = time ? time : new Date().getTime();
            let now = new Date(timeString);
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let date = now.getDate();
            let hour = now.getHours();
            let minute = now.getMinutes();
            let second = now.getSeconds();
            return year + "年" + month + "月" + date + "日 " + hour + ":" + minute + ":" + second;
        },
        _WxH5Pay: function (options) {
            let successFun = options.success,
                errorFun = options.error;
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                "appId": options.appId,
                "timeStamp": options.timeStamp,
                "nonceStr": options.nonceStr,
                "package": options.package,
                "signType": options.signType,
                "paySign": options.paySign,
            }, function (res) {
                WeixinJSBridge.log(res.err_msg);
                //alert(res.err_code+res.err_desc+res.err_msg);
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                    // * 用户支付成功事务操作
                    if (typeof successFun === 'function') {
                        successFun(options);
                    } else {
                        obj._msg({
                            info: '支付成功!',
                        });
                    }
                    return false;
                } else {
                    // * 其他状态事务操作
                    if (typeof errorFun === 'function') {
                        errorFun(options);
                    } else {
                        obj._msg({
                            info: '取消支付!',
                        });
                    }
                    return false;
                }
            });
        },
        _error: function (info) {
            let opt = {
                info: '回调未定义!' + info,
                time: 1500,
            };
            return obj._msg(opt, 'parent');
        },
        /**
         * ajax提交Form表單
         */
        _ajax: function (options) {
            let loadIndex = 0,
                successFun = options.success,
                errorFun = options.error,
                beforeSendFun = options.beforeSend,
                completeFun = options.complete,
                debug = function () {
                    return 'url=>' + option.url;
                },
                _val = '';
            options.data = options._data || {};
            options.headers = options.headers || {};
            if (!options.url || (jQuery.trim(options.url)).length < 4) {
                obj._error('请求地址未定义!');
                return false;
            }
            delete options.success;
            delete options.error;
            delete options.beforeSend;
            delete options.complete;

            return jQuery.ajax($.extend({
                type: options.type || 'post',
                dataType: options.dataType || 'json',
                async:true,
                beforeSend: function (XHR) {
                    NProgress.start();
                    loadIndex = obj._load();
                    jQuery(options.ButtonObj).attr('disabled', true);
                    beforeSendFun && beforeSendFun(XHR);
                },
                success: function (event, XHL) {
                    if (typeof successFun === 'function') {
                        successFun(event, XHL);
                    } else {
                        obj.ajaxDefBack(event);
                    }
                },
                complete: function (XHR, TS) {
                    NProgress.done();
                    obj._sleep(300, function () {
                        obj._close(loadIndex, 'parent');
                        jQuery(options.ButtonObj).removeAttr('disabled');
                        completeFun && completeFun(XHR, TS);
                    });
                },
                error: function (XHR, TS, thrownError) {
                    obj._error('请求异常!');
                    errorFun && errorFun(XHR);
                }
            }, options));
        },
        /**
         * jQuery $.post函数重写
         */
        _post: function (option) {
            let successFun = option.success,
                errorFun = option.error;
            if (!option.url || (jQuery.trim(option.url)).length < 4) {
                obj._error('请求地址未定义!');
                return false;
            }
            delete option.success;
            delete option.error;

            jQuery.post(option.url, option.data, function (event, XHL) {
                if (XHL == 'success') {
                    if (typeof successFun === 'function') {
                        successFun(event);
                    } else {
                        obj.ajaxDefBack(event);
                    }
                } else {
                    obj._error('请求异常!');
                    errorFun && errorFun(event, XHL);
                }
            }, option.dataType || 'json');
        },
        /**
         * 定时器按鈕
         * @param buttonDom->按鈕對象
         * @param inputDom - > 文本框對象
         * @param count - > 鎖定時間
         */
        _invokeSettime: function (buttonDom, inputDom, count) {
            let countdown = count ? count : 60;
            let settime = function () {
                if (countdown == 0) {
                    jQuery(buttonDom).attr("disabled", false);
                    jQuery(buttonDom).text("获取验证码");
                    jQuery(inputDom).removeAttr("readonly", "readonly");
                    jQuery(buttonDom).attr("data-ck", "true");
                    countdown = 10;
                    return;
                } else {
                    jQuery(buttonDom).attr("disabled", true);
                    jQuery(buttonDom).text("(" + countdown + ") s 重新发送");
                    jQuery(inputDom).attr("readonly", "readonly");
                    jQuery(buttonDom).attr("data-ck", "false");
                    countdown--;
                }
                obj._sleep(1000, function () {
                    settime()
                });
            };
            settime();
        },
        /**
         * Layui Load 函数重写
         * @return index->生成Index值
         */
        _load: function (config, deep = 'parent') {
            let init = obj.__initLayUiOpt(config || {});
            let opt = {
                time: init.time,
                offset: init.offset,
                shade: 0.2,
                anim: parseInt(5 * Math.random() + 1),
            };
            let icon = (init.icon != -1) ? init.icon : 0;
            switch (deep) {
                case 'self':
                    return layer.load(icon, opt);
                case 'parent':
                    return parent.layer.load(icon, opt);
            }
        },
        /**
         * Layui close 关闭重写
         */
        _close: function (index = false, deep = 'self') {
            switch (deep) {
                case 'self':
                    (index) ? layer.close(index) : layer.closeAll();
                case 'parent':
                    (index) ? parent.layer.close(index) : parent.layer.closeAll();
            }
        },
        /**
         * Lay-TPL赋值
         */
        _ToTpl: function (tpl, view, data) {
            laytpl(jQuery("#" + tpl)[0].innerHTML).render(data, function (html) {
                jQuery(view)[0].innerHTML = html;
            });
        },
        /**
         * @info 检测是否为空
         * @param string str 字符串
         * @return boolean 检查结果
         */
        __isNull: function (str) {
            if (typeof str == 'undefined') {
                return true;
            }
            switch (typeof str) {
                case 'string':
                    let trim = jQuery.trim(str);
                    if (!trim || trim == "" || trim == "null" || trim == "undefined") {
                        return true;
                    } else {
                        return false;
                    }
                case 'object':
                    return false;
                default:
                    console.error('状态未定义', typeof str);
                    return true;
            }
        },
        /**
         * @info 是不是为空
         * @param string str 字符串
         * @return boolean 检查结果
         */
        _isNull: function (str) {
            str = obj.__trim(str);
            if (!str || str == "" || str == "null" || str == "undefined")
                return true;
            return false;
        },
        /**
         * @info      檢測是否是鏈接地址
         * @param string str 字符串
         * @return boolean 检查结果
         */
        _isUrl: function (str) {
            return !!str.match(
                /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
            );
        },
        /**
         * @info      检测是否是手机号
         * @param string str 字符串
         * @return boolean 检查结果
         */
        _isPhone: function (str) {
            let matchRule = {
                max: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
                min: /^1[345789]\d{9}$/,
            };
            return !!str.match(matchRule.max);
        },
        /**
         * @info 等待執行函數
         * @param int time    等待时间
         * @param Function callback 回调函数
         */
        _sleep: function (time, callback) {
            setTimeout(callback, time);
        },
        /**
         * @info 刷新页面
         */
        _refresh: function () {
            window.location.reload();
        },
        /**
         * @info 跳转连接地址
         */
        _href: function (url) {
            window.location.href = url;
        },
        /**
         * @info 新窗口打开地址
         */
        _open: function (url) {
            window.open(url);
        },
        /**
         * @info 后退
         */
        _back: function (index) {
            window.history.back(index ? index : -1);
        },
        /**
         * @info 转换int类型
         * @param string str 字符串
         * @return mixed 转换结果
         */
        _int: function (str) {
            return parseInt(str);
        },
        /**
         *
         * @param options
         */
        checkStay: function (options) {
            if (sessionStorage.clickcount) {
                if (obj._int(sessionStorage.clickcount) == options.max) {
                    obj._post({
                        url: options.url,
                        data: {
                            user_name: options.user_name,
                            call_href: window.location.href,
                        },
                        success: function (e) {
                            if (e.status == 1) {
                                options.call && options.call(e);
                            }
                        }
                    });
                }
                sessionStorage.clickcount = obj._calc(sessionStorage.clickcount, '1', '+', 0);
            } else {
                sessionStorage.clickcount = 0;
            }
            obj._sleep(1000, function () {
                obj.checkStay(options);
            });
        },
        /**
         * 加、减、乘、除、取余
         */
        _calc: function (left, right, type, length) {
            let BN = BigNumber.clone();
            length = length ? length : 0;
            BN.config({
                DECIMAL_PLACES: length
            });
            switch (type) {
                case '+':
                    return BN(left).plus(right).toFixed(length);
                case '-':
                    return BN(left).minus(right).toFixed(length);
                case '*':
                    return BN(left).times(right).toFixed(length);
                case '/':
                    return BN(left).div(right).toFixed(length);
                case '%':
                    return BN(left).mod(right).toFixed(length);
            }
        },
        /**
         * @info 随机生成int類型數據，最小值、最大值
         * @param int minnum 最小值
         * @param int maxnum 最大值
         * @return int 生成結果
         */
        _randInt: function (minnum, maxnum) {
            return Math.floor(minnum + Math.random() * (maxnum - minnum));
        },
        /**
         * @info 生成随机字符串
         * @param int len 长度
         * @return string 随机结果
         */
        _randString: function (len, type, extStr) {
            len = len ? len : 12;
            type = type ? type : 0;
            let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            switch (type) {
                case 0:
                    break;
                case 1:
                    chars = '0123456789';
                    break
            }
            chars = chars + extStr;
            let maxPos = chars.length;
            let string = '';
            for (let i = 0; i < len; i++) {
                string += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return string;
        },
        /**
         * @info 清空數據中的空格
         * @param string str 清空前
         * @return string 清空结果
         */
        __trim: function (str) {
            return str.replace(/\s+/g, "");
        },
        /**
         * @info 字符串转小写
         * @param string str 字符串
         * @return mixed 转换结果
         */
        _toLower: function (str) {
            return str.toLowerCase();
        },
        /**
         * @info 转换为大写
         * @param string str 字符串
         * @return mixed 转换结果
         */
        _toUpper: function (str) {
            return str.toUpperCase();
        },
        /**
         * HTML5 Web存储
         */
        _localData: function (type = 'set', param = '') {
            switch (type) {
                case 'set':
                    param = param ? param : "{k:'time',v:'" + obj.formatDate() + "'}";
                    param = obj.str2json(param);
                    return localStorage.setItem(param.k, param.v);
                case 'get':
                    param = param ? param : false;
                    if (param === false) {
                        return localStorage;
                    } else {
                        param = localStorage.getItem(param);
                        return param ? param : false;
                    }
                case 'del':
                    param = param ? param : false;
                    if (param === false) {
                        return localStorage.clear();
                    } else {
                        return localStorage.removeItem(param);
                    }
            }
        },
        _webWorker: function (options) {
            if (typeof (Worker) !== "undefined") {
                let w;
                w = new Worker(options.jsPath);
                w.onmessage = function (event) {
                    options.heartbeat && options.heartbeat(event.data, event);
                }
            } else {
                obj._msg({
                    info: '抱歉，你的浏览器不支持 Web Workers...!',
                });
            }
        },
        _SSE: function (options) {
            if (typeof (EventSource) !== "undefined") {
                let source;
                source = new EventSource(options.url);
                source.onmessage = function (event) {
                    options.heartbeat && options.heartbeat(event.data, event);
                };
            } else {
                obj._msg({
                    info: '抱歉，你的浏览器不支持 server-sent事件...!',
                });
            }
        },
        _WS: function (options) {
            if ("WebSocket" in window) {
                let ws;
                // 打开一个 web socket
                ws = new WebSocket(options.url);
                ws.onopen = function () {
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    options.onopen && options.onopen(ws);
                };
                ws.onmessage = function (evt) {
                    options.heartbeat && options.heartbeat(evt.data, evt);
                };
                ws.onerror = function () {
                    console.error('连接失败...', ws);
                };
                ws.onclose = function () {
                    // 关闭 websocket
                    console.log('连接已关闭...', ws);
                };
            } else {
                obj._msg({
                    info: '您的浏览器不支持 WebSocket...!',
                });
            }
        },
        /**
         *
         * @info 初始化页面获取设备信息
         */
        initWebSite: function () {
            let UA = obj.browserInit();
            return UA;
        },
        /**
         * @info 获取(User Agent)信息
         * @return mixed UA结果
         */
        browserInit: function () {
            let u = navigator.userAgent;
            let versions = {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == "qq" //是否QQ
            };
            let UA = {};
            let Height = document.documentElement.clientHeight;
            let Width = document.documentElement.clientWidth;
            let direction = (Height > Width) ? 'vertical' : ((Width > Height) ? 'transverse' : 'null');
            if (versions.weixin) {
                UA = {
                    title: '微信端',
                    type: 'weixin',
                    versions: versions,
                    direction: direction,
                    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
                };
            } else if (versions.iPad) {
                UA = {
                    title: 'PAD端',
                    type: 'pad',
                    versions: versions,
                    direction: direction,
                    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
                };
            } else if (versions.ios || versions.android || versions.mobile) {
                UA = {
                    title: '移动端',
                    type: 'mobile',
                    versions: versions,
                    direction: direction,
                    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
                };
            } else {
                UA = {
                    title: 'PC端',
                    type: 'pc',
                    versions: versions,
                    direction: direction,
                    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
                };
            }
            UA.os = layui.device();
            return UA;
        },
        /**
         * 屏蔽
         */
        _stop: function (config = {}) {
            let d = {
                F12: config.F12 ? true : false,
                BackSpace: config.BackSpace ? true : false,
                Enter: config.Enter ? true : false,
                RightClick: config.RightClick ? true : false, //屏蔽右键菜单

            }
            obj.onkeydown(function (keyCode, event) {
                if (keyCode == 123 && d.F12 == true) {
                    window.event.keyCode = 0;
                    window.event.returnValue = false;
                }
                if (keyCode == 13 && d.Enter == true) {
                    window.event.keyCode = 505;
                }
                if (keyCode == 8 && d.BackSpace == true) {
                    window.event.returnValue = false;
                }
            });
        },
        ready: function (callback) { //DOM加载完毕
            jQuery(document).ready(function () {
                callback && callback();
            });
        },
        load: function (callback) { //元素加载完毕
            jQuery(window).load(function () {
                callback && callback();
            });
        },
        resize: function (callback) { //浏览器窗口的大小发生变化
            jQuery(window).resize(function () {
                callback && callback();
            });
        },
        scroll: function (callback) { //浏览器滚动条监听
            jQuery(window).scroll(function () {
                //获取当前滚动条高度
                let data = {
                    docTop: jQuery(document).scrollTop(),
                    docHeig: jQuery(document).height(),
                    winHeight: jQuery(window).height(),
                    innerHeight: window.innerHeight,
                };
                callback && callback(data, jQuery(window));
            });
        },
        scrollEnd: function (callback, time = 500) { //滚动停止
            jQuery(window).scrollEnd(function () {
                //获取当前滚动条高度
                let data = {
                    docTop: jQuery(document).scrollTop(),
                    docHeig: jQuery(document).height(),
                    winHeight: jQuery(window).height(),
                    innerHeight: window.innerHeight,
                };
                callback && callback(data);
            }, time);
        },
        keyup: function (callback) {
            jQuery(document).keyup(function (event) {
                //回车搜索
                let keyCode = event.keyCode;
                callback && callback(keyCode, event);
            });
        },
        onkeydown: function (callback) {
            jQuery(document).keydown(function (event) {
                //回车搜索
                let keyCode = event.keyCode;
                callback && callback(keyCode, event);
            });
        },
    };
    /**
     * 自定义复制
     */
    let clipboard = new ClipboardJS('[copy-text]');
    clipboard.on('success', function (e) {
        obj._msg({
            info: '复制成功!',
            time: 500,
        });
        console.log(e);
    });
    clipboard.on('error', function (e) {
        obj._msg({
            info: '复制成功!',
            time: 500,
        });
        console.log(e);
    });
    flow.lazyimg();
    //输出 fun 接口
    exports('fun', obj);
});