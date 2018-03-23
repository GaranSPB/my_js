# Decorator
Decorator pattern for JavaScript
## Syntax
### Constructor
```
var decorator = new Decorator(name,target,property,filter[,predicator]);
```
```javascript
var input = document.getElementById('inp');
	
var round100 = new Decorator('r100',input,'value',function(v){
	return '$' + Math.round(v/100) * 100;
});

input.r100(12543); // '$12500' input updated like: input = '$12500';

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
### addTarget(target) 
```javascript
var input1 = document.getElementById('inp1');
var input2 = document.getElementById('inp2');

var round100 = new Decorator('r100',input,'value',function(v){
	return '$' + Math.round(v/100) * 100;
});

round100.addTarget(input2);//adds r100 method to new target 

input1.r100(12543); // '$12500'
input2.r100(232); // '$200'

```
### removeTarget(target)
```javascript
round100.removeTarget(input2);//removes the dependency between a target and decorator 

input1.r100(12543); // '$12500'
input2.r100(232); //Uncaught TypeError

```
### setFilter(filter)
```javascript
round100.setFilter(function(v){
	return Math.round(v/1000) * 1000 + ' Rub.';
});

input2.r100(6890); // '7000 Rub.'

```
### setPred(predicator)
```javascript
round100.setPred(function(v){
	return v > 10000;
});

input2.r100(8888); // '7000 Rub.' - old value
input2.r100(11111); // '11000 Rub.' 

```
### removePred()
```javascript
round100.removePred();

input2.r100(8888); // '9000 Rub.'

```
### For fast usage
```
Object.newproperty = decor(property,filter[,predicator]); // you can't control the object via the decorator
```
