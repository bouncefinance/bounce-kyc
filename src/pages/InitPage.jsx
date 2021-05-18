import React, { useContext, useEffect } from 'react'
import { WalletConnect } from "../components/WalletConnect";
import { useWeb3React } from "@web3-react/core";
import { mainContext } from "../reducer";
import { BOUNCE_SELECT_WEB3_CONTEXT } from "../const";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56,128, 31337]
});

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    1: "https://eth-mainnet.alchemyapi.io/v2/k2--UT_xVVXMOvAyoxJYqtKhlmyBbqnX",
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
    Ledger: ledger,
    //TrustWallet: injected,
    //Squarelink: squarelink,
    //Torus: torus,
    //Aut
}

export const InitPage = () => {

    const context = useWeb3React();
    const { activate } = context;

    const { state } = useContext(mainContext);

    useEffect(() => {
        const localContent = window && window.localStorage.getItem(BOUNCE_SELECT_WEB3_CONTEXT)
        // console.log('wallet content', localContent)
        if (localContent) {
            // console.log('activate', wallets[localContent])
            activate(wallets[localContent]);
        }
    }, [])

    return <></>

    // return (
    //     <>
    //         {showConnectModal && (
    //             <div className="modal-show">
    //                 <div className="wrapper">
    //                     <WalletConnect/>
    //                 </div>
    //             </div>
    //         )}
    //         </>

    // )
}
