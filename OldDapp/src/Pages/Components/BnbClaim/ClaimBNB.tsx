import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { Box, Flex, Button, Text, useToast, Image, keyframes } from '@chakra-ui/react';

import contractABI from './splitterABI.json';

const CONTRACT_ADDRESS = '0x0d57A3569F1E1D8eB29C1C977950d77d18Dd057F';
const TOKEN_DECIMALS = 18;
const TOKEN_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';

// Define keyframes for the glowing animation
const glow = keyframes`
  0% { border-color: #e3af09; box-shadow: 0 0 5px #e3af09; }
  50% { border-color: #e3af09; box-shadow: 0 0 20px #e3af09; }
  100% { border-color: #e3af09; box-shadow: 0 0 5px #e3af09; }
`;

const ClaimRewards = () => {
  const [rewardBalance, setRewardBalance] = useState('');
  const [tokenPriceUSD, setTokenPriceUSD] = useState<number | null>(null);
  const { address } = useAccount();
  const toast = useToast();

  const getContractWithSigner = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('No crypto wallet found. Please install it.');
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  };

  const fetchRewardBalance = async () => {
    if (!address) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
      const reward = await contract.rewards(address);
      const formattedReward = ethers.utils.formatUnits(reward, TOKEN_DECIMALS);
      console.log('Fetched reward balance:', formattedReward); // Log the reward balance
      setRewardBalance(formattedReward);
    } catch (error) {
      console.error('Error fetching reward balance:', error);
    }
  };

  const fetchTokenPrice = async () => {
    try {
      const response = await fetch(`https://api.geckoterminal.com/api/v2/simple/networks/bsc/token_price/${TOKEN_ADDRESS}`);
      const data = await response.json();
      console.log('API response:', data); // Log the full API response
      const price = data.data.attributes.token_prices[TOKEN_ADDRESS.toLowerCase()];
      console.log('Fetched token price:', price); // Log the token price
      setTokenPriceUSD(parseFloat(price));
    } catch (error) {
      console.error('Error fetching token price:', error);
      setTokenPriceUSD(null);
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

  useEffect(() => {
    fetchRewardBalance();
    fetchTokenPrice();
  }, [address]);

  const usdValue = tokenPriceUSD !== null && !isNaN(parseFloat(rewardBalance))
    ? (parseFloat(rewardBalance) * tokenPriceUSD).toFixed(2)
    : '0.00000000';

  return (
    <>
      {rewardBalance && parseFloat(rewardBalance) > 0 && (
        <Box
          bg="rgba(0, 0, 0, 0.75)"
          p={15}
          borderRadius="2xl"
          boxShadow="xl"
          maxWidth="600px"
          marginBottom="5px"
          maxH="500px"
          width="100%"
          textAlign="center"
          border="5px"
          borderColor="#e3af09"
          animation={`${glow} 2s infinite`} // Apply the glowing animation
        >
          <Flex color="white" alignItems="center" mb="1">
            <Image src="https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970" alt="" boxSize="60px" borderRadius="xl" mr="5" />
            <Box textAlign="left">
              <Text fontSize="lg" fontWeight="semibold" textAlign="left">
                You've got BNB  to Collect!
              </Text>
              <Text fontSize="2xl" fontWeight="semibold" textAlign="left">
                {rewardBalance} BNB
              </Text>
              <Text fontSize="sm" fontWeight="normal" textAlign="left">
                ${usdValue} USD Value
              </Text>
            </Box>
          </Flex>
          <Flex mb="4" alignItems="center" justifyContent="space-between">
            <Text fontSize="lg" fontWeight="semibold" textAlign="left"></Text>
            <Button
              mt="2"
              width="50%"
              bg="#e3af09"
              textColor="white"
              _hover={{ bg: 'blue' }}
              onClick={claimRewards}
            >
              Claim BNB
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default ClaimRewards;

//
// import React, { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import { useAccount } from 'wagmi';
// import { Box, Flex, Button, Text, useToast, Image, keyframes } from '@chakra-ui/react';
//
// import contractABI from './splitterABI.json';
//
// const CONTRACT_ADDRESS = '0x0d57A3569F1E1D8eB29C1C977950d77d18Dd057F';
// const TOKEN_DECIMALS = 18;
// const TOKEN_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
//
// // Define keyframes for the glowing animation
// const glow = keyframes`
//   0% { border-color: #e3af09; box-shadow: 0 0 5px #e3af09; }
//   50% { border-color: #e3af09; box-shadow: 0 0 20px #e3af09; }
//   100% { border-color: #e3af09; box-shadow: 0 0 5px #e3af09; }
// `;
//
// const ClaimRewards = () => {
//   const [rewardBalance, setRewardBalance] = useState('');
//   const [tokenPriceUSD, setTokenPriceUSD] = useState<number | null>(null);
//   const { address } = useAccount();
//   const toast = useToast();
//
//   const getContractWithSigner = async () => {
//     if (typeof window.ethereum === 'undefined') {
//       throw new Error('No crypto wallet found. Please install it.');
//     }
//
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const provider = new ethers.providers.Web3Provider(window.ethereum as any);
//     const signer = provider.getSigner();
//     return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
//   };
//
//   const fetchRewardBalance = async () => {
//     if (!address) return;
//
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum as any);
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
//       const reward = await contract.rewards(address);
//       const formattedReward = ethers.utils.formatUnits(reward, TOKEN_DECIMALS);
//       console.log('Fetched reward balance:', formattedReward); // Log the reward balance
//       setRewardBalance(formattedReward);
//     } catch (error) {
//       console.error('Error fetching reward balance:', error);
//     }
//   };
//
//   const fetchTokenPrice = async () => {
//     try {
//       const response = await fetch(`https://api.geckoterminal.com/api/v2/simple/networks/bsc/token_price/${TOKEN_ADDRESS}`);
//       const data = await response.json();
//       console.log('API response:', data); // Log the full API response
//       const price = data.data.attributes.token_prices[TOKEN_ADDRESS.toLowerCase()];
//       console.log('Fetched token price:', price); // Log the token price
//       setTokenPriceUSD(parseFloat(price));
//     } catch (error) {
//       console.error('Error fetching token price:', error);
//       setTokenPriceUSD(null);
//     }
//   };
//
//   const claimRewards = async () => {
//     try {
//       const contract = await getContractWithSigner();
//       const tx = await contract.claimRewards();
//       await tx.wait();
//       toast({
//         title: 'Success',
//         description: 'Rewards claimed successfully!',
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//       });
//       fetchRewardBalance();
//     } catch (error) {
//       console.error('Error claiming rewards:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to claim rewards. Please try again.',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };
//
//   useEffect(() => {
//     fetchRewardBalance();
//     fetchTokenPrice();
//   }, [address]);
//
//   const usdValue = tokenPriceUSD !== null && !isNaN(parseFloat(rewardBalance))
//     ? (parseFloat(rewardBalance) * tokenPriceUSD).toFixed(2)
//     : '0.00000000';
//
//   return (
//     <>
//       {rewardBalance && parseFloat(rewardBalance) > 0 && (
//         <Box
//           bg="rgba(0, 0, 0, 0.75)"
//           p={15}
//           borderRadius="2xl"
//           boxShadow="xl"
//           maxWidth="600px"
//           marginBottom="5px"
//           maxH="500px"
//           width="100%"
//           textAlign="center"
//           border="5px"
//           borderColor="#e3af09"
//           animation={`${glow} 2s infinite`} // Apply the glowing animation
//         >
//           <Flex color="white" alignItems="center" mb="1">
//             <Image src="https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970" alt="" boxSize="60px" borderRadius="xl" mr="5" />
//             <Box textAlign="left">
//               <Text fontSize="lg" fontWeight="semibold" textAlign="left">
//                 You've got BNB  to Collect!
//               </Text>
//               <Text fontSize="2xl" fontWeight="semibold" textAlign="left">
//                 {rewardBalance} BNB
//               </Text>
//               <Text fontSize="sm" fontWeight="normal" textAlign="left">
//                 ${usdValue} USD Value
//               </Text>
//             </Box>
//           </Flex>
//           <Flex mb="4" alignItems="center" justifyContent="space-between">
//             <Text fontSize="lg" fontWeight="semibold" textAlign="left"></Text>
//             <Button
//               mt="2"
//               width="50%"
//               bg="#e3af09"
//               textColor="white"
//               _hover={{ bg: 'blue' }}
//               onClick={claimRewards}
//             >
//               Claim BNB
//             </Button>
//           </Flex>
//         </Box>
//       )}
//     </>
//   );
// };
//
// export default ClaimRewards;
