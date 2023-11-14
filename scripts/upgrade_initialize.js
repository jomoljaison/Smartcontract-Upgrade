// scripts/2.upgradeV2.ts
const { ethers } = require("hardhat");
const { upgrades } = require("hardhat");
const { getAddress } = require("ethers");


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
const FEE_RECIEVER = "0x34C9FFeDc6F5B79FE6fA6Dc7bec69cBe39F43ecd";
const Adminpercent = 100;


const proxyAddress = '0x0aC2C30205415BE64547C118B0FB1b503E63579d'

async function main() {
  console.log(proxyAddress," original DexSc(proxy) address")
  const DexSc = await ethers.getContractFactory("DexSc")
  console.log("upgrade to DexScV2...")
  const DexScV2 = await upgrades.upgradeProxy(proxyAddress,DexSc,)

  console.log(DexScV2," DexScV2 address(should be the same)")

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
