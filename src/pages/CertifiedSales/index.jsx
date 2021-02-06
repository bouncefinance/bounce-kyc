import React from 'react'
import {CsStyled} from './styled'
import SaleCard from './SaleCard'
import {usePoolList} from "./hooks";
import {EmptyLayout} from "../../components/common/Layout";
import loading from "../../assets/icons/loading.svg";

export default function Index() {
  const {list, activePool, upcomingPools, passPools} = usePoolList()
  console.log('upcomingPools',upcomingPools)
   console.log('list',JSON.stringify(list))
  return (
      <CsStyled>
        {!list || list.length === 0 ? (
                <EmptyLayout>
                  <img src={loading} alt=""/>
                  <p>{Array.isArray(list) && list.length === 0 ? 'The next bounce certified sale will come soon. Stay tuned!' : 'Sales are loading ... Please wait'}</p>
                </EmptyLayout>
            ) :
            (<div className="status">
              {<div style={{paddingBottom: 53, marginTop: 53}}>
              {activePool.length > 0 && <span className='Active'>Active Sales</span> }
                {activePool.sort((item1, item2) => {
                  // console.log('sort', item1, item2)
                  return item2.id - item1.id
                }).map((item, index) => {
                  return (
                      <SaleCard key={index} pool={item} status='Active'/>
                  )
                })}
              </div>}

              {<div style={{paddingBottom: 53}}>
                {upcomingPools.length > 0 && <span className='Upcoming'>Upcoming Sales</span>}
                {upcomingPools.sort((item1, item2) => {
                  // console.log('sort', item1, item2)
                  return item2.id - item1.id
                }).map((item, index) => {
                  return (
                      <SaleCard key={index} pool={item} status='Upcoming'/>
                  )
                })}
              </div>}

              {<div style={{paddingBottom: 53}}>
                {passPools.length > 0 && <span className='Past'>Past Sales</span>}
                {passPools.sort((item1, item2) => {
                  return item2.id - item1.id
                }).map((item, index) => {
                  return (
                      <SaleCard key={index} pool={item} status='Past'/>
                  )
                })}
              </div>}
            </div>)
        }

      </CsStyled>
  )
}
