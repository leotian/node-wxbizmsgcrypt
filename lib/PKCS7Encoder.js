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
 * PKCS7补位
 */
var PKCS7Encoder = function () {
  function PKCS7Encoder() {
    (0, _classCallCheck3.default)(this, PKCS7Encoder);
  }

  (0, _createClass3.default)(PKCS7Encoder, null, [{
    key: 'encode',


    /**
     * 补位
     * @param text
     * @returns {string}
     */
    value: function encode(text) {
      var text_length = Buffer.byteLength(text);
      //计算需要填充的位数
      var amount_to_pad = PKCS7Encoder.block_size - text_length % PKCS7Encoder.block_size;
      //计算需要填充的位数
      if (amount_to_pad === 0) {
        amount_to_pad = PKCS7Encoder.block_size;
      }
      //获得补位所用的字符
      var pad = String.fromCharCode(amount_to_pad),
          s = [];
      for (var i = 0; i < amount_to_pad; i++) {
        s.push(pad);
      }
      return text + s.join('');
    }

    /**
     * 删除补位
     * @param text
     * @returns {string|*}
     */

  }, {
    key: 'decode',
    value: function decode(text) {
      var buffer = new Buffer(text, 'binary');
      var pad = buffer[buffer.length - 1];
      if (pad < 1 || pad > 32) {
        pad = 0;
      }
      return text.substr(0, text.length - pad);
    }
  }]);
  return PKCS7Encoder;
}();

PKCS7Encoder.block_size = 32;
exports.default = PKCS7Encoder;