const Block = require("./models/block");
const Blockchain = require("./models/blockchain");

const simpleCurrency = new Blockchain();
simpleCurrency.createNewBlock(new Block(1, new Date(), { amount: 5 }))
simpleCurrency.createNewBlock(new Block(2, new Date(), { amount: 1 }))

console.log(JSON.stringify(simpleCurrency.chain, null, 2));
console.log(simpleCurrency.isChainValid())

simpleCurrency.chain[1].data.amount = 1000;
simpleCurrency.chain[1].hash = simpleCurrency.chain[1].calcHash()
simpleCurrency.chain[2].previousHash = simpleCurrency.chain[1].hash
simpleCurrency.chain[2].hash = simpleCurrency.chain[2].calcHash()
console.log(JSON.stringify(simpleCurrency.chain, null, 2));

console.log(simpleCurrency.isChainValid())