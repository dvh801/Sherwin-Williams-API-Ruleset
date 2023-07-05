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

var oasDiscriminator = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(spectralCore);

var isObject$1 = {};

Object.defineProperty(isObject$1, "__esModule", { value: true });
isObject$1.isObject = void 0;
function isObject(value) {
    return value !== null && typeof value === 'object';
}
isObject$1.isObject = isObject;

Object.defineProperty(oasDiscriminator, "__esModule", { value: true });
const spectral_core_1 = require$$0;
const isObject_1 = isObject$1;
var _default = oasDiscriminator.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            discriminator: {
                type: 'string',
            },
        },
        required: ['discriminator'],
    },
    options: null,
}, function oasDiscriminator(schema, _opts, { path }) {
    const discriminatorName = schema.discriminator;
    const results = [];
    if (!(0, isObject_1.isObject)(schema.properties) || !Object.keys(schema.properties).some(k => k === discriminatorName)) {
        results.push({
            message: `The discriminator property must be defined in this schema.`,
            path: [...path, 'properties'],
        });
    }
    if (!Array.isArray(schema.required) || !schema.required.some(n => n === discriminatorName)) {
        results.push({
            message: `The discriminator property must be in the required property list.`,
            path: [...path, 'required'],
        });
    }
    return results;
});

export { _default as default };
