/**
 * @author xialeistduio<xialeistudio@gmail.com>
 * @date 16-12-5
 */
import {parseString} from 'xml2js';
export default class XMLParser {
  /**
   * 生成密文
   * @param encrypt
   * @param signature
   * @param timestamp
   * @param nonce
   * @returns {string}
   */
  static generate (encrypt, signature, timestamp, nonce) {
    return `<xml>
<Encrypt><![CDATA[${encrypt}]]></Encrypt>
<MsgSignature><![CDATA[${signature}]]></MsgSignature>
<TimeStamp>${timestamp}</TimeStamp>
<Nonce><![CDATA[${nonce}]]></Nonce>
</xml>`;
  }

  /**
   * xml2js
   * @param postData
   * @returns {Promise}
   */
  static extrace (postData) {
    return new Promise((resolve, reject) => {
      parseString(postData, {explicitArray: false, ignoreAttrs: true}, (e, result) => {
        if (e) {
          return reject(e);
        }
        return resolve(result);
      });
    });
  }
}