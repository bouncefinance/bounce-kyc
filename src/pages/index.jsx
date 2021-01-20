import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LayoutStyled } from './styled'
import HeaderTab from './components/HeaderTab'
import ModalGroup from './components/Modal'
import Kyc from './Kyc'
import Home from './Home'
import CertifiedSales from './CertifiedSales'
import LearnMore from './CertifiedSales/LearnMore'
import Detail from './CertifiedSales/Detail'
import ProjectList from './ProjectList'


export default function Index() {

    return (
        <LayoutStyled>
            <div className="mainView">
                <HeaderTab />
                <Switch>
                    <Route path='/kyc' exact component={Kyc} />
                    <Route path='/' exact render={() => { return <Redirect to='/home' /> }} />
                    <Route path='/home' exact component={Home} />
                    <Route path='/certified-sales' exact component={CertifiedSales} />
                    <Route path='/certified-sales/:poolId' exact component={Detail} />
                    <Route path='/learn-more/:poolId' exact component={LearnMore} />
                    <Route path='/project-voting-board' exact component={ProjectList} />
                </Switch>
            </div>
            <ModalGroup />
        </LayoutStyled>
    )
}
