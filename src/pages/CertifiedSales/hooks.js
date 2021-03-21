import axios from 'axios';
import API from '../../config/request_api'
import { useEffect, useState } from 'react';
import { getBNBDefaultLibrary, getContract, getETHDefaultLibrary, useActiveWeb3React } from "../../web3";
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
  console.log('library', library)

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
            console.log('pool', pool)
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
  const { active, library, chainId, account } = useActiveWeb3React();

  const upItem =
    [{
      notReady: true,
      time: 'March 22',
      "botHolder": true,
      "inKYC": true,
      "joined": false,
      "enableKycList": true,
      "enableWhiteList": false,
      status: 'Upcoming',
      "proInfo": {
        accountaddress: "0xe154740c2a7c1574a6c89d87f6094b3889f70082",
        additionalinfo: "",
        allocationperwallet: "300 USDT",
        amountoftoken: "600000",
        architecture: "NA",
        attachmenturl: "",
        auctiontime: "86400",
        auctiontype: "Fixed swap auction",
        contactemail: "Jessie@wah.art",
        created_at: "2021-03-13T11:18:57Z",
        fackbook: "",
        githublink: "https://na.com",
        id: 1088,
        ifkyc: 0,
        ifwhitelist: 1,
        medium: "https://medium.com/fm-gallery",
        pricepertoken: "0.15",
        prologourl: "07c5d4d490c09bef9ef5ba27d9efe8e7.png",
        proname: "FM Gallery",
        prosummary: "FM Gallery is a blockchain-based distribution platform for NFT artworks.",
        protheme: "NFT",
        prowebsite: "https://wah.art/",
        teambio: "↵Flora “FM” Peng，Founder of FM Gallery, is an experienced practitioner in the art industry. She is also the largest NFT influencer in the Chinese-speaking community with over 20k followers on Clubhouse and over 1 million followers across social media",
        teamwallet: "0xD087E4758F70725279C26200F5CD597b31BEab72",
        techhighlight: "We are developed on ethereum blockchain",
        telegram: "https://t.me/fmgalleryeng",
        tokencontractaddress: "0xD67eB8a95A38F89ba0D418fA90ce4AB396D4F1C2",
        tokendistribution: "1. Team and Advisors – 20% ↵2. Ecosystem Fund/Community Governance – 15% ↵3. Private Sale and Seed Investors –15% ↵4. Community – 50%",
        tokenlookupschedule: "TGE vesting around 9%",
        tokenticketer: "WAH",
        totalsupply: "100,000,000",
        twitter: "https://twitter.com/fm_gallery",
        updated_at: "2021-03-13T11:18:57Z",
        whitepaperlink: "https://wah.art/uploads/fm_white_paper_v1.32.pdf"
      }
    },
    {
      notReady: true,
      time: 'March 23',
      "botHolder": false,
      "inKYC": true,
      "joined": false,
      "enableKycList": true,
      "enableWhiteList": true,
      status: 'Upcoming',
      "proInfo": {
        accountaddress: "0x46b671543f1b8391d2d051d348c8f536a33e5149",
        additionalinfo: "",
        allocationperwallet: "150 USDT",
        amountoftoken: "120000",
        architecture: "Polkadot",
        attachmenturl: "",
        auctiontime: "3600",
        auctiontype: "Fixed swap auction",
        circulatingsupply: "3,140,000",
        contactemail: "support@stonedefi.io",
        created_at: "2021-03-16T03:37:43Z",
        fackbook: "",
        githublink: "https://github.com/stonedefi",
        id: 1090,
        ifkyc: 1,
        ifwhitelist: 1,
        medium: "https://stonedefi.medium.com",
        pricepertoken: "0.25",
        prologourl: "b6d59eed128dc11dc854a2706000aabd.png",
        proname: "STONE DeFi",
        prosummary: "Stone is the only yield management protocol focused on creating Rock↵Solid Yield for users in DeFi.",
        protheme: "DeFi",
        prowebsite: "https://www.stonedefi.io/",
        teambio: "To bootstrap the technical development, RockX team and a↵few individuals from the DeFi community working to launch↵the alpha and public version of Stone protocol for the↵community and committed to lead the technical development↵for the next two years before the community decides the next↵steps. RockX is a development house with experience in↵blockchain development and running various blockchain↵validators, such as Polkadot, Terra, Solana, Oasis. ",
        teamwallet: "0x7B01e4dF14a6Db7C8308e68Ea3Ea26af3C8cED49",
        techhighlight: "Stone is positioned as the anchor yield aggregation platform that aims to expand the current DeFi yield market including the yields from staking assets. Stone has the vision to be the global yield marketplace with the inclusion of multi-chain PoS assets. To leverage the capability of substrate and Polkadot, Stone is also looking to provide more innovative products based on a wide range of yield-bearing assets to users across multiple blockchains.",
        telegram: "https://t.me/stonefortress",
        tokencontractaddress: "0xe63d6B308BCe0F6193AeC6b7E6eBa005f41e36AB",
        tokendistribution: "Token Sale - 12%↵Marketing & Partnership - 3%↵Protocol Reserve - 12%↵Tech Development - 15%↵Yield Farming Reserve - 55%↵Community Contributors - 3%",
        tokenlookupschedule: "Seed- 15% unlock @TGE, quarter release for next 12 months.↵Private- 25% unlock @TGE, quarter release for next 12 months.↵Community Contributor- 1month after TGE, unlock daily for 12 months.↵Marketing&Partnership- 1month after TGE, unlock daily for 12 months.↵Tech Dev- 6months after TGE, release semi",
        tokenticketer: "STN",
        totalsupply: "100,000,000",
        twitter: "https://twitter.com/DefiStone?s=20",
        updated_at: "2021-03-16T03:37:43Z",
        whitepaperlink: "https://www.stonedefi.io/file/stone_litepaper.pdf",
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

            // poolRes.openAt = poolRes.openAt - (10*60*60+33*60)
            // poolRes.closeAt = poolRes.closeAt - (4 * 60 * 60 + 15  * 60)

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
            if (curChainId === 56) {
              pool.proInfo.auctiontype = 'Fixed Swap Auction on Binance Smart Chain'
            }

            if (pool.projectId === '52') {
              pool.botHolder = true
            }
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
            console.log('L_console', pools)
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
    }
  }, [active])

  useEffect(() => {

    console.log('list---》', list)
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
      const bounceContract = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
      bounceContract.methods.kyclist(account).call().then(res => {
        setKYCed(res)
      })
    }
  }, [active, account])

  return KYCed
}
