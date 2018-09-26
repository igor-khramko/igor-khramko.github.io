var menu = document.querySelector(".navigation");
var menuItems = document.querySelectorAll(".navigation__item");
var burger = document.querySelector(".header__navigation-icon") || document.querySelector(".header__navigation-icon_dark");

burger.addEventListener("click", changeMenuState);
window.addEventListener("resize", removeMenu);

for(var i=0; i<menuItems.length; i++){
    menuItems[i].addEventListener("click", changeMenuState);
}

function changeMenuState(){
    if(menu.classList.contains("header__navigation-icon_dark")){
        menu.classList.toggle("navigation_adaptive-dark");
    } else {
        menu.classList.toggle("navigation_adaptive");
    }
}

function removeMenu(){
    if(menu.classList.contains("navigation_adaptive") || menu.classList.contains("navigation_adaptive-dark")){
        menu.classList.remove("navigation_adaptive");
        menu.classList.remove("navigation_adaptive-dark");
    }
}


