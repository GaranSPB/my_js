//конструктор
    //передаем объект с данными bowStorage(Модель)
WorkSpace = function(bowStorage){
    this.bs = bowStorage;
    this.bowWrapper = $('._wrapper.bow');
    this.infoWrapper = $('._wrapper.info');
    this.currentBowTab = '';
    this.currentInfoTab = '';

    this.myBowContainer = $('.my_bow_content');
    this.myBowFilter = {owner : this.bs.logged ,  classCSS : this.bs.projectCssClasses };//, classCSS : ['before_deadline','deadline']
    this.myBowBlocks = null;
    this.myBowSort = 'brief';
    this.myBowReverse = false;

    this.fullBowContainer = $('.bow_content');
    this.fullBowFilter = {classCSS : this.bs.projectCssClasses};
    this.fullBowBlocks = ['Number','Name','Time'];
    this.fullBowSort = 'brief';
    this.fullBowReverse = false;

    this.bowControllers = $('.bow ._control').children();

    this.infoContainer =  $('.project_info_content');
    this.hiddenContainer =  $('.hidden_content');
    this.followUpContainer =  $('.followUp');
    this.controlInfoContainer = $('.info_control_wrapper');
    this.hiddenContainerFlag = false;
    this.currentProject = null;
    this.currentStatus = null;
    this.statusCSS = {
        4 : '_progress',
        1 : '_waiting',
        2 : '_cancelled',
        3 : '_finished'
    };
    this.projectsData = null;

    this.currentStorageVersion = '2';
    this.mounthArray = ['January','February','March',"April","May","June","July","August","September","October","November","December"];

    this.logoutButton = $('#user span');
    this.
        tabsInit().
        logOutInit().
        onResizeInit().
        controllersInit().
        lookInfoInit().
        storageInit().
        initStatusSelect().
        createMyBowList().
        createFullBowList();
}

//представление

WorkSpace.prototype.createMyBowList = function () {
    var _this = this,_bs = _this.bs;
    _this.myBowContainer.fadeHTML(_bs.getProjectsHTML(_this.myBowFilter,_this.myBowBlocks,_this.myBowSort,_this.myBowReverse),function () {
        _this.myBowContainer.addEllipsis('._name',40);
        _this.addCssStatusToBOW(_this.myBowContainer);
    });
    return _this;
}

WorkSpace.prototype.createFullBowList = function () {
    var _this = this,_bs = _this.bs;
    _this.fullBowContainer.fadeHTML(_bs.getProjectsHTML(_this.fullBowFilter,_this.fullBowBlocks,_this.fullBowSort,_this.fullBowReverse),function () {
        _this.fullBowContainer.addEllipsis('._name',40);
        _this.addCssStatusToBOW(_this.fullBowContainer);
    });
    return _this;
}

WorkSpace.prototype.updateHiddenContent = function (type) {
    var _this = this,
        _html = '';

    switch (type){
        case 'sort':
            _html += '<div class="sort_wrapper">';
            _html += '  <h3>Sort setting</h3>';
            _html += '  <input id="brief" type="radio" name="sort"><label for="brief">Brief date</label>';
            _html += '  <input id="prod" type="radio" name="sort"><label for="prod">Production date</label>'
            _html += '  <input id="projectType" type="radio" name="sort"><label for="projectType">Project type</label>';
            _html += '  <h3>Date type filter</h3>';
            _html += '  <div class="filter_wrapper">';
            _html += '      <input id="expired" type="checkbox" name="date_filter"><label for="expired">Expired</label>';
            _html += '      <input id="not_soon" type="checkbox" name="date_filter"><label for="not_soon">Not soon</label>';
            _html += '  </div>';
            _html += '</div>';
            break
    }
    _this.hiddenContainer.html(_html);
    $('#'+_this[_this.currentBowTab+'Sort']).prop('checked',true);
    if(_this[_this.currentBowTab+'Filter'].classCSS) _this[_this.currentBowTab+'Filter'].classCSS.forEach(function (e) {
        $('#' + e).prop('checked',true);
    });
    return _this;
}

WorkSpace.prototype.showHiddenContent = function () {
    var _this = this;
    _this.infoWrapper.children('._content').animate({opacity:0},200,function () {
        _this.infoWrapper.find('.ig_blocks.active').removeClass('active');
        _this.hiddenContainer.addClass('active');
        $(this).animate({opacity:1},200);
    });
    return _this.setHiddenContentFlag(true);
}

WorkSpace.prototype.createProjectInfo = function (project) {
    var _this = this,
        _data = project.data,
        _div = '<div class="project_info_wrapper">',
        _add = {
            Number : project.projectType === 'Web' ? '<div class="_add">Web Amendment</div>' : '<div class="_add">E-mail Distribution</div>'
        };
    for (k in _data){
        if(!_data[k]) continue;
        var __div = '<div class="info_block _' + k + '">',
            _title = '<div class="_title">' + k.replace(/_/gi,' ') + ':</div>',
            _content = '<div class="_content">' + _data[k] + '</div>';
        __div+= _title + _content + (_add.hasOwnProperty(k) ? _add[k] : '') + '</div>';
        _div += __div;
    }
    _div +='</div>';
    _this.infoContainer.fadeHTML(_div);
    _this.updateFollowUpContent(project).followUpInit();
    project.owner === _this.bs.logged ? _this.updateInfoControl('status') : _this.controlInfoContainer.fadeHTML('');
    return _this;
}

WorkSpace.prototype.updateInfoControl = function (type) {
    var _this = this,
        _html = '';
   _this.currentStatus = _this.projectsData[_this.currentProject] ? _this.projectsData[_this.currentProject].status : 0;
    switch (type){
        case 'status':
            _html += '<div class="status_wrapper">';
            _html += '  <label for="project_status">Status</label>';
            _html += '  <select id="project_status">';
            _html += '      <option value="0"> --- </option>';
            _html += '      <option value="4">In progress</option>';
            _html += '      <option value="1">Waiting</option>';
            _html += '      <option value="2">Cancelled</option>';
            _html += '      <option value="3">Finished</option>';
            _html += '  </select>';
            _html += '</div>';
            break
    }
    var $html = $(_html);
    $html.find('#project_status').val(_this.currentStatus);
    _this.controlInfoContainer.html($html);
    return _this;
}

WorkSpace.prototype.storageInit = function () {
    var _this = this;
    if(!localStorage.getItem('bowOptions')||localStorage.getItem('currentStorageVersion') !== _this.currentStorageVersion){
        localStorage.setItem('bowOptions',JSON.stringify({
            myBowFilter : {
                classCSS : _this.bs.projectCssClasses
            },
            fullBowFilter : {
                classCSS : _this.bs.projectCssClasses
            },
            myBowSort : _this.myBowSort,
            fullBowSort : _this.fullBowSort
        }));
        localStorage.setItem('currentStorageVersion',_this.currentStorageVersion);
    }
    var customOptions = JSON.parse(localStorage.getItem('bowOptions'));
    _this.myBowFilter.classCSS = customOptions.myBowFilter.classCSS;
    _this.fullBowFilter.classCSS = customOptions.fullBowFilter.classCSS;
    _this.myBowSort = customOptions.myBowSort;
    _this.fullBowSort = customOptions.fullBowSort;
    customOptions.projectsData === undefined ? _this.updateStorage('projectsData',null,{}).projectsData = {} : _this.projectsData = customOptions.projectsData; ;
    return _this;
}

WorkSpace.prototype.updateFollowUpContent = function (project) {
    var _this = this,
        content = '',
        date = new Date(project.brief * 1000) ,
        mon = _this.mounthArray[date.getMonth()],
        day = date.getDate(),
        suf = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
        row = project.data;

    content+='<p>Dear colleagues,</p><p>&nbsp;</p>';
    content+='<p>According to BOW you have to provide brief on ' + mon + ' ' + day + suf + '.<b>If we don’t start the projects in time, it will impact all other projects schedule and we don’t guarantee delivery dates.</b></p><p>&nbsp;</p>';
    content+='<p>If you still didn’t send it, please provide it today as soon as possible to *GT RU Web team.<br>If you have already provided, than kindly ask you to re-forward to *GT RU Web team to assure we have the latest version.</p><p>&nbsp;</p>';
    content+='<p> The list of projects:</p><p>&nbsp;</p>';
    content+='<table class="outlook">';
    content+='  <tr>';
    content+='      <th class="blue">#</th>';
    content+='      <th class="blue">Project name</th>';
    content+='      <th class="blue">Project description (please try detailed one)</th>';
    content+='      <th class="blue">Product Line</th>';
    content+='      <th class="blue">Requested Department</th>';
    content+='      <th class="blue">Requestor name (project owner)</th>';
    if(project.projectType === 'E-mail'){
        content+='      <th class="blue">Approvers(Marketing managers + project owner)</th>';
        content+='      <th class="blue">Channel (Subscribe \'S\' or KANA \'K\')</th>';
    }
    content+='      <th class="yellow">EFFORT HOURS</th>';
    content+='      <th class="green">The Date when the project can go live</th>';
    content+='      <th class="green">The date when full detailed brief with all details have to be provided</th>';
    content+='      <th class="green">Assigned Project manager from Web team as maker</th>';
    content+='      <th class="green">Assigned Project manager from Web team as checker</th>';
    content+='  </tr>';
    content+='  <tr>';
    content+='      <td>' + row['Number'] + '</td>';
    content+='      <td>' + row['Name'] + '</td>';
    content+='      <td>' + row['Description'] + '</td>';
    content+='      <td>' + row['Product_Line'] + '</td>';
    content+='      <td>' + row['Department'] + '</td>';
    content+='      <td>' + row ['Requestor']+ '</td>';
    if(project.projectType === 'E-mail'){
        content+='      <td>' + row['Marketing_Approver'] + '</td>';
        content+='      <td>' + row['Channel'] + '</td>';
    }
    content+='      <td>' + row['Time'] + '</td>';
    content+='      <td>' + row['Prod'] + '</td>';
    content+='      <td>' + row['Brief'] + '</td>';
    content+='      <td>' + row['Maker'] + '</td>';
    content+='      <td>' + row['Checker'] + '</td>';
    content+='  </tr>';
    content+='</table>';
    _this.followUpContainer.html(content);
    return _this;
}

//контроллер

WorkSpace.prototype.tabsInit = function () {
    var _this = this;
    $('._wrapper.bow').tabs(0,function(){
        _this.bowWrapper.addEllipsis('._name',40);
        _this.currentBowTab = _this.bowWrapper.attr('current-tab');
        _this.updateHiddenContent('sort');
    });
    $('._wrapper.info').tabs(0,function(){
        _this.currentInfoTab = _this.infoWrapper.attr('current-tab');
        _this.clearProcessing();
    });
    this.currentBowTab = this.bowWrapper.attr('current-tab');
    this.currentInfoTab = this.infoWrapper.attr('current-tab');
    return _this;
}

WorkSpace.prototype.logOutInit = function () {
    var _this = this;
    _this.logoutButton.click(function(){
        _this.bs.logout();
    });
    return _this;
}

WorkSpace.prototype.onResizeInit = function(){
    var _this = this;
    $(window).resize(function(){
        _this.myBowContainer.addEllipsis('._name',40);
        _this.fullBowContainer.addEllipsis('._name',40);
    });
    return _this;
}

WorkSpace.prototype.controllersInit = function () {
    var _this = this,
        controllerEngine = {
            reverse : function () {
                var _tab =_this.currentBowTab,
                    reverseName = _tab + 'Reverse',
                    actionName = 'create' + _tab.toUpFirst() + 'List',
                    prodID = $('.review').attr('projectID');
                _this[reverseName] = !_this[reverseName];
                _this[actionName]();
                setTimeout(function () {
                    if(prodID) $('[projectID="'+prodID+'"]').addClass('review');
                },300);
            },
            sort : function () {
                var
                    $this = this;
                $this.is('.all_processing') ? _this.updateHiddenContent('sort').showHiddenContent() : _this.revertToCurrentTab();
            }
        };
    _this.bowControllers.click(function () {
        var $this = $(this),
            _tab =_this.currentBowTab,
            ctrl = $this.attr('controller');
        $this.toggleClass(($this.is('[controller="sort"],[controller="filer"]') ? 'all' : _tab) + '_processing');
        if(controllerEngine.hasOwnProperty(ctrl)) controllerEngine[ctrl].apply($this);
    });
    $(document).on('change','[name="sort"]',function () {
        var _tab =_this.currentBowTab,
            actionName = 'create' + _tab.toUpFirst() + 'List';
        _this.updateStorage(_tab + 'Sort',null,this.id);
        _this[_tab + 'Sort'] = this.id;
        _this[actionName]();
    });
    $(document).on('change','[name="date_filter"]',function () {
        var _tab =_this.currentBowTab,
            actionName = 'create' + _tab.toUpFirst() + 'List',
            currentCss = _this[_tab + 'Filter'].classCSS,
            filter = this.id;
        if(currentCss.indexOf(filter) === -1){
            currentCss.push(filter)
        }else{
            currentCss = currentCss.del(filter);
        }
        _this.updateStorage(_tab + 'Filter','classCSS',currentCss);
        _this[_tab + 'Filter'].classCSS = currentCss;
        _this[actionName]();
    });
    return _this;
}

WorkSpace.prototype.updateStorage = function (tab,key,data) {
    var customOptions = JSON.parse(localStorage.getItem('bowOptions'));
    key === null ? customOptions[tab] = data : customOptions[tab][key] = data;
    localStorage.setItem('bowOptions',JSON.stringify(customOptions));
    return this;
}

WorkSpace.prototype.lookInfoInit = function () {
    var _this = this;
    $(document).on('click','.project_list',function () {
        var $this = $(this),
            prodID = $this.attr('projectID'),
            num = prodID.split('&')[1],
            type = prodID.split('&')[0];
        if(_this.currentProject === prodID) return _this;
        $('.review').removeClass('review');
        $('[projectID="'+prodID+'"]').addClass('review');
        _this.currentProject = prodID;
        project = _this.bs.filtredProjects.objectsFilter({num : num , projectType : type}).pop();
        _this.createProjectInfo(project);
        _this.currentInfoTab === "info" ? _this.hiddenContainerFlag ?_this.revertToCurrentTab() : null : _this.infoWrapper.find('.tabs [tab="info"]').click();
    });
    return _this;
}

WorkSpace.prototype.revertToCurrentTab = function () {
    var _this = this;
    _this.infoWrapper.children('._content').animate({opacity:0},200,function () {
        _this.infoWrapper.find('.ig_blocks.active').removeClass('active');
        _this.infoWrapper.find('.ig_blocks[tab = "' + _this.currentInfoTab + '"]').addClass('active');
        $(this).animate({opacity:1},200);
    });
    return _this.clearProcessing();
}

WorkSpace.prototype.clearProcessing = function () {
    $('.all_processing').removeClass();
    return this.setHiddenContentFlag(false);
}

WorkSpace.prototype.setHiddenContentFlag = function(bool) {
    this.hiddenContainerFlag = bool;
    return this;
}

WorkSpace.prototype.followUpInit = function () {
    var _this = this;
    this.infoWrapper.on('click','._Brief',function (e) {
        if(!_this.followUpContainer.hasClass('show')){
            _this.followUpContainer.addClass('show');
            e.stopPropagation();
        }
    });
    $(document).click(function (e) {
        if(!$(e.target).parent().is('.project_list') && !$(e.target).closest('.followUp')[0])_this.followUpContainer.removeClass('show');
    });
    return _this;
}

WorkSpace.prototype.initStatusSelect = function () {
    var _this = this;
    _this.controlInfoContainer.on('change','#project_status',function () {
        var _data = _this.projectsData,
            _proj = _this.currentProject;
        if(!_data[_proj]) _data[_proj] = {};
        _data[_proj]['status'] = $(this).val();
        _this.updateStorage('projectsData',_proj,_data[_proj]);
        _this.changeProStatus($('[projectID="'+_proj+'"]'),_this.statusCSS[$(this).val()]);
    });
    return _this;
}

WorkSpace.prototype.addCssStatusToBOW = function($obj){
    var _this = this;
    if($obj === undefined) $obj = _this.bowWrapper;
    for(project in _this.projectsData){
        _this.changeProStatus($obj.find('[projectID="'+project+'"]'),_this.statusCSS[_this.projectsData[project].status]);
    }
    return _this;
}

WorkSpace.prototype.changeProStatus = function ($obj,stat) {
    var _this = this;
    if(stat){
        $obj.attr('status',stat);
    }else{
        $obj.attr('status','');
    }
    return _this;
}

