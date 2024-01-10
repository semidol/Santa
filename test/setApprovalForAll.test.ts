import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("setApprovalForAll", function () {
  it("Should give permission to address to transfer any token to another account", async function () {
    const { token, owner, otherAccount } = await loadFixture(deploySantaTokenFixture);

    await token.mint(2, {value: ethers.parseEther('0.002')});
    await token.setApprovalForAll(otherAccount, true)
    await token.connect(otherAccount).transferFrom(owner, otherAccount, 1);
    await token.connect(otherAccount).transferFrom(owner, otherAccount, 2);

    expect(2n).to.equal(await token.balanceOf(otherAccount)) 
  });
});