const HOST = 'https://account.bounce.finance:16000'

const API_HOST = {
    HOST: HOST,
    KYC: HOST + '/api/v1/updateuserinfo',
    upload: HOST + '/api/v1/fileupload',
    queryKycByAccount: HOST + '/api/v1/queryuserinfobyaccount'
}

export default API_HOST