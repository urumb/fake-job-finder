// simple deployment script for ScamLedger
// nothing fancy, just deploy and print the address

import hre from "hardhat";

async function main() {
  const ScamLedger = await hre.ethers.getContractFactory("ScamLedger");
  const scamLedger = await ScamLedger.deploy();

  await scamLedger.waitForDeployment();

  console.log("ScamLedger deployed to:", await scamLedger.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
