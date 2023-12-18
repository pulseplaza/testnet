// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

import "./BaseNFT.sol";

interface IUniswapRouter {
    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);
}

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 public listingPrice = 1 ether;
    uint256 public creatingCollectionFee = 5 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable creator;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    struct Collection {
        address creatorAddress;
        address collectionAddress;
        string name;
        string symbol;
        string description;
        string image;
    }
    Collection[] public collections;

    address public ROUTER_ADDRESS = 0x636f6407B90661b73b1C0F7e24F4C79f624d0738;
    address public PACO_TOKEN_ADDRESS =
        0x13ca32a56D9A52810dF2FE0bBaD71462b0D209AD;
    address public WPLS = 0x70499adEBB11Efd915E3b69E700c331778628707;
    address public BURN_ADDRESS = 0x0000000000000000000000000000000000000369;
    uint256 public burnPercentage = 50;

    IUniswapRouter private router;
    IERC20 private paco;

    event MarketItemCreated(
        uint256 indexed tokenId,
        address creator,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event CollectionCreated(
        uint256 nonce,
        bytes bytecode,
        address collection_address
    );

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the owner of the marketplace can perform this operation."
        );
        _;
    }

    constructor() ERC721("Pulse Plaza NFT", "PLSPLAZA") {
        owner = payable(msg.sender);
        router = IUniswapRouter(ROUTER_ADDRESS);
        paco = IERC20(PACO_TOKEN_ADDRESS);
    }

    //functions to edit addresses
    function setRouterAddress(address _routerAddress) external {
        ROUTER_ADDRESS = _routerAddress;
        router = IUniswapRouter(ROUTER_ADDRESS);
    }

    function setPacoTokenAddress(address _pacoTokenAddress) external {
        PACO_TOKEN_ADDRESS = _pacoTokenAddress;
        paco = IERC20(PACO_TOKEN_ADDRESS);
    }

    function setWPLSAddress(address _wplsAddress) external {
        WPLS = _wplsAddress;
    }

    function setBurnAddress(address _burnAddress) external {
        BURN_ADDRESS = _burnAddress;
    }

    function setBurnPercentage(uint256 _burnPercentage) public onlyOwner {
        require(
            _burnPercentage <= 100,
            "Burn percentage cannot be more than 100."
        );
        burnPercentage = _burnPercentage;
    }

    /* Sales tax definition */
    uint256 public salesTaxPercentage = 6; // 6% by default, can be changed later
    uint256 public ownerTaxPercentage = 2; // Among 6%, 2% to go to marketplace owner

    function setSalesTaxPercentage(
        uint256 _salesTaxPercentage
    ) public onlyOwner {
        require(
            _salesTaxPercentage <= 100,
            "Tax percentage cannot be more than 100."
        );
        salesTaxPercentage = _salesTaxPercentage;
    }

    function setOwnerTaxPercentage(
        uint256 _ownerTaxPercentage
    ) public onlyOwner {
        require(
            _ownerTaxPercentage <= 100,
            "Tax percentage cannot be more than 100."
        );
        require(
            _ownerTaxPercentage <= salesTaxPercentage,
            "Tax percentage cannot be more than total tax percentage."
        );
        ownerTaxPercentage = _ownerTaxPercentage;
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(
        uint256 _listingPrice
    ) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    function updateCreatingCollectionFee(
        uint256 _creatingCollectionFee
    ) public payable onlyOwner {
        creatingCollectionFee = _creatingCollectionFee;
    }

    // Create NFT collection
    function createCollection(
        string memory name,
        string memory symbol,
        string memory description,
        string memory image
    ) external payable returns (address collectionAddress) {
        require(
            msg.value == creatingCollectionFee,
            "Must send collection creating fee."
        );

        payable(owner).transfer(creatingCollectionFee);

        // bytes memory initCode = type(BaseNFT).creationCode; //with no arguments
        bytes memory initCode = abi.encodePacked(
            type(BaseNFT).creationCode,
            abi.encode(name, symbol)
        ); //with arguments

        uint256 nonce = collections.length;

        bytes32 salt = keccak256(
            abi.encodePacked(msg.sender, address(this), nonce)
        );
        assembly {
            collectionAddress := create2(
                0,
                add(initCode, 32),
                mload(initCode),
                salt
            )
        }

        collections.push(
            Collection(
                msg.sender,
                collectionAddress,
                name,
                symbol,
                description,
                image
            )
        );

        emit CollectionCreated(nonce, initCode, collectionAddress);

        return collectionAddress;
    }

    // Function to retrieve all collections
    function getCollections() public view returns (Collection[] memory) {
        return collections;
    }

    // GET USER'S COLLECTION
    function getCollectionsByUser(
        address user
    ) external view returns (Collection[] memory) {
        uint256 userCollectionCount = 0;

        for (uint256 i = 0; i < collections.length; i++) {
            if (collections[i].creatorAddress == user) {
                userCollectionCount++;
            }
        }

        Collection[] memory userCollections = new Collection[](
            userCollectionCount
        );
        uint256 collectionIndex = 0;

        for (uint256 i = 0; i < collections.length; i++) {
            if (collections[i].creatorAddress == user) {
                userCollections[collectionIndex] = collections[i];
                collectionIndex++;
            }
        }

        return userCollections;
    }

    // Fetch a specific collection by its address
    function getCollectionDetails(
        address collectionAddress
    ) public view returns (Collection memory) {
        for (uint i = 0; i < collections.length; i++) {
            if (collections[i].collectionAddress == collectionAddress) {
                return collections[i];
            }
        }
        revert("Collection not found.");
    }

    // TOKEN MINT
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256, address) {
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price."
        );

        payable(owner).transfer(listingPrice); // Transfer listingPrice immediately to the contract owner

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        address payable creatorAddress = payable(msg.sender);
        createMarketItem(newTokenId, price, creatorAddress);

        return (newTokenId, msg.sender);
    }

    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        address payable creator
    ) private {
        require(price > 0, "Price must be at least 1 wei.");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            creator,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            creator,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    // TOKEN RE-SALE
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only item owner can perform this operation."
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price."
        );

        payable(owner).transfer(listingPrice);

        // Update the marketplace item
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            tokenId,
            idToMarketItem[tokenId].creator,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    // TOKEN SALE
    /* Transfers ownership of the item, as well as funds between parties */

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase."
        );

        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);

        uint256 taxAmount = (price * salesTaxPercentage) / 100;
        uint256 sellerAmount = price - taxAmount;

        //Among tax, owner gets 2%
        uint256 ownertaxAmount = (price * ownerTaxPercentage) / 100;
        payable(owner).transfer(ownertaxAmount); // Transfer tax to the marketplace owner or some other address

        //Among tax, remains swapped with token, some burnt, some goes to owner
        uint256 swappedtaxAmount = taxAmount - ownertaxAmount;

        address[] memory path = new address[](2);
        path[0] = WPLS;
        path[1] = PACO_TOKEN_ADDRESS;
        uint256 deadline = block.timestamp + 60; // Set deadline as 1 minute from now

        uint256[] memory amounts = router.swapExactETHForTokens{
            value: swappedtaxAmount
        }(0, path, address(this), deadline);

        uint256 tokenAmount = amounts[amounts.length - 1];
        uint256 burnAmount = (tokenAmount * burnPercentage) / 100;
        uint256 amountToCreator = tokenAmount - burnAmount;
        paco.transfer(BURN_ADDRESS, burnAmount);
        paco.transfer(idToMarketItem[tokenId].creator, amountToCreator); //send to NFT creator

        payable(idToMarketItem[tokenId].seller).transfer(sellerAmount);

        idToMarketItem[tokenId].seller = payable(address(0));
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
