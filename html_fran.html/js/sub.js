(function($){
    $(document).ready(function() {

        (function() {//lnb_wrap 스크롤 고정
        	function scrollHandler() {
        		var scrollTop = win.scrollTop();
        		if(fixed === false && scrollTop > offset) {
        			$topElement.addClass('scroll');
        			fixed = true;
        		} else if(fixed === true && scrollTop <= offset) {
        			$topElement.removeClass('scroll');
        			fixed = false;
        		}
        	}
        	try{
        		var $topElement = $('.lnb_wrap'),
        		offset = 0,
        		fixed = false;
        	}catch(e){}

        	win.scroll(scrollHandler);
        	scrollHandler();
        }());

        (function() {//스와이퍼
            var lnbSwiper = new Swiper('.lnb_wrap.swiper-container', {
                initialSlide: $('.lnb li.on').index(),
                slidesPerView: 'auto',
                freeMode: true,
            });
            if (!lnbSwiper.isEnd) {
                $('.lnb').css('justify-content', 'start');
            }

            if($('.chapters').length === 0) return false;


            function setAnchorsOffset() {
                var limit = doc.innerHeight() - win.innerHeight();
                for(var i=0, j=0; i<length; i++) {
                    var $chapter = $chapters.eq(i);
                    if($chapter.length > 0) {
                        if ($chapter.parent('pin-spacer').length > 0) {
                            offsets[i] = $chapter.parent('pin-spacer').offset().top - diff;
                        } else {
                            offsets[i] = $chapter.offset().top - diff;
                        }
                    }
                    else offsets[i] = i > 0 ? offsets[i - 1] : 0;
                    if(offsets[i] > limit) {
                        offsets[i] = limit - length + j;
                        j++;
                    }
                    offsets[i] = Math.floor(offsets[i]);
                }
                offsets[length] = limit + 1;
            }

            function scrollHandler() {
                var scrollTop = win.scrollTop();
                if(scrollTop < offsets[0]) {
                    $anchors.parent('li').filter('.on').removeClass('on');
                    index = -1;
                    return false;
                }
                for(var i=0; i<length; i++) {
                    if((i !== index) && (scrollTop >= offsets[i] - 10 && scrollTop < offsets[i + 1] - 10)) {
                        $anchors.parent('li').filter('.on').removeClass('on');
                        $anchors.parent('li').eq(i).addClass('on');
                        lnbSwiper.slideTo(i);
                        index = i;
                        break;
                    }
                }
            }

            function hashHandler() {
                if(location.hash) {
                    var hash = parseInt(location.hash.split('#')[1], 10);
                    if(isNaN(hash) === true) return false;
                    if($anchors.eq(hash - 1).length > 0) {
                        if($('#sitemapWrap').is(':visible') === true) $('.bindSitemapSpread').trigger('click');
                        $anchors.eq(hash - 1).trigger('click');
                    }
                }
            }

            function scrollAnim(e) {
                TweenLite.to('html, body', 0.5, {scrollTop: offsets[$(this).parent('li').index()], ease: Expo.easeOut});
                e.preventDefault();
            }

            var $chapters = $('.chapters'),
            $anchors = $('.lnb a, .sub_lnb a');

            var length = $anchors.length,
            offsets = [],
            index = 0,
            diff = parseInt($('.lnb_wrap').height()),
            resizeTimer = null;

            $anchors.click(scrollAnim);
            win.scroll(scrollHandler);
            win.resize(function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    setAnchorsOffset();
                    scrollHandler();
                }, 100);
            });
            win.on('hashchange load', function() {
                hashHandler();
            });
            win.on('load', function() {
                setAnchorsOffset();
                scrollHandler();
            });

            setAnchorsOffset();
            scrollHandler();
        }());
        
        (function() {//progress_bar
            if($('.lnb_wrap_progress').length == 0)return;
            gsap.timeline({
                scrollTrigger: {
                    trigger: 'html, body',
                    start: 'top top',
                    end: '+=25400',
                    scrub: true,
                    // markers: true
                }
            })
            .from('.lnb_wrap_progress', {scaleX: 0})
        }());

        
    });
}(jQuery));