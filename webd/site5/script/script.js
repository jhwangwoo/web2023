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