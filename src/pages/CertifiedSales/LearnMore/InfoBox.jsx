import React, { useState } from 'react'
import { InfoBoxStyle } from './styled'
import { Passage } from '../../components/Exhibition'
import { useIsSMDown } from '../../../utils/themeHooks';
export default function InfoBox({ proInfo }) {

    const [curTab, setCurTab] = useState(0)
    const tabMenu = ['Project Info', 'Team Info', 'Token Metrics']
    const isXSDown = useIsSMDown();

    const renderInfo = (tab) => {
        switch (tab) {
            case 'Project Info':
                return <>
                    <Passage
                        width={isXSDown ? '100%' : '480px'}
                        title='Technical highlight'
                    // desc={proInfo && proInfo.techhighlight}
                    >
                        <div>
                            {
                                proInfo && proInfo.techhighlight.split('\n').map(item => {
                                    return <p style={{ marginBottom: 8 }}>{item}</p>
                                })
                            }
                        </div>
                    </Passage>

                    <Passage
                        width={isXSDown ? '100%' : '480px'}
                        title='Architecture'
                        desc={proInfo && proInfo.architecture} />
                </>


            case 'Team Info':
                return <>
                    <Passage
                        width={isXSDown ? '100%' : '480px'}
                        title='Team'
                        desc={proInfo && proInfo.teambio} />
                </>

            case 'Token Metrics':
                return <>
                    <Passage
                        width={isXSDown ? '100%' : '480px'}
                        title='Total supply'
                        desc={proInfo && proInfo.totalsupply} />

                    <Passage
                        width={isXSDown ? '100%' : '480px'}
                        title='Initial circulating supply'
                        desc={proInfo && proInfo.circulatingsupply} />

                    <Passage
                        width={isXSDown ? '100%' : '480px'}
                        title='Token ticketer'
                        desc={proInfo && proInfo.tokenticketer} />

                    <Passage
                        width={isXSDown ? '100%' : '480px'}
                        title='Token contract address'
                        desc={proInfo && proInfo.tokencontractaddress} />

                    <Passage
                        width={isXSDown ? '100%' : '480px'}
                        title='Token distribution'
                        desc={proInfo && proInfo.tokendistribution} />

                    <Passage
                        width={isXSDown ? '100%' : '480px'}
                        title='Token lockup schedule'
                        desc={proInfo && proInfo.tokenlookupschedule} />
                </>
            default:
                return <></>
        }
    }

    return (
        <InfoBoxStyle>
            <ul className='tab_menu'>
                {tabMenu.map((item, index) => {
                    return <li
                        key={index}
                        className={index === curTab ? 'active' : ''}
                        onClick={() => {
                            setCurTab(index)
                        }}
                    >{item}</li>
                })}
            </ul>
            <div className="show_info">
                {renderInfo(tabMenu[curTab])}
            </div>
        </InfoBoxStyle>
    )
}
