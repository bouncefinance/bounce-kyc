export const HOST = 'https://account.bounce.finance:16000'
// const API = '/api/v1/'
const API = '/api/test'

const API_HOST = {
    HOST: HOST,
    KYC: HOST + API + '/updateuserinfo',
    sign_KYC: HOST + API + '/auth/updateuserinfo',

    upload: HOST + API + '/fileupload',
    queryKycByAccount: HOST + API + '/queryuserinfobyaccount',
    applySale: HOST + API + '/applysaleinfo',
    sign_applySale: HOST + API + '/auth/applysaleinfo',

    queryProInfoById: HOST + API + '/applysaleinfoquerybyid',
    getOnlineURL: HOST + API + '/filedownload',
    queryProInfoByName: HOST + API + '/filedownload',
    getSignToken: HOST + API + '/auth'
}

export default API_HOST