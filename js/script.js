document.body.addEventListener('touchmove', function(event) {
    event = event ? event : window.event;
    if(event.preventDefault) {
        event.preventDefault()
    } else {
        event.returnValue = false
    }
}, false);

var pages = function(obj) {
    var box = document.getElementById(obj.wrap);
    var box2 = document.getElementById(obj.wrap2);
    var len = obj.len;
    var n = obj.n;
    var startX, startY, moveY, moveX, cliH;
    //获取屏幕高度
    var getH = function() {
        cliH = document.body.clientHeight;
    };
    getH();
    window.addEventListener('resize', getH, false);
    //touchStart
    var touchstart = function(event) {
        if(!event.touches.length) {
            return;
        }
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
        moveY = 0;
    };
    //touchMove
    var touchmove = function(event) {
        if(!event.touches.length) {
            return;
        }
        moveX = event.touches[0].pageX - startX;
        moveY = event.touches[0].pageY - startY;
        box2.style.transform = 'translateY(' + (-n * cliH + moveY) + 'px)'; //根据手指的位置移动页面
    };
    //touchEnd
    var touchend = function(event) {
        //位移小于+-50的不翻页
        if(moveX < -50 || moveY < -50) n++;
        if(moveX > 50 || moveY > 50) n--;
        //最后&最前页控制
        if(n < 0) n = 0;
        if(n > len - 1) n = 0;
        //重定位
        box2.style.transform = 'translateY(' + (-n * 10) + '%)'; //根据百分比位置移动页面
        $(".text-wrap").children().hide();
        $('.text-' + (n + 1)).fadeIn();
    };
    //touch事件绑定
    box.addEventListener("touchstart", function(event) {
        touchstart(event)
    }, false);
    box.addEventListener("touchmove", function(event) {
        touchmove(event)
    }, false);
    box.addEventListener("touchend", function(event) {
        touchend(event)
    }, false);
}

function load() {
    max = 8;
    for (var i = 2; i <= max; i++) {
        $("#wrap2").append("<div class='page'><img class='photo' src='album/" + i + ".jpg' /></div>");
    }
    $('.load-total').html(max);
    count = 0;
    $('.photo').each(function(i) {
        $("<img/>").attr("src", $(this).attr("src")).load(function() {
            img = $('.photo:eq(' + i + ')');
            img.css('margin-left', '-' + ((img.width() - document.body.clientWidth) / 2) + 'px');
            count++;
            $('.load-count').html(count);
            if (count >= max) {
                $('.load-wrap').hide();
                $('.img-text').show();
                pages({
                    wrap: 'text-wrap', //.wrap的id
                    wrap2: 'wrap2', //.wrap2的id
                    len: max, //一共有几页
                    n: 0 //页面一打开默认在第几页？第一页就是0，第二页就是1
                });
            }
        });
    });
};

load();