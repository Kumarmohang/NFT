/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();
FROM_ADDRESS = process.env.FROM_ADDRESS;
PRIVATE_KEY = process.env.PRIVATE_KEY;
MAINNET_URL = process.env.MAINNET_URL;
CHAIN_ID = process.env.CHAIN_ID;
GAS_LIMIT = process.env.GAS_LIMIT;
GAS_PRICE = process.env.GAS_PRICE;

//------------------
// FROM_ADDRESS = '0x32575c057eCe2531F5ACdF8C74A32c6AAce9FAfC';
// PRIVATE_KEY =
//   '7db6e1ab51bbd3f3e11dd8064accfccbbb04b4fe746a1cfc25bb56c54e8b5ddc';
// MAINNET_URL = 'HTTP://127.0.0.1:7545';
// CHAIN_ID = '5777';
// GAS_LIMIT = 4000000;
// GAS_PRICE = '200000000000';
//---------------------

//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: 'S4ZYNS4PEI2HHSFQ9YP29AISS2N14NGMBG',
  },
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    ganache: {
      provider: () => {
        return new HDWalletProvider([PRIVATE_KEY], MAINNET_URL);
      },
      network_id: '5777',
      gas: GAS_LIMIT, //make sure this gas allocation isn't over 4M, which is the max
      from: FROM_ADDRESS,
      gasPrice: GAS_PRICE,
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider([PRIVATE_KEY], MAINNET_URL);
      },
      network_id: '3',
      gas: GAS_LIMIT, //make sure this gas allocation isn't over 4M, which is the max
      from: FROM_ADDRESS,
      gasPrice: GAS_PRICE,
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider([PRIVATE_KEY], MAINNET_URL);
      },
      network_id: '4',
      gas: GAS_LIMIT, //make sure this gas allocation isn't over 4M, which is the max
      from: FROM_ADDRESS,
      gasPrice: GAS_PRICE,
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider([PRIVATE_KEY], MAINNET_URL);
      },
      network_id: '5',
      gas: GAS_LIMIT, //make sure this gas allocation isn't over 4M, which is the max
      from: FROM_ADDRESS,
      gasPrice: GAS_PRICE,
    },
    mainnet: {
      provider: () => {
        return new HDWalletProvider([PRIVATE_KEY], MAINNET_URL);
      },
      network_id: '1',
      gas: GAS_LIMIT, //make sure this gas allocation isn't over 4M, which is the max
      from: FROM_ADDRESS,
      gasPrice: GAS_PRICE,
    },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.13', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
        //  evmVersion: "byzantium"
      },
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
};
