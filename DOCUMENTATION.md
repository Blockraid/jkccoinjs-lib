# jkccoinjs-lib Documentation

## Installation

```bash
npm install jkccoinjs-lib
```

For key derivation functionality, you may also want to install:
```bash
npm install ecpair bip32
```

## Overview

jkccoinjs-lib is a JavaScript library for Junkcoin that provides functionality for:
- Address generation and validation
- Transaction creation and signing
- Cryptographic operations
- Network handling
- Payment script creation
- Block handling
- PSBT (Partially Signed Bitcoin Transaction) support

## Core Components

### 1. Address Operations
```javascript
import { address } from 'jkccoinjs-lib';

// Validate an address
address.fromBase58Check(addressString);
```

### 2. Transaction Handling
```javascript
import { Transaction } from 'jkccoinjs-lib';

// Create a new transaction
const tx = new Transaction();

// Add inputs and outputs
tx.addInput(prevTxHash, prevTxIndex);
tx.addOutput(address, amount);
```

### 3. Network Configuration
```javascript
import { networks } from 'jkccoinjs-lib';

// Use mainnet or testnet configurations
const network = networks.junkcoin; // or networks.testnet
```

### 4. Payment Types
```javascript
import { payments } from 'jkccoinjs-lib';

// Create different types of payment scripts
const p2pkh = payments.p2pkh({ pubkey: publicKeyBuffer });
const p2sh = payments.p2sh({ redeem: redeemScript });
```

### 5. Cryptographic Functions
```javascript
import { crypto } from 'jkccoinjs-lib';

// Hash functions
const hash = crypto.hash160(buffer);
const sha256 = crypto.sha256(buffer);
```

## Common Use Cases

### 1. Generate a New Address
```javascript
import { ECPairFactory } from 'ecpair';
import { payments, networks } from 'jkccoinjs-lib';
import * as ecc from 'bells-secp256k1';

const ECPair = ECPairFactory(ecc);
const keyPair = ECPair.makeRandom();
const { address } = payments.p2pkh({
  pubkey: keyPair.publicKey,
  network: networks.junkcoin,
});
```

### 2. Create and Sign a Transaction
```javascript
import { Transaction } from 'jkccoinjs-lib';

const tx = new Transaction();

// Add input
tx.addInput(prevTxHash, prevTxIndex);

// Add output
tx.addOutput(destinationAddress, amount);

// Sign the transaction
tx.sign(keyPair, sigHashType);
```

### 3. Create a Multisig Address
```javascript
import { payments } from 'jkccoinjs-lib';

const p2ms = payments.p2ms({
  m: 2, // Required signatures
  pubkeys: [pubKey1Buffer, pubKey2Buffer, pubKey3Buffer],
  network: networks.junkcoin,
});

const p2sh = payments.p2sh({
  redeem: p2ms,
  network: networks.junkcoin,
});

console.log(p2sh.address); // Multisig address
```

### 4. Work with PSBT (Partially Signed Bitcoin Transactions)
```javascript
import { Psbt } from 'jkccoinjs-lib';

// Create new PSBT
const psbt = new Psbt();

// Add input
psbt.addInput({
  hash: prevTxHash,
  index: prevTxIndex,
  // ... other input data
});

// Add output
psbt.addOutput({
  address: destinationAddress,
  value: amount,
});

// Sign input
psbt.signInput(0, keyPair);

// Finalize and extract transaction
const tx = psbt.finalizeAllInputs().extractTransaction();
```

## Best Practices

1. **Key Management**
   - Never reuse addresses
   - Keep private keys secure
   - Use HD wallets when possible
   - Don't share extended public keys (xpubs)

2. **Transaction Safety**
   - Always verify transaction details before broadcasting
   - Test transactions with small amounts first
   - Use appropriate fee rates
   - Implement proper error handling

3. **Security**
   - Use secure random number generation
   - Avoid using Math.random()
   - Verify all input data
   - Test thoroughly in your target environment

4. **Network Selection**
   - Always specify the network explicitly
   - Test on testnet before mainnet
   - Use appropriate network parameters

## Error Handling

```javascript
try {
  const tx = new Transaction();
  // ... transaction operations
} catch (err) {
  if (err.message.includes('Not enough funds')) {
    // Handle insufficient funds
  } else if (err.message.includes('Invalid address')) {
    // Handle invalid address
  } else {
    // Handle other errors
  }
}
```

## Dependencies

The library requires the following key dependencies:
- `@noble/hashes`: For cryptographic hash functions
- `bech32`: For Bech32 address encoding
- `bells-secp256k1`: For elliptic curve operations
- `bs58check`: For Base58Check encoding
- `typeforce`: For type checking
- `varuint-bitcoin`: For variable integer encoding

## Testing Your Implementation

Always test your implementation thoroughly:
```bash
# Run the test suite
npm test

# Check test coverage
npm run coverage
```

## Additional Resources

- [GitHub Repository](https://github.com/Blockraid/jkccoinjs-lib)
- [Issue Tracker](https://github.com/Blockraid/jkccoinjs-lib/issues)
- [NPM Package](https://www.npmjs.org/package/junkcoinjs-lib)

## License

This library is released under the MIT License.
