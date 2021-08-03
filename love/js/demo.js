$(document).ready(function () {
    $("body").on("touchstart", function(e) {
        var curId = $(e.target).attr('id');
        // 判断默认行为是否可以被禁用
        if (e.cancelable && curId !== 'alink_pre' && curId !== 'alink_next') {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
    });
    $("body").on("touchend", function(e) {
        var curId = $(e.target).attr('id');
        // 判断默认行为是否可以被禁用
        if (e.cancelable && curId !== 'alink_pre' && curId !== 'alink_next') {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;
        //左滑
        if ( X > 100) {
            document.getElementById("alink_pre").click();
            console.log('左滑'+X);
        }
        //右滑
        else if ( X < -100) {
            document.getElementById("alink_next").click();
            console.log('右滑'+X);	
        }
        //单击
        else{
            console.log('单击');
        }
    });
})