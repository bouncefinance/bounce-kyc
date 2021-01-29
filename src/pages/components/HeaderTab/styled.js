import styled from 'styled-components'
import icon_kyc from './assets/icon-kyc.svg'
import icon_kyc_sel from './assets/icon-kyc-sel.svg'
import icon_acs from './assets/icon-acs.svg'
import icon_acs_sel from './assets/icon-acs-sel.svg'
import icon_pi from './assets/icon-pi.svg'
import icon_pi_sel from './assets/icon-pi-sel.svg'
// console.log('icon_kyc',icon_kyc)

export const HeaderTabStyled = styled.div`
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    align-items: center;

    .container{
        width: 1100px;
        height: 100%;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        position: relative;
        @media screen and (max-width: 960px){
            background-color:#000;
            width: 100%;
            padding:0 24px;
        }
        .right{
            display: flex;
            ul{
                display: flex;
                align-items: center;
                li{
                    font-size: 16px;
                    margin-left: 32px;
                    color: rgba(0,0,0,.4);
                    cursor: pointer;

                    &.active{
                        color: rgba(0,0,0,1);
                    }
                }
            }
            .menu{
                cursor:pointer;
            }

            .personal{
                width: 28px;
                height: 28px;
                border-radius: 50%;
                margin-left: 35px;
                cursor: pointer;
                background: linear-gradient(154.16deg, #306AFF 6.12%, #3E74FE 49.44%, #003BD3 89.29%);
            }
        }
    }
`


export const PerModalStyled = styled.div`
    position: absolute;
    right: 0;
    top: 80px;
    width: 220px;
    border: 1px solid #EAEAEA;
    background-color: #fff;
    user-select: none;
    z-index: 99;

    .account{
        padding: 12px 24px;
        font-family: 'Helvetica Neue';

        .account_name{
            display: flex;
            h5{
                font-weight: 700;
                font-size: 16px;
            }
            img{
                width: 16px;
                height: 16px;
                margin-left: 8px;
            }
        }

        .account_address{
            display: flex;
            align-items: center;
            padding: 0;
            p{
                font-size: 14px;
                font-weight: 500;
                color: rgba(0,0,0,.4);
                margin-top: 9px;
                width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            img{
                margin-left: 8px;
                cursor: pointer;
            }
        }
    }

    ul{
        li{ 
            padding: 12px 24px;
            font-size: 14px;
            color: #1F191B;
            display: flex;
            cursor: pointer;
            
            span{
                font-family: 'Helvetica Neue';
                font-weight: 500;
                font-size: 14px;
                color: rgba(31,25,27,.8);
            }

            &:hover{
                background-color: #000;
            }

            &:hover span{
                color: #fff;
            }

            i{
                display: block;
                width: 16px;
                height: 16px;
                margin-right: 16px;
                background-size: contain;
                background-position: 0 0;
                &.kyc{
                    background: url('${icon_kyc}') no-repeat;
                }

                &.pi{
                    background: url('${icon_pi}') no-repeat;
                }

                &.acs{
                    background: url('${icon_acs}') no-repeat;
                }
            }

            
            &:hover i{
                &.kyc{
                    background: url('${icon_kyc_sel}') no-repeat;
                }

                &.pi{
                    background: url('${icon_pi_sel}') no-repeat;
                }

                &.acs{
                    background: url('${icon_acs_sel}') no-repeat;
                }
            }
        }
    }
`


export const MenuModalStyled = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    user-select: none;
    z-index: 99;
    color:#fff;
    .account{
        display:flex;
        padding: 26px 24px;
        font-family: 'Helvetica Neue';
        justify-content: space-between;
        img{
            cursor: pointer;
        }
    }
    #right{
        padding-top:100px;
        flex-direction:column;
        ul{
            flex-direction:column;
            align-items: flex-start;
            width:100%;
            li{
                color:#fff;
                font-family: Optima;
                font-style: normal;
                font-weight: bold;
                font-size: 30px;
                line-height: 36px;
                margin-bottom:36px;
                width:100%;
                opacity: 0.4;
            }
            .active{
                opacity: 1;
            }
        }
        .black{
            width:86%;
            margin:50px auto 0;
            height:48px;
            line-height:48px;
            color:#000;
            background-color:#fff;
        }
        .cancel{
            width:86%;
            margin:16px auto 0;
            height:48px;
            line-height:48px;
            border:1px solid rgba(255, 255, 255, 0.2);
            text-align:center;
            cursor: pointer;
        }
    }
`
