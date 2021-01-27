import { getContract, useActivePlatform, useActiveWeb3React } from "../../web3";
import { useContext, useEffect, useState } from "react";
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import BouncePro from '../../web3/abi/BouncePro.json'
import { mainContext } from '../../reducer'

import BigNumber from "bignumber.js";
import { BOUNCE_PRO } from "../../web3/address";
import { isGreaterThan } from "../../utils/common";
import { HANDLE_SHOW_CONNECT_MODAL } from "../../const";
import {useTokenList} from "../../web3/common";


export const usePoolDetail = (id = 0) => {
    const { active, account, library, chainId } = useActiveWeb3React();

    const { state, dispatch } = useContext(mainContext);

    const [joinStatus, setJoinStatus] = useState(false)
    const [name, setName] = useState(null)
    const [symbol, setSymbol] = useState('')
    const [toSymbol, setToSymbol] = useState()
    const [address, setAddress] = useState(null)
    const [toAddress, setToAddress] = useState(null)
    const [decimals, setDecimals] = useState()
    const [toDecimals, setToDecimals] = useState()
    const [toAmount, setToAmount] = useState(null)
    const [fromTotal, setFromTotal] = useState(null)
    const [limit, setLimit] = useState(null)
    const [isMine, setIsMine] = useState(false)
    const [password, setPassword] = useState()
    const [time, setTime] = useState()
    const [fromBidAmount, setFromBidAmount] = useState()
    const [toBidAmount, setToBidAmount] = useState()
    const [fromAmount, setFromAmount] = useState()
    const [status, setStatus] = useState('Live')
    const [onlyBOT, setOnlyBOT] = useState(false)
    const [toTokenBalance, setToTokenBalance] = useState(0)
    const { Psymbol } = useActivePlatform()
    const tokenOptions = useTokenList()

    const [claimed, setClaimed] = useState(true)


    const checkMyFSPool = async () => {
        const fsContract = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
        let myPoolIndex = await fsContract.methods.myP(account).call()
        if (myPoolIndex > 0) {
            myPoolIndex = myPoolIndex - 1
            const fromAmount = await fsContract.methods.amountTotal0FP(myPoolIndex).call()
            const bidAmount = await fsContract.methods.amountSwap0FP(myPoolIndex).call()
            if (fromAmount === bidAmount) {
                setClaimed(true)
            } else {
                setClaimed(false)
            }
        } else {
            setClaimed(true)
        }
    }

    useEffect(() => {
        if (!toAddress) return
        if (new BigNumber(toAddress).isEqualTo(0)) return
        queryTokenBalance(toAddress)
    }, [toAddress])

    const queryTokenBalance = async (toAddress) => {
        const Contract = getContract(library, bounceERC20.abi, toAddress)
        const balance = await Contract.methods.balanceOf(account).call()
        setToTokenBalance(balance)
    }

    async function getFSPoolDetail() {
        try {

            const fsContract = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))

            fsContract.methods.pools(id).call().then( async (res) => {
                console.log('pool detail:', res)

                setFromAmount(res.amountTotal0)
                setToAmount(res.amountTotal1)

                //setAddress(res)
                const tokenContract = getContract(library, bounceERC20.abi, res.token0)
                tokenContract.methods.symbol().call().then((res) => {
                    console.log('query fs symbol:', res)
                    setSymbol(res)
                })
                tokenContract.methods.decimals().call().then((res) => {
                    console.log('query fs decimals:', res)
                    setDecimals(res)
                })

                const toToken = tokenOptions.find(item => {
                    return res.token1.toLowerCase() === item.key.toLowerCase()
                })

                if (res === '0x0000000000000000000000000000000000000000') {
                    setToAddress(null)
                    setToSymbol(Psymbol)
                    setToDecimals('18')
                } else if (toToken) {
                    setToAddress(res.token1)
                    setToDecimals(toToken.decimals)
                    setToSymbol(toToken.symbol)
                } else {
                    setToAddress(null)
                    setToSymbol(Psymbol)
                    setToDecimals('18')
                }

                const date = new Date(res.closeAt * 1000);
                const now = new Date();
                const leftTime = date - now;

                setIsMine((res.beneficiary.toLowerCase() === account.toLowerCase()))
                if (res.beneficiary.toLowerCase() === account.toLowerCase()) {
                    let myPoolIndex = await fsContract.methods.myP(account).call()
                    if (myPoolIndex > 0) {
                        myPoolIndex = myPoolIndex - 1
                        const fromAmount = res.amountTotal0
                        const bidAmount = await fsContract.methods.amountSwap0P(myPoolIndex).call()
                        if (fromAmount === bidAmount) {
                            setClaimed(true)
                        } else {
                            setClaimed(false)
                        }
                    } else {
                        setClaimed(true)
                    }
                }

                setTime(res.closeAt)
                setToAmount(res.amountTotal1)

                setStatus(leftTime > 0 ? 'Live' : 'Closed')
                fsContract.methods.amountSwap1P(id).call().then((bidAmount) => {
                    console.log('query fs to bid amount:', bidAmount)
                    setToBidAmount(bidAmount)
                    if (bidAmount === res.amountTotal1) {
                        setStatus('Filled')
                    }
                })
            })

            fsContract.methods.myAmountSwapped1(account, id).call().then((res) => {
                console.log('query fs myAmountSwapped1:', res)
                setJoinStatus(isGreaterThan(res, '0'))
            })

            fsContract.methods.onlyBotHolder(id).call().then((res) => {
                console.log('query fs name:', res)
                setOnlyBOT(res)
            })

            fsContract.methods.amountSwap0P(id).call().then((res) => {
                console.log('query fs to bid amount:', res)
                setFromBidAmount(res)
            })


            fsContract.methods.maxEthPerWalletP(id).call().then((res) => {
                console.log('query fs limit max:', res)
                setLimit(res)
            })


        } catch (e) {
            console.log('getTokenInfo:', e)
        }
    }

    useEffect(() => {
        if (active, chainId, account) {
            console.log('chainId', chainId)
            getFSPoolDetail()
        } else {
            dispatch({ type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true });
        }

    }, [active, chainId, account])

    // console.log('FS_BUG', fromAmount, fromBidAmount, toAmount, toBidAmount)
    return {
        name,
        claimed,
        address,
        symbol,
        toAddress,
        toSymbol,
        toDecimals,
        decimals,
        fromTotal,
        toAmount,
        limit,
        time,
        password,
        fromBidAmount,
        toBidAmount,
        fromAmount,
        status,
        isMine,
        onlyBOT,
        toTokenBalance,
        joinStatus
    }
}
