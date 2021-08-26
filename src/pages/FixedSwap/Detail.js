import React, { useState, useEffect, useContext } from 'react';
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
import { usePoolDetail } from "./Hooks";
import { fromWei, getProgress, numToWei, weiDiv, weiToNum, weiToNumber } from "../../utils/numberTransform";
import classNames from "classnames";
import { useParams } from 'react-router-dom';
import { Form, Input } from "../../components/common/Form";
import icon_max from "../../assets/icons/icon-max.svg";
import { Button } from "../../components/common/Button";
import { useEthBalance, useTokenBalance, useTokenList } from "../../web3/common";
import { getContract, useActiveWeb3React } from "../../web3";
import fixSwap from "../../web3/abi/BouncePro.json";
import { AUCTION, BOUNCE_PRO } from "../../web3/address";
import Web3 from 'web3'
import { useHistory } from 'react-router-dom'
import {
  BidModal,
  initStatus,
  errorStatus,
  confirmStatus,
  pendingStatus,
  cancelStatus,
  claimSuccessStatus
} from "../../components/common/BidModal";
import { useLeftTime } from "../../hooks/useLeftTime";
import { useIsXSDown } from '../../utils/themeHooks'
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import { AuctionTipModal } from "../../components/common/AuctionTipModal";
import Modal from "../../components/common/Modal";
import { Message } from "../../components/common/message";
import { TipLink } from "../../components/common/TipLink";
import { CREATOR_CLAIMED_MESSAGE } from "../../const";
import { validateForm } from "../../utils/form";
import { isEqualTo, isGreaterThan } from "../../utils/common";
import BigNumber from "bignumber.js";
import { myContext } from '../../redux'

const { toWei } = Web3.utils

const bidSuccessStatus = {
  status: 3,
  title: 'Congratulations!',
  content: 'You have successfully bid your tokens. Please come back to claim your tokens once the auction is finished.'
}


export const FSPoolDetail = () => {
  const { poolId } = useParams()
  const history = useHistory()
  const { account, library, chainId } = useActiveWeb3React()
  const { balance } = useTokenBalance()
  const AuctionAmount = useTokenBalance(AUCTION(chainId))
  const { setTime, leftTime } = useLeftTime()
  const claimTime = useLeftTime()
  const [bidAmount, setBidAmount] = useState()
  const [bidStatus, setBidStatus] = useState(initStatus)
  const [showTip, setShowTip] = useState()
  const [errors, setErrors] = useState({ amount: '' })
  const { state, dispatch } = useContext(myContext)

  const isXSDown = useIsXSDown();
  const setClaimTime = claimTime.setTime
  const claimLeftTime = claimTime.leftTime
  // console.log('claimLeftTime', claimLeftTime)
  const {
    name, address, symbol, decimals, limit, time, fromBidAmount, fromAmount, toAmount,
    status, isMine, toBidAmount, onlyBOT,
    claimed, toSymbol, toAddress, toDecimals, pool,
    biddenAmount, joinStatus, inWhiteList, claimAble, setClaimAble, claimAt, myBidFromAmount
  } = usePoolDetail(poolId)

  const { ethBalance } = useEthBalance(toAddress)

  useEffect(() => {
    if (!chainId) return
    const pathname = window.location.pathname
    const route = pathname.includes('/bsc') ? 'BSC' : pathname.includes('/heco') ? 'HECO' : 'ETH'
    if (route === 'BSC' && chainId !== 56) {
      dispatch({
        type: 'MODAL',
        value: {
          name: 'CONFIRM',
          title: 'Bounce Certified Warning',
          deputy: `The current pool exists on the BSC chain, please switch network to BSC operation.`,
          confirm: {
            text: 'Confirm',
            callback: () => {

              dispatch({
                type: 'MODAL',
                value: null
              })
              history.goBack(-1)
            }
          }
        }
      })
    } else if (route === 'HECO' && chainId !== 128) {
      dispatch({
        type: 'MODAL',
        value: {
          name: 'CONFIRM',
          title: 'Bounce Certified Warning',
          deputy: `The current pool exists on the HECO chain, please switch network to HECO operation.`,
          confirm: {
            text: 'Confirm',
            callback: () => {

              dispatch({
                type: 'MODAL',
                value: null
              })
              history.goBack(-1)
            }
          }
        }
      })
    } else if (route === 'ETH' && chainId !== 1) {
      dispatch({
        type: 'MODAL',
        value: {
          name: 'CONFIRM',
          title: 'Bounce Certified Warning',
          deputy: `The current pool exists on the ETH chain, please switch network to ETH operation.`,
          confirm: {
            text: 'Confirm',
            callback: () => {

              dispatch({
                type: 'MODAL',
                value: null
              })
              history.goBack(-1)
            }
          }
        }
      })
    }
    // console.log('K_console', route)
  }, [chainId])

  // useEffect(() => {
  //   if (onlyBOT && isGreaterThan(toWei('0.3'), balance) && isGreaterThan(toWei('30'), AuctionAmount.balance) && !bidAmount) {
  //     errors.amount = 'Sorry! You are not qualified as bot holder.'
  //     setErrors(errors)
  //   }
  // }, [onlyBOT, balance, bidAmount, account])

  useEffect(() => {
    // console.log('J_console',onlyBOT, AuctionAmount, bidAmount, account)
    if (onlyBOT && isGreaterThan(toWei('0'), AuctionAmount.balance) && !bidAmount) {
      errors.amount = 'Sorry! You are not qualified as Auction holder.'
      setErrors(errors)
    } else {
      setErrors({ amount: '' })
    }
  }, [onlyBOT, bidAmount, account])

  useEffect(() => {
    console.log('limit--->', biddenAmount, limit)
    if (biddenAmount && limit && isGreaterThan(limit, '0') && isGreaterThan(biddenAmount, limit)) {
      errors.amount = 'You have reached your maximum allocation per wallet.'
      setErrors(errors)
    }
  }, [biddenAmount, limit])

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

  let claimTimer = null
  useEffect(() => {
    if (!claimAt) return
    claimTimer = setInterval(() => {
      const date = new Date(claimAt * 1000);
      const now = new Date().getTime()
      const lefttime = date - now;
      // console.log('claimTimeclaimTime', claimAt,now,lefttime)
      if (lefttime >= 1000) {
        // console.log('claimTimeclaimTime', lefttime)
        setClaimTime(lefttime)
      } else if (0 < lefttime && lefttime < 1000) {
        //window.location.reload()
        setClaimAble(true)
      } else {
        //setClaimAble(true)
        clearInterval(timer)
      }
    }, (1000));
    return () => {
      clearInterval(timer)
    }
  }, [setClaimTime, claimAt]);



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
      console.log('toAddress',toAddress)
      if (toAddress) {
        const allowanceBalance = await tokenContract.methods.allowance(account, BOUNCE_PRO(chainId)).call()
        if (allowanceBalance === '0') {
          await tokenContract.methods.approve(
            BOUNCE_PRO(chainId),
            weiAmount,
          )
            .send({ from: account });
          setBidStatus(confirmStatus);
        } else if (parseInt(allowanceBalance) > 0 && parseInt(allowanceBalance) < parseInt(weiAmount)) {
          await tokenContract.methods.approve(
            BOUNCE_PRO(chainId),
            0,
          )
            .send({ from: account });
          setBidStatus(confirmStatus);

          await tokenContract.methods.approve(
            BOUNCE_PRO(chainId),
            weiAmount,
          )
            .send({ from: account });
          setBidStatus(confirmStatus);
        }

        console.log('allowanceBalance', allowanceBalance)
      }
      bounceContract.methods.swap(
        poolId,
        weiAmount
      )
        .send({ from: account, value: toAddress ? 0 : weiAmount })
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


  // console.log('poolid--->', poolId)

  const onCreatorClaim = async () => {
    const bounceContract = getContract(library, fixSwap.abi, BOUNCE_PRO(chainId))
    setBidStatus(confirmStatus);
    try {
      bounceContract.methods.claim()
        .send({ from: account })
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
      console.log('onCreatorClaim', e)
      if (e.code === 4001) {
        setBidStatus(cancelStatus)
      } else {
        setBidStatus(errorStatus)
      }
    }

  }


  const onClaim = async () => {
    const bounceContract = getContract(library, fixSwap.abi, BOUNCE_PRO(chainId))
    setBidStatus(confirmStatus);
    try {
      bounceContract.methods.userClaim(poolId)
        .send({ from: account })
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

  const handleChange = async event => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case "amount":
        errors.amount = ''
        const amountValue = value.replace(/[^\d.]/g, '')
        setBidAmount(amountValue)
        console.log('wei amount', numToWei(amountValue, decimals))
        if (!ethBalance || (ethBalance && isGreaterThan(amountValue, weiToNum(ethBalance, toDecimals)))) {
          errors.amount = 'you do not have enough balance'
        }
        if (limit && isGreaterThan(limit, '0') && isGreaterThan(new BigNumber(numToWei(amountValue, toDecimals)).plus(biddenAmount), limit)) {
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
      onBid()
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
              content={'The auction is still live, please wait patiently until your auction is filled or closed.'} />
          )}
          {status === 'Filled' && (
            <Message type={'success'}
              content={'Congratulations! Your auction is complete. All your tokens are auctioned and your fund is automatically sent to your wallet.'} />
          )}
          {status === 'Closed' && !claimed && (
            <Message type={'error'}
              content={'Unfortunately, your pool is not fully filled and closed. Please claim back the unswapped tokens manually.'} />
          )}
          {status === 'Closed' && claimed && (
            <Message type={'success'}
              content={CREATOR_CLAIMED_MESSAGE} />
          )}
        </>
        : null}


      {!isMine ?
        <>
          {status === 'Live' && joinStatus && (
            <Message type={'success'}
              content={'You have successfully bidded and your can claim your swapped tokens when auction is finished. You can now make more bids.'} />
          )}
          {status !== 'Live' && (
            <Message content={'This auction is finished, please visit other live auctions.'} />
          )}
        </>
        : null}


      <Pool.Return onClick={() => {
        history.goBack()
      }} src={icon_return} />
      <LayoutFrame width={'1072px'} style={{ padding: '24px 0', margin: 'auto', marginTop: 0 }}>
        <Pool.Mode>Fixed-Swap</Pool.Mode>
        <Pool.Header><span>{name}</span></Pool.Header>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Address style={{ wordBreak: isXSDown ? 'break-all' : 'normal' }}>{address}</Address>
        </div>
        <Pool.Content style={{ marginTop: 40 }}>

          <Pool.Content width={isXSDown ? '100%' : '456px'} style={{ marginTop: 0 }}>

            <Pool.Content width={isXSDown ? '100%' : '456px'}
              style={{ marginTop: 0, flexDirection: 'column' }}>
              <Pool.Status style={{ width: 'fit-content' }} className={classNames('status', status)}>
                <i className={status} />{status}</Pool.Status>
              <ITextR style={{
                marginTop: 8,
                textAlign: 'left'
              }}>{`Participant: ${(onlyBOT && !pool.enableWhiteList) ? 'Auction holder' : ''}
                    ${(!onlyBOT && pool.enableWhiteList) ? 'Whitelisting' : ''}
                    ${(onlyBOT && pool.enableWhiteList) ? 'Auction holder , Whitelisting' : ''}
                    ${(!onlyBOT && !pool.enableWhiteList) ? 'Public' : ''}`}</ITextR>
              <ITextR style={{
                marginTop: 8,
                textAlign: 'left'
              }}>{`Requirement: ${(pool.enableKycList) ? 'KYC' : 'No requirement'}`}</ITextR>
            </Pool.Content>

            <Pool.Block style={{ width: '100%' }}>
              <span>Fixed Swap Ratio</span>
              <span>{fromAmount && toAmount && `1 ${toSymbol} = ${(weiDiv(fromWei(fromAmount, decimals), fromWei(toAmount, toDecimals)))} ${symbol && symbol}`}</span>
            </Pool.Block>

            <Pool.Block style={{ width: isXSDown ? '100%' : '200px' }}>
              <span>Total Allocation</span>
              <span>{fromAmount && weiToNum(fromAmount, decimals, 6)} {symbol}</span>
            </Pool.Block>

            <Pool.Block style={{ width: isXSDown ? '100%' : '200px' }}>
              <span>Maximum Allocation per wallet</span>
              <span>{limit && (limit == 0 ? 'No limit' : `${weiToNumber(limit, toDecimals)} ${toSymbol}`)}</span>
            </Pool.Block>

            <OText5 style={{
              width: 480,
              marginTop: 40,
              fontSize: 12,
              fontFamily: 'IBM Plex Mono',
              fontWeight: 500
            }}>Auction progress: {toBidAmount && weiToNumber(toBidAmount, toDecimals)} {toSymbol}
              <span
                style={{ opacity: .3 }}> / {toAmount && weiToNumber(toAmount, toDecimals)} {toSymbol}</span>
            </OText5>
            {toBidAmount && toAmount && (
              <Progress style={{ marginTop: 16 }} height={'5px'}
                className={classNames('progress', toBidAmount === toAmount ? 'Filled' : status)}>
                <Progress.Value style={{ width: `${getProgress(toBidAmount, toAmount)}%` }}
                  className={classNames('progress-value', toBidAmount === toAmount ? 'Filled' : status)} />
              </Progress>
            )}

          </Pool.Content>

          <Pool.Content width={'auto'}
            style={{
              height: 'auto',
              width: isXSDown ? '100%' : '480px',
              flexDirection: 'column',
              padding: isXSDown ? '48px 20px' : '48px 56px',
              justifyContent: 'center',
              marginTop: 0,
              backgroundColor: 'rgba(248, 248, 251, 1)'
            }}>

            {status === 'Live' && (
              <OText2 style={{ textAlign: 'center', marginTop: 0, fontSize: 26 }}>Join Auction</OText2>
            )}

            {status === 'Closed' && (
              <OText2 style={{ textAlign: 'center', marginTop: 0, fontSize: 26 }}>Auction is Closed</OText2>
            )}

            {status === 'Filled' && (
              <OText2 style={{ textAlign: 'center', marginTop: 0, fontSize: 26 }}>The Auction Filled</OText2>
            )}

            {isMine ? (
              <>
                <OText2 style={{ textAlign: 'center', marginTop: 8 }}>My Pool</OText2>
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
                  <Button black onClick={onCreatorClaim}>Claim your tokens</Button> : null}
              </>
            ) : (
              <form id="bid-fs-form" onSubmit={handleSubmit}>
                {status !== 'Filled' && renderTime(leftTime)}
                <LineDivider style={{ marginTop: 0 }} />
                <Pool.topInfo>
                  <span>You have successfully bid</span>
                  <span>{`${(myBidFromAmount && decimals) ? weiToNumber(myBidFromAmount, decimals) : '--'}`} {symbol}</span>
                </Pool.topInfo>

                {status === 'Live' && (
                  <>
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
                        disabled={(onlyBOT && isGreaterThan(toWei('0'), AuctionAmount.balance)) ||
                          (limit && biddenAmount && isGreaterThan(limit, '0') && isEqualTo(limit, biddenAmount))}
                        value={bidAmount}
                        onChange={handleChange}
                      />} name={' '} addonAfter={(<img onClick={() => {
                        console.log('set max amount', ethBalance)
                        setBidAmount(fromWei(ethBalance, toDecimals))
                      }} src={icon_max} />)}
                    />

                    <Button
                      style={{ marginTop: 50 }}
                      disabled={status !== 'Live' || !validateForm(errors) || !bidAmount || (!inWhiteList && pool.enableWhiteList)}
                      black
                    >{(!inWhiteList && pool.enableWhiteList) ? 'You are not in the whitelist' : 'GO'}
                    </Button>
                  </>
                )}

                {((status === 'Closed' || status === 'Filled') && joinStatus) ?
                  <Button disabled={!claimAble || claimed} type='button' style={{ marginTop: 24 }} black onClick={onClaim}>
                    {claimed ? 'You already claimed your tokens' : 'Claim your tokens'}
                    {(claimLeftTime && !claimAble) && ` ( ${claimLeftTime.days}d: ${claimLeftTime.hours}h : ${claimLeftTime.minutes}m : ${claimLeftTime.seconds}s )`}
                  </Button> : null}
                <TipLink />
              </form>
            )}

          </Pool.Content>

        </Pool.Content>


      </LayoutFrame>


      <BidModal modalStatus={bidStatus} onDismiss={() => {
        setBidStatus(initStatus)
      }} />

      <Modal
        closeable
        isOpen={showTip}
        onDismiss={() => {
          setShowTip(false)
        }}
        maxWidth={'450px'}
      >
        <AuctionTipModal type={0} auction={onBid} />
      </Modal>

    </LayoutFrame>
  )
}
