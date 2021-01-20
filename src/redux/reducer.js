export const initState = {
    isLogin: false,
    account: null,
    chainId: 1,
    showModal: null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'MODAL':
            return {
                ...initState,
                showModal: action.value
            }

        default:
            return state
    }
}