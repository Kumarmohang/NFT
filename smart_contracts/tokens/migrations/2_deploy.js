const Token = artifacts.require('ERC721Lazy.sol');

const MarketplaceAddress = '0xcdb4B296429f8f17a438a15Ad989DAa889bC8E08';
// const MarketplaceAddress = '0x8EA2FF4812EAdD682Cd376F5849E851DB57343C5';

module.exports = async function (deployer) {
  await deployer.deploy(Token, 'NFTrove', 'TROVE');
  const NftToken = await Token.deployed();
  await NftToken.setDefaultApproval(MarketplaceAddress, true);
};
