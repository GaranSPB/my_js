$.fn.ig_owlSwipe = function(range){

	var 
		$owlObj = this,
		owlObj = $owlObj[0],
		swipeStartX,swipeStartY,swipeFinishX,swipeFinishY,swipeDeltaX,swipeDeltaY = 0,
		rangeNeedsForSwipe = range ? range : 30 ;

	owlObj.addEventListener('touchstart', function(e){
		swipeStartX = e.touches[0].clientX;
		swipeStartY = e.touches[0].clientY;
	});

	owlObj.addEventListener('touchend', function(e){
		swipeFinishX = e.changedTouches[0].clientX;
		swipeFinishY = e.changedTouches[0].clientY;
		swipeDeltaX = swipeStartX - swipeFinishX;
		swipeDeltaY = swipeStartY - swipeFinishY;
		if(Math.abs(swipeDeltaX) >= rangeNeedsForSwipe && Math.abs(swipeDeltaX) > Math.abs(swipeDeltaY)){
			if(swipeDeltaX > 0){
				$owlObj.trigger('next.owl.carousel');	
			}else{
				$owlObj.trigger('prev.owl.carousel');
			}		
		}	
	});

	return $owlObj;

}
