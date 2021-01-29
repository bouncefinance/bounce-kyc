import React from 'react'
import { Kyc_Tip_Styled } from './styled'
import cancel_img from '../../../assets/images/cancel.svg'
import { Button } from '../../components/Table'

export default function KYC_TIP ({ cancel, confirm }) {
    return (
        <Kyc_Tip_Styled>
            <div className="top">
                <h1 className="title">Warning!</h1>
                <img src={cancel_img} alt="" onClick={cancel} />
            </div>
            <div className="main">
                <h5><span>Please note.</span>The sale is only open to non-U.S. persons and entities.
                All registrants must meet eligibility requirements to participate.</h5>

                <p className='min_tip'>The sale is not and will not be offered or sold, directly or indirectly, to any person who is a resident, organized, or located in any country or territory subject to OFAC comprehensive sanctions programs from time to time, including Cuba, Crimea region of Ukrain, Democratic people’s Republic of Korea, Iran, Syria, any person found on the OFAC specially designated nationals, blocked persons list, any other consolidated prohibited persons list as determined by any applicable governmental authority.</p>

            </div>
            <div className="bottom">
                <Button type='white' value='Not Now' width='124px' onClick={cancel} />
                <Button type='black' value='Confirm' width='124px' onClick={confirm && confirm.callback} />
            </div>
        </Kyc_Tip_Styled>
    )
}
