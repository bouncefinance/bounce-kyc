import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LayoutStyled } from './styled'
import HeaderTab from './components/HeaderTab'
import ModalGroup from './components/Modal'
import Kyc from './Kyc'
import PersonalInfo from './PersonalInfo'
import Home from './Home'
import CertifiedSales from './CertifiedSales'
import LearnMore from './CertifiedSales/LearnMore'
import Detail from './CertifiedSales/Detail'
import ProjectList from './ProjectList'
import { myContext } from '../redux'
import { Apply } from "./CertifiedSales/Apply";
import ApplySale from './ApplySale'
import { FSPoolDetail } from "./FixedSwap/Detail";
import { LotteryNFTDetail } from "./LotteryNFT1155/Detail";

import RestrictedIpProvider from '../RestrictedIpProvider.jsx'


export default function Index() {
    const { state, dispatch } = useContext(myContext)

    const initPerModal = (e) => {
        const className = e.target.className
        // console.log(className)
        if (state.isShowPersonal && String(className).indexOf('ignore') === -1) {
            dispatch({
                type: "SHOW_PER",
                value: false
            })
        }
    }

    return (
        <LayoutStyled
            onClick={initPerModal}
        >
            <div className="mainView">
                <HeaderTab />

                <RestrictedIpProvider>
                    <Switch>
                        <Route path='/' exact render={() => { return <Redirect to='/home' /> }} />
                        <Route path='/home' exact component={Home} />
                        <Route path='/kyc' exact component={Kyc} />
                        <Route path='/applySale' exact component={ApplySale} />
                        <Route path='/PersonalInfo' exact component={PersonalInfo} />
                        <Route path='/certified-sales' exact component={CertifiedSales} />
                        <Route path='/certified-sales/:poolId' exact component={Detail} />
                        <Route path='/learn-more/:poolId' exact component={LearnMore} />
                        <Route path='/fixed-swap/:poolId' exact component={FSPoolDetail} />
                        <Route path='/bsc/fixed-swap/:poolId' exact component={FSPoolDetail} />
                        <Route path='/heco/fixed-swap/:poolId' exact component={FSPoolDetail} />
                        <Route path='/lottery-nft/:id' exact component={LotteryNFTDetail} />
                        <Route path='/bsc/lottery-nft/:id' exact component={LotteryNFTDetail} />
                        <Route path='/project-voting-board' exact render={() => { return <Redirect to='/project-voting-board/active' /> }} />
                        <Route path='/project-voting-board/:type' exact component={ProjectList} />
                        <Route path='/project-apply' exact component={Apply} />
                    </Switch>
                </RestrictedIpProvider>
            </div>
            <ModalGroup />
        </LayoutStyled>
    )
}
