// Using Hardhat v2 + ethers v5 (stable setup)

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",

  networks: {
    sepolia: {
      // Sepolia testnet RPC
      url: process.env.SEPOLIA_RPC_URL,

      // testnet-only account private key
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
