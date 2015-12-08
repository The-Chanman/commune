// Get transaction using hash

var Chain = require('chain-node');
var chain = new Chain({
  keyId: '2b2fece03da1aabd4cf995af0115c47d',// Your API Key ID
  keySecret:  'a73c5ba71b278e9c48c01304b6360257',// Your API Secret Key
  blockChain: 'bitcoin',
});

chain.getTransaction('81c4ec988e14550c2081cd471b5626d7340a1a2ece9e5cce2132d6e9799b5e81', function(err, resp) {
  console.log(resp);
});