var CssData = {
    w : 'width: ###px;', //width: px;
    wp : 'width: ###%;', //width: %;
    w1 : 'width: 100%;', //width: 100%;
    xw : 'max-width: ###px;', //
	mw : 'min-width: ###px;', //
    h : 'height: ###px;', //height: px;
    hp : 'height: ###%;', //height: %;
    h1 : 'height: 100%;', //height: 100%;
    mh : 'min-height: ###px;', //min-height px
    bgc : 'background-color: ###;', //background-color: value
    m : 'margin: ###;', //margin
    m_t : 'margin-top: ###;',
    m_b : 'margin-bottom: ###;',
    m_l : 'margin-left: ###;',
    p : 'padding: ###;', //padding
    p_t : 'padding-top: ###;',
    p_l : 'padding-left: ###;',
    p_b : 'padding-bottom: ###;',
    ta : 'text-align: ###;',
    tac : 'text-align: center;',
    tal : 'text-align: left;',
    bgi : 'background-image: url(###);',
    bgi_l : 'background-image: url(/russia/js/markup/img/light.jpg);',
    bgi_d : 'background-image: url(/russia/js/markup/img/dark.jpg);',
    bgi_m : 'background-image: url(/russia/js/markup/img/mid.jpg);',
    bgi_t : 'background-image: url(/russia/js/markup/img/test.png);',
    bgi_i : 'background-image: url(/russia/js/markup/img/ico.png);',
    bgpc : 'background-position: center center;',
    bgr : 'background-repeat: no-repeat;',
    bgs_c : 'background-size: cover;',
    bgs_cn : 'background-size: contain;',
    bgp_x : 'background-position-x: ###;',
    bgp_y : 'background-position-y: ###;',
    df : 'display:flex;',
    dif : 'display:inline-flex;',
    f : 'flex:###;',
    fdc : 'flex-direction: column;',
    jcc : 'justify-content: center;',
    jce : 'justify-content: flex-end;',
    jcs : 'justify-content: flex-start;',
    jc : 'justify-content: ###;',
    fg : 'flex-grow : ###;',
    fw:'flex-wrap : wrap;',
    asc:'align-self : center;',
    b : 'border:solid 1px ###;',
    b_n : 'border:none;',
    b_l:'border-left:solid 1px ###;',
    b_b:'border-bottom:solid 1px ###;',
    b_bc:'border-bottom-color: ###;',
    b_bw:'border-bottom-width: ###px;',
    br:'border-radius: ###;',
    fs : 'font-size : ###;',
    ff_il : 'font-family: InterstateCyrLight;',
    fwn : 'font-weight: normal;',
    fwb : 'font-weight: bold;',
    c : 'color : ###;',
    lh : 'line-height: ###;',
    dn : 'display:none;',
    db : 'display:block;',
    ls_n :'list-style: none;',
    pr : 'position: relative;',
    pa : 'position: absolute;',
    t_ : 'top: ###;',
    b_ : 'bottom: ###;',
    l_ : 'left: ###;',
    r_ : 'right: ###;',
    trn : 'transition: ###s;',
    b_sh : 'box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);',
    zi : 'z-index:###;',
    cont :'content:"###";',
    cp:'cursor:pointer;',
    cd:'cursor:default;',
    rot : 'transform : rotate(###deg);'
};

var templates = {
    lbg : {
        css : 'w1@mh:400@ta:center@p:20px@bgc:#ccc',
        name : 'largeBG'
    },
    ftvh : {
        css : 'w1@mh:800@df@jcc@bgc:#fbf3e9@bgi:head.png@bgpc@bgr@bgp_x:calc(50% + 85px)',
        name : 'Fortravalers header wrapper'
    },
    h2_1 : {
        css : 'fs:36px@lh:120%@xw:640@c:#00569f@fwn',
        name : 'H2 trave'
    },
    fw1 : {
        css : 'df@p:20px@fdc',
        name : 'Flex column 20px'
    },
    fw1200 : {
        css : 'df@fdc@f:1 0 0@xw:1200@h:###',
        name : 'Flex 1200px H column',
        deft : 260
    },
    fw1400H : {
        css : 'df@fdc@f:1 0 0@xw:1400@h:###',
        name : 'Flex 1400px H column',
        deft : 260
    },
    fw1400 : {
        css : 'df@fdc@xw:1400',
        name : 'Flex 1400px'
    }
};

var modules = {
    1 : {
        json : '{"lastId":28,"rootId":1,"nodesList":{"1":{"_tag":"section","_class":"hero-header","_css":"$ftvh@p_t:270px","_txt":"","_id":1,"_lvl":0,"_next":2,"_preclass":""},"2":{"_tag":"div","_class":"hero-header_text-block","_css":"$fw1400H:260","_txt":"","_prev":1,"_id":2,"_lvl":1,"_preclass":"","_next":3},"3":{"_tag":"h2","_class":"","_preclass":".app ","_css":"$h2_1","_txt":"Советы на самые лучшие дни в году! <br>Дни, когда вы в отпуске","_prev":2,"_id":3,"_lvl":2,"_next":9},"7":{"_tag":"p","_class":"","_preclass":".app ","_css":"fs:24px@xw:640@lh:120%","_txt":"Поздравляем! Если Вы оказались в этом разделе, <br>то почти наверняка собираетесь в отпуск :)","_prev":9,"_id":7,"_lvl":2,"_next":8},"8":{"_tag":"p","_class":"last","_preclass":".hero-header_text-block>","_css":"m_t:20px","_txt":"Здесь мы собрали самые важные и полезные рекомендации для вас.","_prev":7,"_id":8,"_lvl":2},"9":{"_tag":"div","_class":"filler","_preclass":"","_css":"f:1 0 0","_txt":"","_prev":3,"_id":9,"_lvl":2,"_next":7}}}',
        name : 'Header. img + text(travelers)'
    },
    2 : {
        json : '{"lastId":4,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"line","_preclass":"","_css":"df@fdc@jcc@p:20px 20px 20px 50%@mh:850@bgi:phone_1.png@bgp_y:center@bgp_x:calc(50% - 300px)@bgr","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"h2","_class":"","_preclass":".line ","_css":"fs:36px@lh:120%@c:#00569f@fwn","_txt":"Вернулись из поездки?","_prev":"1","_id":2,"_lvl":1,"_next":3},"3":{"_tag":"h2","_class":"left-ico","_preclass":"","_css":"m:80px 0 40px@p_l:80px","_txt":"&laquo;Привяжите&raquo; карту к&nbsp;рублёвому\\nсчёту","_prev":"2","_id":3,"_lvl":1,"_next":4},"4":{"_tag":"p","_class":"","_preclass":".line ","_css":"fs:20px","_txt":"Оплачивать покупки в&nbsp;России, конечно, выгоднее рублями. Поэтому не&nbsp;забудьте сразу после возвращения &laquo;отвязать&raquo; карту от&nbsp;валютного счета и&nbsp;&laquo;привязать&raquo; её&nbsp;к&nbsp;рублёвому. Через Citi Mobile это займёт не&nbsp;дольше минуты.","_prev":"3","_id":4,"_lvl":1}}}',
        name : 'Row content line(travelers)'
    },
    3 : {
        json:'{"lastId":4,"rootId":1,"nodesList":{"1":{"_tag":"ul","_class":"tab-set","_preclass":"","_css":"df@ls_n@fs:20px@b:#ccc@w1@xw:1400","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"li","_class":"","_preclass":".tab-set>","_css":"f:1 0 0@ta:center@p:20px","_txt":"Menu tab 1","_prev":"1","_id":2,"_lvl":1,"_next":3},"3":{"_tag":"li","_class":"","_preclass":".tab-set >li+","_css":"b_l:#ccc","_txt":"Menu tab 2","_prev":"2","_id":3,"_lvl":1,"_next":4},"4":{"_tag":"li","_class":"","_preclass":"","_css":"","_txt":"Menu tab 3","_prev":"3","_id":4,"_lvl":1}}}',
        name : 'UL flex tabs'
    },
    4 : {
        json:'{"lastId":1,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"row_wrapper","_preclass":"","_css":"df@jcc","_txt":"","_id":1,"_lvl":0}}}',
        name:'Row wrapper'
    },
    4 : {
        json:'{"lastId":6,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"mid_wrapper","_preclass":"","_css":"df@jcc@bgc:#ccc@p:10px","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"div","_class":"flex-row-container","_preclass":"","_css":"w1@df@xw:1420","_txt":"","_prev":"1","_id":2,"_lvl":1,"_next":3},"3":{"_tag":"div","_class":"column","_preclass":"","_css":"f:1 0 0px@m:10px@p:20px@bgc:#fff","_txt":"Content","_prev":"2","_id":3,"_lvl":2,"_next":4},"4":{"_tag":"div","_class":"column","_preclass":"","_css":"","_txt":"Content","_prev":"3","_id":4,"_lvl":2}}}',
        name:'flex columns'
    },
    5 : {
        json: '{"lastId":2,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"mid-lane-wrapper","_preclass":"","_css":"df@fdc@jcc@h1@bgc:#ccc@mh:100","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"div","_class":"mid-lane-container","_preclass":"","_css":"bgc:#fff","_txt":"Content","_prev":"1","_id":2,"_lvl":1}}}',
        name:'Mid laner'
    },
    6 : {
        json : '{"lastId":10,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"tabs-container","_preclass":"","_attr":"tabs=wrapper","_css":"df@fw@jcc@bgc:#eee@p:10px","_txt":"","_src":"","_id":1,"_lvl":0,"_next":3},"2":{"_tag":"script","_class":"","_preclass":"","_attr":"src=/russia/js/markup/tabs.js","_css":"","_txt":"","_src":"js/tabs.js","_prev":10,"_id":2,"_lvl":0},"3":{"_tag":"ul","_class":"tabs-wrapper","_preclass":"","_attr":"tabs=tab-set","_css":"df@ls_n@fs:20px@b:#ccc@w1@xw:1400","_txt":"","_src":"","_prev":"1","_id":3,"_lvl":1,"_next":5},"4":{"_tag":"div","_class":"blocks-wrapper","_preclass":"","_attr":"tabs=block-set","_css":"bgc:#ccc@w1@xw:1400@p:10px","_txt":"","_src":"","_prev":7,"_id":4,"_lvl":1,"_next":8},"5":{"_tag":"li","_class":"tab-item active","_preclass":"","_attr":"tabs=tab","_css":"f:1 0 0px@ta:center@p:20px@bgc:#fff@trn:0.2","_txt":"tab 1","_src":"","_prev":"3","_id":5,"_lvl":2,"_next":6,"_act":"bgc:#194a89@c:#fff"},"6":{"_tag":"li","_class":"tab-item","_preclass":".tab-item+","_attr":"tabs=tab","_css":"b_l:#ccc","_txt":"tab 2","_src":"","_prev":"5","_id":6,"_lvl":2,"_next":7},"7":{"_tag":"li","_class":"tab-item","_preclass":"","_attr":"tabs=tab","_css":"","_txt":"tab 3","_src":"","_prev":"6","_id":7,"_lvl":2,"_next":4},"8":{"_tag":"div","_class":"tab-block-item active","_preclass":"","_attr":"tabs=block","_css":"dn@p:20px@bgc:#fff@m:10px","_txt":"block content 1","_src":"","_prev":"4","_id":8,"_lvl":2,"_next":9,"_act":"db"},"9":{"_tag":"div","_class":"tab-block-item","_preclass":"","_attr":"tabs=block","_css":"","_txt":"block content 2","_src":"","_prev":"8","_id":9,"_lvl":2,"_next":10},"10":{"_tag":"div","_class":"tab-block-item","_preclass":"","_attr":"tabs=block","_css":"","_txt":"block content 3","_src":"","_prev":"9","_id":10,"_lvl":2,"_next":2}}}',
        name : 'Flex Tabs + JS'
    },
    7 : {
        json :'{"lastId":2,"rootId":1,"nodesList":{"1":{"_tag":"h2","_class":"","_preclass":".app ","_attr":"","_css":"fs:36px@lh:120%@c:#00569f@fwn","_txt":"H2 header","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"p","_class":"","_preclass":".app ","_attr":"","_css":"fs:20px@lh:120%@c:#333@fwn","_txt":"its a p tag","_prev":"1","_id":2,"_lvl":0}}}',
        name : 'App basic elements'
    },
    7 : {
        json :'{"lastId":6,"rootId":1,"nodesList":{"1":{"_tag":"section","_class":"mid-lane-wrapper-a28","_preclass":"","_css":"df@fdc@jcc@h:0@mh:500@bgi_m@bgpc@bgr@bgs_c","_txt":"","_id":1,"_lvl":0,"_next":2,"_attr":""},"2":{"_tag":"div","_class":"mid-lane-container-a28","_preclass":"","_css":"df@jce@xw:1400@p:20px@asc@w1","_txt":"","_prev":"1","_id":2,"_lvl":1,"_next":4,"_attr":"","_act":"","_hov":"","_bef":"","_aft":""},"4":{"_tag":"div","_class":"text-block-a28","_preclass":"","_attr":"","_css":"bgc:rgba(12, 55, 120, 0.95)@w1@xw:450@h:250@p:40px@c:#fff@ta:center","_txt":"","_prev":"2","_id":4,"_lvl":2,"_next":5,"_act":"","_hov":"","_bef":"","_aft":""},"5":{"_tag":"h1","_class":"","_preclass":".text-block-a28 ","_attr":"","_css":"fs:42px@fwn@m_b:30px","_txt":"Hero title A.2.8","_prev":"4","_id":5,"_lvl":3,"_next":6,"_act":"","_hov":"","_bef":"","_aft":""},"6":{"_tag":"p","_class":"","_preclass":".text-block-a28 ","_attr":"","_css":"fs:16px","_txt":"Legend tells that the Emerald Buddha was created in Pataliputra, India, which is now the city that is known for his hometown.","_prev":"5","_id":6,"_lvl":3,"_act":"","_hov":"","_bef":"","_aft":""}}}',
        name : 'DDL A 2.8 - Header wrapper blue block'
    },
    8 : {
        json : '{"lastId":10,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"tabs-container","_preclass":"","_attr":"tabs=wrapper","_css":"df@fw@jcc@p:40px 20px","_txt":"","_src":"","_id":1,"_lvl":0,"_next":3,"_act":""},"2":{"_tag":"script","_class":"","_preclass":"","_attr":"src=/russia/js/markup/tabs.js","_css":"","_txt":"","_src":"js/tabs.js","_prev":9,"_id":2,"_lvl":0},"3":{"_tag":"ul","_class":"tabs-wrapper","_preclass":"","_attr":"tabs=tab-set","_css":"df@ls_n@fs:21px@w1@xw:1400@m_b:40px","_txt":"","_src":"","_prev":"1","_id":3,"_lvl":1,"_next":5},"4":{"_tag":"div","_class":"blocks-wrapper","_preclass":"","_attr":"tabs=block-set","_css":"w1@xw:1400","_txt":"","_src":"","_prev":6,"_id":4,"_lvl":1,"_next":8},"5":{"_tag":"li","_class":"tab-item active","_preclass":"","_attr":"tabs=tab","_css":"f:1 0 0px@ta:center@p:40px@bgc:#eee@trn:0.2@b_b:#fff@b_bw:5","_txt":"tab 1","_src":"","_prev":"3","_id":5,"_lvl":2,"_next":6,"_act":"bgc:#fff@b_bc:#002d72@zi:2@b_sh@db"},"6":{"_tag":"li","_class":"tab-item","_preclass":".tab-item+","_attr":"tabs=tab","_css":"","_txt":"tab 2","_src":"","_prev":"5","_id":6,"_lvl":2,"_next":4},"8":{"_tag":"div","_class":"tab-block-item active","_preclass":"","_attr":"tabs=block","_css":"dn@bgc:#fff","_txt":"block content 1","_src":"","_prev":"4","_id":8,"_lvl":2,"_next":9,"_act":"db"},"9":{"_tag":"div","_class":"tab-block-item","_preclass":"","_attr":"tabs=block","_css":"","_txt":"block content 2","_src":"","_prev":"8","_id":9,"_lvl":2,"_next":2}}}',
        name : 'Tabs with bot borders'
    },
    9 : {
        json : '{"lastId":5,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"mix-block-wrapper-1","_preclass":"","_attr":"","_css":"df@fw","_act":"","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"div","_class":"image-block","_preclass":"","_attr":"","_css":"mh:250@bgi_d@f:1 0 260px@p:40px@bgpc@bgs_c","_act":"","_txt":"","_prev":"1","_id":2,"_lvl":1,"_next":3},"3":{"_tag":"div","_class":"text-block","_preclass":"","_attr":"","_css":"f:1 0 280px@p:40px","_act":"","_txt":"","_prev":"2","_id":3,"_lvl":1,"_next":4},"4":{"_tag":"h3","_class":"","_preclass":".text-block ","_attr":"","_css":"fs:26px@m_b:40px","_act":"","_txt":"Small title ","_prev":"3","_id":4,"_lvl":2,"_next":5},"5":{"_tag":"p","_class":"","_preclass":".text-block ","_attr":"","_css":"","_act":"","_txt":"small description","_prev":"4","_id":5,"_lvl":2}}}',
        name : 'Mixed block type 1'
    },
    10:{
        json:'{"lastId":4,"rootId":1,"nodesList":{"1":{"_tag":"ul","_class":"ico-list-wrapper","_preclass":"","_attr":"","_css":"","_act":"","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"li","_class":"ico-list-item","_preclass":"","_attr":"","_css":"p:20px 0 20px 50px@pr","_act":"","_txt":"content","_prev":"1","_id":2,"_lvl":1,"_next":3},"3":{"_tag":"li","_class":"ico-list-item","_preclass":"","_attr":"","_css":"","_act":"","_txt":"content","_prev":"2","_id":3,"_lvl":1,"_next":4},"4":{"_tag":"li","_class":"ico-list-item","_preclass":"","_attr":"","_css":"","_act":"","_txt":"content","_prev":"3","_id":4,"_lvl":1}}}',
        name : 'Basic icon list'
    },
    11 : {
        json : '{"lastId":2,"rootId":1,"nodesList":{"1":{"_tag":"section","_class":"img-header-wrapper","_id":1,"_lvl":0,"_css":"df@jcc@p:100px 20px@bgi_l@bgpc@bgr@bgs_c","_next":2,"_preclass":"","_attr":"","_act":"","_hov":"","_bef":"","_aft":"","_txt":""},"2":{"_tag":"h3","_class":"img-header-wrapper__header","_txt":"Сертификат действует по&nbsp;всему миру,<br>\\nкроме стран, в&nbsp;которых&nbsp;Вы живете постоянно.","_prev":"1","_id":2,"_lvl":1,"_preclass":"","_attr":"","_css":"bgc:#fff@xw:927@fs:21px@fwn@ta:center@lh:150%@p:40px@w1","_act":"","_hov":"","_bef":"","_aft":""}}}',
        name : 'h3 with BG middle'
    },
    12 : {
        json : '{"lastId":3,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"central-icon-wrapper","_preclass":"","_attr":"","_css":"w1@p:100px 0 0@bgi_i@bgr@bgp_x:center@bgp_y:40px@ta:center@lh:150%","_act":"","_hov":"","_bef":"","_aft":"","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"p","_class":"central-icon-wrapper__titile","_preclass":"","_attr":"","_css":"fwb@m_b:10px","_act":"","_hov":"","_bef":"","_aft":"","_txt":"title text","_prev":"1","_id":2,"_lvl":1,"_next":3},"3":{"_tag":"p","_class":"central-icon-wrapper__text","_preclass":"","_attr":"","_css":"","_act":"","_hov":"","_bef":"","_aft":"","_txt":"Another block text","_prev":"2","_id":3,"_lvl":1}}}',
        name : 'Small block with icon and text'
    },
    13 : {
        json : '{"lastId":2,"rootId":1,"nodesList":{"1":{"_tag":"section","_class":"blue-line","_preclass":"","_attr":"","_css":"df@jcc@m:40px 20px","_act":"","_hov":"","_bef":"","_aft":"","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"p","_class":"","_preclass":".blue-line ","_attr":"","_css":"bgc:#002d72@c:#fff@p:20px@w1@xw:1400@ta:center","_act":"","_hov":"","_bef":"","_aft":"","_txt":"Не&nbsp;забудьте распечатать памятку и&nbsp;ознакомиться с&nbsp;полными условиями страхования.","_prev":"1","_id":2,"_lvl":1}}}',
        name : 'Blue line text'
    },
    14 : {
        json : '{"lastId":1,"rootId":1,"nodesList":{"1":{"_tag":"p","_class":"text-with-ico","_preclass":"","_attr":"","_css":"p:20px 20px 20px 50px@bgi_i@bgr@bgp_x:10px@bgp_y:20px","_act":"","_hov":"","_bef":"","_aft":"","_txt":"Some text <br>multiline","_id":1,"_lvl":0}}}',
        name : 'text with left ico'
    },
    15 : {
        json : '{"lastId":2,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"disclaimer-wrapper","_preclass":"","_attr":"","_css":"bgc:#eee@df@jcc","_act":"","_hov":"","_bef":"","_aft":"","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"div","_class":"disclaimer-contaeiner","_preclass":"","_attr":"","_css":"c:#666@fs:12px@w1@xw:1400@p:20px@lh:150%","_act":"","_hov":"","_bef":"","_aft":"","_txt":"Программа страхования является предложением АО&nbsp;СК&nbsp;&laquo;Альянс&raquo; (лицензия Банка России: СИ &#8470;&nbsp;0290 от&nbsp;10&nbsp;ноября 2014&nbsp;г., СЛ &#8470;&nbsp;0290 от&nbsp;10&nbsp;ноября 2014&nbsp;г.). АО&nbsp;КБ&nbsp;&laquo;Ситибанк&raquo;, Citigroup Inc. или их&nbsp;аффилированные лица, государственные органы и&nbsp;Российская Федерация не&nbsp;несут никакой ответственности за&nbsp;исполнение АО&nbsp;СК&nbsp;&laquo;Альянс&raquo; обязательств по&nbsp;договору страхования рисков. Программа страхования начинает действовать с&nbsp;первого числа месяца, следующего за&nbsp;месяцем первичного выполнения условий тарифа. Страховая программа включает следующие покрытия: медицинская помощь при несчастном случае или внезапном заболевании за&nbsp;рубежом, медико-транспортные услуги, страхование гражданской ответственности на&nbsp;время путешествия, потеря багажа. Полный список страховых покрытий уточняйте по&nbsp;телефонам службы поддержки: в&nbsp;Москве +7(495) 775-75-75, в&nbsp;Санкт-Петербурге +7 (812) 336-75-75, в&nbsp;других городах РФ&nbsp;8 (800) 700-38-38, а&nbsp;также смотрите на&nbsp;сайте www.citibank.ru. Страховая программа доступна Клиентам в&nbsp;возрасте до&nbsp;84&nbsp;лет включительно.","_prev":"1","_id":2,"_lvl":1}}}',
        name :'basic disclaimer'
    },
    16 : {
        json : '{"lastId":3,"rootId":1,"nodesList":{"1":{"_tag":"span","_class":"tooltip-wrapper","_preclass":"","_attr":"tooltip=wrapper:tooltip-width=400","_css":"pr@c:#056DAE@b_b:#056DAE","_act":"","_hov":"cp@c:#002a54@b_b:#002a54","_bef":"","_aft":"","_txt":"adaptive&nbsp;tooltip","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"span","_class":"tooltip-text","_preclass":"","_attr":"tooltip=content","_css":"dn@pa@bgc:#eee@br:5px@p:20px@c:#333@fs:12px@w:300@zi:100@lh:150%","_act":"","_hov":"cd","_bef":"","_aft":"","_txt":"<p>Cледует избегать переносов в тултипе!</p>\\n<p>класс <b>tooltip-disable-right</b> - блокировка показа справа</p>\\n<p>класс <b>tooltip-disable-top</b> - блокировка показа сверху</p>\\n<p>класс <b>tooltip-disable-bottom</b> - блокировка показа снизу</p>\\n","_prev":1,"_id":2,"_lvl":1,"_next":3},"3":{"_tag":"script","_class":"","_preclass":"","_attr":"src=/russia/js/markup/tooltips.js","_css":"","_act":"","_hov":"","_bef":"","_aft":"","_txt":"","_prev":2,"_id":3,"_lvl":0}}}',
        name : 'Tooltip Span'
    },
	17 : {
		json : '{"lastId":9,"rootId":1,"nodesList":{"1":{"_tag":"div","_class":"markup-popup-container","_preclass":"","_attr":"","_css":"pr@p:60px 40px 30px@mw:290@wp:50","_act":"","_hov":"","_bef":"","_aft":"","_txt":"","_id":1,"_lvl":0,"_next":2},"2":{"_tag":"div","_class":"markup-popup-header-wrapper","_preclass":"","_attr":"","_css":"","_act":"","_hov":"","_bef":"","_aft":"","_txt":"","_prev":"1","_id":2,"_lvl":1,"_next":5},"3":{"_tag":"div","_class":"markup-popup-body-wrapper","_preclass":"","_attr":"","_css":"","_act":"","_hov":"","_bef":"","_aft":"","_txt":"","_prev":5,"_id":3,"_lvl":1,"_next":6},"4":{"_tag":"div","_class":"markup-popup-buttons-wrapper","_preclass":"","_attr":"","_css":"p_t:40px@df@jce","_act":"","_hov":"","_bef":"","_aft":"","_txt":"","_prev":6,"_id":4,"_lvl":1,"_next":7},"5":{"_tag":"h2","_class":"markup-popup-header","_preclass":"h2","_attr":"","_css":"p:0@tal@m_b:20px","_act":"","_hov":"","_bef":"","_aft":"","_txt":"Lorem ipsum dolar magna dit et dolore magna aliqua","_prev":"2","_id":5,"_lvl":2,"_next":3},"6":{"_tag":"p","_class":"markup-popup-body","_preclass":"","_attr":"","_css":"","_act":"","_hov":"","_bef":"","_aft":"","_txt":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","_prev":"3","_id":6,"_lvl":2,"_next":4},"7":{"_tag":"button","_class":"primary-ddl-button","_preclass":"","_attr":"","_css":"","_act":"","_hov":"","_bef":"","_aft":"","_txt":"Button 1","_prev":4,"_id":7,"_lvl":2,"_next":8},"8":{"_tag":"button","_class":"primary-ddl-button","_preclass":"","_attr":"","_css":"","_act":"","_hov":"","_bef":"","_aft":"","_txt":"Button 2","_prev":7,"_id":8,"_lvl":2,"_next":9},"9":{"_tag":"span","_class":"markup-popup-close","_preclass":"","_attr":"","_css":"pa@t_:16px@r_:10px@w:30@h:30@c:#eee","_act":"","_hov":"c:#fff@bgc:#666@cp","_bef":"cont: @w:2@h:12@pa@bgc:#666@rot:45@t_:10px@l_:14px","_aft":"cont: @w:2@h:12@pa@bgc:#666@rot:-45@t_:10px@l_:14px","_txt":"","_prev":8,"_id":9,"_lvl":1}}}',
		name : 'DDL popup'
	}

};

/*
hero-header/section=w1@mh:800@ta:center@bgc:#fbf3e9@bgi:head.png@bgpc@bgr@df@jcc[container/div=h:260@xw:1200@bgc:#eee@df@f:1 0 0]
 */
