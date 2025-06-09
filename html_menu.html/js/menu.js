$(function() {

    // first visual
    (function () {
        const parent = gsap.timeline({
            scrollTrigger: {
                trigger: '.first-visual',
                start: 'top top',
                end: '+=500',
                pin: true,
            }
        })

        gsap.timeline()
        .fromTo('.first-visual-calli-top img', {opacity: 0}, {opacity: 1, duration: 0.2, stagger: 0.05})
        .fromTo('.first-visual-calli-bot img', {opacity: 0}, {opacity: 1, duration: 0.2, stagger: 0.05})

        gsap.timeline({
            scrollTrigger: {
                pinnedContainer: '.first-visual',
                start: parent.scrollTrigger.start + 50,
            }
        })
        .add([
            gsap.to('.first-visual-video-top', {height: '100vh'}),
            gsap.to('.first-visual-video-bot', {height: 0}),
        ])
        .add([
            gsap.to('.first-visual-calli-top', {scale: 1, ease: 'Expo.easeInOut'}),
            gsap.to('.first-visual-calli-bot', {opacity: 0}),
        ], '-=0.2')
        .fromTo('.first-visual-text1', {
            opacity: 0, scale: 5
        }, {
            opacity: 1, scale: 1, ease: 'Expo.easeIn'
        })
        .fromTo('.first-visual-text2', {
            opacity: 0, scale: 5
        }, {
            opacity: 1, scale: 1, ease: 'Expo.easeIn'
        })
    })();

    // menu section
    (function () {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.menu-title-wrap',
                start: 'top 75%',
            }
        })
        .from('.menu-main-title .down-item', {y: '-100%', duration: 0.4})
        .from('.menu-sub-title .down-item', {y: '-100%', duration: 0.4})
        .from('.menu-left-area', {opacity: 0, y: 100, duration: 0.5})
        .from('.menu-right-area', {opacity: 0, y: 100, duration: 0.5}, '-=0.2')

        const marquee = $('.menu-marquee-container.marquee-container').marquee({
            direction: 'horizontal',
            reverse: false,
            speed: 80,
            pauseOnHover: false,
            autoplay: true,
            grid: 1,
            toggleAutoplay: false,
            trigger: null,
        });

        const swiper = new Swiper('.food-swiper', {//food swiper in the left area
            spaceBetween: 30,
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            fadeEffect: {
                crossFade: true,
            }
        });

        const slider = new Swiper('.food-slider', {//food slider in the right area
            spaceBetween: 0,
            effect: "slide",
            centeredSlides: true,
            loop: true,
            allowTouchMove: false,
            slidesPerView: 1,
            speed: 1000,
            autoplay: {
                delay: 2000,
            },
        });

        slider.on('slideChangeTransitionStart', function () {
            const activeSlide = slider.slides[slider.activeIndex];
            const highlightBg = activeSlide.querySelector('.highlight_bg');
            if (highlightBg) {
                gsap.from(highlightBg,
                    { scaleX: 0, duration: 0.7, ease: "power1.inOut", delay: 0.3 },
                );
            }
        });
    })();

    // mid visual
    (function () {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.mid-visual',
                start: 'top 20%',
            }
        })
        .fromTo('.mid-visual-calli-top img', {opacity: 0}, {opacity: 1, duration: 0.2, stagger: 0.05})
        .fromTo('.mid-visual-text1', {
            opacity: 0, scale: 5
        }, {
            opacity: 1, scale: 1, ease: 'Expo.easeIn'
        })
        .fromTo('.mid-visual-text2', {
            opacity: 0, scale: 5
        }, {
            opacity: 1, scale: 1, ease: 'Expo.easeIn'
        })
    })();

    // slate
    (function () {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.slate-top',
                start: 'top 70%',
            }
        })
        .from('.slate-top .down-item', {
            y: '-100%',
            duration: 0.5,
            stagger: 0.3,
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: '.slate-bot',
                start: 'top 70%',
            }
        })
        .from('.slate-bot .down-item', {
            y: '-100%',
            duration: 0.5,
            stagger: 0.3,
        })
        .from('.slate-food-item', {
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
        })
        
        gsap.timeline({
            scrollTrigger: {
                trigger: '.slate-pan-container',
                start: 'top 70%',
            },
            repeat: -1,
        })
        .to('.slate-dotted-bigger', {opacity: 1, duration: 0.75, ease: 'steps(1)'})
        .to('.slate-dotted-bigger', {opacity: 0, duration: 0.75, ease: 'steps(1)'})
        .to('.slate-dotted-small', {opacity: 1, duration: 0.75, ease: 'steps(1)'})
        .to('.slate-dotted-small', {opacity: 0, duration: 0.75, ease: 'steps(1)'})
    })();

    (function() {//메뉴
        var _container = '.menu-ajax-container';
        var _btnMore = '.menu-btn-more';
        var _list = '.menu-item-wrapper';
        var totalCount = 0;
        var menuPage = 1;
        var menuSca = "";
        $(_container).on('click', '.menu-btn-wrapper a', function(e) {
            e.preventDefault();
            menuPage = 1;
            menuSca = $(this).data('sca');
            $.post(location.href, {menu_sca: menuSca}, function(response) {
                $(_container).html($(response).find(_container).html());
                $(window).trigger('scroll');
                ScrollTrigger.refresh();
            });
        });
        $(_container).on('click', _btnMore, function(e) {
            e.preventDefault();
            totalCount = $(this).data('total-count');
            $.post(location.href, {menu_page: ++menuPage, menu_sca: menuSca}, function(response) {
                $(_list).append($(response).find(_list).html());
                $(window).trigger('scroll');
                ScrollTrigger.refresh();
                if ($(_list).children().length >= totalCount) {
                    $(_btnMore).hide(0);
                }
            });
        });
    }());
});