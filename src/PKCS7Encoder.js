/**
 * @author xialeistduio<xialeistudio@gmail.com>
 * @date 16-12-5
 */
/**
 * PKCS7补位
 */
export default class PKCS7Encoder {
  static block_size = 32;

  /**
   * 补位
   * @param text
   * @returns {string}
   */
  static encode (text) {
    const text_length = text.length;
    //计算需要填充的位数
    let amount_to_pad = PKCS7Encoder.block_size - (text_length % PKCS7Encoder.block_size);
    //计算需要填充的位数
    if (amount_to_pad === 0) {
      amount_to_pad = PKCS7Encoder.block_size;
    }

    //获得补位所用的字符
    let pad = String.fromCharCode(amount_to_pad), s = [];
    for (let i = 0; i < amount_to_pad; i++) {
      s.push(pad);
    }
    return text + s.join('');
  }

  /**
   * 删除补位
   * @param text
   * @returns {string|*}
   */
  static decode (text) {
    const buffer = new Buffer(text, 'binary');
    let pad = buffer[buffer.length - 1];
    if (pad < 1 || pad > 32) {
      pad = 0;
    }
    return text.substr(0, text.length - pad);
  }
}