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

        .main{
            width: 100%;
            height: 340px;
            display: flex;
            justify-content: space-between;

            .left{
                width: 340px;
                height: 340px;
            }

            .right{
                width: 660px;
                height: 100%;

                h1{
                    font-family: 'Optima';
                    font-weight: 700;
                    font-size: 62px;
                    margin-bottom: 8px;

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
                }
            }
        }
    }

    .page_other{
        width: 1100px;
        margin: 0 auto;

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
                
                li{
                    width: 356px;
                    height: 100%;
                    border-left: 4px solid #1D61FF;
                    position: relative;
                    font-family:'Helvetica Neue';

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
                    }

                    p{
                        font-weight: 400;
                        font-size: 15px;
                        color: rgba(256,256,256,.6);
                        margin-left: 40px;
                        margin-top: 6px;
                    }
                }
            }
        }

        .Certified {
            margin-top: 140px;
            
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

                    h4{
                        margin-top: 24px;

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

        .bg{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.4) 100%);
            opacity: .2;
        }

        .main{
            width: 1100px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;

            h3{
                font-family: 'Optima';
                font-weight: 700;
                font-size: 32px;
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
            }
        }
    }

    .backed{
        width: 100%;
        height: 295px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .main{
            width: 1100px;
            height: 160px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            h5{
                font-size: 24px;
                font-weight: 400;
                margin-top: 20px;
            }

            ul{
                width: 800px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li{
                    width: 180px;
                    height: 80px;
                    margin-left: 40px;
                    text-align: center;
                    display: flex;
                    align-items: center;
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

            .link{
                display: flex;
                justify-content: flex-end;

                ul{
                    width: 150px;
                    display: flex;
                    justify-content: space-between;
                }

                p{
                    font-size: 14px;
                    color: rgba(256,256,256,.6);
                    margin-left: 100px;
                }
            }
        }
    }
`