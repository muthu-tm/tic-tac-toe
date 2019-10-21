const prompt = require('prompt'),
    wallet = require('./app/wallet.js'),
    tictactoe = require('./app/invokeContract.js'),
    contract = require('./app/contract-utils.js');

var account;

function initGame() {
    console.log("\n Please select an option before start the game!")
    console.log("1. Create Wallet Account")
    console.log("2. Load wallet account using private key")
    console.log("3. Get an existing account")
    console.log("4. View available accounts")
    console.log("5. View account address")
    console.log("6. Get account balance")
    console.log("7. Purchase token")
    console.log("8. View token balance")
    console.log("9. Start Game!")
    console.log("10. Join to an existing Game!")
    console.log("11. Play!")
    console.log("12. View Game Board!")
    console.log("13. View Account Holders")
    prompt.start()
    prompt.get(['option'], async function (err, result) {
        if (result.option == 1) {
            var accountObj = wallet.createWalletAccount()
            account = accountObj.address
            console.log("Account created successfully!")
            console.log(accountObj)
            await initGame();
        } else if (result.option == 2) {
            console.log("Please enter your private key: ")
            prompt.start()
            prompt.get(['key'], async function (err, result) {
                var accountObj = wallet.createAccountbyKey(result.key)
                account = accountObj.address
                console.log("Account created successfully with given private key!")
                console.log(accountObj)
                await initGame()
            });

        } else if (result.option == 3) {
            try {
                accounts = await contract.getGanacheAccounts();
                console.log(accounts)
                console.log("\n Please select an account from the above list!")
            } catch (err) {
                console.error("Error while fetching ganache accounts", err)
                await initGame()
            }
            prompt.start()
            prompt.get(['index'], async function (err, result) {
                account = accounts[result.index - 1]
                console.log("Account loaded successfully!")
                console.log(account)
                await initGame()
            });

        } else if (result.option == 4) {
            try {
                var accounts = await contract.getGanacheAccounts();
                console.log("Available accounts in the network to use")
                console.log(accounts)
            } catch (err) {
                console.error("Error while fetching ganache accounts", err)
            }

            await initGame()
        } else if (result.option == 5) {
            if (account)
                console.log("Account address: ", account)
            else
                console.log("No account loaded yet!")

            await initGame()
        } else if (result.option == 6) {
            try {
                if (account) {
                    var balance = await contract.getAccountBalance(account);
                    console.log("Account ether balance: ", balance)
                } else {
                    console.log("No account loaded yet! please create an account")
                }
            } catch (err) {
                console.error("Error occurred while fetching account baalance", err)
            }

            await initGame()
        } else if (result.option == 7) {
            console.log("Please enter the token amount to purchase")
            prompt.start();
            prompt.get(['token'], async function (err, result) {
                try {
                    var res = await tictactoe.buyToken(account, result.token)
                    console.log(`Received ${res} tokens in your account`)
                    await initGame()
                } catch (err) {
                    console.error("Error while buying token: ", err)
                    await initGame()
                }
            });

        } else if (result.option == 8) {
            try {
                var tokenBalance = await tictactoe.getTokenBalance(account)
                console.log("Your token balance:", tokenBalance)
                await initGame()
            } catch (err) {
                console.error("Error while retrieving token balance", err)
                await initGame()
            }
        } else if (result.option == 9) {
            console.log("Please enter the number of rounds")
            prompt.start();
            prompt.get(['rounds'], async function (err, result) {
                var rounds = result.rounds

                console.log("Please enter the bet amount for each round, e.x: 1,2,3 - for 3 rounds")
                prompt.start();
                prompt.get(['bet_amount'], async function (err, result) {
                    var amounts = result.bet_amount.split(',')

                    var bet_amounts = []
                    amounts.forEach(element => {
                        bet_amounts.push(parseInt(element))
                    });

                    console.log(bet_amounts)
                    if (bet_amounts.length == rounds) {
                        try {
                            var res = await tictactoe.startGame(account, rounds, bet_amounts)
                            console.log("You are PLAYER1; Wait for player2 to play", res)
                            await initGame()
                        } catch (err) {
                            console.error("Error while starting game", err)
                            await initGame()
                        }
                    } else {
                        console.log("Please enter bet amount for all rounds! less/more bet amount received..")
                        await initGame()
                    }
                });
            });
        } else if (result.option == 10) {
            try {
                var res = await tictactoe.joinGame(account)
                console.log("You are PLAYER2; Wait for your turn to play", res)
                await initGame()
            } catch (err) {
                console.error("Error while joining the game", err)
                await initGame()
            }
        } else if (result.option == 11) {
            console.log("Please enter the place for the round, e.x: 0,1 - row, column")
            prompt.start();
            prompt.get([place], async function (err, result) {
                try {
                    var place = result.place.split(',')
                    var res = await tictactoe.play(account, place[0], place[1])
                    console.log("Played Well!", res)
                    await initGame()
                } catch (err) {
                    console.error("Error while playing", err)
                    await initGame()
                }
            });
        } else if (result.option == 12) {
            try {
                res = await tictactoe.getGameState()
                console.log("GAME BOARD \n", res)
                await initGame()
            } catch (err) {
                console.error("Error while getting the current game state", err)
                await initGame()
            }
        } else if (result.option == 13) {
            try {
                var holders = await tictactoe.getTokenHoldersList(account)
                console.log("Token holders list: ", holders)
                await initGame()
            } catch (err) {
                console.error("Error while getting the holders list", err)
                await initGame()
            }
        } else {
            console.log('Incorrect input please try again...');
            await initGame()
        }
    });

    // playTurn('X');
}

console.log('Game started: \n' +
    ' [0,0] | [0,1] | [0,2] \n' +
    ' --------------------- \n' +
    ' [1,0] | [1,1] | [1,2] \n' +
    ' --------------------- \n' +
    ' [2,0] | [2,1] | [2,2] \n');

(async () => {
    try {
        await initGame()
    } catch (e) {
        console.error("Error occurred while starting the game!!")
    }
})();