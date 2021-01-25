import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {CardStyled} from './styled'
import {TextInput} from '../components/Table'
import {Button} from '../components/Table'
import CardHeader from './CardHeader'
import Progress from './Progress'
import {Passage} from '../components/Exhibition'
import {getContract, useActiveWeb3React} from "../../web3";
import {
  TxModal,
  initStatus,
  errorStatus,
  successStatus,
  confirmStatus,
  pendingStatus,
  cancelStatus
} from "../../components/common/TXModal";
import {BOT, BOUNCE_PRO_VOTING} from "../../web3/address";
import bounceERC20 from '../../web3/abi/bounceERC20.json'
import BounceProVoting from '../../web3/abi/BounceProVoting.json'
import {numToWei, weiToNum} from "../../utils/numberTransform";
import {ModalLayout} from "../components/Modal/styled";
import Support from "../components/Modal/Support";
import BigNumber from "bignumber.js";
import {getPoolLeftTime} from "../../utils/time";
import {useTokenBalance} from "../../hooks/useBalance";
import {useStatus} from "./hooks";


export default function Card({status, poolId = 0, progress, claimFun, isVote, pool}) {

  const [isSupport, setIsSupport] = useState(false)
  const [supporting, setSupporting] = useState(false)
  const {balance} = useTokenBalance()
  const [bidStatus, setBidStatus] = useState(initStatus)
  // const { dispatch } = useContext(myContext)
  const history = useHistory()
  const {account, library, chainId, active} = useActiveWeb3React()
  const [value, setValue] = useState()

  const {myVotes, myVotesClaimed} = useStatus(pool.id)
  console.log('myVotesClaimed--->', myVotesClaimed)
  const [left, setLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  let timer
  useEffect(() => {
    console.log('pool left', isVote, pool.status, pool.openAt)
    if(pool){
      timer = setInterval(() => {
        const left = getPoolLeftTime(!isVote && status === 'Upcoming'? pool.openAt :pool.closeAt )
        setLeft(left)
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    }
  }, [pool])


  const onVote = async () => {
    setSupporting(false)
    const tokenContract = getContract(library, bounceERC20.abi, BOT(chainId))
    const bounceContract = getContract(library, BounceProVoting.abi, BOUNCE_PRO_VOTING(chainId))
    const weiAmount = numToWei(value);

    setBidStatus(confirmStatus);
    try {
      await tokenContract.methods.approve(
          BOUNCE_PRO_VOTING(chainId),
          weiAmount,
      )
          .send({from: account});
      bounceContract.methods.vote(pool.id, weiAmount)
          .send({from: account})
          .on('transactionHash', hash => {
            setBidStatus(pendingStatus)
          })
          .on('receipt', (_, receipt) => {
            console.log('bid fixed swap receipt:', receipt)
            setBidStatus(successStatus)
          })
          .on('error', (err, receipt) => {
            setBidStatus(errorStatus)
          })
    } catch (e) {
      console.log('bid---->', e)
      if (e.code === 4001) {
        setBidStatus(cancelStatus)
      } else {
        setBidStatus(errorStatus)
      }
    }

  }

  const onCliam = async () => {
    setSupporting(false)
    const bounceContract = getContract(library, BounceProVoting.abi, BOUNCE_PRO_VOTING(chainId))
    setBidStatus(confirmStatus);
    try {
      bounceContract.methods.claim(pool.id)
          .send({from: account})
          .on('transactionHash', hash => {
            setBidStatus(pendingStatus)
          })
          .on('receipt', (_, receipt) => {
            console.log('bid fixed swap receipt:', receipt)
            setBidStatus(successStatus)
          })
          .on('error', (err, receipt) => {
            setBidStatus(errorStatus)
          })
    } catch (e) {
      console.log('bid---->', e)
      if (e.code === 4001) {
        setBidStatus(cancelStatus)
      } else {
        setBidStatus(errorStatus)
      }
    }

  }


  const renderStatus = (status) => {
    switch (status) {
      case 'Active':
        return !isVote && <span className='Active'>Active Sales</span>

      case 'Upcoming':
        return <span className='Upcoming'>Upcoming Sales</span>

      case 'Past':
        return <span className='Past'>Past Sales</span>
      default:
        return <></>
    }
  }

  const renderButton = (status) => {
    switch (status) {
      case 'Active':
        return <>
          {isVote && (
              <>
                <Button type='white' value='Learn More' width='168px' onClick={() => {
                  history.push(`/learn-more/${pool.id}`)
                }}/>
                <Button type='black' value='Support' width='168px' onClick={() => {
                  setIsSupport(true)
                }}/>
              </>
          )}

          {!isVote && (
              <>
                <Button type='white' value='Learn More' width='168px' onClick={() => {
                  history.push(`/learn-more/${poolId}`)
                }}/>
                <Button type='black' value='Join Auction' width='168px' onClick={() => {
                  setIsSupport(true)
                }}/>
              </>
          )}

        </>

      case 'Upcoming':
        return <>
          <Button type='white' value='Learn More' width='168px' onClick={() => {
            history.push(`/learn-more/${poolId}`)
          }}/>
        </>

      case 'Past':
        return <>
          <Button type='black' value='Visit Project' width='168px' onClick={() => {
            history.push(`/certified-sales/${poolId}`)
          }}/>
        </>

      case 'proList-Active':
        return <>
          <Button type='white' value='Learn More' width='168px' onClick={() => {
            history.push(`/learn-more/${poolId}`)
          }}/>
          <Button type='black' value='Support' width='168px' onClick={() => {
            setIsSupport(true)
          }}/>
        </>

      case 'Success':
      case 'Failed':
        return <>
          <Button type='white' value='Visit Project' width='168px' onClick={() => {
            // history.push(`/learn-more/${poolId}`)
          }}/>
          {isVote && myVotes && new BigNumber(myVotes).isGreaterThan('0') && !myVotesClaimed && <Button type='black' value='Claim support tokens back' width='240px' onClick={() => {
            // history.push(`/certified-sales/${poolId}`)
            onCliam()
          }}/>}
        </>

      default:
        return <></>
    }
  }

  return (
      <CardStyled>
        <div className="status">
          {renderStatus(pool.status)}
          {/* <span>Active Sales</span> */}
        </div>
        <div className="main">
          <CardHeader title={pool && pool.proInfo && pool.proInfo.proname} logo={pool.prologourl} socialLink={[
            {name: 'facebook', link: pool.fackbook},
            {name: 'telegram', link: pool.telegram},
            {name: 'twitter', link: pool.twitter},
            {name: 'github', link: pool.githublink}
          ]}/>

          <div className="middle">
            <div className="left">
              {isVote && myVotes && new BigNumber(myVotes).isGreaterThan('0') && <span className='vote'>You Voted</span>}
              <Passage
                  title='Project details'
                  desc={pool.proInfo.prosummary}/>

              <a href="http://activeprojectname.com">{pool.proInfo.prowebsite}</a>

              <Passage
                  title='Time Left'
                  desc={`${left.days}d : ${left.hours}h : ${left.minutes}m : ${left.seconds}s`}/>

              {progress && <Progress
                  width='480px'
                  status={pool.status}
                  plan={new BigNumber(pool.totalVotes).dividedBy('200000000000000000000').dividedBy('100')}
                  value={`${weiToNum(pool.totalVotes)} BOT`}
                  total={progress.total}
              />}

              {isSupport && status !== 'proList-Close' && <div className='support'>
                <TextInput onValChange={(value) => {
                  console.log('value', value)
                  setValue(value)
                }} placeholder={`Enter your vote amount ${weiToNum(balance)} BOT`} width='100%' bottom={'10px'}/>
                <Button disabled={new BigNumber(numToWei(value)).isGreaterThan(balance)} type='black'
                        value={new BigNumber(numToWei(value)).isGreaterThan(balance) ? `Insufficient BOT` : 'Support'}
                        width='180px' onClick={() => {
                  setSupporting(true)
                }}/>
                <Button type='white' value='Back' width='180px' onClick={() => {
                  setIsSupport(false)
                }}/>
              </div>}
            </div>

            <div className="right">
              <Passage
                  title='Auction Type'
                  desc='Fixed-swap auction'/>

              <Passage
                  title='Participant'
                  desc='Public'/>

              <Passage
                  title='Requirement'
                  desc='KYC'/>
            </div>
          </div>

          {!isSupport && <div className="bottom">
            {renderButton(pool.status)}
          </div>}
        </div>

        <TxModal modalStatus={bidStatus} onDismiss={() => {
          setBidStatus(initStatus)
        }}/>

        {supporting && (
            <ModalLayout className='layout' onClick={(e) => {
              e.stopPropagation()
            }}>
              <Support onConfirm={onVote} cancel={() => setSupporting(false)} amount={value}/>
            </ModalLayout>
        )}
      </CardStyled>
  )
}
