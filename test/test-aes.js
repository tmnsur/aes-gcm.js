var assert = require("assert");
var aes = require("../src/aes");
var hex = require("../src/hex");

describe("aes", function() {
  describe("#encrypt()", function() {
    it("should encrypt: AES-128", function() {
      assert.deepEqual(hex.fromHex("69c4e0d86a7b0430d8cdb78070b4c55a"),
        aes.encrypt(hex.fromHex("00112233445566778899aabbccddeeff"), hex.fromHex("000102030405060708090a0b0c0d0e0f")));
    });

    it("should encrypt: AES-192", function() {
      assert.deepEqual(hex.fromHex("dda97ca4864cdfe06eaf70a0ec0d7191"),
        aes.encrypt(hex.fromHex("00112233445566778899aabbccddeeff"),
          hex.fromHex("000102030405060708090a0b0c0d0e0f1011121314151617")));
    });

    it("should encrypt: AES-256", function() {
      assert.deepEqual(hex.fromHex("8ea2b7ca516745bfeafc49904b496089"),
        aes.encrypt(hex.fromHex("00112233445566778899aabbccddeeff"),
          hex.fromHex("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f")))
    });

    it("should encrypt", function() {
      assert.deepEqual(hex.fromHex("66e94bd4ef8a2c3b884cfa59ca342b2e"),
        aes.encrypt(hex.fromHex("00000000000000000000000000000000"), hex.fromHex("00000000000000000000000000000000")));
      assert.deepEqual(hex.fromHex("c6a13b37878f5b826f4f8162a1c8d879"),
        aes.encrypt(hex.fromHex("00000000000000000000000000000000"), hex.fromHex("000102030405060708090a0b0c0d0e0f")));
      assert.deepEqual(hex.fromHex("73a23d80121de2d5a850253fcf43120e"),
        aes.encrypt("00000000000000000000000000000000", hex.fromHex("ad7a2bd03eac835a6f620fdcb506b345")));
    })
  });
});
