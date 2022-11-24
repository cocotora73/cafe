$(function () {
    
    //menu-open 
    $navBtn = $('.mobile-menu__btn');
    $navDown = $('.nav-down');

    $navBtn.click(function () {
        $(this).toggleClass('active');
    });

    $navBtn.click(function () {
        if ($navDown.hasClass('nav-show')) {
            $navDown.removeClass('nav-show');
        } else {
            $navDown.addClass('nav-show');
        }
    });

    //slideshow
    let slideCurrent = 0;
    let lastCurrent = $('.slide').length - 1;

    $('.slide').css('display', 'none');
    $('.slide').eq(slideCurrent).css('display', 'block');

    function changeslide () {
        $('.slide').fadeOut(1000);
        $('.slide').eq(slideCurrent).fadeIn(1500);
    }

    var Timer;

    function startTimer () {
        Timer = setInterval (function () {
            if (slideCurrent === lastCurrent) {
                slideCurrent = 0;
                changeslide();
            } else {
                slideCurrent++;
                changeslide();
            };
        }, 8000);
    }

    function stopTimer () {
        clearInterval(Timer);
    }

    startTimer();

  
    //sticky
    $('header').each(function () {
        let $window = $(window);
            $header = $(this);
            $pageHeader = $('.page-header');
            
            headerOffsetTop = $header.offset().top;

        $window.on('scroll',  function () {
            if ($window.scrollTop() > 770) {
                $pageHeader.addClass('visible');
            } else {
                $pageHeader.removeClass('visible');
            }
        });
        $window.trigger('scroll');
    });


     //scroll
    $('html,body').animate({ scrollTop: 0 }, '1');

    $('a[href^="#"]' + 'a:not([href *= "menu1"])' + 'a:not([href *= "menu2"])' + 'a:not([href *= "menu3"])' + 'a:not([href *= "menu4"])').click(function () {
        let href = $(this).attr("href");
        let abjust = 180;
        let target = $(href === "#" || href === "" ? 'html' : href);
        let position = target.offset().top - abjust;
        let speed = 500;

        $("html, body").animate({
            scrollTop: position
        }, speed, "swing");
        return false;
    });


    //page-top
    let appear = false;
    let pagetop = $('.page-top');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) { 
        if (appear == false) {
            appear = true;
            pagetop.stop().animate({
            'bottom': '230px' 
            }, 500); 
        }
        } else {
        if (appear) {
            appear = false;
            pagetop.stop().animate({
            'bottom': '-230px' 
            }, 500);
        }
        }
    });

    pagetop.on('click', 'a', function (event) {
        event.preventDefault();
        $('body', 'html').animate({ scrillTop: 0 }, 600);
        return false;
    });


    //tav-menu
    $('#menu').each(function () {
        let $tabList = $(this).find('.tabs-nav');
            $tabAnchors = $tabList.find('a');
            $tabPanels = $(this).find('.tabs-panel');
        
        $tabList.on('click', 'a',  function(event) {
            event.preventDefault();

            let $this = $(this);

            if ($this.hasClass('active')) {
                return;
            }

            $tabAnchors.removeClass('active');
            $this.addClass('active');

            $tabPanels.hide();
            $($this.attr('href')).show();
        });

        $tabAnchors.eq(0).trigger('click');
    }); 
});