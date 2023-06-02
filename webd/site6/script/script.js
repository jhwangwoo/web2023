$(document).ready(function(){});


$(function(){
    
    const sliderWrap = document.querySelector(".slider__inner");
    const sliderImg = document.querySelectorAll(".sldier");
    const sliderclone = sliderImg[0].cloneNode(true);
    sliderWrap.appendChild(sliderclone);
    const count = document.querySelectorAll(".sldier").length;
    let currentIndex = 0;
    setInterval(() => {
        sliderWrap.style.transition = "all 0.3s";
        currentIndex = (currentIndex + 1) % count;
        sliderWrap.style.transform = `translateY(-${400 * currentIndex}px)`;
        if(currentIndex == count-1){
            setTimeout(() => {
                sliderWrap.style.transition = "all 0s";
                currentIndex = 0;
                sliderWrap.style.transform = `translateY(-${400 * currentIndex}px)`;
            }, 1000)
        }
    }, 2000);

    //메뉴
    $(".nav > ul > li").mouseover(function() {
        $(".nav > ul > li").find(".submenu").stop().slideDown();
        $(".nav > ul > li").find(".submenu").css("opacity", 1);
      });
      
      $(".nav > ul > li").mouseout(function() {
        $(".nav > ul > li").find(".submenu").stop().slideUp();
        $(".nav > ul > li").find(".submenu").css("opacity", "your_value");
      });

    // 탭 메뉴
    const tabBtn = $(".notice__gallery__menu > a");
    const tabCont = $(".notice__gallery__info > ul");;
    tabCont.hide().eq(0).show();

    tabBtn.on("click", function(){
        const index = $(this).index();

        $(this).addClass("active").siblings().removeClass("active");
        tabCont.eq(index).show().siblings().hide();
    });

    let btn = document.querySelector(".notice__gallery__info .notice");
    let popup = document.querySelector(".popup__wrap");
    let close = document.querySelector(".close");

    btn.addEventListener("click", ()=>{
        popup.style.display = "block"
    });
    close.addEventListener("click", ()=>{
        popup.style.display = "none"
    });

});