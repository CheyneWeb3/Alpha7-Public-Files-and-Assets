import React, { useState } from 'react';
import { ethers } from 'ethers';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import HeaderWithDropdown from './Components/HeaderWithDropdown/HeaderWithDropdown';
import Footer from './Components/Footer/Footer';
import Wallet from '../Pages/RewardsDistributorBnb/walletpage';
import mainbackgroundImage from "./bkg.png";
import tokenAbi from './tokenAbi.json';
import listTokenAbi from './listTokenAbi.json'; // import the listTokenAbi

const TOKEN_CONTRACT_ADDRESS = "0x88CE0d545cF2eE28d622535724B4A06E59a766F0";
const LISTING_CONTRACT_ADDRESS = "0xaB99aDd7b792729448c5a5a99C1Cb2168f22CE7e"; // listing contract address

const AddTokenForm: React.FC = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [pair, setPair] = useState('');
  const [iconLink, setIconLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [chartLink, setChartLink] = useState('');
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState('');
  const toast = useToast();

  const handleAddToken = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(LISTING_CONTRACT_ADDRESS, listTokenAbi, signer);

        const transaction = await contract.addToken(
          name,
          symbol,
          tokenAddress,
          pair,
          iconLink,
          websiteLink,
          telegramLink,
          twitterLink,
          chartLink,
          description,
          {
            value: ethers.utils.parseEther(fee),
            gasLimit: 1000000,
          }
        );

        await transaction.wait();
        toast({
          title: 'Token added.',
          description: "The token has been successfully added.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Clear the form fields after successful submission
        setName('');
        setSymbol('');
        setTokenAddress('');
        setPair('');
        setIconLink('');
        setWebsiteLink('');
        setTelegramLink('');
        setTwitterLink('');
        setChartLink('');
        setDescription('');
        setFee('');
      } else {
        toast({
          title: 'No Ethereum provider found',
          description: "Please install MetaMask.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error adding token:', error);
      toast({
        title: 'Error adding token',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md" mt={4}>
      <FormControl id="name" mb={4}>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Token Name" />
      </FormControl>
      <FormControl id="symbol" mb={4}>
        <FormLabel>Symbol</FormLabel>
        <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Token Symbol" />
      </FormControl>
      <FormControl id="tokenAddress" mb={4}>
        <FormLabel>Token Address</FormLabel>
        <Input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} placeholder="Token Address" />
      </FormControl>
      <FormControl id="pair" mb={4}>
        <FormLabel>Pair</FormLabel>
        <Input value={pair} onChange={(e) => setPair(e.target.value)} placeholder="Pair" />
      </FormControl>
      <FormControl id="iconLink" mb={4}>
        <FormLabel>Icon Link</FormLabel>
        <Input value={iconLink} onChange={(e) => setIconLink(e.target.value)} placeholder="Icon Link" />
      </FormControl>
      <FormControl id="websiteLink" mb={4}>
        <FormLabel>Website Link</FormLabel>
        <Input value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} placeholder="Website Link" />
      </FormControl>
      <FormControl id="telegramLink" mb={4}>
        <FormLabel>Telegram Link</FormLabel>
        <Input value={telegramLink} onChange={(e) => setTelegramLink(e.target.value)} placeholder="Telegram Link" />
      </FormControl>
      <FormControl id="twitterLink" mb={4}>
        <FormLabel>Twitter Link</FormLabel>
        <Input value={twitterLink} onChange={(e) => setTwitterLink(e.target.value)} placeholder="Twitter Link" />
      </FormControl>
      <FormControl id="chartLink" mb={4}>
        <FormLabel>Chart Link</FormLabel>
        <Input value={chartLink} onChange={(e) => setChartLink(e.target.value)} placeholder="Chart Link" />
      </FormControl>
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      </FormControl>
      <FormControl id="fee" mb={4}>
        <FormLabel>Fee (in ETH)</FormLabel>
        <Input value={fee} onChange={(e) => setFee(e.target.value)} placeholder="Fee" />
      </FormControl>
      <Button colorScheme="blue" onClick={handleAddToken}>
        Add Token
      </Button>
    </Box>
  );
};

const HomePage: React.FC = () => {
  return (
    <Box>
      <HeaderWithDropdown />
      <Box
        flex={1}
        p={0}
        m={0}
        display="flex"
        flexDirection="column"
        bg="rgba(0, 0, 0, 1)"
        bgImage={`url(${mainbackgroundImage})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        minH="150px"
      >
        <Box flex={1} p={0} m={0} display="flex" bg="rgba(0, 0, 0, 0)" minH="110px" />
        <ConnectButton />
        <Box textAlign="left">
          <Flex mb="15px" direction="column" align="center" justify="center" height="100%">
            <Image src="https://raw.githubusercontent.com/ArielRin/alpha7mint/day-12/dapp/src/headerlogo.png" alt="WireFrame Dawgz" width="320px" objectFit="contain" />
          </Flex>
        </Box>
        <Box
          marginBottom="40px"
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="2xl"
          mx="auto"
          my="10px"
          boxShadow="xl"
          maxWidth="900px"
          width="100%"
          textAlign="left"
          border="2px"
          borderColor="blue"
        >
          <Box p={4} bg="rgba(0, 0, 0, 0.4)">
            <Text fontSize="xl" color="white" fontWeight="semibold" textAlign="left">
              Track the Balance of your BSC Tokens, View any unclaimed Rewards. Add to wallet and Links to Token Projects. Use Alpha7 Balance Tracker on any connected address!
            </Text>
            <Text mt="9" fontSize="sm" color="white" fontWeight="semibold" textAlign="left">
              Click the tokens to view more details
            </Text>
          </Box>
          <Wallet />
        </Box>

        <Flex mb="15px" mt="15px" direction="column" align="center" justify="center" height="100%">
          <MintNow />
          <ClaimBNBswapA7 />
          <ClaimBNB />
        </Flex>
        <AddTokenForm />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
