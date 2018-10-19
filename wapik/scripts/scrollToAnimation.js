"use strict"
var section = document.querySelector(".our-team__content");
var teammates = document.querySelectorAll(".teammate");
window.addEventListener("scroll", animation);
function animation(){
    if(section.getBoundingClientRect().top < 400){
        for(var i = 0; i<teammates.length; i++){
            teammates[1].classList.add("slideInUp");
            teammates[0].classList.add("fadeInLeft");
            teammates[2].classList.add("fadeInRight");
        }
    }
    console.log(section.getBoundingClientRect().top);
}



