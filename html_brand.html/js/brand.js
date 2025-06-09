(function($){
    $(document).ready(function() {
        (function (){//tinge
            //배경 확대
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.tinge',
                    start: 'top-=1 top',
                }
            })
            .fromTo('.tinge_back', {scale: 1, transformOrigin: '20% 50%'}, {scale: 1.3, duration: 2}, 0)
            .to('.tinge_back', {duration: 10, onUpdate: function(){
                let value = 20 + this.progress() * 80;
                gsap.set(this._targets, {transformOrigin: value + '% 50%'})
            }}, '<+=0.2')
            .to('.tinge_back', {scale: 1, duration: 2}, '>+=1')

            //타이틀 등장
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.tinge',
                    start: 'top-=1 top',
                }
            })
            .from('.tinge_subtitle_item', {opacity: 0, scale: 5, stagger: 0.15, ease: 'expo.inOut'})
            .fromTo('.tinge_typo img', {opacity: 0}, {opacity: 1, duration: 0.2, stagger: 0.05})

            //타이틀 퇴장
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.tinge',
                    start: 'top',
                    end: '+=500',
                    scrub: 0.5
                }
            })
            .fromTo('.tinge_textbox', {opacity: 1, y: 0}, {opacity: 0, y: 400})

            //배경 움직임
            let bg_tl,
                frameEl = $('.tinge_fixed'), 
                goalEl = $('.cheering_block')
            function generateBgTl(frameEl, goalEl){
                if(typeof bg_tl !== 'undefined' && typeof bg_tl.kill === 'function')bg_tl.kill();
                frameEl.attr('style', '')
                let toX = goalEl.offset().left - frameEl.offset().left,
                    toY = goalEl.offset().top - frameEl.offset().top,
                    fromWidth = win.width(), 
                    fromHeight = win.height(), 
                    toWidth = goalEl.width(),
                    toHeight = goalEl.height();
                bg_tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.tinge',
                        start: 'top top',
                        endTrigger: '.cheering_block',
                        end: 'bottom 80%',
                        scrub: 0.4
                    }
                })
                .fromTo('.tinge_fixed', {x: 0, y: 0, width: fromWidth, height: fromHeight}, {x: toX, y: toY, width: toWidth, height: toHeight, duration: 1})
                .fromTo('.tinge_back_img', {opacity: 0, x: 200}, {opacity: 1, x: 0, duration: 0.1})
            }
            generateBgTl(frameEl, goalEl)

            win.resize(function(){
                generateBgTl(frameEl, goalEl);
            })
            //Todo 리사이즈 이벤트 추가
        }());

        (function (){//cheering
            //타이틀 등장
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.cheering_head',
                    start: 'top 70%',
                }
            })
            .from('.cheering_typo', {opacity: 0, y: 100})
            .from('.cheering_title, .cheering_des', {opacity: 0, y: 100, stagger: 0.2})

            //영상 등장
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.cheering_floatimg',
                    start: 'top 70%',
                }
            })
            .from('.cheering_floatimg', {opacity: 0, y: 50, duration: 2, stagger: 0.2})
            .from('.cheering_frame', {opacity: 0, x: -100, y: 50, duration: 2, stagger: 0.2}, '<+=0.2')
        }());

        (function (){//delicacy
            //타이틀 등장
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.delicacy_head',
                    start: 'top 70%',
                }
            })
            .from('.delicacy_title', {opacity: 0, y: 100})
            .from('.delicacy_subtitle, .delicacy_des', {opacity: 0, y: 100, stagger: 0.2})

            new Swiper('.delicacy_slide .swiper-container', {
                loop: true,
                speed: 300,
                autoplay: {
                    delay: 2000,
                },
                allowTouchMove: false,
                effect : 'fade',
                fadeEffect: {
                    crossFade: false,
                },
            });
        }());

        (function (){//setting
            let layerState = [],
                layerPos = [],
                layerPosPer = [],
                layerEls = $('.setting_layer'),
                pos1 = 500,
                pos2 = 1000,
                layerContentTl = [];

            //init
            gsap.set(layerEls.find('.setting_layer_back'), {clipPath: 'inset(50%)'})
            gsap.set(layerEls, {pointerEvents: 'none'})
            gsap.set(layerEls.find('.setting_layer_show p'), {y: '110%'})
            gsap.set('.setting_paging span', {y: '110%'})
            gsap.set('.setting_title', {y: '110%'})
            
            let startTl = gsap.timeline({paused: true})
            .fromTo('.setting_title', {y: '110%'}, {y: 0})
            .fromTo('.setting_leftside, .setting_rightside', {opacity: 0}, {opacity: 1}, '<')
            //레이어 별 포지션 지정 (시작, 내용노출, 끝)
            let posStack = 0
            layerEls.each(function(i, value){
                layerState[i] = {content: false, bgClose: true, bgOpen: false};
                layerPos[i] = [posStack, posStack + pos1, posStack + pos1 + pos2 + 100];
                posStack += pos1 + pos2

                layerContentTl[i] = gsap.timeline({paused: true})
                .fromTo($(value).find('.setting_layer_show p'), {y: '110%'}, {y: 0, stagger: 0.2})
                .fromTo($(value), {pointerEvents: 'none'}, {pointerEvents: 'auto'})
            })
            layerPos.map(function(value, index){
                var tempArr = []
                value.map(function(value2, index){
                    console.log()
                    tempArr.push(value2/posStack)
                })
                layerPosPer.push(tempArr)
            })
            //내용 노출
            function openContent(index){
                layerState[index]['content'] = true;
                const el = layerEls.eq(index);
                layerContentTl[index].play();

                gsap.to('.setting_paging li:not(:nth-child('+(index+1)+')) span', {y: '110%'})
                gsap.to('.setting_paging li:nth-child('+(index+1)+') span', {y: 0})
            }
            //내용 비노출
            function closeContent(index){
                layerState[index]['content'] = false;
                const el = layerEls.eq(index);
                layerContentTl[index].reverse();
            }
            //배경 최대
            function openBg(index){
                layerState[index]['bgOpen'] = true;
                const el = layerEls.eq(index);
                gsap.set(el.find('.setting_layer_back'), {clipPath: 'inset(0%)'})
                if(index == 0){
                    startTl.play()
                }
            }
            //배경 닫기
            function closeBg(index){
                layerState[index]['bgClose'] = true;
                const el = layerEls.eq(index);
                gsap.set(el.find('.setting_layer_back'), {clipPath: 'inset(50%)'})
            }
            //스크롤 시
            function updateLayer(index, progress){
                const el = layerEls.eq(index);
                gsap.set(el.find('.setting_layer_back'), {clipPath: 'inset(' + ((1 - progress) * 10 + 40) + '%)'})
            }
            //배경 고정
            ScrollTrigger.create({
                trigger: '.setting',
                start: 'top top',
                end: 'top+=' + posStack + ' top',
                pin: '.setting_fixed_frame',
                onUpdate: function(st){
                    layerPosPer.map(function(posArr, index){
                        //bg
                        if(st.progress >= posArr[1]){
                            if(!layerState[index]['bgOpen'])openBg(index)
                        }else{
                            if(layerState[index]['bgOpen'])layerState[index]['bgOpen'] = false
                        }
                        if(st.progress < posArr[0]){
                            if(!layerState[index]['bgClose'])closeBg(index)
                        }else{
                            if(layerState[index]['bgClose'])layerState[index]['bgClose'] = false
                        }
                        //공통 요소 제거
                        if(st.progress < posArr[1] && index == 0 && layerState[index]['content']){
                            startTl.reverse()
                        }
                        //content
                        if(st.progress >= posArr[1] && st.progress < posArr[2]){
                            if(!layerState[index]['content'])openContent(index)
                        }else{
                            if(layerState[index]['content'])closeContent(index)
                        }
                        

                        if(st.progress >= posArr[0] && st.progress < posArr[1]){
                            updateLayer(index, (st.progress - posArr[0])/(posArr[1] - posArr[0]))
                        }
                    })
                    gsap.set('.setting_progress_bar', {transformOrigin: 'top', scaleY: st.progress})
                },
                onLeaveBack: function(){
                    closeBg(0)
                }
            })
        }());

        (function (){//intierior
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.intierior_head',
                    start: 'top 70%',
                }
            })
            .from('.intierior_title', {opacity: 0, y: 100})
            .from('.intierior_des', {opacity: 0, y: 100, stagger: 0.2})

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.intierior',
                    start: 'top 70%',
                }
            })
            .from('.intierior_floatimg1', {opacity: 0, x: -100, duration: 2})
            .from('.intierior_floatimg2', {opacity: 0, y: 100, duration: 2}, '<')
            .from('.intierior_floatimg3', {opacity: 0, x: 100, duration: 2}, '<')
        }());
    });
}(jQuery));