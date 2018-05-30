$(document).ready(function () {
    var $wrappers = $('[tabs="wrapper"]');
    $wrappers.each(function () {
        var _wrap = this,
            _this = $(this),
            _ts = _this.find('[tabs="tab-set"]').first(),
            _tabs = _ts.children('[tabs="tab"]'),
            _bs = _this.find('[tabs="block-set"]').first(),
            _blocks = _bs.children('[tabs="block"]'),
            hashedTab = location.hash ? _tabs.filter('[tab-hash="'+location.hash+'"]') : undefined,
            _ct = hashedTab && hashedTab.index() !== -1 ? hashedTab.index() : 0,
            tabbing = false;
        _wrap.tabButtons = _tabs.toArray();
        _wrap.tabsBlocksWrapper = _bs[0];
        _wrap.dis = false;
        _wrap.tabBlocks = _blocks.toArray();
        if(_tabs.filter('.active').index() !== _ct){
            _tabs.removeClass('active');
            _blocks.removeClass('active');
            _bs.removeClass('prepare');
        }
        _tabs.eq(_ct).addClass('active');
        _blocks.eq(_ct).addClass('active').show();
        _wrap.currentTab = _ct;
        if(_this.attr('effect') === 'min-height' && _this.is(':visible')){
            mhInit(_bs[0]);
        }
        _tabs.click(function () {
            if(!tabbing && !$(this).hasClass('active') && !_wrap.dis){
                tabbing = true;
                var i = $(this).index();
                if($(this).attr('tab-hash')) location.hash = $(this).attr('tab-hash');
                _tabs.removeClass('active');
                _tabs.eq(i).addClass('active');
                _blocks.eq(_ct).animate({opacity:0},250,function () {
                    _blocks.eq(_ct).removeClass('active');
                    _ct = i;
                    _wrap.currentTab = _ct;
                    _blocks.eq(_ct).addClass('active').css('opacity',0);
                    if(window._GL)_GL.run('tab-changed',_wrap);
                    _blocks.eq(_ct).animate({opacity:1},250,function () {
                        tabbing = false;
                    });
                });
            }else if(!tabbing && $(this).hasClass('active') && !_wrap.dis){
                if(window._GL)_GL.run('click-to-active-tab',_wrap);
            }
        });
    });
});

function mhInit(wrapper) {
    if(!$('#size-checker')[0]) $('body').append('<div id="size-checker"></div>');
    var sizer = $('#size-checker'),
        ch = $(wrapper).children(),
        max = 0;
        w = $(wrapper).outerWidth();
    sizer.width(w);
    ch.each(function () {
        sizer.append($(this).clone().css({'min-height' : 0 , 'display' : 'block'}));
        var h = sizer.outerHeight();
        max = h > max ? h : max;
        sizer.html('');
    });
    ch.css('min-height',max);
}
