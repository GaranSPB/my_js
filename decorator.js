'use strict';
function decor(property,filter,predicator){
	return function(){
		var target = this;
		if(predicator === undefined || predicator.apply(target,arguments)){
			target[property] instanceof Function ? target[property](filter.apply(target,arguments)) : target[property] = filter.apply(target,arguments);
		}
	}	
}

var Decorator = function(name,target,property,filter,predicator){
	if(!name || !target || !property || !filter) return undefined;
	var _this = this;
	_this.property = property;
	_this.filter = filter; 
	_this.predicator = predicator; 
	_this.tartgets = [].concat(target);
	if(!target.hasOwnProperty('decorators'))target.decorators = {};
	target.decorators[name] = _this;
	target[name] = decor(property,filter,predicator);
}