import styled from 'styled-components'

export const HomeStyled = styled.div`
    color: #fff;
    .page_wrapper{
        width: 1100px;
        height: 100vh;
        margin: 0 auto;
        margin-top: -80px;
        display: flex;
        align-items: center;
        @media screen and (max-width: 960px){
            width: 100%;
            flex-direction: column;
            height: auto;
            margin-top: 0px;
        }
        .main{
            width: 100%;
            height: 525px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media screen and (max-width: 960px){
                flex-direction: column;
                height: auto;
            }
            .left{
                width: 525px;
                height: 525px;
                margin-left: -100px;
                @media screen and (max-width: 960px){
                    width: 100%;
                    height: auto;
                    margin-left: 0px;
                }
            }

            .right{
                width: 675px;
                height: 340px;
                box-sizing: border-box;
                z-index: 1;
                @media screen and (max-width: 960px){
                    width: 100%;
                    height: auto;
                }
                h1{
                    font-family: 'Optima';
                    font-weight: 700;
                    font-size: 58px;
                    margin-bottom: 8px;
                    @media screen and (max-width: 960px){
                        font-size: 28px;
                        padding:0 24px;
                    }
                    span{
                        color: #1D61FF;
                    }
                }

                p{
                    font-family: 'Helvetica Neue';
                    font-weight: 400;
                    font-size: 16px;
                    color: rgba(256,256,256,.5);
                    margin-top: 12px;
                    line-height: 21.76px;
                    @media screen and (max-width: 960px){
                        padding:0 24px;
                    }
                }

                button{
                    width: 232px;
                    height: 48px;
                    background-color: #fff;
                    color: #000;
                    text-align: center;
                    line-height:  48px;
                    font-family: 'Helvetica Neue';
                    font-weight: 700;
                    font-size: 16px;
                    margin-top: 40px;
                    cursor: pointer;
                    @media screen and (max-width: 960px){
                        margin-left:24px;
                    }
                }
            }
        }
    }

    .page_other{
        width: 1100px;
        margin: 0 auto;
        @media screen and (max-width: 960px){
            width: 100%;
            margin-top: 90px;
            padding:0 24px;
        }
        .block{
            h3{
                font-family: 'Optima';
                font-weight: 700;
                font-size: 32px;
                margin-bottom: 40px;
            }

            ul{
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 132px;
                @media screen and (max-width: 960px){
                    flex-direction: column;
                    height: auto;
                }
                li{
                    width: 356px;
                    height: 100%;
                    border-left: 4px solid #1D61FF;
                    position: relative;
                    font-family:'Helvetica Neue';
                    @media screen and (max-width: 960px){
                        width: 100%;
                        padding-bottom:16px;
                    }
                    .bg{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: .2;
                        z-index: 1;
                        background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.4) 100%);
                    }

                    h4{
                        font-weight: 500;
                        font-size: 24px;
                        margin-left: 40px;
                        img{
                            margin-right: 12px;
                            margin-top: 36px;
                        }
                        @media screen and (max-width: 960px){
                            margin-left: 20px;
                            padding-right: 46px;
                        }
                    }

                    p{
                        font-weight: 400;
                        font-size: 15px;
                        color: rgba(256,256,256,.6);
                        margin-left: 40px;
                        margin-top: 6px;
                        @media screen and (max-width: 960px){
                            font-size: 14px;
                            margin-left: 20px;
                        }
                    }
                }
            }
        }

        .Certified {
            margin-top: 140px;
            @media screen and (max-width: 960px){
                margin-top: 80px;
            }
            .step_list{
                position: relative;
                display: flex;
                flex-wrap: wrap;
                height: auto;
                li{
                    width: 100%;
                    height: 114px;
                    box-sizing: border-box;
                    border-color: rgba(256,256,256);
                    opacity: .2;
                    cursor: pointer;
                    @media screen and (max-width: 960px){
                        height: auto;
                        width: auto;
                        padding: 10px 60px 20px 0;
                    }
                    h4{
                        margin-top: 24px;
                        @media screen and (max-width: 960px){
                            font-size: 16px;
                        }
                        i{
                            display: inline-block;
                            width: 28px;
                            height: 28px;
                            box-sizing: border-box;
                            border: 1px solid #fff;
                            border-radius: 50%;
                            font-style: normal;
                            text-align: center;
                            line-height: 26px;
                            margin-right: 16px;
                        }
                    }

                    p{
                        margin-top: 8px;
                        color: #fff;
                    }
                    &:hover{
                        border-color: #1D61FF;
                        opacity: 1;
                        p{
                            opacity: .6;
                        }
                    }

                    &.active{
                        border-color: #1D61FF;
                        opacity: 1;
                        p{
                            opacity: .6;
                        }
                    }

                    
                }
            }
           
        }

        .utility{
            margin-top: 140px;
            h3{
                font-family: 'Optima';
                font-weight: 700;
                font-size: 32px;
                margin-bottom: 40px;  
            }


            .utility_list{
                li{
                    width: 100%;
                    height: 60px;
                    display: flex;
                    @media screen and (max-width: 960px){
                        flex-direction: column;
                        height: auto;
                    }
                    div{
                        height: 60px;
                        line-height: 60px;
                        font-weight: 400;
                        font-style: 24px;

                        &:nth-child(1){
                            width: 260px;
                            margin-right: 68px;
                        }

                        i{
                            display: inline-block;
                            font-style: normal;
                            width: 28px;
                            height: 28px;
                            box-sizing: border-box;
                            border: 1px solid #fff;
                            text-align: center;
                            line-height: 26px;
                            border-radius: 50%;
                            margin-right: 16px;
                        }
                    }
                }
            }
            
           
        }
    }

    .started{
        width: 100%;
        height: 138px;
        box-sizing: border-box;
        position: relative;
        margin-top: 100px;
        @media screen and (max-width: 960px){
            padding:40px 0;
            height: auto;
        }
        .started_bg{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.4) 100%);
            opacity: .2;
            z-index: 1;
        }

        .started_main{
            width: 1100px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 2;
            @media screen and (max-width: 960px){
                width: 100%;
                flex-direction: column;
            }
            h3{
                font-family: 'Optima';
                font-weight: 700;
                font-size: 32px;
                @media screen and (max-width: 960px){
                    font-size: 20px;
                    text-align: center;
                    padding:0 24px;
                    line-height:34px;
                    margin-bottom:24px
                }
            }

            button{
                width: 200px;
                height: 48px;
                box-sizing: border-box;
                border: 1px solid #fff;
                font-family: 'Helvetica Neue';
                font-weight: 700;
                font-size: 16px;
                text-align: center;
                line-height: 46px;
                color: #fff;
                background-color: #000;
                cursor: pointer;
                z-index: 2;
            }
        }
    }

    .backed{
        width: 100%;
        height: 295px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        @media screen and (max-width: 960px){
            height: auto;
        }
        .main{
            width: 1100px;
            height: 160px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            @media screen and (max-width: 960px){
                width: 100%;
                flex-direction: column;
                height: auto;
            }
            h5{
                font-size: 24px;
                font-weight: 400;
                margin-top: 20px;
                @media screen and (max-width: 960px){
                    padding:0 24px;
                }
            }

            ul{
                width: 800px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                @media screen and (max-width: 960px){
                    width: auto;
                    padding:0 24px;
                }
                li{
                    width: 180px;
                    height: 80px;
                    margin-left: 40px;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    @media screen and (max-width: 960px){
                        margin-left: 0;
                        width: 50%;
                    }
                }
            }
        }
    }

    .footer{
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        
        .main{
            width: 1100px;
            height: 100%;
            display:flex;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(256,256,256,.2);
            @media screen and (max-width: 960px){
                width: 100%;
            }

            .link{
                display: flex;
                justify-content: flex-end;
                @media screen and (max-width: 960px){
                    width: 100%;
                    justify-content: space-between;
                    padding:0 24px;
                }
                ul{
                    width: 150px;
                    display: flex;
                    justify-content: space-between;
                }

                p{
                    font-size: 14px;
                    color: rgba(256,256,256,.6);
                    margin-left: 100px;
                    @media screen and (max-width: 960px){
                        color: rgba(256,256,256,1);
                    }
                }
            }
        }
    }
`