# That Damn Dawg! DApp User Documentation

Welcome to the That Damn Dawg! Decentralized Application (DApp)! This comprehensive manual will guide you through the process of playing the game, understanding how wins are finalized, how winnings are paid, and how the draw mechanism works. Additionally, we will provide a detailed explanation of the mechanics and functions of the contract.

---
#### Think Rock, Paper, Scissors, otherwise known as RoShamBo. Now with That Damn Dawg! We Have The Dawg, The Man, The Hole!

## Introduction

### A Unique Player Vs Player Ro-Sham-Bo Style Web3 Game.

Compete, strategize, and dominate in "That Damn Dawg!", a thrilling blockchain game where you can challenge other players, create your own games, and prove your dominance.

### The Legend Behind "That Damn Dawg!"

In a quiet suburban neighborhood, there was a mischievous dawg known for digging holes everywhere. One sunny afternoon, the dawg decided to dig a hole in the front yard of a particularly clumsy man. As the dawg dug, the man, not paying attention, walked right into the hole, falling with a thud.

Covered in dirt and embarrassed, the man looked up to see the dawg peering over the edge. "That damn dawg!" he yelled, shaking his fist. The neighbors couldn't help but laugh at the scene. This little incident inspired the creation of "That Damn Dawg!", where you can relive the fun and outsmart your opponents.

## How to Play

### 1. Creating a Game

Creating a game is the first step in the That Damn Dawg! DApp. Here’s how you do it:

- **Step 1:** Connect your wallet to the DApp. Ensure you have enough cryptocurrency (ETH) to cover the bet amount and potential gas fees.
- **Step 2:** Navigate to the "Create Game" section on the interface.
- **Step 3:** Enter the amount of ETH you want to bet. This amount will be matched by your opponent when they join the game.
- **Step 4:** Select your move (Man, Hole, or Dawg) from a dropdown or input field. This move is your initial choice for the game.
- **Step 5:** Optionally, provide an avatar string to represent your profile in the game.
- **Step 6:** Click on "Create Game" and confirm the transaction in your wallet. The transaction will include the bet amount.
- **Step 7:** Your game will be created and listed as an active game. Other players can now see your game and choose to join it.

### 2. Joining a Game

To join an existing game created by another player:

- **Step 1:** Connect your wallet to the DApp. Ensure you have enough ETH to match the bet amount and cover gas fees.
- **Step 2:** Browse the list of active games in the "Join Game" section.
- **Step 3:** Select a game to join. Ensure that you are comfortable with the bet amount set by the game's creator.
- **Step 4:** Enter the bet amount, which must match the creator's bet amount.
- **Step 5:** Choose your move (Man, Hole, or Dawg) from a dropdown or input field.
- **Step 6:** Optionally, provide an avatar string to represent your profile in the game.
- **Step 7:** Click on "Join Game" and confirm the transaction in your wallet. The transaction will include the bet amount.
- **Step 8:** Your move will be recorded, and the game will be finalized if both moves are valid.

### 3. Retrying a Game

In the event of a draw, the game must be retried:

- **Step 1:** Navigate to your active games and select the game that ended in a draw.
- **Step 2:** Choose a new move (Man, Hole, or Dawg) and enter it as a string.
- **Step 3:** Click on "Retry Game" and confirm the transaction in your wallet. The transaction will include no additional bet amount.
- **Step 4:** The game will be retried, and a winner will be determined if the moves are different.

### 4. Claiming a Win Due to Abandonment

If your opponent has not completed their move within 48 hours, you can claim the win due to abandonment:

- **Step 1:** Navigate to your active games and select the game where your opponent hasn't moved within 48 hours.
- **Step 2:** Click on "Claim Win Due to Abandonment" and confirm the transaction in your wallet.
- **Step 3:** The game will be marked as abandoned, and you will be declared the winner.

---

## Understanding Wins and Draws

### 1. Finalizing Wins

After both players have made their moves, the game is finalized based on the following rules:

- **Man beats Dawg**
- **Dawg beat Hole**
- **Hole beats Man**

The contract checks the moves, determines the winner, and updates the game status. If the moves are different, the winner is awarded the bet amount minus a small battle fee, and the game is marked as completed.

### 2. Draws and Retries

A draw occurs when both players choose the same move (Man, Hole, or Dawg). In this case:

- The game is marked as a draw.
- Both players must retry the game by selecting new moves.
- Each player has 48 hours to make their move. If a player fails to make a move within this time, the other player can claim a win due to abandonment.

### 3. Claiming a Win Due to Abandonment

In case of a Draw, Where if one player fails to make their move within 48 hours, the other player can claim the win due to a draw abandonment. This ensures that games with draws do not remain in an unresolved state indefinitely. Or players who play under the belt and fail to submit thier redraw move for nefaris actions, with the possibility of being blacklisted in futureThat Damn Dawg! gameplay.

---

## Winnings and Payment

### 1. Calculating Rewards

The winner of a game receives the total bet amount minus a small battle fee (percentage of the bet amount). For example, if the bet amount is 1 ETH and the battle fee is 5%, the winner receives 1.9 ETH (total bet amount minus the battle fee).

### 2. Claiming Rewards

After winning a game, the rewards are stored as unclaimed rewards. To claim your rewards:

- **Step 1:** Navigate to the "Claim Rewards" section.
- **Step 2:** Click on "Claim Rewards" and confirm the transaction in your wallet.
- **Step 3:** The rewards will be transferred to your wallet.

### 3. Handling Fees

A small fee is deducted from the total bet amount and transferred to the treasury address. The remaining amount is distributed to the winner. This fee helps to maintain the contract and cover operational costs.

### 4. Canceling a Game

Only the owner can cancel a game, and it can only be canceled if it is in the CREATED or JOINED state. This can be used in cases where the bet amount is incorrect or there are other issues:

- **Step 1:** The owner selects the game to cancel.
- **Step 2:** A small cancellation fee is deducted, and the remaining amount is refunded to the creator.
- **Step 3:** The game is removed from the active games list.

---

## Mechanics and Functions

### 1. Game Structure

The core of the That Damn Dawg! game is managed by the `Game` struct:

```solidity
struct Game {
    address creator;
    address joiner;
    uint256 betAmount;
    string creatorMove;
    string joinerMove;
    GameStatus status;
    uint256 creationTime;
    uint256 lastMoveTime;
    address winner;
    string avatars; // Format: "creatorAvatar;joinerAvatar"
}
```

### 2. Game Status

The `GameStatus` enum represents the different states a game can be in:

```solidity
enum GameStatus { CREATED, JOINED, DRAW, REDRAW, COMPLETED, ABANDONED }
```

### 3. Creating a Game

The `createGame` function allows a user to create a new game:

```solidity
function createGame(uint256 betAmount, string memory move, string memory creatorAvatar) external payable notBlacklisted nonReentrant {
    // Ensure new games are not paused
    require(!newGamesPaused, "New games are paused");
    // Ensure the correct bet amount is sent
    require(msg.value == betAmount, "Incorrect bet amount");
    // Ensure the move is valid
    require(isValidMove(move), "Invalid move");

    // Increment the game ID
    uint256 gameId = nextGameId++;

    // Create the game
    games[gameId] = Game({
        creator: msg.sender,
        joiner: address(0),
        betAmount: betAmount,
        creatorMove: move,
        joinerMove: "",
        status: GameStatus.CREATED,
        creationTime: block.timestamp,
        lastMoveTime: block.timestamp,
        winner: address(0),
        avatars: string(abi.encodePacked(creatorAvatar, ";"))
    });

    // Update mappings and arrays
    playerGames[msg.sender].push(gameId);
    activeGameIds.push(gameId);
    valueSpent[msg.sender] += betAmount;

    // Emit the GameCreated event
    emit GameCreated(gameId, msg.sender, betAmount, games[gameId].avatars);
}
```

### 4. Joining a Game

The `joinGame` function allows a user to join an existing game:

```solidity
function joinGame(uint256 gameId, uint256 betAmount, string memory move, string memory joinerAvatar) external payable gameExists(gameId) notBlacklisted nonReentrant {
    Game storage game = games[gameId];
    // Ensure the game is available to join
    require(game.status == GameStatus.CREATED, "Game is not available");
    // Ensure the correct bet amount is sent
    require(msg.value == betAmount, "Incorrect bet amount");
    // Ensure the bet amount matches the creator's bet
    require(betAmount == game.betAmount, "Bet amount does not match");
    // Ensure the move is valid
    require(isValidMove(move), "Invalid move");

    // Update game details
    game.joiner = msg.sender;
    game.joinerMove = move;
    game.status = GameStatus.JOINED;
    game.lastMoveTime = block.timestamp;
    game.avatars = string(abi.encodePacked(game.avatars, joinerAvatar));

    // Update mappings and arrays
    playerGames[msg.sender].push(gameId);
    valueSpent[msg.sender] += betAmount;

    // Finalize the game
    finalizeGame(gameId);

    // Emit the GameJoined event
    emit GameJoined(gameId, msg.sender, game.avatars);


}
```

### 5. Finalizing a Game

The `finalizeGame` function determines the winner of the game:

```solidity
function finalizeGame(uint256 gameId) internal {
    Game storage game = games[gameId];

    // Calculate the battle fee and reward
    uint256 battleFee = (game.betAmount * battleFeePercent) / 100;
    uint256 reward = (game.betAmount * 2) - battleFee;
    totalFeesCollected += battleFee;
    totalValueCollected += game.betAmount * 2;

    // Get the moves
    Move creatorMove = getMoveFromString(game.creatorMove);
    Move joinerMove = getMoveFromString(game.joinerMove);

    // Determine the winner
    if (creatorMove == joinerMove) {
        game.status = GameStatus.DRAW;
        game.creatorMove = "";
        game.joinerMove = "";
        emit GameDraw(gameId);
    } else if (
        (creatorMove == Move.MAN && joinerMove == Move.DAWG) ||
        (creatorMove == Move.HOLE && joinerMove == Move.MAN) ||
        (creatorMove == Move.DAWG && joinerMove == Move.HOLE)
    ) {
        game.winner = game.creator;
        unclaimedRewards[game.creator] += reward;
        valueWon[game.creator] += reward;
        gamesWon[game.creator]++;
        game.status = GameStatus.COMPLETED;
    } else {
        game.winner = game.joiner;
        unclaimedRewards[game.joiner] += reward;
        valueWon[game.joiner] += reward;
        gamesWon[game.joiner]++;
        game.status = GameStatus.COMPLETED;
    }

    // Update mappings and arrays
    if (game.status == GameStatus.COMPLETED) {
        totalGamesPlayed++;
        gamesPlayed[game.creator]++;
        gamesPlayed[game.joiner]++;
        removeActiveGame(gameId);
        completedGameIds.push(gameId);

        // Transfer the battle fee to the treasury
        payable(treasury).transfer(battleFee);

        // Emit the GameCompleted event
        emit GameCompleted(gameId, game.winner, reward, moveToString(creatorMove), moveToString(joinerMove));
    }
}
```

### 6. Retrying a Game

The `retryGame` function allows players to retry a game after a draw:

```solidity
function retryGame(uint256 gameId, string memory move) external gameExists(gameId) notBlacklisted nonReentrant {
    Game storage game = games[gameId];
    // Ensure the game is in a retryable state
    require(game.status == GameStatus.DRAW || game.status == GameStatus.REDRAW, "Game is not in retry state");
    // Ensure the caller is a participant of the game
    require(msg.sender == game.creator || msg.sender == game.joiner, "Not a participant of this game");
    // Ensure the move is valid
    require(isValidMove(move), "Invalid move");

    // Update the move and status
    if (msg.sender == game.creator) {
        game.creatorMove = move;
        game.lastMoveTime = block.timestamp;
        if (bytes(game.joinerMove).length == 0) {
            game.status = GameStatus.REDRAW;
        }
    } else if (msg.sender == game.joiner) {
        game.joinerMove = move;
        game.lastMoveTime = block.timestamp;
        if (bytes(game.creatorMove).length == 0) {
            game.status = GameStatus.REDRAW;
        }
    }

    // Finalize the game if both moves are set
    if (bytes(game.creatorMove).length > 0 && bytes(game.joinerMove).length > 0) {
        finalizeGame(gameId);
    }

    // Emit the GameRedraw event
    emit GameRedraw(gameId, msg.sender);
}
```

### 7. Claiming a Win Due to Abandonment

The `claimWinDueToAbandonment` function allows a player to claim a win if the opponent has not moved within 48 hours:

```solidity
function claimWinDueToAbandonment(uint256 gameId) external gameExists(gameId) notBlacklisted nonReentrant {
    Game storage game = games[gameId];
    // Ensure the game is in a claimable state
    require(game.status == GameStatus.CREATED || game.status == GameStatus.JOINED || game.status == GameStatus.DRAW || game.status == GameStatus.REDRAW, "Game is not in a claimable state");
    // Ensure the caller is a participant of the game
    require(msg.sender == game.creator || msg.sender == game.joiner, "Not a participant of this game");
    // Ensure 48 hours have passed since the last move
    require(block.timestamp > game.lastMoveTime + 48 hours, "48 hours have not passed since the last move");

    address winner;
    if (msg.sender == game.creator && bytes(game.joinerMove).length == 0) {
        winner = game.creator;
    } else if (msg.sender == game.joiner && bytes(game.creatorMove).length == 0) {
        winner = game.joiner;
    } else {
        revert("The opponent has already made a move");
    }

    // Calculate the battle fee and reward
    uint256 battleFee = (game.betAmount * battleFeePercent) / 100;
    uint256 reward = (game.betAmount * 2) - battleFee;
    totalFeesCollected += battleFee;
    totalValueCollected += game.betAmount * 2;
    game.winner = winner;
    unclaimedRewards[winner] += reward;
    valueWon[winner] += reward;
    gamesWon[winner]++;
    game.status = GameStatus.ABANDONED;

    // Update mappings and arrays
    totalGamesPlayed++;
    gamesPlayed[game.creator]++;
    gamesPlayed[game.joiner]++;
    removeActiveGame(gameId);
    completedGameIds.push(gameId);

    // Transfer the battle fee to the treasury
    payable(treasury).transfer(battleFee);

    // Emit the GameAbandoned event
    emit GameAbandoned(gameId, winner);
}
```

### 8. Claiming Rewards

The `claimReward` function allows players to claim their unclaimed rewards:

```solidity
function claimReward() external notBlacklisted nonReentrant {
    uint256 reward = unclaimedRewards[msg.sender];
    // Ensure the user has unclaimed rewards
    require(reward > 0, "No unclaimed rewards");

    // Reset the unclaimed rewards to prevent double claiming
    unclaimedRewards[msg.sender] = 0;
    // Transfer the reward to the user
    payable(msg.sender).transfer(reward);

    // Emit the RewardClaimed event
    emit RewardClaimed(msg.sender, reward);
}
```

### 9. Canceling a Game

The `cancelGame` function allows the owner to cancel a game in the CREATED or JOINED state:

```solidity
function cancelGame(uint256 gameId) external onlyOwner gameExists(gameId) nonReentrant {
    Game storage game = games[gameId];
    // Ensure the game is in a cancelable state
    require(game.status == GameStatus.CREATED || game.status == GameStatus.JOINED, "Game is not in cancelable state");

    // Calculate the cancel fee and refund amount
    uint256 cancelFee = (game.betAmount * cancelFeePercent) / 100;
    uint256 refundAmount = game.betAmount - cancelFee;

    // Update the total fees collected
    totalFeesCollected += cancelFee;
    // Remove the game from the active games list and delete it
    removeActiveGame(gameId);
    delete games[gameId];

    // Transfer the cancel fee to the treasury and the refund amount to the creator
    payable(treasury).transfer(cancelFee);
    payable(game.creator).transfer(refundAmount);

    // Emit the CancelledGame event
    emit CancelledGame(gameId, game.creator, refundAmount);
}
```


## Conclusion

The That Damn Dawg! DApp provides an engaging and transparent platform for users to play the classic game on the blockchain. By following this comprehensive guide, you can confidently create and join games, understand how winners are determined, and claim your rewards. The detailed mechanics and functions ensure the game's integrity and fairness, making it a reliable and enjoyable experience for all players. Happy gaming!
```
