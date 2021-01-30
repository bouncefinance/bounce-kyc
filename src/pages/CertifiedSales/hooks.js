import axios from 'axios';
import API from '../../config/request_api'
import {useEffect, useState} from 'react';
import {getContract, useActiveWeb3React} from "../../web3";
import BounceProVoting from "../../web3/abi/BounceProVoting.json";
import BouncePro from "../../web3/abi/BouncePro.json";
import {BOUNCE_PRO_VOTING, BOUNCE_PRO} from "../../web3/address";
import BigNumber from "bignumber.js";
import {isEqualTo, isGreaterThan} from "../../utils/common";
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import {weiToNum} from "../../utils/numberTransform";


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
  const {active, library, chainId, account} = useActiveWeb3React();

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

  return {list}
}

export const usePoolList = () => {
  const [list, setList] = useState([{
    "projectId": "10",
    "beneficiary": "0xf71708c59be7e32b9ff2aa174f07311869c6bf0c",
    "token0": "0xad4f86a25bbc20ffb751f2fac312a0b4d8f88c64",
    "token1": "0x101194a3ff67f83a05b3e15afa52d45d588614ca",
    "amountTotal0": "10000000000000000000000",
    "amountTotal1": "1000000000000000000",
    "openAt": "1612454400",
    "closeAt": "1612454400",
    "claimDelaySec": "600",
    "enableWhiteList": false,
    "enableKycList": true,
    "id": 0,
    "status": "Upcoming",
    "botHolder": false,
    "inKYC": true,
    "joined": false,
    "proInfo": {
      "code": 1,
      "id": 12,
      "accountaddress": "0xf71708c59be7e32b9ff2aa174f07311869c6bf0c",
      "proname": "OptionRoom",
      "prowebsite": "https://optionroom.finance",
      "protheme": "Oracle, Forcast Markets",
      "whitepaperlink": "https://github.com/OptionRoom/OptionRoom-Whitepaper/blob/main/OptionRoom_Whitepaper.pdf",
      "githublink": "https://github.com/OptionRoom/",
      "twitter": "",
      "medium": "",
      "fackbook": "",
      "telegram": "",
      "prosummary": "OptionRoom is a user governed oracle and\nforecast protocol built on Polkadot.",
      "techhighlight": "Substrate-based Oracle as a Service and Limitless Forecast Market protocol built on Polkadot",
      "architecture": "Solidity, Substrate",
      "attachmenturl": "",
      "teambio": "A team of diversified technical backgrounds with most team members having over 8 years of experience.",
      "totalsupply": "100000000",
      "circulatingsupply": "9200000",
      "tokenticketer": "ROOM",
      "tokencontractaddress": "0xad4f86a25bbc20ffb751f2fac312a0b4d8f88c64",
      "tokendistribution": "Seed round: 11%\nPrivate round: 20%\nPublic round: 2%\nProtocol rewards: 38%\nTeam: 10%\nFoundation: 14.67%\nLiquidity: 4.33%",
      "tokenlookupschedule": "Seed round: 20% on listing, 0% month 2 then 0.25% daily starting from month 3\nPrivate round: 25% on listing, 0% month 2 then 0.5% per day starting from month 3\nTeam: 1 year cliff with 1 year vesting thereafter \nFoundation: 1 year cliff with 1 year vesting thereafter\nLiquidity: Locked for 1 year",
      "auctiontype": "Fixed swap auction",
      "amountoftoken": "1000000",
      "pricepertoken": "5",
      "allocationperwallet": "1000 USDT",
      "auctiontime": "86400",
      "teamwallet": "0x8362E92D23e2db6023414CD47e95FC0DD65f7530",
      "ifkyc": 1,
      "ifwhitelist": 1,
      "contactemail": "marsel@optionroom.finance",
      "additionalinfo": "",
      "prologourl": "8db8a531836aab5bb1e49059f15a0520.png",
      "created_at": "2021-01-28T03:23:48Z",
      "updated_at": "2021-01-28T03:23:48Z"
    }
  }, {
    "projectId": "10",
    "beneficiary": "0xf71708c59be7e32b9ff2aa174f07311869c6bf0c",
    "token0": "0xad4f86a25bbc20ffb751f2fac312a0b4d8f88c64",
    "token1": "0x101194a3ff67f83a05b3e15afa52d45d588614ca",
    "amountTotal0": "10000000000000000000000",
    "amountTotal1": "1000000000000000000",
    "openAt": "1612454400",
    "closeAt": "1612454400",
    "claimDelaySec": "600",
    "enableWhiteList": true,
    "enableKycList": true,
    "id": 0,
    "status": "Upcoming",
    "botHolder": true,
    "inKYC": true,
    "joined": false,
    "proInfo": {
      "code": 1,
      "id": 12,
      "accountaddress": "0xf71708c59be7e32b9ff2aa174f07311869c6bf0c",
      "proname": "OptionRoom",
      "prowebsite": "https://optionroom.finance",
      "protheme": "Oracle, Forcast Markets",
      "whitepaperlink": "https://github.com/OptionRoom/OptionRoom-Whitepaper/blob/main/OptionRoom_Whitepaper.pdf",
      "githublink": "https://github.com/OptionRoom/",
      "twitter": "",
      "medium": "",
      "fackbook": "",
      "telegram": "",
      "prosummary": "OptionRoom is a user governed oracle and\nforecast protocol built on Polkadot.",
      "techhighlight": "Substrate-based Oracle as a Service and Limitless Forecast Market protocol built on Polkadot",
      "architecture": "Solidity, Substrate",
      "attachmenturl": "",
      "teambio": "A team of diversified technical backgrounds with most team members having over 8 years of experience.",
      "totalsupply": "100000000",
      "circulatingsupply": "9200000",
      "tokenticketer": "ROOM",
      "tokencontractaddress": "0xad4f86a25bbc20ffb751f2fac312a0b4d8f88c64",
      "tokendistribution": "Seed round: 11%\nPrivate round: 20%\nPublic round: 2%\nProtocol rewards: 38%\nTeam: 10%\nFoundation: 14.67%\nLiquidity: 4.33%",
      "tokenlookupschedule": "Seed round: 20% on listing, 0% month 2 then 0.25% daily starting from month 3\nPrivate round: 25% on listing, 0% month 2 then 0.5% per day starting from month 3\nTeam: 1 year cliff with 1 year vesting thereafter \nFoundation: 1 year cliff with 1 year vesting thereafter\nLiquidity: Locked for 1 year",
      "auctiontype": "Fixed swap auction",
      "amountoftoken": "1000000",
      "pricepertoken": "5",
      "allocationperwallet": "1000 USDT",
      "auctiontime": "86400",
      "teamwallet": "0x8362E92D23e2db6023414CD47e95FC0DD65f7530",
      "ifkyc": 1,
      "ifwhitelist": 1,
      "contactemail": "marsel@optionroom.finance",
      "additionalinfo": "",
      "prologourl": "8db8a531836aab5bb1e49059f15a0520.png",
      "created_at": "2021-01-28T03:23:48Z",
      "updated_at": "2021-01-28T03:23:48Z"
    }
  }])
  const [activePool, setActivePool] = useState([])
  const [upcomingPools, setUpcomingPools] = useState([])
  const [passPools, setPassPools] = useState([])
  const {active, library, chainId, account} = useActiveWeb3React();


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
      //fetchList()
    }
  }, [active])

  useEffect(() => {
    if (list && list.length !== 0) {
      setActivePool(list.filter(item => {
        return item.status === 'Active'
      }))
      setUpcomingPools(list.filter(item => {
        return item.status === 'Upcoming'
      }))
      setPassPools(list.filter(item => {
        return item.status === 'Failed'
      }))
    }
  }, [list])

  return {list, activePool, upcomingPools, passPools}
}

export const useStatus = (id) => {
  const {active, library, chainId, account} = useActiveWeb3React();
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

  return {myVotes, myVotesClaimed}
}


export const useVoteListByPoolId = (poolId) => {
  const [poolInfo, setPoolInfo] = useState({})
  const {active, library, chainId} = useActiveWeb3React();

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
