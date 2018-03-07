/**
 * @author xialeistduio<xialeistudio@gmail.com>
 * @date 16-12-5
 */
/**
 * buffer编码转换器
 */
export default class BufferConverter {
  /**
   *
   * @param data
   * @param desEncoding
   * @param srcEncoding
   * @returns {String}
   */
  static converter (data, desEncoding = 'base64', srcEncoding = 'binary') {
    return new Buffer(data, srcEncoding).toString(desEncoding);
  }
}