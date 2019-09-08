var hex = require("../hex");
var assert = require("assert");

describe("hex", function() {
  describe("#toHex()", function() {
    it("should convert values to hex values and back", function() {
      for(i = 0; i < 16; i++) {
        assert.equal("0" + i.toString(16), hex.toHex([i]));
        assert.equal(i, hex.fromHex(hex.toHex([i])));
      }

      for(i = 16; i < 256; i++) {
        assert.equal(i.toString(16), hex.toHex([i]));
        assert.equal(i, hex.fromHex(hex.toHex([i])));
      }
    });
  });
});

