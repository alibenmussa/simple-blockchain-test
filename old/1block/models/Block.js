const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestapm, data, previousHash = "") {
        this.index = index;
        this.timestapm = timestapm;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.calcHash();
    }

    calcHash() {
        return SHA256(this.index + this.timestapm + this.previousHash + JSON.stringify(this.data)).toString()
    }
}

module.exports = Block