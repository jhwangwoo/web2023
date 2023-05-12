$(document).ready(function(){});


// 메뉴 : 하나씩 나오기
$(function(){
    $(".nav > ul > li").mouseover(function(){
        $(this).find(".submenu").stop().slideDown(200);
    });
    $(".nav > ul > li").mouseout(function(){
        $(this).find(".submenu").stop().slideUp(200);
    });
    $(".nav > ul > li").focusin(function(){
        $(this).find(".submenu").stop().slideDown(200);
    });
    $(".nav > ul > li").focusout            (function(){
        $(this).find(".submenu").stop().slideUp(200);
    });



// 슬라이드 : 페이드 효과
    let currentIndex = 0;
    const $slider = $(".slider");
    $slider.hide().first().show(); // 모든 이미지 숨기고 첫번째 이미지 나타나게

    setInterval(function(){
        let nextIndex = (currentIndex + 1) % $slider.length;
        $slider.eq(currentIndex).fadeOut(1200);
        $slider.eq(nextIndex).fadeIn(1200);

        currentIndex = nextIndex;
    }, 3000);

    // 탭 메뉴
    const tabBtn = $(".info_menu > a");
    const tabCont = $(".info_cont > ul");;
    tabCont.hide().eq(0).show();

    tabBtn.on("click", function(){
        const index = $(this).index();

        $(this).addClass("active").siblings().removeClass("active");
        tabCont.eq(index).show().siblings().hide();
    });

});
