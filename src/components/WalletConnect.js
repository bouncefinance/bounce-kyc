import React, { useContext, useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { BOUNCE_SELECT_WEB3_CONTEXT } from "../const";
import { formatAddress } from "../utils/format";
import MetaMask from '../assets/images/MetaMask.png'
import MetaMask2 from '../assets/images/MetaMask@2x.png'
import walletConnectIcon from '../assets/images/walletConnectIcon.svg'
import ledger_icon from '../assets/images/Ledger.png'
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { myContext } from '../redux';

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 31337]
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
    Ledger: ledger
}

export const WalletConnect = () => {
    const { state, dispatch } = useContext(myContext);
    const [connectedName, setConnectedName] = useState()

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
        const localContent = window && window.localStorage.getItem(BOUNCE_SELECT_WEB3_CONTEXT)
        // console.log('wallet content', localContent)
        if (localContent) {
            setConnectedName(localContent)
        }
    }, [])


    useEffect(() => {
        // console.log(account, account, library)
        if (account && active && library) {
            dispatch({ type: 'CONNECT_WALLET', value: false });
        }
    }, [account]);

    function onConnect(currentConnector, name) {
        setActivatingConnector(currentConnector);
        setConnectedName(name)
        window && window.localStorage.setItem(BOUNCE_SELECT_WEB3_CONTEXT, name)
        activate(wallets[name]);
    }

    return (
        <div className="modal">

            <div className="modal__box">

                <div className="modal__item modal__item--recieve">

                    <form className="form-recieve" action="/"
                    // novalidate="novalidate"
                    >

                        <h3 className="form-recieve__title">
                            Please select a wallet
                            </h3>

                        <label className="form-recieve__input" click="selectWallet('metamask', $event)">

                            <input
                                style={{ marginRight: 15 }}
                                type="radio"
                                name="modal-form-recieve"
                                className="visuallyhidden"
                                value="MetaMask"
                                value="WalletConnect" checked={connectedName === 'MetaMask'}
                                onChange={() => { }}
                            />

                            <span className="form-recieve__image">
                                <img src={MetaMask}
                                    srcSet={`${MetaMask2} 2x`} alt="" />
                            </span>

                            {connectedName === 'MetaMask' ? (
                                <p className="form-recieve__label">
                                    {account && formatAddress(account)}
                                </p>
                            ) : (
                                    <span className="form-recieve__label" onClick={() => {
                                        onConnect(currentConnector, 'MetaMask')
                                    }}>MetaMask</span>
                                )}


                        </label>

                        <hr />

                        <label className="form-recieve__input" onClick={() => {
                            onConnect(currentConnector, 'WalletConnect')
                        }}>

                            <input
                                style={{ marginRight: 15 }}
                                type="radio" name="modal-form-recieve" className="visuallyhidden"
                                value="WalletConnect" checked={connectedName === 'WalletConnect'}
                                onChange={() => { }}
                            />

                            <span className="form-recieve__image">

                                <img src={walletConnectIcon} alt="" />

                            </span>

                            {connectedName === 'WalletConnect' ? (
                                <p className="form-recieve__label">
                                    {account && formatAddress(account)}
                                </p>
                            ) : (
                                    <span className="form-recieve__label" onClick={() => {
                                        console.log('connect to wallet')
                                        onConnect(currentConnector, 'WalletConnect')
                                    }}>WalletConnect</span>
                                )}

                        </label>

                        <hr />

                        <label className="form-recieve__input" onClick={() => {
                            onConnect(currentConnector, 'Ledger')
                        }}>

                            <input
                                style={{ marginRight: 15 }}
                                type="radio" name="modal-form-recieve" className="visuallyhidden" value="Ledger"
                                checked={connectedName === 'Ledger'}
                                onChange={() => { }}
                            />

                            <span className="form-recieve__image">
                                <img src={ledger_icon} alt="" />
                            </span>

                            {connectedName === 'Ledger' ? (
                                <p className="form-recieve__label">
                                    {account && formatAddress(account)}
                                </p>
                            ) : (
                                    <span className="form-recieve__label" onClick={() => {
                                        onConnect(currentConnector, 'Ledger')
                                    }}>Ledger</span>
                                )}

                        </label>

                    </form>

                </div>

                <button type="button" className="modal__close modal__close-btn button" aria-label="Close modal"
                    onClick={() => {
                        dispatch({ type: 'CONNECT_WALLET', value: false });
                    }}>
                    <svg width={24} height={24} viewBox="0 0 24 24">
                        <path d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z" />
                    </svg>
                </button>

            </div>

        </div>
    )
}
