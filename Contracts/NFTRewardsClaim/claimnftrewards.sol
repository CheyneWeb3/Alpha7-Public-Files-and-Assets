// SPDX-License-Identifier: MIT

// NFT Address AlphaDawgz: 0xCa695FEB6b1b603ca9fec66aaA98bE164db4E660

pragma solidity ^0.8.0;

interface IERC721 {
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function totalSupply() external view returns (uint256);
}

contract NFTRewards {
    IERC721 public immutable nft;
    address public owner;

    mapping(uint256 => uint256) public rewardBalance;
    mapping(address => uint256) public totalRewardsClaimed;
    mapping(address => bool) public excludedFromRewards;

    uint256 public totalEligibleTokens;
    bool private locked;

    event RewardsClaimed(address indexed claimant, uint256 amount);
    event RewardsAdded(uint256 amount);
    event AddressExcluded(address indexed account);
    event AddressIncluded(address indexed account);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier noReentrant() {
        require(!locked, "Reentrancy not allowed");
        locked = true;
        _;
        locked = false;
    }

    constructor(address _nftAddress) {
        nft = IERC721(_nftAddress);
        owner = msg.sender;
        updateTotalEligibleTokens();
    }

    function updateTotalEligibleTokens() public onlyOwner {
        totalEligibleTokens = nft.totalSupply() - countExcluded();
    }

    function countExcluded() internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 1; i <= nft.totalSupply(); i++) {
            if (excludedFromRewards[nft.ownerOf(i)]) {
                count++;
            }
        }
        return count;
    }

    function distributeRewards() public payable {
        require(msg.value > 0, "No BNB sent to distribute");
        uint256 amountPerToken = msg.value / totalEligibleTokens;
        for (uint256 i = 1; i <= nft.totalSupply(); i++) {
            if (!excludedFromRewards[nft.ownerOf(i)]) {
                rewardBalance[i] += amountPerToken;
            }
        }
        emit RewardsAdded(msg.value);
    }

    function claimRewards(uint256[] calldata tokenIds) public noReentrant {
        uint256 totalClaimAmount = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(nft.ownerOf(tokenIds[i]) == msg.sender, "Caller is not the owner of the token");
            require(!excludedFromRewards[msg.sender], "Address is excluded from claiming rewards");
            totalClaimAmount += rewardBalance[tokenIds[i]];
            rewardBalance[tokenIds[i]] = 0;
        }
        require(totalClaimAmount > 0, "No rewards to claim");
        (bool sent, ) = msg.sender.call{value: totalClaimAmount}("");
        require(sent, "Failed to send BNB");
        totalRewardsClaimed[msg.sender] += totalClaimAmount;
        emit RewardsClaimed(msg.sender, totalClaimAmount);
    }

    function getTotalRewardsClaimed(address account) public view returns (uint256) {
        return totalRewardsClaimed[account];
    }

    function getTotalAvailableRewards(uint256[] calldata tokenIds) public view returns (uint256) {
        uint256 totalAvailable = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            if (nft.ownerOf(tokenIds[i]) == msg.sender) {
                totalAvailable += rewardBalance[tokenIds[i]];
            }
        }
        return totalAvailable;
    }

    function excludeAddress(address account) public onlyOwner {
        require(!excludedFromRewards[account], "Address already excluded");
        excludedFromRewards[account] = true;
        updateTotalEligibleTokens();
        emit AddressExcluded(account);
    }

    function includeAddress(address account) public onlyOwner {
        require(excludedFromRewards[account], "Address not excluded");
        excludedFromRewards[account] = false;
        updateTotalEligibleTokens();
        emit AddressIncluded(account);
    }

    receive() external payable {
        distributeRewards();
    }

    function withdraw() public onlyOwner {
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send BNB");
    }
}
