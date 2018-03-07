'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _xml2js = require('xml2js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XMLParser = function () {
  function XMLParser() {
    (0, _classCallCheck3.default)(this, XMLParser);
  }

  (0, _createClass3.default)(XMLParser, null, [{
    key: 'generate',

    /**
     * 生成密文
     * @param encrypt
     * @param signature
     * @param timestamp
     * @param nonce
     * @returns {string}
     */
    value: function generate(encrypt, signature, timestamp, nonce) {
      return '<xml>\n<Encrypt><![CDATA[' + encrypt + ']]></Encrypt>\n<MsgSignature><![CDATA[' + signature + ']]></MsgSignature>\n<TimeStamp>' + timestamp + '</TimeStamp>\n<Nonce><![CDATA[' + nonce + ']]></Nonce>\n</xml>';
    }

    /**
     * xml2js
     * @param postData
     * @returns {Promise}
     */

  }, {
    key: 'extrace',
    value: function extrace(postData) {
      return new _promise2.default(function (resolve, reject) {
        (0, _xml2js.parseString)(postData, { explicitArray: false, ignoreAttrs: true }, function (e, result) {
          if (e) {
            return reject(e);
          }
          return resolve(result);
        });
      });
    }
  }]);
  return XMLParser;
}(); /**
      * @author xialeistduio<xialeistudio@gmail.com>
      * @date 16-12-5
      */


exports.default = XMLParser;