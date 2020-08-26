$(function () {
    first_animate(); // 绗竴灞忛娆″姩鐢诲姞杞�
    //渚ц竟瀵艰埅鍔犻敋鐐�
    var nextpage = 1;
    $(function () {
        $("#pageNav li").click(function () {
            $.fn.fullpage.moveTo($(this).attr('data-menuanchor'));
        });
        $(".common_boxbm").click(function () {
            $.fn.fullpage.moveTo("page" + (Number(nextpage) + 1));
        });
    });
    /*鍏ㄥ睆杞挱*/
    $('#fullpage').fullpage({
        menu: '#pageNav',
        lockAnchors: true,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9', 'page10'],
        resize: true,
        onLeave: function (index, nextIndex) {
            nextpage = nextIndex;
            switch (nextIndex) {
                case 1:
                    first_animate();
                    break;
                case 2:
                    top_title_animate('.second');
                    second_animate();
                    break;
                case 3:
                    top_title_animate('.third');
                    third_animate();
                    break;
                case 4:
                    top_title_animate('.forth');
                    break;
                case 5:
                    top_title_animate('.fifth');
                    fifth_animate();
                    break;
                case 6:
                    top_title_animate('.sixth');
                    break;
                case 7:
                    top_title_animate('.seventh');
                    seventh_animate();
                    break;
                case 8:
                    top_title_animate('.eighth');
                    eighth_animate();
                    break;
                case 9:
                    top_title_animate('.ninth');
                    ninth_animate();
                    break;
                case 10:
                    top_title_animate('.tenth');
                    tenth_animate();
                    break;
            }
            switch (index) {
                case 1:
                    first_animate();
                    break;
                case 2:
                    top_title_animate('.second');
                    second_animate();
                    break;
                case 3:
                    top_title_animate('.third');
                    third_animate();
                    break;
                case 4:
                    top_title_animate('.forth');
                    break;
                case 5:
                    top_title_animate('.fifth');
                    fifth_animate();
                    break;
                case 6:
                    top_title_animate('.sixth');
                    var el = $('.sixth_chart_content');

                    el.find(".sixth_chart_ll").css({ height: "0" });
                    el.find(".sixth_chart_lr").css({ height: "0" });
                    el.find(".sixth_chart_rl").css({ height: "0" });
                    el.find(".sixth_chart_rr").css({ height: "0" });
                    break;
                case 7:
                    top_title_animate('.seventh');
                    seventh_animate();
                    break;
                case 8:
                    top_title_animate('.eighth');
                    eighth_animate();
                    break;
                case 9:
                    top_title_animate('.ninth');
                    ninth_animate();
                    break;
                case 10:
                    top_title_animate('.tenth');
                    tenth_animate();
                    break;
            }
        },

        afterLoad: function (anchorLink, index) {
            $(".floatBar_outer").eq(index - 1).addClass("on").siblings(".floatBar_outer:not(:last-child)").removeClass("on");
            if (index == 4) {
                $(".forth_center_show").addClass("on");
            } else if (index == 6) {
                // 鍔犺浇绗叚灞忓唴瀹�
                six_content();
            } else {
                $(".forth_center_show").removeClass("on");
            }
            if (index == 1) {
                /*$("#pageNav").hide();
                $(".head").hide();
                $(".english_left").hide();*/
            } else {
                $("#pageNav").show();
                $(".head").show();
                $(".english_left").show();
            }

        }

    });

    third_slider(); 

    eighth_slide(); 

    dotdots(); 
});


function top_title_animate(dom) {
    var el = $(dom).find('.common_top_content');
    el.children('h3').toggleClass('animated fadeInDown').css({
        "animationDelay": ".4s"
    });
    el.children('line').toggleClass('animated fadeInDown').css({
        "animationDelay": ".6s"
    });
    el.children('.zh_text').toggleClass('animated fadeInDown').css({
        "animationDelay": ".8s"
    });
}

// 绗竴灞�
function first_animate() {
    var el = $(".first_detail");
    el.children('.first_logo1').toggleClass('animated fadeInDown').css({
        "animationDelay": ".4s"
    });
    el.children('.frist_name').toggleClass('animated fadeInDown').css({
        "animationDelay": ".6s"
    });
    el.children('.first_english').toggleClass('animated fadeInDown').css({
        "animationDelay": ".8s"
    });
    el.children('.first_info').toggleClass('animated fadeInDown').css({
        "animationDelay": "1s"
    });
    el.children('.first_eInfo').toggleClass('animated fadeInDown').css({
        "animationDelay": "1.2s"
    });
    el.children('.first_contact').toggleClass('animated fadeInDown').css({
        "animationDelay": "1.4s"
    });
    el.find('.first_connect').toggleClass('animated fadeInDown').css({
        "animationDelay": "1.6s"
    });
}

function second_animate() {
    var el = $(".second_difficult");
    el.children('.second_difficult1').eq(0).toggleClass('animated fadeInLeft').css({
        "animationDelay": ".6s"
    });
    el.children('.second_difficult1').eq(1).toggleClass('animated fadeInLeft').css({
        "animationDelay": ".4s"
    });
    el.children('.second_difficult1').eq(2).toggleClass('animated fadeInRight').css({
        "animationDelay": ".4s"
    });
    el.children('.second_difficult1').eq(3).toggleClass('animated fadeInRight').css({
        "animationDelay": ".6s"
    });
}

function third_animate() {
    var el = $(".third_process"), len = el.find('.third_processr .third_processr_ul li').length;

    el.children('.third_processl').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".4s"
    });

    for (var i = 0; i < len; i++) {
        el.find('.third_processr .third_processr_ul li').eq(i).toggleClass('animated fadeInRight').css({
            "animationDelay": (0.1 + (i / 10)) + "s"
        });
    }
}

function fifth_animate() {
    var el = $(".fifth_center_show");
    el.children('.show_info1').toggleClass('animated fadeIn').css({
        "animationDelay": ".4s"
    });
    el.children('.show_info3').toggleClass('animated fadeIn').css({
        "animationDelay": ".6s"
    });
    el.children('.show_info6').toggleClass('animated fadeIn').css({
        "animationDelay": ".8s"
    });
    el.children('.show_info10').toggleClass('animated fadeIn').css({
        "animationDelay": "1s"
    });
    el.children('.show_info11').toggleClass('animated fadeIn').css({
        "animationDelay": "1.2s"
    });
    el.children('.show_info8').toggleClass('animated fadeIn').css({
        "animationDelay": "1.4s"
    });
    el.children('.show_info5').toggleClass('animated fadeIn').css({
        "animationDelay": "1.6s"
    });
    el.children('.show_info2').toggleClass('animated fadeIn').css({
        "animationDelay": "1.8s"
    });
    el.children('.show_info4').toggleClass('animated fadeIn').css({
        "animationDelay": "2s"
    });
    el.children('.show_info7').toggleClass('animated fadeIn').css({
        "animationDelay": "2.2s"
    });
    el.children('.show_info9').toggleClass('animated fadeIn').css({
        "animationDelay": "2.4s"
    });
}

function six_content() {
    var el = $('.sixth_chart_content');

    var data1 = [{
        chuantong: 3.12,
        yuzhua: 41.36
    },
    {
        chuantong: 20.53,
        yuzhua: 80.21
    }];
    $(".sixth_chart_ll i").text(data1[0].chuantong);
    $(".sixth_chart_lr i").text(data1[0].yuzhua);
    $(".sixth_chart_rl i").text(data1[1].chuantong);
    $(".sixth_chart_rr i").text(data1[1].yuzhua);
    $(".sixth_chart_ll").css({ "height": (data1[0].chuantong) * 270 / 100 + "px" });
    $(".sixth_chart_lr").css({ "height": (data1[0].yuzhua) * 270 / 100 + "px" });
    $(".sixth_chart_rl").css({ "height": (data1[1].chuantong) * 270 / 100 + "px" });
    $(".sixth_chart_rr").css({ "height": (data1[1].yuzhua) * 270 / 100 + "px" });
    $(".sixth_chart_lEffect span").text(Math.round(data1[0].yuzhua - data1[0].chuantong));
    $(".sixth_chart_rEffect span").text(Math.round(data1[1].yuzhua - data1[1].chuantong));

    el.find(".sixth_chart_ll").stop().animate({ height: data1[0].chuantong + "%" });
    el.find(".sixth_chart_lr").stop().animate({ height: data1[0].yuzhua + "%" });
    el.find(".sixth_chart_rl").stop().animate({ height: data1[1].chuantong + "%" });
    el.find(".sixth_chart_rr").stop().animate({ height: data1[1].yuzhua + "%" });

}


function seventh_animate() {
    var el = $('.seventh .seventh_content');
    el.find('.content_l').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".8s"
    });
    el.find('.content_r').toggleClass('animated fadeInRight').css({
        "animationDelay": ".8s"
    });
}

function eighth_animate() {
    var el = $('.eighth .eighth_content');
    el.find('.eighth_items dd').find('.item_l').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".4s"
    });
    el.find('.eighth_items dd').find('.item_r').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".4s"
    });
    el.find('.phone_box').toggleClass('animated fadeInRight').css({
        "animationDelay": "0.4s"
    });
    el.find('.btn_box').toggleClass('animated fadeIn').css({
        "animationDelay": "1s"
    });
    el.find('.page_num_box').toggleClass('animated fadeIn').css({
        "animationDelay": "0.4s"
    });
}

function ninth_animate() {
    var el = $('.ninth .ninth_items'), len1 = el.find('dd').length, len2 = el.find('dt').length, n = 0, x = 0;

    for (var i = 0; i < len1; i++) {
        el.find('.item_' + (i + 1)).toggleClass('animated fadeInLeft').css({
            "animationDelay": (n += 0.2) + "s"
        });
    }

    for (var j = 0; j < len2; j++) {
        el.find('.diandian_' + (j + 1)).toggleClass('animated fadeInLeft').css({
            "animationDelay": (x += 0.15) + "s"
        });
    }

    $('.ninth .consult_btn').toggleClass('animated fadeInDown').css({
        "animationDelay": "0.4s"
    });
}

function tenth_animate() {
    var el = $('.tenth .tenth_items'), n = el.find('dd').length;

    for (var i = 1; i <= n; i++) {
        if (i % 2 == 1) {
            el.find('.item_' + i).toggleClass('animated fadeInDown').css({
                "animationDelay": (i / 10) + "s"
            });
        } else if (i % 2 == 0) {
            el.find('.item_' + i).toggleClass('animated fadeInUp').css({
                "animationDelay": (i / 10) + "s"
            });
        }
    }

    $('.tenth .consult_btn').toggleClass('animated fadeInDown').css({
        "animationDelay": "0.8s"
    });
}


function third_slider() {
    $(".third_processr").slide({
        mainCell: ".third_processr_ul",
        trigger: 'click',
        effect: "leftLoop",
        delayTime: 800,
        autoPlay: false,
        pnLoop: true,
        vis: 4,
        startFun: function (i) {

        }
    });

    $(".third_processl").slide({
        mainCell: ".third_processl_ul",
        trigger: 'click',
        effect: "leftLoop",
        delayTime: 800,
        autoPlay: false,
        autoPage: false,
        pnLoop: true
    });

    $(".third_processr a.prev").click(function () {
        $(".third_processl .prev").click();
    });

    $(".third_processr a.next").click(function () {
        $(".third_processl .next").click();
    });
    function scroll(len) {
        for (var i = 0; i < len; i++) {
            $(".third_processr a.next").click();
        }
    };
    $(".third_processr_li").click(function () {
        var ulDistance = $(".third_process").offset().left,
            eleDistance = $(event.target).offset().left,
            distance = eleDistance - ulDistance;
        if (distance == 468) {
            scroll(1);
        } else if (distance == 671) {
            // for(var i = 0; i < 2;i++){
            //     scroll();
            // }
            scroll(2);
        } else if (distance == 874) {
            // for(var i = 0; i < 3;i++){
            //     scroll();
            // }
            scroll(3);
        }
    })
}

function eighth_slide() {

    $(".eighth_content").slide({
        mainCell: "dl.eighth_items",
        trigger: 'click',
        effect: "leftLoop",
        delayTime: 800,
        autoPlay: false,
        pnLoop: true,
        prevCell: 'a.prev_item',
        nextCell: 'a.next_item',
        startFun: function (i, c, s) {
            var n = parseInt(i + 1);
            $(".eighth_content .page_num_box .curr_num").text(n <= 9 ? '0' + n : n);
            $(".eighth_content .page_num_box .total_num").text(c <= 9 ? ' / 0' + c : ' / ' + c);
        },
        endFun: function (i, c, s) {
        }
    });


    /**
     * 绗� 8 灞忓浘鐗囪疆鎾�
     * */
    $(".eighth_content").slide({
        mainCell: ".phone_box .phone_items_box dl.phone_items",
        trigger: 'click',
        effect: "leftLoop",
        delayTime: 800,
        autoPlay: false,
        autoPage: true,
        pnLoop: true,
        prevCell: 'a.prev_phone',
        nextCell: 'a.next_phone',
        startFun: function (i, c, s) {
        },
        endFun: function (i, c, s) {
        }
    });

    $(".eighth_content a.prev_item").click(function () {
        $(".eighth_content .phone_btn .prev_phone").click();
    });

    $(".eighth_content a.next_item").click(function () {
        $(".eighth_content .phone_btn .next_phone").click();
    });
}


function dotdots() {
    if (typeof (jQuery.fn.dotdotdot) != "function") {
        return;
    }

    $(".dot").dotdotdot();
}