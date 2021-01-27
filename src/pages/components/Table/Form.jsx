import React, { useEffect } from 'react'
import { FormStyled } from './styled'

export const Form = ({ title, width, children, marginTop }) => {
    return (
        <FormStyled width={width} marginTop={marginTop}>
            {title && <h5>{title}</h5>}

            <div className="children">
                {children}
            </div>
        </FormStyled>
    )
}


