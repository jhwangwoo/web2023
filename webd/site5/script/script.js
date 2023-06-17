let index = 0;
const $sliderinner = $(".slider__inner");
const $slider = $(".sider");
const $sliderwidth = $slider.width();
console.log($sliderwidth)
$sliderinner.append($slider.first().clone(true));
console.log($sliderinner)
setInterval(() =>{
    index++;
    $sliderinner.animate({marginLeft:-$sliderwidth * index}, 600);
    
    if(index == $slider.length){
        setTimeout(function(){
            $sliderinner.animate({marginLeft: 0},0);
            index = 0;
        }, 700)
    }

},2000);





const modal = document.querySelector(".notice ul .modal");
const modalview = document.querySelector(".noticemodal");
const modalclose = document.querySelector(".noticemodalclose");
console.log(modalclose)
    modal.addEventListener("click" , () => {
        modalview.style.display = "block"
    });
    modalclose.addEventListener("click" , () => {
        modalview.style.display = "none"
    });

$(function(){

});