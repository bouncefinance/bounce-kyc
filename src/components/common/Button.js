import styled from 'styled-components'

export const Button = styled.button`
  font-family: 'Helvetica Neue';
  font-weight: bold;
  border: 1px solid ${({theme }) => (theme.grey4)};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '48px')};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ black, theme }) => (black ? theme.black : theme.white)};
  color: ${({ black, theme }) => (black ? theme.white : theme.black)};

  &:hover{
    opacity: .8;
  }

  &.display{
    opacity: .14;
  }
  
  &:disabled{
      border: 1px solid rgba(0,0,0,.1);
      color: rgba(0,0,0,.2);
      background-color: #D3D3DA;
    }

  &.write_btn{
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.2);
    color: #000;
    
    &:hover{
      border: 1px solid rgb(0,0,0);
      color: #000;
      opacity: 1;
    }
    

    &.disable{
      border: 1px solid rgba(0,0,0,.1);
      color: rgba(0,0,0,.2)
    }
  }

`

