import styled from 'styled-components'

export const LearnMoreStyle = styled.div`
    width: 1100px;
    min-height: 680px;
    background-color: #fff;
    margin: 0 auto;
    padding: 27px 40px;
    box-sizing: border-box;

    .main{
        display: flex;
        justify-content: space-between;

        .left{
            width: 480px;

            a{
                text-decoration: underline;
                display: block;
                margin-top: 13px;
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
        }

        .right{
            width: 450px;
        }
    }

    .btn_group{
        margin-top: 24px;
    }
`

export const InfoBoxStyle = styled.div`
    margin-top: 48px;
    ul.tab_menu{
        display: flex;
        border-bottom: 2px solid rgba(0,0,0,.1);
        user-select: none;

        li{
            font-family: 'Helvetica Neue';
            font-size: 16px;
            font-weight: 500;
            padding-bottom: 7px;
            color: rgba(0,0,0,.4);
            margin-right: 36px;
            cursor: pointer;

            &.active{
                color:#000;
                border-bottom: 2px solid #0042EE;
                margin-bottom: -2px;
            }
        }
    }
`