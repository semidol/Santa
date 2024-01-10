import { ethers } from "hardhat";

async function main () {
  const addressToken = '0xfEf6cdCb191aA62175550bf507cDf246BEa9C3b3';
  const token = await ethers.getContractAt("Santa", addressToken);
  await token.mint(3, {value: ethers.parseEther('0.003')});
  console.log('script is done')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });