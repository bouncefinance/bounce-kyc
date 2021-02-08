export const HOST = 'https://account.bounce.finance:16000'

 const ENV = '/api/test'
//const ENV = '/api/v1'

const API_HOST = {
    HOST: HOST,
    KYC: HOST + ENV + '/updateuserinfo',
    addKYC: HOST + ENV + '/adduserinfo',
    sign_KYC: HOST + ENV + '/auth/updateuserinfo',
    sign_addKYC: HOST + ENV + '/auth/adduserinfo',

    upload: HOST + ENV + '/fileupload',
    queryKycByAccount: HOST + ENV + '/queryuserinfobyaccount',
    applySale: HOST + ENV + '/applysaleinfo',
    sign_applySale: HOST + ENV + '/auth/applysaleinfo',

    queryProInfoById: HOST + ENV + '/applysaleinfoquerybyid',
    getOnlineURL: HOST + ENV + '/filedownload',
    queryProInfoByName: HOST + ENV + '/filedownload',
    getSignToken: HOST + ENV + '/auth'
}

export default API_HOST
