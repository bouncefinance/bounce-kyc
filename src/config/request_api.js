export const HOST = 'https://account.bounce.finance:16000'

const API_HOST = {
    HOST: HOST,
    KYC: HOST + '/api/v1/updateuserinfo',
    upload: HOST + '/api/v1/fileupload',
    queryKycByAccount: HOST + '/api/v1/queryuserinfobyaccount',
    applySale: HOST + '/api/v1/applysaleinfo',
    queryProInfoById: HOST + '/api/v1/applysaleinfoquerybyid',
    getOnlineURL: HOST + '/api/v1/filedownload'
}

export default API_HOST
