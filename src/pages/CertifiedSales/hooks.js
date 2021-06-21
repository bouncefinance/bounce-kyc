import axios from 'axios';
import API from '../../config/request_api'
import { useEffect, useState } from 'react';
import { getBNBDefaultLibrary, getContract, getETHDefaultLibrary, useActiveWeb3React, getHECODefaultLibrary } from "../../web3";
import BounceProVoting from "../../web3/abi/BounceProVoting.json";
import BouncePro from "../../web3/abi/BouncePro.json";
import { BOUNCE_PRO_VOTING, BOUNCE_PRO, BOUNCE_PRO_LOTTERY_NFT_PRO } from "../../web3/address";
import { isGreaterThan } from "../../utils/common";
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import { weiToNum } from "../../utils/numberTransform";
import BounceLotteryNFTPro from "../../web3/abi/BounceLotteryNFTPro.json";


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
  // console.log('library', library)

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
            pool.botHolder = false
            // if(pool.)
            pool.proInfo = proInfo
            try {
              const tokenContract = getContract(library, bounceERC20.abi, proInfo.tokencontractaddress)
              const decimals = await tokenContract.methods.decimals().call()
              const allowance = await tokenContract.methods.allowance(account, BOUNCE_PRO(chainId)).call()
              pool.approved = isGreaterThan(weiToNum(allowance, parseInt(decimals)), proInfo.amountoftoken)
              // console.log('approved allowance', allowance)
              // console.log('approved', pool.approved)

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
  const { active, library, chainId, account } = useActiveWeb3React();

  const upItem =
    [
    //   {
    //   notReady: true,
    //   time: 'June 21th',
    //   chainId: 56,
    //   status: 'Upcoming',
    //   "botHolder": false,
    //   "inKYC": false,
    //   "joined": false,
    //   "enableKycList": false,
    //   "enableWhiteList": true,
    //   "proInfo": {
    //     accountaddress: "0xe139ab520c71c6dd7df0af0015c2773002742c0c",
    //     additionalinfo: "",
    //     allocationperwallet: "No limits",
    //     amountoftoken: "20000000",
    //     architecture: "",
    //     attachmenturl: "",
    //     auctiontime: "86400",
    //     auctiontype: "Fixed Swap Auction on Binance Smart Chain",
    //     circulatingsupply: "151,250,000",
    //     contactemail: "team@nftb.io",
    //     created_at: "2021-05-17T09:18:35Z",
    //     fackbook: "",
    //     githublink: "https://github.com/nftbmarket",
    //     id: 138,
    //     ifkyc: 0,
    //     ifwhitelist: 1,
    //     medium: "https://blog.nftb.io",
    //     pricepertoken: "0.006",
    //     prologourl: "4a91af517dc26bde04fc31374adbc3ce.png",
    //     proname: "NFTb",
    //     prosummary: "NFT Marketplace and digital goods built for speed and affordability on the Binance Smart Chain (BSC)",
    //     protheme: "NFT, Marketplace, DeFi",
    //     prowebsite: "https://nftb.io",
    //     teambio: "The NFTb founding team is fully crypto native, having worked and built in the industry since 2016. They include a lead blockchain developer, two front-end engineers, a backend engineer, and several marketing veterans who have overseen and advised several unicorn projects. The team has experience building web frameworks and Web 3.0 applications and has worked together for more than 15 years collectively.",
    //     teamwallet: "0x1a3dC1957Aa29409310A1f8295e8f2eeaACB2d2f",
    //     techhighlight: "NFTb is a premium NFT marketplace built on BSC. The first curated platform for artists and digital collectors to purchase high-quality digital goods. NFTb will be the first BSC platform to offer NFT yield farming and index funds.",
    //     telegram: "https://t.me/nftbmarket",
    //     tokencontractaddress: "0xde3dbbe30cfa9f437b293294d1fd64b26045c71a",
    //     tokendistribution: "Strategic Contributors: 20.5% / 205Mln↵Team: 12.0% / 120Mln↵Foundation: 12.5% / 125Mln↵Protocol rewards: 45.0% / 450Mln↵IDO sale and liquidity mining: 10.0% / 100Mln↵↵Total supply: 100% / 1Bln",
    //     tokenlookupschedule: "Strategic Contributors: 25% initial, 7.5% per month↵↵Team: Locked for 1 year, then 25% unlocked every 3 months↵↵Protocol rewards: Released over 7 years↵↵IDO sale and liquidity mining: 100% unlocked on IDO ↵",
    //     tokenticketer: "NFTB",
    //     totalsupply: "1,000,000,000",
    //     twitter: "https://twitter.com/nftbmarket",
    //     updated_at: "2021-05-17T09:18:35Z",
    //     whitepaperlink: "https://nftb.io/about"
    //   }
    // }
    ]
  const [list, setList] = useState()

  let pools = upItem

  const [activePool, setActivePool] = useState([])
  const [upcomingPools, setUpcomingPools] = useState()
  const [passPools, setPassPools] = useState([])


  const fetchList = async (curLibrary, curChainId) => {

    if (curChainId === 1) {
      curLibrary = library
    }

    const bounceContract = getContract(curLibrary, BouncePro.abi, BOUNCE_PRO(curChainId))
    const lotteryNFTContract = getContract(curLibrary, BounceLotteryNFTPro.abi, BOUNCE_PRO_LOTTERY_NFT_PRO(curChainId));
    console.log('curLibrary', curLibrary)

    try {
      bounceContract.methods.getPoolCount().call().then(res => {
        console.log('getPoolCount--->', curChainId, res)
        if (res === '0') {
          setList(upItem)
        }
        for (let i = 1; i < res; i++) {
          bounceContract.methods.pools(i).call().then(async poolRes => {

            console.log('pool--->', poolRes)
            const pool = poolRes
            pool.chainId = curChainId
            pool.type = 'FIXED_SWAP'
            pool.id = i
            if (pool.chainId === 56 && pool.id === 2) return

            // poolRes.openAt = poolRes.openAt - (3*60*60)
            // poolRes.closeAt = poolRes.closeAt

            const isOpen = new Date() - poolRes.openAt * 1000 > 0
            if (!isOpen) {
              pool.status = 'Upcoming'
            } else {
              const closeAt = new Date(poolRes.closeAt * 1000)
              const closed = closeAt - new Date()
              pool.status = closed > 0 ? 'Active' : 'Failed'
            }

            const toAmount = await bounceContract.methods.amountSwap1P(i).call()
            console.log('toAmount', toAmount)
            if (poolRes.amountTotal1 === toAmount) {
              pool.status = 'Failed'
            }

            pool.botHolder = await bounceContract.methods.onlyBotHolderP(i).call()

            pool.inKYC = await bounceContract.methods.kyclist(account).call()
            // pool.inKYC = true

            const bidAmount = await bounceContract.methods.myAmountSwapped0(account, i).call()
            pool.joined = isGreaterThan(bidAmount, '0')

            // console.log('pool', pool)
            pool.proInfo = await getProjectInfo(pool.projectId)
            if (curChainId === 56) {
              pool.proInfo.auctiontype = 'Fixed Swap Auction on Binance Smart Chain'
            } else if (curChainId === 128) {
              pool.proInfo.auctiontype = 'Fixed Swap Auction on Heco Chain'
            }

            pools = pools.concat(pool)
            // console.log('pools---->', pools)
            setList(pools)
          })
        }
        //setList(pools)
      }).then(() => {
        console.log('L_console', pools)

      })
    } catch (e) {
      console.log('fetchList error', e)
    }

    try {
      lotteryNFTContract.methods.getPoolCount().call().then(res => {
        console.log('get lottery PoolCount', res)
        for (let i = 1; i < res; i++) {
          lotteryNFTContract.methods.pools(i).call().then(async poolRes => {
            console.log('pool--->', poolRes)
            const pool = poolRes
            pool.type = 'LOTTERY_NFT'
            pool.id = i
            const isOpen = new Date() - poolRes.openAt * 1000 > 0
            if (!isOpen) {
              pool.status = 'Upcoming'
            } else {
              const closeAt = new Date(poolRes.closeAt * 1000)
              const closed = closeAt - new Date()
              pool.status = closed > 0 ? 'Active' : 'Failed'
            }

            const curPlayer = await lotteryNFTContract.methods.curPlayerP(i).call()
            if (poolRes.maxPlayer === curPlayer) {
              pool.status = 'Failed'
            }

            pool.botHolder = await lotteryNFTContract.methods.onlyBotHolderP(i).call()

            pool.inKYC = await bounceContract.methods.kyclist(account).call()

            // const bidAmount = await bounceContract.methods.myAmountSwapped0(account, i).call()
            // pool.joined = isGreaterThan(bidAmount, '0')

            // console.log('pool', pool)
            pool.proInfo = await getProjectInfo(pool.projectId)
            // console.log('pool',pool)
            pools = pools.concat(pool)
            // console.log('L_console', pools)
            setList(pools)
          })
        }

      })
    } catch (e) {
      console.log('fetchList error', e)
    }
  }

  useEffect(async () => {
    if (active) {
      // await fetchList(getETHDefaultLibrary(), 1, pools)
      // await fetchList(getBNBDefaultLibrary(), 56, pools)
      await fetchList(getETHDefaultLibrary(), 1)
      await fetchList(getBNBDefaultLibrary(), 56)
      await fetchList(getHECODefaultLibrary(), 128)
    }
  }, [active])

  useEffect(() => {

    // console.log('list---》', list)
    if (list && list.length !== 0) {
      setActivePool(list.filter(item => {
        return item.status === 'Active'
      }))

      const upcominglist = list.filter(item => {
        // console.log('K_console',item)
        return item.status === 'Upcoming'
      }).sort((a1, a2) => {
        return a1.proInfo.id - a2.proInfo.id
      })


      setUpcomingPools(upcominglist)
      setPassPools(list.filter(item => {
        return item.status === 'Failed'
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

export const useInKYC = () => {

  const [KYCed, setKYCed] = useState(false)
  const { active, library, chainId, account } = useActiveWeb3React();

  useEffect(() => {
    if (active && account) {
      // const bounceContract = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
      const bounceContract = getContract(library, BouncePro.abi, BOUNCE_PRO(1))
      bounceContract.methods.kyclist(account).call().then(res => {
        alert(res)
        setKYCed(res)
      })
    }
  }, [active, account])

  return KYCed
}
