import { getContract, useActivePlatform, useActiveWeb3React } from "../../web3";
import { useContext, useEffect, useState } from "react";
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import BouncePro from '../../web3/abi/BouncePro.json'
import { myContext } from '../../reducer'

import BigNumber from "bignumber.js";
import { BOUNCE_PRO } from "../../web3/address";
import { isGreaterThan } from "../../utils/common";
import { HANDLE_SHOW_CONNECT_MODAL } from "../../const";


export const usePoolDetail = (id = 0) => {
    const { active, account, library, chainId } = useActiveWeb3React();

    const { state, dispatch } = useContext(myContext);

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

    const [claimed, setClaimed] = useState(true)


    const checkMyFSPool = async () => {
        const fsContract = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
        let myPoolIndex = await fsContract.methods.myFP(account).call()
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

            fsContract.methods.myAmountSwapped1(account, id).call().then((res) => {
                console.log('query fs myAmountSwapped1:', res)
                setJoinStatus(isGreaterThan(res, '0'))
            })

            fsContract.methods.passwordFP(id).call().then((res) => {
                console.log('query fs password:', res)
                setPassword(res)
            })

            fsContract.methods.closeAtFP(id).call().then((res) => {

                const date = new Date(res * 1000);
                const now = new Date();
                const leftTime = date - now;
                console.log('query fs closeAt:', res, leftTime)

                setTime(res)
                setStatus(leftTime > 0 ? 'Live' : 'Closed')
                fsContract.methods.amountSwap1FP(id).call().then((bidAmount) => {
                    console.log('query fs to bid amount:', bidAmount)
                    setToBidAmount(bidAmount)
                    fsContract.methods.amountTotal1FP(id).call().then((total) => {
                        console.log('query fs to total:', total)
                        setToAmount(total)
                        if (bidAmount === total) {
                            setStatus('Filled')
                        }
                    })
                })


            })

            fsContract.methods.creatorFP(id).call().then((res) => {
                console.log('query fs creator:', res)
                setIsMine((res.toLowerCase() === account.toLowerCase()))
                if (res.toLowerCase() === account.toLowerCase()) {
                    checkMyFSPool()
                }
            })

            fsContract.methods.nameFP(id).call().then((res) => {
                console.log('query fs name:', res)
                setName(res)
            })

            fsContract.methods.onlyBotHolder(id).call().then((res) => {
                console.log('query fs name:', res)
                setOnlyBOT(res)
            })

            fsContract.methods.token0FP(id).call().then((res) => {
                console.log('query fs address:', res)
                setAddress(res)
                const tokenContract = getContract(library, bounceERC20.abi, res)
                tokenContract.methods.symbol().call().then((res) => {
                    console.log('query fs symbol:', res)
                    setSymbol(res)
                })
                tokenContract.methods.decimals().call().then((res) => {
                    console.log('query fs decimals:', res)
                    setDecimals(res)
                })
            })

            fsContract.methods.amountTotal0FP(id).call().then((res) => {
                console.log('query fs from total:', res)
                setFromAmount(res)
            })

            fsContract.methods.amountSwap0FP(id).call().then((res) => {
                console.log('query fs to bid amount:', res)
                setFromBidAmount(res)
            })


            fsContract.methods.maxEthPerWalletFP(id).call().then((res) => {
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
