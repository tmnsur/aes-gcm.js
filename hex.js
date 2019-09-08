(function(root, factory) {
  if("function" === typeof(define) && define.amd) {
    define([], factory);
  } else if("object" === typeof(exports)) {
    module.exports = factory();
  } else {
    root.hex = factory();
  }
} (this, function() {
  function toHexChar(nibble) {
    if(nibble < 10) {
      return String.fromCharCode(48 + nibble);
    }

    return String.fromCharCode(87 + nibble);
  }

  function fromHexChar(hexChar) {
    if('9' < hexChar) {
      return hexChar.charCodeAt(0) - 87;
    }

    return hexChar.charCodeAt(0) - 48;
  }

  function toHex(byteArray) {
    var i;
    var temp;
    var result = [];

    for(i = 0; i < byteArray.length; i++) {
      result.push(toHexChar((byteArray[i] & 0xF0) >> 4));
      result.push(toHexChar(byteArray[i] & 0x0F));
    }

    return result.join('');
  }

  function fromHex(hex) {
    var i;
    var result = [];

    for(i = 0; i < hex.length; i += 2) {
      result.push((fromHexChar(hex[i]) << 4) | (fromHexChar(hex[i + 1])));
    }

    return result;
  }

  return {
    toHex: toHex,
    fromHex: fromHex
  };
}));
