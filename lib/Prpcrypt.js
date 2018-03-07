'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _BufferConverter = require('./BufferConverter');

var _BufferConverter2 = _interopRequireDefault(_BufferConverter);

var _PKCS7Encoder = require('./PKCS7Encoder');

var _PKCS7Encoder2 = _interopRequireDefault(_PKCS7Encoder);

var _mcrypt = require('mcrypt');

var _mcrypt2 = _interopRequireDefault(_mcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Prpcrypt = function () {
  function Prpcrypt(key) {
    (0, _classCallCheck3.default)(this, Prpcrypt);
    var key2 = key+"="
    this.key = _BufferConverter2.default.converter(key2, 'binary', 'base64');
  }

  (0, _createClass3.default)(Prpcrypt, [{
    key: 'getIv',
    value: function getIv() {
      var key = new Buffer(this.key, 'binary');
      var iv = new Buffer(16);
      key.copy(iv, 0, 0, 16);
      return iv.toString('binary');
    }

    /**
     * Pack
     * @param number
     * @param encoding
     * @returns {String}
     */

  }, {
    key: 'encrypt',


    /**
     * 加密
     * @param text
     * @param appid
     * @returns {*}
     */
    value: function encrypt(text, appid) {
      var random = Prpcrypt.getRandomString();
      text = random + Prpcrypt.pack(Buffer.byteLength(text)) + text + appid;
      text = _PKCS7Encoder2.default.encode(text);
      return this.aes128encrypt(text);
    }

    /**
     * 解密
     * @param encrypt
     * @param appId
     */

  }, {
    key: 'decrypt',
    value: function decrypt(encrypt, appId) {
      var decoded = this.aes128descrypt(new Buffer(encrypt, 'base64')); //pass
      //去除补位
      var result = _PKCS7Encoder2.default.decode(decoded); //pass
      if (result.length < 16) {
        return '';
      }
      result = new Buffer(result, 'binary');
      var content = new Buffer(result.length - 16);
      result.copy(content, 0, 16, result.length);
      var packBuffer = new Buffer(4);
      content.copy(packBuffer, 0, 0, 4);
      var xml_len = Prpcrypt.unpack(packBuffer);
      var xml_content = new Buffer(xml_len);
      content.copy(xml_content, 0, 4, xml_len + 4);
      var from_appid = new Buffer(content.length - xml_len - 4);
      content.copy(from_appid, 0, xml_len + 4);
      if (from_appid.toString() != appId) {
        throw new Error('appId is invalid');
      }
      return xml_content.toString();
    }

    /**
     * aes128解密
     * @param data
     * @returns {*}
     */

  }, {
    key: 'aes128descrypt',
    value: function aes128descrypt(data) {
      var cipher = new _mcrypt2.default.MCrypt('rijndael-128', 'cbc');
      cipher.open(new Buffer(this.key, 'binary'), new Buffer(this.getIv(), 'binary'));
      return cipher.decrypt(data).toString('binary');
    }

    /**
     * MCRYPT_RIJNDAEL_128,MCRYPT_MODE_CBC
     * @param data
     * @returns {*}
     */

  }, {
    key: 'aes128encrypt',
    value: function aes128encrypt(data) {
      // var keykey = new Buffer(this.key, 'binary')
      // var iviv = new Buffer(this.getIv(), 'binary')
      // console.log(Buffer.byteLength('aaa'))
      // console.log(iviv.length)
      // var cipher = _crypto.createCipheriv('aes-256-cbc', keykey, iviv)
      // var crypted = cipher.update(data, 'utf8', 'binary');
      // crypted += cipher.final('binary');
      // crypted = new Buffer(crypted, 'binary').toString('base64');
      // return crypted;

      var cipher = new _mcrypt2.default.MCrypt('rijndael-128', 'cbc');
      cipher.open(new Buffer(this.key, 'binary'), new Buffer(this.getIv(), 'binary'));
      // console.log(cipher.encrypt(data))
      // console.log(cipher.encrypt(data).toString('base64'))
      return cipher.encrypt(data).toString('base64');
    }

    /**
     * 随机字符串
     * @param length
     * @returns {string}
     */

  }], [{
    key: 'pack',
    value: function pack(number) {
      var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'binary';

      var buffer = new Buffer(4);
      buffer.writeUInt32BE(number);
      return buffer.toString(encoding);
    }

    /**
     * unpack
     * @param binary
     * @param encoding
     * @returns {Number}
     */

  }, {
    key: 'unpack',
    value: function unpack(binary) {
      var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'binary';

      var buffer = new Buffer(binary, encoding);
      return buffer.readUInt32BE();
    }
  }, {
    key: 'getRandomString',
    value: function getRandomString() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

      if (process.env.NODE_ENV === 'test') {
        return '1111111111111111';
      }
      var strs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
      var dist = [];
      for (var i = 0; i < length; i++) {
        dist.push(strs[Math.floor(Math.random() * strs.length)]);
      }
      return dist.join('');
    }
  }]);
  return Prpcrypt;
}(); /**
      * @author xialeistduio<xialeistudio@gmail.com>
      * @date 16-12-5
      */


exports.default = Prpcrypt;