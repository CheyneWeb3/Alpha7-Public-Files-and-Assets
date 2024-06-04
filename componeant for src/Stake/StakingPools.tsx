// Define your token data and pool categories
export const tokens = {
  alpha: {
    symbol: 'ALPHA7',
      website: '',
      telegram: '',
      chart: '',
    image: 'https://raw.githubusercontent.com/ArielRin/alpha7mint/day-5/dapp/src/Pages/Alpha7token.png'
  },
  btcb: {
    symbol: 'BTCB',
      website: '',
      telegram: '',
      chart: '',
    image: 'https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c/logo.png'
  },
  usdt: {
    symbol: 'USDT',
      website: '',
      telegram: '',
      chart: '',
    image: 'https://tokens.pancakeswap.finance/images/symbol/usdt.png'
  },
  wbnb: {
    symbol: 'WBNB',
      website: '',
      telegram: '',
      chart: '',
    image: 'https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970'
  },
  dbz: {
    symbol: 'DBZ',
    website: '',
    telegram: '',
    chart: '',
    image: 'https://raw.githubusercontent.com/ArielRin/alpha7mint/day-12/dapp/public/dbz.png'
  },
  rdfy: {
    symbol: 'RDFY',
    website: '',
    telegram: '',
    chart: '',
    image: 'https://raw.githubusercontent.com/ArielRin/alpha7mint/day-12/dapp/public/rdfy.png'
  },
  hsc: {
    symbol: 'HSC',
    website: '',
    telegram: '',
    chart: '',
    image: 'https://raw.githubusercontent.com/ArielRin/alpha7mint/day-12/dapp/public/hsc.png'
  },

};

export const PoolCategory = {
  CORE: 'core',
  COMMUNITY: 'community',
  // Additional categories can be added here
};

// Array to hold data about each staking pool
export const stakingPools = [
{
  stakeId: 20,
  stakingToken: tokens.alpha,
  earningToken: tokens.alpha,
  contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
  poolCategory: PoolCategory.COMMUNITY,
  harvest: true,
  tokenPerBlock: '1.0',
  sortOrder: 2,
  isFinished: false,
  enddate: '365 Days',
  poolnotes: 'Core pool Now Active!',
},
  {
    stakeId: 22,
    stakingToken: tokens.alpha,
    earningToken: tokens.btcb,
    contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '1.0',
    sortOrder: 2,
    isFinished: false,
    enddate: '30 Days',
    poolnotes: 'Introductory Pool Limited Time!',
  },
  {
    stakeId: 23,
    stakingToken: tokens.alpha,
    earningToken: tokens.usdt,
    contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '1.0',
    sortOrder: 2,
    isFinished: false,
    enddate: '30 Days',
    poolnotes: 'Introductory Pool Limited Time!',
  },
  {
    stakeId: 23,
    stakingToken: tokens.alpha,
    earningToken: tokens.wbnb,
    contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '1.0',
    sortOrder: 2,
    isFinished: false,
    enddate: '30 Days',
    poolnotes: 'Introductory Pool Limited Time!',
  },
  {
    stakeId: 24,
    stakingToken: tokens.alpha,
    earningToken: tokens.dbz,
    contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '1.0',
    sortOrder: 2,
    isFinished: false,
    enddate: '30 Days',
    poolnotes: 'Partnership Pool Limited Time',
  },
  // {
  //   stakeId: 25,
  //   stakingToken: tokens.alpha,
  //   earningToken: tokens.rdfy,
  //   contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
  //   poolCategory: PoolCategory.COMMUNITY,
  //   harvest: true,
  //   tokenPerBlock: '1.0',
  //   sortOrder: 2,
  //   isFinished: false,
  //   poolnotes: '',
  // },
  // {
  //   stakeId: 25,
  //   stakingToken: tokens.alpha,
  //   earningToken: tokens.hsc,
  //   contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
  //   poolCategory: PoolCategory.COMMUNITY,
  //   harvest: true,
  //   tokenPerBlock: '1.0',
  //   sortOrder: 2,
  //   isFinished: false,
  //   poolnotes: '',
  // },
  {
    stakeId: 25,
    stakingToken: tokens.dbz,
    earningToken: tokens.dbz,
    contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
    poolCategory: PoolCategory.COMMUNITY,
    harvest: true,
    tokenPerBlock: '1.0',
    sortOrder: 2,
    isFinished: false,
    enddate: '30 Days',
    poolnotes: 'Partnership Pool Limited Time',
  },
  // {
  //   stakeId: 25,
  //   stakingToken: tokens.rdfy,
  //   earningToken: tokens.rdfy,
  //
  //   contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
  //   poolCategory: PoolCategory.COMMUNITY,
  //   harvest: true,
  //   tokenPerBlock: '1.0',
  //   sortOrder: 2,
  //   isFinished: false,
  //   poolnotes: '',
  // },
  // {
  //   stakeId: 25,
  //   stakingToken: tokens.hsc,
  //   earningToken: tokens.hsc,
  //   contractAddress: '0x348d7dE780Be79bFEcB798c98c1b3Fb56D0D4Aa7',
  //   poolCategory: PoolCategory.COMMUNITY,
  //   harvest: true,
  //   tokenPerBlock: '1.0',
  //   sortOrder: 2,
  //   isFinished: false,
  //   poolnotes: '',
  // },
  // More pools can be added as needed
];
