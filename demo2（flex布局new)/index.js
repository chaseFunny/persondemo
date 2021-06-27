window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    var index = 0;
    //鼠标移动了判断变量
    var flag = false;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s'
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    //解决一波自动播放完继续第一张播放
    ul.addEventListener('transitionend', function() {
            if (index >= 3) {
                index = 0;
                ul.style.transition = 'none';
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else if (index < 0) {
                index = 2;
                ul.style.transition = 'none';
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
            //让小圆点跟随图片变化
            ol.querySelector('.current').classList.remove('current');
            ol.children[index].classList.add('current');
        })
        //手指拖动轮播图
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        //手指触摸停止定时器
        clearInterval(timer);

    })
    ul.addEventListener('touchmove', function(e) {
        flag = true;
        e.preventDefault();
        moveX = e.targetTouches[0].pageX - startX;
        var translateX = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    })
    ul.addEventListener('touchend', function(e) {
            if (flag) {
                //判断图片左右滑动
                if (Math.abs(moveX) > 50) {
                    if (moveX > 0) {
                        index--;
                    } else {
                        index++;
                    }
                    //实现左右图片左右滑动
                    var translatex = -index * w;
                    ul.style.transition = 'all .3s';
                    ul.style.transform = 'translateX(' + translatex + 'px)'
                } else {
                    var translatex = -index * w;
                    // ul.style.transition = 'all .1s';
                    ul.style.transform = 'translateX(' + translatex + 'px)'
                }
            }
            //开启定时器
            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                var translatex = -index * w;
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }, 2000);
        })
        // 返回顶部功能
    var goback = this.document.querySelector('.goback');
    var nav = this.document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    })
    goback.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})