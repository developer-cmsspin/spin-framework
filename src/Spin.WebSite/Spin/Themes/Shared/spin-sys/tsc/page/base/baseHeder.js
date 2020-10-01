"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(["require", "exports"], function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.contact = exports.BaseHeader = void 0;

  var BaseHeader = /*#__PURE__*/function () {
    /**
     * constructor
     */
    function BaseHeader() {
      _classCallCheck(this, BaseHeader);
    }

    _createClass(BaseHeader, [{
      key: "contact",
      get: function get() {
        return this._contact;
      },
      set: function set(v) {
        this._contact = v;
      }
    }]);

    return BaseHeader;
  }();

  exports.BaseHeader = BaseHeader;

  var contact = /*#__PURE__*/function () {
    function contact() {
      _classCallCheck(this, contact);
    }

    _createClass(contact, [{
      key: "show",
      value: function show() {}
    }]);

    return contact;
  }();

  exports.contact = contact;
});