// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IERC721Lazy.sol";
import "./lib/LibTransfer.sol";

contract Marketplace is Ownable{

    using SafeMath for uint256;
    using LibTransfer for address;

    uint256 private _marketplaceFee;
    address private _marketplaceFeeRecipient;

    constructor(uint256 fee, address feeRecipient) {
        _marketplaceFee = fee;
        _marketplaceFeeRecipient = feeRecipient;
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

    function buyAsset(address nftAddress, uint256 tokenId, string memory tokenUri, address seller, uint256 amount, bool isInternalAddress) external payable{
        
        uint256 fee = (amount.mul(_marketplaceFee)) / 10000;
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
        uint256 rest = msg.value.sub(totalAmount);

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