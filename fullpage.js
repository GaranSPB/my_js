Twister = function (wrapper,top) {
    var _this = this,
        _wh = $(window).innerHeight();
    _this.base = $(wrapper);
    _this.topOffset = top || 0;
    _this.top = 0;
    _this.H = _wh - _this.topOffset;
    _this.slides = [];
    _this.visibleSlides = [];
    _this.currentSlide = 0;
    _this.scrolling = false;
    _this.scrollTime = 700;
    _this.base.css('transition','transform 1s');
    getSlides();
    prepareSlides();
    initEvents();
    initScrollListener();
    initController();

    function getSlides() {
        _this.slides = _this.base.find('.twister-slide').toArray();
    }

    function prepareSlides() {
        _this.slides.forEach(function (el) {
           $(el).css('min-height',_this.H);
           if($(el).is(':visible')){
               _this.visibleSlides.push(el);
           }
        });
        setNextPrev();
    }

    function setNextPrev() {
        var n = _this.currentSlide;
        _this.prevSlide = _this.visibleSlides[n - 1] ? n - 1 : undefined;
        _this.nextSlide = _this.visibleSlides[n + 1] ? n + 1 : undefined;
    }

    function initScrollListener(){
        _this.base.append('<div id="scroll_listener"></div>');
        _this.sl = $('#scroll_listener');
        _this.sl.css({
            'position' : 'fixed',
            'opacity' : 0,
            'height' : '100%',
            'top' : 0,
            'width' : '100%',
            'background-color': '#fff',
            'overflow' : 'auto'
        });
        _this.sl.append($('<div>').css({
            'height' : _wh*21,
            'width' : '100%'
        }));
        _this.sl.scrollTop(_wh*10);
        _this.sl.oldScroll = _wh*10;
        _this.sl.scroll(function () {
            if(!_this.scrolling){
                var delta = _this.sl.scrollTop() - _this.sl.oldScroll;
                if(delta && !_this.scrolling){
                    delta > 0 ? _GL.run('twister_scrollDown',_this) : delta < 0 ? _GL.run('twister_scrollUp',_this) : void(0);
                    if(_this.scrolling){
                        setTimeout(function () {
                            _this.sl.scrollTop(_wh*10);
                        },_this.scrollTime);
                    }else{
                        _this.scrolling = true;
                        setTimeout(function () {
                            _this.sl.scrollTop(_wh*10);
                            _this.scrolling = false;
                        },100);
                    }
                }
            }
        });
    }

    function  initEvents() {
        _GL.add('twister_scrollDown',function(){
            if(_this.nextSlide !== undefined) scroll(_this.nextSlide);
        },_this);
        _GL.add('twister_scrollUp',function(){
            if(_this.prevSlide !== undefined) scroll(_this.prevSlide);
        },_this);
    }

    function scroll(n) {
        _this.scrolling = true;
        _this.pads.eq(_this.currentSlide).removeClass('active');
        var delta =  n - _this.currentSlide,
            newTop = _this.top + _this.H*delta;
        _GL.run('twister_start_sliding',_this);
        _this.base.animate({scrollTop : newTop},_this.scrollTime,function () {
            _this.top = _this.base.scrollTop();
            _this.currentSlide = n;
            _this.pads.eq(n).addClass('active');
            setNextPrev();
            _this.scrolling = false;
            _GL.run('twister_end_sliding',_this);
        });
    }

    _this.refresh = function () {
        var _this = this;
        _this.currentSlide = 0;
        _this.top = 0;
        _this.base.scrollTop(0);
        _this.visibleSlides = [];
        _this.padsWrap.remove();
        prepareSlides();
        initController();
        console.log('ref');
        return _this;
    };

    function  initController() {
        _this.padsWrap = $('<div id="twister_pads"></div>');
        _this.visibleSlides.forEach(function (el,i) {
            _this.padsWrap.append('<span ' + (i === _this.currentSlide ? "class = \"active\"" : "")  + '></span>');
        });
        _this.base.append(_this.padsWrap);
        _this.padsWrap.fadeIn(800);
        _this.pads = _this.padsWrap.children();
        _this.pads.click(function () {
            if(!_this.scrolling && !$(this).hasClass('active')){
                scroll($(this).index());
                $(this).addClass('active');
            }
        })
    }

    _this.setSlide = function(n) {
        if(_this.visibleSlides[n]){
            var delta =  n - _this.currentSlide,
                newTop = _this.top + _this.H*delta;
            _this.pads.eq(_this.currentSlide).removeClass('active');
            _this.base.scrollTop(newTop);
            _this.top = newTop;
            _this.currentSlide = n;
            setNextPrev();
            _this.pads.eq(n).addClass('active');
        }
        return _this;
    }

    _this.slideTo = function(n){
        if(n !== undefined && _this.visibleSlides[n]){
            scroll(n);
        }
        return _this;
    }

};
