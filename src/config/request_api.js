export const HOST = 'https://account.bounce.finance:16000'

const API_HOST = {
    HOST: HOST,
    KYC: HOST + '/api/v1/updateuserinfo',
    sign_KYC: HOST + '/api/v1/auth/updateuserinfo',

    upload: HOST + '/api/v1/fileupload',
    queryKycByAccount: HOST + '/api/v1/queryuserinfobyaccount',
    applySale: HOST + '/api/v1/applysaleinfo',
    sign_applySale: HOST + '/api/v1/auth/applysaleinfo',
    
    queryProInfoById: HOST + '/api/v1/applysaleinfoquerybyid',
    getOnlineURL: HOST + '/api/v1/filedownload',
    queryProInfoByName: HOST + '/api/v1/filedownload',
    getSignToken: HOST + '/api/v1/auth'
}

export default API_HOST