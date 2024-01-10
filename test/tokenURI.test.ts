import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("tokenURI", function () {
  it("Should return tokenURI", async function () {
    const { token } = await loadFixture(deploySantaTokenFixture);
    const tokenURI1 = 'https://bafybeibc5sgo2plmjkq2tzmhrn54bk3crhnc23zd2msg4ea7a4pxrkgfna.ipfs.dweb.link/1';
    
    await token.mint(1, {value: ethers.parseEther('0.001')});
    
    expect(tokenURI1).to.equal(await token.tokenURI(1)) 
  });
});