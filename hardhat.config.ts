import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

require('dotenv').config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (ALCHEMY_API_KEY === undefined) {
  throw new Error('Missing ALCHEMY_API_KEY')
}
if (SEPOLIA_PRIVATE_KEY === undefined) {
  throw new Error('Missing SEPOLIA_PRIVATE_KEY')
}
if (ETHERSCAN_API_KEY === undefined) {
  throw new Error('Missing ETHERSCAN_API_KEY')
}

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: true
  }
};

export default config;
