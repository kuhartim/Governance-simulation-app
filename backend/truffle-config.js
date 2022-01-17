const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic =
  "civil stand spatial public duck coast resist carpet permit concert mom uncover";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "../frontend/src/contracts"),
  networks: {
    ropstein: {
      // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      provider: new HDWalletProvider(
        mnemonic,
        "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      ),
      network_id: "3",
    },
    develop: {
      // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
