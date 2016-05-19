/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Button, Collaspe, DatePicker, Demo, DropDown, Modal, Notify, Switch, TextInput, buildIcon, delIcon, infoIcon, m, msgIcon, s, style, u;

	m = __webpack_require__(1);

	s = __webpack_require__(3);

	buildIcon = __webpack_require__(4);

	delIcon = __webpack_require__(5);

	infoIcon = __webpack_require__(6);

	msgIcon = __webpack_require__(7);

	Button = __webpack_require__(8);

	DatePicker = __webpack_require__(11);

	Switch = __webpack_require__(15);

	DropDown = __webpack_require__(16);

	Modal = __webpack_require__(17);

	TextInput = __webpack_require__(18);

	Collaspe = __webpack_require__(19);

	Notify = __webpack_require__(22);

	u = __webpack_require__(10);

	style = __webpack_require__(9);

	Demo = (function() {
	  function Demo() {
	    var i;
	    this.demoButton1 = new Button({
	      text: 'Just Button'
	    });
	    this.demoButton2 = new Button({
	      text: 'Build',
	      prefix: buildIcon
	    });
	    this.demoButton3 = new Button({
	      text: 'Delete',
	      suffix: delIcon
	    });
	    this.demoButtonDoc = new Collaspe({
	      titleArray: ['Button document'],
	      widgetArray: [
	        {
	          view: function() {
	            return m('textarea', {
	              readonly: true
	            }, "Button = require 'mui/Button'\nbuildIcon = require 'mmsvg/google/msvg/action/build'\n\ndemoButton = new Button\n    text: 'Build'\n    prefix: buildIcon\n\n###\n    text             # String\n    prefix           # mithril svg view\n    suffix           # mithril svg view\n    data             # HashMap\n    onClick = (->)   # (HashMap) -> a\n###");
	          }
	        }
	      ]
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
	      clickToHide: true,
	      widget: {
	        view: function() {
	          return m('h2', 'Close anywhere  else to close');
	        }
	      }
	    });
	    this.demoModal2 = new Modal({
	      clickToHide: false
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
	            }, "Modal = require 'mui/Modal'\n\ndemoModal1 = new Modal\n    clickToHide: true\n    widget: view: ->\n        m 'h2', 'Close anywhere  else to close'\n\n###\n    widget                 # mithril view\n    clickToHide = true     # Boolean\n    onHide = ( -> )        # () -> a\n###");
	          }
	        }
	      ]
	    });
	    this.demoTextInput = new TextInput({
	      onChange: function(str) {
	        if (str !== 'ya!') {
	          return new Error('please input "ya!"');
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
	            }, "TextInput = require 'mui/TextInput'\n\ndemoTextInput = new TextInput\n    onChange: (str) ->\n        if str != 'ya!'\n            new Error 'please input \"ya!\"'\n\n###\n    content = ''           # String\n    disabled = false       # Boolean\n    placeholder = ''       # String\n    onChange = ( -> )      # (String) -> a | Error\n###");
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
	      m('ul.Demo', m('li', this.demoButtonDoc.view()), m('li', this.demoButton1.view(), this.demoButton2.view(), this.demoButton3.view()), m('li', this.demoDatePickerDoc.view()), m('li', this.demoDatePicker1.view()), m('li', this.demoDatePicker2.view()), m('li', this.demoSwitchDoc.view()), m('li', this.demoSwitch.view()), m('li', this.demoDropDownDoc.view()), m('li', this.demoDropDown1.view()), m('li', this.demoDropDown2.view()), m('li', this.demoDropDown3.view()), m('li', this.demoModalDoc.view()), m('li', this.demoModalOpenBtn1.view(), this.demoModal1.view()), m('li', this.demoModalOpenBtn2.view(), this.demoModal2.view()), m('li', this.demoTextInputDoc.view()), m('li', this.demoTextInput.view()), m('li', this.demoCollaspeDoc.view()), m('li', this.demoCollaspe.view()), m('li', this.demoNotifyDoc.view()), m('li', this.demoNotify1.view(), this.demoNotify2.view()), m('li', this.demoNotifyOpenBtn1.view(), this.demoNotifyOpenBtn2.view()), m('li', this.demoSpinnerDoc.view()), m('li', u.spinner(style.main[4]), u.spinner(style.main[4], '5em'), u.spinner(style.main[4], '2em', '0.3s'), u.spinner(style.text[4], '5em'))), m('.Misc', m('span', 'Winter\'s ui collection'), m('a', {
	        href: 'https://github.com/winterland1989/mui'
	      }, 'view code on github'), m('a', {
	        href: 'https://github.com/winterland1989/mui/blob/gh-pages/demo/index.coffee'
	      }, 'this page\'s source'))
	    ];
	  };

	  return Demo;

	})();

	s.tag(s.merge([
	  Button.mss, DatePicker.mss, Switch.mss, DropDown.mss, Modal.mss, TextInput.mss, Collaspe.mss, Notify.mss, {
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {;(function (global, factory) { // eslint-disable-line
		"use strict"
		/* eslint-disable no-undef */
		var m = factory(global)
		if (typeof module === "object" && module != null && module.exports) {
			module.exports = m
		} else if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return m }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
		} else {
			global.m = m
		}
		/* eslint-enable no-undef */
	})(typeof window !== "undefined" ? window : this, function (global, undefined) { // eslint-disable-line
		"use strict"

		m.version = function () {
			return "v0.2.3"
		}

		var hasOwn = {}.hasOwnProperty
		var type = {}.toString

		function isFunction(object) {
			return typeof object === "function"
		}

		function isObject(object) {
			return type.call(object) === "[object Object]"
		}

		function isString(object) {
			return type.call(object) === "[object String]"
		}

		var isArray = Array.isArray || function (object) {
			return type.call(object) === "[object Array]"
		}

		function noop() {}

		var voidElements = {
			AREA: 1,
			BASE: 1,
			BR: 1,
			COL: 1,
			COMMAND: 1,
			EMBED: 1,
			HR: 1,
			IMG: 1,
			INPUT: 1,
			KEYGEN: 1,
			LINK: 1,
			META: 1,
			PARAM: 1,
			SOURCE: 1,
			TRACK: 1,
			WBR: 1
		}

		// caching commonly used variables
		var $document, $location, $requestAnimationFrame, $cancelAnimationFrame

		// self invoking function needed because of the way mocks work
		function initialize(mock) {
			$document = mock.document
			$location = mock.location
			$cancelAnimationFrame = mock.cancelAnimationFrame || mock.clearTimeout
			$requestAnimationFrame = mock.requestAnimationFrame || mock.setTimeout
		}

		// testing API
		m.deps = function (mock) {
			initialize(global = mock || window)
			return global
		}

		m.deps(global)

		/**
		 * @typedef {String} Tag
		 * A string that looks like -> div.classname#id[param=one][param2=two]
		 * Which describes a DOM node
		 */

		function parseTagAttrs(cell, tag) {
			var classes = []
			var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g
			var match

			while ((match = parser.exec(tag))) {
				if (match[1] === "" && match[2]) {
					cell.tag = match[2]
				} else if (match[1] === "#") {
					cell.attrs.id = match[2]
				} else if (match[1] === ".") {
					classes.push(match[2])
				} else if (match[3][0] === "[") {
					var pair = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/.exec(match[3])
					cell.attrs[pair[1]] = pair[3] || ""
				}
			}

			return classes
		}

		function getVirtualChildren(args, hasAttrs) {
			var children = hasAttrs ? args.slice(1) : args

			if (children.length === 1 && isArray(children[0])) {
				return children[0]
			} else {
				return children
			}
		}

		function assignAttrs(target, attrs, classes) {
			var classAttr = "class" in attrs ? "class" : "className"

			for (var attrName in attrs) {
				if (hasOwn.call(attrs, attrName)) {
					if (attrName === classAttr &&
							attrs[attrName] != null &&
							attrs[attrName] !== "") {
						classes.push(attrs[attrName])
						// create key in correct iteration order
						target[attrName] = ""
					} else {
						target[attrName] = attrs[attrName]
					}
				}
			}

			if (classes.length) target[classAttr] = classes.join(" ")
		}

		/**
		 *
		 * @param {Tag} The DOM node tag
		 * @param {Object=[]} optional key-value pairs to be mapped to DOM attrs
		 * @param {...mNode=[]} Zero or more Mithril child nodes. Can be an array,
		 *                      or splat (optional)
		 */
		function m(tag, pairs) {
			var args = []

			for (var i = 1, length = arguments.length; i < length; i++) {
				args[i - 1] = arguments[i]
			}

			if (isObject(tag)) return parameterize(tag, args)

			if (!isString(tag)) {
				throw new Error("selector in m(selector, attrs, children) should " +
					"be a string")
			}

			var hasAttrs = pairs != null && isObject(pairs) &&
				!("tag" in pairs || "view" in pairs || "subtree" in pairs)

			var attrs = hasAttrs ? pairs : {}
			var cell = {
				tag: "div",
				attrs: {},
				children: getVirtualChildren(args, hasAttrs)
			}

			assignAttrs(cell.attrs, attrs, parseTagAttrs(cell, tag))
			return cell
		}

		function forEach(list, f) {
			for (var i = 0; i < list.length && !f(list[i], i++);) {
				// function called in condition
			}
		}

		function forKeys(list, f) {
			forEach(list, function (attrs, i) {
				return (attrs = attrs && attrs.attrs) &&
					attrs.key != null &&
					f(attrs, i)
			})
		}
		// This function was causing deopts in Chrome.
		function dataToString(data) {
			// data.toString() might throw or return null if data is the return
			// value of Console.log in some versions of Firefox (behavior depends on
			// version)
			try {
				if (data != null && data.toString() != null) return data
			} catch (e) {
				// silently ignore errors
			}
			return ""
		}

		// This function was causing deopts in Chrome.
		function injectTextNode(parentElement, first, index, data) {
			try {
				insertNode(parentElement, first, index)
				first.nodeValue = data
			} catch (e) {
				// IE erroneously throws error when appending an empty text node
				// after a null
			}
		}

		function flatten(list) {
			// recursively flatten array
			for (var i = 0; i < list.length; i++) {
				if (isArray(list[i])) {
					list = list.concat.apply([], list)
					// check current index again and flatten until there are no more
					// nested arrays at that index
					i--
				}
			}
			return list
		}

		function insertNode(parentElement, node, index) {
			parentElement.insertBefore(node,
				parentElement.childNodes[index] || null)
		}

		var DELETION = 1
		var INSERTION = 2
		var MOVE = 3

		function handleKeysDiffer(data, existing, cached, parentElement) {
			forKeys(data, function (key, i) {
				existing[key = key.key] = existing[key] ? {
					action: MOVE,
					index: i,
					from: existing[key].index,
					element: cached.nodes[existing[key].index] ||
						$document.createElement("div")
				} : {action: INSERTION, index: i}
			})

			var actions = []
			for (var prop in existing) {
				if (hasOwn.call(existing, prop)) {
					actions.push(existing[prop])
				}
			}

			var changes = actions.sort(sortChanges)
			var newCached = new Array(cached.length)

			newCached.nodes = cached.nodes.slice()

			forEach(changes, function (change) {
				var index = change.index
				if (change.action === DELETION) {
					clear(cached[index].nodes, cached[index])
					newCached.splice(index, 1)
				}
				if (change.action === INSERTION) {
					var dummy = $document.createElement("div")
					dummy.key = data[index].attrs.key
					insertNode(parentElement, dummy, index)
					newCached.splice(index, 0, {
						attrs: {key: data[index].attrs.key},
						nodes: [dummy]
					})
					newCached.nodes[index] = dummy
				}

				if (change.action === MOVE) {
					var changeElement = change.element
					var maybeChanged = parentElement.childNodes[index]
					if (maybeChanged !== changeElement && changeElement !== null) {
						parentElement.insertBefore(changeElement,
							maybeChanged || null)
					}
					newCached[index] = cached[change.from]
					newCached.nodes[index] = changeElement
				}
			})

			return newCached
		}

		function diffKeys(data, cached, existing, parentElement) {
			var keysDiffer = data.length !== cached.length

			if (!keysDiffer) {
				forKeys(data, function (attrs, i) {
					var cachedCell = cached[i]
					return keysDiffer = cachedCell &&
						cachedCell.attrs &&
						cachedCell.attrs.key !== attrs.key
				})
			}

			if (keysDiffer) {
				return handleKeysDiffer(data, existing, cached, parentElement)
			} else {
				return cached
			}
		}

		function diffArray(data, cached, nodes) {
			// diff the array itself

			// update the list of DOM nodes by collecting the nodes from each item
			forEach(data, function (_, i) {
				if (cached[i] != null) nodes.push.apply(nodes, cached[i].nodes)
			})
			// remove items from the end of the array if the new array is shorter
			// than the old one. if errors ever happen here, the issue is most
			// likely a bug in the construction of the `cached` data structure
			// somewhere earlier in the program
			forEach(cached.nodes, function (node, i) {
				if (node.parentNode != null && nodes.indexOf(node) < 0) {
					clear([node], [cached[i]])
				}
			})

			if (data.length < cached.length) cached.length = data.length
			cached.nodes = nodes
		}

		function buildArrayKeys(data) {
			var guid = 0
			forKeys(data, function () {
				forEach(data, function (attrs) {
					if ((attrs = attrs && attrs.attrs) && attrs.key == null) {
						attrs.key = "__mithril__" + guid++
					}
				})
				return 1
			})
		}

		function isDifferentEnough(data, cached, dataAttrKeys) {
			if (data.tag !== cached.tag) return true

			if (dataAttrKeys.sort().join() !==
					Object.keys(cached.attrs).sort().join()) {
				return true
			}

			if (data.attrs.id !== cached.attrs.id) {
				return true
			}

			if (data.attrs.key !== cached.attrs.key) {
				return true
			}

			if (m.redraw.strategy() === "all") {
				return !cached.configContext || cached.configContext.retain !== true
			}

			if (m.redraw.strategy() === "diff") {
				return cached.configContext && cached.configContext.retain === false
			}

			return false
		}

		function maybeRecreateObject(data, cached, dataAttrKeys) {
			// if an element is different enough from the one in cache, recreate it
			if (isDifferentEnough(data, cached, dataAttrKeys)) {
				if (cached.nodes.length) clear(cached.nodes)

				if (cached.configContext &&
						isFunction(cached.configContext.onunload)) {
					cached.configContext.onunload()
				}

				if (cached.controllers) {
					forEach(cached.controllers, function (controller) {
						if (controller.onunload) {
							controller.onunload({preventDefault: noop})
						}
					})
				}
			}
		}

		function getObjectNamespace(data, namespace) {
			if (data.attrs.xmlns) return data.attrs.xmlns
			if (data.tag === "svg") return "http://www.w3.org/2000/svg"
			if (data.tag === "math") return "http://www.w3.org/1998/Math/MathML"
			return namespace
		}

		var pendingRequests = 0
		m.startComputation = function () { pendingRequests++ }
		m.endComputation = function () {
			if (pendingRequests > 1) {
				pendingRequests--
			} else {
				pendingRequests = 0
				m.redraw()
			}
		}

		function unloadCachedControllers(cached, views, controllers) {
			if (controllers.length) {
				cached.views = views
				cached.controllers = controllers
				forEach(controllers, function (controller) {
					if (controller.onunload && controller.onunload.$old) {
						controller.onunload = controller.onunload.$old
					}

					if (pendingRequests && controller.onunload) {
						var onunload = controller.onunload
						controller.onunload = noop
						controller.onunload.$old = onunload
					}
				})
			}
		}

		function scheduleConfigsToBeCalled(configs, data, node, isNew, cached) {
			// schedule configs to be called. They are called after `build` finishes
			// running
			if (isFunction(data.attrs.config)) {
				var context = cached.configContext = cached.configContext || {}

				// bind
				configs.push(function () {
					return data.attrs.config.call(data, node, !isNew, context,
						cached)
				})
			}
		}

		function buildUpdatedNode(
			cached,
			data,
			editable,
			hasKeys,
			namespace,
			views,
			configs,
			controllers
		) {
			var node = cached.nodes[0]

			if (hasKeys) {
				setAttributes(node, data.tag, data.attrs, cached.attrs, namespace)
			}

			cached.children = build(
				node,
				data.tag,
				undefined,
				undefined,
				data.children,
				cached.children,
				false,
				0,
				data.attrs.contenteditable ? node : editable,
				namespace,
				configs
			)

			cached.nodes.intact = true

			if (controllers.length) {
				cached.views = views
				cached.controllers = controllers
			}

			return node
		}

		function handleNonexistentNodes(data, parentElement, index) {
			var nodes
			if (data.$trusted) {
				nodes = injectHTML(parentElement, index, data)
			} else {
				nodes = [$document.createTextNode(data)]
				if (!(parentElement.nodeName in voidElements)) {
					insertNode(parentElement, nodes[0], index)
				}
			}

			var cached

			if (typeof data === "string" ||
					typeof data === "number" ||
					typeof data === "boolean") {
				cached = new data.constructor(data)
			} else {
				cached = data
			}

			cached.nodes = nodes
			return cached
		}

		function reattachNodes(
			data,
			cached,
			parentElement,
			editable,
			index,
			parentTag
		) {
			var nodes = cached.nodes
			if (!editable || editable !== $document.activeElement) {
				if (data.$trusted) {
					clear(nodes, cached)
					nodes = injectHTML(parentElement, index, data)
				} else if (parentTag === "textarea") {
					// <textarea> uses `value` instead of `nodeValue`.
					parentElement.value = data
				} else if (editable) {
					// contenteditable nodes use `innerHTML` instead of `nodeValue`.
					editable.innerHTML = data
				} else {
					// was a trusted string
					if (nodes[0].nodeType === 1 || nodes.length > 1 ||
							(nodes[0].nodeValue.trim &&
								!nodes[0].nodeValue.trim())) {
						clear(cached.nodes, cached)
						nodes = [$document.createTextNode(data)]
					}

					injectTextNode(parentElement, nodes[0], index, data)
				}
			}
			cached = new data.constructor(data)
			cached.nodes = nodes
			return cached
		}

		function handleTextNode(
			cached,
			data,
			index,
			parentElement,
			shouldReattach,
			editable,
			parentTag
		) {
			if (!cached.nodes.length) {
				return handleNonexistentNodes(data, parentElement, index)
			} else if (cached.valueOf() !== data.valueOf() || shouldReattach) {
				return reattachNodes(data, cached, parentElement, editable, index,
					parentTag)
			} else {
				return (cached.nodes.intact = true, cached)
			}
		}

		function getSubArrayCount(item) {
			if (item.$trusted) {
				// fix offset of next element if item was a trusted string w/ more
				// than one html element
				// the first clause in the regexp matches elements
				// the second clause (after the pipe) matches text nodes
				var match = item.match(/<[^\/]|\>\s*[^<]/g)
				if (match != null) return match.length
			} else if (isArray(item)) {
				return item.length
			}
			return 1
		}

		function buildArray(
			data,
			cached,
			parentElement,
			index,
			parentTag,
			shouldReattach,
			editable,
			namespace,
			configs
		) {
			data = flatten(data)
			var nodes = []
			var intact = cached.length === data.length
			var subArrayCount = 0

			// keys algorithm: sort elements without recreating them if keys are
			// present
			//
			// 1) create a map of all existing keys, and mark all for deletion
			// 2) add new keys to map and mark them for addition
			// 3) if key exists in new list, change action from deletion to a move
			// 4) for each key, handle its corresponding action as marked in
			//    previous steps

			var existing = {}
			var shouldMaintainIdentities = false

			forKeys(cached, function (attrs, i) {
				shouldMaintainIdentities = true
				existing[cached[i].attrs.key] = {action: DELETION, index: i}
			})

			buildArrayKeys(data)
			if (shouldMaintainIdentities) {
				cached = diffKeys(data, cached, existing, parentElement)
			}
			// end key algorithm

			var cacheCount = 0
			// faster explicitly written
			for (var i = 0, len = data.length; i < len; i++) {
				// diff each item in the array
				var item = build(
					parentElement,
					parentTag,
					cached,
					index,
					data[i],
					cached[cacheCount],
					shouldReattach,
					index + subArrayCount || subArrayCount,
					editable,
					namespace,
					configs)

				if (item !== undefined) {
					intact = intact && item.nodes.intact
					subArrayCount += getSubArrayCount(item)
					cached[cacheCount++] = item
				}
			}

			if (!intact) diffArray(data, cached, nodes)
			return cached
		}

		function makeCache(data, cached, index, parentIndex, parentCache) {
			if (cached != null) {
				if (type.call(cached) === type.call(data)) return cached

				if (parentCache && parentCache.nodes) {
					var offset = index - parentIndex
					var end = offset + (isArray(data) ? data : cached.nodes).length
					clear(
						parentCache.nodes.slice(offset, end),
						parentCache.slice(offset, end))
				} else if (cached.nodes) {
					clear(cached.nodes, cached)
				}
			}

			cached = new data.constructor()
			// if constructor creates a virtual dom element, use a blank object as
			// the base cached node instead of copying the virtual el (#277)
			if (cached.tag) cached = {}
			cached.nodes = []
			return cached
		}

		function constructNode(data, namespace) {
			if (data.attrs.is) {
				if (namespace == null) {
					return $document.createElement(data.tag, data.attrs.is)
				} else {
					return $document.createElementNS(namespace, data.tag,
						data.attrs.is)
				}
			} else if (namespace == null) {
				return $document.createElement(data.tag)
			} else {
				return $document.createElementNS(namespace, data.tag)
			}
		}

		function constructAttrs(data, node, namespace, hasKeys) {
			if (hasKeys) {
				return setAttributes(node, data.tag, data.attrs, {}, namespace)
			} else {
				return data.attrs
			}
		}

		function constructChildren(
			data,
			node,
			cached,
			editable,
			namespace,
			configs
		) {
			if (data.children != null && data.children.length > 0) {
				return build(
					node,
					data.tag,
					undefined,
					undefined,
					data.children,
					cached.children,
					true,
					0,
					data.attrs.contenteditable ? node : editable,
					namespace,
					configs)
			} else {
				return data.children
			}
		}

		function reconstructCached(
			data,
			attrs,
			children,
			node,
			namespace,
			views,
			controllers
		) {
			var cached = {
				tag: data.tag,
				attrs: attrs,
				children: children,
				nodes: [node]
			}

			unloadCachedControllers(cached, views, controllers)

			if (cached.children && !cached.children.nodes) {
				cached.children.nodes = []
			}

			// edge case: setting value on <select> doesn't work before children
			// exist, so set it again after children have been created
			if (data.tag === "select" && "value" in data.attrs) {
				setAttributes(node, data.tag, {value: data.attrs.value}, {},
					namespace)
			}

			return cached
		}

		function getController(views, view, cachedControllers, controller) {
			var controllerIndex

			if (m.redraw.strategy() === "diff" && views) {
				controllerIndex = views.indexOf(view)
			} else {
				controllerIndex = -1
			}

			if (controllerIndex > -1) {
				return cachedControllers[controllerIndex]
			} else if (isFunction(controller)) {
				return new controller()
			} else {
				return {}
			}
		}

		var unloaders = []

		function updateLists(views, controllers, view, controller) {
			if (controller.onunload != null &&
					unloaders.map(function (u) { return u.handler })
						.indexOf(controller.onunload) < 0) {
				unloaders.push({
					controller: controller,
					handler: controller.onunload
				})
			}

			views.push(view)
			controllers.push(controller)
		}

		var forcing = false
		function checkView(
			data,
			view,
			cached,
			cachedControllers,
			controllers,
			views
		) {
			var controller = getController(
				cached.views,
				view,
				cachedControllers,
				data.controller)

			var key = data && data.attrs && data.attrs.key

			if (pendingRequests === 0 ||
					forcing ||
					cachedControllers &&
						cachedControllers.indexOf(controller) > -1) {
				data = data.view(controller)
			} else {
				data = {tag: "placeholder"}
			}

			if (data.subtree === "retain") return data
			data.attrs = data.attrs || {}
			data.attrs.key = key
			updateLists(views, controllers, view, controller)
			return data
		}

		function markViews(data, cached, views, controllers) {
			var cachedControllers = cached && cached.controllers

			while (data.view != null) {
				data = checkView(
					data,
					data.view.$original || data.view,
					cached,
					cachedControllers,
					controllers,
					views)
			}

			return data
		}

		function buildObject( // eslint-disable-line max-statements
			data,
			cached,
			editable,
			parentElement,
			index,
			shouldReattach,
			namespace,
			configs
		) {
			var views = []
			var controllers = []

			data = markViews(data, cached, views, controllers)

			if (data.subtree === "retain") return cached

			if (!data.tag && controllers.length) {
				throw new Error("Component template must return a virtual " +
					"element, not an array, string, etc.")
			}

			data.attrs = data.attrs || {}
			cached.attrs = cached.attrs || {}

			var dataAttrKeys = Object.keys(data.attrs)
			var hasKeys = dataAttrKeys.length > ("key" in data.attrs ? 1 : 0)

			maybeRecreateObject(data, cached, dataAttrKeys)

			if (!isString(data.tag)) return

			var isNew = cached.nodes.length === 0

			namespace = getObjectNamespace(data, namespace)

			var node
			if (isNew) {
				node = constructNode(data, namespace)
				// set attributes first, then create children
				var attrs = constructAttrs(data, node, namespace, hasKeys)

				var children = constructChildren(data, node, cached, editable,
					namespace, configs)

				cached = reconstructCached(
					data,
					attrs,
					children,
					node,
					namespace,
					views,
					controllers)
			} else {
				node = buildUpdatedNode(
					cached,
					data,
					editable,
					hasKeys,
					namespace,
					views,
					configs,
					controllers)
			}

			if (isNew || shouldReattach === true && node != null) {
				insertNode(parentElement, node, index)
			}

			// The configs are called after `build` finishes running
			scheduleConfigsToBeCalled(configs, data, node, isNew, cached)

			return cached
		}

		function build(
			parentElement,
			parentTag,
			parentCache,
			parentIndex,
			data,
			cached,
			shouldReattach,
			index,
			editable,
			namespace,
			configs
		) {
			/*
			 * `build` is a recursive function that manages creation/diffing/removal
			 * of DOM elements based on comparison between `data` and `cached` the
			 * diff algorithm can be summarized as this:
			 *
			 * 1 - compare `data` and `cached`
			 * 2 - if they are different, copy `data` to `cached` and update the DOM
			 *     based on what the difference is
			 * 3 - recursively apply this algorithm for every array and for the
			 *     children of every virtual element
			 *
			 * The `cached` data structure is essentially the same as the previous
			 * redraw's `data` data structure, with a few additions:
			 * - `cached` always has a property called `nodes`, which is a list of
			 *    DOM elements that correspond to the data represented by the
			 *    respective virtual element
			 * - in order to support attaching `nodes` as a property of `cached`,
			 *    `cached` is *always* a non-primitive object, i.e. if the data was
			 *    a string, then cached is a String instance. If data was `null` or
			 *    `undefined`, cached is `new String("")`
			 * - `cached also has a `configContext` property, which is the state
			 *    storage object exposed by config(element, isInitialized, context)
			 * - when `cached` is an Object, it represents a virtual element; when
			 *    it's an Array, it represents a list of elements; when it's a
			 *    String, Number or Boolean, it represents a text node
			 *
			 * `parentElement` is a DOM element used for W3C DOM API calls
			 * `parentTag` is only used for handling a corner case for textarea
			 * values
			 * `parentCache` is used to remove nodes in some multi-node cases
			 * `parentIndex` and `index` are used to figure out the offset of nodes.
			 * They're artifacts from before arrays started being flattened and are
			 * likely refactorable
			 * `data` and `cached` are, respectively, the new and old nodes being
			 * diffed
			 * `shouldReattach` is a flag indicating whether a parent node was
			 * recreated (if so, and if this node is reused, then this node must
			 * reattach itself to the new parent)
			 * `editable` is a flag that indicates whether an ancestor is
			 * contenteditable
			 * `namespace` indicates the closest HTML namespace as it cascades down
			 * from an ancestor
			 * `configs` is a list of config functions to run after the topmost
			 * `build` call finishes running
			 *
			 * there's logic that relies on the assumption that null and undefined
			 * data are equivalent to empty strings
			 * - this prevents lifecycle surprises from procedural helpers that mix
			 *   implicit and explicit return statements (e.g.
			 *   function foo() {if (cond) return m("div")}
			 * - it simplifies diffing code
			 */
			data = dataToString(data)
			if (data.subtree === "retain") return cached
			cached = makeCache(data, cached, index, parentIndex, parentCache)

			if (isArray(data)) {
				return buildArray(
					data,
					cached,
					parentElement,
					index,
					parentTag,
					shouldReattach,
					editable,
					namespace,
					configs)
			} else if (data != null && isObject(data)) {
				return buildObject(
					data,
					cached,
					editable,
					parentElement,
					index,
					shouldReattach,
					namespace,
					configs)
			} else if (!isFunction(data)) {
				return handleTextNode(
					cached,
					data,
					index,
					parentElement,
					shouldReattach,
					editable,
					parentTag)
			} else {
				return cached
			}
		}

		function sortChanges(a, b) {
			return a.action - b.action || a.index - b.index
		}

		function copyStyleAttrs(node, dataAttr, cachedAttr) {
			for (var rule in dataAttr) {
				if (hasOwn.call(dataAttr, rule)) {
					if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) {
						node.style[rule] = dataAttr[rule]
					}
				}
			}

			for (rule in cachedAttr) {
				if (hasOwn.call(cachedAttr, rule)) {
					if (!hasOwn.call(dataAttr, rule)) node.style[rule] = ""
				}
			}
		}

		var shouldUseSetAttribute = {
			list: 1,
			style: 1,
			form: 1,
			type: 1,
			width: 1,
			height: 1
		}

		function setSingleAttr(
			node,
			attrName,
			dataAttr,
			cachedAttr,
			tag,
			namespace
		) {
			if (attrName === "config" || attrName === "key") {
				// `config` isn't a real attribute, so ignore it
				return true
			} else if (isFunction(dataAttr) && attrName.slice(0, 2) === "on") {
				// hook event handlers to the auto-redrawing system
				node[attrName] = autoredraw(dataAttr, node)
			} else if (attrName === "style" && dataAttr != null &&
					isObject(dataAttr)) {
				// handle `style: {...}`
				copyStyleAttrs(node, dataAttr, cachedAttr)
			} else if (namespace != null) {
				// handle SVG
				if (attrName === "href") {
					node.setAttributeNS("http://www.w3.org/1999/xlink",
						"href", dataAttr)
				} else {
					node.setAttribute(
						attrName === "className" ? "class" : attrName,
						dataAttr)
				}
			} else if (attrName in node && !shouldUseSetAttribute[attrName]) {
				// handle cases that are properties (but ignore cases where we
				// should use setAttribute instead)
				//
				// - list and form are typically used as strings, but are DOM
				//   element references in js
				//
				// - when using CSS selectors (e.g. `m("[style='']")`), style is
				//   used as a string, but it's an object in js
				//
				// #348 don't set the value if not needed - otherwise, cursor
				// placement breaks in Chrome
				try {
					if (tag !== "input" || node[attrName] !== dataAttr) {
						node[attrName] = dataAttr
					}
				} catch (e) {
					node.setAttribute(attrName, dataAttr)
				}
			}
			else node.setAttribute(attrName, dataAttr)
		}

		function trySetAttr(
			node,
			attrName,
			dataAttr,
			cachedAttr,
			cachedAttrs,
			tag,
			namespace
		) {
			if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr)) {
				cachedAttrs[attrName] = dataAttr
				try {
					return setSingleAttr(
						node,
						attrName,
						dataAttr,
						cachedAttr,
						tag,
						namespace)
				} catch (e) {
					// swallow IE's invalid argument errors to mimic HTML's
					// fallback-to-doing-nothing-on-invalid-attributes behavior
					if (e.message.indexOf("Invalid argument") < 0) throw e
				}
			} else if (attrName === "value" && tag === "input" &&
					node.value !== dataAttr) {
				// #348 dataAttr may not be a string, so use loose comparison
				node.value = dataAttr
			}
		}

		function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
			for (var attrName in dataAttrs) {
				if (hasOwn.call(dataAttrs, attrName)) {
					if (trySetAttr(
							node,
							attrName,
							dataAttrs[attrName],
							cachedAttrs[attrName],
							cachedAttrs,
							tag,
							namespace)) {
						continue
					}
				}
			}
			return cachedAttrs
		}

		function clear(nodes, cached) {
			for (var i = nodes.length - 1; i > -1; i--) {
				if (nodes[i] && nodes[i].parentNode) {
					try {
						nodes[i].parentNode.removeChild(nodes[i])
					} catch (e) {
						/* eslint-disable max-len */
						// ignore if this fails due to order of events (see
						// http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node)
						/* eslint-enable max-len */
					}
					cached = [].concat(cached)
					if (cached[i]) unload(cached[i])
				}
			}
			// release memory if nodes is an array. This check should fail if nodes
			// is a NodeList (see loop above)
			if (nodes.length) {
				nodes.length = 0
			}
		}

		function unload(cached) {
			if (cached.configContext && isFunction(cached.configContext.onunload)) {
				cached.configContext.onunload()
				cached.configContext.onunload = null
			}
			if (cached.controllers) {
				forEach(cached.controllers, function (controller) {
					if (isFunction(controller.onunload)) {
						controller.onunload({preventDefault: noop})
					}
				})
			}
			if (cached.children) {
				if (isArray(cached.children)) forEach(cached.children, unload)
				else if (cached.children.tag) unload(cached.children)
			}
		}

		function appendTextFragment(parentElement, data) {
			try {
				parentElement.appendChild(
					$document.createRange().createContextualFragment(data))
			} catch (e) {
				parentElement.insertAdjacentHTML("beforeend", data)
			}
		}

		function injectHTML(parentElement, index, data) {
			var nextSibling = parentElement.childNodes[index]
			if (nextSibling) {
				var isElement = nextSibling.nodeType !== 1
				var placeholder = $document.createElement("span")
				if (isElement) {
					parentElement.insertBefore(placeholder, nextSibling || null)
					placeholder.insertAdjacentHTML("beforebegin", data)
					parentElement.removeChild(placeholder)
				} else {
					nextSibling.insertAdjacentHTML("beforebegin", data)
				}
			} else {
				appendTextFragment(parentElement, data)
			}

			var nodes = []

			while (parentElement.childNodes[index] !== nextSibling) {
				nodes.push(parentElement.childNodes[index])
				index++
			}

			return nodes
		}

		function autoredraw(callback, object) {
			return function (e) {
				e = e || event
				m.redraw.strategy("diff")
				m.startComputation()
				try {
					return callback.call(object, e)
				} finally {
					endFirstComputation()
				}
			}
		}

		var html
		var documentNode = {
			appendChild: function (node) {
				if (html === undefined) html = $document.createElement("html")
				if ($document.documentElement &&
						$document.documentElement !== node) {
					$document.replaceChild(node, $document.documentElement)
				} else {
					$document.appendChild(node)
				}

				this.childNodes = $document.childNodes
			},

			insertBefore: function (node) {
				this.appendChild(node)
			},

			childNodes: []
		}

		var nodeCache = []
		var cellCache = {}

		m.render = function (root, cell, forceRecreation) {
			if (!root) {
				throw new Error("Ensure the DOM element being passed to " +
					"m.route/m.mount/m.render is not undefined.")
			}
			var configs = []
			var id = getCellCacheKey(root)
			var isDocumentRoot = root === $document
			var node

			if (isDocumentRoot || root === $document.documentElement) {
				node = documentNode
			} else {
				node = root
			}

			if (isDocumentRoot && cell.tag !== "html") {
				cell = {tag: "html", attrs: {}, children: cell}
			}

			if (cellCache[id] === undefined) clear(node.childNodes)
			if (forceRecreation === true) reset(root)

			cellCache[id] = build(
				node,
				null,
				undefined,
				undefined,
				cell,
				cellCache[id],
				false,
				0,
				null,
				undefined,
				configs)

			forEach(configs, function (config) { config() })
		}

		function getCellCacheKey(element) {
			var index = nodeCache.indexOf(element)
			return index < 0 ? nodeCache.push(element) - 1 : index
		}

		m.trust = function (value) {
			value = new String(value) // eslint-disable-line no-new-wrappers
			value.$trusted = true
			return value
		}

		function gettersetter(store) {
			function prop() {
				if (arguments.length) store = arguments[0]
				return store
			}

			prop.toJSON = function () {
				return store
			}

			return prop
		}

		m.prop = function (store) {
			if ((store != null && isObject(store) || isFunction(store)) &&
					isFunction(store.then)) {
				return propify(store)
			}

			return gettersetter(store)
		}

		var roots = []
		var components = []
		var controllers = []
		var lastRedrawId = null
		var lastRedrawCallTime = 0
		var computePreRedrawHook = null
		var computePostRedrawHook = null
		var topComponent
		var FRAME_BUDGET = 16 // 60 frames per second = 1 call per 16 ms

		function parameterize(component, args) {
			function controller() {
				/* eslint-disable no-invalid-this */
				return (component.controller || noop).apply(this, args) || this
				/* eslint-enable no-invalid-this */
			}

			if (component.controller) {
				controller.prototype = component.controller.prototype
			}

			function view(ctrl) {
				var currentArgs = [ctrl].concat(args)
				for (var i = 1; i < arguments.length; i++) {
					currentArgs.push(arguments[i])
				}

				return component.view.apply(component, currentArgs)
			}

			view.$original = component.view
			var output = {controller: controller, view: view}
			if (args[0] && args[0].key != null) output.attrs = {key: args[0].key}
			return output
		}

		m.component = function (component) {
			var args = new Array(arguments.length - 1)

			for (var i = 1; i < arguments.length; i++) {
				args[i - 1] = arguments[i]
			}

			return parameterize(component, args)
		}

		function checkPrevented(component, root, index, isPrevented) {
			if (!isPrevented) {
				m.redraw.strategy("all")
				m.startComputation()
				roots[index] = root
				var currentComponent

				if (component) {
					currentComponent = topComponent = component
				} else {
					currentComponent = topComponent = component = {controller: noop}
				}

				var controller = new (component.controller || noop)()

				// controllers may call m.mount recursively (via m.route redirects,
				// for example)
				// this conditional ensures only the last recursive m.mount call is
				// applied
				if (currentComponent === topComponent) {
					controllers[index] = controller
					components[index] = component
				}
				endFirstComputation()
				if (component === null) {
					removeRootElement(root, index)
				}
				return controllers[index]
			} else if (component == null) {
				removeRootElement(root, index)
			}
		}

		m.mount = m.module = function (root, component) {
			if (!root) {
				throw new Error("Please ensure the DOM element exists before " +
					"rendering a template into it.")
			}

			var index = roots.indexOf(root)
			if (index < 0) index = roots.length

			var isPrevented = false
			var event = {
				preventDefault: function () {
					isPrevented = true
					computePreRedrawHook = computePostRedrawHook = null
				}
			}

			forEach(unloaders, function (unloader) {
				unloader.handler.call(unloader.controller, event)
				unloader.controller.onunload = null
			})

			if (isPrevented) {
				forEach(unloaders, function (unloader) {
					unloader.controller.onunload = unloader.handler
				})
			} else {
				unloaders = []
			}

			if (controllers[index] && isFunction(controllers[index].onunload)) {
				controllers[index].onunload(event)
			}

			return checkPrevented(component, root, index, isPrevented)
		}

		function removeRootElement(root, index) {
			roots.splice(index, 1)
			controllers.splice(index, 1)
			components.splice(index, 1)
			reset(root)
			nodeCache.splice(getCellCacheKey(root), 1)
		}

		var redrawing = false
		m.redraw = function (force) {
			if (redrawing) return
			redrawing = true
			if (force) forcing = true

			try {
				// lastRedrawId is a positive number if a second redraw is requested
				// before the next animation frame
				// lastRedrawId is null if it's the first redraw and not an event
				// handler
				if (lastRedrawId && !force) {
					// when setTimeout: only reschedule redraw if time between now
					// and previous redraw is bigger than a frame, otherwise keep
					// currently scheduled timeout
					// when rAF: always reschedule redraw
					if ($requestAnimationFrame === global.requestAnimationFrame ||
							new Date() - lastRedrawCallTime > FRAME_BUDGET) {
						if (lastRedrawId > 0) $cancelAnimationFrame(lastRedrawId)
						lastRedrawId = $requestAnimationFrame(redraw, FRAME_BUDGET)
					}
				} else {
					redraw()
					lastRedrawId = $requestAnimationFrame(function () {
						lastRedrawId = null
					}, FRAME_BUDGET)
				}
			} finally {
				redrawing = forcing = false
			}
		}

		m.redraw.strategy = m.prop()
		function redraw() {
			if (computePreRedrawHook) {
				computePreRedrawHook()
				computePreRedrawHook = null
			}
			forEach(roots, function (root, i) {
				var component = components[i]
				if (controllers[i]) {
					var args = [controllers[i]]
					m.render(root,
						component.view ? component.view(controllers[i], args) : "")
				}
			})
			// after rendering within a routed context, we need to scroll back to
			// the top, and fetch the document title for history.pushState
			if (computePostRedrawHook) {
				computePostRedrawHook()
				computePostRedrawHook = null
			}
			lastRedrawId = null
			lastRedrawCallTime = new Date()
			m.redraw.strategy("diff")
		}

		function endFirstComputation() {
			if (m.redraw.strategy() === "none") {
				pendingRequests--
				m.redraw.strategy("diff")
			} else {
				m.endComputation()
			}
		}

		m.withAttr = function (prop, withAttrCallback, callbackThis) {
			return function (e) {
				e = e || window.event
				/* eslint-disable no-invalid-this */
				var currentTarget = e.currentTarget || this
				var _this = callbackThis || this
				/* eslint-enable no-invalid-this */
				var target = prop in currentTarget ?
					currentTarget[prop] :
					currentTarget.getAttribute(prop)
				withAttrCallback.call(_this, target)
			}
		}

		// routing
		var modes = {pathname: "", hash: "#", search: "?"}
		var redirect = noop
		var isDefaultRoute = false
		var routeParams, currentRoute

		m.route = function (root, arg1, arg2, vdom) { // eslint-disable-line
			// m.route()
			if (arguments.length === 0) return currentRoute
			// m.route(el, defaultRoute, routes)
			if (arguments.length === 3 && isString(arg1)) {
				redirect = function (source) {
					var path = currentRoute = normalizeRoute(source)
					if (!routeByValue(root, arg2, path)) {
						if (isDefaultRoute) {
							throw new Error("Ensure the default route matches " +
								"one of the routes defined in m.route")
						}

						isDefaultRoute = true
						m.route(arg1, true)
						isDefaultRoute = false
					}
				}

				var listener = m.route.mode === "hash" ?
					"onhashchange" :
					"onpopstate"

				global[listener] = function () {
					var path = $location[m.route.mode]
					if (m.route.mode === "pathname") path += $location.search
					if (currentRoute !== normalizeRoute(path)) redirect(path)
				}

				computePreRedrawHook = setScroll
				global[listener]()

				return
			}

			// config: m.route
			if (root.addEventListener || root.attachEvent) {
				var base = m.route.mode !== "pathname" ? $location.pathname : ""
				root.href = base + modes[m.route.mode] + vdom.attrs.href
				if (root.addEventListener) {
					root.removeEventListener("click", routeUnobtrusive)
					root.addEventListener("click", routeUnobtrusive)
				} else {
					root.detachEvent("onclick", routeUnobtrusive)
					root.attachEvent("onclick", routeUnobtrusive)
				}

				return
			}
			// m.route(route, params, shouldReplaceHistoryEntry)
			if (isString(root)) {
				var oldRoute = currentRoute
				currentRoute = root

				var args = arg1 || {}
				var queryIndex = currentRoute.indexOf("?")
				var params

				if (queryIndex > -1) {
					params = parseQueryString(currentRoute.slice(queryIndex + 1))
				} else {
					params = {}
				}

				for (var i in args) {
					if (hasOwn.call(args, i)) {
						params[i] = args[i]
					}
				}

				var querystring = buildQueryString(params)
				var currentPath

				if (queryIndex > -1) {
					currentPath = currentRoute.slice(0, queryIndex)
				} else {
					currentPath = currentRoute
				}

				if (querystring) {
					currentRoute = currentPath +
						(currentPath.indexOf("?") === -1 ? "?" : "&") +
						querystring
				}

				var replaceHistory =
					(arguments.length === 3 ? arg2 : arg1) === true ||
					oldRoute === root

				if (global.history.pushState) {
					var method = replaceHistory ? "replaceState" : "pushState"
					computePreRedrawHook = setScroll
					computePostRedrawHook = function () {
						global.history[method](null, $document.title,
							modes[m.route.mode] + currentRoute)
					}
					redirect(modes[m.route.mode] + currentRoute)
				} else {
					$location[m.route.mode] = currentRoute
					redirect(modes[m.route.mode] + currentRoute)
				}
			}
		}

		m.route.param = function (key) {
			if (!routeParams) {
				throw new Error("You must call m.route(element, defaultRoute, " +
					"routes) before calling m.route.param()")
			}

			if (!key) {
				return routeParams
			}

			return routeParams[key]
		}

		m.route.mode = "search"

		function normalizeRoute(route) {
			return route.slice(modes[m.route.mode].length)
		}

		function routeByValue(root, router, path) {
			routeParams = {}

			var queryStart = path.indexOf("?")
			if (queryStart !== -1) {
				routeParams = parseQueryString(
					path.substr(queryStart + 1, path.length))
				path = path.substr(0, queryStart)
			}

			// Get all routes and check if there's
			// an exact match for the current path
			var keys = Object.keys(router)
			var index = keys.indexOf(path)

			if (index !== -1){
				m.mount(root, router[keys [index]])
				return true
			}

			for (var route in router) {
				if (hasOwn.call(router, route)) {
					if (route === path) {
						m.mount(root, router[route])
						return true
					}

					var matcher = new RegExp("^" + route
						.replace(/:[^\/]+?\.{3}/g, "(.*?)")
						.replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")

					if (matcher.test(path)) {
						/* eslint-disable no-loop-func */
						path.replace(matcher, function () {
							var keys = route.match(/:[^\/]+/g) || []
							var values = [].slice.call(arguments, 1, -2)
							forEach(keys, function (key, i) {
								routeParams[key.replace(/:|\./g, "")] =
									decodeURIComponent(values[i])
							})
							m.mount(root, router[route])
						})
						/* eslint-enable no-loop-func */
						return true
					}
				}
			}
		}

		function routeUnobtrusive(e) {
			e = e || event
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return

			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = false
			}

			var currentTarget = e.currentTarget || e.srcElement
			var args

			if (m.route.mode === "pathname" && currentTarget.search) {
				args = parseQueryString(currentTarget.search.slice(1))
			} else {
				args = {}
			}

			while (currentTarget && !/a/i.test(currentTarget.nodeName)) {
				currentTarget = currentTarget.parentNode
			}

			// clear pendingRequests because we want an immediate route change
			pendingRequests = 0
			m.route(currentTarget[m.route.mode]
				.slice(modes[m.route.mode].length), args)
		}

		function setScroll() {
			if (m.route.mode !== "hash" && $location.hash) {
				$location.hash = $location.hash
			} else {
				global.scrollTo(0, 0)
			}
		}

		function buildQueryString(object, prefix) {
			var duplicates = {}
			var str = []

			for (var prop in object) {
				if (hasOwn.call(object, prop)) {
					var key = prefix ? prefix + "[" + prop + "]" : prop
					var value = object[prop]

					if (value === null) {
						str.push(encodeURIComponent(key))
					} else if (isObject(value)) {
						str.push(buildQueryString(value, key))
					} else if (isArray(value)) {
						var keys = []
						duplicates[key] = duplicates[key] || {}
						/* eslint-disable no-loop-func */
						forEach(value, function (item) {
							/* eslint-enable no-loop-func */
							if (!duplicates[key][item]) {
								duplicates[key][item] = true
								keys.push(encodeURIComponent(key) + "=" +
									encodeURIComponent(item))
							}
						})
						str.push(keys.join("&"))
					} else if (value !== undefined) {
						str.push(encodeURIComponent(key) + "=" +
							encodeURIComponent(value))
					}
				}
			}

			return str.join("&")
		}

		function parseQueryString(str) {
			if (str === "" || str == null) return {}
			if (str.charAt(0) === "?") str = str.slice(1)

			var pairs = str.split("&")
			var params = {}

			forEach(pairs, function (string) {
				var pair = string.split("=")
				var key = decodeURIComponent(pair[0])
				var value = pair.length === 2 ? decodeURIComponent(pair[1]) : null
				if (params[key] != null) {
					if (!isArray(params[key])) params[key] = [params[key]]
					params[key].push(value)
				}
				else params[key] = value
			})

			return params
		}

		m.route.buildQueryString = buildQueryString
		m.route.parseQueryString = parseQueryString

		function reset(root) {
			var cacheKey = getCellCacheKey(root)
			clear(root.childNodes, cellCache[cacheKey])
			cellCache[cacheKey] = undefined
		}

		m.deferred = function () {
			var deferred = new Deferred()
			deferred.promise = propify(deferred.promise)
			return deferred
		}

		function propify(promise, initialValue) {
			var prop = m.prop(initialValue)
			promise.then(prop)
			prop.then = function (resolve, reject) {
				return propify(promise.then(resolve, reject), initialValue)
			}

			prop.catch = prop.then.bind(null, null)
			return prop
		}
		// Promiz.mithril.js | Zolmeister | MIT
		// a modified version of Promiz.js, which does not conform to Promises/A+
		// for two reasons:
		//
		// 1) `then` callbacks are called synchronously (because setTimeout is too
		//    slow, and the setImmediate polyfill is too big
		//
		// 2) throwing subclasses of Error cause the error to be bubbled up instead
		//    of triggering rejection (because the spec does not account for the
		//    important use case of default browser error handling, i.e. message w/
		//    line number)

		var RESOLVING = 1
		var REJECTING = 2
		var RESOLVED = 3
		var REJECTED = 4

		function Deferred(onSuccess, onFailure) {
			var self = this
			var state = 0
			var promiseValue = 0
			var next = []

			self.promise = {}

			self.resolve = function (value) {
				if (!state) {
					promiseValue = value
					state = RESOLVING

					fire()
				}

				return self
			}

			self.reject = function (value) {
				if (!state) {
					promiseValue = value
					state = REJECTING

					fire()
				}

				return self
			}

			self.promise.then = function (onSuccess, onFailure) {
				var deferred = new Deferred(onSuccess, onFailure)

				if (state === RESOLVED) {
					deferred.resolve(promiseValue)
				} else if (state === REJECTED) {
					deferred.reject(promiseValue)
				} else {
					next.push(deferred)
				}

				return deferred.promise
			}

			function finish(type) {
				state = type || REJECTED
				next.map(function (deferred) {
					if (state === RESOLVED) {
						deferred.resolve(promiseValue)
					} else {
						deferred.reject(promiseValue)
					}
				})
			}

			function thennable(then, success, failure, notThennable) {
				if (((promiseValue != null && isObject(promiseValue)) ||
						isFunction(promiseValue)) && isFunction(then)) {
					try {
						// count protects against abuse calls from spec checker
						var count = 0
						then.call(promiseValue, function (value) {
							if (count++) return
							promiseValue = value
							success()
						}, function (value) {
							if (count++) return
							promiseValue = value
							failure()
						})
					} catch (e) {
						m.deferred.onerror(e)
						promiseValue = e
						failure()
					}
				} else {
					notThennable()
				}
			}

			function fire() {
				// check if it's a thenable
				var then
				try {
					then = promiseValue && promiseValue.then
				} catch (e) {
					m.deferred.onerror(e)
					promiseValue = e
					state = REJECTING
					return fire()
				}

				if (state === REJECTING) {
					m.deferred.onerror(promiseValue)
				}

				thennable(then, function () {
					state = RESOLVING
					fire()
				}, function () {
					state = REJECTING
					fire()
				}, function () {
					try {
						if (state === RESOLVING && isFunction(onSuccess)) {
							promiseValue = onSuccess(promiseValue)
						} else if (state === REJECTING && isFunction(onFailure)) {
							promiseValue = onFailure(promiseValue)
							state = RESOLVING
						}
					} catch (e) {
						m.deferred.onerror(e)
						promiseValue = e
						return finish()
					}

					if (promiseValue === self) {
						promiseValue = TypeError()
						finish()
					} else {
						thennable(then, function () {
							finish(RESOLVED)
						}, finish, function () {
							finish(state === RESOLVING && RESOLVED)
						})
					}
				})
			}
		}

		m.deferred.onerror = function (e) {
			if (type.call(e) === "[object Error]" &&
					!/ Error/.test(e.constructor.toString())) {
				pendingRequests = 0
				throw e
			}
		}

		m.sync = function (args) {
			var deferred = m.deferred()
			var outstanding = args.length
			var results = []
			var method = "resolve"

			function synchronizer(pos, resolved) {
				return function (value) {
					results[pos] = value
					if (!resolved) method = "reject"
					if (--outstanding === 0) {
						deferred.promise(results)
						deferred[method](results)
					}
					return value
				}
			}

			if (args.length > 0) {
				forEach(args, function (arg, i) {
					arg.then(synchronizer(i, true), synchronizer(i, false))
				})
			} else {
				deferred.resolve([])
			}

			return deferred.promise
		}

		function identity(value) { return value }

		function handleJsonp(options) {
			var callbackKey = "mithril_callback_" +
				new Date().getTime() + "_" +
				(Math.round(Math.random() * 1e16)).toString(36)

			var script = $document.createElement("script")

			global[callbackKey] = function (resp) {
				script.parentNode.removeChild(script)
				options.onload({
					type: "load",
					target: {
						responseText: resp
					}
				})
				global[callbackKey] = undefined
			}

			script.onerror = function () {
				script.parentNode.removeChild(script)

				options.onerror({
					type: "error",
					target: {
						status: 500,
						responseText: JSON.stringify({
							error: "Error making jsonp request"
						})
					}
				})
				global[callbackKey] = undefined

				return false
			}

			script.onload = function () {
				return false
			}

			script.src = options.url +
				(options.url.indexOf("?") > 0 ? "&" : "?") +
				(options.callbackKey ? options.callbackKey : "callback") +
				"=" + callbackKey +
				"&" + buildQueryString(options.data || {})

			$document.body.appendChild(script)
		}

		function createXhr(options) {
			var xhr = new global.XMLHttpRequest()
			xhr.open(options.method, options.url, true, options.user,
				options.password)

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300) {
						options.onload({type: "load", target: xhr})
					} else {
						options.onerror({type: "error", target: xhr})
					}
				}
			}

			if (options.serialize === JSON.stringify &&
					options.data &&
					options.method !== "GET") {
				xhr.setRequestHeader("Content-Type",
					"application/json; charset=utf-8")
			}

			if (options.deserialize === JSON.parse) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}

			if (isFunction(options.config)) {
				var maybeXhr = options.config(xhr, options)
				if (maybeXhr != null) xhr = maybeXhr
			}

			var data = options.method === "GET" || !options.data ? "" : options.data

			if (data && !isString(data) && data.constructor !== global.FormData) {
				throw new Error("Request data should be either be a string or " +
					"FormData. Check the `serialize` option in `m.request`")
			}

			xhr.send(data)
			return xhr
		}

		function ajax(options) {
			if (options.dataType && options.dataType.toLowerCase() === "jsonp") {
				return handleJsonp(options)
			} else {
				return createXhr(options)
			}
		}

		function bindData(options, data, serialize) {
			if (options.method === "GET" && options.dataType !== "jsonp") {
				var prefix = options.url.indexOf("?") < 0 ? "?" : "&"
				var querystring = buildQueryString(data)
				options.url += (querystring ? prefix + querystring : "")
			} else {
				options.data = serialize(data)
			}
		}

		function parameterizeUrl(url, data) {
			if (data) {
				url = url.replace(/:[a-z]\w+/gi, function (token){
					var key = token.slice(1)
					var value = data[key]
					delete data[key]
					return value
				})
			}
			return url
		}

		m.request = function (options) {
			if (options.background !== true) m.startComputation()
			var deferred = new Deferred()
			var isJSONP = options.dataType &&
				options.dataType.toLowerCase() === "jsonp"

			var serialize, deserialize, extract

			if (isJSONP) {
				serialize = options.serialize =
				deserialize = options.deserialize = identity

				extract = function (jsonp) { return jsonp.responseText }
			} else {
				serialize = options.serialize = options.serialize || JSON.stringify

				deserialize = options.deserialize =
					options.deserialize || JSON.parse
				extract = options.extract || function (xhr) {
					if (xhr.responseText.length || deserialize !== JSON.parse) {
						return xhr.responseText
					} else {
						return null
					}
				}
			}

			options.method = (options.method || "GET").toUpperCase()
			options.url = parameterizeUrl(options.url, options.data)
			bindData(options, options.data, serialize)
			options.onload = options.onerror = function (ev) {
				try {
					ev = ev || event
					var response = deserialize(extract(ev.target, options))
					if (ev.type === "load") {
						if (options.unwrapSuccess) {
							response = options.unwrapSuccess(response, ev.target)
						}

						if (isArray(response) && options.type) {
							forEach(response, function (res, i) {
								response[i] = new options.type(res)
							})
						} else if (options.type) {
							response = new options.type(response)
						}

						deferred.resolve(response)
					} else {
						if (options.unwrapError) {
							response = options.unwrapError(response, ev.target)
						}

						deferred.reject(response)
					}
				} catch (e) {
					deferred.reject(e)
					m.deferred.onerror(e)
				} finally {
					if (options.background !== true) m.endComputation()
				}
			}

			ajax(options)
			deferred.promise = propify(deferred.promise, options.initialValue)
			return deferred.promise
		}

		return m
	}); // eslint-disable-line

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// Generated by CoffeeScript 1.9.3

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
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof window !== "undefined" && window !== null) {
	    window.mss = mss;
	  }

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(1);
	module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>');


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(1);
	module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>');


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(1);
	module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg>');


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(1);
	module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>');


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var Button, m, s, style, u,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  m = __webpack_require__(1);

	  s = __webpack_require__(3);

	  style = __webpack_require__(9);

	  u = __webpack_require__(10);

	  Button = (function() {
	    function Button(arg) {
	      var data, ref, ref1;
	      this.text = arg.text, this.prefix = arg.prefix, this.suffix = arg.suffix, data = (ref = arg.data) != null ? ref : null, this.onClick = (ref1 = arg.onClick) != null ? ref1 : (function() {});
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


/***/ },
/* 9 */
/***/ function(module, exports) {

	// Generated by CoffeeScript 1.10.0
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var cancelBubble, clearDateHMS, formatDate, formatDateWithHMS, formatXX, getCurrentTargetData, getTarget, getTargetData, m, parseDateWithHMS, removeFromArray, scrollToView, spinner, targetHasClass;

	  m = __webpack_require__(1);

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

	  scrollToView = function(elem, afterInit) {
	    var offsetTop;
	    if (!afterInit) {
	      if (targetHasClass(elem, 'Current')) {
	        offsetTop = elem.offsetTop;
	        return elem.parentNode.scrollTop = offsetTop;
	      }
	    }
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

	  formatDateWithHMS = function(date) {
	    var hh, mm, ss;
	    hh = date.getHours();
	    mm = date.getMinutes();
	    ss = date.getSeconds();
	    return (formatDate(date)) + ' ' + (formatXX(hh)) + ':' + (formatXX(mm)) + ':' + (formatXX(ss));
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

	  removeFromArray = function(arr, x) {
	    var i;
	    i = arr.indexOf(x);
	    if (i !== -1) {
	      arr.splice(i, 1);
	    }
	    return void 0;
	  };

	  spinner = function(color, size, interval) {
	    if (size == null) {
	      size = '2em';
	    }
	    if (interval == null) {
	      interval = '1s';
	    }
	    return m.trust("<svg version=\"1.1\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n    x=\"0px\"\n    y=\"0px\"\n    width=\"" + size + "\"\n    viewBox=\"0 0 80 80\"\n    xml:space=\"preserve\">\n    <path\n        fill=\"" + color + "\"\n        d=\"M40,72C22.4,72,8,57.6,8,40C8,22.4,\n        22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2\n        s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6,\n        28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z\"\n        <!-- ANIMATION START -->\n        <animateTransform\n            attributeType=\"xml\"\n            attributeName=\"transform\"\n            type=\"rotate\"\n            from=\"0 40 40\"\n            to=\"360 40 40\"\n            dur=\"" + interval + "\"\n            repeatCount=\"indefinite\"\n        />\n    </path>\n</svg>");
	  };

	  module.exports = {
	    getTarget: getTarget,
	    getTargetData: getTargetData,
	    getCurrentTargetData: getCurrentTargetData,
	    targetHasClass: targetHasClass,
	    cancelBubble: cancelBubble,
	    scrollToView: scrollToView,
	    clearDateHMS: clearDateHMS,
	    formatXX: formatXX,
	    formatDate: formatDate,
	    formatDateWithHMS: formatDateWithHMS,
	    parseDateWithHMS: parseDateWithHMS,
	    removeFromArray: removeFromArray,
	    spinner: spinner
	  };

	}).call(this);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var AutoHide, DatePicker, dateIcon, hourArray, i18n, m, minuteArray, s, secondArray, style, u, x,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  m = __webpack_require__(1);

	  s = __webpack_require__(3);

	  u = __webpack_require__(10);

	  AutoHide = __webpack_require__(12);

	  style = __webpack_require__(9);

	  i18n = __webpack_require__(13);

	  dateIcon = __webpack_require__(14);

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
	      }), this.onSelect = (ref1 = arg.onSelect) != null ? ref1 : (function() {});
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
	                      className: [this.ifDateAvailable(dObj) ? 'Available' : '', (this.date != null) && dObj.getDate() === this.date.getDate() && dObj.getMonth() === this.date.getMonth() && dObj.getFullYear() === this.date.getFullYear() ? 'Current' : ''].join(' '),
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
	                      config: u.scrollToView,
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
	                      config: u.scrollToView,
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
	                      config: u.scrollToView,
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
	      d = new Date(this.displayDate);
	      d.setMonth(this.displayDate.getMonth() + 1);
	      d.setDate(0);
	      return this.totalDay = d.getDate();
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
	        return this.date.setSeconds(second);
	      }
	    };

	    DatePicker.prototype.view = function() {
	      return m('.DatePicker', m('input.DateInput', {
	        readonly: true,
	        onclick: this.autoHideDatePicker.show,
	        value: this.selectTime ? u.formatDateWithHMS(this.date) : u.formatDate(this.date)
	      }), m('span.DateIcon', dateIcon), this.autoHideDatePicker.view());
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
	        textAlign: 'center',
	        border: '1px solid ' + style.border[4]
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
	        top: '2em',
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var AutoHide, m,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  m = __webpack_require__(1);

	  AutoHide = (function() {
	    function AutoHide(arg) {
	      var ref;
	      this.widget = arg.widget, this.onHide = (ref = arg.onHide) != null ? ref : (function() {});
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
	        config: function(elem, afterInit, context) {
	          if (!afterInit) {
	            window.addEventListener('click', self.onHideInternal(elem), true);
	            return context.onunload = function() {
	              return window.removeEventListener('click', self.onHideInternal(elem), true);
	            };
	          }
	        }
	      }, this.showWidget ? this.widget.view() : void 0);
	    };

	    return AutoHide;

	  })();

	  module.exports = AutoHide;

	}).call(this);


/***/ },
/* 13 */
/***/ function(module, exports) {

	// Generated by CoffeeScript 1.10.0
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


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(1);
	module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>');


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var Switch, m, s, style, u,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  m = __webpack_require__(1);

	  s = __webpack_require__(3);

	  style = __webpack_require__(9);

	  u = __webpack_require__(10);

	  Switch = (function() {
	    function Switch(arg) {
	      var ref, ref1;
	      this.enable = (ref = arg.enable) != null ? ref : true, this.onToggle = (ref1 = arg.onToggle) != null ? ref1 : (function() {});
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


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var AutoHide, Dropdown, m, s, style, u,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  m = __webpack_require__(1);

	  s = __webpack_require__(3);

	  style = __webpack_require__(9);

	  u = __webpack_require__(10);

	  AutoHide = __webpack_require__(12);

	  Dropdown = (function() {
	    function Dropdown(arg) {
	      var ref, ref1, ref2;
	      this.itemArray = arg.itemArray, this.currentIndex = arg.currentIndex, this.placeholder = (ref = arg.placeholder) != null ? ref : '', this.onSelect = (ref1 = arg.onSelect) != null ? ref1 : (function() {}), this.ifAvailable = (ref2 = arg.ifAvailable) != null ? ref2 : (function() {
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
	                      config: u.scrollToView,
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
	        textAlign: 'center',
	        border: '1px solid ' + style.border[4]
	      },
	      DropdownList: {
	        position: 'absolute',
	        top: '2em',
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


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var Modal, m, s, style, u,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  m = __webpack_require__(1);

	  s = __webpack_require__(3);

	  u = __webpack_require__(10);

	  style = __webpack_require__(9);

	  Modal = (function() {
	    function Modal(arg) {
	      var ref, ref1;
	      this.widget = arg.widget, this.clickToHide = (ref = arg.clickToHide) != null ? ref : true, this.onHide = (ref1 = arg.onHide) != null ? ref1 : (function() {});
	      this.hide = bind(this.hide, this);
	      this.show = bind(this.show, this);
	      this.onClickInternal = bind(this.onClickInternal, this);
	      this.showWidget = false;
	    }

	    Modal.prototype.onClickInternal = function(e) {
	      if (this.clickToHide && (u.targetHasClass(u.getTarget(e), 'Modal'))) {
	        this.showWidget = false;
	        return this.onHide();
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
	      if (this.showWidget) {
	        return m('.Modal', {
	          onclick: this.onClickInternal
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


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var TextInput, m, s, style, u,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  m = __webpack_require__(1);

	  s = __webpack_require__(3);

	  style = __webpack_require__(9);

	  u = __webpack_require__(10);

	  TextInput = (function() {
	    function TextInput(arg) {
	      var ref, ref1, ref2, ref3;
	      this.content = (ref = arg.content) != null ? ref : '', this.disabled = (ref1 = arg.disabled) != null ? ref1 : false, this.placeholder = (ref2 = arg.placeholder) != null ? ref2 : '', this.onChange = (ref3 = arg.onChange) != null ? ref3 : (function() {});
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
	      var c;
	      c = (u.getTarget(e)).value;
	      e = this.onChange(c);
	      this.validationMsg = '';
	      if (e instanceof Error) {
	        this.validationMsg = e.message;
	      }
	      return this.content = c;
	    };

	    TextInput.prototype.view = function() {
	      return m('.TextInput', m('input.Input', {
	        disabled: this.disabled,
	        onchange: this.onChangeInternal,
	        value: this.content,
	        placeholder: this.placeholder
	      }), this.validationMsg !== '' ? m('.ValidationMsg', this.validationMsg) : void 0);
	    };

	    return TextInput;

	  })();

	  TextInput.mss = {
	    TextInput: s.LineSize('2em', '1em')({
	      width: '200px',
	      position: 'relative',
	      Input: {
	        display: 'block',
	        border: '1px solid ' + style.border[4],
	        width: '100%',
	        height: '100%',
	        fontSize: '1em',
	        padding: '0 0.4em'
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


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var Collaspe, arrowDown, arrowRight, m, s, style, u,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	  m = __webpack_require__(1);

	  s = __webpack_require__(3);

	  u = __webpack_require__(10);

	  style = __webpack_require__(9);

	  arrowRight = __webpack_require__(20);

	  arrowDown = __webpack_require__(21);

	  Collaspe = (function() {
	    function Collaspe(arg) {
	      var ref, ref1, ref2, ref3;
	      this.titleArray = arg.titleArray, this.widgetArray = arg.widgetArray, this.autoCollaspe = (ref = arg.autoCollaspe) != null ? ref : false, this.expandedIndexArray = (ref1 = arg.expandedIndexArray) != null ? ref1 : [], this.onExpand = (ref2 = arg.onExpand) != null ? ref2 : (function() {}), this.onCollaspe = (ref3 = arg.onCollaspe) != null ? ref3 : (function() {});
	      this.onFoldInternal = bind(this.onFoldInternal, this);
	      this.showWidget = false;
	    }

	    Collaspe.prototype.onFoldInternal = function(e) {
	      var i;
	      i = parseInt(u.getCurrentTargetData(e, 'index'));
	      if (this.autoCollaspe) {
	        return this.expandedIndexArray = [i];
	      } else if (indexOf.call(this.expandedIndexArray, i) >= 0) {
	        return u.removeFromArray(this.expandedIndexArray, i);
	      } else {
	        return this.expandedIndexArray.push(i);
	      }
	    };

	    Collaspe.prototype.view = function() {
	      var expanded, i, self, title;
	      self = this;
	      return m('.Collaspe', (function() {
	        var j, len, ref, results;
	        ref = this.titleArray;
	        results = [];
	        for (i = j = 0, len = ref.length; j < len; i = ++j) {
	          title = ref[i];
	          expanded = indexOf.call(this.expandedIndexArray, i) >= 0;
	          results.push([
	            m('.CollaspeTitle', {
	              key: 'title' + i,
	              'data-index': i.toString(),
	              onclick: this.onFoldInternal
	            }, expanded ? arrowDown : arrowRight, m('span', title)), m('.CollaspeBody', {
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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(1);
	module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>');


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(1);
	module.exports = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>');


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var Notify, contentArray, dataArray, iconArray, keyCounter, m, s, style, timerArray, u,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  m = __webpack_require__(1);

	  s = __webpack_require__(3);

	  u = __webpack_require__(10);

	  style = __webpack_require__(9);

	  contentArray = [];

	  iconArray = [];

	  dataArray = [];

	  timerArray = [];

	  keyCounter = 0;

	  Notify = (function() {
	    function Notify(arg) {
	      var ref, ref1;
	      this.duration = (ref = arg.duration) != null ? ref : 3000, this.onClick = (ref1 = arg.onClick) != null ? ref1 : (function() {});
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


/***/ }
/******/ ]);