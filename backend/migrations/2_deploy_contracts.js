const BigNumber = require("bignumber.js");

const ERC20 = artifacts.require("ERC20");
const Governance = artifacts.require("Governance");

module.exports = (deployer, network) => {
  const name = "TimCoin";
  const symbol = "TIM";
  const total_supply = new BigNumber("1000000000000000000");
  deployer.deploy(ERC20, name, symbol, total_supply).then(function () {
    return deployer.deploy(Governance, ERC20.address);
  });
};
