// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract ERC721DefaultApproval is ERC721, Ownable {
    mapping(address => bool) private defaultApprovals;

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOperator() {
        require(defaultApprovals[_msgSender()] , "Approval: operator is not approved");
        _;
    }

    event DefaultApproval(address indexed operator, bool hasApproval);

    function setDefaultApproval(address operator, bool hasApproval) public onlyOwner {
        defaultApprovals[operator] = hasApproval;
        emit DefaultApproval(operator, hasApproval);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal virtual override view returns (bool) {
        return defaultApprovals[spender] || super._isApprovedOrOwner(spender, tokenId);
    }

    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return defaultApprovals[operator] || super.isApprovedForAll(owner, operator);
    }
    uint256[50] private __gap;
}