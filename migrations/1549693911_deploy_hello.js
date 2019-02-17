const HelloContract = artifacts.require('Hello.sol');

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(HelloContract, 'Hello');
};
