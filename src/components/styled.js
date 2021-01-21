import styled from 'styled-components'

export const WalletItemStyled = styled.form`
    ul{
        li{
            display: flex;
            justify-content: space-between;
            width: 100%auto;
            height: 52px;
            box-sizing: border-box;
            border:1px solid rgba(0,0,0,.2);
            align-items: center;
            margin-top: 16px;
            cursor: pointer;

            .left{
                display: flex;
                align-items: center;
                div{
                    width: 32px;
                    height: 32px;
                    margin-right: 17px;
                    margin-left: 21px;
                }

                h5{
                    font-family: 'Optima';
                    font-weight: 700;
                    font-size: 16px;
                }
            }

            .right{
                margin-right: 21px;
            }
        }
    }
`