import React, { useContext, useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { BOUNCE_SELECT_WEB3_CONTEXT } from "../const";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { myContext } from '../redux';
import Confirm from '../pages/components/Modal/Confirm'
import WalletItem from './WalletItem'
import icon_matemask from '../assets/icons/matemask.svg'
import icon_walletconnect from '../assets/icons/walletconnect.svg'
// import icon_ledger from '../assets/images/Ledger.png'


const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 31337]
});

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    1: "https://eth-mainnet.alchemyapi.io/v2/k2--UT_xVVXMOvAyoxJYqtKhlmyBbqnX",
    // 1: "https://eth-mainnet.alchemyapi.io/v2/k2--UT_xVVXMOvAyoxJYqtKhlmyBbqnX",
    4: "https://rinkeby.infura.io/v3/8f6d3d5d7a1442a38d9e8050c31c1884"
};

const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC_URLS[1] },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL
});

const ledger = new LedgerConnector({
    chainId: 1,
    url: RPC_URLS[1],
    pollingInterval: POLLING_INTERVAL
});

const wallets = {
    MetaMask: injected,
    WalletConnect: walletconnect,
    Ledger: ledger
}

export const WalletConnect = () => {
    const { dispatch } = useContext(myContext);

    const [activatingConnector, setActivatingConnector] = useState();
    const [currentConnector] = useState();

    const {
        connector,
        library,
        account,
        activate,
        active,
    } = useWeb3React()

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector]);


    useEffect(() => {
        // console.log(account, account, library)
        if (account && active && library) {
            dispatch({ type: 'CONNECT_WALLET', value: false });
        }
    }, [account]);

    function onConnect(currentConnector, name) {
        setActivatingConnector(currentConnector);
        window && window.localStorage.setItem(BOUNCE_SELECT_WEB3_CONTEXT, name)
        activate(wallets[name]);
    }

    return (
        <Confirm
            title='Connect to a wallet'
            tip="To participate in Bounce you first need to connect a wallet. Please select an option below. You can also connect a Ledger via your Metamask."
        >

            <div style={{ marginTop: 28 }}>
                <WalletItem name='MetaMask' icon={icon_matemask} onClick={() => {
                    onConnect(currentConnector, 'MetaMask')
                }} />
                <WalletItem name='WalletConnect' icon={icon_walletconnect} onClick={() => {
                    onConnect(currentConnector, 'WalletConnect')
                }} />

                {/* <WalletItem name='Ledger' icon={icon_ledger} onClick={() => {
                    onConnect(currentConnector, 'Ledger')
                }} /> */}
            </div>
        </Confirm>

    )
}
