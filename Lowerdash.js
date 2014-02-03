#pragma strict
/*
	LowerDash v0.1
	Javascript Array Iteration methods for UnityScript
	Mr Speaker (@mrspeaker)
	
	_.map(Array(1,2,3), function (el: int) {
		return el * 2;
	}; // [2, 4, 6]
	
	see LowerdashTest.test() for more examples.
	run LowerdashTest.test() to unit test.
*/

class _ {

	static function forEach(c: Array, f: Function) {
		var length = c.length;
		for (var i = 0; i < length; i++) {
			f(c[i], i);
		}
	}
	
	static function map(c: Array, f: Function) {
		var length = c.length;
		var out = new Array();
		for (var i = 0; i < length; i++) {
			out.push(f(c[i], i));
		}
		return out;
	}
	
	static function filter(c: Array, f: Function) {
		var length = c.length;
		var out = new Array();
		for (var i = 0; i < length; i++) {
			var res = f(c[i], i);
			if (res) {
				out.push(c[i]);
			}
		}
		return out;
	}
	
	static function reduce(c: Array, f: Function, initValue) {
		var length = c.length;
		var out = initValue;
		for (var i = 0; i < length; i++) {
			out = f(c[i], out, i, c);
		}
		return out;
	}
	
	static function reduceRight(c: Array, f: Function, initValue) {
		var length = c.length;
		var out = initValue;
		for (var i = length - 1; i >= 0; i--) {
			out = f(c[i], out, i, c);
		}
		return out;
	}
	
	static function every(c: Array, f: Function) {
		var length = c.length;
		for (var i = 0; i < length; i++) {
			if (!f(c[i], i)) {
				return false;
			}
		}
		return true;
	}
	
	static function some(c: Array, f: Function) {
		return findIndex(c, f) > -1;
	}
	
	static function findIndex(c: Array, f: Function) {
		var length = c.length;
		for (var i = 0; i < length; i++) {
			if (f(c[i])) {
				return i;
			}
		}
		return -1;
	}
	
	// Note: added "foundF" function that executes on found item.
	static function find(c: Array, f: Function, foundF: Function) {
		var idx = findIndex(c, f);
		var el = idx > -1 ? c[idx] : null;
		if (foundF && el) {
			foundF(el);
		}
		return el;
	}
	
};
