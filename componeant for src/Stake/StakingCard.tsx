import React, { useState, useEffect } from 'react';
import { Box, Link, Button, Input, Image, Text, useToast } from "@chakra-ui/react";
import { ethers } from 'ethers';
import abi from './stakingContractAbi.json';  // Make sure to replace './abi/stakingContractAbi' with the correct path to your ABI file

import { css, keyframes } from '@emotion/react';



const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #a855f7, 0 0 10px #a855f7, 0 0 15px #a855f7, 0 0 20px #a855f7, 0 0 25px #a855f7;
  }
  50% {
    box-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f7, 0 0 40px #a855f7, 0 0 50px #a855f7;
  }
  100% {
    box-shadow: 0 0 5px #a855f7, 0 0 10px #a855f7, 0 0 15px #a855f7, 0 0 20px #a855f7, 0 0 25px #a855f7;
  }
`;
// a855f7


const StakingCard = ({ pool }) => {
  const [amount, setAmount] = useState('');
  const toast = useToast();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(pool.contractAddress, abi, signer);
    setContract(stakingContract);
  }, [pool.contractAddress]);

  const handleDeposit = async () => {
    if (!amount || !contract) return;
    try {
      const tx = await contract.deposit(ethers.utils.parseEther(amount));
      await tx.wait();
      toast({ title: 'Deposit successful', status: 'success', duration: 5000 });
      setAmount(''); // Reset amount after successful transaction
    } catch (error) {
      console.error('Deposit Error:', error);
      toast({ title: 'Deposit failed', description: error.message, status: 'error', duration: 5000 });
    }
  };

  const handleClaim = async () => {
    if (!contract) return;
    try {
      const tx = await contract.withdraw(0); // Assuming 'withdraw(0)' to claim rewards
      await tx.wait();
      toast({ title: 'Claim successful', status: 'success', duration: 5000 });
    } catch (error) {
      console.error('Claim Error:', error);
      toast({ title: 'Claim failed', description: error.message, status: 'error', duration: 5000 });
    }
  };

  const handleWithdraw = async () => {
    if (!amount || !contract) return;
    try {
      const tx = await contract.withdraw(ethers.utils.parseEther(amount));
      await tx.wait();
      toast({ title: 'Withdrawal successful', status: 'success', duration: 5000 });
      setAmount(''); // Reset amount after successful transaction
    } catch (error) {
      console.error('Withdraw Error:', error);
      toast({ title: 'Withdrawal failed', description: error.message, status: 'error', duration: 5000 });
    }
  };

  return (
   <Box
     p={4}
     bg="rgba(0, 0, 0, 0.5)"
     borderRadius="md"
     boxShadow="md"
     width="md"
     margin="2"
     border="0px"
     borderColor="white"
     css={css`
       animation: ${glow} 5s infinite;
     `}
     position="relative"
   >
     <Box position="absolute" top="10px" right="10px">

     <Image
       src={pool.earningToken.image}
       alt={pool.earningToken.symbol}
       boxSize="70px"
       objectFit="cover"
       margin="1"
       position="relative"
       top="10px"
     />
       <Image
         src={pool.stakingToken.image}
         alt={pool.stakingToken.symbol}
         boxSize="50px"
         objectFit="cover"
         margin="1"
       />
     </Box>
     <Text color="white" fontSize="20px" fontWeight="bold">
      {pool.poolnotes}
     </Text>

     <Text marginTop="28px" color="white" fontSize="32px" fontWeight="bold">
       Earn {pool.earningToken.symbol}
     </Text>
     <Text color="white" fontSize="32px" fontWeight="bold">
       by Staking {pool.stakingToken.symbol}
     </Text>

     <Text marginTop="10px" color="white" fontSize="28px" fontWeight="normal">
       Current APR: 1234%
     </Text>

     <Text marginTop="10px" color="white" fontSize="sm" fontWeight="normal">
       Max Limit approx $100USD in {pool.stakingToken.symbol} per pool
     </Text>
     <Text marginTop="10px" color="white" fontSize="sm" fontWeight="normal">
       2.5% Deposit fee on token staking.
     </Text>



     <Input color="white" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
     <Button colorScheme="blue" onClick={handleDeposit} m="1">
       Stake
     </Button>
     <Button colorScheme="green" onClick={handleClaim} m="1">
       Claim
     </Button>
     <Button colorScheme="orange" onClick={handleWithdraw} m="1">
       Withdraw
     </Button>

          <Text marginTop="10px" color="white" fontSize="sm" fontWeight="bold">
            Staking Contract:
          </Text>
          <Text color="white" fontSize="10px" fontWeight="bold">
            {pool.contractAddress}
          </Text>
          <Text marginTop="10px" color="white">Staking Rate: {pool.tokenPerBlock} per block</Text>

     <Text marginTop="10px" color="white" fontSize="sm" fontWeight="normal">
       Total Staked: 123456789 {pool.stakingToken.symbol} Tokens
     </Text>
     <Text marginTop="10px" color="white" fontSize="sm" fontWeight="normal">
       Pools Duration: {pool.enddate}
     </Text>
     <Text marginTop="10px" color="white" fontSize="sm" fontWeight="normal">
       Pool ends in: 1234 blocks
     </Text>




     <Text color="white" fontSize="sm" fontWeight="bold">
       {pool.earningToken.symbol} Website
     </Text>
     <Link href={pool.website} isExternal color="blue.500" marginTop="4">
       Site Link
     </Link>

     <Text color="white" fontSize="sm" fontWeight="bold">
       {pool.earningToken.symbol} Socials
     </Text>
     <Link href={pool.telegram} isExternal color="blue.500" marginTop="4">
       {pool.earningToken.symbol} Telegram
     </Link>
   </Box>
 );
};

export default StakingCard;
