import React, { useState, useEffect } from 'react'
import { ProjectListStyle } from './styled'
import Card from '../CertifiedSales/Card'
import { useVoteList } from "../CertifiedSales/hooks";
import { EmptyLayout } from "../../components/common/Layout";
import loading from '../../assets/icons/loading.svg'

const proTabs = [{
  status: 'Active',
  name: 'Active Projects'
}, {
  status: 'Close',
  name: 'Closed Projects'
}]

export default function Index() {

  const { list } = useVoteList()
  const [curPro, setCurPro] = useState(0)
  console.log('list', list)

  useEffect(() => {
    console.log(list)
  }, [list])

  const renderProList = (proTab) => {
    switch (proTab) {
      case 'Active Projects':
        const activePools = list ? list.filter(item => {
          return item.status === 'Success' || item.status === 'Active'
        }) : null
        console.log('activePools', activePools)
        return <>
          {!activePools || activePools.length === 0 ? (
            <EmptyLayout>
              <img src={loading} alt="" />
              <p>{Array.isArray(activePools) && activePools.length === 0 ? 'No sales now Please check back later' : 'Sales are loading ... Please wait'}</p>
            </EmptyLayout>
          )
            :
            activePools.map(item => {
              return (
                <Card pool={item} progress={{
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

      case 'Closed Projects':
        const closedPools = list ? list.filter(item => {
          return item.status === 'Failed'
        }) : null
        return <>
          {!closedPools || closedPools.length === 0 ? (
            <EmptyLayout>
              <img src={loading} alt="" />
              <p>{Array.isArray(closedPools) && closedPools.length === 0 ? 'No sales now Please check back later' : 'Sales are loading ... Please wait'}</p>
            </EmptyLayout>
          )
            : closedPools.map(item => {
              return (
                <Card pool={item} progress={{
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