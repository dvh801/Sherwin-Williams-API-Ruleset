import * as spectralCore from '@stoplight/spectral-core';
import * as spectralFormats from '@stoplight/spectral-formats';

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

var oasOpSuccessResponse = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(spectralCore);

var require$$1 = /*@__PURE__*/getAugmentedNamespace(spectralFormats);

Object.defineProperty(oasOpSuccessResponse, "__esModule", { value: true });
const spectral_core_1 = require$$0;
const spectral_formats_1 = require$$1;
var _default = oasOpSuccessResponse.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'object',
    },
    options: null,
}, function oasOpSuccessResponse(input, opts, context) {
    var _a;
    const isOAS3X = ((_a = context.document.formats) === null || _a === void 0 ? void 0 : _a.has(spectral_formats_1.oas3)) === true;
    for (const response of Object.keys(input)) {
        if (isOAS3X && (response === '2XX' || response === '3XX')) {
            return;
        }
        if (Number(response) >= 200 && Number(response) < 400) {
            return;
        }
    }
    return [
        {
            message: 'Operation must define at least a single 2xx or 3xx response',
        },
    ];
});

export { _default as default };
