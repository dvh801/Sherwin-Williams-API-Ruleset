import * as spectralCore from '@stoplight/spectral-core';

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var refSiblings = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(spectralCore);

var isObject$1 = {};

Object.defineProperty(isObject$1, "__esModule", { value: true });
isObject$1.isObject = void 0;
function isObject(value) {
    return value !== null && typeof value === 'object';
}
isObject$1.isObject = isObject;

Object.defineProperty(refSiblings, "__esModule", { value: true });
const spectral_core_1 = require$$0;
const isObject_1 = isObject$1;
function getParentValue(document, path) {
    if (path.length === 0) {
        return null;
    }
    let piece = document;
    for (let i = 0; i < path.length - 1; i += 1) {
        if (!(0, isObject_1.isObject)(piece)) {
            return null;
        }
        piece = piece[path[i]];
    }
    return piece;
}
var _default = refSiblings.default = (0, spectral_core_1.createRulesetFunction)({
    input: null,
    options: null,
}, function refSiblings(targetVal, opts, { document, path }) {
    const value = getParentValue(document.data, path);
    if (!(0, isObject_1.isObject)(value))
        return;
    const keys = Object.keys(value);
    if (keys.length === 1) {
        return;
    }
    const results = [];
    const actualObjPath = path.slice(0, -1);
    for (const key of keys) {
        if (key === '$ref') {
            continue;
        }
        results.push({
            message: '$ref must not be placed next to any other properties',
            path: [...actualObjPath, key],
        });
    }
    return results;
});

export { _default as default };
