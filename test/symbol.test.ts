import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("symbol", function () {
  it("Should return token's symbol", async function () {
    const { token } = await loadFixture(deploySantaTokenFixture);

    await token.mint(2, {value: ethers.parseEther('0.002')});

    expect('SNT').to.equal(await token.symbol()) 
  });
});