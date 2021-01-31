const Block = require("./block")

const createGenesisBlock = () => {
    return new Block(0, new Date(), "Gensis Block", "0");
}

class Blockchain {
    constructor() {
        this.chain = [createGenesisBlock()]
        // this.salt = this.selectRandom();
    }

    // selectRandom() {
    //     return Math.floor(Math.random() * 15000)
    // }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createNewBlock(block) {
        // let currentAttempt = null;
        // do {
        //     currentAttempt = this.selectRandom()
        //     console.log("Mining ", currentAttempt)
        // } while (currentAttempt != this.salt)

        block.previousHash = this.getLatestBlock().hash;
        // block.hash = block.calcHash()
        block.mineBlock(6);
        this.chain.push(block)

        // this.salt = this.selectRandom();
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