ParsedCSV = function(url){
    this.url = [].concat(url);
    this.readyEvent = document.createEvent('Event');
    this.readyEvent.initEvent('load_' + this.url[0],true,true,null);
    this.csvRows = [];
    this.projects = [];
    this.adhocs = [];
    this.getCSV();
}

ParsedCSV.prototype.getCSV = function(){
    var _this = this;

    $.ajax({
        url: _this.url.pop()
    }).done(function(data) {
        _this.csvRows = data.split(/\;\r\n/);
        _this.getHeaders().parseRows();
        if(_this.url[0]){
            _this.getCSV();
        }else{
            document.dispatchEvent(_this.readyEvent);
        }
    });
    return this;
}

ParsedCSV.prototype.getHeaders = function(){
    this.unparsedHeaders = this.csvRows[0];
    this.headersArray = this.unparsedHeaders.split(';');
    return this;
}

ParsedCSV.prototype.parseRows = function(){
    var _this = this,
        rows = this.csvRows,
        _projects = [],
        _adhocs = [];

    rows.forEach(function(e){
        (/^\d*\(\d\)/.test(e)) ? _projects.push(e) : /^;*$/.test(e) ? null : _adhocs.push(e) ;
    });
    _this.projects = _this.projects.concat(_projects.map(function (e) {
        return _this.convertRowToObject(e);
    }));
    _this.adhocs = _this.adhocs.concat(_adhocs.map(function (e) {
        return _this.convertRowToObject(e);
    }));
    return this;
}

ParsedCSV.prototype.convertRowToObject = function (row) {
    var _this = this,
        _row = row.split(';'),
        result = {};
    _this.headersArray.forEach(function (e,i) {
        result[e] = _row[i];
    });
    return result;
}
