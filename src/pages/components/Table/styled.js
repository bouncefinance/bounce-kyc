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
    width: ${({ width }) => { return width ? width : '100%' }};
    height: 48px;
    box-sizing: border-box;
    font-weight: 700;
    cursor: pointer;


    &.white{
        background-color: #fff;
        color: #000;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    &.black{
        background-color: #000;
        color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.2);
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
        .left{
            width: 300px;
            height: 140px;
            border: 1px dotted rgba(0,0,0,.3);
            img{
                margin: 24px auto;
            }
            p{
                font-size: 16px;
                font-weight: 400;
                text-align: center;
            }
        }
        .right{ 
            display: flex;
            align-items: center;
            text-align: left;
            width: 350px;
            height: 140px;
            color: #1F191B;
            font-size: 13px;
            font-weight: 400;
            opacity: .4;
            margin-left: 32px;
        }
    }
`