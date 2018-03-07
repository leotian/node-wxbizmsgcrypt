'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author xialeistduio<xialeistudio@gmail.com>
 * @date 16-12-5
 */
/**
 * buffer编码转换器
 */
var BufferConverter = function () {
  function BufferConverter() {
    (0, _classCallCheck3.default)(this, BufferConverter);
  }

  (0, _createClass3.default)(BufferConverter, null, [{
    key: 'converter',

    /**
     *
     * @param data
     * @param desEncoding
     * @param srcEncoding
     * @returns {String}
     */
    value: function converter(data) {
      var desEncoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'base64';
      var srcEncoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'binary';

      return new Buffer(data, srcEncoding).toString(desEncoding);
    }
  }]);
  return BufferConverter;
}();

exports.default = BufferConverter;