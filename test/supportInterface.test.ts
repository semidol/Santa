import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySantaTokenFixture } from "./fixture";

describe("supportInterface", function () {
  it("Should return correct boolean of supported interface", async function () {
    const { token } = await loadFixture(deploySantaTokenFixture);
    
    const IERC721InterfaceId = await token.supportsInterface('0x80ac58cd');
    const anoterInterfaceId = await token.supportsInterface('0xffffffff');

    expect(true).to.equal(IERC721InterfaceId);
    expect(false).to.equal(anoterInterfaceId); 
  });
});