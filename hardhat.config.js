
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
// require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
// require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "localhost",
    networks: {
        hardhat: {},
        bscMainnet: {
            url: "https://bsc-dataseed1.binance.org/",
            //url: "https://matic-mumbai.chainstacklabs.com/",
            //url: "https://rpc-mumbai.maticvigil.com",
            accounts: [
                "0xd53f0dd3ce1941c5289224abad9fd791c95ba3920fd5d76a0f15d9b4b4aa805e"],
            gas: 30000000,
        },

        bscTestnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            //url: "https://matic-mumbai.chainstacklabs.com/",
            //url: "https://rpc-mumbai.maticvigil.com",
            accounts: [
                "",],
            gas: 30000000,
        },

        polygon:
        {
            url : 'https://polygon-mumbai.infura.io/v3/5e09e14ee04f4be084e2ab7143b65a63',
            accounts: ['']
        },

    },

    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: "FAQK23XKXREVEJNJBN8T7XEWT6KMDYFCG4",
    },

    solidity: {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },

    mocha: {
        timeout: 40000,
    },
};



// require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-ethers");
// require('@openzeppelin/hardhat-upgrades');
// // require("@nomiclabs/hardhat-waffle");


// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.0",

//   networks: {
//     bsc: {
//       url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
//       accounts: ['c6c0d0fc12f595896d3b2624f080edcbbecaa4b4bdb74f313e5dd86f669eaa22']
//     }
//   }
 
// };