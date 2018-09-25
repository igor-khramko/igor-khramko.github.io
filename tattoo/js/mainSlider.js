"use strict"
var slides = document.querySelectorAll(".slider__slide");
var controlUnits = document.querySelectorAll(".control__unit");
var newSlide;
var newControlUnit;
var shownSlide = slides[0];
var currentControlUnit = controlUnits[0];

for(var i = 0; i < controlUnits.length; i++){
    controlUnits[i].addEventListener("click", {handleEvent: displaySlide, slideCount : i});
}

function displaySlide(event){
    newSlide = slides[this.slideCount];
    newControlUnit = controlUnits[this.slideCount];
    if(shownSlide != newSlide){
        changeSlide();
    }
}

function changeSlide(){
    newControlUnit.classList.toggle("control__unit_active");
    currentControlUnit.classList.toggle("control__unit_active");
    newSlide.style.opacity = 1;
    shownSlide.style.opacity = 0;
    shownSlide = newSlide;
    currentControlUnit = newControlUnit;
}