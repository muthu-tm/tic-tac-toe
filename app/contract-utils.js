const Web3 = require('web3'),
config = require('./config.js'),
fs = require('fs'),
etherContractArtifacts = JSON.parse(fs.readFileSync('/Users/muthu_thavamani/Documents/Muthu/GitHub/tic-tac-toe/build/contracts/TicTacToe.json', 'utf8')),
contract_abi = etherContractArtifacts.abi,
contractaddress = config.id

if (typeof web3 !== 'undefined') {
	var web3 = new Web3(web3.currentProvider)
} else {
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}
web3.eth.defaultAccount = web3.eth.accounts[0]

function getContract() {
    return new web3.eth.Contract(contract_abi, contractaddress);
}

function getWeb3() {
    return web3
}

exports.getWeb3 = getWeb3;
exports.getContract = getContract;

