#pragma strict
#pragma downcast

private static function isArray(a) {
	return (typeof a) == Array;
}

// Simple (non-nested) array test
private static function testArrayEq(a: Array, b: Array) {
	var equal = true;
	if (a.length != b.length) {
		equal = false;
	} else {
		for (var i = 0; i < a.length; i++) {
			if (a[i] != b[i]) {
				equal = false;
				break;
			}
		}
	}
	return equal;
}

private static function assert(condition, msg) {
	if (msg) {
		if (condition) {
			Debug.Log("Passed '" + msg + "'." );
		} else {
			Debug.LogError("Failed '" + msg + "'.");
		}
	}
	return condition;
}

private static function assertNot(condition, msg) {
	var notPassed = !assert(condition, "");
	if (msg) {
		if (notPassed) {
			Debug.Log("Passed (not equal) '" + msg + "'." );
		} else {
			Debug.LogError("Failed '" + msg + "'.");
		}
	}
	return notPassed;
}

private static function assertEq(result, expected, msg) {
	var passed = true;
	if (isArray(result) && isArray(expected)) {
		passed = testArrayEq(result, expected);
	} else {
		if (result !== expected) {
			passed = false;
		}
	}
	if (msg) {
		if (passed) {
			Debug.Log("Passed '" + msg  + "'. " + result + " equals " + expected);
		} else {
			Debug.LogError("Failed '" + msg + "'. Got:" + result + " Expected:" + expected);
		}
	}
	return passed;
}

private static function assertNotEq(result, expected, msg) {
	var notEqual = !assertEq(result, expected, "");
	if (msg) {
		if (notEqual) {
			Debug.Log("Passed '" + msg  + "'. " + result + " not equal to " + expected);
		} else {
			Debug.LogError("Failed '" + msg + "'. Got:" + result + " Equals:" + expected);
		}
	}
	return notEqual;
}

static function test() {
	var ints = Array(1,2,3,4,5);
	var vecs = Array(Vector2(1, 1), Vector2(2, 2), Vector2(3, 3));
	
	// Test the assert methods
	
	assert(testArrayEq(Array(1,2,3), Array(1,2,3)), "Array ID");
	assertEq(ints, ints, "Arrays are equal");
	assertNotEq(ints, Array(5,4,3,2,1), "Arrays are not equal");
	
	// Test the array iteration methods
	
	var filterUnder4 = function (el: int) { return el < 4; };
	assertEq(_.filter(ints, filterUnder4), Array(1, 2, 3), "Filter under 4");
	
	var square = function (el: int) { return el * 2; };
	assertEq(_.map(ints, square), Array(2, 4, 6, 8, 10), "Square integers");
	assertEq(_.map(_.map(ints, square), square), Array(4, 8, 12, 16, 20), "Square the squares");
	
	assert(_.every(ints, function (el: int) { return el < 10; }), "All ints less than 10");
	assertNot(_.every(ints, function (el: int) { return el < 4; }), "Not all ints less than 4");
	
	assert(_.some(ints, function (el: int) { return el < 3; }), "Some ints less than 3");
	assertNot(_.some(ints, function (el: int) { return el > 5; }), "Not some ints greater than 5");
	
	var aa = Array(0, 1, 2, 3, 4);
	
	// Test some vector math
	var newVecs = _.map(vecs, function (v: Vector2) {
		return Vector2(v.x - 0.5, v.y + 0.5);
	});
	assertEq(newVecs, Array(Vector2(0.5, 1.5), Vector2(1.5, 2.5), Vector2(2.5, 3.5)), "Map over Vector2s");

	// Sum up some vectors. (downcasts to Vector2)
	var sumVec:Vector2 = _.reduce(vecs, function (acc: Vector2, el: Vector2) {
		return acc + el;
	}, Vector2(0, 0));
	assert(sumVec == Vector2(6.0, 6.0), "Reduce-to-sum vector values");
}
