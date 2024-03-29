import styled from 'styled-components'

export const CsStyled = styled.div`
    padding-bottom: 50px;
    width: 1100px;
    margin: auto;
    @media screen and (max-width: 960px){
        width: calc( 100% - 48px);
        padding: 0 24px;
    }
    span{
        padding: 4px 11px;
        width: 110px;
        height: 28px;
        box-sizing: border-box;
        border : 1px solid #ccc;
        color: #ccc;

        font-family: 'Helvetica Neue';
        font-weight: 14px;
        line-height: 26px;
        text-align: center;

        &.Active{
            border : 1px solid #2DAF4A;
            color: #2DAF4A;
        }

        &.Upcoming{
            border : 1px solid #1D61FF;
            color: #1D61FF;
            @media screen and (max-width: 960px){
                width: 100% ;
            }
        }

        &.Past{
            border : 1px solid #FF0404;
            color: #FF0404;
        }
    }

`


export const CardStyled = styled.div`
    width: 1100px;
    margin: 0 auto;
    margin-bottom: 15px;
    @media screen and (max-width: 960px){
        width: 100%;
        padding:0;
        margin: 20px auto;
    }
    padding-top: 24px;

    .status{
        margin-bottom: 20px;
        span{
            padding: 4px 11px;
            width: 110px;
            height: 28px;
            box-sizing: border-box;
            border : 1px solid #ccc;
            color: #ccc;

            font-family: 'Helvetica Neue';
            font-weight: 14px;
            line-height: 26px;
            text-align: center;

            &.Active{
                border : 1px solid #2DAF4A;
                color: #2DAF4A;
            }

            &.Upcoming{
                border : 1px solid #1D61FF;
                color: #1D61FF;
            }

            &.Past{
                border : 1px solid #FF0404;
                color: #FF0404;
            }
        }
    }

    .main{
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding: 26px 40px;

        .middle{
            display: flex;
            justify-content: space-between;
            @media screen and (max-width: 960px){
                flex-direction: column;
            }
            .left{
                width: 480px;
                @media screen and (max-width: 960px){
                    width: 100%;
                }
                span.vote{
                    width: fit-content;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    background-color: #2DAF4A;
                    color: #fff;
                    font-size: 14px;
                    margin-top: 16px;
                    display: flex;
                    padding: 0 24px;
                    align-items: center;
                }
                a{
                    display: block;
                    font-size: #124EEB;
                    font-weight: 400;
                    margin-top: 13px;
                    &:hover{
                        text-decoration: underline;
                    }
                }

                .support{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    flex-wrap: wrap;

                    .progress{
                        width: 100%;
                        margin-bottom: 20px;
                    }
                }

                .active_btn{
                    margin-top: 40px;
                    button{
                        margin-right: 12px;
                    }
                }
            }

            .right{
                width: 450px;
                @media screen and (max-width: 960px){
                    width: 100%;
                }
            }
        }

        .bottom{
            margin-top: 40px;

            button{
                margin-right: 12px;
            }
        }
    }
`

export const CardHeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 4px solid #000;
    padding-bottom: 20px;
    
    .title{
        display: flex;
        align-items: center;
        .head_img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #C4C4C4;
            margin-right: 16px;
        }

        h2{
            font-size: 32px;
        }
    }

    ul{
        display: flex;
        align-items: center;
        li{ 
            margin-left: 32px;
            img{
                width: 20px;
                height: 20px;   
            }
        }
    }
`

export const ProgressStyled = styled.div`
    width: ${({ width }) => { return width ? width : '100%' }};
    margin-top: 29px;
    font-weight: 700;
    color: rgba(0,0,0,.4);
    font-size: 13px;
    .top{
        display: flex;
        justify-content: space-between;

        p{
            &.number{
                font-size: 12px;
                color: rgba(0,0,0,.3);
            }
            span:nth-child(1){
                color: #1F191B;
            }

            span:nth-child(2){
                color: ${({ plan }) => { return plan === '100%' ? '#2DAB50' : ' rgba(0, 0, 0, .3)' }};
            }
        }
    }

    .pro_bar{
        width: 100%;
        height: 6px;
        position: relative;
        margin-top: 12px;

        .bar1{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${({ color }) => { return color ? color : '#000' }};
            opacity: .2;
        }

        .bar2{ 
            position: absolute;
            top: 0;
            left: 0;
            width: ${({ plan }) => { return plan ? plan : '0%' }};
            height: 100%;
            background-color: ${({ color }) => { return color ? color : '#000' }};
            opacity: 1;
        }
    }
`

export const SaleCardStyle = styled.div`
    width: 1100px;
    margin: 52px auto;
    @media screen and (max-width: 960px){
        width: 100%;
    }
    .pro_header{
        color: #fff;
        width: 100%;
        height: 28px;
        display: flex;
        justify-content: space-between;

        .pro_tabs{
            display: flex;
            li{
                height: 28px;
                box-sizing: border-box;
                line-height: 26px;
                font-size: 14px;
                padding: 0 14px;
                color: rgba(256,256,256,.4);
                border: 1px solid rgba(256,256,256,.4);
                margin-right:24px;
                cursor: pointer;

                &.Active.active {
                    color: #2DAF4A;
                    border-color: #2DAF4A;
                }

                &.Close.active {
                    color: #124EEB;
                    border-color: #124EEB;
                }
            }
        }
    }
`
