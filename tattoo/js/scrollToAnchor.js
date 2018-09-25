"use strict"
var menu = document.querySelector(".navigation");
var links = document.querySelectorAll('.navigation__item');
var arrow = document.querySelector(".arrow");
var scrollSpeed = .5;

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", pageScroll);
}
arrow.addEventListener("click", pageScroll);
window.addEventListener("scroll", toggleArrow);
function toggleArrow(){
    if(pageYOffset >= menu.getBoundingClientRect().bottom + pageYOffset){
        arrow.style.display = "block";
        arrow.style.opacity = 1;
    } else if(pageYOffset < menu.getBoundingClientRect().bottom + pageYOffset){
        arrow.style.display = "none";
        arrow.style.opacity = 0;
    }
}

function pageScroll(){
    var w = window.pageYOffset;
    
    var hash = this.href.replace(/[^#]*(.*)/, '$1');
    console.log(hash);
    var t = document.querySelector(hash).getBoundingClientRect().top;
    var start = null;
    requestAnimationFrame(step);
    function step(time) {
        if (start === null) start = time;
        var progress = time - start;
        var r = (t < 0 ? Math.max(w - progress/scrollSpeed, w + t) : Math.min(w + progress/scrollSpeed, w + t));
        window.scrollTo(0,r);
        if (r != w + t) {requestAnimationFrame(step)} else {location.hash = hash}
    }
    return false;
}