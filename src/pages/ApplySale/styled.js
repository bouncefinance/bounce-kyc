import styled from 'styled-components'

export const ApplySaleStyled = styled.div`
    .main{
        width: 1100px;
        min-height: 402px;
        box-sizing: border-box;
        background-color: #fff;
        margin: 0 auto;
        padding: 30px 40px;

        .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 55px;
            border-bottom: 4px solid #000;
            padding-bottom: 18px;
            box-sizing: border-box;
            margin-bottom: 24px;

            h1{
                font-size: 32px;
            }

            p{
                font-weight: 400;
                font-size: 24px;
                color: rgba(0,0,0,.8);
            }
        }
    }

    ul.add_append{
        margin-top: 18px;
        display: flex;

        li{
            font-family: 'Helvetica Neue';
            font-weight: 500;
            font-size: 12px;
            color: rgba(0,0,0,.4);
            margin-right: 28px;
            text-decoration: underline;
            cursor: pointer;

            &.soc_active{
                color: rgba(18,76,227,1);
            }

            &:hover{
                color: rgba(18,76,227,1);
            }
        }


    }
`
export const StepStyled = styled.div`
    .btn_group{
        margin-top: 24px;
        button{
            margin-right: 12px;
        }
    }
`

export const Step1Styled = styled.div`
    p.tip{
        font-family: 'Helvetica Neue';
        font-weight: 400;
        font-size: 16px;
        color: 3000;

        span{
            font-weight: 500;
            color: rgba(18,78,235,1);
        }
    }

    .btn_group{
        margin-top: 40px;
        button{
            margin-right: 12px;
        }
    }
`

export const Step2Styled = styled.div`
    .btn_group{
        margin-top: 24px;
        button{
            margin-right: 12px;
        }
    }
`

export const Step3Styled = styled.div`
    .btn_group{
        margin-top: 24px;
        button{
            margin-right: 12px;
        }
    }
`

export const Step4Styled = styled.div`
    .btn_group{
        margin-top: 24px;
        button{
            margin-right: 12px;
        }
    }
`


export const Step5Styled = styled.div`
    .btn_group{
        margin-top: 36px;
        button{
            margin-right: 12px;
        }
    }

    .select_group{
        width: 600px;
        display: flex;
        justify-content: space-between;
    }
`

export const Step6Styled = styled.div`
    .btn_group{
        margin-top: 36px;
        button{
            margin-right: 12px;
        }
    }
`