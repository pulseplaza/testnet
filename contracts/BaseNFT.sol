// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BaseNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    struct Token {
        uint256 tokenID;
        address owner;
    }

    function mintNFT(address recipient) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(recipient, newItemId);

        return newItemId;
    }

    // Function to return the total supply
    function getTotalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getAllTokens() public view returns (Token[] memory) {
        uint256 totalSupply = getTotalSupply(); // Get the total supply of NFTs
        Token[] memory tokens = new Token[](totalSupply); // Array to store tokens

        for (uint256 i = 0; i < totalSupply; i++) {
            address owner = ownerOf(i + 1); // Get the owner of the token ID
            Token memory token = Token(i + 1, owner); // Create a new Token structure
            tokens[i] = token; // Add the token to the array
        }

        return tokens; // Return the array of tokens
    }
}
