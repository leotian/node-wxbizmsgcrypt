/**
 * @author xialeistduio<xialeistudio@gmail.com>
 * @date 16-12-5
 */
import Prpcrypt from './Prpcrypt';
import SHA1 from './SHA1';
import XMLParser from './XMLParser';
export default class WxBizMsgCrypt {
  /**
   * 构造方法
   * @param token 公众平台上，开发者设置的token
   * @param encodingAesKey 公众平台上，开发者设置的EncodingAESKey
   * @param appId 公众平台的appId
   */
  constructor (token, encodingAesKey, appId) {
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
  encryptMsg (replyMsg, timestamp, nonce) {
    const pc = new Prpcrypt(this.encodingAesKey);
    const encrypt = pc.encrypt(replyMsg, this.appId);
    if (timestamp === null) {
      timestamp = parseInt(Date.now() / 1000).toString();
    }
    const sign = SHA1.getSHA1(this.token, timestamp, nonce, encrypt);
    return XMLParser.generate(encrypt, sign, timestamp, nonce);
  }

  /**
   * 解密
   * @param signature
   * @param timestamp
   * @param nonce
   * @param postData
   */
  async decryptMsg (signature, timestamp = null, nonce, postData) {
    if (this.encodingAesKey.length !== 43) {
      throw new Error('EncodingAesKey length must be 43');
    }
    const pc = new Prpcrypt(this.encodingAesKey);
    const json = await XMLParser.extrace(postData);
    const xml = json.xml;
    if (timestamp === null) {
      timestamp = parseInt(Date.now() / 1000);
    }

    const encrypt = xml.Encrypt;
    //验证签名
    const sign = SHA1.getSHA1(this.token, timestamp, nonce, encrypt);
    if (sign != signature) {
      throw new Error('signature invalid');
    }
    return pc.decrypt(encrypt, this.appId);
  }
}