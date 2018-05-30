$.fn.ig_fade = function(opt,callback){	
	if(window.ig_fade_count === undefined)window.ig_fade_count = 0;
	if(!$('#ig_faders_style')[0]) $('head').append('<style id="ig_faders_style">*[id^="ig_faders_"]>div{overflow:hidden;}.ig_fade_hidden{visibility: hidden;}</style>');
	var 
		_this = this,
		_count = window.ig_fade_count++,
		id = 'ig_faders_' + _count;
		options = {
			markup:"10x1",
			directionX:'forward',
			directionY:'forward',
			mainAxis:'x',
			fadeTime: 800,
			cellFadeTime: 800,
			animation : 'fadeOut',			
			fadeType:'default',
			preFadeAction:false
		};
	$.extend(options,opt);
	$('body').append('<div id="'+id+'"></div>');
	var 
		wrapper = $('#' + id); 
		userX = options.markup.split('x')[0],
		userY = options.markup.split('x')[1],		
		deltaX = _this.width() % userX,
		deltaY = _this.height() % userY,
		cellW = (_this.width() - deltaX) / userX,
		cellH = (_this.height() - deltaY) / userY,
		incX = options.directionX != 'backward' ? 1 : -1,
		incY = options.directionY != 'backward' ? 1 : -1,
		fadeStep = options.fadeTime/(userX*userY),
		cellArray = new Array,
		fadeStack = new Array;

	_this.css('width',_this.width()).css('height',_this.height());	
	for(var i = 0 ; i< userY;i++){
		var currentY = _this.offset().top + cellH * i;		
		cellArray[i] = new Array;
		for(var j = 0 ; j< userX;j++){			 
			var 
				currentX = _this.offset().left + cellW * j,
				styleString = '';			

			styleString = 'position: absolute;width:'+(j == userX - 1 ? cellW + deltaX : cellW)+'px;height:'+(i == userY - 1 ? cellH + deltaY : cellH)+'px;top:'+currentY+'px;left:'+currentX+'px;';			
			var last = wrapper.append('<div class="ig_fade_hidden" style="'+styleString+'"></div>').children().last();			
			last.append(_this.clone()).scrollLeft(cellW * j).scrollTop(cellH * i);
			cellArray[i][j] = last[0];
			expectedCX = currentX + cellW;				
			expectedCY = currentY + cellH;

		}
	}

	var cells = wrapper.find('.ig_fade_hidden');
	cells.removeClass('ig_fade_hidden');

	if(options.preFadeAction)options.preFadeAction.apply(_this);

	var startIndex = ((incX > 0 ? incX : userX) - 1) + ((incY > 0 ? incY : userY) - 1) * userX;
	var count = 0; 

	switch (options.fadeType) {

		case 'wave':

			var 
				startIndex = ((incX > 0 ? incX : userX) - 1) + ((incY > 0 ? incY : userY) - 1) * userX,
				steps = (userX*1 + userY*1)-2;
				
			fadeStack = cells.toArray();
			fadeStep = options.fadeTime/steps;			
			waveFade(startIndex,steps);;
						
			break;

		default:

			var
				sizeX = options.mainAxis != 'y' ? userX : userY,
				sizeY = options.mainAxis != 'y' ? userY : userX;

			for (var i = incY > 0 ? 0 : -sizeY+1; i < (incY > 0 ? sizeY : 1); i++) {
				for (var j = incX > 0 ? 0 : -sizeX+1; j < (incX > 0 ? sizeX : 1); j++){			
					if (options.mainAxis != 'y'){				
						fadeStack.push(cellArray[Math.abs(i)][Math.abs(j)]);			
					}else{
						fadeStack.push(cellArray[Math.abs(j)][Math.abs(i)]);
					}
				}		
			}
			defaultFade(fadeStack);

		break;

	}

	function defaultFade(arr){	

		var el = arr.shift();		
		$(el)[options.animation](options.cellFadeTime);
		setTimeout(function(){
			$(el).remove();
		},options.cellFadeTime); 
		setTimeout(function(){				
			if(arr[0]){
				defaultFade(arr);		
			}else{
				setTimeout(function(){					
					$('#ig_faders_' + _count).remove();
					if(callback)callback.apply(_this);
				},options.cellFadeTime);
			}
		},fadeStep);

	}
	
	function waveFade(n,i){			
		if(!fadeStack[n]) return false;		
		var el = fadeStack[n];
		fadeStack[n] = undefined;	
		$(el)[options.animation](options.cellFadeTime);
		if(i){
			setTimeout(function(){		
				waveFade(n+incX,i-1);
				if(fadeStack[n+incX])fadeStack[n+incX] = undefined;
				waveFade(n+incY*userX,i-1);
				if(fadeStack[n+incY*userX])fadeStack[n+incY*userX] = undefined;
			},fadeStep);
		}else{
			setTimeout(function(){				
				$('#ig_faders_' + _count).remove();
				if(callback)callback.apply(_this);
			},options.cellFadeTime);
		}	

	}

}
