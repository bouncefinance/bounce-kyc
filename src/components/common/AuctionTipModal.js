import React  from "react"
import styled from 'styled-components'
import { Button } from "./Button";
import checkbox from '../../assets/icons/checkbox.svg'

const JoinTipStyle = styled.div`
    .title{
        font-family: 'Optima';
        font-size: 26px;
        line-height: 31.5px;
        font-weight: 700;
        color: #1F191B;
        margin-bottom: 20px;
    }
    .text_content{
        width: 360px;
        border-top: 4px solid #FD531E;
        padding: 21px 24px;
        box-sizing: border-box;
        color: #FD531D;
        font-family: 'Helvetica Neue';
        font-size: 14px;
        line-height: 1.3em;
        text-align: left;
        background-color: rgb(255,246,244);
    
        p{
            margin-bottom: 20px;
        }
        h4{
            font-weight: bold;
        },
    }

    .currency{
        width: 360px;
        height: 16px;
        display: flex;
        align-items: center;
        margin-top: 35px;
        img{
            width: 28px;
            height: 28px;
            margin-right: 33px;
        }
        &>div{
            text-align: left;
            h3{
                font-family: 'Optima';
                font-size: 16px;
                font-weight: 700;
                line-height: 19px;
                color: #000;
            }
            span{
                font-family: 'IBM Plex Mono';
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
            }
        }
        @media (max-width: 767px) {
            width: 100%;
            padding:0 20px;
        }
    }

    .footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 56px;
        label{
            display: flex;
            align-items: center;
            user-select: none;
            i{
                display: block;
                width: 14px;
                height: 14px;
                border: 1px solid #000000;
                margin-right: 8px;
                cursor: pointer;
            }
            input{
                display: none;
                &:checked + i{
                    border: none;
                    background: url(${checkbox}) no-repeat;
                    background-size: contain;
                    background-position: 0 0;
                }
            }
            
            span{
                font-family: 'Helvetica Neue';
                font-weight: 500;
                font-size: 14px;
                line-height: 17.09px;
            }
        }
        @media (max-width: 767px) {
            padding:0 20px;
        }
    }
`

const types = [
  {
    title: 'Warning',
    content: 'Bounce is a decentralized platform and smart contract oriented. Your transaction cannot be revoked or cancelled once you send. Please acknowledge that you have checked pool information and you are responsible for your own action.'
  },
  {
    title: 'Warning',
    content: 'Bounce is a decentralized platform and smart contract oriented. Once you create an auction, you cannot cancel or change parameters once you activate your auction. Please double check the parameters you entered.'
  },
  {
    title: 'Prediction result is finalized!',
    content: 'Be the first participant to reveal the results and get 1% of fee accrued from this pool.',
    button: 'Open the result'
  },
  {
    title: 'Warning',
    content: 'Bounce prediction is a decentralized platform. You can not cancel your bids once you submit. Bounce is not responsible for the loss caused by price oracle results provided by Chainlink.',
  }
]

export const AuctionTipModal = ({ type, auction }) => {

  const tip = types[type]

  return (
      <JoinTipStyle>
        <div className="title">
          {tip.title}
        </div>
        <div className="text_content">
          <p>{tip.content}</p>
        </div>
        <Button black style={{marginTop:56}} onClick={auction}>{tip.button? tip.button: 'I acknowledge'}</Button>
      </JoinTipStyle>
  )
}
