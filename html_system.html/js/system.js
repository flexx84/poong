(function($){
    $(document).ready(function() {
        (function (){//fam
            //뒤 이미지, 타이틀
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.fam',
                    start: 'top-=1 top',
                }
            })
            .from('.fam-subtitle-item', {opacity: 0, scale: 5, stagger: 0.15, ease: 'expo.inOut'})
            .from(".fam-back-img", {x: 200, opacity: 0, stagger: 0.2})
            .from('.fam-typo-item', {opacity: 0, duration: 0.2, stagger: 0.05}, '<')
            .from(".fam-textbox", {opacity: 0, y: 100}, '<+=0.2')
            .from(".fam-textbox-subtitle .highlight", {transformOrigin: 'left', scaleX: 0})
        })();

        (function (){//detail
            //타이틀 등장
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.detail-head',
                    start: 'top 70%',
                }
            })
            .from('.detail-chef, .detail-model', {opacity: 0, x: 100, stagger: 0.2})
        }());

        (function (){//everlasting
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.everlasting',
                    start: 'top 70%',
                }
            })
            .from(".everlasting-title01", {y: '100%', opacity: 0, duration: 1, ease: 'expo.inOut'})
            .from(".everlasting-title02", {y: '100%', opacity: 0, duration: 1, ease: 'expo.inOut'}, "-=0.5")
            .from(".everlasting-circle-center", {y: '10%', opacity: 0, duration: 1, ease: 'expo.inOut'}, "-=0.5")
            .from(".everlasting-circle-side.circle-left", {x: '100%', opacity: 0, duration: 1, ease: 'expo.inOut'}, "-=0.5")
            .from(".everlasting-circle-side.circle-right", {x: '-100%', opacity: 0, duration: 1, ease: 'expo.inOut'}, "<")
            .from(".highlight08 .bg-cover", {width: 0, duration: 0.7, delay: 1}, "-=1")
            .from(".highlight09 .bg-cover", {width: 0, duration: 0.7}, "<")

            const swiper = new Swiper('.everlasting-swiper', {
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
        })();

        (function (){//leader

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.leader-content-area',
                    start: 'top 70%',
                }
            })
            .from('.leader-box', {opacity: 0, y: 100, stagger: 0.2})
            .fromTo('.leader-fill > span:nth-child(1)', {opacity: 0}, {opacity: 1, duration: 3}, '<')
            .fromTo('.leader-fill > span:nth-child(2)', {opacity: 0}, {opacity: 1, duration: 3.5}, '<0.2')
            .fromTo('.leader-fill > span:nth-child(3)', {opacity: 0}, {opacity: 1, duration: 4}, '<0.2')
            .fromTo('.leader-fill > span:nth-child(4)', {opacity: 0}, {opacity: 1, duration: 4.5}, '<0.2')
            .fromTo('.leader-fill > span:nth-child(5)', {opacity: 0}, {opacity: 1, duration: 5}, '<0.2')
            .fromTo('.leader-fill > span:nth-child(6)', {opacity: 0}, {opacity: 1, duration: 5.5}, '<0.2')
            .fromTo('.leader-fill > span:nth-child(7)', {opacity: 0}, {opacity: 1, duration: 6}, '<0.2')
            // .fromTo('.leader-fill > span', {opacity: 0}, {opacity: 1, stagger: 0.5, duration: 4}, '<')
            // .fromTo('.leader-empty > span', {opacity: 1}, {opacity: 0, stagger: 0.5, duration: 4})
        }());

        (function (){//represent

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.represent-head',
                    start: 'top 70%',
                }
            })
            .from('.represent-title, .represent-typo, .represent-subtitle, .represent-des', {opacity: 0, y: 50, stagger: 0.2})
            .fromTo('.represent-emptyimg', {clipPath: 'circle(0% at 33.4476% 14.9934%)'}, {clipPath: 'circle(100% at 33.4476% 14.9934%)', duration: 6}, '<1')
        }());
        (function (){//ESG
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.esg',
                    start: 'top 70%',
                }
            })
            .from(".esg-title01", {y: '100%', opacity: 0, duration: 1, ease: 'expo.inOut'})
            .from(".esg-title02", {y: '100%', opacity: 0, duration: 1, ease: 'expo.inOut'}, "-=0.5")
            .from(".esg-subtitle, .esg-desc", {opacity: 0, y: 50})
            .from(".highlight10 .bg-cover", {width: 0, duration: 0.7})
            .from(".esg-circles li", {x: -100, opacity: 0, stagger: 0.4}, "=-0.2")
        })();

        (function (){//care
            //타이틀
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.care-head',
                    start: 'top 70%',
                }
            })
            .from('.care-subtitle .highlight', {transformOrigin: 'left', scaleX: 0})

            //박스1
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.care-box1-phone',
                    start: 'top 70%',
                }
            })
            .from('.care-box1-app', {transformOrigin: 'right top', scale: 0.3, ease: 'back.out'})
            .from('.care-box1-list li', {y: 100, opacity: 0, stagger: 0.2})

            //박스2
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.care-box2',
                    start: 'top 70%',
                }
            })
            .from('.care-box2-phone, .care-box2-video', {y: 100, opacity: 0})

        })();
    });
}(jQuery))
