// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/utils/Counters.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

 contract NFT is ERC721Enumerable,ERC721URIStorage, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    address public zeroAddress = 0x0000000000000000000000000000000000000000;
    
    string public baseTokenURI;
    
    constructor(string memory baseURI) ERC721("NFT Collectible", "NFTC") { }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    //mint
    function mintNft(address receiver, string memory tokenUri) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newNftTokenId = _tokenIds.current();
        _mint(receiver, newNftTokenId);
        _setTokenURI(newNftTokenId, tokenUri);
        _beforeTokenTransfer(zeroAddress,receiver,newNftTokenId);
        return newNftTokenId;
    }   
    //tokenUri

}