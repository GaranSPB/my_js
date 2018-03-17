# Decorator
Decorator pattern for JavaScript
```javascript
var b = {x:2,y:function(v){console.log(v*10)}};
var d = new Decorator(b,'y',(v)=>v*10,(v)=>v<=5);
```
