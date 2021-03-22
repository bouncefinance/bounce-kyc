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
import {getProjectInfo} from "../CertifiedSales/hooks";


export const usePoolDetail = (id = 0) => {
    const { active, account, library, chainId } = useActiveWeb3React();

    const { state, dispatch } = useContext(mainContext);

    const [joinStatus, setJoinStatus] = useState(false)
    const [name, setName] = useState(null)
    const [pool, setPool] = useState({})
    const [symbol, setSymbol] = useState('')
    const [toSymbol, setToSymbol] = useState()
    const [address, setAddress] = useState(null)
    const [toAddress, setToAddress] = useState(null)
    const [decimals, setDecimals] = useState()
    const [toDecimals, setToDecimals] = useState()
    const [toAmount, setToAmount] = useState(null)
    const [limit, setLimit] = useState(null)
    const [isMine, setIsMine] = useState(false)
    const [time, setTime] = useState()
    const [fromBidAmount, setFromBidAmount] = useState('0')
    const [toBidAmount, setToBidAmount] = useState()
    const [fromAmount, setFromAmount] = useState()
    const [status, setStatus] = useState()
    const [onlyBOT, setOnlyBOT] = useState(false)
    const [toTokenBalance, setToTokenBalance] = useState(0)
    const [biddenAmount, setBiddenAmount] = useState()
    const [inWhiteList, setInWhiteList] = useState()
    const [myBidFromAmount, setMyBidFromAmount] = useState()


    const { Psymbol } = useActivePlatform()
    const tokenOptions = useTokenList()
    const [claimAble, setClaimAble] = useState(false)
    const [claimAt, setClaimAt] = useState()

    const [claimed, setClaimed] = useState(true)


    const checkMyFSPool = async () => {
        const fsContract = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
        let myPoolIndex = await fsContract.methods.teamPool(account).call()
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
                setPool(res)
                setFromAmount(res.amountTotal0)
                setToAmount(res.amountTotal1)

                setAddress(res.token0)
                const tokenContract = getContract(library, bounceERC20.abi, res.token0)
                tokenContract.methods.symbol().call().then((res) => {
                    setSymbol(res)
                })
                tokenContract.methods.decimals().call().then((res) => {
                    setDecimals(res)
                })

                const toToken = tokenOptions.find(item => {
                    return res.token1.toLowerCase() === item.key.toLowerCase()
                })

                if (res.token1 === '0x0000000000000000000000000000000000000000') {
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

                // res.openAt = res.openAt - (3*60*60)
                // res.closeAt = res.closeAt

                const date = new Date(res.closeAt * 1000);
                const now = new Date();
                const leftTime = date - now;

                setTime(res.closeAt)

                // setIsMine((res.beneficiary.toLowerCase() === account.toLowerCase()))
                // if (res.beneficiary.toLowerCase() === account.toLowerCase()) {
                //     let myPoolIndex = await fsContract.methods.myP(account).call()
                //     if (myPoolIndex > 0) {
                //         myPoolIndex = myPoolIndex - 1
                //         const fromAmount = res.amountTotal0
                //         const bidAmount = await fsContract.methods.amountSwap0P(myPoolIndex).call()
                //         if (fromAmount === bidAmount) {
                //             setClaimed(true)
                //         } else {
                //             setClaimed(false)
                //         }
                //     } else {
                //         setClaimed(true)
                //     }
                // }else {
                //     fsContract.methods.myClaimed(account, id).call().then((res) => {
                //         console.log('myClaimed:', res)
                //         setClaimed(res)
                //     })
                // }

                setToAmount(res.amountTotal1)

                const isOpen = new Date() - res.openAt * 1000 > 0
                if (!isOpen) {
                    setStatus('Upcoming')
                    // setStatus('Live')    
                }else {
                    setStatus(leftTime > 0 ? 'Live' : 'Closed')
                    fsContract.methods.myClaimed(account, id).call().then((res) => {
                        setClaimed(res)
                    })
                    fsContract.methods.amountSwap1P(id).call().then((bidAmount) => {
                        setToBidAmount(bidAmount)
                        if(leftTime < 0){
                            setClaimAble(true)
                        }else {
                            if (bidAmount === res.amountTotal1) {
                                setStatus('Filled')
                                fsContract.methods.filledAtP(id).call().then((filledAt) => {
                                    const claimTime = (new BigNumber(filledAt).plus(res.claimDelaySec).toString())
                                    if(new Date() - claimTime * 1000 > 0){
                                        setClaimAble(true)
                                    }else {
                                        setClaimAt(claimTime)
                                        setClaimAble(false)
                                    }
                                })
                            }
                        }

                    })
                }


                 getProjectInfo(res.projectId).then(info =>{
                     console.log('info',info)
                     setName(info.proname)
                 })
            })

            fsContract.methods.myAmountSwapped1(account, id).call().then((res) => {
                console.log('query fs myAmountSwapped1:', res)
                setBiddenAmount(res)
                setJoinStatus(isGreaterThan(res, '0'))
            })

            fsContract.methods.myAmountSwapped0(account, id).call().then((res) => {
                console.log('query fs myAmountSwapped0:', res)
                setMyBidFromAmount(res)
                setJoinStatus(isGreaterThan(res, '0'))
            })

            fsContract.methods.onlyBotHolderP(id).call().then((res) => {
                console.log('query fs name:', res)
                setOnlyBOT(res)
            })

            fsContract.methods.amountSwap0P(id).call().then((res) => {
                console.log('query fs from bid amount:', res)
                setFromBidAmount(res)
            })


            fsContract.methods.maxEthPerWalletP(id).call().then((res) => {
                console.log('query fs limit max:', res)
                setLimit(res)
            })

            fsContract.methods.whitelistP(id, account).call().then((res) => {
                console.log('whitelistP:', res)
                setInWhiteList(res)
            })

        } catch (e) {
            console.log('getTokenInfo:', e)
        }
    }

    useEffect(() => {
        if (active && chainId && account) {
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
        toAmount,
        limit,
        time,
        fromBidAmount,
        toBidAmount,
        fromAmount,
        status,
        isMine,
        onlyBOT,
        toTokenBalance,
        joinStatus,
        biddenAmount,
        inWhiteList,
        claimAble,
        claimAt,
        setClaimAble,
        myBidFromAmount,
        pool
    }
}
