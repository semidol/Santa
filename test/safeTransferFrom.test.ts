import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("safeTransferFrom", function () {
  it("Should safely transfer token", async function () {
    const { token, owner, otherAccount } = await loadFixture(deploySantaTokenFixture);
    const contractAddress = await token.getAddress();

    await token.mint(2, {value: ethers.parseEther('0.002')});
    await token.safeTransferFrom(owner, otherAccount, 1);

    expect(otherAccount.address).to.equal(await token.ownerOf(1));
    await expect(token.safeTransferFrom(owner, contractAddress , 2)).to.be.reverted;
  });
});