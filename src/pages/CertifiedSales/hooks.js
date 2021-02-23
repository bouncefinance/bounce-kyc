import axios from 'axios';
import API from '../../config/request_api'
import {useEffect, useState} from 'react';
import {getBNBDefaultLibrary, getContract, getETHDefaultLibrary, useActiveWeb3React} from "../../web3";
import BounceProVoting from "../../web3/abi/BounceProVoting.json";
import BouncePro from "../../web3/abi/BouncePro.json";
import {BOUNCE_PRO_VOTING, BOUNCE_PRO, BOUNCE_PRO_LOTTERY_NFT_PRO} from "../../web3/address";
import {isGreaterThan} from "../../utils/common";
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import {weiToNum} from "../../utils/numberTransform";
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

  return {list}
}

export const usePoolList = () => {
  const {active, library, chainId, account} = useActiveWeb3React();

  const upItem =
      [{
        notReady: true,
        time: 'March 1st 2021',
        accountaddress: "0x843f54fbf268dabe93f16e366433e16204944b1a",
        additionalinfo: "https://defiwizard.xyz",
        allocationperwallet: "40 USDT",
        amountoftoken: "20000",
        architecture: "",
        attachmenturl: "",
        auctiontime: "3600",
        auctiontype: "Fixed rate swap",
        circulatingsupply: "300000",
        closeAt: "1613230468",
        code: 1,
        contactemail: "infor@defiwizard.xyz",
        created_at: "2021-02-06T15:33:44Z",
        creator: "0x843f54fBf268Dabe93F16E366433E16204944b1a",
        fackbook: "",
        githublink: "https://github.com/DefiWizard",
        id: 44,
        enableWhiteList: 1,
        medium: "https://defi-wizard.medium.com",
        pricepertoken: "2.5",
        projectId: "44",
        prologourl: "0be84b556b7a5662ea32bf0357a6dec0.png",
        proname: "DeFi Wizard",
        prosummary: "Community Owned, Layer 2 Oracle",
        protheme: "Layer 2 Oracle, defi",
        prowebsite: "https://www.umb.network/",
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
        "botHolder": true,
        "inKYC": true,
        "joined": false,
        "enableKycList": true,
        status: 'Upcoming',
        "proInfo": {
          "id": 44,
          "accountaddress": "0x843f54fbf268dabe93f16e366433e16204944b1a",
          "proname": "DeFi Wizard",
          "prowebsite": "https://defiwizard.xyz/",
          "protheme": "DeFi",
          "whitepaperlink": "https://defi-wizard.medium.com/introducing-defi-wizard-55979d7b6506",
          "githublink": "https://github.com/DefiWizard/",
          "twitter": "https://twitter.com/defi_wizard",
          "medium": "https://defi-wizard.medium.com/",
          "fackbook": "",
          "telegram": "https://t.me/defi_wizard",
          "prosummary": "Multi-chain DeFi Legosmade simple. One-click wizard to Create token, staking, yield farming legos.",
          "techhighlight": "Multi-chain DeFi Legosmade simple. One-click wizard to Create audited ERC20 / BEP20 / EDST token. staking, yield farming contract for LP tokens.",
          "architecture": "",
          "attachmenturl": "",
          "teambio": "Team has vast experience in development with more than a decade experience with programming full-stack and started working on smart-contracts in 2017 bull-market to create lots of crowd sale and vesting contracts for ICOs.",
          "totalsupply": "1000000",
          "circulatingsupply": "300000",
          "tokenticketer": "DWZ",
          "tokencontractaddress": "0x7dee45dff03ec7137979586ca20a2f4917bac9fa",
          "tokendistribution": "https://defiwizard.xyz/token",
          "tokenlookupschedule": "Seed: 25% initial, 25% 4/6/8 weeks after\nPrivate: 33% initial, 33% 3/6 weeks after",
          "auctiontype": "Fixed rate swap",
          "amountoftoken": "20000",
          "pricepertoken": "2.5",
          "allocationperwallet": "40 USDT",
          "auctiontime": "3600",
          "teamwallet": "0x843f54fBf268Dabe93F16E366433E16204944b1a",
          "ifkyc": 1,
          "ifwhitelist": 1,
          "contactemail": "infor@defiwizard.xyz",
          "additionalinfo": "https://defiwizard.xyz/",
          "prologourl": "0be84b556b7a5662ea32bf0357a6dec0.png",
          "created_at": "2021-02-07T03:25:59Z",
          "updated_at": "2021-02-07T03:25:59Z"
        }
      },{
        notReady: true,
        time: 'Feb 27th 2021',
        accountaddress: "0x843f54fbf268dabe93f16e366433e16204944b1a",
        additionalinfo: " https://antimatter.finance/",
        allocationperwallet: "40 USDT",
        amountoftoken: "20000",
        architecture: "",
        attachmenturl: "",
        auctiontime: "3600",
        auctiontype: "Fixed rate swap",
        circulatingsupply: "7000000",
        closeAt: "1613230468",
        code: 1,
        contactemail: "infor@defiwizard.xyz",
        created_at: "2021-02-06T15:33:44Z",
        creator: "0x843f54fBf268Dabe93F16E366433E16204944b1a",
        fackbook: "",
        githublink: "",
        id: 44,
        enableWhiteList: 1,
        medium: "https://defi-wizard.medium.com",
        pricepertoken: "2.5",
        projectId: "44",
        prologourl: "0be84b556b7a5662ea32bf0357a6dec0.png",
        proname: "Antimatter",
        prosummary: "Community Owned, Layer 2 Oracle",
        protheme: "Defi, perpetual option",
        prowebsite: "https://antimatter.finance/",
        teambio: "Jack Lu\n" +
            "Robert Hu",
        teamwallet: "0x14Fe1c6ADb626A8235b079d4ff66C6b0a3a2E68a",
        techhighlight: "",
        telegram: "https://t.me/antimatterchat",
        tokencontractaddress: "Secret",
        tokendistribution: "unlock promptly after sale",
        tokenlookupschedule: "Unlock promptly",
        tokenticketer: "MATTER",
        totalVotes: 300,
        totalsupply: "100000000",
        twitter: "",
        updated_at: "2021-02-06T15:33:44Z",
        votePassed: true,
        "botHolder": true,
        "inKYC": false,
        "joined": false,
        "enableKycList": false,
        status: 'Upcoming',
        "proInfo": {
          "id": 44,
          "accountaddress": "0x843f54fbf268dabe93f16e366433e16204944b1a",
          "proname": "Antimatter",
          "prowebsite": "https://antimatter.finance/",
          "protheme": "Defi, perpetual option",
          "whitepaperlink": "",
          "githublink": "",
          "twitter": "https://twitter.com/antimatterdefi",
          "medium": "https://antimatterdefi.medium.com/",
          "fackbook": "",
          "telegram": "https://t.me/antimatterchat",
          "prosummary": "Antimatter is an innovative lightweight on-chain and cross-chain DeFi perpetual options protocol based on a polarized token mechanism.",
          "techhighlight": "To build financial products for mass adoption, Antimatter will aim for simplicity and normalization as the main priority for every product released. The initial Antimatter product will be an ETH perpetual put option product where anyone can short and long at any given time with secondary market opportunities (market-making and arbitrage).",
          "architecture": "Ethereum, Binance Smart Chain, Huobi Ecochain",
          "attachmenturl": "",
          "teambio": "Jack Lu\n" +
              "Robert Hu",
          "totalsupply": "100000000",
          "circulatingsupply": "7000000",
          "tokenticketer": "MATTER",
          "tokencontractaddress": "Secret",
          "tokendistribution": "https://antimatterdefi.medium.com/introducing-the-matter-token-3fc593e1282d",
          "tokenlookupschedule": "https://antimatterdefi.medium.com/introducing-the-matter-token-3fc593e1282d",
          "auctiontype": "Fixed rate swap on Binance Smart Chain",
          "amountoftoken": "20000",
          "pricepertoken": "0.05",
          "allocationperwallet": "100 USDT",
          "auctiontime": "3600",
          "teamwallet": "0x843f54fBf268Dabe93F16E366433E16204944b1a",
          "ifkyc": 0,
          "ifwhitelist": 1,
          "contactemail": "",
          "additionalinfo": "",
          "prologourl": "https://raw.githubusercontent.com/antimatter-finance/antimatter-finance.github.io/main/antimatter_icon.png",
          "created_at": "2021-02-07T03:25:59Z",
          "updated_at": "2021-02-07T03:25:59Z"
        }
      }]
  const [list, setList] = useState()

  const [activePool, setActivePool] = useState([])
  const [upcomingPools, setUpcomingPools] = useState()
  const [passPools, setPassPools] = useState([])


  const fetchList = (curLibrary, curChainId) => {
    const bounceContract = getContract(curLibrary, BouncePro.abi, BOUNCE_PRO(curChainId))
    const lotteryNFTContract = getContract(curLibrary, BounceLotteryNFTPro.abi, BOUNCE_PRO_LOTTERY_NFT_PRO(curChainId));
    console.log('curLibrary', curLibrary)
    let pools = upItem
    try {
      bounceContract.methods.getPoolCount().call().then(res => {
        console.log('getPoolCount', res)
        if(res === '0'){
          setList(upItem)
        }
        for (let i = 1; i < res; i++) {
          bounceContract.methods.pools(i).call().then(async poolRes => {
            console.log('pool--->', poolRes)
            const pool = poolRes
            pool.chainId = chainId
            pool.type = 'FIXED_SWAP'
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
        //setList(pools)
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
            setList(pools)
          })
        }
        //setList(pools)
      })
    } catch (e) {
      console.log('fetchList error', e)
    }
  }

  useEffect(() => {
    if (active) {
      fetchList(getETHDefaultLibrary(), 1)
      //fetchList(getBNBDefaultLibrary(), 56)
    }
  }, [active])

  useEffect(() => {
    console.log('list---》', list)
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
  const {active, library, chainId, account} = useActiveWeb3React();

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
