import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("approve", function () {
  it("Should give permission to address to transfer token to another account", async function () {
    const { token, owner, otherAccount } = await loadFixture(deploySantaTokenFixture);

    await token.mint(2, {value: ethers.parseEther('0.002')});
    await token.approve(otherAccount, 1)
    await token.connect(otherAccount).transferFrom(owner, otherAccount, 1);

    expect(1n).to.equal(await token.balanceOf(otherAccount)) 
  });
});