import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ProjectListStyle } from './styled'
import Card from '../CertifiedSales/Card'
import { useVoteList } from "../CertifiedSales/hooks";
import { EmptyLayout } from "../../components/common/Layout";
import loading from '../../assets/icons/loading.svg'

const proTabs = [{
  status: 'Active',
  name: 'Active Votings',
  route: '/project-voting-board/active'
}, {
  status: 'Close',
  name: 'Closed Votings',
  route: '/project-voting-board/close'
}]

export default function Index() {
  const history = useHistory()
  const { type } = useParams()
  const { list } = useVoteList()
  const [curPro, setCurPro] = useState(type === 'close' ? 1 : 0)

  useEffect(() => {
    // console.log('list', list)
  }, [list])

  const renderProList = () => {
    switch (type) {
      case 'active':
        const activePools = list ? list.filter(item => {
          return item.status === 'Active'
        }) : null
        // console.log('activePools', activePools)
        return <>
          {!activePools || activePools.length === 0 ? (
            <EmptyLayout>
              <img src={loading} alt="" />
              <p>{Array.isArray(activePools) && activePools.length === 0 ? 'there is currently no active voting, please come back later' : 'Sales are loading ... Please wait'}</p>
            </EmptyLayout>
          )
            :
            activePools.sort((item1, item2) => {
              return item2.id - item1.id
            }).map((item, index) => {
              return (
                <Card
                  key={index}
                  isVote
                  pool={item}
                  progress={{
                    value: '200 BOT',
                    total: 'Success',
                    plan: 1,
                    status: 'success'
                  }}
                  status='proList-Active'
                />
              )
            })}
        </>

      case 'close':
        const closedPools = list ? list.filter(item => {
          return item.status === 'Failed' || item.status === 'Success'
        }) : null
        return <>
          {!closedPools || closedPools.length === 0 ? (
            <EmptyLayout>
              <img src={loading} alt="" />
              <p>{Array.isArray(closedPools) && closedPools.length === 0 ? 'No sales now Please check back later' : 'Sales are loading ... Please wait'}</p>
            </EmptyLayout>
          )
            : closedPools.sort((item1, item2) => {
              return item2.id - item1.id
            }).map((item, index) => {
              return (
                <Card key={item.id} isVote pool={item} progress={{
                  value: '200 BOT',
                  total: 'Success',
                  plan: 1,
                  status: 'success'
                }}
                  status='proList-Close'
                />
              )
            })}
        </>

      default:
        return <></>
    }
  }

  return (<>
    <ProjectListStyle>
      <div className="pro_header">
        <ul className='pro_tabs'>
          {proTabs.map((item, index) => {
            return <li
              key={index}
              onClick={() => {
                history.push(item.route)
                setCurPro(index)
              }}
              className={curPro === index ? `active ${item.status}` : item.status}
            >{item.name}</li>
          })}
        </ul>

        <div className="paging" />
      </div>

      {renderProList(proTabs[curPro] && proTabs[curPro].name)}
    </ ProjectListStyle>
  </>
  )
}
