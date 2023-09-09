var mycrypto = require('crypto');

class Block {
    constructor(data, previousHash = ' ') {
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
    }
  
    calculateHash() {
      const str = JSON.stringify(this);
      const hash = mycrypto.createHash('SHA256');
      hash.update(str).end();
      return hash.digest('hex');
    }
  }

  class Blockchain {
    constructor() {
      this.chain = [this.genesisBlock()];
    }
  
    genesisBlock() {
      // Define your genesis data (modify as needed)
      const genesisData = {
        petName: 'Genesis Pet',
        category: 'Genesis Category',
        description: 'The Genesis Lost Pet Report',
      };
  
      return new Block(genesisData, '0'); // '0' is the previous hash for the genesis block
    }
  
    getLatestBlock() {
      return this.chain[this.chain.length - 1];
    }
  
    addBlock(newBlock) {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    }
  }

module.exports = { Blockchain, Block };
