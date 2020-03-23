var class2type = {};
'Boolean Number String Function Array Date RegExp Object Error'
	.split(' ')
	.forEach(function (e) {
		class2type['[object ' + e + ']'] = e.toLowerCase();
	});

//当然为了兼容IE低版本，forEach需要一个polyfill，不作细谈了。
function _typeof(obj) {
	if (obj == null) {
		return String(obj);
	}
	return typeof obj === 'object' || typeof obj === 'function' ?
		class2type[class2type.toString.call(obj)] || 'object' :
		typeof obj;
}

console.log(_typeof([1213, 1212]));
