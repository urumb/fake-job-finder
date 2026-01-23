// deploy script for ScamLedger
// simple and clean on purpose

async function main() {
  // get contract factory
  const ScamLedger = await ethers.getContractFactory("ScamLedger");

  // deploy contract
  const scamLedger = await ScamLedger.deploy();

  // wait till deployment is mined
  await scamLedger.deployed();

  console.log("ScamLedger deployed to:", scamLedger.address);
}

// standard hardhat pattern
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
