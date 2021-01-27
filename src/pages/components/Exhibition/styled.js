import styled from 'styled-components'

export const PassageStyled = styled.div`
    width:${({ width }) => { return width ? width : '100%' }};
    font-family: 'Helvetica Neue';

    p.title{
        font-weight: 700;
        color: rgba(0,0,0,.4);
        font-size: 13px;
        margin-top:${({ marginTop }) => { return marginTop ? marginTop : '30px' }};
    }

    p.desc{
        font-weight: 400;
        color: #000;
        font-size: 16px;
        margin-top: 8px;
    }
`

export const CrumbsStyled = styled.div`
    width: 1100px;
    height: 80px;
    margin: 0 auto;
    color: #fff;
    box-sizing: border-box;
    padding-top: 45px;

    ul{
        display: flex;
        user-select: none;

        li{
            margin-left: 5px;
            font-family: 'Helvetica Neue';
            font-weight: 400;
            font-size: 12px;
            color: rgba(256,256,256,.6);
            cursor: pointer;
            
            &::after{
                content:' /'
            }

            &:last-child::after{
                content:''
            }

            &.active{
                color: rgba(256,256,256,.4);
            }
        }
    }
`