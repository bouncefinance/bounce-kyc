import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { LayoutStyled } from './styled'
import HeaderTab from './components/HeaderTab'
import ModalGroup from './components/Modal'
import Kyc from './Kyc'
import CertifiedSales from './CertifiedSales'



export default function Index() {

    return (
        <LayoutStyled>
            <div className="mainView">
                <HeaderTab />
                <Switch>
                    <Route path='/kyc' exact component={Kyc} />
                    <Route path='/certified-sales' exact component={CertifiedSales} />
                </Switch>
            </div>
            <ModalGroup />
        </LayoutStyled>
    )
}
