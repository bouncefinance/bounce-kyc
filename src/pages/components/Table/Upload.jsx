import React, { useState } from 'react'
import axios from 'axios'
import { UploadStyled } from './styled'
import upload_img from '../../../assets/images/upload-img.svg'
import { Button } from '../Table'
import API_HOST from '../../../config/request_api'

export const Upload = ({
    title = 'Project logo',
    desc = "Please upload photo of page with iD number and photo Supports JPG, PNG, JPEG2000",
    successCallBack,
    name,
    width
}) => {

    const [coverSrc, setCoverSrc] = useState(null)
    const [formData, setFormData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [uploadRes, setUploadRes] = useState('')

    const handelFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        // console.log(file)
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' ) {
            let reader = new FileReader();  //调用FileReader
            reader.readAsDataURL(file); //将文件读取为 DataURL(base64)
            reader.onload = function (evt) {   //读取操作完成时触发。
                setCoverSrc(evt.target.result)  //将img标签的src绑定为DataURL
            }
            let formData = new FormData()
            formData.append('filename', file)
            setFormData(formData)
        } else {
            alert('The file format you selected is incorrect')
        }
    }

    const handelUploadSubmit = () => {
        setIsLoading(true)
        const config = {
            headers: { "Content-Type": "multipart/form-data;boundary=" + new Date().getTime() }
        }

        axios
            .post(API_HOST.upload, formData, config)
            .then(function (response) {
                // console.log(response);
                if (response.data.code === 200) {
                    successCallBack(response.data.result.path)
                    setUploadRes('Success')
                } else {
                    setUploadRes('Error')
                }
            })
            .catch(function (error) {
                setUploadRes('Error')
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <UploadStyled width={width}>
            {title && <p className='title'>{title}</p>}
            <div className="upload_main">
                <div className="left">
                    <label htmlFor={'upload_img_' + name}>
                        {coverSrc && <img className='cover' src={coverSrc} alt="" />}
                        <div className="upload_select">
                            <img src={upload_img} alt={'upload_img_' + name} />
                            <p>Drop logo here or <span>upload</span></p>
                        </div>
                        <input  accept="image/*" type="file" name={'upload_img_' + name} id={'upload_img_' + name} onChange={handelFileChange} />
                    </label>


                </div>

                <div className="right">
                    <p>{desc}</p>
                    {coverSrc && <div className="btn_grop">
                        <Button onClick={() => {
                            setCoverSrc(null)
                            successCallBack(null)
                            setUploadRes('')
                        }} value='Reset' type='white' width='100px' height='30px' />
                        {isLoading ?
                            <Button disabled value='uploading...' type='black' width='120px' height='30px' /> :
                            <Button value='Confirm' type='black' width='100px' height='30px'
                                onClick={handelUploadSubmit}
                            />}

                        <span className={uploadRes === 'Success' ? 'success' : 'error'}>{uploadRes}</span>
                    </div>}
                </div>
            </div>
        </UploadStyled>
    )
}
