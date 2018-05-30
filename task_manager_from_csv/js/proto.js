Array.prototype.indexOfobject = function (prop,val,regFlag) {
    var _this = this;
    for (var i = 0; i<_this.length; i++){
        if(_this[i] instanceof Object && _this[i].hasOwnProperty(prop) && (!regFlag ? this[i][prop] == val : (new RegExp(this[i][prop],'i')).test(val))){
            return i;
        }
    }
    return undefined;
}

Array.prototype.objectsFilter = function (filter) {
    if(!filter instanceof Object) return undefined;
    var _this = this,
        _result = [];

    _this.forEach(function (e) {
        if(e instanceof Object){
            var match = true
            for(k in filter){
                var _tempArr = [].concat(filter[k]);
                if(!e.hasOwnProperty(k) || _tempArr.indexOf(e[k]) === -1) {
                    match = false;
                    break;
                }
            }
            if(match) _result.push(e);
        }
    });
    return _result;
}

Array.prototype.del = function (val) {
    var tempArr = [];
    this.forEach(function (e) {
        if(e !== val) tempArr.push(e);
    });
    return tempArr;
}

Array.prototype.getPropertyArray = function (prop) {
    return this.map(function(e){
        return e[prop];
    })
}

String.prototype.parseBowDate = function(){
    arr = this.replace(/\//ig,'.').split('.');
    t = new Date(arr[2],arr[1]-1,arr[0]);
    return t.getTime()/1000;
};

String.prototype.ABBR = function () {
    return this.split(' ').map(function(e){return e.toUpperCase().slice(0,1)}).join('');
}

String.prototype.toUpFirst = function () {
    return this[0].toUpperCase() + this.slice(1);
}

$.fn.addEllipsis = function(selector,h){
    var $obj = $(this).find(selector);
    $obj.filter('.ellipsis').removeClass('ellipsis');
    $obj.each(function () {
        if(this.scrollHeight > h) $(this).addClass('ellipsis');
    });
}

$.fn.fadeHTML = function(html,cb){
    var _this = $(this);
    _this.stop().animate({opacity:0},200,function () {
        _this.html(html);
        _this.animate({opacity:1},200,function(){
           if(cb)cb();
        });
    });
    return _this;
}

$.scrollBarWidth = function(){
   $('body').append('<div id="__scrollBarWidth" style="position: fixed;left: -1000px;height: 100px;width: 100px;overflow: scroll;"><div style="height: 200px;width: 200px;"></div></div>');
   result = $('#__scrollBarWidth').width() - $('#__scrollBarWidth')[0].clientWidth;
   $('#__scrollBarWidth').remove();
   return result;
}

var Stack = function(arr){
    this.index = 0;
    this.data = arr;
    this.length = arr.length;
    this.end = false;
}

Stack.prototype.val = function () {
    return !this.end ? this.data[this.index] : undefined;
}

Stack.prototype.next = function () {
    var result = this.val();
    this.index += 1;
    if(this.index > this.length - 1) this.end = true;
    return result;
}
