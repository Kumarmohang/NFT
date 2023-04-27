// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IERC721LazyMint is IERC721 {

    function transferFromOrMint(
        uint256 tokenId, string memory tokenUri, address from, address to
    ) external;

    function mint(
        address receiver, uint256 tokenId, string memory tokenUri
    ) external;
}
