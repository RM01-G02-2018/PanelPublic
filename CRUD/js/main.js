/*----------------------------------
        barra de navegacion sticky-bar
    -----------------------------------*/
(function ($) {
    "use strict";
    /* main nav active */
    $(".account-satting-active , .search-active").on("click", function (e) {
        e.preventDefault();
        $(this).parent().find('.account-dropdown , .search-content').slideToggle('medium');
    })


    var header = $('.sticky-bar');
    var win = $(window);
    win.on('scroll', function () {
        var scroll = win.scrollTop();
        if (scroll < 200) {
            header.removeClass('stick');
        } else {
            header.addClass('stick');
        }
    });

    /*--------------------------
       jQuery mobile-menu
   ---------------------------- */

    $('#mobile-menu-active').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: ".mobile-menu-area .mobile-menu",
    });


    /*--------------------------
                ScrollUps
    ---------------------------- */

    $.scrollUp({
        scrollText: '<i class="fa fa-angle-double-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });


})(jQuery);