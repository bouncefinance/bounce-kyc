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
      time: 'October 20th 8:00 am UTC',
      chainId: 1,
      status: 'Upcoming',
      "botHolder": false,
      "inKYC": false,
      "joined": false,
      "enableKycList": false,
      "enableWhiteList": true,
      "whiteLink": 'https://gleam.io/competitions/6QLO1-win-whitelist-for-moma-protocol-on-bounce',
      "proInfo": {
        "id": 192,
        "accountaddress": "0x0374682594e0637e96b71f1ca895bc5b8bba2154",
        "proname": "Arche Network",
        "prowebsite": "https://arche.network/",
        "protheme": "DeFi",
        "whitepaperlink": "https://docs.arche.network/arche/",
        "githublink": "https://github.com/Archenetwork",
        "twitter": "https://twitter.com/Arche_Network",
        "medium": "",
        "fackbook": "",
        "telegram": "https://t.me/ArcheNetwork",
        "prosummary": "Arche Network is committed to transforming E-Commerce into De-commerce. ",
        "techhighlight": "Arche Network aims to build a user-defined open platform on blockchain that allows users to generate assets, customize orders, and trade digital assets freely in the marketplace.\n\nThe basic Arche's architecture is a swap contract between A and B. When contract creator creates the contract by putting parameters and deposit, the contract factory will generate at least three contracts. ",
        "architecture": "https://docs.arche.network/arche/tools/peer-to-peer-and-peer-to-pool-otc",
        "attachmenturl": "",
        "teambio": "Guangwu XIE, CEO of Arche Protocol, who organized the launch of the EOS main-net and participated in two financial products, pizza.finance,morecoin.com. Math Researcher on XJTU.\n\nYuanyang Hong , CTO of Arche Protocol, was formerly the architect of Huobi Defi, team with another two other core developers from the ethereum community. \n\nZOE Zhao，COO of Arche Ptotocol, PR Director of Huobi Indonesia, Partner of Capital N.",
        "totalsupply": "100,000,000",
        "circulatingsupply": "4,927,016.67",
        "tokenticketer": "ARCHE",
        "tokencontractaddress": "0x2815d3272baE3ebde5D7c128Eea5f4A8da402783",
        "tokendistribution": "- Seed Round\t4.00%\n- Private Round\t4.79%\n- Strategic Round\t1.41%\n- Strategic Round II\t2.80%\n- IDO&IEO\t2.00%\n- Partners & Advisors\t6.00%\n- Team \t20.00%\n- Staking Rewards\t20.00%\n- Liquidity Provision\t5%\n- Governance\t34.00%\n- Total\t100.0%",
        "tokenlookupschedule": "- Seed Round, TGE 20%, unlocked for 18 months\n- Private Round, TGE 25%, unlocked  for 18 months\n- Strategic Round, TGE 30%, unlocked  for 18 months\n- Strategic Round II, TGE 30%, unlocked  for 18 months\n- IDO&IEO,TGE 33.33%,  unlocked  for 18 months.\n\n- Mon1-6:\n4.92%,4.93%\t7.67%,10.41%,12.3\n",
        "auctiontype": "Fixed swap auction",
        "amountoftoken": "285,714.28",
        "pricepertoken": "0.35",
        "allocationperwallet": "250 USDT",
        "auctiontime": "259140",
        "teamwallet": "0x089813995Cef259fE434E1e4FC17dB964891A2b4",
        "ifkyc": 1,
        "ifwhitelist": 1,
        "contactemail": "jemxgw@gmail.com",
        "additionalinfo": "telegram:\nhttps://t.me/guangwu_arche\nwechat:\n13194090689",
        "prologourl": "4042efe0e8bb5639f3a395944f5dec06.jpeg",
        "created_at": "2021-09-14T11:32:31Z",
        "updated_at": "2021-09-14T11:32:31Z"
      }
    },
    {
      notReady: true,
      time: 'To be determined',
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
        id: 179000,
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
    },
    {
      notReady: true,
      time: 'September 19th UTC',
      chainId: 1,
      status: 'Upcoming',
      "botHolder": false,
      "inKYC": false,
      "joined": false,
      "enableKycList": false,
      "enableWhiteList": true,
      "whiteLink": 'https://gleam.io/competitions/6QLO1-win-whitelist-for-moma-protocol-on-bounce',
      "proInfo": {
        "id": 184,
        "accountaddress": "0xfacff76c93ca97112f7c7b60902e444d29286729",
        "proname": "MatrixETF",
        "prowebsite": "https://www.matrixetf.finance/",
        "protheme": "DeFi",
        "whitepaperlink": "https://docs.matrixetf.finance/",
        "githublink": "https://github.com/MatrixETF",
        "twitter": "https://twitter.com/MatrixETF",
        "medium": "https://medium.com/@MatrixETF",
        "fackbook": "",
        "telegram": "https://t.me/MatrixETF",
        "prosummary": "The Next Generation of ETF, Cross Chain Enabled.",
        "techhighlight": "One-Click Investment: Each ETF fund contains a basket of high-quality crypto tokens, so as to achieve investment diversification and lower the bar.\r\nDAO Community Governance: MatrixETF is driven by the DAO community. Specific investment products, investment strategies and asset classes are all jointly proposed and voted by MDF holders.\r\nPersonalized Fund: Based on MatrixETF Set, users can customize ETF portfolio.\r\nCross-chain Interaction: MatrixETF is a cross-chain ETF fund platform that supports multiple public chain networks such as BSC, Solana, and Ethereum, aiming to build cross-chain and scalable DeFi ecosystem.\r\nDecentralized Platform: MatrixETF is based on on-chain governance, and all the operations are carried out through the blockchain, which avoids risks of data fraud and centralized control.\r\nPortfolio based on DeFi: MatrixETF platform supports an investment portfolio of Funds, Derivatives, Leverage, Options, Farming, Vault, Governance, Insurance, Quantitative strategies, etc, which is highly expandable and convenient.",
        "architecture": "Solana / Ethereum",
        "attachmenturl": "",
        "teambio": "We have rich experiences on blockchain projects such as: writing crypto investment reports, managing operation teams, designing token economic models, designing product formulate, developing Solidity/Rust smart contracts etc. Our investors include Spark Digital Capital, CMS Holdings, Morningstar Ventures, Ascensive Assets, Divergence Ventures, GBV Capital, Solana Eco Fund (Established by MXC & OKEX), Moonrock Capital, AU21 Capital.",
        "totalsupply": "1000000000",
        "circulatingsupply": "41600000",
        "tokenticketer": "MDF",
        "tokencontractaddress": "0xfACFf76C93ca97112F7C7B60902E444d29286729",
        "tokendistribution": "MDF is the governance token of Matrix ETF community, including, but not limited to the following features:\r\nDAO Community Governance\r\nCommunity Vote\r\nBuy ETFs\r\nVault for Accumulated Value\r\nLiquidity Mining\r\nStaking Mining\r\nIncrement of Ecological Value\r\nBuy-back Destruction\r\nToken lockup schedule\r\n\r\nPrivate Sale：Tokens 6.25%, Unlock 10% before listing, the remaining token amount unlock will happen quarterly — divided into 4 quarters (1 years)\r\n\r\nPrivate+ Sale : Tokens 2%,\r\nUnlock 20% before listing, the remaining token amount unlock will happen quarterly — divided into 3 quarters\r\n\r\nIDO : Tokens 0.5%,\r\nUnlock 100% before listing\r\n\r\nTeam : Tokens 15%,\r\n20% will be unlocked six months after listing; the remaining 80% will be unlocked over 24 months.\r\n\r\nAdvisor：Tokens 3%,\r\n20% will be unlocked six months after listing; the remaining 80% will be unlocked over 24 months.\r\n\r\nLiquidity Pool ：Tokens 1%,\r\nUsed for DEX liquidity pool creation\r\n\r\nCommunity Ecosystem and Operations ：Tokens 27.25%,\r\nIncluding airdrops, community promotions, activities, proposal rewards, of which 6% will be unlocked immediately before listing; the remaining 94% will be unlocked over 4 years.\r\n\r\nMatrix Treasury ：Tokens 45%, \r\nThe Matrix DAO community votes to determine measures, which will be unlocked over 4 years, including pledges and liquidity mining rewards, ETF fund-related incentives, etc.\r\n",
        "tokenlookupschedule": "Here is 1 point we would like to edit，for Token Lockup Schedule: could you pls modified to ：\n\nPrivate Sale,Unlock 10% before listing, which will be completed within 1 year. \nPrivate+ Sale, Unlock 15% before listing, which will be completed within 9 months. \nIDO,Unlock 100% before listing\nTeam&Advisor，20% will be unlocked after 6 months of listing, and the remaining 80% will be unlocked linearly over the next 24 months. \nCommunity Ecosystem and Operations,6% unlocked after the listing, and 94% will be unlocked linearly in 4 years. \nMatrix Treasury，unlocked within 4 years",
        "auctiontype": "Fixed swap auction",
        "amountoftoken": "2500000",
        "pricepertoken": "0.02",
        "allocationperwallet": "1000 USDT",
        "auctiontime": "259200",
        "teamwallet": "0xf325759E1D454e920C73D3C9536732e7216b587a",
        "ifkyc": 1,
        "ifwhitelist": 1,
        "contactemail": "business@matrixetf.finance",
        "additionalinfo": "",
        "prologourl": "b7c4f91dddf53cd5391cda4f87839453.png",
        "created_at": "2021-08-17T07:10:03Z",
        "updated_at": "2021-09-15T12:15:13Z"
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
