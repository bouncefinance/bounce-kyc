import styled from 'styled-components'

export const KycStyled = styled.div`
    .container{
        width: 1100px;
        min-height: 528px;
        margin: 80px auto;
        background-color: #fff;
        padding: 30px 40px;

        .top{
            display: flex;
            justify-content: space-between;
            border-bottom: 4px solid #000;
            padding-bottom: 18px;

            h3{
                font-size: 32px;
            }

            p{
                font-family: 'Helvetica Neue';
                font-size: 24px;
                font-weight: 400;
            }
        }

        .bottom{
            min-height: 420px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .right{
                width: 600px;

                .btn_group{
                    margin-top: 26px;
                    button{
                        margin-right: 12px;
                    }
                }
            }
        }
    }
`