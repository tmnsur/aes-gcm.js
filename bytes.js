(function(root, factory) {
  if("function" === typeof(define) && define.amd) {
    define([], factory);
  } else if("object" === typeof(exports)) {
    module.exports = factory();
  } else {
    root.bytes = factory();
  }
} (this, function() {
  var checkBit = function(byteArray, byteIndex, bitIndex) {
    return (byteArray[byteIndex] & (0x01 << bitIndex)) ? 1 : 0;
  };

  var setBit = function(byteArray, byteIndex, bitIndex) {
    byteArray[byteIndex] = byteArray[byteIndex] | 0x01 << bitIndex;
  };

  var resetBit = function(byteArray, byteIndex, bitIndex) {
    byteArray[byteIndex] = byteArray[byteIndex] & ~(0x01 << bitIndex);
  };

  var getBytes = function(numericValue) {
    return [
      (numericValue & 0xFF000000) >>> 24,
      (numericValue & 0x00FF0000) >> 16,
      (numericValue & 0x0000FF00) >> 8,
      numericValue & 0x000000FF
    ];
  };

  return {
    checkBit: checkBit,
    setBit: setBit,
    resetBit: resetBit,
    getBytes: getBytes
  };
}));
