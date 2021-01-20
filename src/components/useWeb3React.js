import React, {useEffect} from 'react'
import { useWeb3React } from "@web3-react/core";

export const useWeb3ReactActive = () => {
    const {
        connector,
        library,
        account,
        activate,
        active,
    } = useWeb3React()

    useEffect(() => {
        // console.log(account)
    }, [account])

    return {account}
}
