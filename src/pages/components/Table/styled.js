import styled from 'styled-components'
import icon_tick from '../../../assets/icons/tick.svg'
import icon_tick_white from '../../../assets/icons/tick_white.svg'

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
        span.require{
            color: red;
            margin-left: 4px;
        }
    }
    .input_area{
        display: flex;
        textArea{
            width: ${({ width }) => { return width ? width : '100%' }};
            /* height: ${({ height }) => { return height ? height : '48px' }}; */
            overflow: hidden;
            border: 1px solid rgba(0,0,0,.2);
            box-sizing: border-box;
            font-size: 16px;
            line-height: 19px;
            color: #000;
            /* text-indent: 20px; */
            padding: 15px 20px;
            font-family: 'Helvetica Neue';
            font-weight: 400;

            &.isComplete{
                border: 1px solid rgba(0,0,0,.4);
            }

            &:hover{
                border: 1px solid rgba(0,0,0,.4);
            }

            &:focus{
                border: 1px solid rgba(18,76,227,.8);
            }

            &:disabled{
                opacity: .12;
            }

            &::placeholder{
                color: rgba(0,0,0,.4);
            }

            &.Error{
                border: 1px solid rgba(241,2,2,.4);
                color: rgba(228,63,41,1);
            }
        }
        .unit{
            font-family: 'Helvetica Neue';
            font-weight: 500;
            font-size: 16px;
            margin-left: 8px;
            color: #000;
        }
    }
    

    p.error_msg{
        font-family: 'Helvetica Neue';
        font-size: 12px;
        font-weight: 400;
        color: rgba(228,63,41,1);
        margin-top: 4px;
        margin-bottom: 0px;
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
    width: ${({ width }) => { return width ? width : '100%' }};
    margin-top: 22px;
    .title{
        font-size: 13px;
        color: rgba(0,0,0,.4);
        margin-bottom: 8px;
    }

    .upload_main{
        width: ${({ width }) => { return width ? width : '100%' }};
        height: 140px;
        display: flex;
        justify-content: space-between;
        text-align: center;
        box-sizing: border-box;
        cursor: pointer;
        @media screen and (max-width: 960px){
            flex-direction: column;
            height: auto;
        }
        .left{
            height: 140px;
            border: 1px dotted rgba(0,0,0,.3);
            
            label{
                display: block;
                width: 240px;
                height: 140px;
                position: relative;
                cursor: pointer;
                @media screen and (max-width: 960px){
                    height: auto;
                    width: 100%;
                }
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
                        width: 120px;
                        margin: 0 auto;
                        font-size: 16px;
                        font-weight: 400;
                        text-align: center;
                        @media screen and (max-width: 960px){
                            width: 100%;
                        }
                        span{
                            color: #124CE3;
                            text-decoration: underline;
                        }
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
                /* width: 350px; */
                color: #1F191B;
                font-size: 13px;
                font-weight: 400;
                line-height: 18px;
                opacity: .4;
                margin-left: 32px;
                @media screen and (max-width: 960px){
                    margin-left: 0px;
                }
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
        @media screen and (max-width: 960px){
            word-break: break-all;
        }
    }
`

export const RadioStyled = styled.div`
    width: ${({ width }) => { return width ? width : '100%' }};
    p{
        font-size: 13px;
        color: rgba(0,0,0,.4);
        margin-bottom: 8px;
        font-weight: 500;
        margin-top: ${({ marginTop }) => { return marginTop ? marginTop : '20px' }};
    }

    ul{
        display: flex;
        flex-wrap: wrap;
        margin-top: 5px;
        align-items: center;

        li{
            display: flex;
            align-items: center;
            margin-right: 100px;
            cursor: pointer;

            img{
                margin-right: 12px;
            }

            span{
                font-family: 'Helvetica Neue';
                font-size: 16px;
                color: rgba(31,25,27,1);
                font-weight: 400;
            }
        }
    }
`


export const TimeInputStyled = styled.div`
    width: ${({ width }) => { return width ? width : '100%' }};
    p{
        font-size: 13px;
        color: rgba(0,0,0,.4);
        margin-bottom: 8px;
        font-weight: 500;
        margin-top: ${({ marginTop }) => { return marginTop ? marginTop : '20px' }};

        span.require{
            color: red;
            margin-left: 4px;
        }
    }

    .input_box{
        width: 100%;
        height: 48px;
        display: flex;
        box-sizing: border-box;

        input{
            justify-content: space-between;
            height: 48px;
            border: 1px solid #ccc;
            flex: 1;
            text-indent: 20px;

            margin-right: 12px;

            &:last-child{
                margin-right: 0px;
            }
        }
    }

    p.error_msg{
        font-family: 'Helvetica Neue';
        font-size: 12px;
        font-weight: 400;
        color: rgba(228,63,41,1);
        margin-top: 4px;
        margin-bottom: 0px;
    }
`


export const SelectStyled = styled.div`
    width: ${({ width }) => { return width ? width : '100%' }};
    height: 93px;
    user-select: none;
    p{
        font-size: 13px;
        color: rgba(0,0,0,.4);
        margin-bottom: 8px;
        font-weight: 500;
        margin-top: ${({ marginTop }) => { return marginTop ? marginTop : '20px' }};
        span{
            color: red;
            margin-left: 4px;
        }
    }

    .sel_wrapper{
        width: 100%;
        position: relative;

        .input{
            height: 48px;
            line-height: 48px;
            text-indent: 20px;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid rgba(0,0,0,.4);
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            img{
                width: 20px;
                margin-right: 18.5px;
                &.up{
                    transform: rotateZ(180deg);
                    transition: all .5s;
                }
            }
        }

        .options{
            width: 100%;
            max-height: 300px;
            border: 1px solid #EAEAEA;
            box-sizing: border-box;
            margin-top: 5px;
            box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            z-index: 5;
            overflow: hidden;
            overflow-y: scroll;

            li{
                height: 42px;
                display: flex;
                align-items: center;
                text-indent: 43px;
                cursor: pointer;

                &:hover{
                    background-color: #000;
                    color: #fff;
                }

                &.active{
                    background: url(${icon_tick}) no-repeat;
                    background-position: 16px center;
                    background-size: 13px 8px;

                    &:hover{
                        background: url(${icon_tick_white}) no-repeat;
                        background-position: 16px center;
                        background-size: 13px 8px;
                        background-color: #000;
                        color: #fff;
                    }
                }

            }
        }
    }
`

export const AmountStyled = styled.div`
    position: relative;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    /*火狐*/
    input[type="number"] {
        -moz-appearance: textfield;
    }

    input{
        color: #000;
        width: 100px;
        text-indent: 12px;
        margin-left: 8px;
        border-bottom: 1px solid rgba(0,0,0,.6);
        &.error{
            border-bottom: 1px solid rgba(228,63,41,1);
        }
    }

    p.errMsg{
        position: absolute;
        top: 3px;
        left: 16px;
        color: rgba(228,63,41,1);
    }
`
