const rpcURL = "http://127.0.0.1";

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
	'stamp trial lucky sunny key whale achieve outside snake month bean badge', rpcURL
);

const web3 = new Web3(provider);

const compiledContract = require('./../build/contracts/TicTacToe.json');

(async () => {
	const accounts = await web3.eth.personal.getAccounts();

	console.log(`Attempting to deploy from account: ${accounts[0]}`);

	const deployedContract = await new web3.eth.Contract(compiledContract.abi)
		.deploy({
			data: '0x' + compiledContract.evm.bytecode.object,
			arguments: [3, 5]
		})
		.send({
			from: accounts[0],
			gas: '6000000'
		});

	console.log(
		`Contract deployed at address: ${deployedContract.options.address}`
	);

	provider.engine.stop();
})();

// async function getsupply() {
//     try {
//         var total = await Contract.methods.totalSupply();
//         console.log(total);
//     } catch (err) {
//         console.error("Error:", err);
//     }
// }

/**
 * Creates a wallet with 1 account in it
 * Logs the wallet details with account address 
 */
function createWallet() {
    var wallet = web3.eth.accounts.wallet.create(1);
    console.log(wallet)
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