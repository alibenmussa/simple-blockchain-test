const { mode } = require("crypto-js");
const Block = require("./block")

const createGenesisBlock = () => {
    return new Block(0, new Date(), "Gensis Block", "0");
}

class Blockchain {
    constructor() {
        this.chain = [createGenesisBlock()]
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createNewBlock(block) {
        block.previousHash = this.getLatestBlock().hash;
        block.hash = block.calcHash()
        this.chain.push(block)
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calcHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

        }
        return true;
    }
}

module.exports = Blockchain;