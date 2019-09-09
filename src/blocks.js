(function(factory) {
  if("object" === typeof(exports)) {
    module.exports = factory({bytes: require("./bytes")});
  }
} (function(imports) {
  var createZeroBlock = function(length) {
    var i;
    var result = [];

    for(i = 0; i < length; i++) {
      result.push(0x00);
    }

    return result;
  };

  var R = [0xe1].concat(createZeroBlock(15));

  var exclusiveOR = function(block0, block1) {
    var i;
    var result = [];

    for(i = 0; i < block0.length; i++) {
      result[i] = block0[i] ^ block1[i];
    }

    return result;
  };

  var rightShift = function(block) {
    var i;
    var carry = 0;
    var oldCarry = 0;

    for(i = 0; i < block.length; i++) {
      oldCarry = carry;
      carry = block[i] & 0x01;
      block[i] = block[i] >> 1;

      if(oldCarry) {
        block[i] = block[i] | 0x80;
      }
    }

    return block;
  }

  var multiply = function(block0, block1) {
    var i;
    var j;
    var index;
    var mask;
    var v = block1.slice();
    var z = createZeroBlock(16);

    for(i = 0; i < 16; i++) {
      for(j = 7; j != -1; j--) {
        if(imports.bytes.checkBit(block0, i, j)) {
          z = exclusiveOR(z, v);
        }

        if(imports.bytes.checkBit(v, 15, 0)) {
          v = exclusiveOR(rightShift(v), R);
        } else {
          v = rightShift(v);
        }
      }
    }

    return z;
  };

  var incrementLeastSignificantThirtyTwoBits = function(block) {
    var i;
    var result = block.slice();
    for(i = 15; i != 11; i--) {
      result[i] = result[i] + 1;

      if(256 === result[i]) {
        result[i] = 0;
      } else {
        break;
      }
    }

    return result;
  };

  var createCompletingPart = function(partialBlock) {
    var result = [];
    var partialPartLength = partialBlock.length % 16;

    if(partialPartLength) {
      for(i = 0; i < 16 - partialPartLength; i++) {
        result.push(0x00);
      }
    }

    return result;
  };

  return {
    exclusiveOR: exclusiveOR,
    multiply: multiply,
    rightShift: rightShift,
    incrementLeastSignificantThirtyTwoBits: incrementLeastSignificantThirtyTwoBits,
    createCompletingPart: createCompletingPart,
    createZeroBlock: createZeroBlock
  };
}));
