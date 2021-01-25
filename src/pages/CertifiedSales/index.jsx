import React from 'react'
import {CsStyled} from './styled'
import Card from './Card'
import {usePoolList} from "./hooks";
import {EmptyLayout} from "../../components/common/Layout";
import loading from "../../assets/icons/loading.svg";

export default function Index() {
  const {list} = usePoolList()
  return (
      <CsStyled>
        {!list || list.length === 0 ? (
                <EmptyLayout>
                  <img src={loading} alt=""/>
                  <p>{Array.isArray(list) && list.length === 0 ? 'The next bounce certified sale will come soon. Stay tuned!' : 'Sales are loading ... Please wait'}</p>
                </EmptyLayout>
            ) :
            list.map(item => {
              return (
                  <Card pool={item} status='Active' poolId={1}/>
              )
            })}
      </CsStyled>
  )
}
