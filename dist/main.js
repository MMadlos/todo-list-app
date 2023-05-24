/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* VARIABLES */\\n:root {\\n\\t/* NEW COLORS */\\n\\t--blue-accent-color: #1e73be;\\n\\t--text-default: #555555;\\n\\t--text-light: #999999;\\n\\t--red-alert: #ed726f;\\n\\t--white: #fff;\\n\\t--bg-grey-light: #fafafa;\\n\\t--stroke-grey: #f4f4f4;\\n\\t--stroke-grey-dark: #ececec;\\n\\t--hover-project: #e6e6e6;\\n\\t--tick-grey: #b7b7b7;\\n}\\n\\n/* CSS RESET */\\n*,\\n*::before,\\n*::after {\\n\\tbox-sizing: border-box;\\n}\\n\\n* {\\n\\tmargin: 0;\\n\\tpadding: 0;\\n\\tfont: inherit;\\n}\\n\\nhtml {\\n\\tcolor-scheme: dark light;\\n}\\n\\nbody {\\n\\tmax-height: 100vh;\\n\\tbackground-color: var(--white);\\n\\n\\tfont-family: \\\"Inter\\\", sans-serif;\\n\\tcolor: var(--text-default);\\n\\tfont-weight: 500;\\n}\\n\\nimg,\\npicture,\\nsvg,\\nvideo {\\n\\tdisplay: block;\\n\\tmax-width: 100%;\\n}\\n\\nbutton {\\n\\tborder: none;\\n\\tbackground: none;\\n}\\n\\n/* UTILITIES */\\n\\n.hide {\\n\\tdisplay: none !important;\\n}\\n\\n.transparency-80 {\\n\\topacity: 80%;\\n}\\n.checked-task {\\n\\tcolor: #c6ddec;\\n\\ttext-decoration: line-through;\\n}\\n\\n.checked-task.hover {\\n\\tcolor: #3e92cc;\\n}\\n\\n/* NEW UI */\\n\\n#content {\\n\\tdisplay: flex;\\n\\theight: 100vh;\\n}\\n\\n#menu,\\n#task-panel,\\n#main-section {\\n\\tmin-width: max-content;\\n\\twidth: 100%;\\n}\\n\\n#menu {\\n\\tmax-width: 387px;\\n}\\n\\n#task-panel {\\n\\tmax-width: 503px;\\n}\\n\\n/* ICONS AND BUTTONS*/\\ni.size-24 {\\n\\tfont-size: 24px;\\n}\\n\\ni.size-21 {\\n\\tfont-size: 21px;\\n}\\n\\ni.size-16 {\\n\\twidth: 1rem;\\n\\theight: 1rem;\\n}\\n\\ni.size-12 {\\n\\tfont-size: 12px;\\n}\\n\\n.btn-regular-blue {\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tgap: 16px;\\n\\twidth: 100%;\\n\\tcolor: var(--blue-accent-color);\\n\\tborder: 2px solid var(--blue-accent-color);\\n\\tborder-radius: 12px;\\n\\tpadding: 12px;\\n}\\n\\n.btn-regular-blue:hover {\\n\\topacity: 60%;\\n}\\n\\n/* MENÚ */\\n#menu {\\n\\tbackground-color: var(--gr-grey-light);\\n\\tborder-right: 2px solid var(--stroke-grey);\\n\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tjustify-content: space-between;\\n\\tpadding: 40px;\\n}\\n\\n.menu-container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tgap: 40px;\\n}\\n\\n#logo {\\n\\twidth: 30px;\\n\\taspect-ratio: 1;\\n}\\n\\n#app-name {\\n\\tfont-size: 1.125rem;\\n\\tfont-weight: 800;\\n\\tcolor: var(--blue-accent-color);\\n}\\n\\n.project-list-container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tgap: 4px;\\n}\\n\\n.project-item-container {\\n\\tdisplay: flex;\\n\\tjustify-content: space-between;\\n\\talign-content: center;\\n\\tpadding: 8px 12px;\\n\\tborder-radius: 7px;\\n}\\n\\n.project-item-container:hover {\\n\\tbackground-color: var(--hover-project);\\n}\\n\\n.project-item-container.selected {\\n\\tbackground-color: var(--blue-accent-color);\\n\\tcolor: var(--white);\\n\\tfont-weight: 700;\\n}\\n\\n.title-container {\\n\\tdisplay: flex;\\n\\tgap: 16px;\\n\\talign-items: center;\\n}\\n\\n.project-item-title-container {\\n\\tdisplay: flex;\\n\\tgap: 16px;\\n\\talign-self: center;\\n}\\n\\n.project-item-counter-container > p {\\n\\tpadding: 4px 8px;\\n\\tbackground: var(--stroke-grey);\\n\\tborder-radius: 9px;\\n\\tcolor: var(--text-default);\\n\\tfont-size: 0.875rem;\\n\\tfont-weight: 500;\\n}\\n\\n.project-list-separator {\\n\\tfont-size: 0.875rem;\\n\\tfont-weight: 700;\\n\\tcolor: var(--text-light);\\n}\\n\\n/* BUTTONS */\\n\\n.btn-solid-blue {\\n\\tdisplay: flex;\\n\\talign-content: center;\\n\\tgap: 16px;\\n\\n\\tbackground-color: var(--blue-accent-color);\\n\\tcolor: var(--white);\\n\\tpadding: 12px;\\n\\tborder-radius: 7px;\\n\\tfont-weight: 700;\\n}\\n\\n#btn-save,\\n#btn-delete {\\n\\tpadding: 12px 32px;\\n}\\n\\n#btn-delete {\\n\\tcolor: var(--red-alert);\\n\\tfont-weight: 600;\\n\\ttext-decoration: underline;\\n}\\n\\n/* TASK PANEL */\\n#task-panel {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tgap: 16px;\\n\\n\\tpadding: 40px 12px;\\n\\tbackground-color: var(--bg-grey-light);\\n\\tborder-left: 2px solid var(--stroke-grey);\\n}\\n\\n#btn-close-panel {\\n\\tmargin-left: auto;\\n}\\n\\n#task-info-container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tgap: 24px;\\n}\\n\\n.task-panel-container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tjustify-content: space-between;\\n\\theight: 100%;\\n}\\n\\n/* Task title and steps */\\n.task-steps-container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tgap: 8px;\\n\\n\\tpadding: 8px 16px;\\n\\tbackground-color: var(--white);\\n\\tborder: 1px solid var(--stroke-grey-dark);\\n\\tborder-radius: 6px;\\n}\\n\\n.task-panel-title-container {\\n\\tdisplay: flex;\\n\\tgap: 16px;\\n\\tpadding: 8px 0;\\n\\n\\tfont-size: 1.3rem;\\n\\tfont-weight: 600;\\n}\\n\\n.sub-task-container {\\n\\tdisplay: flex;\\n\\tgap: 8px;\\n\\tpadding: 8px;\\n\\n\\tcolor: var(--text-light);\\n\\tfont-size: 0.875rem;\\n}\\n\\n.btn-add-step {\\n\\tdisplay: flex;\\n\\tgap: 16px;\\n\\n\\tpadding: 8px;\\n\\tcolor: var(--blue-accent-color);\\n}\\n\\n/* Task details */\\n\\n#task-details-container,\\n#task-attach-container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tgap: 8px;\\n\\tpadding: 8px;\\n\\n\\tbackground-color: var(--white);\\n\\tborder: 1px solid var(--stroke-grey-dark);\\n\\tborder-radius: 6px;\\n}\\n\\n.task-details-item-container {\\n\\tdisplay: flex;\\n\\tpadding: 8px;\\n\\tjustify-content: space-between;\\n}\\n\\n.task-details-info-container {\\n\\tdisplay: flex;\\n\\tgap: 16px;\\n}\\n\\n.separator {\\n\\theight: 1px;\\n\\tbackground-color: var(--stroke-grey-dark);\\n}\\n\\ntextarea#add-note-field {\\n\\tresize: none;\\n\\tbackground-color: var(--white);\\n\\tborder: 1px solid var(--stroke-grey-dark);\\n\\tborder-radius: 4px;\\n\\tpadding: 16px;\\n\\tcolor: var(--text-default);\\n\\n\\theight: max(146px);\\n}\\n\\ntextarea::placeholder {\\n\\tcolor: #999999;\\n}\\n\\ntextarea:focus {\\n\\toutline: 1px solid var(--text-light);\\n}\\n\\n.buttons-container {\\n\\tdisplay: flex;\\n\\tjustify-content: space-between;\\n}\\n\\n/* MAIN SECTION - Task list */\\n#main-section {\\n\\tdisplay: flex;\\n\\tgap: 40px;\\n\\tflex-direction: column;\\n\\tjustify-content: space-between;\\n\\tpadding: 40px min(40px);\\n\\tmax-height: 100vh;\\n}\\n\\n.main-section-container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tgap: 40px;\\n\\theight: 100%;\\n}\\n\\n.header-container {\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tgap: 8px;\\n}\\n\\n.title-container {\\n\\tpadding: 8px;\\n\\tfont-size: 24px;\\n\\tfont-weight: 800;\\n\\tborder-radius: 8px;\\n}\\n\\n.title-container:hover {\\n\\tbackground-color: var(--bg-grey-light);\\n\\tborder: 2px solid var(--stroke-grey);\\n}\\n\\n.task-list-container,\\n.task-group-container,\\n.task-card-list-container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n}\\n\\n.task-list-container {\\n\\tgap: 24px;\\n}\\n\\n.task-group-container,\\n.task-card-list-container {\\n\\tgap: 16px;\\n}\\n\\n.task-group-name-container {\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tgap: 12px;\\n}\\n\\n.group-counter-container {\\n\\tbackground-color: var(--stroke-grey);\\n\\tpadding: 4px 8px;\\n\\tborder-radius: 9px;\\n\\tfont-size: 0.9rem;\\n}\\n\\n.task-card-container {\\n\\tdisplay: flex;\\n\\tjustify-content: space-between;\\n\\talign-items: center;\\n\\n\\tbackground-color: var(--bg-grey-light);\\n\\tborder: 2px solid var(--stroke-grey);\\n\\tborder-radius: 12px;\\n\\n\\tpadding: 16px 24px;\\n\\tcolor: var(--tick-grey);\\n}\\n\\n.task-info-container {\\n\\tdisplay: flex;\\n\\tgap: 16px;\\n\\tpadding: 12 0;\\n}\\n\\n.task-title-container {\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\tgap: 16px;\\n\\n\\tcolor: var(--text-default);\\n}\\n\\n.task-details-container {\\n\\tdisplay: flex;\\n\\tgap: 8px;\\n}\\n\\n.detailContainer {\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tgap: 6px;\\n\\n\\tcolor: var(--text-light);\\n}\\n\\n.detailContainer > p {\\n\\tfont-size: 12px;\\n}\\n\\n.task-details-separator {\\n\\theight: 100%;\\n\\tborder-right: 1px solid var(--text-light);\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todo-list-app/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://todo-list-app/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://todo-list-app/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://todo-list-app/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://todo-list-app/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://todo-list-app/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://todo-list-app/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://todo-list-app/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://todo-list-app/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://todo-list-app/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _modules_DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .//modules/DOM */ \"./src/modules/DOM.js\");\n\n\n// import { allProjects, newProject, NewTask } from \"./modules/task.js\"\n\n// Default tasks\nfunction defaultUI() {\n\t(0,_modules_DOM__WEBPACK_IMPORTED_MODULE_1__.newUI)()\n}\n\ndefaultUI()\n\n\n//# sourceURL=webpack://todo-list-app/./src/index.js?");

/***/ }),

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"newUI\": () => (/* binding */ newUI)\n/* harmony export */ });\n/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ \"./src/modules/icons.js\");\n\n\nconst content = document.getElementById(\"content\")\n\nfunction el(element) {\n\treturn document.createElement(element)\n}\n\nfunction newUI() {\n\tconst menu = menuComponent()\n\tconst taskPanel = taskPanelComponent()\n\tconst taskList = mainSectionComponent()\n\n\tcontent.append(menu, taskList, taskPanel)\n}\n\nfunction menuComponent() {\n\t// Structure and header\n\tconst menu = el(\"section\")\n\tmenu.id = \"menu\"\n\n\tconst menuContainer = el(\"div\")\n\tmenuContainer.className = \"menu-container\"\n\n\tconst tituloContainer = el(\"div\")\n\tconst logo = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.Logo)()\n\tconst titulo = el(\"h1\")\n\n\ttituloContainer.className = \"title-container\"\n\ttitulo.id = \"app-name\"\n\ttitulo.textContent = \"Mis tareas\"\n\n\ttituloContainer.append(logo, titulo)\n\tmenuContainer.appendChild(tituloContainer)\n\tmenu.appendChild(menuContainer)\n\n\t//PROJECT LIST\n\t//-> Default list\n\tconst projectListDefault = el(\"div\")\n\tprojectListDefault.className = \"project-list-container\"\n\n\tconst projectsDefault = {\n\t\tplanificado: [\"clock\", \"Planificado\"],\n\t\ttodos: [\"list\", \"Todos\"],\n\t\timportantes: [\"star\", \"Importantes\"],\n\t\tcompletados: [\"check\", \"Completados\"],\n\t}\n\n\tconst projectsLength = Object.keys(projectsDefault).length\n\tfor (var i = 0; i < projectsLength; i++) {\n\t\tlet projectIconName = Object.values(projectsDefault)[i][0]\n\t\tlet projectText = Object.values(projectsDefault)[i][1]\n\n\t\tlet project = projectItem(projectIconName, projectText)\n\t\tif (i === 0) {\n\t\t\tproject.classList.add(\"selected\")\n\t\t}\n\n\t\tprojectListDefault.appendChild(project)\n\t}\n\n\tmenuContainer.appendChild(projectListDefault)\n\n\t//-> Personalized list\n\tconst projectList = el(\"div\")\n\tprojectList.className = \"project-list-container\"\n\n\tconst projectSeparator = el(\"p\")\n\tprojectSeparator.textContent = \"Proyectos\"\n\tprojectSeparator.className = \"project-list-separator\"\n\n\tconst projectTutorial = projectItem(\"play\", \"Tutorial\")\n\tconst projectDefecto = projectItem(\"bookmark\", \"Defecto\")\n\n\tprojectList.append(projectSeparator, projectTutorial, projectDefecto)\n\tmenuContainer.appendChild(projectList)\n\n\tconst btnAddProject = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.createButton)(\"addProject\")\n\n\tmenu.appendChild(btnAddProject)\n\n\treturn menu\n}\n\nfunction projectItem(iconName = \"\", projectName = \"Proyecto\") {\n\tconst menuContainer = el(\"div\")\n\tmenuContainer.className = \"project-item-container\"\n\n\t// Icon and title\n\tconst titleContainer = el(\"div\")\n\ttitleContainer.className = \"project-item-title-container\"\n\n\tconst icon = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(iconName, \"size-16\")\n\n\tconst projectTitle = el(\"p\")\n\tprojectTitle.textContent = projectName\n\n\ttitleContainer.appendChild(icon)\n\ttitleContainer.appendChild(projectTitle)\n\n\t// Counter\n\tconst counterContainer = el(\"div\")\n\tcounterContainer.className = \"project-item-counter-container\"\n\n\tconst counterText = el(\"p\")\n\tcounterText.textContent = \"23\"\n\n\tcounterContainer.appendChild(counterText)\n\tmenuContainer.appendChild(titleContainer)\n\tmenuContainer.appendChild(counterContainer)\n\n\treturn menuContainer\n}\n\nfunction taskPanelComponent() {\n\tconst taskPanel = el(\"section\")\n\ttaskPanel.id = \"task-panel\"\n\t// taskPanel.className = \"hide\"\n\n\tconst btnClosePanel = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(\"close\", \"size-16\")\n\tbtnClosePanel.id = \"btn-close-panel\"\n\ttaskPanel.appendChild(btnClosePanel)\n\n\tconst taskPanelContainer = el(\"div\")\n\ttaskPanelContainer.className = \"task-panel-container\"\n\ttaskPanel.appendChild(taskPanelContainer)\n\n\t// TASK AND STEPS\n\tconst taskInfoContainer = el(\"div\")\n\ttaskInfoContainer.id = \"task-info-container\"\n\ttaskPanelContainer.appendChild(taskInfoContainer)\n\n\t// Task\n\tconst taskStepsContainer = el(\"div\")\n\ttaskStepsContainer.className = \"task-steps-container\"\n\n\tconst taskTitleContainer = el(\"div\")\n\ttaskTitleContainer.className = \"task-panel-title-container\"\n\n\tconst tickIcon = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(\"checkEmpty\", \"size-24\")\n\n\tconst taskTitle = el(\"p\")\n\ttaskTitle.textContent = \"Tarea por defecto\"\n\n\ttaskInfoContainer.appendChild(taskStepsContainer)\n\ttaskStepsContainer.appendChild(taskTitleContainer)\n\ttaskTitleContainer.append(tickIcon, taskTitle)\n\n\t// Steps\n\tfunction subTaskItem() {\n\t\tconst subTaskContainer = el(\"div\")\n\t\tsubTaskContainer.className = \"sub-task-container\"\n\n\t\tconst subTaskText = el(\"p\")\n\t\tsubTaskText.textContent = \"Sub-tarea por defecto\"\n\n\t\tconst tickIcon = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(\"checkEmpty\", \"size-16\")\n\n\t\tsubTaskContainer.append(tickIcon, subTaskText)\n\n\t\treturn subTaskContainer\n\t}\n\n\tconst btnAddStep = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.createButton)(\"addStep\")\n\n\ttaskStepsContainer.append(subTaskItem(), subTaskItem(), subTaskItem(), btnAddStep)\n\n\t// TASK DETAILS\n\tconst taskDetailsContainer = el(\"div\")\n\ttaskDetailsContainer.id = \"task-details-container\"\n\ttaskInfoContainer.appendChild(taskDetailsContainer)\n\n\tfunction taskDetailsItem(leftIconName, textContent, rightIconName) {\n\t\tconst taskDetailsItemContainer = el(\"div\")\n\t\ttaskDetailsItemContainer.className = \"task-details-item-container\"\n\n\t\tconst taskDetailsInfoContainer = el(\"div\")\n\t\ttaskDetailsInfoContainer.className = \"task-details-info-container\"\n\n\t\tconst taskDetailsIconLeft = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(leftIconName, \"size-21\")\n\n\t\tconst taskDetailsText = el(\"p\")\n\t\ttaskDetailsText.textContent = textContent\n\n\t\tconst taskDetailsIconRigth = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(rightIconName, \"size-21\")\n\n\t\ttaskDetailsItemContainer.appendChild(taskDetailsInfoContainer)\n\t\ttaskDetailsInfoContainer.appendChild(taskDetailsIconLeft)\n\t\ttaskDetailsInfoContainer.appendChild(taskDetailsText)\n\t\ttaskDetailsItemContainer.appendChild(taskDetailsIconRigth)\n\n\t\treturn taskDetailsItemContainer\n\t}\n\t// -> Marcado como importante\n\tconst taskDetailsStarItem = taskDetailsItem(\"star\", \"Marcado como importante\", \"close\")\n\t// -> Vencimiento\n\tconst taskDetailsDueItem = taskDetailsItem(\"clock\", \"Vencimiento\", \"close\")\n\n\t// -> Proyecto\n\tconst taskDetailsProjectItem = taskDetailsItem(\"folder\", \"Proyecto\", \"chevronRight\")\n\n\tfunction separator() {\n\t\tconst _separator = el(\"div\")\n\t\t_separator.className = \"separator\"\n\t\treturn _separator\n\t}\n\n\ttaskDetailsContainer.appendChild(taskDetailsStarItem)\n\ttaskDetailsContainer.appendChild(separator())\n\ttaskDetailsContainer.appendChild(taskDetailsDueItem)\n\ttaskDetailsContainer.appendChild(separator())\n\ttaskDetailsContainer.appendChild(taskDetailsProjectItem)\n\n\t// -> Adjuntar archivo\n\tconst taskDetailsAttachContainer = el(\"div\")\n\ttaskDetailsAttachContainer.id = \"task-attach-container\"\n\n\tconst taskDetailsAttachItem = taskDetailsItem(\"clip\", \"Adjuntar archivo\", \"close\")\n\n\ttaskInfoContainer.appendChild(taskDetailsAttachContainer)\n\ttaskDetailsAttachContainer.appendChild(taskDetailsAttachItem)\n\n\t// -> Agregar nota\n\tconst taskInputNote = el(\"textarea\")\n\ttaskInputNote.id = \"add-note-field\"\n\ttaskInputNote.placeholder = \"Agregar nota\"\n\n\ttaskInfoContainer.appendChild(taskInputNote)\n\n\t// Botones\n\tconst buttonsContainer = el(\"div\")\n\tbuttonsContainer.className = \"buttons-container\"\n\n\tconst btnSave = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.createButton)(\"saveTask\")\n\tconst btnDelete = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.createButton)(\"deleteProject\")\n\n\tbuttonsContainer.append(btnSave, btnDelete)\n\ttaskPanelContainer.appendChild(buttonsContainer)\n\n\treturn taskPanel\n}\n\nfunction mainSectionComponent() {\n\tconst mainSection = el(\"main\")\n\tmainSection.id = \"main-section\"\n\n\t// Zona superior\n\tconst mainSectionContainer = el(\"div\")\n\tmainSectionContainer.className = \"main-section-container\"\n\n\t// -> Título\n\tconst headerContainer = el(\"div\")\n\theaderContainer.className = \"header-container\"\n\n\tconst projectIcon = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(\"clock\", \"size-24\")\n\tconst titleContainer = el(\"div\")\n\ttitleContainer.className = \"title-container\"\n\n\tconst titleText = el(\"p\")\n\ttitleText.textContent = \"Planificado\"\n\n\theaderContainer.appendChild(projectIcon)\n\theaderContainer.appendChild(titleContainer)\n\ttitleContainer.appendChild(titleText)\n\n\tmainSectionContainer.appendChild(headerContainer)\n\n\t// -> Lista de tareas\n\tconst taskList = taskListComponent()\n\n\t// Zona inferior - Añadir nueva tarea\n\tconst btnAddTask = el(\"button\")\n\tbtnAddTask.id = \"btn-add-task\"\n\tbtnAddTask.className = \"btn-regular-blue\"\n\n\tconst btnAddIcon = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(\"add\", \"size-16\")\n\tconst btnText = el(\"p\")\n\tbtnText.textContent = \"Añadir tarea\"\n\n\tbtnAddTask.appendChild(btnAddIcon)\n\tbtnAddTask.appendChild(btnText)\n\n\tmainSection.appendChild(mainSectionContainer)\n\tmainSectionContainer.appendChild(taskList)\n\tmainSection.appendChild(btnAddTask)\n\treturn mainSection\n}\n\nfunction taskListComponent() {\n\tconst taskListContainer = el(\"div\")\n\ttaskListContainer.className = \"task-list-container\"\n\n\tconst taskGroupContainer = el(\"div\")\n\ttaskGroupContainer.className = \"task-group-container\"\n\n\t// -> Group Name elements\n\tconst taskGroupNameContainer = el(\"div\")\n\ttaskGroupNameContainer.className = \"task-group-name-container\"\n\t// Chevron\n\tconst iconChevronDown = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(\"chevronDown\", \"size-12\")\n\t// Text\n\tconst groupName = el(\"p\")\n\tgroupName.textContent = \"Hoy\"\n\n\t// Counter\n\tconst groupCounterContainer = el(\"div\")\n\tgroupCounterContainer.className = \"group-counter-container\"\n\n\tconst counterText = el(\"p\")\n\tcounterText.textContent = \"2\"\n\n\ttaskGroupNameContainer.append(iconChevronDown, groupName, groupCounterContainer)\n\tgroupCounterContainer.appendChild(counterText)\n\n\t// ------\n\n\tconst taskCardListContainer = el(\"div\")\n\ttaskCardListContainer.className = \"task-card-list-container\"\n\n\tconst taskCardOne = taskCardUI()\n\tconst taskCardTwo = taskCardUI()\n\n\ttaskListContainer.appendChild(taskGroupContainer)\n\ttaskGroupContainer.appendChild(taskGroupNameContainer)\n\ttaskGroupContainer.appendChild(taskCardListContainer)\n\ttaskCardListContainer.appendChild(taskCardOne)\n\ttaskCardListContainer.appendChild(taskCardTwo)\n\n\treturn taskListContainer\n}\n\nfunction taskCardUI() {\n\tconst taskCardContainer = el(\"div\")\n\ttaskCardContainer.className = \"task-card-container\"\n\n\t// Task tick and info\n\tconst taskInfoContainer = el(\"div\")\n\ttaskInfoContainer.className = \"task-info-container\"\n\n\t// -> Tick Icon\n\tconst tickIcon = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(\"checkEmpty\", \"size-21\") //TODO Sustituir\n\n\t// -> Task title and info\n\tconst taskTitleContainer = el(\"div\")\n\ttaskTitleContainer.className = \"task-title-container\"\n\n\t// --> Task Title\n\tconst taskTitle = el(\"p\")\n\ttaskTitle.textContent = \"Tarea por defecto\"\n\n\t// --> Task Info\n\tconst taskDetailsContainer = el(\"div\")\n\ttaskDetailsContainer.className = \"task-details-container\"\n\n\tconst taskDetailHoy = createDetailsChip(\"Hoy\")\n\tconst taskDetailTutorial = createDetailsChip(\"Tutorial\")\n\tconst taskDetailAttach = createDetailsChip(\"Attach\")\n\n\tfunction createDetailsChip(textContent) {\n\t\tconst detailContainer = el(\"div\")\n\t\tdetailContainer.className = \"detailContainer\"\n\n\t\t// ----> Icono\n\t\tlet iconName\n\t\tif (textContent === \"Hoy\") iconName = \"clock\"\n\t\tif (textContent === \"Tutorial\") iconName = \"folder\"\n\t\tif (textContent === \"Attach\") iconName = \"clip\"\n\n\t\tconst detailIcon = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(iconName, \"size-16\")\n\t\t// ----> Texto\n\t\tconst detailText = el(\"p\")\n\t\tdetailText.textContent = textContent\n\n\t\tdetailContainer.append(detailIcon, detailText)\n\n\t\treturn detailContainer\n\t}\n\n\tfunction taskDetailsSeparator() {\n\t\tconst _separator = el(\"div\")\n\t\t_separator.className = \"task-details-separator\"\n\n\t\treturn _separator\n\t}\n\n\ttaskInfoContainer.append(tickIcon, taskTitleContainer)\n\ttaskTitleContainer.append(taskTitle, taskDetailsContainer)\n\ttaskDetailsContainer.append(taskDetailHoy, taskDetailsSeparator(), taskDetailTutorial, taskDetailsSeparator(), taskDetailAttach)\n\n\t// Icon star\n\tconst iconStar = (0,_icons__WEBPACK_IMPORTED_MODULE_0__.IconGenerator)(\"star\", \"size-21\")\n\n\ttaskCardContainer.append(taskInfoContainer, iconStar)\n\n\treturn taskCardContainer\n}\n\n\n//# sourceURL=webpack://todo-list-app/./src/modules/DOM.js?");

/***/ }),

/***/ "./src/modules/icons.js":
/*!******************************!*\
  !*** ./src/modules/icons.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IconGenerator\": () => (/* binding */ IconGenerator),\n/* harmony export */   \"Logo\": () => (/* binding */ Logo),\n/* harmony export */   \"createButton\": () => (/* binding */ createButton)\n/* harmony export */ });\n/* harmony import */ var _icons_tasks_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../icons/tasks.png */ \"./src/icons/tasks.png\");\n\n\nfunction Logo() {\n\tconst _logo = new Image()\n\t_logo.id = \"logo\"\n\t_logo.src = _icons_tasks_png__WEBPACK_IMPORTED_MODULE_0__\n\n\treturn _logo\n}\n\n// ICONS - FONTAWESOME - Classes\nconst iconList = {\n\tclock: [\"fa-regular\", \"fa-clock\"],\n\tadd: [\"fa-solid\", \"fa-plus\"],\n\tlist: [\"fa-solid\", \"fa-list\"],\n\tstar: [\"fa-regular\", \"fa-star\"],\n\tplay: [\"fa-regular\", \"fa-circle-play\"],\n\tbookmark: [\"fa-solid\", \"fa-bookmark\"],\n\tclose: [\"fa-solid\", \"fa-xmark\"],\n\tfolder: [\"fa-regular\", \"fa-folder-open\"],\n\tclip: [\"fa-solid\", \"fa-paperclip\"],\n\tchevronRight: [\"fa-solid\", \"fa-chevron-right\"],\n\tchevronDown: [\"fa-solid\", \"fa-chevron-down\"],\n\tcheck: [\"fa-regular\", \"fa-square-check\"],\n\tcheckEmpty: [\"fa-regular\", \"fa-square\"],\n\tcheckDone: [\"fa-solid\", \"fa-square-check\"],\n}\n\nfunction IconGenerator(iconName, size) {\n\tconst defaultIcon = iconList[\"bookmark\"]\n\tconst _iconClasses = iconList[iconName] || defaultIcon\n\n\tconst _icon = document.createElement(\"i\")\n\t_icon.classList.add(..._iconClasses, size)\n\n\treturn _icon\n}\n\nfunction createButton(buttonName) {\n\t//Button properties\n\tconst addProject = {\n\t\tclass: \"btn-solid-blue\",\n\t\tid: \"btn-add-project\",\n\t\ticon: [\"add\", \"size-16\"],\n\t\ttext: \"Nuevo proyecto\",\n\t}\n\n\tconst deleteProject = {\n\t\tclass: \"btn-underlined-red\",\n\t\tid: \"btn-delete\",\n\t\ticon: false,\n\t\ttext: \"Eliminar\",\n\t}\n\n\tconst saveTask = {\n\t\tclass: \"btn-solid-blue\",\n\t\tid: \"btn-save\",\n\t\ticon: false,\n\t\ttext: \"Guardar\",\n\t}\n\n\tconst addStep = {\n\t\tclass: \"btn-add-step\",\n\t\tid: \"btn-add-step\",\n\t\ticon: [\"add\", \"size-16\"],\n\t\ttext: \"Agregar paso\",\n\t}\n\n\t// Button display\n\tconst _btn = document.createElement(\"button\")\n\tconst _text = document.createElement(\"p\")\n\n\tconst _btnName = eval(buttonName)\n\t_btn.className = _btnName[\"class\"]\n\t_btn.id = _btnName[\"id\"]\n\t_text.textContent = _btnName[\"text\"]\n\n\tif (!_btnName[\"icon\"]) {\n\t\t_btn.append(_text)\n\t\treturn _btn\n\t}\n\n\tconst _icon = IconGenerator(..._btnName[\"icon\"])\n\t_btn.append(_icon, _text)\n\n\treturn _btn\n}\n\n\n//# sourceURL=webpack://todo-list-app/./src/modules/icons.js?");

/***/ }),

/***/ "./src/icons/tasks.png":
/*!*****************************!*\
  !*** ./src/icons/tasks.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"187d41f3175e16ecd678.png\";\n\n//# sourceURL=webpack://todo-list-app/./src/icons/tasks.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;