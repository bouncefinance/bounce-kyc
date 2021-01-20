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