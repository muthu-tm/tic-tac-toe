const prompt = require('prompt'),
    wallet = require('./wallet.js');

function playTurn(player) {

    console.log('Your turn player: ' + player);
    prompt.start();
    prompt.get(['position'], function (err, result) {

        if (validateMove(result.position) === true) {
            markBoard(result.position, player);
            printBoard();
            if (checkWin(player) === true) {
                console.log('Winner Winner!');
                return;
            }
            if (checkTie() === true) {
                console.log('Tie Game');
                return;
            }
            if (player === 'X') {
                playTurn('O');
            } else {
                playTurn('X');
            }
        } else {
            console.log('incorrect input please try again...');
            playTurn(player);
        }
    });
}

function startGame() {
    console.log("Please select an option before start the game!")

}

function initGame() {
    console.log("Please select an option before start the game!")
    console.log("1. Create ETHER Wallet")
    console.log("2. Load existing wallet using private key")
    prompt.start();
    prompt.get(['option'], function (err, result) {
        if (isInt(result.option) && result.option == 1) {
            wallet.createWallet();
        } else if (isInt(result.option) && result.option == 2) {
            console.log("Please enter your private key: ")
            prompt.start();
            prompt.get(['key'], function (err, result) {
                wallet.addWallet(result.key);
            });
        } else {
            console.log('Incorrect input please try again...');
            initGame();
        }
    });

    StartGame('X');
}

console.log('Game started: \n' +
    ' [0,0] | [0,1] | [0,2] \n' +
    ' --------------------- \n' +
    ' [1,0] | [1,1] | [1,2] \n' +
    ' --------------------- \n' +
    ' [2,0] | [2,1] | [2,2] \n');


initGame();

