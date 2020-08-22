layui.define(['jquery', 'fun', 'form'], function (exports) {
	const $ = layui.jquery,
		form = layui.form,
		fun = layui.fun;
	form.on('submit()', function (data) {
		//定義Form對象
		let options = {
			ButtonObj: data.elem, //按鈕對象
			_data: data.field, //獲取Form提交的數據
		};
		if (typeof (data.form) == 'undefined') {
			options.FormObj = $(data.elem).parents('.layui-form');
		} else {
			options.FormObj = $(data.form);
		}
		options.filter = $(options.ButtonObj).attr('lay-filter'); //按钮标记
		options.formname = $(options.FormObj).attr('lay-formname'); //获取提交名称
		options.url = $(options.FormObj).attr('lay-action'); //獲取提交地址
		options.type = $(options.FormObj).attr('lay-method'); //獲取提交方式
		options.num = options.FormObj.find('[lay-formNum]'); //獲取需要改变的客户数量(可选项)
		//執行提交操作
		options.beforeSend = (XHR) => {
			// console.log("beforeSend", XHR);
		};
		options.success = (res) => {
			// console.log("success", res);
		};
		options.complete = (XHR) => {
			// console.log("complete", XHR);
		};
		options.error = (XHR) => {
			// console.log("error", XHR);
		};
		console.log(options.filter)

		switch (options.filter) {
			case 'contactSubmit': // 联系我们
				options.success = (res) => {
					fun.ajaxDefBack(res);
				};
				break;
			case 'MarketingSubmit':
				options.success = (res) => {
					if (options.num.text() != undefined) {
						// 当form下有客户数量时使用，提交成功后改变lay-formNum值
						options.num.text(res.guestNum);
					}
					fun.ajaxDefBack(res);
				};
				break;
			default:
				fun.log('options', options);
				options.success = (res) => {
					// console.log("success", res);
					fun.ajaxDefBack(res);
				};
				break;
		}
		fun._ajax(options);
	});
	exports('formSubmitExt', {});
});