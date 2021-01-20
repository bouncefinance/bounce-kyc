export const initState = {
    isConnectWallet: false,
    showModal: null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'MODAL':
            return {
                ...initState,
                showModal: action.value
            }
        case 'CONNECT_WALLET':
            return {
                ...initState,
                isConnectWallet: action.value
            }

        default:
            return state
    }
}