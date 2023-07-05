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

var oasOpFormDataConsumeCheck = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(spectralCore);

var isObject$1 = {};

Object.defineProperty(isObject$1, "__esModule", { value: true });
isObject$1.isObject = void 0;
function isObject(value) {
    return value !== null && typeof value === 'object';
}
isObject$1.isObject = isObject;

Object.defineProperty(oasOpFormDataConsumeCheck, "__esModule", { value: true });
const spectral_core_1 = require$$0;
const isObject_1 = isObject$1;
const validConsumeValue = /(application\/x-www-form-urlencoded|multipart\/form-data)/;
var _default = oasOpFormDataConsumeCheck.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            consumes: {
                type: 'array',
            },
            parameters: {
                type: 'array',
            },
        },
        required: ['consumes', 'parameters'],
    },
    options: null,
}, function oasOpFormDataConsumeCheck({ parameters, consumes }) {
    if (parameters.some(p => (0, isObject_1.isObject)(p) && p.in === 'formData') && !validConsumeValue.test(consumes === null || consumes === void 0 ? void 0 : consumes.join(','))) {
        return [
            {
                message: 'Consumes must include urlencoded, multipart, or form-data media type when using formData parameter.',
            },
        ];
    }
    return;
});

export { _default as default };
