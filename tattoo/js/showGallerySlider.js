'use strict'
var body = document.querySelector("body");
var testimonialsSlider, galleryPhotos;
var gallerySlider = document.querySelector(".gallery__slider");
var galleryPreview = document.querySelectorAll(".preview__item");
var galleryPhotosURL = ['url("../img/gallery/1.jpg")', 'url("../img/gallery/2.jpg")', 'url("../img/gallery/3.jpg")'];
var closeBtn = document.querySelector(".gallery__slider-close");

$(document).ready(function(){
    testimonialsSlider = $('.testimonials__slider').bxSlider(
        {
            auto: true,
            autoHover: true,
            randomStart: true,
            pager: false
        }
    );
    galleryPhotos = $('.gallery__photos').bxSlider(
        {
            pager: false
        }
    );
});

for(var i = 0; i < galleryPreview.length; i++){
    galleryPreview[i].addEventListener("click", {handleEvent: showSlider, slideCount : i});
}

closeBtn.addEventListener("click", hideSliderByCloseBtn);
window.addEventListener("click", hideSliderByBlur);

function showSlider(event){
    body.style.overflow = "hidden";
    gallerySlider.style.marginTop = screen.height - gallerySlider.clientHeight/2;
    galleryPhotos.goToSlide(this.slideCount);
    gallerySlider.style.display = "block";
    galleryPhotos.redrawSlider();
}

function hideSliderByCloseBtn(){
    gallerySlider.style.display = "none";
    body.style.overflow = "auto";
}

function hideSliderByBlur(event){
    if(event.target == gallerySlider){
        gallerySlider.style.display = "none";
        body.style.overflow = "auto";
    }
}