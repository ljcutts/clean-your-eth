import { ethers } from "hardhat";

describe("SwapFee", function () {
  it("Should return the new greeting once it's changed", async function () {
     const [owner, addr1] = await ethers.getSigners();
     const SwapFee = await ethers.deployContract("SwapFee", [1])
     await SwapFee.waitForDeployment()

    await SwapFee.connect(addr1).payFee({value: ethers.parseEther("100")})

    const balance = await ethers.provider.getBalance(addr1.address)
    console.log("Swapper Balance:", ethers.formatEther(balance))
    const ownerBalance = await ethers.provider.getBalance(owner.address)
    console.log("Owner Balance:", ethers.formatEther(ownerBalance))
  });
});
