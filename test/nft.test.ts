import { expect } from "chai";
import { ethers, upgrades } from "hardhat"
import { RuinNFT, RuinNFTV2 } from "../types";

describe("ERC721 Upgradeable", () => {
	it("deploy an upgradeable ERC721 contract", async () => {
		const RuinNFT = await ethers.getContractFactory("RuinNFT");
		const RuinNFTV2 = await ethers.getContractFactory("RuinNFTV2");

		let proxyContract = await upgrades.deployProxy(RuinNFT, {
			kind: "uups",
		}) as RuinNFT;

		const [owner] = await ethers.getSigners();
		const ownerOfToken1 = await proxyContract.ownerOf("1");

		expect(ownerOfToken1).to.be.equal(owner.address);

		let proxyContractV2 = await upgrades.upgradeProxy(proxyContract, RuinNFTV2) as RuinNFTV2;
		expect(await proxyContractV2.test()).to.be.equal("upgrade");
	});
});