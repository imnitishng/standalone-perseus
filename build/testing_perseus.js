/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	
	var Perseus = window.Perseus = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./perseus.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var ReactDOM = window.ReactDOM = React.__internalReactDOM;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Sets up the basic environment for running Perseus in.
	 */
	
	window.icu = {
	    getDecimalFormatSymbols: function getDecimalFormatSymbols() {
	        return {
	            decimal_separator: ".",
	            grouping_separator: ",",
	            minus: "-"
	        };
	    }
	};
	
	window.KhanUtil = {
	    debugLog: function debugLog() {},
	    localeToFixed: function localeToFixed(num, precision) {
	        return num.toFixed(precision);
	    }
	};
	
	window.Exercises = {
	    localMode: true,
	
	    useKatex: true,
	    khanExercisesUrlBase: "../",
	
	    getCurrentFramework: function getCurrentFramework() {
	        return "khan-exercises";
	    },
	    PerseusBridge: {
	        cleanupProblem: function cleanupProblem() {
	            return false;
	        }
	    }
	};

/***/ }
/******/ ])
//# sourceMappingURL=testing_perseus.js.map