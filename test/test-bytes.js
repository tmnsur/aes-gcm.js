var bytes = require("../src/bytes");
var blocks = require("../src/blocks");
var hex = require("../src/hex");
var assert = require("assert");

describe("bytes", function() {
  describe("#checkBit() #setBit() #resetBit()", function() {
    it("should get, set, and reset bit", function() {
      var i;
      var values;

      assert.equal(0, bytes.checkBit([0], 0, 7));
      assert.equal(0, bytes.checkBit([0], 0, 6));
      assert.equal(0, bytes.checkBit([0], 0, 5));
      assert.equal(0, bytes.checkBit([0], 0, 4));
      assert.equal(0, bytes.checkBit([0], 0, 3));
      assert.equal(0, bytes.checkBit([0], 0, 2));
      assert.equal(0, bytes.checkBit([0], 0, 1));
      assert.equal(0, bytes.checkBit([0], 0, 0));

      assert.equal(0, bytes.checkBit([85], 0, 7));
      assert.equal(1, bytes.checkBit([85], 0, 6));
      assert.equal(0, bytes.checkBit([85], 0, 5));
      assert.equal(1, bytes.checkBit([85], 0, 4));
      assert.equal(0, bytes.checkBit([85], 0, 3));
      assert.equal(1, bytes.checkBit([85], 0, 2));
      assert.equal(0, bytes.checkBit([85], 0, 1));
      assert.equal(1, bytes.checkBit([85], 0, 0));

      assert.equal(1, bytes.checkBit([170], 0, 7));
      assert.equal(0, bytes.checkBit([170], 0, 6));
      assert.equal(1, bytes.checkBit([170], 0, 5));
      assert.equal(0, bytes.checkBit([170], 0, 4));
      assert.equal(1, bytes.checkBit([170], 0, 3));
      assert.equal(0, bytes.checkBit([170], 0, 2));
      assert.equal(1, bytes.checkBit([170], 0, 1));
      assert.equal(0, bytes.checkBit([170], 0, 0));

      assert.equal(1, bytes.checkBit([255], 0, 7));
      assert.equal(1, bytes.checkBit([255], 0, 6));
      assert.equal(1, bytes.checkBit([255], 0, 5));
      assert.equal(1, bytes.checkBit([255], 0, 4));
      assert.equal(1, bytes.checkBit([255], 0, 3));
      assert.equal(1, bytes.checkBit([255], 0, 2));
      assert.equal(1, bytes.checkBit([255], 0, 1));
      assert.equal(1, bytes.checkBit([255], 0, 0));

      for(i = 0; i < 256; i++) {
        values = [0, 0, i, 0];
        if(i % 2) {
          assert.equal(1, bytes.checkBit(values, 2, 0));
          bytes.resetBit(values, 2, 0);
          assert.equal(0, bytes.checkBit(values, 2, 0));
        } else {
          assert.equal(0, bytes.checkBit(values, 2, 0));
          bytes.setBit(values, 2, 0);
          assert.equal(1, bytes.checkBit(values, 2, 0));
        }
      }
    });
  });

  describe("#checkBit()", function() {
    it("should checkBit", function() {
      var i;
      var j;
      var k = 0;
      var block = hex.fromHex("7b5b54657374566563746f725d53475d");
      var expected = [0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0,
        1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0,
        1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0,
        1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1];
      var expectedLSB = expected.slice().reverse();

      for(i = 0; i < 16; i++) {
        for(j = 7; j != -1; j--) {
          assert.equal(expected[k++], bytes.checkBit(block, i, j));
        }
      }

      for(i = 0; i < 128; i++) {
        assert.equal(expectedLSB[i], bytes.checkBit(block, 15, 0));
        block = blocks.rightShift(block);
      }
    });
  });

  describe("#getBytes()", function() {
    it("should getBytes", function() {
      assert.deepEqual([0x00, 0x00, 0x00, 0x00], bytes.getBytes(0x00));
      assert.deepEqual([0x00, 0x00, 0x02, 0x01], bytes.getBytes(0x0201));
      assert.deepEqual([0x04, 0x03, 0x02, 0x01], bytes.getBytes(0x04030201));
      assert.deepEqual([0x04, 0x03, 0x02, 0x01], bytes.getBytes(0x0504030201));
    });
  });
});
