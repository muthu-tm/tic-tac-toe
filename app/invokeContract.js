const contract_util = require('./contract-utils.js'),
	web3 = contract_util.getWeb3(),
	contractInstance = contract_util.getContract();

var tokenValue = 10;

async function getTotalSupply() {
	try {
		var result = await contractInstance.methods.totalSupply().call({
			from: web3.eth.defaultAccount
		});
		console.log(result)

		return result
	} catch (err) {
		console.error("Error - totalSupply")
		throw err
	}
}

async function buyToken(playerAddress, token) {
	try {
		var result = await contractInstance.methods.getToken(token).call({
			from: playerAddress,
			value: (token * tokenValue)
		});
		console.log(result)

		return result
	} catch (err) {
		console.error("Error - getToken")
		throw err
	}
}

async function getGameState() {
	try {
		var result = await contractInstance.methods.getState().call({
			from: web3.eth.defaultAccount,
		});
		console.log(result)

		return result
	} catch (err) {
		console.error("Error - getState")
		throw err
	}
}

async function startGame(playerAddress, rounds, betForEachRounds) {
	try {
		var result = await contractInstance.methods.start(rounds, betForEachRounds).call({
			from: playerAddress,
		});
		console.log(result)
		
		return result
	} catch (err) {
		console.error("Error - start")
		throw err
	}
}

async function joinGame(playerAddress) {
	try {
		var result = await contractInstance.methods.join().call({
			from: playerAddress,
		});
		console.log(result)
		
		return result
	} catch (err) {
		console.error("Error - join")
		throw err
	}
}

async function play(playerAddress, row, column) {
	try {
		var result = await contractInstance.methods.play(row, column).call({
			from: playerAddress,
		});
		console.log(result)
		
		return result
	} catch (err) {
		console.error("Error - join")
		throw err
	}
}

async function getTokenBalance(playerAddress) {
	try {
		var result = await contractInstance.methods.balanceOf(playerAddress).call({
			from: playerAddress,
		});
		console.log(result)
		
		return result
	} catch (err) {
		console.error("Error - balanceOf")
		throw err
	}
}

async function getTokenHoldersList(playerAddress) {
	try {
		var result = await contractInstance.methods.getKeys().call({
			from: playerAddress,
		});
		console.log(result)
		
		return result
	} catch (err) {
		console.error("Error - getKeys")
		throw err
	}
}

module.exports = {
	getTotalSupply,
	buyToken,
	getGameState,
	startGame,
	joinGame,
	getTokenBalance,
	getTokenHoldersList
}