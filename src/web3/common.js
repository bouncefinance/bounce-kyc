import React, { useEffect, useState } from 'react';
import bounceERC20 from '../web3/abi/bounceERC20.json'
import { useActiveWeb3React } from "./index";
import { getContract } from "../web3";
import { getBotAddress, getUSDTAddress, getWBTCAddress, getYFIAddress } from "./address";
import Web3 from 'web3'
import { TokenFrame } from "../components/common/Layout";
import icon_usdt from '../assets/icons/icon-usdt.png'
import bounce_token from '../assets/icons/bounce_token.png'
import wbtc_icon from '../assets/icons/wbtc_icon.png'
import yfi_icon from '../assets/icons/yfi_icon.png'
import icon_eth from '../assets/icons/icon_eth.svg'
import {useActivePlatform} from "../hooks";

export const useTokenList = () => {
  const { chainId } = useActiveWeb3React();
  const { Psymbol } = useActivePlatform()

  return [{
    key: '0x0000000000000000000000000000000000000000',
    value: <TokenFrame><img alt="" src={icon_eth} /><span>{Psymbol}</span></TokenFrame>,
    symbol: Psymbol,
    decimals: '18'

  }, {
    key: getUSDTAddress(chainId),
    value: <TokenFrame><img alt="" src={icon_usdt} /><span>USDT</span></TokenFrame>,
    symbol: 'USDT',
    decimals: '6'
  }, {
    key: getBotAddress(chainId),
    value: <TokenFrame><img alt="" src={bounce_token} /><span>BOT</span></TokenFrame>,
    symbol: 'BOT',
    decimals: '18'
  }, {
    key: getWBTCAddress(chainId),
    value: <TokenFrame><img alt="" src={wbtc_icon} /><span>WBTC</span></TokenFrame>,
    symbol: 'WBTC',
    decimals: '8'
  }, {
    key: getYFIAddress(chainId),
    value: <TokenFrame><img alt="" src={yfi_icon} /><span>YFI</span></TokenFrame>,
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
  const { active, account, library } = useActiveWeb3React();
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
