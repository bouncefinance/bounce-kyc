import { getContract, useActiveWeb3React } from "../../web3";
import { useContext, useEffect, useState } from "react";
//import { myContext } from '../../reducer'

import { BOUNCE_PRO_LOTTERY_NFT_PRO } from "../../web3/address";
import { HANDLE_SHOW_CONNECT_MODAL } from "../../const";
import BounceLotteryNFTPro from "../../web3/abi/BounceLotteryNFTPro.json";
import bounceERC1155 from "../../web3/abi/bounceERC1155.json";
import {getProjectInfo} from "../CertifiedSales/hooks";
import BigNumber from "bignumber.js";
import {useTokenList} from "../../web3/common";

export const usePoolDetail = (id = 0) => {
  const { active, account, library, chainId } = useActiveWeb3React();
  //const { state, dispatch } = useContext(myContext);
  const tokenOptions = useTokenList()

  const [name, setName] = useState(null)
  const [address, setAddress] = useState(null)
  const [isLive, setIsLive] = useState()
  const [time, setTime] = useState();
  const [price, setPrice] = useState('');
  const [winner, setWinner] = useState();
  const [participate, setParticipate] = useState();
  const [isMine, setIsMine] = useState(false);
  const [claimed, setClaimed] = useState(true);
  const [isWinner, setIsWinner] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [pool, setPool] = useState({});
  const [curPlayer, setCurPlayer] = useState()
  const [status, setStatus] = useState()
  const [symbol, setSymbol] = useState()
  const [toSymbol, setToSymbol] = useState()
  const [toDecimals, setToDecimals] = useState()
  const [inWhitelist, setInWhitelist] = useState()
  const [toAddress, setToAddress] = useState()
  const [tokenId, setTokenId] = useState()
  const [cover, setCover] = useState()
  const [onlyBOT, setOnlyBOT] = useState()




  const [playStatus, setPlayStatus] = useState()

  async function getLotteryNFTDetail() {
    try {

      const lotteryNFTContract = getContract(library, BounceLotteryNFTPro.abi, BOUNCE_PRO_LOTTERY_NFT_PRO(chainId));
      console.log('id----->',id)
      const poolRes = await lotteryNFTContract.methods.pools(id).call();
      console.log('poolRes--->', poolRes)

      setTokenId(poolRes.tokenId0)

      const toToken = tokenOptions.find(item => {
        return poolRes.token1.toLowerCase() === item.key.toLowerCase()
      })

      if (poolRes.token1 === '0x0000000000000000000000000000000000000000') {
        setToAddress(null)
        setToSymbol('ETH')
        setToDecimals('18')
      } else if (toToken) {
        setToAddress(poolRes.token1)
        setToDecimals(toToken.decimals)
        setToSymbol(toToken.symbol)
      } else {
        setToAddress(null)
        setToSymbol('ETH')
        setToDecimals('18')
      }


      getProjectInfo(poolRes.projectId).then(info =>{
        console.log('pool info---->',info)
        setName(info.proname)
      })

      lotteryNFTContract.methods.onlyBotHolderP(id).call().then(res =>{
        setOnlyBOT(res)
      })

      setAddress(poolRes.token0);
      setPrice(poolRes.amount1);
      console.log('closeat', poolRes.closeAt)

      const date = new Date(poolRes.closeAt * 1000);
      const now = new Date();
      const leftTime = date - now;
      console.log('leftTime',leftTime)
      const isOpen = new Date() - poolRes.openAt * 1000 > 0
      if (!isOpen) {
        setStatus('Upcoming')
      }else {
        setIsLive(leftTime > 0 )
        setStatus(leftTime > 0 ? 'Live' : 'Closed')
      }

      setTime(poolRes.closeAt);
      setParticipate(poolRes.maxPlayer);


      // const tokenContract = getContract(library, bounceERC20.abi, poolRes.token0)
      // tokenContract.methods.symbol().call().then((res) => {
      //   console.log('query fs symbol:', res)
      //   setSymbol(res)
      // })


      // const tokenContract1 = getContract(library, bounceERC20.abi, poolRes.token1)
      // tokenContract1.methods.symbol().call().then((res) => {
      //   console.log('symbol', res)
      //   setToSymbol(res)
      // })

      // tokenContract1.methods.decimals().call().then((res) => {
      //   setToDecimals(res)
      // })

      setPool(poolRes)

      const info = await lotteryNFTContract.methods.poolsExt(id).call();
      console.log('pool info--->', info.nShare);
      setWinner(info.nShare);

      const playerNum = await lotteryNFTContract.methods.curPlayerP(id).call();
      setCurPlayer(playerNum);


      const playStatusConst = await lotteryNFTContract.methods.getPlayerStatus(id, account).call();
      console.log('playStatusConst', playStatusConst)
      //返回1表示调用者是池子创建者并且未收割
      //返回5表示调用者是池子创建者并且已收割
      //返回2表示调用者是池子参与者并且未收割
      //返回6表示调用者是池子参与者并且已收割
      setPlayStatus(playStatusConst);
      switch (playStatusConst) {
        case '0':
          setIsJoined(false);
          break;
        case '1':
          setIsMine(true);
          setIsJoined(true);
          setClaimed(false)
          break;
        case '2':
          setIsJoined(true);
          setClaimed(false)
          break;
        case '5':
          setIsJoined(true);
          setIsMine(true);
          setClaimed(true);
          break;
        case '6':
          setIsJoined(true);
          setClaimed(true);
          break;
        default:
      }

      const winnerState = await lotteryNFTContract.methods.isWinner(id, account).call();
      console.log('winnerState',winnerState)
      setIsWinner(winnerState);
    } catch (e) {
      console.log('getTokenInfo:', e)
    }
  }

  function queryAccount () {
    const lotteryNFTContract = getContract(library, BounceLotteryNFTPro.abi, BOUNCE_PRO_LOTTERY_NFT_PRO(chainId));
    lotteryNFTContract.methods.whitelistP(id, account).call().then((res) => {
      console.log('whitelistP:', res)
      setInWhitelist(res)
    })
  }

  async function queryNFT () {
    try {
      const contract = getContract(library, bounceERC1155.abi, address)
      console.log('contract',contract)
      const  uris = await contract.getPastEvents(
          'URI', // 过滤事件参数，这里获取全部事件
          {
            fromBlock: 0, // 起始块
            toBlock: 'latest' // 终止块
          },
          (err, events) => { console.log(events) } // 回调函数
      )
      console.log('uri',uris)
      const tokenURl = uris.filter(item => { return  item.returnValues.id == tokenId}).map(item => {return item.returnValues.value})[0]
      console.log('tokenURl', tokenURl)
      const res = await fetch(tokenURl)
      const result = await res.json();
      console.log('token json', result)
      if (result.image) {
         setCover(result.image)
      } else if (result.properties.image.description) {
        setCover(result.properties.image.description)
      }
    } catch (e) {
      console.log('fetch cover error', e)
    }
  }


  useEffect(() => {
    if (active) {
      getLotteryNFTDetail()
    } else {
      //dispatch({ type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true });
    }
  }, [active])

  useEffect(() => {
    if (active && account) {
      queryAccount()
    } else {
      //dispatch({ type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true });
    }
  }, [active, account])


  useEffect(() => {
    if (active && tokenId && address) {
      queryNFT()
    } else {
      //dispatch({ type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true });
    }
  }, [active, tokenId, address])

  return {
    name, address, isLive, time, price, winner, participate, playStatus, claimed, inWhitelist,
    isMine, isWinner, isJoined, pool, curPlayer, symbol,
    toDecimals, toSymbol, status, setStatus,
     toAddress, tokenId, cover, onlyBOT
  }
}
