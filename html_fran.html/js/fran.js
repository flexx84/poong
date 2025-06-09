(function($){
    $(document).ready(function() {

        (function (){//common
            $('.highlight_wrap .highlight').each(function(i){
                $this = $(this);

                gsap.timeline({
                    scrollTrigger:{
                        trigger: $this,
                        start: 'top 60%'
                    }
                })
                .from($this,{width: 0, duration: 0.7})
            })
        }());

        (function(){//everyday

            let everydaySlide =  new Swiper('.everyday_bg01 .swiper-container', {
                slidesPerView: 'auto',
                speed: 300,
                autoplay: {
                    stopOnLastSlide: true,
                    delay: 250,
                },  
                effect : 'fade',
                allowTouchMove: 'true',
                fadeEffect: {
                    crossFade: false,
                },
            });

            everydaySlide.autoplay.stop();
            
            window.titleImgTl = gsap.timeline({delay: 0.5, paused: true});
            titleImgTl.from('.everyday_subTit', {opacity: 0, scale: 5, stagger: 0.15, ease: 'expo.inOut'})
            titleImgTl.from('.everyday_tit_img', {opacity: 0, stagger: 0.1, ease: 'expo.inOut'});
            titleImgTl.from('.everyday_des', {opacity: 0, duration: 0.3})
            titleImgTl.from('.everyday_side', {opacity: 0, x: '20%', duration: 0.7})
            
            window.introTl = gsap.timeline({repeat: -1, repeatDelay: 0.5, paused: true});
            introTl
            .add([
                gsap.to('.everyday_bg01', {scale: 1.5, duration: 2, ease: Expo.easeInOut}),
                gsap.to('.everyday_bg02_in', {scale: 1.5, duration: 2, ease: Expo.easeInOut}),
                // gsap.timeline({delay: 0.5})
                // .from('.everyday_subTit', {opacity: 0, scale: 5, stagger: 0.15, ease: 'expo.inOut'})
                // .from('.everyday_tit_img', {opacity: 0, stagger: 0.1, ease: 'expo.inOut'})
                // .from('.everyday_des', {opacity: 0, duration: 0.3})
                // .from('.everyday_side', {opacity: 0, x: '20%', duration: 0.7})
            ])
            .add([
                gsap.to('.everyday_bg01', {scale: 1, duration: 2, ease: Expo.easeInOut}),
                gsap.to('.everyday_bg02_in', {scale: 1, duration: 2, ease: Expo.easeInOut}),
            ], '-=0.8')
            .add([
                gsap.to('.everyday_bg02', {width: '0%', delay: 0.3, duration: 0.7}),
                gsap.to({}, {duration: 3.0}),
                function() {
                    everydaySlide.autoplay.start();
                },
            ])
            .add([
                gsap.to('.everyday_bg02', {width: '100%', delay: 0.3, duration: 0.7}),
                function() {
                    everydaySlide.autoplay.stop();
                    everydaySlide.slideTo(0, 0);
                },
            ])
            .add([
                gsap.to('.everyday_bg02_in_video', {opacity: 1, duration: 1}),
                function() {
                    $('.everyday_video')[0].play();
                },
            ])
            .add([
                gsap.to('.everyday_bg02', {width: '50%', duration: 0.7}),
                gsap.to('.everyday_bg02_in_video', {opacity: 0}),
            ], '+=2.5')
        }());

        (function() {//original
            let originalSlide =  new Swiper('.original_box02 .swiper-container', {
                slidesPerView: 'auto',
                speed: 1000,
                autoplay: {
                    delay: 600,
                },  
                effect : 'fade',
                allowTouchMove: 'true',
                fadeEffect: {
                    crossFade: false,
                },
            });

            originalSlide.autoplay.stop();

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.original',
                    start: 'top 60%'
                }
            })
            .add([
                gsap.from('.original_box_bg', {scale: 1.1, duration: 1.5}),
                gsap.from('.original .highlight', {width: 0, duration: 0.7, delay: 0.4}),
                gsap.from('.original_titWrap .stamp', {opacity:0,scale: 5, duration: 0.2, ease: 'expo.inOut'}),
                gsap.from('.original_titWrap .txt .move', {y: '-100%', opacity: 0, stagger: 0.25, delay: 0.2})
            ])
            .eventCallback("onComplete", function() {
                originalSlide.autoplay.start();
                $('.original_box').each(function() {
                    $(this).hover(
                        function() {
                            $(this).find('.original_box_bg').css({
                                transition: 'transform 1s',
                                transform: 'scale(1.05)'
                            });
                        },
                        function() {
                            $(this).find('.original_box_bg').css({
                                transform: 'scale(1)'
                            });
                        }
                    );
                });
            });
        })();

        (function(){//expect
            gsap.timeline({
                scrollTrigger:{
                    trigger: '.expect',
                    start: 'top 70%'
                }
            })
            .from('.expect_tit01 .yell', {opacity:0,scale:5, duration:0.4, ease: 'expo.inOut'})
            .from('.expect_tit01 .move', {y:'-100%',duration:0.4,})
            .from('.expect_tit02 .yell', {opacity:0,scale:5, duration:0.4, ease: 'expo.inOut'})
            .from('.expect_tit02 .move', {y:'-100%',duration:0.4,})

            gsap.timeline({
                scrollTrigger:{
                    trigger: '.expect_cont',
                    start: 'top 60%'
                }
            })
            .from('.expect_cont_center .t_box', {opacity:0, y: '60%'})
            .from('.expect_cont_center .highlight', {width: 0, duration: 0.7})

            new Swiper('.expect_box01 .swiper-container', {
                slidesPerView: 'auto',
                speed: 500,
                    autoplay: {
                    delay: 1500,
                },
                effect : 'fade',
                    allowTouchMove: 'true',
                    fadeEffect: {
                        crossFade: true,
                    },
            });

            new Swiper('.expect_box02 .swiper-container', {
                slidesPerView: 'auto',
                speed: 500,
                    autoplay: {
                    delay: 1500,
                },
                effect : 'fade',
                    allowTouchMove: 'true',
                    fadeEffect: {
                        crossFade: true,
                    },
            });

        }());

        (function(){//expect02
            gsap.timeline({
                scrollTrigger:{
                    trigger: '.expect02',
                    start: 'top center'
                }
            })
            .add([
                gsap.from('.expect02_b_box01', {opacity:0, x: '50%'}),
                gsap.from('.expect02_b_box02', {opacity:0, x: '-50%'}),
            ])
        }());

        (function(){//expect03
            gsap.timeline({
                scrollTrigger:{
                    trigger: '.expect03',
                    start: 'top center'
                }
            })
            .from('.expect03_circle_stamp', {opacity:0, scale:5, stagger: 0.25, ease: 'expo.inOut'})

            gsap.timeline({
                scrollTrigger:{
                    trigger: '.expect03_bottom',
                    start: 'top center'
                }
            })
            .from('.expect03_b_tit .move', {opacity:0, y: '-100%',duration:0.3 })
            .from('.expect03_b_des .move', {opacity:0, y: '-100%',duration:0.3 })
            .add([
                gsap.from('.expect03_b_map_bg02', {opacity:0, y: '-80%', ease: 'back(1.1)', duration: 0.3}),
                gsap.from('.expect03_b_map_stamp ', {opacity:0, scale:5, duration: 0.2, ease: 'expo.inOut',delay:0.28}),
                gsap.from('.expect03_b_map_bg.yell ', {opacity:0, y: '-80%', ease: 'back(1.1)', stagger: 0.13,delay:0.3}),
                gsap.from('.expect03_b_map_bg.brown ', {opacity:0, y: '-80%', ease: 'back(1.1)', stagger: 0.13,delay:0.6})
            ])
        }());

        (function(){//day_top
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.day_top',
                    start: 'top 60%'
                }
            })
            .from('.day_t_tit .move', {opacity:0, y: '-100%', stagger: 0.25})
            .from('.day .day_top_store', {opacity:0, y: '100%',})
            .from('.day_bottom_line', {height: 0})

            var targetCount01 = $('.day_b_box01 .count').data('number');
            var targetCount02 = $('.day_b_box02 .count01').data('number');
            var targetCount03 = $('.day_b_box02 .count02').data('number');
            var targetCount04 = $('.day_b_box03 .count01').data('number');

            gsap.timeline({//day_b_box01
                scrollTrigger: {
                    trigger: '.day_bottom',
                    start: 'top 60%'
                }
            })
            .from('.day_b_box01 .box_in .tit .move', {opacity:0, y: '-100%'})
            .add([
                gsap.to({number:0},{number: 1, duration: 0.7, onUpdate: function() {
                    $('.day_b_box01 .count').text(Math.floor((targetCount01 * this.progress())).toLocaleString());
                }}),
                gsap.from('.day_b_box01 .box_in .des .move', {opacity:0, y: '-100%',stagger: 0.4 })
            ])    

            const daySlide =  new Swiper('.day_b_box01_r_sl .swiper-container', {
                slidesPerView: 'auto',
                loop: true,
                speed: 500,
                    autoplay: {
                    delay: 2000,
                },
            });

            const tl01 = gsap.timeline({paused: true, delay: 0.4})
            .from('.day_b_box01_r_sl .swiper-slide01 .stamp', { scale: 5, opacity: 0, duration: 0.4, ease: 'expo.inOut' })
            .call(function() {
                new Counting($('.day_b_box01_r_sl .swiper-slide01 .count_num .num'), {
                    type: 'img',
                    duration: 10,
                    diff: 56,
                    delay: 20,
                    loop: 2,
                    slowFx: true,
                    slowV: 8,
                }).play();
            }, null, -0.5)

            const tl02= gsap.timeline({paused: true, delay: 0.4, duration: 0.1 })
            .from('.day_b_box01_r_sl .swiper-slide02 .stamp', { scale: 5, opacity: 0, duration: 0.4, ease: 'expo.inOut' })
            .call(function() {
                new Counting($('.day_b_box01_r_sl .swiper-slide02 .count_num .num'), {
                    type: 'img',
                    duration: 10,
                    diff: 56,
                    delay: 20,
                    loop: 2,
                    slowFx: true,
                    slowV: 8,
                }).play();
            }, null, -0.5)

            const tl03 = gsap.timeline({paused: true, delay: 0.4, duration: 0.1})
            .from('.day_b_box01_r_sl .swiper-slide03 .stamp', { scale: 5, opacity: 0, duration: 0.4, ease: 'expo.inOut' })
            .call(function() {
                new Counting($('.day_b_box01_r_sl .swiper-slide03 .count_num .num'), {
                    type: 'img',
                    duration: 10,
                    diff: 56,
                    delay: 20,
                    loop: 2,
                    slowFx: true,
                    slowV: 8,
                }).play();
            }, null, -0.5)
            
            const tl04 = gsap.timeline({paused: true, delay: 0.4, duration: 0.1})
            .from('.day_b_box01_r_sl .swiper-slide04 .stamp', { scale: 5, opacity: 0, duration: 0.4, ease: 'expo.inOut' })
            .call(function() {
                new Counting($('.day_b_box01_r_sl .swiper-slide04 .count_num .num'), {
                    type: 'img',
                    duration: 10,
                    diff: 56,
                    delay: 20,
                    loop: 2,
                    slowFx: true,
                    slowV: 8,
                }).play();
            }, null, -0.5)

            const tl05 = gsap.timeline({paused: true, delay: 0.4, duration: 0.1})
            .from('.day_b_box01_r_sl .swiper-slide05 .stamp', { scale: 5, opacity: 0, duration: 0.4, ease: 'expo.inOut' })
            .call(function() {
                new Counting($('.day_b_box01_r_sl .swiper-slide05 .count_num .num'), {
                    type: 'img',
                    duration: 10,
                    diff: 56,
                    delay: 20,
                    loop: 2,
                    slowFx: true,
                    slowV: 8,
                }).play();
            }, null, -0.5)

            daySlide.on('slideChangeTransitionEnd', function(){
                slideMotion(daySlide);
            });
            slideMotion(daySlide);
            function slideMotion(swiper){
                const nowSlideIdx = swiper.realIndex;

                switch (nowSlideIdx) {
                    case 0:
                    tl02.pause(0);
                    tl03.pause(0);
                    tl04.pause(0);
                    tl05.pause(0);
                    tl01.play();
                    break;
                
                    case 1:
                    tl01.pause(0);
                    tl03.pause(0);
                    tl04.pause(0);
                    tl05.pause(0);
                    tl02.play();
                    break;
                
                    case 2:
                    tl01.pause(0);
                    tl02.pause(0);
                    tl04.pause(0);
                    tl05.pause(0);
                    tl03.play();
                    break;

                    case 3:
                    tl01.pause(0);
                    tl02.pause(0);
                    tl03.pause(0);
                    tl05.pause(0);
                    tl04.play();
                    break;

                    case 4:
                    tl01.pause(0);
                    tl02.pause(0);
                    tl03.pause(0);
                    tl04.pause(0);
                    tl05.play();
                    break;

                    default:
                    break;
                }
            }

            
            gsap.timeline({//day_b_box02
                scrollTrigger: {
                    trigger: '.day_b_box02',
                    start: 'top 60%'
                }
            })
            .from('.day_b_box02 .box_in .tit .move', {opacity:0, y: '-100%'})
            .add([
                gsap.to({number:0},{number: 1, duration: 0.4, onUpdate: function() {
                    $('.day_b_box02 .count01').text(Math.floor((targetCount02 * this.progress())).toLocaleString());
                }}),
                gsap.to({number:0},{number: 1, duration: 0.4, onUpdate: function() {
                    $('.day_b_box02 .count02').text(Math.floor((targetCount03 * this.progress())).toLocaleString());
                }}),
                gsap.from('.day_b_box02 .box_in .des .move', {opacity:0, y: '-100%',stagger: 0.4 })
            ])

            new Swiper('.day_b_box02_sl .swiper-container', {
                slidesPerView: 'auto',
                speed: 500,
                    autoplay: {
                    delay: 1500,
                },
                effect : 'fade',
                    allowTouchMove: 'true',
                    fadeEffect: {
                        crossFade: true,
                    },
            });

            gsap.timeline({//day_b_box03
                scrollTrigger: {
                    trigger: '.day_b_box03',
                    start: 'top 60%'
                }
            })
            .from('.day_b_box03 .box_in .tit .move', {opacity:0, y: '-100%'})
            .from('.day_b_box03 .box_in .des .move', {opacity:0, y: '-100%',stagger: 0.4 })
            .add([
                gsap.to({number:0},{number: 1, duration: 0.4, onUpdate: function() {
                    $('.day_b_box03 .count01').text(Math.floor((targetCount04 * this.progress())).toLocaleString());
                }}),
            ])
            
        }());

        (function() {//evening
            var targetCount = $('.evening_b_box01_left .count').data('number');
            var targetCount02 = $('.evening_b_box02_left .des02 .count01').data('number');
            var targetCount03 = $('.evening_b_box02_left .des02 .count02').data('number');
            var targetCount04 = $('.evening_b_box02_left .des04 .count').data('number');

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.evening',
                    start: 'top 60%'
                }
            })
            .from('.evening .day_t_subTit .move', {opacity:0, y: '-100%',stagger: 0.4 })
            .from('.evening .day_top_store', {opacity:0, y: '100%'})
            .from('.evening_bottom_line', {height:0})

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.evening_b_box01',
                    start: 'top 60%'
                }
            })
            .from('.evening_b_box01_left .over_h .move', {opacity:0, y: '-100%', stagger: 0.25})
            .to({number:0},{number: 1, duration: 0.4, onUpdate: function() {
                $('.evening_b_box01_left .count').text(Math.floor((targetCount * this.progress())).toLocaleString());
            }})

            

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.evening_b_box02',
                    start: 'top 60%'
                }
            })
            .from('.evening_b_box02 .move_wrap01 .move', {opacity:0, y: '-100%', stagger: 0.25})
            .add([
                gsap.to({number:0},{number: 1, duration: 0.4, onUpdate: function() {
                    $('.evening_b_box02_left .des02 .count01').text(Math.floor((targetCount02 * this.progress())).toLocaleString());
                }}),
                gsap.to({number:0},{number: 1, duration: 0.4, onUpdate: function() {
                    $('.evening_b_box02_left .des02 .count02').text(Math.floor((targetCount03 * this.progress())).toLocaleString());
                }}),
            ])
            .from('.evening_b_box02_left .line', {scaleX: 0})
            .from('.evening_b_box02 .move_wrap02 .move', {opacity:0, y: '-100%', stagger: 0.25})
            .to({number:0},{number: 1, duration: 0.4, onUpdate: function() {
                $('.evening_b_box02_left .des04 .count').text(Math.floor((targetCount04 * this.progress())).toLocaleString());
            }}),

            new Swiper('.evening_b_box02_right .swiper-container', {
                slidesPerView: 'auto',
                speed: 500,
                    autoplay: {
                    delay: 1500,
                },
            });

        }());

        (function(){//dawn
            gsap.timeline({
                scrollTrigger:{
                    trigger:'.dawn .day_top',
                    start: 'top 60%'
                }
            })
            .from('.dawn .day_t_subTit .move', {opacity:0, y: '-100%',stagger: 0.4 })
            .from('.dawn .day_top_store', {opacity:0, y: '100%'})
            .from('.dawn_bottom_line', {height:0})

            gsap.timeline({
                scrollTrigger:{
                    trigger:'.dawn_bottom_in01',
                    start: 'top 60%'
                }
            })
            .add([
                gsap.from('.dawn_bottom_in01 .dawn_b_left', {opacity:0, x: '-20%', duration:0.8}),
                gsap.from('.dawn_bottom_in01 .dawn_b_right', {opacity:0, x: '20%', duration:0.8}),
                // gsap.fromTo('.dawn_beer', {opacity:0},{opacity:1, stagger:0.06, repeat: -1, ease: 'none',})
            ])
            
            new Swiper('.dawn_b_left_bg .swiper-container', {
                slidesPerView: 'auto',
                speed: 500,
                    autoplay: {
                    delay: 1500,
                },
                effect : 'fade',
                    allowTouchMove: 'true',
                    fadeEffect: {
                        crossFade: true,
                    },
            });

            var figureItem = $('.dawn_beer_wrap .dawn_beer'),
                figurePrev = false,
                figureDelay = 0.1;

            var figureTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.dawn_bottom',
                    start: 'top bottom',
                    end: 'bottom top',
					toggleActions: 'restart reset restart restart'
                },
                repeat: -1
            });
            figureItem.each(function(i){
                var $this = $(this)
                figureTl.set($this, {opacity: 1}, figureDelay*i)
                figureTl.set($this, {opacity: 0}, figureDelay*(i+1))
            });

            gsap.timeline({
                scrollTrigger:{
                    trigger:'.dawn_bottom_in02',
                    start: 'top 60%'
                }
            })
            .from('.dawn_b_left_bg', {scale: 1.1, duration: 1.5})

        }());

        (function(){//easy
            gsap.timeline({
                scrollTrigger:{
                    trigger: '.easy',
                    start: 'top 60%'
                }
            })
            .from('.easy_top_tit .yell', {opacity:0, scale: 5, duration: 0.25, ease: 'expo.inOut'})
            .from('.easy_top_tit .over_h .move', {opacity:0, y: '-100%'})

            gsap.timeline({
                scrollTrigger:{
                    trigger: '.easy_in',
                    start: 'top 60%'
                }
            })
            .from('.easy_box', {opacity:0, stagger:0.3})

            gsap.timeline({
                scrollTrigger:{
                    trigger: '.easy_in',
                    start: 'bottom bottom',
                    end: '+=200',
                    pin: true,
                }
            })
            .from('.easy_box_circle', {opacity:0, y: '30%', delay:0.2})
        }());
        
        (function(){//kitchen
            const $kitchen = $('.kitchen_wrap');
            const totalScrollDistance = 2600;
            const subTlDurations = [];
            const subTl = [];
            let subTlProgress = [];
            let totalDuration = 0;
            let tl;

            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.kitchen',
                    start: 'top top',
                    end: '+=' + totalScrollDistance,
                    scrub: true,
                    pin: true,
                },
                onUpdate: function() {
                    const index = subTlProgress.findIndex((progress) => {
                        return this.progress() < progress;
                    });
                    $('.kitchen .side_tab_line').filter('.on').removeClass('on');
                    $('.kitchen .side_tab_line').eq(index).addClass('on');
                    $('.kitchen .side_tab').filter('.on').removeClass('on');
                    $('.kitchen .side_tab').eq(index).addClass('on');
                },
            })

            subTl[0] = gsap.timeline({
                scrollTrigger: {
                    pinnedContainer: '.kitchen',
                    toggleActions: 'restart none restart reset',
                    start: () => tl.scrollTrigger.start,
                    end: () => tl.scrollTrigger.start + (totalScrollDistance * subTlProgress[0]),
                }
            });
            subTl[0].add([
                gsap.fromTo('.kitchen_top .kitchen_box_twrap', {opacity:0, x: '-30%'}, {opacity:1, x: 0}),
                gsap.fromTo('.kitchen_top .kitchen_top_circle:not(.kitchen_top_circle03)', {opacity:0}, {opacity:1,stagger: 0.2, delay:0.4}),
                gsap.fromTo('.kitchen_top .kitchen_top_circle03', {opacity:0, scale:5}, {opacity:1,scale:1, ease: 'expo.inOut', delay:0.5}),
            ])

            subTl[1] = gsap.timeline({
                scrollTrigger: {
                    pinnedContainer: '.kitchen',
                    toggleActions: 'restart none restart reset',
                    start: () => tl.scrollTrigger.start + (totalScrollDistance * subTlProgress[0]),
                    end: () => tl.scrollTrigger.start + (totalScrollDistance * subTlProgress[1]),
                }
            });
            subTl[1].add([
                gsap.fromTo('.kitchen_mid', {opacity:0}, {opacity:1}), 
                gsap.fromTo('.kitchen_mid .kitchen_box_twrap', {opacity:0, x: '-30%'}, {opacity:1, x: 0, delay:0.5}),
                gsap.fromTo('.kitchen_mid .kitchen_mid_tit_move', {opacity:0}, {opacity:1, stagger: 0.2, delay:0.4}),
                gsap.fromTo('.kitchen_mid .kitchen_mid_list', {opacity:0}, {opacity:1, stagger: 0.15, delay:0.4}),
                gsap.fromTo('.kitchen_mid .kitchen_mid_tit03', {opacity:0}, {opacity:1, duration: 0.2, delay:1.5}),
            ])

            subTl[2] = gsap.timeline({
                scrollTrigger: {
                    pinnedContainer: '.kitchen',
                    toggleActions: 'restart none none reset',
                    start: () => tl.scrollTrigger.start + (totalScrollDistance * subTlProgress[1]),
                    end: () => tl.scrollTrigger.start + (totalScrollDistance * subTlProgress[2]),
                }
            });
            subTl[2].add([
                gsap.fromTo('.kitchen_bottom', {opacity:0}, {opacity:1}),
                gsap.fromTo('.kitchen_bottom .kitchen_box_twrap', {opacity:0, x: '-30%'}, {opacity:1, x: 0, delay:0.5}),
            ])

            totalDuration = subTl.reduce((result, child) => {
                result += child.duration();
                return result;
            }, 0);

            tl.to({}, {duration: totalDuration});

            for (const sTl of subTl) {
                subTlDurations.push(sTl.duration());
                const durations = subTlDurations.reduce((result, duration) => {
                    result += duration;
                    return result;
                }, 0);
                subTlProgress.push(durations / totalDuration);
            }

            $('.side_tab').on('click', function() {
                const sideTabIndex = $(this).index();
                subTl.forEach((child, i) => {
                    child.pause(sideTabIndex >= i ? child.duration() : 0);
                });
                const fromDuration = subTlDurations.filter((duration, i) => {
                    return i < sideTabIndex;
                }).reduce((result, duration) => {
                    result += duration;
                    return result;
                }, 0);
                const from = $kitchen.offset().top + totalScrollDistance * (fromDuration / totalDuration);
                const to = from + (
                    totalScrollDistance * (subTl[sideTabIndex].duration() / totalDuration)
                ) - 1;
                gsap.fromTo('html, body', {
                    scrollTop: from,
                }, {
                    scrollTop: to,
                    duration: 1,
                    ease: 'power2.inOut',
                });
            })
        }());

        (function(){//structure

            const boxes = $('.structure_t_circle');
            let currentIndex = 0;
            let interval;
            
            function startInterval() {
                interval = setInterval(function() {
                    boxes.removeClass('on');
                    boxes.eq(currentIndex).addClass('on');
                    currentIndex = (currentIndex + 1) % boxes.length;
                }, 1500);
            }
        
            function stopInterval() {
                clearInterval(interval);
            }
            boxes.on('mouseenter', function() {
                stopInterval();
                boxes.removeClass('on');
                $(this).addClass('on');
            });
        
            boxes.on('mouseleave', function() {
                currentIndex = boxes.index(this);
                startInterval();
            });

            gsap.timeline({
                scrollTrigger:{
                    trigger: '.structure',
                    start: 'top 60%'
                }
            })
            .from('.structure_tit .move', {y: '-100%', stagger: 0.25})
            .from('.structure_t_circle', {opacity:0, left: '-10%',stagger: 0.25})
            .from('.structure_t_circle04', {opacity:0, scale:5, duration:0.25, ease: 'expo.inOut'})
            .call(startInterval)

            var targetCount = $('.structure_bottom_box02 .count').data('number');
            var targetCount02 = $('.structure_bottom_box02 .count02').data('number');

            gsap.timeline({
                scrollTrigger:{
                    trigger: '.structure_bottom_box02',
                    start: 'top center'
                }
            })
            .add([
                gsap.to({number:0},{number: 1, duration: 0.7, onUpdate: function() {
                    $('.structure_bottom_box02 .count').text(Math.floor((targetCount * this.progress())).toLocaleString());
                }}),
                gsap.to({number:0},{number: 1, duration: 0.7, onUpdate: function() {
                    $('.structure_bottom_box02 .count02').text(Math.floor((targetCount02 * this.progress())).toLocaleString());
                }}),
            ])

        }());

        (function(){//change
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.change',
                    start: 'top 60%'
                }
            })
            .from('.change_tit .move', {y: '-100%', duration:0.3})
            .from('.change_tit .yell', {opacity:0, scale:5, duration:0.2, ease: 'expo.inOut'})

            var targetCount = $('.change_top_center_tit .num').data('number');

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.change_top',
                    start: 'top 60%'
                }
            })
            .add([
                gsap.to({number:0},{number: 1, duration: 0.7, onUpdate: function() {
                    $('.change_top_center_tit .num').text(Math.floor((targetCount * this.progress())).toLocaleString());
                }}),
                gsap.from('.change_top_bg', {scale:1.15, duration:1.5})
            ])
            .from('.change_t_bar_left .over_h', {width: 0, duration:0.4})
            .from('.change_top_bar_line', {width: 0, duration:0.3})
            .from('.change_t_bar_right_in', {width: 0, duration:0.4})

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.change_bottom',
                    start: 'top 60%'
                }
            })
            .from('.change_bottom_center .move', {y: '-100%', stagger: 0.25})

        }());

    });
}(jQuery));