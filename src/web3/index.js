import { useWeb3React } from '@web3-react/core'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import Web3 from "web3";
import {Web3Provider} from "@ethersproject/providers";

export function getContract(library, abi, address) {
    const web3 = new Web3(library.provider);
    return new web3.eth.Contract(abi, address)
}

export const useActiveWeb3React = () => {
    // const contextNetwork = useWeb3React()
    return useWeb3React()
}

export const getETHDefaultLibrary = () => {
    const provider = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/d409e1757b614dc5b2f1cfb0ea46615f')).currentProvider
    const library = {}
    library.provider = provider
    return library
}

export const getBNBDefaultLibrary = () => {
    const provider = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed3.binance.org')).currentProvider
    const library = {}
    library.provider = provider
    return library
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
