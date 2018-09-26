"use strict"
var section = document.querySelector(".our-team__teammates");
var teammates = document.querySelectorAll(".teammate");
window.addEventListener("scroll", animation);
function animation(){
    if(section.pageYOffset == window.pageYOffset || section.pageYOffset == document.documentElement.scrollTop){
        for(var i = 0; i<teammates.length; i++){
            teammates[i].classList.add("slideInUp");
            teammates[i].classList.add("fadeInLeft");
            teammates[i].classList.add("fadeInRight");
        }
    }
}


