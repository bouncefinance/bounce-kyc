import styled from 'styled-components'

export const PerInfoStyled = styled.div`
    .main{
        width: 1100px;
        min-height: 466px;
        margin: 80px auto;
        background-color: #fff;
        padding: 30px 40px;
        box-sizing: border-box;
        @media screen and (max-width: 960px){
            width: 100%;
        }
        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 18px;
            border-bottom: 4px solid #000;
            margin-bottom: 24px;
            @media screen and (max-width: 960px){
                flex-direction: column;
            }

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
                @media screen and (max-width: 960px){
                    width: 100%;
                    height: auto;
                }
                .CertifiedId{
                    display: flex;
                    img{
                        margin-left: 8px;
                        cursor: pointer;
                    }

                    p{
                        font-family: 'Helvetica Neue';
                        font-size: 16px;
                        color: #000;
                        font-weight: 400;

                        span{
                            color: #124EEB;
                            margin-left:5px;
                            cursor: pointer;
                            text-decoration: underline;

                            &:hover{
                                font-weight: 500;
                            }
                        }
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