//конструктор

BowStorage = function(url){
    this.bowFolderURL = url;
    this.readyEvent = document.createEvent('Event');
    this.readyEvent.initEvent('storage_ready_' + url,true,true,null);
    this.ajaxFolderURL = 'ajax/';
    this.teamURL = this.ajaxFolderURL + 'team.txt';
    this.tabClass = 'g-work';
    this.projects = [];
    this.adhocs = [];
    this.projectCssClasses = ['expired','deadline','before_deadline','fullup','now','tomorrow','not_soon'];
    this.previewFilter = {
        headers : [
            ['Number', /\#|ID/],
            ['Name', /project name/i],
            ['Description',/description/i],
            ['Product_Line',/product Line/i],
            ['Department',/department/i],
            ['Requestor', /requestor name/i],
            ['e?Marketing_Approver',/marketing managers/i],
            ['e?Channel',/channel/i],
            ['e?Number_of_templates',/total/i],
            ['Time', /hours/i],
            ['Prod', /can go live/i],
            ['Brief', /detailed brief/i],
            ['Maker', /maker/i],
            ['Checker', /checker/i]
        ],
        owner : 'Maker',
        brief : 'Brief',
        prod : 'Prod',
        num : 'Number'
    };
    this.specialReplacment = {
        Maker : function (val) {
            return '<div class="_maker" title="' + val + '">' + val.ABBR() + '</div>';
        },
        Checker : function (val) {
            return '<div class="_checker" title="' + val + '">' + val.ABBR() + '</div>';
        },
        Brief : function (val) {
            return '<div class="_brief" title="' + val + '">' + val.slice(0,-5) + '</div>';
        },
        Prod : function (val) {
            return '<div class="_brief" title="' + val + '">' + val.slice(0,-5) + '</div>';
        }
    };
    this.baseBlocks = ['Number','Name','Time'];
    this.
        loadTeamlist().
        copyLocalStorageInit()
    ;
};

//работа с юзером

BowStorage.prototype.SetCurrentUser = function(){
    var user = localStorage.getItem('loggedSOEID') ? localStorage.getItem('loggedSOEID') : prompt('Enter your SOEID:','');
    correct = user ? this.isCorrectSOEID(user.toUpperCase()) : false;
    if(!correct) this.SetCurrentUser();
    this.logged = correct;
    return this.showUser();
}

BowStorage.prototype.loadTeamlist = function(){
    var _this = this;
    $.ajax({
        url: _this.teamURL
    }).done(function(data) {
        _this.userList = JSON.parse(data);
        _this.userList = _this.userList.map(function(e){
            e.forBowCompare = e.surname + ' ' + e.name;
            e.projects = [];
            return e;
        });
        _this.SetCurrentUser().addProjects();
        // .createTeamList();
    });
    return this;
}

BowStorage.prototype.showUser = function(){
    $('#user').html(this.logged.forBowCompare + ' (' + this.logged.SOEID + ') <span>Logout</span>').addClass('logged');
    return this;
}

BowStorage.prototype.logout = function(){
    if(!this.logged) return false;
    localStorage.removeItem('loggedSOEID');
    location.reload();
}

BowStorage.prototype.isCorrectSOEID = function(SOEID){
    var correct = false;
    this.userList.forEach(function(e){
        if(correct)return;
        if(e.SOEID == SOEID) correct = e;
    });
    correct ? localStorage.setItem('loggedSOEID',SOEID) : localStorage.removeItem('loggedSOEID');
    return correct;
}

//добавление и обработка проектов
    //подключается Parsed.csv
BowStorage.prototype.addProjects = function (url) {
    var _this = this,
        _bow = new ParsedCSV(url ? url : _this.bowFolderURL);
    document.addEventListener(_bow.readyEvent.type,function () {
        _this.projects = _bow.projects;
        _this.adhocs = _bow.adhocs;
        _this.applyHeadersFilter();
        document.dispatchEvent(_this.readyEvent)
    });
    return _this;
}

BowStorage.prototype.applyHeadersFilter = function () {
    var _this = this,
        _filter = _this.previewFilter;
    _this.filtredProjects = _this.projects.map(function (e) {
        var _project = {
                data:{},
                owner:{},
                projectType : Object.keys(e).length < 30 ? 'E-mail' : 'Web'
            },
            _headers = new Stack(_filter.headers),
            _keys = new Stack(Object.keys(e));

        while (!_keys.end && !_headers.end){
            if(_headers.val()[1].test(_keys.val())){
                _project.data[_headers.next()[0].replace(/^\w\?/,'')] = e[_keys.next()];
            }else{
                (/^w\?/.test(_headers.val()[0]) && _project.projectType === 'E-mail')||(/^e\?/.test(_headers.val()[0]) && _project.projectType === 'Web') ? _headers.next() : _keys.next();
            }
        }

        var userIndex = _this.userList.indexOfobject('surname',_project.data[_filter.owner],true);
        if(userIndex !== undefined){
            _project.owner = _this.userList[userIndex];
            _this.userList[userIndex].projects.push(_project.data);
        }else{
            _project.owner = undefined;
        }
        _project.num = _project.data[_filter.num];
        _project.brief = _project.data[_filter.brief] ? _project.data[_filter.brief].parseBowDate() : 0 ;
        _project.prod = _project.data[_filter.brief] ? _project.data[_filter.prod].parseBowDate() : 0;
        _project.classCSS = _this.setProjectClass(_project);
        return _project;
    });
    return _this;
}

BowStorage.prototype.setProjectClass = function (project) {
    if(!project.brief || !project.prod) return 'no_time';
    sd = Math.ceil((project.brief - $.now()/1000)/(3600*24));
    fd = Math.ceil((project.prod - $.now()/1000)/(3600*24));
    if(fd < 0) return 'expired';
    if(fd === 0) return 'deadline';
    if(fd === 1) return 'before_deadline';
    if(sd === 0) return 'fullup';
    // if(sd === -1) return 'reminder';
    if(sd < 0 && fd>0) return 'now';
    if(sd === 1) return 'tomorrow';
    // if(sd <= 3) return 'not_so_far';
    return 'not_soon';
}

BowStorage.prototype.getProjectsHTML = function (filter,blocks,sort,sortBackward) {
    var _this = this,
        _replace = _this.specialReplacment,
        _blocks = [].concat(blocks ? blocks : _this.baseBlocks),
        _ul = '<ul class="project_wrapper">';
    _pl = filter ? _this.filtredProjects.objectsFilter(filter) : _this.filtredProjects;
    _pl.sort(function (a,b) {
        return (a[sort]<b[sort]) ?  -1 : 1;
    });
    if(sortBackward)_pl.reverse();
    _pl.getPropertyArray('data').forEach(function (e,i) {
        var _li = '<li projectID="' + _pl[i].projectType + '&' +  _pl[i].num +'&'+ _pl[i].brief + '" class="project_list ' + _pl[i].classCSS +'" ><div class="type">' + _pl[i].projectType.slice(0,1) + '</div>';
        for(k in e){
            if(_blocks.indexOf(k) === -1) continue;
            if(_replace.hasOwnProperty(k)){
                _li += _replace[k](e[k]);
                continue;
            }
            var _div = '<div class="_' + k.toLowerCase() + '">';
            _div += e[k];
            _li += _div + '</div>';
        }
        _ul += _li + '</li>';
    });
    return _ul + '</ul>';
}

//пона не используется

BowStorage.prototype.copyLocalStorageInit = function(){
    $('head').append('<style>#copy_storage_ta{position:fixed;top:-100%;left:-100%;}#copy_storage_ta:focus{top:0;left:0;}</style>')
    $('body').append('<form><textarea id="copy_storage_ta" name="asas"></textarea></form>');
    $('#copy_storage_button').click(function(){
        $('#copy_storage_ta').val(JSON.stringify(localStorage)).focus();
    });
    return this;
}

BowStorage.prototype.accordionInit = function(){
    var btn = $('.' + this.tabClass);

    btn.click(function() {
        _this = $(this);
        div = _this.next();
        if(_this.hasClass('op')){
            div.stop().slideUp();
            _this.removeClass('op');
            return false;
        }
        $('.op').next().stop().slideUp().removeClass('op');
        div.stop().slideDown();
        _this.addClass('op');
    });
    btn.eq(0).click();
    return this;
}
