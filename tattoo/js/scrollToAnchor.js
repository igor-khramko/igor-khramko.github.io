"use strict"
var banner = document.querySelector(".banner");
var links = document.querySelectorAll('.navigation__item');
var arrow = document.querySelector(".arrow");
var scrollSpeed = .5;
window.addEventListener("scroll", toggleArrow);

$(document).ready(function(){
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", pageScroll);
    }
    arrow.addEventListener("click", pageScroll);
    function pageScroll(event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({scrollTop: $(hash).offset().top}, 900);
    }
});

function toggleArrow(){
    if(pageYOffset >= banner.getBoundingClientRect().bottom - banner.clientHeight/2){
        arrow.style.visibility = "visible";
        arrow.style.opacity = 1;
    } else if(pageYOffset < banner.getBoundingClientRect().bottom - banner.clientHeight/2){
        arrow.style.visibility = "hidden";
        arrow.style.opacity = 0;
    }
}