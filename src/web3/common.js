import React, { useContext, useEffect, useState } from 'react';
import bounceERC20 from '../web3/abi/bounceERC20.json'
import { useActiveWeb3React } from "./index";
import { getContract } from "../web3";
import { getBotAddress, getUSDTAddress, getWBTCAddress, getYFIAddress } from "./address";
import { isGreaterThan } from "../utils/common";
import BigNumber from "bignumber.js";
import Web3 from 'web3'
import { mainContext } from '../reducer'
import { HANDLE_SHOW_CONNECT_MODAL } from "../const";
import { weiToNum } from "../utils/numberTransform";
import { TokenFrame } from "../components/common/Layout";
import icon_usdt from '../assets/icons/icon-usdt.png'
import bounce_token from '../assets/icons/bounce_token.png'
import wbtc_icon from '../assets/icons/wbtc_icon.png'
import yfi_icon from '../assets/icons/yfi_icon.png'
import icon_eth from '../assets/icons/icon_eth.svg'
import {useActivePlatform} from "../hooks";


const { toWei } = Web3.utils




export const useTokenList = () => {
  const { chainId } = useActiveWeb3React();
  const { Psymbol } = useActivePlatform()

  return [{
    key: '0x0000000000000000000000000000000000000000',
    value: <TokenFrame><img src={icon_eth} /><span>{Psymbol}</span></TokenFrame>,
    symbol: Psymbol,
    decimals: '18'

  }, {
    key: getUSDTAddress(chainId),
    value: <TokenFrame><img src={icon_usdt} /><span>USDT</span></TokenFrame>,
    symbol: 'USDT',
    decimals: '6'
  }, {
    key: getBotAddress(chainId),
    value: <TokenFrame><img src={bounce_token} /><span>BOT</span></TokenFrame>,
    symbol: 'BOT',
    decimals: '18'
  }, {
    key: getWBTCAddress(chainId),
    value: <TokenFrame><img src={wbtc_icon} /><span>WBTC</span></TokenFrame>,
    symbol: 'WBTC',
    decimals: '8'
  }, {
    key: getYFIAddress(chainId),
    value: <TokenFrame><img src={yfi_icon} /><span>YFI</span></TokenFrame>,
    symbol: 'YFI',
    decimals: '18'
  }]
}


export const getIndexList = (count) => {
  let poolIdList = [];
  for (let i = 0; i < count; i++) {
    poolIdList[i] = count - i - 1;
  }
  return poolIdList
}


export const useEthBalance = (token) => {
  const { active, account, library, chainId } = useActiveWeb3React();
  const [ethBalance, setEthBalance] = useState(null)


  useEffect(() => {
    console.log('token---->', token)

    if (active) {
      if (token) {
        const tokenContract = getContract(library, bounceERC20.abi, token)
        tokenContract.methods.balanceOf(account).call().then(res => {
          console.log('token balance', res)
          setEthBalance(res)
        })
      } else {
        const web3 = new Web3(library.provider)
        web3.eth.getBalance(account)
          .then(balance => {
            console.log('eth balance', balance)
            console.log(ethBalance)
            setEthBalance(balance)
          })
      }

    } else {
      setEthBalance(null)
    }

  }, [active, token])

  return { ethBalance }
}

export const useTokenBalance = (address) => {
  const { active, account, library, chainId } = useActiveWeb3React();
  const [balance, setBalance] = useState(null)


  useEffect(() => {

    async function getBalance() {
      try {
        const tokenContract = getContract(library, bounceERC20.abi, address ? address : getBotAddress(chainId))
        const balance = await tokenContract.methods.balanceOf(account).call()
        setBalance(balance)
      } catch (e) {
        console.log('useTokenBalance:', e)
        setBalance(null)
      }
    }

    if (active) {
      getBalance()
    } else {
      setBalance(null)
    }

  }, [active, account])


  return { balance }
}



export const useStoreHandleForm = (poolAdress, tokenAdress) => {
  const { active, account, library, chainId } = useActiveWeb3React();
  const { state, dispatch } = useContext(mainContext);


  const [name, setName] = useState()
  const [address, setAddress] = useState()
  const [token, settToken] = useState({ symbol: null, decimals: null, balance: null })
  const [participant, setParticipant] = useState()
  const [password, setPassword] = useState()
  const [ratio, setRatio] = useState()
  const [level, setLevel] = useState()
  const [minAmount, setMinAmount] = useState()
  const [maxAmount, setMaxAmount] = useState()
  const [times, setTimes] = useState()
  const [amount, setAmount] = useState()
  const [onlyBot, setOnlyBot] = useState(true)
  const [days, setDays] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [limit, setLimit] = useState()
  const [startPrice, setStartPrice] = useState()
  const [reservePrice, setReservePrice] = useState()
  const [balance, setBalance] = useState('0')
  const [nftType, setNFTType] = useState()

  const [nftID, setNFTID] = useState()


  const [nft, setNFT] = useState()


  const [addressError, setAddressError] = useState(false)
  const [amountError, setAmountError] = useState(false)
  const [ratioError, setRatioError] = useState(false)
  const [timeError, setTimeError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [idError, setIDError] = useState(false)
  const [startPriceError, setStartPriceError] = useState(false)
  const [reservePricePriceError, setReservePricePriceError] = useState(false)


  const [check, setCheck] = useState(null)


  useEffect(() => {
    if (!active) {
      dispatch({ type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true });
    }
  }, [active])

  useEffect(() => {
    const initToken = { symbol: null, decimals: null, balance: null }

    async function getTokenInfo() {
      try {
        console.log('account:', account)
        const tokenContract = getContract(library, bounceERC20.abi, address)
        console.log('tokenContract:', tokenContract)
        const balance = await tokenContract.methods.balanceOf(account).call()
        setBalance(balance)
        console.log('balance:', balance)
        const symbol = await tokenContract.methods.symbol().call()
        console.log('symbol:', symbol)
        const decimals = await tokenContract.methods.decimals().call()
        console.log('decimals:', decimals)
        setAddressError(false)
        settToken({ balance, symbol, decimals })
      } catch (e) {
        console.log('getTokenInfo error:', e)
        settToken(initToken)
        setAddressError('Address is invalid')
      }
    }

    if (address) {
      if (!nftType) {
        getTokenInfo()
      }
    } else {
      settToken(initToken)
    }

  }, [address])


  function checkAmount() {
    if (amount === '') {
      setAmountError('Amount is required')
    } else if (isGreaterThan(amount, weiToNum(balance, token.decimals))) {
      setAmountError('Insufficient balance')
    } else {
      setAmountError(null)
    }
  }

  function checkRatio() {
    if (ratio === '') {
      setRatioError('Ratio is required')
    } else {
      setRatioError(null)
    }
  }


  useEffect(() => {
    console.log('balance & amount:', amount, balance)
    checkAmount()
  }, [amount, token])


  useEffect(() => {
    checkRatio()
  }, [ratio])


  useEffect(() => {
    if (amount, ratio) {
      setLevel(new BigNumber(amount).dividedBy(new BigNumber(ratio)))
    }
  }, [amount, ratio])

  function checkName() {
    if (name === '') {
      setNameError('Pool name is required')
    } else {
      setNameError(null)
    }
  }

  useEffect(() => {
    checkName()
  }, [name])


  useEffect(() => {
    console.log('check:')
    checkName()
    checkRatio()
    checkAmount()
  }, [check])

  return {
    address, setAddress, addressError,
    token,
    amount, setAmount, amountError,setAmountError,
    ratio, setRatio, ratioError,
    times, setTimes,
    minAmount, setMinAmount,
    maxAmount, setMaxAmount,
    level, setLevel,
    name, setName, nameError,
    onlyBot, setOnlyBot,
    password, setPassword,
    limit, setLimit,
    days, setDays,
    hours, setHours,
    minutes, setMinutes,
    timeError,
    check, setCheck,
    startPrice, setStartPrice, startPriceError,
    reservePrice, setReservePrice, reservePricePriceError,
    nftType, setNFTType,
    nftID, setNFTID, idError, setIDError,
    nft, setNFT
  }
}
