// cv-templates-carousel.js
// Karuzela szablonów CV w Kreatorze CV
$(document).ready(function(){
    $('.cv-carousel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: true
    });
});
