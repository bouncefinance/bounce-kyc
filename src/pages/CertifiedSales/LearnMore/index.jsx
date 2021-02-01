import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {LearnMoreStyle} from './styled'
import CardHeader from '../CardHeader'
import {Passage} from '../../components/Exhibition'
import {TextInput, Button} from '../../components/Table'
import Progress from '../Progress'
import {useParams} from 'react-router-dom'
import {useVoteListByPoolId} from '../hooks'
import Crumbs from '../../components/Exhibition/Crumbs'
import BigNumber from "bignumber.js";
import {numToWei, weiToNum} from "../../../utils/numberTransform";
import {useTokenBalance} from "../../../hooks/useBalance";
import {
  cancelStatus,
  confirmStatus,
  errorStatus,
  initStatus,
  pendingStatus,
  successVotedStatus,
  TxModal
} from "../../../components/common/TXModal";
import {ModalLayout} from "../../components/Modal/styled";
import Support from "../../components/Modal/Support";
import {getContract, useActiveWeb3React} from "../../../web3";
import bounceERC20 from "../../../web3/abi/bounceERC20.json";
import {BOT, BOUNCE_PRO_VOTING} from "../../../web3/address";
import BounceProVoting from "../../../web3/abi/BounceProVoting.json";
import {HOST} from '../../../config/request_api'
import InfoBox from './InfoBox'
import {useIsSMDown} from '../../../utils/themeHooks';

export default function Index() {
  const history = useHistory()
  const {poolId} = useParams()
  const pool = useVoteListByPoolId(poolId)
  const proInfo = pool.proInfo
  const {balance} = useTokenBalance()
  const [supporting, setSupporting] = useState(false)
  const [value, setValue] = useState()
  const [bidStatus, setBidStatus] = useState(initStatus)
  const {account, library, chainId, active} = useActiveWeb3React()
  const isXSDown = useIsSMDown();
  // const { prosummary, whitepaperlink, protheme, techhighlight, architecture } = useVoteListByPoolId(poolId)
  const [isSupport, setIsSupport] = useState(false)
  const [crumbs_name, setCrumbs_name] = useState({
    name: 'Active_sales',
    route: '/certified-sales'
  })
  // console.log('proInfo', proInfo)
  useEffect(() => {
    console.log(proInfo)
  }, [proInfo])

  useEffect(() => {
    const crumbs_index = JSON.parse(window.localStorage.getItem('crumbs_index'))
    if (crumbs_index) {
      setCrumbs_name(crumbs_index)
    }
  }, [])

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
            setBidStatus(successVotedStatus)
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

  return (
      <>
        <Crumbs list={[{
          name: crumbs_name.name,
          onClick: () => {
            history.push(crumbs_name.route)
          }
        }, {
          name: 'Bounce Project',
          active: true
        }]}/>
        <LearnMoreStyle>
          {pool.proInfo &&
          <CardHeader title={pool && pool.proInfo && pool.proInfo.proname} logo={HOST + '/' + pool.proInfo.prologourl}
                      socialLink={[
                        {name: 'facebook', link: pool.proInfo.fackbook},
                        {name: 'telegram', link: pool.proInfo.telegram},
                        {name: 'twitter', link: pool.proInfo.twitter},
                        {name: 'github', link: pool.proInfo.githublink},
                        {name: 'medium', link: pool.proInfo.medium}
                      ]}/>}

          <div className="main">
            <div className="left">
              <Passage
                  title='Project summary'
                  desc={proInfo && proInfo.prosummary}/>

              <a href={proInfo && proInfo.prowebsite}>{proInfo && proInfo.prowebsite}</a>

              {isSupport && <div className='support'>
                <div className="progress">
                  <Progress
                      title='Support from community:'
                      status={pool && pool.status}
                      plan={pool && new BigNumber(pool.totalVotes).dividedBy('200000000000000000000').dividedBy('100')}
                      value={pool && `${weiToNum(pool.totalVotes)} BOT`}
                      total={pool && pool.total}
                  />
                </div>
                <TextInput onValChange={(value) => {
                  console.log('value', value)
                  setValue(value)
                }} placeholder={`Enter your vote amount ${weiToNum(balance)} BOT`} width='100%' bottom={'10px'}/>
                {pool.status === 'Active' &&
                <Button disabled={new BigNumber(numToWei(value)).isGreaterThan(balance)} type='black'
                        value={new BigNumber(numToWei(value)).isGreaterThan(balance) ? `Insufficient BOT` : 'Support'}
                        width={isXSDown?'100%':'180px'} onClick={() => {
                  setSupporting(true)
                }}/>}
                <Button type='white' value='Back' width={isXSDown?'100%':'180px'} onClick={() => {
                  setIsSupport(false)
                }}/>

              </div>}
            </div>

            <div className="right">
              <Passage
                  title='Theme'
                  desc={proInfo && proInfo.protheme}/>
              <Passage
                  title='Whitepaper'/>
              <a href={proInfo && proInfo.whitepaperlink}>{proInfo && proInfo.whitepaperlink}</a>
            </div>


          </div>
          {!isSupport && pool.status === 'Active' && <div className='btn_group'>
            <Button type='black' value='Support' width={isXSDown?'100%':'180px'} onClick={() => {
              setIsSupport(true)
            }}/>
          </div>}

          <InfoBox proInfo={pool.proInfo}/>
        </LearnMoreStyle>


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
      </>
  )
}
