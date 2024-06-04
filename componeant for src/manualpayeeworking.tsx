import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { Button, Text, Box, Input, Textarea, useToast } from '@chakra-ui/react';
import ClaimBnb from '../Components/Claim/ClaimToast'; // Adjust the import path as necessary
import ClaimAlpha7 from '../Components/Claim/ClaimToast'; // Adjust the import path as necessary
import contractABI from './splitterABI.json'; // Use your ABI here

import Claim from '../Components/Claim/ClaimToast';

const CONTRACT_ADDRESS = '0x3b0eABb3b5b9323613159BA8F0519Df16C1AEf49'; //bsctestnet
const NFT_ADDRESS = '0xCa695FEB6b1b603ca9fec66aaA98bE164db4E660';
const ERC20_ADDRESS = '0x88CE0d545cF2eE28d622535724B4A06E59a766F0';
const TOKEN_DECIMALS = 9;
const BATCH_SIZE = 50;


const RewardsDistributor = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [startTokenId, setStartTokenId] = useState('');
  const [batchSize, setBatchSize] = useState('');
  const [rewardBalance, setRewardBalance] = useState('');
  const [contractTokenBalance, setContractTokenBalance] = useState('');
  const [totalRewards, setTotalRewards] = useState('');
  const [unallocatedRewards, setUnallocatedRewards] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [rewardAmount, setRewardAmount] = useState('');
  const [recipients, setRecipients] = useState('');
  const [amounts, setAmounts] = useState('');
  const [batchRecipients, setBatchRecipients] = useState('');
  const [batchAmount, setBatchAmount] = useState('');
  const { address } = useAccount();
  const toast = useToast();

  const getContractWithSigner = async () => {
    if (!window.ethereum) {
      throw new Error('No crypto wallet found. Please install it.');
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  };

  const getTokenContractWithSigner = async () => {
    if (!window.ethereum) {
      throw new Error('No crypto wallet found. Please install it.');
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    return new ethers.Contract(TOKEN_ADDRESS, contractABI, signer);
  };

  const depositRewards = async () => {
    if (!depositAmount) {
      toast({
        title: 'Error',
        description: 'Please enter a deposit amount.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const tokenContract = await getTokenContractWithSigner();
      const contract = await getContractWithSigner();
      const amountInEther = ethers.utils.parseUnits(depositAmount, TOKEN_DECIMALS);

      // Approve the contract to spend the tokens
      const approveTx = await tokenContract.approve(CONTRACT_ADDRESS, amountInEther);
      await approveTx.wait();

      // Deposit the tokens
      const tx = await contract.depositRewards(amountInEther);
      await tx.wait();
      toast({
        title: 'Success',
        description: 'Rewards deposited successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchContractTokenBalance();
      fetchTotalRewards();
    } catch (error) {
      console.error('Error depositing rewards:', error);
      toast({
        title: 'Error',
        description: 'Failed to deposit rewards. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateAndCalculateRewards = async () => {
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.updateAndCalculateRewards();
      await tx.wait();
      toast({
        title: 'Success',
        description: 'Rewards calculated successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error calculating rewards:', error);
      toast({
        title: 'Error',
        description: 'Failed to calculate rewards. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const distributeRewards = async () => {
    if (!startTokenId || !batchSize) {
      toast({
        title: 'Error',
        description: 'Please enter both startTokenId and batchSize.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const contract = await getContractWithSigner();
      const tx = await contract.distributeRewards(startTokenId, batchSize);
      await tx.wait();
      toast({
        title: 'Success',
        description: 'Rewards distributed successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error distributing rewards:', error);
      toast({
        title: 'Error',
        description: 'Failed to distribute rewards. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const claimRewards = async () => {
    try {
      const contract = await getContractWithSigner();
      const tx = await contract.claimRewards();
      await tx.wait();
      toast({
        title: 'Success',
        description: 'Rewards claimed successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchRewardBalance();
    } catch (error) {
      console.error('Error claiming rewards:', error);
      toast({
        title: 'Error',
        description: 'Failed to claim rewards. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const rewardAddressDirectly = async () => {
    if (!recipientAddress || !rewardAmount) {
      toast({
        title: 'Error',
        description: 'Please enter both recipient address and reward amount.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const contract = await getContractWithSigner();
      const amountInEther = ethers.utils.parseUnits(rewardAmount, TOKEN_DECIMALS);
      const currentBalance = await contract.getRewardTokenBalance();
      if (amountInEther.gt(currentBalance)) {
        toast({
          title: 'Error',
          description: 'Insufficient rewards in the contract.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const tx = await contract.rewardAddressDirectly(recipientAddress, rewardAmount); // No conversion
      await tx.wait();
      toast({
        title: 'Success',
        description: 'Reward sent successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchContractTokenBalance();
      fetchTotalRewards();
    } catch (error) {
      console.error('Error rewarding address:', error);
      toast({
        title: 'Error',
        description: 'Failed to reward address. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const batchRewardAddresses = async () => {
    if (!recipients || !amounts) {
      toast({
        title: 'Error',
        description: 'Please enter both recipients and amounts.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const contract = await getContractWithSigner();
      const recipientArray = recipients.split(',').map(addr => addr.trim());
      const amountArray = amounts.split(',').map(amount => amount.trim()); // No conversion

      const tx = await contract.batchRewardAddresses(recipientArray, amountArray, {
        gasLimit: 500000, // Set a manual gas limit
      });
      await tx.wait();
      toast({
        title: 'Success',
        description: 'Batch rewards sent successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchContractTokenBalance();
      fetchTotalRewards();
    } catch (error) {
      console.error('Error sending batch rewards:', error);
      toast({
        title: 'Error',
        description: 'Failed to send batch rewards. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const sendRewardsWithValue = async () => {
    if (!batchRecipients || !batchAmount) {
      toast({
        title: 'Error',
        description: 'Please enter both recipients and the amount.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const contract = await getContractWithSigner();
      const recipientArray = batchRecipients.split(',').map(addr => addr.trim());
      const amountArray = new Array(recipientArray.length).fill(batchAmount.trim());

      const tx = await contract.batchRewardAddresses(recipientArray, amountArray, {
        gasLimit: 500000, // Set a manual gas limit
      });
      await tx.wait();
      toast({
        title: 'Success',
        description: 'Batch rewards sent successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchContractTokenBalance();
      fetchTotalRewards();
    } catch (error) {
      console.error('Error sending batch rewards:', error);
      toast({
        title: 'Error',
        description: 'Failed to send batch rewards. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fetchRewardBalance = async () => {
    if (!address) return;

    try {
      const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
      const reward = await contract.rewards(address);
      setRewardBalance(ethers.utils.formatUnits(reward, TOKEN_DECIMALS));
    } catch (error) {
      console.error('Error fetching reward balance:', error);
    }
  };

  const fetchContractTokenBalance = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
      const balance = await contract.getRewardTokenBalance();
      setContractTokenBalance(ethers.utils.formatUnits(balance, TOKEN_DECIMALS));
    } catch (error) {
      console.error('Error fetching contract token balance:', error);
    }
  };

  const fetchTotalRewards = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
      const rewards = await contract.totalRewards();
      setTotalRewards(ethers.utils.formatUnits(rewards, TOKEN_DECIMALS));
    } catch (error) {
      console.error('Error fetching total rewards:', error);
    }
  };

  const fetchUnallocatedRewards = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
      const balance = await contract.getRewardTokenBalance();
      const rewards = await contract.totalRewards();
      const unallocated = balance.sub(rewards);
      setUnallocatedRewards(ethers.utils.formatUnits(unallocated, TOKEN_DECIMALS));
    } catch (error) {
      console.error('Error fetching unallocated rewards:', error);
    }
  };

  useEffect(() => {
    fetchRewardBalance();
    fetchContractTokenBalance();
    fetchTotalRewards();
    fetchUnallocatedRewards();
  }, [address]);

  return (
    <Box>
      <Text fontSize="2xl" mb="4">AlphaDawgz Rewards Distributor</Text>

      <Box mb="4">
        <Text fontSize="md">For rewards u can deposit Alpha7 tokens directly to contract</Text>
      </Box>

            <Box mb="4">
              <Text fontSize="md">Step 1. For NFT rewards First send tokens to contract. </Text>
                <Text fontSize="md">Step2. Click the Calculate rewards to send contracts balance to NFT Holders</Text>
                <Text fontSize="md">Step 3. Use distribute button to process those amounts to nft holders</Text>
            </Box>

      <Box mb="4">
        <Text fontSize="md">Contract: {CONTRACT_ADDRESS}</Text>
        <Text fontSize="md">Contract Token Balance: {contractTokenBalance} Alpha7</Text>
      </Box>

      <Box mb="4">
        <Button onClick={updateAndCalculateRewards} textColor="white" bg="gray" _hover={{ bg: 'gray.400' }}>
          Calculate Rewards
        </Button>
      </Box>

      <Box mb="4">
        <Input
          placeholder="Start Token ID"
          value={startTokenId}
          onChange={(e) => setStartTokenId(e.target.value)}
          mb="2"
        />
        <Input
          placeholder="Batch Size"
          value={batchSize}
          onChange={(e) => setBatchSize(e.target.value)}
          mb="2"
        />
        <Button onClick={distributeRewards} textColor="white" bg="gray" _hover={{ bg: 'gray.400' }}>
          Distribute Rewards
        </Button>
      </Box>

      <Box mb="4">
        <Text fontSize="md">Connected Wallet: {address ? address : 'Not Connected'}</Text>
      </Box>
      <Box mb="4">
        <Text fontSize="lg">AlphaDawg NFT Rewards Available to claim: {rewardBalance} Alpha7</Text>
      </Box>
      <Box mb="4">
        <Button onClick={claimRewards} textColor="white" bg="gray" _hover={{ bg: 'gray.400' }}>
          Claim Rewards
        </Button>
      </Box>

      <Box mb="4">
        <Text fontSize="md" mb="2">Reward Address Directly</Text>
        <Input
          placeholder="Recipient Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          mb="2"
        />
        <Input
          placeholder="Amount (Ether)"
          value={rewardAmount}
          onChange={(e) => setRewardAmount(e.target.value)}
          mb="2"
        />
        <Button onClick={rewardAddressDirectly} textColor="white" bg="gray" _hover={{ bg: 'gray.400' }}>
          Reward Address
        </Button>
      </Box>

      <Box mb="4">
        <Text fontSize="md" mb="2">Batch Reward Addresses</Text>
        <Textarea
          placeholder="Recipient Addresses (comma-separated)"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          mb="2"
        />
        <Textarea
          placeholder="Amounts (comma-separated)"
          value={amounts}
          onChange={(e) => setAmounts(e.target.value)}
          mb="2"
        />
        <Button onClick={batchRewardAddresses} textColor="white" bg="gray" _hover={{ bg: 'gray.400' }}>
          Batch Reward
        </Button>
      </Box>

      <Box mb="4">
        <Text fontSize="md" mb="2">Batch Reward Addresses with Same Value</Text>
        <Textarea
          placeholder="Recipient Addresses (comma-separated)"
          value={batchRecipients}
          onChange={(e) => setBatchRecipients(e.target.value)}
          mb="2"
        />
        <Input
          placeholder="Amount (Ether)"
          value={batchAmount}
          onChange={(e) => setBatchAmount(e.target.value)}
          mb="2"
        />
        <Button onClick={sendRewardsWithValue} textColor="white" bg="gray" _hover={{ bg: 'gray.400' }}>
          Send Rewards with Value
        </Button>
      </Box>
<ClaimAlpha7 />
<ClaimBnb />


    </Box>
  );
};
