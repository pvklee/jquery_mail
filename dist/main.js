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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/compose.js":
/*!************************!*\
  !*** ./src/compose.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MessageStore = __webpack_require__(/*! ./message_store.js */ \"./src/message_store.js\")\n\nconst Compose = {\n    render(){\n        const messages = MessageStore.getSentMessages();\n\n        const div = document.createElement('div');\n        div.className = 'new-message';\n        div.innerHTML = this.renderForm();\n        div.addEventListener('change', this.changeHandle.bind(this));\n        div.addEventListener('submit', this.submitHandle.bind(this));\n        return div;\n    },\n    changeHandle(event){\n        field = event.target.name;\n        value = event.target.value;\n        MessageStore.updateDraftField(field, value);\n    },\n    submitHandle(event){\n        event.preventDefault();\n        MessageStore.sendDraft();\n        window.location.hash = '#inbox';\n    },\n    renderForm(){\n        let currentDraft = MessageStore.getMessageDraft();\n        currentDraft.to = currentDraft.to || '';\n        currentDraft.subject = currentDraft.subject || '';\n        currentDraft.body = currentDraft.body || '';\n        \n        const HTMLString = `<p class='new-message-header'>New Message</p>\n                            <form class='compose-form'>\n                                <input placeholder = 'Recipient'\n                                    name = 'to'\n                                    type = 'text'\n                                    value = '${currentDraft.to}'>\n                                </input>\n                                <input placeholder = 'Subject'\n                                    name = 'subject'\n                                    type = 'text'\n                                    value = '${currentDraft.subject}'>\n                                </input>\n                                <textarea name = 'body'\n                                    rows = 20>${currentDraft.body}</textarea>\n                                <button type='submit'\n                                    class='btn btn-primary submit-message'>\n                                    Send\n                                </button>\n                            </form>`\n        return HTMLString;\n    }\n}\nmodule.exports = Compose;\n\n//# sourceURL=webpack:///./src/compose.js?");

/***/ }),

/***/ "./src/inbox.js":
/*!**********************!*\
  !*** ./src/inbox.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MessageStore = __webpack_require__(/*! ./message_store.js */ \"./src/message_store.js\")\n\nconst Inbox = {\n    render(){\n        const messages = MessageStore.getInboxMessages();\n\n        const ul = document.createElement('ul');\n        ul.className = 'messages';\n\n        messages.forEach((message) => {\n            const node = this.renderMessage(message);\n            ul.prepend(node);\n        });\n        return ul;\n    },\n    renderMessage(message){\n        const li = document.createElement('li');\n        li.className = 'message';\n        li.innerHTML = `<span class='from'>${message.from}</span>\n                        <span class='subject'>${message.subject}</span>\n                        <span class='body'>${message.body}</span>`;\n        return li;\n    }\n}\nmodule.exports = Inbox;\n\n//# sourceURL=webpack:///./src/inbox.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Router = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\nconst Inbox = __webpack_require__(/*! ./inbox.js */ \"./src/inbox.js\");\nconst Sent = __webpack_require__(/*! ./sent.js */ \"./src/sent.js\");\nconst Compose = __webpack_require__(/*! ./compose.js */ \"./src/compose.js\");\n\nconst routes = {\n    inbox: Inbox,\n    sent: Sent,\n    compose: Compose\n}\n\nwindow.addEventListener('DOMContentLoaded', (e) => {\n    const content = document.querySelector('.content');\n    router = new Router(content, routes);\n    router.start();\n    window.location.hash = \"#inbox\";\n\n    document.querySelectorAll('.sidebar-nav li').forEach(btn => {\n        btn.addEventListener('click', ()=>{\n            const name = btn.innerText.toLowerCase();\n            location.hash = name;\n        })\n    });\n})\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/message_store.js":
/*!******************************!*\
  !*** ./src/message_store.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let messages = {\n    sent: [\n        {to: 'friend@mail.com', subject: 'howdy', body: 'how is it going friend'},\n        {to: 'bob@mail.com', subject: 'whats up', body: 'how is it going man'}\n    ],\n    inbox: [\n        {from: 'a@mail.com', subject: 'what', body: 'how is it'},\n        {from: 'b@mail.com', subject: 'hello', body: 'hi'}\n    ]\n}\n\nclass Message{\n    constructor(from, to, subject, body){\n        this.from = from;\n        this.to = to;\n        this.subject = subject;\n        this.body = body;\n    }\n}\n\nlet messageDraft = new Message;\n\nconst MessageStore = {\n    getInboxMessages(){\n        return messages['inbox'];\n    },\n    getSentMessages: () => (\n        messages['sent']\n    ),\n    getMessageDraft: () => (\n        messageDraft\n    ),\n    updateDraftField: (field, value) => {\n        messageDraft[field] = value;\n    },\n    sendDraft: () =>{\n        messages['sent'].push(messageDraft);\n        messageDraft = new Message;\n    }\n\n}\n\nmodule.exports = MessageStore;\n\n//# sourceURL=webpack:///./src/message_store.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Router {\n    constructor(node, routes){\n        this.node = node;\n        this.routes = routes;\n    }\n\n    start(){\n        this.render();\n        window.addEventListener('hashchange', this.render.bind(this));\n    }\n\n    render(){\n        this.node.innerHTML = \"\";\n        const component = this.activeRoute();\n        if(component){\n            const DOMNode = component.render();\n            this.node.appendChild(DOMNode);\n        }\n    }\n\n    activeRoute(){\n        const hash = window.location.hash.substring(1);\n        return this.routes[hash];\n    }\n}\n\nmodule.exports = Router;\n\n//# sourceURL=webpack:///./src/router.js?");

/***/ }),

/***/ "./src/sent.js":
/*!*********************!*\
  !*** ./src/sent.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MessageStore = __webpack_require__(/*! ./message_store.js */ \"./src/message_store.js\")\n\nconst Sent = {\n    render(){\n        const messages = MessageStore.getSentMessages();\n\n        const ul = document.createElement('ul');\n        ul.className = 'messages';\n\n        messages.forEach((message) => {\n            const node = this.renderMessage(message);\n            ul.prepend(node);\n        });\n        return ul;\n    },\n    renderMessage(message){\n        const li = document.createElement('li');\n        li.className = 'message';\n        li.innerHTML = `<span class='to'>${message.to}</span>\n                        <span class='subject'>${message.subject}</span>\n                        <span class='body'>${message.body}</span>`;\n        return li;\n    }\n}\nmodule.exports = Sent;\n\n//# sourceURL=webpack:///./src/sent.js?");

/***/ })

/******/ });