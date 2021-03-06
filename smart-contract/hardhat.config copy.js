require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: '.env' })

const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL

const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: ALCHEMY_API_URL,
    accounts: [RINKEBY_PRIVATE_KEY],
    },
    
  },
};
