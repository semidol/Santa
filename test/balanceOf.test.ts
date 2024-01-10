import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("balanceOf", function () {
  it("Should return balance of account", async function () {
    const { token, owner } = await loadFixture(deploySantaTokenFixture);

    await token.mint(1, {value: ethers.parseEther('0.001')});
    
    expect(1n).to.equal(await token.balanceOf(owner)) 
  });
});