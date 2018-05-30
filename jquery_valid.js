/* пока работает с input,select,checkbox и textarea(теоретически)
Вызов :
для Jquery объекта(формы)
$('form').ig_valid({options});
----------------------------------------------------------
по дефолту включены следующие опции:
allreq:true - все поля делает обязательными,
defaultCSS:true - стандартыне стили полей, лучше всегад ставить, чтоб нормально отображались подсказки
alertMessage:true - показывать сообщения об ошибках в формах
ignoreHidden:true - игнорирует hidden поля
dateMask:true - вешает inputmask на valid="bDate" __.__.____г.
phoneMask:true - вешает inputmask на valid="phone"
	сюда можно присвоить любую маску телефона, например phoneMask:"999-99-99"
	дефолтная маска равна "+7 (999) 999-99-99"

можно выставить:
autoStop:true - не дает вводить все кроме регулярок из stops массива
blinkColor : color - цвет моргания(false - не мерцает)
preCheck : true - валидация будет проверятся до первого нажатия на отправку)
ajax : callback - вызывает callback при отправке формы через ajax;
parseDateForIEWA:('[b_day].[b_month].[b_year]') -вставляем конфиг для даты из евы. создает 3  hidden поля для ЕВЫ , с нужными неймами и данными из поля valid="bDate"
	в порядкае !! день - месяц - год 
----------------------------------------------------------
при отправке формы вешается класс ig_valid/ig_invalid
при блюре с поля с классом ig_valid/ig_invalid валидация срабатывает повторно на конктретном поле
----------------------------------------------------------
проверка на пустые поля:
	атрибут req="yes" либо передаем в опции allreq:true;
	можно для поля явно прописать req="no"
----------------------------------------------------------
проверка по регулярке:
	атрибут valid ="#имя ключа из массива regs#";
----------------------------------------------------------
на кнопку отправки вешаем:
	атрибут act="send"
----------------------------------------------------------
*/
// =====ВСЕ РЕГУЛЯРКИ ЭКРАНИРОВАТЬ ДВОЙНЫМИ СЛЕШАМИ!!!!===============
var 
	//Дефолтные сообщения 	
	reqMessage = "Поле обязательно для заполнения", 
	reqSelectMessage = "Выберите пункт из списка",
	minSizeMessage = "Символов должно быть не менее #",
	wrongInputMessage = "Введены недопустимые символы",
	/* описание индексов:
		0 - техническое поле
		1 - регулярка для проверки на соответствие
		2 - минимуму символов
		3 - максимум символов
		4 - текст сообщения об ошибке
	*/
	ig_opt = {},
	regs = {
		fio : ['Буквы, пробел и тире','^[a-zа-яё\\s\\-]*$',2,30,'Только буквы, тире и пробел!'],
		fio_rus : ['Для ФИО только рус','^[а-яё\\s\\-]*$',2,30,'Только кириллица, тире и пробел!'],
		bYear : ['Год рождения','^\\d*$',0,4,'Введите год рождения в формате "1990"'],
		bDate : ['Год рождения','^[\\d.]*$',0,10,'Введите год рождения в формате "ДД.MM.ГГГГ"'],
		lastSix : ['Последние 6 цифр карты','^\\d*$',6,6],
		desire : ['пожелания','^[^\\<\\>]*$',0,200],
		phone : ['номер телефона','^\\d*$',0,11,'Введите телефон в формате 8хххххххххх']
	},
	/* описание индексов:
		0 - техническое поле
		1 - регулярка для проверки на соответствие нажатой кнопки
	*/
	stops = {
		fio : ['Буквы, пробел и тире','[a-zа-яё\\s\\-]'],
		fio_rus : ['Для ФИО только рус','[а-яё\\s\\-]'],
		bYear : ['Год рождения','[\\d]'],
		bDate : ['Год рождения','[\\d.]'],
		lastSix : ['Последние 6 цифр карты','[\\d]'],
		desire : ['пожелания','[^\\<\\>]'],
		phone : ['номер телефона','\\d']
	},
	/*
	=============== API тут =========================================
	объекты называем <<Имя ключа из массива regs>>_event
	Метод action будет вызван если поле прошло проверку на обязательность и регулярку
	ОБЯЗАТЕЛЬНО возвращаем false , в противном случае, поле не проходит валидацию.
	если вернуть текст, то он выводится в warning message и валидация не проходит
	*/
	bYear_event = {
		min : (new Date).getFullYear() - 100,
		max : (new Date).getFullYear(),
		minMess : 'Укажите год не меньше ' + ((new Date).getFullYear() - 100),
		maxMess : 'Укажите год не больше ' + ((new Date).getFullYear()),
		action : function($e){
			var	
				n = Number($e.val());				

			if(n<this.min) return this.minMess;		 	
			if(n>this.max) return this.maxMess;			
			return false;		 
		} 
	},
	fio_rus_event = fio_event = {
		action : function($e){
			$e.fUP();
			return false;
		}
	},
	lastSix_event = {
		action : function($e){
			var Mess = $e.val().length != 6 ? "Введите ровно 6 цифр" : false;
			return Mess;
		}
	},
	bDate_event = dateInputmask_event = {
		invMess : 'Введена несуществующая дата',
		action : function($e){
			var	
				date = $e.val().slice(0,10).split('.'),
				d = date[0],
				m = date[1],
				y = date[2],
				incorrectYear = bYear_event.action({val:function(){return y}}),
				parsedDate = (new Date(m + '/' + d + '/' + y)),
				IEWAdateConfig = ig_opt.parseDateForIEWA ? ig_opt.parseDateForIEWA.replace(/[\]\[]/g,'').split('.') : false;	
			
			if(incorrectYear) return incorrectYear;
			if(parsedDate == 'Invalid Date' || Number(m) != parsedDate.getMonth() + 1) return this.invMess;
			if(IEWAdateConfig){
				IEWAdateConfig.forEach(function(el,i){
					var $el = $('[name="'+el+'"]');
					if(!$el[0]){
						$e.before('<input type="hidden" name="'+el+'" value="'+date[i]+'">');	
					}else{
						$el.val(date[i])
					}
				});

			}				
			return false;				
		}	
	}	
// --- вызов валидации -------

$.fn.ig_valid = function(opt){
	
	if(this.is('[ig_valid]'))return false;//блокирование повторной инициализации

	var 
		$form = this,
		$fields = $form.find('input,select,textarea'),			
		$send = $form.find('button[act="send"]');

	ig_opt = $.fn.extend({
	        allreq:true,
	        defaultCSS:true,
	        alertMessage:true,
	        ignoreHidden:true,
	        dateMask:true,	        
	        phoneMask:true,
	        blinkColor:false,
	        ajax : false,
	        beforeSending : false,
	        preCheck : false,
			blurAfterReset : false
	    },opt);//Это дефолтные настройки плагина		    			

	$form.attr('ig_valid','');
	
	parseOption();//обработка опций 

	$fields.each(function(){

		var 
			$e = $(this),
			$stop = $e.attr('stop');
		
		$e.setMaxlength();
		if($stop)$e.allowedKeys(stops[$stop][1],ig_opt.blinkColor);


	});

	$fields.blur(function(){
		
		var 
			$e = $(this),
			$e_dom = $e.igSelectRedirect();

		$e.isvalid = true;
		$e.noSpace();	
		if(ig_opt.preCheck || $e_dom.hasClass('ig_valid') || $e_dom.hasClass('ig_invalid')){
			if($e.checkForValidRequare()) $e.checkForValidRegular();
		}

	});

	$fields.filter('[type="checkbox"]').change(function(){

		var $e = $(this);

		$e.isvalid = true;	
		if($e.hasClass('ig_valid') || $e.hasClass('ig_invalid')){
			if($e.checkForValidRequare()) $e.checkForValidRegular();
		}

	});	
	// --- Отправка -------
	$send.click(function(){

		$form.isvalid = true;

		$fields.each(function(){				
			
			var $e = $(this);

			$e.isvalid = true;		
			$e.noSpace();		
			$form.isvalid = $e.checkForValidRequare() ? $e.checkForValidRegular() ? $form.isvalid : false : false;								

		});	
		
		if(!$form.isvalid)return false;
	
		if(ig_opt.ajax){
			// callback before sendint the form
			if (ig_opt.beforeSending) ig_opt.beforeSending();
			var data = $form.serialize();
			// callback after sending the form
			ig_opt.ajax();
			$.post($form.attr('action'), data);
			$form[0].reset();
            ig_opt.blurAfterReset ? $form.find('.ig_valid').removeClass('ig_valid').blur() : $form.find('.ig_valid').removeClass('ig_valid');
			return false;
		} 
		
	});

	function parseOption(){		
		
		if(ig_opt.ignoreHidden){
			$fields = $fields.not('[type="hidden"]');
		}
		if(ig_opt.allreq){
			$fields.filter('[req!="no"]').attr('req','yes');
		}
		if(ig_opt.autoStop){
			$fields.not('[stop]').each(function(){

				var 
					$e = $(this),
					$valid = $e.attr('valid');

				if($valid && stops[$valid])$e.attr('stop', $valid);
						
			});
		}
		if(ig_opt.defaultCSS){
			var css = "<style>";
			css += '.ig_valid,.ig_invalid,.ig_invalid[type="checkbox"]+span,{';
			css += 'transition-property: box-shadow;';
			css += 'transition-duration: 0.5s;';
			css += '}';
			css += '.ig_valid,.ig_valid[type="checkbox"]+span{';
			css += 'box-shadow: 0 0 5px 1px green;';
			css += '}';
			css += '.ig_invalid,.ig_invalid[type="checkbox"]+span{';
			css += 'box-shadow: 0 0 5px 1px red;';			
			css += '}';
			css += '.ig_alert_message{';
			css += 'position: relative;';
			css += '}';
			css += '.ig_alert_message span{';
			css += 'bottom:3px;';
			css += 'color:red;';
			css += 'left:0;';
			css += 'position: absolute;';
			css += 'transition: .5s;';							
			css += 'opacity: 0;';		
			css += '}';
			css += '.ig_invalid+.ig_alert_message span{';
			css += 'opacity: 1;';
			css += '}';
			css += '*:focus+.ig_alert_message span{';
			css += 'opacity: 0;';
			css += '}';
			css += '</style>';
			$('head').append(css);
		}
		if(ig_opt.alertMessage){
			$fields.filter('[type!="checkbox"]').after('<div class="ig_alert_message"><span></span></div>');
			$('.ig_wrapper').after('<div class="ig_alert_message"><span></span></div>');
		}
		if(ig_opt.phoneMask){
			var 
				mask = typeof(ig_opt.phoneMask) == "string" ? ig_opt.phoneMask : "+7 (999) 999-99-99" ;

			$('body').append('<script src="/russia/js/inputmask-3.3.5/jquery.inputmask.bundle.min.js"></script>');			
			$fields.filter('[valid="phone"]').attr('valid','phoneInputmask').attr('stop','').inputmask(mask);
			regs.phoneInputmask = ['phoneInputmask','^[^_]*$',0,0,'Заполните весь шаблон номера'];
		}
		if(ig_opt.dateMask){
			var 
				mask = "99.99.9999г." ;

			if(!ig_opt.phoneMask) $('body').append('<script src="/russia/js/inputmask-3.3.5/jquery.inputmask.bundle.min.js"></script>');			
			$fields.filter('[valid="bDate"]').attr('valid','dateInputmask').attr('stop','').inputmask(mask);
			regs.dateInputmask = ['dateInputmask','^[^_]*$',0,0,'Заполните шаблон даты рождения ДД.ММ.ГГГГ'];
		}

	}			

}
// =============РАСШИРЯЕМ ОБЪЕКТ JQUERY=====================
$.fn.extend({
	// --- проверяем на минимальное кол-во символов
	checkMinlength:function(){

		var 
			$reg = this.attr('valid');
			$val = this.val();
		
		return $reg && $val && regs[$reg][2] ? regs[$reg][2] > $val.length : false		

	},	
	// --- прописываем в инпутах максимальное кол-во сиволов -------checkMinlength
	setMaxlength:function(){

		var 
			$reg = this.attr('valid');		
		
		if($reg && regs[$reg][3] > 0)this.attr('maxlength',regs[$reg][3]);

	},
	// --- перенаправление объекта при использовании плагина ig_select -------
	igSelectRedirect:function(){		
		
		return this.is('[ig_select]') ? this.nextAll().filter('.ig_wrapper').first() : this;

	},
	// --- Вывод сообщения об ошибке -------
	showAlertMessage:function(txt){		
			
			var
				$mess = this.next('.ig_alert_message').find('span');
				
		$mess.text(txt);

	},
	// --- проверка валидации по атрибуту "обязательное"(req) -------
	checkForValidRequare:function(){

		var	
			$e = this,
			$e_dom = $e.igSelectRedirect(),					
			$val = $e.is('[type="checkbox"]') ? $e.prop('checked') : $e.val(),
			mess = reqMessage;
			$req = $e.attr('req') == 'yes';

			
		if(!$val && $req){
			mess = $e.is('select') ? reqSelectMessage : mess;
			$e_dom.showAlertMessage(reqMessage);
			$e_dom.removeClass('ig_valid').addClass('ig_invalid');					
			$e.isvalid = false;					
		}else{
			$e_dom.removeClass('ig_invalid').addClass('ig_valid');				
		}		
		return $e.isvalid;

	},	
	// --- проверка валидации по атрибуту "регулярное выражение"(valid) -------
	checkForValidRegular:function(){

		var				
			$e = this,
			$e_dom = $e.igSelectRedirect(),
			$val = $e.is('[type="checkbox"]') ? $e.prop('checked') : $e.val(),
			$reg = $e.attr('valid'),
			testedReg = $reg ? RegExp(regs[$reg][1],'i').test($val) : true,
			$w_m = $reg && regs[$reg][4] ? regs[$reg][4] : wrongInputMessage,
			api_event = window[$reg + '_event'] !== undefined ? window[$reg + '_event'] : false;		
		
		if($e.checkMinlength()){	
			$e_dom.showAlertMessage(minSizeMessage.replace(/\#/,regs[$reg][2]));
			$e_dom.removeClass('ig_valid').addClass('ig_invalid');						
			return false;
		}	
		if($val && !testedReg){
			$e_dom.showAlertMessage($w_m);						
			$e_dom.removeClass('ig_valid').addClass('ig_invalid');
			$e.isvalid = false;							
		}else{
			if(api_event){				
				$w_m = api_event.action($e);
				if($w_m){
					$e_dom.showAlertMessage($w_m);
					$e_dom.removeClass('ig_valid').addClass('ig_invalid');						
					return false;
				}
			}
			$e_dom.removeClass('ig_invalid').addClass('ig_valid');
		}			
		return $e.isvalid;

	},
	// --- блокировка кнопок -------
	allowedKeys:function(r,c){

		var 
			reg = new RegExp(r,'i'),
			$this = this,
			color = c !== undefined ? c : 'rgba(255,0,0,.2)';
		


		$this.keypress(function(e){
			if(e.key.length == 1 && !reg.test(e.key)){
				if(c)$this.bgBlink(color);
				e.preventDefault();				
			}
		});	
		$this.on('change keyup',function(){
			$this.val($this.val().replace((new RegExp('[^' + r.slice(1),'gi')),''));
		});	

	},
	// --- мерцание background-------
	bgBlink:function(bgColor){

		if(this.blinking) return false;		
		var 
			$e = this,
			bg = $e.css('backgroundColor');

		$e.blinking = true;
		$e.attr( {style : ''} );						
		$e.css( {backgroundColor : bgColor , transition : '0 background-color'} );
		setTimeout(function(){
			$e.css( {transition : '.2s background-color' , backgroundColor : bg});
		} , 10);
		setTimeout(function(){
			$e.blinking = false;
		} , 210);

	},
	//Делает первую букву в строке заглавной
	fUP:function(){

		var
			$e = this,
			$v = $e.val();

		$e.val($v.slice(0,1).toUpperCase() + $v.slice(1));
		return $e;

	},
	// Убираем сдвоенные пробелы и пробелы из конца и начала value
	noSpace:function(){

		var
			$e = this,
			$v = $e.val();

		$e.val($v.trim().replace(/\s{2,}/gi,' '));	
		return $e;

	}


});
