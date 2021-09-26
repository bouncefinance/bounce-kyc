import React, { useEffect, useState } from 'react'
import Modal, { ModalContent, ModalTitle } from "./components/common/Modal";
import axios from 'axios'

export default function RestrictedIpProvider({ children }) {

    const [isPassIp, setIsPassIp] = useState(true)

    useEffect(() => {
        (async () => {
            const res = await axios.get('https://geolocation-db.com/json/')
            // const res = await axios.get('https://proof.ccian.cc/proof/ip/1')
            // 获取 IP 网络信息
            // 排错
            if (!res || !res.data) return
            const { country_code } = res.data
            // 屏蔽中国和美国的 IP
            if (!country_code || country_code === 'CN' || country_code === 'HK' || country_code === 'TW') {
                setIsPassIp(false)
            }
        })()
    }, [])

    return (isPassIp ? <div>
        {children}
    </div> : <div>
        <Modal isOpen={true} maxWidth={800}>
            <ModalTitle style={{
                width: '90%',
                marginLeft: '5%'
            }}>
                Service Not Available in Your Region
            </ModalTitle>
            <ModalContent style={{
                width: '90%',
                marginLeft: '5%'
            }}>
                Sorry! For compliance reasons, this service is not accessible in your area. Use of VPN, Tor, proxies or other means to circumvent this restriction is a violation of our Terms of Service. For details, please see our Terms of Service.
                Please note.The dapp is only open to non-U.S. and non-China persons and entities. All registrants must meet eligibility requirements to participate.
                <p />
                The dapp is not and will not be offered or sold, directly or indirectly, to any person who is a resident, organized, or located in any country or territory subject to OFAC comprehensive sanctions programs from time to time, including Cuba, Crimea region of Ukraine, Democratic people’s Republic of Korea, Iran, Syria, any person found on the OFAC specially designated nationals, blocked persons list, any other consolidated prohibited persons list as determined by any applicable governmental authority.
            </ModalContent>
        </Modal>
    </div>)
}
