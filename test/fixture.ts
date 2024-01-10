import { ethers } from "hardhat";

export async function deploySantaTokenFixture() {
  const accounts = await ethers.getSigners();
  const [owner, otherAccount] = accounts;
  const Santa = await ethers.getContractFactory('Santa');
  const token = await Santa.deploy(100, otherAccount);
  return { token, owner, otherAccount, accounts };
}

export async function deploySantaTokenFixtureWith2MaxSupply() {
  const accounts = await ethers.getSigners();
  const [owner, otherAccount] = accounts;
  const Santa = await ethers.getContractFactory('Santa');
  const token = await Santa.deploy(2, otherAccount);
  return { token, owner, otherAccount, accounts };
}