pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Room is Pausable, Ownable {

  address public contractOwner;
  string public theme;
  uint256[] public result;

  mapping (address => uint256[]) public workersAnswer;
  address[] public answersLUT;

  mapping (address => uint256) public rewardMap;
  address[] public rewardLUT;

  mapping (uint => bool) public rewardSent;


  event Deposited(
    address indexed _depositor,
    uint _depositedValue
  );

  event RewardSent(
    address indexed _dest,
    uint _reward
  );

  event RefundToOwner(
    address indexed _dest,
    uint _refundBalance
  );

  constructor(address _creator, string memory _theme) public payable {
    // Ownable's owner became deprecated???
    contractOwner = _creator;
    theme = _theme;
  }

  function deposit() external payable whenNotPaused {
    require(msg.value > 0);
    emit Deposited(msg.sender, msg.value);
  }

  function sendReward(uint _reward, address payable _dest) internal {
    address payable defaultAddress = address(0);

    require(_reward > 0);
    require(address(this).balance >= _reward);
    require(_dest != defaultAddress);
    require(_dest != msg.sender);

    _dest.transfer(_reward);
    emit RewardSent(_dest, _reward);
  }

  function refundToOwner() external onlyOwner payable {
    require(address(this).balance > 0);

    uint refundBalance = address(this).balance;

    msg.sender.transfer(refundBalance);
    emit RefundToOwner(msg.sender, refundBalance);
  }


  function getContractBalance() public view returns (uint) {
    uint balance = address(this).balance;
    return balance;
  }

  function getAddress() public view returns (address) {
    return address(this);
  }

  // convert array from web3 to solidity array
  function passArray(uint[] memory otherNumbers) pure public returns (uint[] memory) {
    return otherNumbers;
  }

  function setAnswer(uint256[] memory _answers) public {
    workersAnswer[msg.sender] = _answers;
    answersLUT.push(msg.sender);
  }

  function getAnswer(uint256 index) public view returns (uint256[] memory) {
    return workersAnswer[answersLUT[index]];
  }

  function size() public view returns (uint) {
    return answersLUT.length;
  }


  function decideRewardPrice() public {
    uint256 answerNum = answersLUT.length;

    // TODO modify for calc reward consider of weight
    uint256 rewardPrice = address(this).balance / answerNum;

    for (uint i=0; i<answerNum; i++) {
      rewardMap[answersLUT[i]] = rewardPrice;
      rewardLUT.push(answersLUT[i]);
      sendReward(rewardPrice, address(uint160(answersLUT[i])));
    }
  }

  function setResult(uint256[] memory _result) public {
    result = _result;
  }

  function getResult() public view returns (uint[] memory) {
    return result;
  }

}
