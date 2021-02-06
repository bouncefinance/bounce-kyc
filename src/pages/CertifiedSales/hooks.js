import axios from 'axios';
import API from '../../config/request_api'
import { useEffect, useState } from 'react';
import { getContract, useActiveWeb3React } from "../../web3";
import BounceProVoting from "../../web3/abi/BounceProVoting.json";
import BouncePro from "../../web3/abi/BouncePro.json";
import { BOUNCE_PRO_VOTING, BOUNCE_PRO } from "../../web3/address";
import { isGreaterThan } from "../../utils/common";
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import { weiToNum } from "../../utils/numberTransform";


export const getProjectInfo = async (proId) => {
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
  const { active, library, chainId, account } = useActiveWeb3React();

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
            const proInfo = await getProjectInfo(pool.projectId)
            pool.botHolder = true
            pool.proInfo = proInfo
            try {
              const tokenContract = getContract(library, bounceERC20.abi, proInfo.tokencontractaddress)
              const decimals = await tokenContract.methods.decimals().call()
              const allowance = await tokenContract.methods.allowance(account, BOUNCE_PRO(chainId)).call()
              pool.approved = isGreaterThan(weiToNum(allowance, parseInt(decimals)), proInfo.amountoftoken)
              console.log('approved allowance', allowance)
              console.log('approved', pool.approved)

            } catch (e) {
              console.log('allowance error', e)
            }
            if (pool.projectId !== '0') {
              pools = pools.concat(pool)
              setList(pools)
            }
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
  const upItem = [{
    projectId: "39",
    prologourl: "622af34d40944eeeb8f1e2e3377842d2.png",
    proname: "Umbrella Network",
    prosummary: "Community Owned, Layer 2 Oracle",
    protheme: "Layer 2 Oracle, defi",
    prowebsite: "https://www.umb.network/",
    status: "Success",
    teambio: "The Umbrella Network Team has worked together for the past 10 years building high performance applications primarily in the digital advertising market. Most recently, they build a transparency solution for the digital advertising industry using the Ethereum blockchain.",
    teamwallet: "0x14Fe1c6ADb626A8235b079d4ff66C6b0a3a2E68a",
    techhighlight: "Reduce cost of on chain data exponentially",
    telegram: "https://t.me/umbrellanet",
    tokencontractaddress: "0xAcE942e89a84c50294832eD7B24CF2db42E95127",
    tokendistribution: "unlock promptly after sale",
    tokenlookupschedule: "Unlock promptly",
    tokenticketer: "LCF",
    totalVotes: 300,
    totalsupply: "400",
    twitter: "https://twitter.com/UmbNetwork",
    updated_at: "2021-02-06T15:33:44Z",
    votePassed: true,
    whitepaperlink: "https://www.umb.network/wp-content/uploads/2021/02/umb_litepaper_design_v3.1.pdf",

    "proInfo": {
      'accountaddress': "0x14fe1c6adb626a8235b079d4ff66c6b0a3a2e68a",
      "allocationperwallet": "No limits",
      "amountoftoken": "400",
      'architecture': "Merkle Tree based sidechain",
      'attachmenturl': "",
      'auctiontime': "3600",
      'auctiontype': "NFT Lottery",
      'circulatingsupply': "400",
      'code': 1,
      'contactemail': "sam@umb.network",
      'created_at': "2021-02-06T15:33:44Z",
      'fackbook': "",
      'githublink': "https://github.com/umbrella-network",
      'id': 39,
      'ifkyc': 1,
      'ifwhitelist': 1,
      'medium': "",
      'pricepertoken': "250",
      'prologourl': "622af34d40944eeeb8f1e2e3377842d2.png",
      'proname': "Umbrella Network",
      'prosummary': "Community Owned, Layer 2 Oracle",
      'protheme': "Layer 2 Oracle, defi",
      'prowebsite': "https://www.umb.network/",
      'teambio': "The Umbrella Network Team has worked together for the past 10 years building high performance applications primarily in the digital advertising market. Most recently, they build a transparency solution for the digital advertising industry using the Ethereum blockchain.",
      'teamwallet': "0x14Fe1c6ADb626A8235b079d4ff66C6b0a3a2E68a",
      'techhighlight': "Reduce cost of on chain data exponentially",
      'telegram': "https://t.me/umbrellanet",
      'tokencontractaddress': "0xAcE942e89a84c50294832eD7B24CF2db42E95127",
      'tokendistribution': "unlock promptly after sale",
      'tokenlookupschedule': "Unlock promptly",
      'tokenticketer': "LCF",
      'totalsupply': "400",
      'twitter': "https://twitter.com/UmbNetwork",
      'updated_at': "2021-02-06T15:33:44Z",
      'whitepaperlink': "https://www.umb.network/wp-content/uploads/2021/02/umb_litepaper_design_v3.1.pdf"
    }
  }]
  const [list, setList] = useState()

  const [activePool, setActivePool] = useState([])
  const [upcomingPools, setUpcomingPools] = useState(upItem)
  const [passPools, setPassPools] = useState([])
  const { active, library, chainId, account } = useActiveWeb3React();


  const fetchList = () => {
    let pools = []
    try {
      const bounceContract = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
      bounceContract.methods.getPoolCount().call().then(res => {
        console.log('getPoolCount', res)
        for (let i = 0; i < res; i++) {
          bounceContract.methods.pools(i).call().then(async poolRes => {
            console.log('pool--->', poolRes)
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

            const toAmount = await bounceContract.methods.amountSwap1P(i).call()
            if (poolRes.amountTotal1 === toAmount) {
              pool.status = 'Failed'
            }

            pool.botHolder = await bounceContract.methods.onlyBotHolderP(i).call()

            pool.inKYC = await bounceContract.methods.kyclist(account).call()

            const bidAmount = await bounceContract.methods.myAmountSwapped0(account, i).call()
            pool.joined = isGreaterThan(bidAmount, '0')

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
      fetchList()
    }
  }, [active])

  useEffect(() => {
    console.log('list---》', list)
    if (list && list.length !== 0) {
      setActivePool(list.filter(item => {
        return item.status === 'Active' && item.id !== 0
      }))
      // setUpcomingPools(list.filter(item => {
      //   return item.status === 'Upcoming' && item.id !== 0
      // }), ...upItem)
      setPassPools(list.filter(item => {
        return item.status === 'Failed' && item.id !== 0
      }))
    }
  }, [list])

  return { list, activePool, upcomingPools, passPools }
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
        pool.botHolder = true
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
