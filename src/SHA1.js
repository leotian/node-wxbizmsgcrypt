/**
 * @author xialeistduio<xialeistudio@gmail.com>
 * @date 16-12-5
 */
import crypto from 'crypto';
export default class SHA1 {
  static getSHA1 (token, timestamp, nonce, encrypt_msg) {
    let array = [token, timestamp, nonce, encrypt_msg];
    array = array.sort();
    array = array.join('');
    const sha1 = crypto.createHash('sha1');
    sha1.update(array);
    return sha1.digest('hex');
  }
}