import axios from 'axios'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import API from '../config/request_api'

const signStr = 'Welcome to Bounce!'

export default function useAxios() {

    const { account, library } = useWeb3React()

    const getNewToken = async () => {
        const web3 = new Web3(library.provider);
        const sign = await web3.eth.personal.sign(signStr, account)

        const params = {
            "accountaddress": account,
            "message": signStr,
            "signature": sign
        }

        const res_getSignToken = await axios.post(API.getSignToken, params)
        if (res_getSignToken.status === 200 && res_getSignToken.data.code === 200) {
            const { token } = res_getSignToken.data.data
            window.localStorage.setItem('JWT_TOKEN', token)
            return token
        } else {
            return null
        }
    }


    const sign_Axios_Post = async (host, params, option = {}) => {
        let token = window.localStorage.getItem('JWT_TOKEN')
        if (!token) {
            token = await getNewToken()
        }

        let config = {
            ...option,
            headers: {
                token: token
            }
        }

        let res = await axios.post(host, params, config)
        if (res.status === 200 && res.data.code === -1) {
            // token 无效过期
            token = await getNewToken()
            config = {
                ...option,
                headers: {
                    token: token
                }
            }
            res = await axios.post(host, params, config)
        }

        return res
    }

    return {
        sign_Axios: {
            get: null,
            post: sign_Axios_Post
        }
    }
}
