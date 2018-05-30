Launcher = function(){
    return function (name,cb) {
        if(this.__e === undefined) this.__e = {};
        if(cb instanceof Function && name !== undefined){
            if(!this.__e[name]) this.__e[name] = [];
            this.__e[name].push(cb.bind(this));
        }else if(name !== undefined && !(cb instanceof Function)){
            if(this.__e[name]){
                this.__e[name].forEach(function (el) {
                    cb !== undefined ? el(cb) : el();
                })
            }
        }
    };
};
