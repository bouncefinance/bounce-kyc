import { useWeb3React } from '@web3-react/core'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import Web3 from "web3";

export function getContract(library, abi, address) {
    const web3 = new Web3(library.provider);
    return new web3.eth.Contract(abi, address)
}

export const useActiveWeb3React = () => {
    // const contextNetwork = useWeb3React()
    return useWeb3React()
}

export const useActivePlatform = () => {
    const context = useWeb3ReactCore()
    let symbol = 'ETH'
    if (context.chainId === 97 || context.chainId === 56) {
        symbol = 'BNB'
    }
    // let symbol = {}
    return { Psymbol: symbol }
}
