// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./ERC721DefaultApproval.sol";


/**
 * @title ERC721Lazy
 * @dev This contract is inherited from ERC721Enumerable,
 * ERC721URIStorage smart contract from openzepplin library.
 * ERC721Lazy smart contract supports normal minting as well as lazy minting.
 * 
 * The {transferFromOrMint} function can be used for lazy minting.
 */
contract ERC721Lazy is ERC721Enumerable,ERC721URIStorage, ERC721DefaultApproval {
    using SafeMath for uint256;
        
    constructor(string memory name, string memory symbol) ERC721(name, symbol) { }

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

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal virtual override(ERC721, ERC721DefaultApproval) view returns (bool) {
        return ERC721DefaultApproval._isApprovedOrOwner(spender, tokenId);
    }

    function isApprovedForAll(address owner, address operator) public view virtual override(ERC721DefaultApproval, ERC721, IERC721) returns (bool) {
        return ERC721DefaultApproval.isApprovedForAll(owner, operator);
    }

    //mint
    function mint(address receiver, uint256 tokenId, string memory tokenUri) public onlyOperator returns (uint256) {

        _safeMint(receiver, tokenId);
        _setTokenURI(tokenId, tokenUri);

        return tokenId;
    }

    /**
     * @dev Releases the amount of tokens held againts the address
     *
     * @param tokenId The token Id
     * @param tokenUri The token uri associated with the token Id
     * @param from The address from which token wil be transfered
     * @param to The address to which token will be transfered
     *
     * Emits two {Transfer} events. One when the token is mint, while other when the token is transferred.
     */
    function transferFromOrMint(uint256 tokenId, string memory tokenUri, address from, address to) external onlyOperator {
        if(_exists(tokenId)){
            safeTransferFrom(from, to, tokenId);
        } else{
            mintAndTransfer(tokenId, tokenUri, from, to);
        }
    }

    /**
     * @dev Releases the amount of tokens held againts the address
     *
     * @param tokenId The token Id
     * @param tokenUri The token uri associated with the token Id
     * @param from The address from which token wil be transfered
     * @param to The address to which token will be transfered
     *
     * Emits two {Transfer} events. One when the token is mint, while other when the token is transferred.
     */
    function mintAndTransfer(uint256 tokenId, string memory tokenUri, address from, address to) public onlyOperator {
        _safeMint(from, tokenId);
        _setTokenURI(tokenId, tokenUri);
        _transfer(from, to, tokenId);
    }

}