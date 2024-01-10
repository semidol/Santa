import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("transferFrom", function () {
  it("Should transfer token", async function () {
    const { token, owner, otherAccount } = await loadFixture(deploySantaTokenFixture);
    const contractAddress = await token.getAddress();

    await token.mint(2, {value: ethers.parseEther('0.002')});
    await token.transferFrom(owner, otherAccount, 1);
    await token.transferFrom(owner, contractAddress , 2);

    expect(otherAccount.address).to.equal(await token.ownerOf(1))
  });
});