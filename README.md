# tic-tac-toe

## GAME
### Before beginning game:
* Each player will create a wallet or load the wallet from private key during the game.
* Each player will purchase some tokens by sending test ether to game contract.
* Player 1 will enter the bet for each round and number of rounds
* Player 2 will accept this to start the game and their bet tokens will get locked in contract till the channel closes.

### On Beginning game: 
* You will open a channel on the start of the first round.

### On ending game:
* Channel will be closed and payment will be settled.

## Sofwares/Tools used

* Truffle     - v5.0.29
* Solidity    - ^0.5.0
* web3js      - v1.2.1
* ganeche-cli - v6.7.0
* node        - v8.113

## Network Setup

To install truffle framework via npm
> $ npm install -g truffle

To install Ethereum Blockchain Simulator
> $ npm install -g ganache-cli

To install web3 Library
> $ npm install web3

> $ npm install prompt

To setup a local etehreum test envionment run the below command in separate terminal; It runs on port 8545, by default.
> $ ganache-cli

To buuild, compile, & deploy the dapp in the local ethereum environment
> $ truffle migrate


Follow the below steps to play with this;

To start this; need to run this in two seperate terminal for each players
> $ node server.js

You will see list of options like below

Please select an option before start the game!
1. Create Wallet Account
2. Load wallet account using private key
3. Get an existing account
4. View available accounts
5. View account address
6. Get account balance
7. Purchase token
8. View token balance
9. Start Game!
10. Join to an existing Game!
11. Play!
12. View Game Board!
13. View Account Holders

Please select one and proceed further; To work better please follow these steps,

* Create an account using options 1/2; it will create an account with 0 ether balance
* To load an account with balance, select an account from available list by selecting option "3"
* Purchase token before starting the game using option "7"
* Start the game using option "9"; Join to an existing game by selecting option "10"
* To play the game select option 11
* To view the currrent game status, select option 12
