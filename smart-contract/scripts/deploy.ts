import { ethers } from "hardhat";

async function main() {
 const SwapFee = await ethers.deployContract("SwapFee", [1])
 await SwapFee.waitForDeployment()

 console.log("Swap Fee Deployed To", SwapFee.target)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
