const hasher = require('./app.js');

const testCases = [
    { blockHeight: 0, headerHash: "0000000000000000000000000000000000000000000000000000000000000000", nonce: "0000000000000000", expectedMixHash: "6e97b47b134fda0c7888802988e1a373affeb28bcd813b6e9a0fc669c935d03a", expectedHash: "e601a7257a70dc48fccc97a7330d704d776047623b92883d77111fb36870f3d1" },
    { blockHeight: 49, headerHash: "63155f732f2bf556967f906155b510c917e48e99685ead76ea83f4eca03ab12b", nonce: "0000000007073c07", expectedMixHash: "d36f7e815ee09e74eceb9c96993a3d681edf2bf0921fc7bb710364042db99777", expectedHash: "e7ced124598fd2500a55ad9f9f48e3569327fe50493c77a4ac9799b96efb9463" },
    { blockHeight: 50, headerHash: "9e7248f20914913a73d80a70174c331b1d34f260535ac3631d770e656b5dd922", nonce: "00000000076e482e", expectedMixHash: "d6dc634ae837e2785b347648ea515e25e5d8821ae0b95e1c2a9c2d497e0dcfbd", expectedHash: "ab0ad7ef8d8ee317dd12d10310aceed7321d34fb263791c2de5776a6658d177e" },
    { blockHeight: 99, headerHash: "de37e1824c86d35d154cf65a88de6d9286aec4f7f10c3fc9f0fa1bcc2687188d", nonce: "000000003917afab", expectedMixHash: "fa706860e5e0e830d5d1d7157e5bea7f5f8a350c7c8612ac1d1fcf2974d64244", expectedHash: "aa85340690f2e907054324a5021937910e15edfd1ef1577231843e7d32ec3a61" },
    { blockHeight: 29950, headerHash: "ac7b55e801511b77e11d52e9599206101550144525b5679f2dab19386f23dcce", nonce: "005d409dbc23a62a", expectedMixHash: "5359807b77a74878269c3a3044df8618a576ce8dc52e1c48d927d4a60e7c6b79", expectedHash: "022019e5408683f7f8326b4e46b42864a3a069f17b6151e434fcaedecaadd918" },
    { blockHeight: 29999, headerHash: "e43d7e0bdc8a4a3f6e291a5ed790b9fa1a0948a2b9e33c844888690847de19f5", nonce: "005db5fa4c2a3d03", expectedMixHash: "d15de3f9bfedd9b6d0f498273eb3b437115bdc8326c96c6457ac06deb5c9f389", expectedHash: "4e93630b81198752f876b24380999189b7b9366c08222ac05e4237b87114f305" },
    { blockHeight: 30000, headerHash: "d34519f72c97cae8892c277776259db3320820cb5279a299d0ef1e155e5c6454", nonce: "005db8607994ff30", expectedMixHash: "de0348b69bf91dfe2c3d3dba6f0132e9048a5284e57b8d9d20adc5f3dc0d3236", expectedHash: "c7953d848cda6e304f77b4c6d735645c8e8508a5e74c9e9814ef37b19087cd6c" },
    { blockHeight: 30049, headerHash: "8b6ce5da0b06d18db7bd8492d9e5717f8b53e7e098d9fef7886d58a6e913ef64", nonce: "005e2e215a8ca2e7", expectedMixHash: "975c6a9decc89cba7ace69338d4de8510d9619aef42b1d35d0bef7e0ce0614a9", expectedHash: "c262d8055e288d04b951a844bfca8ba529f5b4d652b408e3942727d7dd90957a" },
    { blockHeight: 30050, headerHash: "c2c46173481b9ced61123d2e293b42ede5a1b323210eb2a684df0874ffe09047", nonce: "005e30899481055e", expectedMixHash: "362f2fabdb9699d3634b6499703f939f378ee4eac803396c2b0ed0fe1d154972", expectedHash: "4cd7e6e79e0b63d42b2b06716a919ccc7834077ec727a9ea94edcdaff2fefab8" },
    { blockHeight: 30099, headerHash: "ea42197eb2ba79c63cb5e655b8b1f612c5f08aae1a49ff236795a3516d87bc71", nonce: "005ea6aef136f88b", expectedMixHash: "b1196457261bd05ccb387a8ff3fd02687bf496bd7943d89419465289669e27aa", expectedHash: "39d1ebfa783b61a6fa8e9747d0f9f134efae5cfba284a2c80e8deabae6b98676" },
    { blockHeight: 59950, headerHash: "49e15ba4bf501ce8fe8876101c808e24c69a859be15de554bf85dbc095491bd6", nonce: "02ebe0503bd7b1da", expectedMixHash: "df3dbb1669fd35dbb0ae96bbea2d498f0c6992cbddd092aeace42dd933505f95", expectedHash: "b8984cf4021c4433f753654848d721f33a0792b4417241f0cf7c7c2db011a54a" },
    { blockHeight: 59999, headerHash: "f5c50ba5c0d6210ddb16250ec3efda178de857b2b1703d8d5403bd0f848e19cf", nonce: "02edb6275bd221e3", expectedMixHash: "5017df70e97ca35638cf439cdbe54f30383d335e18eb4a74d6e166736f1038fa", expectedHash: "4cf1fa62f25b577ac822a6a28d55f8b7e3ae7fe983abd868ae00927e68c41016" },
    { blockHeight: 170915, headerHash: "5b3e8dfa1aafd3924a51f33e2d672d8dae32fa528d8b1d378d6e4db0ec5d665d", nonce: "0000000044975727", expectedMixHash: "efb29147484c434f1cc59629da90fd0343e3b047407ecd36e9ad973bd51bbac5", expectedHash: "e7e6bb3b2f9acd3864bc86f72f87237eaf475633ef650c726ac80eb0adf116b6" },
];

testCases.forEach(({ blockHeight, headerHash, nonce, expectedMixHash, expectedHash }) => {
    console.log(`\nTesting block height: ${blockHeight}`);
    const headerHashBuf = Buffer.from(headerHash, 'hex');
    const nonceBuf = hexToLE(nonce);

    // Hash data
    const hashResult = hash(headerHashBuf, nonceBuf, blockHeight, expectedMixHash, expectedHash);

    // Verify mix hash
    verify(headerHashBuf, nonceBuf, blockHeight, hashResult.mixHashBuf, hashResult.hash, 500, expectedMixHash, expectedHash);
});

console.log('All tests completed successfully.');

function hash(headerHashBuf, nonceBuf, blockHeight, expectedMixHash, expectedHash) {
    const mixOutBuf = Buffer.alloc(32, 0);
    const hashOutBuf = Buffer.alloc(32, 0);

    hasher.hash(headerHashBuf, nonceBuf, blockHeight, mixOutBuf, hashOutBuf);

    const mixHash = mixOutBuf.toString('hex');
    const hash = hashOutBuf.toString('hex');

    console.log(`Mix Hash: ${mixHash}`);
    console.log(`Expected: ${expectedMixHash}\n`);
    console.log(`Hash:     ${hash}`);
    console.log(`Expected: ${expectedHash}\n`);

    if (mixHash !== expectedMixHash)
        throw new Error(`Got invalid mix hash. Expected ${expectedMixHash}`);

    if (hash !== expectedHash)
        throw new Error(`Got invalid hash. Expected ${expectedHash}`);

    return {
        mixHashBuf: mixOutBuf,
        hash: hash
    };
}

function verify(headerHashBuf, nonceBuf, blockHeight, mixHashBuf, hash, iterations, expectedMixHash, expectedHash) {
    console.log(`Verifying with ${iterations} iterations...`);

    const verifyHashOutBuf = Buffer.alloc(32);
    const startTimeMs = Date.now();

    for (let i = 0; i < iterations; i++) {
        const isValid = hasher.verify(headerHashBuf, nonceBuf, blockHeight, mixHashBuf, verifyHashOutBuf);
        if (!isValid)
            throw new Error('Verification failed.');
    }

    const endTimeMs = Date.now();

    const verifiedHash = verifyHashOutBuf.toString('hex');
    console.log(`Verified Hash: ${verifiedHash}`)
    if (verifiedHash !== expectedHash)
        throw new Error(`Verified hash output does not match original hash.`);

    const verifyPs = iterations / (endTimeMs - startTimeMs) * 1000;
    console.log(`verify/sec = ${verifyPs}\n`);
}

function hexToLE(hex) {
    return reverseBytes(Buffer.from(hex, 'hex'));
}

function reverseBytes(buffer, output) {
    output = output || buffer;
    const halfLen = buffer.length / 2;
    for (let i = 0; i < halfLen; i++) {
        const byte = buffer[i];
        output[i] = buffer[buffer.length - i - 1];
        buffer[buffer.length - i - 1] = byte;
    }
    return output;
}
