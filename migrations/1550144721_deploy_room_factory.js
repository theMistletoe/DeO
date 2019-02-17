const RoomFactoryContract = artifacts.require('RoomFactory.sol');


module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(RoomFactoryContract);
};
