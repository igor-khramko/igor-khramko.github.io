var menu = document.querySelector(".navigation");
var menuItems = document.querySelectorAll(".navigation__item");
var burger = document.querySelector(".header__navigation-icon");

burger.addEventListener("click", changeMenuState);
window.addEventListener("resize", removeMenu);

for(var i=0; i<menuItems.length; i++){
    menuItems[i].addEventListener("click", changeMenuState);
}

function changeMenuState(){
    if(menu.classList.contains("navigation_adaptive")){
        menu.classList.add("fadeOutRight");
        menu.classList.toggle("navigation_adaptive")
    } else{
        menu.classList.add("fadeInRight");
        menu.classList.toggle("navigation_adaptive");
    }
}

function removeMenu(){
    if(menu.classList.contains("navigation_adaptive")){
        menu.classList.remove("navigation_adaptive");
    }
}


