var blocks = require("../src/blocks");
var hex = require("../src/hex");
var assert = require("assert");

describe("blocks", function() {
  describe("#exclusiveOR()", function() {
    it("should exclusiveOR", function() {
      assert.deepEqual([0xFF, 0xF7, 0x7F, 0x0F, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
          blocks.exclusiveOR([0xF0, 0xF8, 0x7F, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00], [0x0F, 0x0F, 0x00, 0xF0]));

      assert.deepEqual([0xFF, 0xF7, 0x7F, 0x0F],
          blocks.exclusiveOR([0xF0, 0xF8, 0x7F, 0xFF], [0x0F, 0x0F, 0x00, 0xF0]));
    });
  });

  describe("#rightShift()", function() {
    it("should rightShift", function() {
      assert.deepEqual(hex.fromHex("3dadaa32b9ba2b32b1ba37b92ea9a3ae"),
        blocks.rightShift(hex.fromHex("7b5b54657374566563746f725d53475d")));
    });
  });

  describe("#multiply()", function() {
    it("should multiply", function() {
      assert.deepEqual(hex.fromHex("da53eb0ad2c55bb64fc4802cc3feda60"),
        blocks.multiply(hex.fromHex("952b2a56a5604ac0b32b6656a05b40b6"),
          hex.fromHex("dfa6bf4ded81db03ffcaff95f830f061")));
    });

    it("should commutatively multiply", function() {
      assert.deepEqual(blocks.multiply(hex.fromHex("48692853686179295b477565726f6e5d"),
        hex.fromHex("7b5b54657374566563746f725d53475d")),
        blocks.multiply(hex.fromHex("7b5b54657374566563746f725d53475d"),
          hex.fromHex("48692853686179295b477565726f6e5d")));
    });
  });

  describe("#incrementLeastSignificantThirtyTwoBits()", function() {
    it("should incrementLeastSignificantThirtyTwoBits", function() {
      assert.deepEqual(hex.fromHex("00000000000000000000000000000001"),
          blocks.incrementLeastSignificantThirtyTwoBits(hex.fromHex("00000000000000000000000000000000")));
      assert.deepEqual(hex.fromHex("00000000000000000000000000000100"),
          blocks.incrementLeastSignificantThirtyTwoBits(hex.fromHex("000000000000000000000000000000ff")));
      assert.deepEqual(hex.fromHex("00000000000000000000000001000000"),
          blocks.incrementLeastSignificantThirtyTwoBits(hex.fromHex("00000000000000000000000000ffffff")));
      assert.deepEqual(hex.fromHex("00000000000000000000000000000000"),
          blocks.incrementLeastSignificantThirtyTwoBits(hex.fromHex("000000000000000000000000ffffffff")))
    });
  });
});
