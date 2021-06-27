$(function() {
    // 模态框
    $('#search').on('click', function() {

        $('#mtk').slideDown();
        $('#bg').show();
        $('#btn').focus();
    })
    $('#btn').on('blur', function() {
            $('#bg').hide();
            $('#mtk').slideUp();
        })
        // 手机端不行
    $('#m_search').on('click', function() {

        $(this).siblings('#mtk').slideDown();
        $(this).siblings('#bg').show();
        $(this).siblings('#btn').focus();
    })
    $('#btn').on('blur', function() {
            $(this).siblings('#mtk').hide();
            $(this).siblings('#bg').slideUp();
        })
        //导航栏
    $(".nav>li").hover(function() {
        // stop 方法必须写到动画的前面
        $(this).children("ul").stop().slideToggle();
    });
    // 手机端导航栏
    //手机端导航栏显示
    $('.mobil_nav').on('click', function() {
        $('.mobil-nav').show();
        $('.mobil-nav ul').stop(false, true).animate({
            width: 100 + '%'
        });

    });
    $('.mobil-nav .close').on('click', function() {
        $('.mobil-nav').hide();
        $('.mobil-nav ul').stop(false, true).animate({
            width: 0 + '%'
        });

    });
    // 轮播图
    $('.carousel').carousel({
            interval: 2000
        })
        //显示二维码
    $('.social span').hover(function() {
            $(this).children('img').stop().toggle();
        })
        //幕布（教师介绍）
    $('.teachers #main').hover(function() {
            $(this).children('.main_mask').stop().slideToggle();
        })
        // 侧边栏

    // 被卷去的头部 scrollTop()  / 被卷去的左侧 scrollLeft()
    // 页面滚动事件
    var boxTop = $(".news").offset().top;
    $(window).scroll(function() {
        // console.log(11);
        if ($(document).scrollTop() >= boxTop) {
            $(".aside").fadeIn();
        } else {
            $(".aside").fadeOut();
        }
    });
    // 返回顶部
    $(".aside").click(function() {
            // $(document).scrollTop(0);
            $("body, html").stop().animate({
                scrollTop: 0
            });
            // $(document).stop().animate({
            //     scrollTop: 0
            // }); 不能是文档而是 html和body元素做动画
        })
        //移动端时，导航栏界面
})