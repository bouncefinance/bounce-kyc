import styled from 'styled-components'

export const C_S_Styled = styled.div`

`


export const CardStyled = styled.div`
    width: 1100px;
    height: 480px;
    margin: 0 auto;
    margin-top: 53px;
    margin-bottom: 15px;

    .status{
        margin-bottom: 20px;
        span{
            padding: 4px 11px;
            width: 110px;
            height: 28px;
            box-sizing: border-box;
            border : 1px solid #2DAF4A;
            color: #2DAF4A;

            font-family: 'Helvetica Neue';
            font-weight: 14px;
            line-height: 26px;
            text-align: center;
        }
    }

    .main{
        width: 100%;
        height: 436px;
        background-color: #fff;
        padding: 26px 40px;

        .top{
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
                }
            }
        }
    }
`