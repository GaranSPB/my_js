function Loop(a){
	this.current = 0;
	this.data = a ? a.map(function(e,i,a){
		return {val:e,next:i == a.length - 1 ? 0 : i + 1,prev: i == 0 ? a.length - 1 : i - 1}
	}) : [];	
} 

Loop.prototype.next = function(){
	var result = this.getCurrent();
	out = this.data[this.current];	
	this.current = out.next;

	return result;
};

Loop.prototype.prev = function(){
	var result = this.getCurrent();
	out = this.data[this.current];	
	this.current = out.prev;

	return result;
};

Loop.prototype.getCurrent = function(i){	
	return i === undefined ? this.data[this.current].val : this.data[i].val;
};

Loop.prototype.setCurrent = function(i){	
	this.current = i;
	return this;
};

Loop.prototype.append = function(a){
	var 
		arr = [].concat(a),
		loop = this;

	arr.forEach(function(e){
		var 
			l = loop.data.length;	

		loop.data[l-1].next = l;
		loop.data.push({val:e,next:0});
	});
	return loop;
};
