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

