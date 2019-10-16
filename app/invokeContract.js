const contract_util = require('./contract-utils.js'),
web3 = contract_util.getWeb3(),
contractInstance = contract_util.getContract();

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

module.exports = {
    getTotalSupply
}