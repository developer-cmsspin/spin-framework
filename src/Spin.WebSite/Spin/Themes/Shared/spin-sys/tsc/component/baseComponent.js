"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(["require", "exports"], function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BaseComponent = void 0;

  var BaseComponent = /*#__PURE__*/function () {
    /* #region  Constructor */
    function BaseComponent(e) {
      _classCallCheck(this, BaseComponent);

      this.control = e;
    }

    _createClass(BaseComponent, [{
      key: "control",
      get: function get() {
        return this._control;
      },
      set: function set(v) {
        this._control = v;
      }
    }]);

    return BaseComponent;
  }();

  exports.BaseComponent = BaseComponent;
});