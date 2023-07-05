import * as spectralFormats from '@stoplight/spectral-formats';
import * as spectralRuntime from '@stoplight/spectral-runtime';
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

var typedEnum = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(spectralFormats);

var require$$1 = /*@__PURE__*/getAugmentedNamespace(spectralRuntime);

var require$$2 = /*@__PURE__*/getAugmentedNamespace(spectralCore);

Object.defineProperty(typedEnum, "__esModule", { value: true });
const spectral_formats_1 = require$$0;
const spectral_runtime_1 = require$$1;
const spectral_core_1 = require$$2;
function getDataType(input, checkForInteger) {
    const type = typeof input;
    switch (type) {
        case 'string':
        case 'boolean':
            return type;
        case 'number':
            if (checkForInteger && Number.isInteger(input)) {
                return 'integer';
            }
            return 'number';
        case 'object':
            if (input === null) {
                return 'null';
            }
            return Array.isArray(input) ? 'array' : 'object';
        default:
            throw TypeError('Unknown input type');
    }
}
function getTypes(input, formats) {
    const { type } = input;
    if ((input.nullable === true && (formats === null || formats === void 0 ? void 0 : formats.has(spectral_formats_1.oas3_0)) === true) ||
        (input['x-nullable'] === true && (formats === null || formats === void 0 ? void 0 : formats.has(spectral_formats_1.oas2)) === true)) {
        return Array.isArray(type) ? [...type, 'null'] : [type, 'null'];
    }
    return type;
}
var _default = typedEnum.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
        properties: {
            enum: {
                type: 'array',
            },
            type: {
                oneOf: [
                    {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    {
                        type: 'string',
                    },
                ],
            },
        },
        required: ['enum', 'type'],
    },
    options: null,
}, function typedEnum(input, opts, context) {
    const { enum: enumValues } = input;
    const type = getTypes(input, context.document.formats);
    const checkForInteger = type === 'integer' || (Array.isArray(type) && type.includes('integer'));
    let results;
    enumValues.forEach((value, i) => {
        const valueType = getDataType(value, checkForInteger);
        if (valueType === type || (Array.isArray(type) && type.includes(valueType))) {
            return;
        }
        results !== null && results !== void 0 ? results : (results = []);
        results.push({
            message: `Enum value ${(0, spectral_runtime_1.printValue)(enumValues[i])} must be "${String(type)}".`,
            path: [...context.path, 'enum', i],
        });
    });
    return results;
});

export { _default as default };
