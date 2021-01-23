import React, { useState, useEffect } from 'react'
import { ProjectListStyle } from './styled'
import Card from '../CertifiedSales/Card'
import { useVoteList } from "../CertifiedSales/hooks";

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

  useEffect(() => {
    console.log(list)
  }, [list])

  const renderProList = (proTab) => {
    switch (proTab) {
      case 'Active Projects':
        return <>
          {list.map((item, index) => {
            return (
              <Card key={index} pool={item} progress={{
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
        return <>
          <Card
            progress={{
              value: '200 BOT',
              total: 'Success',
              plan: 0.7,
              status: 'faild'
            }}
            status='proList-Close'
            claimFun={() => {
              return true
            }}
            isVote={true}
          />
          <Card progress={true} status='proList-Close' />
          <Card progress={true} status='proList-Close' />
        </>

      default:
        return <></>
    }
  }

  return (
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

        <div className="paging">
          1 of 50 112
          </div>
      </div>

      {renderProList(proTabs[curPro] && proTabs[curPro].name)}
    </ProjectListStyle>
  )
}
