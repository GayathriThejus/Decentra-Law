// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <=0.9.0;


contract DocumentStorage {
    address public owner;
    uint256 public documentCount;

    struct Document {
        uint256 id;
        string ipfsHash;
        uint256 timestamp;
        address uploader;
    }

    mapping(uint256 => Document) public documents;

    event DocumentUploaded(uint256 indexed id, string ipfsHash, uint256 timestamp, address uploader);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        documentCount = 0;
    }

    function uploadDocument(string memory _ipfsHash) public {
        documentCount++;
        uint256 currentId = documentCount;
        uint256 timestamp = block.timestamp;

        documents[currentId] = Document(currentId, _ipfsHash, timestamp, msg.sender);

        emit DocumentUploaded(currentId, _ipfsHash, timestamp, msg.sender);
    }

    function getDocument(uint256 _id) public view returns (uint256, string memory, uint256, address) {
        Document storage doc = documents[_id];
        return (doc.id, doc.ipfsHash, doc.timestamp, doc.uploader);
    }
}
