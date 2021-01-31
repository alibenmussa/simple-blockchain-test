const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(timestapm, transactions, previousHash = "") {
        this.timestapm = timestapm;
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.hash = this.calcHash();
        this.nonce = 0;
    }

    calcHash() {
        return SHA256(this.timestapm + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString()
    }

    mineBlock(difficulty) {
        console.log("Mining block...")
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join(0)) {
            this.nonce
            this.hash = this.calcHash();
            console.log("Mining ", this.hash)
        }
    }

    isTransactionsValid() {
        for (const transaction of this.transactions) {
            if (!transaction.isValid()) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Block