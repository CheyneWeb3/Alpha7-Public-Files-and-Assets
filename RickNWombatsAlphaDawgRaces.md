
# Alpha7 Dawg Race

Welcome to the Alpha7 Dawg Race, an exciting blockchain-based platform where you can participate in thrilling races, compete for fantastic prizes, and enjoy a fair and transparent gaming environment.

## For Average Users

### What is Alpha7 Dawg Race?

Alpha7 Dawg Race is a decentralized application (DApp) that lets you enter races by sending ERC20 tokens. Each race has its own unique name, sponsor, and link. You can easily join a race, track your participation, and claim your winnings if you are a winner. The platform is secure, transparent, and designed to provide a fun and engaging experience.

### How Easy is it to Use?

The frontend interface of Alpha7 Dawg Race is user-friendly and intuitive. Here’s how you can participate in a race:

1. **Connect Your Wallet:** Use your Ethereum wallet (e.g., MetaMask) to connect to the Alpha7 Dawg Race platform.
2. **Select a Race:** Browse through the available races and select the one you want to enter.
3. **Enter the Race:** Specify the race number and the amount of tokens you want to enter with. Remember, each entry costs a fixed amount of tokens (e.g., 10 tokens per entry).
4. **Track Your Entries:** Your entries are recorded, and you can track your participation history and the total amount spent.
5. **Claim Your Prizes:** If you win, claim your prize with a simple click.

## How to Enter a Race

1. **Ensure you have the required tokens in your wallet.**
2. **Connect your wallet to the Alpha7 Dawg Race platform.**
3. **Select a race and enter the race number.**
4. **Specify the amount of tokens to enter the race (must be a multiple of the entry cost).**
5. **Confirm the transaction in your wallet.**

## Detailed Documentation

### Features

- **Exciting Race Events:** Each race has a unique name, sponsor, and link, providing a personalized experience.
- **Transparent and Fair Races:** The status of each race (Open, Closed, Winners Pending, Paying, Finished) is publicly available.
- **Easy Participation:** Join races by specifying the race number and sending the required amount of ERC20 tokens.
- **Claim Your Prizes:** Winners can claim their prizes easily through the interface.
- **Track Your Performance:** Keep track of your entries, total spent, and total won. See how you rank on the leaderboard.
- **Reliable and Secure:** Built on blockchain technology, ensuring security, reliability, and trust.

### Functions of the Contract

#### Operator Management

1. **Add an Operator:**
   ```solidity
   function addOperator(address operator) external onlyOwner
   ```
   Adds an operator who can create races and set winners.

2. **Remove an Operator:**
   ```solidity
   function removeOperator(address operator) external onlyOwner
   ```
   Removes an operator.

#### Race Management

1. **Create a Race:**
   ```solidity
   function createRace(
       string calldata eventName,
       string calldata sponsorName,
       string calldata sponsorLink,
       uint256[] calldata prizePercentages
   ) external onlyOperator
   ```
   Creates a new race with specified details and prize distribution percentages.

2. **Enter a Race:**
   ```solidity
   function enterRace(uint256 raceNumber, uint256 amount) external onlyActiveRace(raceNumber) nonReentrant
   ```
   Allows users to enter a race by specifying the race number and sending the required tokens (must be a multiple of the entry cost).

3. **Close a Race:**
   ```solidity
   function closeRace(uint256 raceNumber) external onlyOperator
   ```
   Closes a race, preventing further entries.

4. **Set Winners:**
   ```solidity
   function setWinners(uint256 raceNumber, address[] calldata winners) external onlyOperator
   ```
   Sets the winners of a closed race and transitions the race status to Winners Pending.

5. **Mark Race as Finished:**
   ```solidity
   function markRaceAsFinished(uint256 raceNumber) external onlyOperator
   ```
   Marks a race as finished after prizes have been paid.

#### Prize Management

1. **Claim Prize:**
   ```solidity
   function claimPrize() external nonReentrant
   ```
   Allows winners to claim their prizes.

#### Token and Native Currency Recovery

1. **Recover ERC20 Tokens:**
   ```solidity
   function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyOwner
   ```
   Allows the owner to recover ERC20 tokens sent to the contract by mistake.

2. **Recover Native Currency:**
   ```solidity
   function recoverNative(uint256 amount) external onlyOwner
   ```
   Allows the owner to recover native currency (e.g., ETH) from the contract.

### Reading Race Details

1. **Get Race Details:**
   ```solidity
   function getRaceDetails(uint256 raceNumber) external view returns (
       string memory eventName,
       string memory sponsorName,
       string memory sponsorLink,
       RaceStatus status,
       uint256 totalEntries,
       uint256 totalAmount,
       uint256 uniqueAddressesCount,
       uint256[] memory prizePercentages,
       address[] memory winners
   )
   ```
   Fetches detailed information about a race, including event name, sponsor details, race status, total entries, total amount, unique addresses count, prize percentages, and winners.

2. **Get Unique Addresses Count:**
   ```solidity
   function getUniqueAddressesCount(uint256 raceNumber) internal view returns (uint256)
   ```
   Calculates the number of unique addresses that entered a race.

### Conclusion

Alpha7 Dawg Race is designed to provide an engaging and transparent racing experience. Whether you're a casual participant or a competitive player, the platform offers a fair and fun way to compete and win prizes. Join the Alpha7 Dawg Race today and start racing towards your next big win!

---
