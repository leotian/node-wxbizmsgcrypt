'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHA1 = function () {
  function SHA1() {
    (0, _classCallCheck3.default)(this, SHA1);
  }

  (0, _createClass3.default)(SHA1, null, [{
    key: 'getSHA1',
    value: function getSHA1(token, timestamp, nonce, encrypt_msg) {
      var array = [token, timestamp, nonce, encrypt_msg];
      array = array.sort();
      array = array.join('');
      var sha1 = _crypto2.default.createHash('sha1');
      sha1.update(array);
      return sha1.digest('hex');
    }
  }]);
  return SHA1;
}(); /**
      * @author xialeistduio<xialeistudio@gmail.com>
      * @date 16-12-5
      */


exports.default = SHA1;