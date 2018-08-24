var WidgetEngine = function () {
    let _this = this,
        availableEvents = ['click','change','blur'];
    _this.on = Launcher();
    _this.actions = {};
	_this.ajaxSettings = {};
    _this.storage = new WidgetStorage();
	_this.notification = new Notification();
	_this.localization = new Localization();
    _this.setActions = actions => Object.assign(_this.actions,actions);
	_this.setAjaxSettings = ajaxSettings => Object.assign(_this.ajaxSettings,ajaxSettings);
    _this.setSettingsWrapper = $obj => _this.wrapper = $obj;
    _this.loadHashData = callback => getAllData(_this.actions, dataHash => {
        _this.parseAllActionsFields();
        _this.on('hash-ready',dataHash);
        callback ? callback(dataHash) : void(0);
    });
    _this.parseAllActionsFields = () => {
		for(let action in _this.actions)_this.parseActionFields(action);
	}
	_this.parseActionFields = action => {
		let _act = parseAction(action);
		if(_act.type === 'self') _act.data = _act.dataDecorator ? _act.dataDecorator(act[_act.link].data) : act[_act.link].data;
		if(typeof(_act.node) === 'string')_act.node = _this[_act.node] ? _this[_act.node] : _act.node;
		if(_act.refreshable && typeof(_act.node) === 'object')_act.node = $('#'+_act.node.attr('id'));
		availableEvents.forEach( eventName => {
			if(_act[eventName]) {
				let target = _act.getEventBindTarget ?  _act.getEventBindTarget(_act.node) : _act.node;
				target.off(eventName,`[action="${action}"]`);
				target.on(eventName,`[action="${action}"]`, e => {
					let item = $(e.currentTarget),
						id = item.attr('amo-id') ? item.attr('amo-id') : item.val();
					_act.current = id;
					_act[eventName]({
						item : item,
						id : id
					});
				});
			}
		});
	}
    _this.loadData = action => {
        let act = parseAction(action);
        return act.data === null ? ajaxRequest(act,data => act.data = act.dataDecorator ? act.dataDecorator(data) : data) : act.dataEventName ? _this.on(act.dataEventName,act.data) : void(0);
    };
    _this.getData = action => {
        let act = parseAction(action);
        return act.data;
    };
    _this.appendHTML = (HTML,action) => {
		let wrapper = action ? parseAction(action).node : $(_this.wrapper);
		wrapper.append(HTML);
        $.each(wrapper.find('[id]'),(i,el) => _this[el.id] = $(el));
    };
    _this.renderAction = (action,data) => {
        let act = parseAction(action);
        if(act.preRenderCallback)act.preRenderCallback(act);
        data = data === undefined ? act.data : data;
        data = act.preRenderDecorator ? act.preRenderDecorator(data) : data;
        act.node.html(_this.getArray(data).map(act.render).join(''));
		$.each(act.node.find('[id]'),(i,el) => _this[el.id] = $(el));
        if(act.postRenderCallback)act.postRenderCallback(act);
        return _this;
    };
    _this.renderAll = actArray => {
        if(actArray === undefined){
            for(let act in _this.actions) parseAction(act).render ? _this.renderAction(act) : void(0);
        }else{
            actArray.forEach(act => parseAction(act).render ? _this.renderAction(act) : void(0));
        }
    } ;
    _this.updateRender = (action,data) => {
        let act = parseAction(action);
        data = data === undefined ? act.data : data;
        act.node.html(_this.getArray(data).map(act.updateRender).join(''));
    }
    _this.filterKeys = (obj,keysArr) => {
        let result = {};
        for(key in obj) keysArr.includes(key) ? result[key] = obj[key] : void(0);
        return result;
    };
    _this.getArray = obj => {
        let result = [];
        if(obj instanceof Array){
            result = obj;
        } else {
            for (key in obj) result.push(obj[key]);
        }
        return result;
    };
    _this.toObjectById = arr => {
        return arr.reduce(function(obj,el){
            obj[el.id] = el;
            return obj;
        },{});
    };
    _this.getByKey = (obj,key,val) => {
        let arr = _this.getArray(obj);
        return arr.reduce(function (result,el) {
            if(el[key] == val) result[el.id] = el;
            return result;
        },{});
    };
    _this.isEmpty = obj =>{
        return !Boolean(Object.keys(obj).length)
    };
    _this.toLS = (key,data) => {
        return localStorage.setItem(key,JSON.stringify(data));
    };
    _this.fromLS = (key,defaultValue) => {
        return localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)) : defaultValue;
    };
    _this.toSS = (key,data) => {
        return sessionStorage.setItem(key,JSON.stringify(data));
    };
    _this.fromSS = (key,defaultValue) => {
        return sessionStorage.getItem(key) !== null ? JSON.parse(sessionStorage.getItem(key)) : defaultValue;
    };
    _this.parseTemplate = (rowData,tpl) => {
        for (key in rowData) tpl = tpl.replace(RegExp('%' + key + '\\|([^\\%]*)%','g') ,rowData[key] ? rowData[key] : '$1');
        return tpl;
    }
    _this.rnd = mixed => mixed instanceof Array ? mixed[getRandom(mixed.length - 1)] : Math.round(Math.random()*mixed);
    _this.date = d => {
        d = d ? d : new Date;
        return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    };
    _this.getMaxByKeys = (action,keyArr) => {
        let arr = _this.getArray(action.data),
            result = {};
        arr.forEach( item => {
            for(key in item) keyArr.includes(key) && (result[key+'_max'] === undefined || result[key+'_max']*1 < item[key]*1) ? result[key+'_max'] = item[key] : void(0)
        });
        return result;
    };
    _this.sortByKey = (objArray,sortKey,reverse) => {
        objArray = _this.getArray(objArray);
        objArray.sort(function (a,b) {
            return (a[sortKey]<b[sortKey]) ?  -1 : 1;
        });
        return reverse ? objArray : objArray.reverse();
    };
    //short functions
    _this.data = (action,val) => setOrGet('data',action,val);
    _this.cur = (action,val) => setOrGet('current',action,val);
    _this.node = (action,val) => setOrGet('node',action,val);
    _this.act = (action) => parseAction(action);
	


    function WidgetStorage(){
        let _store = this;
        _store.data = {};
        _store.options = {};
        _store.init = options => {
            window.__postWE = () => _store.postData();
            Object.assign(_store.options,options);
            _store.updateLS();
        };
        _store.updateLS = () =>  _store.options.localKey ? _this.toLS(_store.options.localKey,_store.data) : void(0);
        _store.setData = data => {
            if(data){
                _store.data = data;
                _store.updateLS();
            }
        };
        _store.updateData = (opt = {}) => {
            let src = _store.options.source,
                evalString = '_store.data',
                hasKey = true,
                result = undefined,
                {type,action,value} = opt;
            Object.entries(src).forEach( arr => {
                if(!hasKey) return false;
                let key = arr[0],
                    cur = _this.actions[key].current;
                if(cur){
                    evalString += '["' + cur + '"]';
                    if(eval(evalString) === undefined) {
                        if(type === 'get') {
                            hasKey = false;
                            return false;
                        }else{
                            arr[1] === 'static' ? eval(evalString + ' = {}') : eval(evalString + (value ? ' = ' + value : ' = ""'));
                        }
                    }else if(arr[1] === 'toggle' && type !== 'get' && arr[1] !== 'write'){
                        eval(`delete(${evalString})`);
                    }else if(type === 'get' && key === action){
                        result = eval(evalString);
                    }else if(arr[1] === 'write'){
                        eval(evalString + (value ? ' = ' + value : ' = ""'));
                    }
                } else {
                    hasKey = false;
                }
            });
            _store.updateLS();
            return result;
        };
        _store.getItemIfExists = action => _store.updateData({type :'get' , action : action });
        _store.addDataToken = token => _store.data.token = token;
        _store.postData = () => {
            let act = _store.options.postAction;
            if(act && _store.data){
                act ? act.requestData ? act.requestData.data = JSON.stringify(_store.data) : void(0) : void(0);
                ajaxRequest(_store.options.postAction);
            }
        }
    }
    function Launcher() {
        return function (name, cb) {
            if (this.__e === undefined) this.__e = {};
            if (cb instanceof Function && name !== undefined) {
                if (!this.__e[name]) this.__e[name] = [];
                this.__e[name].push(cb.bind(this));
            } else if (name !== undefined && !(cb instanceof Function)) {
                if (this.__e[name]) {
                    this.__e[name].forEach(function (el) {
                        cb !== undefined ? el(cb) : el();
                    })
                }
            }
        };
    }
    function ajaxRequest(action,callback) {
        $.ajax(Object.assign({
            url : action.link,
            type : action.type,
            data : action.requestData
        },_this.ajaxSettings,action.ajaxCustomSetting || {})).done( data => {
            if(callback)callback(data);
            if(action.dataEventName) _this.on(action.dataEventName,action.data);
        });
    }
    function recursiveAjax(actions,dataHash,callBack){
        if(actions[0]){
            let action = actions.shift();
            if(!action.hashKey || (action.data !== null && !action.refreshable)){
                recursiveAjax(actions,dataHash,callBack);
                return false;
            } else {
                ajaxRequest(action,function (data) {
                    dataHash[action.hashKey].data = action.dataDecorator ? action.dataDecorator(data) : data;
                    recursiveAjax(actions,dataHash,callBack)
                });
            }
        }else{
            if(callBack)callBack(dataHash);
        }
    }
    function getAllData(dataHash,callBack) {
        let actions = _this.getArray(dataHash);
        recursiveAjax(actions,dataHash,callBack);
    }
    function parseAction(action){
        return  typeof(action) === 'string' ? _this.actions[action] : action;
    }
    function setOrGet(type,action,val){
        let act = parseAction(action);
        if(val === undefined) return act[type];
        act[type] = val;
    };
	
	//test for new branch
	//end of branch
	
    return this;
};
