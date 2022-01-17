const Token = artifacts.require("ERC20");

module.exports = function (deployer, network, accounts) {
  const name = "TimCoin";
  const symbol = "TIM";
  const total_supply = 10000;
  deployer.deploy(Token, name, symbol, total_supply);
};
