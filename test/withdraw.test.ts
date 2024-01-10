import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("withdraw", function () {
  it("Should withdraw to initial acc", async function () {
    const { token, otherAccount } = await loadFixture(deploySantaTokenFixture);
    const balanceBefore = await ethers.provider.getBalance(otherAccount.address)

    await token.mint(2, {value: ethers.parseEther('0.002')});
    await token.withdraw();
     
    const contractBalance = await ethers.provider.getBalance(await token.getAddress()); 
    const balanceAfter = await ethers.provider.getBalance(otherAccount.address);

    expect(0).to.equal(contractBalance); 
    expect(balanceAfter).to.equal(balanceBefore + 2n * 10n ** 15n) 
  });
});