var gcm = require("../src/gcm");
var hex = require("../src/hex");
var assert = require("assert");

describe("gcm", function() {
  describe("#ghash()", function() {
    it("should ghash", function() {
      assert.deepEqual(hex.fromHex("f38cbb1ad69223dcc3457ae5b6b0f885"),
          gcm.ghash(hex.fromHex("000000000000000000000000000000000388dace60b6a392f328c2b971b2fe780000000000000000000000"
              + "0000000080"), hex.fromHex("66e94bd4ef8a2c3b884cfa59ca342b2e")));
    });
  });

  describe("#encrypt()", function() {
    it("should encrypt: Test Case 1", function() {
      var output = gcm.encrypt([], [], hex.fromHex("000000000000000000000000"),
          hex.fromHex("00000000000000000000000000000000"));

      assert.deepEqual([], output.cipherText);
      assert.deepEqual(hex.fromHex("58e2fccefa7e3061367f1d57a4e7455a"), output.authenticationTag);
    });

    it("should encrypt: Test Case 2", function() {
      var output = gcm.encrypt(hex.fromHex("00000000000000000000000000000000"), [],
          hex.fromHex("000000000000000000000000"), hex.fromHex("00000000000000000000000000000000"));

      assert.deepEqual(hex.fromHex("0388dace60b6a392f328c2b971b2fe78"), output.cipherText);
      assert.deepEqual(hex.fromHex("ab6e47d42cec13bdf53a67b21257bddf"), output.authenticationTag);
    });

    it("should encrypt: Test Case 3", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
          + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b391aafd255"), [], hex.fromHex("cafebabefacedbaddecaf888"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("42831ec2217774244b7221b784d0d49ce3aa212f2c02a4e035c17e2329aca12e21d514b25466931c7d8"
          + "f6a5aac84aa051ba30b396a0aac973d58e091473f5985"), output.cipherText);
      assert.deepEqual(hex.fromHex("4d5c2af327cd64a62cf35abd2ba6fab4"), output.authenticationTag);
    });

    it("should encrypt: Test Case 4", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
          + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
            hex.fromHex("cafebabefacedbaddecaf888"), hex.fromHex("feffe9928665731c6d6a8f9467308308"));
      assert.deepEqual(hex.fromHex("42831ec2217774244b7221b784d0d49ce3aa212f2c02a4e035c17e2329aca12e21d514b25466931c7d8"
          + "f6a5aac84aa051ba30b396a0aac973d58e091"), output.cipherText);
      assert.deepEqual(hex.fromHex("5bc94fbc3221a5db94fae95ae7121a47"), output.authenticationTag);
    });

    it("should encrypt: Test Case 5", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
          + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("cafebabefacedbad"), hex.fromHex("feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("61353b4c2806934a777ff51fa22a4755699b2a714fcdc6f83766e5f97b6c742373806900e49f24b22b0"
          + "97544d4896b424989b5e1ebac0f07c23f4598"), output.cipherText);
      assert.deepEqual(hex.fromHex("3612d2e79e3b0785561be14aaca2fccb"), output.authenticationTag);
    });

    it("should encrypt: Test Case 6", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
          + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("9313225df88406e555909c5aff5269aa6a7a9538534f7da1e4c303d2a318a728c3c0c95156809539fcf0e2429a6b525416"
          + "aedbf5a0de6a57a637b39b"), hex.fromHex("feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("8ce24998625615b603a033aca13fb894be9112a5c3a211a8ba262a3cca7e2ca701e4a9a4fba43c90ccd"
          + "cb281d48c7c6fd62875d2aca417034c34aee5"), output.cipherText);
      assert.deepEqual(hex.fromHex("619cc5aefffe0bfa462af43c1699d050"), output.authenticationTag);
    });

    it("should encrypt: Test Case 7", function() {
      var output = gcm.encrypt([], [], hex.fromHex("000000000000000000000000"),
        hex.fromHex("000000000000000000000000000000000000000000000000"));

      assert.deepEqual([], output.cipherText);
      assert.deepEqual(hex.fromHex("cd33b28ac773f74ba00ed1f312572435"), output.authenticationTag);
    });

    it("should encrypt: Test Case 8", function() {
      var output = gcm.encrypt(hex.fromHex("00000000000000000000000000000000"), [],
        hex.fromHex("000000000000000000000000"), hex.fromHex("000000000000000000000000000000000000000000000000"));

      assert.deepEqual(hex.fromHex("98e7247c07f0fe411c267e4384b0f600"), output.cipherText);
      assert.deepEqual(hex.fromHex("2ff58d80033927ab8ef4d4587514f0fb"), output.authenticationTag);
    });

    it("should encrypt: Test Case 9", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
          + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b391aafd255"), [], hex.fromHex("cafebabefacedbaddecaf888"),
            hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c"));

      assert.deepEqual(hex.fromHex("3980ca0b3c00e841eb06fac4872a2757859e1ceaa6efd984628593b40ca1e19c7d773d00c144c525ac6"
          + "19d18c84a3f4718e2448b2fe324d9ccda2710acade256"), output.cipherText);
      assert.deepEqual(hex.fromHex("9924a7c8587336bfb118024db8674a14"), output.authenticationTag);
    });

    it("should encrypt: Test Case 10", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
          hex.fromHex("cafebabefacedbaddecaf888"), hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c"));

      assert.deepEqual(hex.fromHex("3980ca0b3c00e841eb06fac4872a2757859e1ceaa6efd984628593b40ca1e19c7d773d00c144c525ac6"
        + "19d18c84a3f4718e2448b2fe324d9ccda2710"), output.cipherText);
      assert.deepEqual(hex.fromHex("2519498e80f1478f37ba55bd6d27618c"), output.authenticationTag);
    });

    it("should encrypt: Test Case 11", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
          hex.fromHex("cafebabefacedbad"), hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c"));

      assert.deepEqual(hex.fromHex("0f10f599ae14a154ed24b36e25324db8c566632ef2bbb34f8347280fc4507057fddc29df9a471f75c66"
        + "541d4d4dad1c9e93a19a58e8b473fa0f062f7"), output.cipherText);
      assert.deepEqual(hex.fromHex("65dcc57fcf623a24094fcca40d3533f8"), output.authenticationTag);
    });

    it("should encrypt: Test Case 12", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
          hex.fromHex("9313225df88406e555909c5aff5269aa6a7a9538534f7da1e4c303d2a318a728c3c0c95156809539fcf0e2429a6b5254"
            + "16aedbf5a0de6a57a637b39b"), hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c"));

      assert.deepEqual(hex.fromHex("d27e88681ce3243c4830165a8fdcf9ff1de9a1d8e6b447ef6ef7b79828666e4581e79012af34ddd9e2f"
        + "037589b292db3e67c036745fa22e7e9b7373b"), output.cipherText);
      assert.deepEqual(hex.fromHex("dcf566ff291c25bbb8568fc3d376a6d9"), output.authenticationTag);
    });

    it("should encrypt: Test Case 13", function() {
      var output = gcm.encrypt([], [], hex.fromHex("000000000000000000000000"),
        hex.fromHex("0000000000000000000000000000000000000000000000000000000000000000"));

      assert.deepEqual([], output.cipherText);
      assert.deepEqual(hex.fromHex("530f8afbc74536b9a963b4f1c4cb738b"), output.authenticationTag);
    });

    it("should encrypt: Test Case 14", function() {
      var output = gcm.encrypt(hex.fromHex("00000000000000000000000000000000"), [],
        hex.fromHex("000000000000000000000000"),
        hex.fromHex("0000000000000000000000000000000000000000000000000000000000000000"));

      assert.deepEqual(hex.fromHex("cea7403d4d606b6e074ec5d3baf39d18"), output.cipherText);
      assert.deepEqual(hex.fromHex("d0d1c8a799996bf0265b98b5d48ab919"), output.authenticationTag);
    });

    it("should encrypt: Test Case 15", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b391aafd255"), [],
        hex.fromHex("cafebabefacedbaddecaf888"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("522dc1f099567d07f47f37a32a84427d643a8cdcbfe5c0c97598a2bd2555d1aa8cb08e48590dbb3da7b"
        + "08b1056828838c5f61e6393ba7a0abcc9f662898015ad"), output.cipherText);
      assert.deepEqual(hex.fromHex("b094dac5d93471bdec1a502270e3cc6c"), output.authenticationTag);
    });

    it("should encrypt: Test Case 16", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("cafebabefacedbaddecaf888"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("522dc1f099567d07f47f37a32a84427d643a8cdcbfe5c0c97598a2bd2555d1aa8cb08e48590dbb3da7b"
        + "08b1056828838c5f61e6393ba7a0abcc9f662"), output.cipherText);
      assert.deepEqual(hex.fromHex("76fc6ece0f4e1768cddf8853bb2d551b"), output.authenticationTag);
    });

    it("should encrypt: Test Case 17", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"),
        hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("cafebabefacedbad"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("c3762df1ca787d32ae47c13bf19844cbaf1ae14d0b976afac52ff7d79bba9de0feb582d33934a4f0954"
        + "cc2363bc73f7862ac430e64abe499f47c9b1f"), output.cipherText);
      assert.deepEqual(hex.fromHex("3a337dbf46a792c45e454913fe2ea8f2"), output.authenticationTag);
    });

    it("should encrypt: Test Case 18", function() {
      var output = gcm.encrypt(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"),
        hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("9313225df88406e555909c5aff5269aa6a7a9538534f7da1e4c303d2a318a728c3c0c95156809539fcf0e2429a6b525416"
          + "aedbf5a0de6a57a637b39b"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("5a8def2f0c9e53f1f75d7853659e2a20eeb2b22aafde6419a058ab4f6f746bf40fc0c3b780f244452da"
        + "3ebf1c5d82cdea2418997200ef82e44ae7e3f"), output.cipherText);
      assert.deepEqual(hex.fromHex("a44a8266ee1c8eb0c8b5d4cf5ae9f19a"), output.authenticationTag);
    });
  });













  describe("#decrypt()", function() {
    it("should decrypt: Test Case 1", function() {
      var output = gcm.decrypt([], [], hex.fromHex("000000000000000000000000"),
          hex.fromHex("58e2fccefa7e3061367f1d57a4e7455a"),
          hex.fromHex("00000000000000000000000000000000"));

      assert.deepEqual([], output.plainText);
    });

    it("should decrypt: Test Case 2", function() {
      var output = gcm.decrypt(hex.fromHex("0388dace60b6a392f328c2b971b2fe78"), [],
          hex.fromHex("000000000000000000000000"),
          hex.fromHex("ab6e47d42cec13bdf53a67b21257bddf"),
          hex.fromHex("00000000000000000000000000000000"));

      assert.deepEqual(hex.fromHex("00000000000000000000000000000000"), output.plainText);
    });

    it("should decrypt: Test Case 3", function() {
      var output = gcm.decrypt(hex.fromHex("42831ec2217774244b7221b784d0d49ce3aa212f2c02a4e035c17e2329aca12e21d514b25466931c7d8"
        + "f6a5aac84aa051ba30b396a0aac973d58e091473f5985"), [],
        hex.fromHex("cafebabefacedbaddecaf888"),
        hex.fromHex("4d5c2af327cd64a62cf35abd2ba6fab4"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b391aafd255"), output.plainText);
    });

    it("should decrypt: Test Case 4", function() {
      var output = gcm.decrypt(hex.fromHex("42831ec2217774244b7221b784d0d49ce3aa212f2c02a4e035c17e2329aca12e21d514b25466931c7d8"
        + "f6a5aac84aa051ba30b396a0aac973d58e091"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
            hex.fromHex("cafebabefacedbaddecaf888"),
            hex.fromHex("5bc94fbc3221a5db94fae95ae7121a47"),
            hex.fromHex("feffe9928665731c6d6a8f9467308308"));
      
       assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), output.plainText);
    });

    it("should decrypt: Test Case 5", function() {
      var output = gcm.decrypt(hex.fromHex("61353b4c2806934a777ff51fa22a4755699b2a714fcdc6f83766e5f97b6c742373806900e49f24b22b0"
        + "97544d4896b424989b5e1ebac0f07c23f4598"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("cafebabefacedbad"),
        hex.fromHex("3612d2e79e3b0785561be14aaca2fccb"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), output.plainText);
    });

    it("should decrypt: Test Case 6", function() {
      var output = gcm.decrypt(hex.fromHex("8ce24998625615b603a033aca13fb894be9112a5c3a211a8ba262a3cca7e2ca701e4a9a4fba43c90ccd"
        + "cb281d48c7c6fd62875d2aca417034c34aee5"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("9313225df88406e555909c5aff5269aa6a7a9538534f7da1e4c303d2a318a728c3c0c95156809539fcf0e2429a6b525416"
          + "aedbf5a0de6a57a637b39b"),
          hex.fromHex("619cc5aefffe0bfa462af43c1699d050"),
          hex.fromHex("feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), output.plainText);
    });

    it("should decrypt: Test Case 7", function() {
      var output = gcm.decrypt([], [], hex.fromHex("000000000000000000000000"),
        hex.fromHex("cd33b28ac773f74ba00ed1f312572435"),
        hex.fromHex("000000000000000000000000000000000000000000000000"));

      assert.deepEqual([], output.plainText);
    });

    it("should decrypt: Test Case 8", function() {
      var output = gcm.decrypt(hex.fromHex("98e7247c07f0fe411c267e4384b0f600"), [],
        hex.fromHex("000000000000000000000000"),
        hex.fromHex("2ff58d80033927ab8ef4d4587514f0fb"),
        hex.fromHex("000000000000000000000000000000000000000000000000"));

      assert.deepEqual(hex.fromHex("00000000000000000000000000000000"), output.plainText);
    });

    it("should decrypt: Test Case 9", function() {
      var output = gcm.decrypt(hex.fromHex("3980ca0b3c00e841eb06fac4872a2757859e1ceaa6efd984628593b40ca1e19c7d773d00c144c525ac6"
        + "19d18c84a3f4718e2448b2fe324d9ccda2710acade256"), [], hex.fromHex("cafebabefacedbaddecaf888"),
            hex.fromHex("9924a7c8587336bfb118024db8674a14"),
            hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b391aafd255"), output.plainText);
    });

    it("should decrypt: Test Case 10", function() {
      var output = gcm.decrypt(hex.fromHex("3980ca0b3c00e841eb06fac4872a2757859e1ceaa6efd984628593b40ca1e19c7d773d00c144c525ac6"
        + "19d18c84a3f4718e2448b2fe324d9ccda2710"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
          hex.fromHex("cafebabefacedbaddecaf888"),
          hex.fromHex("2519498e80f1478f37ba55bd6d27618c"),
          hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), output.plainText);
    });

    it("should decrypt: Test Case 11", function() {
      var output = gcm.decrypt(hex.fromHex("0f10f599ae14a154ed24b36e25324db8c566632ef2bbb34f8347280fc4507057fddc29df9a471f75c66"
        + "541d4d4dad1c9e93a19a58e8b473fa0f062f7"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
          hex.fromHex("cafebabefacedbad"),
          hex.fromHex("65dcc57fcf623a24094fcca40d3533f8"),
          hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), output.plainText);
    });

    it("should decrypt: Test Case 12", function() {
      var output = gcm.decrypt(hex.fromHex("d27e88681ce3243c4830165a8fdcf9ff1de9a1d8e6b447ef6ef7b79828666e4581e79012af34ddd9e2f"
        + "037589b292db3e67c036745fa22e7e9b7373b"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
          hex.fromHex("9313225df88406e555909c5aff5269aa6a7a9538534f7da1e4c303d2a318a728c3c0c95156809539fcf0e2429a6b5254"
            + "16aedbf5a0de6a57a637b39b"),
          hex.fromHex("dcf566ff291c25bbb8568fc3d376a6d9"),
          hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), output.plainText);
    });

    it("should decrypt: Test Case 13", function() {
      var output = gcm.decrypt([], [], hex.fromHex("000000000000000000000000"),
        hex.fromHex("530f8afbc74536b9a963b4f1c4cb738b"),
        hex.fromHex("0000000000000000000000000000000000000000000000000000000000000000"));

      assert.deepEqual([], output.plainText);
    });

    it("should decrypt: Test Case 14", function() {
      var output = gcm.decrypt(hex.fromHex("cea7403d4d606b6e074ec5d3baf39d18"), [],
        hex.fromHex("000000000000000000000000"),
        hex.fromHex("d0d1c8a799996bf0265b98b5d48ab919"),
        hex.fromHex("0000000000000000000000000000000000000000000000000000000000000000"));

      assert.deepEqual(hex.fromHex("00000000000000000000000000000000"), output.plainText);
    });

    it("should decrypt: Test Case 15", function() {
      var output = gcm.decrypt(hex.fromHex("522dc1f099567d07f47f37a32a84427d643a8cdcbfe5c0c97598a2bd2555d1aa8cb08e48590dbb3da7b"
        + "08b1056828838c5f61e6393ba7a0abcc9f662898015ad"), [],
        hex.fromHex("cafebabefacedbaddecaf888"),
        hex.fromHex("b094dac5d93471bdec1a502270e3cc6c"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b391aafd255"), output.plainText);
    });

    it("should decrypt: Test Case 16", function() {
      var output = gcm.decrypt(hex.fromHex("522dc1f099567d07f47f37a32a84427d643a8cdcbfe5c0c97598a2bd2555d1aa8cb08e48590dbb3da7b"
        + "08b1056828838c5f61e6393ba7a0abcc9f662"), hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("cafebabefacedbaddecaf888"),
        hex.fromHex("76fc6ece0f4e1768cddf8853bb2d551b"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), output.plainText);
    });

    it("should decrypt: Test Case 17", function() {
      var output = gcm.decrypt(hex.fromHex("c3762df1ca787d32ae47c13bf19844cbaf1ae14d0b976afac52ff7d79bba9de0feb582d33934a4f0954"
        + "cc2363bc73f7862ac430e64abe499f47c9b1f"),
        hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("cafebabefacedbad"),
        hex.fromHex("3a337dbf46a792c45e454913fe2ea8f2"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), output.plainText);
    });

    it("should decrypt: Test Case 18", function() {
      var output = gcm.decrypt(hex.fromHex("5a8def2f0c9e53f1f75d7853659e2a20eeb2b22aafde6419a058ab4f6f746bf40fc0c3b780f244452da"
        + "3ebf1c5d82cdea2418997200ef82e44ae7e3f"),
        hex.fromHex("feedfacedeadbeeffeedfacedeadbeefabaddad2"),
        hex.fromHex("9313225df88406e555909c5aff5269aa6a7a9538534f7da1e4c303d2a318a728c3c0c95156809539fcf0e2429a6b525416"
          + "aedbf5a0de6a57a637b39b"),
        hex.fromHex("a44a8266ee1c8eb0c8b5d4cf5ae9f19a"),
        hex.fromHex("feffe9928665731c6d6a8f9467308308feffe9928665731c6d6a8f9467308308"));

      assert.deepEqual(hex.fromHex("d9313225f88406e5a55909c5aff5269a86a7a9531534f7da2e4c303d8a318a721c3c0c95956"
        + "809532fcf0e2449a6b525b16aedf5aa0de657ba637b39"), output.plainText);
    });
  });

});
