const Block = require("./block")
const Transaction = require("./transaction")

const createGenesisBlock = () => {
    const tx = new Transaction(null, "04d48a3a2456d9f2e5f4925717ab98fb0874aa60e5ced731b8a028f05c35e119efbe584fabf8c88d9c1718ef522508248b85cd42a78d46fbefb558cd951b544350", 50);
    // tx.signature = "3046022100965eb473394bbbf80a88004b2bde368c3efd026cd1bdf69b9dbb6efc7e88b326022100ee77a55e66940bda6e5b458da98531d7c1e6fd64bbdf3c402456c6a1dcefd1b6"
    return new Block(new Date(), [tx], "0");
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

        if (!block.isTransactionsValid()) {
            throw new Error("transactions NOT valid")
        }

        block.previousHash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block)

        this.pendingTransactions = [new Transaction(null, minerAddress, this.reward)];
    }

    addTransaction(transaction) {
        if (!transaction.from || !transaction.to) {
            throw new Error("transaction does not has an address")
        }

        if (!transaction.isValid()) {
            throw new Error("transaction NOT valid")
        }

        this.pendingTransactions.push(transaction);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if (!currentBlock.isTransactionsValid()) {
                return false;
            }

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