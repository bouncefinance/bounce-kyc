import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {
  Address,
  ITextR,
  LayoutFrame,
  LineDivider,
  OText3,
  OText5,
  Pool, Progress,
  renderTime
} from '../../components/common/Layout';
import icon_return from '../../assets/images/icon-return.svg'
import {usePoolDetail} from './Hooks';
import classNames from 'classnames';
import {BigNumber} from 'bignumber.js'
import {
  BidModal,
  initStatus,
  errorStatus,
  successStatus,
  confirmStatus,
  pendingStatus,
  cancelStatus
} from '../../components/common/BidModal';
import {useLeftTime} from '../../hooks/useLeftTime';
import {fromWei, getProgress, weiDiv, weiToNum, weiToNumber} from '../../utils/numberTransform';
import {Button} from "../../components/common/Button";
import {BOUNCE_PRO, BOUNCE_PRO_LOTTERY_NFT_PRO} from '../../web3/address';
import {getContract, useActivePlatform, useActiveWeb3React} from '../../web3';
import LotteryERC1155ABI from "../../web3/abi/bounceERC1155.json";
import BounceLotteryNFTPro from "../../web3/abi/BounceLotteryNFTPro.json";
import {useIsXSDown} from '../../utils/themeHooks'
import {Message} from "../../components/common/message";
import {isEqualTo, isGreaterThan} from "../../utils/common";
import {BIDDER_CLAIMED_MESSAGE, CREATOR_CLAIMED_MESSAGE} from "../../const";
import {PoolCover} from "../../components/common/DetailCover";
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import {approveStatus} from "../CertifiedSales/ApplyModal";
import {formatAmount} from "../../utils/format";
import {useInKYC} from "../CertifiedSales/hooks";
import {useTokenBalance} from "../../hooks/useBalance";


BigNumber.config({EXPONENTIAL_AT: [-30, 30]})

export const LotteryNFTDetail = ({token2}) => {
  const history = useHistory();
  const {id} = useParams();

  const {account, library, chainId} = useActiveWeb3React();

  const {
    name, address, isLive, time, price, winner, inWhitelist,
    toDecimals, playStatus, isMine, claimed, status, setStatus,
    isWinner, isJoined, pool, curPlayer, symbol, onlyBOT, toAddress, toSymbol, tokenId, cover
  } = usePoolDetail(id);
  const [bidStatus, setBidStatus] = useState(initStatus);
  const [disable, setDisable] = useState(false);
  //const [status, setStatus] = useState();
  const [display, setDisplay] = useState('');
  const {setTime, leftTime} = useLeftTime();
  const isXSDown = useIsXSDown();
  const {Psymbol} = useActivePlatform()
  const KYCed = useInKYC()
  const {balance} = useTokenBalance(toAddress)
  console.log('balance', balance)
  const {btnContent, setBtnContent} = useLeftTime();

  let timer = null;
  useEffect(() => {
    if (status === 'Live') {
      setStatus('Live');
      if (isMine) {
        setDisplay('Lottery is live');
        setDisable(true);
      } else {
        if (isJoined) {
          setDisplay('You Joined');
          setDisable(true);
        } else {
          setDisplay('Join The Lottery');
          setDisable(false);
        }
      }

    } else if (status === 'Closed') {
      if (isMine) {
        setDisplay('My Pool');
        setDisable(true);
      } else {
        if (isWinner) {
          setDisplay('You are a Winner');
        } else {
          setDisplay('Lottery Completed');
        }
      }
      //setStatus('Closed');
    }
    timer = setInterval(() => {

      const date = new Date(time * 1000);
      const now = new Date();
      const lefttime = date - now;
      if (lefttime > 1000) {
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
  }, [setTime, time, isMine, isJoined, isWinner, isLive]);

  useEffect(()=>{

  }, [])

  const renderButtonText = () => {
    console.log('status---->',status)

    let text = '';
    if (isLive) {
      if (isMine) {
        text = ''
      } else {
        if (isJoined) {
          text = 'You are in the draw...';
        }else if(pool && curPlayer === pool.maxPlayer){
          text = 'Max participants reached'
        }else if (!KYCed){
          text = 'KYC is missing'
        } else if (!inWhitelist) {
          text = 'You are not in the whitelist';
        }else if( price && balance && isGreaterThan(price, balance)){
          text = `You don’t have enough ${toSymbol}`
        }else {
          text = 'GO';
        }
      }
    } else {
      if(isJoined){
        if (isWinner && !claimed) {
          text = 'Claim your tokens';
        } else if (!isWinner && !claimed) {
          text = 'Claim your tokens Back';
        } else {
          text = 'You already claimed your tokens'
        }
      }else {
          text = `You didn't join`
      }

    }
    return text;
  }

  const handleClaim = async () => {
    const contract = getContract(library, LotteryERC1155ABI.abi, BOUNCE_PRO_LOTTERY_NFT_PRO(chainId));
    let method;
    if (playStatus === '1') {
      method = 'creatorClaim';
    } else if (playStatus === '2') {
      method = 'playerClaim';
    }
    setBidStatus(confirmStatus);
    try {
      contract.methods[method](parseInt(id))
          .send({from: account})
          .on('transactionHash', hash => {
            setBidStatus(pendingStatus)
          })
          .on('receipt', (_, receipt) => {
            setBidStatus(successStatus)
          })
          .on('error', (err, receipt) => {
            setBidStatus(errorStatus)
          })
    } catch (e) {
      console.log('lottery erc20 claim error', e)
      if (e.code === 4001) {
        setBidStatus(cancelStatus)
      } else {
        setBidStatus(errorStatus)
      }
    }
  }

  const handleJoin = async () => {
    const contract = getContract(library, BounceLotteryNFTPro.abi, BOUNCE_PRO_LOTTERY_NFT_PRO(chainId));

    setBidStatus(approveStatus);
    try {
      console.log('contract', contract)
      let tokenContract

      if (toAddress) {
        tokenContract = getContract(library, bounceERC20.abi, toAddress)
        await tokenContract.methods.approve(
            BOUNCE_PRO_LOTTERY_NFT_PRO(chainId),
            price
        )
            .send({ from: account });
      }
      setBidStatus(confirmStatus);
      contract.methods.bet(parseInt(id))
          .send({from: account, value: price})
          .on('transactionHash', hash => {
            setBidStatus(pendingStatus)
          })
          .on('receipt', (_, receipt) => {
            setBidStatus(successStatus)
          })
          .on('error', (err, receipt) => {
            setBidStatus(errorStatus)
          })
    } catch (e) {
      console.log('join error', e);
      if (e.code === 4001) {
        setBidStatus(cancelStatus)
      } else {
        setBidStatus(errorStatus)
      }
    }
  }

  const handleClick = () => {
    if (isLive) {
      if (!isJoined) {
        handleJoin();
      }
    } else {
      if (!claimed) {
        handleClaim();
      }
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
                           content={`The lottery is still live, please wait patiently until your lottery is closed. The current number of people in the draw is ${pool.curPlayer}`}/>
              )}
              {status === 'Closed' && isEqualTo(pool.curPlayer, '0') && !claimed && (
                  <Message type={'error'}
                           content={'The lottery is closed. Unfortunately, no one participated. Please claim back your principle tokens.'}/>
              )}
              {status === 'Closed' && isGreaterThan(pool.curPlayer, '0') && !claimed && (
                  <Message type={'success'}
                           content={'The lottery is closed. Please claim your swapped tokens.'}/>
              )}
              {status === 'Close' && claimed && (
                  <Message type={'success'}
                           content={CREATOR_CLAIMED_MESSAGE}/>
              )}
            </>
            : null}

        {!isMine ?
            <>
              {status === 'Live' && isJoined && (
                  <Message type={'success'}
                           content={'You are in the draw. Please come back to check result when the lottery is closed.'}/>
              )}
              {status === 'Closed' && isWinner && !claimed && (
                  <Message type={'success'}
                           content={'Congratulations! You win the lottery. Please claim your lottery rewards.'}/>
              )}
              {status === 'Closed' && !isWinner && !claimed && (
                  <Message type={'error'}
                           content={'Unfortunately, you are not selected as a winner. Please claim your principle back.'}/>
              )}

              {status === 'Closed' && isJoined && claimed && (
                  <Message
                      content={BIDDER_CLAIMED_MESSAGE}/>
              )}

              {status === 'Closed' && !isJoined && claimed && (
                  <Message
                      content={'This auction is finished, please visit other live auctions.'}/>
              )}
            </>
            : null}

        <Pool.Return onClick={() => {
          history.goBack()
        }} src={icon_return}/>
        <LayoutFrame width={'1072px'} style={{padding: '40px 0', margin: 'auto', marginTop: 32}}>
          <Pool.Mode>Lotteries</Pool.Mode>
          <Pool.Header>
            <span>{name}</span>
          </Pool.Header>
          <Address style={{
            wordBreak: isXSDown ? 'break-all' : 'normal',
            marginBottom: 16,
            display: 'flex'
          }}>{address}</Address>

          <Pool.Content style={{marginTop: 40}}>

            <Pool.Content width={isXSDown ? '100%' : '432px'} style={{marginTop: 0, height: 'revert'}}>
              <PoolCover cover={cover} link={cover}/>
            </Pool.Content>
            <Pool.Content width={isXSDown ? '100%' : '432px'}
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.04)', flexDirection: 'column',
                            padding: isXSDown ? '48px 20px' : '48px 56px', position: 'relative', margin: '0 auto',
                            alignItems: 'center', justifyContent: 'flex-start'
                          }}
            >
              {status && <Pool.Status style={{
                position: 'absolute', top: '16px', left: '20px', height: '26px', lineHeight: '26px'
              }} className={classNames('status', status)}>
                • {status}
              </Pool.Status>}


              <OText3 style={{textAlign: 'center', margin: '0 auto'}}>{display}</OText3>
              {renderTime(leftTime)}
              <LineDivider style={{width: '100%'}}/>
              <Pool.Meta style={{width: '100%', marginTop: '16px'}}>
                <div>Participant :</div>
                <div>{`${(onlyBOT && !pool.enableWhiteList) ? 'BOT holder' : ''}
                    ${(!onlyBOT && pool.enableWhiteList) ? 'Whitelisting' : ''}
                    ${(onlyBOT && pool.enableWhiteList) ? 'BOT holder , Whitelisting' : ''}
                    ${(!onlyBOT && !pool.enableWhiteList) ? 'Public' : ''}`}</div>
              </Pool.Meta>
              <Pool.Meta style={{width: '100%', marginTop: '16px'}}>
                <div>Requirement :</div>
                <div>{(pool.enableKycList) ? 'KYC' : 'No requirement'}</div>
              </Pool.Meta>
              <Pool.Meta style={{width: '100%', marginTop: '16px'}}>
                <div>Ticket Size :</div>
                <div>1 Ticket = 1NFT</div>
              </Pool.Meta>
              <Pool.Meta style={{width: '100%', marginTop: '16px'}}>
                <div>Ticket Price :</div>
                <div>{`${pool && weiToNumber(price, toDecimals)}`} {toSymbol}</div>
              </Pool.Meta>
              <Pool.Meta style={{width: '100%', marginTop: '16px'}}>
                <div>Number of Winner :</div>
                <div>{winner}</div>
              </Pool.Meta>
              <Pool.Meta style={{width: '100%', marginTop: '16px'}}>
                <div>Participants :</div>
                <div>{curPlayer} / {pool && pool.maxPlayer}</div>
              </Pool.Meta>

              <Button disabled={ (status === 'Closed' && !isJoined) ||(status === 'Closed' && isJoined && !claimed)||isJoined || !KYCed || (price && balance && isGreaterThan(price, balance)) || (pool && curPlayer === pool.maxPlayer) || (!inWhitelist && pool.enableWhiteList)} black style={{width: '100%', marginTop: '30px'}}
                      onClick={handleClick}>
                {renderButtonText()}
              </Button>

            </Pool.Content>
          </Pool.Content>
        </LayoutFrame>

        <BidModal modalStatus={bidStatus} onDismiss={() => {
          setBidStatus(initStatus);
        }}/>
      </LayoutFrame>
  )
}
