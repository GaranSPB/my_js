Array.prototype.last = function () {
    return this[this.length - 1];
};

Array.prototype.afterIndex = function(val){
    if(val<this[0]) return undefined;
    var l = this.length;i = 0;
    if(val>this[l-1]) return l - 1;
    while(i<l && this[i+1]<val) i++;
    return i;
};

String.prototype.addSplitter = function (splitter) {
    var _v = this,
        l = _v.length;
    _v = l%3 === 0 ? _v : ' '.strRepeat(3 - l%3) + _v;
    return _v.match(/.{0,3}/g).join(splitter).trim();
};

String.prototype.strRepeat = function (n) {
    var result="";
    while(n){result+=this;n--}
    return result;
}


$.fn.ig_range_input = function (customOptions) {
    var _this = this,
        options = {
            defaultValue : 0,
            rangeData : [
                ['0' , 0],
                ['50' , 50],
                ['100' , 100]
            ],
            slideTime : 200,
            step : false,
            snapToGrid : false,
            changeAction : function () { },
            inputSelector : undefined,
            inputInsertedStep : undefined,
            numSplitter : undefined
        };

    _this.rangeVal = function (val,customStep) {
        var _this = this;
        if(val === undefined || isNaN(val)) return _this.rv;
        val = Number(val);
        _this.rv = val < _this.rvMin ? _this.rvMin : val > _this.rvMax ? _this.rvMax : val;
        _this.rvLastOffset = _this.rvOffset;
        _this.rvOffset = convertValToOffset();
        applyStepLogic(customStep);
        if(options.snapToGrid) _this.rvOffset = convertValToOffset();
        slide();
        return _this.rv;
    };

    _this.rangeOffset = function (off) {
        var _this = this;
        if(off === undefined || isNaN(off)) return _this.rvOffset;
        off = Number(off);
        _this.rvOffset = _0_100(off);
        slide();
        highlightSticks();
        return _this;
    };

    $.extend(options,customOptions);
    if(options.defaultValue < options.rangeData[0][1]) options.defaultValue = options.rangeData[0][1];
    if(options.step < 1) options.step = false;
    initRange();

    function slide(slideType,newOffset){
        var off = newOffset !== undefined ? _0_100(newOffset) : _this.rvOffset;
        if(slideType === 'replace'){
            _this.$slider.css('left',off + '%');
            _this.hiddenScale.css('width',off + '%');
            _this.rvLastOffset = undefined;
        }else{
            _this.rvSliding = true;
            _this.$slider.stop().animate({left: off + '%'},options.slideTime,'linear');
            _this.hiddenScale.stop().animate({width: off + '%'},options.slideTime,'linear',function(){
                _this.rvSliding = false;
                if(_this.rvNextTargeX){
                    applyClickBarLogic(_this.rvNextTargeX);
                    _this.rvNextTargeX = undefined;
                }
            });
        }
        highlightSticks();
        updateInputs();
        options.changeAction.call(_this);
    }

    function _0_100(off) {
        return off < 0 ? 0 : off > 100 ? 100 : off;
    }

    function initRange() {
        var vals = options.rangeData.map(function (el) {
            return el[1];
        });
        _this.rvMin = vals[0];
        _this.rvMax = vals.last();
        _this.rvCut = _this.rvMax - _this.rvMin;
        _this.rvVals = options.rangeData.map(function (el) {return el[1]});
        _this.rvOffs = _this.rvVals.map(function (el) {return convertValToOffset(el)});
        drawScale();
        initSlider();
        initInput();
        updateInputs();
    }

    function drawScale(){
        _this.html('<div class="ig_range_input-main_scale"><div class="ig_range_input-hidden_scale"></div></div>');
        var scale = _this.find('.ig_range_input-main_scale'),
            hiddenScale = scale.find('.ig_range_input-hidden_scale');
        _this.scale = scale;
        _this.hiddenScale = hiddenScale;
        options.rangeData.forEach(function (el,i) {
            var leftOffset = (el[1] - _this.rvMin)*100/_this.rvCut + '%';
            var cssClass = i === 0 ? '_limit _first highlight' : i === options.rangeData.length - 1 ? '_limit _last' : '';
            scale.append('<span style="left:' + leftOffset + ';" class="' + cssClass + ' _stick"></span>');
            scale.children().last().append('<span class="_label">' + el[0] + '</span>');
        });
        scale.append('<span class="_click_bar"></span>');
        _this.$clickBar = scale.find('._click_bar');
        var sliderLeftOffset = (options.defaultValue - _this.rvMin)*100/_this.rvCut;
        hiddenScale.css('width',sliderLeftOffset + '%');
        scale.append('<span style="left:' + sliderLeftOffset + '%;" class="_slider"><div class="_three_sticks"></div></span>');
        _this.rvOffset = sliderLeftOffset;
        _this.rvLastOffset = _this.rvOffset;
        _this.rv = convertOffsetToVal();
        _this.rvSection = getSection();
        _this.rvLastSection = undefined;
        _this.rvSliding = false;
        _this.$sticks = scale.find('._stick');
        _this.$labels = scale.find('._label');
        _this.$slider = scale.find('._slider');
        _this.$slider.rvDrag = false;
    }

    function highlightSticks(){
        _this.rvSection = getSection();
        if(_this.rvLastSection !== _this.rvSection){
            if(_this.rvLastOffset !== undefined){
                var deltaOffset = _this.rvLastOffset - _this.rvOffset,
                    oldSection = getSection(convertOffsetToVal(_this.rvLastOffset)),
                    start = Math.min(oldSection,_this.rvSection) + 1,
                    finish = Math.max(oldSection,_this.rvSection) + 1,
                    moveRight = oldSection < _this.rvSection;
                _this.$sticks.slice(start,finish).each(function (i,el) {
                    var actionTime = 1 - Math.abs((_this.rvOffset - _this.rvOffs[start+i])/deltaOffset);
                    setTimeout(function () {
                        moveRight ? $(el).addClass('highlight') : $(el).removeClass('highlight');
                    },options.slideTime*actionTime);
                });
                _this.rvLastOffset = undefined;
            }else{
                _this.$sticks.removeClass('highlight');
                _this.$sticks.slice(0,_this.rvSection + 1).addClass('highlight');
            }
        }
        _this.rvLastSection = _this.rvSection;
    }

    function initSlider(){
        _this.$slider.on('mousedown touchstart',function (e) {
            if(_this.rvSliding) return false;
            _this.$slider.rvDrag = true;
            _this.$slider.addClass('dragging');
            e.preventDefault();
        });

        $(document).on('mouseup touchend',function(){
            if(_this.$slider.rvDrag){
                _this.$slider.rvDrag = false;
                _this.$slider.removeClass('dragging');
				if(options.snapToGrid){
					slide('replace',convertValToOffset());
				}				
            }
        });

        $(document).on('mousemove',function(e){
            if(_this.$slider.rvDrag){
				_this.lastMoveX = e.pageX;	
                _this.rvOffset = _this.scale.convertXtoOffset(_this.lastMoveX);							
				applyStepLogic();          				
                slide('replace');				      
            }
        });

        $(document).on('touchmove',function(e){
            if(_this.$slider.rvDrag){
				_this.lastMoveX = e.originalEvent.changedTouches[0].pageX;
                _this.rvOffset = _this.scale.convertXtoOffset(_this.lastMoveX);
				_this.lastMoveX = e.pageX;
                applyStepLogic();
				slide('replace');               
            }
        });

        _this.$clickBar.click(function (e) {
            if(_this.rvSliding){
                _this.rvNextTargeX = e.pageX;
                return false;
            }
            applyClickBarLogic(e.pageX);
        });

        _this.$labels.click(function (e) {
            if(_this.rvSliding){
                return false;
            }
            _this.rangeVal(_this.rvVals[_this.$labels.index($(this))]);
        });

    }

    function applyClickBarLogic(pageX) {
        _this.rvLastOffset =  _this.rvOffset;
        _this.rvOffset = _this.scale.convertXtoOffset(pageX);
        applyStepLogic();
        _this.rangeOffset(convertValToOffset());
    }

    function convertOffsetToVal(newOffset) {
        var off = newOffset !== undefined ? newOffset : _this.rvOffset;
        return Math.round(_this.rvMin + _this.rvCut * off/100);
    }

    function convertValToOffset(val) {
        var v = val !== undefined ? val : _this.rv;
        return (v - _this.rvMin)*100/_this.rvCut;
    }

    function applyStepLogic(step) {
        if(options.snapToGrid){
            var val = convertOffsetToVal(),
                section = getSection(val);
            _this.rv = _this.rvVals[section + 1] - val < val - _this.rvVals[section] ? _this.rvVals[section + 1] : _this.rvVals[section];
            return true;
        }
        var _step = step !== undefined ? step : options.step ? options.step : 1;
        if(!_step) return false;
        _this.rv = Math.round(convertOffsetToVal()/_step) * _step;
        getSection();
        return true;
    }

    function getSection(val){
        return  _this.rvVals.afterIndex(val !== undefined ? val : _this.rv);
    }

    function initInput(){
        _this.$input = $(options.inputSelector);
        if(_this.$input[0]){
            var _inp = _this.$input;
            _inp.val(_this.rangeVal());
            _inp.on('keyup',function (e) {
                if(e.key === 'Enter') _inp.blur();
            });
            _inp.on('blur',function () {
                _this.rangeVal(_inp.val().replace(/\s/g,''),options.inputInsertedStep);
                updateInputs();
            });
        }
    }

    function updateInputs() {
        var val = options.numSplitter ? String(_this.rangeVal()).addSplitter(options.numSplitter) : _this.rangeVal();
        _this.$input.val(val);
    }

};

$.fn.convertXtoOffset = function (x) {
    var _this = this,
        off = (x - _this.offset().left) * 100 / _this.width();
    off = off < 0 ? 0 : off > 100 ? 100 : off;
    return off;
};

$.fn.ig_toggle_switch = function(arr,callback){
    var _this = this;
    _this.posArr = ['ts_left','ts_right']
    _this.tsPos = 0;
    _this.tsVals = arr;
    _this.tsCurrentVal = _this.tsVals[_this.tsPos];
    _this.addClass(_this.posArr[_this.tsPos]);
    initToggle();

    function initToggle(){
        _this.click(swap);
        _this.prev().click(left);
        _this.next().click(right);
    }

    function swap(){
        _this.removeClass(_this.posArr[_this.tsPos]);
        _this.tsPos = _this.tsPos === 0 ? 1 : 0;
        _this.addClass(_this.posArr[_this.tsPos]);
        _this.tsCurrentVal = _this.tsVals[_this.tsPos];
        callback(_this.tsCurrentVal);
    }

    function left(){
        if(_this.tsPos === 0) return false;
        _this.removeClass(_this.posArr[1]).addClass(_this.posArr[0]);
        _this.tsCurrentVal = _this.tsVals[0];
        _this.tsPos = 0;
        callback(_this.tsCurrentVal);
    }

    function right(){
        if(_this.tsPos === 1) return false;
        _this.removeClass(_this.posArr[0]).addClass(_this.posArr[1]);
        _this.tsCurrentVal = _this.tsVals[1];
        _this.tsPos = 1;
        callback(_this.tsCurrentVal);
    }

}
