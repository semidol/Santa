import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("isApprovedForAll", function () {
  it("Should return is one adderss allowed to manage all of the assets of otherAddress", async function () {
    const { token, owner, otherAccount } = await loadFixture(deploySantaTokenFixture);

    await token.mint(2, {value: ethers.parseEther('0.002')});
    await token.setApprovalForAll(otherAccount, true);

    expect(true).to.equal(await token.isApprovedForAll(owner, otherAccount));
    expect(false).to.equal(await token.isApprovedForAll(otherAccount, owner));
  });
});