import {useEffect, useState} from 'react';
import {getContract, useActiveWeb3React} from "../../web3";
import BounceProVoting from "../../web3/abi/BounceProVoting.json";
import {BOUNCE_PRO_VOTING} from "../../web3/address";

export const useVoteList = () => {
  const [list, setList] = useState()
  const {active, library, chainId} = useActiveWeb3React();

  const fetchList = () =>{
    console.log('fetchList')
    let pools = []
    try {
      const bounceContract = getContract(library, BounceProVoting.abi, BOUNCE_PRO_VOTING(chainId))
      bounceContract.methods.getPoolCount().call().then(res => {
        for (let i = 0; i < res; i++) {
          bounceContract.methods.pools(i).call().then( async poolRes=>{
            const pool = poolRes
            pool.id = i
            pool.totalVotes = await bounceContract.methods.totalVotes(i).call()
            poolRes.votePassed = await bounceContract.methods.votePassed(i).call()

            if(poolRes.votePassed){
              pool.status = 'Success'
            }else {
              const closeAt = new Date(poolRes.closeAt *  1000)
              const closed = closeAt - new Date()
              pool.status = closed > 0? 'Active' : 'Failed'
            }
            console.log('pool',pool)
            pools = pools.concat(pool)
            setList(pools)
          })
        }
      })
    } catch (e) {
      console.log('fetchList error', e)
    }
  }

  useEffect(()=>{
    if(active){
      fetchList()
    }
  },[active])

  return {list}
}
