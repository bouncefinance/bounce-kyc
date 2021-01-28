import styled from 'styled-components'
import React from "react";

export const OText1 = styled.span`
   font-family: Optima;
font-style: normal;
font-weight: bold;
font-size: 48px;

`

export const OText2 = styled.span`
   font-family: Optima;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 48px;
`

export const OText3 = styled.span`
font-family: Optima;
font-style: normal;
font-weight: bold;
font-size: 26px;
line-height: 32px;
`

export const OText4 = styled.span`
font-family: Optima;
font-style: normal;
font-weight: bold;
font-size: 22px;
line-height: 27px;
`

export const OText5 = styled.span`
font-family: Optima;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 19px;
`

export const OTip = styled.span`
font-family: Helvetica Neue;
font-style: normal;
font-weight: bold;
color: #2DAB50;
font-size: 16px;
line-height: 20px;
`

export const OSubTitle = styled.span`
font-family: Helvetica Neue;
font-style: normal;
font-weight: normal;
color: rgba(0,0,0,.8);
font-size: 12px;
line-height: 1.3em;
`


export const ITextR = styled.span`
font-family: IBM Plex Mono;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: #000;
`

export const ITextB = styled.span`
font-family: IBM Plex Mono;
font-style: normal;
font-weight: bold;
font-size: 12px;
`




export const LayoutFrame = styled.div`
  margin: 0 auto;
  flex-wrap: wrap;
  width: ${({ width }) => (width ? width : '1280px')};
  background-color: ${({ theme }) => (theme.white)};
  position: relative;
  background-color: #ffffff;
  @media (max-width: 767px) {
    width: 100%;
  }
`

export const PoolFrame = styled.div`
  width: ${({ width }) => (width ? width : '1280px')};
  padding: 40px 100px;
  position: relative;
  background-color: #fff;
  @media (max-width: 767px) {
    width: 100%;
  }
`

export const Address = styled.a`
font-family: IBM Plex Mono;
font-style: normal;
font-weight: normal;
width: fit-content;
font-size: 14px;
line-height: 18px;
margin: auto;
color: ${({ theme }) => (theme.grey4)};
text-align: center;
cursor: pointer;
/* margin-top: 16px; */
/* margin-bottom: 40px; */
&:hover{
    color: ${({ theme }) => (theme.black)};
    border-bottom: 1px solid #000;
};
@media (max-width: 767px) {
  margin-top: 0px;
}

`

export const Website = styled(Address)`
  padding: 20px 0 29px;
  border-bottom: 1px solid rgba(0, 0, 0 , 0.1);
  margin-bottom: 32px;
`

export const TokenFrame = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  img{
    width: 18px;
    margin-right: 8px;
  }
`

export const Pool = styled.div`

.status.Live1 {
    color: #36C98E;
  }
`

Pool.Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #000000;
  margin: 52px 0;
  position: relative;

  span{
    width: 100%;
    position: absolute;
    left: 0px;
    top: -20px;
    color: rgba(0,0,0,.5);
    font-size: 12px;
  }
`

export const LineDivider = styled.div`
  height: 4px;
  background-color: #000;
  width: ${({ width }) => (width)};
  `
Pool.RevertDivider = styled.div`
  height: 2px;
  width: 100%;
  background-color: #000;
  margin-bottom: 52px;
`

Pool.Meta = styled.div`
    font-family: IBM Plex Mono;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
  div:nth-child(1){
     color: ${({ theme }) => (theme.grey4)};

  }
  div:nth-child(2){
     color: ${({ theme }) => (theme.black)};
  }
`

Pool.MetaDivider = styled.div`
  width: 1px;
  height: 110px;
  background-color: rgba(196, 196, 196, 1);
  margin: 0 24px;
`


Pool.MetaFrame = styled.div`
  display: flex;
  align-items: center;
`

Pool.Header = styled.div`
  font-family: Optima;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px; 
  padding: 16px 0 16px;
  display: flex;
  justify-content: center;

  &.create{
    justify-content: left;
    border-bottom: 4px solid #000;
  }
  @media (max-width: 767px) {
    font-size: 26px;
}
`

Pool.Mode = styled.div`
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  flex: 1;
  line-height: 15px;
  text-align: ${({ align }) => (align)};
  text-align: center;
  @media (max-width: 767px) {
    font-size: 14px;
  }

  &.create{
    text-align: left;
  }
`

Pool.Close = styled.img`
  position: absolute;
  right: 24px;
  top: 24px;
  cursor: pointer;
`

Pool.Content = styled.div`
  width: ${({ width }) => (width ? width : '100%')};
  height: fit-content;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 15px;
  text-align: center;
 
  >*{
    margin-top: 36px;
  }
  
  
  *:first-child{
    margin-top: 0;
  }
`

Pool.topInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 14.65px;
  font-family: Helvetica Neue;
  color: #1F191B;
  margin-top: 32px;

  span:nth-child(1){
    font-weight: bold;
    opacity: .7;
  }

  span:nth-child(2){
    font-weight: 700
  }
`

Pool.Frame = styled.div`
  margin-top: 52px;
  display: flex;
  justify-content: space-between;
  font-family: Optima;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 32px;
`

Pool.Return = styled.img`
  width: 12px;
  position: absolute;
  top: 24px;
  left: 24px;
  height: 40px;
  padding-right: 12px;
  border-right: 1px solid #C4C4C4;
  cursor: pointer;
  z-index: 2;
  @media (max-width: 767px) {
    top: 26px;
    left: 20px;
    border:none;
  }
`

Pool.Block = styled.div`
  width: 200px;
  /* height: 120px; */
  padding: 12px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => (theme.grey3)};
  text-align: left;
  position: relative;
  span:nth-child(1){
    font-family: IBM Plex Mono;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
  }
  
  span:nth-child(2){
    font-family: Optima;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 29px;
    margin-top: 8px;
    padding-bottom: 12px;
  }
`

Pool.TimeFrame = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-bottom:24px;
  &.small_time{
    justify-content: flex-start;
    margin-top: 16px;
    margin-bottom:0;
  }
`

Pool.Time = styled.span`
  display: flex;
  flex-direction: column;
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  min-width: 28px;
  color: ${({ theme }) => (theme.grey5)};
`

Pool.Status = styled.div`
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-content: center;
  align-items: center;
  i{
    /* font-size: 36px; */
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: rgb(0,0,0,.5);
    margin-right: 8px;

    &.Live{
      background-color: #36C98E;
    }

    &.Filled{
      background-color: #728AE0;
    }
    
    &.Successfully{
      background-color: #728AE0;
    }
    
    &.Unsuccessfully{
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`


export const Progress = styled.div`
  width: 100%;
   height: ${({ height }) => (height ? height : '4px')};
`

Progress.Value = styled.div`
 height: 100%;
`

export const Cover = styled.img`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : 'auto')};
  object-fit: contain;
`

export const NFTInfo = styled.div`
  width: 272px;
  display: flex;
  flex-direction: column;
  text-align: left;
  @media (max-width: 767px) {
    width: 100%;
  }
`



NFTInfo.Artist = styled.span`
  font-family: IBM Plex Mono;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
color: ${({ theme }) => (theme.grey5)};
`

NFTInfo.Title = styled.span`
  font-family: Optima;
font-style: normal;
font-weight: bold;
font-size: 22px;
line-height: 27px;
color: #1F191B;
margin-top: 8px;
`

NFTInfo.Desc = styled.span`
  font-family: IBM Plex Mono;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 154.8%;
margin-top: 40px;
padding-bottom: 32px;
border-bottom: 1px solid #C4C4C4;
`

Pool.Description = styled.div`
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #000;
  width: 604px;
  margin: auto;
  @media (max-width: 767px) {
    width: 100%;
  }
`

export const EmptyLayout = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  img{
    width: 40px;
    margin-bottom: 40px;
  }
  
  p{
    font-family: Helvetica Neue;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 140%;

text-align: center;
letter-spacing: 0.02em;
width: 240px;
color: #FFFFFF;
  }
`

export const renderTime = (leftTime, frameStyle, isStr = false) => {
  if (isStr) return `${leftTime.days}d : ${leftTime.hours}h :${leftTime.minutes}m :${leftTime.seconds}s `
  return (<Pool.TimeFrame style={frameStyle}>
    <Pool.Time>
      <span>{leftTime.days}d</span>
    </Pool.Time>
    <Pool.Time>
      <span>:</span>
    </Pool.Time>

    <Pool.Time>
      <span>{leftTime.hours}h</span>
    </Pool.Time>
    <Pool.Time>
      <span>:</span>
    </Pool.Time>

    <Pool.Time>
      <span>{leftTime.minutes}m</span>
    </Pool.Time>
    <Pool.Time>
      <span>:</span>
    </Pool.Time>

    <Pool.Time>
      <span>{leftTime.seconds}s</span>
    </Pool.Time>

  </Pool.TimeFrame>)
}







