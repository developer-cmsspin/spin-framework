"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(["require", "exports"], function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Lazy = void 0;

  var Lazy = /*#__PURE__*/function () {
    function Lazy() {
      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      _classCallCheck(this, Lazy);

      this.instance = null;
      this.from = from;
    }

    _createClass(Lazy, [{
      key: "value",
      get: function get() {
        if (this.instance == null) {
          this.instance = new this.initializer();
        }

        return this.instance;
      }
    }]);

    return Lazy;
  }();

  exports.Lazy = Lazy;
});