export const HOST = 'https://account.bounce.finance:16000'
// const API = '/api/v1/'
const API = '/api/test'

// const ENV = '/api/test'
const ENV = '/api/v1'

const API_HOST = {
    HOST: HOST,
<<<<<<< HEAD
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
=======
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
>>>>>>> f887c2c85493ec4ed8a39326a30a3be4c5a30e2e
}

export default API_HOST