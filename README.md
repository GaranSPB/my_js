# Decorator
Decorator pattern for JavaScript
## For fast usage
```
Object.newproperty = decor(property,filter,predicator);
```
### Examples
```javascript
var inpNode = document.getElementById('inp');// DOM Node as an object for decoration

	var filter = function(value,currency){// define filter function
		return value + ' ' + currency + '.';
	}
	var predicator = function(value,currency){// define predicator function
		return !isNaN(value) && currency.length <= 3;
	}

	inpNode.cur = decor('value',filter,predicator);// add filter for base property 'value'
	inpNode.cur(20,'eur') //HTML input value '20 eur.'
	inpNode.cur(20,'rubles') //no chacnges, blocked by predicator
	inpNode.cur('30','rub') //HTML input value '30 rub.'
	inpNode.cur('a320','rubles') //no chacnges, blocked by predicator
```
## Syntax
### Constructor
```
var decorator = new Decorator(name,target,property,filter[,predicator]);
```
#### name
```
New property name for target object 
Type : String
```
#### target
```
Owner of decorating property
Type : Object
```
#### property
```
Decorating targets property
Type : mixed
```
#### filter
```
Makes changes to input value transfers it to targets property
Type : function
```
#### predicator | optional
```
Takes a value and determines to execute the next script or not. Returns true or false
Type : function
```
### Examples
```javascript
var in2 = document.getElementById('inp2');
var addRub = new Decorator('addrub',in2,'value',function(value){
	return value + '.00 RUB.';
});		
var round100 = new Decorator('r100',in2,'addrub',function(value){
	return Math.round(value/100) * 100;
});
in2.addrub(12543); //12543.00 RUB.
in2.r100(12543);   //12500.00 RUB.
```