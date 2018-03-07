'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Prpcrypt = require('./Prpcrypt');

var _Prpcrypt2 = _interopRequireDefault(_Prpcrypt);

var _SHA = require('./SHA1');

var _SHA2 = _interopRequireDefault(_SHA);

var _XMLParser = require('./XMLParser');

var _XMLParser2 = _interopRequireDefault(_XMLParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WxBizMsgCrypt = function () {
  /**
   * 构造方法
   * @param token 公众平台上，开发者设置的token
   * @param encodingAesKey 公众平台上，开发者设置的EncodingAESKey
   * @param appId 公众平台的appId
   */
  function WxBizMsgCrypt(token, encodingAesKey, appId) {
    (0, _classCallCheck3.default)(this, WxBizMsgCrypt);

    this.token = token;
    this.encodingAesKey = encodingAesKey;
    this.appId = appId;
  }

  /**
   * 加密
   * @param replyMsg
   * @param timestamp
   * @param nonce
   */


  (0, _createClass3.default)(WxBizMsgCrypt, [{
    key: 'encryptMsg',
    value: function encryptMsg(replyMsg, timestamp, nonce) {
      var pc = new _Prpcrypt2.default(this.encodingAesKey);
      var encrypt = pc.encrypt(replyMsg, this.appId);
      if (timestamp === null) {
        timestamp = parseInt(Date.now() / 1000).toString();
      }
      var sign = _SHA2.default.getSHA1(this.token, timestamp, nonce, encrypt);
      return _XMLParser2.default.generate(encrypt, sign, timestamp, nonce);
    }

    /**
     * 解密
     * @param signature
     * @param timestamp
     * @param nonce
     * @param postData
     */

  }, {
    key: 'decryptMsg',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(signature) {
        var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var nonce = arguments[2];
        var postData = arguments[3];
        var pc, json, xml, encrypt, sign;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.encodingAesKey.length !== 43)) {
                  _context.next = 2;
                  break;
                }

                throw new Error('EncodingAesKey length must be 43');

              case 2:
                pc = new _Prpcrypt2.default(this.encodingAesKey);
                _context.next = 5;
                return _XMLParser2.default.extrace(postData);

              case 5:
                json = _context.sent;
                xml = json.xml;

                if (timestamp === null) {
                  timestamp = parseInt(Date.now() / 1000);
                }

                encrypt = xml.Encrypt;
                //验证签名

                sign = _SHA2.default.getSHA1(this.token, timestamp, nonce, encrypt);

                if (!(sign != signature)) {
                  _context.next = 12;
                  break;
                }

                throw new Error('signature invalid');

              case 12:
                return _context.abrupt('return', pc.decrypt(encrypt, this.appId));

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function decryptMsg(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return decryptMsg;
    }()
  }]);
  return WxBizMsgCrypt;
}(); /**
      * @author xialeistduio<xialeistudio@gmail.com>
      * @date 16-12-5
      */


exports.default = WxBizMsgCrypt;