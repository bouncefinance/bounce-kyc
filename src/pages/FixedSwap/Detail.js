import React, {useState, useEffect, useContext} from 'react';
import {
    Address,
    ITextR,
    LayoutFrame, LineDivider,
    OText2, OText5,
    Pool,
    Progress,
    renderTime
} from "../../components/common/Layout";
import icon_return from '../../assets/images/icon-return.svg'
import {usePoolDetail} from "./Hooks";
import BigNumber from "bignumber.js";
import {fromWei, getProgress, numToWei, weiDiv, weiToNum, weiToNumber} from "../../utils/numberTransform";
import classNames from "classnames";
import {useParams} from 'react-router-dom';
import {Form, Input} from "../../components/common/Form";
import icon_max from "../../assets/icons/icon-max.svg";
import {Button} from "../../components/common/Button";
import {useEthBalance, useTokenBalance, useTokenList} from "../../web3/common";
import {getContract, useActiveWeb3React} from "../../web3";
import fixSwap from "../../web3/abi/BouncePro.json";
import {BOUNCE_PRO} from "../../web3/address";
import Web3 from 'web3'
import {useHistory} from 'react-router-dom'
import {
    BidModal,
    initStatus,
    errorStatus,
    confirmStatus,
    pendingStatus,
    cancelStatus,
    claimSuccessStatus
} from "../../components/common/BidModal";
import {useLeftTime} from "../../hooks/useLeftTime";
import {mainContext} from "../../reducer";
import {useIsXSDown} from '../../utils/themeHooks';
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import {AuctionTipModal} from "../../components/common/AuctionTipModal";
import Modal from "../../components/common/Modal";
import {Message} from "../../components/common/message";
import {TipLink} from "../../components/common/TipLink";
import {CREATOR_CLAIMED_MESSAGE} from "../../const";
import {validateForm} from "../../utils/form";
import {isGreaterThan} from "../../utils/common";

const {BN, toWei} = Web3.utils

const bidSuccessStatus = {
    status: 3,
    title: 'Congratulations!',
    content: 'You have successfully bidded and your swapped tokens are automatically sent to your wallet. You can now make more bids.'
}


export const FSPoolDetail = () => {
    const { poolId } = useParams()
    const history = useHistory()
    const {state} = useContext(mainContext);
    const {ethPrice, BOTPrice, BTCPrice} = state
    const {id} = useParams();
    const {account, library, chainId} = useActiveWeb3React()
    const {balance} = useTokenBalance()
    const tokenOptions = useTokenList()
    const {setTime, leftTime} = useLeftTime()
    const [bidAmount, setBidAmount] = useState()
    const [bidStatus, setBidStatus] = useState(initStatus)
    const [showTip, setShowTip] = useState()
    const [errors, setErrors] = useState({amount: ''})

    const isXSDown = useIsXSDown();

    const {name, address, symbol, decimals, limit, time, fromBidAmount, fromAmount, toAmount, status, isMine, toBidAmount, onlyBOT, claimed, toSymbol, toAddress, toDecimals, joinStatus} = usePoolDetail(id)

    const {ethBalance} = useEthBalance(toAddress)

    useEffect(() => {
        if (onlyBOT && isGreaterThan(toWei('0.1'), balance) && !bidAmount) {
            errors.amount='Sorry! You are not qualified as bot holder.'
            setErrors(errors)
        }
    }, [onlyBOT, balance, bidAmount, account])

    let timer = null
    useEffect(() => {
        timer = setInterval(() => {
            const date = new Date(time * 1000);
            const now = new Date();
            const lefttime = date - now;
            if (lefttime >= 1000) {
                setTime(lefttime)
            } else if (0 < lefttime && lefttime < 1000) {
                window.location.reload()
            } else {
                clearInterval(timer)
            }
        }, (1000));
        return () => {
            clearInterval(timer)
        }
    }, [setTime, time]);


    const onBid = async () => {
        setShowTip(false)
        let tokenContract

        if (toAddress) {
            tokenContract = getContract(library, bounceERC20.abi, toAddress)
        }
        const bounceContract = getContract(library, fixSwap.abi, BOUNCE_PRO(chainId))
        const weiAmount = numToWei(bidAmount, toDecimals);

        setBidStatus(confirmStatus);
        try {
            if (toAddress) {
                await tokenContract.methods.approve(
                    BOUNCE_PRO(chainId),
                    weiAmount,
                )
                    .send({from: account});
                setBidStatus(confirmStatus);
            }
            bounceContract.methods.fixPoolSwapV2(
                id,
                weiAmount)
                .send({from: account, value: toAddress ? 0 : weiAmount})
                .on('transactionHash', hash => {
                    setBidStatus(pendingStatus)
                })
                .on('receipt', (_, receipt) => {
                    setBidStatus(bidSuccessStatus)
                })
                .on('error', (err, receipt) => {
                    setBidStatus(errorStatus)
                })
        } catch (e) {
            if (e.code === 4001) {
                setBidStatus(cancelStatus)
            } else {
                setBidStatus(errorStatus)
            }
        }

    }


    console.log('poolid--->', poolId)


    const onClaim = async () => {
        const bounceContract = getContract(library, fixSwap.abi, BOUNCE_PRO(chainId))
        setBidStatus(confirmStatus);
        try {
            bounceContract.methods.fixPoolWithdraw()
                .send({from: account})
                .on('transactionHash', hash => {
                    setBidStatus(pendingStatus)
                })
                .on('receipt', (_, receipt) => {
                    console.log('bid fixed swap receipt:', receipt)
                    setBidStatus(claimSuccessStatus)
                })
                .on('error', (err, receipt) => {
                    setBidStatus(errorStatus)
                })
        } catch (e) {
            if (e.code === 4001) {
                setBidStatus(cancelStatus)
            } else {
                setBidStatus(errorStatus)
            }
        }

    }

    const loadPrice = (toAddress) => {
        const toToken = tokenOptions.find(item => {
            return toAddress.toLowerCase() === item.key.toLowerCase()
        })
        switch (toToken.symbol) {
            case 'USDT':
                return '1'

            case 'BOT':
                return BOTPrice

            case 'WBTC':
                return BTCPrice
            default:
                return ethPrice

        }
    }

    const handleChange = async event => {
        event.preventDefault();
        const {name, value} = event.target;
        switch (name) {
            case "amount":
                errors.amount = ''
                const amountValue = value.replace(/[^\d.]/g, '')
                setBidAmount(amountValue)
                console.log('wei amount', numToWei(amountValue, decimals))
                if (!ethBalance || (ethBalance && isGreaterThan(numToWei(amountValue, decimals), ethBalance))) {
                    errors.amount = 'you do not have enough balance'
                }
                if (limit &&  isGreaterThan(limit, '0')  && isGreaterThan(numToWei(amountValue, toDecimals), limit)) {
                    errors.amount = 'maximum allocation per wallet is ' + weiToNum(limit, toDecimals)
                }
                break
            default:
        }
        console.log('final errors', errors)
        setErrors(errors)
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('handleSubmit', event)
        if (validateForm(errors)) {
            setShowTip(true)
        }
    }

    return (
        <LayoutFrame style={{
            marginTop: 27,
            paddingBottom: 56,
            paddingLeft: isXSDown ? '20px' : '0',
            paddingRight: isXSDown ? '20px' : '0'
        }}>
            {isMine ?
                <>
                    {status === 'Live' && (
                        <Message type={'success'}
                                 content={'The auction is still live, please wait patiently until your auction is filled or closed.'}/>
                    )}
                    {status === 'Filled' && (
                        <Message type={'success'}
                                 content={'Congratulations! Your auction is complete. All your tokens are auctioned and your fund is automatically sent to your wallet.'}/>
                    )}
                    {status === 'Closed' && !claimed && (
                        <Message type={'error'}
                                 content={'Unfortunately, your pool is not fully filled and closed. Please claim back the unswapped tokens manually.'}/>
                    )}
                    {status === 'Closed' && claimed && (
                        <Message type={'success'}
                                 content={CREATOR_CLAIMED_MESSAGE}/>
                    )}
                </>
                : null}


            {!isMine ?
                <>
                    {status === 'Live' && joinStatus && (
                        <Message type={'success'}
                                 content={'You have successfully bidded and your swapped tokens are automatically sent to your wallet. You can now make more bids.'}/>
                    )}
                    {status !== 'Live' && (
                        <Message content={'This auction is finished, please visit other live auctions.'}/>
                    )}
                </>
                : null}


            <Pool.Return onClick={() => {
                history.goBack()
            }} src={icon_return}/>
            <LayoutFrame width={'1072px'} style={{padding: '32px 0', margin: 'auto', marginTop: 0}}>
                <Pool.Mode>Fixed-Swap</Pool.Mode>
                <Pool.Header><span>{name}</span></Pool.Header>
                <Address style={{wordBreak: isXSDown ? 'break-all' : 'normal'}}>{address}</Address>
                <Pool.Content style={{marginTop: 40}}>

                    <Pool.Content width={isXSDown ? '100%' : '456px'} style={{marginTop: 0}}>

                        <Pool.Content width={isXSDown ? '100%' : '456px'}
                                      style={{marginTop: 0, flexDirection: 'column'}}>
                            <Pool.Status style={{width: 'fit-content'}} className={classNames('status', status)}><i
                                className={status}/>{status}</Pool.Status>
                            <ITextR style={{
                                marginTop: 8,
                                textAlign: 'left'
                            }}>{`Participant: ${onlyBOT ? 'BOT holder' : 'Public'}`}</ITextR>
                        </Pool.Content>

                        <Pool.Block style={{width: '100%'}}>
                            <span>Fixed Swap Ratio</span>
                            <span>{fromAmount && toAmount && `1 ${toSymbol} = ${(weiDiv(fromWei(fromAmount, decimals), fromWei(toAmount, toDecimals)))} ${symbol && symbol}`}</span>
                        </Pool.Block>

                        <Pool.Block style={{width: isXSDown ? '100%' : '200px'}}>
                            <span>Price,$</span>
                            <span>{(toAmount && fromAmount) && new BigNumber(weiDiv(fromWei(toAmount, toDecimals), fromWei(fromAmount, decimals))).multipliedBy(chainId === 56 ? '29' : toAddress ? loadPrice(toAddress) : ethPrice).toFixed(6).toString()}</span>
                        </Pool.Block>

                        <Pool.Block style={{width: isXSDown ? '100%' : '200px'}}>
                            <span>Maximum Allocation per wallet</span>
                            <span>{limit && (limit == 0 ? 'No limit' : `${weiToNumber(limit)} ${toSymbol}`)}</span>
                        </Pool.Block>

                        <OText5 style={{
                            width: 480,
                            marginTop: 40,
                            fontSize: 12,
                            fontFamily: 'IBM Plex Mono',
                            fontWeight: 500
                        }}>Auction
                            progress: {toBidAmount && weiToNumber(toBidAmount, toDecimals)} {toSymbol}
                            <span
                                style={{opacity: .3}}> / {toAmount && weiToNumber(toAmount, toDecimals)} {toSymbol}</span>
                        </OText5>
                        {fromBidAmount && fromAmount && (
                            <Progress style={{marginTop: 16}} height={'5px'}
                                      className={classNames('progress', toBidAmount === toAmount ? 'Filled' : status)}>
                                <Progress.Value style={{width: `${getProgress(toBidAmount, toAmount)}%`}}
                                                className={classNames('progress-value', toBidAmount === toAmount ? 'Filled' : status)}/>
                            </Progress>
                        )}

                    </Pool.Content>

                    <Pool.Content width={'auto'}
                                  style={{
                                      height: 'fit-content',
                                      width: isXSDown ? '100%' : '480px',
                                      flexDirection: 'column',
                                      padding: isXSDown ? '48px 20px' : '48px 56px',
                                      justifyContent: 'center',
                                      marginTop: 0,
                                      backgroundColor: 'rgba(248, 248, 251, 1)'
                                  }}>

                        {isMine ? (
                            <>
                                <OText2 style={{textAlign: 'center', marginTop: 8}}>My Pool</OText2>
                                {renderTime(leftTime)}
                                <Pool.Meta>
                                    <div>Total amount:</div>
                                    <div>{`${toAmount && weiToNumber(toAmount, toDecimals)} ${toSymbol}`}</div>
                                </Pool.Meta>

                                <Pool.Meta>
                                    <div>Successful bid amount:</div>
                                    <div>{toBidAmount && `${weiToNumber(toBidAmount, toDecimals)} ${toSymbol}`}</div>
                                </Pool.Meta>

                                {(status === 'Closed' && !claimed) ?
                                    <Button black onClick={onClaim}>Claim your unswapped tokens</Button> : null}

                            </>
                        ) : (
                            <form id="bid-fs-form" onSubmit={handleSubmit}>
                                <OText2 style={{textAlign: 'center', marginTop: 0, fontSize: 26}}>Join The Pool</OText2>
                                {renderTime(leftTime)}
                                <LineDivider style={{marginTop: 0}}/>
                                <Pool.topInfo>
                                    <span>Your Bid Amount</span>
                                    <span>{`Balance: ${ethBalance ? weiToNumber(ethBalance, toDecimals) : '--'}`} {toSymbol}</span>
                                </Pool.topInfo>
                                <Form
                                    error={errors.amount}
                                    top={'0px'} width={'100%'}
                                    input={<Input
                                        style={{
                                            padding: '8px 0',
                                            color: '#1F191B',
                                            fontSize: 16,
                                            lineHeight: '20px',
                                            fontFamily: 'Helvetica Neue',
                                            fontWeight: "bold"
                                        }}
                                        name={'amount'}
                                        placeholder={'Bid Amount'}
                                        disabled={onlyBOT && isGreaterThan(toWei('0.1'), balance  )}
                                        value={bidAmount}
                                        onChange={handleChange}
                                    />} name={' '} addonAfter={(<img onClick={() => {
                                    console.log('set max amount', ethBalance)
                                    setBidAmount(fromWei(ethBalance, toDecimals))
                                }} src={icon_max}/>)}
                                />

                                <Button
                                    style={{marginTop: 50}}
                                    disabled={status !== 'Live' || !validateForm(errors) || !bidAmount}
                                    black
                                >Go
                                </Button>

                                <TipLink/>
                            </form>
                        )}

                    </Pool.Content>

                </Pool.Content>


            </LayoutFrame>


            <BidModal modalStatus={bidStatus} onDismiss={() => {
                setBidStatus(initStatus)
            }}/>

            <Modal
                closeable
                isOpen={showTip}
                onDismiss={() => {
                    setShowTip(false)
                }}
                maxWidth={'450px'}
            >
                <AuctionTipModal type={0} auction={onBid}/>
            </Modal>

        </LayoutFrame>
    )
}
