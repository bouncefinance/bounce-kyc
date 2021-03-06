import {getContract, useActiveWeb3React} from "../web3";
import {useEffect, useState} from "react";
import bounceERC20 from "../web3/abi/bounceERC20.json";
import {AUCTION, BOT} from "../web3/address";

export const useTokenBalance = (address) => {
  console.log('address------>1',address)
  const { active, account, library, chainId } = useActiveWeb3React();
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    async function getBalance() {
      try {
        const tokenContract = getContract(library, bounceERC20.abi, address ? address : AUCTION(chainId))
        const balance = await tokenContract.methods.balanceOf(account).call()
        setBalance(balance)
      } catch (e) {
        console.log('useTokenBalance:', e)
        setBalance(null)
      }
    }

    if (active && account && chainId) {
      getBalance()
    } else {
      setBalance(null)
    }

  }, [active, account, chainId, address])


  return { balance }
}
