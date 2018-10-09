'use strict'
var body = document.querySelector("body");
var bannerSlider, testimonialsSlider, previewSlider, galleryPhotos;
// var galleryModal = document.querySelector(".gallery__modal");
// var galleryPreview = document.querySelectorAll(".preview__item");
var galleryPhoto = document.querySelector(".gallery__photo");
// var closeBtn = document.querySelector(".gallery__modal-close");

$(document).ready(function(){
    bannerSlider = $('.banner__slider').bxSlider(
        {
            auto: true,
            autoHover: true,
            controls: false,
            pagerCustom: ".banner__dots"
        }
    );
    testimonialsSlider = $('.testimonials__slider').bxSlider(
        {
            auto: true,
            autoHover: true,
            randomStart: true,
            pager: false
        }
    );
    previewSlider = $(".preview__slider").bxSlider(
        {
            slideMargin: 3,
            minSlides: 3,
            maxSlides: 20,
            pager: false,
            auto: false
        }
    )
    galleryPhotos = $('.gallery__slider').bxSlider(
        {
            auto: false,
            controls: false,
            mode: 'fade',
            pagerCustom: ".gallery__preview"
        }
    );
});

// for(var i = 0; i < galleryPreview.length; i++){
//     galleryPreview[i].addEventListener("click", {handleEvent: showFullPhoto, photoCount : i, fullSizeURL : galleryPreview[i].getAttribute("full-size-url")});
// }

// closeBtn.addEventListener("click", hideFullPhotoByCloseBtn);
// window.addEventListener("click", hideFullPhotoByBlur);

// function showFullPhoto(event){
//     body.style.overflow = "hidden";
//     galleryModal.style.marginTop = screen.height - galleryModal.clientHeight/2;
//     galleryPhoto.style.backgroundImage = `url(${this.fullSizeURL})`;
//     galleryModal.style.display = "block";
// }

// function hideFullPhotoByCloseBtn(){
//     galleryModal.style.display = "none";
//     body.style.overflow = "auto";
// }

// function hideFullPhotoByBlur(event){
//     if(event.target == galleryModal){
//         galleryModal.style.display = "none";
//         body.style.overflow = "auto";
//     }
// }