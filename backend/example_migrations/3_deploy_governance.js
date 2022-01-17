const Governance = artifacts.require("Governance");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Governance, accounts[0]);
};
