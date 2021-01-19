import React from 'react'
import { UploadStyled } from './styled'
import upload_img from '../../../assets/images/upload-img.svg'

export const Upload = ({
    title = 'Passport Photo',
    tip = 'Drop logo here or upload',
    desc = "Please upload photo where your face will be clearly visible Supports JPG, PNG, JPEG2000" }) => {
    return (
        <UploadStyled>
            {title && <p className='title'>{title}</p>}
            <div className="main">
                <div className="left">
                    <img src={upload_img} alt="upload_img" />
                    <p>{tip}</p>
                </div>

                <div className="right">
                    {desc}
                </div>
            </div>
        </UploadStyled>
    )
}
