$(document).ready(function () {
    var $wrappers = $('[tooltip="wrapper"]');
    $(document).click(function (e) {
        var _tips = $('[tooltip="content"].active');
        if(!$(e.target).closest('[tooltip="content"]')[0] && _tips[0]){
            _tips.fadeOut(200,function () {
                _tips.find('.tooltip-caret').remove();
                _tips.find('.tooltip-dot').remove();
                _tips.removeClass('active');
				_tips.parent().removeClass('tip-open');
            });
        }
    });

    $wrappers.each(function () {
        TooltipInit(this);
    });
});

function TooltipInit(wrapper) {
    var _this = $(wrapper),
        _text = _this.children('[tooltip="content"]'),		
        fading = false,
        toolMargins  = 20,
        toolWidth = _this.attr('tooltip-width') ? Number(_this.attr('tooltip-width')) : 300;
    if(!_text[0]) return;
    _this.click(function (e) {
        if(e.target === this && !fading && !_text.hasClass('active')){
			_this.addClass('tip-open');
            var $this= $(this),
                x = $this.offset().left,
                y = $this.offset().top,
                w = $this.outerWidth(),
                h = $this.outerHeight(),
                wt = $(window).scrollTop(),
                wh = $(window).height(),
                ww = $(window).width(),
                tw =  ww >= toolWidth + toolMargins * 2 ? toolWidth : ww - toolMargins * 2;
            _text.css('width',tw);

            var th = _text.outerHeight(),
                deltaTop = y - wt +  h/2 - th/2 - toolMargins,
                deltaBot = wt + wh - y - h/2 - th/2 - toolMargins,
                deltaLeft = x - toolMargins + w/2 - tw/2,
                deltaRight = ww - (x + w + (tw/2 - w/2) + toolMargins),
                topText = 0,topCaret = 0,leftText = 0, leftCaret = 0,
                haveRightSpace = (ww - w - x - 20 - toolMargins) >= tw,
                haveTopSpace = (y - wt - 20 - toolMargins + wt) >= th,
                haveTopSpaceWOScroll = (y - wt - 20 - toolMargins) >= th,
                haveBotSpaceWOScroll = wh + wt - y - h - 20 - toolMargins >= th,
                caret = $('<span class="tooltip-caret"></span>'),
                dot = $('<span class="tooltip-dot"></span>');
            _text.append(caret).append(dot);
            if(haveRightSpace && !_this.hasClass('tooltip-disable-right')){
                topText = h/2 - th/2;
                topCaret = th/2 - 7.07;
                leftText = w + toolMargins;
                leftCaret = - 10;
            }else{
                if(!_this.hasClass('tooltip-disable-top') && (haveTopSpaceWOScroll || (haveTopSpace && !haveBotSpaceWOScroll) || _this.hasClass('tooltip-disable-bottom'))){
                    deltaTop = y - wt - th - toolMargins - 20;
                    deltaBot = 0;
                    topText = - th - 20;
                    topCaret =  th - 10;
                }else{
                    deltaTop = 0;
                    deltaBot = wh + wt - y - h - th - toolMargins - 20;
                    topText = h + 20;
                    topCaret = - 10;
                }
                if(deltaLeft <= deltaRight){
                    leftText = deltaLeft < 0 ? w/2 - tw/2 - deltaLeft : w/2 - tw/2;
                    leftCaret = deltaLeft < 0 ? tw/2 + deltaLeft - 7.07 : tw/2 - 7.07;
                }else{
                    leftText = deltaRight < 0 ? w/2 - tw/2 + deltaRight : w/2 - tw/2;
                    leftCaret = deltaRight < 0 ? tw/2 - deltaRight - 7.07 : tw/2 - 7.07;
                }
            }
            _text.css({ 'top' :  topText , 'left' : leftText });
            caret.css({ 'top' : topCaret, 'left' : leftCaret });
            if(deltaTop < 0 ){
                $('html').animate({ scrollTop: $(window).scrollTop() + deltaTop}, 400);
            }else if(deltaBot < 0){
                $('html').animate({ scrollTop: $(window).scrollTop() - deltaBot}, 400);
            }
            fading = true;
            _text.fadeIn(200,function () {
                _text.addClass('active');
                fading = false;
                dot.click(function () {
                    fading = true;
                    _text.fadeOut(200,function(){
                        fading = false;
                        caret.remove();
                        dot.remove();
                        _text.removeClass('active');
                    });
                });
            });
        }
    });
};
