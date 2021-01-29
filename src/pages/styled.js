import styled from 'styled-components'

export const LayoutStyled = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #000;
    @media screen and (max-width: 960px){
        width: 100%;
        overflow-x:hidden;
    }
    .mainView{
        padding-bottom: 50px;
    }
`