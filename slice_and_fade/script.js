
$(document).ready(function(){
	var 
		img = $('#t'),
		img1 = $('#t1'),
		cc =  $('#t'),
		but = $('#start'),
		but1 = $('#start1'),
		imgUrl = img.css('background-image'),
		imgArray = [
			'test1.jpg',
			'test2.jpg',
			'test3.jpg'
		],
		loop = new Loop(imgArray),
		bgReplace = function(){
			this.css('background-image','url('+loop.next()+')');
		};

	but.click(function(e) {
		var 
			c = function(){
				but.prop('disabled',false);				
			},
			o = {
				markup:$('input[name="markup"]').val(),
				directionX:$('input[name="directionX"]:checked').val(),
				directionY:$('input[name="directionY"]:checked').val(),
				mainAxis:$('input[name="mainAxis"]:checked').val(),
				fadeTime:Number($('input[name="fadeTime"]').val()),
				cellFadeTime: Number($('input[name="cellFadeTime"]').val()),
				animation: $('select[name="animation"]').val(),
				preFadeAction: bgReplace,				
				fadeType:$('select[name="fadeType"]').val()
			}			
		$(this).prop('disabled',true);
		img.ig_fade(o,c);
		
	});
	setInterval(function(){
		but.trigger('click');
	},Number($('input[name="fadeTime"]').val())*3)		
	
});

Array.prototype.rnd = function(){	
	return this[Math.floor(Math.random()*this.length - 0.0000001)];
}
