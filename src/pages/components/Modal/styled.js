import styled from 'styled-components'

export const ModalLayout = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 1;
   background-color: rgba(0,0,0,.85);
`

export const SupportStyled = styled.div`
    width: 520px;
    height: 300px;
    background-color: #fff;
    margin: 15% auto;
    
    .top{
        display: flex;
        justify-content: space-between;
        height: 90px;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 2px solid rgba(0,0,0,.8);
        padding: 30px 32px 24px 52px ;

        h1{
            font-size: 32px;
        }

        img{
            cursor: pointer;
        }
    }

    .main{
        height: 130px;
        padding: 30px 32px 24px 52px ;
        box-sizing: border-box;
        h2{
            font-size: 24px;
        }
        p{
            color: rgba(0,0,0,.6);
            font-weight: 400;
            margin-top: 12px;
        }
    }

    .bottom{
        display: flex;
        justify-content: flex-end;
        margin-right: 32px;
        margin-top: 10px;
        button{
            margin-left: 12px;
        }
    }


`


export const ConfirmStyled = styled.div`
    width: 520px;
    min-height: 300px;
    background-color: #fff;
    margin: 15% auto;

    .top{
        display: flex;
        justify-content: space-between;
        height: 90px;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 2px solid rgba(0,0,0,.8);
        padding: 30px 32px 24px 52px ;

        h1{
            font-size: 32px;
        }

        img{
            cursor: pointer;
        }
    }

    .main{
        min-height: 130px;
        padding: 30px 32px 24px 52px ;
        box-sizing: border-box;
        h2{
            font-size: 24px;
        }

        h5{
           font-size: 16px;
           font-family: 'Helvetica Neue';
           font-weight: 400;
           color: #1F191B; 
        }

        p{
            color: rgba(0,0,0,.6);
            font-weight: 400;
            margin-top: 12px;
        }
    }

    .bottom{
        display: flex;
        justify-content: flex-end;
        margin-right: 32px;
        margin-top: 10px;
        button{
            margin-left: 12px;
        }
    }
`