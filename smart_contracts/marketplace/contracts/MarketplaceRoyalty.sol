// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IERC721Lazy.sol";
import "./lib/LibTransfer.sol";

contract MarketplaceRoyalty is Ownable{

    using SafeMath for uint256;
    using LibTransfer for address;

    struct AccountShare {
        address payable account;
        uint256 value;
    }

    mapping(uint256 => bool) usedNonces;

    // Signature methods

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8, bytes32, bytes32)
    {
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    // Builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function mintAsset(address nftAddress, address receiver, uint256 tokenId, string memory tokenUri) public {
        IERC721LazyMint(nftAddress).mint(receiver, tokenId, tokenUri);
    }

    function buyAsset(address nftAddress, uint256 tokenId, string memory tokenUri, address seller, uint256 amount, uint256 nonce, bool mintOrTransferCall, bytes memory sig, AccountShare[] memory accountShares) external payable{
        
        require(!usedNonces[nonce], "Nonce is already used");

        bytes32 message = prefixed(keccak256(abi.encodePacked(nftAddress, tokenId, amount, nonce, this)));

        require(recoverSigner(message, sig) == seller, "address does not match with the signer");

        usedNonces[nonce] = true;

        uint256 totalValue = amount;

        for (uint i=0; i< accountShares.length; i++){
            require(accountShares[i].account != address(0x0), "Recipient should not be zero address");
            require(accountShares[i].value > 0, "Share value should be positive");
            totalValue += accountShares[i].value;
        }

        // verify if sufficient amount is passed
        require(totalValue == msg.value, string(abi.encodePacked("Invalid amount supplied. Required: ", Strings.toString(totalValue)," Supplied: ", Strings.toString(msg.value))));

        address buyer = msg.sender;

        if(mintOrTransferCall){
            // transfer and mint
            IERC721LazyMint(nftAddress).transferFromOrMint(tokenId, tokenUri, seller, buyer);
        } else {
            IERC721(nftAddress).transferFrom(seller, buyer, tokenId);
        }

        // payable to seller
        address(seller).transferEth(amount);

        // marketplace fees and royalties
        for (uint i=0; i< accountShares.length; i++){
            address(accountShares[i].account).transferEth(accountShares[i].value);
        }
    }

}