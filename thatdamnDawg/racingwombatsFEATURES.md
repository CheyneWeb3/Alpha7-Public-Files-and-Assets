# TabbyWomBatRaceBetting Whitepaper

**Version:** 1.0  
**Date:** December 16, 2024

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Overview](#2-project-overview)
3. [Key Features](#3-key-features)
    - [Race Management](#31-race-management)
    - [Betting Mechanism](#32-betting-mechanism)
    - [Trifecta Jackpot System](#33-trifecta-jackpot-system)
    - [Sponsor Boosts](#34-sponsor-boosts)
    - [Claim System](#35-claim-system)
    - [Administrative Controls](#36-administrative-controls)
4. [Technical Architecture](#4-technical-architecture)
    - [Smart Contract Structure](#41-smart-contract-structure)
    - [Security Measures](#42-security-measures)
    - [Price Feed Integration](#43-price-feed-integration)
5. [Economic Model](#5-economic-model)
    - [Fund Allocation](#51-fund-allocation)
    - [Jackpot Distribution](#52-jackpot-distribution)
6. [User Guide](#6-user-guide)
    - [Getting Started](#61-getting-started)
    - [Placing Bets](#62-placing-bets)
    - [Finalizing Races](#63-finalizing-races)
    - [Claiming Winnings](#64-claiming-winnings)
    - [Participating in Trifecta](#65-participating-in-trifecta)

7. [Conclusion](#9-conclusion)
8. [Disclaimer](#10-disclaimer)

---

## 1. Introduction

Welcome to the **TabbyWomBatRaceBetting** platform—a decentralized betting solution built on the Ethereum blockchain. Leveraging smart contract technology and Chainlink price feeds, our platform offers users a secure, transparent, and engaging way to participate in race betting and trifecta jackpots.

---

## 2. Project Overview

**TabbyWomBatRaceBetting** is designed to facilitate betting on various races, allowing users to place wagers on contestants and potentially win substantial rewards. The platform incorporates a unique trifecta jackpot system, enabling users to predict the top three contestants and earn from collective winnings. Our mission is to provide a fair, decentralized, and user-friendly betting environment that maximizes transparency and minimizes fraud.

---

## 3. Key Features

### 3.1 Race Management

- **Race Creation:** Authorized admins or operators can create new races, specifying details such as race time, number of contestants, race name, sponsor information, and descriptions.
- **Dynamic Contestants:** Each race can have a customizable number of contestants, allowing flexibility to accommodate various racing events.
- **Race Finalization:** After a race concludes, admins or operators can finalize the race by declaring the top three winners, triggering the distribution of the betting pool.

### 3.2 Betting Mechanism

- **USD-Based Betting:** Users place bets using native tokens (e.g., ETH), with the equivalent USD amount determined via Chainlink price feeds.
- **Multiple Bets:** Users can place multiple bets on different contestants within the same race.
- **Exact Amount Requirement:** To ensure fairness, users must send the exact native token equivalent of the USD ticket price when placing a bet.

### 3.3 Trifecta Jackpot System

- **Trifecta Bets:** Users can place trifecta bets by selecting three unique contestants, predicting the top three finishers in any order.
- **Jackpot Accumulation:** 80% of trifecta entry fees contribute to the growing jackpot, while 20% is allocated to the treasury.
- **Winnings Distribution:** Upon race finalization, users with matching trifecta bets can claim their share of the jackpot.

### 3.4 Sponsor Boosts

- **Additional Funding:** Sponsors can boost a race's pool by contributing extra funds while the race is open, increasing the potential winnings for participants.
- **Transparency:** All sponsor contributions are transparently recorded on the blockchain, ensuring accountability.

### 3.5 Claim System

- **Individual Claims:** Users can claim their winnings from specific races they participated in.
- **Aggregate Claims:** Users have the option to claim all their accumulated winnings across races and trifecta bets in a single transaction.
- **Security:** Claims are processed securely using smart contract functions protected against reentrancy attacks.

### 3.6 Administrative Controls

- **Role Management:** Admins can transfer ownership, update operator and treasury addresses, set ticket and trifecta fees, and manage price feeds.
- **Fund Recovery:** Admins have the authority to recover native tokens from the contract to the treasury, ensuring fund management flexibility.
- **Access Restrictions:** Critical functions are restricted to authorized roles, preventing unauthorized access and potential abuse.

---

## 4. Technical Architecture

### 4.1 Smart Contract Structure

The **TabbyWomBatRaceBetting** smart contract is structured with modular components to handle various functionalities:

- **Enums & Structs:** Define race statuses, race details, user bets, and trifecta bets for organized data management.
- **State Variables:** Manage administrative roles, financial metrics, race data, user statistics, and prize distributions.
- **Modifiers:** Enforce access control and validate race IDs to maintain contract integrity.
- **Functions:** Implement race creation, betting, finalization, trifecta management, claiming winnings, and administrative tasks.
- **Events:** Emit events for critical actions, facilitating off-chain tracking and transparency.

### 4.2 Security Measures

- **Reentrancy Protection:** Inherited from a custom `ReentrancyGuard`, ensuring that sensitive functions cannot be exploited through reentrant calls.
- **Access Control:** Utilizes `onlyAdmin` and `onlyOperatorOrAdmin` modifiers to restrict function access to authorized roles.
- **Safe Ether Transfers:** Implements the `_safeTransfer` function using low-level `call` with proper error handling to ensure secure fund transfers.
- **Input Validation:** Ensures that all inputs, such as race times, contestant numbers, and fee amounts, are valid and within expected ranges.

### 4.3 Price Feed Integration

- **Chainlink AggregatorV3Interface:** Integrates with Chainlink's price feeds to obtain the latest ETH/USD prices, enabling accurate conversion between USD-based fees and native tokens.
- **Fallback Mechanisms:** Requires that price feeds are set and returns valid data to prevent the use of stale or incorrect price information.

---

## 5. Economic Model

### 5.1 Fund Allocation

- **Betting Pool:** All user bets contribute to a race's total pool, which is distributed among winners upon race finalization.
- **Treasury Allocation:** A fixed percentage (20%) of each race's pool is allocated to the treasury, ensuring sustainable fund management and platform operations.
- **Trifecta Entry Fees:** 20% of trifecta entry fees are sent to the treasury, while the remaining 80% build the trifecta jackpot.

### 5.2 Jackpot Distribution

- **Race Winners:**
    - **First Place:** Receives 40% of the total pool.
    - **Second Place:** Receives 25% of the total pool.
    - **Third Place:** Receives 15% of the total pool.
    - **Treasury:** Retains 20% of the total pool.

- **Trifecta Winners:**
    - **Jackpot Share:** Upon correctly predicting the top three contestants, users can claim a share of the accumulated trifecta jackpot.

---

## 6. User Guide

### 6.1 Getting Started

1. **Wallet Setup:** Ensure you have an Ethereum-compatible wallet (e.g., MetaMask) with sufficient native tokens (e.g., ETH) to participate.
2. **Accessing the Platform:** Interact with the **TabbyWomBatRaceBetting** contract via a user interface or directly through wallet integrations like Remix.
3. **Funding Your Wallet:** Acquire native tokens from exchanges to place bets on races.

### 6.2 Placing Bets

1. **Select a Race:** Choose an open race from the list of available races.
2. **Choose a Contestant:** Select the contestant you wish to bet on.
3. **Send Exact Amount:** Ensure you send the exact native token equivalent of the USD ticket price when placing your bet.
4. **Confirm Transaction:** Approve the transaction in your wallet to finalize your bet.

### 6.3 Finalizing Races

1. **Race Conclusion:** Once the race time has passed, authorized admins or operators can finalize the race.
2. **Declare Winners:** Provide the top three contestants' numbers as winners.
3. **Distribution:** The contract automatically distributes the pool based on predefined percentages and handles treasury allocations.

### 6.4 Claiming Winnings

1. **After Finalization:** Once a race is finalized, navigate to your winnings section.
2. **Individual Claims:** Claim winnings from specific races you participated in.
3. **Aggregate Claims:** Opt to claim all your accumulated winnings across races and trifectas in one transaction.
4. **Transaction Approval:** Approve the claim transaction in your wallet to receive your funds.

### 6.5 Participating in Trifecta

1. **Place Trifecta Bet:** Select three unique contestants predicting the top three finishers.
2. **Send Exact Fee:** Ensure you send the exact native token equivalent of the USD trifecta entry fee.
3. **Await Finalization:** After race finalization, if your trifecta prediction matches the winners, proceed to claim your jackpot share.
4. **Claim Trifecta Winnings:** Navigate to the trifecta winnings section and claim your share based on the jackpot.



## 7. Conclusion

**TabbyWomBatRaceBetting** aims to revolutionize the betting landscape by offering a decentralized, transparent, and secure platform for race enthusiasts and bettors. By leveraging blockchain technology and integrating advanced features like trifecta jackpots and sponsor boosts, we provide users with an engaging and trustworthy betting experience. Our commitment to security, transparency, and user satisfaction positions us as a leader in the decentralized betting ecosystem.

---

## 8. Disclaimer

This whitepaper is for informational purposes only and does not constitute financial or legal advice. Investing in smart contracts and participating in betting carries inherent risks. Users should perform their own due diligence and consult with professionals before engaging with the **TabbyWomBatRaceBetting** platform. The team is not liable for any losses or damages incurred from using this contract.

---


# Final Notes

This whitepaper provides a comprehensive overview of the **TabbyWomBatRaceBetting** smart contract, detailing its functionalities, security measures, economic model, and user interactions. By following the outlined recommendations and adhering to best practices, the platform is poised to offer a secure and engaging betting experience on the blockchain.

