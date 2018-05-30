Control = function (NodeSpace) {
    this.nodes = NodeSpace;
    this.
        initControls().
        initContext().
        initActions().
        initPickers()
    ;
};

Control.prototype.initControls = function () {
    var _this = this;
    _this.context = {
        id : undefined,
        css : {}
    };
    _this.wrapper = $('#control');
    _this.display = $('#display');
    _this.setup = $('#setup');
    _this.inputs = $('[control-data]');
    _this.modulePicker = $('#mod');
    if(localStorage.getItem('current')){
        $.extend(_this.nodes,JSON.parse(localStorage.getItem('current')));
        _this.nodes.parseHTML();
        _this.getLS().draw();
    }
    return _this;
};

Control.prototype.initContext = function () {
    var _this = this;
    _this.display.click(function(e){
        if(!$(e.target).is('._node')){
            _this.display.find('.active').removeClass('active');
            _this.context.id = undefined;
            _this.context.css = {};
        }
    });
    _this.display.on('click','._node',function(){
        var $this = $(this),
            id = $this.attr('nodeId');
        _this.display.find('.active').removeClass('active');
        $this.addClass('active');
        _this.context.id = id;
        _this.setInputs(id).setLS();
    });
    return _this;
};

Control.prototype.initActions = function () {
    var _this = this,
        nl = _this.nodes.nodesList,
        actions = {
        after : function () {
            _this.addNode('after').draw();
        },
        append : function () {
            if(_this.context.id){
                _this.addNode('append').draw();
            }
        },
        del : function () {
            if(_this.context.id){
                _this.nodes.deleteNode(_this.context.id);
                _this.draw();
                _this.context.id = undefined;
                _this.context.css = {};
            }
        },
        upd : function () {
            if(_this.context.id){
                $.extend(nl[_this.context.id],_this.getInputs());
                _this.nodes.parseHTML();
                _this.draw();
            }
        },
        reset : function () {
            if(confirm('Are you sure?')){
                _this.clear();
                localStorage.removeItem('current');
                location.reload();
            }
        },
        load : function () {
            var mod = _this.modulePicker.val();
            if(mod){
                _this.clear();
                $.extend(_this.nodes,JSON.parse(modules[mod].json));
                nl = _this.nodes.nodesList;
                _this.nodes.parseHTML();
                _this.draw();
            }
        },
        clear : function (){
            _this.clear();
        }
    };
    _this.setup.on('click change','[action]',function (e) {
        var action = $(this).attr('action'),
            value = $(this).val();
        if(action && actions[action])actions[action](e,value);
    });
    return _this;
};

Control.prototype.getInputs = function () {
    var _this = this,
        result = {};
    _this.inputs.each(function () {
        var $this = $(this);
        result[$this.attr('control-data')] = $this.val() ? $this.val() : '';
    });
    return result;
};

Control.prototype.setInputs = function (id) {
    var _this = this,
        node = id ? _this.getById(id) : {};
    _this.inputs.each(function () {
        var $this = $(this),
            field = $this.attr('control-data');
        node[field] ? $this.val(node[field]) : $this.val('');
    });
    return _this;
};

Control.prototype.addNode = function(type){
    var _this = this;
    console.log(_this.getInputs());
    _this.nodes.addNode(_this.getInputs(),type,_this.context.id);
    return _this;
};

Control.prototype.initPickers = function () {
    var _this = this,
        _mod  = '<option value="">---</option>';
    for(key in modules){
        _mod+='<option value="' + key+ '">'+modules[key].name+'</option>'
    }
    _this.modulePicker.html(_mod);
    return _this;
};

Control.prototype.getById = function (id) {
    return this.nodes.nodesList[id];
};

Control.prototype.addToDisplay = function (id) {
    var _this = this,
        el = id ? _this.nodes.nodesList[id] : _this.nodes.getLast(),
        _html = '<div class="_node ' + (id && id == _this.context.id ? 'active' : '') + '" style="margin-left:'+40*el._lvl+'px;" nodeId="' + el._id + '" >'+el._tag+'&nbsp;</div>';
    _this.display.append(_html);
    return _this;
};

Control.prototype.removeFromDisplay = function (id) {
    var _this = this,
        el = _this.getById(id),
        next = _this.getById(el._next),
        $el  = _this.display.find('[nodeId="'+id+'"]');
    $el.remove();
    if(next && next._lvl > el._lvl) _this.removeFromDisplay(next._id);
    return _this;
};

Control.prototype.clear = function () {
    var _this = this;
    _this.nodes = new NodeSpace();
    _this.display.html('');
    _this.context.id = undefined;
    _this.context.css = {};
    return _this;
};

Control.prototype.draw = function () {
    var _this = this,
        nl = _this.nodes.nodesList,
        root = _this.nodes.rootId,
        next = nl[root];
    _this.display.html('');
    while(next){
        _this.addToDisplay(next._id);
        next = nl[next._next];
    }
    return _this.setLS();
};

Control.prototype.setLS = function () {
    var _this = this,
        ns = _this.nodes;
    _this.inputs.each(function () {
        var $this = $(this),
            field = $this.attr('control-data'),
            val = $this.val();
        localStorage.setItem(field,val);
    });
    var json = JSON.stringify(ns);
    localStorage.setItem('current', json);
    localStorage.setItem('context', _this.context.id || '');
    return _this;
};

Control.prototype.getLS = function () {
    var _this = this;
    _this.inputs.each(function () {
        var $this = $(this),
            field = $this.attr('control-data');
        $this.val(localStorage.getItem(field));
    });
    _this.context.id = localStorage.getItem('context');
    return _this;
};











