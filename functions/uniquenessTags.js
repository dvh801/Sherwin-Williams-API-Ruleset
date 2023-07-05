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

var uniquenessTags = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(spectralCore);

Object.defineProperty(uniquenessTags, "__esModule", { value: true });
const spectral_core_1 = require$$0;
function getDuplicateTagsIndexes(tags) {
    return tags
        .map(item => item.name)
        .reduce((acc, item, i, arr) => {
        if (arr.indexOf(item) !== i) {
            acc.push(i);
        }
        return acc;
    }, []);
}
var _default = uniquenessTags.default = (0, spectral_core_1.createRulesetFunction)({
    input: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
            },
            required: ['name'],
        },
    },
    options: null,
}, function uniquenessTags(targetVal, _, ctx) {
    const duplicatedTags = getDuplicateTagsIndexes(targetVal);
    if (duplicatedTags.length === 0)
        return [];
    const results = [];
    for (const duplicatedIndex of duplicatedTags) {
        const duplicatedTag = targetVal[duplicatedIndex].name;
        results.push({
            message: `"tags" object contains duplicate tag name "${duplicatedTag}".`,
            path: [...ctx.path, duplicatedIndex, 'name'],
        });
    }
    return results;
});

export { _default as default };
