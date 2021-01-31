const Transaction = require("./src/models/Transaction");
const Blockchain = require("./src/models/Blockchain");
const myWallet = require("./wallet.json");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myPrivateKey = ec.keyFromPrivate(myWallet.privateKey, "hex");
const myWalletAddress = myPrivateKey.getPublic("hex");

const osamaKey =
  "0470e05a326363df59cd649a9877db75a9422a4632a55ee2e54d7d15b659e26774951bdf515afaa3f186b90973a54e52934865ceb332459bd3198069a070f4111f";

const simpleCurrency = new Blockchain();
const tx1 = new Transaction(myWalletAddress, osamaKey, 5);
tx1.signTransaction(myPrivateKey);
simpleCurrency.addTransaction(tx1);
simpleCurrency.addTransaction(10);
simpleCurrency.minePendingTransactions(myWalletAddress);
console.log(JSON.stringify(simpleCurrency.chain, null, 2));
console.log(simpleCurrency.isChainValid());

console.log("alibenmussa", simpleCurrency.getBalanceOfAddress(myWalletAddress));
console.log("osama", simpleCurrency.getBalanceOfAddress(osamaKey));

simpleCurrency.chain[1].transactions[0].amount = 5000;
console.log(JSON.stringify(simpleCurrency.chain, null, 2));
console.log(simpleCurrency.isChainValid());

console.log("alibenmussa", simpleCurrency.getBalanceOfAddress(myWalletAddress));
console.log("osama", simpleCurrency.getBalanceOfAddress(osamaKey));

// simpleCurrency.minePendingTransactions(myWalletAddress);
// console.log("alibenmussa", simpleCurrency.getBalanceOfAddress(myWalletAddress))
