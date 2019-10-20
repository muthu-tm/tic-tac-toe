pragma solidity ^0.5.0;


contract TicTacToe {
    
    address payable owner;
    uint tokenSupply = 1000000;
    uint tokenValue = 10;
    
    mapping(address => uint) public playerTokenMapping;
    mapping(address => uint) tokenLockMapping;
    address[] public holders;

    struct Game {
        uint    totalRounds;
        uint    currentRound;
        uint    turn;
        address payable player1;
        address payable player2;
        uint    time_limit;
        uint[]  betForEachRounds;
        mapping(uint => mapping(uint => uint)) board;
    }
    
    Game private game;
    
    constructor() public {
        owner = msg.sender;
    }
    
    /**
     * @dev User buys few tokens to their account
     * @param _token - number of tokens to buy
     */
    function getToken(uint _token)  public payable returns(uint){
        uint _weiAmount = _token * tokenValue;
        require(msg.value >= _weiAmount, "Insufficient value sent to buy token");
        
        owner.transfer(_weiAmount);
        tokenSupply -= _token;
        playerTokenMapping[msg.sender] += _token;
        holders.push(msg.sender);
        
        return playerTokenMapping[msg.sender];
    }

    function getTokenHolders() public view returns (address[] memory) {
        return holders;
    }
    
    /**
     * @dev It starts a new game by initialising it
     * @param _rounds - number of rounds
     * @param _betForEachRounds - list of bet amounts for each round
     */
    function start(uint _rounds, uint[] memory _betForEachRounds) public {
        require(_rounds == _betForEachRounds.length, "Bet for each round is not equals to total rounds count!");
        game = Game(_rounds, 0, 1, msg.sender, address(0), 0, _betForEachRounds);
        lockDownTokens(getTotalBetToken());

        for (uint row; row < 3; row++)
            for(uint column; column < 3; column++)
                game.board[row][column] = 0;
    }
    
    /**
     * @dev the second player to join the existing game
     * 
     */
    function join() public {
        require (game.player1 != address(0), "Player1 has not joined yet, you cannot JOIN; Please start new Game");
        lockDownTokens(getTotalBetToken());
        
        game.player2 = msg.sender;
        game.time_limit = block.timestamp + (120);
    }
    
    /**
     * @dev Once after starting the game player will use this method to play
     * @param _row - the row the player wants to take
     * @param _column - the column the player wants to pick
     */
    function play(uint _row, uint _column) public returns(string memory){
        uint8 player = 2;
        bool isTimeElapsed = false;
        if (msg.sender == game.player1)
            player = 1;
            
        if (block.timestamp > game.time_limit) {
            resetTimeLimit(player);
            isTimeElapsed = true;
        }
            
        require(!isTimeElapsed, "Time limit exceeded, you cannot continue! Opposite player's turn..");
        
           
        if (game.currentRound <= game.totalRounds && game.player2 != address(0)
        && _row >= 0 && _row < 3 && _column >= 0 && _column < 3
        && game.board[_row][_column] == 0
        && (game.time_limit == 0 || block.timestamp <= game.time_limit)
        && game.turn == player) {
            game.board[_row][_column] = player;
            
            if(isFull()) {
                releaseToken(game.player1);
                releaseToken(game.player2);
                return "Game Table full, match TIED!";
            }
            
            if (isWinner(player)) {
                if (player == 1) {
                    releaseToken(game.player1);
                    releaseToken(game.player2);
                    transfer(game.player2, game.player1, game.betForEachRounds[game.currentRound]);
                }
                else {
                    releaseToken(game.player1);
                    releaseToken(game.player2);
                    transfer(game.player1, game.player2, game.betForEachRounds[game.currentRound]-1);
                }

                return "Winner!";
            }
            game.time_limit = block.timestamp + (120);
            
            if (player == 1) {
                game.currentRound += 1;
                game.turn = 2;
                return "Player2's turn";
            }
            else {
                game.turn = 1;
                return "Player1's turn";
            }
            
        }
        
        return "ERROR!";
    }
    
    /**
     * @dev utility method to check the current status of the table
     */
    function check(uint _player, uint _row1, uint _row2, uint _row3, uint _column1, uint _column2, uint _column3)
                    internal view returns (bool) {
        if (game.board[_row1][_column1] == _player && game.board[_row2][_column2] == _player
        && game.board[_row3][_column3] == _player)
            return true;
    }
    
    /**
     * @dev checks the current sender is the game winner
     * @param _player - int represent whether the current sender is Player1/Player2
     * @return bool - checks whether the player is winner or not
     */
    function isWinner(uint _player) internal view returns (bool winner) {
        if (check(_player, 0, 1, 2, 0, 1, 2)
        || check(_player, 0, 1, 2, 2, 1, 0))
            return true;
            
        for (uint row; row < 3; row++)
            if(check(_player, row, row, row, 0, 1, 2)
            || check(_player, 0, 1, 2, row, row, row))
                return true;
    }
    
    /**
     * @dev used to check whether the game table was full
     * @return bool - boolean that represent the table status
     */
    function isFull() internal view returns (bool) {
        uint count = 0;
        for (uint row; row < 3; row++)
            for(uint column; column < 3; column++)
                if(game.board[row][column] > 0)
                    count++;
        
        if (count >= 9)
            return true;
    }
    
    /**
     * @dev - returns the current game status
     */
    function getState() public view returns (uint totalRounds, uint currentRound, uint[] memory betForEachRounds, address player1, address player2,
    uint timelimit, uint turn, uint row1, uint row2, uint row3) {
        totalRounds = game.totalRounds;
        currentRound = game.currentRound;
        betForEachRounds = game.betForEachRounds;
        player1 = game.player1;
        player2 = game.player2;
        timelimit = game.time_limit;
        turn = game.turn;
        
        row1 = (100 * (game.board[0][0] + 5)) 
        + (10 * (game.board[0][1]  + 5)) + (game.board[0][2]  + 5);
        row2 = (100 * (game.board[1][0] + 5)) 
        + (10 * (game.board[1][1] + 5)) + (game.board[1][2] +5);
        row3 = (100 * (game.board[2][0] + 5)) 
        + (10 * (game.board[2][1] + 5)) + (game.board[2][2] +5);
    }
    
    /**
     * @dev resets the timelimit and changes the player turn
     * @param _player - current player
     */
    function resetTimeLimit(uint8 _player) private {
        if (_player == 1)
                game.turn = 2;
            else
                game.turn = 1;
                
        game.time_limit = block.timestamp + (120);
    }
    
    /**
     * @dev get total bet tokens
     * @return uint - total token count
     */
    function getTotalBetToken() private view returns(uint) {
        uint total = 0;
        for (uint index = 0; index < game.betForEachRounds.length; index++)
            total += game.betForEachRounds[index];

        return total;
    }
    
     /**
     * @dev returns total token supply
     * @return uint - totaltoken supply
     */
    function totalSupply() public view returns(uint) {
        return tokenSupply;
    }
    
    /**
     * @dev returns the balance token of the provided address
     * @param _playerAddress - address of the player to check the token balance
     * @return uint - token balance
     */
    function balanceOf(address _playerAddress) public view returns(uint) {
        return playerTokenMapping[_playerAddress];
    }
    
    
    /**
     * @dev transfer the amount of token to _toAddress from _fromAddress
     * @param _fromAddress - From address of the player
     * @param _toAddress - To address of the player
     * @param _token - amount of token to send
     * @return bool - whether the transfer was success or not
     * 
     */
    function transfer(address _fromAddress, address _toAddress, uint _token) private returns(bool) {
        uint senderToken = playerTokenMapping[_fromAddress];
        
        //check for sufficient balance in sender account
        require(senderToken >= _token, "Insufficient amount of token");
        
        playerTokenMapping[_toAddress] += _token;
        playerTokenMapping[_fromAddress] -= _token;
    }
    
    /**
     * @dev Player should buy token using theri ether
     * @param _weiAmount - amount to buy token
     * @param _token - amount of token to buy
     */
    function buyToken(address _playerAddress, uint _token, uint _weiAmount) private  {
        playerTokenMapping[_playerAddress] += _token;
        owner.transfer(_weiAmount);
        tokenSupply -= _token;
    }
    
    /**
     * @dev locks down the total bet tokens till the game seconds
     * @param _token - total bet amount
     */
    function lockDownTokens(uint _token) private {
        //check for sufficient token to bet for game
        require(playerTokenMapping[msg.sender] >= _token, "Insufficient token in sender account to bet");
        
        tokenLockMapping[msg.sender] += _token;
        playerTokenMapping[msg.sender] -= _token;
    }
    
    /**
     * @dev Once the game was over players token will be released
     * @param _playerAddress - address of the player
     */
    function releaseToken(address _playerAddress) private {
        uint token = tokenLockMapping[_playerAddress];
        playerTokenMapping[_playerAddress] += token;
    }
}

