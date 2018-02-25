/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
if (process.env.NODE_ENV === 'production') {
    module.exports = __webpack_require__(17);
}
else {
    module.exports = __webpack_require__(18);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        }
        else {
            cachedSetTimeout = defaultSetTimout;
        }
    }
    catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        }
        else {
            cachedClearTimeout = defaultClearTimeout;
        }
    }
    catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
}());
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    }
    catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        }
        catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    }
    catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        }
        catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    }
    else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}
function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() { }
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) { return []; };
process.binding = function (name) {
    throw new Error('process.binding is not supported');
};
process.cwd = function () { return '/'; };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
function makeEmptyFunction(arg) {
    return function () {
        return arg;
    };
}
/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() { };
emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
    return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
};
module.exports = emptyFunction;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */
var validateFormat = function validateFormat(format) { };
if (process.env.NODE_ENV !== 'production') {
    validateFormat = function validateFormat(format) {
        if (format === undefined) {
            throw new Error('invariant requires an error message argument');
        }
    };
}
function invariant(condition, format, a, b, c, d, e, f) {
    validateFormat(format);
    if (!condition) {
        var error;
        if (format === undefined) {
            error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        }
        else {
            var args = [a, b, c, d, e, f];
            var argIndex = 0;
            error = new Error(format.replace(/%s/g, function () {
                return args[argIndex++];
            }));
            error.name = 'Invariant Violation';
        }
        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
    }
}
module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
    var list = [];
    // return the list of modules as css string
    list.toString = function toString() {
        return this.map(function (item) {
            var content = cssWithMappingToString(item, useSourceMap);
            if (item[2]) {
                return "@media " + item[2] + "{" + content + "}";
            }
            else {
                return content;
            }
        }).join("");
    };
    // import a list of modules into the list
    list.i = function (modules, mediaQuery) {
        if (typeof modules === "string")
            modules = [[null, modules, ""]];
        var alreadyImportedModules = {};
        for (var i = 0; i < this.length; i++) {
            var id = this[i][0];
            if (typeof id === "number")
                alreadyImportedModules[id] = true;
        }
        for (i = 0; i < modules.length; i++) {
            var item = modules[i];
            // skip already imported module
            // this implementation is not 100% perfect for weird media query combinations
            //  when a module is imported multiple times with different media queries.
            //  I hope this will never occur (Hey this way we have smaller bundles)
            if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
                if (mediaQuery && !item[2]) {
                    item[2] = mediaQuery;
                }
                else if (mediaQuery) {
                    item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
                }
                list.push(item);
            }
        }
    };
    return list;
};
function cssWithMappingToString(item, useSourceMap) {
    var content = item[1] || '';
    var cssMapping = item[3];
    if (!cssMapping) {
        return content;
    }
    if (useSourceMap && typeof btoa === 'function') {
        var sourceMapping = toComment(cssMapping);
        var sourceURLs = cssMapping.sources.map(function (source) {
            return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
        });
        return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
    }
    return [content].join('\n');
}
// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
    var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
    return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(21);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */
(function () {
    'use strict';
    var hasOwn = {}.hasOwnProperty;
    function classNames() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!arg)
                continue;
            var argType = typeof arg;
            if (argType === 'string' || argType === 'number') {
                classes.push(arg);
            }
            else if (Array.isArray(arg)) {
                classes.push(classNames.apply(null, arg));
            }
            else if (argType === 'object') {
                for (var key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
        return classes.join(' ');
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = classNames;
    }
    else if (true) {
        // register as 'classnames', consistent with npm package name
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return classNames;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else {
        window.classNames = classNames;
    }
}());


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}
function shouldUseNative() {
    try {
        if (!Object.assign) {
            return false;
        }
        // Detect buggy property enumeration order in older V8 versions.
        // https://bugs.chromium.org/p/v8/issues/detail?id=4118
        var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
        test1[5] = 'de';
        if (Object.getOwnPropertyNames(test1)[0] === '5') {
            return false;
        }
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test2 = {};
        for (var i = 0; i < 10; i++) {
            test2['_' + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
            return test2[n];
        });
        if (order2.join('') !== '0123456789') {
            return false;
        }
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test3 = {};
        'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
            test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join('') !==
            'abcdefghijklmnopqrst') {
            return false;
        }
        return true;
    }
    catch (err) {
        // We don't expect any of the above to throw, but better to be safe.
        return false;
    }
}
module.exports = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }
        if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }
    return to;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

var emptyFunction = __webpack_require__(2);
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
var warning = emptyFunction;
if (process.env.NODE_ENV !== 'production') {
    var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
            console.error(message);
        }
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
        }
        catch (x) { }
    };
    warning = function warning(condition, format) {
        if (format === undefined) {
            throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (format.indexOf('Failed Composite propType: ') === 0) {
            return; // Ignore CompositeComponent proptype check.
        }
        if (!condition) {
            for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                args[_key2 - 2] = arguments[_key2];
            }
            printWarning.apply(undefined, [format].concat(args));
        }
    };
}
module.exports = warning;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReactTableDefaults = undefined;
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
            break;
    }
}
catch (err) {
    _d = true;
    _e = err;
}
finally {
    try {
        if (!_n && _i["return"])
            _i["return"]();
    }
    finally {
        if (_d)
            throw _e;
    }
} return _arr; } return function (arr, i) { if (Array.isArray(arr)) {
    return arr;
}
else if (Symbol.iterator in Object(arr)) {
    return sliceIterator(arr, i);
}
else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
} }; }();
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
} return target; };
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} } return function (Constructor, protoProps, staticProps) { if (protoProps)
    defineProperties(Constructor.prototype, protoProps); if (staticProps)
    defineProperties(Constructor, staticProps); return Constructor; }; }();
var _react = __webpack_require__(0);
var _react2 = _interopRequireDefault(_react);
var _classnames = __webpack_require__(6);
var _classnames2 = _interopRequireDefault(_classnames);
var _utils = __webpack_require__(11);
var _utils2 = _interopRequireDefault(_utils);
var _lifecycle = __webpack_require__(30);
var _lifecycle2 = _interopRequireDefault(_lifecycle);
var _methods = __webpack_require__(31);
var _methods2 = _interopRequireDefault(_methods);
var _defaultProps = __webpack_require__(32);
var _defaultProps2 = _interopRequireDefault(_defaultProps);
var _propTypes = __webpack_require__(34);
var _propTypes2 = _interopRequireDefault(_propTypes);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
function _possibleConstructorReturn(self, call) { if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
} return call && (typeof call === "object" || typeof call === "function") ? call : self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
} subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//
var ReactTableDefaults = exports.ReactTableDefaults = _defaultProps2.default;
var ReactTable = function (_Methods) {
    _inherits(ReactTable, _Methods);
    function ReactTable(props) {
        _classCallCheck(this, ReactTable);
        var _this = _possibleConstructorReturn(this, (ReactTable.__proto__ || Object.getPrototypeOf(ReactTable)).call(this));
        _this.getResolvedState = _this.getResolvedState.bind(_this);
        _this.getDataModel = _this.getDataModel.bind(_this);
        _this.getSortedData = _this.getSortedData.bind(_this);
        _this.fireFetchData = _this.fireFetchData.bind(_this);
        _this.getPropOrState = _this.getPropOrState.bind(_this);
        _this.getStateOrProp = _this.getStateOrProp.bind(_this);
        _this.filterData = _this.filterData.bind(_this);
        _this.sortData = _this.sortData.bind(_this);
        _this.getMinRows = _this.getMinRows.bind(_this);
        _this.onPageChange = _this.onPageChange.bind(_this);
        _this.onPageSizeChange = _this.onPageSizeChange.bind(_this);
        _this.sortColumn = _this.sortColumn.bind(_this);
        _this.filterColumn = _this.filterColumn.bind(_this);
        _this.resizeColumnStart = _this.resizeColumnStart.bind(_this);
        _this.resizeColumnEnd = _this.resizeColumnEnd.bind(_this);
        _this.resizeColumnMoving = _this.resizeColumnMoving.bind(_this);
        _this.state = {
            page: 0,
            pageSize: props.defaultPageSize,
            sorted: props.defaultSorted,
            expanded: props.defaultExpanded,
            filtered: props.defaultFiltered,
            resized: props.defaultResized,
            currentlyResizing: false,
            skipNextSort: false
        };
        return _this;
    }
    _createClass(ReactTable, [{
            key: 'render',
            value: function render() {
                var _this2 = this;
                var resolvedState = this.getResolvedState();
                var children = resolvedState.children, className = resolvedState.className, style = resolvedState.style, getProps = resolvedState.getProps, getTableProps = resolvedState.getTableProps, getTheadGroupProps = resolvedState.getTheadGroupProps, getTheadGroupTrProps = resolvedState.getTheadGroupTrProps, getTheadGroupThProps = resolvedState.getTheadGroupThProps, getTheadProps = resolvedState.getTheadProps, getTheadTrProps = resolvedState.getTheadTrProps, getTheadThProps = resolvedState.getTheadThProps, getTheadFilterProps = resolvedState.getTheadFilterProps, getTheadFilterTrProps = resolvedState.getTheadFilterTrProps, getTheadFilterThProps = resolvedState.getTheadFilterThProps, getTbodyProps = resolvedState.getTbodyProps, getTrGroupProps = resolvedState.getTrGroupProps, getTrProps = resolvedState.getTrProps, getTdProps = resolvedState.getTdProps, getTfootProps = resolvedState.getTfootProps, getTfootTrProps = resolvedState.getTfootTrProps, getTfootTdProps = resolvedState.getTfootTdProps, getPaginationProps = resolvedState.getPaginationProps, getLoadingProps = resolvedState.getLoadingProps, getNoDataProps = resolvedState.getNoDataProps, getResizerProps = resolvedState.getResizerProps, showPagination = resolvedState.showPagination, showPaginationTop = resolvedState.showPaginationTop, showPaginationBottom = resolvedState.showPaginationBottom, manual = resolvedState.manual, loadingText = resolvedState.loadingText, noDataText = resolvedState.noDataText, sortable = resolvedState.sortable, multiSort = resolvedState.multiSort, resizable = resolvedState.resizable, filterable = resolvedState.filterable, pivotIDKey = resolvedState.pivotIDKey, pivotValKey = resolvedState.pivotValKey, pivotBy = resolvedState.pivotBy, subRowsKey = resolvedState.subRowsKey, aggregatedKey = resolvedState.aggregatedKey, originalKey = resolvedState.originalKey, indexKey = resolvedState.indexKey, groupedByPivotKey = resolvedState.groupedByPivotKey, loading = resolvedState.loading, pageSize = resolvedState.pageSize, page = resolvedState.page, sorted = resolvedState.sorted, filtered = resolvedState.filtered, resized = resolvedState.resized, expanded = resolvedState.expanded, pages = resolvedState.pages, onExpandedChange = resolvedState.onExpandedChange, TableComponent = resolvedState.TableComponent, TheadComponent = resolvedState.TheadComponent, TbodyComponent = resolvedState.TbodyComponent, TrGroupComponent = resolvedState.TrGroupComponent, TrComponent = resolvedState.TrComponent, ThComponent = resolvedState.ThComponent, TdComponent = resolvedState.TdComponent, TfootComponent = resolvedState.TfootComponent, PaginationComponent = resolvedState.PaginationComponent, LoadingComponent = resolvedState.LoadingComponent, SubComponent = resolvedState.SubComponent, NoDataComponent = resolvedState.NoDataComponent, ResizerComponent = resolvedState.ResizerComponent, ExpanderComponent = resolvedState.ExpanderComponent, PivotValueComponent = resolvedState.PivotValueComponent, PivotComponent = resolvedState.PivotComponent, AggregatedComponent = resolvedState.AggregatedComponent, FilterComponent = resolvedState.FilterComponent, PadRowComponent = resolvedState.PadRowComponent, resolvedData = resolvedState.resolvedData, allVisibleColumns = resolvedState.allVisibleColumns, headerGroups = resolvedState.headerGroups, hasHeaderGroups = resolvedState.hasHeaderGroups, sortedData = resolvedState.sortedData, currentlyResizing = resolvedState.currentlyResizing;
                // Pagination
                var startRow = pageSize * page;
                var endRow = startRow + pageSize;
                var pageRows = manual ? resolvedData : sortedData.slice(startRow, endRow);
                var minRows = this.getMinRows();
                var padRows = _utils2.default.range(Math.max(minRows - pageRows.length, 0));
                var hasColumnFooter = allVisibleColumns.some(function (d) {
                    return d.Footer;
                });
                var hasFilters = filterable || allVisibleColumns.some(function (d) {
                    return d.filterable;
                });
                var recurseRowsViewIndex = function recurseRowsViewIndex(rows) {
                    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
                    return [rows.map(function (row, i) {
                            index += 1;
                            var rowWithViewIndex = _extends({}, row, {
                                _viewIndex: index
                            });
                            var newPath = path.concat([i]);
                            if (rowWithViewIndex[subRowsKey] && _utils2.default.get(expanded, newPath)) {
                                var _recurseRowsViewIndex = recurseRowsViewIndex(rowWithViewIndex[subRowsKey], newPath, index);
                                var _recurseRowsViewIndex2 = _slicedToArray(_recurseRowsViewIndex, 2);
                                rowWithViewIndex[subRowsKey] = _recurseRowsViewIndex2[0];
                                index = _recurseRowsViewIndex2[1];
                            }
                            return rowWithViewIndex;
                        }), index];
                };
                var _recurseRowsViewIndex3 = recurseRowsViewIndex(pageRows);
                var _recurseRowsViewIndex4 = _slicedToArray(_recurseRowsViewIndex3, 1);
                pageRows = _recurseRowsViewIndex4[0];
                var canPrevious = page > 0;
                var canNext = page + 1 < pages;
                var rowMinWidth = _utils2.default.sum(allVisibleColumns.map(function (d) {
                    var resizedColumn = resized.find(function (x) {
                        return x.id === d.id;
                    }) || {};
                    return _utils2.default.getFirstDefined(resizedColumn.value, d.width, d.minWidth);
                }));
                var rowIndex = -1;
                var finalState = _extends({}, resolvedState, {
                    startRow: startRow,
                    endRow: endRow,
                    pageRows: pageRows,
                    minRows: minRows,
                    padRows: padRows,
                    hasColumnFooter: hasColumnFooter,
                    canPrevious: canPrevious,
                    canNext: canNext,
                    rowMinWidth: rowMinWidth
                });
                var rootProps = _utils2.default.splitProps(getProps(finalState, undefined, undefined, this));
                var tableProps = _utils2.default.splitProps(getTableProps(finalState, undefined, undefined, this));
                var tBodyProps = _utils2.default.splitProps(getTbodyProps(finalState, undefined, undefined, this));
                var loadingProps = getLoadingProps(finalState, undefined, undefined, this);
                var noDataProps = getNoDataProps(finalState, undefined, undefined, this);
                // Visual Components
                var makeHeaderGroup = function makeHeaderGroup(column, i) {
                    var resizedValue = function resizedValue(col) {
                        return (resized.find(function (x) {
                            return x.id === col.id;
                        }) || {}).value;
                    };
                    var flex = _utils2.default.sum(column.columns.map(function (col) {
                        return col.width || resizedValue(col) ? 0 : col.minWidth;
                    }));
                    var width = _utils2.default.sum(column.columns.map(function (col) {
                        return _utils2.default.getFirstDefined(resizedValue(col), col.width, col.minWidth);
                    }));
                    var maxWidth = _utils2.default.sum(column.columns.map(function (col) {
                        return _utils2.default.getFirstDefined(resizedValue(col), col.width, col.maxWidth);
                    }));
                    var theadGroupThProps = _utils2.default.splitProps(getTheadGroupThProps(finalState, undefined, column, _this2));
                    var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this2));
                    var classes = [column.headerClassName, theadGroupThProps.className, columnHeaderProps.className];
                    var styles = _extends({}, column.headerStyle, theadGroupThProps.style, columnHeaderProps.style);
                    var rest = _extends({}, theadGroupThProps.rest, columnHeaderProps.rest);
                    var flexStyles = {
                        flex: flex + ' 0 auto',
                        width: _utils2.default.asPx(width),
                        maxWidth: _utils2.default.asPx(maxWidth)
                    };
                    return _react2.default.createElement(ThComponent, _extends({
                        key: i + '-' + column.id,
                        className: (0, _classnames2.default)(classes),
                        style: _extends({}, styles, flexStyles)
                    }, rest), _utils2.default.normalizeComponent(column.Header, {
                        data: sortedData,
                        column: column
                    }));
                };
                var makeHeaderGroups = function makeHeaderGroups() {
                    var theadGroupProps = _utils2.default.splitProps(getTheadGroupProps(finalState, undefined, undefined, _this2));
                    var theadGroupTrProps = _utils2.default.splitProps(getTheadGroupTrProps(finalState, undefined, undefined, _this2));
                    return _react2.default.createElement(TheadComponent, _extends({
                        className: (0, _classnames2.default)('-headerGroups', theadGroupProps.className),
                        style: _extends({}, theadGroupProps.style, {
                            minWidth: rowMinWidth + 'px'
                        })
                    }, theadGroupProps.rest), _react2.default.createElement(TrComponent, _extends({
                        className: theadGroupTrProps.className,
                        style: theadGroupTrProps.style
                    }, theadGroupTrProps.rest), headerGroups.map(makeHeaderGroup)));
                };
                var makeHeader = function makeHeader(column, i) {
                    var resizedCol = resized.find(function (x) {
                        return x.id === column.id;
                    }) || {};
                    var sort = sorted.find(function (d) {
                        return d.id === column.id;
                    });
                    var show = typeof column.show === 'function' ? column.show() : column.show;
                    var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
                    var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
                    var theadThProps = _utils2.default.splitProps(getTheadThProps(finalState, undefined, column, _this2));
                    var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this2));
                    var classes = [column.headerClassName, theadThProps.className, columnHeaderProps.className];
                    var styles = _extends({}, column.headerStyle, theadThProps.style, columnHeaderProps.style);
                    var rest = _extends({}, theadThProps.rest, columnHeaderProps.rest);
                    var isResizable = _utils2.default.getFirstDefined(column.resizable, resizable, false);
                    var resizer = isResizable ? _react2.default.createElement(ResizerComponent, _extends({
                        onMouseDown: function onMouseDown(e) {
                            return _this2.resizeColumnStart(e, column, false);
                        },
                        onTouchStart: function onTouchStart(e) {
                            return _this2.resizeColumnStart(e, column, true);
                        }
                    }, getResizerProps('finalState', undefined, column, _this2))) : null;
                    var isSortable = _utils2.default.getFirstDefined(column.sortable, sortable, false);
                    return _react2.default.createElement(ThComponent, _extends({
                        key: i + '-' + column.id,
                        className: (0, _classnames2.default)(classes, isResizable && 'rt-resizable-header', sort ? sort.desc ? '-sort-desc' : '-sort-asc' : '', isSortable && '-cursor-pointer', !show && '-hidden', pivotBy && pivotBy.slice(0, -1).includes(column.id) && 'rt-header-pivot'),
                        style: _extends({}, styles, {
                            flex: width + ' 0 auto',
                            width: _utils2.default.asPx(width),
                            maxWidth: _utils2.default.asPx(maxWidth)
                        }),
                        toggleSort: function toggleSort(e) {
                            if (isSortable)
                                _this2.sortColumn(column, multiSort ? e.shiftKey : false);
                        }
                    }, rest), _react2.default.createElement('div', { className: (0, _classnames2.default)(isResizable && 'rt-resizable-header-content') }, _utils2.default.normalizeComponent(column.Header, {
                        data: sortedData,
                        column: column
                    })), resizer);
                };
                var makeHeaders = function makeHeaders() {
                    var theadProps = _utils2.default.splitProps(getTheadProps(finalState, undefined, undefined, _this2));
                    var theadTrProps = _utils2.default.splitProps(getTheadTrProps(finalState, undefined, undefined, _this2));
                    return _react2.default.createElement(TheadComponent, _extends({
                        className: (0, _classnames2.default)('-header', theadProps.className),
                        style: _extends({}, theadProps.style, {
                            minWidth: rowMinWidth + 'px'
                        })
                    }, theadProps.rest), _react2.default.createElement(TrComponent, _extends({
                        className: theadTrProps.className,
                        style: theadTrProps.style
                    }, theadTrProps.rest), allVisibleColumns.map(makeHeader)));
                };
                var makeFilter = function makeFilter(column, i) {
                    var resizedCol = resized.find(function (x) {
                        return x.id === column.id;
                    }) || {};
                    var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
                    var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
                    var theadFilterThProps = _utils2.default.splitProps(getTheadFilterThProps(finalState, undefined, column, _this2));
                    var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this2));
                    var classes = [column.headerClassName, theadFilterThProps.className, columnHeaderProps.className];
                    var styles = _extends({}, column.headerStyle, theadFilterThProps.style, columnHeaderProps.style);
                    var rest = _extends({}, theadFilterThProps.rest, columnHeaderProps.rest);
                    var filter = filtered.find(function (filter) {
                        return filter.id === column.id;
                    });
                    var ResolvedFilterComponent = column.Filter || FilterComponent;
                    var isFilterable = _utils2.default.getFirstDefined(column.filterable, filterable, false);
                    return _react2.default.createElement(ThComponent, _extends({
                        key: i + '-' + column.id,
                        className: (0, _classnames2.default)(classes),
                        style: _extends({}, styles, {
                            flex: width + ' 0 auto',
                            width: _utils2.default.asPx(width),
                            maxWidth: _utils2.default.asPx(maxWidth)
                        })
                    }, rest), isFilterable ? _utils2.default.normalizeComponent(ResolvedFilterComponent, {
                        column: column,
                        filter: filter,
                        onChange: function onChange(value) {
                            return _this2.filterColumn(column, value);
                        }
                    }, _defaultProps2.default.column.Filter) : null);
                };
                var makeFilters = function makeFilters() {
                    var theadFilterProps = _utils2.default.splitProps(getTheadFilterProps(finalState, undefined, undefined, _this2));
                    var theadFilterTrProps = _utils2.default.splitProps(getTheadFilterTrProps(finalState, undefined, undefined, _this2));
                    return _react2.default.createElement(TheadComponent, _extends({
                        className: (0, _classnames2.default)('-filters', theadFilterProps.className),
                        style: _extends({}, theadFilterProps.style, {
                            minWidth: rowMinWidth + 'px'
                        })
                    }, theadFilterProps.rest), _react2.default.createElement(TrComponent, _extends({
                        className: theadFilterTrProps.className,
                        style: theadFilterTrProps.style
                    }, theadFilterTrProps.rest), allVisibleColumns.map(makeFilter)));
                };
                var makePageRow = function makePageRow(row, i) {
                    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
                    var rowInfo = {
                        original: row[originalKey],
                        row: row,
                        index: row[indexKey],
                        viewIndex: rowIndex += 1,
                        pageSize: pageSize,
                        page: page,
                        level: path.length,
                        nestingPath: path.concat([i]),
                        aggregated: row[aggregatedKey],
                        groupedByPivot: row[groupedByPivotKey],
                        subRows: row[subRowsKey]
                    };
                    var isExpanded = _utils2.default.get(expanded, rowInfo.nestingPath);
                    var trGroupProps = getTrGroupProps(finalState, rowInfo, undefined, _this2);
                    var trProps = _utils2.default.splitProps(getTrProps(finalState, rowInfo, undefined, _this2));
                    return _react2.default.createElement(TrGroupComponent, _extends({ key: rowInfo.nestingPath.join('_') }, trGroupProps), _react2.default.createElement(TrComponent, _extends({
                        className: (0, _classnames2.default)(trProps.className, row._viewIndex % 2 ? '-even' : '-odd'),
                        style: trProps.style
                    }, trProps.rest), allVisibleColumns.map(function (column, i2) {
                        var resizedCol = resized.find(function (x) {
                            return x.id === column.id;
                        }) || {};
                        var show = typeof column.show === 'function' ? column.show() : column.show;
                        var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
                        var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
                        var tdProps = _utils2.default.splitProps(getTdProps(finalState, rowInfo, column, _this2));
                        var columnProps = _utils2.default.splitProps(column.getProps(finalState, rowInfo, column, _this2));
                        var classes = [tdProps.className, column.className, columnProps.className];
                        var styles = _extends({}, tdProps.style, column.style, columnProps.style);
                        var cellInfo = _extends({}, rowInfo, {
                            isExpanded: isExpanded,
                            column: _extends({}, column),
                            value: rowInfo.row[column.id],
                            pivoted: column.pivoted,
                            expander: column.expander,
                            resized: resized,
                            show: show,
                            width: width,
                            maxWidth: maxWidth,
                            tdProps: tdProps,
                            columnProps: columnProps,
                            classes: classes,
                            styles: styles
                        });
                        var value = cellInfo.value;
                        var useOnExpanderClick = void 0;
                        var isBranch = void 0;
                        var isPreview = void 0;
                        var onExpanderClick = function onExpanderClick(e) {
                            var newExpanded = _utils2.default.clone(expanded);
                            if (isExpanded) {
                                newExpanded = _utils2.default.set(newExpanded, cellInfo.nestingPath, false);
                            }
                            else {
                                newExpanded = _utils2.default.set(newExpanded, cellInfo.nestingPath, {});
                            }
                            return _this2.setStateWithData({
                                expanded: newExpanded
                            }, function () {
                                return onExpandedChange && onExpandedChange(newExpanded, cellInfo.nestingPath, e);
                            });
                        };
                        // Default to a standard cell
                        var resolvedCell = _utils2.default.normalizeComponent(column.Cell, cellInfo, value);
                        // Resolve Renderers
                        var ResolvedAggregatedComponent = column.Aggregated || (!column.aggregate ? AggregatedComponent : column.Cell);
                        var ResolvedExpanderComponent = column.Expander || ExpanderComponent;
                        var ResolvedPivotValueComponent = column.PivotValue || PivotValueComponent;
                        var DefaultResolvedPivotComponent = PivotComponent || function (props) {
                            return _react2.default.createElement('div', null, _react2.default.createElement(ResolvedExpanderComponent, props), _react2.default.createElement(ResolvedPivotValueComponent, props));
                        };
                        var ResolvedPivotComponent = column.Pivot || DefaultResolvedPivotComponent;
                        // Is this cell expandable?
                        if (cellInfo.pivoted || cellInfo.expander) {
                            // Make it expandable by defualt
                            cellInfo.expandable = true;
                            useOnExpanderClick = true;
                            // If pivoted, has no subRows, and does not have a subComponent,
                            // do not make expandable
                            if (cellInfo.pivoted && !cellInfo.subRows && !SubComponent) {
                                cellInfo.expandable = false;
                            }
                        }
                        if (cellInfo.pivoted) {
                            // Is this column a branch?
                            isBranch = rowInfo.row[pivotIDKey] === column.id && cellInfo.subRows;
                            // Should this column be blank?
                            isPreview = pivotBy.indexOf(column.id) > pivotBy.indexOf(rowInfo.row[pivotIDKey]) && cellInfo.subRows;
                            // Pivot Cell Render Override
                            if (isBranch) {
                                // isPivot
                                resolvedCell = _utils2.default.normalizeComponent(ResolvedPivotComponent, _extends({}, cellInfo, {
                                    value: row[pivotValKey]
                                }), row[pivotValKey]);
                            }
                            else if (isPreview) {
                                // Show the pivot preview
                                resolvedCell = _utils2.default.normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
                            }
                            else {
                                resolvedCell = null;
                            }
                        }
                        else if (cellInfo.aggregated) {
                            resolvedCell = _utils2.default.normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
                        }
                        if (cellInfo.expander) {
                            resolvedCell = _utils2.default.normalizeComponent(ResolvedExpanderComponent, cellInfo, row[pivotValKey]);
                            if (pivotBy) {
                                if (cellInfo.groupedByPivot) {
                                    resolvedCell = null;
                                }
                                if (!cellInfo.subRows && !SubComponent) {
                                    resolvedCell = null;
                                }
                            }
                        }
                        var resolvedOnExpanderClick = useOnExpanderClick ? onExpanderClick : function () { };
                        // If there are multiple onClick events, make sure they don't
                        // override eachother. This should maybe be expanded to handle all
                        // function attributes
                        var interactionProps = {
                            onClick: resolvedOnExpanderClick
                        };
                        if (tdProps.rest.onClick) {
                            interactionProps.onClick = function (e) {
                                tdProps.rest.onClick(e, function () {
                                    return resolvedOnExpanderClick(e);
                                });
                            };
                        }
                        if (columnProps.rest.onClick) {
                            interactionProps.onClick = function (e) {
                                columnProps.rest.onClick(e, function () {
                                    return resolvedOnExpanderClick(e);
                                });
                            };
                        }
                        // Return the cell
                        return _react2.default.createElement(TdComponent
                        // eslint-disable-next-line react/no-array-index-key
                        , _extends({ key: i2 + '-' + column.id,
                            className: (0, _classnames2.default)(classes, !show && 'hidden', cellInfo.expandable && 'rt-expandable', (isBranch || isPreview) && 'rt-pivot'),
                            style: _extends({}, styles, {
                                flex: width + ' 0 auto',
                                width: _utils2.default.asPx(width),
                                maxWidth: _utils2.default.asPx(maxWidth)
                            })
                        }, tdProps.rest, columnProps.rest, interactionProps), resolvedCell);
                    })), rowInfo.subRows && isExpanded && rowInfo.subRows.map(function (d, i) {
                        return makePageRow(d, i, rowInfo.nestingPath);
                    }), SubComponent && !rowInfo.subRows && isExpanded && SubComponent(rowInfo));
                };
                var makePadColumn = function makePadColumn(column, i) {
                    var resizedCol = resized.find(function (x) {
                        return x.id === column.id;
                    }) || {};
                    var show = typeof column.show === 'function' ? column.show() : column.show;
                    var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
                    var flex = width;
                    var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
                    var tdProps = _utils2.default.splitProps(getTdProps(finalState, undefined, column, _this2));
                    var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this2));
                    var classes = [tdProps.className, column.className, columnProps.className];
                    var styles = _extends({}, tdProps.style, column.style, columnProps.style);
                    return _react2.default.createElement(TdComponent, _extends({
                        key: i + '-' + column.id,
                        className: (0, _classnames2.default)(classes, !show && 'hidden'),
                        style: _extends({}, styles, {
                            flex: flex + ' 0 auto',
                            width: _utils2.default.asPx(width),
                            maxWidth: _utils2.default.asPx(maxWidth)
                        })
                    }, tdProps.rest), _utils2.default.normalizeComponent(PadRowComponent));
                };
                var makePadRow = function makePadRow(row, i) {
                    var trGroupProps = getTrGroupProps(finalState, undefined, undefined, _this2);
                    var trProps = _utils2.default.splitProps(getTrProps(finalState, undefined, undefined, _this2));
                    return _react2.default.createElement(TrGroupComponent, _extends({ key: i }, trGroupProps), _react2.default.createElement(TrComponent, {
                        className: (0, _classnames2.default)('-padRow', (pageRows.length + i) % 2 ? '-even' : '-odd', trProps.className),
                        style: trProps.style || {}
                    }, allVisibleColumns.map(makePadColumn)));
                };
                var makeColumnFooter = function makeColumnFooter(column, i) {
                    var resizedCol = resized.find(function (x) {
                        return x.id === column.id;
                    }) || {};
                    var show = typeof column.show === 'function' ? column.show() : column.show;
                    var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
                    var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
                    var tFootTdProps = _utils2.default.splitProps(getTfootTdProps(finalState, undefined, undefined, _this2));
                    var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this2));
                    var columnFooterProps = _utils2.default.splitProps(column.getFooterProps(finalState, undefined, column, _this2));
                    var classes = [tFootTdProps.className, column.className, columnProps.className, columnFooterProps.className];
                    var styles = _extends({}, tFootTdProps.style, column.style, columnProps.style, columnFooterProps.style);
                    return _react2.default.createElement(TdComponent, _extends({
                        key: i + '-' + column.id,
                        className: (0, _classnames2.default)(classes, !show && 'hidden'),
                        style: _extends({}, styles, {
                            flex: width + ' 0 auto',
                            width: _utils2.default.asPx(width),
                            maxWidth: _utils2.default.asPx(maxWidth)
                        })
                    }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest), _utils2.default.normalizeComponent(column.Footer, {
                        data: sortedData,
                        column: column
                    }));
                };
                var makeColumnFooters = function makeColumnFooters() {
                    var tFootProps = getTfootProps(finalState, undefined, undefined, _this2);
                    var tFootTrProps = _utils2.default.splitProps(getTfootTrProps(finalState, undefined, undefined, _this2));
                    return _react2.default.createElement(TfootComponent, _extends({
                        className: tFootProps.className,
                        style: _extends({}, tFootProps.style, {
                            minWidth: rowMinWidth + 'px'
                        })
                    }, tFootProps.rest), _react2.default.createElement(TrComponent, _extends({
                        className: (0, _classnames2.default)(tFootTrProps.className),
                        style: tFootTrProps.style
                    }, tFootTrProps.rest), allVisibleColumns.map(makeColumnFooter)));
                };
                var makePagination = function makePagination() {
                    var paginationProps = _utils2.default.splitProps(getPaginationProps(finalState, undefined, undefined, _this2));
                    return _react2.default.createElement(PaginationComponent, _extends({}, resolvedState, {
                        pages: pages,
                        canPrevious: canPrevious,
                        canNext: canNext,
                        onPageChange: _this2.onPageChange,
                        onPageSizeChange: _this2.onPageSizeChange,
                        className: paginationProps.className,
                        style: paginationProps.style
                    }, paginationProps.rest));
                };
                var makeTable = function makeTable() {
                    var pagination = makePagination();
                    return _react2.default.createElement('div', _extends({
                        className: (0, _classnames2.default)('ReactTable', className, rootProps.className),
                        style: _extends({}, style, rootProps.style)
                    }, rootProps.rest), showPagination && showPaginationTop ? _react2.default.createElement('div', { className: 'pagination-top' }, pagination) : null, _react2.default.createElement(TableComponent, _extends({
                        className: (0, _classnames2.default)(tableProps.className, currentlyResizing ? 'rt-resizing' : ''),
                        style: tableProps.style
                    }, tableProps.rest), hasHeaderGroups ? makeHeaderGroups() : null, makeHeaders(), hasFilters ? makeFilters() : null, _react2.default.createElement(TbodyComponent, _extends({
                        className: (0, _classnames2.default)(tBodyProps.className),
                        style: _extends({}, tBodyProps.style, {
                            minWidth: rowMinWidth + 'px'
                        })
                    }, tBodyProps.rest), pageRows.map(function (d, i) {
                        return makePageRow(d, i);
                    }), padRows.map(makePadRow)), hasColumnFooter ? makeColumnFooters() : null), showPagination && showPaginationBottom ? _react2.default.createElement('div', { className: 'pagination-bottom' }, pagination) : null, !pageRows.length && _react2.default.createElement(NoDataComponent, noDataProps, _utils2.default.normalizeComponent(noDataText)), _react2.default.createElement(LoadingComponent, _extends({
                        loading: loading,
                        loadingText: loadingText
                    }, loadingProps)));
                };
                // childProps are optionally passed to a function-as-a-child
                return children ? children(finalState, makeTable, this) : makeTable();
            }
        }]);
    return ReactTable;
}((0, _methods2.default)((0, _lifecycle2.default)(_react.Component)));
ReactTable.propTypes = _propTypes2.default;
ReactTable.defaultProps = _defaultProps2.default;
exports.default = ReactTable;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
} return target; };
var _react = __webpack_require__(0);
var _react2 = _interopRequireDefault(_react);
var _classnames = __webpack_require__(6);
var _classnames2 = _interopRequireDefault(_classnames);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) {
    if (keys.indexOf(i) >= 0)
        continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
    target[i] = obj[i];
} return target; }
//
exports.default = {
    get: get,
    set: set,
    takeRight: takeRight,
    last: last,
    orderBy: orderBy,
    range: range,
    remove: remove,
    clone: clone,
    getFirstDefined: getFirstDefined,
    sum: sum,
    makeTemplateComponent: makeTemplateComponent,
    groupBy: groupBy,
    isArray: isArray,
    splitProps: splitProps,
    compactObject: compactObject,
    isSortingDesc: isSortingDesc,
    normalizeComponent: normalizeComponent,
    asPx: asPx
};
function get(obj, path, def) {
    if (!path) {
        return obj;
    }
    var pathObj = makePathArray(path);
    var val = void 0;
    try {
        val = pathObj.reduce(function (current, pathPart) {
            return current[pathPart];
        }, obj);
    }
    catch (e) {
        // continue regardless of error
    }
    return typeof val !== 'undefined' ? val : def;
}
function set() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var path = arguments[1];
    var value = arguments[2];
    var keys = makePathArray(path);
    var keyPart = void 0;
    var cursor = obj;
    while ((keyPart = keys.shift()) && keys.length) {
        if (!cursor[keyPart]) {
            cursor[keyPart] = {};
        }
        cursor = cursor[keyPart];
    }
    cursor[keyPart] = value;
    return obj;
}
function takeRight(arr, n) {
    var start = n > arr.length ? 0 : arr.length - n;
    return arr.slice(start);
}
function last(arr) {
    return arr[arr.length - 1];
}
function range(n) {
    var arr = [];
    for (var i = 0; i < n; i += 1) {
        arr.push(n);
    }
    return arr;
}
function orderBy(arr, funcs, dirs, indexKey) {
    return arr.sort(function (rowA, rowB) {
        for (var i = 0; i < funcs.length; i += 1) {
            var comp = funcs[i];
            var desc = dirs[i] === false || dirs[i] === 'desc';
            var sortInt = comp(rowA, rowB);
            if (sortInt) {
                return desc ? -sortInt : sortInt;
            }
        }
        // Use the row index for tie breakers
        return dirs[0] ? rowA[indexKey] - rowB[indexKey] : rowB[indexKey] - rowA[indexKey];
    });
}
function remove(a, b) {
    return a.filter(function (o, i) {
        var r = b(o);
        if (r) {
            a.splice(i, 1);
            return true;
        }
        return false;
    });
}
function clone(a) {
    try {
        return JSON.parse(JSON.stringify(a, function (key, value) {
            if (typeof value === 'function') {
                return value.toString();
            }
            return value;
        }));
    }
    catch (e) {
        return a;
    }
}
function getFirstDefined() {
    for (var i = 0; i < arguments.length; i += 1) {
        if (typeof (arguments.length <= i ? undefined : arguments[i]) !== 'undefined') {
            return arguments.length <= i ? undefined : arguments[i];
        }
    }
}
function sum(arr) {
    return arr.reduce(function (a, b) {
        return a + b;
    }, 0);
}
function makeTemplateComponent(compClass, displayName) {
    if (!displayName) {
        throw new Error('No displayName found for template component:', compClass);
    }
    var cmp = function cmp(_ref) {
        var children = _ref.children, className = _ref.className, rest = _objectWithoutProperties(_ref, ['children', 'className']);
        return _react2.default.createElement('div', _extends({ className: (0, _classnames2.default)(compClass, className) }, rest), children);
    };
    cmp.displayName = displayName;
    return cmp;
}
function groupBy(xs, key) {
    return xs.reduce(function (rv, x, i) {
        var resKey = typeof key === 'function' ? key(x, i) : x[key];
        rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
        rv[resKey].push(x);
        return rv;
    }, {});
}
function asPx(value) {
    value = Number(value);
    return Number.isNaN(value) ? null : value + 'px';
}
function isArray(a) {
    return Array.isArray(a);
}
// ########################################################################
// Non-exported Helpers
// ########################################################################
function makePathArray(obj) {
    return flattenDeep(obj).join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
}
function flattenDeep(arr) {
    var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (!isArray(arr)) {
        newArr.push(arr);
    }
    else {
        for (var i = 0; i < arr.length; i += 1) {
            flattenDeep(arr[i], newArr);
        }
    }
    return newArr;
}
function splitProps(_ref2) {
    var className = _ref2.className, style = _ref2.style, rest = _objectWithoutProperties(_ref2, ['className', 'style']);
    return {
        className: className,
        style: style,
        rest: rest || {}
    };
}
function compactObject(obj) {
    var newObj = {};
    if (obj) {
        Object.keys(obj).map(function (key) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined && typeof obj[key] !== 'undefined') {
                newObj[key] = obj[key];
            }
            return true;
        });
    }
    return newObj;
}
function isSortingDesc(d) {
    return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}
function normalizeComponent(Comp) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Comp;
    return typeof Comp === 'function' ? Object.getPrototypeOf(Comp).isReactComponent ? _react2.default.createElement(Comp, params) : Comp(params) : fallback;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../css-loader/index.js!./react-table.css", function() {
			var newContent = require("!!../css-loader/index.js!./react-table.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

var emptyObject = {};
if (process.env.NODE_ENV !== 'production') {
    Object.freeze(emptyObject);
}
module.exports = emptyObject;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
    var invariant = __webpack_require__(3);
    var warning = __webpack_require__(8);
    var ReactPropTypesSecret = __webpack_require__(9);
    var loggedTypeFailures = {};
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if (process.env.NODE_ENV !== 'production') {
        for (var typeSpecName in typeSpecs) {
            if (typeSpecs.hasOwnProperty(typeSpecName)) {
                var error;
                // Prop type validation may throw. In case they do, we don't want to
                // fail the render phase where it didn't fail before. So we log it.
                // After these have been cleaned up, we'll let them throw.
                try {
                    // This is intentionally an invariant that gets caught. It's the same
                    // behavior as without this statement except with a better message.
                    invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
                    error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
                }
                catch (ex) {
                    error = ex;
                }
                warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
                if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                    // Only monitor this failure once because there tends to be a lot of the
                    // same error.
                    loggedTypeFailures[error.message] = true;
                    var stack = getStack ? getStack() : '';
                    warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
                }
            }
        }
    }
}
module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./Plan.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./Plan.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
//import logo from './logo.svg';
__webpack_require__(19);
//import { GraphicComponent } from './pages/GraphicComponent.jsx';
var DashBoard_jsx_1 = __webpack_require__(22);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "App" },
            react_1.default.createElement(DashBoard_jsx_1.DashBoard, null)));
    };
    return App;
}(react_1.Component));
exports.default = App;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var m = __webpack_require__(7), n = __webpack_require__(13), p = __webpack_require__(2), q = "function" === typeof Symbol && Symbol["for"], r = q ? Symbol["for"]("react.element") : 60103, t = q ? Symbol["for"]("react.call") : 60104, u = q ? Symbol["for"]("react.return") : 60105, v = q ? Symbol["for"]("react.portal") : 60106, w = q ? Symbol["for"]("react.fragment") : 60107, x = "function" === typeof Symbol && Symbol.iterator;
function y(a) { for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++)
    e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]); b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."); b.name = "Invariant Violation"; b.framesToPop = 1; throw b; }
var z = { isMounted: function () { return !1; }, enqueueForceUpdate: function () { }, enqueueReplaceState: function () { }, enqueueSetState: function () { } };
function A(a, b, e) { this.props = a; this.context = b; this.refs = n; this.updater = e || z; }
A.prototype.isReactComponent = {};
A.prototype.setState = function (a, b) { "object" !== typeof a && "function" !== typeof a && null != a ? y("85") : void 0; this.updater.enqueueSetState(this, a, b, "setState"); };
A.prototype.forceUpdate = function (a) { this.updater.enqueueForceUpdate(this, a, "forceUpdate"); };
function B(a, b, e) { this.props = a; this.context = b; this.refs = n; this.updater = e || z; }
function C() { }
C.prototype = A.prototype;
var D = B.prototype = new C;
D.constructor = B;
m(D, A.prototype);
D.isPureReactComponent = !0;
function E(a, b, e) { this.props = a; this.context = b; this.refs = n; this.updater = e || z; }
var F = E.prototype = new C;
F.constructor = E;
m(F, A.prototype);
F.unstable_isAsyncReactComponent = !0;
F.render = function () { return this.props.children; };
var G = { current: null }, H = Object.prototype.hasOwnProperty, I = { key: !0, ref: !0, __self: !0, __source: !0 };
function J(a, b, e) { var c, d = {}, g = null, k = null; if (null != b)
    for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b)
        H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]); var f = arguments.length - 2; if (1 === f)
    d.children = e;
else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++)
        h[l] = arguments[l + 2];
    d.children = h;
} if (a && a.defaultProps)
    for (c in f = a.defaultProps, f)
        void 0 === d[c] && (d[c] = f[c]); return { $$typeof: r, type: a, key: g, ref: k, props: d, _owner: G.current }; }
function K(a) { return "object" === typeof a && null !== a && a.$$typeof === r; }
function escape(a) { var b = { "\x3d": "\x3d0", ":": "\x3d2" }; return "$" + ("" + a).replace(/[=:]/g, function (a) { return b[a]; }); }
var L = /\/+/g, M = [];
function N(a, b, e, c) { if (M.length) {
    var d = M.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = e;
    d.context = c;
    d.count = 0;
    return d;
} return { result: a, keyPrefix: b, func: e, context: c, count: 0 }; }
function O(a) { a.result = null; a.keyPrefix = null; a.func = null; a.context = null; a.count = 0; 10 > M.length && M.push(a); }
function P(a, b, e, c) {
    var d = typeof a;
    if ("undefined" === d || "boolean" === d)
        a = null;
    var g = !1;
    if (null === a)
        g = !0;
    else
        switch (d) {
            case "string":
            case "number":
                g = !0;
                break;
            case "object": switch (a.$$typeof) {
                case r:
                case t:
                case u:
                case v: g = !0;
            }
        }
    if (g)
        return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;
    g = 0;
    b = "" === b ? "." : b + ":";
    if (Array.isArray(a))
        for (var k = 0; k < a.length; k++) {
            d = a[k];
            var f = b + Q(d, k);
            g += P(d, f, e, c);
        }
    else if (null === a || "undefined" === typeof a ? f = null : (f = x && a[x] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f)
        for (a =
            f.call(a), k = 0; !(d = a.next()).done;)
            d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);
    else
        "object" === d && (e = "" + a, y("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
    return g;
}
function Q(a, b) { return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36); }
function R(a, b) { a.func.call(a.context, b, a.count++); }
function S(a, b, e) { var c = a.result, d = a.keyPrefix; a = a.func.call(a.context, b, a.count++); Array.isArray(a) ? T(a, c, e, p.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = { $$typeof: r, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner }), c.push(a)); }
function T(a, b, e, c, d) { var g = ""; null != e && (g = ("" + e).replace(L, "$\x26/") + "/"); b = N(b, g, c, d); null == a || P(a, "", S, b); O(b); }
var U = { Children: { map: function (a, b, e) { if (null == a)
            return a; var c = []; T(a, c, null, b, e); return c; }, forEach: function (a, b, e) { if (null == a)
            return a; b = N(null, null, b, e); null == a || P(a, "", R, b); O(b); }, count: function (a) { return null == a ? 0 : P(a, "", p.thatReturnsNull, null); }, toArray: function (a) { var b = []; T(a, b, null, p.thatReturnsArgument); return b; }, only: function (a) { K(a) ? void 0 : y("143"); return a; } }, Component: A, PureComponent: B, unstable_AsyncComponent: E, Fragment: w, createElement: J, cloneElement: function (a, b, e) {
        var c = m({}, a.props), d = a.key, g = a.ref, k = a._owner;
        if (null != b) {
            void 0 !== b.ref && (g = b.ref, k = G.current);
            void 0 !== b.key && (d = "" + b.key);
            if (a.type && a.type.defaultProps)
                var f = a.type.defaultProps;
            for (h in b)
                H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
        }
        var h = arguments.length - 2;
        if (1 === h)
            c.children = e;
        else if (1 < h) {
            f = Array(h);
            for (var l = 0; l < h; l++)
                f[l] = arguments[l + 2];
            c.children = f;
        }
        return { $$typeof: r, type: a.type, key: d, ref: g, props: c, _owner: k };
    }, createFactory: function (a) { var b = J.bind(null, a); b.type = a; return b; },
    isValidElement: K, version: "16.2.0", __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: G, assign: m } }, V = Object.freeze({ default: U }), W = V && U || V;
module.exports = W["default"] ? W["default"] : W;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== "production") {
    (function () {
        'use strict';
        var _assign = __webpack_require__(7);
        var emptyObject = __webpack_require__(13);
        var invariant = __webpack_require__(3);
        var warning = __webpack_require__(8);
        var emptyFunction = __webpack_require__(2);
        var checkPropTypes = __webpack_require__(14);
        // TODO: this is special because it gets imported during build.
        var ReactVersion = '16.2.0';
        // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
        // nor polyfill, then a plain number is used for performance.
        var hasSymbol = typeof Symbol === 'function' && Symbol['for'];
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
        var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
        var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
        var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = '@@iterator';
        function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable === 'undefined') {
                return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === 'function') {
                return maybeIterator;
            }
            return null;
        }
        /**
         * WARNING: DO NOT manually require this module.
         * This is a replacement for `invariant(...)` used by the error code system
         * and will _only_ be required by the corresponding babel pass.
         * It always throws.
         */
        /**
         * Forked from fbjs/warning:
         * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
         *
         * Only change is we use console.warn instead of console.error,
         * and do nothing when 'console' is not supported.
         * This really simplifies the code.
         * ---
         * Similar to invariant but only logs a warning if the condition is not met.
         * This can be used to log issues in development environments in critical
         * paths. Removing the logging code for production environments will keep the
         * same logic and follow the same code paths.
         */
        var lowPriorityWarning = function () { };
        {
            var printWarning = function (format) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }
                var argIndex = 0;
                var message = 'Warning: ' + format.replace(/%s/g, function () {
                    return args[argIndex++];
                });
                if (typeof console !== 'undefined') {
                    console.warn(message);
                }
                try {
                    // --- Welcome to debugging React ---
                    // This error was thrown as a convenience so that you can use this stack
                    // to find the callsite that caused this warning to fire.
                    throw new Error(message);
                }
                catch (x) { }
            };
            lowPriorityWarning = function (condition, format) {
                if (format === undefined) {
                    throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
                }
                if (!condition) {
                    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                        args[_key2 - 2] = arguments[_key2];
                    }
                    printWarning.apply(undefined, [format].concat(args));
                }
            };
        }
        var lowPriorityWarning$1 = lowPriorityWarning;
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
            {
                var constructor = publicInstance.constructor;
                var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
                var warningKey = componentName + '.' + callerName;
                if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                    return;
                }
                warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
                didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
        }
        /**
         * This is the abstract API for an update queue.
         */
        var ReactNoopUpdateQueue = {
            /**
             * Checks whether or not this composite component is mounted.
             * @param {ReactClass} publicInstance The instance we want to test.
             * @return {boolean} True if mounted, false otherwise.
             * @protected
             * @final
             */
            isMounted: function (publicInstance) {
                return false;
            },
            /**
             * Forces an update. This should only be invoked when it is known with
             * certainty that we are **not** in a DOM transaction.
             *
             * You may want to call this when you know that some deeper aspect of the
             * component's state has changed but `setState` was not called.
             *
             * This will not invoke `shouldComponentUpdate`, but it will invoke
             * `componentWillUpdate` and `componentDidUpdate`.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueForceUpdate: function (publicInstance, callback, callerName) {
                warnNoop(publicInstance, 'forceUpdate');
            },
            /**
             * Replaces all of the state. Always use this or `setState` to mutate state.
             * You should treat `this.state` as immutable.
             *
             * There is no guarantee that `this.state` will be immediately updated, so
             * accessing `this.state` after calling this method may return the old value.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} completeState Next state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
                warnNoop(publicInstance, 'replaceState');
            },
            /**
             * Sets a subset of the state. This only exists because _pendingState is
             * internal. This provides a merging strategy that is not available to deep
             * properties which is confusing. TODO: Expose pendingState or don't use it
             * during the merge.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} partialState Next partial state to be merged with state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} Name of the calling function in the public API.
             * @internal
             */
            enqueueSetState: function (publicInstance, partialState, callback, callerName) {
                warnNoop(publicInstance, 'setState');
            }
        };
        /**
         * Base class helpers for the updating state of a component.
         */
        function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            // We initialize the default updater but the real one gets injected by the
            // renderer.
            this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        /**
         * Sets a subset of the state. Always use this to mutate
         * state. You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * There is no guarantee that calls to `setState` will run synchronously,
         * as they may eventually be batched together.  You can provide an optional
         * callback that will be executed when the call to setState is actually
         * completed.
         *
         * When a function is provided to setState, it will be called at some point in
         * the future (not synchronously). It will be called with the up to date
         * component arguments (state, props, context). These values can be different
         * from this.* because your function may be called after receiveProps but before
         * shouldComponentUpdate, and this new state, props, and context will not yet be
         * assigned to this.
         *
         * @param {object|function} partialState Next partial state or function to
         *        produce next partial state to be merged with current state.
         * @param {?function} callback Called after state is updated.
         * @final
         * @protected
         */
        Component.prototype.setState = function (partialState, callback) {
            !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
            this.updater.enqueueSetState(this, partialState, callback, 'setState');
        };
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {?function} callback Called after update is complete.
         * @final
         * @protected
         */
        Component.prototype.forceUpdate = function (callback) {
            this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
        };
        /**
         * Deprecated APIs. These APIs used to exist on classic React classes but since
         * we would like to deprecate them, we're not going to move them over to this
         * modern base class. Instead, we define a getter that warns if it's accessed.
         */
        {
            var deprecatedAPIs = {
                isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
                replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
            };
            var defineDeprecationWarning = function (methodName, info) {
                Object.defineProperty(Component.prototype, methodName, {
                    get: function () {
                        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
                        return undefined;
                    }
                });
            };
            for (var fnName in deprecatedAPIs) {
                if (deprecatedAPIs.hasOwnProperty(fnName)) {
                    defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
                }
            }
        }
        /**
         * Base class helpers for the updating state of a component.
         */
        function PureComponent(props, context, updater) {
            // Duplicated from Component.
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            // We initialize the default updater but the real one gets injected by the
            // renderer.
            this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() { }
        ComponentDummy.prototype = Component.prototype;
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        // Avoid an extra prototype jump for these methods.
        _assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function AsyncComponent(props, context, updater) {
            // Duplicated from Component.
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            // We initialize the default updater but the real one gets injected by the
            // renderer.
            this.updater = updater || ReactNoopUpdateQueue;
        }
        var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
        asyncComponentPrototype.constructor = AsyncComponent;
        // Avoid an extra prototype jump for these methods.
        _assign(asyncComponentPrototype, Component.prototype);
        asyncComponentPrototype.unstable_isAsyncReactComponent = true;
        asyncComponentPrototype.render = function () {
            return this.props.children;
        };
        /**
         * Keeps track of the current owner.
         *
         * The current owner is the component who should own any components that are
         * currently being constructed.
         */
        var ReactCurrentOwner = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
        };
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        function hasValidRef(config) {
            {
                if (hasOwnProperty.call(config, 'ref')) {
                    var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
                    if (getter && getter.isReactWarning) {
                        return false;
                    }
                }
            }
            return config.ref !== undefined;
        }
        function hasValidKey(config) {
            {
                if (hasOwnProperty.call(config, 'key')) {
                    var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
                    if (getter && getter.isReactWarning) {
                        return false;
                    }
                }
            }
            return config.key !== undefined;
        }
        function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function () {
                if (!specialPropKeyWarningShown) {
                    specialPropKeyWarningShown = true;
                    warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
                }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, 'key', {
                get: warnAboutAccessingKey,
                configurable: true
            });
        }
        function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function () {
                if (!specialPropRefWarningShown) {
                    specialPropRefWarningShown = true;
                    warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
                }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, 'ref', {
                get: warnAboutAccessingRef,
                configurable: true
            });
        }
        /**
         * Factory method to create a new React element. This no longer adheres to
         * the class pattern, so do not use new to call it. Also, no instanceof check
         * will work. Instead test $$typeof field against Symbol.for('react.element') to check
         * if something is a React Element.
         *
         * @param {*} type
         * @param {*} key
         * @param {string|object} ref
         * @param {*} self A *temporary* helper to detect places where `this` is
         * different from the `owner` when React.createElement is called, so that we
         * can warn. We want to get rid of owner and replace string `ref`s with arrow
         * functions, and as long as `this` and owner are the same, there will be no
         * change in behavior.
         * @param {*} source An annotation object (added by a transpiler or otherwise)
         * indicating filename, line number, and/or other information.
         * @param {*} owner
         * @param {*} props
         * @internal
         */
        var ReactElement = function (type, key, ref, self, source, owner, props) {
            var element = {
                // This tag allow us to uniquely identify this as a React Element
                $$typeof: REACT_ELEMENT_TYPE,
                // Built-in properties that belong on the element
                type: type,
                key: key,
                ref: ref,
                props: props,
                // Record the component responsible for creating this element.
                _owner: owner
            };
            {
                // The validation flag is currently mutative. We put it on
                // an external backing store so that we can freeze the whole object.
                // This can be replaced with a WeakMap once they are implemented in
                // commonly used development environments.
                element._store = {};
                // To make comparing ReactElements easier for testing purposes, we make
                // the validation flag non-enumerable (where possible, which should
                // include every environment we run tests in), so the test framework
                // ignores it.
                Object.defineProperty(element._store, 'validated', {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: false
                });
                // self and source are DEV only properties.
                Object.defineProperty(element, '_self', {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: self
                });
                // Two elements created in two different places should be considered
                // equal for testing purposes and therefore we hide it from enumeration.
                Object.defineProperty(element, '_source', {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: source
                });
                if (Object.freeze) {
                    Object.freeze(element.props);
                    Object.freeze(element);
                }
            }
            return element;
        };
        /**
         * Create and return a new ReactElement of the given type.
         * See https://reactjs.org/docs/react-api.html#createelement
         */
        function createElement(type, config, children) {
            var propName;
            // Reserved names are extracted
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config != null) {
                if (hasValidRef(config)) {
                    ref = config.ref;
                }
                if (hasValidKey(config)) {
                    key = '' + config.key;
                }
                self = config.__self === undefined ? null : config.__self;
                source = config.__source === undefined ? null : config.__source;
                // Remaining properties are added to a new props object
                for (propName in config) {
                    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                        props[propName] = config[propName];
                    }
                }
            }
            // Children can be more than one argument, and those are transferred onto
            // the newly allocated props object.
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
                props.children = children;
            }
            else if (childrenLength > 1) {
                var childArray = Array(childrenLength);
                for (var i = 0; i < childrenLength; i++) {
                    childArray[i] = arguments[i + 2];
                }
                {
                    if (Object.freeze) {
                        Object.freeze(childArray);
                    }
                }
                props.children = childArray;
            }
            // Resolve default props
            if (type && type.defaultProps) {
                var defaultProps = type.defaultProps;
                for (propName in defaultProps) {
                    if (props[propName] === undefined) {
                        props[propName] = defaultProps[propName];
                    }
                }
            }
            {
                if (key || ref) {
                    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
                        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
                        if (key) {
                            defineKeyPropWarningGetter(props, displayName);
                        }
                        if (ref) {
                            defineRefPropWarningGetter(props, displayName);
                        }
                    }
                }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        /**
         * Return a function that produces ReactElements of a given type.
         * See https://reactjs.org/docs/react-api.html#createfactory
         */
        function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
        }
        /**
         * Clone and return a new ReactElement using element as the starting point.
         * See https://reactjs.org/docs/react-api.html#cloneelement
         */
        function cloneElement(element, config, children) {
            var propName;
            // Original props are copied
            var props = _assign({}, element.props);
            // Reserved names are extracted
            var key = element.key;
            var ref = element.ref;
            // Self is preserved since the owner is preserved.
            var self = element._self;
            // Source is preserved since cloneElement is unlikely to be targeted by a
            // transpiler, and the original source is probably a better indicator of the
            // true owner.
            var source = element._source;
            // Owner will be preserved, unless ref is overridden
            var owner = element._owner;
            if (config != null) {
                if (hasValidRef(config)) {
                    // Silently steal the ref from the parent.
                    ref = config.ref;
                    owner = ReactCurrentOwner.current;
                }
                if (hasValidKey(config)) {
                    key = '' + config.key;
                }
                // Remaining properties override existing props
                var defaultProps;
                if (element.type && element.type.defaultProps) {
                    defaultProps = element.type.defaultProps;
                }
                for (propName in config) {
                    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                        if (config[propName] === undefined && defaultProps !== undefined) {
                            // Resolve default props
                            props[propName] = defaultProps[propName];
                        }
                        else {
                            props[propName] = config[propName];
                        }
                    }
                }
            }
            // Children can be more than one argument, and those are transferred onto
            // the newly allocated props object.
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
                props.children = children;
            }
            else if (childrenLength > 1) {
                var childArray = Array(childrenLength);
                for (var i = 0; i < childrenLength; i++) {
                    childArray[i] = arguments[i + 2];
                }
                props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        /**
         * Verifies the object is a ReactElement.
         * See https://reactjs.org/docs/react-api.html#isvalidelement
         * @param {?object} object
         * @return {boolean} True if `object` is a valid component.
         * @final
         */
        function isValidElement(object) {
            return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var ReactDebugCurrentFrame = {};
        {
            // Component that is being worked on
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function () {
                var impl = ReactDebugCurrentFrame.getCurrentStack;
                if (impl) {
                    return impl();
                }
                return null;
            };
        }
        var SEPARATOR = '.';
        var SUBSEPARATOR = ':';
        /**
         * Escape and wrap key so it is safe to use as a reactid
         *
         * @param {string} key to be escaped.
         * @return {string} the escaped key.
         */
        function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
                '=': '=0',
                ':': '=2'
            };
            var escapedString = ('' + key).replace(escapeRegex, function (match) {
                return escaperLookup[match];
            });
            return '$' + escapedString;
        }
        /**
         * TODO: Test that a single child and an array with one item have the same key
         * pattern.
         */
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
            return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
        }
        var POOL_SIZE = 10;
        var traverseContextPool = [];
        function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
            if (traverseContextPool.length) {
                var traverseContext = traverseContextPool.pop();
                traverseContext.result = mapResult;
                traverseContext.keyPrefix = keyPrefix;
                traverseContext.func = mapFunction;
                traverseContext.context = mapContext;
                traverseContext.count = 0;
                return traverseContext;
            }
            else {
                return {
                    result: mapResult,
                    keyPrefix: keyPrefix,
                    func: mapFunction,
                    context: mapContext,
                    count: 0
                };
            }
        }
        function releaseTraverseContext(traverseContext) {
            traverseContext.result = null;
            traverseContext.keyPrefix = null;
            traverseContext.func = null;
            traverseContext.context = null;
            traverseContext.count = 0;
            if (traverseContextPool.length < POOL_SIZE) {
                traverseContextPool.push(traverseContext);
            }
        }
        /**
         * @param {?*} children Children tree container.
         * @param {!string} nameSoFar Name of the key path so far.
         * @param {!function} callback Callback to invoke with each child found.
         * @param {?*} traverseContext Used to pass information throughout the traversal
         * process.
         * @return {!number} The number of children in this subtree.
         */
        function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
            var type = typeof children;
            if (type === 'undefined' || type === 'boolean') {
                // All of the above are perceived as null.
                children = null;
            }
            var invokeCallback = false;
            if (children === null) {
                invokeCallback = true;
            }
            else {
                switch (type) {
                    case 'string':
                    case 'number':
                        invokeCallback = true;
                        break;
                    case 'object':
                        switch (children.$$typeof) {
                            case REACT_ELEMENT_TYPE:
                            case REACT_CALL_TYPE:
                            case REACT_RETURN_TYPE:
                            case REACT_PORTAL_TYPE:
                                invokeCallback = true;
                        }
                }
            }
            if (invokeCallback) {
                callback(traverseContext, children, 
                // If it's the only child, treat the name as if it was wrapped in an array
                // so that it's consistent if the number of children grows.
                nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
                return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0; // Count of children found in the current subtree.
            var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (Array.isArray(children)) {
                for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    nextName = nextNamePrefix + getComponentKey(child, i);
                    subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
                }
            }
            else {
                var iteratorFn = getIteratorFn(children);
                if (typeof iteratorFn === 'function') {
                    {
                        // Warn about using Maps as children
                        if (iteratorFn === children.entries) {
                            warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
                            didWarnAboutMaps = true;
                        }
                    }
                    var iterator = iteratorFn.call(children);
                    var step;
                    var ii = 0;
                    while (!(step = iterator.next()).done) {
                        child = step.value;
                        nextName = nextNamePrefix + getComponentKey(child, ii++);
                        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
                    }
                }
                else if (type === 'object') {
                    var addendum = '';
                    {
                        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
                    }
                    var childrenString = '' + children;
                    invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
                }
            }
            return subtreeCount;
        }
        /**
         * Traverses children that are typically specified as `props.children`, but
         * might also be specified through attributes:
         *
         * - `traverseAllChildren(this.props.children, ...)`
         * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
         *
         * The `traverseContext` is an optional argument that is passed through the
         * entire traversal. It can be used to store accumulations or anything else that
         * the callback might find relevant.
         *
         * @param {?*} children Children tree object.
         * @param {!function} callback To invoke upon traversing each child.
         * @param {?*} traverseContext Context for traversal.
         * @return {!number} The number of children in this subtree.
         */
        function traverseAllChildren(children, callback, traverseContext) {
            if (children == null) {
                return 0;
            }
            return traverseAllChildrenImpl(children, '', callback, traverseContext);
        }
        /**
         * Generate a key string that identifies a component within a set.
         *
         * @param {*} component A component that could contain a manual key.
         * @param {number} index Index that is used if a manual key is not provided.
         * @return {string}
         */
        function getComponentKey(component, index) {
            // Do some typechecking here since we call this blindly. We want to ensure
            // that we don't block potential future ES APIs.
            if (typeof component === 'object' && component !== null && component.key != null) {
                // Explicit key
                return escape(component.key);
            }
            // Implicit key determined by the index in the set
            return index.toString(36);
        }
        function forEachSingleChild(bookKeeping, child, name) {
            var func = bookKeeping.func, context = bookKeeping.context;
            func.call(context, child, bookKeeping.count++);
        }
        /**
         * Iterates through children that are typically specified as `props.children`.
         *
         * See https://reactjs.org/docs/react-api.html#react.children.foreach
         *
         * The provided forEachFunc(child, index) will be called for each
         * leaf child.
         *
         * @param {?*} children Children tree container.
         * @param {function(*, int)} forEachFunc
         * @param {*} forEachContext Context for forEachContext.
         */
        function forEachChildren(children, forEachFunc, forEachContext) {
            if (children == null) {
                return children;
            }
            var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
            traverseAllChildren(children, forEachSingleChild, traverseContext);
            releaseTraverseContext(traverseContext);
        }
        function mapSingleChildIntoContext(bookKeeping, child, childKey) {
            var result = bookKeeping.result, keyPrefix = bookKeeping.keyPrefix, func = bookKeeping.func, context = bookKeeping.context;
            var mappedChild = func.call(context, child, bookKeeping.count++);
            if (Array.isArray(mappedChild)) {
                mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
            }
            else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                    mappedChild = cloneAndReplaceKey(mappedChild, 
                    // Keep both the (mapped) and old keys if they differ, just as
                    // traverseAllChildren used to do for objects as children
                    keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
                }
                result.push(mappedChild);
            }
        }
        function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
            var escapedPrefix = '';
            if (prefix != null) {
                escapedPrefix = escapeUserProvidedKey(prefix) + '/';
            }
            var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
            traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
            releaseTraverseContext(traverseContext);
        }
        /**
         * Maps children that are typically specified as `props.children`.
         *
         * See https://reactjs.org/docs/react-api.html#react.children.map
         *
         * The provided mapFunction(child, key, index) will be called for each
         * leaf child.
         *
         * @param {?*} children Children tree container.
         * @param {function(*, int)} func The map function.
         * @param {*} context Context for mapFunction.
         * @return {object} Object containing the ordered map of results.
         */
        function mapChildren(children, func, context) {
            if (children == null) {
                return children;
            }
            var result = [];
            mapIntoWithKeyPrefixInternal(children, result, null, func, context);
            return result;
        }
        /**
         * Count the number of children that are typically specified as
         * `props.children`.
         *
         * See https://reactjs.org/docs/react-api.html#react.children.count
         *
         * @param {?*} children Children tree container.
         * @return {number} The number of children.
         */
        function countChildren(children, context) {
            return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
        }
        /**
         * Flatten a children object (typically specified as `props.children`) and
         * return an array with appropriately re-keyed children.
         *
         * See https://reactjs.org/docs/react-api.html#react.children.toarray
         */
        function toArray(children) {
            var result = [];
            mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
            return result;
        }
        /**
         * Returns the first child in a collection of children and verifies that there
         * is only one child in the collection.
         *
         * See https://reactjs.org/docs/react-api.html#react.children.only
         *
         * The current implementation of this function assumes that a single child gets
         * passed without a wrapper, but the purpose of this helper function is to
         * abstract away the particular structure of children.
         *
         * @param {?object} children Child collection structure.
         * @return {ReactElement} The first and only `ReactElement` contained in the
         * structure.
         */
        function onlyChild(children) {
            !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
            return children;
        }
        var describeComponentFrame = function (name, source, ownerName) {
            return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
        };
        function getComponentName(fiber) {
            var type = fiber.type;
            if (typeof type === 'string') {
                return type;
            }
            if (typeof type === 'function') {
                return type.displayName || type.name;
            }
            return null;
        }
        /**
         * ReactElementValidator provides a wrapper around a element factory
         * which validates the props passed to the element. This is intended to be
         * used only in DEV and could be replaced by a static type checker for languages
         * that support it.
         */
        {
            var currentlyValidatingElement = null;
            var propTypesMisspellWarningShown = false;
            var getDisplayName = function (element) {
                if (element == null) {
                    return '#empty';
                }
                else if (typeof element === 'string' || typeof element === 'number') {
                    return '#text';
                }
                else if (typeof element.type === 'string') {
                    return element.type;
                }
                else if (element.type === REACT_FRAGMENT_TYPE) {
                    return 'React.Fragment';
                }
                else {
                    return element.type.displayName || element.type.name || 'Unknown';
                }
            };
            var getStackAddendum = function () {
                var stack = '';
                if (currentlyValidatingElement) {
                    var name = getDisplayName(currentlyValidatingElement);
                    var owner = currentlyValidatingElement._owner;
                    stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
                }
                stack += ReactDebugCurrentFrame.getStackAddendum() || '';
                return stack;
            };
            var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
        }
        function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
                var name = getComponentName(ReactCurrentOwner.current);
                if (name) {
                    return '\n\nCheck the render method of `' + name + '`.';
                }
            }
            return '';
        }
        function getSourceInfoErrorAddendum(elementProps) {
            if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
                var source = elementProps.__source;
                var fileName = source.fileName.replace(/^.*[\\\/]/, '');
                var lineNumber = source.lineNumber;
                return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
            }
            return '';
        }
        /**
         * Warn if there's no key explicitly set on dynamic arrays of children or
         * object keys are not valid. This allows us to keep track of children between
         * updates.
         */
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
                var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
                if (parentName) {
                    info = '\n\nCheck the top-level render call using <' + parentName + '>.';
                }
            }
            return info;
        }
        /**
         * Warn if the element doesn't have an explicit key assigned to it.
         * This element is in an array. The array could grow and shrink or be
         * reordered. All children that haven't already been validated are required to
         * have a "key" property assigned to it. Error statuses are cached so a warning
         * will only be shown once.
         *
         * @internal
         * @param {ReactElement} element Element that requires a key.
         * @param {*} parentType element's parent's type.
         */
        function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
                return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
                return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            // Usually the current owner is the offender, but if it accepts children as a
            // property, it may be the creator of the child that's responsible for
            // assigning it a key.
            var childOwner = '';
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
                // Give the component that originally created this child.
                childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
            }
            currentlyValidatingElement = element;
            {
                warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
            }
            currentlyValidatingElement = null;
        }
        /**
         * Ensure that every element either is passed in a static location, in an
         * array with an explicit keys property defined, or in an object literal
         * with valid key property.
         *
         * @internal
         * @param {ReactNode} node Statically passed child of any type.
         * @param {*} parentType node's parent's type.
         */
        function validateChildKeys(node, parentType) {
            if (typeof node !== 'object') {
                return;
            }
            if (Array.isArray(node)) {
                for (var i = 0; i < node.length; i++) {
                    var child = node[i];
                    if (isValidElement(child)) {
                        validateExplicitKey(child, parentType);
                    }
                }
            }
            else if (isValidElement(node)) {
                // This element was passed in a valid location.
                if (node._store) {
                    node._store.validated = true;
                }
            }
            else if (node) {
                var iteratorFn = getIteratorFn(node);
                if (typeof iteratorFn === 'function') {
                    // Entry iterators used to provide implicit keys,
                    // but now we print a separate warning for them later.
                    if (iteratorFn !== node.entries) {
                        var iterator = iteratorFn.call(node);
                        var step;
                        while (!(step = iterator.next()).done) {
                            if (isValidElement(step.value)) {
                                validateExplicitKey(step.value, parentType);
                            }
                        }
                    }
                }
            }
        }
        /**
         * Given an element, validate that its props follow the propTypes definition,
         * provided by the type.
         *
         * @param {ReactElement} element
         */
        function validatePropTypes(element) {
            var componentClass = element.type;
            if (typeof componentClass !== 'function') {
                return;
            }
            var name = componentClass.displayName || componentClass.name;
            var propTypes = componentClass.propTypes;
            if (propTypes) {
                currentlyValidatingElement = element;
                checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
                currentlyValidatingElement = null;
            }
            else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
            }
            if (typeof componentClass.getDefaultProps === 'function') {
                warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
            }
        }
        /**
         * Given a fragment, validate that it can only be provided with fragment props
         * @param {ReactElement} fragment
         */
        function validateFragmentProps(fragment) {
            currentlyValidatingElement = fragment;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;
                    if (!VALID_FRAGMENT_PROPS.has(key)) {
                        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
                        break;
                    }
                }
            }
            catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            }
            finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                }
                finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            if (fragment.ref !== null) {
                warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
            }
            currentlyValidatingElement = null;
        }
        function createElementWithValidation(type, props, children) {
            var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
            // We warn in this case but don't throw. We expect the element creation to
            // succeed and there will likely be errors in render.
            if (!validType) {
                var info = '';
                if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
                    info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
                }
                var sourceInfo = getSourceInfoErrorAddendum(props);
                if (sourceInfo) {
                    info += sourceInfo;
                }
                else {
                    info += getDeclarationErrorAddendum();
                }
                info += getStackAddendum() || '';
                warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
            }
            var element = createElement.apply(this, arguments);
            // The result can be nullish if a mock or a custom function is used.
            // TODO: Drop this when these are no longer allowed as the type argument.
            if (element == null) {
                return element;
            }
            // Skip key warning if the type isn't valid since our key validation logic
            // doesn't expect a non-string/function type and can throw confusing errors.
            // We don't want exception behavior to differ between dev and prod.
            // (Rendering will throw with a helpful message and as soon as the type is
            // fixed, the key warnings will appear.)
            if (validType) {
                for (var i = 2; i < arguments.length; i++) {
                    validateChildKeys(arguments[i], type);
                }
            }
            if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
                validateFragmentProps(element);
            }
            else {
                validatePropTypes(element);
            }
            return element;
        }
        function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            // Legacy hook TODO: Warn if this is accessed
            validatedFactory.type = type;
            {
                Object.defineProperty(validatedFactory, 'type', {
                    enumerable: false,
                    get: function () {
                        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
                        Object.defineProperty(this, 'type', {
                            value: type
                        });
                        return type;
                    }
                });
            }
            return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
        }
        var React = {
            Children: {
                map: mapChildren,
                forEach: forEachChildren,
                count: countChildren,
                toArray: toArray,
                only: onlyChild
            },
            Component: Component,
            PureComponent: PureComponent,
            unstable_AsyncComponent: AsyncComponent,
            Fragment: REACT_FRAGMENT_TYPE,
            createElement: createElementWithValidation,
            cloneElement: cloneElementWithValidation,
            createFactory: createFactoryWithValidation,
            isValidElement: isValidElement,
            version: ReactVersion,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                ReactCurrentOwner: ReactCurrentOwner,
                // Used by renderers to avoid bundling object-assign twice in UMD bundles:
                assign: _assign
            }
        };
        {
            _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
                // These should not be included in production.
                ReactDebugCurrentFrame: ReactDebugCurrentFrame,
                // Shim for React DOM 16.0.0 which still destructured (but not used) this.
                // TODO: remove in React 17.0.
                ReactComponentTreeHook: {}
            });
        }
        var React$2 = Object.freeze({
            default: React
        });
        var React$3 = (React$2 && React) || React$2;
        // TODO: decide on the top-level export form.
        // This is hacky but makes it work with both Rollup and Jest.
        var react = React$3['default'] ? React$3['default'] : React$3;
        module.exports = react;
    })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./app.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./app.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".App {\n  text-align: center;\n}\n\n.App-logo {\n  animation: App-logo-spin infinite 20s linear;\n  height: 80px;\n}\n\n.App-header {\n  background-color: #222;\n  height: 150px;\n  padding: 20px;\n  color: white;\n}\n\n.App-title {\n  font-size: 1.5em;\n}\n\n.App-intro {\n  font-size: large;\n}\n\n@keyframes App-logo-spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
module.exports = function (css) {
    // get current location
    var location = typeof window !== "undefined" && window.location;
    if (!location) {
        throw new Error("fixUrls requires window.location");
    }
    // blank or null?
    if (!css || typeof css !== "string") {
        return css;
    }
    var baseUrl = location.protocol + "//" + location.host;
    var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
    // convert each url(...)
    /*
    This regular expression is just a way to recursively match brackets within
    a string.

     /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
       (  = Start a capturing group
         (?:  = Start a non-capturing group
             [^)(]  = Match anything that isn't a parentheses
             |  = OR
             \(  = Match a start parentheses
                 (?:  = Start another non-capturing groups
                     [^)(]+  = Match anything that isn't a parentheses
                     |  = OR
                     \(  = Match a start parentheses
                         [^)(]*  = Match anything that isn't a parentheses
                     \)  = Match a end parentheses
                 )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
     \)  = Match a close parens

     /gi  = Get all matches, not the first.  Be case insensitive.
     */
    var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
        // strip quotes (if they exist)
        var unquotedOrigUrl = origUrl
            .trim()
            .replace(/^"(.*)"$/, function (o, $1) { return $1; })
            .replace(/^'(.*)'$/, function (o, $1) { return $1; });
        // already a full url? no change
        if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
            return fullMatch;
        }
        // convert the url to a full url
        var newUrl;
        if (unquotedOrigUrl.indexOf("//") === 0) {
            //TODO: should we add protocol?
            newUrl = unquotedOrigUrl;
        }
        else if (unquotedOrigUrl.indexOf("/") === 0) {
            // path should be relative to the base url
            newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
        }
        else {
            // path should be relative to current directory
            newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
        }
        // send back the fixed url(...)
        return "url(" + JSON.stringify(newUrl) + ")";
    });
    // send back the fixed css
    return fixedCss;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
var ClientSearchComponent_1 = __webpack_require__(23);
var ClientSummary_1 = __webpack_require__(28);
var ClientsTable_1 = __webpack_require__(29);
var customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    }
};
var DashBoard = /** @class */ (function (_super) {
    __extends(DashBoard, _super);
    function DashBoard(props) {
        var _this = _super.call(this, props) || this;
        _this.openModal = function () {
            _this.setState({ modalIsOpen: true });
        };
        _this.afterOpenModal = function () {
            // references are now sync'd and can be accessed.
        };
        _this.closeModal = function () {
            _this.setState({ modalIsOpen: false });
        };
        _this.handlerClientSearch = function (client) {
            _this.setState({ currentClient: client });
        };
        _this.handlerClientSelect = function (client) {
            //this.getHabitatsForClient(client.id);    
        };
        _this.state = {
            currentClient: undefined,
            habitats: [],
            modalIsOpen: false
        };
        return _this;
    }
    DashBoard.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("header", null,
                react_1.default.createElement("p", null, "ALIA Header"),
                react_1.default.createElement(ClientSearchComponent_1.ClientSearchComponent, { handler: this.handlerClientSearch }),
                react_1.default.createElement("br", null),
                react_1.default.createElement(ClientSummary_1.ClientSummary, { client: this.state.currentClient })),
            react_1.default.createElement(ClientsTable_1.ClientsTable, { clients: [this.state.currentClient], handler: this.handlerClientSelect }),
            react_1.default.createElement("footer", null,
                "ALIA Footer : ",
                this.state.toto)));
    };
    return DashBoard;
}(react_1.Component));
exports.DashBoard = DashBoard;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
// import PropTypes from 'prop-types';
var react_select_1 = __webpack_require__(24);
var isomorphic_fetch_1 = __webpack_require__(26);
var ClientSearchComponent = /** @class */ (function (_super) {
    __extends(ClientSearchComponent, _super);
    // https://jedwatson.github.io/react-select/
    // https://github.com/JedWatson/react-select/blob/master/examples/src/components/GithubUsers.js
    function ClientSearchComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (client) {
            _this.setState({
                client: client,
            });
            _this.props.handler(client);
        };
        _this.state = {};
        return _this;
    }
    ClientSearchComponent.prototype.getClients = function (nom) {
        if (!nom) {
            return Promise.resolve({ options: [] });
        }
        return isomorphic_fetch_1.default("http://test.ideesalter.com/alia_searchClient.php?nom=" + nom)
            .then(function (response) { return response.json(); })
            .then(function (clients) {
            return { options: clients };
        });
    };
    ClientSearchComponent.prototype.render = function () {
        var AsyncComponent = react_select_1.default.Async;
        return (React.createElement("div", { className: "section" },
            React.createElement(AsyncComponent, { width: "100", client: this.state.value, onChange: this.onChange(), onValueClick: this.gotoUser, valueKey: "id", labelKey: "nom", loadOptions: this.getClients })));
    };
    return ClientSearchComponent;
}(React.Component));
exports.ClientSearchComponent = ClientSearchComponent;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./react-select.css", function() {
			var newContent = require("!!../../css-loader/index.js!./react-select.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "/**\n * React Select\n * ============\n * Created by Jed Watson and Joss Mackison for KeystoneJS, http://www.keystonejs.com/\n * https://twitter.com/jedwatson https://twitter.com/jossmackison https://twitter.com/keystonejs\n * MIT License: https://github.com/JedWatson/react-select\n*/\n.Select {\n  position: relative;\n}\n.Select input::-webkit-contacts-auto-fill-button,\n.Select input::-webkit-credentials-auto-fill-button {\n  display: none !important;\n}\n.Select input::-ms-clear {\n  display: none !important;\n}\n.Select input::-ms-reveal {\n  display: none !important;\n}\n.Select,\n.Select div,\n.Select input,\n.Select span {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.Select.is-disabled .Select-arrow-zone {\n  cursor: default;\n  pointer-events: none;\n  opacity: 0.35;\n}\n.Select.is-disabled > .Select-control {\n  background-color: #f9f9f9;\n}\n.Select.is-disabled > .Select-control:hover {\n  box-shadow: none;\n}\n.Select.is-open > .Select-control {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n  background: #fff;\n  border-color: #b3b3b3 #ccc #d9d9d9;\n}\n.Select.is-open > .Select-control .Select-arrow {\n  top: -2px;\n  border-color: transparent transparent #999;\n  border-width: 0 5px 5px;\n}\n.Select.is-searchable.is-open > .Select-control {\n  cursor: text;\n}\n.Select.is-searchable.is-focused:not(.is-open) > .Select-control {\n  cursor: text;\n}\n.Select.is-focused > .Select-control {\n  background: #fff;\n}\n.Select.is-focused:not(.is-open) > .Select-control {\n  border-color: #007eff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);\n  background: #fff;\n}\n.Select.has-value.is-clearable.Select--single > .Select-control .Select-value {\n  padding-right: 42px;\n}\n.Select.has-value.Select--single > .Select-control .Select-value .Select-value-label,\n.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value .Select-value-label {\n  color: #333;\n}\n.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label,\n.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label {\n  cursor: pointer;\n  text-decoration: none;\n}\n.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:hover,\n.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:hover,\n.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus,\n.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus {\n  color: #007eff;\n  outline: none;\n  text-decoration: underline;\n}\n.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus,\n.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus {\n  background: #fff;\n}\n.Select.has-value.is-pseudo-focused .Select-input {\n  opacity: 0;\n}\n.Select.is-open .Select-arrow,\n.Select .Select-arrow-zone:hover > .Select-arrow {\n  border-top-color: #666;\n}\n.Select.Select--rtl {\n  direction: rtl;\n  text-align: right;\n}\n.Select-control {\n  background-color: #fff;\n  border-color: #d9d9d9 #ccc #b3b3b3;\n  border-radius: 4px;\n  border: 1px solid #ccc;\n  color: #333;\n  cursor: default;\n  display: table;\n  border-spacing: 0;\n  border-collapse: separate;\n  height: 36px;\n  outline: none;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n}\n.Select-control:hover {\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n}\n.Select-control .Select-input:focus {\n  outline: none;\n  background: #fff;\n}\n.Select-placeholder,\n.Select--single > .Select-control .Select-value {\n  bottom: 0;\n  color: #aaa;\n  left: 0;\n  line-height: 34px;\n  padding-left: 10px;\n  padding-right: 10px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.Select-input {\n  height: 34px;\n  padding-left: 10px;\n  padding-right: 10px;\n  vertical-align: middle;\n}\n.Select-input > input {\n  width: 100%;\n  background: none transparent;\n  border: 0 none;\n  box-shadow: none;\n  cursor: default;\n  display: inline-block;\n  font-family: inherit;\n  font-size: inherit;\n  margin: 0;\n  outline: none;\n  line-height: 17px;\n  /* For IE 8 compatibility */\n  padding: 8px 0 12px;\n  /* For IE 8 compatibility */\n  -webkit-appearance: none;\n}\n.is-focused .Select-input > input {\n  cursor: text;\n}\n.has-value.is-pseudo-focused .Select-input {\n  opacity: 0;\n}\n.Select-control:not(.is-searchable) > .Select-input {\n  outline: none;\n}\n.Select-loading-zone {\n  cursor: pointer;\n  display: table-cell;\n  position: relative;\n  text-align: center;\n  vertical-align: middle;\n  width: 16px;\n}\n.Select-loading {\n  -webkit-animation: Select-animation-spin 400ms infinite linear;\n  -o-animation: Select-animation-spin 400ms infinite linear;\n  animation: Select-animation-spin 400ms infinite linear;\n  width: 16px;\n  height: 16px;\n  box-sizing: border-box;\n  border-radius: 50%;\n  border: 2px solid #ccc;\n  border-right-color: #333;\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n}\n.Select-clear-zone {\n  -webkit-animation: Select-animation-fadeIn 200ms;\n  -o-animation: Select-animation-fadeIn 200ms;\n  animation: Select-animation-fadeIn 200ms;\n  color: #999;\n  cursor: pointer;\n  display: table-cell;\n  position: relative;\n  text-align: center;\n  vertical-align: middle;\n  width: 17px;\n}\n.Select-clear-zone:hover {\n  color: #D0021B;\n}\n.Select-clear {\n  display: inline-block;\n  font-size: 18px;\n  line-height: 1;\n}\n.Select--multi .Select-clear-zone {\n  width: 17px;\n}\n.Select-arrow-zone {\n  cursor: pointer;\n  display: table-cell;\n  position: relative;\n  text-align: center;\n  vertical-align: middle;\n  width: 25px;\n  padding-right: 5px;\n}\n.Select--rtl .Select-arrow-zone {\n  padding-right: 0;\n  padding-left: 5px;\n}\n.Select-arrow {\n  border-color: #999 transparent transparent;\n  border-style: solid;\n  border-width: 5px 5px 2.5px;\n  display: inline-block;\n  height: 0;\n  width: 0;\n  position: relative;\n}\n.Select-control > *:last-child {\n  padding-right: 5px;\n}\n.Select--multi .Select-multi-value-wrapper {\n  display: inline-block;\n}\n.Select .Select-aria-only {\n  position: absolute;\n  display: inline-block;\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  clip: rect(0, 0, 0, 0);\n  overflow: hidden;\n  float: left;\n}\n@-webkit-keyframes Select-animation-fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes Select-animation-fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.Select-menu-outer {\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-top-color: #e6e6e6;\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n  box-sizing: border-box;\n  margin-top: -1px;\n  max-height: 200px;\n  position: absolute;\n  left: 0;\n  top: 100%;\n  width: 100%;\n  z-index: 1;\n  -webkit-overflow-scrolling: touch;\n}\n.Select-menu {\n  max-height: 198px;\n  overflow-y: auto;\n}\n.Select-option {\n  box-sizing: border-box;\n  background-color: #fff;\n  color: #666666;\n  cursor: pointer;\n  display: block;\n  padding: 8px 10px;\n}\n.Select-option:last-child {\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.Select-option.is-selected {\n  background-color: #f5faff;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 126, 255, 0.04);\n  color: #333;\n}\n.Select-option.is-focused {\n  background-color: #ebf5ff;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 126, 255, 0.08);\n  color: #333;\n}\n.Select-option.is-disabled {\n  color: #cccccc;\n  cursor: default;\n}\n.Select-noresults {\n  box-sizing: border-box;\n  color: #999999;\n  cursor: default;\n  display: block;\n  padding: 8px 10px;\n}\n.Select--multi .Select-input {\n  vertical-align: middle;\n  margin-left: 10px;\n  padding: 0;\n}\n.Select--multi.Select--rtl .Select-input {\n  margin-left: 0;\n  margin-right: 10px;\n}\n.Select--multi.has-value .Select-input {\n  margin-left: 5px;\n}\n.Select--multi .Select-value {\n  background-color: #ebf5ff;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 126, 255, 0.08);\n  border-radius: 2px;\n  border: 1px solid #c2e0ff;\n  /* Fallback color for IE 8 */\n  border: 1px solid rgba(0, 126, 255, 0.24);\n  color: #007eff;\n  display: inline-block;\n  font-size: 0.9em;\n  line-height: 1.4;\n  margin-left: 5px;\n  margin-top: 5px;\n  vertical-align: top;\n}\n.Select--multi .Select-value-icon,\n.Select--multi .Select-value-label {\n  display: inline-block;\n  vertical-align: middle;\n}\n.Select--multi .Select-value-label {\n  border-bottom-right-radius: 2px;\n  border-top-right-radius: 2px;\n  cursor: default;\n  padding: 2px 5px;\n}\n.Select--multi a.Select-value-label {\n  color: #007eff;\n  cursor: pointer;\n  text-decoration: none;\n}\n.Select--multi a.Select-value-label:hover {\n  text-decoration: underline;\n}\n.Select--multi .Select-value-icon {\n  cursor: pointer;\n  border-bottom-left-radius: 2px;\n  border-top-left-radius: 2px;\n  border-right: 1px solid #c2e0ff;\n  /* Fallback color for IE 8 */\n  border-right: 1px solid rgba(0, 126, 255, 0.24);\n  padding: 1px 5px 3px;\n}\n.Select--multi .Select-value-icon:hover,\n.Select--multi .Select-value-icon:focus {\n  background-color: #d8eafd;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 113, 230, 0.08);\n  color: #0071e6;\n}\n.Select--multi .Select-value-icon:active {\n  background-color: #c2e0ff;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 126, 255, 0.24);\n}\n.Select--multi.Select--rtl .Select-value {\n  margin-left: 0;\n  margin-right: 5px;\n}\n.Select--multi.Select--rtl .Select-value-icon {\n  border-right: none;\n  border-left: 1px solid #c2e0ff;\n  /* Fallback color for IE 8 */\n  border-left: 1px solid rgba(0, 126, 255, 0.24);\n}\n.Select--multi.is-disabled .Select-value {\n  background-color: #fcfcfc;\n  border: 1px solid #e3e3e3;\n  color: #333;\n}\n.Select--multi.is-disabled .Select-value-icon {\n  cursor: not-allowed;\n  border-right: 1px solid #e3e3e3;\n}\n.Select--multi.is-disabled .Select-value-icon:hover,\n.Select--multi.is-disabled .Select-value-icon:focus,\n.Select--multi.is-disabled .Select-value-icon:active {\n  background-color: #fcfcfc;\n}\n@keyframes Select-animation-spin {\n  to {\n    transform: rotate(1turn);\n  }\n}\n@-webkit-keyframes Select-animation-spin {\n  to {\n    -webkit-transform: rotate(1turn);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(27);
module.exports = self.fetch.bind(self);


/***/ }),
/* 27 */
/***/ (function(module, exports) {

(function (self) {
    'use strict';
    if (self.fetch) {
        return;
    }
    var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob: 'FileReader' in self && 'Blob' in self && (function () {
            try {
                new Blob();
                return true;
            }
            catch (e) {
                return false;
            }
        })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
    };
    if (support.arrayBuffer) {
        var viewClasses = [
            '[object Int8Array]',
            '[object Uint8Array]',
            '[object Uint8ClampedArray]',
            '[object Int16Array]',
            '[object Uint16Array]',
            '[object Int32Array]',
            '[object Uint32Array]',
            '[object Float32Array]',
            '[object Float64Array]'
        ];
        var isDataView = function (obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
        };
        var isArrayBufferView = ArrayBuffer.isView || function (obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
    }
    function normalizeName(name) {
        if (typeof name !== 'string') {
            name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
            throw new TypeError('Invalid character in header field name');
        }
        return name.toLowerCase();
    }
    function normalizeValue(value) {
        if (typeof value !== 'string') {
            value = String(value);
        }
        return value;
    }
    // Build a destructive iterator for the value list
    function iteratorFor(items) {
        var iterator = {
            next: function () {
                var value = items.shift();
                return { done: value === undefined, value: value };
            }
        };
        if (support.iterable) {
            iterator[Symbol.iterator] = function () {
                return iterator;
            };
        }
        return iterator;
    }
    function Headers(headers) {
        this.map = {};
        if (headers instanceof Headers) {
            headers.forEach(function (value, name) {
                this.append(name, value);
            }, this);
        }
        else if (Array.isArray(headers)) {
            headers.forEach(function (header) {
                this.append(header[0], header[1]);
            }, this);
        }
        else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
                this.append(name, headers[name]);
            }, this);
        }
    }
    Headers.prototype.append = function (name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ',' + value : value;
    };
    Headers.prototype['delete'] = function (name) {
        delete this.map[normalizeName(name)];
    };
    Headers.prototype.get = function (name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null;
    };
    Headers.prototype.has = function (name) {
        return this.map.hasOwnProperty(normalizeName(name));
    };
    Headers.prototype.set = function (name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
    };
    Headers.prototype.forEach = function (callback, thisArg) {
        for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this);
            }
        }
    };
    Headers.prototype.keys = function () {
        var items = [];
        this.forEach(function (value, name) { items.push(name); });
        return iteratorFor(items);
    };
    Headers.prototype.values = function () {
        var items = [];
        this.forEach(function (value) { items.push(value); });
        return iteratorFor(items);
    };
    Headers.prototype.entries = function () {
        var items = [];
        this.forEach(function (value, name) { items.push([name, value]); });
        return iteratorFor(items);
    };
    if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }
    function consumed(body) {
        if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'));
        }
        body.bodyUsed = true;
    }
    function fileReaderReady(reader) {
        return new Promise(function (resolve, reject) {
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function () {
                reject(reader.error);
            };
        });
    }
    function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise;
    }
    function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsText(blob);
        return promise;
    }
    function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);
        for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
        }
        return chars.join('');
    }
    function bufferClone(buf) {
        if (buf.slice) {
            return buf.slice(0);
        }
        else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
        }
    }
    function Body() {
        this.bodyUsed = false;
        this._initBody = function (body) {
            this._bodyInit = body;
            if (!body) {
                this._bodyText = '';
            }
            else if (typeof body === 'string') {
                this._bodyText = body;
            }
            else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body;
            }
            else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body;
            }
            else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString();
            }
            else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer);
                // IE 10-11 can't handle a DataView body.
                this._bodyInit = new Blob([this._bodyArrayBuffer]);
            }
            else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body);
            }
            else {
                throw new Error('unsupported BodyInit type');
            }
            if (!this.headers.get('content-type')) {
                if (typeof body === 'string') {
                    this.headers.set('content-type', 'text/plain;charset=UTF-8');
                }
                else if (this._bodyBlob && this._bodyBlob.type) {
                    this.headers.set('content-type', this._bodyBlob.type);
                }
                else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                    this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                }
            }
        };
        if (support.blob) {
            this.blob = function () {
                var rejected = consumed(this);
                if (rejected) {
                    return rejected;
                }
                if (this._bodyBlob) {
                    return Promise.resolve(this._bodyBlob);
                }
                else if (this._bodyArrayBuffer) {
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                }
                else if (this._bodyFormData) {
                    throw new Error('could not read FormData body as blob');
                }
                else {
                    return Promise.resolve(new Blob([this._bodyText]));
                }
            };
            this.arrayBuffer = function () {
                if (this._bodyArrayBuffer) {
                    return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                }
                else {
                    return this.blob().then(readBlobAsArrayBuffer);
                }
            };
        }
        this.text = function () {
            var rejected = consumed(this);
            if (rejected) {
                return rejected;
            }
            if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob);
            }
            else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            }
            else if (this._bodyFormData) {
                throw new Error('could not read FormData body as text');
            }
            else {
                return Promise.resolve(this._bodyText);
            }
        };
        if (support.formData) {
            this.formData = function () {
                return this.text().then(decode);
            };
        }
        this.json = function () {
            return this.text().then(JSON.parse);
        };
        return this;
    }
    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
    function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return (methods.indexOf(upcased) > -1) ? upcased : method;
    }
    function Request(input, options) {
        options = options || {};
        var body = options.body;
        if (input instanceof Request) {
            if (input.bodyUsed) {
                throw new TypeError('Already read');
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
                this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            if (!body && input._bodyInit != null) {
                body = input._bodyInit;
                input.bodyUsed = true;
            }
        }
        else {
            this.url = String(input);
        }
        this.credentials = options.credentials || this.credentials || 'omit';
        if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.referrer = null;
        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
        }
        this._initBody(body);
    }
    Request.prototype.clone = function () {
        return new Request(this, { body: this._bodyInit });
    };
    function decode(body) {
        var form = new FormData();
        body.trim().split('&').forEach(function (bytes) {
            if (bytes) {
                var split = bytes.split('=');
                var name = split.shift().replace(/\+/g, ' ');
                var value = split.join('=').replace(/\+/g, ' ');
                form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
        });
        return form;
    }
    function parseHeaders(rawHeaders) {
        var headers = new Headers();
        rawHeaders.split(/\r?\n/).forEach(function (line) {
            var parts = line.split(':');
            var key = parts.shift().trim();
            if (key) {
                var value = parts.join(':').trim();
                headers.append(key, value);
            }
        });
        return headers;
    }
    Body.call(Request.prototype);
    function Response(bodyInit, options) {
        if (!options) {
            options = {};
        }
        this.type = 'default';
        this.status = 'status' in options ? options.status : 200;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = 'statusText' in options ? options.statusText : 'OK';
        this.headers = new Headers(options.headers);
        this.url = options.url || '';
        this._initBody(bodyInit);
    }
    Body.call(Response.prototype);
    Response.prototype.clone = function () {
        return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
        });
    };
    Response.error = function () {
        var response = new Response(null, { status: 0, statusText: '' });
        response.type = 'error';
        return response;
    };
    var redirectStatuses = [301, 302, 303, 307, 308];
    Response.redirect = function (url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code');
        }
        return new Response(null, { status: status, headers: { location: url } });
    };
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
    self.fetch = function (input, init) {
        return new Promise(function (resolve, reject) {
            var request = new Request(input, init);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var options = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                };
                options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
                var body = 'response' in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options));
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.ontimeout = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === 'include') {
                xhr.withCredentials = true;
            }
            if ('responseType' in xhr && support.blob) {
                xhr.responseType = 'blob';
            }
            request.headers.forEach(function (value, name) {
                xhr.setRequestHeader(name, value);
            });
            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
        });
    };
    self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
//import { ClientSearchComponent } from './ClientSearchComponent';
var ClientSummary = /** @class */ (function (_super) {
    __extends(ClientSummary, _super);
    function ClientSummary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentClient: props.client
        };
        return _this;
    }
    ClientSummary.prototype.componentWillReceiveProps = function (nextProps) {
        // console.log("componentWillReceiveProps");
        // console.log(nextProps);
        // console.log("===========================");
        if (nextProps !== this.props) {
            this.setState({
                currentClient: nextProps.client
            });
        }
    };
    ClientSummary.prototype.render = function () {
        var currentClient = this.state.currentClient;
        if (currentClient === undefined) {
            return (react_1.default.createElement("div", null));
        }
        return (react_1.default.createElement("div", null, this.state.currentClient.nom));
    };
    return ClientSummary;
}(react_1.Component));
exports.ClientSummary = ClientSummary;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
// import { render } from "react-dom";
// Import React Table
var react_table_1 = __webpack_require__(10);
__webpack_require__(12);
var HabitatsTable_1 = __webpack_require__(39);
var ClientsTable = /** @class */ (function (_super) {
    __extends(ClientsTable, _super);
    // https://react-table.js.org/#/story/readme
    function ClientsTable(props) {
        var _this = _super.call(this, props) || this;
        // id
        // nom
        // adresse
        // email
        // telephone
        _this.onRowClick = function (state, rowInfo, column, instance) {
            return {
                onClick: function (e) {
                    var client = rowInfo.original;
                    _this.props.handler(client);
                    // console.log('A Td Element was clicked!')
                    // console.log('it produced this event:', e)
                    // console.log('It was in this column:', column)
                    // console.log('It was in this row:', rowInfo)
                    // console.log('It was in this table instance:', instance)
                }
            };
        };
        _this.state = {
            clients: props.clients
        };
        return _this;
    }
    ClientsTable.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                clients: nextProps.clients
            });
        }
    };
    ClientsTable.prototype.render = function () {
        var clients = this.state.clients;
        var columns = [
            { Header: "Id",
                accessor: "id"
            },
            { Header: "Nom",
                accessor: "nom"
            },
            { Header: "Adresse",
                accessor: "adresse"
            },
            { Header: "email",
                accessor: "email"
            },
            { Header: "Téléphone",
                accessor: "telephone"
            }
        ];
        if (clients.length === 0 || (clients.length === 1 && clients[0] === undefined)) {
            return (react_1.default.createElement("div", null));
        }
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(react_table_1.default, { data: clients, columns: columns, defaultPageSize: 1, className: "-striped -highlight", getTrProps: this.onRowClick, showPagination: false, showPageJump: false, sortable: false, SubComponent: function (row) {
                    return (react_1.default.createElement(HabitatsTable_1.HabitatsTable, { client: row.original }));
                } }),
            react_1.default.createElement("br", null)));
    };
    return ClientsTable;
}(react_1.default.Component));
exports.ClientsTable = ClientsTable;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} } return function (Constructor, protoProps, staticProps) { if (protoProps)
    defineProperties(Constructor.prototype, protoProps); if (staticProps)
    defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
function _possibleConstructorReturn(self, call) { if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
} return call && (typeof call === "object" || typeof call === "function") ? call : self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
} subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
exports.default = function (Base) {
    return function (_Base) {
        _inherits(_class, _Base);
        function _class() {
            _classCallCheck(this, _class);
            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }
        _createClass(_class, [{
                key: 'componentWillMount',
                value: function componentWillMount() {
                    this.setStateWithData(this.getDataModel(this.getResolvedState()));
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.fireFetchData();
                }
            }, {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps, nextState) {
                    var oldState = this.getResolvedState();
                    var newState = this.getResolvedState(nextProps, nextState);
                    // Do a deep compare of new and old `defaultOption` and
                    // if they are different reset `option = defaultOption`
                    var defaultableOptions = ['sorted', 'filtered', 'resized', 'expanded'];
                    defaultableOptions.forEach(function (x) {
                        var defaultName = 'default' + (x.charAt(0).toUpperCase() + x.slice(1));
                        if (JSON.stringify(oldState[defaultName]) !== JSON.stringify(newState[defaultName])) {
                            newState[x] = newState[defaultName];
                        }
                    });
                    // If they change these table options, we need to reset defaults
                    // or else we could get into a state where the user has changed the UI
                    // and then disabled the ability to change it back.
                    // e.g. If `filterable` has changed, set `filtered = defaultFiltered`
                    var resettableOptions = ['sortable', 'filterable', 'resizable'];
                    resettableOptions.forEach(function (x) {
                        if (oldState[x] !== newState[x]) {
                            var baseName = x.replace('able', '');
                            var optionName = baseName + 'ed';
                            var defaultName = 'default' + (optionName.charAt(0).toUpperCase() + optionName.slice(1));
                            newState[optionName] = newState[defaultName];
                        }
                    });
                    // Props that trigger a data update
                    if (oldState.data !== newState.data || oldState.columns !== newState.columns || oldState.pivotBy !== newState.pivotBy || oldState.sorted !== newState.sorted || oldState.filtered !== newState.filtered) {
                        this.setStateWithData(this.getDataModel(newState));
                    }
                }
            }, {
                key: 'setStateWithData',
                value: function setStateWithData(newState, cb) {
                    var _this2 = this;
                    var oldState = this.getResolvedState();
                    var newResolvedState = this.getResolvedState({}, newState);
                    var freezeWhenExpanded = newResolvedState.freezeWhenExpanded;
                    // Default to unfrozen state
                    newResolvedState.frozen = false;
                    // If freezeWhenExpanded is set, check for frozen conditions
                    if (freezeWhenExpanded) {
                        // if any rows are expanded, freeze the existing data and sorting
                        var keys = Object.keys(newResolvedState.expanded);
                        for (var i = 0; i < keys.length; i += 1) {
                            if (newResolvedState.expanded[keys[i]]) {
                                newResolvedState.frozen = true;
                                break;
                            }
                        }
                    }
                    // If the data isn't frozen and either the data or
                    // sorting model has changed, update the data
                    if (oldState.frozen && !newResolvedState.frozen || oldState.sorted !== newResolvedState.sorted || oldState.filtered !== newResolvedState.filtered || oldState.showFilters !== newResolvedState.showFilters || !newResolvedState.frozen && oldState.resolvedData !== newResolvedState.resolvedData) {
                        // Handle collapseOnsortedChange & collapseOnDataChange
                        if (oldState.sorted !== newResolvedState.sorted && this.props.collapseOnSortingChange || oldState.filtered !== newResolvedState.filtered || oldState.showFilters !== newResolvedState.showFilters || oldState.sortedData && !newResolvedState.frozen && oldState.resolvedData !== newResolvedState.resolvedData && this.props.collapseOnDataChange) {
                            newResolvedState.expanded = {};
                        }
                        Object.assign(newResolvedState, this.getSortedData(newResolvedState));
                    }
                    // Set page to 0 if filters change
                    if (oldState.filtered !== newResolvedState.filtered) {
                        newResolvedState.page = 0;
                    }
                    // Calculate pageSize all the time
                    if (newResolvedState.sortedData) {
                        newResolvedState.pages = newResolvedState.manual ? newResolvedState.pages : Math.ceil(newResolvedState.sortedData.length / newResolvedState.pageSize);
                        newResolvedState.page = Math.max(newResolvedState.page >= newResolvedState.pages ? newResolvedState.pages - 1 : newResolvedState.page, 0);
                    }
                    return this.setState(newResolvedState, function () {
                        if (cb) {
                            cb();
                        }
                        if (oldState.page !== newResolvedState.page || oldState.pageSize !== newResolvedState.pageSize || oldState.sorted !== newResolvedState.sorted || oldState.filtered !== newResolvedState.filtered) {
                            _this2.fireFetchData();
                        }
                    });
                }
            }]);
        return _class;
    }(Base);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
            break;
    }
}
catch (err) {
    _d = true;
    _e = err;
}
finally {
    try {
        if (!_n && _i["return"])
            _i["return"]();
    }
    finally {
        if (_d)
            throw _e;
    }
} return _arr; } return function (arr, i) { if (Array.isArray(arr)) {
    return arr;
}
else if (Symbol.iterator in Object(arr)) {
    return sliceIterator(arr, i);
}
else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
} }; }();
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
} return target; };
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} } return function (Constructor, protoProps, staticProps) { if (protoProps)
    defineProperties(Constructor.prototype, protoProps); if (staticProps)
    defineProperties(Constructor, staticProps); return Constructor; }; }();
var _react = __webpack_require__(0);
var _react2 = _interopRequireDefault(_react);
var _utils = __webpack_require__(11);
var _utils2 = _interopRequireDefault(_utils);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
}
else {
    obj[key] = value;
} return obj; }
function _toConsumableArray(arr) { if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}
else {
    return Array.from(arr);
} }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
function _possibleConstructorReturn(self, call) { if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
} return call && (typeof call === "object" || typeof call === "function") ? call : self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
} subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
exports.default = function (Base) {
    return function (_Base) {
        _inherits(_class, _Base);
        function _class() {
            _classCallCheck(this, _class);
            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }
        _createClass(_class, [{
                key: 'getResolvedState',
                value: function getResolvedState(props, state) {
                    var resolvedState = _extends({}, _utils2.default.compactObject(this.state), _utils2.default.compactObject(this.props), _utils2.default.compactObject(state), _utils2.default.compactObject(props));
                    return resolvedState;
                }
            }, {
                key: 'getDataModel',
                value: function getDataModel(newState) {
                    var _this2 = this;
                    var columns = newState.columns, _newState$pivotBy = newState.pivotBy, pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy, data = newState.data, pivotIDKey = newState.pivotIDKey, pivotValKey = newState.pivotValKey, subRowsKey = newState.subRowsKey, aggregatedKey = newState.aggregatedKey, nestingLevelKey = newState.nestingLevelKey, originalKey = newState.originalKey, indexKey = newState.indexKey, groupedByPivotKey = newState.groupedByPivotKey, SubComponent = newState.SubComponent;
                    // Determine Header Groups
                    var hasHeaderGroups = false;
                    columns.forEach(function (column) {
                        if (column.columns) {
                            hasHeaderGroups = true;
                        }
                    });
                    var columnsWithExpander = [].concat(_toConsumableArray(columns));
                    var expanderColumn = columns.find(function (col) {
                        return col.expander || col.columns && col.columns.some(function (col2) {
                            return col2.expander;
                        });
                    });
                    // The actual expander might be in the columns field of a group column
                    if (expanderColumn && !expanderColumn.expander) {
                        expanderColumn = expanderColumn.columns.find(function (col) {
                            return col.expander;
                        });
                    }
                    // If we have SubComponent's we need to make sure we have an expander column
                    if (SubComponent && !expanderColumn) {
                        expanderColumn = { expander: true };
                        columnsWithExpander = [expanderColumn].concat(_toConsumableArray(columnsWithExpander));
                    }
                    var makeDecoratedColumn = function makeDecoratedColumn(column, parentColumn) {
                        var dcol = void 0;
                        if (column.expander) {
                            dcol = _extends({}, _this2.props.column, _this2.props.expanderDefaults, column);
                        }
                        else {
                            dcol = _extends({}, _this2.props.column, column);
                        }
                        // Ensure minWidth is not greater than maxWidth if set
                        if (dcol.maxWidth < dcol.minWidth) {
                            dcol.minWidth = dcol.maxWidth;
                        }
                        if (parentColumn) {
                            dcol.parentColumn = parentColumn;
                        }
                        // First check for string accessor
                        if (typeof dcol.accessor === 'string') {
                            var _ret = function () {
                                dcol.id = dcol.id || dcol.accessor;
                                var accessorString = dcol.accessor;
                                dcol.accessor = function (row) {
                                    return _utils2.default.get(row, accessorString);
                                };
                                return {
                                    v: dcol
                                };
                            }();
                            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")
                                return _ret.v;
                        }
                        // Fall back to functional accessor (but require an ID)
                        if (dcol.accessor && !dcol.id) {
                            console.warn(dcol);
                            throw new Error('A column id is required if using a non-string accessor for column above.');
                        }
                        // Fall back to an undefined accessor
                        if (!dcol.accessor) {
                            dcol.accessor = function () {
                                return undefined;
                            };
                        }
                        return dcol;
                    };
                    var allDecoratedColumns = [];
                    // Decorate the columns
                    var decorateAndAddToAll = function decorateAndAddToAll(column, parentColumn) {
                        var decoratedColumn = makeDecoratedColumn(column, parentColumn);
                        allDecoratedColumns.push(decoratedColumn);
                        return decoratedColumn;
                    };
                    var decoratedColumns = columnsWithExpander.map(function (column) {
                        if (column.columns) {
                            return _extends({}, column, {
                                columns: column.columns.map(function (d) {
                                    return decorateAndAddToAll(d, column);
                                })
                            });
                        }
                        return decorateAndAddToAll(column);
                    });
                    // Build the visible columns, headers and flat column list
                    var visibleColumns = decoratedColumns.slice();
                    var allVisibleColumns = [];
                    visibleColumns = visibleColumns.map(function (column) {
                        if (column.columns) {
                            var visibleSubColumns = column.columns.filter(function (d) {
                                return pivotBy.indexOf(d.id) > -1 ? false : _utils2.default.getFirstDefined(d.show, true);
                            });
                            return _extends({}, column, {
                                columns: visibleSubColumns
                            });
                        }
                        return column;
                    });
                    visibleColumns = visibleColumns.filter(function (column) {
                        return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils2.default.getFirstDefined(column.show, true);
                    });
                    // Find any custom pivot location
                    var pivotIndex = visibleColumns.findIndex(function (col) {
                        return col.pivot;
                    });
                    // Handle Pivot Columns
                    if (pivotBy.length) {
                        (function () {
                            // Retrieve the pivot columns in the correct pivot order
                            var pivotColumns = [];
                            pivotBy.forEach(function (pivotID) {
                                var found = allDecoratedColumns.find(function (d) {
                                    return d.id === pivotID;
                                });
                                if (found) {
                                    pivotColumns.push(found);
                                }
                            });
                            var PivotParentColumn = pivotColumns.reduce(function (prev, current) {
                                return prev && prev === current.parentColumn && current.parentColumn;
                            }, pivotColumns[0].parentColumn);
                            var PivotGroupHeader = hasHeaderGroups && PivotParentColumn.Header;
                            PivotGroupHeader = PivotGroupHeader || function () {
                                return _react2.default.createElement('strong', null, 'Pivoted');
                            };
                            var pivotColumnGroup = {
                                Header: PivotGroupHeader,
                                columns: pivotColumns.map(function (col) {
                                    return _extends({}, _this2.props.pivotDefaults, col, {
                                        pivoted: true
                                    });
                                })
                            };
                            // Place the pivotColumns back into the visibleColumns
                            if (pivotIndex >= 0) {
                                pivotColumnGroup = _extends({}, visibleColumns[pivotIndex], pivotColumnGroup);
                                visibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
                            }
                            else {
                                visibleColumns.unshift(pivotColumnGroup);
                            }
                        })();
                    }
                    // Build Header Groups
                    var headerGroups = [];
                    var currentSpan = [];
                    // A convenience function to add a header and reset the currentSpan
                    var addHeader = function addHeader(columns, column) {
                        headerGroups.push(_extends({}, _this2.props.column, column, {
                            columns: columns
                        }));
                        currentSpan = [];
                    };
                    // Build flast list of allVisibleColumns and HeaderGroups
                    visibleColumns.forEach(function (column) {
                        if (column.columns) {
                            allVisibleColumns = allVisibleColumns.concat(column.columns);
                            if (currentSpan.length > 0) {
                                addHeader(currentSpan);
                            }
                            addHeader(column.columns, column);
                            return;
                        }
                        allVisibleColumns.push(column);
                        currentSpan.push(column);
                    });
                    if (hasHeaderGroups && currentSpan.length > 0) {
                        addHeader(currentSpan);
                    }
                    // Access the data
                    var accessRow = function accessRow(d, i) {
                        var _row;
                        var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                        var row = (_row = {}, _defineProperty(_row, originalKey, d), _defineProperty(_row, indexKey, i), _defineProperty(_row, subRowsKey, d[subRowsKey]), _defineProperty(_row, nestingLevelKey, level), _row);
                        allDecoratedColumns.forEach(function (column) {
                            if (column.expander)
                                return;
                            row[column.id] = column.accessor(d);
                        });
                        if (row[subRowsKey]) {
                            row[subRowsKey] = row[subRowsKey].map(function (d, i) {
                                return accessRow(d, i, level + 1);
                            });
                        }
                        return row;
                    };
                    var resolvedData = data.map(function (d, i) {
                        return accessRow(d, i);
                    });
                    // TODO: Make it possible to fabricate nested rows without pivoting
                    var aggregatingColumns = allVisibleColumns.filter(function (d) {
                        return !d.expander && d.aggregate;
                    });
                    // If pivoting, recursively group the data
                    var aggregate = function aggregate(rows) {
                        var aggregationValues = {};
                        aggregatingColumns.forEach(function (column) {
                            var values = rows.map(function (d) {
                                return d[column.id];
                            });
                            aggregationValues[column.id] = column.aggregate(values, rows);
                        });
                        return aggregationValues;
                    };
                    if (pivotBy.length) {
                        (function () {
                            var groupRecursively = function groupRecursively(rows, keys) {
                                var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
                                // This is the last level, just return the rows
                                if (i === keys.length) {
                                    return rows;
                                }
                                // Group the rows together for this level
                                var groupedRows = Object.entries(_utils2.default.groupBy(rows, keys[i])).map(function (_ref) {
                                    var _ref3;
                                    var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                                    return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _defineProperty(_ref3, nestingLevelKey, i), _defineProperty(_ref3, groupedByPivotKey, true), _ref3;
                                });
                                // Recurse into the subRows
                                groupedRows = groupedRows.map(function (rowGroup) {
                                    var _extends2;
                                    var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
                                    return _extends({}, rowGroup, (_extends2 = {}, _defineProperty(_extends2, subRowsKey, subRows), _defineProperty(_extends2, aggregatedKey, true), _extends2), aggregate(subRows));
                                });
                                return groupedRows;
                            };
                            resolvedData = groupRecursively(resolvedData, pivotBy);
                        })();
                    }
                    return _extends({}, newState, {
                        resolvedData: resolvedData,
                        allVisibleColumns: allVisibleColumns,
                        headerGroups: headerGroups,
                        allDecoratedColumns: allDecoratedColumns,
                        hasHeaderGroups: hasHeaderGroups
                    });
                }
            }, {
                key: 'getSortedData',
                value: function getSortedData(resolvedState) {
                    var manual = resolvedState.manual, sorted = resolvedState.sorted, filtered = resolvedState.filtered, defaultFilterMethod = resolvedState.defaultFilterMethod, resolvedData = resolvedState.resolvedData, allVisibleColumns = resolvedState.allVisibleColumns, allDecoratedColumns = resolvedState.allDecoratedColumns;
                    var sortMethodsByColumnID = {};
                    allDecoratedColumns.filter(function (col) {
                        return col.sortMethod;
                    }).forEach(function (col) {
                        sortMethodsByColumnID[col.id] = col.sortMethod;
                    });
                    // Resolve the data from either manual data or sorted data
                    return {
                        sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, filtered, defaultFilterMethod, allVisibleColumns), sorted, sortMethodsByColumnID)
                    };
                }
            }, {
                key: 'fireFetchData',
                value: function fireFetchData() {
                    this.props.onFetchData(this.getResolvedState(), this);
                }
            }, {
                key: 'getPropOrState',
                value: function getPropOrState(key) {
                    return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
                }
            }, {
                key: 'getStateOrProp',
                value: function getStateOrProp(key) {
                    return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
                }
            }, {
                key: 'filterData',
                value: function filterData(data, filtered, defaultFilterMethod, allVisibleColumns) {
                    var _this3 = this;
                    var filteredData = data;
                    if (filtered.length) {
                        filteredData = filtered.reduce(function (filteredSoFar, nextFilter) {
                            var column = allVisibleColumns.find(function (x) {
                                return x.id === nextFilter.id;
                            });
                            // Don't filter hidden columns or columns that have had their filters disabled
                            if (!column || column.filterable === false) {
                                return filteredSoFar;
                            }
                            var filterMethod = column.filterMethod || defaultFilterMethod;
                            // If 'filterAll' is set to true, pass the entire dataset to the filter method
                            if (column.filterAll) {
                                return filterMethod(nextFilter, filteredSoFar, column);
                            }
                            return filteredSoFar.filter(function (row) {
                                return filterMethod(nextFilter, row, column);
                            });
                        }, filteredData);
                        // Apply the filter to the subrows if we are pivoting, and then
                        // filter any rows without subcolumns because it would be strange to show
                        filteredData = filteredData.map(function (row) {
                            if (!row[_this3.props.subRowsKey]) {
                                return row;
                            }
                            return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.filterData(row[_this3.props.subRowsKey], filtered, defaultFilterMethod, allVisibleColumns)));
                        }).filter(function (row) {
                            if (!row[_this3.props.subRowsKey]) {
                                return true;
                            }
                            return row[_this3.props.subRowsKey].length > 0;
                        });
                    }
                    return filteredData;
                }
            }, {
                key: 'sortData',
                value: function sortData(data, sorted) {
                    var _this4 = this;
                    var sortMethodsByColumnID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                    if (!sorted.length) {
                        return data;
                    }
                    var sortedData = (this.props.orderByMethod || _utils2.default.orderBy)(data, sorted.map(function (sort) {
                        // Support custom sorting methods for each column
                        if (sortMethodsByColumnID[sort.id]) {
                            return function (a, b) {
                                return sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id], sort.desc);
                            };
                        }
                        return function (a, b) {
                            return _this4.props.defaultSortMethod(a[sort.id], b[sort.id], sort.desc);
                        };
                    }), sorted.map(function (d) {
                        return !d.desc;
                    }), this.props.indexKey);
                    sortedData.forEach(function (row) {
                        if (!row[_this4.props.subRowsKey]) {
                            return;
                        }
                        row[_this4.props.subRowsKey] = _this4.sortData(row[_this4.props.subRowsKey], sorted, sortMethodsByColumnID);
                    });
                    return sortedData;
                }
            }, {
                key: 'getMinRows',
                value: function getMinRows() {
                    return _utils2.default.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
                }
                // User actions
            }, {
                key: 'onPageChange',
                value: function onPageChange(page) {
                    var _props = this.props, onPageChange = _props.onPageChange, collapseOnPageChange = _props.collapseOnPageChange;
                    var newState = { page: page };
                    if (collapseOnPageChange) {
                        newState.expanded = {};
                    }
                    this.setStateWithData(newState, function () {
                        return onPageChange && onPageChange(page);
                    });
                }
            }, {
                key: 'onPageSizeChange',
                value: function onPageSizeChange(newPageSize) {
                    var onPageSizeChange = this.props.onPageSizeChange;
                    var _getResolvedState = this.getResolvedState(), pageSize = _getResolvedState.pageSize, page = _getResolvedState.page;
                    // Normalize the page to display
                    var currentRow = pageSize * page;
                    var newPage = Math.floor(currentRow / newPageSize);
                    this.setStateWithData({
                        pageSize: newPageSize,
                        page: newPage
                    }, function () {
                        return onPageSizeChange && onPageSizeChange(newPageSize, newPage);
                    });
                }
            }, {
                key: 'sortColumn',
                value: function sortColumn(column, additive) {
                    var _getResolvedState2 = this.getResolvedState(), sorted = _getResolvedState2.sorted, skipNextSort = _getResolvedState2.skipNextSort, defaultSortDesc = _getResolvedState2.defaultSortDesc;
                    var firstSortDirection = Object.prototype.hasOwnProperty.call(column, 'defaultSortDesc') ? column.defaultSortDesc : defaultSortDesc;
                    var secondSortDirection = !firstSortDirection;
                    // we can't stop event propagation from the column resize move handlers
                    // attached to the document because of react's synthetic events
                    // so we have to prevent the sort function from actually sorting
                    // if we click on the column resize element within a header.
                    if (skipNextSort) {
                        this.setStateWithData({
                            skipNextSort: false
                        });
                        return;
                    }
                    var onSortedChange = this.props.onSortedChange;
                    var newSorted = _utils2.default.clone(sorted || []).map(function (d) {
                        d.desc = _utils2.default.isSortingDesc(d);
                        return d;
                    });
                    if (!_utils2.default.isArray(column)) {
                        // Single-Sort
                        var existingIndex = newSorted.findIndex(function (d) {
                            return d.id === column.id;
                        });
                        if (existingIndex > -1) {
                            var existing = newSorted[existingIndex];
                            if (existing.desc === secondSortDirection) {
                                if (additive) {
                                    newSorted.splice(existingIndex, 1);
                                }
                                else {
                                    existing.desc = firstSortDirection;
                                    newSorted = [existing];
                                }
                            }
                            else {
                                existing.desc = secondSortDirection;
                                if (!additive) {
                                    newSorted = [existing];
                                }
                            }
                        }
                        else if (additive) {
                            newSorted.push({
                                id: column.id,
                                desc: firstSortDirection
                            });
                        }
                        else {
                            newSorted = [{
                                    id: column.id,
                                    desc: firstSortDirection
                                }];
                        }
                    }
                    else {
                        (function () {
                            // Multi-Sort
                            var existingIndex = newSorted.findIndex(function (d) {
                                return d.id === column[0].id;
                            });
                            // Existing Sorted Column
                            if (existingIndex > -1) {
                                var _existing = newSorted[existingIndex];
                                if (_existing.desc === secondSortDirection) {
                                    if (additive) {
                                        newSorted.splice(existingIndex, column.length);
                                    }
                                    else {
                                        column.forEach(function (d, i) {
                                            newSorted[existingIndex + i].desc = firstSortDirection;
                                        });
                                    }
                                }
                                else {
                                    column.forEach(function (d, i) {
                                        newSorted[existingIndex + i].desc = secondSortDirection;
                                    });
                                }
                                if (!additive) {
                                    newSorted = newSorted.slice(existingIndex, column.length);
                                }
                                // New Sort Column
                            }
                            else if (additive) {
                                newSorted = newSorted.concat(column.map(function (d) {
                                    return {
                                        id: d.id,
                                        desc: firstSortDirection
                                    };
                                }));
                            }
                            else {
                                newSorted = column.map(function (d) {
                                    return {
                                        id: d.id,
                                        desc: firstSortDirection
                                    };
                                });
                            }
                        })();
                    }
                    this.setStateWithData({
                        page: !sorted.length && newSorted.length || !additive ? 0 : this.state.page,
                        sorted: newSorted
                    }, function () {
                        return onSortedChange && onSortedChange(newSorted, column, additive);
                    });
                }
            }, {
                key: 'filterColumn',
                value: function filterColumn(column, value) {
                    var _getResolvedState3 = this.getResolvedState(), filtered = _getResolvedState3.filtered;
                    var onFilteredChange = this.props.onFilteredChange;
                    // Remove old filter first if it exists
                    var newFiltering = (filtered || []).filter(function (x) {
                        return x.id !== column.id;
                    });
                    if (value !== '') {
                        newFiltering.push({
                            id: column.id,
                            value: value
                        });
                    }
                    this.setStateWithData({
                        filtered: newFiltering
                    }, function () {
                        return onFilteredChange && onFilteredChange(newFiltering, column, value);
                    });
                }
            }, {
                key: 'resizeColumnStart',
                value: function resizeColumnStart(event, column, isTouch) {
                    var _this5 = this;
                    event.stopPropagation();
                    var parentWidth = event.target.parentElement.getBoundingClientRect().width;
                    var pageX = void 0;
                    if (isTouch) {
                        pageX = event.changedTouches[0].pageX;
                    }
                    else {
                        pageX = event.pageX;
                    }
                    this.trapEvents = true;
                    this.setStateWithData({
                        currentlyResizing: {
                            id: column.id,
                            startX: pageX,
                            parentWidth: parentWidth
                        }
                    }, function () {
                        if (isTouch) {
                            document.addEventListener('touchmove', _this5.resizeColumnMoving);
                            document.addEventListener('touchcancel', _this5.resizeColumnEnd);
                            document.addEventListener('touchend', _this5.resizeColumnEnd);
                        }
                        else {
                            document.addEventListener('mousemove', _this5.resizeColumnMoving);
                            document.addEventListener('mouseup', _this5.resizeColumnEnd);
                            document.addEventListener('mouseleave', _this5.resizeColumnEnd);
                        }
                    });
                }
            }, {
                key: 'resizeColumnMoving',
                value: function resizeColumnMoving(event) {
                    event.stopPropagation();
                    var onResizedChange = this.props.onResizedChange;
                    var _getResolvedState4 = this.getResolvedState(), resized = _getResolvedState4.resized, currentlyResizing = _getResolvedState4.currentlyResizing;
                    // Delete old value
                    var newResized = resized.filter(function (x) {
                        return x.id !== currentlyResizing.id;
                    });
                    var pageX = void 0;
                    if (event.type === 'touchmove') {
                        pageX = event.changedTouches[0].pageX;
                    }
                    else if (event.type === 'mousemove') {
                        pageX = event.pageX;
                    }
                    // Set the min size to 10 to account for margin and border or else the
                    // group headers don't line up correctly
                    var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, 11);
                    newResized.push({
                        id: currentlyResizing.id,
                        value: newWidth
                    });
                    this.setStateWithData({
                        resized: newResized
                    }, function () {
                        return onResizedChange && onResizedChange(newResized, event);
                    });
                }
            }, {
                key: 'resizeColumnEnd',
                value: function resizeColumnEnd(event) {
                    event.stopPropagation();
                    var isTouch = event.type === 'touchend' || event.type === 'touchcancel';
                    if (isTouch) {
                        document.removeEventListener('touchmove', this.resizeColumnMoving);
                        document.removeEventListener('touchcancel', this.resizeColumnEnd);
                        document.removeEventListener('touchend', this.resizeColumnEnd);
                    }
                    // If its a touch event clear the mouse one's as well because sometimes
                    // the mouseDown event gets called as well, but the mouseUp event doesn't
                    document.removeEventListener('mousemove', this.resizeColumnMoving);
                    document.removeEventListener('mouseup', this.resizeColumnEnd);
                    document.removeEventListener('mouseleave', this.resizeColumnEnd);
                    // The touch events don't propagate up to the sorting's onMouseDown event so
                    // no need to prevent it from happening or else the first click after a touch
                    // event resize will not sort the column.
                    if (!isTouch) {
                        this.setStateWithData({
                            skipNextSort: true,
                            currentlyResizing: false
                        });
                    }
                }
            }]);
        return _class;
    }(Base);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
} return target; };
var _react = __webpack_require__(0);
var _react2 = _interopRequireDefault(_react);
var _classnames = __webpack_require__(6);
var _classnames2 = _interopRequireDefault(_classnames);
var _utils = __webpack_require__(11);
var _utils2 = _interopRequireDefault(_utils);
var _pagination = __webpack_require__(33);
var _pagination2 = _interopRequireDefault(_pagination);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) {
    if (keys.indexOf(i) >= 0)
        continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
    target[i] = obj[i];
} return target; }
//
var emptyObj = function emptyObj() {
    return {};
};
exports.default = {
    // General
    data: [],
    loading: false,
    showPagination: true,
    showPaginationTop: false,
    showPaginationBottom: true,
    showPageSizeOptions: true,
    pageSizeOptions: [5, 10, 20, 25, 50, 100],
    defaultPageSize: 20,
    showPageJump: true,
    collapseOnSortingChange: true,
    collapseOnPageChange: true,
    collapseOnDataChange: true,
    freezeWhenExpanded: false,
    sortable: true,
    multiSort: true,
    resizable: true,
    filterable: false,
    defaultSortDesc: false,
    defaultSorted: [],
    defaultFiltered: [],
    defaultResized: [],
    defaultExpanded: {},
    // eslint-disable-next-line no-unused-vars
    defaultFilterMethod: function defaultFilterMethod(filter, row, column) {
        var id = filter.pivotId || filter.id;
        return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
    },
    // eslint-disable-next-line no-unused-vars
    defaultSortMethod: function defaultSortMethod(a, b, desc) {
        // force null and undefined to the bottom
        a = a === null || a === undefined ? '' : a;
        b = b === null || b === undefined ? '' : b;
        // force any string values to lowercase
        a = typeof a === 'string' ? a.toLowerCase() : a;
        b = typeof b === 'string' ? b.toLowerCase() : b;
        // Return either 1 or -1 to indicate a sort priority
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        // returning 0, undefined or any falsey value will use subsequent sorts or
        // the index as a tiebreaker
        return 0;
    },
    // Controlled State Props
    // page: undefined,
    // pageSize: undefined,
    // sorted: [],
    // filtered: [],
    // resized: [],
    // expanded: {},
    // Controlled State Callbacks
    onPageChange: undefined,
    onPageSizeChange: undefined,
    onSortedChange: undefined,
    onFilteredChange: undefined,
    onResizedChange: undefined,
    onExpandedChange: undefined,
    // Pivoting
    pivotBy: undefined,
    // Key Constants
    pivotValKey: '_pivotVal',
    pivotIDKey: '_pivotID',
    subRowsKey: '_subRows',
    aggregatedKey: '_aggregated',
    nestingLevelKey: '_nestingLevel',
    originalKey: '_original',
    indexKey: '_index',
    groupedByPivotKey: '_groupedByPivot',
    // Server-side Callbacks
    onFetchData: function onFetchData() {
        return null;
    },
    // Classes
    className: '',
    style: {},
    // Component decorators
    getProps: emptyObj,
    getTableProps: emptyObj,
    getTheadGroupProps: emptyObj,
    getTheadGroupTrProps: emptyObj,
    getTheadGroupThProps: emptyObj,
    getTheadProps: emptyObj,
    getTheadTrProps: emptyObj,
    getTheadThProps: emptyObj,
    getTheadFilterProps: emptyObj,
    getTheadFilterTrProps: emptyObj,
    getTheadFilterThProps: emptyObj,
    getTbodyProps: emptyObj,
    getTrGroupProps: emptyObj,
    getTrProps: emptyObj,
    getTdProps: emptyObj,
    getTfootProps: emptyObj,
    getTfootTrProps: emptyObj,
    getTfootTdProps: emptyObj,
    getPaginationProps: emptyObj,
    getLoadingProps: emptyObj,
    getNoDataProps: emptyObj,
    getResizerProps: emptyObj,
    // Global Column Defaults
    column: {
        // Renderers
        Cell: undefined,
        Header: undefined,
        Footer: undefined,
        Aggregated: undefined,
        Pivot: undefined,
        PivotValue: undefined,
        Expander: undefined,
        Filter: undefined,
        // All Columns
        sortable: undefined,
        resizable: undefined,
        filterable: undefined,
        show: true,
        minWidth: 100,
        // Cells only
        className: '',
        style: {},
        getProps: emptyObj,
        // Pivot only
        aggregate: undefined,
        // Headers only
        headerClassName: '',
        headerStyle: {},
        getHeaderProps: emptyObj,
        // Footers only
        footerClassName: '',
        footerStyle: {},
        getFooterProps: emptyObj,
        filterMethod: undefined,
        filterAll: false,
        sortMethod: undefined
    },
    // Global Expander Column Defaults
    expanderDefaults: {
        sortable: false,
        resizable: false,
        filterable: false,
        width: 35
    },
    pivotDefaults: {},
    // Text
    previousText: 'Previous',
    nextText: 'Next',
    loadingText: 'Loading...',
    noDataText: 'No rows found',
    pageText: 'Page',
    ofText: 'of',
    rowsText: 'rows',
    // Components
    TableComponent: _utils2.default.makeTemplateComponent('rt-table', 'Table'),
    TheadComponent: _utils2.default.makeTemplateComponent('rt-thead', 'Thead'),
    TbodyComponent: _utils2.default.makeTemplateComponent('rt-tbody', 'Tbody'),
    TrGroupComponent: _utils2.default.makeTemplateComponent('rt-tr-group', 'TrGroup'),
    TrComponent: _utils2.default.makeTemplateComponent('rt-tr', 'Tr'),
    ThComponent: function ThComponent(_ref) {
        var toggleSort = _ref.toggleSort, className = _ref.className, children = _ref.children, rest = _objectWithoutProperties(_ref, ['toggleSort', 'className', 'children']);
        return _react2.default.createElement('div', _extends({
            className: (0, _classnames2.default)('rt-th', className),
            onClick: function onClick(e) {
                return toggleSort && toggleSort(e);
            },
            role: 'heading'
        }, rest), children);
    },
    TdComponent: _utils2.default.makeTemplateComponent('rt-td', 'Td'),
    TfootComponent: _utils2.default.makeTemplateComponent('rt-tfoot', 'Tfoot'),
    FilterComponent: function FilterComponent(_ref2) {
        var filter = _ref2.filter, _onChange = _ref2.onChange;
        return _react2.default.createElement('input', {
            type: 'text',
            style: {
                width: '100%'
            },
            value: filter ? filter.value : '',
            onChange: function onChange(event) {
                return _onChange(event.target.value);
            }
        });
    },
    ExpanderComponent: function ExpanderComponent(_ref3) {
        var isExpanded = _ref3.isExpanded;
        return _react2.default.createElement('div', { className: (0, _classnames2.default)('rt-expander', isExpanded && '-open') }, '\u2022');
    },
    PivotValueComponent: function PivotValueComponent(_ref4) {
        var subRows = _ref4.subRows, value = _ref4.value;
        return _react2.default.createElement('span', null, value, ' ', subRows && '(' + subRows.length + ')');
    },
    AggregatedComponent: function AggregatedComponent(_ref5) {
        var subRows = _ref5.subRows, column = _ref5.column;
        var previewValues = subRows.filter(function (d) {
            return typeof d[column.id] !== 'undefined';
        }).map(function (row, i) {
            return (
            // eslint-disable-next-line react/no-array-index-key
            _react2.default.createElement('span', { key: i }, row[column.id], i < subRows.length - 1 ? ', ' : ''));
        });
        return _react2.default.createElement('span', null, previewValues);
    },
    PivotComponent: undefined,
    // the ExpanderComponent and PivotValueComponent at run-time in methods.js
    PaginationComponent: _pagination2.default,
    PreviousComponent: undefined,
    NextComponent: undefined,
    LoadingComponent: function LoadingComponent(_ref6) {
        var className = _ref6.className, loading = _ref6.loading, loadingText = _ref6.loadingText, rest = _objectWithoutProperties(_ref6, ['className', 'loading', 'loadingText']);
        return _react2.default.createElement('div', _extends({
            className: (0, _classnames2.default)('-loading', { '-active': loading }, className)
        }, rest), _react2.default.createElement('div', { className: '-loading-inner' }, loadingText));
    },
    NoDataComponent: _utils2.default.makeTemplateComponent('rt-noData', 'NoData'),
    ResizerComponent: _utils2.default.makeTemplateComponent('rt-resizer', 'Resizer'),
    PadRowComponent: function PadRowComponent() {
        return _react2.default.createElement('span', null, '\xA0');
    }
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} } return function (Constructor, protoProps, staticProps) { if (protoProps)
    defineProperties(Constructor.prototype, protoProps); if (staticProps)
    defineProperties(Constructor, staticProps); return Constructor; }; }();
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
} return target; };
var _react = __webpack_require__(0);
var _react2 = _interopRequireDefault(_react);
var _classnames = __webpack_require__(6);
var _classnames2 = _interopRequireDefault(_classnames);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
function _possibleConstructorReturn(self, call) { if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
} return call && (typeof call === "object" || typeof call === "function") ? call : self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
} subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//
// import _ from './utils'
var defaultButton = function defaultButton(props) {
    return _react2.default.createElement('button', _extends({ type: 'button' }, props, { className: '-btn' }), props.children);
};
var ReactTablePagination = function (_Component) {
    _inherits(ReactTablePagination, _Component);
    function ReactTablePagination(props) {
        _classCallCheck(this, ReactTablePagination);
        var _this = _possibleConstructorReturn(this, (ReactTablePagination.__proto__ || Object.getPrototypeOf(ReactTablePagination)).call(this));
        _this.getSafePage = _this.getSafePage.bind(_this);
        _this.changePage = _this.changePage.bind(_this);
        _this.applyPage = _this.applyPage.bind(_this);
        _this.state = {
            page: props.page
        };
        return _this;
    }
    _createClass(ReactTablePagination, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                this.setState({ page: nextProps.page });
            }
        }, {
            key: 'getSafePage',
            value: function getSafePage(page) {
                if (isNaN(page)) {
                    page = this.props.page;
                }
                return Math.min(Math.max(page, 0), this.props.pages - 1);
            }
        }, {
            key: 'changePage',
            value: function changePage(page) {
                page = this.getSafePage(page);
                this.setState({ page: page });
                if (this.props.page !== page) {
                    this.props.onPageChange(page);
                }
            }
        }, {
            key: 'applyPage',
            value: function applyPage(e) {
                if (e) {
                    e.preventDefault();
                }
                var page = this.state.page;
                this.changePage(page === '' ? this.props.page : page);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;
                var _props = this.props, pages = _props.pages, page = _props.page, showPageSizeOptions = _props.showPageSizeOptions, pageSizeOptions = _props.pageSizeOptions, pageSize = _props.pageSize, showPageJump = _props.showPageJump, canPrevious = _props.canPrevious, canNext = _props.canNext, onPageSizeChange = _props.onPageSizeChange, className = _props.className, _props$PreviousCompon = _props.PreviousComponent, PreviousComponent = _props$PreviousCompon === undefined ? defaultButton : _props$PreviousCompon, _props$NextComponent = _props.NextComponent, NextComponent = _props$NextComponent === undefined ? defaultButton : _props$NextComponent;
                return _react2.default.createElement('div', {
                    className: (0, _classnames2.default)(className, '-pagination'),
                    style: this.props.paginationStyle
                }, _react2.default.createElement('div', { className: '-previous' }, _react2.default.createElement(PreviousComponent, {
                    onClick: function onClick() {
                        if (!canPrevious)
                            return;
                        _this2.changePage(page - 1);
                    },
                    disabled: !canPrevious
                }, this.props.previousText)), _react2.default.createElement('div', { className: '-center' }, _react2.default.createElement('span', { className: '-pageInfo' }, this.props.pageText, ' ', showPageJump ? _react2.default.createElement('div', { className: '-pageJump' }, _react2.default.createElement('input', {
                    type: this.state.page === '' ? 'text' : 'number',
                    onChange: function onChange(e) {
                        var val = e.target.value;
                        var page = val - 1;
                        if (val === '') {
                            return _this2.setState({ page: val });
                        }
                        _this2.setState({ page: _this2.getSafePage(page) });
                    },
                    value: this.state.page === '' ? '' : this.state.page + 1,
                    onBlur: this.applyPage,
                    onKeyPress: function onKeyPress(e) {
                        if (e.which === 13 || e.keyCode === 13) {
                            _this2.applyPage();
                        }
                    }
                })) : _react2.default.createElement('span', { className: '-currentPage' }, page + 1), ' ', this.props.ofText, ' ', _react2.default.createElement('span', { className: '-totalPages' }, pages || 1)), showPageSizeOptions && _react2.default.createElement('span', { className: 'select-wrap -pageSizeOptions' }, _react2.default.createElement('select', {
                    onChange: function onChange(e) {
                        return onPageSizeChange(Number(e.target.value));
                    },
                    value: pageSize
                }, pageSizeOptions.map(function (option, i) {
                    return (
                    // eslint-disable-next-line react/no-array-index-key
                    _react2.default.createElement('option', { key: i, value: option }, option, ' ', _this2.props.rowsText));
                })))), _react2.default.createElement('div', { className: '-next' }, _react2.default.createElement(NextComponent, {
                    onClick: function onClick() {
                        if (!canNext)
                            return;
                        _this2.changePage(page + 1);
                    },
                    disabled: !canNext
                }, this.props.nextText)));
            }
        }]);
    return ReactTablePagination;
}(_react.Component);
exports.default = ReactTablePagination;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _propTypes = __webpack_require__(35);
var _propTypes2 = _interopRequireDefault(_propTypes);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
exports.default = {
    // General
    data: _propTypes2.default.array,
    loading: _propTypes2.default.bool,
    showPagination: _propTypes2.default.bool,
    showPaginationTop: _propTypes2.default.bool,
    showPaginationBottom: _propTypes2.default.bool,
    showPageSizeOptions: _propTypes2.default.bool,
    pageSizeOptions: _propTypes2.default.array,
    defaultPageSize: _propTypes2.default.number,
    showPageJump: _propTypes2.default.bool,
    collapseOnSortingChange: _propTypes2.default.bool,
    collapseOnPageChange: _propTypes2.default.bool,
    collapseOnDataChange: _propTypes2.default.bool,
    freezeWhenExpanded: _propTypes2.default.bool,
    sortable: _propTypes2.default.bool,
    resizable: _propTypes2.default.bool,
    filterable: _propTypes2.default.bool,
    defaultSortDesc: _propTypes2.default.bool,
    defaultSorted: _propTypes2.default.array,
    defaultFiltered: _propTypes2.default.array,
    defaultResized: _propTypes2.default.array,
    defaultExpanded: _propTypes2.default.object,
    defaultFilterMethod: _propTypes2.default.func,
    defaultSortMethod: _propTypes2.default.func,
    // Controlled State Callbacks
    onPageChange: _propTypes2.default.func,
    onPageSizeChange: _propTypes2.default.func,
    onSortedChange: _propTypes2.default.func,
    onFilteredChange: _propTypes2.default.func,
    onResizedChange: _propTypes2.default.func,
    onExpandedChange: _propTypes2.default.func,
    // Pivoting
    pivotBy: _propTypes2.default.array,
    // Key Constants
    pivotValKey: _propTypes2.default.string,
    pivotIDKey: _propTypes2.default.string,
    subRowsKey: _propTypes2.default.string,
    aggregatedKey: _propTypes2.default.string,
    nestingLevelKey: _propTypes2.default.string,
    originalKey: _propTypes2.default.string,
    indexKey: _propTypes2.default.string,
    groupedByPivotKey: _propTypes2.default.string,
    // Server-side Callbacks
    onFetchData: _propTypes2.default.func,
    // Classes
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    // Component decorators
    getProps: _propTypes2.default.func,
    getTableProps: _propTypes2.default.func,
    getTheadGroupProps: _propTypes2.default.func,
    getTheadGroupTrProps: _propTypes2.default.func,
    getTheadGroupThProps: _propTypes2.default.func,
    getTheadProps: _propTypes2.default.func,
    getTheadTrProps: _propTypes2.default.func,
    getTheadThProps: _propTypes2.default.func,
    getTheadFilterProps: _propTypes2.default.func,
    getTheadFilterTrProps: _propTypes2.default.func,
    getTheadFilterThProps: _propTypes2.default.func,
    getTbodyProps: _propTypes2.default.func,
    getTrGroupProps: _propTypes2.default.func,
    getTrProps: _propTypes2.default.func,
    getTdProps: _propTypes2.default.func,
    getTfootProps: _propTypes2.default.func,
    getTfootTrProps: _propTypes2.default.func,
    getTfootTdProps: _propTypes2.default.func,
    getPaginationProps: _propTypes2.default.func,
    getLoadingProps: _propTypes2.default.func,
    getNoDataProps: _propTypes2.default.func,
    getResizerProps: _propTypes2.default.func,
    // Global Column Defaults
    columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        // Renderers
        Cell: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.func]),
        Header: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.func]),
        Footer: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.func]),
        Aggregated: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.func]),
        Pivot: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.func]),
        PivotValue: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.func]),
        Expander: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.func]),
        Filter: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
        // All Columns
        sortable: _propTypes2.default.bool,
        resizable: _propTypes2.default.bool,
        filterable: _propTypes2.default.bool,
        show: _propTypes2.default.bool,
        minWidth: _propTypes2.default.number,
        // Cells only
        className: _propTypes2.default.string,
        style: _propTypes2.default.object,
        getProps: _propTypes2.default.func,
        // Pivot only
        aggregate: _propTypes2.default.func,
        // Headers only
        headerClassName: _propTypes2.default.string,
        headerStyle: _propTypes2.default.object,
        getHeaderProps: _propTypes2.default.func,
        // Footers only
        footerClassName: _propTypes2.default.string,
        footerStyle: _propTypes2.default.object,
        getFooterProps: _propTypes2.default.object,
        filterMethod: _propTypes2.default.func,
        filterAll: _propTypes2.default.bool,
        sortMethod: _propTypes2.default.func
    })),
    // Global Expander Column Defaults
    expanderDefaults: _propTypes2.default.shape({
        sortable: _propTypes2.default.bool,
        resizable: _propTypes2.default.bool,
        filterable: _propTypes2.default.bool,
        width: _propTypes2.default.number
    }),
    pivotDefaults: _propTypes2.default.object,
    // Text
    previousText: _propTypes2.default.node,
    nextText: _propTypes2.default.node,
    loadingText: _propTypes2.default.node,
    noDataText: _propTypes2.default.node,
    pageText: _propTypes2.default.node,
    ofText: _propTypes2.default.node,
    rowsText: _propTypes2.default.node,
    // Components
    TableComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    TheadComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    TbodyComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    TrGroupComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    TrComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    ThComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    TdComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    TfootComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    FilterComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    ExpanderComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    PivotValueComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    AggregatedComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    // this is a computed default generated using
    PivotComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    // the ExpanderComponent and PivotValueComponent at run-time in methods.js
    PaginationComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    PreviousComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    NextComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    LoadingComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    NoDataComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    ResizerComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),
    PadRowComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element])
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (process.env.NODE_ENV !== 'production') {
    var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
        Symbol.for &&
        Symbol.for('react.element')) ||
        0xeac7;
    var isValidElement = function (object) {
        return typeof object === 'object' &&
            object !== null &&
            object.$$typeof === REACT_ELEMENT_TYPE;
    };
    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = __webpack_require__(36)(isValidElement, throwOnDirectAccess);
}
else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = __webpack_require__(37)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var warning = __webpack_require__(8);
var assign = __webpack_require__(7);
var ReactPropTypesSecret = __webpack_require__(9);
var checkPropTypes = __webpack_require__(14);
module.exports = function (isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === 'function') {
            return iteratorFn;
        }
    }
    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */
    var ANONYMOUS = '<<anonymous>>';
    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
        array: createPrimitiveTypeChecker('array'),
        bool: createPrimitiveTypeChecker('boolean'),
        func: createPrimitiveTypeChecker('function'),
        number: createPrimitiveTypeChecker('number'),
        object: createPrimitiveTypeChecker('object'),
        string: createPrimitiveTypeChecker('string'),
        symbol: createPrimitiveTypeChecker('symbol'),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker,
    };
    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
        // SameValue algorithm
        if (x === y) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        }
        else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    }
    /*eslint-enable no-self-compare*/
    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
        this.message = message;
        this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;
    function createChainableTypeChecker(validate) {
        if (process.env.NODE_ENV !== 'production') {
            var manualPropTypeCallCache = {};
            var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
            componentName = componentName || ANONYMOUS;
            propFullName = propFullName || propName;
            if (secret !== ReactPropTypesSecret) {
                if (throwOnDirectAccess) {
                    // New behavior only for users of `prop-types` package
                    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
                        'Use `PropTypes.checkPropTypes()` to call them. ' +
                        'Read more at http://fb.me/use-check-prop-types');
                }
                else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
                    // Old behavior for people using React.PropTypes
                    var cacheKey = componentName + ':' + propName;
                    if (!manualPropTypeCallCache[cacheKey] &&
                        // Avoid spamming the console because they are often not actionable except for lib authors
                        manualPropTypeWarningCount < 3) {
                        warning(false, 'You are manually calling a React.PropTypes validation ' +
                            'function for the `%s` prop on `%s`. This is deprecated ' +
                            'and will throw in the standalone `prop-types` package. ' +
                            'You may be seeing this warning due to a third-party PropTypes ' +
                            'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
                        manualPropTypeCallCache[cacheKey] = true;
                        manualPropTypeWarningCount++;
                    }
                }
            }
            if (props[propName] == null) {
                if (isRequired) {
                    if (props[propName] === null) {
                        return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
                    }
                    return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
                }
                return null;
            }
            else {
                return validate(props, propName, componentName, location, propFullName);
            }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
    }
    function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== expectedType) {
                // `propValue` being instance of, say, date/regexp, pass the 'object'
                // check, but we can offer a more precise error message here rather than
                // 'of type `object`'.
                var preciseType = getPreciseType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunction.thatReturnsNull);
    }
    function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== 'function') {
                return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
            }
            var propValue = props[propName];
            if (!Array.isArray(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
            }
            for (var i = 0; i < propValue.length; i++) {
                var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
                if (error instanceof Error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            if (!isValidElement(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
            if (!(props[propName] instanceof expectedClass)) {
                var expectedClassName = expectedClass.name || ANONYMOUS;
                var actualClassName = getClassName(props[propName]);
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
            return emptyFunction.thatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            for (var i = 0; i < expectedValues.length; i++) {
                if (is(propValue, expectedValues[i])) {
                    return null;
                }
            }
            var valuesString = JSON.stringify(expectedValues);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
        }
        return createChainableTypeChecker(validate);
    }
    function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
            if (typeof typeChecker !== 'function') {
                return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
            }
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== 'object') {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
            }
            for (var key in propValue) {
                if (propValue.hasOwnProperty(key)) {
                    var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
                    if (error instanceof Error) {
                        return error;
                    }
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
            return emptyFunction.thatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            if (typeof checker !== 'function') {
                warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
                    'received %s at index %s.', getPostfixForTypeWarning(checker), i);
                return emptyFunction.thatReturnsNull;
            }
        }
        function validate(props, propName, componentName, location, propFullName) {
            for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                var checker = arrayOfTypeCheckers[i];
                if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
                    return null;
                }
            }
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
        }
        return createChainableTypeChecker(validate);
    }
    function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
            if (!isNode(props[propName])) {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== 'object') {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
            }
            for (var key in shapeTypes) {
                var checker = shapeTypes[key];
                if (!checker) {
                    continue;
                }
                var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
                if (error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== 'object') {
                return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
            }
            // We need to check all keys in case some are required but missing from
            // props.
            var allKeys = assign({}, props[propName], shapeTypes);
            for (var key in allKeys) {
                var checker = shapeTypes[key];
                if (!checker) {
                    return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
                        '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
                        '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
                }
                var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
                if (error) {
                    return error;
                }
            }
            return null;
        }
        return createChainableTypeChecker(validate);
    }
    function isNode(propValue) {
        switch (typeof propValue) {
            case 'number':
            case 'string':
            case 'undefined':
                return true;
            case 'boolean':
                return !propValue;
            case 'object':
                if (Array.isArray(propValue)) {
                    return propValue.every(isNode);
                }
                if (propValue === null || isValidElement(propValue)) {
                    return true;
                }
                var iteratorFn = getIteratorFn(propValue);
                if (iteratorFn) {
                    var iterator = iteratorFn.call(propValue);
                    var step;
                    if (iteratorFn !== propValue.entries) {
                        while (!(step = iterator.next()).done) {
                            if (!isNode(step.value)) {
                                return false;
                            }
                        }
                    }
                    else {
                        // Iterator will provide entry [k,v] tuples rather than values.
                        while (!(step = iterator.next()).done) {
                            var entry = step.value;
                            if (entry) {
                                if (!isNode(entry[1])) {
                                    return false;
                                }
                            }
                        }
                    }
                }
                else {
                    return false;
                }
                return true;
            default:
                return false;
        }
    }
    function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === 'symbol') {
            return true;
        }
        // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
        if (propValue['@@toStringTag'] === 'Symbol') {
            return true;
        }
        // Fallback for non-spec compliant Symbols which are polyfilled.
        if (typeof Symbol === 'function' && propValue instanceof Symbol) {
            return true;
        }
        return false;
    }
    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
            return 'array';
        }
        if (propValue instanceof RegExp) {
            // Old webkits (at least until Android 4.0) return 'function' rather than
            // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
            // passes PropTypes.object.
            return 'object';
        }
        if (isSymbol(propType, propValue)) {
            return 'symbol';
        }
        return propType;
    }
    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
        if (typeof propValue === 'undefined' || propValue === null) {
            return '' + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === 'object') {
            if (propValue instanceof Date) {
                return 'date';
            }
            else if (propValue instanceof RegExp) {
                return 'regexp';
            }
        }
        return propType;
    }
    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
            case 'array':
            case 'object':
                return 'an ' + type;
            case 'boolean':
            case 'date':
            case 'regexp':
                return 'a ' + type;
            default:
                return type;
        }
    }
    // Returns class name of the object, if any.
    function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
            return ANONYMOUS;
        }
        return propValue.constructor.name;
    }
    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var ReactPropTypesSecret = __webpack_require__(9);
module.exports = function () {
    function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret === ReactPropTypesSecret) {
            // It is still safe when called from React.
            return;
        }
        invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use PropTypes.checkPropTypes() to call them. ' +
            'Read more at http://fb.me/use-check-prop-types');
    }
    ;
    shim.isRequired = shim;
    function getShim() {
        return shim;
    }
    ;
    // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
        array: shim,
        bool: shim,
        func: shim,
        number: shim,
        object: shim,
        string: shim,
        symbol: shim,
        any: shim,
        arrayOf: getShim,
        element: shim,
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim
    };
    ReactPropTypes.checkPropTypes = emptyFunction;
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".ReactTable{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;border:1px solid rgba(0,0,0,0.1);}.ReactTable *{box-sizing:border-box}.ReactTable .rt-table{-webkit-box-flex:1;-ms-flex:auto 1;flex:auto 1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;width:100%;border-collapse:collapse;overflow:auto}.ReactTable .rt-thead{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.ReactTable .rt-thead.-headerGroups{background:rgba(0,0,0,0.03);border-bottom:1px solid rgba(0,0,0,0.05)}.ReactTable .rt-thead.-filters{border-bottom:1px solid rgba(0,0,0,0.05);}.ReactTable .rt-thead.-filters input,.ReactTable .rt-thead.-filters select{border:1px solid rgba(0,0,0,0.1);background:#fff;padding:5px 7px;font-size:inherit;border-radius:3px;font-weight:normal;outline:none}.ReactTable .rt-thead.-filters .rt-th{border-right:1px solid rgba(0,0,0,0.02)}.ReactTable .rt-thead.-header{box-shadow:0 2px 15px 0 rgba(0,0,0,0.15)}.ReactTable .rt-thead .rt-tr{text-align:center}.ReactTable .rt-thead .rt-th,.ReactTable .rt-thead .rt-td{padding:5px 5px;line-height:normal;position:relative;border-right:1px solid rgba(0,0,0,0.05);transition:box-shadow .3s cubic-bezier(.175,.885,.32,1.275);box-shadow:inset 0 0 0 0 transparent;}.ReactTable .rt-thead .rt-th.-sort-asc,.ReactTable .rt-thead .rt-td.-sort-asc{box-shadow:inset 0 3px 0 0 rgba(0,0,0,0.6)}.ReactTable .rt-thead .rt-th.-sort-desc,.ReactTable .rt-thead .rt-td.-sort-desc{box-shadow:inset 0 -3px 0 0 rgba(0,0,0,0.6)}.ReactTable .rt-thead .rt-th.-cursor-pointer,.ReactTable .rt-thead .rt-td.-cursor-pointer{cursor:pointer}.ReactTable .rt-thead .rt-th:last-child,.ReactTable .rt-thead .rt-td:last-child{border-right:0}.ReactTable .rt-thead .rt-resizable-header{overflow:visible;}.ReactTable .rt-thead .rt-resizable-header:last-child{overflow:hidden}.ReactTable .rt-thead .rt-resizable-header-content{overflow:hidden;text-overflow:ellipsis}.ReactTable .rt-thead .rt-header-pivot{border-right-color:#f7f7f7}.ReactTable .rt-thead .rt-header-pivot:after,.ReactTable .rt-thead .rt-header-pivot:before{left:100%;top:50%;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none}.ReactTable .rt-thead .rt-header-pivot:after{border-color:rgba(255,255,255,0);border-left-color:#fff;border-width:8px;margin-top:-8px}.ReactTable .rt-thead .rt-header-pivot:before{border-color:rgba(102,102,102,0);border-left-color:#f7f7f7;border-width:10px;margin-top:-10px}.ReactTable .rt-tbody{-webkit-box-flex:99999;-ms-flex:99999 1 auto;flex:99999 1 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;overflow:auto;}.ReactTable .rt-tbody .rt-tr-group{border-bottom:solid 1px rgba(0,0,0,0.05);}.ReactTable .rt-tbody .rt-tr-group:last-child{border-bottom:0}.ReactTable .rt-tbody .rt-td{border-right:1px solid rgba(0,0,0,0.02);}.ReactTable .rt-tbody .rt-td:last-child{border-right:0}.ReactTable .rt-tbody .rt-expandable{cursor:pointer}.ReactTable .rt-tr-group{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.ReactTable .rt-tr{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.ReactTable .rt-th,.ReactTable .rt-td{-webkit-box-flex:1;-ms-flex:1 0 0px;flex:1 0 0;white-space:nowrap;text-overflow:ellipsis;padding:7px 5px;overflow:hidden;transition:.3s ease;transition-property:width,min-width,padding,opacity;}.ReactTable .rt-th.-hidden,.ReactTable .rt-td.-hidden{width:0 !important;min-width:0 !important;padding:0 !important;border:0 !important;opacity:0 !important}.ReactTable .rt-expander{display:inline-block;position:relative;margin:0;color:transparent;margin:0 10px;}.ReactTable .rt-expander:after{content:'';position:absolute;width:0;height:0;top:50%;left:50%;-webkit-transform:translate(-50%,-50%) rotate(-90deg);transform:translate(-50%,-50%) rotate(-90deg);border-left:5.04px solid transparent;border-right:5.04px solid transparent;border-top:7px solid rgba(0,0,0,0.8);transition:all .3s cubic-bezier(.175,.885,.32,1.275);cursor:pointer}.ReactTable .rt-expander.-open:after{-webkit-transform:translate(-50%,-50%) rotate(0);transform:translate(-50%,-50%) rotate(0)}.ReactTable .rt-resizer{display:inline-block;position:absolute;width:36px;top:0;bottom:0;right:-18px;cursor:col-resize;z-index:10}.ReactTable .rt-tfoot{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;box-shadow:0 0 15px 0 rgba(0,0,0,0.15);}.ReactTable .rt-tfoot .rt-td{border-right:1px solid rgba(0,0,0,0.05);}.ReactTable .rt-tfoot .rt-td:last-child{border-right:0}.ReactTable.-striped .rt-tr.-odd{background:rgba(0,0,0,0.03)}.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover{background:rgba(0,0,0,0.05)}.ReactTable .-pagination{z-index:1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:3px;box-shadow:0 0 15px 0 rgba(0,0,0,0.1);border-top:2px solid rgba(0,0,0,0.1);}.ReactTable .-pagination input,.ReactTable .-pagination select{border:1px solid rgba(0,0,0,0.1);background:#fff;padding:5px 7px;font-size:inherit;border-radius:3px;font-weight:normal;outline:none}.ReactTable .-pagination .-btn{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:block;width:100%;height:100%;border:0;border-radius:3px;padding:6px;font-size:1em;color:rgba(0,0,0,0.6);background:rgba(0,0,0,0.1);transition:all .1s ease;cursor:pointer;outline:none;}.ReactTable .-pagination .-btn[disabled]{opacity:.5;cursor:default}.ReactTable .-pagination .-btn:not([disabled]):hover{background:rgba(0,0,0,0.3);color:#fff}.ReactTable .-pagination .-previous,.ReactTable .-pagination .-next{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center}.ReactTable .-pagination .-center{-webkit-box-flex:1.5;-ms-flex:1.5;flex:1.5;text-align:center;margin-bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.ReactTable .-pagination .-pageInfo{display:inline-block;margin:3px 10px;white-space:nowrap}.ReactTable .-pagination .-pageJump{display:inline-block;}.ReactTable .-pagination .-pageJump input{width:70px;text-align:center}.ReactTable .-pagination .-pageSizeOptions{margin:3px 10px}.ReactTable .rt-noData{display:block;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background:rgba(255,255,255,0.8);transition:all .3s ease;z-index:1;pointer-events:none;padding:20px;color:rgba(0,0,0,0.5)}.ReactTable .-loading{display:block;position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(255,255,255,0.8);transition:all .3s ease;z-index:-1;opacity:0;pointer-events:none;}.ReactTable .-loading > div{position:absolute;display:block;text-align:center;width:100%;top:50%;left:0;font-size:15px;color:rgba(0,0,0,0.6);-webkit-transform:translateY(-52%);transform:translateY(-52%);transition:all .3s cubic-bezier(.25,.46,.45,.94)}.ReactTable .-loading.-active{opacity:1;z-index:2;pointer-events:all;}.ReactTable .-loading.-active > div{-webkit-transform:translateY(50%);transform:translateY(50%)}.ReactTable .rt-resizing .rt-th,.ReactTable .rt-resizing .rt-td{transition:none !important;cursor:col-resize;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
// import { render } from "react-dom";
// Import React Table
var react_table_1 = __webpack_require__(10);
__webpack_require__(12);
var PlansTable_1 = __webpack_require__(40);
var HabitatsTable = /** @class */ (function (_super) {
    __extends(HabitatsTable, _super);
    // https://react-table.js.org/#/story/readme
    function HabitatsTable(props) {
        var _this = _super.call(this, props) || this;
        _this.getHabitatsForClient = function (id) {
            if (!id) {
                return Promise.resolve({ habitats: [] });
            }
            return fetch("http://test.ideesalter.com/alia_searchHabitat.php?client_id=" + id)
                .then(function (response) { return response.json(); })
                .then(function (habitats) { return _this.setState({ habitats: habitats }); });
        };
        // componentWillReceiveProps(nextProps) {
        //   console.log("componentWillReceiveProps=======");
        //   if( nextProps !== this.props ) {
        //     console.log(nextProps);
        //       this.setState({
        //         habitats: nextProps.habitats
        //       });
        //   }
        //   console.log("=======componentWillReceiveProps");
        // }
        // id
        // nom
        // adresse
        // email
        // telephone
        _this.handleEventsOnHabitat = function (state, rowInfo, column, instance) {
            return {
                onClick: function (e) {
                    var currentHabitat = rowInfo.original;
                    // console.log('A Td Element was clicked!')
                    // console.log('it produced this event:', e)
                    // console.log('It was in this column:', column)
                    // console.log('It was in this row:', rowInfo)
                    // console.log('It was in this table instance:', instance)
                }
            };
        };
        _this.state = {
            client: props.client,
            habitats: [],
            startDate: undefined,
            stopDate: undefined
        };
        return _this;
    }
    HabitatsTable.prototype.componentDidMount = function () {
        this.getHabitatsForClient(this.state.client.id);
    };
    HabitatsTable.prototype.render = function () {
        var habitats = this.state.habitats;
        var columns = [
            { Header: "Id",
                accessor: "id"
            },
            { Header: "Adresse",
                accessor: "adresse"
            },
        ];
        if (habitats.length === 0 || (habitats.length === 1 && habitats[0] === undefined)) {
            return (react_1.default.createElement("div", null));
        }
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(react_table_1.default, { data: habitats, noDataText: "Pas d'habitat pour ce client", columns: columns, defaultPageSize: 1, className: "-striped -highlight", getTrProps: this.handleEventsOnHabitat, SubComponent: function (row) {
                    return (react_1.default.createElement(PlansTable_1.PlansTable, { habitat: row.original }));
                } }),
            react_1.default.createElement("br", null)));
    };
    return HabitatsTable;
}(react_1.default.Component));
exports.HabitatsTable = HabitatsTable;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(0);
// import { render } from "react-dom";
// Import React Table
var react_table_1 = __webpack_require__(10);
__webpack_require__(12);
var Plan_1 = __webpack_require__(15);
__webpack_require__(15);
var PlansTable = /** @class */ (function (_super) {
    __extends(PlansTable, _super);
    // https://react-table.js.org/#/story/readme
    function PlansTable(props) {
        var _this = _super.call(this, props) || this;
        _this.getPlansForHabitat = function (id) {
            if (!id) {
                return Promise.resolve({ plans: [] });
            }
            return fetch("http://test.ideesalter.com/alia_searchPlan.php?habitat_id=" + id)
                .then(function (response) { return response.json(); })
                .then(function (plans) { return _this.setState({ plans: plans }); });
        };
        // componentWillReceiveProps(nextProps) {
        //   console.log("componentWillReceiveProps=======");
        //   if( nextProps !== this.props ) {
        //     console.log(nextProps);
        //       this.setState({
        //         habitats: nextProps.habitats
        //       });
        //   }
        //   console.log("=======componentWillReceiveProps");
        // }
        // id
        // nom
        // adresse
        // email
        // telephone
        _this.handleEventsOnPlan = function (state, rowInfo, column, instance) {
            return {
                onClick: function (e) {
                    var currentPlan = rowInfo.original;
                    // console.log('A Td Element was clicked!')
                    // console.log('it produced this event:', e)
                    // console.log('It was in this column:', column)
                    // console.log('It was in this row:', rowInfo)
                    // console.log('It was in this table instance:', instance)
                }
            };
        };
        _this.state = {
            habitat: props.habitat,
            plans: [],
        };
        return _this;
    }
    PlansTable.prototype.componentDidMount = function () {
        this.getPlansForHabitat(this.state.habitat.id);
    };
    PlansTable.prototype.render = function () {
        var plans = this.state.plans;
        var columns = [
            { Header: "Id",
                accessor: "id"
            },
            { Header: "Etage",
                accessor: "etage"
            },
        ];
        if (plans.length === 0 || (plans.length === 1 && plans[0] === undefined)) {
            return (react_1.default.createElement("div", null));
        }
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(react_table_1.default, { data: plans, noDataText: "Pas de plan pour ce client", columns: columns, defaultPageSize: plans.length, showPagination: false, showPageJump: false, className: "-striped -highlight", getTrProps: this.handleEventsOnPlan, SubComponent: function (row) {
                    return (react_1.default.createElement(Plan_1.Plan, { id: row.original.id }));
                    // return (
                    //   <img src={`http://test.ideesalter.com/alia_afficheImagePlan.php?id=${plan.id}`} alt={"étage " + plan.etage}/>
                    // );
                } }),
            react_1.default.createElement("br", null)));
    };
    return PlansTable;
}(react_1.default.Component));
exports.PlansTable = PlansTable;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".ui-datepicker-div {\r\n    z-index: 999999;\r\n}", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map