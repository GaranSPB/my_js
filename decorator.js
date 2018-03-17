'use strict';
var Decorator = function(target,property,filter,predicator){
	try{
		checkForConstructionErrors();
		Object.defineProperty(this,'target',{value: target,writable: false});
		Object.defineProperty(this,'property',{value: property,writable: false});
		Object.defineProperty(this,'filter',{value: filter,writable: false});
		Object.defineProperty(this,'predicator',{value: predicator,writable: false});
	}catch(e){
		console.error(e);		
	}

	function checkForConstructionErrors(){
		if(target === undefined || !(target instanceof Object)) throw "Decorator construction error: target is not an Object!";
		if(!target.hasOwnProperty(property)) throw "Decorator construction error: unknown property for target!";
		if(filter === undefined || !(filter instanceof Function)) throw "Decorator construction error: 3rd param is not a function!";
		if(predicator && !(predicator instanceof Function)) throw "Decorator construction error: 4rd param is not a function!";	
	}	
}

Decorator.prototype.set = function(value) {
	if(this.predicator === undefined || this.predicator(value,this.target)){
		var _prop = this.target[this.property];
		_prop instanceof Function ? _prop(this.filter(value)) : _prop = this.filter(value);
	}
};



