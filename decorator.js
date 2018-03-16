console.log('init');
var Decorator = function(target,property,decorateFunction,predicator){
	try{
		checkConstructionErrors();	
	}catch(e){
		console.error(e);		
	}

	function checkForConstructionErrors(){
		if(target === undefined || !(target instanceof Object)) throw "Decorator construction error: target is not an Object!";
		if(!target.hasOwnProperty(property)) throw "Decorator construction error: unknown property for target!";
		if(decorateFunction === undefined || !(decorateFunction instanceof Function)) throw "Decorator construction error: 3rd param is not a function!";
		if(predicator && !(predicator instanceof Function)) throw "Decorator construction error: 4rd param is not a function!";	
	}	
}



