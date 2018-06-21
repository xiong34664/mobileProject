/**
 * Created by Administrator on 2018/6/19 21:38.
 */

'use strict';

$(function () {
    /*拷贝第一张和最后一张 */
    var liFirst=$(".imgBox>li").first().clone(true);
    var liLast=$(".imgBox>li").last().clone(true);

    /*动态添加 导航li 给下标为0的li添加active  在imgBox最前面和最后面添加最后一张和第一张图片实现无缝轮播*/
    $(".imgBox>li").each(function () {
        $(".lists").append("<li></li>");
    }).eq(0).before(liLast).parent().append(liFirst);
    $(".lists li").eq(0).addClass("active");


    //点击li  移动  imgBox
    $(".lists").on("tap", "li", function () {
        if (index === imgLength) {
            $(".imgBox").css({left: 0});
        }
        index = $(this).index();
        move(index);
    });

    var startX, endX;
    $(".banner").on("touchstart", function (e) {
        //手指开始时记录手指所在坐标
        startX=e.touches[0].clientX;
        clearTimeout(timerId);
    });
    $(".banner").on("touchmove", function (e) {
        //手指结束时记录手指所在坐标
        var imgX = e.changedTouches[0].clientX;
        var x =imgX-startX;

        $(".imgBox").css({left: x - (index+1) * imgWidth});

    })
    $(".banner").on("touchend", function (e) {
        //手指结束时记录手指所在坐标
        endX=e.changedTouches[0].clientX;
        var moveX = endX - startX;
        Math.abs(moveX) < 50 ? $(".imgBox").animate({left:imgWidth*-(index+1)}):moveX>0?prev():next();

        timerId = setInterval(function () {
            next()
        }, 3000)
    })
    // 创建  定时器
    var timerId = setInterval(function () {
        next()
    }, 3000)
})

var index = 0;
var imgWidth;
var imgLength = $(".imgBox li").length;

$(window).on("resize",function () {
    imgWidth = $(".banner").width();
    $(".imgBox").css({left:-(index+1)*imgWidth,width:imgWidth*(imgLength+2)}).find("li").width(imgWidth)
});

$(window).trigger("resize");

function next() {
    index++;
    move(function () {
        if (index >= imgLength) {
            $(".imgBox").css("left", -imgWidth);
            index = 0;
        }
    });

}
function prev() {
    index--;
    move(function () {
        if (index < 0) {
            $(".imgBox").css("left", -imgLength * imgWidth);
            index = imgLength - 1;
        }
    });
}
function move(fn) {
    var liIndex = index;
    //如果当前是  克隆的那一张图片  即无缝滚动  里的  第一张  将li的第一个添加curr
    liIndex = liIndex === imgLength ? 0 : liIndex;
    console.log(liIndex);
    $(".lists> li").eq(liIndex).addClass("active").siblings().removeClass("active");
    $(".imgBox").animate({left: -(index+1) * imgWidth},'ease',fn);

}