import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture, deploySantaTokenFixtureWith2MaxSupply } from "./fixture";

describe("mint", function () {
  it("Should mint tokens with token ID 1 & 2", async function () {
    const { token, owner } = await loadFixture(deploySantaTokenFixture);
    
    await token.mint(2, {value: ethers.parseEther('0.002')});
    
    expect(owner.address).to.equal(await token.ownerOf(1));
    expect(owner.address).to.equal(await token.ownerOf(2));
    expect(2).to.equal(await token.balanceOf(owner.address));  
  });

  it("Should not mint if sending value doesn't equal 0.001 ether for each token", async function () {
    const { token } = await loadFixture(deploySantaTokenFixture);
    
    await expect(token
      .mint(2, {value: ethers.parseEther('0.001')}))
      .to.be.revertedWith('user should send 0.001 ether for each token');  
  });

  it("Should not mint if amount of token > 4", async function () {
    const { token } = await loadFixture(deploySantaTokenFixture);
    
    await expect(token
      .mint(4, {value: ethers.parseEther('0.004')}))
      .to.be.revertedWith('one minting amount should be <= 3');  
  });

  it("Should not mint if balance of user will be > 6", async function () {
    const { token } = await loadFixture(deploySantaTokenFixture);
    
    await token.mint(2, {value: ethers.parseEther('0.002')});
    await token.mint(3, {value: ethers.parseEther('0.003')}); 

    await expect(token
      .mint(2, {value: ethers.parseEther('0.002')}))
      .to.be.revertedWith('balance of user shoul be <= 6'); 
  });

  it("Should not mint if totalSupply will be > maxSupply", async function () {
    const { token } = await loadFixture(deploySantaTokenFixtureWith2MaxSupply);

    await expect(token
      .mint(3, {value: ethers.parseEther('0.003')}))
      .to.be.revertedWith('totalSupply should be <= 2');  
  });
});