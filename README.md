# Decorator
Decorator pattern for JavaScript
## Syntax
```
Decorator(target,property,filter,predicator);
```
## Examples
```javascript
var b = {x:2,y:function(v){console.log(v*10)}}; // some object
var d = new Decorator(b,'y',(v)=>v*10,(v)=>v<=5); // decorate b

d.set(2) // 200
d.set(6) // undefined
```
