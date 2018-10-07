$(document).ready(function () {
    var burgerState = "burger";
    $(".navigation__burger").click(function () {
        if (burgerState == "close") {
            $(".navigation__items").slideUp();
            $(".navigation__burger").toggleClass("active");
            burgerState = "burger";
        } else if (burgerState == "burger") {
            $(".navigation__items").slideDown();
            $(".navigation__burger").toggleClass("active");
            burgerState = "close";
        }
    });
});