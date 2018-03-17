# Decorator
Decorator pattern for JavaScript
```javascript
var b = {x:2,y:function(v){console.log(v*10)}}; // some object
var d = new Decorator(b,'y',(v)=>v*10,(v)=>v<=5); // decorete b

b.set(2) // 200
b.set(6) // undefined
```
