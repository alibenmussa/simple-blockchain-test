const Transaction = require("./models/Transaction");
const Blockchain = require("./models/Blockchain");

const simpleCurrency = new Blockchain();

simpleCurrency.createNewTransaction(new Transaction("1JMbQciJJMr1zmbsk1HaAN2sBQTAB3e8hV", "zxcvb", 5))
simpleCurrency.createNewTransaction(new Transaction("zxcvb", "asdfg", 2))

simpleCurrency.minePendingTransactions("1JMbQciJJMr1zmbsk1HaAN2sBQTAB3e8hV");

console.log(JSON.stringify(simpleCurrency.chain, null, 2));
console.log("alibenmussa", simpleCurrency.getBalanceOfAddress("1JMbQciJJMr1zmbsk1HaAN2sBQTAB3e8hV"))
console.log("asdfg", simpleCurrency.getBalanceOfAddress("asdfg"))
console.log("zxcvb", simpleCurrency.getBalanceOfAddress("zxcvb"))

simpleCurrency.minePendingTransactions("1JMbQciJJMr1zmbsk1HaAN2sBQTAB3e8hV");
console.log(JSON.stringify(simpleCurrency.chain, null, 2));
console.log("alibenmussa", simpleCurrency.getBalanceOfAddress("1JMbQciJJMr1zmbsk1HaAN2sBQTAB3e8hV"))

