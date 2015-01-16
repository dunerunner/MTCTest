var sliderModule = (function () {
    var currentSlide = 2;
    var slides = $('.b-slider__button');
    var controlsBlocked = false;
    function showSlide(index) {
        while (currentSlide !== index) {
            nextSlide(false);
        }
        controlsBlocked = false;
    }
    function nextSlide(to) {
        controlsBlocked = true;
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        $(slides).removeClass('active');
        $(slides[currentSlide]).addClass('active');
        $('.b-slider__slide.leaveright').removeClass('leaveright').addClass('hidden');
        $('.b-slider__slide.next').removeClass('next').addClass('leaveright');
        $('.b-slider__slide.active').removeClass('active').addClass('next');
        $('.b-slider__slide.previous').removeClass('previous').addClass('active');
        $('.b-slider__slide.leaveleft').removeClass('leaveleft').addClass('previous');
        $('.b-slider__slide.hidden').addClass('leaveleft');
        if (to) {
            setTimeout(function () {
                controlsBlocked = false;
                $('.b-slider__slide.hidden').removeClass('hidden');
            }, 500);
        } else {
            $('.b-slider__slide.hidden').removeClass('hidden');
        }
    }
    function previousSlide() {
        controlsBlocked = true;
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        slides.removeClass('active');
        $(slides[currentSlide]).addClass('active');
        $('.b-slider__slide.leaveleft').removeClass('leaveleft').addClass('hidden');
        $('.b-slider__slide.previous').removeClass('previous').addClass('leaveleft');
        $('.b-slider__slide.active').removeClass('active').addClass('previous');
        $('.b-slider__slide.next').removeClass('next').addClass('active');
        $('.b-slider__slide.leaveright').removeClass('leaveright').addClass('next');
        $('.b-slider__slide.hidden').addClass('leaveright');
        setTimeout(function () {
            controlsBlocked = false;
            $('.b-slider__slide.hidden').removeClass('hidden');
        }, 500);
    }
    return {
        init: function () {
            $('#prevSlide').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (!controlsBlocked) {
                    previousSlide();
                }
            });
            $('#nextSlide').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (!controlsBlocked) {
                    nextSlide(true);
                }
            });
            $('#sliderControls').on('click', '.b-slider__button', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var index = slides.index($(this));
                if (index !== currentSlide) {
                    showSlide(index);
                }
            });
        }
    };
})();
var mobileModule = (function(){
    return {
        init: function(){
            $('#mobileMenu').on('click',function(e){
                e.preventDefault();
                e.stopPropagation();
                if(window.innerWidth < 940) {
                    $('.b-navmenu').toggleClass('active');
                }
                
            });
            $('.hassubmenu').on('click',function(e){
                e.preventDefault();
                e.stopPropagation();
                $(this).parent().children('.b-navsubmenu').toggleClass('active');
            });
            $(document).on('click',function(e){
               if($('.b-navsubmenu').hasClass('active') && e.target.nodeName !== 'A') {
                   $('.b-navsubmenu').removeClass('active');
               }
            });
        }
    };
})();
$(document).ready(function () {
    sliderModule.init();
    mobileModule.init();
});