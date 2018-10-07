"use strict"
var navigation = document.querySelector(".navigation");
var navigationItems = document.querySelector(".navigation__items");
var mainSections = document.querySelector("main").children;
window.addEventListener("scroll", changeNavColor);

// function setLightTheme(){
//     navigation.classList.add("navigation_light");
//     navigation.classList.remove("navigation_dark");
//     navigationItems.classList.add("navigation__items_dark");
//     navigationItems.classList.remove("navigation__items_light");
//     navigation.style.opacity = .8;
// }

// function setDarkTheme(){
//     navigation.classList.add("navigation_dark");
//     navigation.classList.remove("navigation_light");
//     navigationItems.classList.add("navigation__items_light");
//     navigationItems.classList.remove("navigation__items_dark");
//     navigation.style.opacity = .8;
// }

// function changeNavColor(){
//     for(var i = 1; i < mainSections.length; i++){
//         if(navigation.getBoundingClientRect().top > 0){
//             //возврат внешнего вида navigation при обратном скролле
//             navigation.style.opacity = 1;
//         } else if(pageYOffset < mainSections[0].getBoundingClientRect().bottom + pageYOffset){
//             //тёмная тема navigation для banner
//             setDarkTheme();
//         } else if(i == mainSections.length - 1 && pageYOffset >= mainSections[i].getBoundingClientRect().top - navigation.clientHeight/2+ pageYOffset && pageYOffset < mainSections[i].getBoundingClientRect().bottom - navigation.clientHeight + pageYOffset && 
//         getComputedStyle(mainSections[i]).backgroundColor == "rgb(0, 0, 0)"){
//             //светлаяя тема navigation для последнего section (contact us)
//             setLightTheme();
//         } else if(
//             pageYOffset >= mainSections[i].getBoundingClientRect().top - navigation.clientHeight/2 + pageYOffset && 
//             pageYOffset < mainSections[i+1].getBoundingClientRect().top - navigation.clientHeight + pageYOffset && 
//             getComputedStyle(mainSections[i]).backgroundColor == "rgb(0, 0, 0)"){
//             //светлаяя тема navigation для всех section с тёмным background-color
//             setLightTheme();
//         } else if(
//             pageYOffset >= mainSections[i].getBoundingClientRect().top - navigation.clientHeight/2 + pageYOffset && 
//             pageYOffset < mainSections[i+1].getBoundingClientRect().top - navigation.clientHeight + pageYOffset &&
//             getComputedStyle(mainSections[i]).backgroundColor == "rgb(255, 255, 255)"
//         ){
//             //тёмная тема navigation для всех section со светлым background-color
//             setDarkTheme();
//         }
//     }
// }


function changeNavColor(){
    if(navigation.getBoundingClientRect().top > 0){
        //возврат внешнего вида navigation при обратном скролле
        navigation.style.backgroundColor = "#000";
    } else if(navigation.getBoundingClientRect().top == 0){
        //тёмная тема navigation для banner
        navigation.style.backgroundColor = "#383d45";
    }
}