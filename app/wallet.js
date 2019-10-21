const contractUtil = require('./contract-utils.js'),
    web3 = contractUtil.getWeb3();

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
    web3.eth.accounts.signTransaction(tx, privateKey
    ).then((result) => {
        console.log(result)
        return result
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = {
    createWalletAccount,
    createAccountbyKey,
    signTransaction
}