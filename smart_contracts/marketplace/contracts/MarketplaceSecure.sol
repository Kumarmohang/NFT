// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IERC721Lazy.sol";
import "./lib/LibTransfer.sol";

contract MarketplaceSecure is Ownable{

    using SafeMath for uint256;
    using LibTransfer for address;
    uint256 private _marketplaceFee;
    address private _marketplaceFeeRecipient;
    mapping(uint256 => bool) usedNonces;

    constructor(uint256 fee, address feeRecipient) {
        _marketplaceFee = fee;
        _marketplaceFeeRecipient = feeRecipient;
    }

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

    function getMarketplaceFee() public view virtual returns (uint256) {
        return _marketplaceFee;
    }

    function getMarketplaceFeeRecipient()
    public
    view
    virtual
    returns (address)
    {
        return _marketplaceFeeRecipient;
    }

    function setMarketplaceFee(uint256 fee) public virtual onlyOwner {
        _marketplaceFee = fee;
    }

    function setMarketplaceFeeRecipient(address recipient)
    public
    virtual
    onlyOwner
    {
        _marketplaceFeeRecipient = recipient;
    }

    function mintAsset(address nftAddress, address receiver, uint256 tokenId, string memory tokenUri) public {
        IERC721LazyMint(nftAddress).mint(receiver, tokenId, tokenUri);
    }

    function buyAsset(address nftAddress, uint256 tokenId, string memory tokenUri, address seller, uint256 amount, uint256 nonce, bool isInternalAddress, bytes memory sig) external payable{
        
        require(!usedNonces[nonce], "Nonce is already used");

        bytes32 message = prefixed(keccak256(abi.encodePacked(nftAddress, tokenId, amount, nonce, this)));

        require(recoverSigner(message, sig) == seller, "address does not match with the signer");

        usedNonces[nonce] = true;

        uint256 fee = (amount * _marketplaceFee) / 10000;
        uint256 totalAmount = amount.add(fee);
        require(totalAmount<=msg.value, "Insufficient Amount supplied");

        address buyer = msg.sender;
            
        // payable to platform from buyer
        address(_marketplaceFeeRecipient).transferEth(fee);

        // payable to platform from seller
        address(_marketplaceFeeRecipient).transferEth(fee);

        // payable to seller
        address(seller).transferEth(amount.sub(fee));

        // rest amount paid back to sender
        uint256 rest = msg.value.sub(amount.add(fee));

        if(rest>0){
            address(buyer).transferEth(rest);
        }

        if(isInternalAddress){
            // transfer and mint
            IERC721LazyMint(nftAddress).transferFromOrMint(tokenId, tokenUri, seller, buyer);
        } else {
            IERC721(nftAddress).transferFrom(seller, buyer, tokenId);
        }
    }

}