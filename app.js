const hasher = require('bindings')('hasher.node');

module.exports = {

    /**
     * Hash using a single nonce and place results into the specified output Buffers.
     *
     * Note that all input values are expected to be in little-endian format.
     *
     * All output values are in little endian format.
     *
     * @param headerHashBuf {Buffer} 32-byte header hash
     * @param nonceBuf {Buffer} 8-byte nonce value (64-bits)
     * @param blockHeight {number} Block height integer
     * @param mixOutBuf {Buffer} Mix hash result output Buffer
     * @param hashOutBuf {Buffer} Hash result output Buffer
     */
    hash: hash,

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
     * @param hashMIxBuf {Buffer} Mix hash for verification
     * @param hashOutBuf {Buffer} Hash result output Buffer
     * @returns {boolean} True if valid, otherwise false.
     */
    verify: verify
};

function hash(headerHashBuf, nonceBuf, blockHeight, mixOutBuf, hashOutBuf) {

    expectBuffer(headerHashBuf, 'headerHashBuf', 32);
    expectBuffer(nonceBuf, 'nonceBuf', 8);
    expectInteger(blockHeight, 'blockHeight');
    expectBuffer(mixOutBuf, 'mixOutBuf', 32);
    expectBuffer(hashOutBuf, 'hashOutBuf', 32);

    hasher.hash(headerHashBuf, nonceBuf, blockHeight, mixOutBuf, hashOutBuf);
}

function verify(headerHashBuf, nonceBuf, blockHeight, hashMIxBuf, hashOutBuf) {

    expectBuffer(headerHashBuf, 'headerHashBuf', 32);
    expectBuffer(nonceBuf, 'nonceBuf', 8);
    expectInteger(blockHeight, 'blockHeight');
    expectBuffer(hashMIxBuf, 'mixOutBuf', 32);
    expectBuffer(hashOutBuf, 'hashOutBuf', 32);

    return hasher.verify(headerHashBuf, nonceBuf, blockHeight, hashMIxBuf, hashOutBuf);
}

function expectBuffer(buffer, name, size) {
    if (!Buffer.isBuffer(buffer))
        throw new Error(`"${name}" is expected to be a Buffer. Got ${(typeof buffer)} instead.`);

    if (size && buffer.length !== size)
        throw new Error(`"${name}" is expected to be exactly ${size} bytes. Got ${buffer.length} instead.`);
}

function expectInteger(num, name) {
    if (typeof num !== 'number')
        throw new Error(`"${name}" is expected to be a number. Got ${(typeof num)} instead.`);

    if (isNaN(num) || !isFinite(num))
        throw new Error(`"${name}" is not a number.`);

    if (!Number.isInteger(num))
        throw new Error(`"${name}" is expected to be an integer. Got ${num} instead.`);
}
