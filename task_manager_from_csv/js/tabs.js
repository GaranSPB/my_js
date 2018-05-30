$.fn.tabs = function (n,cb) {
    this.each(function(){
        var
            wrapper = $(this),
            tabs = wrapper.find('.ig_tabs'),
            blocks = wrapper.find('.ig_blocks'),
            fader = blocks.parent(),
            active = n ? n : 0,
            fading = false;

        blocks.eq(active).addClass('active');
        wrapper.attr('current-tab',tabs.eq(active).attr('tab'));
        tabs.click(function(){
            var _this = $(this);
            if(!_this.hasClass('active') && !fading){
                fading = true
                tabs.filter('.active').removeClass('active');
                _this.addClass('active');
                wrapper.attr('current-tab',_this.attr('tab'));
                fader.animate({opacity:0},200,function(){
                    blocks.filter('.active').removeClass('active');
                    blocks.eq(_this.index()).addClass('active');
                    if(cb)cb();
                    fader.animate({opacity:1},200,function(){fading = false});
                });
            }
        });
    });
}
