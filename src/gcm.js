(function(factory) {
  if("object" === typeof(exports)) {
    module.exports = factory({
      bytes: require("./bytes"),
      blocks: require("./blocks"),
      aes: require("./aes")
    });
  }
} (function(imports) {
  function ghash(input, hashSubKey) {
    var i;
    var result = imports.blocks.createZeroBlock(16);

    for(i = 0; i < input.length; i += 16) {
      result = imports.blocks.multiply(imports.blocks.exclusiveOR(result,
          input.slice(i, Math.min(i + 16, input.length))), hashSubKey);
    }

    return result;
  };

  function gctr(input, initialCounterBlock, key) {
    var n;
    var i;
    var j;
    var y;
    var counterBlock = initialCounterBlock;
    var output = [];

    if(0 === input.length) {
      return input;
    }

    n = Math.ceil(input.length / 16);
    for(i = 0; i < n; i++) {
      y = imports.blocks.exclusiveOR(input.slice(i * 16, Math.min((i + 1) * 16, input.length)),
          imports.aes.encrypt(counterBlock, key));

      for(j = 0; j < y.length; j++) {
        output.push(y[j]);
      }

      if(i + 1 < n) {
        counterBlock = imports.blocks.incrementLeastSignificantThirtyTwoBits(counterBlock);
      }
    }

    return output;
  };

  function authenticatedEncryption(plainText, additionalAuthenticatedData, initializationVector, key) {
    var i;
    var preCounterBlock;
    var cipherText;
    var plainTag;
    var hashSubKey = imports.aes.encrypt(imports.blocks.createZeroBlock(16), key);

    preCounterBlock = [].concat(initializationVector);
    if(12 === initializationVector.length) {
      preCounterBlock = preCounterBlock.concat(imports.blocks.createZeroBlock(3)).concat([0x01]);
    } else {
      if(0 !== initializationVector.length % 16) {
        preCounterBlock = preCounterBlock.concat(imports.blocks
            .createZeroBlock(16 - (initializationVector.length % 16)));
      }

      preCounterBlock = preCounterBlock.concat(imports.blocks.createZeroBlock(8));

      preCounterBlock = ghash(preCounterBlock.concat(imports.blocks.createZeroBlock(4))
               .concat(imports.bytes.getBytes(initializationVector.length * 8)), hashSubKey);
    }

    cipherText = gctr(plainText, imports.blocks.incrementLeastSignificantThirtyTwoBits(preCounterBlock), key);

    additionalAuthenticatedDataLength = additionalAuthenticatedData.length;
    cipherTextLength = cipherText.length;

    plainTag = additionalAuthenticatedData.slice();

    if(0 === additionalAuthenticatedData.length) {
      plainTag = plainTag.concat(imports.blocks.createZeroBlock(16));
    } else if(0 !== additionalAuthenticatedData.length % 16) {
      plainTag = plainTag.concat(imports.blocks.createZeroBlock(16 - (additionalAuthenticatedData.length % 16)));
    }

    plainTag = plainTag.concat(cipherText);

    if(0 === cipherText.length) {
      plainTag = plainTag.concat(imports.blocks.createZeroBlock(16));
    } else if(0 !== cipherText.length % 16) {
      plainTag = plainTag.concat(imports.blocks.createZeroBlock(16 - (cipherText.length % 16)));
    }

    plainTag = plainTag.concat(imports.blocks.createZeroBlock(4))
        .concat(imports.bytes.getBytes(additionalAuthenticatedData.length * 8))
        .concat(imports.blocks.createZeroBlock(4)).concat(imports.bytes.getBytes(cipherText.length * 8));

    return {
      cipherText: cipherText,
      authenticationTag: gctr(ghash(plainTag, hashSubKey), preCounterBlock, key)
    };
  };

  return {
    ghash: ghash,
    encrypt: authenticatedEncryption
  };
}));
