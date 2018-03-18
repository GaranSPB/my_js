'use strict';
var Decorator = function(property,filter,predicator){
	return function(){
		var target = this;
		if(predicator === undefined || predicator.apply(target,arguments)){
			target[property] instanceof Function ? target[property](filter.apply(target,arguments)) : target[property] = filter.apply(target,arguments);
		}
	}	
}