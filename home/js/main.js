(function($){
    $(document).ready(function() {
        (function() {//power & store
            $('.power_flow .marquee-container1').marquee({
                speed: 100
            });
            $('.power_flow .marquee-container2').marquee({
                speed: 100,
                reverse: true
            });

            const parent = gsap.timeline({
                scrollTrigger: {
                    trigger: '.first_yell_wrap',
                    start: 'top top',
                    end: '+=1000',
                    pin: true,
                    scrub:1 ,
                }
            })
            .to('.power_bg_circle', {scale: 1, borderRadius: '0', duration: 0.5})
            .to({}, {duration: 0.5})
            .to('.first_scroller', {y: -1000})

            gsap.timeline({
                scrollTrigger:{
                    pinnedContainer: '.first_yell_wrap',
                    start: parent.scrollTrigger.start + 300,
                }
            })
            .fromTo('.power_tit_wrap img', {opacity: 0}, {opacity: 1, duration: 0.2, stagger: 0.05})
            .fromTo('.power_subTit .move', {opacity: 0, y: '100%'}, {opacity: 1, y: '0', duration:0.3})
            .fromTo('.power_des .move', {opacity: 0, y: '100%'}, {opacity: 1, y: '0', duration:0.3})            

            const circleTweens = [];
            $('.store_circle').each(function(i, elem) {
                const left = parseInt($(elem).css('margin-left'));
                const top = 425 - parseInt($(elem).css('top'));
                const from = {scale: 0, x: -left, y: top};
                const x = $(elem).hasClass('to-universe') ? left > 0 ? '500%' : '-500%' : 0;
                const y = $(elem).hasClass('to-universe') ? top > 0 ? '500%' : '-500%' : 0;
                const duration = $(elem).hasClass('to-universe') ? 5 : 1.0;
                const scale = $(elem).hasClass('to-universe') ? 2 : 1;
                const to = {opacity: $(elem).hasClass('to-universe') ? 0 : 1, scale, x, y, duration, delay: i * 0.2};
                circleTweens[i] = gsap.fromTo(elem, from, to);
            });

            gsap.timeline({
                scrollTrigger:{
                    pinnedContainer: '.first_yell_wrap',
                    start: parent.scrollTrigger.start + 300,
                }
            })
            .to('.store_rotate', {opacity: 1, duration: 0.3})
            .from('.store_tit .move', {y: '100%', duration: 0.3})
            .from('.store_logo .move', {y: '100%', duration: 0.3})
            .add([
                gsap.from('.store_rotate', {scale:0, rotate: 180, duration:2}),
                ...circleTweens
            ])
        }());

        (function(){//noisy
            $('.noisy_flow .marquee-container').marquee({
                speed: 120
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.noisy',
                    start: 'top 70%'
                }
            })
            .from('.noisy_tit .move', {y: '100%', stagger: 0.25})
            .from('.noisy_des .highlight', {scaleX:0, duration:0.7})
        }());

        (function(){//regain
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.regain',
                    start: 'top 70%'
                }
            })
            .from('.regain_tit .move', {y: '100%', stagger: 0.25})
            .from('.regain_des .highlight', {scaleX:0, duration:0.7})
            .add([
                gsap.fromTo('.regain_food1', {opacity: 0, x: -150, y: -150}, {opacity: 1, x: 0, y: 0}),
                gsap.fromTo('.regain_food2', {opacity: 0, x: 150, y: -150}, {opacity: 1, x: 0, y: 0, delay: 0.2}),
                gsap.fromTo('.regain_food3', {opacity: 0, x: 0, y: 200}, {opacity: 1, x: 0, y: 0, delay: 0.2}),
            ], 0.4)
        }());

        (function(){//everyday
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.everyday',
                    start: 'top 70%'
                }
            })
            .from('.everyday_subTit', {opacity: 0, scale: 5, stagger: 0.15, ease: 'expo.inOut'})
            .from('.everyday_tit_img', {opacity: 0, stagger: 0.1, ease: 'expo.inOut'})
            .from('.everyday_des', {opacity: 0, duration: 0.3})
            .from('.everyday_side', {opacity: 0, x: '20%', duration: 0.7})
        }());

        (function() {//ck_center
            $('.ck_bg_marquee01 .marquee-container').marquee({
                reverse: true,
                speed: 120,
            });

            $('.ck_bg_marquee02 .marquee-container').marquee({
                reverse: false,
                speed: 120,
            });

            var targetCount01 = $('.count_wrap_center .count').data('number');
            var targetCount02 = $('.count_wrap_center .count02').data('number');

            const parent = gsap.timeline({
                scrollTrigger: {
                    trigger: '.ck_center_circle',
                    start: 'center center',
                    end: '+=1500',
                    scrub: 1,
                }
            })
            .add([
                gsap.to('.ck_center', {backgroundColor: '#ffc000', duration: 0.01, delay: 0.2}),
                gsap.to('.ck_center_circle', { width: '300vw', height: '300vw', top: 0, duration: 1.5 }),
                gsap.to('.ck_bg_txt', { y: '500px', duration: 1.0 }),
            ])
            .to({}, {duration: 0.5})
            
            gsap.timeline({
                scrollTrigger:{
                    trigger: '.ck_center',
                    start: 'top top-=50'
                }
            })
            .from('.ck_center_tit, .ck_center_sub', { opacity: 0, y: '100%', stagger: 0.5 })
            .add([
                gsap.to({ number: 0 }, {
                    number: 1,
                    duration: 0.4,
                    onUpdate: function() {
                        $('.count_wrap_center .count').text(Math.floor((targetCount01 * this.progress())).toLocaleString());
                    }
                }),
                gsap.to({ number: 0 }, {
                    number: 1,
                    duration: 0.4,
                    onUpdate: function() {
                        $('.count_wrap_center .count02').text(Math.floor((targetCount02 * this.progress())).toLocaleString());
                    }
                })
            ])
            .from('.ck_center_box', { opacity: 0, y: '100', stagger: 0.2 })

            var ck_balance_count01 = $('.ck_balance_count01').data('number');
            var ck_balance_count02 = $('.ck_balance_count02').data('number');
            var ck_balance_count03 = $('.ck_balance_count03').data('number');
            gsap.timeline({
                scrollTrigger:{
                    trigger: '.ck_balance_boxes',
                    start: 'top 20%'
                }
            })
            .from('.ck_balance_box', { opacity: 0, y: 100, stagger: 0.2})
            .from('.ck_balance_tit01', { opacity: 0, y: '100%', stagger: 0.2})
            .from('.ck_balance_tit02', { opacity: 0, y: '100%', stagger: 0.2}, '<0.5')
            .add([
                gsap.to({ number: 0 }, {
                    number: 1,
                    duration: 0.5,
                    onUpdate: function() {
                        $('.ck_balance_count01').text(Math.floor((ck_balance_count01 * this.progress())).toLocaleString());
                    }
                }),
                gsap.to({ number: 0 }, {
                    number: 1,
                    duration: 0.5,
                    onUpdate: function() {
                        $('.ck_balance_count02').text(Math.floor((ck_balance_count02 * this.progress())).toLocaleString());
                    }
                }),
                gsap.to({ number: 0 }, {
                    number: 1,
                    duration: 0.5,
                    onUpdate: function() {
                        $('.ck_balance_count03').text(Math.floor((ck_balance_count03 * this.progress())).toLocaleString());
                    }
                })
            ])

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.ck_center',
                    start: 'top top',
                    end: '+=400', 
                    pin: true,
                    scrub: 1
                }
            })
            // .fromTo('.ck_center_yellow_bg',{top: '85px',},{top: '-295px',ease: 'none',duration: 3});
        })();
    });
}(jQuery));