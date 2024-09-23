Hasher
==========

This is a Node module for hashing and verifying inputs using the
KaWPoW Proof-Of-Work algorithm as implemented by BetGenius Core. 

## Install ##
__Install as Dependency in NodeJS Project__
```bash
# Install from Github git package

sudo apt-get install build-essential
npm install BetGenius/hasher --save
```
__Install & Test__
```bash
# Install dependencies
sudo apt-get install build-essential

# Download hasher
git clone https://github.com/BetGenius/hasher

# build
cd hasher
npm install

# test
npm run test
``` 

## Usage ##
__Hash__
```javascript
const hasher = require("hasher");

const mixOutBuf = Buffer.alloc(32);
const hashOutBuf = Buffer.alloc(32);

/**
 * Hash using a single nonce and place results into the specified output Buffers.
 *
 * Note that all input values are expected to be in little-endian format.
 *
 * All output values are in little endian format
 *
 * @param headerHashBuf {Buffer} 32-byte header hash
 * @param nonceBuf {Buffer} 8-byte nonce value (64-bits)
 * @param blockHeight {number} Block height integer
 * @param mixOutBuf {Buffer} Mix hash result output Buffer
 * @param hashOutBuf {Buffer} Hash result output Buffer
 */
hasher.hash(headerHashBuf, nonceBuf, blockHeight, mixOutBuf, hashOutBuf);

console.log(mixHashBuf.toString("hex"));
console.log(hashOutBuf.toString("hex"));

```

__Verify__
```javascript
const hasher = require("hasher");

const hashValueOut = Buffer.alloc(32);

/**
 * Verify a mix hash.
 *
 * Note that all input values are expected to be in little-endian format.
 *
 * All output values are in little endian format.
 *
 * @param headerHashBuf {Buffer} 32-byte header hash
 * @param nonceBuf {Buffer} 8-byte nonce value (64-bits)
 * @param blockHeight {number} Block height integer
 * @param mixHashBuf {Buffer} Mix hash for verification
 * @param hashOutBuf {Buffer} Hash result output Buffer
 * @returns {boolean} True if valid, otherwise false.
 */
const isValid = hasher.verify(headerHashBuf, nonceBuf, blockHeight, mixHashBuf, hashValueOut);

if (isValid) {
    console.log(hashValueOut.toString("hex"));
}
else {
    console.log('Invalid');
}
```
