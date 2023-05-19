$(function(){
    //이미지 슬라이드
    let currenIndex = 0;
    $(".sliderWrap").append($(".slider").first().clone(true));

    setInterval(function(){
        currenIndex++;
        $(".sliderWrap").animate({marginLeft: -100 * currenIndex + "%" }, 600);

        if(currenIndex == 3){
            setTimeout(function(){
                $(".sliderWrap").animate({marginLeft:0}, 0);
                currenIndex = 0;
            },700);
        }
    },3000);

    //메뉴
    $(".nav > ul > li").mouseover(function(){
        $(this).find(".submenu").stop().slideDown();
    });
    $(".nav > ul > li").mouseout(function(){
        $(this).find(".submenu").stop().slideUp();
    });
    
    //팝업
    $(".popup-btn").click(function(){
        $(".popup-view").show();
    });
    $(".popup-close").click(function(){
        $(".popup-view").hide();
    });
});

