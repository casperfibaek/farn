working repository

Dependencies:
Worker-farm (multi-threading)
var helpers = require('@turf/helpers');
var invariant = require('@turf/invariant');
var meta = require('@turf/meta');

TODO:
Define base functions 		(0.1)
Define tests				(0.2)

Use ES6 Features
	+ .map and .forEach
  + spread operator ([1,2,3] -> 1 2 3 & 'casper' -> c a s p e r)
	+ reduce (array.reduce(function(total, currentValue, currentIndex, arr) {return total + currentValue}, initialValue))
  + .filter
  + prototypes
	+ arrow functions
	+ defaults:
	function f(x, y=12) {
	  // y is 12 if not passed (or passed as undefined)
	  return x + y;
	}
	f(3) == 15
	+ Documentation like (like turf)
	+ var bob = (val) => val + 2 // () required when no parameters
