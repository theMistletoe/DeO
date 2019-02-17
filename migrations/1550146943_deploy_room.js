const RoomContract = artifacts.require('Room.sol');

module.exports = function(deployer, network) {
  // Use deployer to state migration tasks.
  if (network == "getho") {
    // Do something specific to the network named "live".
    deployer.deploy(RoomContract, '0xb1f407dcc37cdc0d5193c09f499d3766aa4c5743', "testtheme");
  } else {
    // Perform a different step otherwise.
  }
};
