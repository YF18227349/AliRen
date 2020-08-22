layui.define([], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        UA = fun.initWebSite().type;
	let body = $('body');
    fun.ready(() => {
         // 创建和初始化地图函数
		function initMap() {
			let myMap = $('[mapContainer]');
            let lontolat = $(myMap).attr('map-lontolat');
			let lontolatArr = fun.str2arr(lontolat);
			console.log(lontolatArr)

            let lng = Number(lontolatArr[0]);
			let lat = Number(lontolatArr[1]);
			let map = new BMap.Map('container'); // 在百度地图容器中创建一个地图

			let point = new BMap.Point(lng, lat); // 定义一个中心点坐标
			map.centerAndZoom(point, 17); // 设定地图的中心点和坐标并将地图显示在地图容器中
			window.map = map; // 将map变量存储在全局
			let marker = new BMap.Marker(point); // 创建标注
            map.addOverlay(marker);
            let informationWH = $(myMap).attr('map-informationWH');
            let informationWHArr = fun.str2arr(informationWH);
			let opts = {
				width: Number(informationWHArr[0]) ? Number(informationWHArr[0]) : 200, // 信息窗口宽度
				height: Number(informationWHArr[1]) ? Number(informationWHArr[1]) : 100, // 信息窗口高度
				title: $(myMap).attr('map-informationT'), // 信息窗口标题
				enableMessage: false, // 设置允许信息窗发送短息
			}
			let description = $(myMap).attr('map-informationD'); // 信息窗口描述
			let infoWindow = new BMap.InfoWindow(description, opts); // 创建信息窗口对象
			map.openInfoWindow(infoWindow, point); // 开启信息窗口
			map.enableScrollWheelZoom(); // 启用地图滚轮放大缩小
			// 向地图中添加缩放控件
			let ctrl_nav = new BMap.NavigationControl({
				anchor: BMAP_ANCHOR_TOP_LEFT,
				type: BMAP_NAVIGATION_CONTROL_LARGE
			});
			map.addControl(ctrl_nav);
			// 向地图中添加缩略图控件
			let ctrl_ove = new BMap.OverviewMapControl({
				anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
				isOpen: 1
			});
			map.addControl(ctrl_ove);
			// 向地图中添加比例尺控件
			let ctrl_sca = new BMap.ScaleControl({
				anchor: BMAP_ANCHOR_BOTTOM_LEFT
			});
			map.addControl(ctrl_sca);
		}
		// 创建地图函数
		let myMap = $('[mapContainer]');
		if(myMap.length > 0) initMap();
    });
    exports('initMapExt');
});