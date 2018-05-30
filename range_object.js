/*
//Custom Range object

подключаем после jquery!!!

Создает объект типа "диапазон/множество" для упрощения поиска вхождений и работы с числами

NumRangeIG {

	Конструктор {

		range = new NumRangeIG(1,10) - конструктор объекта, без аргументов будет 0,0

	}	

	Свойства {

		range.min - начало отрезка
		range.max - конец отрезка
		range.size - длина отрезка
		range.$parent - объект Jquery[index](элемент выборки, не сам объект)   
		range.sizeY - кол-во пикселей, видимое на экране по оси Y у $parent
		range.stateY - текущая видимость в строковом представлении:
			'above' - $parent находится выше текущего положения экрана по оси Y 
			'under' - $parent находится ниже текущего положения экрана по оси Y
			'both_cropped' - $parent занимает весь экран и обрезан сверху и снизу
			'bot_cropped' - $parent виден и обрезан по низу экрана
			'top_cropped' - $parent виден и обрезан по верху экрана
			'full_visible' - $parent полностью попадает на экран
		range.$stateRange - объект NumRangeIG, который содержит координаты видимого отрезка элемента $parent на экране
		range.$ScreenPaddingTop - определянет виртуальную линию верхнего отступа начала "экрана" в пикселях. 
		range.$ScreenPaddingBottom - определянет виртуальную линию нижнего отступа конца "экрана" в пикселях. 

	}
	
	Методы {

		range.resize() - пересчитывает длину отрезка. Вызывается автоматически при всех методах
		range.isRangeType(obj) - true, если obj является объектом типа NumRangeIG  
		range.setMin(1) - устанавливаем минимум
		range.incMin(x) - сдвигает Min на x единиц 
		range.setMax(10) - устанавливаем максимум
		range.incMax(x) - сдвигает Max на x единиц 
		range.has(5) - проверяем, входит число в диапазон или нет
		range.hasCrossing(anotherRange) - проверяeт, пересекается ли диапазон range с anotherRange
		range.hasFullJoin(anotherRange) - true, если range полностью содержит anotherRange или наоборот
		range.contains(anotherRange) - true, если range полностью содержит anotherRange 
		range.join(anotherRange) - добавляет к диапазону range anotherRange
		range.cross(anotherRange) - получает пересечние диапазона range с anotherRange
		range.crop(anotherRange) - вычитает из диапазона range пересечение с anotherRange
		range.setParent($obj) - привязывает range к Jquery объекту OffsetY
		range.OffsetY() - вычисляет для объекта $parent min и max на основании его положения на странице по оси Y:
			min - отступ от верха страницы до начала элемента $parent
			max - отступ от верха страницы до конца элемента $parent
			запускает метод getStateY()
		range.getStateY() - определяет положение $parent относительно текущего положения экрана, задает sizeY,stateY,$stateRange
		range.$screenPaddingTop(px) - устанавлвает $screenPaddingTop
		range.$screenPaddingBottom(px) - устанавлвает $screenPaddingBottom

	}	

}

RangeCollectionIG {

	Конструктор {

		col = new RangeCollectionIG() - создает пустую коллекцию

	}

	Свойства {

		col.list - массив содержащий NumRangeIG объекты добавленные в коллекцию
		col.ln - кол-во объектов в коллекции list
		col.sortAttr - дефолт = 'size'.свойство, по которому отсортированны элементы в массиве list 
		col.lowFirst - дефолт = 'true'. Если true - то сортировка идет от меньшего к большему
		col.$list - массив содержащий NumRangeIG объекты связанные с DOM через $parent
		col.$ln - кол-во объектов в коллекции $list
		col.$sortAttr - дефолт = 'min'.свойство, по которому отсортированны элементы в массиве $list 
		col.$lowFirst - дефолт = 'true'. Если true - то сортировка идет от меньшего к большему
		col.$screenPaddingTop - определянет виртуальную линию верхнего отступа начала "экрана" в пикселях для всего списка $list. 
		col.$screenPaddingBottom - определянет виртуальную линию нижнего отступа конца "экрана" в пикселях  для всего списка $list. 

	}

	Методы {
	
		col.add(range||Array of range) - добавляет в коллекцию range объект или массив и сортирует общий список.
		col.resort([newSortAttr]) - производит сортировку списка элементов по новому атрибуту, если указан 
		col.sortFlip - зменяет порядок элементов в списке
		col.$add('selector') - добаляет в $list range объекты Jquery с привязкой к DOM 
		col.$resort([newSortAttr]) - производит сортировку списка $list по новому атрибуту, если указан 
		col.$sortFlip - зменяет порядок элементов в списке $list
		col.$updateStateY - обновляет у всех элементов $list данные об их положении на экране
		col.$getVisibleList - возврщает массив элементов из $list, которые в данный момент видно на экране по оси Y
		col.$largest - возвращает range объект элемента с наибольшей "видимостью" в пикселях по оси Y на текущий момент из списка "list"		
		col.$setScreenPaddingTop(px) - устанавлвает $screenPaddingTop
		col.$setScreenPaddingBottom(px) - устанавлвает $screenPaddingBottom
	}
	
}

*/
function NumRangeIG(min,max){
	this.min = min ? min : 0;
	this.max = max ? max : 0;	
	this.size = this.min < this.max ? this.max - this.min : 0;
}

NumRangeIG.prototype.resize = function(){
	this.size = this.min < this.max ? this.max - this.min : 0;	
	return this;			
}

NumRangeIG.prototype.isRangeType = function(range){
	return range && range instanceof NumRangeIG;			
}
	
NumRangeIG.prototype.setMin = function(min){
	if (!isNaN(min)){
		this.min = min ? min : 0;
		this.max = this.max > this.min ? this.max : this.min;
	}	
	return this.resize();			
}

NumRangeIG.prototype.incMin = function(min){
	this.min = !isNaN(min) ? this.min + min : this.min;	
	return this.resize();			
}

NumRangeIG.prototype.setMax = function(max){
	if (!isNaN(max)){
		this.max = max ? max : 0;
		this.min = this.min < this.max ? this.min : this.max;
	}
	return this.resize();			
}

NumRangeIG.prototype.incMax = function(max){
	this.max = !isNaN(max) ? this.max + max : this.max;
	return this.resize();			
}

NumRangeIG.prototype.has = function(num){
	return !isNaN(num) ? this.min <= num && num <= this.max : false;  
}

NumRangeIG.prototype.hasCrossing = function(range){		
	return this.isRangeType(range) ? this.has(range.min) || this.has(range.max) : false;  
}

NumRangeIG.prototype.contains = function(range){		
	return this.isRangeType(range) ? this.has(range.min) && this.has(range.max) : false;  
}

NumRangeIG.prototype.hasFullJoin = function(range){	
	return this.isRangeType(range) ? this.contains(range) || range.contains(this) : false;
}

NumRangeIG.prototype.join = function(range){
	if(this.isRangeType(range)){
		this.min = this.min <= range.min ? this.min : range.min;
		this.max = this.max >= range.max ? this.max : range.max;
	}	
	return this.resize();  
}

NumRangeIG.prototype.cross = function(range){
	if(this.hasCrossing(range)){
		this.min = this.min <= range.min ? range.min : this.min;
		this.max = this.max >= range.max ? range.max : this.max;	
	}	
	return this.resize();  
}

NumRangeIG.prototype.crop = function(range){
	if(this.hasCrossing(range) && !this.hasFullJoin(range)){
		this.min = this.min >= range.min ? range.max + 1 : this.min;
		this.max = this.min <= range.min ? range.min - 1 : this.max;
	}	
	return this.resize();  
}

NumRangeIG.prototype.$setScreenPaddingTop = function(padding){
	this.$screenPaddingTop = padding;
	return this;
}

NumRangeIG.prototype.$setScreenPaddingBottom = function(padding){
	this.$screenPaddingBottom = padding;
	return this;
}

NumRangeIG.prototype.setParent = function($obj){
	this.$parent = $obj[0] ? $obj : undefined;
	return this;
}

NumRangeIG.prototype.OffsetY = function(){
	this.setMin(this.$parent["0"].offsetTop);
	this.setMax(this.min + this.$parent["0"].clientHeight);		
	return this.resize().getStateY();
}

NumRangeIG.prototype.getStateY = function(){
	if(!this.$parent) return false;

	var 
		paddingTop = this.$screenPaddingTop ? this.$screenPaddingTop : 0,
		paddingBottom = this.$screenPaddingBottom ? this.$screenPaddingBottom : 0,
		WscrollY = window.scrollY || window.pageYOffset,
		scrollRange = new NumRangeIG(WscrollY + paddingTop,WscrollY+window.innerHeight - paddingBottom),
		tempRange = new NumRangeIG(this.min,this.max);


	tempRange.fullSize = this.size;		
	if(tempRange.hasCrossing(scrollRange) || tempRange.hasFullJoin(scrollRange)){
		tempRange.cross(scrollRange).incMin(-WscrollY).incMax(-WscrollY);
		if(tempRange.fullSize == tempRange.size && tempRange.min >= paddingTop && tempRange.min <= scrollRange.max){
			tempRange.stateY = 'full_visible';
		}else if(tempRange.fullSize > tempRange.size && tempRange.min == paddingTop && tempRange.max == window.innerHeight - paddingBottom){
			tempRange.stateY = 'both_cropped';
		}else if(tempRange.fullSize > tempRange.size && tempRange.min == paddingTop){
			tempRange.stateY = 'top_cropped';
		}else{
			tempRange.stateY = 'bot_cropped';
		}			
	}else{
		tempRange.incMin(-window.scrollY).incMax(-window.scrollY);
		tempRange.size = 0;
		tempRange.stateY = this.min > scrollRange.max ? 'under' : 'above';
	}	
	this.$stateRange = tempRange;
	this.sizeY = tempRange.size;
	this.stateY = tempRange.stateY;
	return this;
}
/* ===================================

	        RangeCollectionIG

   ===================================*/
function RangeCollectionIG(){
	//для чисел
	this.list = [];
	this.ln = this.list.length;	
	this.sortAttr = 'size';
	this.lowFirst = true;
	//$ для объектов добавленных через add
	this.$list = [];
	this.$ln = this.$list.length;
	this.$sortAttr = 'min';
	this.$lowFirst = true;	
	this.$screenPaddingTop = 0;
	this.$screenPaddingBottom = 0;
}

RangeCollectionIG.prototype.add = function(range){
	var 
		arr = [].concat(range),
		currentRange = this;

	arr.forEach(function(el){
		if(NumRangeIG.prototype.isRangeType(el)){
			
			if(el.$parent){
				currentRange.$list.push(el);
				currentRange.$ln++;
				currentRange.$resort();
			}else{
				currentRange.list.push(el);
				currentRange.ln++;
				currentRange.resort();
			}		
		}
	});	
	return currentRange;
}

RangeCollectionIG.prototype.$add = function(selector){
	var $obj = $(selector);
	if($obj[0]){
		var arr = $obj.setRangeY().toArray().map(function(el){
			return el.rangeY;
		});
		this.add(arr);
	}
	return this;
}

RangeCollectionIG.prototype.resort = function(newSortAttr){
	this.sortAttr = newSortAttr ? newSortAttr : this.sortAttr;
	var range = this;		
	this.list.sort(function(a,b){
		 return range.lowFirst ? a[range.sortAttr] - b[range.sortAttr] : b[range.sortAttr] - a[range.sortAttr];		
	});
	return this;
}

RangeCollectionIG.prototype.$resort = function(newSortAttr){
	this.$sortAttr = newSortAttr ? newSortAttr : this.$sortAttr;
	var range = this;	
	this.$list.sort(function(a,b){
		 return range.$lowFirst ? a[range.$sortAttr] - b[range.$sortAttr] : b[range.$sortAttr] - a[range.$sortAttr];		
	});
	return this;
}

RangeCollectionIG.prototype.sortFlip = function(){
	this.lowFirst = !this.lowFirst;
	return this.resort();
}

RangeCollectionIG.prototype.$sortFlip = function(){
	this.$lowFirst = !this.$lowFirst;
	return this.$resort();
}

RangeCollectionIG.prototype.$updateStateY = function(){
	var col = this;
	col.$list = col.$list.map(function(el){
		return el.$setScreenPaddingTop(col.$screenPaddingTop).$setScreenPaddingBottom(col.$screenPaddingBottom).OffsetY();
	});
	return col;
}

RangeCollectionIG.prototype.$getVisibleList = function(){
	var arr = this.$updateStateY().$list.filter(function(el){
		return el.stateY.match(/[^above||under]/);
	});
	arr.sort(function(a,b){
		return b.sizeY - a.sizeY;
	});
	return arr;
}

RangeCollectionIG.prototype.$largest = function(){
	var arr = this.$getVisibleList();	
	return arr[0];
}

RangeCollectionIG.prototype.$setScreenPaddingTop = function(padding){
	this.$screenPaddingTop = padding;
	return this;
}

RangeCollectionIG.prototype.$setScreenPaddingBottom = function(padding){
	this.$screenPaddingBottom = padding;
	return this;
}

$.fn.extend({
	setRangeY : function(){
		this.each(function() {
			this.rangeY = new NumRangeIG().setParent($(this)).OffsetY();
		});
		return this;		
	}
});
