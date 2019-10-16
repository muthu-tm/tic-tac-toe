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

const contractInstance = new web3.eth.Contract(contract_abi, contractaddress);
console.log(contractInstance)
web3.eth.defaultAccount = web3.eth.accounts[0]

/**
 * Creates a wallet with 1 account in it
 * Logs the wallet details with account address 
 */
function createWallet() {
    var wallet = web3.eth.accounts.wallet.create(1);
    console.log(wallet)
}

function getTotalSupply() {
	contractInstance.methods.totalSupply().call(   
		{
			from:   web3.eth.defaultAccount,
			to:     contractaddress           
	}).then((result) => {
		 console.log(result)
	})
	.catch((err) => {
		console.log(err);
	});
}
// /**
//  * Adds the given account into the wallet
//  * @param {string} privateKey 
//  */
// function addWallet(privateKey) {
//     var wallet = web3.eth.accounts.wallet.add(privateKey);
//     console.log(wallet);
// }

// exports.createWallet = createWallet;
// exports.addWallet = addWallet;
exports.createWallet = createWallet;