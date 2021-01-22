import React, { useState ,useEffect} from 'react'
import { SelectStyled } from './styled'
import icon_down from '../../../assets/icons/down.svg'

export const Select = ({ label, width, options = [], onChange }) => {
    const [isPull, setIsPull] = useState(false)
    const [selOption, setSelOption] = useState(0)

    useEffect(() => {
        if (options.length === 0) return
        onChange && onChange(options[selOption])
    }, [selOption])

    return (
        <SelectStyled
            width={width}
        >
            {label && <p>{label}</p>}

            <div className='sel_wrapper'>
                <div className="input" onClick={() => {
                    setIsPull(!isPull)
                }}>
                    <span>{options[selOption] ? options[selOption].name : ''}</span>
                    <img className={isPull ? 'up' : 'down'} src={icon_down} alt="" />
                </div>
                {isPull && <ul className='options'>
                    {options.map((item, index) => {
                        return <li
                            key={index}
                            className={index === selOption ? 'active' : ''}
                            onClick={() => {
                                setSelOption(index)
                                setIsPull(false)
                            }}>
                            {item.name}
                        </li>
                    })}
                </ul>}
            </div>
        </SelectStyled>
    )
}
