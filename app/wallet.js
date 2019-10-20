const contract_util = require('./contract-utils.js'),
    web3 = contract_util.getWeb3();

/**
 * Creates a account
 * @returns {object} account
 */
function createWalletAccount() {
    var account = web3.eth.accounts.create()
    return account
}

/**
 * Creates a account using the given privatekey
 * @param {string} privateKey
 * @returns {object} account
 */
function createAccountbyKey(privateKey) {
    var account = web3.eth.accounts.privateKeyToAccount(privateKey)
    return account
}

/**
 * Sign the transaction with the given private key
 * @param {object} tx - transaction object
 * @param {string} privateKey 
 * @returns {object} result
 */
function signTransaction(tx, privateKey) {
    web3.eth.accounts.signTransaction({
        to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
        value: '1000000000',
        gas: 2000000
    },
        privateKey
    ).then((result) => {
        console.log(result)
        return result
    }).catch((err) => {
        console.log(err);
    });
}

function getAccount() {
    
}

module.exports = {
    createWalletAccount,
    createAccountbyKey,
    signTransaction
}