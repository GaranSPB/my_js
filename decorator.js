console.log('init');
var Decorator = function(target,property,filter,predicator){
	try{
		checkForConstructionErrors();	
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



