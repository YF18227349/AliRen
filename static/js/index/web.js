layui.define(['jquery', 'fun'], function (exports) {
    let $ = layui.jquery,
        fun = layui.fun,
        element = layui.element,
        _val = null;
    let body = $('body');
    fun.ready(() => {
        new Swiper('.swiper-container-home', {
            pagination: {
                el: '.pagination-home',
            },
            autoplay: true,
            loop: true
        });

        new Swiper('.swiper-container-home1', {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 40,
            slidesPerGroup: 1,
            navigation: {
                nextEl: '.nextsc1',
                prevEl: '.prevsc1',
            }
        });
        element.on('tab(docTabBrief)', function (e) {
            let index = e.index;
            if (index == 0) {
                new Swiper('.swiper-container-home1', {
                    loop: true,
					slidesPerView: 3,
					spaceBetween: 40,
					slidesPerGroup: 1,
					navigation: {
						nextEl: '.nextsc1',
						prevEl: '.prevsc1',
					}
                });
            } else if (index == 1) {
                new Swiper('.swiper-container-home2', {
					loop: true,
					slidesPerView: 3,
					spaceBetween: 40,
					slidesPerGroup: 1,
					navigation: {
						nextEl: '.nextsc2',
						prevEl: '.prevsc2',
					}
                });
            } else if (index == 2) {
                new Swiper('.swiper-container-home3', {
					loop: true,
					slidesPerView: 3,
					spaceBetween: 40,
					slidesPerGroup: 1,
					navigation: {
						nextEl: '.nextsc3',
						prevEl: '.prevsc3',
					}
                });
            }
		});

		$("[y-tab-title] li").on('click',function() {
			let ind = $(this).index();
			$(this).addClass("active").siblings().removeClass('active');
			$("[y-tab-content] li").eq(ind).addClass("active").siblings().removeClass('active');
		});

		// 双向控制轮播
        var topSwiperIndex = new Swiper('.swiper-top', {
			on: {
				slideChangeTransitionStart: function () {
					indexUpdateNavPosition();
				}
			}
			
        })
        $('.bothwayprev1').on('click', function (e) {
            e.preventDefault()
            if (topSwiperIndex.activeIndex == 0) {
                topSwiperIndex.slideToLoop(topSwiperIndex.slides.length - 1, 1000);
                return;
            }
            topSwiperIndex.slidePrev()
        })
        $('.bothwaynext1').on('click', function (e) {
            e.preventDefault()
            if (topSwiperIndex.activeIndex == topSwiperIndex.slides.length - 1) {
                topSwiperIndex.slideToLoop(0, 1000);
                return;
            }
            topSwiperIndex.slideNext()
        })
        var bottomSwiperIndex = new Swiper('.swiper-bottom', {
            slidesPerView: 'auto',
            spaceBetween: 30,
            // allowTouchMove: false,
            on:{
				tap: function () {
					topSwiperIndex.slideToLoop(bottomSwiperIndex.clickedIndex);
				}
			}
        })
        function indexUpdateNavPosition() {
            $('.swiper-bottom .active-nav').removeClass('active-nav');
            var activeNav = $('.swiper-bottom .swiper-slide').eq(topSwiperIndex.activeIndex).addClass(
                'active-nav');
            if (!activeNav.hasClass('swiper-slide-visible')) {
                if (activeNav.index() > bottomSwiperIndex.activeIndex) {
                    var thumbsPerNav = Math.floor(bottomSwiperIndex.width / activeNav.width()) - 1;
                    bottomSwiperIndex.slideToLoop(activeNav.index() - thumbsPerNav);
                } else {
                    bottomSwiperIndex.slideToLoop(activeNav.index());
                }
            }
        };

        new Swiper('.swiper-logo', {
            slidesPerView: 5,
            slidesPerColumn: 1,
            spaceBetween: 23,
            pagination: {
              el: '.pagination1'
            },
            autoplay:true,
            loop:true
        });

        new Swiper('.swiper-container-product1', {
            loop: true,
            slidesPerView: 4,
            spaceBetween: 20,
            slidesPerGroup: 1,
            navigation: {
                prevEl: '.prev-pro1',
                nextEl: '.next-pro1',
            }
        });
        element.on('tab(docTabProduct)', function (e) {
            let index = e.index;
            if (index == 0) {
                new Swiper('.swiper-container-product1', {
                    loop: true,
					slidesPerView: 4,
					spaceBetween: 20,
					slidesPerGroup: 1,
					navigation: {
						nextEl: '.next-pro1',
						prevEl: '.prev-pro1',
					}
                });
            } else if (index == 1) {
                new Swiper('.swiper-container-product2', {
					loop: true,
					slidesPerView: 4,
					spaceBetween: 20,
					slidesPerGroup: 1,
					navigation: {
						nextEl: '.next-pro2',
						prevEl: '.prev-pro2',
					}
                });
            } else if (index == 2) {
                new Swiper('.swiper-container-product3', {
					loop: true,
					slidesPerView: 5,
					spaceBetween: 20,
					slidesPerGroup: 1,
					navigation: {
						nextEl: '.next-pro3',
						prevEl: '.prev-pro3',
					}
                });
            }
        });

        // 创建和初始化地图函数
		function initMap() {
			let myMap = $('#container');
			let lng = Number($(myMap).attr('map-lng'));
			let lat = Number($(myMap).attr('map-lat'));
			let map = new BMap.Map('container'); // 在百度地图容器中创建一个地图
			let point = new BMap.Point(lng, lat); // 定义一个中心点坐标
			map.centerAndZoom(point, 17); // 设定地图的中心点和坐标并将地图显示在地图容器中
			window.map = map; // 将map变量存储在全局
			let marker = new BMap.Marker(point); // 创建标注
			map.addOverlay(marker);
			let opts = {
				width: Number($(myMap).attr('map-informationW')), // 信息窗口宽度
				height: Number($(myMap).attr('map-informationH')), // 信息窗口高度
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
		let myMap = $('#container');
        if (myMap.length > 0) initMap();
        

        new Swiper('.swiper-container-newDeatil', {
            loop: true,
            slidesPerView: 4,
            spaceBetween: 12,
            slidesPerGroup: 1,
            navigation: {
                nextEl: '.next-newDeatil',
                prevEl: '.prev-newDeatil',
            }
        });

        let courseSwiper = new Swiper('.swiper-course', {
            loop: true,
            on:{
                slideChangeTransitionStart: function(){
                    let index = this.realIndex;
                    $('.slide_items li').eq(index).addClass('active').siblings().removeClass('active');
                }
            }
        });
        $('.slide_items li').on('click',function() {
            let index = $(this).index();
            courseSwiper.slideToLoop(index, 1000);
        })

        // 首页数字抖动效果
        function showNum(start, end, obj) {
            var t = setInterval(function () {
                if (start < end) {
                    start++;
                    $(obj).html(start);
                } else {
                    return false;
                    clearInterval(t);
                }
            }, 40);
        };
        layui.each($("[initPurNumber]"), function (k, v) {
            let start = $(v).attr('plus-start');
            let end = $(v).attr('plus-end');
            let obj = $(v);
            showNum(start, end, obj)
        });
         // 返回顶部
         $('[return_top]').hide();
         var height = 50;
         $(window).scroll(function () {
             if ($(window).scrollTop() > height) {
                 $('[return_top]').fadeIn(500);
             } else {
                 $('[return_top]').fadeOut(500);
             }
         });
         $('[return_top]').click(function () {
             $('body, html').animate({
                 scrollTop: 0
             }, 1000);
             return false;
         });
    });
    exports('web');
});