import styled from 'styled-components'

export const ProjectListStyle = styled.div`
    width: 1100px;
    margin: 52px auto;
    @media screen and (max-width: 960px){
        width: calc(100% - 48px);
        margin: 52px 24px;
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