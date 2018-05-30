ScrollTwister = function(tl,bl){
    var _this = this,
        wh = $(window).innerHeight(),
        dh = $(document).innerHeight(),
        topLine = tl === undefined ? wh*.3 : wh*tl,
        botLine = bl === undefined ? wh*.7 : wh*bl,
        currentTop = $(window).scrollTop(),
        scrolling = false;
    _this.e = new Launcher();
    _this.slides = [];
    _this.lastShownNode = {};
    _this.lastHiddenNode = {};
    _this.currentDirection = 'down';
    getSlides();
    initScrollEvents();

    function getSlides() {
        $('.twister-slide:visible').toArray().forEach(function (el) {
            var $el = $(el),
                last = _this.slides.push({
                    node : el,
                    y1 : $(el).offset().top,
                    h : $el.innerHeight(),
                    y2 : $(el).offset().top + $el.innerHeight()
                });
            el.vis = isVisible(_this.slides[last - 1]);
            if(el.vis)$el.addClass('twister-show');
        });
    }

    function initScrollEvents() {
        $(window).scroll(function () {
            if(!scrolling){
                scrolling = true;
                _this.e('scroll-all');
                setTimeout(function () {
                    var newTop = $(window).scrollTop();
                    if(newTop > currentTop){
                        _this.currentDirection = 'down';
                        _this.e('scroll-down');
                    }else if(newTop < currentTop){
                        _this.currentDirection = 'up';
                        _this.e('scroll-up');
                    }
                    currentTop = newTop;
                    checkSlides();
                    scrolling = false;
                },100);
            }
        });
    }

    function checkSlides() {
        _this.slides.forEach(function (el) {
            var currentVis = el.node.vis,
                newVis = isVisible(el);
            if(newVis && !currentVis){
                _this.lastShownNode = el.node;
                _this.e('new-node-show',el.node);
                el.node.vis = true;
                $(el.node).addClass('twister-show').removeClass('twister-above-slide twister-below-slide');
            }else if(!newVis && currentVis){
                _this.lastHiddenNode = el.node;
                _this.e('new-node-hide',el.node);
                el.node.vis = false;
                $(el.node).removeClass('twister-show');
            }
        })
    }

    function isVisible(slide) {
        var _tl = currentTop === 0 ? 0 : currentTop + topLine,
            _bl = wh + currentTop < dh ? currentTop + botLine : currentTop + wh;
        if(slide.y2 < _tl){
            $(slide.node).removeClass('twister-below-slide').addClass('twister-above-slide');
            return false;
        }
        if(slide.y1 > _bl){
            $(slide.node).removeClass('twister-above-slide').addClass('twister-below-slide');
            return false;
        }
        return true;
    }

    _this.refresh = function(){
        _this.slides = [];
        _this.lastShownNode = {};
        _this.lastHiddenNode = {};
        _this.currentDirection = 'down';
        wh = $(window).innerHeight();
        dh = $(document).innerHeight();
        topLine = tl === undefined ? wh*.3 : wh*tl;
        botLine = bl === undefined ? wh*.7 : wh*bl;
        currentTop = $(window).scrollTop();
        scrolling = false;
        getSlides();
    }

};
