import "babel-polyfill";
import Web3 from "web3";


var factoryContractAddress = "0x628A9b91535660c63489e7D10043c67F46A5c043";
var roomContractAddress = "";

// ABI(Application Binary Interface) はブロックチェーンの外からコントラクトを利用するための
// インターフェースの定義です。
var factory_abi = [{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "roomList",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xa63a9aab"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "_creator",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "_room",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "_depositedValue",
      "type": "uint256"
    }
  ],
  "name": "RoomCreated",
  "type": "event",
  "signature": "0x6849f7a409ad97d39c5ffa074bf765330bf1a574da99d4c4831196ecd77ea8da"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_theme",
      "type": "string"
    }
  ],
  "name": "createRoom",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function",
  "signature": "0x7306d2dd"
},
{
  "constant": true,
  "inputs": [],
  "name": "getDeployedChildContracts",
  "outputs": [
    {
      "name": "",
      "type": "address[]"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x527596bf"
}];
var room_abi = [{
  "constant": true,
  "inputs": [],
  "name": "theme",
  "outputs": [
    {
      "name": "",
      "type": "string"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "address"
    },
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "workersAnswer",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "answersLUT",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "result",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [],
  "name": "unpause",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "rewardLUT",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "account",
      "type": "address"
    }
  ],
  "name": "isPauser",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "paused",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [],
  "name": "renouncePauser",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "account",
      "type": "address"
    }
  ],
  "name": "addPauser",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "name": "rewardMap",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [],
  "name": "pause",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "rewardSent",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "isOwner",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "contractOwner",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "name": "_creator",
      "type": "address"
    },
    {
      "name": "_theme",
      "type": "string"
    }
  ],
  "payable": true,
  "stateMutability": "payable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "_depositor",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "_depositedValue",
      "type": "uint256"
    }
  ],
  "name": "Deposited",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "_dest",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "_reward",
      "type": "uint256"
    }
  ],
  "name": "RewardSent",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "_dest",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "_refundBalance",
      "type": "uint256"
    }
  ],
  "name": "RefundToOwner",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "account",
      "type": "address"
    }
  ],
  "name": "Paused",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "account",
      "type": "address"
    }
  ],
  "name": "Unpaused",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "account",
      "type": "address"
    }
  ],
  "name": "PauserAdded",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "account",
      "type": "address"
    }
  ],
  "name": "PauserRemoved",
  "type": "event"
},
{
  "constant": false,
  "inputs": [],
  "name": "deposit",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [],
  "name": "refundToOwner",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "getContractBalance",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "getAddress",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "otherNumbers",
      "type": "uint256[]"
    }
  ],
  "name": "passArray",
  "outputs": [
    {
      "name": "",
      "type": "uint256[]"
    }
  ],
  "payable": false,
  "stateMutability": "pure",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_answers",
      "type": "uint256[]"
    }
  ],
  "name": "setAnswer",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "index",
      "type": "uint256"
    }
  ],
  "name": "getAnswer",
  "outputs": [
    {
      "name": "",
      "type": "uint256[]"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "size",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [],
  "name": "decideRewardPrice",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_result",
      "type": "uint256[]"
    }
  ],
  "name": "setResult",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "getResult",
  "outputs": [
    {
      "name": "",
      "type": "uint256[]"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}];


let myAccount;
let web3;
let factoryInstance;
let roomInstance;

async function initApp() {
  // ethにmetamaskのやつが入っている
  console.log('init start');
  myAccount = (await web3.eth.getAccounts())[0];
  factoryInstance = new web3.eth.Contract(factory_abi, factoryContractAddress);
  console.log(myAccount);
  document.getElementById("createdRoom").innerText = 'yourAddress:' + myAccount;
  console.log(factoryInstance);

  try {
    const allRooms = await factoryInstance.methods.getDeployedChildContracts().call();
    console.log('RoomList:', allRooms);
    for (var i = 0; i < allRooms.length; i++) {
      document.getElementById("createdRoom").insertAdjacentHTML('afterbegin', '* ' + allRooms[i] + '<br>');
    }
  } catch (err) {
    console.log(err);
  }

  console.log('init end');
}

window.testOutputConsole = async () => {
  // const theme = document.getElementById("value").value;
  // const theme = 'testthemexxxx'
  const theme = document.getElementById("theme").value;
  const deposit = document.getElementById("deposit").value;

  try {
    let option = {
      from: myAccount,
      gasPrice: "5500000",
      gas: "3000000",
      value: deposit
    };

    await factoryInstance.methods.createRoom(theme).send(option)
    .then((receipt) => {
      // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      console.log('receipt', receipt);
    });

    try {
      const result = await factoryInstance.methods.getDeployedChildContracts().call();
      console.log('RoomList:', result);
      document.getElementById("createdRoom").innerText = 'CreatedContractAddress:' + result[result.length - 1];

      roomContractAddress = result[result.length - 1];
      roomInstance = new web3.eth.Contract(room_abi, roomContractAddress);

      const theme = await roomInstance.methods.theme().call();
      console.log('theme:', theme);

    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

window.testSetAnswer = async () => {
  var workerAnswer = document.getElementById("workerAnswer").value;
  console.log('PUREworkerAnswer:', workerAnswer);
  console.log(workerAnswer.split(',').map(Number));

  var roomContractAddress = document.getElementById("roomAddress").value;
  roomInstance = new web3.eth.Contract(room_abi, roomContractAddress);

  try {
    let option = {
      from: myAccount,
      gasPrice: "5500000",
      gas: "3000000",
      value: "5500000"
    };
    console.log('call');
    // var passArray = contract.passArray(otherNumbers);
    // can convert???ary = str.split(',');
    // var passArray = roomInstance.methods.passArray(workerAnswer.split(',').map(Number)).call();
    // console.log('passArray:',passArray);

    // pass to args after convert string=>stringarray=>intarray
    await roomInstance.methods.setAnswer(workerAnswer.split(',').map(Number)).send({from: myAccount});
    console.log('end');

    // const answersAddress = await roomInstance.methods.answersLUT(0).call();
    // console.log(answersAddress);
    const answersNum = await roomInstance.methods.size().call();
    // console.log('answersNum', answersNum);

    for (var i = 0; i < answersNum; i++) {
      const retAnswer = await roomInstance.methods.getAnswer(i).call();
      console.log('returnanswers', retAnswer);
    }

  } catch (err) {
    console.log(err);
  }
};

window.testGetRoomInfo = async () => {
  var roomContractAddress = document.getElementById("roomAddress").value;
  roomInstance = new web3.eth.Contract(room_abi, roomContractAddress);

  try {
    const roomOwner = await roomInstance.methods.contractOwner().call();
    console.log('roomOwner:' + roomOwner);

    const roomTheme = await roomInstance.methods.theme().call();
    console.log('theme:' + roomTheme);

    const answersNum = await roomInstance.methods.size().call();
    console.log('answersNum' , answersNum);
    for (var i = 0; i < answersNum; i++) {
      const retAnswer = await roomInstance.methods.getAnswer(i).call();
      console.log('returnanswers', retAnswer);
    }

    const balance = await roomInstance.methods.getContractBalance().call();
    console.log('balance:' + balance);

    const roomResult = await roomInstance.methods.getResult().call();
    console.log('roomResult:' + roomResult);

  } catch (err) {
    console.log(err);
  }
};

window.testSendReward = async () => {
  var roomContractAddress = document.getElementById("roomAddress").value;
  roomInstance = new web3.eth.Contract(room_abi, roomContractAddress);

  try {
    let option = {
      from: myAccount,
      gasPrice: "5500000",
      gas: "3000000"
    };
    const rewardResult = await roomInstance.methods.decideRewardPrice().send(option);
    console.log(rewardResult);

  } catch (err) {
    console.log(err);
  }
};

window.testSetResult = async () => {
  var result = document.getElementById("result").value;
  console.log('PUREworkerAnswer:', result);
  console.log(result.split(',').map(Number));

  var roomContractAddress = document.getElementById("roomAddress").value;
  roomInstance = new web3.eth.Contract(room_abi, roomContractAddress);

  try {
    let option = {
      from: myAccount,
      gasPrice: "5500000",
      gas: "3000000",
      value: "5500000"
    };
    console.log('call');
    await roomInstance.methods.setResult(result.split(',').map(Number)).send({from: myAccount});
    console.log('end');

  } catch (err) {
    console.log(err);
  }
};


window.addEventListener('load', async function() {
  // web3 がブラウザのアドオンなどから提供されているかチェックします。(MetaMask)
  if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    // 今は書かなくても動くけどそのうち必須になるのでかこう
    // MetaMask の provider を使う
    let provider = window['ethereum'] || window.web3.currentProvider;

    // MetaMask の provider の利用を可能にします。
    // MetaMask にはプライバシーモードがあり、これが有効になっている場合には、この enable() を使っ
    // てこのサイトでMetaMaskを使う許可をユーザから得る必要があります。
    await provider.enable();

    web3 = new Web3(provider);
  } else {
    // ユーザが web3 を持っていないケースのハンドリング。 おそらく、あなたのアプリを利用するために
    // MetaMask をインストールするように伝えるメッセージを表示する処理を書く必要があります。
    // もしくは、Ethereum ノードがローカルで動いている場合には、
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // また、 infura.io の RPC エンドポイントを利用する場合には、
    // var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/your_project_id'));
    // のようにできます。
    console.log('METAMASK NOT DETECTED');
  }

  // これで web3.js を自由に使えるようになりました。
  // アプリを初期化して起動しましょう！
  initApp();
});
