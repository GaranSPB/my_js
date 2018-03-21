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
	target[name] = decor(property,filter,predicator);
}

Decorator.prototype.addTarget = function(target){
	if(this.tartgets.indexOf(target) === -1){
		this.tartgets.push(target);	
		target[this.name] = decor(this.property,this.filter,this.predicator);
		if(!target.hasOwnProperty('decorators'))target.decorators = {};
		target.decorators[this.name] = this;
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