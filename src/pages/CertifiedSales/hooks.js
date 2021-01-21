import {useEffect, useState} from 'react';
import {getContract, useActiveWeb3React} from "../../web3";
import BounceProVoting from "../../web3/abi/BounceProVoting.json";
import {BOUNCE_PRO_VOTING} from "../../web3/address";

export const useVoteList = () => {
  const [list, setList] = useState([])
  const {active, account, library, chainId} = useActiveWeb3React();

  try {
    const bounceContract = getContract(library, BounceProVoting.abi, BOUNCE_PRO_VOTING(chainId))
    bounceContract.methods.getPoolCount().call().then(res => {
      console.log('count', res)
      for (let i = 0; i < res; i++) {
        bounceContract.methods.pools(i).call().then( async poolRes=>{
          const pool = poolRes
           pool.totalVotes = await bounceContract.methods.totalVotes(i).call()
           poolRes.votePassed = await bounceContract.methods.votePassed(i).call()
          console.log('pool',pool)
          setList(list.concat(pool))
        })
      }
    })
  } catch (e) {

  }

  return {list}
}
