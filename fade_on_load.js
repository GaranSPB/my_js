//подключаем после JQUERY

$(document).ready(function(){

	var 
		slidesArray = $('[class*="ig_slide_"]').toArray();		
	
	slidesReview();

	$(window).scroll(slidesReview);

	function slidesReview(){

		var 
			wh = $(window).height();
			st = $(window).scrollTop();
			arr = [];

		arr = slidesArray.filter(function(el,i){
				var 
					$el = $(el);
					t = $el.is('.ig_slide_bottom') ? $el.is('.ig_slide_top') ? $el.offset().top + 100 : $el.offset().top - 100 : $el.offset().top,
					vis = t < st + wh * .8;

				if(vis)$el.addClass('ig_slide_show');
				return !vis;
		});

		slidesArray = arr;
	}
})
