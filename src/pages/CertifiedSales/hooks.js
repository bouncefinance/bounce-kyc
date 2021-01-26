import axios from 'axios';
import API from '../../config/request_api'
import { useEffect, useState } from 'react';
import { getContract, useActiveWeb3React } from "../../web3";
import BounceProVoting from "../../web3/abi/BounceProVoting.json";
import BouncePro from "../../web3/abi/BouncePro.json";
import { BOUNCE_PRO_VOTING, BOUNCE_PRO } from "../../web3/address";

const getProjectInfo = async (proId) => {
  const params = {
    id: parseInt(proId)
  }

  try {
    const res = await axios.post(API.queryProInfoById, params)
    if (res.status === 200) {
      // console.log(res.data)
      return {
        code: 1,
        ...res.data.data
      }
    }
  } catch (error) {
    return {
      list: {
        code: 0,
        msg: `projectId:${proId}. The request is in error.`,
        err: error
      }
    }
  }
}

export const useVoteList = () => {
  const [list, setList] = useState()
  const { active, library, chainId } = useActiveWeb3React();

  const fetchList = () => {
    let pools = []
    try {
      const bounceContract = getContract(library, BounceProVoting.abi, BOUNCE_PRO_VOTING(chainId))
      bounceContract.methods.getPoolCount().call().then(res => {
        for (let i = res; i >= 0; i--) {
          bounceContract.methods.pools(i).call().then(async poolRes => {
            const pool = poolRes
            pool.id = i
            pool.totalVotes = await bounceContract.methods.totalVotes(i).call()
            poolRes.votePassed = await bounceContract.methods.votePassed(i).call()

            if (poolRes.votePassed) {
              pool.status = 'Success'
            } else {
              const closeAt = new Date(poolRes.closeAt * 1000)
              const closed = closeAt - new Date()
              pool.status = closed > 0 ? 'Active' : 'Failed'
            }
            // console.log('pool', pool)
            pool.proInfo = await getProjectInfo(pool.projectId)
            pools = pools.concat(pool)
            setList(pools)
          })
        }
        setList(pools)
      })
    } catch (e) {
      console.log('fetchList error', e)
    }
  }

  useEffect(() => {
    if (active) {
      fetchList()
    }
  }, [active])

  return { list }
}

export const usePoolList = () => {
  const [list, setList] = useState([])
  const { active, library, chainId } = useActiveWeb3React();

  const fetchList = () => {
    let pools = []
    try {
      const bounceContract = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
      bounceContract.methods.getPoolCount().call().then(res => {
        for (let i = 0; i < res; i++) {
          bounceContract.methods.pools(i).call().then(async poolRes => {
            // console.log('pool--->', poolRes)
            const pool = poolRes
            pool.id = i
            const isOpen = new Date() - poolRes.openAt * 1000 > 0
            if (!isOpen) {
              pool.status = 'Upcoming'
            } else {
              const closeAt = new Date(poolRes.closeAt * 1000)
              const closed = closeAt - new Date()
              pool.status = closed > 0 ? 'Active' : 'Failed'
            }
            // console.log('pool', pool)
            pool.proInfo = await getProjectInfo(pool.projectId)
            // console.log('pool',pool)
            pools = pools.concat(pool)
            setList(pools)
          })
        }
        setList(pools)
      })
    } catch (e) {
      console.log('fetchList error', e)
    }
  }

  useEffect(() => {
    if (active) {
      // fetchList()
    }
  }, [active])

  return { list }
}

export const useStatus = (id) => {
  const { active, library, chainId, account } = useActiveWeb3React();
  const [myVotes, setMyVotes] = useState()
  const [myVotesClaimed, setMyVotesClaimed] = useState(true)

  const fetchStatus = () => {
    try {
      const bounceContract = getContract(library, BounceProVoting.abi, BOUNCE_PRO_VOTING(chainId))
      bounceContract.methods.myVotes(account, id).call().then(res => {
        console.log('myVotes', res)
        setMyVotes(res)
      })
      bounceContract.methods.myVotesClaimed(account, id).call().then(res => {
        console.log('myVotesClaimed', myVotesClaimed)
        setMyVotesClaimed(res)
      })
    } catch (e) {
      console.log('fetch vote status error', e)
    }
  }

  useEffect(() => {
    if (active) {
      fetchStatus()
    }
  }, [active])

  return { myVotes, myVotesClaimed }
}



export const useVoteListByPoolId = (poolId) => {
  const [poolInfo, setPoolInfo] = useState({})
  const { active, library, chainId } = useActiveWeb3React();

  const fetchList = () => {
    try {
      const bounceContract = getContract(library, BounceProVoting.abi, BOUNCE_PRO_VOTING(chainId))
      bounceContract.methods.pools(poolId).call().then(async poolRes => {
        const pool = poolRes
        pool.id = poolId
        pool.totalVotes = await bounceContract.methods.totalVotes(poolId).call()
        poolRes.votePassed = await bounceContract.methods.votePassed(poolId).call()

        if (poolRes.votePassed) {
          pool.status = 'Success'
        } else {
          const closeAt = new Date(poolRes.closeAt * 1000)
          const closed = closeAt - new Date()
          pool.status = closed > 0 ? 'Active' : 'Failed'
        }
        // console.log('pool', pool)
        pool.proInfo = await getProjectInfo(pool.projectId)
        setPoolInfo(pool)
      })
    } catch (e) {
      console.log('fetchList error', e)
    }
  }

  useEffect(() => {
    if (active) {
      fetchList()
    }
  }, [active])

  return poolInfo
}
