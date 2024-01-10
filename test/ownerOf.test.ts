import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("ownerOf", function () {
  it("Should return owner of token", async function () {
    const { token, owner } = await loadFixture(deploySantaTokenFixture);

    await token.mint(1, {value: ethers.parseEther('0.001')});
    
    expect(owner.address).to.equal(await token.ownerOf(1)) 
  });
});