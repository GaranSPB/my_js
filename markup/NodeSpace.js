NodeSpace = function(){
    this.lastId = 0;
    this.enderId = undefined;
    this.rootId = undefined;
    this.nodesList = {};
};

NodeSpace.prototype.addNode = function (node,mode,id) {
    var _this = this,
        nl = _this.nodesList,
        newId = _this.lastId + 1,
        lvl = id ? nl[id]._lvl : 0,
        action = {
            after :  function () {
                node._prev = id ? id : _this.lastId ? _this.lastId : undefined;
            },
            append :  function () {
                node._prev = id ;
                lvl++;
            }
        };
    action[mode]();
    _this.lastId++;
    var prev = nl[node._prev],
        next = prev ? nl[prev._next] : undefined;
    node._id = newId;
    node._lvl = lvl;
    nl[newId] = node;
    if(prev){
        prev._next = node._id;
        if(next){
            next._prev = node._id;
            node._next = next._id;
            while(next && node._lvl < next._lvl){
               _this.swapForward(newId);
               next = nl[node._next];
            }
        }
    }else{
        _this.rootId = newId;
    }
    console.log(node);
    console.log(this);
    return _this.parseHTML();
};

NodeSpace.prototype.swapForward = function (id) {
    var _this = this,
        nl = _this.nodesList,
        node = nl[id],
        next = nl[node._next],
        prev = nl[node._prev];
    node._prev = next._id;
    node._next = next._next;
    prev._next = next._id;
    next._prev = prev._id;
    next._next = node._id;
    console.log('swpa:' + id  + ' and ' + next._id);
    return _this;
}

NodeSpace.prototype.deleteNode = function (id) {
    var _this = this,
        nl = _this.nodesList,
        node = nl[id],
        prev = nl[node._prev],
        next = nl[node._next];
    prev ? next ? prev._next = next._id : delete(prev._next) : _this.rootId = node._next;
    next ? prev ? next._prev = prev._id : delete(next._prev) : void(0);
    delete(nl[id]);
    return _this.parseHTML();
}

NodeSpace.prototype.getLast = function () {
    return this.nodesList[this.lastId];
}

NodeSpace.prototype.parseHTML = function () {
    var _this = this,
        nl = _this.nodesList,
        $html = $('<div></div>'),
        currentMod = $('#mod').val(),
        $css = (currentMod) ? '/* ===== MARKUP MODULE : ' + currentMod + ' | NAME : ' + modules[currentMod].name + ' ===== */\n' :  '',
        root = _this.rootId,
        next = root,
        lastLvlNodesSibling = [],
        parsingCssList = {
            _css : '',
            _act : '.active',
            _hov : ':hover',
            _bef : '::before',
            _aft : '::after'
        };

    while (next){
        var node = nl[next],
            prev = nl[node._prev],
            nodeHtml = _this.getNodeHTML(node),
            $last = {},
            _class = node._class.split(' ')[0];
        if(prev){
            var $prev = lastLvlNodesSibling[prev._lvl];
            if(node._lvl ===  prev._lvl){
                $prev.after(nodeHtml);
                $last = $prev.next();
            }else if(node._lvl > prev._lvl){
                $prev.append(nodeHtml);
                $last = $prev.children().last();
            }else{
                $prev = lastLvlNodesSibling[node._lvl];
                $prev.after(nodeHtml);
                $last = $prev.next();
            }
        }else{
            $html.append(nodeHtml);
            $last = $html.children().last();
        }
        lastLvlNodesSibling[node._lvl] ? lastLvlNodesSibling[node._lvl] = $last : lastLvlNodesSibling.push($last);
        for(key in parsingCssList){
            if(node[key])parseConfig(node[key],_class + parsingCssList[key]);
        }
        next = node._next;
    }
    $css += (currentMod) ? '/* ===== end ===== */\n' :  '';

    function parseConfig(config,cssClass,flag){
        var confArr = config.split('@');
        if(!flag && (node._preclass || cssClass))$css += (node._preclass ? node._preclass : '') + (cssClass ? '.' + cssClass : node._tag) + '{\n';
        confArr.forEach(function(el){
            if(el[0] !== '$'){
                el = el.split(':');
                $css += '\t'+ mainConfig(el[0],el[1]) + '\n';
            }else{
                el = el.split(':');
                parseConfig(templates[el[0].slice(1)].css.replace('###',el[1]),'',true);
            }
        });
        if(!flag && (node._preclass || cssClass))$css += '}\n';
    }

    function mainConfig(k,v) {
        return v ? CssData[k].replace('###',v) : CssData[k];
    }
    var json = JSON.stringify(_this);
    $('#html').val($html.html());
    $('#stage').html($html.html());
    $('#css').val($css);
    $('#result_css').html($css);
    $('#str').val(json);
    return _this;
};

NodeSpace.prototype.getNodeHTML = function(node){
    var _html = '<';
    _html += node._tag;
    if(node._attr)node._attr.split(':').forEach(function (el) {
        var a = {
            name : el.split('=')[0],
            str : el.split('=')[1]
        }
        _html += a.name ? ' ' + a.name + '="'+ a.str+ '"' : '' ;
    });
    _html += node._class ? ' class="'+ node._class+ '">' : '>';
    _html += node._txt ? node._txt : '';
    _html += '</' + node._tag + '>';
    return _html;
}


String.prototype.insertAfter = function (x,s,d) {
    var delta = d === undefined ? 0 : d;
    return this.slice(0,x) + s + this.slice(x+delta);
}


