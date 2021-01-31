const { SHA256 } = require("crypto-js");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    calcHash() {
        return SHA256(this.from + this.to + this.amount).toString()
    }

    signTransaction(keyPairs) {
        if (this.from !== keyPairs.getPublic("hex")) {
            throw new Error("403")
        }

        this.signature = keyPairs.sign(this.calcHash(), "Base64").toDER("hex")
    }

    isValid() {
        if (this.from == null) {
            return true;
        }

        if (!this.signature || !this.signature.length) {
            throw new Error("501")
        }

        const publicKey = ec.keyFromPublic(this.from, "hex")
        return publicKey.verify(this.calcHash(), this.signature)
    }
}

module.exports = Transaction;