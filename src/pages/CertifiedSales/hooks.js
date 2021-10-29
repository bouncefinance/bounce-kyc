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
    [{
      notReady: true,
      time: 'November 3rd',
      chainId: 1,
      status: 'Upcoming',
      "botHolder": true,
      "inKYC": false,
      "joined": false,
      "enableKycList": false,
      "enableWhiteList": false,
      "whiteLink": 'https://gleam.io/competitions/6QLO1-win-whitelist-for-moma-protocol-on-bounce',
      "proInfo": {
        "id": 197,
        "accountaddress": "0x388651742c4e61e2f16999cb92dd8bf36bd360f9",
        "proname": "SubDAO",
        "prowebsite": "https://app.subdao.network/#/home",
        "protheme": "DAO",
        "whitepaperlink": "https://www.subdao.network/#light-paper",
        "githublink": "https://github.com/SubDAO-Network",
        "twitter": "",
        "medium": "",
        "fackbook": "",
        "telegram": "",
        "prosummary": "SubDAO allows any decentralized organization to swiftly create and manage DAOs. We are committed to ",
        "techhighlight": "Initially, SubDAO Network will provide some of the features commonly used in various DAO governance and standardize them into DAO templates so that people can easily and quickly create and participate in DAOs later. We will gradually provide DAO-based company templates, non-profit-organization templates, government templates, educational-organization templates, club templates, venture capital fund templates, voting templates, fund management templates, and basic templates.",
        "architecture": "The SubDAO Network consists of four parts: SubDAO Node, SubDAO Airfone SDK, SubDAO Smart Contract, and SubDAO App front-end. And there are several components in SubDAO smart contract, namely Template Library, Asset Vault, and SubDAO Guard.",
        "attachmenturl": "",
        "teambio": "-",
        "totalsupply": "1,000,000,000",
        "circulatingsupply": "88,500,000",
        "tokenticketer": "GOV",
        "tokencontractaddress": "0x274e7eb07b485cfde53d02270555213447570ac6",
        "tokendistribution": "1.Parachain Slot Auction 30%\n2.Airdrop 3%  \n3.Governance Mining 27% \n4.Team 10%\n5.Foundation 15% \n6.Sale 15%",
        "tokenlookupschedule": "1.Parachain Slot Auction 30%\nLocked for Parachain Slot Auction\n\n2.Airdrop 3%  \nLocked for Airdrop\n\n3.Governance Mining 27% \nLocked for Governance Mining\n\n4.Team 10%\nTGE 0%，3 months after TGE token for team will be unlocked quarterly within 2 years\n\n5.Foundation 15% \nUnlocked quarterly within a year ",
        "auctiontype": "Fixed swap auction",
        "amountoftoken": "600,000",
        "pricepertoken": "0.15",
        "allocationperwallet": "500 USDT",
        "auctiontime": "86400",
        "teamwallet": "0x6880dAC539D79a498676E206c4c7aCab2308751E",
        "ifkyc": 0,
        "ifwhitelist": 1,
        "contactemail": "jade@fangible.com",
        "additionalinfo": "",
        "prologourl": "0aeecea33a694416aef4436c6fa04bf8.png",
        "created_at": "2021-10-29T14:26:39Z",
        "updated_at": "2021-10-29T14:26:39Z"
      }
    }, {
      notReady: true,
      time: 'November 3rd',
      chainId: 1,
      status: 'Upcoming',
      "botHolder": false,
      "inKYC": false,
      "joined": false,
      "enableKycList": false,
      "enableWhiteList": true,
      "whiteLink": 'https://gleam.io/competitions/6QLO1-win-whitelist-for-moma-protocol-on-bounce',
      "proInfo": {
        "id": 197,
        "accountaddress": "0x388651742c4e61e2f16999cb92dd8bf36bd360f9",
        "proname": "SubDAO",
        "prowebsite": "https://app.subdao.network/#/home",
        "protheme": "DAO",
        "whitepaperlink": "https://www.subdao.network/#light-paper",
        "githublink": "https://github.com/SubDAO-Network",
        "twitter": "",
        "medium": "",
        "fackbook": "",
        "telegram": "",
        "prosummary": "SubDAO allows any decentralized organization to swiftly create and manage DAOs. We are committed to ",
        "techhighlight": "Initially, SubDAO Network will provide some of the features commonly used in various DAO governance and standardize them into DAO templates so that people can easily and quickly create and participate in DAOs later. We will gradually provide DAO-based company templates, non-profit-organization templates, government templates, educational-organization templates, club templates, venture capital fund templates, voting templates, fund management templates, and basic templates.",
        "architecture": "The SubDAO Network consists of four parts: SubDAO Node, SubDAO Airfone SDK, SubDAO Smart Contract, and SubDAO App front-end. And there are several components in SubDAO smart contract, namely Template Library, Asset Vault, and SubDAO Guard.",
        "attachmenturl": "",
        "teambio": "-",
        "totalsupply": "1,000,000,000",
        "circulatingsupply": "88,500,000",
        "tokenticketer": "GOV",
        "tokencontractaddress": "0x274e7eb07b485cfde53d02270555213447570ac6",
        "tokendistribution": "1.Parachain Slot Auction 30%\n2.Airdrop 3%  \n3.Governance Mining 27% \n4.Team 10%\n5.Foundation 15% \n6.Sale 15%",
        "tokenlookupschedule": "1.Parachain Slot Auction 30%\nLocked for Parachain Slot Auction\n\n2.Airdrop 3%  \nLocked for Airdrop\n\n3.Governance Mining 27% \nLocked for Governance Mining\n\n4.Team 10%\nTGE 0%，3 months after TGE token for team will be unlocked quarterly within 2 years\n\n5.Foundation 15% \nUnlocked quarterly within a year ",
        "auctiontype": "Fixed swap auction",
        "amountoftoken": "600,000",
        "pricepertoken": "0.15",
        "allocationperwallet": "500 USDT",
        "auctiontime": "86400",
        "teamwallet": "0x6880dAC539D79a498676E206c4c7aCab2308751E",
        "ifkyc": 0,
        "ifwhitelist": 1,
        "contactemail": "jade@fangible.com",
        "additionalinfo": "",
        "prologourl": "0aeecea33a694416aef4436c6fa04bf8.png",
        "created_at": "2021-10-29T14:26:39Z",
        "updated_at": "2021-10-29T14:26:39Z"
      }
    }
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
    // console.log('curLibrary', curLibrary)

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
            // if (pool.chainId === 128 && pool.id === 1) return

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
            // if (pool.projectId === '164') {
            //   pool.whiteLink = 'https://gleam.io/competitions/6QLO1-win-whitelist-for-moma-protocol-on-bounce'
            // }
            if (pool.projectId === '54') return
            pools = pools.concat(pool)

            console.log('pools---->', pools)
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
        // console.log('get lottery PoolCount', res)
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
      // 维护入口
      await fetchList(getETHDefaultLibrary(), 1)
      await fetchList(getBNBDefaultLibrary(), 56)
      await fetchList(getHECODefaultLibrary(), 128)
    }
  }, [active])

  useEffect(() => {

    // console.log('list---》', list)
    if (list && list.length !== 0) {
      console.log(list)
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
