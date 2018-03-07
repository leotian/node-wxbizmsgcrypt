/**
 * @author xialeistduio<xialeistudio@gmail.com>
 * @date 16-12-5
 */
import BufferConverter from './BufferConverter';
import PKCS7Encoder from './PKCS7Encoder';
import mcrypt from 'mcrypt';
export default class Prpcrypt {

  constructor (key) {
    this.key = BufferConverter.converter(key, 'binary', 'base64');
  }

  getIv () {
    const key = new Buffer(this.key, 'binary');
    const iv = new Buffer(16);
    key.copy(iv, 0, 0, 16);
    return iv.toString('binary');
  }

  /**
   * Pack
   * @param number
   * @param encoding
   * @returns {String}
   */
  static pack (number, encoding = 'binary') {
    const buffer = new Buffer(4);
    buffer.writeUInt32BE(number);
    return buffer.toString(encoding);
  }

  /**
   * unpack
   * @param binary
   * @param encoding
   * @returns {Number}
   */
  static unpack (binary, encoding = 'binary') {
    const buffer = new Buffer(binary, encoding);
    return buffer.readUInt32BE();
  }

  /**
   * 加密
   * @param text
   * @param appid
   * @returns {*}
   */
  encrypt (text, appid) {
    const random = Prpcrypt.getRandomString();
    text = random + Prpcrypt.pack(text.length) + text + appid;
    text = PKCS7Encoder.encode(text);
    return this.aes128encrypt(text);
  }

  /**
   * 解密
   * @param encrypt
   * @param appId
   */
  decrypt (encrypt, appId) {
    const decoded = this.aes128descrypt(new Buffer(encrypt, 'base64'));//pass
    //去除补位
    let result = PKCS7Encoder.decode(decoded);//pass
    if (result.length < 16) {
      return '';
    }
    result = new Buffer(result, 'binary');
    let content = new Buffer(result.length - 16);
    result.copy(content, 0, 16, result.length);
    let packBuffer = new Buffer(4);
    content.copy(packBuffer, 0, 0, 4);
    let xml_len = Prpcrypt.unpack(packBuffer);
    let xml_content = new Buffer(xml_len);
    content.copy(xml_content, 0, 4, xml_len + 4);
    let from_appid = new Buffer(content.length - xml_len - 4);
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
  aes128descrypt (data) {
    const cipher = new mcrypt.MCrypt('rijndael-128', 'cbc');
    cipher.open(new Buffer(this.key, 'binary'), new Buffer(this.getIv(), 'binary'));
    return cipher.decrypt(data).toString('binary');
  }

  /**
   * MCRYPT_RIJNDAEL_128,MCRYPT_MODE_CBC
   * @param data
   * @returns {*}
   */
  aes128encrypt (data) {
    const cipher = new mcrypt.MCrypt('rijndael-128', 'cbc');
    cipher.open(new Buffer(this.key, 'binary'), new Buffer(this.getIv(), 'binary'));
    return cipher.encrypt(data).toString('base64');
  }

  /**
   * 随机字符串
   * @param length
   * @returns {string}
   */
  static getRandomString (length = 16) {
    if (process.env.NODE_ENV === 'test') {
      return '1111111111111111';
    }
    const strs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    const dist = [];
    for (let i = 0; i < length; i++) {
      dist.push(strs[Math.floor(Math.random() * strs.length)]);
    }
    return dist.join('');
  }
}