import React from 'react'
import { ProgressStyled } from './styled'

export default function Progress({ width, status, title = 'Support from community:', plan, value, total }) {
    const wrapperColor = (status) => {
        switch (status) {
            case 'Active':
                return '#2DAB50'
            case 'Success':
                return '#2DAB50'
            case 'Failed':
                return 'rgba(0, 0, 0, .4)'
            default:
                break;
        }
    }

    const wrapperPlan = (plan) => {
        if (String(plan).indexOf('%') !== -1) {
            return plan
        }
        return parseFloat(plan) * 100 + '%'
    }

    return (
        <ProgressStyled width={width} color={wrapperColor(status)} plan={wrapperPlan(plan)}>
            <div className="top">
                <p className='title'>{title}</p>
                <p className='number'><span>{value}</span> / <span style={{color: wrapperColor(status)}}>{status}</span></p>
            </div>
            <div className='pro_bar'>
                <div className='bar1'></div>
                <div className='bar2'></div>
            </div>
        </ProgressStyled>
    )
}
