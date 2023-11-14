// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { getAddress } = require("ethers");
const hre = require("hardhat");


const QUOTER = "0x78D78E420Da98ad378D7799bE8f4AF69033EB077";

// router/factory addresses
const PCS_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const PCS_FACTORY = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";

const SUSHI_ROUTER = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
const SUSHI_FACTORY = "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";

//const SFM_ROUTER = "0x9A7ba8eBa135B789Efddb15E0Ce42572eFA3b792"; //safemoon translation
const SFM_ROUTER = "0x37da632c6436137BD4D0CA30c98d3c615974120b";
const SFM_FACTORY = "0x4d05D0045df5562D6D52937e93De6Ec1FECDAd21";

const UNISWAP_ROUTER = "0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2";
const UNISWAP_FACTORY = "0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7";

// Fee reciever
const FEE_RECIEVER = "0xea905c7A2C02451677D3F443E6F0647Ff89791b3";

// Contract info


async function main() {

  const DexSc = await ethers.getContractFactory("DexSc")
  console.log("Deploying DexSc...")
  const dexsc = await upgrades.deployProxy(DexSc,[QUOTER, PCS_ROUTER, PCS_FACTORY, SUSHI_ROUTER, SUSHI_FACTORY, SFM_ROUTER, SFM_FACTORY, UNISWAP_ROUTER, UNISWAP_FACTORY, FEE_RECIEVER,100], { initializer: 'initialize' })

  console.log(getAddress()," DexSc(proxy) address")
  console.log(await upgrades.erc1967.getImplementationAddress(dexsc.address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(dexsc.address)," getAdminAddress")    
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



