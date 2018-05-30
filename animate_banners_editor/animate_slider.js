AnimateSlider = function (project) {
    if (project) this.setProject(project);
    this.current = 'init';
    this.id = 0;
    this.status = 'stop';
    this.on = new Launcher();
};

AnimateSlider.prototype.setProject = function (project) {
    this.project = project;
    this.slides = project.slides;
    this.slidesArray = Object.keys(this.slides);
};

AnimateSlider.prototype.create = function (canvasSelector) {
    var _this = this;
    _this.canvas = $(canvasSelector);
    $.each(this.project.slides, function (name, slide) {
        _this.canvas.append('<div id="' + name + '" class="slide">' + (slide.slide_html ? slide.slide_html : '') + '</div>');
    });
    _this.refresh();
	return this;
};

AnimateSlider.prototype.refresh = function () {
    this.status = 'stop';
    this.current = 'init';
    this.id = 0;
    this.setFromSlideCss(this.slides.init);
	return this;
}

AnimateSlider.prototype.setCurrentSlide = function (id) {
    this.id = id;
    this.current = this.slidesArray[id];
    if (this.slidesArray[this.id + 1] !== undefined && this.status === 'end') this.status = 'stop';
    return this;
};


AnimateSlider.prototype.playSlide = function () {
    this.status = 'play_slide';
    this.runSlide(this.current);
    return this;
};
AnimateSlider.prototype.playClip = function () {
    if (this.status === 'end') return this;
    this.status = 'play';
    this.runSlide(this.current);
    return this;
};

AnimateSlider.prototype.stop = function () {
    if (this.status === 'play') this.status = 'stop';
    return this;
};


AnimateSlider.prototype.runSlide = function (slide) {
    var _this = this,
        _slide = _this.slides[slide];
    $('#' + _slide.current_slide).css('visibility', 'visible');
    _this.on('slide_start', _this.id);
    setTimeout(_this.startAnimation(_slide), _slide.prepare_time);
};

AnimateSlider.prototype.startAnimation = function (slide) {
    var _this = this,
        $slide = $('#' + slide.current_slide);
    return function () {
        $slide.css({
            'background-image': slide.slide_src ? 'url(' + _this.project.static.img_prefix + slide.slide_src + ')' : 'none',
            'background-color': slide.bgc,
            'top': slide.to_top,
            'left': slide.to_left,
            'opacity': slide.to_opacity,
            'transform': 'scale(' + slide.to_scale + ')',
            'transition': slide.animation_time + 'ms ' + (slide.timing_function ? slide.timing_function : 'linear')
        });
        setTimeout(function () {
            if (_this.status === 'play_slide') {
                _this.status = 'stop';
                return false;
            }
            _this.on('slide_end', _this.id);
            if (_this.slidesArray[_this.id + 1] === undefined) {
                _this.status = 'end';
                _this.on('clip_end', _this.id);
                return false;
            }
            _this.id += 1;
            _this.current = _this.slidesArray[_this.id];
            setTimeout(function () {
                if (_this.status === 'play') _this.runSlide(_this.current);
            }, _this.project.static.step_waiting);
        }, slide.animation_time);
    }
};

AnimateSlider.prototype.getNext = function (currentSlideName) {
    var _curId = this.slidesArray.indexOf(currentSlideName);
    return this.slides[this.slidesArray[_curId + 1]];
};

AnimateSlider.prototype.getPrev = function (currentSlideName) {
    var _curId = this.slidesArray.indexOf(currentSlideName);
    return this.slides[this.slidesArray[_curId - 1]];
};


AnimateSlider.prototype.setFromSlideCss = function (slide, stopRecursiveUpdate) {
    var _this = this,
        $slide = $('#' + slide.current_slide),
        nextSlide = _this.getNext(slide.current_slide),
        prevSlide = stopRecursiveUpdate ? undefined : _this.getPrev(slide.current_slide);
    $slide.css({
        'background-image': slide.slide_src ? 'url(' + _this.project.static.img_prefix + slide.slide_src + ')' : 'none',
        'background-color': slide.bgc,
        'top': slide.from_top,
        'left': slide.from_left,
        'opacity': slide.from_opacity,
        'width': slide.width,
        'height': slide.height,
        'transform': 'scale(' + slide.from_scale + ')',
        'transition': 'none',
        'visibility': stopRecursiveUpdate ? 'hidden' : 'visible'
    });
    if (nextSlide !== undefined) _this.setFromSlideCss(nextSlide, true);
    if (prevSlide !== undefined) _this.setToSlideCss(prevSlide);
    return _this;
};

AnimateSlider.prototype.setToSlideCss = function (slide) {
    var _this = this,
        $slide = $('#' + slide.current_slide),
        prevSlide = _this.getPrev(slide.current_slide);
    $slide.css({
        'background-image': slide.slide_src ? 'url(' + _this.project.static.img_prefix + slide.slide_src + ')' : 'none',
        'background-color': slide.bgc,
        'top': slide.to_top,
        'left': slide.to_left,
        'opacity': slide.to_opacity,
        'width': slide.width,
        'height': slide.height,
        'transform': 'scale(' + slide.to_scale + ')',
        'transition': 'none',
        'visibility': 'visible'
    });
    if (prevSlide !== undefined) _this.setToSlideCss(prevSlide);
    return _this;
};
