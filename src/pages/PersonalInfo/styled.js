import styled from 'styled-components'

export const PerInfoStyled = styled.div`
    .main{
        width: 1100px;
        min-height: 466px;
        margin: 80px auto;
        background-color: #fff;
        padding: 30px 40px;
        box-sizing: border-box;

        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 18px;
            border-bottom: 4px solid #000;
            margin-bottom: 24px;

            h1{
                font-size: 32px;
            }

            .address{
                .copy_address{
                    display: flex;
                    align-items: center;
                    p{
                        color: rgba(31,25,27,.4);
                    }

                    img{
                        margin-left: 12px;
                        cursor: pointer;
                    }
                }
            }
        }

        .bottom{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left{
                width: 325px;
                height: 310px;

                img{
                    width: 100%;
                    height: 100%;
                }
            }

            .right{
                width: 600px;
                height: 310px;

                .CertifiedId{
                    display: flex;
                    img{
                        margin-left: 8px;
                        cursor: pointer;
                    }
                }

                .btn_group{
                    margin-top: 30px;
                    button{
                        margin-right: 12px;
                    }
                }
            }
        }
    }
`