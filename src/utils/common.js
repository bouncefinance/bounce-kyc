import Web3 from "web3";

const {numberToHex} = Web3.utils

const BigNumber = require('bignumber.js');

export const getTime = (day, hour, min) => {
  let time = 0;
  if ( day ) {
    time += 24 * 60 * 60 * day;
  }
  if ( hour ) {
    time += 60* 60 * hour;
  }
  if ( min ) {
    time += 60 * min;
  }
  return time;
}

export const isGreaterThan = (value1, value2) => {
  return   new BigNumber(value1).isGreaterThan(new BigNumber(value2))
}


export const isEqualTo = (value1, value2) => {
  return   new BigNumber(value1).isEqualTo(new BigNumber(value2))
}

