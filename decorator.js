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
	_this.name = name;
	_this.property = property;
	_this.filter = filter; 
	_this.predicator = predicator; 
	_this.tartgets = [].concat(target);
	if(!target.hasOwnProperty('decorators'))target.decorators = {};
	target.decorators[name] = _this;
	target[name] = _this.decor(target);
}

Decorator.prototype.decor = function(target){
	var _this = this;
	return function(){
		var dec = target.decorators[_this.name],
			predicator = dec.predicator,
			filter = dec.filter,
			property = dec.property;
		if(predicator === undefined || predicator.apply(target,arguments)){
			target[property] instanceof Function ? target[property](filter.apply(target,arguments)) : target[property] = filter.apply(target,arguments);
		}
	}
} 

Decorator.prototype.addTarget = function(target){
	if(this.tartgets.indexOf(target) === -1){
		this.tartgets.push(target);
		if(!target.hasOwnProperty('decorators'))target.decorators = {};
		target.decorators[this.name] = this;	
		target[this.name] = this.decor(target);		
	}	
	return this;
}

Decorator.prototype.removeTarget = function(target){
	var t = this.tartgets,
		i = t.indexOf(target);	
	if(i !== -1){		
		this.tartgets = t.slice(0,i).concat(t.slice(i+1));
		delete(target[this.name]);
		delete(target.decorators[this.name]);
	}
	return this;
}

Decorator.prototype.setFilter = function(filter){
	if(filter instanceof Function) this.filter = filter;
	return this;
}

Decorator.prototype.setPred = function(predicator){
	if(predicator instanceof Function) this.predicator = predicator;
	return this;
}

Decorator.prototype.removePred = function(){
	this.predicator = undefined;
	return this;
}