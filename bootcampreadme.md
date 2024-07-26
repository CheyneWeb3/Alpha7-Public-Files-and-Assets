
# Boot Camp Subscription Service Smart Contract

## Introduction

The `SubscriptionService` smart contract is designed to manage user subscriptions, allowing users to register, subscribe, and renew their subscriptions. It also includes features for referral rewards, discount codes, and the ability for users to update their personal details. The contract is secure and ensures fair distribution of subscription fees between a treasury wallet and an operations wallet.

## Quick Start

1. **Deployment:**
   Deploy the contract with the required initial parameters:
   - `referralPercentage`: The percentage of each subscription payment that goes to the referrer.
   - `treasuryWallet`: The address of the treasury wallet.
   - `operationsWallet`: The address of the operations wallet.
   - `treasuryPercentage`: The percentage of the subscription fees that goes to the treasury wallet.
   - `operationsPercentage`: The percentage of the subscription fees that goes to the operations wallet.

2. **Registering a User:**
   Users can register by providing a username, telegram handle, referrer's username, TV type, model number, and TV code.

3. **Starting a Subscription:**
   Users can start their subscription by paying the monthly cost. Optionally, they can use a discount code to get a discount on the subscription fee.

4. **Renewing a Subscription:**
   Users can renew their subscription for 1 to 12 months by paying the corresponding fee. A discount code can also be applied.

5. **Updating User Details:**
   Users can update their account details.

6. **Managing Discount Codes:**
   The contract owner can add, update, and remove discount codes.

## Detailed Explanation

### Contract Overview

The `SubscriptionService` contract is built with several key functionalities:
- **User Registration**: Allows users to register with a username, telegram handle,  and a referrer.
- **Subscription Management**: Users can start and renew subscriptions, with payments distributed between treasury and operations wallets.
- **Referral System**: Users can earn referral rewards when they refer new users.
- **Discount Codes**: Users can use discount codes to get a discount on subscription fees.
- **User Management**: Users can update their account details, and the owner can manage discount codes.

### Contract Functions

#### User Registration

- **register**: Registers a new user.
  ```solidity
  function register(string memory _username, string memory _telegram, string memory referrerUsername, string memory _tvType, string memory _modelNumber, string memory _tvCode) external
  ```
  - Parameters:
    - `_username`: The username of the user.
    - `_telegram`: The telegram handle of the user.
    - `referrerUsername`: The username of the referrer.
    - 
#### Subscription Management

- **startSubscription**: Starts a subscription for the user.
  ```solidity
  function startSubscription(string memory discountCode) external payable nonReentrant
  ```
  - Parameters:
    - `discountCode`: (Optional) A discount code to get a discount on the subscription fee.

- **paySubscription**: Renews the subscription for the user.
  ```solidity
  function paySubscription(uint256 months, string memory discountCode) external payable onlyRegistered nonReentrant
  ```
  - Parameters:
    - `months`: The number of months to renew the subscription.
    - `discountCode`: (Optional) A discount code to get a discount on the subscription fee.

#### Referral Management

- **getReferralEarnings**: Gets the total referral earnings of the user.
  ```solidity
  function getReferralEarnings(address _user) external view returns (uint256)
  ```

- **getTotalReferralEarnings**: Gets the total referral earnings for all users.
  ```solidity
  function getTotalReferralEarnings() external view returns (uint256)
  ```

#### Discount Code Management

- **addDiscountCode**: Adds a new discount code.
  ```solidity
  function addDiscountCode(string memory code, uint256 percentage) external onlyOwner
  ```

- **updateDiscountCode**: Updates an existing discount code.
  ```solidity
  function updateDiscountCode(string memory code, uint256 percentage) external onlyOwner
  ```

- **removeDiscountCode**: Removes a discount code.
  ```solidity
  function removeDiscountCode(string memory code) external onlyOwner
  ```

#### Treasury and Operations Management

- **setTreasuryWallet**: Sets the treasury wallet address.
  ```solidity
  function setTreasuryWallet(address _treasuryWallet) external onlyOwner
  ```

- **setOperationsWallet**: Sets the operations wallet address.
  ```solidity
  function setOperationsWallet(address _operationsWallet) external onlyOwner
  ```

- **setTreasuryPercentage**: Sets the percentage of fees going to the treasury wallet.
  ```solidity
  function setTreasuryPercentage(uint256 _treasuryPercentage) external onlyOwner
  ```

- **setOperationsPercentage**: Sets the percentage of fees going to the operations wallet.
  ```solidity
  function setOperationsPercentage(uint256 _operationsPercentage) external onlyOwner
  ```

- **withdrawFunds**: Withdraws funds from the contract to the treasury and operations wallets.
  ```solidity
  function withdrawFunds() external onlyOwner nonReentrant
  ```

#### Utility Functions

- **getUserByAddress**: Gets user details by their address.
  ```solidity
  function getUserByAddress(address _user) external view returns (string memory, string memory, uint256, uint256, uint256, uint256, address, string memory, string memory, string memory, string memory, string memory, uint256)
  ```

- **getUserByUniqueId**: Gets user details by their unique ID.
  ```solidity
  function getUserByUniqueId(uint256 uniqueId) external view returns (string memory, string memory, uint256, uint256, uint256, uint256, address, string memory, string memory, string memory, string memory, string memory, uint256)
  ```

- **getUserUniqueId**: Gets the unique ID of a user by their address.
  ```solidity
  function getUserUniqueId(address _user) external view returns (uint256)
  ```

- **getPayments**: Gets payment details of a user.
  ```solidity
  function getPayments(address _user, uint256 paymentIndex) external view returns (uint256, uint256)
  ```

- **getValidUsers**: Gets the list of valid (active) users.
  ```solidity
  function getValidUsers() external view returns (address[] memory)
  ```

- **getExpiredUsers**: Gets the list of expired users.
  ```solidity
  function getExpiredUsers() external view returns (address[] memory)
  ```

- **getUserStats**: Gets the statistics (days remaining, total payments) of a user.
  ```solidity
  function getUserStats(address _user) external view returns (uint256, uint256)
  ```

## Security Considerations

- **Reentrancy Protection**: Functions that transfer Ether use the `nonReentrant` modifier to prevent reentrancy attacks.
- **Access Control**: Functions are restricted to the owner or the registered user where necessary to prevent unauthorized access.

## Conclusion

The `SubscriptionService` smart contract provides a robust and flexible solution for managing subscriptions with added benefits like referral rewards and discount codes. It ensures security and fairness in the distribution of funds, making it suitable for a wide range of subscription-based services.
