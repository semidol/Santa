import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("getApproved", function () {
  it("Should return approved address for token", async function () {
    const { token, otherAccount } = await loadFixture(deploySantaTokenFixture);

    await token.mint(2, {value: ethers.parseEther('0.002')});
    await token.approve(otherAccount, 1)

    expect(otherAccount.address).to.equal(await token.getApproved(1)) 
  });
});