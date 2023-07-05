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

var oasOpParams = {};

var isObject$1 = {};

Object.defineProperty(isObject$1, "__esModule", { value: true });
isObject$1.isObject = void 0;
function isObject(value) {
    return value !== null && typeof value === 'object';
}
isObject$1.isObject = isObject;

var require$$1 = /*@__PURE__*/getAugmentedNamespace(spectralCore);

Object.defineProperty(oasOpParams, "__esModule", { value: true });
const isObject_1 = isObject$1;
const spectral_core_1 = require$$1;
function computeFingerprint(param) {
    return `${String(param.in)}-${String(param.name)}`;
}
var _default = oasOpParams.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'array',
    },
    options: null,
}, function oasOpParams(params, _opts, { path }) {
    if (!Array.isArray(params))
        return;
    if (params.length < 2)
        return;
    const results = [];
    const count = {
        body: [],
        formData: [],
    };
    const list = [];
    const duplicates = [];
    let index = -1;
    for (const param of params) {
        index++;
        if (!(0, isObject_1.isObject)(param))
            continue;
        if ('$ref' in param)
            continue;
        const fingerprint = computeFingerprint(param);
        if (list.includes(fingerprint)) {
            duplicates.push(index);
        }
        else {
            list.push(fingerprint);
        }
        if (typeof param.in === 'string' && param.in in count) {
            count[param.in].push(index);
        }
    }
    if (duplicates.length > 0) {
        for (const i of duplicates) {
            results.push({
                message: 'A parameter in this operation already exposes the same combination of "name" and "in" values.',
                path: [...path, i],
            });
        }
    }
    if (count.body.length > 0 && count.formData.length > 0) {
        results.push({
            message: 'Operation must not have both "in:body" and "in:formData" parameters.',
        });
    }
    if (count.body.length > 1) {
        for (let i = 1; i < count.body.length; i++) {
            results.push({
                message: 'Operation must not have more than a single instance of the "in:body" parameter.',
                path: [...path, count.body[i]],
            });
        }
    }
    return results;
});

export { _default as default };
