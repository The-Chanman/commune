//a Satoshi is a 10^-8 of a BTC or 0.00000001 BTC

var Chain = require('chain-node');
var WebSocket = require('ws');
var chain = new Chain({
  keyId: '2b2fece03da1aabd4cf995af0115c47d',// Your API Key ID
  keySecret:  'a73c5ba71b278e9c48c01304b6360257',// Your API Secret Key
  blockChain: 'bitcoin',
});

var opTransactions = [];

// function that converts from satoshiToBTC
function satoshiToBTC(satoshis ){
  return satoshis/100000000;
};

// Create a websocket to observe the blockchain
var conn = new WebSocket("wss://ws.chain.com/v2/notifications");

// Upon opening the websocket observe new transaction
conn.onopen = function (ev) {
  var req = {type: "new-transaction", block_chain: "bitcoin"};
  conn.send(JSON.stringify(req));
};
// When we observe a new transaction being broadcasted grab it and put it in variable x
conn.onmessage = function (ev) {
  var x = JSON.parse(ev.data);
// Chain sometimes sends heartbeats to make sure the connection stays open   
if(x.payload.transaction == undefined){
  console.log("heartbeat")
}
else{

/*
  // Generate variables to hold selected information

  // Need to check for Nulldata output
  for(var i = 0; i < x.payload.transaction.output.length; i++)
  {
    if(x.payload.transaction.output[i].script_type == 'nulldata'){
      opTransactions.push(x.payload.transaction);
      console.log(x.payload.transaction);
      break;
    }
  }
*/  
  ///*
  // Print out various pieces of info about the new transaction
  var fees = satoshiToBTC(x.payload.transaction.fees)
  var amount = satoshiToBTC(x.payload.transaction.amount)
  var address = x.payload.transaction.inputs[0].addresses
  console.log(amount, fees, address);
  //*/
  }
};
  
conn.onclose = function (ev) {
  var conn = new WebSocket("wss://ws.chain.com/v2/notifications");
};