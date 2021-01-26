import axios from "axios"

import API from '../../config/request_api'

export const queryIsKyc = async (address) => {
    const res = await axios.post(API.queryKycByAccount, { accountaddress: address })
    if (res.status === 200 && res.data.code === 1) {
        const bounceid = res.data.data.bounceid
        if (bounceid > 0) {
            return true
        }
    }
    return false
}