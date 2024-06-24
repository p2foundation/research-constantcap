(function($){
	"use strict";
        
    // Sticky Header
    $(window).on('scroll',function() {
        if ($(this).scrollTop() > 120){
            $('.navbar-area').addClass("is-sticky");
        }
        else{
            $('.navbar-area').removeClass("is-sticky");
        }
    });

    // Home Slides
    $('.home-slides').owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        autoplayHoverPause: true,
        autoplay: true,
        mouseDrag: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        navText: [
            "<i class='flaticon-left-chevron'></i>",
            "<i class='flaticon-right-chevron'></i>"
        ]
    });
    $(".home-slides").on("translate.owl.carousel", function(){
        $(".main-banner-content h1").removeClass("animate__animated animate__fadeInUp").css("opacity", "0");
        $(".main-banner-content p").removeClass("animate__animated animate__fadeInDown").css("opacity", "0");
        $(".home-slides .btn-box").removeClass("animate__animated animate__fadeInDown").css("opacity", "0");
    });
    $(".home-slides").on("translated.owl.carousel", function(){
        $(".main-banner-content h1").addClass("animate__animated animate__fadeInUp").css("opacity", "1");
        $(".main-banner-content p").addClass("animate__animated animate__fadeInDown").css("opacity", "1");
        $(".main-banner-content .btn-box").addClass("animate__animated animate__fadeInDown").css("opacity", "1");
    });

    // Popup Video
    $('.popup-youtube').magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Feedback Slides
    $('.feedback-slides').owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        autoHeight: true,
        autoplayHoverPause: true,
        autoplay: true,
        mouseDrag: true,
        animateOut: 'fadeOut',
        items: 1,
        navText: [
            "<i class='flaticon-left-chevron'></i>",
            "<i class='flaticon-right-chevron'></i>"
        ],
    });

    // Projects Slides
    $('.projects-slides').owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        autoplayHoverPause: true,
        autoplay: true,
        mouseDrag: true,
        margin: 30,
        navText: [
            "<i class='fas fa-arrow-left'></i>",
            "<i class='fas fa-arrow-right'></i>"
        ],
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 2,
            },
            1024: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    });

    // Testimonials Slides
    $('.testimonials-slides').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        autoHeight: true,
        autoplayHoverPause: true,
        autoplay: true,
        mouseDrag: true,
        animateOut: 'fadeOut',
        items: 1,
        navText: [
            "<i class='flaticon-left-chevron'></i>",
            "<i class='flaticon-right-chevron'></i>"
        ],
    });

    // Partner Slides
    $('.partner-slides').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplayHoverPause: true,
        autoplay: true,
        mouseDrag: true,
        navText: [
            "<i class='flaticon-left-chevron'></i>",
            "<i class='flaticon-right-chevron'></i>"
        ],
        responsive: {
            0: {
                items: 2,
            },
            576: {
                items: 3,
            },
            768: {
                items: 4,
            },
            1024: {
                items: 4,
            },
            1200: {
                items: 5,
            }
        }
    });

    // Pricing Tabs
    $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
    $('.tab ul.tabs li a').on('click', function (g) {
        var tab = $(this).closest('.tab'),
        index = $(this).closest('li').index();
        tab.find('ul.tabs > li').removeClass('current');
        $(this).closest('li').addClass('current');
        tab.find('.tab-content').find('div.tabs-item').not('div.tabs-item:eq(' + index + ')').slideUp();
        tab.find('.tab-content').find('div.tabs-item:eq(' + index + ')').slideDown();
        g.preventDefault();
    });

    // Scroll Event
    $(window).on('scroll', function(){
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $('.go-top').addClass('active');
        if (scrolled < 300) $('.go-top').removeClass('active');
    });
    // Click Event
    $('.go-top').on('click', function() {
        $("html, body").animate({ scrollTop: "0" },  500);
    });

    $('.dropdown-submenu a.nav-link').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    // Search Popup JS
    $('.close-btn').on('click',function() {
        $('.search-overlay').fadeOut();
        $('.search-btn').show();
        $('.close-btn').removeClass('active');
    });
    $('.search-btn').on('click',function() {
        $(this).hide();
        $('.search-overlay').fadeIn();
        $('.close-btn').addClass('active');
    });

    // WOW JS
    $(window).on ('load', function (){
        if ($(".wow").length) {
            var wow = new WOW({
                boxClass: 'wow', // animate__animated animate__element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 20, // distance to the element when triggering the animation (default is 0)
                mobile: true, // trigger animations on mobile devices (default is true)
                live: true, // act on asynchronously loaded content (default is true)
            });
            wow.init();
        }
    });

    // Odometer JS
    $('.odometer').appear(function (e) {
        var odo = $(".odometer");
        odo.each(function () {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });

    // Accordion
    $(".accordion .accordion-item").on("click", function(){
        $(this).addClass('active');
    });

    // Unique Testimonials Slides
    $('.unique-testimonials-slides').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        autoHeight: true,
        autoplayHoverPause: true,
        autoplay: true,
        mouseDrag: true,
        animateOut: 'fadeOut',
        items: 1,
        navText: [
            "<i class='flaticon-left-chevron'></i>",
            "<i class='flaticon-right-chevron'></i>"
        ],
    });

    // skill Bar
	$('.skill-bar').each(function() {
		jQuery(this).find('.progress-content').animate({
		    width:jQuery(this).attr('data-percentage')
		},2000);
		jQuery(this).find('.progress-number-mark').animate(
		{left:jQuery(this).attr('data-percentage')},
		{
			duration: 2000,
			step: function(now, fx) {
			var data = Math.round(now);
			jQuery(this).find('.percent').html(data + '%');
			}
		});  
	});
        
}(jQuery));