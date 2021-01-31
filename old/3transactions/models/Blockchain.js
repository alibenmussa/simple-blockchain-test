const Block = require("./block")
const Transaction = require("./transaction")

const createGenesisBlock = () => {
    return new Block(new Date(), [new Transaction(null, "1JMbQciJJMr1zmbsk1HaAN2sBQTAB3e8hV", 50)], "0");
}

class Blockchain {
    constructor() {
        this.chain = [createGenesisBlock()];
        this.pendingTransactions = [];
        this.reward = 50;
        this.difficulty = 2;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(minerAddress) {
        let block = new Block(new Date(), this.pendingTransactions)

        block.previousHash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block)

        this.pendingTransactions = [new Transaction(null, minerAddress, this.reward)];
    }

    createNewTransaction(transaction) {
        this.pendingTransactions.push(transaction);
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

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.from === address) {
                    balance -= transaction.amount;
                }

                if (transaction.to === address) {
                    balance += transaction.amount;
                }
            }
        }

        return balance;
    }
}

module.exports = Blockchain;