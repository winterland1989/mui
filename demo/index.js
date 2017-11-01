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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, global) {;(function() {
"use strict"
function Vnode(tag, key, attrs0, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
	return node
}
Vnode.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode.normalize(children[i])
	}
	return children
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty
function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}
function execSelector(state, attrs, children) {
	var hasAttrs = false, childList, text
	var className = attrs.className || attrs.class
	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key)) {
			attrs[key] = state.attrs[key]
		}
	}
	if (className !== undefined) {
		if (attrs.class !== undefined) {
			attrs.class = undefined
			attrs.className = className
		}
		if (state.attrs.className != null) {
			attrs.className = state.attrs.className + " " + className
		}
	}
	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			hasAttrs = true
			break
		}
	}
	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		text = children[0].children
	} else {
		childList = children
	}
	return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text)
}
function hyperscript(selector) {
	// Because sloppy mode sucks
	var attrs = arguments[1], start = 2, children
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	if (typeof selector === "string") {
		var cached = selectorCache[selector] || compileSelector(selector)
	}
	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = 1
	}
	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}
	var normalized = Vnode.normalizeChildren(children)
	if (typeof selector === "string") {
		return execSelector(cached, attrs, normalized)
	} else {
		return Vnode(selector, attrs.key, attrs, normalized)
	}
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function(attrs1, children) {
	return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
}
var m = hyperscript
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
	var PromisePolyfill = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
	var PromisePolyfill = global.Promise
} else {
}
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key0 in object) {
		destructure(key0, object[key0])
	}
	return args.join("&")
	function destructure(key0, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}
var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i")
var _8 = function($window, Promise) {
	var callbackCount = 0
	var oncompletion
	function setCompletionCallback(callback) {oncompletion = callback}
	function finalizer() {
		var count = 0
		function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
		return function finalize(promise0) {
			var then0 = promise0.then
			promise0.then = function() {
				count++
				var next = then0.apply(promise0, arguments)
				next.then(complete, function(e) {
					complete()
					if (count === 0) throw e
				})
				return finalize(next)
			}
			return promise0
		}
	}
	function normalize(args, extra) {
		if (typeof args === "string") {
			var url = args
			args = extra || {}
			if (args.url == null) args.url = url
		}
		return args
	}
	function request(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			if (args.method == null) args.method = "GET"
			args.method = args.method.toUpperCase()
			var useBody = (args.method === "GET" || args.method === "TRACE") ? false : (typeof args.useBody === "boolean" ? args.useBody : true)
			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract
			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)
			var xhr = new $window.XMLHttpRequest(),
				aborted = false,
				_abort = xhr.abort
			xhr.abort = function abort() {
				aborted = true
				_abort.call(xhr)
			}
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (args.serialize === JSON.stringify && useBody && !(args.headers && args.headers.hasOwnProperty("Content-Type"))) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize && !(args.headers && args.headers.hasOwnProperty("Accept"))) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
				xhr.setRequestHeader(key, args.headers[key])
			}
			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
			xhr.onreadystatechange = function() {
				// Don't throw errors on xhr.abort().
				if(aborted) return
				if (xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
							resolve(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()
		})
		return args.background === true ? promise0 : finalize(promise0)
	}
	function jsonp(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				resolve(cast(args.type, data))
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
		})
		return args.background === true? promise0 : finalize(promise0)
	}
	function interpolate(url, data) {
		if (data == null) return url
		var tokens = url.match(/:[^\/]+/gi) || []
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1)
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key])
			}
		}
		return url
	}
	function assemble(url, data) {
		var querystring = buildQueryString(data)
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&"
			url += prefix + querystring
		}
		return url
	}
	function deserialize(data) {
		try {return data !== "" ? JSON.parse(data) : null}
		catch (e) {throw new Error(data)}
	}
	function extract(xhr) {return xhr.responseText}
	function cast(type0, data) {
		if (typeof type0 === "function") {
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					data[i] = new type0(data[i])
				}
			}
			else return new type0(data)
		}
		return data
	}
	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
}
var requestService = _8(window, PromisePolyfill)
var coreRenderer = function($window) {
	var $doc = $window.document
	var $emptyFragment = $doc.createDocumentFragment()
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}
	var onevent
	function setEventCallback(callback) {return onevent = callback}
	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": return createText(parent, vnode, nextSibling)
				case "<": return createHTML(parent, vnode, nextSibling)
				case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
				default: return createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else return createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
		return vnode.dom
	}
	function createHTML(parent, vnode, nextSibling) {
		var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
		var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
		var temp = $doc.createElement(parent1)
		temp.innerHTML = vnode.children
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs2 = vnode.attrs
		var is = attrs2 && attrs2.is
		ns = getNameSpace(vnode) || ns
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element
		if (attrs2 != null) {
			setAttrs(vnode, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				setLateAttrs(vnode)
			}
		}
		return element
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		vnode._state = vnode.state
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		initLifecycle(vnode._state, vnode, hooks)
		vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
			insertNode(parent, element, nextSibling)
			return element
		}
		else {
			vnode.domSize = 0
			return $emptyFragment
		}
	}
	//update
	function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
		else {
			if (old.length === vnodes.length) {
				var isUnkeyed = false
				for (var i = 0; i < vnodes.length; i++) {
					if (vnodes[i] != null && old[i] != null) {
						isUnkeyed = vnodes[i].key == null && old[i].key == null
						break
					}
				}
				if (isUnkeyed) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i]) continue
						else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)
					}
					return
				}
			}
			recycling = recycling || isRecyclable(old, vnodes)
			if (recycling) {
				var pool = old.pool
				old = old.concat(old.pool)
			}
			var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldStart], v = vnodes[start]
				if (o === v && !recycling) oldStart++, start++
				else if (o == null) oldStart++
				else if (v == null) start++
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldStart >= old.length - pool.length) || ((pool == null) && recycling)
					oldStart++, start++
					updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
				}
				else {
					var o = old[oldEnd]
					if (o === v && !recycling) oldEnd--, start++
					else if (o == null) oldEnd--
					else if (v == null) start++
					else if (o.key === v.key) {
						var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
						if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
						oldEnd--, start++
					}
					else break
				}
			}
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldEnd], v = vnodes[end]
				if (o === v && !recycling) oldEnd--, end--
				else if (o == null) oldEnd--
				else if (v == null) end--
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
					updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					if (o.dom != null) nextSibling = o.dom
					oldEnd--, end--
				}
				else {
					if (!map) map = getKeyMap(old, oldEnd)
					if (v != null) {
						var oldIndex = map[v.key]
						if (oldIndex != null) {
							var movable = old[oldIndex]
							var shouldRecycle = (pool != null && oldIndex >= old.length - pool.length) || ((pool == null) && recycling)
							updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							insertNode(parent, toFragment(movable), nextSibling)
							old[oldIndex].skip = true
							if (movable.dom != null) nextSibling = movable.dom
						}
						else {
							var dom = createNode(parent, v, hooks, ns, nextSibling)
							nextSibling = dom
						}
					}
					end--
				}
				if (end < start) break
			}
			createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
			removeNodes(old, oldStart, oldEnd + 1, vnodes)
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode._state = old._state
			vnode.events = old.events
			if (!recycling && shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					if (recycling) {
						vnode.state = {}
						initLifecycle(vnode.attrs, vnode, hooks)
					}
					else updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, nextSibling); break
					case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, recycling, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
		}
		else {
			removeNode(old, null)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, nextSibling) {
		if (old.children !== vnode.children) {
			toFragment(old)
			createHTML(parent, vnode, nextSibling)
		}
		else vnode.dom = old.dom, vnode.domSize = old.domSize
	}
	function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, recycling, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns
		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle0 multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else if (old.text != null && vnode.text != null && vnode.text !== "") {
			if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
		}
		else {
			if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
			if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		if (recycling) {
			initComponent(vnode, hooks)
		} else {
			vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
			if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
			updateLifecycle(vnode._state, vnode, hooks)
		}
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(old.instance, null)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0
		for (var i = 0; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				var key2 = vnode.key
				if (key2 != null) map[key2] = i
			}
		}
		return map
	}
	function toFragment(vnode) {
		var count0 = vnode.domSize
		if (count0 != null || vnode.dom == null) {
			var fragment = $doc.createDocumentFragment()
			if (count0 > 0) {
				var dom = vnode.dom
				while (--count0) fragment.appendChild(dom.nextSibling)
				fragment.insertBefore(dom, fragment.firstChild)
			}
			return fragment
		}
		else return vnode.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function setContentEditable(vnode) {
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
	}
	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				if (vnode.skip) vnode.skip = false
				else removeNode(vnode, context)
			}
		}
	}
	function removeNode(vnode, context) {
		var expected = 1, called = 0
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
			var result = vnode._state.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		continuation()
		function continuation() {
			if (++called === expected) {
				onremove(vnode)
				if (vnode.dom) {
					var count0 = vnode.domSize || 1
					if (count0 > 1) {
						var dom = vnode.dom
						while (--count0) {
							removeNodeFromDOM(dom.nextSibling)
						}
					}
					removeNodeFromDOM(vnode.dom)
					if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode]
						else context.pool.push(vnode)
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode
		if (parent != null) parent.removeChild(node)
	}
	function onremove(vnode) {
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode)
		if (vnode.instance != null) onremove(vnode.instance)
		else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode, attrs2, ns) {
		for (var key2 in attrs2) {
			setAttr(vnode, key2, null, attrs2[key2], ns)
		}
	}
	function setAttr(vnode, key2, old, value, ns) {
		var element = vnode.dom
		if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
		var nsLastIndex = key2.indexOf(":")
		if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
		}
		else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
		else if (key2 === "style") updateStyle(element, old, value)
		else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
			if (key2 === "value") {
				var normalized0 = "" + value // eslint-disable-line no-implicit-coercion
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select") {
					if (value === null) {
						if (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return
					} else {
						if (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
					}
				}
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old != null && vnode.dom.value === normalized0) return
			}
			// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
			if (vnode.tag === "input" && key2 === "type") {
				element.setAttribute(key2, value)
				return
			}
			element[key2] = value
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key2, "")
				else element.removeAttribute(key2)
			}
			else element.setAttribute(key2 === "className" ? "class" : key2, value)
		}
	}
	function setLateAttrs(vnode) {
		var attrs2 = vnode.attrs
		if (vnode.tag === "select" && attrs2 != null) {
			if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
			if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
		}
	}
	function updateAttrs(vnode, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
			}
		}
		if (old != null) {
			for (var key2 in old) {
				if (attrs2 == null || !(key2 in attrs2)) {
					if (key2 === "className") key2 = "class"
					if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
					else if (key2 !== "key") vnode.dom.removeAttribute(key2)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function isAttribute(attr) {
		return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
	}
	function isCustomElement(vnode){
		return vnode.attrs.is || vnode.tag.indexOf("-") > -1
	}
	function hasIntegrationMethods(source) {
		return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
	}
	//style
	function updateStyle(element, old, style) {
		if (old === style) element.style.cssText = "", old = null
		if (style == null) element.style.cssText = ""
		else if (typeof style === "string") element.style.cssText = style
		else {
			if (typeof old === "string") element.style.cssText = ""
			for (var key2 in style) {
				element.style[key2] = style[key2]
			}
			if (old != null && typeof old !== "string") {
				for (var key2 in old) {
					if (!(key2 in style)) element.style[key2] = ""
				}
			}
		}
	}
	//event
	function updateEvent(vnode, key2, value) {
		var element = vnode.dom
		var callback = typeof onevent !== "function" ? value : function(e) {
			var result = value.call(element, e)
			onevent.call(element, e)
			return result
		}
		if (key2 in element) element[key2] = typeof value === "function" ? callback : null
		else {
			var eventName = key2.slice(2)
			if (vnode.events === undefined) vnode.events = {}
			if (vnode.events[key2] === callback) return
			if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
			if (typeof value === "function") {
				vnode.events[key2] = callback
				element.addEventListener(eventName, vnode.events[key2], false)
			}
		}
	}
	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		var forceVnodeUpdate, forceComponentUpdate
		if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old)
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
			return true
		}
		return false
	}
	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = $doc.activeElement
		var namespace = dom.namespaceURI
		// First time0 rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		if (!Array.isArray(vnodes)) vnodes = [vnodes]
		updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		dom.vnodes = vnodes
		for (var i = 0; i < hooks.length; i++) hooks[i]()
		// document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
		if (active != null && $doc.activeElement !== active) active.focus()
	}
	return {render: render, setEventCallback: setEventCallback}
}
function throttle(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16
	var last = 0, pending = null
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
	return function() {
		var now = Date.now()
		if (last === 0 || now - last >= time) {
			last = now
			callback()
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null
				callback()
				last = Date.now()
			}, time - (now - last))
		}
	}
}
var _11 = function($window) {
	var renderService = coreRenderer($window)
	renderService.setEventCallback(function(e) {
		if (e.redraw === false) e.redraw = undefined
		else redraw()
	})
	var callbacks = []
	function subscribe(key1, callback) {
		unsubscribe(key1)
		callbacks.push(key1, throttle(callback))
	}
	function unsubscribe(key1) {
		var index = callbacks.indexOf(key1)
		if (index > -1) callbacks.splice(index, 2)
	}
	function redraw() {
		for (var i = 1; i < callbacks.length; i += 2) {
			callbacks[i]()
		}
	}
	return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
}
var redrawService = _11(window)
requestService.setCompletionCallback(redrawService.redraw)
var _16 = function(redrawService0) {
	return function(root, component) {
		if (component === null) {
			redrawService0.render(root, [])
			redrawService0.unsubscribe(root)
			return
		}
		
		if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode")
		
		var run0 = function() {
			redrawService0.render(root, Vnode(component))
		}
		redrawService0.subscribe(root, run0)
		redrawService0.redraw()
	}
}
m.mount = _16(redrawService)
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), data0 = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value === "true") value = true
		else if (value === "false") value = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key5 = levels.slice(0, j).join()
				if (counters[key5] == null) counters[key5] = 0
				level = counters[key5]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data0
}
var coreRouter = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function"
	var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
	function normalize1(fragment0) {
		var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
		if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
		return data
	}
	var asyncId
	function debounceAsync(callback0) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync0(function() {
				asyncId = null
				callback0()
			})
		}
	}
	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?")
		var hashIndex = path.indexOf("#")
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
			for (var key4 in queryParams) queryData[key4] = queryParams[key4]
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1))
			for (var key4 in hashParams) hashData[key4] = hashParams[key4]
		}
		return path.slice(0, pathEnd)
	}
	var router = {prefix: "#!"}
	router.getPath = function() {
		var type2 = router.prefix.charAt(0)
		switch (type2) {
			case "#": return normalize1("hash").slice(router.prefix.length)
			case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
			default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
		}
	}
	router.setPath = function(path, data, options) {
		var queryData = {}, hashData = {}
		path = parsePath(path, queryData, hashData)
		if (data != null) {
			for (var key4 in data) queryData[key4] = data[key4]
			path = path.replace(/:([^\/]+)/g, function(match2, token) {
				delete queryData[token]
				return data[token]
			})
		}
		var query = buildQueryString(queryData)
		if (query) path += "?" + query
		var hash = buildQueryString(hashData)
		if (hash) path += "#" + hash
		if (supportsPushState) {
			var state = options ? options.state : null
			var title = options ? options.title : null
			$window.onpopstate()
			if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
			else $window.history.pushState(state, title, router.prefix + path)
		}
		else $window.location.href = router.prefix + path
	}
	router.defineRoutes = function(routes, resolve, reject) {
		function resolveRoute() {
			var path = router.getPath()
			var params = {}
			var pathname = parsePath(path, params, params)
			var state = $window.history.state
			if (state != null) {
				for (var k in state) params[k] = state[k]
			}
			for (var route0 in routes) {
				var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route0.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						}
						resolve(routes[route0], params, path, route0)
					})
					return
				}
			}
			reject(path, params)
		}
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
		else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
		resolveRoute()
	}
	return router
}
var _20 = function($window, redrawService0) {
	var routeService = coreRouter($window)
	var identity = function(v) {return v}
	var render1, component, attrs3, currentPath, lastUpdate
	var route = function(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		var run1 = function() {
			if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
		}
		var bail = function(path) {
			if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
			else throw new Error("Could not resolve default route " + defaultRoute)
		}
		routeService.defineRoutes(routes, function(payload, params, path) {
			var update = lastUpdate = function(routeResolver, comp) {
				if (update !== lastUpdate) return
				component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
				attrs3 = params, currentPath = path, lastUpdate = null
				render1 = (routeResolver.render || identity).bind(routeResolver)
				run1()
			}
			if (payload.view || typeof payload === "function") update({}, payload)
			else {
				if (payload.onmatch) {
					Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
						update(payload, resolved)
					}, bail)
				}
				else update(payload, "div")
			}
		}, bail)
		redrawService0.subscribe(root, run1)
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		routeService.setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = function(prefix0) {routeService.prefix = prefix0}
	route.link = function(vnode1) {
		vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
		vnode1.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault()
			e.redraw = false
			var href = this.getAttribute("href")
			if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
			route.set(href, undefined, undefined)
		}
	}
	route.param = function(key3) {
		if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
		return attrs3
	}
	return route
}
m.route = _20(window, redrawService)
m.withAttr = function(attrName, callback1, context) {
	return function(e) {
		callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
}
var _28 = coreRenderer(window)
m.render = _28.render
m.redraw = redrawService.redraw
m.request = requestService.request
m.jsonp = requestService.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.version = "1.1.5"
m.vnode = Vnode
if (true) module["exports"] = m
else window.m = m
}());
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate, __webpack_require__(4)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var cancelBubble, clearDateHMS, debounce, fastclick, firstErrorInArray, formatDate, formatDateWithHMS, formatHMS, formatXX, getCurrentTargetData, getTarget, getTargetData, m, parseDateWithHMS, removeFromArray, spinner, svg, svgCounter, targetHasClass;

  m = __webpack_require__(0);

  fastclick = __webpack_require__(16);

  fastclick.attach(document.body);

  getTarget = function(event) {
    var elem;
    return elem = event.target || event.srcElement;
  };

  getTargetData = function(event, dataStr) {
    var elem;
    elem = event.target || event.srcElement;
    if (elem.dataset != null) {
      return elem.dataset[dataStr];
    } else {
      return elem.getAttribute('data-' + dataStr);
    }
  };

  getCurrentTargetData = function(event, dataStr) {
    var elem;
    elem = event.currentTarget;
    if (elem.dataset != null) {
      return elem.dataset[dataStr];
    } else {
      return elem.getAttribute('data-' + dataStr);
    }
  };

  targetHasClass = function(elem, str) {
    return (elem.className.indexOf(str)) !== -1;
  };

  cancelBubble = function(e) {
    if (e.cancelBubble === false) {
      e.cancelBubble = true;
    }
    if (typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    return false;
  };

  clearDateHMS = function(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  };

  formatDate = function(date) {
    var dd, mm, yyyy;
    yyyy = date.getFullYear();
    mm = date.getMonth() + 1;
    dd = date.getDate();
    return yyyy + '-' + (formatXX(mm)) + '-' + (formatXX(dd));
  };

  formatHMS = function(date) {
    var hh, mm, ss;
    hh = date.getHours();
    mm = date.getMinutes();
    ss = date.getSeconds();
    return (formatXX(hh)) + ':' + (formatXX(mm)) + ':' + (formatXX(ss));
  };

  formatDateWithHMS = function(date) {
    var hh, mm, ss;
    hh = date.getHours();
    mm = date.getMinutes();
    ss = date.getSeconds();
    return (formatDate(date)) + ' ' + (formatHMS(date));
  };

  parseDateWithHMS = function(dateString) {
    var date, dateStr, hh, mm, ref, ref1, ss, timeStr;
    ref = dateString.split(' '), dateStr = ref[0], timeStr = ref[1];
    date = new Date(dateStr);
    if (timeStr != null) {
      ref1 = timeStr.split(':'), hh = ref1[0], mm = ref1[1], ss = ref1[2];
      date.setHours(parseInt(hh));
      date.setMinutes(parseInt(mm));
      date.setSeconds(parseInt(ss));
    }
    return date;
  };

  formatXX = function(x) {
    if (x < 10) {
      return '0' + x.toString();
    } else {
      return x.toString();
    }
  };

  firstErrorInArray = function(arr) {
    var j, len, x;
    for (j = 0, len = arr.length; j < len; j++) {
      x = arr[j];
      if (x instanceof Error) {
        return x;
      }
    }
  };

  removeFromArray = function(arr, x) {
    var i;
    i = arr.indexOf(x);
    if (i !== -1) {
      arr.splice(i, 1);
    }
    return void 0;
  };

  svgCounter = 0;

  svg = function(svg) {
    return m('i', {
      key: svgCounter++
    }, svg);
  };

  spinner = function(color, size, interval) {
    if (size == null) {
      size = '2em';
    }
    if (interval == null) {
      interval = '1s';
    }
    return svg(m.trust("<svg version=\"1.1\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n    x=\"0px\"\n    y=\"0px\"\n    width=\"" + size + "\"\n    viewBox=\"0 0 80 80\"\n    xml:space=\"preserve\">\n    <path\n        fill=\"" + color + "\"\n        d=\"M40,72C22.4,72,8,57.6,8,40C8,22.4,\n        22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2\n        s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,\n        28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z\"\n        <!-- ANIMATION START -->\n        <animateTransform\n            attributeType=\"xml\"\n            attributeName=\"transform\"\n            type=\"rotate\"\n            from=\"0 40 40\"\n            to=\"360 40 40\"\n            dur=\"" + interval + "\"\n            repeatCount=\"indefinite\"\n        />\n    </path>\n</svg>"));
  };

  debounce = function(fn, delay, leading) {
    var args, pending;
    if (leading == null) {
      leading = false;
    }
    pending = false;
    if (leading) {
      return function() {
        if (!pending) {
          fn.apply(this, arguments);
          pending = true;
          return setTimeout((function() {
            return pending = false;
          }), delay);
        }
      };
    } else {
      args = void 0;
      return function() {
        var self;
        args = arguments;
        self = this;
        if (!pending) {
          pending = true;
          return setTimeout(function() {
            pending = false;
            return fn.apply(self, args);
          }, delay);
        }
      };
    }
  };

  module.exports = {
    getTarget: getTarget,
    getTargetData: getTargetData,
    getCurrentTargetData: getCurrentTargetData,
    targetHasClass: targetHasClass,
    cancelBubble: cancelBubble,
    clearDateHMS: clearDateHMS,
    formatXX: formatXX,
    formatDate: formatDate,
    formatHMS: formatHMS,
    formatDateWithHMS: formatDateWithHMS,
    parseDateWithHMS: parseDateWithHMS,
    firstErrorInArray: firstErrorInArray,
    removeFromArray: removeFromArray,
    noOp: (function() {}),
    svg: svg,
    spinner: spinner,
    debounce: debounce
  };

}).call(this);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.9.3

/*
 * load a css string to DOM(with id is optional), return the style element
 *
 * @param mss {mssObject}
 * @param id {String}
 * @return {DOMNode}
 */

(function() {
  var ClearFix$, KeyFrames, LineSize, MediaQuery, Mixin, PosAbs, PosRel, Size, TRAVERSE, TextEllip$, Vendor, bw, gold, goldR, hsl, hsla, isIeLessThan9, merge, mss, num, parse, parsePropName, parseR, parseSelectors, pc, px, reTag, rgb, rgba, tag, unTag, unit;

  tag = function(mss, id) {
    var cssText, styleEl;
    cssText = parse(mss);
    styleEl = document.createElement('style');
    if (id) {
      styleEl.id = id;
    }
    styleEl.type = 'text/css';
    if (isIeLessThan9) {
      styleEl.appendChild(document.createTextNode(cssText));
    } else {
      styleEl.styleSheet.cssText = cssText;
    }
    document.head = document.head || document.getElementsByTagName('head')[0];
    document.head.appendChild(styleEl);
    return styleEl;
  };


  /*
   * reload a css string to a style element
   *
   * @param mss {mssObject}
   * @param styeEl {DOMNode}
   * @return {DOMNode}
   */

  reTag = function(mss, styleEl) {
    var cssText;
    cssText = parse(mss);
    if (isIeLessThan9) {
      styleEl.childNodes[0].textContent = cssText;
    } else {
      styleEl.styleSheet.cssText = cssText;
    }
    return styleEl;
  };


  /*
   * unload a style element from DOM
   *
   * @param styleEl {DOMNode}
   * @return {undefined}
   */

  unTag = function(styleEl) {
    if (styleEl) {
      return document.head.removeChild(styleEl);
    }
  };


  /*
   * check IE version
   *
   * @return {Boolean}
   */

  isIeLessThan9 = function() {
    var div;
    div = document.createElement('div');
    div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
    return div.getElementsByTagName("i").length === 1;
  };


  /*
   * recursive parser
   *
   * @param selectors {[String]}
   * @param mss {mssObj}
   * @param indent {'    ' | '  ' | ''}
   * @param lineEnd {'\n' | ''}
   * @return {String}
   */

  parseR = function(selectors, mss, indent, lineEnd) {
    var cssRule, key, newSelectors, subCssRule, subSelectors, val;
    cssRule = '';
    subCssRule = '';
    newSelectors = void 0;
    for (key in mss) {
      val = mss[key];
      if (key[0] === '@') {
        if (typeof val === "object") {
          subCssRule += key + "{" + lineEnd + (parseR([''], val, indent, lineEnd)) + "}" + lineEnd;
        } else {
          subCssRule += key + " " + val + ";" + lineEnd;
        }
      } else {
        if (typeof val === "object") {
          subSelectors = parseSelectors(key);
          newSelectors = (function() {
            var j, len, len1, m, res, sel, subSel;
            res = [];
            for (j = 0, len = subSelectors.length; j < len; j++) {
              subSel = subSelectors[j];
              for (m = 0, len1 = selectors.length; m < len1; m++) {
                sel = selectors[m];
                res.push("" + sel + subSel);
              }
            }
            return res;
          })();
          subCssRule += parseR(newSelectors, val, indent, lineEnd);
        } else if (val != null) {
          cssRule += "" + indent + (parsePropName(key)) + ":" + val + ";" + lineEnd;
        }
      }
    }
    return (cssRule !== '' ? (selectors.join(',' + lineEnd)) + "{" + lineEnd + cssRule + "}" + lineEnd : '') + subCssRule;
  };


  /*
   * parse a mss object into raw css string
   *
   * @param mss {mssObject}
   * @param pretty {Boolean} default = false
   * @return {String}
   */

  parse = function(mss, pretty) {
    var indent;
    if (pretty == null) {
      pretty = false;
    }
    return indent = parseR([''], mss, (pretty ? '  ' : ''), (pretty ? '\n' : ''));
  };

  parseSelectors = function(selectorString) {
    var j, len, ref, ref1, results, sel, selectors;
    selectors = selectorString.split('_');
    results = [];
    for (j = 0, len = selectors.length; j < len; j++) {
      sel = selectors[j];
      if (('A' <= (ref = sel[0]) && ref <= 'Z')) {
        results.push(' .' + sel);
      } else if (sel[0] === '$') {
        if (('A' <= (ref1 = sel[1]) && ref1 <= 'Z')) {
          results.push(' #' + sel[1].toLowerCase() + sel.slice(2));
        } else {
          results.push(':' + sel.slice(1));
        }
      } else {
        results.push(' ' + sel);
      }
    }
    return results;
  };

  parsePropName = function(prop) {
    var c, j, len, transformed;
    transformed = '';
    for (j = 0, len = prop.length; j < len; j++) {
      c = prop[j];
      if (('A' <= c && c <= 'Z')) {
        transformed += "-" + c.toLowerCase();
      } else {
        transformed += c;
      }
    }
    return transformed;
  };

  num = parseInt;

  unit = function(str) {
    switch (str.slice(-1)) {
      case '%':
        return '%';
      default:
        return str.slice(-2);
    }
  };

  px = function() {
    var argsN, i, s;
    s = '';
    i = 0;
    argsN = arguments.length - 1;
    while (i < argsN) {
      s += arguments[i++] + 'px ';
    }
    s += arguments[i] + 'px';
    return s;
  };

  pc = function() {
    var argsN, i, s;
    s = '';
    i = 0;
    argsN = arguments.length - 1;
    while (i < argsN) {
      s += arguments[i++] + '% ';
    }
    s += arguments[i] + '%';
    return s;
  };

  gold = function(v) {
    return Math.round(v * 0.618);
  };

  goldR = function(v) {
    return Math.round(v / 0.618);
  };

  rgb = function(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  bw = function(bw) {
    return "rgb(" + bw + "," + bw + "," + bw + ")";
  };

  rgba = function(r, g, b, a) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  };

  hsl = function(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
  };

  hsla = function(r, g, b, a) {
    return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
  };

  merge = function(msses) {
    var j, k, len, mss, result, v;
    result = {};
    for (j = 0, len = msses.length; j < len; j++) {
      mss = msses[j];
      for (k in mss) {
        v = mss[k];
        if (typeof v === 'object' && typeof result[k] === 'object') {
          result[k] = merge([result[k], v]);
        } else {
          result[k] = v;
        }
      }
    }
    return result;
  };

  Vendor = function(prop) {
    return function(mss) {
      var PropBase, v;
      if ((v = mss[prop]) != null) {
        PropBase = prop[0].toUpperCase() + prop.slice(1);
        mss['Moz' + PropBase] = v;
        mss['Webkit' + PropBase] = v;
        mss['Ms' + PropBase] = v;
      }
      return mss;
    };
  };

  Mixin = function(mssMix) {
    return function(mss) {
      var k, v;
      for (k in mssMix) {
        v = mssMix[k];
        mss[k] = v;
      }
      return mss;
    };
  };

  Size = function(width, height) {
    return function(mss) {
      if (width != null) {
        mss.width = width;
      }
      if (height != null) {
        mss.height = height;
      }
      return mss;
    };
  };

  PosAbs = function(top, right, bottom, left) {
    return function(mss) {
      mss.position = 'absolute';
      if (top != null) {
        mss.top = top;
      }
      if (right != null) {
        mss.right = right;
      }
      if (bottom != null) {
        mss.bottom = bottom;
      }
      if (left != null) {
        mss.left = left;
      }
      return mss;
    };
  };

  PosRel = function(top, right, bottom, left) {
    return function(mss) {
      mss.position = 'relative';
      if (top != null) {
        mss.top = top;
      }
      if (right != null) {
        mss.right = right;
      }
      if (bottom != null) {
        mss.bottom = bottom;
      }
      if (left != null) {
        mss.left = left;
      }
      return mss;
    };
  };

  LineSize = function(lineHeight, fontS) {
    return function(mss) {
      if (lineHeight != null) {
        mss.height = mss.lineHeight = lineHeight;
      }
      if (fontS != null) {
        mss.fontSize = fontS;
      }
      return mss;
    };
  };

  MediaQuery = function(queryObj) {
    return function(mss) {
      var k, mediaType, obj, queryRules, queryStrArr, v;
      queryStrArr = (function() {
        var results;
        results = [];
        for (mediaType in queryObj) {
          queryRules = queryObj[mediaType];
          if (mediaType[0] === '_') {
            mediaType = 'not ' + mediaType.slice(1);
          }
          if (mediaType[0] === '$') {
            mediaType = 'only ' + mediaType.slice(1);
          }
          if (queryRules) {
            results.push(mediaType + ' and ' + ((function() {
              var results1;
              results1 = [];
              for (k in queryRules) {
                v = queryRules[k];
                results1.push('(' + (parsePropName(k)) + (v ? ':' + v : '') + ')');
              }
              return results1;
            })()).join(' and '));
          } else {
            results.push(mediaType);
          }
        }
        return results;
      })();
      return (
        obj = {},
        obj["@media " + (queryStrArr.join(','))] = mss,
        obj
      );
    };
  };

  KeyFrames = function(name) {
    return function(mss) {
      var k, keyFramesObj, max, obj, v;
      keyFramesObj = {};
      max = 0;
      for (k in mss) {
        max = Math.max(max, Number.parseFloat(k));
      }
      for (k in mss) {
        v = mss[k];
        keyFramesObj[(Number.parseFloat(k)) * 100 / max + '%'] = v;
      }
      return (
        obj = {},
        obj["@keyframes " + name] = keyFramesObj,
        obj
      );
    };
  };

  TextEllip$ = function(mss) {
    mss.whiteSpace = 'nowrap';
    mss.overflow = 'hidden';
    mss.textOverflow = 'ellipsis';
    return mss;
  };

  ClearFix$ = function(mss) {
    mss['*zoom'] = 1;
    mss.$before_$after = {
      content: "''",
      display: 'table'
    };
    mss.$after = {
      clear: 'both'
    };
    return mss;
  };

  TRAVERSE = function(mss, mssFn, propFn) {
    var k, newMss, v;
    if (mssFn == null) {
      mssFn = (function(k, v) {
        return v;
      });
    }
    if (propFn == null) {
      propFn = (function(k, v) {
        return v;
      });
    }
    newMss = {};
    for (k in mss) {
      v = mss[k];
      newMss[k] = typeof v === 'object' ? TRAVERSE(mssFn(k, v), mssFn, propFn) : propFn(k, v);
    }
    return newMss;
  };

  mss = {
    tag: tag,
    reTag: reTag,
    unTag: unTag,
    parse: parse,
    parseSelectors: parseSelectors,
    parsePropName: parsePropName,
    num: num,
    unit: unit,
    px: px,
    pc: pc,
    gold: gold,
    goldR: goldR,
    rgb: rgb,
    bw: bw,
    rgba: rgba,
    hsl: hsl,
    hsla: hsla,
    merge: merge,
    Vendor: Vendor,
    Mixin: Mixin,
    Size: Size,
    PosAbs: PosAbs,
    PosRel: PosRel,
    LineSize: LineSize,
    MediaQuery: MediaQuery,
    KeyFrames: KeyFrames,
    TextEllip$: TextEllip$,
    ClearFix$: ClearFix$,
    TRAVERSE: TRAVERSE
  };

  if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = mss;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return mss;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof window !== "undefined" && window !== null) {
    window.mss = mss;
  }

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var cyan, green, grey, magenta, orange, red;

  grey = ["#292929", "#525252", "#7a7a7a", "#a3a3a3", "#cccccc", "#d6d6d6", "#e0e0e0", "#ebebeb", "#f5f5f5"];

  red = ['#2d0404', '#5a0808', '#860d0d', '#b31111', '#e01515', '#e64444', '#ec7373', '#f3a1a1', '#f9d0d0'];

  green = ['#132608', '#264c10', '#3a7219', '#4d9821', '#60be29', '#80cb54', '#a0d87f', '#bfe5a9', '#dff2d4'];

  magenta = ['#2f0720', '#5d0f3f', '#8c165f', '#ba1e7e', '#e9259e', '#ed51b1', '#f27cc5', '#f6a8d8', '#fbd3ec'];

  orange = ['#331300', '#662700', '#993a00', '#cc4e00', '#ff6100', '#ff8133', '#ffa066', '#ffc099', '#ffdfcc'];

  cyan = ['#00252a', '#004a54', '#01707e', '#0195a8', '#01bad2', '#34c8db', '#67d6e4', '#99e3ed', '#ccf1f6'];

  module.exports = {
    text: grey,
    main: cyan,
    border: grey,
    warn: orange,
    modalBG: 'rgba(0,0,0,0.2)',
    grey: grey,
    red: red,
    green: green,
    magenta: magenta,
    orange: orange,
    cyan: cyan
  };

}).call(this);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var Button, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = __webpack_require__(0);

  s = __webpack_require__(2);

  style = __webpack_require__(3);

  u = __webpack_require__(1);

  Button = (function() {
    function Button(arg) {
      var data, ref, ref1;
      this.text = arg.text, this.prefix = arg.prefix, this.suffix = arg.suffix, data = (ref = arg.data) != null ? ref : null, this.onClick = (ref1 = arg.onClick) != null ? ref1 : u.noOp;
      this.onClickInternal = bind(this.onClickInternal, this);
      this.dataJSON = JSON.stringify(data);
    }

    Button.prototype.onClickInternal = function(e) {
      var data, json;
      json = u.getCurrentTargetData(e, 'json');
      data = JSON.parse(json);
      return this.onClick(data);
    };

    Button.prototype.view = function() {
      var self;
      self = this;
      return m('.Button', {
        onclick: this.onClickInternal,
        'data-json': this.dataJSON
      }, m('.Prefix', this.prefix), m('span', this.text), m('.Suffix', this.suffix));
    };

    return Button;

  })();

  Button.mss = {
    Button: s.LineSize('2em', '1em')({
      position: 'relative',
      width: '100px',
      textAlign: 'center',
      background: style.main[4],
      color: style.text[8],
      Prefix_Suffix: {
        position: 'absolute',
        svg: {
          fill: style.text[8],
          height: '1.4em',
          width: '1.4em'
        }
      },
      Prefix: {
        left: '0.3em',
        top: '0.3em'
      },
      Suffix: {
        right: '0.3em',
        top: '0.3em'
      },
      $hover: {
        cursor: 'pointer',
        background: style.main[5]
      }
    })
  };

  module.exports = Button;

}).call(this);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var AutoHide, m, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = __webpack_require__(0);

  u = __webpack_require__(1);

  AutoHide = (function() {
    function AutoHide(arg) {
      var ref;
      this.widget = arg.widget, this.onHide = (ref = arg.onHide) != null ? ref : u.noOp;
      this.hide = bind(this.hide, this);
      this.show = bind(this.show, this);
      this.showWidget = false;
    }

    AutoHide.prototype.onHideInternal = function(elem) {
      return (function(_this) {
        return function(e) {
          if (!elem.contains(e.target)) {
            _this.showWidget = false;
          }
          m.redraw();
          _this.onHide();
          return true;
        };
      })(this);
    };

    AutoHide.prototype.show = function() {
      return this.showWidget = true;
    };

    AutoHide.prototype.hide = function() {
      this.showWidget = false;
      return this.onHide();
    };

    AutoHide.prototype.view = function() {
      var self;
      self = this;
      return m('.HideOnBlur', {
        oncreate: function(vnode) {
          return window.addEventListener('click', self.onHideInternal(vnode.dom), true);
        },
        onremove: function() {
          return window.removeEventListener('click', self.onHideInternal(vnode.dom), true);
        }
      }, this.showWidget ? this.widget.view() : void 0);
    };

    return AutoHide;

  })();

  module.exports = AutoHide;

}).call(this);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Button, ButtonGroup, Collaspe, DatePicker, Demo, DropDown, Modal, Notify, Switch, TextInput, buildIcon, delIcon, infoIcon, m, msgIcon, s, style, u;

m = __webpack_require__(0);

s = __webpack_require__(2);

buildIcon = __webpack_require__(12);

delIcon = __webpack_require__(13);

infoIcon = __webpack_require__(14);

msgIcon = __webpack_require__(15);

Button = __webpack_require__(5);

ButtonGroup = __webpack_require__(17);

DatePicker = __webpack_require__(19);

Switch = __webpack_require__(22);

DropDown = __webpack_require__(23);

Modal = __webpack_require__(24);

TextInput = __webpack_require__(25);

Collaspe = __webpack_require__(26);

Notify = __webpack_require__(29);

u = __webpack_require__(1);

style = __webpack_require__(3);

Demo = (function() {
  function Demo() {
    var i;
    this.demoButton1 = new Button({
      text: 'Just Button'
    });
    this.demoButton2 = new Button({
      text: 'Build',
      prefix: u.svg(buildIcon)
    });
    this.demoButton3 = new Button({
      text: 'Delete',
      suffix: u.svg(delIcon)
    });
    this.demoButtonDoc = new Collaspe({
      titleArray: ['Button document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "Button = require 'mui/Button'\nbuildIcon = require 'mmsvg/google/msvg/action/build'\nu = require 'mui/utils'\n\ndemoButton = new Button\n    text: 'Build'\n    prefix: u.svg buildIcon\n\n###\n    text             # String\n    prefix           # mithril svg view\n    suffix           # mithril svg view\n    data             # HashMap\n    onClick = (->)   # (HashMap) -> a\n###");
          }
        }
      ]
    });
    this.demoBtnGroupDoc = new Collaspe({
      titleArray: ['ButtonGroup document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "ButtonGroup = require 'mui/ButtonGroup'\n\ndemoBtnGroup = new ButtonGroup\n    textArray: ['foo', 'bar', 'qux']\n    onChange: (enabledArray) => ...\n\n###\n    textArray         # [String]\n    enabledIndexArray # [Int]\n    multiSelection    # Boolean\n    onChange = ->     # ([Int]) -> a\n###");
          }
        }
      ]
    });
    this.demoBtnGroup = new ButtonGroup({
      textArray: ['foo', 'bar', 'qux'],
      onChange: (function(_this) {
        return function(enabledArray) {
          return _this.demoNotify1.show(msgIcon, JSON.stringify(enabledArray));
        };
      })(this)
    });
    this.demoBtnGroup2 = new ButtonGroup({
      textArray: ['foo', 'bar', 'qux'],
      multiSelection: false,
      onChange: (function(_this) {
        return function(enabledArray) {
          return _this.demoNotify1.show(msgIcon, JSON.stringify(enabledArray));
        };
      })(this)
    });
    this.demoDatePicker1 = new DatePicker({
      date: new Date()
    });
    this.demoDatePicker2 = new DatePicker({
      date: new Date(),
      selectTime: true
    });
    this.demoDatePickerDoc = new Collaspe({
      titleArray: ['DatePicker document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "# modify i18n before use\nDatePicker = require 'mui/DatePicker'\n\ndemoDatePicker2 = new DatePicker\n    date: new Date()\n    selectTime: true\n\n###\n    date                         # Date\n    selectTime                   # Boolean\n    ifDateAvailable = (-> true)  # (Date) -> Boolean\n    onSelect = (->)              # (Date) -> a\n###");
          }
        }
      ]
    });
    this.demoSwitch = new Switch({
      enable: true
    });
    this.demoSwitchDoc = new Collaspe({
      titleArray: ['Switch document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "Switch = require 'mui/Switch'\n\ndemoSwitch = new Switch\n    enable: true\n\n###\n    enable = true       # Boolean\n    onToggle = ( -> )   # (Boolean) -> a\n###");
          }
        }
      ]
    });
    this.demoDropDown1 = new DropDown({
      itemArray: ['foo', 'bar', '~~~'],
      currentIndex: 2
    });
    this.demoDropDown2 = new DropDown({
      itemArray: ['foo', 'bar', '~~~'],
      placeholder: 'please select a foo'
    });
    this.demoDropDown3 = new DropDown({
      itemArray: (function() {
        var j, results;
        results = [];
        for (i = j = 1; j <= 100; i = ++j) {
          results.push(i.toString());
        }
        return results;
      })(),
      currentIndex: 20
    });
    this.demoDropDownDoc = new Collaspe({
      titleArray: ['DropDown document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "DropDown = require 'mui/Dropdown'\n\ndemoDropDown3 = new DropDown\n    itemArray: (i.toString() for i in [1..100])\n    currentIndex: 20\n\n###\n    itemArray               # [String]\n    currentIndex            # Int | Undefined\n    placeholder  = ''       # String\n    onSelect = (->)         # (String, Int) -> ...\n    ifAvailable = (-> true) # (String, Int) -> ture | false\n###");
          }
        }
      ]
    });
    this.demoModal1 = new Modal({
      widget: {
        view: function() {
          return m('h2', {
            style: {
              width: '200px',
              margin: '0 auto',
              background: '#fff'
            }
          }, 'Close anywhere  else to close');
        }
      }
    });
    this.demoModal2 = new Modal({
      clickToHide: false,
      escToHide: false
    });
    this.demoModalOpenBtn1 = new Button({
      text: 'Open a modal',
      onClick: this.demoModal1.show
    });
    this.demoModalOpenBtn2 = new Button({
      text: 'Open a modal',
      onClick: this.demoModal2.show
    });
    this.demoModalCloseBtn = new Button({
      text: 'Hide this modal',
      onClick: this.demoModal2.hide
    });
    this.demoModal2.widget = this.demoModalCloseBtn;
    this.demoModalDoc = new Collaspe({
      titleArray: ['Modal document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "Modal = require 'mui/Modal'\n# make sure widget inside is a block element\n\ndemoModal1 = new Modal\n    clickToHide: true\n    widget: view: ->\n        m 'h2'\n        ,\n            style:\n                width: '200px'\n                margin: '0 auto'\n                background: '#fff'\n        ,'Close anywhere  else to close'\n\n###\n    widget                 # mithril view\n    clickToHide = true     # Boolean\n    escToHide = true       # Boolean\n    onHide = ( -> )        # () -> a\n###");
          }
        }
      ]
    });
    this.demoTextInput1 = new TextInput({
      placeholder: 'type something...',
      onChange: function(str) {
        if (str !== 'ya!') {
          return new Error('please input "ya!"');
        }
      }
    });
    this.demoTextInput2 = new TextInput({
      placeholder: 'type digits and enter!',
      onChange: function(str) {
        if (!/^\d+$/.test(str)) {
          return new Error('please input some digits');
        }
      },
      onEnter: function(str) {
        if (!/^\d+$/.test(str)) {
          return new Error('please input some digits');
        } else {
          return alert(str);
        }
      }
    });
    this.demoTextInputDoc = new Collaspe({
      titleArray: ['TextInput document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "TextInput = require 'mui/TextInput'\n\ndemoTextInput = new TextInput\n    onChange: (str) ->\n        if str != 'ya!'\n            new Error 'please input \"ya!\"'\n\n###\n    content = ''           # String\n    disabled = false       # Boolean\n    placeholder = ''       # String\n    onChange = u.noOp      # (String) -> a | Error\n                           # triggered on Blur or user stroke Enter\n    onKeyup  = u.noOp      # (String) -> a | Error\n                           # triggered when user stroke non-Enters\n    onEnter  = u.noOp      # (String) -> a | Error\n                           # triggered when user stroke Enter\n###");
          }
        }
      ]
    });
    this.demoCollaspe = new Collaspe({
      titleArray: ['Hello', 'Byte'],
      expandedIndexArray: [1],
      autoCollaspe: true,
      widgetArray: [
        {
          view: function() {
            return m('span', 'hello world');
          }
        }, {
          view: function() {
            return m('span', 'bye world');
          }
        }
      ]
    });
    this.demoCollaspeDoc = new Collaspe({
      titleArray: ['Collaspe document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "Collaspe = require 'mui/Collaspe'\n\ndemoCollaspe = new Collaspe\n    titleArray: ['Hello', 'Byte']\n    expandedIndexArray: [1]\n    autoCollaspe: true\n    widgetArray: [\n        view: ->\n            m 'span', 'hello world'\n    ,\n        view: ->\n            m 'span', 'bye world'\n    ]\n\n###\n    titleArray                # [String]\n    widgetArray               # [mithril widget]\n    autoCollaspe = false      # Boolean\n    expandedIndexArray = []   # [Int]\n    onExpand   = (->)         # Int -> a\n    onCollaspe = (->)         # Int -> a\n###");
          }
        }
      ]
    });
    this.demoNotify1 = new Notify({});
    this.demoNotifyOpenBtn1 = new Button({
      text: 'Open a notify',
      onClick: (function(_this) {
        return function() {
          return _this.demoNotify1.show(msgIcon, 'this is a notify');
        };
      })(this)
    });
    this.demoNotifyOpenBtn1D = new Button({
      text: 'Debounce',
      onClick: u.debounce((function(_this) {
        return function() {
          return _this.demoNotify1.show(msgIcon, 'notify per 1 seconds');
        };
      })(this), 1000)
    });
    this.demoNotifyOpenBtn1D2 = new Button({
      text: 'Debounce leading',
      onClick: u.debounce((function(_this) {
        return function() {
          return _this.demoNotify1.show(msgIcon, 'notify per 1 seconds');
        };
      })(this), 1000, true)
    });
    this.demoNotify2 = new Notify({
      onClick: (function(_this) {
        return function(arg) {
          var foo;
          foo = arg.foo;
          return alert(foo);
        };
      })(this)
    });
    this.demoNotifyOpenBtn2 = new Button({
      text: 'Open a notify',
      onClick: (function(_this) {
        return function() {
          return _this.demoNotify2.show(msgIcon, 'click me', {
            foo: 'bar'
          });
        };
      })(this)
    });
    this.demoNotifyDoc = new Collaspe({
      titleArray: ['Notify document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "Notify = require 'mui/Notify'\n\ndemoNotify1 = new Notify {}\n\ndemoNotifyOpenBtn1 = new Button\n   text: 'Open a notify'\n   onClick: => @demoNotify1.show(msgIcon, 'this is a notify')\n\ndemoNotify2 = new Notify\n   onClick: ({foo}) => alert foo\n\ndemoNotifyOpenBtn2 = new Button\n   text: 'Open a notify'\n    onClick: => @demoNotify2.show(msgIcon, 'click me', foo: 'bar')\n\n###\n    duration = 3000        # Int\n    onClick = ( -> )       # data -> a\n    show                   # (icon :: mithril svg, content :: String, data :: HashMap) -> undefined\n###");
          }
        }
      ]
    });
    this.demoSpinnerDoc = new Collaspe({
      titleArray: ['Spinner document'],
      widgetArray: [
        {
          view: function() {
            return m('textarea', {
              readonly: true
            }, "u = require '../utils'\nstyle = require '../style'\n\n# directly put this into view\nu.spinner style.main[4]\n\n###\nutils.spinner(color, size = '1em', interval = '1s')\n###");
          }
        }
      ]
    });
  }

  Demo.prototype.view = function() {
    return [
      m('ul.Demo', m('li', this.demoButtonDoc.view()), m('li', this.demoButton1.view(), this.demoButton2.view(), this.demoButton3.view()), m('li', this.demoBtnGroupDoc.view()), m('li', this.demoBtnGroup.view()), m('li', this.demoBtnGroup2.view()), m('li', this.demoDatePickerDoc.view()), m('li', this.demoDatePicker1.view()), m('li', this.demoDatePicker2.view()), m('li', this.demoSwitchDoc.view()), m('li', this.demoSwitch.view()), m('li', this.demoDropDownDoc.view()), m('li', this.demoDropDown1.view()), m('li', this.demoDropDown2.view()), m('li', this.demoDropDown3.view()), m('li', this.demoModalDoc.view()), m('li', this.demoModalOpenBtn1.view(), this.demoModal1.view()), m('li', this.demoModalOpenBtn2.view(), this.demoModal2.view()), m('li', this.demoTextInputDoc.view()), m('li', this.demoTextInput1.view()), m('li', this.demoTextInput2.view()), m('li', this.demoCollaspeDoc.view()), m('li', this.demoCollaspe.view()), m('li', this.demoNotifyDoc.view()), m('li', this.demoNotify1.view(), this.demoNotify2.view()), m('li', {
        className: 'NotifyBtnGroup'
      }, this.demoNotifyOpenBtn1.view(), this.demoNotifyOpenBtn1D.view(), this.demoNotifyOpenBtn1D2.view(), this.demoNotifyOpenBtn2.view()), m('li', this.demoSpinnerDoc.view()), m('li', u.spinner(style.main[4]), u.spinner(style.main[4], '5em'), u.spinner(style.main[4], '2em', '0.3s'), u.spinner(style.text[4], '5em'))), m('.Misc', m('span', 'Winter\'s ui collection'), m('a', {
        href: 'https://github.com/winterland1989/mui'
      }, 'view code on github'), m('a', {
        href: 'https://github.com/winterland1989/mui/blob/gh-pages/demo/index.coffee'
      }, 'this page\'s source'))
    ];
  };

  return Demo;

})();

s.tag(s.merge([
  Button.mss, ButtonGroup.mss, DatePicker.mss, Switch.mss, DropDown.mss, Modal.mss, TextInput.mss, Collaspe.mss, Notify.mss, {
    Modal: {
      Button: {
        display: 'inline-block',
        width: '200px'
      }
    },
    body: {
      fontSize: '14px',
      fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300'
    },
    Demo: {
      listStyle: 'none',
      li: {
        margin: '14px'
      }
    },
    Button: {
      display: 'inline-block',
      marginRight: '14px'
    },
    NotifyBtnGroup: {
      Button: {
        width: '200px'
      }
    },
    Collaspe: {
      width: '480px',
      textarea: {
        padding: '14px',
        resize: 'none',
        width: '100%',
        height: '200px',
        border: 'none'
      }
    },
    Misc: {
      position: 'fixed',
      top: 0,
      right: 0,
      padding: '14px',
      span_a: {
        display: 'block',
        margin: '14px'
      }
    }
  }
]));

m.mount(document.body, new Demo());


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(9);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(10)))

/***/ }),
/* 10 */
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
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
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
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
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
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    } else {
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
    while(len) {
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

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var m = __webpack_require__(0);
module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>');


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var m = __webpack_require__(0);
module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>');


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var m = __webpack_require__(0);
module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>');


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var m = __webpack_require__(0);
module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>');


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (true) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return FastClick;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var Button, ButtonGroup, doneIcon, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  m = __webpack_require__(0);

  s = __webpack_require__(2);

  style = __webpack_require__(3);

  u = __webpack_require__(1);

  Button = __webpack_require__(5);

  doneIcon = __webpack_require__(18);

  ButtonGroup = (function() {
    function ButtonGroup(arg) {
      var ref, ref1, ref2;
      this.textArray = arg.textArray, this.enabledIndexArray = (ref = arg.enabledIndexArray) != null ? ref : [], this.multiSelection = (ref1 = arg.multiSelection) != null ? ref1 : true, this.onChange = (ref2 = arg.onChange) != null ? ref2 : u.noOp;
      this.onClickInternal = bind(this.onClickInternal, this);
    }

    ButtonGroup.prototype.onClickInternal = function(e) {
      var i, i2;
      i = parseInt(u.getCurrentTargetData(e, 'index'));
      if (this.multiSelection) {
        i2 = this.enabledIndexArray.indexOf(i);
        if (i2 === -1) {
          this.enabledIndexArray.push(i);
        } else {
          this.enabledIndexArray.splice(i2, 1);
        }
      } else {
        this.enabledIndexArray = [i];
      }
      return this.onChange(this.enabledIndexArray);
    };

    ButtonGroup.prototype.view = function() {
      var i, t;
      return m('ul.ButtonGroup', (function() {
        var j, len, ref, results;
        ref = this.textArray;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          t = ref[i];
          if (indexOf.call(this.enabledIndexArray, i) >= 0) {
            results.push(m('li.EnabledBtn', {
              'data-index': i,
              onclick: this.onClickInternal
            }, u.svg(doneIcon), m('span', t)));
          } else {
            results.push(m('li.DisabledBtn', {
              'data-index': i,
              onclick: this.onClickInternal
            }, t));
          }
        }
        return results;
      }).call(this));
    };

    return ButtonGroup;

  })();

  ButtonGroup.mss = {
    ButtonGroup: {
      margin: 0,
      padding: 0,
      EnabledBtn_DisabledBtn: s.LineSize('2em', '1em')({
        position: 'relative',
        display: 'inline-block',
        margin: 0,
        marginRight: '1em',
        width: '100px',
        textAlign: 'center',
        listStyle: 'none',
        outline: '1px solid ' + style.main[4],
        $hover: {
          cursor: 'pointer',
          background: style.main[5],
          outline: '1px solid ' + style.main[5],
          color: style.text[8]
        },
        svg: {
          left: '0.3em',
          top: '0.3em',
          position: 'absolute',
          fill: style.text[8],
          height: '1.4em',
          width: '1.4em'
        }
      }),
      EnabledBtn: {
        color: style.text[8],
        background: style.main[4]
      },
      DisabledBtn: {
        color: style.main[4],
        background: '#fff'
      }
    }
  };

  module.exports = ButtonGroup;

}).call(this);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var m = __webpack_require__(0);
module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>');


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var AutoHide, DatePicker, dateIcon, hourArray, i18n, m, minuteArray, s, secondArray, style, u, x,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = __webpack_require__(0);

  s = __webpack_require__(2);

  u = __webpack_require__(1);

  AutoHide = __webpack_require__(6);

  style = __webpack_require__(3);

  i18n = __webpack_require__(20);

  dateIcon = __webpack_require__(21);

  hourArray = (function() {
    var j, results;
    results = [];
    for (x = j = 0; j <= 23; x = ++j) {
      results.push(u.formatXX(x));
    }
    return results;
  })();

  minuteArray = (function() {
    var j, results;
    results = [];
    for (x = j = 0; j <= 59; x = ++j) {
      results.push(u.formatXX(x));
    }
    return results;
  })();

  secondArray = (function() {
    var j, results;
    results = [];
    for (x = j = 0; j <= 59; x = ++j) {
      results.push(u.formatXX(x));
    }
    return results;
  })();

  DatePicker = (function() {
    function DatePicker(arg) {
      var date, ref, ref1;
      date = arg.date, this.selectTime = arg.selectTime, this.ifDateAvailable = (ref = arg.ifDateAvailable) != null ? ref : (function() {
        return true;
      }), this.onSelect = (ref1 = arg.onSelect) != null ? ref1 : u.noOp;
      this.setHMS = bind(this.setHMS, this);
      this.selectDate = bind(this.selectDate, this);
      this.nextYear = bind(this.nextYear, this);
      this.preYear = bind(this.preYear, this);
      this.nextMonth = bind(this.nextMonth, this);
      this.preMonth = bind(this.preMonth, this);
      this.displayDate = new Date(date);
      this.date = new Date(date);
      this.init();
      this.autoHideDatePicker = new AutoHide({
        widget: {
          view: (function(_this) {
            return function() {
              var d, dObj, hour, i, min, second;
              return m('.DatePickerWidget', m('.NavBar', m('span.PreYear', {
                onclick: _this.preYear
              }, '<<'), m('span.PreMonth', {
                onclick: _this.preMonth
              }, '<'), m('span.CurrentMonth', m('span.CurrentYear', _this.displayDate.getFullYear() + '-' + (_this.displayDate.getMonth() + 1))), m('span.NextMonth', {
                onclick: _this.nextMonth
              }, '>'), m('span.NextYear', {
                onclick: _this.nextYear
              }, '>>')), m('.DayBar', (function() {
                var j, len, ref2, results;
                ref2 = i18n.dayName;
                results = [];
                for (j = 0, len = ref2.length; j < len; j++) {
                  d = ref2[j];
                  results.push(m('span.DayName', d));
                }
                return results;
              })()), m('.DateList', {
                onclick: _this.selectDate
              }, (function() {
                var j, ref2, results;
                results = [];
                for (d = j = 0, ref2 = this.startDay + this.totalDay - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; d = 0 <= ref2 ? ++j : --j) {
                  dObj = new Date(this.displayDate);
                  dObj.setDate(d - this.startDay + 1);
                  if (d >= this.startDay) {
                    results.push(m('span.Date', {
                      className: [this.ifDateAvailable(dObj) ? 'Available' : '', ((this.date != null) && dObj.getDate() === this.date.getDate() && dObj.getMonth() === this.date.getMonth() && dObj.getFullYear() === this.date.getFullYear()) ? 'Current' : ''].join(' '),
                      'data-year': dObj.getFullYear(),
                      'data-month': dObj.getMonth(),
                      'data-date': dObj.getDate()
                    }, d - this.startDay + 1));
                  } else {
                    results.push(m('span.NoDate', ''));
                  }
                }
                return results;
              }).call(_this)), _this.selectTime ? [
                m('.TimeBar', m('span.TimeLabel', i18n.hour), m('span.TimeLabel', i18n.minute), m('span.TimeLabel', i18n.second)), m('.TimeList', {
                  onclick: _this.setHMS
                }, m('ul.HourList', (function() {
                  var j, len, results;
                  results = [];
                  for (i = j = 0, len = hourArray.length; j < len; i = ++j) {
                    hour = hourArray[i];
                    results.push(m('li', {
                      oncreate: this.scrollToView,
                      key: i,
                      className: hour === u.formatXX(this.date.getHours()) ? 'Current' : '',
                      'data-hour': hour
                    }, hour));
                  }
                  return results;
                }).call(_this)), m('ul.MinuteList', (function() {
                  var j, len, results;
                  results = [];
                  for (i = j = 0, len = minuteArray.length; j < len; i = ++j) {
                    min = minuteArray[i];
                    results.push(m('li', {
                      oncreate: this.scrollToView,
                      key: i,
                      className: min === u.formatXX(this.date.getMinutes()) ? 'Current' : '',
                      'data-min': min
                    }, min));
                  }
                  return results;
                }).call(_this)), m('ul.SecondList', (function() {
                  var j, len, results;
                  results = [];
                  for (i = j = 0, len = secondArray.length; j < len; i = ++j) {
                    second = secondArray[i];
                    results.push(m('li', {
                      oncreate: this.scrollToView,
                      key: i,
                      className: second === u.formatXX(this.date.getSeconds()) ? 'Current' : '',
                      'data-second': second
                    }, second));
                  }
                  return results;
                }).call(_this)))
              ] : void 0);
            };
          })(this)
        }
      });
    }

    DatePicker.prototype.init = function() {
      var d;
      d = new Date(this.displayDate);
      d.setDate(0);
      this.startDay = d.getDay();
      d = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 0);
      return this.totalDay = d.getDate();
    };

    DatePicker.prototype.scrollToView = function(vnode) {
      var elem, offsetTop;
      elem = vnode.dom;
      if (u.targetHasClass(elem, 'Current')) {
        offsetTop = elem.offsetTop;
        return elem.parentNode.scrollTop = offsetTop;
      }
    };

    DatePicker.prototype.preMonth = function(e) {
      this.displayDate.setMonth(this.displayDate.getMonth() - 1);
      return this.init();
    };

    DatePicker.prototype.nextMonth = function(e) {
      this.displayDate.setMonth(this.displayDate.getMonth() + 1);
      return this.init();
    };

    DatePicker.prototype.preYear = function(e) {
      this.displayDate.setFullYear(this.displayDate.getFullYear() - 1);
      return this.init();
    };

    DatePicker.prototype.nextYear = function(e) {
      this.displayDate.setFullYear(this.displayDate.getFullYear() + 1);
      return this.init();
    };

    DatePicker.prototype.selectDate = function(e) {
      if (u.targetHasClass(u.getTarget(e), 'Available')) {
        this.date.setFullYear(u.getTargetData(e, 'year'));
        this.date.setMonth(u.getTargetData(e, 'month'));
        this.date.setDate(u.getTargetData(e, 'date'));
        this.onSelect(this.date);
        this.displayDate.setDate(this.date.getDate());
        if (!this.selectTime) {
          return this.autoHideDatePicker.hide();
        }
      }
    };

    DatePicker.prototype.setHMS = function(e) {
      var hour, min, second;
      hour = parseInt(u.getTargetData(e, 'hour'));
      if (!isNaN(hour)) {
        this.date.setHours(hour);
      }
      min = parseInt(u.getTargetData(e, 'min'));
      if (!isNaN(min)) {
        this.date.setMinutes(min);
      }
      second = parseInt(u.getTargetData(e, 'second'));
      if (!isNaN(second)) {
        this.date.setSeconds(second);
      }
      return this.onSelect(this.date);
    };

    DatePicker.prototype.view = function() {
      return m('.DatePicker', m('input.DateInput', {
        readonly: true,
        onclick: this.autoHideDatePicker.show,
        value: this.selectTime ? u.formatDateWithHMS(this.date) : u.formatDate(this.date)
      }), m('span.DateIcon', u.svg(dateIcon)), this.autoHideDatePicker.view());
    };

    return DatePicker;

  })();

  DatePicker.mss = {
    DatePicker: {
      width: '250px',
      position: 'relative',
      DateInput: {
        lineHeight: '2em',
        display: 'block',
        fontSize: '0.9em',
        width: '100%',
        padding: 0,
        textAlign: 'center',
        border: '1px solid ' + style.border[4],
        WebkitAppearance: 'none',
        borderRadius: 0
      },
      DateIcon: {
        position: 'absolute',
        svg: {
          fill: style.text[1],
          height: '1.4em',
          width: '1.4em',
          padding: '0.3em'
        },
        top: 0,
        left: 0
      },
      DatePickerWidget: {
        position: 'absolute',
        top: '1.9em',
        left: 0,
        border: '1px solid ' + style.border[4],
        width: '248px',
        background: '#fff',
        zIndex: 999,
        NavBar: {
          padding: '0.3em 0.9em',
          textAlign: 'center',
          lineHeight: '2em',
          height: '2em',
          PreYear_PreMonth_NextMonth_NextYear: {
            display: 'inline-block',
            borderRadius: '50%',
            width: '2em',
            height: '2em',
            $hover: {
              cursor: 'pointer',
              color: style.main[5]
            }
          },
          CurrentMonth: {
            display: 'inline-block'
          }
        },
        DayBar: {
          padding: '4px 12px',
          borderBottom: '1px solid #eee',
          fontSize: '0.9em',
          span: {
            width: '32px',
            display: 'inline-block',
            textAlign: 'center',
            margin: 0
          }
        },
        DateList: {
          padding: '0px 12px 12px',
          lineHeight: '28px',
          span: {
            display: 'inline-block',
            width: '28px',
            height: '28px',
            padding: '2px',
            textAlign: 'center',
            fontSize: '0.9em',
            color: style.text[5],
            margin: 0,
            borderRadius: '50%'
          },
          Current: {
            color: '#fff !important',
            background: style.main[4] + ' !important'
          },
          Available: {
            color: style.text[0],
            $hover: {
              color: '#fff',
              cursor: 'pointer',
              background: style.main[5]
            }
          }
        },
        TimeBar: {
          borderTop: '1px solid ' + style.border[4],
          TimeLabel: {
            padding: '8px 0',
            fontSize: '0.9em',
            display: 'inline-block',
            width: '80px',
            textAlign: 'center'
          }
        },
        TimeList: {
          HourList_MinuteList_SecondList: {
            position: 'relative',
            padding: 0,
            margin: 0,
            marginBottom: '8px',
            display: 'inline-block',
            height: '80px',
            width: '80px',
            overflow: 'auto',
            listStyle: 'none',
            li: {
              fontSize: '0.9em',
              textAlign: 'center',
              margin: '0.2em',
              $hover: {
                color: style.text[8],
                background: style.main[5]
              }
            },
            Current: {
              color: style.text[8],
              background: style.main[4]
            }
          }
        }
      }
    }
  };

  module.exports = DatePicker;

}).call(this);


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var chn, eng;

  eng = {
    hour: 'hour',
    minute: 'minute',
    second: 'second',
    dayName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  chn = {
    hour: '小时',
    minute: '分钟',
    second: '秒',
    dayName: ['一', '二', '三', '四', '五', '六', '七']
  };

  module.exports = chn;

}).call(this);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var m = __webpack_require__(0);
module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>');


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var Switch, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = __webpack_require__(0);

  s = __webpack_require__(2);

  style = __webpack_require__(3);

  u = __webpack_require__(1);

  Switch = (function() {
    function Switch(arg) {
      var ref, ref1;
      this.enable = (ref = arg.enable) != null ? ref : true, this.onToggle = (ref1 = arg.onToggle) != null ? ref1 : u.noOp;
      this.onToggleInternal = bind(this.onToggleInternal, this);
    }

    Switch.prototype.onToggleInternal = function(e) {
      this.enable = !this.enable;
      return this.onToggle(this.enable);
    };

    Switch.prototype.view = function() {
      return m('.Switch', {
        onclick: this.onToggleInternal,
        className: this.enable ? 'Enabled' : 'Disabled'
      }, m('.SwitchBtn'));
    };

    return Switch;

  })();

  Switch.mss = {
    '.Switch.Enabled': {
      width: '2em',
      height: '1em',
      borderRadius: '0.6em',
      padding: '0.1em',
      background: style.main[4]
    },
    '.Switch.Disabled': {
      width: '2em',
      height: '1em',
      borderRadius: '0.6em',
      padding: '0.1em',
      background: style.grey[4],
      $hover: {
        background: style.grey[5]
      },
      SwitchBtn: {
        left: '1em'
      }
    },
    Switch: {
      position: 'relative',
      $hover: {
        background: style.main[5],
        cursor: 'pointer'
      },
      SwitchBtn: {
        position: 'relative',
        width: '1em',
        height: '1em',
        borderRadius: '0.5em',
        background: '#fff',
        left: 0,
        transition: 'left 0.1s ease'
      }
    }
  };

  module.exports = Switch;

}).call(this);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var AutoHide, Dropdown, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = __webpack_require__(0);

  s = __webpack_require__(2);

  style = __webpack_require__(3);

  u = __webpack_require__(1);

  AutoHide = __webpack_require__(6);

  Dropdown = (function() {
    function Dropdown(arg) {
      var ref, ref1, ref2;
      this.itemArray = arg.itemArray, this.currentIndex = arg.currentIndex, this.placeholder = (ref = arg.placeholder) != null ? ref : '', this.onSelect = (ref1 = arg.onSelect) != null ? ref1 : u.noOp, this.ifAvailable = (ref2 = arg.ifAvailable) != null ? ref2 : (function() {
        return true;
      });
      this.onSelectInternal = bind(this.onSelectInternal, this);
      this.autoComplete = bind(this.autoComplete, this);
      this.filter = '';
      this.autoHideDropDown = new AutoHide({
        onHide: (function(_this) {
          return function() {
            return _this.filter = '';
          };
        })(this),
        widget: {
          view: (function(_this) {
            return function() {
              var i, item;
              return m('ul.DropdownList', {
                onclick: _this.onSelectInternal
              }, (function() {
                var j, len, ref3, results;
                ref3 = this.itemArray;
                results = [];
                for (i = j = 0, len = ref3.length; j < len; i = ++j) {
                  item = ref3[i];
                  if ((item.indexOf(this.filter)) !== -1) {
                    results.push(m('li.DropdownItem', {
                      oncreate: u.scrollToView,
                      key: i,
                      className: (this.currentIndex === i ? 'Current ' : '') + (this.ifAvailable(item, i) ? 'Available' : ''),
                      'data-index': i,
                      'data-content': item
                    }, item));
                  }
                }
                return results;
              }).call(_this));
            };
          })(this)
        }
      });
    }

    Dropdown.prototype.autoComplete = function(e) {
      return this.filter = (u.getTarget(e)).value;
    };

    Dropdown.prototype.onSelectInternal = function(e) {
      var content, index;
      if (u.targetHasClass(u.getTarget(e), 'Available')) {
        index = parseInt(u.getTargetData(e, 'index'));
        content = u.getTargetData(e, 'content');
        if (!isNaN(index)) {
          this.currentIndex = index;
          this.filter = '';
          this.autoHideDropDown.hide();
          return this.onSelect(content, index);
        }
      }
    };

    Dropdown.prototype.view = function() {
      return m('.Dropdown', m('input.DropdownInput', {
        onchange: this.autoComplete,
        onclick: this.autoHideDropDown.show,
        placeholder: this.placeholder,
        value: this.filter ? this.filter : this.currentIndex != null ? this.itemArray[this.currentIndex] : ''
      }), this.autoHideDropDown.view());
    };

    return Dropdown;

  })();

  Dropdown.mss = {
    Dropdown: {
      position: 'relative',
      width: '200px',
      DropdownInput: {
        display: 'block',
        lineHeight: '2em',
        fontSize: '0.9em',
        width: '100%',
        padding: 0,
        textAlign: 'center',
        border: '1px solid ' + style.border[4],
        WebkitAppearance: 'none',
        borderRadius: 0
      },
      DropdownList: {
        position: 'absolute',
        top: '1.9em',
        border: '1px solid #ccc',
        width: '198px',
        height: '200px',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        background: '#fff',
        overflowY: 'auto',
        zIndex: 999,
        DropdownItem: s.LineSize('2em', '0.9em')({
          textAlign: 'center',
          overflowX: 'hidden',
          padding: '0 4px',
          margin: 0,
          color: style.text[5],
          $hover: {
            cursor: 'pointer',
            background: style.main[5],
            color: style.text[8]
          }
        }),
        Available: {
          color: style.text[0]
        },
        Current: {
          background: style.main[4],
          color: style.text[8]
        }
      }
    }
  };

  module.exports = Dropdown;

}).call(this);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var Modal, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = __webpack_require__(0);

  s = __webpack_require__(2);

  u = __webpack_require__(1);

  style = __webpack_require__(3);

  Modal = (function() {
    function Modal(arg) {
      var ref, ref1, ref2;
      this.widget = arg.widget, this.clickToHide = (ref = arg.clickToHide) != null ? ref : true, this.escToHide = (ref1 = arg.escToHide) != null ? ref1 : true, this.onHide = (ref2 = arg.onHide) != null ? ref2 : u.noOp;
      this.hide = bind(this.hide, this);
      this.show = bind(this.show, this);
      this.onEscInternal = bind(this.onEscInternal, this);
      this.onClickInternal = bind(this.onClickInternal, this);
      this.showWidget = false;
    }

    Modal.prototype.onClickInternal = function(e) {
      var t;
      t = u.getTarget(e);
      if (this.clickToHide && ((u.targetHasClass(t, 'Modal')) || (u.targetHasClass(t, 'HVCenter')))) {
        return this.hide();
      }
    };

    Modal.prototype.onEscInternal = function(e) {
      if ((e.key === 'Escape' || e.keyCode === 27) && this.escToHide) {
        this.showWidget = false;
        m.redraw();
        return true;
      }
    };

    Modal.prototype.show = function() {
      return this.showWidget = true;
    };

    Modal.prototype.hide = function() {
      this.showWidget = false;
      return this.onHide();
    };

    Modal.prototype.view = function() {
      var self;
      self = this;
      if (this.showWidget) {
        return m('.Modal', {
          onclick: this.onClickInternal,
          oncreate: function() {
            return window.addEventListener('keyup', self.onEscInternal, true);
          },
          onremove: function() {
            return window.removeEventListener('keyup', self.onEscInternal, true);
          }
        }, m('.HVCenter', this.widget.view()));
      }
    };

    return Modal;

  })();

  Modal.mss = {
    Modal: {
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      background: style.modalBG,
      zIndex: 9999,
      $before: {
        content: '""',
        display: 'inline-block',
        height: '100%',
        verticalAlign: 'middle'
      },
      HVCenter: {
        display: 'inline-block',
        width: '100%',
        textAlign: 'center',
        opacity: 1,
        verticalAlign: 'middle'
      }
    }
  };

  module.exports = Modal;

}).call(this);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var TextInput, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = __webpack_require__(0);

  s = __webpack_require__(2);

  style = __webpack_require__(3);

  u = __webpack_require__(1);

  TextInput = (function() {
    function TextInput(arg) {
      var ref, ref1, ref2, ref3, ref4, ref5;
      this.content = (ref = arg.content) != null ? ref : '', this.disabled = (ref1 = arg.disabled) != null ? ref1 : false, this.placeholder = (ref2 = arg.placeholder) != null ? ref2 : '', this.onChange = (ref3 = arg.onChange) != null ? ref3 : u.noOp, this.onKeyup = (ref4 = arg.onKeyup) != null ? ref4 : u.noOp, this.onEnter = (ref5 = arg.onEnter) != null ? ref5 : u.noOp;
      this.onkeyupInternal = bind(this.onkeyupInternal, this);
      this.onChangeInternal = bind(this.onChangeInternal, this);
      this.validationMsg = '';
    }

    TextInput.prototype.submit = function() {
      if (this.validationMsg === '') {
        return this.content;
      } else {
        return new Error(this.validationMsg);
      }
    };

    TextInput.prototype.validateInternal = function(c) {};

    TextInput.prototype.onChangeInternal = function(e) {
      var c, err;
      c = (u.getTarget(e)).value;
      err = this.onChange(c);
      this.validationMsg = '';
      if (err instanceof Error) {
        this.validationMsg = err.message;
      }
      return this.content = c;
    };

    TextInput.prototype.onkeyupInternal = function(e) {
      var c, err;
      c = (u.getTarget(e)).value;
      this.content = c;
      if (e.keyCode === 13 || e.key === "Enter") {
        if (this.validationMsg === '') {
          err = this.onEnter(this.content);
          if (err instanceof Error) {
            return this.validationMsg = err.message;
          }
        }
      } else {
        err = this.onKeyup(c);
        this.validationMsg = '';
        if (err instanceof Error) {
          return this.validationMsg = err.message;
        }
      }
    };

    TextInput.prototype.view = function() {
      return m('.TextInput', m('input.Input', {
        disabled: this.disabled,
        onchange: this.onChangeInternal,
        onkeyup: this.onkeyupInternal,
        value: this.content,
        placeholder: this.placeholder
      }), this.validationMsg !== '' ? m('.ValidationMsg', this.validationMsg) : void 0);
    };

    return TextInput;

  })();

  TextInput.mss = {
    TextInput: s.LineSize('1.93em', '1em')({
      width: '200px',
      position: 'relative',
      Input: {
        display: 'block',
        border: '1px solid ' + style.border[4],
        width: '100%',
        height: '100%',
        fontSize: '1em',
        padding: '0 0.4em',
        WebkitAppearance: 'none',
        borderRadius: 0
      },
      ValidationMsg: {
        background: style.warn[5],
        color: style.text[8],
        position: 'absolute',
        top: 0,
        left: '100%',
        textAlign: 'center',
        width: '200px',
        zIndex: 99,
        $before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-2em',
          width: 0,
          height: 0,
          border: '1em solid transparent',
          borderRight: '1em solid ' + style.warn[5]
        }
      }
    })
  };

  module.exports = TextInput;

}).call(this);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var Collaspe, arrowDown, arrowRight, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  m = __webpack_require__(0);

  s = __webpack_require__(2);

  u = __webpack_require__(1);

  style = __webpack_require__(3);

  arrowRight = __webpack_require__(27);

  arrowDown = __webpack_require__(28);

  Collaspe = (function() {
    function Collaspe(arg) {
      var ref, ref1, ref2, ref3;
      this.titleArray = arg.titleArray, this.widgetArray = arg.widgetArray, this.autoCollaspe = (ref = arg.autoCollaspe) != null ? ref : false, this.expandedIndexArray = (ref1 = arg.expandedIndexArray) != null ? ref1 : [], this.onExpand = (ref2 = arg.onExpand) != null ? ref2 : u.noOp, this.onCollaspe = (ref3 = arg.onCollaspe) != null ? ref3 : u.noOp;
      this.onFoldInternal = bind(this.onFoldInternal, this);
      this.showWidget = false;
    }

    Collaspe.prototype.onFoldInternal = function(e) {
      var i, j;
      i = parseInt(u.getCurrentTargetData(e, 'index'));
      if (this.autoCollaspe) {
        if ((j = this.expandedIndexArray[0]) != null) {
          this.onCollaspe(j);
        }
        this.expandedIndexArray = [i];
        return this.onExpand(i);
      } else if (indexOf.call(this.expandedIndexArray, i) >= 0) {
        u.removeFromArray(this.expandedIndexArray, i);
        return this.onCollaspe(i);
      } else {
        this.expandedIndexArray.push(i);
        return this.onExpand(i);
      }
    };

    Collaspe.prototype.view = function() {
      var expanded, i, self, title;
      self = this;
      return m('.Collaspe', (function() {
        var k, len, ref, results;
        ref = this.titleArray;
        results = [];
        for (i = k = 0, len = ref.length; k < len; i = ++k) {
          title = ref[i];
          expanded = indexOf.call(this.expandedIndexArray, i) >= 0;
          results.push([
            m('.CollaspeTitle', {
              key: 'title' + i,
              'data-index': i.toString(),
              onclick: this.onFoldInternal
            }, expanded ? u.svg(arrowDown) : u.svg(arrowRight), m('span', title)), m('.CollaspeBody', {
              className: expanded ? 'Current' : '',
              key: 'body' + i,
              onclick: this.onFoldInternal
            }, expanded ? this.widgetArray[i].view() : void 0)
          ]);
        }
        return results;
      }).call(this));
    };

    return Collaspe;

  })();

  Collaspe.mss = {
    Collaspe: {
      CollaspeTitle: s.LineSize('2em', '1em')({
        color: style.text[8],
        background: style.main[4],
        border: '1px solid ' + style.main[4],
        padding: '0 0.4em',
        $hover: {
          cursor: 'pointer'
        },
        svg: {
          fill: style.text[8],
          height: '1.4em',
          width: '1.4em',
          padding: '0.3em',
          verticalAlign: 'middle'
        },
        span: {
          verticalAlign: 'middle'
        }
      }),
      CollaspeBody: {
        border: '1px solid ' + style.border[4],
        borderTop: 'none'
      }
    }
  };

  module.exports = Collaspe;

}).call(this);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var m = __webpack_require__(0);
module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>');


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var m = __webpack_require__(0);
module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>');


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var Notify, contentArray, dataArray, iconArray, keyCounter, m, s, style, timerArray, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = __webpack_require__(0);

  s = __webpack_require__(2);

  u = __webpack_require__(1);

  style = __webpack_require__(3);

  contentArray = [];

  iconArray = [];

  dataArray = [];

  timerArray = [];

  keyCounter = 0;

  Notify = (function() {
    function Notify(arg) {
      var ref, ref1;
      this.duration = (ref = arg.duration) != null ? ref : 3000, this.onClick = (ref1 = arg.onClick) != null ? ref1 : u.noOp;
      this.hideInternal = bind(this.hideInternal, this);
      this.show = bind(this.show, this);
      this.onClickInternal = bind(this.onClickInternal, this);
      this.indexArray = [];
    }

    Notify.prototype.onClickInternal = function(e) {
      var data, index;
      index = parseInt(u.getCurrentTargetData(e, 'index'));
      data = JSON.parse(u.getCurrentTargetData(e, 'data'));
      this.hideInternal(index);
      return this.onClick(data);
    };

    Notify.prototype.show = function(icon, content, data) {
      if (data == null) {
        data = null;
      }
      contentArray.push({
        content: content,
        context: this,
        key: keyCounter++
      });
      iconArray.push(icon);
      dataArray.push(data);
      return timerArray.push(setTimeout((function(_this) {
        return function() {
          return _this.hideInternal(0);
        };
      })(this), this.duration));
    };

    Notify.prototype.hideInternal = function(i) {
      iconArray.splice(i, 1);
      contentArray.splice(i, 1);
      dataArray.splice(i, 1);
      clearTimeout(timerArray[i]);
      timerArray.splice(i, 1);
      return m.redraw();
    };

    Notify.prototype.view = function() {
      var content, context, i, key;
      return m('.Notify', (function() {
        var j, len, ref, results;
        results = [];
        for (i = j = 0, len = contentArray.length; j < len; i = ++j) {
          ref = contentArray[i], key = ref.key, content = ref.content, context = ref.context;
          if (context === this) {
            results.push(m('.NotifyItem', {
              key: key,
              'data-index': i,
              'data-data': JSON.stringify(dataArray[i]),
              onclick: this.onClickInternal,
              style: {
                right: '1em',
                top: (1 + 5 * i) + 'em'
              }
            }, m('.Icon', iconArray[i]), m('.Content', content)));
          }
        }
        return results;
      }).call(this));
    };

    return Notify;

  })();

  Notify.mss = {
    Notify: {
      NotifyItem: {
        width: '20em',
        height: '4em',
        position: 'fixed',
        right: '1em',
        background: '#fff',
        border: '1px solid ' + style.border[4],
        zIndex: 9999,
        borderRadius: '0.4em',
        transition: 'top 0.1s ease',
        Content: {
          width: '16em',
          textAlign: 'center',
          display: 'inline-block',
          verticalAlign: 'middle'
        },
        Icon_CloseBtn: {
          width: '4em',
          textAlign: 'center',
          display: 'inline-block',
          svg: s.LineSize('4em', '1em')({
            verticalAlign: 'middle'
          })
        }
      }
    }
  };

  module.exports = Notify;

}).call(this);


/***/ })
/******/ ]);