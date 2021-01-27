export const initState = {
    isConnectWallet: false,     // 控制钱包弹出框按钮
    showModal: null,            // 控制模态框的类型 null为关闭
    isShowPersonal: false,      // 控制弹出个人信息栏
    KYC_Status: 0,               // KYC认证状态　 0:未认证,1:已认证 2审核中　3审核失败'
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'MODAL':
            return {
                ...state,
                showModal: action.value
            }
        case 'CONNECT_WALLET':
            return {
                ...state,
                isConnectWallet: action.value
            }

        case 'SHOW_PER':
            return {
                ...state,
                isShowPersonal: action.value
            }

        case 'SET_KYC':
            return {
                ...state,
                KYC_Status: action.value
            }

        default:
            return state
    }
}
