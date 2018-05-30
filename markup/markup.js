GlobalLauncher = function(){
    this._events = [];
};

GlobalLauncher.prototype.add = function (event,callback,target) {
    if(!this._events[event]){
        this._events[event] = [];
    }
    this._events[event].push({t : target , c : callback});
    return this;
};

GlobalLauncher.prototype.run = function(event,target){
    if(!event) return;
    if(_GL._events[event]){
        _GL._events[event].forEach(function (e) {
            if(e.t === target){
                e.c.call(target);
            };
        });
    }
};

var _GL = new GlobalLauncher();
