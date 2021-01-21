import styled from 'styled-components'

export const FormStyled = styled.form`
    width: ${({ width }) => { return width ? width : '100%' }};
    margin-top: ${({ marginTop }) => { return marginTop ? marginTop : '0px' }};
    .children{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`

export const InputStyled = styled.div`
    width: ${({ width }) => { return width ? width : '100%' }};
    p{
        font-size: 13px;
        color: rgba(0,0,0,.4);
        margin-bottom: 8px;
        font-weight: 500;
        margin-top: ${({ marginTop }) => { return marginTop ? marginTop : '20px' }};
    }

    input{
        height: 48px;
        width: ${({ width }) => { return width ? width : '100%' }};
        border: 1px solid rgba(0,0,0,.4);
        box-sizing: border-box;
        font-size: 16px;
        color: #000;
        text-indent: 20px;

        &::placeholder{
            color: rgba(0,0,0,.4);
        }
    }
`

export const ButtonStyled = styled.button`
    width: ${({ width }) => { return width ? width : '100%' }};
    height: ${({ height }) => { return height ? height : '48px' }};
    box-sizing: border-box;
    font-weight: 700;
    cursor: pointer;


    &.white{
        background-color: #fff;
        color: #000;
        border: 1px solid rgba(0, 0, 0, 0.2);

        &.disabled{
            background-color: #ccc;
        }
    }

    &.black{
        background-color: #000;
        color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.2);

        &.disabled{
            background-color: #ccc;
        }
    }
`

export const UploadStyled = styled.div`
    width: 100%;
    margin-top: 22px;
    .title{
        font-size: 13px;
        color: rgba(0,0,0,.4);
        margin-bottom: 8px;
    }

    .main{
        height: 140px;
        display: flex;
        justify-content: space-between;
        text-align: center;
        cursor: pointer;
        .left{
            height: 140px;
            border: 1px dotted rgba(0,0,0,.3);
            label{
                display: block;
                width: 240px;
                height: 140px;
                position: relative;
                cursor: pointer;

                input,.upload_select,.cover{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }

                input{
                    opacity: 0;
                }
                .upload_select{
                    z-index: 1;
                    img{
                        margin: 24px auto;
                    }
                    
                    p{
                        width: 125px;
                        margin: 0 auto;
                        font-size: 16px;
                        font-weight: 400;
                        text-align: center;
                    }
                }

                .cover{
                    z-index: 2;
                }
            }
        }
        .right{ 
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            p{
                text-align: left;
                width: 350px;
                color: #1F191B;
                font-size: 13px;
                font-weight: 400;
                opacity: .4;
                margin-left: 32px;
            }

            .btn_grop{
                margin-left: 32px;
                button{
                    margin-right: 20px;
                    cursor: pointer;
                }
            }
        }
    }
`

export const TextStyled = styled.div`
    p.label{
        font-size: 13px;
        color: rgba(0,0,0,.4);
        margin-bottom: 8px;
        font-weight: 500;
        margin-top: ${({ marginTop }) => { return marginTop ? marginTop : '20px' }};
    }

    p.desc{
        font-size: 16px;
        color: rgba(0,0,0,1);
        font-weight: 400;
    }
`