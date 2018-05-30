var control = new Control(new NodeSpace());

Encode = function(st){
    var _this = {},
        $html = $('<div></div>'),
        $css = '',
        _tabs = '';
   _this.body = st;
   localStorage.setItem('str',st);
    parse(_this.body);
    $('#html').val($html.html());
    $('#css').val($css);
    $('#stage').html($html.html());
    $('#result_css').html($css);

    function parse(str,parentCls,parent){
        var sib = getSibs(str);
        if(parent) _tabs+='\t';
        while(sib[0]){
            var data = sib.shift(),
                i =  data.indexOf('['),
                objData = i !== -1 ? data.slice(0,data.indexOf('[')) : data,
                classDiv = objData.split('=')[0],
                cl = classDiv.split('/')[0],
                tag = classDiv.split('/')[1] ? classDiv.split('/')[1] : 'div',
                config = objData.split('=')[1],
                cssClass = parentCls ? '.' + parentCls + ' .' +cl : '.' + cl,
                childrenStr = getChilds(data);
            parent ? parent.append('\n'+_tabs + '<' + tag + ' class="' + cl + '">' + (!childrenStr?'\n' + _tabs :'')  +'</' + tag + '>'+ (!sib[0]?'\n':'') + _tabs.replace(/\t$/,'')) : $html.append('<' + tag + ' class="' + cl + '"></' + tag + '>\n');
            if(config)parseConfig(config,cssClass);
            var newParent = parent ? parent.children().last() : $html.children().last();
            if(childrenStr)parse(childrenStr,cl,newParent);
        }
        _tabs = _tabs.replace(/\t$/,'');
    }

    function getSibs(str){
        var arr = [],
            last_i = 0,
            flag = 0;
        for(i = 0; i < str.length;i++){
            if(str[i] === '[') flag++;
            if(str[i] === ']') flag--;
            if(str[i] === '+' && !flag){
                arr.push(str.slice(last_i,i));
                last_i = i + 1;
            }
        }
        arr.push(str.slice(last_i));
        return arr;
    }

    function getChilds(str){
        var i =  str.indexOf('[');
        return i !== -1 ? str.slice(i+1,-1) : undefined;
    }

    function parseConfig(config,cssClass){
        var confArr = config.split('@');
        if(cssClass)$css += cssClass + '{\n';
        confArr.forEach(function(el){
            if(el[0] !== '$'){
                el = el.split(':');
                $css += '\t'+ mainConfig(el[0],el[1]) + '\n';
            }else{
                parseConfig(templates[el.slice(1)].css);
            }
        });
        if(cssClass)$css += '}\n';
    }

    function mainConfig(k,v) {
        return v ? CssData[k].replace('###',v) : CssData[k];
    }
};


