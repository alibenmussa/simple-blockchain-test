const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestapm, data, previousHash = "") {
        this.index = index;
        this.timestapm = timestapm;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.calcHash();
        this.nonce = 0;
    }

    calcHash() {
        return SHA256(this.index + this.timestapm + this.previousHash + this.nonce + JSON.stringify(this.data)).toString()
    }

    mineBlock(dificulty) {
        while (this.hash.substring(0, dificulty) !== Array(dificulty + 1).join(0)) {
            this.hash = this.calcHash();
            console.log("Mining ", this.hash)
            this.nonce++;
        }
    }
}

module.exports = Block