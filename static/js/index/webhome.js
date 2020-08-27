$(function () {
    first_animate();
    let nextpage = 1;
    $(function () {
        $("#pageNav li").click(function () {
            $.fn.fullpage.moveTo($(this).attr('data-menuanchor'));
        });
    });
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
                    forth_animate();
                    break;
                case 5:
                    top_title_animate('.fifth');
                    fifth_animate();
                    break;
                case 6:
                    top_title_animate('.sixth');
                    six_animate();
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
                    forth_animate();
                    break;
                case 5:
                    top_title_animate('.fifth');
                    fifth_animate();
                    break;
                case 6:
                    top_title_animate('.sixth');
                    six_animate();
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
            if (index == 5) {
                $(".fifth_center_show").addClass("on");
            } else {
                $(".fifth_center_show").removeClass("on");
            }
        }
    });
});


// 标题动画
function top_title_animate(dom) {
    let el = $(dom).find('.common_top_content');
    el.children('h3').toggleClass('animated fadeInDown').css({
        "animationDelay": ".4s"
    });
    el.children('.line').toggleClass('animated fadeInDown').css({
        "animationDelay": ".6s"
    });
    el.children('.zh_text').toggleClass('animated fadeInDown').css({
        "animationDelay": ".8s"
    });
}

// 第1屏
function first_animate() {
    
}
// 第2屏
function second_animate() {
    let el = $(".second .text");
    el.toggleClass('animated fadeInLeft').css({
        "animationDelay": ".7s"
    });
}
// 第3屏
function third_animate() {
    let el = $(".third .content-wrap");
    el.find('.left-ul').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".7s"
    });
    el.find('.right-ul').toggleClass('animated fadeInRight').css({
        "animationDelay": ".7s"
    });
}
// 第4屏
function forth_animate() {
    let el = $('.forth .forth_process');
    el.find('.forth_process-left').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".7s"
    });
    el.find('.forth_process-right .swiper-slide').toggleClass('animated fadeInRight').css({
        "animationDelay": ".7s"
    });
}
// 第5屏
function fifth_animate() {
    let el = $('.fifth .fifth_center');
    el.find('.fifth_center_l').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".7s"
    });
}
// 第6屏
function six_animate() {
    console.log("six")
    let el = $(".sixth_center_show");
    el.children('.show_info1').toggleClass('animated fadeIn').css({
        "animationDelay": ".9s"
    });
    el.children('.show_info3').toggleClass('animated fadeIn').css({
        "animationDelay": "1.2s"
    });
    el.children('.show_info6').toggleClass('animated fadeIn').css({
        "animationDelay": "1.3s"
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
}

// 第7屏
function seventh_animate() {
    let el = $('.seventh .seventh_center');
    el.find('.seventh_center_l').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".8s"
    });
    el.find('.seventh_center_r').toggleClass('animated fadeInRight').css({
        "animationDelay": ".8s"
    });
}
// 第8屏
function eighth_animate() {
    let el = $('.eighth .eighth_content');
    el.find('.content_l').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".8s"
    });
    el.find('.content_r').toggleClass('animated fadeInRight').css({
        "animationDelay": ".8s"
    });
}

function ninth_animate() {
    let el = $('.ninth .ninth_process');
    el.find('.left-text').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".7s"
    });
    el.find('.right-img-box').toggleClass('animated fadeInRight').css({
        "animationDelay": ".7s"
    });
}

function tenth_animate() {
    let el = $('.tenth');
    el.find('.record-info').toggleClass('animated fadeInLeft').css({
        "animationDelay": ".5s"
    });
}