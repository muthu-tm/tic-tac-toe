const contract_util = require('./contract-utils.js'),
web3 = contract_util.getWeb3(),
contractInstance = contract_util.getContract();

/**
 * Creates a wallet with 1 account in it
 * Logs the wallet details with account address 
 */
function createWallet() {
    var wallet = web3.eth.accounts.wallet.create(1);
    console.log(wallet)
}

/**
 * Adds the given account into the wallet
 * @param {string} privateKey 
 */
function addWallet(privateKey) {
    var wallet = web3.eth.accounts.wallet.add(privateKey);
    console.log(wallet);
}

exports.createWallet = createWallet;
exports.addWallet = addWallet;
exports.createWallet = createWallet;