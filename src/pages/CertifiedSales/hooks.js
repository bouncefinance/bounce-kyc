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
      // {
      //   notReady: true,
      //   time: '12PM, Aug. 30th, UTC',
      //   chainId: 56,
      //   status: 'Upcoming',
      //   "botHolder": false,
      //   "inKYC": false,
      //   "joined": false,
      //   "enableKycList": false,
      //   "enableWhiteList": false,
      //   "whiteLink": 'https://gleam.io/competitions/6QLO1-win-whitelist-for-moma-protocol-on-bounce',
      //   "proInfo": {
      //     id: 188,
      //     accountaddress: "0xe141ce69125af9d0b0964147e2e269ad8e7f812a",
      //     proname: "BUSTA",
      //     prowebsite: "https://www.busta.gg/",
      //     protheme: "Defi",
      //     whitepaperlink: "https://docs.busta.gg/",
      //     githublink: "https://docs.busta.gg/",
      //     twitter: "https://twitter.com/busta_gamefi",
      //     medium: "http://bustaofficial.medium.com/",
      //     fackbook: "",
      //     telegram: "https://twitter.com/busta_gamefi",
      //     prosummary: "BUSTA is a next generation GameFi platform and DEX built on Binance Smart Chain. \nIt is an enormous ",
      //     techhighlight: "An innovative iGaming platform and DEX built on BSC smart chain\n",
      //     architecture: "IDO duration: 24 hours, Limit per address: 500 USDT (BEP20)",
      //     attachmenturl: "",
      //     teambio: "The BUSTA founders looked at all that was available in both iGaming and DeFi and set out to create a perfect ecosystem that would best benefit our players, investors, stakers, traders, affiliates, and partners.  As we mapped out the architecture, it became more and more obvious that it was entirely feasible to create a circular business model where everyone benefits.  Lastly, the decision was made to bundle the entire platform up so it could be controlled by the community via a DAO, with minimal",
      //     totalsupply: "10,000,000,000",
      //     circulatingsupply: "0",
      //     tokenticketer: "BUSTA",
      //     tokencontractaddress: "0xfd0507fac1152faf870c778ff6beb1ca3b9f7a1f",
      //     tokendistribution: "Bounce will announce $BUST IDO on Twitter (Bounce Twitter has 45K followers) and Telegram group (35K followers) at 11am, Aug. 27th, UTC. ",
      //     tokenlookupschedule: "12PM UTC on August 29th to 12PM UTC,Aug. 31st\nClaim time is 8pm UTC on August 31st\n",
      //     auctiontype: "Fixed Swap Auction on Binance Smart Chain",
      //     amountoftoken: "4,672,897.2",
      //     pricepertoken: "0.0107",
      //     allocationperwallet: "500 USDT",
      //     auctiontime: "3600",
      //     teamwallet: "0xc6fD2D340E75bDE45B3DA8091Be677a027135C08",
      //     ifkyc: 0,
      //     ifwhitelist: 0,
      //     contactemail: "no@no.no",
      //     additionalinfo: "",
      //     prologourl: "48dee4701457adf5a1cf994c0fba2b67.png",
      //     created_at: "2021-08-28T03:22:27Z",
      //     updated_at: "2021-08-28T03:22:27Z"
      //   }
      // },
      {
        notReady: true,
        time: 'Mid-August',
        chainId: 1,
        status: 'Upcoming',
        "botHolder": false,
        "inKYC": false,
        "joined": false,
        "enableKycList": false,
        "enableWhiteList": true,
        "whiteLink": 'https://gleam.io/competitions/6QLO1-win-whitelist-for-moma-protocol-on-bounce',
        "proInfo": {
          accountaddress: "0xcbf19050a398ebbbff0692a8ace263834d382ab1",
          additionalinfo: "",
          allocationperwallet: "250 USDT",
          amountoftoken: "71,429",
          architecture: "Substrate",
          attachmenturl: "",
          auctiontime: "306000",
          auctiontype: "Fixed swap auction",
          circulatingsupply: "4,792,700",
          contactemail: "mora@parami.io",
          created_at: "2021-08-04T10:04:06Z",
          fackbook: "",
          githublink: "https://github.com/parami-protocol",
          id: 179,
          ifkyc: 1,
          ifwhitelist: 1,
          medium: "",
          pricepertoken: "0.7",
          prologourl: "d1787e111c68621aacaeaea556b8f312.jpg",
          proname: "Parami Protocol",
          prosummary: "Parami proposed an AD 3.0 paradigm for Web 3.0 to build a user-centric tokenized advertising economy",
          protheme: "Engage-to-Earn",
          prowebsite: "https://parami.io/",
          teambio: "Dorian, Tech Lead, senior architect of Digital Currency Electronic Payment Centre, core architect & technical leader of TRON with rich practical experience in consensus mechanism, privacy computation, cross-chain mechanism.↵↵Mono Wang, Core Dev, Full-stack engineer; senior rust engineer with 6 years‘ experience; Core Rust Chinese community evangelist.↵↵Edison, Core Dev, core architect of TRON's TRONZ team, and is the core developer of the zero-knowledge proof, MPC, and homomorphic encryption.",
          teamwallet: "0x8C0159b05D346a97dFa789c42d46F4b87188eF32",
          techhighlight: "Decentralized Identifier (DID): Parami Protocol provides a complete set of DID solutions compatible with W3C DID standard on Parami Node, and expands its business for user-centric advertising. ↵Zero-Knowledge Proof (ZKP): ZKP algorithm is adopted to determine distribution mechanism.The proof is generated from PCAP (Personal Crypto Advertising Preference) which is tailored for smart advertising while protecting privacy. ",
          telegram: "",
          tokencontractaddress: "0x7866bffcd9408bf75542d7c4e13d1bdd0983b31d",
          tokendistribution: "https://docs.google.com/spreadsheets/d/1XsNniENg02TSTpV-9z3d24G7g5rB5gRbrc-UhY9gl_k/edit#gid=1299745438",
          tokenlookupschedule: "https://docs.google.com/spreadsheets/d/1XsNniENg02TSTpV-9z3d24G7g5rB5gRbrc-UhY9gl_k/edit#gid=1299745438",
          tokenticketer: "AD3",
          totalsupply: "100,000,000",
          twitter: "",
          updated_at: "2021-08-04T10:04:06Z",
          whitepaperlink: "https://parami.io/img/Parami_Protocol_Light_Paper.pdf"
        }
      }, {
        notReady: true,
        time: 'End of August',
        chainId: 1,
        status: 'Upcoming',
        "botHolder": false,
        "inKYC": false,
        "joined": false,
        "enableKycList": false,
        "enableWhiteList": true,
        "whiteLink": 'https://gleam.io/competitions/6QLO1-win-whitelist-for-moma-protocol-on-bounce',
        "proInfo": {
          accountaddress: "0xfacff76c93ca97112f7c7b60902e444d29286729",
          additionalinfo: "",
          allocationperwallet: "1000 USDT",
          amountoftoken: "2500000",
          architecture: "Solana/ETH/BSC etc.",
          attachmenturl: "",
          auctiontime: "259200",
          auctiontype: "Fixed swap auction",
          circulatingsupply: "41600000",
          contactemail: "business@matrixetf.finance",
          created_at: "2021-08-17T07:10:03Z",
          fackbook: "",
          githublink: "https://github.com/MatrixETF",
          id: 184,
          ifkyc: 1,
          ifwhitelist: 1,
          medium: "https://medium.com/@MatrixETF",
          pricepertoken: "0.02",
          prologourl: "b7c4f91dddf53cd5391cda4f87839453.png",
          proname: "MatrixETF",
          prosummary: "The Next Generation of ETF, Cross Chain Enabled.",
          protheme: "DeFi",
          prowebsite: "https://www.matrixetf.finance/",
          teambio: "There are 11 team members on MatrixETF which include 6 engineers and 5 operationists. 8 of them base on Canada, 3 of them base on China.↵↵",
          teamwallet: "0xf325759E1D454e920C73D3C9536732e7216b587a",
          techhighlight: "SOL/ETH/BSC Cross-chain support↵Real asset support↵Fund custom creation↵Aggregate vault support↵Derivatives support↵NFT support",
          telegram: "https://t.me/MatrixETF",
          tokencontractaddress: "0xfACFf76C93ca97112F7C7B60902E444d29286729",
          tokendistribution: "MDF is the governance token of the MatrixETF community.↵",
          tokenlookupschedule: "Here is 1 point we would like to edit，for Token Lockup Schedule: could you pls modified to ：↵↵Private Sale,Unlock 10% before listing, which will be completed within 1 year. ↵Private+ Sale, Unlock 15% before listing, which will be completed within 9 months. ↵IDO,Unlock 100% before listing↵Team&Advisor，20% will be unlocked after 6 months of listing, and the remaining 80% will be unlocked linearly over the next 24 months. ↵Community Ecosystem and Operations,6% unlocked after the listing, and 94% will be unlocked linearly in 4 years. ↵Matrix Treasury，unlocked within 4 years",
          tokenticketer: "MDF",
          totalsupply: "1000000000",
          twitter: "https://twitter.com/MatrixETF",
          updated_at: "2021-08-17T07:48:27Z",
          whitepaperlink: "https://docs.matrixetf.finance/"
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
            if (pool.projectId === '53') return
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
