// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleNFT {
    // Variables
    string private name;
    string private symbol;
    uint256 private totalSupply;
    mapping(address => uint256) private balances;
    mapping(uint256 => address) private tokenOwners;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    // Constructor
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        totalSupply = 0;
    }

    // Functions
    function getName() external view returns (string memory) {
        return name;
    }

    function getSymbol() external view returns (string memory) {
        return symbol;
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return balances[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        require(tokenOwners[_tokenId] != address(0), "Token does not exist");
        return tokenOwners[_tokenId];
    }

    function mint(address _to) external {
        uint256 tokenId = totalSupply + 1;
        balances[_to] += 1;
        tokenOwners[tokenId] = _to;
        totalSupply += 1;
        emit Transfer(address(0), _to, tokenId);
    }

    function transfer(address _to, uint256 _tokenId) external {
        address from = tokenOwners[_tokenId];
        require(from != address(0), "Token does not exist");
        require(from == msg.sender, "Sender is not the owner");
        require(_to != address(0), "Cannot transfer to zero address");

        balances[from] -= 1;
        balances[_to] += 1;
        tokenOwners[_tokenId] = _to;

        emit Transfer(from, _to, _tokenId);
    }
}