export const initState = {
    isConnectWallet: false,     // 控制钱包弹出框按钮
    showModal: null,            // 控制模态框的类型 null为关闭
    isShowPersonal: false       // 控制弹出个人信息栏
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

        case 'SHOW_PER':
            return {
                ...initState,
                isShowPersonal: action.value
            }

        default:
            return state
    }
}