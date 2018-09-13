import Web3 from 'web3'

const WEB3HOSTWS = 'https://mainnet.infura.io/v3/bb15bacfcdbe45819caede241dcf8b0d';

let web3;

// Prevent web3 from executing to testing. Can result in infinite non-ending tests
if (!process.env.TEST) {
  web3 = web3Setup();
}

function web3Setup() {
  if (!WEB3HOSTWS) throw Error('WEB3HOSTWS is needed to connect to ethchain but it\'s undefined');

  let web3 = new Web3(WEB3HOSTWS);

  return web3;
}

export default web3;
