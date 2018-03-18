# Decorator
Decorator pattern for JavaScript
## Syntax
```
Decorator(property,filter,predicator);
```
## Examples
```javascript
var inpNode = document.getElementById('inp');// object for decoration

var filter = function(value,currency){// define filter function
	return value + ' ' + currency + '.';
}

var predicator = function(value,currency){// define predicator function
	return !isNaN(value) && currency.length <= 3;
}

inpNode.cur = new Decorator('value',filter,predicator);// add filter for base property 'value'

inpNode.cur(20,'eur') //HTML input value '20 eur.'

inpNode.cur(20,'rubles') //no chacnges, blocked by predicator

inpNode.cur('30','rub') //HTML input value '30 rub.'

inpNode.cur('a320','rubles') //no chacnges, blocked by predicator
```
