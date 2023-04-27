const Marketplace = artifacts.require('./MarketplaceRoyalty.sol');

// const fee = 150;
// const feeRecipeint = '0xA9b81Ba4978FaC64B52FEBe0e9E1FCeCE8d6F33B';

module.exports = function (deployer) {
  deployer.deploy(Marketplace);
};
