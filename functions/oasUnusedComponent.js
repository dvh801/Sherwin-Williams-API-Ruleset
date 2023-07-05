import * as spectralFunctions from '@stoplight/spectral-functions';
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

var oasUnusedComponent = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(spectralFunctions);

var require$$1 = /*@__PURE__*/getAugmentedNamespace(spectralCore);

var isObject$1 = {};

Object.defineProperty(isObject$1, "__esModule", { value: true });
isObject$1.isObject = void 0;
function isObject(value) {
    return value !== null && typeof value === 'object';
}
isObject$1.isObject = isObject;

Object.defineProperty(oasUnusedComponent, "__esModule", { value: true });
const spectral_functions_1 = require$$0;
const spectral_core_1 = require$$1;
const isObject_1 = isObject$1;
var _default = oasUnusedComponent.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            components: {
                type: 'object',
            },
        },
        required: ['components'],
    },
    options: null,
}, function oasUnusedComponent(targetVal, opts, context) {
    const results = [];
    const componentTypes = [
        'schemas',
        'responses',
        'parameters',
        'examples',
        'requestBodies',
        'headers',
        'links',
        'callbacks',
    ];
    for (const type of componentTypes) {
        const value = targetVal.components[type];
        if (!(0, isObject_1.isObject)(value))
            continue;
        const resultsForType = (0, spectral_functions_1.unreferencedReusableObject)(value, { reusableObjectsLocation: `#/components/${type}` }, context);
        if (resultsForType !== void 0 && Array.isArray(resultsForType)) {
            results.push(...resultsForType);
        }
    }
    return results;
});

export { _default as default };
