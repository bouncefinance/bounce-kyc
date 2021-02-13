import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardStyled } from './styled'
import { Button } from '../components/Table'
import CardHeader from './CardHeader'
import { Passage } from '../components/Exhibition'
import {
  TxModal,
  initStatus,
} from "../../components/common/TXModal";
import { getPoolLeftTime } from "../../utils/time";
import { HOST } from "../../config/request_api";
import InfoBox from './LearnMore/InfoBox'
import BigNumber from "bignumber.js";
import { useIsSMDown } from '../../utils/themeHooks';
export default function SalesCard ({ status, isVote, pool = {} }) {
  const [bidStatus, setBidStatus] = useState(initStatus)
  // const { dispatch } = useContext(myContext)
  const history = useHistory()
  const [isShowInfoBox, setIsShowInfoBox] = useState(false)
  const isXSDown = useIsSMDown();
  //   console.log('myVotesClaimed--->', myVotesClaimed)
  const [left, setLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  let timer
  useEffect(() => {
    console.log('pool left', pool)
    if (pool) {
      timer = setInterval(() => {
        const left = getPoolLeftTime(!isVote && status === 'Upcoming' ? pool.openAt : pool.closeAt)
        setLeft(left)
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    }
  }, [pool])


  return (
    <CardStyled>
      <div className="main">
        {pool.proInfo && pool.proInfo &&
          <CardHeader title={pool && pool.proInfo && pool.proInfo && pool.proInfo && pool.proInfo.proname}
            logo={pool.proInfo && HOST + '/' + pool.proInfo.prologourl} socialLink={[
              { name: 'facebook', link: pool.proInfo && pool.proInfo.fackbook },
              { name: 'telegram', link: pool.proInfo && pool.proInfo.telegram },
              { name: 'twitter', link: pool.proInfo && pool.proInfo.twitter },
              { name: 'github', link: pool.proInfo && pool.proInfo.githublink },
              { name: 'medium', link: pool.proInfo && pool.proInfo.medium }
            ]} />}

        <div className="middle">
          <div className="left">
            {pool.status === 'Failed' && pool.joined && <span className='vote'>You participated</span>}
            <Passage
              title='Project details'
              desc={pool.proInfo && pool.proInfo.prosummary} />

            <a href={pool.proInfo && pool.proInfo.prowebsite}>{pool.proInfo && pool.proInfo.prowebsite}</a>

            {pool.status === 'Active' && (
              <Passage
                title={'Time left'}
                desc={`${left.days}d : ${left.hours}h : ${left.minutes}m : ${left.seconds}s`} />
            )}

            {pool.status === 'Upcoming' && (
              <Passage
                title={'Auction will start in'}
                desc={`${left.days}d : ${left.hours}h : ${left.minutes}m : ${left.seconds}s`} />
                // desc={`February 9th 2021`} />
            )}

            {/* {pool.status === 'Upcoming' && (
              <Passage
                title={'date'}
                desc={`Feb 5th 2021`} />
            )} */}


            <div className="active_btn">
              <Button type='white' value='Learn More' width={isXSDown ? '100%' : '180px'} onClick={() => {
                setIsShowInfoBox(!isShowInfoBox)
              }} />

              {pool.status === 'Active' && (
                <Button disabled={pool.enableKycList && !pool.inKYC} type='black'
                  value={pool.enableKycList && !pool.inKYC ? 'KYC is missing' : 'Join Auction'} width={isXSDown ? '100%' : '180px'}
                  onClick={() => {
                    if(pool.type === 'FIXED_SWAP'){
                      history.push(`/fixed-swap/${pool.id}`)
                    }else if(pool.type === 'LOTTERY_NFT'){
                      history.push(`/lottery-nft/${pool.id}`)
                    }
                  }} />
              )}

              {pool.status === 'Failed' && (
                <Button type='black' value='Show Result' width={isXSDown ? '100%' : '180px'} onClick={() => {
                  if(pool.type === 'FIXED_SWAP'){
                    history.push(`/fixed-swap/${pool.id}`)
                  }else if(pool.type === 'LOTTERY_NFT'){
                    history.push(`/lottery-nft/${pool.id}`)
                  }
                }} />
              )}
            </div>
          </div>

          <div className="right">
            <Passage
              title='Auction Type'
              desc={pool.proInfo && pool.proInfo.auctiontype} />

            <Passage
              title='Participant'
              desc={`
                    ${(pool.botHolder && !pool.enableWhiteList) ? 'BOT holder' : ''}
                    ${(!pool.botHolder && pool.enableWhiteList) ? 'Whitelisting' : ''}
                    ${(pool.botHolder && pool.enableWhiteList) ? 'BOT holder , Whitelisting' : ''}
                    ${(!pool.botHolder && !pool.enableWhiteList) ? 'Public' : ''}
                    `
              } />

            <Passage
              title='Requirement'
              desc={`${(pool.enableKycList) ? 'KYC' : 'No requirement'}`} />
          </div>
        </div>


        {isShowInfoBox && pool.proInfo && <InfoBox proInfo={pool.proInfo} />}

      </div>

      <TxModal modalStatus={bidStatus} onDismiss={() => {
        setBidStatus(initStatus)
      }} />

    </CardStyled>
  )
}
