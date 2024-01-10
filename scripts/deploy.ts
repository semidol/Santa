import { ethers } from "hardhat";

const initialMaxSupply = 100;
const initialWithdrawalReceiver = '0xc55292a49c871452e0Ad9B12940Fb61ed9fef09F';

async function main() {
  const Santa = await ethers.getContractFactory('Santa');
  console.log('Deploying token...');
  const token = await Santa.deploy(initialMaxSupply, initialWithdrawalReceiver);
  const addres = await token.getAddress();
  console.log('Token deployed to:', addres);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
