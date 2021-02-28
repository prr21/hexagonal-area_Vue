// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/methods/renderHexagons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _default() {
  if (!this.validateAreas()) return;
  var shapeWidth = this.shape.width - 1;
  var shapeHeight = this.shape.height;
  var L = Number(this.area.L.size),
      M = Number(this.area.M.size),
      N = Number(this.area.N.size);
  var countOfRows = L + M - 1;
  var rowsArr = [];
  var i = L * -1;
  var countOfShapes = N - 1;

  var _loop = function _loop(rowI) {
    var leftToRight = rowI >= L;
    i++;

    if (leftToRight) {
      countOfShapes;
    } else countOfShapes++;

    if (rowI >= M) --countOfShapes;
    var arrayLike = new Array(countOfShapes).fill("");
    var row = Array.from(arrayLike, function (_, index) {
      var offsetBetween = index * shapeWidth - index;
      var offsetRow = rowI * shapeWidth / 2;
      var offsetMRrow = leftToRight ? i * shapeWidth : 0;
      var offset = offsetBetween - offsetRow + offsetMRrow;
      index = Math.abs(i) + index * 2;
      return {
        row: rowI,
        index: index,
        id: rowI + ":" + index,
        value: null,
        style: {
          top: "".concat(rowI * 32 + rowI, "px"),
          // change static 32
          left: offset + "px",
          backgroundColor: ""
        }
      };
    });
    rowsArr.push.apply(rowsArr, _toConsumableArray(row));
  };

  for (var rowI = 0; rowI < countOfRows; rowI++) {
    _loop(rowI);
  }

  this.shapesArr = rowsArr;
}
},{}],"src/methods/changeValue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(id) {
  var target = this.shapesArr.find(function (shape) {
    return shape.id === id;
  });
  target.value = +!target.value;
}
},{}],"src/services/colors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = void 0;
var colors = document.styleSheets[0].rules[0].style;
exports.colors = colors;
},{}],"src/services/distributeByDomens.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = distributeByDomens;

var _colors = require("../services/colors");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function distributeByDomens(arr) {
  var domens = [];

  var restShapes = _toConsumableArray(arr);

  while (restShapes.length) {
    var shape = restShapes[0];
    var domen = defineChainByShape(shape);

    if (domen.length > 1) {
      domens.push({
        shapes: domen,
        id: domens.length,
        color: _colors.colors[domens.length]
      });
    }
  }

  return domens;

  function defineChainByShape(shp) {
    var chain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    chain.push(shp); // looking for connect with nearby shapes

    var nearShps = restShapes.filter(function (elem) {
      return notSame(elem, shp) && (inOneRow(elem, shp) || inOneCol(elem, shp));
    }); // update arr by removing used shapes

    restShapes = removeElemFromArr(shp, restShapes); // repeat unti chain connection ends

    nearShps.forEach(function (shpInChain) {
      defineChainByShape(shpInChain, chain);
    });
    return chain;
  }
}

var removeElemFromArr = function removeElemFromArr(elem, arr) {
  return arr.filter(function (item) {
    return notSame(item, elem);
  });
};

var notSame = function notSame(a, b) {
  return a !== b;
};

var inOneRow = function inOneRow(a, b) {
  return a.row === b.row && (a.index === b.index + 2 || a.index === b.index - 2);
};

var inOneCol = function inOneCol(a, b) {
  return (a.row === b.row + 1 || a.row === b.row - 1) && (a.index === b.index + 1 || a.index === b.index - 1);
};
},{"../services/colors":"src/services/colors.js"}],"src/methods/renderDomens.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _distributeByDomens = _interopRequireDefault(require("../services/distributeByDomens"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  window.prr = this.shapesArr;
  var shapes = this.shapesArr.filter(function (shape) {
    return shape.value;
  });
  var domens = (0, _distributeByDomens.default)(shapes);
  this.shapesArr.forEach(function (shape) {
    return shape.style.backgroundColor = "var(--light)";
  });
  domens.forEach(setColors);
  this.domens = domens;
}

function setColors(_ref) {
  var shapes = _ref.shapes,
      color = _ref.color;
  shapes.forEach(function (shape) {
    return shape.style.backgroundColor = "var(".concat(color, ")");
  });
}
},{"../services/distributeByDomens":"src/services/distributeByDomens.js"}],"src/methods/validateAreas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var area = this.area;
  var valid = true;

  for (var region in area) {
    var field = area[region];

    if (field.size > 30) {
      setValidStatus(field, false, "Значение не может быть больше 30!");
    } else if (field.size < 1) {
      setValidStatus(field, false, "Значение не может быть меньше 1!");
    } else {
      setValidStatus(field, true);
    }
  }

  return valid;

  function setValidStatus(field, status) {
    var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    field.message = msg;
    field.valid = status;
    if (!status) valid = false;
  }
}
},{}],"src/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _renderHexagons = _interopRequireDefault(require("./methods/renderHexagons"));

var _changeValue = _interopRequireDefault(require("./methods/changeValue"));

var _renderDomens = _interopRequireDefault(require("./methods/renderDomens"));

var _validateAreas = _interopRequireDefault(require("./methods/validateAreas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// todo: dynamic center margin
// eslint-disable-next-line no-undef
var app = new Vue({
  el: "#root",
  methods: {
    renderHexagons: _renderHexagons.default,
    changeValue: _changeValue.default,
    renderDomens: _renderDomens.default,
    validateAreas: _validateAreas.default
  },
  data: {
    area: {
      L: {
        size: 3,
        valid: true,
        message: ""
      },
      M: {
        size: 5,
        valid: true,
        message: ""
      },
      N: {
        size: 7,
        valid: true,
        message: ""
      }
    },
    shape: {
      width: 50,
      height: 20
    },
    shapesArr: JSON.parse("[{\"row\":0,\"index\":2,\"id\":\"0:2\",\"value\":1,\"style\":{\"top\":\"0px\",\"left\":\"0px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":0,\"index\":4,\"id\":\"0:4\",\"value\":null,\"style\":{\"top\":\"0px\",\"left\":\"48px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":0,\"index\":6,\"id\":\"0:6\",\"value\":1,\"style\":{\"top\":\"0px\",\"left\":\"96px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":0,\"index\":8,\"id\":\"0:8\",\"value\":null,\"style\":{\"top\":\"0px\",\"left\":\"144px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":0,\"index\":10,\"id\":\"0:10\",\"value\":1,\"style\":{\"top\":\"0px\",\"left\":\"192px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":0,\"index\":12,\"id\":\"0:12\",\"value\":1,\"style\":{\"top\":\"0px\",\"left\":\"240px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":0,\"index\":14,\"id\":\"0:14\",\"value\":null,\"style\":{\"top\":\"0px\",\"left\":\"288px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":1,\"index\":1,\"id\":\"1:1\",\"value\":1,\"style\":{\"top\":\"33px\",\"left\":\"-24.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":1,\"index\":3,\"id\":\"1:3\",\"value\":null,\"style\":{\"top\":\"33px\",\"left\":\"23.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":1,\"index\":5,\"id\":\"1:5\",\"value\":null,\"style\":{\"top\":\"33px\",\"left\":\"71.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":1,\"index\":7,\"id\":\"1:7\",\"value\":null,\"style\":{\"top\":\"33px\",\"left\":\"119.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":1,\"index\":9,\"id\":\"1:9\",\"value\":null,\"style\":{\"top\":\"33px\",\"left\":\"167.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":1,\"index\":11,\"id\":\"1:11\",\"value\":1,\"style\":{\"top\":\"33px\",\"left\":\"215.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":1,\"index\":13,\"id\":\"1:13\",\"value\":null,\"style\":{\"top\":\"33px\",\"left\":\"263.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":1,\"index\":15,\"id\":\"1:15\",\"value\":1,\"style\":{\"top\":\"33px\",\"left\":\"311.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":2,\"index\":0,\"id\":\"2:0\",\"value\":1,\"style\":{\"top\":\"66px\",\"left\":\"-49px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":2,\"index\":2,\"id\":\"2:2\",\"value\":null,\"style\":{\"top\":\"66px\",\"left\":\"-1px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":2,\"index\":4,\"id\":\"2:4\",\"value\":1,\"style\":{\"top\":\"66px\",\"left\":\"47px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":2,\"index\":6,\"id\":\"2:6\",\"value\":null,\"style\":{\"top\":\"66px\",\"left\":\"95px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":2,\"index\":8,\"id\":\"2:8\",\"value\":1,\"style\":{\"top\":\"66px\",\"left\":\"143px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":2,\"index\":10,\"id\":\"2:10\",\"value\":null,\"style\":{\"top\":\"66px\",\"left\":\"191px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":2,\"index\":12,\"id\":\"2:12\",\"value\":null,\"style\":{\"top\":\"66px\",\"left\":\"239px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":2,\"index\":14,\"id\":\"2:14\",\"value\":null,\"style\":{\"top\":\"66px\",\"left\":\"287px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":2,\"index\":16,\"id\":\"2:16\",\"value\":1,\"style\":{\"top\":\"66px\",\"left\":\"335px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":3,\"index\":1,\"id\":\"3:1\",\"value\":null,\"style\":{\"top\":\"99px\",\"left\":\"-24.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":3,\"index\":3,\"id\":\"3:3\",\"value\":null,\"style\":{\"top\":\"99px\",\"left\":\"23.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":3,\"index\":5,\"id\":\"3:5\",\"value\":null,\"style\":{\"top\":\"99px\",\"left\":\"71.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":3,\"index\":7,\"id\":\"3:7\",\"value\":null,\"style\":{\"top\":\"99px\",\"left\":\"119.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":3,\"index\":9,\"id\":\"3:9\",\"value\":null,\"style\":{\"top\":\"99px\",\"left\":\"167.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":3,\"index\":11,\"id\":\"3:11\",\"value\":null,\"style\":{\"top\":\"99px\",\"left\":\"215.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":3,\"index\":13,\"id\":\"3:13\",\"value\":null,\"style\":{\"top\":\"99px\",\"left\":\"263.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":3,\"index\":15,\"id\":\"3:15\",\"value\":1,\"style\":{\"top\":\"99px\",\"left\":\"311.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":3,\"index\":17,\"id\":\"3:17\",\"value\":null,\"style\":{\"top\":\"99px\",\"left\":\"359.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":4,\"index\":2,\"id\":\"4:2\",\"value\":1,\"style\":{\"top\":\"132px\",\"left\":\"0px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":4,\"index\":4,\"id\":\"4:4\",\"value\":null,\"style\":{\"top\":\"132px\",\"left\":\"48px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":4,\"index\":6,\"id\":\"4:6\",\"value\":1,\"style\":{\"top\":\"132px\",\"left\":\"96px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":4,\"index\":8,\"id\":\"4:8\",\"value\":null,\"style\":{\"top\":\"132px\",\"left\":\"144px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":4,\"index\":10,\"id\":\"4:10\",\"value\":1,\"style\":{\"top\":\"132px\",\"left\":\"192px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":4,\"index\":12,\"id\":\"4:12\",\"value\":null,\"style\":{\"top\":\"132px\",\"left\":\"240px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":4,\"index\":14,\"id\":\"4:14\",\"value\":null,\"style\":{\"top\":\"132px\",\"left\":\"288px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":4,\"index\":16,\"id\":\"4:16\",\"value\":1,\"style\":{\"top\":\"132px\",\"left\":\"336px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":4,\"index\":18,\"id\":\"4:18\",\"value\":1,\"style\":{\"top\":\"132px\",\"left\":\"384px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":5,\"index\":3,\"id\":\"5:3\",\"value\":null,\"style\":{\"top\":\"165px\",\"left\":\"24.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":5,\"index\":5,\"id\":\"5:5\",\"value\":null,\"style\":{\"top\":\"165px\",\"left\":\"72.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":5,\"index\":7,\"id\":\"5:7\",\"value\":null,\"style\":{\"top\":\"165px\",\"left\":\"120.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":5,\"index\":9,\"id\":\"5:9\",\"value\":null,\"style\":{\"top\":\"165px\",\"left\":\"168.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":5,\"index\":11,\"id\":\"5:11\",\"value\":null,\"style\":{\"top\":\"165px\",\"left\":\"216.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":5,\"index\":13,\"id\":\"5:13\",\"value\":null,\"style\":{\"top\":\"165px\",\"left\":\"264.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":5,\"index\":15,\"id\":\"5:15\",\"value\":null,\"style\":{\"top\":\"165px\",\"left\":\"312.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":5,\"index\":17,\"id\":\"5:17\",\"value\":1,\"style\":{\"top\":\"165px\",\"left\":\"360.5px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":6,\"index\":4,\"id\":\"6:4\",\"value\":null,\"style\":{\"top\":\"198px\",\"left\":\"49px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":6,\"index\":6,\"id\":\"6:6\",\"value\":1,\"style\":{\"top\":\"198px\",\"left\":\"97px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":6,\"index\":8,\"id\":\"6:8\",\"value\":null,\"style\":{\"top\":\"198px\",\"left\":\"145px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":6,\"index\":10,\"id\":\"6:10\",\"value\":1,\"style\":{\"top\":\"198px\",\"left\":\"193px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":6,\"index\":12,\"id\":\"6:12\",\"value\":null,\"style\":{\"top\":\"198px\",\"left\":\"241px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":6,\"index\":14,\"id\":\"6:14\",\"value\":1,\"style\":{\"top\":\"198px\",\"left\":\"289px\",\"backgroundColor\":\"var(--light)\"}},{\"row\":6,\"index\":16,\"id\":\"6:16\",\"value\":null,\"style\":{\"top\":\"198px\",\"left\":\"337px\",\"backgroundColor\":\"var(--light)\"}}]"),
    domens: []
  }
});
var _default = app;
exports.default = _default;
},{"./methods/renderHexagons":"src/methods/renderHexagons.js","./methods/changeValue":"src/methods/changeValue.js","./methods/renderDomens":"src/methods/renderDomens.js","./methods/validateAreas":"src/methods/validateAreas.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _app = _interopRequireDefault(require("./src/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-undef
Vue.component("hexagonal", {
  template: "\"#hexagon-holder\""
});

_app.default.renderDomens();
},{"./src/app":"src/app.js"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60681" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/hexagonal-area_Vue.e31bb0bc.js.map